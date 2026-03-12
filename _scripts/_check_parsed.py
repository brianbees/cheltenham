import csv, re

with open(r'_archive\parsed_missing.csv', newline='', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

years = sorted(set(r['Year'].strip() for r in rows))
top3 = [r for r in rows if r.get('Position','').strip() in ('1','2','3')]
races = sorted(set((r['Year'].strip(), r['Race Name'].strip()) for r in rows))

print(f'Total rows: {len(rows)}')
print(f'Top3 rows: {len(top3)}')
print(f'Years: {years}')
print(f'Cols: {list(rows[0].keys())}')
print(f'Unique year/race combos: {len(races)}')
print()

# Show sample second and third place
pos23 = [r for r in rows if r.get('Position','').strip() in ('2','3')]
print(f'Pos 2/3 rows: {len(pos23)}')
print('Sample:')
for r in pos23[:8]:
    print(f"  {r['Year']} | {r['Race Name'][:40]} | pos={r['Position']} | {r['Horse Name']} | SP={r['SP']}")
