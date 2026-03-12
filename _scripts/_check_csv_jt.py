import csv
from collections import defaultdict

rows = []
with open('_archive/datafromvscode - historicalData_export (2).csv', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

year_stats = defaultdict(lambda: {'total': 0, 'no_jt': 0})
for r in rows:
    y = r['Year']
    year_stats[y]['total'] += 1
    if not r['Jockey'].strip() and not r['Trainer'].strip():
        year_stats[y]['no_jt'] += 1

for y in sorted(year_stats):
    s = year_stats[y]
    if s['no_jt'] > 0:
        pct = 100 * s['no_jt'] / s['total']
        print(y + ': ' + str(s['total']) + ' rows, ' + str(s['no_jt']) + ' empty jockey/trainer (' + str(round(pct)) + '%)')
