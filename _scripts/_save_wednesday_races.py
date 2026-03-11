"""
Compute Harville probabilities + top-3 combinations and POST to the local
dev server API (/api/save-results) for all 7 Wednesday races.
"""
import json, itertools, urllib.request, urllib.error
from datetime import datetime, timezone

SEED = r"c:\Users\Brian\Documents\Cheltenham_vscode\src\data\seed-wednesday.json"
API  = "https://cheltenham.vercel.app/api/save-results"

# ── Schedule: (display_name, data_name, time) ────────────────────────────────
SCHEDULE = [
    ("Turner's Novices' Hurdle",        "Ballymore Novices Hurdle",      "13:20"),
    ("Brown Advisory Novices' Chase",   "Brown Advisory Novices Chase",  "14:00"),
    ("BetMGM Cup Hurdle (Coral Cup)",   "Coral Cup",                     "14:40"),
    ("Glenfarclas Cross Country Chase", "Cross Country Chase",            "15:20"),
    ("Champion Chase",                  "Queen Mother Champion Chase",    "16:00"),
    ("Grand Annual Chase",              "Grand Annual",                   "16:40"),
    ("Champion Bumper",                 "Champion Bumper",                "17:20"),
]

# ── Harville probability engine ───────────────────────────────────────────────

def remove_overround(runners):
    implied = [1.0 / r['decimalOdds'] for r in runners]
    total   = sum(implied)
    return [dict(r, normProb=imp/total) for r, imp in zip(runners, implied)]

def harville_p3(runners):
    p = [r['normProb'] for r in runners]
    n = len(p)
    result = []
    for i, runner in enumerate(runners):
        pi = p[i]
        p1 = pi
        p2 = sum(p[j] * pi / (1 - p[j]) for j in range(n) if j != i)
        p3 = 0.0
        for j in range(n):
            if j == i: continue
            for k in range(n):
                if k == i or k == j: continue
                denom = 1 - p[j] - p[k]
                if denom <= 0: continue
                p3 += p[j] * (p[k] / (1 - p[j])) * (pi / denom)
        result.append(dict(runner, pWin=p1, pPlace=p1+p2+p3))
    return result

def enrich(runners):
    return harville_p3(remove_overround(runners))

def p_all_three_place(enriched, ia, ib, ic):
    p = [r['normProb'] for r in enriched]
    total = 0.0
    for x, y, z in itertools.permutations([ia, ib, ic]):
        dy = 1 - p[x]
        dz = 1 - p[x] - p[y]
        if dy <= 0 or dz <= 0: continue
        total += p[x] * (p[y] / dy) * (p[z] / dz)
    return total

def rank_combinations(enriched):
    n = len(enriched)
    combos = []
    for ia, ib, ic in itertools.combinations(range(n), 3):
        ra, rb, rc = enriched[ia], enriched[ib], enriched[ic]
        evSp      = sum(r['pPlace'] * (r['decimalOdds'] - 1) for r in [ra, rb, rc])
        evWin     = sum(r['pWin'] * 10                       for r in [ra, rb, rc])
        pJackpot  = p_all_three_place(enriched, ia, ib, ic)
        evJackpot = pJackpot * 25
        ev        = evSp + evWin + evJackpot
        combos.append({
            'runners':   [ra, rb, rc],
            'ev':        ev,
            'evSp':      evSp,
            'evWin':     evWin,
            'evJackpot': evJackpot,
            'pJackpot':  pJackpot,
        })
    combos.sort(key=lambda c: c['ev'], reverse=True)
    for i, c in enumerate(combos):
        c['rank'] = i + 1
    return combos

# ── Main ──────────────────────────────────────────────────────────────────────

with open(SEED, encoding='utf-8') as f:
    seed = json.load(f)

run_ts = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')

for sched_name, data_name, race_time in SCHEDULE:
    entry = seed.get(sched_name)
    if not entry or not entry.get('runners'):
        print(f"  SKIP {sched_name} — no runners in seed")
        continue

    raw_runners = entry['runners']
    enriched    = enrich(raw_runners)
    ranked      = rank_combinations(enriched)

    ts = run_ts  # actual time of this script run — ensures latest save wins

    payload = {
        'race':      data_name,
        'timestamp': ts,
        'fieldSize': len(raw_runners),
        'runners': [{
            'gatePosition': r['gatePosition'],
            'horseName':    r['horseName'],
            'decimalOdds':  r['decimalOdds'],
            'pWin':         round(r['pWin'],   6),
            'pPlace':       round(r['pPlace'], 6),
            'spPoints':     round(r['decimalOdds'] - 1, 2),
        } for r in enriched],
        'combinations': [{
            'rank':      c['rank'],
            'gates':     [r['gatePosition'] for r in c['runners']],
            'horses':    [r['horseName']    for r in c['runners']],
            'ev':        round(c['ev'],        4),
            'evSp':      round(c['evSp'],      4),
            'evWin':     round(c['evWin'],     4),
            'evJackpot': round(c['evJackpot'], 4),
            'pJackpot':  round(c['pJackpot'],  6),
        } for c in ranked],
    }

    body = json.dumps(payload).encode('utf-8')
    req  = urllib.request.Request(API, data=body,
                                  headers={'Content-Type': 'application/json'},
                                  method='POST')
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            top = ranked[0]
            gates = ', '.join(f"Gate {r['gatePosition']} {r['horseName']}" for r in top['runners'])
            print(f"  SAVED {race_time} {data_name} ({len(raw_runners)} runners) "
                  f"| Top combo: {gates} | EV {top['ev']:.2f}")
    except Exception as e:
        print(f"  ERROR {data_name}: {e}")

print("\nDone.")
