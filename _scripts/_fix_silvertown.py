with open('src/data/historicalData.js', encoding='utf-8') as f:
    content = f.read()

# Only replace the top3 Silvertown (the one in County Hurdle top3, sp=1.2)
old = 'horseName: "Silvertown"                            , sp:    1.2,'
new = 'horseName: "Noland"                               , sp:    1.2,'
count = content.count(old)
print('Count:', count)
if count == 1:
    content2 = content.replace(old, new)
    with open('src/data/historicalData.js', 'w', encoding='utf-8') as f:
        f.write(content2)
    print('Fixed top3[0] Silvertown -> Noland for 2005 County Hurdle')
else:
    print('Unexpected count, aborting')
