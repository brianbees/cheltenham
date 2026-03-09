"""
convert.py  —  Champion Tipster Data Merger
============================================

What this script does:
  1. Reads the existing historicalData.js (preserves all SP values, gate positions,
     top3, leaderboard — everything already in the JS stays intact)
  2. Reads the CSV (Cleaned Data sheet)
  3. For years already in the JS (2006+): adds jockey, trainer, raceType, time
     to each horse in `field`, matched by year + raceType + horse name
  4. For new years (2002–2005): builds complete year blocks from the CSV
  5. Writes a new historicalData.js with all years sorted chronologically

Usage:
  Run from the workspace root (C:\\Users\\Brian\\Documents\\Cheltenham_vscode):
    python convert.py

  Output:
    src/data/historicalData_new.js   (ready to review, then rename to historicalData.js)

Notes:
  - SP values in the JS are KEPT AS-IS (CSV SPs are unreliable for existing years)
  - Horse name matching strips country codes e.g. (IRE), (FR) from CSV names
  - Non-finishers (F, PU, UR, BD, RO etc) get finishPosition: null
  - New years (2002-2005) use CSV SPs since no JS data exists for them
  - leaderboard is set to [] for 2002-2005 (no group competition data)
"""

import csv
import math
import re

# ─── Config ───────────────────────────────────────────────────────────────────

JS_INPUT   = 'src/data/historicalData.js'
CSV_INPUT  = 'Copy of Gold Cup Day 2022 Results - Cleaned Data.csv'
JS_OUTPUT  = 'src/data/historicalData_new.js'

# Country code suffix pattern — strips (IRE), (FR), (GB) etc from CSV horse names
COUNTRY_RE = re.compile(r'\s*\((FR|IRE|GB|USA|GER|NZ|AUS|CZE|ITA|ITY|SPA|POL|CHI|ARG|SAF|BEL|JPN|SWI)\)\s*$', re.IGNORECASE)

# Finish positions that mean "did not finish"
DNF_POSITIONS = {'F', 'PU', 'UR', 'BD', 'RO', 'SU', 'CO', 'REF', 'DSQ', 'NR', 'N/A', ''}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def strip_country(name):
    """Remove trailing country code from horse name."""
    return COUNTRY_RE.sub('', name).strip()

def normalise_name(name):
    """Lowercase + strip country + collapse whitespace for fuzzy matching."""
    return ' '.join(strip_country(name).lower().split())

def parse_finish_position(pos_str):
    """Convert position string to int or None."""
    pos = pos_str.strip()
    if pos in DNF_POSITIONS:
        return None
    try:
        return int(pos)
    except ValueError:
        return None

def parse_sp(sp_str):
    """Parse SP string to float, return None if invalid."""
    try:
        val = float(sp_str.strip())
        return val if val > 0 else None
    except (ValueError, AttributeError):
        return None

def format_sp(sp):
    """Format SP as JS number literal — integer if whole, else float."""
    if sp is None:
        return 'null'
    if math.isclose(sp, round(sp), rel_tol=1e-9):
        return f'{round(sp)}.0'
    # Keep up to 1 decimal place (matching existing JS style)
    return f'{sp:.1f}'

def pad_name(name, width=36):
    """Pad horse name string for column alignment (width=36 handles long names)."""
    quoted = f'"{name}"'
    return quoted.ljust(width)

def pad_sp(sp_str, width=6):
    """Right-pad SP value."""
    return sp_str.rjust(width)

# ─── Step 1: Parse the CSV ────────────────────────────────────────────────────

print(f'Reading CSV: {CSV_INPUT}')

# Build lookup: (year, normalised_horse_name) -> {jockey, trainer, raceType, time, sp, finishPosition, draw}
csv_lookup = {}   # (year, norm_name, raceType) -> row data
csv_years  = {}   # year -> { raceType -> [rows] }  for building new year blocks

with open(CSV_INPUT, newline='', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        year       = row['Year'].strip()
        horse_raw  = row['Horse Name'].strip()
        race_type  = row['Generic Race Type'].strip()
        norm_name  = normalise_name(horse_raw)
        jockey     = row['Jockey'].strip()
        trainer    = row['Trainer'].strip()
        time_str   = row['Time'].strip()
        draw       = row['Draw'].strip()
        sp_raw     = row['SP (Decimal)'].strip()
        pos_raw    = row['Position'].strip()
        race_name  = row['Race Name'].strip()
        date_str   = row['Date'].strip()

        sp             = parse_sp(sp_raw)
        finish_pos     = parse_finish_position(pos_raw)
        draw_int       = int(draw) if draw.isdigit() else None

        entry = {
            'horseName':      strip_country(horse_raw),
            'jockey':         jockey,
            'trainer':        trainer,
            'raceType':       race_type,
            'time':           time_str,
            'sp':             sp,
            'finishPosition': finish_pos,
            'draw':           draw_int,
            'raceName':       race_name,
            'date':           date_str,
            'year':           year,
        }

        # Lookup key for enriching existing JS horses
        key = (year, norm_name, race_type)
        if key in csv_lookup:
            print(f'  Warning: duplicate CSV row — {year} / {strip_country(horse_raw)} / {race_type} — keeping last')
        csv_lookup[key] = entry

        # Group by year and raceType for building new year blocks
        csv_years.setdefault(year, {}).setdefault(race_type, []).append(entry)

print(f'  Loaded {len(csv_lookup)} horse entries across years: {sorted(csv_years.keys())}')

# ─── Step 2: Read and parse existing JS ───────────────────────────────────────

print(f'Reading JS:  {JS_INPUT}')

with open(JS_INPUT, 'r', encoding='utf-8') as f:
    js_text = f.read()

# Extract the helper functions at the bottom (everything after the closing of historicalData)
# We'll re-append them unchanged
helpers_match = re.search(r'(// ─── Derived helpers.*)', js_text, re.DOTALL)
helpers_block = helpers_match.group(1) if helpers_match else ''

# ─── Step 3: Parse existing JS into structured Python objects ────────────────
# Uses regex against the known, consistent formatting of historicalData.js.
# Note: relies on consistent indentation — do not reformat historicalData.js
# before running this script.

# We'll regenerate the entire JS from scratch using the CSV for new years
# and the existing JS + CSV enrichment for existing years.

def parse_existing_js(js_text):
    """
    Extract all year blocks from historicalData.js into Python dicts.
    Returns: { year_int: { date, races: [...], leaderboard: [...] } }
    """
    years_data = {}

    # Find each top-level year block: 2006: { ... },
    year_blocks = re.finditer(r'(\d{4}):\s*\{', js_text)
    year_positions = [(m.group(1), m.start()) for m in year_blocks]

    for i, (year_str, start_pos) in enumerate(year_positions):
        # Find the matching closing brace for this year block
        end_pos = year_positions[i+1][1] if i+1 < len(year_positions) else len(js_text)
        block = js_text[start_pos:end_pos]

        # Extract date
        date_match = re.search(r'date:\s*"([^"]+)"', block)
        date_str = date_match.group(1) if date_match else ''

        # Extract leaderboard
        lb_match = re.search(r'leaderboard:\s*\[(.*?)\]', block, re.DOTALL)
        leaderboard = []
        if lb_match:
            lb_text = lb_match.group(1)
            for entry in re.finditer(r'\{\s*name:\s*"([^"]+)",\s*score:\s*(\d+)\s*\}', lb_text):
                leaderboard.append({'name': entry.group(1), 'score': int(entry.group(2))})

        # Extract races
        races = parse_races_from_block(block, year_str)

        years_data[int(year_str)] = {
            'date':        date_str,
            'races':       races,
            'leaderboard': leaderboard,
        }

    return years_data

def parse_races_from_block(block, year_str):
    """Extract race list from a year block."""
    races = []

    # Find each race block by raceName
    race_matches = list(re.finditer(r'\{\s*\n\s*raceName:', block))

    for i, rm in enumerate(race_matches):
        end = race_matches[i+1].start() if i+1 < len(race_matches) else len(block)
        race_block = block[rm.start():end]

        # raceName
        rn_match = re.search(r'raceName:\s*"([^"]+)"', race_block)
        race_name = rn_match.group(1) if rn_match else ''

        # fieldSize
        fs_match = re.search(r'fieldSize:\s*(\d+|null)', race_block)
        field_size = int(fs_match.group(1)) if fs_match and fs_match.group(1) != 'null' else None

        # raceType — may already exist in JS from a prior run
        rt_match = re.search(r'raceType:\s*"([^"]+)"', race_block)
        race_type = rt_match.group(1) if rt_match else None

        # top3
        top3_match = re.search(r'top3:\s*\[(.*?)\]', race_block, re.DOTALL)
        top3 = []
        if top3_match:
            for hm in re.finditer(
                r'\{\s*gatePosition:\s*(\d+|null),\s*horseName:\s*"([^"]+)"\s*,\s*sp:\s*([0-9.]+|null)',
                top3_match.group(1)
            ):
                top3.append({
                    'gatePosition': int(hm.group(1)) if hm.group(1) != 'null' else None,
                    'horseName':    hm.group(2),
                    'sp':           float(hm.group(3)) if hm.group(3) != 'null' else None,
                })

        # field
        field_match = re.search(r'field:\s*\[(.*?)\]', race_block, re.DOTALL)
        field = []
        if field_match:
            for hm in re.finditer(
                r'\{\s*gatePosition:\s*(\d+|null),\s*horseName:\s*"([^"]+)"\s*,\s*sp:\s*([0-9.]+|null)\s*,\s*finishPosition:\s*(\d+|null)',
                field_match.group(1)
            ):
                field.append({
                    'gatePosition':  int(hm.group(1)) if hm.group(1) != 'null' else None,
                    'horseName':     hm.group(2),
                    'sp':            float(hm.group(3)) if hm.group(3) != 'null' else None,
                    'finishPosition': int(hm.group(4)) if hm.group(4) != 'null' else None,
                    'jockey':        None,
                    'trainer':       None,
                })

        races.append({
            'raceName':  race_name,
            'fieldSize': field_size,
            'raceType':  race_type,
            'top3':      top3,
            'field':     field,
        })

    return races

print('Parsing existing JS...')
existing_years = parse_existing_js(js_text)
print(f'  Found years: {sorted(existing_years.keys())}')

# ─── Step 4: Enrich existing years with CSV jockey/trainer/raceType ───────────

print('Enriching existing years with jockey/trainer/raceType from CSV...')

enrich_matched   = 0
enrich_unmatched = []  # (year, raceName, horseName)

for year_int, year_data in existing_years.items():
    year_str = str(year_int)
    if year_str not in csv_years:
        continue

    for race in year_data['races']:
        # Find raceType from CSV by matching race horses
        if not race['raceType']:
            # Try to determine raceType by matching a horse from this race's field
            for horse in race['field'][:5]:  # check first few horses
                norm = normalise_name(horse['horseName'])
                # Search all raceTypes for this year
                for rt, entries in csv_years[year_str].items():
                    for e in entries:
                        if normalise_name(e['horseName']) == norm:
                            race['raceType'] = rt
                            break
                    if race['raceType']:
                        break
                if race['raceType']:
                    break

        race_type = race['raceType'] or ''

        # Enrich each horse in field
        for horse in race['field']:
            norm = normalise_name(horse['horseName'])
            key  = (year_str, norm, race_type)
            csv_entry = csv_lookup.get(key)

            # Fallback: search without raceType constraint
            if not csv_entry:
                for rt in csv_years.get(year_str, {}):
                    alt_key = (year_str, norm, rt)
                    if alt_key in csv_lookup:
                        csv_entry = csv_lookup[alt_key]
                        if not race['raceType']:
                            race['raceType'] = rt
                        break

            if csv_entry:
                horse['jockey']  = csv_entry['jockey']
                horse['trainer'] = csv_entry['trainer']
                enrich_matched += 1
            else:
                enrich_unmatched.append((year_str, race['raceName'], horse['horseName']))

        # Also enrich top3 entries
        for horse in race['top3']:
            norm = normalise_name(horse['horseName'])
            for rt in csv_years.get(year_str, {}):
                alt_key = (year_str, norm, rt)
                if alt_key in csv_lookup:
                    csv_entry = csv_lookup[alt_key]
                    horse['jockey']  = csv_entry.get('jockey')
                    horse['trainer'] = csv_entry.get('trainer')
                    break

# Mismatch report
unmatched_count = len(enrich_unmatched)
if enrich_unmatched:
    print(f'  Matched: {enrich_matched}  |  Unmatched: {unmatched_count}')
    print('  Unmatched horses (no jockey/trainer data):')
    for yr, rn, hn in enrich_unmatched:
        print(f'    {yr}  {rn:<25}  {hn}')
else:
    print(f'  All {enrich_matched} horses matched successfully.')

# ─── Step 5: Build new year blocks for 2002–2005 ─────────────────────────────

print('Building new year blocks for 2002–2005...')

NEW_YEARS = [2002, 2003, 2004, 2005]

# Maps CSV Generic Race Type -> short raceName matching 2006+ convention
RACE_TYPE_TO_SHORT_NAME = {
    'Juvenile Hurdle - Grade 1 (Triumph, 4yo)':          'Triumph Hurdle',
    'Handicap Hurdle (County, 2m)':                      'County Hurdle',
    'Novice Hurdle - Grade 1 (Albert Bartlett, 3m)':     'Albert Bartlett',
    'Championship Chase - Grade 1 (Gold Cup)':           'Gold Cup',
    'Hunter Chase (Amateur, Foxhunter)':                  'Foxhunter Chase',
    'Conditional Jockeys Handicap Hurdle (Martin Pipe)': 'Martin Pipe',
    'Handicap Chase (Grand Annual, 2m)':                 'Grand Annual',
    "Amateur Handicap Chase (Kim Muir)":                 'Kim Muir',
    'Handicap Hurdle - Qualifier Final (Pertemps, 3m)':  'Pertemps Final',
    'Championship Chase - Grade 1 (Ryanair)':            'Ryanair Chase',
    "Championship Hurdle - Grade 1 (Stayers)":           "Stayers' Hurdle",
    'Handicap Chase (Plate, 2m4f)':                      'Plate Handicap Chase',
    "Mares Hurdle - Grade 1/2":                          "Dawn Run Mares' Hurdle",
    'Mares Chase - Grade 2':                             'Mares Chase',
    "Novice Chase - Grade 1/2 (Turners/JLT, 2m5f)":     "Turners Novices' Chase",
    'Novice Hurdle - Grade 1 (Supreme, 2m)':             'Supreme Novices Hurdle',
    'Novice Hurdle - Grade 1 (Ballymore, 2m5f)':         'Ballymore Novices Hurdle',
    'Novice Chase - Grade 1 (Arkle, 2m)':                'Arkle Challenge Trophy',
    'Novice Chase - Grade 1 (Brown Advisory, 3m)':       'Brown Advisory Novices Chase',
    'Championship Chase - Grade 1 (Queen Mother)':       'Queen Mother Champion Chase',
    'Championship Hurdle - Grade 1 (Champion Hurdle)':   'Champion Hurdle',
    'NH Flat / Bumper - Grade 1':                        'Champion Bumper',
    'Handicap Chase (Ultima, 3m1f)':                     'Ultima Handicap Chase',
    'Handicap Hurdle (Coral Cup, 2m5f)':                 'Coral Cup',
    'Cross Country Chase':                               'Cross Country Chase',
    'Juvenile Handicap Hurdle (Fred Winter, 4yo)':       'Fred Winter Juvenile Hurdle',
    'Novice Handicap Chase':                             'Novice Handicap Chase',
    'Mares Novice Hurdle - Grade 2':                     'Mares Novice Hurdle',
    'Amateur Novice Chase (NH Chase, 3m6f)':             'National Hunt Chase',
}

# Date lookup: year -> date string (from CSV)
year_dates = {}
for year_str, races in csv_years.items():
    for rt, entries in races.items():
        if entries:
            raw_date = entries[0]['date']  # e.g. "Tue/12/Mar"
            # Convert "Tue/12/Mar" -> "12 March YYYY"
            parts = raw_date.split('/')
            if len(parts) == 3:
                day = parts[1]
                mon = parts[2]
                month_map = {
                    'Jan':'January','Feb':'February','Mar':'March','Apr':'April',
                    'May':'May','Jun':'June','Jul':'July','Aug':'August',
                    'Sep':'September','Oct':'October','Nov':'November','Dec':'December'
                }
                month_name = month_map.get(mon, mon)
                year_dates[year_str] = f'{day} {month_name} {year_str}'
            break
        break

for new_year in NEW_YEARS:
    year_str = str(new_year)
    if year_str not in csv_years:
        print(f'  Warning: no CSV data for {new_year}')
        continue

    races = []
    # Build races grouped by raceType, preserving order by time
    race_type_times = {}
    for rt, entries in csv_years[year_str].items():
        # Get the time for ordering
        times = [e['time'] for e in entries if e['time']]
        race_type_times[rt] = times[0] if times else '99:99:99'

    sorted_race_types = sorted(csv_years[year_str].keys(), key=lambda rt: race_type_times.get(rt, '99:99'))

    for rt in sorted_race_types:
        entries = csv_years[year_str][rt]

        # Sort by finish position (finishers first, then DNFs)
        finishers = sorted([e for e in entries if e['finishPosition'] is not None], key=lambda x: x['finishPosition'])

        if not finishers:
            continue

        # top3 = first 3 finishers
        top3 = []
        for h in finishers[:3]:
            top3.append({
                'gatePosition': h['draw'],
                'horseName':    h['horseName'],
                'sp':           h['sp'],
                'jockey':       h['jockey'],
                'trainer':      h['trainer'],
            })

        # full field sorted by draw (gate position)
        all_horses = sorted(entries, key=lambda x: (x['draw'] or 999))
        field = []
        for h in all_horses:
            field.append({
                'gatePosition':  h['draw'],
                'horseName':     h['horseName'],
                'sp':            h['sp'],
                'finishPosition': h['finishPosition'],
                'jockey':        h['jockey'],
                'trainer':       h['trainer'],
            })

        # Use short raceName matching 2006+ convention; fall back to full name
        race_name_full = RACE_TYPE_TO_SHORT_NAME.get(rt, entries[0]['raceName'] if entries else rt)

        races.append({
            'raceName':  race_name_full,
            'fieldSize': len(entries),
            'raceType':  rt,
            'top3':      top3,
            'field':     field,
        })

    existing_years[new_year] = {
        'date':        year_dates.get(year_str, f'March {new_year}'),
        'races':       races,
        'leaderboard': [],
    }

# ─── Step 6: Render JS output ───────────────────────────────────────────────

print(f'Writing output: {JS_OUTPUT}')

def render_horse_top3(h, indent='          '):
    gate = str(h['gatePosition']).rjust(2) if h['gatePosition'] is not None else 'null'
    name = pad_name(h['horseName'])
    sp   = pad_sp(format_sp(h['sp']))
    jockey  = h.get('jockey') or ''
    trainer = h.get('trainer') or ''
    line = f'{indent}{{ gatePosition: {gate}, horseName: {name}, sp: {sp}'
    if jockey:
        line += f',  jockey: "{jockey}"'
    if trainer:
        line += f',  trainer: "{trainer}"'
    line += ' },'
    return line

def render_horse_field(h, indent='          '):
    gate    = str(h['gatePosition']).rjust(2) if h['gatePosition'] is not None else 'null'
    name    = pad_name(h['horseName'])
    sp      = pad_sp(format_sp(h['sp']))
    fp      = str(h['finishPosition']).rjust(2) if h['finishPosition'] is not None else 'null'
    jockey  = h.get('jockey') or ''
    trainer = h.get('trainer') or ''
    line = f'{indent}{{ gatePosition: {gate}, horseName: {name}, sp: {sp},  finishPosition: {fp}'
    if jockey:
        line += f',  jockey: "{jockey}"'
    if trainer:
        line += f',  trainer: "{trainer}"'
    line += ' },'
    return line

lines = []

# Header comment
lines.append('/**')
lines.append(' * historicalData.js')
lines.append(' *')
lines.append(' *')
lines.append(' * SP values are stored as DECIMAL ODDS (e.g. a 10/1 shot = 11.0).')
lines.append(' * Points scored from SP = decimal - 1 (so 11.0 decimal → 10 points).')
lines.append(' *')
lines.append(' * Race structure:')
lines.append(' *   - raceName:  Human-readable name used for display and race-character lookup')
lines.append(' *   - raceType:  Generic race category (e.g. "Championship Chase - Grade 1 (Gold Cup)")')
lines.append(' *   - fieldSize: Number of runners in the race (null = unknown, to be populated)')
lines.append(' *   - top3:      Ordered array [1st, 2nd, 3rd], each with:')
lines.append(' *                  gatePosition  – gate/stall number (null = unknown)')
lines.append(' *                  horseName     – horse name as a string')
lines.append(' *                  sp            – decimal SP (e.g. 21.0 for a 20/1 shot)')
lines.append(' *                  jockey        – jockey name')
lines.append(' *                  trainer       – trainer name')
lines.append(' *')
lines.append(' * Leaderboard entries are the top-3 finishers in the group competition that year.')
lines.append(' * Years 2002-2005 predate the group competition; leaderboard is [].')
lines.append(' */')
lines.append('')
lines.append('export const historicalData = {')
lines.append('')

for year_int in sorted(existing_years.keys()):
    year_data = existing_years[year_int]
    date_str  = year_data['date']

    lines.append(f'  // ─── {year_int} – {date_str} {"─" * max(1, 60 - len(date_str))}')
    lines.append(f'  {year_int}: {{')
    lines.append(f'    date: "{date_str}",')
    lines.append(f'    races: [')

    for race in year_data['races']:
        race_name  = race['raceName']
        field_size = race['fieldSize'] if race['fieldSize'] is not None else 'null'
        race_type  = race.get('raceType') or ''

        lines.append(f'      {{')
        lines.append(f'        raceName: "{race_name}",')
        if race_type:
            lines.append(f'        raceType: "{race_type}",')
        lines.append(f'        fieldSize: {field_size},')

        # top3
        lines.append(f'        top3: [')
        for h in race['top3']:
            lines.append(render_horse_top3(h))
        lines.append(f'        ],')

        # field
        lines.append(f'        field: [')
        for h in race['field']:
            lines.append(render_horse_field(h))
        lines.append(f'        ],')
        lines.append(f'      }},')

    lines.append(f'    ],')

    # leaderboard
    lb = year_data['leaderboard']
    if lb:
        lines.append(f'    leaderboard: [')
        for entry in lb:
            lines.append(f'      {{ name: "{entry["name"]}",     score: {entry["score"]} }},')
        lines.append(f'    ],')
    else:
        lines.append(f'    leaderboard: [],')

    lines.append(f'  }},')
    lines.append('')

lines.append('};')
lines.append('')

# Re-append the helper functions unchanged
if helpers_block:
    lines.append(helpers_block.rstrip())
    lines.append('')

output = '\n'.join(lines)

with open(JS_OUTPUT, 'w', encoding='utf-8') as f:
    f.write(output)

# Sanity check: brace balance and year count
open_braces  = output.count('{')
close_braces = output.count('}')
out_years    = sorted(existing_years.keys())

print(f'\nDone!')
print(f'  Output: {JS_OUTPUT}')
print(f'  Years:  {out_years[0]}–{out_years[-1]}  ({len(out_years)} total)')
if open_braces != close_braces:
    print(f'\n  WARNING: brace mismatch — {open_braces} open vs {close_braces} close. Review before using!')
else:
    print(f'  Brace check: OK ({open_braces} matched)')
print(f'\nReview {JS_OUTPUT} then rename it to historicalData.js in your project.')
