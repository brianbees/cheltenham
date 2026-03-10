"""
_clean_csv.py
Cleans the authoritative CSV source and writes a cleaned version.

Reads:  _archive/datafromvscode - historicalData_export (2).csv
Writes: _archive/datafromvscode_cleaned.csv

Fixes applied:
  1. Corrupted horse names (scraper leaked SP/jockey/trainer into name field)
  2. Normalise all race name variants to a single canonical name per race
  3. Deduplicate rows: within the same canonical year+race, prefer the row with
     the (Country) suffix and the most complete data
  4. Report summary of all changes made
"""

import csv, re, os
from collections import defaultdict

SRC = "_archive/datafromvscode - historicalData_export (2).csv"
DST = "_archive/datafromvscode_cleaned.csv"

# ---------------------------------------------------------------------------
# 1. Canonical race name map
#    Each entry: keyword_in_lower_race_name -> canonical_name
#    Evaluated in order — first match wins
# ---------------------------------------------------------------------------
RACE_CANONICAL = [
    # Gold Cup
    ("cheltenham gold cup",          "Cheltenham Gold Cup"),
    ("gold cup chase",               "Cheltenham Gold Cup"),
    ("gold cup",                     "Cheltenham Gold Cup"),

    # Champion Hurdle
    ("champion hurdle",              "Champion Hurdle"),

    # Arkle
    ("arkle",                        "Arkle Challenge Trophy"),

    # Supreme Novices
    ("supreme novices",              "Supreme Novices' Hurdle"),

    # Ballymore / Baring Bingham
    ("baring bingham",               "Ballymore Novices' Hurdle"),
    ("ballymore",                    "Ballymore Novices' Hurdle"),
    ("turners novices' hurdle",      "Ballymore Novices' Hurdle"),

    # Ryanair / Festival Trophy
    ("ryanair",                      "Ryanair Chase"),
    ("festival trophy",              "Ryanair Chase"),

    # Champion Bumper
    ("champion bumper",              "Champion Bumper"),

    # Stayers / World Hurdle
    ("stayers' hurdle",              "Stayers' Hurdle"),
    ("stayers hurdle",               "Stayers' Hurdle"),
    ("world hurdle",                 "Stayers' Hurdle"),

    # Albert Bartlett / Spa Novices
    ("albert bartlett",              "Albert Bartlett Novices' Hurdle"),
    ("spa novices",                  "Albert Bartlett Novices' Hurdle"),
    ("brit insurance novices",       "Albert Bartlett Novices' Hurdle"),

    # Pertemps
    ("pertemps",                     "Pertemps Final"),

    # County Hurdle / Vincent O'Brien
    ("vincent o'brien county",       "County Hurdle"),
    ("county handicap hurdle",       "County Hurdle"),
    ("county hurdle",                "County Hurdle"),

    # Triumph Hurdle
    ("triumph hurdle",               "Triumph Hurdle"),

    # Grand Annual
    ("grand annual",                 "Grand Annual Chase"),

    # Kim Muir
    ("kim muir",                     "Kim Muir"),

    # National Hunt Chase
    ("national hunt chase",          "National Hunt Chase"),

    # Coral Cup
    ("coral cup",                    "Coral Cup"),

    # Foxhunter
    ("foxhunter",                    "Foxhunter Chase"),

    # Martin Pipe
    ("martin pipe",                  "Martin Pipe Conditional Jockeys' Hurdle"),

    # Dawn Run Mares Novices
    ("dawn run",                     "Dawn Run Mares' Novices' Hurdle"),
    ("mares' novices",               "Dawn Run Mares' Novices' Hurdle"),
    ("mares novices",                "Dawn Run Mares' Novices' Hurdle"),
    ("daylesford mares",             "Dawn Run Mares' Novices' Hurdle"),
    ("jack de bromhead mares",       "Dawn Run Mares' Novices' Hurdle"),
    ("parnell properties mares",     "Dawn Run Mares' Novices' Hurdle"),
    ("trull house stud mares",       "Dawn Run Mares' Novices' Hurdle"),
    ("national hunt breeders",       "Dawn Run Mares' Novices' Hurdle"),

    # Mares' Hurdle (David Nicholson)
    ("mares' hurdle",                "Mares' Hurdle"),
    ("mares hurdle",                 "Mares' Hurdle"),
    ("david nicholson",              "Mares' Hurdle"),
    ("olbg mares",                   "Mares' Hurdle"),

    # Plate Handicap Chase / Brown Advisory Plate
    ("merriebelle stable plate",     "Brown Advisory Plate"),
    ("plate handicap chase",         "Brown Advisory Plate"),
    ("brown advisory & merriebelle", "Brown Advisory Plate"),
    ("brown advisory plate",         "Brown Advisory Plate"),

    # Ultima / Jewson
    ("ultima",                       "Ultima Handicap Chase"),
    ("jewson",                       "Ultima Handicap Chase"),

    # Cross Country / Glenfarclas
    ("cross country",                "Cross Country Chase"),
    ("glenfarclas",                  "Cross Country Chase"),
    ("bgc handicap chase",           "Cross Country Chase"),
    ("sporting index handicap chase","Cross Country Chase"),

    # Fred Winter / Juvenile Handicap Hurdle
    ("fred winter",                  "Fred Winter Juvenile Hurdle"),
    ("juvenile handicap hurdle",     "Fred Winter Juvenile Hurdle"),
    ("juvenile novices' handicap",   "Fred Winter Juvenile Hurdle"),
    ("hallgarten",                   "Fred Winter Juvenile Hurdle"),

    # Close Brothers / Novices Handicap Chase
    ("close brothers novices",       "Close Brothers Novices' Handicap Chase"),
    ("novices' handicap chase",      "Close Brothers Novices' Handicap Chase"),

    # RSA / Brown Advisory Novices Chase
    ("rsa",                          "Brown Advisory Novices' Chase"),
    ("brown advisory novices",       "Brown Advisory Novices' Chase"),
    ("turners novices' chase",       "Brown Advisory Novices' Chase"),
    ("novices' chase",               "Brown Advisory Novices' Chase"),

    # William Hill National Hunt Handicap
    ("william hill national hunt handicap", "National Hunt Handicap Chase"),

    # Boodles / Cheltenham Plate (old names pre-Plate Handicap)
    ("boodles cheltenham",           "Cheltenham Gold Cup"),  # catches Boodles Gold Cup only
]

def canonical_race(name):
    nl = name.lower()
    for keyword, canon in RACE_CANONICAL:
        if keyword in nl:
            return canon
    return name  # unchanged if no match

# ---------------------------------------------------------------------------
# 2. Corrupted horse name repair
#    Pattern: HorseName (XX) SP/1C JockeyWords TrainerWords...
#    We strip everything after the SP fraction pattern
# ---------------------------------------------------------------------------
CORRUPT_PATTERN = re.compile(
    r'^(.+?)\s+\d+/\d+[A-Z]?\s+.*$|^(.+?)\s+\d+\.\d+[A-Z]?\s+.*$'
)

def clean_horse_name(name):
    m = CORRUPT_PATTERN.match(name)
    if m:
        fixed = (m.group(1) or m.group(2)).strip()
        return fixed, True
    return name, False

# ---------------------------------------------------------------------------
# 3. Preference score for deduplication (higher = better row to keep)
# ---------------------------------------------------------------------------
def row_score(row):
    score = 0
    # Has country suffix in name
    if re.search(r'\([A-Z]{2,3}\)$', row['Horse Name'].strip()):
        score += 10
    # Has jockey
    if row['Jockey'].strip():
        score += 5
    # Has trainer
    if row['Trainer'].strip():
        score += 5
    # Has position
    if row['Position'].strip():
        score += 2
    # Has SP
    if row['SP (Decimal)'].strip():
        score += 1
    return score

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
print(f"Reading {SRC}...")
with open(SRC, encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

print(f"  {len(rows):,} rows loaded")
print()

stats = {
    'corrupted_names_fixed': 0,
    'race_names_normalised': 0,
    'duplicates_removed': 0,
}
log_lines = []

# Step 1: Fix corrupted horse names
for row in rows:
    original = row['Horse Name']
    fixed, was_corrupt = clean_horse_name(original)
    if was_corrupt:
        row['Horse Name'] = fixed
        row['_original_name'] = original
        stats['corrupted_names_fixed'] += 1
        log_lines.append(f"CORRUPT_NAME_FIXED: {row['Year']} | {row['Race Name'][:40]} | '{original[:60]}' -> '{fixed}'")

# Step 2: Normalise race names
for row in rows:
    original = row['Race Name']
    norm = canonical_race(original)
    if norm != original:
        row['Race Name'] = norm
        stats['race_names_normalised'] += 1

# Step 3: Deduplicate
# Key: (year, canonical_race_name, draw) — keep the highest-scoring row
# Also deduplicate by (year, race, horse_base) — same horse, same race
groups = defaultdict(list)
for row in rows:
    base_horse = re.sub(r'\s*\([A-Za-z]{2,3}\)\s*$', '', row['Horse Name'].strip()).lower()
    key = (row['Year'].strip(), row['Race Name'].strip(), base_horse)
    groups[key].append(row)

deduped = []
for key, group in groups.items():
    if len(group) == 1:
        deduped.append(group[0])
    else:
        # Keep the row with highest score
        best = max(group, key=row_score)
        deduped.append(best)
        stats['duplicates_removed'] += len(group) - 1
        for dropped in group:
            if dropped is not best:
                log_lines.append(
                    f"DEDUP_REMOVED: {key[0]} | {key[1][:40]} | '{dropped['Horse Name']}' "
                    f"(kept '{best['Horse Name']}')"
                )

# Sort output: year, race name, draw (numeric where possible)
def sort_key(row):
    try:
        draw = int(row['Draw'])
    except (ValueError, KeyError):
        draw = 999
    return (row['Year'], row['Race Name'], draw)

deduped.sort(key=sort_key)

# Write cleaned CSV (same columns as source, minus internal _original_name)
out_fieldnames = [f for f in fieldnames]
print(f"Writing {DST}...")
with open(DST, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=out_fieldnames, extrasaction='ignore')
    writer.writeheader()
    writer.writerows(deduped)

print(f"  {len(deduped):,} rows written")
print()

# Print summary
print("=" * 60)
print("CLEANING SUMMARY")
print("=" * 60)
print(f"  Input rows              : {len(rows):,}")
print(f"  Output rows             : {len(deduped):,}")
print(f"  Corrupted names fixed   : {stats['corrupted_names_fixed']}")
print(f"  Race names normalised   : {stats['race_names_normalised']:,}")
print(f"  Duplicate rows removed  : {stats['duplicates_removed']:,}")
print()

# Print detailed log
if log_lines:
    print("DETAIL LOG:")
    # Show corrupted name fixes first
    for line in log_lines:
        if line.startswith('CORRUPT'):
            print("  " + line)
    print()
    # Then dedup sample (first 30)
    dedup_lines = [l for l in log_lines if l.startswith('DEDUP')]
    print(f"  DEDUP removed ({len(dedup_lines)} total, showing first 30):")
    for line in dedup_lines[:30]:
        print("  " + line)
    if len(dedup_lines) > 30:
        print(f"  ... and {len(dedup_lines)-30} more")

print()
print("Done.")
