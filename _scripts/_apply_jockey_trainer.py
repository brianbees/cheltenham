"""
Apply jockey/trainer fixes to historicalData.js.
For entries missing jockey/trainer, adds them to the closing line of the entry.
"""
import json, re

JS_FILE = "src/data/historicalData.js"

with open("_jockey_trainer_fixes.json") as f:
    fixes = json.load(f)

# Build a lookup keyed by (year, raceName, horseName) → {jockey, trainer}
fix_map = {}
for fix in fixes:
    key = (fix["year"], fix["race"], fix["horseName"])
    fix_map[key] = (fix["jockey"], fix["trainer"])

print(f"Loaded {len(fix_map)} fixes")

with open(JS_FILE, encoding="utf-8") as f:
    lines = f.readlines()

# ── Scan through the file tracking year / race / field context ───────────────
current_year = None
current_race = None
in_field = False
pending_horse = None   # horseName we just saw on the first line of a 2-line entry
pending_line = None    # line index of the horseName line

replacements = []   # list of (line_index, old_text, new_text)

for i, raw in enumerate(lines):
    line = raw

    # Detect year start: "    2006 :  {"
    m = re.match(r'^\s*(\d{4})\s*:\s*\{', line)
    if m:
        current_year = m.group(1)
        current_race = None
        in_field = False
        pending_horse = None
        continue

    # Detect race name
    m = re.search(r'raceName:\s*"([^"]+)"', line)
    if m:
        current_race = m.group(1)
        in_field = False
        pending_horse = None
        continue

    # Detect field start
    if re.search(r'\bfield\s*:\s*\[', line):
        in_field = True
        pending_horse = None
        continue

    # Detect field end
    if in_field and re.match(r'\s*\]\s*,?\s*$', line):
        in_field = False
        pending_horse = None
        continue

    if not in_field:
        pending_horse = None
        continue

    # ── inside field section ──────────────────────────────────────────────────

    # Look for a horseName that might be the first line of a 2-line entry:
    #   { gatePosition: N, horseName: "X" ...  (no closing } on this line)
    m_horse = re.search(r'horseName:\s*"([^"]+)"', line)
    if m_horse:
        horse = m_horse.group(1)

        if line.rstrip().endswith('},') or line.rstrip().endswith('}'):
            # Single-line entry — check if it's missing jockey/trainer
            key = (current_year, current_race, horse)
            if key in fix_map:
                jockey, trainer = fix_map[key]
                # Check it truly lacks jockey field
                if 'jockey:' not in line:
                    # Insert before closing },
                    new_line = re.sub(r'\s*\},\s*$', f',  jockey: "{jockey}",  trainer: "{trainer}" }},\n', line)
                    replacements.append((i, line, new_line))
            pending_horse = None
        else:
            # Possibly first line of a 2-line entry — is it missing jockey/trainer?
            if 'jockey:' not in line:
                pending_horse = horse
                pending_line = i
            else:
                pending_horse = None
        continue

    # If we have a pending horse (from first line), look for closing on this line
    if pending_horse is not None:
        # This should be the second (or more) line of the entry
        # Check if it contains the closing },
        if '};' in line or '},' in line or re.search(r'\}\s*$', line):
            key = (current_year, current_race, pending_horse)
            if key in fix_map and 'jockey:' not in line:
                jockey, trainer = fix_map[key]
                new_line = re.sub(r'\s*\},?\s*$', f',  jockey: "{jockey}",  trainer: "{trainer}" }},\n', line)
                replacements.append((i, line, new_line))
            pending_horse = None

print(f"Replacements to make: {len(replacements)}")
print("Sample replacements:")
for idx, (li, old, new) in enumerate(replacements[:5]):
    print(f"  Line {li+1}:")
    print(f"    OLD: {repr(old.rstrip())}")
    print(f"    NEW: {repr(new.rstrip())}")

if not replacements:
    print("No replacements found — check the script logic.")
    exit(0)

# ── Apply replacements ────────────────────────────────────────────────────────
# Apply in reverse order to preserve line numbers
for (li, old, new) in sorted(replacements, key=lambda x: x[0], reverse=True):
    assert lines[li] == old, f"Line {li+1} mismatch:\n  expected: {repr(old)}\n  found:    {repr(lines[li])}"
    lines[li] = new

with open(JS_FILE, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"\nApplied {len(replacements)} jockey/trainer fixes to {JS_FILE}")
