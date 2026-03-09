"""
import_mares_novices.py — import Mares' Novices' Hurdle into historicalData.js
Reads the source CSV, extracts the race for 2016-2024, injects into historicalData.js.
"""
import csv, re, os, shutil

CSV_PATH = "datafromvscode - historicalData_export (2).csv"
JS_PATH  = "src/data/historicalData.js"
CANON    = "Mares' Novices' Hurdle"

def is_mares_novices(name):
    n = name.lower()
    return "mares" in n and "novices" in n and "hurdle" in n

# ── Read CSV ──────────────────────────────────────────────────────────────────
years_data = {}  # year -> list of horse rows
with open(CSV_PATH, encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        race = row.get('Race Name', '').strip()
        if not is_mares_novices(race):
            continue
        year = row.get('Year', '').strip()
        if not year:
            continue
        if year not in years_data:
            years_data[year] = {'raceType': None, 'fieldSize': None, 'horses': []}
        # raceType / fieldSize from first valid row
        if years_data[year]['raceType'] is None:
            years_data[year]['raceType'] = row.get('Race Type', '').strip() or "Mares Novices Hurdle - Grade 2"
        fs = row.get('Field Size', '').strip()
        if fs and fs.isdigit():
            years_data[year]['fieldSize'] = int(fs)
        pos_raw  = row.get('Position', '').strip()
        draw_raw = row.get('Draw', '').strip()
        horse    = row.get('Horse Name', '').strip()
        sp_raw   = row.get('SP (Decimal)', '').strip()
        jockey   = row.get('Jockey', '').strip()
        trainer  = row.get('Trainer', '').strip()
        if not horse or not sp_raw:
            continue
        try:
            sp = float(sp_raw)
        except ValueError:
            continue
        try:
            pos = int(pos_raw) if pos_raw and pos_raw not in ('F','P','U','R','NR','BD','SU') else None
        except ValueError:
            pos = None
        try:
            gate = int(draw_raw) if draw_raw else None
        except ValueError:
            gate = None
        years_data[year]['horses'].append({
            'gate': gate, 'horse': horse, 'sp': sp,
            'pos': pos, 'jockey': jockey, 'trainer': trainer,
        })

if not years_data:
    print("ERROR: no Mares Novices Hurdle rows found in CSV")
    exit(1)

print(f"Found data for years: {sorted(years_data.keys())}")

# ── Build JS blocks ──────────────────────────────────────────────────────────
def js_str(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def build_race_block(race_data):
    raceType  = js_str(race_data['raceType'])
    fieldSize = race_data['fieldSize'] or len(race_data['horses'])
    horses    = race_data['horses']

    # top3 = first three finishing positions
    placed = sorted([h for h in horses if h['pos'] and h['pos'] <= 3], key=lambda h: h['pos'])
    top3_lines = []
    for h in placed:
        gate  = h['gate'] if h['gate'] is not None else 'null'
        top3_lines.append(
            f"          {{ gatePosition: {gate:>2}, horseName: \"{js_str(h['horse'])}\""
            f", sp: {h['sp']},  jockey: \"{js_str(h['jockey'])}\",  trainer: \"{js_str(h['trainer'])}\" }},"
        )

    field_lines = []
    for h in sorted(horses, key=lambda h: (h['gate'] or 999, h['horse'])):
        gate = h['gate'] if h['gate'] is not None else 'null'
        pos  = h['pos']  if h['pos']  is not None else 'null'
        field_lines.append(
            f"          {{ gatePosition: {gate:>2}, horseName: \"{js_str(h['horse'])}\""
            f", sp: {h['sp']},  finishPosition: {pos},  jockey: \"{js_str(h['jockey'])}\",  trainer: \"{js_str(h['trainer'])}\" }},"
        )

    top3_str  = '\n'.join(top3_lines)  or "          // no top3 data"
    field_str = '\n'.join(field_lines) or "          // no field data"

    return (
        f"      {{\n"
        f"        raceName: \"{CANON}\",\n"
        f"        raceType: \"{raceType}\",\n"
        f"        fieldSize: {fieldSize},\n"
        f"        top3: [\n"
        f"{top3_str}\n"
        f"        ],\n"
        f"        field: [\n"
        f"{field_str}\n"
        f"        ],\n"
        f"      }},"
    )

# ── Inject into historicalData.js ────────────────────────────────────────────
data = open(JS_PATH, encoding='utf-8').read()
shutil.copy(JS_PATH, JS_PATH + '.bak_mares_novices')

injected = 0
for year in sorted(years_data.keys()):
    race_data = years_data[year]
    if not race_data['horses']:
        print(f"  {year}: no horses, skipping")
        continue
    # check if already present
    if f'"{CANON}"' in data[data.find(f'{year}:'):data.find(f'{year}:') + 50000]:
        print(f"  {year}: already present, skipping")
        continue

    race_block = build_race_block(race_data)

    # find the year block and insert after its opening brace
    # find "  YEAR: {" then find the first "races: [" after it, 
    # then insert before the closing "]," of races
    year_re = re.search(rf'^\s+{year}:\s*\{{', data, re.MULTILINE)
    if not year_re:
        print(f"  {year}: year block not found in JS, skipping")
        continue

    # find "races: [" after year block start
    races_start = data.find('races: [', year_re.start())
    if races_start < 0:
        print(f"  {year}: races: [ not found, skipping")
        continue

    # find matching closing "]," for races array
    depth = 0
    idx = races_start + len('races: [')
    while idx < len(data):
        if data[idx] == '[': depth += 1
        elif data[idx] == ']':
            if depth == 0:
                races_close = idx
                break
            depth -= 1
        idx += 1

    # Insert race block before the closing ]
    data = data[:races_close] + race_block + '\n      ' + data[races_close:]
    print(f"  {year}: injected {len(race_data['horses'])} horses")
    injected += 1

if injected > 0:
    open(JS_PATH, 'w', encoding='utf-8').write(data)
    # verify braces
    opens  = data.count('{')
    closes = data.count('}')
    print(f"\nDone. Injected {injected} year(s).")
    print(f"Brace check: {{ {opens}  }} {closes}  {'OK' if opens == closes else 'MISMATCH!'}")
else:
    print("\nNothing to inject — all years already present or no data found.")
