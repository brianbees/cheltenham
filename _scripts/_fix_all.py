import re

GATE_RE      = re.compile(r'(gatePosition:\s*)(\d+)')
HORSE_RE     = re.compile(r'horseName:\s*"([^"]+)"')
SP_RE        = re.compile(r'(,\s*sp:\s*)(\S+?)(\s*,)')
FIELDSIZE_RE = re.compile(r'^(\s+fieldSize:\s*)(\d+)(,\s*)$')
FP_RE        = re.compile(r'finishPosition:\s*(\d+)')
SP_VAL_RE    = re.compile(r'sp:\s*([^,\s}]+)')

# Country code pattern in horse names
CC_JUNK_RE   = re.compile(r'(Evens|EvensF|\d+\/\d|[A-Z] [A-Z])\s+\w')  # heuristic for junk names

def is_junk_name(name):
    """Horse names with jockey/trainer appended are corrupt"""
    return bool(re.search(r'(?:EvensF?|[0-9]+\/[0-9]+[A-Z]?)\s+[A-Z]', name))

def sp_is_null(line):
    m = SP_VAL_RE.search(line)
    return m and m.group(1).strip() == 'null'

with open('src/data/historicalData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

output = []
in_field      = False
in_top3       = False
fs_idx        = None   # index in output of current fieldSize line
field_lines   = []     # collect field entry lines for current race

sp1_fixed        = 0
junk_removed     = 0
dupe_removed     = 0
fs_raised        = 0

def flush_field(field_lines, fs_idx, output):
    """Deduplicate any remaining exact duplicates, compute max finishPosition,
       emit lines, patch fieldSize if needed."""
    global dupe_removed, fs_raised

    seen_names = {}
    kept = []
    for ln in field_lines:
        hm = HORSE_RE.search(ln)
        if not hm:
            kept.append(ln)
            continue
        name = hm.group(1)
        if name in seen_names:
            dupe_removed += 1
        else:
            seen_names[name] = True
            kept.append(ln)

    # Compute max finishPosition
    max_fp = 0
    for ln in kept:
        fm = FP_RE.search(ln)
        if fm:
            max_fp = max(max_fp, int(fm.group(1)))

    # Patch fieldSize upward if needed
    if max_fp > 0 and fs_idx is not None:
        fsl = output[fs_idx].rstrip('\n')
        fsm = FIELDSIZE_RE.match(fsl)
        if fsm:
            current_fs = int(fsm.group(2))
            actual_fs  = max(current_fs, max_fp)
            if actual_fs != current_fs:
                output[fs_idx] = fsm.group(1) + str(actual_fs) + fsm.group(3) + '\n'
                fs_raised += 1

    return kept

i = 0
while i < len(lines):
    line = lines[i]
    s    = line.rstrip()

    # Track fieldSize
    if not in_field and not in_top3:
        if FIELDSIZE_RE.match(s):
            fs_idx = len(output)

    # Block start
    if re.match(r'^\s+field:\s*\[\s*$', s):
        in_field = True; in_top3 = False
        field_lines = []
        output.append(line); i += 1; continue

    if re.match(r'^\s+top3:\s*\[\s*$', s):
        in_top3 = True; in_field = False
        output.append(line); i += 1; continue

    # Block end
    if re.match(r'^\s+\],\s*$', s) and (in_field or in_top3):
        if in_field:
            kept = flush_field(field_lines, fs_idx, output)
            output.extend(kept)
        in_field = False; in_top3 = False
        output.append(line); i += 1; continue

    # Inside field: collect lines, fix SP=1.0, remove junk
    if in_field and 'gatePosition' in line and 'finishPosition' in line:
        hm = HORSE_RE.search(line)
        if hm and is_junk_name(hm.group(1)):
            junk_removed += 1
            i += 1; continue

        if sp_is_null(line):
            # remove null-SP entries entirely
            junk_removed += 1
            i += 1; continue

        # Fix SP=1.0 → 2.0 (only in field lines, exact match on ", sp: 1.0,")
        if re.search(r',\s*sp:\s*1\.0\s*,', line):
            line = re.sub(r'(,\s*sp:\s*)1\.0(\s*,)', r'\g<1>2.0\2', line)
            sp1_fixed += 1

        field_lines.append(line)
        i += 1; continue

    # Inside top3: fix SP=1.0
    if in_top3 and 'gatePosition' in line:
        if re.search(r',\s*sp:\s*1\.0\s*,', line):
            line = re.sub(r'(,\s*sp:\s*)1\.0(\s*,)', r'\g<1>2.0\2', line)
            sp1_fixed += 1

    output.append(line)
    i += 1

print(f"SP 1.0 → 2.0 fixed   : {sp1_fixed}")
print(f"Junk/null entries removed : {junk_removed}")
print(f"Exact duplicates removed  : {dupe_removed}")
print(f"fieldSize values raised   : {fs_raised}")
print(f"Lines: {len(lines)} → {len(output)}")

with open('src/data/historicalData.js', 'w', encoding='utf-8') as f:
    f.writelines(output)
print("Done.")
