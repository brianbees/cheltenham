"""
Cross-reference parsed_missing.csv against remaining top3 mismatches.
"""
import csv, json, re, subprocess, os

def strip_country(n):
    return re.sub(r'\s*\((FR|IRE|GB|USA|GER|NZ|AUS|CZE|ITA|ITY|SPA|POL|CHI|ARG|SAF|BEL|JPN|SWI)\)\s*$', '', n, flags=re.I)

def norm(n):
    return ' '.join(strip_country(n).lower().split())

def frac_to_dec(sp_str):
    """Convert fractional SP like '8/1', '13/2', '4/1F' to decimal."""
    s = sp_str.strip().rstrip('FfCc').strip()
    if '/' in s:
        num, den = s.split('/')
        try:
            return round(int(num)/int(den) + 1, 2)
        except:
            return None
    try:
        return float(s)
    except:
        return None

# Load parsed_missing.csv
parsed = {}
with open(r'_archive\parsed_missing.csv', newline='', encoding='utf-8-sig') as f:
    for row in csv.DictReader(f):
        pos = row.get('Position','').strip()
        if pos not in ('2','3'):
            continue
        year = row['Year'].strip()
        race_norm = norm(row['Race Name'].strip())
        ipos = int(pos)
        parsed.setdefault(year, {}).setdefault(race_norm, {})[ipos] = {
            'horseName': row['Horse Name'].strip(),
            'sp': frac_to_dec(row.get('SP','')),
            'jockey': row.get('Jockey','').strip(),
            'trainer': row.get('Trainer','').strip(),
            'raw_race': row['Race Name'].strip(),
        }

print(f"parsed_missing entries (pos 2/3): {sum(len(v) for yr in parsed.values() for v in yr.values())}")

# Export current races
result = subprocess.run(['node', '_export_races.mjs'], capture_output=True, text=True)
print(result.stdout.strip())
with open('_races_dump.json', encoding='utf-8') as f:
    races = json.load(f)
os.unlink('_races_dump.json')

# Find remaining mismatches
fixable = []
no_data = []

for race in races:
    top3 = race['top3']
    field_by_norm = {norm(h['horseName']): h for h in race['field'] if h.get('horseName')}

    for i, entry in enumerate(top3):
        pos = i + 1
        if pos not in (2, 3):
            continue
        js_name = entry.get('horseName', '')

        # Check if already correct (horse has matching finishPosition in field)
        fp = None
        for h in race['field']:
            if norm(h.get('horseName','')) == norm(js_name):
                fp = h.get('finishPosition')
                break
        if fp == pos:
            continue  # already OK

        # Look up in parsed_missing
        year_data = parsed.get(race['year'], {})
        race_norm = norm(race['raceName'])

        csv_race = year_data.get(race_norm)
        if csv_race is None:
            # Try partial match
            for k, v in year_data.items():
                if race_norm in k or k in race_norm:
                    csv_race = v
                    break

        if csv_race is None or pos not in csv_race:
            no_data.append((race['year'], race['raceName'], pos, js_name))
            continue

        csv_entry = csv_race[pos]
        csv_name = csv_entry['horseName']

        if norm(csv_name) == norm(js_name):
            continue  # already matches

        # Check if CSV horse is in field
        field_match = field_by_norm.get(norm(csv_name))
        if field_match is None:
            no_data.append((race['year'], race['raceName'], pos, js_name, f'CSV={csv_name} not in field'))
            continue

        fixable.append({
            'year': race['year'],
            'race': race['raceName'],
            'pos': pos,
            'old_name': js_name,
            'old_gate': entry.get('gatePosition'),
            'new_gate': field_match['gatePosition'],
            'new_name': field_match['horseName'],
            'new_sp': field_match.get('sp') or csv_entry['sp'],
            'new_jockey': field_match.get('jockey') or csv_entry['jockey'],
            'new_trainer': field_match.get('trainer') or csv_entry['trainer'],
        })

print(f"\nStill fixable from parsed_missing: {len(fixable)}")
print(f"Still no data: {len(no_data)}")
print()
print("Sample fixable:")
for item in fixable[:20]:
    print(f"  {item['year']} {item['race']} pos={item['pos']}: {item['old_name']!r} → {item['new_name']!r}")
print()
print("Sample no data:")
for item in no_data[:10]:
    print(f"  {item}")

# ── Apply fixes using positional line-by-line replacement ──────────────────
if not fixable:
    print("\nNo fixes to apply.")
else:
    from collections import defaultdict
    by_race = defaultdict(dict)
    for item in fixable:
        by_race[(item['year'], item['race'])][item['pos']] = item

    with open('src/data/historicalData.js', encoding='utf-8') as f:
        lines = f.read().split('\n')

    out = []
    current_year = None
    current_race = None
    in_top3 = False
    top3_idx = 0
    fixes = 0

    i = 0
    while i < len(lines):
        line = lines[i]

        year_m = re.match(r'\s*(\d{4})\s*:\s*\{', line)
        if year_m:
            current_year = year_m.group(1)
            current_race = None
            in_top3 = False

        race_m = re.search(r'raceName:\s*"([^"]+)"', line)
        if race_m:
            current_race = race_m.group(1)
            in_top3 = False
            top3_idx = 0

        if re.search(r'\btop3\s*:\s*\[', line):
            in_top3 = True
            top3_idx = 0

        if re.search(r'\bfield\s*:\s*\[', line):
            in_top3 = False

        if in_top3 and 'gatePosition' in line:
            pos = top3_idx + 1
            top3_idx += 1
            is_single_line = '}' in line
            fix = by_race.get((current_year, current_race), {}).get(pos)

            if fix:
                sp_val = fix['new_sp']
                sp_str = f"{sp_val:.1f}" if isinstance(sp_val, float) else str(sp_val)
                indent = re.match(r'(\s*)', line).group(1)
                new_line = (
                    f"{indent}{{ gatePosition: {str(fix['new_gate']).rjust(2)}, "
                    f"horseName: \"{fix['new_name']}\", "
                    f"sp: {sp_str},  "
                    f"jockey: \"{fix['new_jockey']}\",  "
                    f"trainer: \"{fix['new_trainer']}\" }},"
                )
                out.append(new_line)
                fixes += 1
                if not is_single_line:
                    i += 1  # skip continuation line
            else:
                out.append(line)
                if not is_single_line:
                    i += 1
                    out.append(lines[i])
        else:
            out.append(line)

        i += 1

    print(f"\nFixes applied: {fixes}")
    with open('src/data/historicalData.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))
    print("Written src/data/historicalData.js")
