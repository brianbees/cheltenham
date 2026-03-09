import re
data = open('src/data/historicalData.js', encoding='utf-8').read()
names = set(re.findall(r'raceName:\s*"([^"]+)"', data))
arkle = sorted([n for n in names if 'rkle' in n or 'Arkle' in n])
print("Arkle variants:", arkle)
print()
# also show a small snippet around 'Arkle' in the data
idx = data.find('Arkle')
if idx >= 0:
    print("Context:", repr(data[max(0,idx-50):idx+100]))
