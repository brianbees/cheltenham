"""
export_data.py
==============
Exports all data from historicalData.js into a CSV file.

Output columns:
  Year, Date, Race Name, Race Type, Field Size, Course,
  Position, Draw, Horse Name, SP (Decimal), Jockey, Trainer

Run from workspace root:
  python export_data.py

Output:
  historicalData_export.csv
"""

import re
import csv

JS_PATH  = 'src/data/historicalData.js'
OUT_PATH = 'historicalData_export.csv'

print(f'Reading {JS_PATH} ...')
with open(JS_PATH, encoding='utf-8') as f:
    js_text = f.read()

# ─── Parse year blocks ────────────────────────────────────────────────────────

rows = []

year_blocks = list(re.finditer(r'^\s+(\d{4}):\s*\{', js_text, re.MULTILINE))

for i, ym in enumerate(year_blocks):
    year_str  = ym.group(1)
    start_pos = ym.start()
    end_pos   = year_blocks[i+1].start() if i+1 < len(year_blocks) else len(js_text)
    year_block = js_text[start_pos:end_pos]

    # Date
    date_m = re.search(r'date:\s*"([^"]+)"', year_block)
    date_str = date_m.group(1) if date_m else ''

    # Find each race block
    race_starts = list(re.finditer(r'\{\s*\n\s*raceName:', year_block))

    for j, rm in enumerate(race_starts):
        race_end   = race_starts[j+1].start() if j+1 < len(race_starts) else len(year_block)
        race_block = year_block[rm.start():race_end]

        raceName_m  = re.search(r'raceName:\s*"([^"]+)"',  race_block)
        raceType_m  = re.search(r'raceType:\s*"([^"]+)"',  race_block)
        fieldSize_m = re.search(r'fieldSize:\s*(\d+|null)', race_block)

        race_name  = raceName_m.group(1)  if raceName_m  else ''
        race_type  = raceType_m.group(1)  if raceType_m  else ''
        field_size = fieldSize_m.group(1) if fieldSize_m else ''
        if field_size == 'null':
            field_size = ''

        # Parse field[] — primary source (all horses)
        field_m = re.search(r'field:\s*\[(.*?)\]', race_block, re.DOTALL)
        if field_m:
            for hm in re.finditer(
                r'\{\s*gatePosition:\s*(\d+|null)\s*,\s*horseName:\s*"([^"]+)"\s*,\s*'
                r'sp:\s*([0-9.]+|null)\s*,\s*finishPosition:\s*(\d+|null)'
                r'(?:.*?jockey:\s*"([^"]*)")?'
                r'(?:.*?trainer:\s*"([^"]*)")?',
                field_m.group(1), re.DOTALL
            ):
                gate      = hm.group(1) if hm.group(1) != 'null' else ''
                horse     = hm.group(2)
                sp_raw    = hm.group(3) if hm.group(3) != 'null' else ''
                position  = hm.group(4) if hm.group(4) != 'null' else ''
                jockey    = hm.group(5) or ''
                trainer   = hm.group(6) or ''

                rows.append({
                    'Year':        year_str,
                    'Date':        date_str,
                    'Race Name':   race_name,
                    'Race Type':   race_type,
                    'Field Size':  field_size,
                    'Course':      'Cheltenham',
                    'Position':    position,
                    'Draw':        gate,
                    'Horse Name':  horse,
                    'SP (Decimal)': sp_raw,
                    'Jockey':      jockey,
                    'Trainer':     trainer,
                })

# ─── Write CSV ────────────────────────────────────────────────────────────────

COLUMNS = [
    'Year', 'Date', 'Race Name', 'Race Type', 'Field Size', 'Course',
    'Position', 'Draw', 'Horse Name', 'SP (Decimal)', 'Jockey', 'Trainer',
]

with open(OUT_PATH, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=COLUMNS)
    writer.writeheader()
    writer.writerows(rows)

print(f'Written {len(rows)} rows to {OUT_PATH}')
print(f'Years covered: {sorted(set(r["Year"] for r in rows))}')
print(f'Races covered: {len(set((r["Year"], r["Race Name"]) for r in rows))} (year, race) slots')
