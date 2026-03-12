import { historicalData } from './src/data/historicalData.js';

const issues = [];
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    const loc = `${year}/${race.raceName}`;
    if (race.field && race.field.length !== race.fieldSize)
      issues.push({ type: 'FIELDSIZE_MISMATCH', loc, detail: `fieldSize=${race.fieldSize} field.length=${race.field.length}` });
    if (race.field) {
      const names = race.field.map(h => h.horseName);
      const dupes = [...new Set(names.filter((n,i) => names.indexOf(n) !== i))];
      if (dupes.length) issues.push({ type: 'DUPLICATE_FIELD_ENTRY', loc, detail: dupes.join(', ') });
      for (const h of race.field) {
        if (h.sp === 1.0)  issues.push({ type: 'SP_EQUALS_1', loc, detail: `"${h.horseName}"` });
        if (h.sp == null || h.sp < 0)  issues.push({ type: 'SP_INVALID', loc, detail: `"${h.horseName}" sp=${h.sp}` });
        if (h.finishPosition != null && h.finishPosition > race.fieldSize)
          issues.push({ type: 'FINISH_POS_EXCEEDS_FIELDSIZE', loc, detail: `"${h.horseName}" pos=${h.finishPosition} fs=${race.fieldSize}` });
      }
      const positions = race.field.filter(h => h.finishPosition != null).map(h => h.finishPosition);
      const dupePos = [...new Set(positions.filter((p,i) => positions.indexOf(p) !== i))];
      if (dupePos.length) issues.push({ type: 'DUPLICATE_FINISH_POSITIONS', loc, detail: `pos: ${dupePos.join(', ')}` });
    }
    if (race.top3 && race.field) {
      for (const t of race.top3)
        if (!race.field.some(h => h.horseName === t.horseName))
          issues.push({ type: 'TOP3_NOT_IN_FIELD', loc, detail: `"${t.horseName}"` });
    }
    if (race.top3?.[0] && race.field) {
      const w = race.field.find(h => h.horseName === race.top3[0].horseName);
      if (w && w.finishPosition !== 1) issues.push({ type: 'TOP3_WINNER_MISMATCH', loc, detail: `"${race.top3[0].horseName}" pos=${w.finishPosition}` });
    }
    if (race.top3?.[1] && race.field) {
      const s2 = race.field.find(h => h.horseName === race.top3[1].horseName);
      if (s2 && s2.finishPosition !== 2) issues.push({ type: 'TOP3_SECOND_MISMATCH', loc, detail: `"${race.top3[1].horseName}" pos=${s2.finishPosition}` });
    }
    if (race.top3?.[2] && race.field) {
      const t3 = race.field.find(h => h.horseName === race.top3[2].horseName);
      if (t3 && t3.finishPosition !== 3) issues.push({ type: 'TOP3_THIRD_MISMATCH', loc, detail: `"${race.top3[2].horseName}" pos=${t3.finishPosition}` });
    }
    if (race.top3 && race.top3.length !== 3 && race.fieldSize >= 3)
      issues.push({ type: 'TOP3_INCOMPLETE', loc, detail: `top3.length=${race.top3.length}` });
  }
}

const byType = {};
for (const i of issues) { if (!byType[i.type]) byType[i.type] = []; byType[i.type].push(i); }

console.log(`\nTotal issues: ${issues.length}`);
console.log('='.repeat(50));
for (const [type, items] of Object.entries(byType).sort((a,b) => b[1].length - a[1].length))
  console.log(`  ${String(items.length).padStart(3)}x  ${type}`);
