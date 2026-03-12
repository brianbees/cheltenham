"""
Parse William Hill racecard CSV (Thursday races) → compute Harville EV → save to Supabase.

William Hill format:
  - Races separated by header rows: ['No.', '', 'Selection', 'Age, Weight', 'RP', 'Previous Odds', 'Win/EW', 'SP']
  - Per runner row: col0=gate, col2=horse name (first line, strip rating in parens), col6=Win/EW=current odds
  - Non-runners: rows after a 'Non-runners' marker row — skip these
  - Order of race blocks matches SCHEDULE below

Usage:
  python _scripts/_parse_thursday_csv.py <path-to-csv>
  e.g. python _scripts/_parse_thursday_csv.py "_data/chelt wednsday races and odds - will hill odds thursday .csv"
"""
import csv, re, json, itertools, sys, urllib.request
from datetime import datetime, timezone

API = "https://cheltenham.vercel.app/api/save-results"

SCHEDULE = [
    ("Ryanair Mares' Novices' Hurdle", "Mares' Novices' Hurdle",    "13:20"),
    ("Jack Richards Novices' Chase",   "Turners Novices' Chase",    "14:00"),
    ("Mares' Hurdle",                  "Dawn Run Mares' Hurdle",    "14:40"),
    ("Stayers' Hurdle",                "Stayers' Hurdle",           "15:20"),
    ("Ryanair Chase",                  "Ryanair Chase",             "16:00"),
    ("Pertemps Handicap Hurdle",       "Pertemps Final",            "16:40"),
    ("Kim Muir Handicap Chase",        "Kim Muir",                  "17:20"),
]

def frac_to_decimal(frac):
    frac = frac.strip().replace('-', '/')
    n, d = frac.split('/')
    return int(n) / int(d) + 1

def clean_horse(raw):
    return re.sub(r'\s*\(\d+\)\s*$', '', raw.split('\n')[0]).strip()

def parse_blocks(csv_path):
    with open(csv_path, encoding='utf-8-sig') as f:
        rows = list(csv.reader(f))
    blocks, current = [], []
    for row in rows:
        if row[0].strip() == 'No.':
            if current:
                blocks.append(current)
            current = []
        else:
            current.append(row)
    if current:
        blocks.append(current)
    return blocks

def parse_runners(rows):
    runners, skip = [], False
    for row in rows:
        if not any(r.strip() for r in row):
            continue
        if row[0].strip() == 'Non-runners':
            skip = True
            continue
        if skip:
            continue
        gate_raw = row[0].strip()
        if not gate_raw.isdigit():
            continue
        horse = clean_horse(row[2]) if len(row) > 2 else ''
        odds_raw = row[6].strip() if len(row) > 6 else ''
        if not horse or not odds_raw or '/' not in odds_raw:
            continue
        # Previous Odds col (col5): newline-separated, most-recent first — take oldest as baseline
        prev_raw = row[5].strip() if len(row) > 5 else ''
        prev_lines = [l.strip() for l in prev_raw.split('\n') if '/' in l.strip()]
        orig_raw = prev_lines[-1] if prev_lines else None
        try:
            dec = frac_to_decimal(odds_raw)
            orig = frac_to_decimal(orig_raw) if orig_raw else dec
            runners.append({'gatePosition': int(gate_raw), 'horseName': horse,
                            'decimalOdds': dec, 'originalDecimalOdds': orig})
        except Exception as e:
            print(f"  SKIP gate={gate_raw} odds={odds_raw}: {e}")
    return runners

def remove_overround(runners):
    imp = [1 / r['decimalOdds'] for r in runners]
    tot = sum(imp)
    return [dict(r, normProb=i / tot) for r, i in zip(runners, imp)]

def harville_p3(runners):
    p = [r['normProb'] for r in runners]; n = len(p)
    result = []
    for i, runner in enumerate(runners):
        pi = p[i]
        p2 = sum(p[j] * pi / (1 - p[j]) for j in range(n) if j != i)
        p3 = 0.0
        for j in range(n):
            if j == i: continue
            for k in range(n):
                if k == i or k == j: continue
                d = 1 - p[j] - p[k]
                if d <= 0: continue
                p3 += p[j] * (p[k] / (1 - p[j])) * (pi / d)
        result.append(dict(runner, pWin=pi, pPlace=pi + p2 + p3))
    return result

def p_all3(enriched, ia, ib, ic):
    p = [r['normProb'] for r in enriched]; total = 0.0
    for x, y, z in itertools.permutations([ia, ib, ic]):
        dy = 1 - p[x]; dz = 1 - p[x] - p[y]
        if dy <= 0 or dz <= 0: continue
        total += p[x] * (p[y] / dy) * (p[z] / dz)
    return total

def rank_combos(enriched):
    combos = []
    for ia, ib, ic in itertools.combinations(range(len(enriched)), 3):
        ra, rb, rc = enriched[ia], enriched[ib], enriched[ic]
        evSp  = sum(r['pPlace'] * r['decimalOdds'] for r in [ra, rb, rc])
        evWin = sum(r['pWin'] * 10 for r in [ra, rb, rc])
        pJ    = p_all3(enriched, ia, ib, ic)
        ev    = evSp + evWin + pJ * 25
        combos.append({'runners': [ra, rb, rc], 'ev': ev, 'evSp': evSp,
                       'evWin': evWin, 'evJackpot': pJ * 25, 'pJackpot': pJ})
    combos.sort(key=lambda c: c['ev'], reverse=True)
    for i, c in enumerate(combos): c['rank'] = i + 1
    return combos

if __name__ == '__main__':
    csv_path = sys.argv[1] if len(sys.argv) > 1 else input("CSV path: ").strip()
    blocks = parse_blocks(csv_path)
    # Drop leading empty blocks (all-races format has a preamble block before first No. header)
    race_blocks = [b for b in blocks if parse_runners(b)]
    print(f"Found {len(blocks)} blocks, {len(race_blocks)} with runners")
    blocks = race_blocks
    ts = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')
    for idx, (sched_name, data_name, race_time) in enumerate(SCHEDULE):
        if idx >= len(blocks):
            print(f"  SKIP {sched_name} — no block"); continue
        runners = parse_runners(blocks[idx])
        if len(runners) < 3:
            print(f"  SKIP {sched_name} — only {len(runners)} runners"); continue
        enriched = harville_p3(remove_overround(runners))
        ranked   = rank_combos(enriched)
        top = ranked[0]
        gates = ', '.join(f"Gate {r['gatePosition']} {r['horseName']}" for r in top['runners'])
        payload = {
            'race': data_name, 'timestamp': ts, 'fieldSize': len(runners),
            'runners': [{'gatePosition': r['gatePosition'], 'horseName': r['horseName'],
                         'decimalOdds': r['decimalOdds'], 'pWin': round(r['pWin'], 6),
                         'pPlace': round(r['pPlace'], 6), 'spPoints': round(r['decimalOdds'] - 1, 2)}
                        for r in enriched],
            'combinations': [{'rank': c['rank'], 'gates': [r['gatePosition'] for r in c['runners']],
                               'horses': [r['horseName'] for r in c['runners']], 'ev': round(c['ev'], 4),
                               'evSp': round(c['evSp'], 4), 'evWin': round(c['evWin'], 4),
                               'evJackpot': round(c['evJackpot'], 4), 'pJackpot': round(c['pJackpot'], 6)}
                              for c in ranked],
        }
        body = json.dumps(payload).encode('utf-8')
        req  = urllib.request.Request(API, data=body, headers={'Content-Type': 'application/json'}, method='POST')
        with urllib.request.urlopen(req, timeout=10) as resp:
            json.loads(resp.read())
        print(f"  SAVED {race_time} {data_name} ({len(runners)} runners) | Top: {gates} | EV {top['ev']:.2f}")
    print("\nDone.")
