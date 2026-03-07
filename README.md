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
  App.jsx                  # Root component, routing, nav bar
  main.jsx                 # React entry point
  index.css                # Tailwind base styles

  data/
    historicalData.js      # All Gold Cup Day results (2010–present)
                           # + helper functions: spToPoints, getRaceHistory,
                           #   getPerfectScore, getAllYearSummaries

  components/
    HistoricalDisplay.jsx  # Route /          — raw data verification view
    RaceHistoryPanel.jsx   # Route /race-history — per-race character analysis

  engine/                  # Maths engine (Phase 2 — not yet implemented)
    probability.js         # Overround removal + Harville formula for P(top-3)
    optimiser.js           # Enumerate C(N,3) combinations, rank by EV
    scorer.js              # Live scorer: picks vs. result → points
```

---

## Build Phases

- [x] **Phase 1** — Historical data + UI (HistoricalDisplay, RaceHistoryPanel)
- [ ] **Phase 2** — Maths engine (`probability.js`, `optimiser.js`, `scorer.js`)
- [ ] **Phase 3** — Live race input + optimal pick recommender
- [ ] **Phase 4** — Live leaderboard / scoring during Gold Cup Day
