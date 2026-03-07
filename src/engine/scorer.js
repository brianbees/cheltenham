/**
 * scorer.js  —  Maths Engine: Live Scorer
 *
 * Given a player's 3 gate picks and the actual race result (top-3 finishers),
 * calculates the exact points earned.
 *
 * Scoring rules:
 *   +SP points   for every picked gate that finishes in the top 3
 *                  SP points = decimalOdds − 1  (e.g. 10/1 = 10 pts)
 *   +10          if the winner's gate is one of the 3 picks (win bonus)
 *   +25          if ALL 3 picks finish in the top 3 (jackpot)
 *
 * Input shapes:
 *   picks  – array of 3 gate position numbers, e.g. [4, 7, 12]
 *
 *   result – array of 3 finisher objects (1st, 2nd, 3rd), each:
 *              { gatePosition: number, horseName: string, sp: number }
 *            sp here is decimal odds (same convention as historicalData.js)
 *
 * All functions are pure and independently testable.
 */

// ─── Core scorer ─────────────────────────────────────────────────────────────

/**
 * scoreRace(picks, result)
 *
 * @param  {number[]}  picks   – [gate1, gate2, gate3] chosen by the player
 * @param  {object[]}  result  – top3 array from historicalData (or live input)
 *                               each: { gatePosition, horseName, sp }
 * @returns {object}            – full breakdown of points earned:
 *   {
 *     spPoints:    number,   – SP points from placed picks
 *     winBonus:    number,   – 10 if winner was picked, else 0
 *     jackpot:     number,   – 25 if all 3 picks placed, else 0
 *     total:       number,   – spPoints + winBonus + jackpot
 *     placedPicks: object[], – result entries for picks that placed
 *     hitWinner:   boolean,
 *     hitJackpot:  boolean,
 *   }
 */
export function scoreRace(picks, result) {
  const pickSet = new Set(picks);

  // Which result entries correspond to picks the player made
  const placedPicks = result.filter(r => pickSet.has(r.gatePosition));

  // SP points: sum (decimal − 1) for each placed pick
  const spPoints = placedPicks.reduce((sum, r) => sum + (r.sp - 1), 0);

  // Win bonus: did any of the player's picks win (i.e. finish 1st)?
  const winner    = result[0]; // result is ordered 1st, 2nd, 3rd
  const hitWinner = pickSet.has(winner.gatePosition);
  const winBonus  = hitWinner ? 10 : 0;

  // Jackpot: all 3 picks must have placed
  const hitJackpot = placedPicks.length === 3;
  const jackpot    = hitJackpot ? 25 : 0;

  return {
    spPoints,
    winBonus,
    jackpot,
    total:       spPoints + winBonus + jackpot,
    placedPicks,
    hitWinner,
    hitJackpot,
  };
}

// ─── Multi-race scorer ───────────────────────────────────────────────────────

/**
 * scoreDay(allPicks, allResults)
 *
 * Scores all races for a single player across Gold Cup Day.
 *
 * @param  {Object}  allPicks    – { raceName: [gate1, gate2, gate3], … }
 * @param  {Object}  allResults  – { raceName: top3Array, … }
 * @returns {Object}              – {
 *     races:      { raceName: scoreRaceResult }[],
 *     totalScore: number,
 *   }
 */
export function scoreDay(allPicks, allResults) {
  const races = {};
  let totalScore = 0;

  for (const raceName of Object.keys(allPicks)) {
    if (!allResults[raceName]) continue; // result not yet available
    const result = scoreRace(allPicks[raceName], allResults[raceName]);
    races[raceName] = result;
    totalScore += result.total;
  }

  return { races, totalScore };
}

