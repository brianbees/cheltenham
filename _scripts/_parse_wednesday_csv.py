"""
Parse Wednesday race card CSV into clean race card text for Race Day panel.
Structure:
  - Row 14 (0-indexed 13): race names
  - Runner blocks start at row 36 (0-indexed 35)
  - Each block = 11 rows, within each:
      offset 0: gate "N(0)"
      offset 2: horse name
      offset 4: fractional odds
"""
import csv
import re

CSV_PATH = r"c:\Users\Brian\Documents\Cheltenham_vscode\chelt wednsday races and odds - Sheet2.csv"
OUT_PATH = r"c:\Users\Brian\Documents\Cheltenham_vscode\_scripts\_wednesday_racecard.txt"

GATE_RE  = re.compile(r'^(\d+)\(\d+\)$')    # e.g. "12(0)"
FRAC_RE  = re.compile(r'^\d+[/\-]\d+$')      # e.g. "9/4" or "9-1"

def is_gate(cell):
    return bool(GATE_RE.match(cell.strip()))

def parse_gate(cell):
    return int(GATE_RE.match(cell.strip()).group(1))

def is_odds(cell):
    c = cell.strip()
    return bool(FRAC_RE.match(c))

def normalise_odds(cell):
    """Return "N/D" string (replace dash with slash)."""
    return cell.strip().replace('-', '/')

# Read all rows
with open(CSV_PATH, newline='', encoding='utf-8-sig') as f:
    rows = list(csv.reader(f))

# Row 13 (0-indexed) = race names
race_names = [c.strip() for c in rows[13]]
print("Race names:", race_names)

NUM_RACES = 7
BLOCK_START = 35   # 0-indexed row 36
BLOCK_SIZE  = 11

# Collect runners per race: list of (gate, horse, odds)
runners = [[] for _ in range(NUM_RACES)]

block_num = 0
while True:
    gate_row_idx  = BLOCK_START + block_num * BLOCK_SIZE
    horse_row_idx = gate_row_idx + 2
    odds_row_idx  = gate_row_idx + 4

    if gate_row_idx >= len(rows) or odds_row_idx >= len(rows):
        break

    gate_row  = rows[gate_row_idx]
    horse_row = rows[horse_row_idx]
    odds_row  = rows[odds_row_idx]

    any_valid = False
    for col in range(NUM_RACES):
        gate_cell  = gate_row[col]  if col < len(gate_row)  else ''
        horse_cell = horse_row[col] if col < len(horse_row) else ''
        odds_cell  = odds_row[col]  if col < len(odds_row)  else ''

        if is_gate(gate_cell) and is_odds(odds_cell) and horse_cell.strip():
            gate  = parse_gate(gate_cell)
            horse = horse_cell.strip()
            odds  = normalise_odds(odds_cell)
            runners[col].append((gate, horse, odds))
            any_valid = True

    if not any_valid:
        print(f"Block {block_num} (row {gate_row_idx+1}): no valid runners found — stopping")
        break

    block_num += 1

# Print summary
print()
for col in range(NUM_RACES):
    print(f"  {race_names[col]}: {len(runners[col])} runners")

# ── Schedule mapping (display name → dataName) ──────────────────────────────
# Matches schedule.js Wednesday entries
SCHEDULE = [
    ("13:20", "Turner's Novices' Hurdle",          "Ballymore Novices Hurdle"),
    ("14:00", "Brown Advisory Novices' Chase",     "Brown Advisory Novices Chase"),
    ("14:40", "BetMGM Cup Hurdle (Coral Cup)",     "Coral Cup"),
    ("15:20", "Glenfarclas Cross Country Chase",   "Cross Country Chase"),
    ("16:00", "Champion Chase",                    "Queen Mother Champion Chase"),
    ("16:40", "Grand Annual Chase",                "Grand Annual"),
    ("17:20", "Champion Bumper",                   "Champion Bumper"),
]

# Build output text
output_lines = []
for col, (time, display, data_name) in enumerate(SCHEDULE):
    rlist = runners[col]
    output_lines.append(f"{time} — {display}")
    for (gate, horse, odds) in rlist:
        output_lines.append(f"{gate}  {horse}  {odds}")
    output_lines.append("")

output_text = "\n".join(output_lines)

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write(output_text)

print(f"\nOutput written to: {OUT_PATH}")
print("\n" + "="*60)
print(output_text)
