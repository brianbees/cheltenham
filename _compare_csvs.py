"""
_compare_csvs.py
Compares "Gold Cup Day 2022 Results - Cleaned Data (2).csv" against all other
CSV files in the project and reports differences.
"""

import csv, re, sys
from collections import defaultdict

# ---------------------------------------------------------------------------
# File definitions
# ---------------------------------------------------------------------------
TARGET = "Gold Cup Day 2022 Results - Cleaned Data (2).csv"

OTHERS = [
    ("Copy (archive)",  "_archive/Copy of Gold Cup Day 2022 Results - Cleaned Data.csv"),
    ("Export archive",  "_archive/datafromvscode - historicalData_export (2).csv"),
    ("historicalData_export", "_archive/historicalData_export.csv"),
    ("parsed_missing",  "_archive/parsed_missing.csv"),
]

FIELD_ALIASES = {
    # normalise column names so we can compare across schemas
    "generic race type": "race type",
    "\ufeffyear": "year",
    "sp (decimal)": "sp",
    "field size": "field size",
    "time": "time",
}

def normalise_key(k):
    k = k.lower().strip()
    return FIELD_ALIASES.get(k, k)

def load(path):
    with open(path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = []
        for r in reader:
            rows.append({normalise_key(k): (v or "").strip() for k, v in r.items()})
    return rows

def horse_key(row):
    """Canonical key: year + race + horse (strip country suffix for matching)."""
    horse = re.sub(r"\s*\([A-Za-z]{2,3}\)\s*$", "", row.get("horse name", "")).lower().strip()
    return (
        row.get("year", "").strip(),
        row.get("race name", "").lower().strip(),
        horse,
    )

def to_dict(rows):
    """Map horse_key -> row (last one wins on duplicates)."""
    d = {}
    for r in rows:
        d[horse_key(r)] = r
    return d

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
SEP = "=" * 72

def section(title):
    print()
    print(SEP)
    print("  " + title)
    print(SEP)

def subsection(title):
    print()
    print("  --- " + title + " ---")

# ---------------------------------------------------------------------------
# Load target
# ---------------------------------------------------------------------------
print("Loading files...")
target_rows = load(TARGET)
target_dict = to_dict(target_rows)
target_keys = set(target_dict)

# Year/race coverage in target
target_years = sorted(set(r.get("year","") for r in target_rows))
target_races_by_year = defaultdict(set)
for r in target_rows:
    target_races_by_year[r.get("year","")].add(r.get("race name",""))

# ---------------------------------------------------------------------------
# Per-file comparison
# ---------------------------------------------------------------------------
for label, path in OTHERS:
    try:
        other_rows = load(path)
    except FileNotFoundError:
        print(f"\n[SKIP] {label}: file not found ({path})")
        continue

    other_dict = to_dict(other_rows)
    other_keys = set(other_dict)

    section(f"TARGET  vs  {label}")
    print(f"  Target rows : {len(target_rows):,}")
    print(f"  Other rows  : {len(other_rows):,}")

    # ---- year coverage ----
    subsection("Year coverage")
    other_years = sorted(set(r.get("year","") for r in other_rows))
    only_target = [y for y in target_years if y not in other_years]
    only_other  = [y for y in other_years  if y not in target_years]
    shared_years = [y for y in target_years if y in other_years]
    print(f"  Shared years : {len(shared_years)}  ({shared_years[0] if shared_years else '?'} – {shared_years[-1] if shared_years else '?'})")
    if only_target:
        print(f"  Years only in TARGET : {only_target}")
    if only_other:
        print(f"  Years only in OTHER  : {only_other}")

    # ---- row counts by year ----
    subsection("Row count per year (target vs other)")
    other_by_year = defaultdict(int)
    for r in other_rows:
        other_by_year[r.get("year","")] += 1
    target_by_year = defaultdict(int)
    for r in target_rows:
        target_by_year[r.get("year","")] += 1

    year_diffs = []
    for y in shared_years:
        diff = target_by_year[y] - other_by_year[y]
        if diff != 0:
            year_diffs.append((y, target_by_year[y], other_by_year[y], diff))
    if year_diffs:
        print(f"  {'Year':<6} {'Target':>7} {'Other':>7} {'Diff':>6}")
        for y, t, o, d in year_diffs:
            print(f"  {y:<6} {t:>7} {o:>7} {d:>+6}")
    else:
        print("  All shared years have identical row counts.")

    # ---- horse-level overlap ----
    subsection("Horse-level overlap (year + race + horse name)")
    only_in_target = target_keys - other_keys
    only_in_other  = other_keys  - target_keys
    in_both = target_keys & other_keys

    print(f"  In both      : {len(in_both):,}")
    print(f"  Only target  : {len(only_in_target):,}")
    print(f"  Only other   : {len(only_in_other):,}")

    # Show top examples by year for only-in-target
    if only_in_target:
        by_year = defaultdict(list)
        for k in only_in_target:
            by_year[k[0]].append(k)
        print()
        print("  Rows only in TARGET (sample, up to 5 per year):")
        for y in sorted(by_year)[:10]:
            for k in sorted(by_year[y])[:5]:
                r = target_dict[k]
                print(f"    {y}  {r.get('race name','')} | pos={r.get('position','')} | {r.get('horse name','')} | SP={r.get('sp','')}")
            if len(by_year[y]) > 5:
                print(f"    ... and {len(by_year[y])-5} more in {y}")

    if only_in_other:
        by_year = defaultdict(list)
        for k in only_in_other:
            by_year[k[0]].append(k)
        print()
        print("  Rows only in OTHER (sample, up to 5 per year):")
        for y in sorted(by_year)[:10]:
            for k in sorted(by_year[y])[:5]:
                r = other_dict[k]
                print(f"    {y}  {r.get('race name','')} | pos={r.get('position','')} | {r.get('horse name','')} | SP={r.get('sp','')}")
            if len(by_year[y]) > 5:
                print(f"    ... and {len(by_year[y])-5} more in {y}")

    # ---- field-value discrepancies for matching rows ----
    subsection("Field value discrepancies (rows present in both)")

    COMPARE_FIELDS = ["position", "sp", "jockey", "trainer", "draw", "field size"]
    discrep = defaultdict(list)

    for k in in_both:
        t = target_dict[k]
        o = other_dict[k]
        for field in COMPARE_FIELDS:
            tv = t.get(field, "")
            ov = o.get(field, "")
            if tv != ov and not (tv == "" and ov == ""):
                discrep[field].append((k, tv, ov))

    total_discrep = sum(len(v) for v in discrep.values())
    if total_discrep == 0:
        print("  No discrepancies found in shared rows.")
    else:
        print(f"  Total discrepancies across all fields: {total_discrep:,}")
        for field in COMPARE_FIELDS:
            items = discrep[field]
            if not items:
                continue
            print(f"\n  [{field.upper()}]  {len(items):,} discrepancies (showing up to 10):")
            for k, tv, ov in items[:10]:
                print(f"    {k[0]}  {k[1]}  {k[2]}")
                print(f"      target='{tv}'  other='{ov}'")
            if len(items) > 10:
                print(f"    ... and {len(items)-10} more")

    # ---- schema diff ----
    subsection("Schema comparison")
    t_cols = set(target_rows[0].keys()) if target_rows else set()
    o_cols = set(other_rows[0].keys()) if other_rows else set()
    only_t_cols = t_cols - o_cols
    only_o_cols = o_cols - t_cols
    if only_t_cols:
        print(f"  Columns only in TARGET : {sorted(only_t_cols)}")
    if only_o_cols:
        print(f"  Columns only in OTHER  : {sorted(only_o_cols)}")
    if not only_t_cols and not only_o_cols:
        print("  Identical column sets (after normalisation).")

print()
print(SEP)
print("  DONE")
print(SEP)
print()
