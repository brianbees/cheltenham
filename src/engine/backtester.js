/**
 * backtester.js  —  Historical Model Backtester
 *
 * Analyses all historical Gold Cup Day data and computes what is possible
 * to measure from the data we currently hold.
 *
 * ── Tier 1 (computable now — result SPs only) ─────────────────────────────
 *   - Perfect score per race/year (SP total + win bonus + jackpot)
 *   - Winner SP, avg placed SP, SP composition (short/mid/big)
 *   - Year-by-year scoring landscape per race
 *   - Race character validation (Banker/Judgement/Swing vs actual distributions)
 *
 * ── Tier 2 (requires full pre-race field data) ────────────────────────────
 *   - Harville model rank of the actual winning combo
 *   - EV prediction vs actual score
 *   - Probability calibration (P(place) vs empirical place rate)
 *
 * Data completeness per race-year:
 *   FULL    – gatePosition populated for all 3 + fieldSize known
 *   PARTIAL – some gate positions available
 *   SP_ONLY – only horse names + SPs (most historical years)
 *   MISSING – sp is null for one or more placed horses
 */

import { historicalData, spToPoints, getPerfectScore } from '../data/historicalData.js';

// ── Constants ─────────────────────────────────────────────────────────────────

export const ALL_RACE_NAMES = [
  // Grade 1 Championship
  'Gold Cup',
  'Champion Hurdle',
  'Queen Mother Champion Chase',
  'Ryanair Chase',
  "Stayers' Hurdle",
  'Triumph Hurdle',
  // Novice
  'Supreme Novices Hurdle',
  'Arkle Challenge Trophy',
  'Ballymore Novices Hurdle',
  'Brown Advisory Novices Chase',
  "Turners Novices' Chase",
  'Albert Bartlett',
  // Handicap
  'County Hurdle',
  'Coral Cup',
  'Pertemps Final',
  'Grand Annual',
  'Plate Handicap Chase',
  'Ultima Handicap Chase',
  'Fred Winter Juvenile Hurdle',
  // Mares
  "Dawn Run Mares' Hurdle",
  'Mares Chase',
  "Mares' Novices' Hurdle",
  // Specialist / Amateur
  'Foxhunter Chase',
  'Hunters Chase',
  'Kim Muir',
  'Martin Pipe',
  'National Hunt Chase',
  'Cross Country Chase',
  // Bumper
  'Champion Bumper',
  // Historical (discontinued)
  'Cathcart Challenge Cup',
  'Mildmay Chase',
  'Novice Handicap Chase',
];

// SP thresholds for categorising placed horses
const SP_THRESHOLD_SHORT = 6.0;   // ≤ 5/1 decimal  — short-priced / favourite band
const SP_THRESHOLD_MID   = 16.0;  // ≤ 15/1 decimal — mid-price
                                   // > 15/1          — big-price / outsider

// Race category map — keyed by raceName, drives category badge in UI
export const RACE_CATEGORY = {
  // Grade 1 Championship
  'Gold Cup':                     'Grade 1 Championship',
  'Champion Hurdle':              'Grade 1 Championship',
  'Queen Mother Champion Chase':  'Grade 1 Championship',
  'Ryanair Chase':                'Grade 1 Championship',
  "Stayers' Hurdle":              'Grade 1 Championship',
  'Triumph Hurdle':               'Grade 1 Championship',
  // Novice
  'Supreme Novices Hurdle':       'Novice',
  'Arkle Challenge Trophy':       'Novice',
  'Ballymore Novices Hurdle':     'Novice',
  'Brown Advisory Novices Chase': 'Novice',
  "Turners Novices' Chase":       'Novice',
  'Albert Bartlett':              'Novice',
  // Handicap
  'County Hurdle':                'Handicap',
  'Coral Cup':                    'Handicap',
  'Pertemps Final':               'Handicap',
  'Grand Annual':                 'Handicap',
  'Plate Handicap Chase':         'Handicap',
  'Ultima Handicap Chase':        'Handicap',
  'Fred Winter Juvenile Hurdle':  'Handicap',
  // Mares
  "Dawn Run Mares' Hurdle":       'Mares',
  'Mares Chase':                  'Mares',
  "Mares' Novices' Hurdle":       'Mares',
  // Specialist / Amateur
  'Foxhunter Chase':              'Specialist',
  'Hunters Chase':                'Specialist',
  'Kim Muir':                     'Specialist',
  'Martin Pipe':                  'Specialist',
  'National Hunt Chase':          'Specialist',
  'Cross Country Chase':          'Specialist',
  'Champion Bumper':              'Specialist',
  // Historical
  'Cathcart Challenge Cup':       'Historical',
  'Mildmay Chase':                'Historical',
  'Novice Handicap Chase':        'Historical',
};

// ── Data completeness detection ───────────────────────────────────────────────

/**
 * getDataCompleteness(race)
 * Returns one of: 'FULL' | 'PARTIAL' | 'SP_ONLY' | 'MISSING'
 *
 * Tier 2 readiness (FULL) requires a complete pre-race field array — i.e. all
 * runners with gate positions and SP values, not just the result top-3.
 * Having gate positions only on the top-3 result entries is PARTIAL: useful
 * context, but not sufficient to replay the Harville model against history.
 */
function getDataCompleteness(race) {
  if (!race) return 'MISSING';
  if (race.top3.some(h => h.sp === null)) return 'MISSING';

  // FULL: a field array exists with at least as many entries as top3,
  //       every runner has a gate position, and fieldSize is known.
  const hasField = Array.isArray(race.field) && race.field.length >= 3;
  if (hasField && race.fieldSize !== null) {
    const fieldGatesFilled = race.field.filter(r => r.gatePosition !== null).length;
    if (fieldGatesFilled === race.field.length) return 'FULL';
    return 'PARTIAL';
  }

  // No full field — check whether top-3 at least have gate positions
  const gatesFilled = race.top3.filter(h => h.gatePosition !== null).length;
  if (gatesFilled > 0) return 'PARTIAL';
  return 'SP_ONLY';
}

// ── SP composition ────────────────────────────────────────────────────────────

/**
 * classifySP(decimalSP) → 'short' | 'mid' | 'big'
 */
function classifySP(sp) {
  if (sp <= SP_THRESHOLD_SHORT) return 'short';
  if (sp <= SP_THRESHOLD_MID)   return 'mid';
  return 'big';
}

/**
 * spComposition(top3)
 * Returns counts of short/mid/big priced horses in the result.
 * e.g. { short: 2, mid: 1, big: 0 } — two favourites + one mid-pricer placed
 */
function spComposition(top3) {
  return top3.reduce(
    (acc, h) => { acc[classifySP(h.sp)]++; return acc; },
    { short: 0, mid: 0, big: 0 }
  );
}

// ── Single race-year analysis ─────────────────────────────────────────────────

/**
 * analyseRaceYear(year, yearData, raceName)
 * Returns a full analysis object for one race in one year.
 */
function analyseRaceYear(year, yearData, raceName) {
  const race        = yearData.races.find(
    r => r.raceName.toLowerCase() === raceName.toLowerCase()
  );
  const completeness = getDataCompleteness(race);

  if (completeness === 'MISSING' || !race) {
    return { year, raceName, completeness, available: false };
  }

  const spTotal     = race.top3.reduce((s, h) => s + spToPoints(h.sp), 0);
  const perfectScore = getPerfectScore(race);
  const winnerSP    = race.top3[0].sp;
  const composition = spComposition(race.top3);

  // Is this a "form race" (all 3 placed horses were short-priced)?
  const isFormRace  = composition.short === 3;
  // Is this an "upset" (winner was 15/1+)?
  const isUpset     = winnerSP > SP_THRESHOLD_MID;

  return {
    year,
    raceName,
    completeness,
    available:    true,
    fieldSize:    race.fieldSize,
    top3:         race.top3,
    spTotal,
    perfectScore,
    winnerSP,
    composition,
    isFormRace,
    isUpset,
    // Tier 2 placeholder — populated when full field data is available
    modelRank:    null,
    modelEV:      null,
    actualScore:  null,
  };
}

// ── Race-level aggregation ────────────────────────────────────────────────────

/**
 * analyseRace(raceName)
 * Returns all year entries + aggregate statistics for one race.
 */
export function analyseRace(raceName) {
  const years = Object.entries(historicalData).map(([year, yearData]) =>
    analyseRaceYear(Number(year), yearData, raceName)
  );

  const available = years.filter(y => y.available);

  if (available.length === 0) {
    return { raceName, years, available: false, aggregates: null };
  }

  const spTotals     = available.map(y => y.spTotal);
  const avgSpTotal   = spTotals.reduce((a, b) => a + b, 0) / spTotals.length;
  const highYear     = available.reduce((b, y) => y.spTotal > b.spTotal ? y : b);
  const lowYear      = available.reduce((b, y) => y.spTotal < b.spTotal ? y : b);

  const perfectScores    = available.map(y => y.perfectScore);
  const avgPerfectScore  = perfectScores.reduce((a, b) => a + b, 0) / perfectScores.length;

  // SP composition aggregates
  const compCounts = available.reduce(
    (acc, y) => {
      acc.short += y.composition.short;
      acc.mid   += y.composition.mid;
      acc.big   += y.composition.big;
      return acc;
    },
    { short: 0, mid: 0, big: 0 }
  );
  const totalPlacings  = available.length * 3;
  const shortRate      = compCounts.short / totalPlacings;
  const midRate        = compCounts.mid   / totalPlacings;
  const bigRate        = compCounts.big   / totalPlacings;

  // Upset rate: how often did a 15/1+ horse win?
  const upsetRate = available.filter(y => y.isUpset).length / available.length;

  // Data completeness breakdown
  const completenessCounts = years.reduce(
    (acc, y) => { acc[y.completeness] = (acc[y.completeness] || 0) + 1; return acc; },
    {}
  );

  // Classification (matches RaceHistoryPanel thresholds)
  const classification =
    avgSpTotal > 40 ? 'Swing' :
    avgSpTotal > 20 ? 'Judgement' :
                      'Banker';

  return {
    raceName,
    category: RACE_CATEGORY[raceName] || 'Other',
    years,
    available: true,
    aggregates: {
      count:          available.length,
      avgSpTotal,
      avgPerfectScore,
      highYear:       { year: highYear.year, spTotal: highYear.spTotal },
      lowYear:        { year: lowYear.year,  spTotal: lowYear.spTotal  },
      shortRate,
      midRate,
      bigRate,
      upsetRate,
      classification,
      completenessCounts,
      // Tier 2: will populate once full field data is available
      modelCorrectTopRate: null,  // % of years where actual combo was in model's top 3
      avgModelRank:        null,  // average rank of the actual winning combo
    },
  };
}

// ── Year-level aggregation ────────────────────────────────────────────────────

/**
 * analyseYear(year)
 * Returns all race results for a given year + year-level totals.
 */
export function analyseYear(year) {
  const yearData = historicalData[year];
  if (!yearData) return null;

  const races = ALL_RACE_NAMES.map(name => analyseRaceYear(year, yearData, name));
  const available = races.filter(r => r.available);

  const totalPerfectScore = available.reduce((s, r) => s + r.perfectScore, 0);
  const totalSpTotal      = available.reduce((s, r) => s + r.spTotal, 0);

  return {
    year,
    date:             yearData.date,
    leaderboard:      yearData.leaderboard,
    races,
    available,
    totalPerfectScore,
    totalSpTotal,
    racesWithFullData: races.filter(r => r.completeness === 'FULL').length,
    racesWithSpOnly:   races.filter(r => r.completeness === 'SP_ONLY').length,
    racesWithPartial:  races.filter(r => r.completeness === 'PARTIAL').length,
    racesWithMissing:  races.filter(r => r.completeness === 'MISSING').length,
  };
}

// ── Full cross-year summary ───────────────────────────────────────────────────

/**
 * analyseAll()
 * Returns the complete backtest dataset:
 *   - Per-race analysis (all years)
 *   - Per-year analysis (all races)
 *   - Cross-year aggregate stats
 */
export function analyseAll() {
  const byRace = ALL_RACE_NAMES.map(analyseRace);
  const byYear = Object.keys(historicalData).map(y => analyseYear(Number(y)));

  // Next data target: the not-yet-full year with the most PARTIAL races,
  // tiebroken by most recent year (best ROI to work on next).
  const notYetFull = byYear
    .filter(y => y.racesWithFullData === 0 && y.racesWithPartial > 0)
    .sort((a, b) =>
      b.racesWithPartial - a.racesWithPartial ||
      b.year - a.year
    );
  const nextDataTarget = notYetFull.length > 0 ? {
    year:       notYetFull[0].year,
    date:       notYetFull[0].date,
    partial:    notYetFull[0].racesWithPartial,
    spOnly:     notYetFull[0].racesWithSpOnly,
    totalRaces: notYetFull[0].racesWithPartial + notYetFull[0].racesWithSpOnly,
  } : null;

  return {
    byRace,
    byYear,
    summary: {
      totalYears:       byYear.length,
      totalRaceEntries: byRace.reduce((s, r) => s + r.years.filter(y => y.available).length, 0),
      fullDataEntries:  byRace.reduce(
        (s, r) => s + r.years.filter(y => y.completeness === 'FULL').length, 0
      ),
      spOnlyEntries:    byRace.reduce(
        (s, r) => s + r.years.filter(y => y.completeness === 'SP_ONLY').length, 0
      ),
      missingEntries:   byRace.reduce(
        (s, r) => s + r.years.filter(y => y.completeness === 'MISSING').length, 0
      ),
      nextDataTarget,
    },
  };
}
