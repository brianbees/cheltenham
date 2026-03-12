import re
from collections import defaultdict

with open('src/data/historicalData.js', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r'raceName:\s*["\'](.+?)["\']', content)
counts = defaultdict(int)
for n in names:
    counts[n] += 1

for name, count in sorted(counts.items()):
    print(str(count).rjust(3) + '  ' + name)

print()
print('Total distinct race names:', len(counts))
