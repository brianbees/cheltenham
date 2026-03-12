"""
Check what data is available in the archive CSVs to fix TOP3 mismatches.
"""
import csv
import os

archive = r"c:\Users\Brian\Documents\Cheltenham_vscode\_archive"

for filename in ["historicalData_export.csv", "datafromvscode - historicalData_export (2).csv"]:
    filepath = os.path.join(archive, filename)
    if not os.path.exists(filepath):
        print(f"NOT FOUND: {filename}")
        continue

    with open(filepath, newline='', encoding='utf-8-sig') as f:
        rows = list(csv.DictReader(f))

    years = sorted(set(r['Year'] for r in rows))
    # Show top3 per race (position 1, 2, 3)
    top3_count = sum(1 for r in rows if r.get('Position', '').strip() in ('1','2','3'))

    print(f"\n=== {filename} ===")
    print(f"  Rows: {len(rows)}")
    print(f"  Years: {years}")
    print(f"  Columns: {list(rows[0].keys())}")
    print(f"  Rows with position 1/2/3: {top3_count}")

    # Sample a few rows where Position == 2 or 3
    samples = [r for r in rows if r.get('Position', '').strip() in ('2', '3')][:6]
    print("  Sample 2nd/3rd place rows:")
    for r in samples:
        print(f"    {r.get('Year')} | {r.get('Race Name')} | Pos={r.get('Position')} | {r.get('Horse Name')} | SP={r.get('SP (Decimal)')}")
