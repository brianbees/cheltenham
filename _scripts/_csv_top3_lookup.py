"""
_csv_top3_lookup.py
====================
Cross-references the archive CSV against historicalData.js to find which
TOP3_SECOND_MISMATCH / TOP3_THIRD_MISMATCH issues can be fixed from CSV data.

Outputs:
  - Summary of how many mismatches the CSV can resolve
  - _csv_top3_fixes.py  (ready to run to apply the fixes)
"""

import csv
import json
import re
import os

# ─── Config ───────────────────────────────────────────────────────────────────

CSV_PATH = r"_archive\datafromvscode - historicalData_export (2).csv"
JS_PATH  = r"src\data\historicalData.js"
OUT_SCRIPT = r"_csv_top3_fixes.py"

COUNTRY_RE = re.compile(
    r'\s*\((FR|IRE|GB|USA|GER|NZ|AUS|CZE|ITA|ITY|SPA|POL|CHI|ARG|SAF|BEL|JPN|SWI)\)\s*$',
    re.IGNORECASE
)

def strip_country(name):
    return COUNTRY_RE.sub('', name).strip()

def norm(name):
    """Normalise for matching — lowercase, strip country code, collapse spaces."""
    return ' '.join(strip_country(name).lower().split())


# ─── Step 1: Load CSV into lookup ────────────────────────────────────────────
# Structure: csv_top3[year][race_name_norm][position] = {horseName, sp, jockey, trainer, draw}

csv_top3 = {}
csv_race_names = {}  # norm → original for display

with open(CSV_PATH, newline='', encoding='utf-8-sig') as f:
    for row in csv.DictReader(f):
        pos_str = row.get('Position', '').strip()
        if pos_str not in ('1', '2', '3'):
            continue
        year = row['Year'].strip()
        race_raw = row['Race Name'].strip()
        race_norm = norm(race_raw)
        pos = int(pos_str)

        sp_raw = row.get('SP (Decimal)', '').strip()
        try:
            sp = float(sp_raw)
        except ValueError:
            sp = None

        csv_top3.setdefault(year, {}).setdefault(race_norm, {})[pos] = {
            'horseName': row['Horse Name'].strip(),
            'sp':        sp,
            'jockey':    row.get('Jockey', '').strip(),
            'trainer':   row.get('Trainer', '').strip(),
            'draw':      row.get('Draw', '').strip(),
        }
        csv_race_names.setdefault(year, {})[race_norm] = race_raw

print(f"CSV loaded: {sum(len(v) for yr in csv_top3.values() for v in yr.values())} top-3 entries across {sum(len(v) for v in csv_top3.values())} races")


# ─── Step 2: Parse historicalData.js ─────────────────────────────────────────
# We eval the JS as Python-like data using a lightweight regex approach.
# Actually, we use node to dump it as JSON.

import subprocess, sys

# Dump races to JSON via the .mjs helper
result = subprocess.run(['node', '_export_races.mjs'], capture_output=True, text=True)
if result.returncode != 0:
    print("ERROR running _export_races.mjs:", result.stderr[:500])
    sys.exit(1)
print(result.stdout.strip())

with open('_races_dump.json', encoding='utf-8') as f:
    races = json.load(f)

os.unlink('_races_dump.json')
print(f"JS loaded: {len(races)} races across {len(set(r['year'] for r in races))} years")


# ─── Step 3: Find mismatches and look them up in CSV ─────────────────────────

# Build a name->gatePos lookup per race for re-matching
def make_field_lookup(field):
    """Returns norm(name) -> horse dict"""
    return {norm(h['horseName']): h for h in field if h.get('horseName')}

MATCH  = []   # can fix from CSV
NO_CSV = []   # mismatch but no CSV data
NO_FIELD = [] # CSV has data but horse not in field[]

def check_top3(race, pos_index, label):
    """Check if top3[pos_index] matches the CSV for this position (1-based: pos_index+1)."""
    year  = race['year']
    rname = race['raceName']
    top3  = race['top3']
    field = race['field']

    if pos_index >= len(top3):
        return

    js_entry  = top3[pos_index]
    js_name   = js_entry.get('horseName', '')
    pos_num   = pos_index + 1  # 1-based

    # Find the winner to identify the race correctly
    winner = next((h for h in top3 if h.get('horseName')), {})

    # Look up in CSV
    race_norm = norm(rname)
    year_data = csv_top3.get(year, {})

    # Try exact race name match first, then partial
    csv_race = year_data.get(race_norm)
    if csv_race is None:
        # Try substring match
        for k, v in year_data.items():
            if race_norm in k or k in race_norm:
                csv_race = v
                break

    if csv_race is None or pos_num not in csv_race:
        NO_CSV.append({
            'year': year, 'race': rname, 'pos': pos_num,
            'js_name': js_name, 'note': 'No CSV data for this race/position'
        })
        return

    csv_entry = csv_race[pos_num]
    csv_name  = csv_entry['horseName']

    # Check if they match (normalised)
    if norm(csv_name) == norm(js_name):
        return  # already correct

    # Find the CSV horse in the JS field
    field_lookup = make_field_lookup(field)
    csv_name_norm = norm(csv_name)

    # Try strip-country match too
    field_match = field_lookup.get(csv_name_norm)
    if field_match is None:
        # Try partial
        for fn, fh in field_lookup.items():
            if csv_name_norm in fn or fn in csv_name_norm:
                field_match = fh
                break

    if field_match is None:
        NO_FIELD.append({
            'year': year, 'race': rname, 'pos': pos_num,
            'js_name': js_name, 'csv_name': csv_name,
            'note': 'CSV horse not found in JS field[]'
        })
        return

    MATCH.append({
        'year':      year,
        'race':      rname,
        'pos':       pos_num,
        'old_name':  js_name,
        'old_gate':  js_entry.get('gatePosition'),
        'new_name':  field_match['horseName'],  # use the JS field name (has country codes)
        'new_gate':  field_match['gatePosition'],
        'new_sp':    field_match.get('sp') or csv_entry['sp'],
        'new_jockey':   field_match.get('jockey') or csv_entry['jockey'],
        'new_trainer':  field_match.get('trainer') or csv_entry['trainer'],
        'csv_name':  csv_name,
    })

for race in races:
    top3 = race['top3']
    field = race['field']
    if len(top3) < 2:
        continue

    # Check position 2 (index 1)
    if len(top3) > 1:
        check_top3(race, 1, 'TOP3_SECOND')
    # Check position 3 (index 2)
    if len(top3) > 2:
        check_top3(race, 2, 'TOP3_THIRD')


# ─── Step 4: Report ──────────────────────────────────────────────────────────

print(f"\n{'='*60}")
print(f"Fixable from CSV:          {len(MATCH):>4}")
print(f"Mismatch but no CSV data:  {len(NO_CSV):>4}")
print(f"CSV has data but unknown:  {len(NO_FIELD):>4}")
print(f"{'='*60}\n")

if NO_FIELD:
    print("=== CSV horse not found in JS field[] (sample) ===")
    for item in NO_FIELD[:10]:
        print(f"  {item['year']} {item['race']} pos={item['pos']}: CSV={item['csv_name']} | {item['note']}")

if NO_CSV:
    print(f"\n=== No CSV data ({len(NO_CSV)} races) ===")
    for item in NO_CSV[:10]:
        print(f"  {item['year']} {item['race']} pos={item['pos']}: JS={item['js_name']}")

print(f"\n=== Sample fixable ===")
for item in MATCH[:20]:
    print(f"  {item['year']} {item['race']} pos={item['pos']}: {item['old_name']!r} → {item['new_name']!r} (gate {item['new_gate']})")


# ─── Step 5: Generate fix script ─────────────────────────────────────────────

if not MATCH:
    print("\nNo fixes to generate.")
else:
    print(f"\nGenerating {OUT_SCRIPT} with {len(MATCH)} fixes...")

    fix_lines = [
        '"""',
        '_csv_top3_fixes.py — Auto-generated top3 fix script from archive CSV data',
        f'Fixes {len(MATCH)} TOP3 second/third mismatches.',
        '"""',
        'import re, sys',
        '',
        'JS_PATH = r"src\\data\\historicalData.js"',
        '',
        'with open(JS_PATH, encoding="utf-8") as f:',
        '    src = f.read()',
        '',
        'original = src',
        'fixes = 0',
        '',
    ]

    # Group by year+race to apply fixes together
    from collections import defaultdict
    by_race = defaultdict(list)
    for item in MATCH:
        by_race[(item['year'], item['race'])].append(item)

    # Simpler approach: just generate the replacements as a list
    fix_lines = [
        '"""',
        '_csv_top3_fixes.py — Auto-generated top3 fix script from archive CSV data',
        f'Fixes {len(MATCH)} TOP3 second/third mismatches.',
        '"""',
        'import re',
        '',
        'JS_PATH = r"src\\data\\historicalData.js"',
        '',
        'with open(JS_PATH, encoding="utf-8") as f:',
        '    src = f.read()',
        '',
        'original = src',
        'fixes = 0',
        'not_found = 0',
        '',
        'REPLACEMENTS = [',
        '    # (year, race, pos, old_horseName, old_gatePosition, new_gatePosition, new_horseName, new_sp, new_jockey, new_trainer)',
    ]

    for item in MATCH:
        fix_lines.append(
            f'    ({item["year"]!r}, {item["race"]!r}, {item["pos"]!r}, '
            f'{item["old_name"]!r}, {item["old_gate"]!r}, '
            f'{item["new_gate"]!r}, {item["new_name"]!r}, '
            f'{item["new_sp"]!r}, {item["new_jockey"]!r}, {item["new_trainer"]!r}),'
        )

    fix_lines += [
        ']',
        '',
        'for (year, race, pos, old_name, old_gate, new_gate, new_name, new_sp, new_jockey, new_trainer) in REPLACEMENTS:',
        '    # Match the specific top3 entry by gatePosition + horseName',
        '    old_gate_str = str(old_gate).rjust(2) if old_gate is not None else " ?"',
        '    # Build regex to find the top3 entry line',
        '    name_esc = re.escape(old_name)',
        '    pat = re.compile(',
        r'        r\'{ gatePosition:\s+\' + re.escape(old_gate_str.strip()) + r\',\s+horseName:\s+"\'  + name_esc + r\'"\',',
        '    )',
        '    # Build replacement (preserve the leading whitespace from the match)',
        '    sp_str = f"{new_sp:.1f}" if isinstance(new_sp, float) else str(new_sp)',
        '    new_entry = (',
        '        f\'{{ gatePosition: {str(new_gate).rjust(2)}, horseName: "{new_name:<40}", \'',
        '        f\'sp: {sp_str},  jockey: "{new_jockey}",  trainer: "{new_trainer}" }}\'',
        '    )',
        '    m = pat.search(src)',
        '    if m:',
        '        src = src[:m.start()] + new_entry + src[m.end():]',
        '        fixes += 1',
        '    else:',
        '        print(f"NOT FOUND: {year} {race} pos={pos} gate={old_gate} {old_name!r}")',
        '        not_found += 1',
        '',
        'print(f"Fixes applied: {fixes}, Not found: {not_found}")',
        '',
        'if fixes > 0:',
        '    with open(JS_PATH, "w", encoding="utf-8") as f:',
        '        f.write(src)',
        '    print(f"Written {JS_PATH}")',
        'else:',
        '    print("No changes made.")',
    ]

    with open(OUT_SCRIPT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(fix_lines) + '\n')
    print(f"Written {OUT_SCRIPT}")

print("\nDone.")
