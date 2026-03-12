"""
_fix_top3_from_field.py
========================
Fixes two categories:
  1. TOP3_WINNER_MISMATCH: where field has a clear single pos=1 and top3[0] disagrees
  2. Duplicate top3 entries: where top3[0]==top3[1] or top3[1]==top3[2],
     replace with the field horse that has the matching finishPosition
"""
import re, subprocess, json, os

# ─── Dump current races ────────────────────────────────────────────────────────
result = subprocess.run(['node', '_export_races.mjs'], capture_output=True, text=True)
print(result.stdout.strip())
with open('_races_dump.json', encoding='utf-8') as f:
    races = json.load(f)
os.unlink('_races_dump.json')

# ─── Build fix list ────────────────────────────────────────────────────────────
# Structure: {(year, raceName): {pos_index: {gatePosition, horseName, sp, jockey, trainer}}}
from collections import defaultdict
fixes = defaultdict(dict)  # (year, race) -> {0: new_entry, 1: new_entry, 2: new_entry}

def field_by_pos(field):
    """Return {finishPosition: horse} — only where position is unique."""
    result = {}
    counts = {}
    for h in field:
        fp = h.get('finishPosition')
        if fp is None:
            continue
        counts[fp] = counts.get(fp, 0) + 1
    for h in field:
        fp = h.get('finishPosition')
        if fp is not None and counts.get(fp, 0) == 1:
            result[fp] = h
    return result

for race in races:
    year = race['year']
    rname = race['raceName']
    top3 = race['top3']
    field = race['field']
    fpos = field_by_pos(field)

    key = (year, rname)

    # 1. Winner mismatch: top3[0] doesn't match the one unambiguous field winner
    if top3 and 1 in fpos:
        winner = fpos[1]
        if winner['horseName'] != top3[0].get('horseName'):
            fixes[key][0] = {
                'gatePosition': winner['gatePosition'],
                'horseName':    winner['horseName'],
                'sp':           winner['sp'],
                'jockey':       winner.get('jockey', ''),
                'trainer':      winner.get('trainer', ''),
            }

    # 2. top3[1] is duplicate of top3[0] → replace with pos=2 from field
    if len(top3) >= 2 and top3[0].get('horseName') == top3[1].get('horseName'):
        if 2 in fpos:
            h = fpos[2]
            fixes[key][1] = {
                'gatePosition': h['gatePosition'],
                'horseName':    h['horseName'],
                'sp':           h['sp'],
                'jockey':       h.get('jockey', ''),
                'trainer':      h.get('trainer', ''),
            }

    # 3. top3[2] is duplicate of top3[1] → replace with pos=3 from field
    if len(top3) == 3 and top3[1].get('horseName') == top3[2].get('horseName'):
        if 3 in fpos:
            h = fpos[3]
            fixes[key][2] = {
                'gatePosition': h['gatePosition'],
                'horseName':    h['horseName'],
                'sp':           h['sp'],
                'jockey':       h.get('jockey', ''),
                'trainer':      h.get('trainer', ''),
            }

    # 4. top3[2] is duplicate of top3[0] → replace with pos=3 from field
    if len(top3) == 3 and top3[0].get('horseName') == top3[2].get('horseName') and top3[1].get('horseName') != top3[0].get('horseName'):
        if 3 in fpos:
            h = fpos[3]
            fixes[key][2] = {
                'gatePosition': h['gatePosition'],
                'horseName':    h['horseName'],
                'sp':           h['sp'],
                'jockey':       h.get('jockey', ''),
                'trainer':      h.get('trainer', ''),
            }

total_fixes = sum(len(v) for v in fixes.values())
print(f"Races with fixes: {len(fixes)}, total top3 entries to replace: {total_fixes}")
print("Sample:")
for (year, race), idx_map in sorted(fixes.items())[:12]:
    for idx, entry in idx_map.items():
        print(f"  {year}/{race} top3[{idx}] → gate={entry['gatePosition']} \"{entry['horseName']}\"")

# ─── Apply fixes using positional line-by-line replacement ────────────────────
with open('src/data/historicalData.js', encoding='utf-8') as f:
    lines = f.read().split('\n')

out = []
current_year = None
current_race = None
in_top3 = False
top3_idx = 0
applied = 0

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
        idx = top3_idx
        top3_idx += 1
        is_single_line = '}' in line
        fix = fixes.get((current_year, current_race), {}).get(idx)

        if fix:
            sp_val = fix['sp']
            sp_str = f"{sp_val:.1f}" if isinstance(sp_val, float) else str(sp_val)
            indent = re.match(r'(\s*)', line).group(1)
            new_line = (
                f"{indent}{{ gatePosition: {str(fix['gatePosition']).rjust(2)}, "
                f"horseName: \"{fix['horseName']}\", "
                f"sp: {sp_str},  "
                f"jockey: \"{fix['jockey']}\",  "
                f"trainer: \"{fix['trainer']}\" }},"
            )
            out.append(new_line)
            applied += 1
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

print(f"\nTop3 entries replaced: {applied}")
if applied > 0:
    with open('src/data/historicalData.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))
    print("Written src/data/historicalData.js")
else:
    print("No changes made.")
