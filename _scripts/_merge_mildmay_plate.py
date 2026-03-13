"""
_merge_mildmay_plate.py

For years 2002-2005, historicalData.js contains TWO entries for the same race:
  - "Plate Handicap Chase"  (bad/broken SP values like 1.1, 2.0 for handicappers)
  - "Mildmay Chase"         (correct decimal SPs: 26.0, 17.0, etc.)

This script:
  1. Removes the bad duplicate "Plate Handicap Chase" blocks in 2002-2005
  2. Renames "Mildmay Chase" → "Plate Handicap Chase" in those 4 years
  3. Updates raceType "Handicap Chase (Mildmay of Flete, 2m4f)" → "Handicap Chase (Plate, 2m4f)"
"""

import re, sys

DATA_FILE = r"c:\Users\Brian\Documents\Cheltenham_vscode\src\data\historicalData.js"

with open(DATA_FILE, encoding="utf-8") as f:
    src = f.read()

original = src  # keep for diff check

# ── Step 1: Remove the bad Plate Handicap Chase blocks in 2002-2005 ──────────
# These blocks have broken SPs (e.g. 1.1 for many horses).
# Strategy: find each race object block that starts with raceName: "Plate Handicap Chase"
# and ends just before the next race's opening brace (i.e. `      {` at the race level).
# We look for blocks where the top3 contains sp: 1.1 as a sign of bad data.

BAD_YEARS = {'2002', '2003', '2004', '2005'}

def remove_bad_plate_blocks(text):
    """
    For each year block in 2002-2005, remove the Plate Handicap Chase race entry
    that has broken SP data (identified by having multiple sp: 1.1 values).
    """
    # Split into year blocks at top-level key "  2002: {" etc.
    # We'll process line by line, tracking state.
    lines = text.split('\n')
    out = []
    i = 0
    current_year = None
    
    while i < len(lines):
        line = lines[i]
        
        # Detect year key (e.g. "  2002: {" or "  2002:{")
        m = re.match(r'^\s{2}["\']?(\d{4})["\']?\s*:', line)
        if m:
            current_year = m.group(1)
        
        # Check if this line starts a Plate Handicap Chase race block in a bad year
        # (indented 6 spaces: "      {")
        if (current_year in BAD_YEARS and
                re.match(r'^\s+\{', line) and
                i + 1 < len(lines) and
                'raceName: "Plate Handicap Chase"' in lines[i + 1]):
            
            # Peek ahead: check if this block has broken SPs (multiple sp: 1.1)
            # Collect the block first
            block_lines = []
            j = i
            brace_depth = 0
            started = False
            while j < len(lines):
                l = lines[j]
                block_lines.append(l)
                brace_depth += l.count('{') - l.count('}')
                if not started and '{' in l:
                    started = True
                if started and brace_depth <= 0:
                    j += 1
                    break
                j += 1
            
            block_text = '\n'.join(block_lines)
            bad_sp_count = block_text.count('sp:    1.1') + block_text.count('sp:  1.1') + block_text.count('sp: 1.1')
            
            if bad_sp_count >= 2:
                # This is the bad block — skip it
                print(f"  Removing bad Plate Handicap Chase block in year {current_year} (found {bad_sp_count} broken sp:1.1 values)")
                i = j
                # Also remove trailing comma/newline if needed
                continue
            else:
                out.append(line)
        else:
            out.append(line)
        
        i += 1
    
    return '\n'.join(out)

print("Step 1: Removing bad Plate Handicap Chase blocks...")
src = remove_bad_plate_blocks(src)

# ── Step 2: Rename Mildmay Chase → Plate Handicap Chase ─────────────────────
count_name = src.count('raceName: "Mildmay Chase"')
print(f"Step 2: Renaming {count_name} 'Mildmay Chase' → 'Plate Handicap Chase'...")
src = src.replace('raceName: "Mildmay Chase"', 'raceName: "Plate Handicap Chase"')

# ── Step 3: Fix raceType ─────────────────────────────────────────────────────
count_type = src.count('Handicap Chase (Mildmay of Flete, 2m4f)')
print(f"Step 3: Updating {count_type} raceType strings...")
src = src.replace(
    'raceType: "Handicap Chase (Mildmay of Flete, 2m4f)"',
    'raceType: "Handicap Chase (Plate, 2m4f)"'
)

# ── Sanity check ─────────────────────────────────────────────────────────────
remaining_mildmay = src.count('Mildmay Chase')
remaining_broken  = src.count('raceName: "Plate Handicap Chase"')
print(f"\nSanity check:")
print(f"  Remaining 'Mildmay Chase' references: {remaining_mildmay}")
print(f"  Total 'Plate Handicap Chase' raceName entries: {remaining_broken}")

if remaining_mildmay > 0:
    print("  WARNING: 'Mildmay Chase' still found - check manually")

# ── Write output ───────────────────────────────────────────────────────────
if src == original:
    print("\nNo changes made - aborting.")
    sys.exit(1)

with open(DATA_FILE, 'w', encoding='utf-8') as f:
    f.write(src)

print(f"\nDone. File updated.")
