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
// Also matches "#\tHorse\tSP" (Sporting Life desktop table header)
const HEADER_RE     = /^(no\.?|#|horse|sp|starting|trainer|jockey|race card|saddle)/i;

// Lines that are source attributions, image captions, social links etc — skip them
// e.g. "Sky Sports", "Racing Post", "+1", "Getty Images", "sportinglife"
const SKIP_LINE_RE  = /^(sky sports|racing post|getty|pa media|rte|bbc sport|itv racing|at the races|sportinglife|\+\d+)$/i;

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
 * parseDateOdds(str) → decimal number | null
 * Handles Sporting Life copy-paste artefact where odds appear as dates:
 * "02-Jan" = 2/1 (denominator = month number), "13-Feb" = 13/2, "15-Feb" = 15/2 etc.
 */
const DATE_ODDS_RE = /^(\d{1,2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i;
const MONTH_NUM = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
function parseDateOdds(str) {
  const m = DATE_ODDS_RE.exec(str.trim());
  if (!m) return null;
  const num = parseInt(m[1], 10);
  const den = MONTH_NUM[m[2].toLowerCase()];
  if (!den || isNaN(num) || num < 1) return null;
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
 * Tries fractional first, then date-format (02-Jan = 2/1), then decimal.
 */
function parseOdds(str) {
  return parseFractionalOdds(str) ?? parseDateOdds(str) ?? parseDecimalOdds(str);
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

// Lines starting with parentheses are non-runners — skip them
// e.g. "(5 Mambonumberfive — NR)"
const NR_LINE_RE = /^\(/;

/**
 * splitColumns(line) → string[]
 * Splits a line into columns.
 * Tries tab-splitting first (most copy-pasted tables use tabs).
 * Then tries Sporting Life em-dash format: "8 Old Park Star — 2/1"
 * Then tries " - " delimiter (e.g. "15 - Tiger Roll (IRE) - 10/1").
 * Falls back to splitting on 2+ consecutive spaces.
 */
function splitColumns(line) {
  if (line.includes('\t')) {
    return line.split('\t').map(s => s.trim()).filter(s => s.length > 0);
  }
  // Sporting Life format: "8 Old Park Star — 2/1" or "8 Old Park Star — 2/1 sportinglife"
  const emDash = line.match(/^(\d+)\s+(.+?)\s+\u2014\s+(\S+)/);
  if (emDash) return [emDash[1], emDash[2], emDash[3]];
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
 * A race name line does not start with a digit (unless it's a time like "13:20 — Race Name"
 * or "13:20 Race Name") and isn't a recognised header or skip line.
 */
function isRaceNameLine(line) {
  const t = line.trim();
  if (!t || t.length < 4) return false;
  // Time-prefixed race name: "13:20 — Race Name" OR "13:20 Race Name" (no em-dash)
  if (/^\d{1,2}:\d{2}[\s\u2014]/.test(t)) return true;
  if (/^\d/.test(t)) return false;
  if (isHeaderLine(t)) return false;
  if (isSkipLine(t)) return false;
  // Must contain at least one word longer than 2 characters
  if (!/[a-zA-Z]{3,}/.test(t)) return false;
  return true;
}

/**
 * isConcatenatedLine(line) → boolean
 * Detects a Sporting Life mobile line where all runners are run together with no
 * separators: "#HorseSP8Old Park Star2/111Talk The Talk4/1...sportinglife"
 * Signal: 3 or more fractional odds in a single line.
 */
function isConcatenatedLine(line) {
  return (line.match(/\d+\/\d+/g) || []).length >= 3;
}

/**
 * splitConcatenatedRunners(line) → string[]
 * Splits a concatenated runner line into tab-separated "gate\tname\todds" strings.
 * Strips #HorseSP prefix and trailing "sportinglife" attribution.
 * NR horses (no odds) are naturally skipped — no match found.
 */
function splitConcatenatedRunners(line) {
  const cleaned = line
    .replace(/^#HorseSP\s*/i, '')
    .replace(/sportinglife.*$/i, '')
    .trim();
  const entries = [];
  // Non-greedy denominator + lookahead: stops the denominator from consuming
  // the first digit(s) of the next gate number.
  // e.g. "2/1" in "2/111Talk" → denominator "1", lookahead sees "11T" ✓
  // e.g. "13/8" in "13/84Lulamba" → denominator "8", lookahead sees "4L" ✓
  const re = /(\d{1,2})([A-Za-z][A-Za-z\s''\u2019\u2018\-\.&]*?)(\d+\/\d+?)(?=\d{1,2}[A-Za-z]|$)/g;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    entries.push(`${m[1]}\t${m[2].trim()}\t${m[3]}`);
  }
  return entries;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * parseRaceCardText(text) → { races }
 *
 * @param  {string}  text  – raw pasted text from a race card or results sheet
 * @returns {{ races: Array }}
 */
/**
 * detectOneFieldPerLine(lines) → boolean
 * Returns true if the data looks like gate / name / odds each on their own line
 * e.g.:  "1\nBaron Noir\n28/1\n2\nEachtotheirown\n40/1\n..."
 */
function detectOneFieldPerLine(lines) {
  const nonEmpty = lines.map(l => l.trim()).filter(Boolean);
  if (nonEmpty.length < 6) return false;
  // Check triplet pattern: digit, non-digit, odds
  let matches = 0;
  for (let i = 0; i + 2 < nonEmpty.length; i += 3) {
    const isGate  = /^\d{1,2}$/.test(nonEmpty[i]);
    const hasOdds = FRAC_ODDS_RE.test(nonEmpty[i + 2]) || parseDecimalOdds(nonEmpty[i + 2]) !== null;
    if (isGate && hasOdds) matches++;
  }
  return matches >= 2;
}

/**
 * mergeOneFieldPerLine(lines) → string[]
 * Collapses triplet-per-line format into single-line "gate  name  odds" entries.
 */
function mergeOneFieldPerLine(lines) {
  const nonEmpty = lines.map(l => l.trim()).filter(Boolean);
  const merged = [];
  let i = 0;
  while (i < nonEmpty.length) {
    const a = nonEmpty[i];
    // If this looks like a gate number and we have two more lines, merge them
    if (/^\d{1,2}$/.test(a) && i + 2 < nonEmpty.length) {
      merged.push(`${a}\t${nonEmpty[i + 1]}\t${nonEmpty[i + 2]}`);
      i += 3;
    } else {
      merged.push(a);
      i++;
    }
  }
  return merged;
}

export function parseRaceCardText(text) {
  let lines = text.split(/\r?\n/);

  // Pre-process: if each field is on its own line (mobile copy-paste format),
  // collapse triplets into single-line "gate  name  odds" entries
  if (detectOneFieldPerLine(lines)) {
    lines = mergeOneFieldPerLine(lines);
  }

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

    // ── Skip line (source attribution, image caption, non-runner etc) ──
    if (isSkipLine(line)) continue;
    if (NR_LINE_RE.test(line)) continue;  // e.g. "(5 Mambonumberfive — NR)"

    // ── Concatenated runner line (Sporting Life mobile: all runners on one line) ──
    if (isConcatenatedLine(line)) {
      const entries = splitConcatenatedRunners(line);
      for (const entry of entries) {
        const cols = entry.split('\t');
        const gate = parseInt(cols[0], 10);
        const horseName = cleanHorseName(cols[1]);
        const decimalOdds = parseOdds(cols[2]);
        if (isNaN(gate) || gate < 1 || !horseName || decimalOdds === null) continue;
        current.runners.push({ gatePosition: gate, horseName, decimalOdds });
      }
      continue;
    }

    // ── Race name line ──
    if (isRaceNameLine(line)) {
      // Strip time prefix: "13:20 — Race Name" or "13:20 Race Name"
      const timePrefixed = line.match(/^\d{1,2}:\d{2}\s*(?:\u2014\s*)?(.+)/);
      const raceName = timePrefixed ? timePrefixed[1].trim() : line;
      // Only start a new race block if the current one has runners,
      // or if it still has the default name (avoid orphan empty blocks)
      if (current.runners.length > 0) {
        initRace(raceName);
      } else {
        // Update the name of the still-empty current race
        current.raceName = raceName;
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
