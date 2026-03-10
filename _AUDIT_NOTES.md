# Cheltenham Data Audit Notes

## Status as of 2026-03-10 (commit b6905e4)

### Latest commit
`b6905e4` — Fix 2018 Fred Winter: add 6 missing runners, fieldSize 16->22

### Known Remaining Issues (484 total from last audit run)
| Type | Count |
|------|-------|
| FIELDSIZE_MISMATCH | 229 |
| TOP3_THIRD (duplicate/wrong 3rd in top3) | 98 |
| TOP3_SECOND | 90 |
| DUPLICATE_FINISH_POSITIONS | 55 |
| WINNER_MISMATCH | 7 |
| TOP3_INCOMPLETE | 5 |

### Specific known fixes needed
- **2018 Champion Bumper**: Tornado Flyer (IRE) appears TWICE in top3 (positions 2 & 3 identical) — find real 3rd place horse
- **2018 Mares' Novices' Hurdle**: only 2 top3 entries — missing 3rd place
- **2019 Pertemps Final**: 21 runners in our data vs 24 actual (3 missing) — not yet fixed

### Next Steps (priority order)
1. Fix 2018 Champion Bumper top3 (Tornado Flyer duplicate → find real 3rd place)
2. Fix 2018 Mares' Novices' Hurdle top3 (add missing 3rd place)
3. Work through remaining duplicate top3 entries (TOP3_SECOND + TOP3_THIRD)
4. Address 55 DUPLICATE_FINISH_POSITIONS
5. Address 7 WINNER_MISMATCH
6. Address 5 TOP3_INCOMPLETE
7. Address 229 FIELDSIZE_MISMATCH (lower priority — metadata only, doesn't affect model maths)

---

## Key Decisions Made
- **No reimport from CSV** — JS data has manual fixes; authoritative CSV has 225 missing runners across 80 races
- **fieldSize is metadata only** — doesn't affect probability maths
- **"Copy" CSV is corrupted** — `Copy of Gold Cup Day 2022 Results - Cleaned Data.csv` has SP errors, truncated jockey/trainer names. Never use it.
- **Authoritative CSV**: `_archive/datafromvscode - historicalData_export (2).csv`
- **Race names in JS already clean** — 32 distinct normalised names, no action needed

## Scripts (all in project root)
| Script | Purpose |
|--------|---------|
| `_compare_csvs.py` | Compares CSVs, identifies the authoritative source |
| `_clean_csv.py` | Cleans authoritative CSV → `_archive/datafromvscode_cleaned.csv` |
| `_tmp_names.py` | Lists distinct race names from historicalData.js |
| `_tmp_pick.py` | Random race picker (not committed) |

## historicalData.js Structure Notes
- Object keyed by year **number** (not string)
- Each year has `races[]` array
- Year block regex: `^\s{2}(\d{4}):\s*\{` with `re.MULTILINE`
