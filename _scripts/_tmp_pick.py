import random, re

random.seed(99)

with open('src/data/historicalData.js', encoding='utf-8') as f:
    content = f.read()

# Structure is:  2002: { races: [ { raceName: "..." }, ... ] }
# Extract year blocks and race names within each
races = []
for year_match in re.finditer(r'^\s{2}(\d{4}):\s*\{', content, re.MULTILINE):
    year = year_match.group(1)
    # Find all raceNames after this year marker until next year marker
    pos = year_match.end()
    next_year = re.search(r'^\s{2}\d{4}:\s*\{', content[pos:], re.MULTILINE)
    block = content[pos: pos + next_year.start()] if next_year else content[pos:]
    for name in re.findall(r'raceName:\s*["\'](.+?)["\']', block):
        races.append((year, name))

eligible = [(y, r) for y, r in races if y not in ('2026', '2025', '2024')]
pick = random.choice(eligible)
print('Selected:', pick[0], '-', pick[1])
