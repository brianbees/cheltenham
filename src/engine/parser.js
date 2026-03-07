/**
 * parser.js  —  Race Card Text Parser
 *
 * Converts raw pasted race card text into structured runner and result arrays.
 *
 * Supports:
 *   - Tab-separated or multi-space-separated columns
 *   - Fractional odds:  "6/1", "7/2 Fav", "4/1 (2nd)", "17/2", "150/1"
 *   - Decimal odds:     "11.0", "4.50"
 *   - Finish positions: "(1st)" "(2nd)" "(3rd)" anywhere on the runner's line
 *   - Country codes in horse names: (FR), (IRE), (GB) etc — stripped from name
 *   - Header rows: skipped automatically ("No.", "Horse", "SP", "Trainer"…)
 *   - Multi-race pastes: new race block starts when a non-numeric line is found
 *   - Blank lines: ignored
 *   - Extra columns (Trainer, Jockey, etc.): ignored
 *
 * Output:
 *   {
 *     races: [
 *       {
 *         raceName:  string,
 *         runners:   [{ gatePosition, horseName, decimalOdds }],
 *         result:    [{ gatePosition, horseName, sp }] | null,
 *                    // null if fewer than 3 positions annotated
 *                    // array is ordered [1st, 2nd, 3rd]
 *         warnings:  string[],   // rows that failed to parse
 *       }
 *     ]
 *   }
 */

// ─── Regex patterns ───────────────────────────────────────────────────────────

// Matches "17/2", "150/1", "6/1" etc — the first fractional found in a string
const FRAC_ODDS_RE  = /(\d+)\/(\d+)/;

// Strips trailing country codes: "(FR)", "(IRE)", "(GB)" etc
const COUNTRY_RE    = /\s*\((FR|IRE|GB|USA|GER|NZ|AUS|CZE|ITA|SPA|POL|CHI|ARG)\)\s*$/i;

// Detects finish position annotation anywhere in a string
const POSITION_RE   = /\((1st|2nd|3rd)\)/i;

// Lines that are clearly column headers — skip them
const HEADER_RE     = /^(no\.?|horse|sp|starting|trainer|jockey|race card|saddle)/i;

// Lines that are source attributions, image captions, social links etc — skip them
// e.g. "Sky Sports", "Racing Post", "+1", "Getty Images"
const SKIP_LINE_RE  = /^(sky sports|racing post|getty|pa media|rte|bbc sport|itv racing|at the races|\+\d+)$/i;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * parseFractionalOdds(str) → decimal number | null
 * Extracts the first "num/den" pattern and converts to decimal odds.
 * e.g. "6/1 (1st)" → 7.0,  "7/2 Fav" → 4.5,  "17/2" → 9.5
 */
function parseFractionalOdds(str) {
  const m = FRAC_ODDS_RE.exec(str);
  if (!m) return null;
  const num = parseFloat(m[1]);
  const den = parseFloat(m[2]);
  if (!den || isNaN(num) || isNaN(den)) return null;
  return num / den + 1;
}

/**
 * parseDecimalOdds(str) → decimal number | null
 * Handles plain decimal inputs like "11.0" or "4.50".
 */
function parseDecimalOdds(str) {
  const d = parseFloat(str.trim());
  if (isNaN(d) || d <= 1) return null;
  return d;
}

/**
 * parseOdds(str) → decimal number | null
 * Tries fractional first, then decimal.
 */
function parseOdds(str) {
  return parseFractionalOdds(str) ?? parseDecimalOdds(str);
}

/**
 * parsePosition(str) → 1 | 2 | 3 | null
 * Looks for "(1st)", "(2nd)", "(3rd)" anywhere in the string.
 */
function parsePosition(str) {
  const m = POSITION_RE.exec(str);
  if (!m) return null;
  const p = m[1].toLowerCase();
  if (p === '1st') return 1;
  if (p === '2nd') return 2;
  if (p === '3rd') return 3;
  return null;
}

/**
 * cleanHorseName(str) → string
 * Strips trailing country codes and trims whitespace.
 */
function cleanHorseName(str) {
  return str.replace(COUNTRY_RE, '').trim();
}

/**
 * splitColumns(line) → string[]
 * Splits a line into columns.
 * Tries tab-splitting first (most copy-pasted tables use tabs).
 * Then tries " - " delimiter (e.g. "15 - Tiger Roll (IRE) - 10/1").
 * Falls back to splitting on 2+ consecutive spaces.
 */
function splitColumns(line) {
  if (line.includes('\t')) {
    return line.split('\t').map(s => s.trim()).filter(s => s.length > 0);
  }
  // " - " delimited: gate - name - odds  (Racing Post / copy-paste format)
  if (/ - /.test(line)) {
    const parts = line.split(' - ').map(s => s.trim()).filter(s => s.length > 0);
    if (parts.length >= 3) return parts;
  }
  return line.split(/\s{2,}/).map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * isHeaderLine(line) → boolean
 * Returns true for lines that look like column headers.
 */
function isHeaderLine(line) {
  return HEADER_RE.test(line.trim());
}

/**
 * isSkipLine(line) → boolean
 * Returns true for source attributions and image captions that should be ignored.
 */
function isSkipLine(line) {
  return SKIP_LINE_RE.test(line.trim());
}

/**
 * isRaceNameLine(line) → boolean
 * A race name line does not start with a digit and isn't a recognised header or skip line.
 * Must be at least 4 chars and contain a word longer than 2 chars (avoids "+1" etc).
 */
function isRaceNameLine(line) {
  const t = line.trim();
  if (!t || t.length < 4) return false;
  if (/^\d/.test(t)) return false;
  if (isHeaderLine(t)) return false;
  if (isSkipLine(t)) return false;
  // Must contain at least one word longer than 2 characters
  if (!/[a-zA-Z]{3,}/.test(t)) return false;
  return true;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * parseRaceCardText(text) → { races }
 *
 * @param  {string}  text  – raw pasted text from a race card or results sheet
 * @returns {{ races: Array }}
 */
export function parseRaceCardText(text) {
  const lines = text.split(/\r?\n/);

  // We accumulate races here; start with a default unnamed race
  const races   = [];
  let current   = null;

  function initRace(name) {
    if (current && (current.runners.length > 0 || current.warnings.length > 0)) {
      races.push(current);
    }
    current = { raceName: name, runners: [], _resultSlots: [null, null, null], warnings: [] };
  }

  initRace('Race');

  for (let i = 0; i < lines.length; i++) {
    const raw  = lines[i];
    const line = raw.trim();

    if (!line) continue;
    if (isHeaderLine(line)) continue;

    // ── Skip line (source attribution, image caption etc) ──
    if (isSkipLine(line)) continue;

    // ── Race name line ──
    if (isRaceNameLine(line)) {
      // Only start a new race block if the current one has runners,
      // or if it still has the default name (avoid orphan empty blocks)
      if (current.runners.length > 0) {
        initRace(line);
      } else {
        // Update the name of the still-empty current race
        current.raceName = line;
      }
      continue;
    }

    // ── Runner line ──
    const cols = splitColumns(line);

    // Must have at least 3 columns: gate, name, odds
    if (cols.length < 3) {
      current.warnings.push(`Line ${i + 1}: too few columns — "${line}"`);
      continue;
    }

    // Column 0: gate number
    const gate = parseInt(cols[0], 10);
    if (isNaN(gate) || gate < 1) {
      current.warnings.push(`Line ${i + 1}: invalid gate "${cols[0]}" — "${line}"`);
      continue;
    }

    // Column 1: horse name (strip country code)
    const horseName = cleanHorseName(cols[1]);
    if (!horseName) {
      current.warnings.push(`Line ${i + 1}: missing horse name — "${line}"`);
      continue;
    }

    // Column 2: odds — may contain position annotation (e.g. "4/1 (2nd)")
    const oddsCol     = cols[2];
    const decimalOdds = parseOdds(oddsCol);

    if (decimalOdds === null) {
      // Try to find odds anywhere else on the line as a fallback
      const fallback = parseOdds(line);
      if (fallback === null) {
        current.warnings.push(
          `Line ${i + 1}: could not parse odds "${oddsCol}" for ${horseName}`
        );
        continue;
      }
    }

    const finalOdds = decimalOdds ?? parseOdds(line);

    // Check for position annotation in the odds column OR anywhere on the full line
    const position = parsePosition(oddsCol) ?? parsePosition(line);

    const runner = {
      gatePosition: gate,
      horseName,
      decimalOdds: finalOdds,
      finishPosition: position,   // null or 1/2/3 — stored per-runner for preview display
    };
    current.runners.push(runner);

    // Record result slot if position annotated
    if (position !== null) {
      current._resultSlots[position - 1] = {
        gatePosition: gate,
        horseName,
        sp: finalOdds,  // sp stored as decimal, matching historicalData.js convention
      };
    }
  }

  // Flush the last race
  if (current && (current.runners.length > 0 || current.warnings.length > 0)) {
    races.push(current);
  }

  // Finalise each race: clean up the result array
  // result is set when all 3 positions are known (for scorer); partial positions
  // are still visible via runner.finishPosition on each runner.
  for (const race of races) {
    const slots  = race._resultSlots;
    const filled = slots.filter(Boolean);
    race.result  = filled.length === 3 ? filled : null;
    // Partial result: expose however many positions we did detect
    race.partialResult = filled.length > 0 ? slots : null;
    delete race._resultSlots;
  }

  // Drop races that have no runners and no warnings
  return {
    races: races.filter(r => r.runners.length > 0 || r.warnings.length > 0),
  };
}
