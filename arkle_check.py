import re

data = open('src/data/historicalData.js', encoding='utf-8').read()
year_blocks = list(re.finditer(r'^\s+(\d{4}):\s*\{', data, re.MULTILINE))

arkle_results = []
for i, ym in enumerate(year_blocks):
    yr = ym.group(1)
    end = year_blocks[i+1].start() if i+1 < len(year_blocks) else len(data)
    block = data[ym.start():end]
    if 'Arkle Challenge Trophy' not in block:
        continue

    race_start = block.find('Arkle Challenge Trophy')
    field_start = block.find('field: [', race_start)
    depth = 0
    idx = field_start + len('field: [')
    field_end = idx
    while idx < len(block):
        if block[idx] == '[': depth += 1
        elif block[idx] == ']':
            if depth == 0:
                field_end = idx
                break
            depth -= 1
        idx += 1
    field_str = block[field_start:field_end+1]

    entries = re.findall(
        r'gatePosition:\s*(\d+).*?sp:\s*([\d.]+).*?finishPosition:\s*(\d+|null)',
        field_str, re.DOTALL
    )

    gates = {}
    for gate, sp, pos in entries:
        gate = int(gate)
        sp = float(sp)
        pos = None if pos == 'null' else int(pos)
        if gate not in gates or sp < gates[gate][0]:
            gates[gate] = (sp, pos)

    if not gates:
        continue

    sorted_gates = sorted(gates.items(), key=lambda x: x[1][0])
    winner_gate = next((g for g, (sp, pos) in gates.items() if pos == 1), None)
    if winner_gate is None:
        continue
    winner_sp = gates[winner_gate][0]
    rank = next((idx+1 for idx, (g, _) in enumerate(sorted_gates) if g == winner_gate), None)
    arkle_results.append((yr, winner_gate, winner_sp, rank, len(gates)))

print(f'Arkle years in data: {len(arkle_results)}')
print()
print(f"{'Year':<6} {'Gate':<6} {'Winner SP':<12} {'Mkt Rank':<10} {'Field'}")
for r in arkle_results:
    print(f"{r[0]:<6} {r[1]:<6} {r[2]:<12} {r[3]:<10} {r[4]}")

if arkle_results:
    ranks = [r[3] for r in arkle_results]
    from collections import Counter
    c = Counter(ranks)
    print()
    print('Winner market rank distribution:')
    for k in sorted(c):
        print(f'  Rank {k}: {c[k]}x ({c[k]/len(ranks)*100:.0f}%)')
    top2 = sum(1 for r in ranks if r <= 2)
    top3 = sum(1 for r in ranks if r <= 3)
    print(f'\nTop-2 in market won: {top2}/{len(ranks)} ({top2/len(ranks)*100:.0f}%)')
    print(f'Top-3 in market won: {top3}/{len(ranks)} ({top3/len(ranks)*100:.0f}%)')
