"""
Generate src/data/seed-wednesday.json from the parsed race card.
Also confirms race names against schedule.js names.
"""
import json, re, fractions

TXT = r"c:\Users\Brian\Documents\Cheltenham_vscode\_scripts\_wednesday_racecard.txt"
OUT = r"c:\Users\Brian\Documents\Cheltenham_vscode\src\data\seed-wednesday.json"

# Schedule names (must match schedule.js `name` field exactly — these are the keys in raceData)
SCHEDULE = [
    ("13:20", "Turner's Novices' Hurdle"),
    ("14:00", "Brown Advisory Novices' Chase"),
    ("14:40", "BetMGM Cup Hurdle (Coral Cup)"),
    ("15:20", "Glenfarclas Cross Country Chase"),
    ("16:00", "Champion Chase"),
    ("16:40", "Grand Annual Chase"),
    ("17:20", "Champion Bumper"),
]

TIME_RE   = re.compile(r'^(\d{1,2}:\d{2})\s*[—\-]\s*(.+)')
RUNNER_RE = re.compile(r'^(\d+)\s{2,}(.+?)\s{2,}(\d+/\d+)$')

def frac_to_decimal(frac_str):
    """'9/4' → 3.25"""
    n, d = frac_str.split('/')
    return round(int(n) / int(d) + 1, 4)

with open(TXT, encoding='utf-8') as f:
    lines = [l.rstrip() for l in f]

# Parse the txt file
current_time = None
current_name = None
races = {}   # time → list of runners

for line in lines:
    m = TIME_RE.match(line)
    if m:
        current_time = m.group(1)
        current_name = m.group(2).strip()
        races[current_time] = []
        continue
    m = RUNNER_RE.match(line)
    if m and current_time:
        gate  = int(m.group(1))
        horse = m.group(2).strip()
        odds  = m.group(3)
        races[current_time].append({
            "gatePosition": gate,
            "horseName":    horse,
            "decimalOdds":  frac_to_decimal(odds)
        })

# Build seed keyed by schedule name (matching RaceDayPanel's raceData keys)
seed = {}
for time, sched_name in SCHEDULE:
    runners = races.get(time, [])
    seed[sched_name] = {
        "runners":      runners,
        "savedAt":      None,
        "originalOdds": None
    }
    print(f"  {time} {sched_name}: {len(runners)} runners")

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(seed, f, indent=2, ensure_ascii=False)

print(f"\nWritten: {OUT}")
