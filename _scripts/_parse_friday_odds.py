"""
_parse_friday_odds.py

Reads a William Hill odds CSV (same format as "chelt frid odds - Sheet1.csv")
and outputs the ODDS constant ready to paste into FridayRacecardPanel.jsx.

Usage:
    python _scripts/_parse_friday_odds.py "chelt frid odds - Sheet1.csv"

    Or drop the file path into the variable below and run without arguments.

Output: the ODDS = { ... } block printed to stdout.
"""

import csv
import re
import sys
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

DEFAULT_FILE = "chelt frid odds - Sheet1.csv"

# Column indices (0-based) in the runner data rows
COL_NO   = 0   # Horse number
COL_ODDS = 6   # Win/EW price (e.g. "4/1", "7/2", "Evs")

# ── Helpers ───────────────────────────────────────────────────────────────────

TIME_RE = re.compile(r'^(\d{2}:\d{2})\s+Cheltenham', re.IGNORECASE)

def is_time_row(cell):
    return bool(TIME_RE.match(cell.strip()))

def extract_time(cell):
    return TIME_RE.match(cell.strip()).group(1)

def clean_no(val):
    """Return integer horse number or None."""
    val = val.strip().split()[0]       # strip any suffix like "NR"
    try:
        return int(val)
    except ValueError:
        return None

def clean_odds(val):
    """Normalise odds string: strip whitespace/newlines, convert EVS→Evs."""
    if not val:
        return None
    val = val.strip().splitlines()[0].strip()   # take first line if multiline
    val = re.sub(r'(?i)^evs$', 'Evs', val)
    return val if val else None

# ── Main ──────────────────────────────────────────────────────────────────────

def parse(filepath):
    results = {}          # { "HH:MM": { horse_no: odds_str } }
    current_time = None
    in_runners = False    # True once we've seen the "No.," header for a race

    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        for row in reader:
            if not row:
                continue

            cell0 = row[0].strip() if row else ''

            # Detect race time header
            if is_time_row(cell0):
                current_time = extract_time(cell0)
                results[current_time] = {}
                in_runners = False
                continue

            # Detect the column-header row that precedes runners
            if cell0 == 'No.' and current_time:
                in_runners = True
                continue

            # After we've seen the header, stop at 'Non-runners' or next section
            if in_runners and cell0 in ('Non-runners', 'X', 'Previous results'):
                in_runners = False
                continue

            # Parse runner rows
            if in_runners and current_time:
                no = clean_no(cell0)
                if no is None:
                    continue   # skip non-runner rows, blank rows, notes
                if len(row) <= COL_ODDS:
                    continue
                odds = clean_odds(row[COL_ODDS])
                if odds:
                    results[current_time][no] = odds

    return results

def render(results):
    lines = ['const ODDS = {']
    for time, runners in sorted(results.items()):
        entries = ', '.join(
            f"{no}:'{odds}'"
            for no, odds in sorted(runners.items())
        )
        lines.append(f"  '{time}': {{ {entries} }},")
    lines.append('};')
    return '\n'.join(lines)

if __name__ == '__main__':
    filepath = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE
    filepath = Path(filepath)
    if not filepath.exists():
        print(f"ERROR: file not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    results = parse(filepath)
    print(render(results))
    print(f"\n// Parsed {sum(len(v) for v in results.values())} runners across {len(results)} races", file=sys.stderr)
