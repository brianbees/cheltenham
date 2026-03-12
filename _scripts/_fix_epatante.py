with open('src/data/historicalData.js', encoding='utf-8') as f:
    content = f.read()

import re
# Find exact match context
m = re.search(r'horseName: "Epatante \(FR\)"(\s*), sp:   17\.0,  jockey: "Gavin Sheehan"', content)
if m:
    print('Found! spacing repr:', repr(m.group(1)))
    old = m.group(0)
    # Replace just the horseName part
    new = old.replace('Epatante (FR)', 'You Wear It Well')
    # Adjust spacing to keep alignment (You Wear It Well is 15 chars, Epatante (FR) is 12)
    content2 = content.replace(old, new, 1)
    count_after = content2.count('You Wear It Well')
    count_before = content.count('You Wear It Well')
    print('Added occurrences:', count_after - count_before)
    with open('src/data/historicalData.js', 'w', encoding='utf-8') as f:
        f.write(content2)
    print('Fixed: 2023 Dawn Run top3[0] Epatante -> You Wear It Well')
else:
    print('Pattern not found!')
