/**
 * probability.js  —  Maths Engine: Probability Module
 *
 * Handles all probability calculations for the Champion Tipster optimiser.
 *
 * Key concepts:
 *   - Overround removal: bookmaker odds sum to > 100%. We normalise them
 *     so implied win probabilities sum to exactly 1.0.
 *   - Harville formula: derives accurate P(top-3) for each horse based on
 *     its normalised win probability and the field composition.
 *   - All functions are pure (no side effects) and independently testable.
 *
 * Input shape expected by all functions:
 *   runner = { gatePosition: number, horseName: string, decimalOdds: number }
 *
 * Output shape returned by enrichRunners():
 *   runner + { normProb: number, pWin: number, pPlace: number }
 *     normProb  – normalised win probability (overround removed)
 *     pWin      – same as normProb (alias, for readability in optimiser)
 *     pPlace    – P(finishing 1st, 2nd, or 3rd) via Harville formula
 */

// ─── Overround removal ───────────────────────────────────────────────────────

/**
 * removeOverround(runners)
 *
 * Converts each runner's decimal odds to an implied win probability,
 * then normalises so all probabilities sum to exactly 1.0.
 *
 * @param  {Array}  runners  – array of runner objects with decimalOdds
 * @returns {Array}           – same runners with normProb added
 */
export function removeOverround(runners) {
  const implied = runners.map(r => 1 / r.decimalOdds);
  const total   = implied.reduce((sum, p) => sum + p, 0);
  return runners.map((r, i) => ({
    ...r,
    normProb: implied[i] / total,
  }));
}

// ─── Harville formula ────────────────────────────────────────────────────────

/**
 * harvilleP3(runnersWithProb)
 *
 * For each runner, calculates the probability of finishing in the top 3
 * using the Harville (1973) formula.
 *
 * Harville states: P(horse i finishes kth | horses j1…jk−1 finished ahead)
 *   = p_i / (1 − p_j1 − … − p_jk−1)
 *
 * So:
 *   P(i is 1st) = p_i
 *   P(i is 2nd) = Σ_{j≠i}  p_j · p_i / (1 − p_j)
 *   P(i is 3rd) = Σ_{j≠i}  Σ_{k≠i,k≠j}  p_j · [p_k/(1−p_j)] · [p_i/(1−p_j−p_k)]
 *   P(i places) = P(1st) + P(2nd) + P(3rd)
 *
 * @param  {Array}  runners  – runners with normProb populated
 * @returns {Array}           – runners with pWin and pPlace added
 */
export function harvilleP3(runners) {
  const p = runners.map(r => r.normProb);
  const n = runners.length;

  return runners.map((runner, i) => {
    const pi = p[i];

    // P(1st)
    const p1 = pi;

    // P(2nd): one other horse wins first, then i runs in the reduced field
    let p2 = 0;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      p2 += p[j] * (pi / (1 - p[j]));
    }

    // P(3rd): two other horses finish 1st and 2nd, then i takes 3rd
    let p3 = 0;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        const denom = 1 - p[j] - p[k];
        if (denom <= 0) continue; // degenerate field (shouldn't happen)
        p3 += p[j] * (p[k] / (1 - p[j])) * (pi / denom);
      }
    }

    return {
      ...runner,
      pWin:   p1,
      pPlace: p1 + p2 + p3,
    };
  });
}

// ─── Jackpot probability ─────────────────────────────────────────────────────

/**
 * pAllThreePlace(runners, idxA, idxB, idxC)
 *
 * Calculates the probability that all three chosen runners finish in the top 3
 * (in any order) using the Harville formula.
 * Used by the optimiser to weight the jackpot (+25 pts) term in EV.
 *
 * Sums P over all 6 permutations of (A, B, C) finishing 1st, 2nd, 3rd.
 *
 * @param  {Array}   runners  – full field with normProb
 * @param  {number}  idxA     – index of first pick in runners array
 * @param  {number}  idxB     – index of second pick
 * @param  {number}  idxC     – index of third pick
 * @returns {number}           – probability all three place
 */
export function pAllThreePlace(runners, idxA, idxB, idxC) {
  const p = runners.map(r => r.normProb);
  const combo = [idxA, idxB, idxC];

  // All 6 permutations of the three indices
  const perms = [
    [combo[0], combo[1], combo[2]],
    [combo[0], combo[2], combo[1]],
    [combo[1], combo[0], combo[2]],
    [combo[1], combo[2], combo[0]],
    [combo[2], combo[0], combo[1]],
    [combo[2], combo[1], combo[0]],
  ];

  let total = 0;
  for (const [x, y, z] of perms) {
    const denomY = 1 - p[x];
    const denomZ = 1 - p[x] - p[y];
    if (denomY <= 0 || denomZ <= 0) continue;
    total += p[x] * (p[y] / denomY) * (p[z] / denomZ);
  }
  return total;
}

// ─── Convenience: enrich entire field ────────────────────────────────────────

/**
 * enrichRunners(runners)
 *
 * Single call that applies overround removal then the Harville formula.
 * Returns the fully enriched runner array ready for the optimiser.
 *
 * @param  {Array}  runners  – raw runners with decimalOdds
 * @returns {Array}           – runners with normProb, pWin, pPlace
 */
export function enrichRunners(runners) {
  return harvilleP3(removeOverround(runners));
}

// ─── Henery power model ───────────────────────────────────────────────────────

// α > 1 down-weights outsider place probability relative to Harville,
// correcting Harville's known overestimation of long-shot place chances.
// Empirically calibrated for UK NH racing.
const HENERY_ALPHA = 1.1;

/**
 * heneryP3(runners, alpha)
 *
 * Applies the Henery power correction before the Harville place formula.
 * Each runner's normProb is raised to `alpha` and re-normalised, then the
 * Harville formula is applied with those adjusted probabilities.
 *
 * Effect: outsiders get less P(Place) than Harville would assign; favourites
 * get slightly more. Stored in normProb so pAllThreePlace uses correct probs.
 *
 * @param  {Array}   runners  – runners with normProb (from removeOverround)
 * @param  {number}  alpha    – power exponent, default 1.1
 * @returns {Array}            – runners with normProb (Henery-adjusted), pWin, pPlace
 */
export function heneryP3(runners, alpha = HENERY_ALPHA) {
  const powered    = runners.map(r => Math.pow(r.normProb, alpha));
  const poweredSum = powered.reduce((s, v) => s + v, 0);

  // Overwrite normProb with Henery-adjusted value so pAllThreePlace
  // automatically uses the correct probs when called from optimiser.js
  const adjusted = runners.map((r, i) => ({
    ...r,
    normProb: powered[i] / poweredSum,
  }));

  const p = adjusted.map(r => r.normProb);
  const n = adjusted.length;

  return adjusted.map((runner, i) => {
    const pi = p[i];

    const p1 = pi;

    let p2 = 0;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      p2 += p[j] * (pi / (1 - p[j]));
    }

    let p3 = 0;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        const denom = 1 - p[j] - p[k];
        if (denom <= 0) continue;
        p3 += p[j] * (p[k] / (1 - p[j])) * (pi / denom);
      }
    }

    return {
      ...runner,
      pWin:   p1,
      pPlace: p1 + p2 + p3,
    };
  });
}

/**
 * enrichRunnersHenery(runners)
 *
 * Single call: overround removal + Henery power correction + place probabilities.
 */
export function enrichRunnersHenery(runners) {
  return heneryP3(removeOverround(runners));
}

