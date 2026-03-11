"""
Show top 6 combos per race and EV breakdown to validate maths.
"""
import json, itertools

with open(r'c:\Users\Brian\Documents\Cheltenham_vscode\src\data\seed-wednesday.json') as f:
    seed = json.load(f)

def remove_overround(runners):
    implied = [1/r['decimalOdds'] for r in runners]
    total = sum(implied)
    return [dict(r, normProb=imp/total) for r, imp in zip(runners, implied)]

def harville_p3(runners):
    p = [r['normProb'] for r in runners]
    n = len(p)
    result = []
    for i, runner in enumerate(runners):
        pi = p[i]
        p1 = pi
        p2 = sum(p[j]*pi/(1-p[j]) for j in range(n) if j != i)
        p3 = 0.0
        for j in range(n):
            if j == i: continue
            for k in range(n):
                if k == i or k == j: continue
                denom = 1 - p[j] - p[k]
                if denom <= 0: continue
                p3 += p[j] * (p[k]/(1-p[j])) * (pi/denom)
        result.append(dict(runner, pWin=p1, pPlace=p1+p2+p3))
    return result

def p_all3(enriched, ia, ib, ic):
    p = [r['normProb'] for r in enriched]
    total = 0.0
    for x, y, z in itertools.permutations([ia, ib, ic]):
        dy = 1 - p[x]
        dz = 1 - p[x] - p[y]
        if dy <= 0 or dz <= 0: continue
        total += p[x] * (p[y]/dy) * (p[z]/dz)
    return total

SCHEDULE = [
    ("Turner's Novices' Hurdle",       "13:20"),
    ("Brown Advisory Novices' Chase",  "14:00"),
    ("BetMGM Cup Hurdle (Coral Cup)",  "14:40"),
    ("Glenfarclas Cross Country Chase","15:20"),
    ("Champion Chase",                 "16:00"),
    ("Grand Annual Chase",             "16:40"),
    ("Champion Bumper",                "17:20"),
]

def frac(d):
    v = d - 1
    if v == int(v):
        return f"{int(v)}/1"
    # convert to nearest common fraction display
    from fractions import Fraction
    fr = Fraction(v).limit_denominator(20)
    return f"{fr.numerator}/{fr.denominator}"

for name, time in SCHEDULE:
    runners = seed[name]['runners']
    enriched = harville_p3(remove_overround(runners))

    # Show pPlace for top 6 by pPlace
    by_place = sorted(enriched, key=lambda r: r['pPlace'], reverse=True)
    print(f"\n{time}  {name}  ({len(runners)} runners)")
    print(f"  {'Horse':<25s}  {'Odds':>6s}  {'pWin':>6s}  {'pPlace':>7s}  {'SP pts':>6s}")
    for r in by_place[:8]:
        print(f"  {r['horseName']:<25s}  {frac(r['decimalOdds']):>6s}  {r['pWin']*100:5.1f}%  {r['pPlace']*100:6.1f}%  {r['decimalOdds']-1:6.2f}")

    # Top 6 combos
    combos = []
    for ia, ib, ic in itertools.combinations(range(len(enriched)), 3):
        ra, rb, rc = enriched[ia], enriched[ib], enriched[ic]
        evSp  = sum(r['pPlace'] * (r['decimalOdds']-1) for r in [ra, rb, rc])
        evWin = sum(r['pWin'] * 10                     for r in [ra, rb, rc])
        pJ    = p_all3(enriched, ia, ib, ic)
        ev    = evSp + evWin + pJ * 25
        combos.append((ev, evSp, evWin, pJ*25, [ra, rb, rc]))
    combos.sort(key=lambda x: x[0], reverse=True)

    print(f"  --- top 6 combos ---")
    for rank, (ev, evSp, evWin, evJ, picks) in enumerate(combos[:6], 1):
        names = ' / '.join(f"{r['horseName'][:12]}({frac(r['decimalOdds'])})" for r in picks)
        print(f"  #{rank}  EV={ev:.3f}  sp={evSp:.3f}  win={evWin:.3f}  jack={evJ:.3f}  | {names}")
    # Show EV gap from #1 to #10
    ev1 = combos[0][0]
    ev10 = combos[9][0] if len(combos) >= 10 else combos[-1][0]
    print(f"  Gap #1->#10: {ev1-ev10:.3f}  (total combos: {len(combos)})")
