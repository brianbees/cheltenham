# Champion Tipster

A React app for analysing and optimising selections in the **Champion Tipster** competition, run on Cheltenham Gold Cup Day.

---

## Getting Started

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

**Stack:** React 18, React Router v7, Zustand, Tailwind CSS v3, Vite

---

## Competition Rules

The competition runs across **7 races on Gold Cup Day**. In each race, players pick **3 gate (stall) numbers**.

### Scoring

| Outcome | Points |
|---|---|
| One of your 3 gates finishes placed (top 3) | SP points = decimal odds − 1 (e.g. 10/1 = 10 pts) |
| Your gate finishes **1st** | +10 win bonus |
| All 3 of your gates finish in the top 3 | +25 jackpot bonus |

Points accumulate across all 7 races. The player with the highest total wins.

### Example
Pick gates 4, 7, 12. Gate 7 wins at 10/1 (decimal 11.0):
- SP points: 10
- Win bonus: +10
- **Total for that race: 20 pts**

If gates 4, 7, and 12 all finish in the top 3 (in any order), add the jackpot: +25.

### SP Storage
All SPs in `historicalData.js` are stored as **decimal odds** (e.g. 20/1 → `21.0`).  
Points = decimal − 1.

---

## Race Character Classification

Each race is classified based on its **average SP total** (sum of the three placed horses' SP points across historical years):

| Classification | Average SP Total | Meaning |
|---|---|---|
| **Banker Race** | ≤ 20 | Favourites tend to dominate — reward is low but predictable |
| **Judgement Race** | 21 – 40 | Mix of market leaders and mid-priced runners |
| **Swing Race** | > 40 | Big-priced horses frequently place — high variance, high ceiling |

---

## Project Structure

```
src/
  App.jsx                        # Root component, routing, nav bar
  main.jsx                       # React entry point
  index.css                      # Tailwind base styles

  data/
    historicalData.js            # All Gold Cup Day results (2002–present)
                                 # + helpers: spToPoints, getRaceHistory,
                                 #   getPerfectScore, getAllYearSummaries
    schedule.js                  # Race schedule metadata (times, names, gates)
    seed-tuesday.json            # Race Day seed: Tuesday (Day 1) odds + runners
    seed-wednesday.json          # Race Day seed: Wednesday (Day 2)
    seed-thursday.json           # Race Day seed: Thursday (Day 3)
    seed-friday.json             # Race Day seed: Friday (Day 4 — Gold Cup Day)

  components/
    HistoricalDisplay.jsx        # Route /                  — raw data verification
    RaceHistoryPanel.jsx         # Route /race-history      — per-race character analysis
    OptimiserPanel.jsx           # Route /optimiser         — Harville best-combo picker
                                 # Route /optimiser/henery  — Henery variant
    BacktesterPanel.jsx          # Route /backtester        — simulate picks vs. history
    RaceCoveragePanel.jsx        # Route /race-coverage     — field/gate coverage view
    ResultsTablePanel.jsx        # Route /results-table     — live results entry table
    RaceDayPanel.jsx             # Route /race-day          — seed loader + EV combos
    AddResultsPanel.jsx          # Route /add-results       — manual result entry
    FridayRacecardPanel.jsx      # Route /friday-racecard   — Friday odds display
    FridaySPCompositionPanel.jsx # Route /friday-sp-composition — SP band analysis table
    HelpPanel.jsx                # Route /help              — competition rules + help

  engine/
    probability.js               # Overround removal · Harville · Henery pWin
    optimiser.js                 # Enumerate C(N,3) combinations, rank by EV
    scorer.js                    # Live scorer: picks vs. result → points
```

---

## Data Pipeline — Loading Race Cards Each Day

Each festival day, download the William Hill racecard as a CSV export and run the appropriate parse script. This computes Harville probabilities, ranks all gate combinations by EV, and POSTs the results to the Supabase-backed API. Then click **↩ Restore saved** in the app.

### CSV Format

William Hill exports come in two shapes — both are handled automatically:

| Format | Description | Example file |
|---|---|---|
| **Single-race** | One race per file, `No.` header at top | `will hill odds thursday .csv` |
| **All-races** | All 7 races in one file, preamble block before first `No.` header | `Sheet8.csv`, `willhill thursday all races.csv` |

The parse scripts skip any leading empty blocks, so both formats work without modification.

### Parse Scripts

| Script | Day | Source data | Usage |
|---|---|---|---|
| `_parse_williamhill_csv.py` | **Tuesday (Day 1)** | WH all-races CSV | `python _scripts/_parse_williamhill_csv.py "_data/<file>.csv"` |
| `_parse_wednesday_csv.py` | **Wednesday (Day 2)** | WH CSV → racecard text | `python _scripts/_parse_wednesday_csv.py` (path hardcoded) |
| `_parse_thursday_csv.py` | **Thursday (Day 3)** | WH CSV (single or all-races) | `python _scripts/_parse_thursday_csv.py "_data/<file>.csv"` |
| `_parse_friday_odds.py` | **Friday (Day 4)** | WH CSV → ODDS constant | `python _scripts/_parse_friday_odds.py "_data/<file>.csv"` |
| `_gen_wednesday_seed.py` | Wednesday | Converts `_wednesday_racecard.txt` → seed JSON | `python _scripts/_gen_wednesday_seed.py` |
| `_save_wednesday_races.py` | Wednesday | Reads `seed-wednesday.json` → POSTs to API | `python _scripts/_save_wednesday_races.py` |

### Day-by-Day Workflow

**Thursday:**
```bash
python _scripts/_parse_thursday_csv.py "_data/<filename>.csv"
# Then click ↩ Restore saved in the app
```

**Friday (Gold Cup Day):**
```bash
# Update ODDS constant in FridayRacecardPanel.jsx:
python _scripts/_parse_friday_odds.py "_data/<filename>.csv"
# Update Race Day seed (edit src/data/seed-friday.json with latest prices, or use 🌱 Load seed & save)
# Get Harville/Henery best-combo picks for all 7 races:
node _scripts/_combos_friday.mjs
```

**Wednesday:**
```bash
python _scripts/_parse_wednesday_csv.py       # → _scripts/_wednesday_racecard.txt
python _scripts/_gen_wednesday_seed.py        # → src/data/seed-wednesday.json
python _scripts/_save_wednesday_races.py      # → POSTs to API
```

**Tuesday / any all-races WH file:**
```bash
python _scripts/_parse_williamhill_csv.py "_data/<filename>.csv"
```

### Utility / Analysis Scripts

| Script | Purpose |
|---|---|
| `_combos_friday.mjs` | Runs Harville + Henery engine against `seed-friday.json`, prints best 3-gate combo per race — `node _scripts/_combos_friday.mjs` |
| `_check_combos.py` | Validates combo picks against historical results |
| `_check_csv.py` / `_check_csv_jt.py` | Sanity-checks parsed CSV output |
| `_compare_csvs.py` | Diffs two CSV exports to spot odds movement |
| `_csv_top3_fixes.py` / `_csv_top3_lookup.py` | Top-3 correction helpers for historical data |
| `_export_races.mjs` | Exports historical race objects as JSON |
| `_final_audit.mjs` | End-to-end data integrity audit |
| `_gaps_audit.mjs` | Finds missing years/races in historical data |
| `_inspect.mjs` | One-off data inspector |
| `_winner_detail.mjs` | Prints winner details from historical data |
| `_winner_fix_prep.mjs` | Prepares winner fix payloads |
| `_fix_all.py` / `_fix_epatante.py` etc. | One-off historical data corrections |
| `_merge_mildmay_plate.py` | Fixes 2002–2005 duplicate Plate/Mildmay Chase entries |
| `_apply_jockey_trainer.py` | Bulk-applies jockey/trainer data from `_jockey_trainer_fixes.json` |
| `_delete_bad_timestamps.py` | Removes malformed timestamp entries from results store |

### CSV Column Reference (William Hill format)

| Col | Content |
|---|---|
| 0 | Gate number |
| 2 | Horse name (+ rating in parens, stripped) |
| 5 | Previous odds (newline-separated, most-recent first — oldest used as movement baseline) |
| 6 | Current Win/EW odds (fractional) |

### When you paste a new CSV

Tell Copilot: *"new CSV in `_data/` — Thursday format"* (or Wednesday/Tuesday). It will run the right script and re-save all races. The `originalDecimalOdds` field is extracted from column 5 so odds movement arrows (▼/▲) show immediately on Restore.

---

## Build Phases

- [x] **Phase 1** — Historical data + UI (HistoricalDisplay, RaceHistoryPanel)
- [x] **Phase 2** — Maths engine (Harville, Henery, optimiser, scorer)
- [x] **Phase 3** — Live race input + optimal pick recommender (RaceDayPanel)
- [x] **Phase 4** — Friday racecard page with live WH odds (FridayRacecardPanel)
- [x] **Phase 5** — SP composition analysis page (FridaySPCompositionPanel)
- [ ] **Phase 6** — Live leaderboard / scoring during Gold Cup Day
