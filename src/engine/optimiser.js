/**
 * optimiser.js  —  Maths Engine: Combination Optimiser
 *
 * Enumerates every C(N,3) combination of runners in a race and ranks them
 * by Expected Value (EV) using the probability model from probability.js.
 *
 * EV for a combination (A, B, C):
 *
 *   EV = Σ_{h ∈ {A,B,C}}  P(h places) × (h.decimalOdds − 1)   ← expected SP pts
 *      + Σ_{h ∈ {A,B,C}}  P(h wins)   × 10                     ← expected win bonus
 *      + P(all three place)            × 25                     ← expected jackpot
 *
 * Input:  enriched runners from probability.enrichRunners()
 *           { gatePosition, horseName, decimalOdds, normProb, pWin, pPlace }
 *
 * Output: array of combination objects sorted by ev descending
 *           { runners: [r1, r2, r3], ev, evSp, evWin, evJackpot, pJackpot }
 */

import { pAllThreePlace } from './probability.js';

// ─── Combination enumeration ─────────────────────────────────────────────────

/**
 * allCombinations(arr)
 *
 * Returns every unique 3-element combination from arr.
 * Order within each combination follows the original array order.
 *
 * @param  {Array}  arr  – array of any elements (length ≥ 3)
 * @returns {Array}       – array of [el_i, el_j, el_k] tuples
 */
function allCombinations(arr) {
  const combos = [];
  const n = arr.length;
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        combos.push([arr[i], arr[j], arr[k]]);
      }
    }
  }
  return combos;
}

// ─── EV calculation for a single combination ─────────────────────────────────

/**
 * evForCombo(enrichedRunners, idxA, idxB, idxC)
 *
 * Calculates the full Expected Value breakdown for one 3-pick combination.
 *
 * @param  {Array}   enrichedRunners  – full field, enriched by probability.js
 * @param  {number}  idxA             – index into enrichedRunners for pick 1
 * @param  {number}  idxB             – index for pick 2
 * @param  {number}  idxC             – index for pick 3
 * @returns {object}                   – { ev, evSp, evWin, evJackpot, pJackpot }
 */
function evForCombo(enrichedRunners, idxA, idxB, idxC) {
  const picks = [idxA, idxB, idxC].map(i => enrichedRunners[i]);

  // Expected SP points: for each pick, probability it places × its SP points value
  const evSp = picks.reduce((sum, r) => sum + r.pPlace * (r.decimalOdds - 1), 0);

  // Expected win bonus: probability each pick wins × the 10-pt win bonus
  const evWin = picks.reduce((sum, r) => sum + r.pWin * 10, 0);

  // Expected jackpot: probability all three place × the 25-pt jackpot
  const pJackpot = pAllThreePlace(enrichedRunners, idxA, idxB, idxC);
  const evJackpot = pJackpot * 25;

  return {
    ev:        evSp + evWin + evJackpot,
    evSp,
    evWin,
    evJackpot,
    pJackpot,
  };
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * rankCombinations(enrichedRunners)
 *
 * Entry point. Enumerates all C(N,3) gate combinations for a race field and
 * returns them ranked by EV, highest first.
 *
 * @param  {Array}  enrichedRunners  – output of probability.enrichRunners()
 * @returns {Array}                   – sorted combination objects:
 *   {
 *     rank:      number,            – 1-based rank
 *     runners:   [r1, r2, r3],      – the three runner objects
 *     ev:        number,            – total expected value
 *     evSp:      number,            – EV contribution from SP points
 *     evWin:     number,            – EV contribution from win bonus
 *     evJackpot: number,            – EV contribution from jackpot
 *     pJackpot:  number,            – raw probability all three place
 *   }
 */
export function rankCombinations(enrichedRunners) {
  if (enrichedRunners.length < 3) return [];

  const indices  = enrichedRunners.map((_, i) => i);
  const combos   = allCombinations(indices);

  const ranked = combos
    .map(([a, b, c]) => ({
      runners: [enrichedRunners[a], enrichedRunners[b], enrichedRunners[c]],
      ...evForCombo(enrichedRunners, a, b, c),
    }))
    .sort((x, y) => y.ev - x.ev)
    .map((combo, i) => ({ rank: i + 1, ...combo }));

  return ranked;
}

