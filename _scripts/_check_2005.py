import csv
from collections import defaultdict

rows = []
with open('_archive/datafromvscode - historicalData_export (2).csv', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        rows.append(row)

by_race = defaultdict(list)
for r in rows:
    if r['Year'] == '2005':
        by_race[r['Race Name']].append(r)

keywords = ['champion hurdle', 'queen mother', 'stayers', 'cross country', 'ryanair', 'turners', 'county', 'arkle']
for rn, entries in sorted(by_race.items()):
    short = rn.lower()
    if any(k in short for k in keywords):
        top = sorted(entries, key=lambda x: int(x['Position']) if str(x['Position']).isdigit() else 99)[:5]
        print('--- ' + rn + ' ---')
        for r in top:
            print('  pos=' + r['Position'] + ' ' + r['Horse Name'] + ' (' + r['Jockey'] + ' / ' + r['Trainer'] + ')')
