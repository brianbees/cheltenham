import { historicalData } from './src/data/historicalData.js';

console.log('\n=== SP_INVALID (sp <= 0) ===');
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    if (!race.field) continue;
    for (const h of race.field) {
      if (h.sp <= 0) console.log(`  ${year}/${race.raceName}: "${h.horseName}" sp=${h.sp}`);
    }
  }
}

console.log('\n=== DUPLICATE_FIELD_ENTRY (remaining 3) ===');
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    if (!race.field) continue;
    const names = race.field.map(h => h.horseName);
    const dupes = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    if (dupes.length > 0) console.log(`  ${year}/${race.raceName}: ${dupes.join(', ')}`);
  }
}

console.log('\n=== TOP3_INCOMPLETE ===');
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    if (race.top3 && race.top3.length !== 3 && race.fieldSize >= 3)
      console.log(`  ${year}/${race.raceName}: top3.length=${race.top3.length}, fieldSize=${race.fieldSize}`);
  }
}

console.log('\n=== FINISH_POS_EXCEEDS_FIELDSIZE (first 20) ===');
let shown = 0;
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    if (!race.field) continue;
    for (const h of race.field) {
      if (h.finishPosition != null && h.finishPosition > race.fieldSize) {
        if (shown < 20) { console.log(`  ${year}/${race.raceName}: "${h.horseName}" pos=${h.finishPosition} fieldSize=${race.fieldSize}`); shown++; }
      }
    }
  }
}
