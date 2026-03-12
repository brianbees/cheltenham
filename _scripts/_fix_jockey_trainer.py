"""
Fix missing jockey/trainer in field[] entries using the archive CSV.
Matches by (year, race name as substring, horse name).
"""
import json, csv, re

# ── Load races dump ──────────────────────────────────────────────────────────
with open("_races_dump.json") as f:
    races = json.load(f)

# ── Load archive CSV ─────────────────────────────────────────────────────────
csv_rows = []
with open("_archive/datafromvscode - historicalData_export (2).csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        csv_rows.append(row)

# ── Build CSV lookup: (year, csv_race_name_lower, horse_name_lower) → {jockey, trainer} ──
# Use horse name (lower, stripped) as primary key within a year+race combo.
def norm_horse(name):
    """Lowercase, strip country suffixes like (IRE), (FR), (GB), (GER), (USA)."""
    n = name.lower().strip()
    n = re.sub(r'\s*\([A-Za-z]{2,3}\)\s*$', '', n).strip()
    return n

def norm_race(name):
    """Lowercase, strip grade suffixes and parenthetical extras."""
    n = name.lower().strip()
    n = re.sub(r'\s*\(grade \d\)\s*', ' ', n)          # (Grade 1) etc.
    n = re.sub(r'\s*\([^)]+\)\s*', ' ', n)             # anything in parens
    n = re.sub(r'\s+', ' ', n).strip()
    return n

# Build: year → list of {norm_race, norm_horse, jockey, trainer}
csv_lookup = {}  # key: (year, norm_horse) → [(norm_race, jockey, trainer), ...]
for row in csv_rows:
    year  = row["Year"]
    jockey  = row["Jockey"].strip()
    trainer = row["Trainer"].strip()
    if not jockey and not trainer:
        continue
    nh = norm_horse(row["Horse Name"])
    nr = norm_race(row["Race Name"])
    key = (year, nh)
    csv_lookup.setdefault(key, []).append((nr, jockey, trainer))

# ── Build list of missing entries ────────────────────────────────────────────
missing = []
for r in races:
    year, race = r["year"], r["raceName"]
    for h in r.get("field", []):
        if not h.get("jockey") or not h.get("trainer"):
            missing.append({
                "year": year,
                "race": race,
                "norm_race": norm_race(race),
                "horseName": h["horseName"],
                "norm_horse": norm_horse(h["horseName"]),
                "gate": h.get("gatePosition"),
                "sp": h.get("sp"),
                "has_jockey":  bool(h.get("jockey")),
                "has_trainer": bool(h.get("trainer")),
            })

print(f"Total missing jockey/trainer entries: {len(missing)}")

# ── Attempt lookup ────────────────────────────────────────────────────────────
fixes = []
no_csv_year = 0
no_match = []
ambiguous = []

for m in missing:
    year, race, nh, nr = m["year"], m["race"], m["norm_horse"], m["norm_race"]
    key = (year, nh)
    candidates = csv_lookup.get(key, [])

    if not candidates:
        no_csv_year += 1
        continue

    # Try to pick candidate where the CSV race name contains the JS race name
    matched = []
    for (crace, jockey, trainer) in candidates:
        if nr in crace or crace in nr:
            matched.append((jockey, trainer))

    if not matched:
        # Fall back: if only one candidate for this horse in this year, use it
        unique_jt = list({(j, t) for _, j, t in candidates})
        if len(unique_jt) == 1:
            matched = [unique_jt[0]]

    if not matched:
        no_match.append(m)
        continue

    # De-duplicate
    unique = list({ (j, t) for j, t in matched })
    if len(unique) > 1:
        ambiguous.append({**m, "candidates": unique})
        continue

    jockey, trainer = unique[0]
    fixes.append({
        "year": year,
        "race": race,
        "horseName": m["horseName"],
        "gate": m["gate"],
        "sp": m["sp"],
        "jockey": jockey,
        "trainer": trainer,
    })

print(f"Fixable from CSV:   {len(fixes)}")
print(f"No CSV year/data:   {no_csv_year}")
print(f"No race name match: {len(no_match)}")
print(f"Ambiguous:          {len(ambiguous)}")
print()
print("Sample fixes:")
for f in fixes[:10]:
    print(f"  {f['year']}/{f['race']}: {f['horseName']} → {f['jockey']} / {f['trainer']}")
if ambiguous:
    print("Sample ambiguous:")
    for a in ambiguous[:5]:
        print(f"  {a['year']}/{a['race']}: {a['horseName']} → {a['candidates']}")

# ── Save fixes to JSON for the apply script ───────────────────────────────────
with open("_jockey_trainer_fixes.json", "w") as f:
    json.dump(fixes, f, indent=2)
print(f"\nFixes saved to _jockey_trainer_fixes.json")
