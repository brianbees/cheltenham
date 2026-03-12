// Detail view for fixable winner mismatches
import { historicalData } from './src/data/historicalData.js';

const targets = [
  ['2005', 'County Hurdle'],
  ['2015', 'Triumph Hurdle'],
  ['2015', 'Martin Pipe'],
  ['2016', 'Martin Pipe'],
  ['2023', 'County Hurdle'],
  ["2023", "Dawn Run Mares' Hurdle"],
];

for (const [year, raceName] of targets) {
  const races = historicalData[year]?.races ?? historicalData[year] ?? [];
  const race = races.find(r => r.raceName === raceName);
  if (!race) continue;
  console.log(`\n${year}/${raceName}  (fieldSize=${race.fieldSize})`);
  console.log('  top3:', race.top3?.map(t => `[gate=${t.gatePosition} "${t.horseName}"]`).join(', '));
  const placed = race.field?.filter(h => h.finishPosition <= 3).sort((a,b) => a.finishPosition - b.finishPosition);
  console.log('  field pos 1-3:', placed?.map(h => `pos=${h.finishPosition} gate=${h.gatePosition} "${h.horseName}" sp=${h.sp} jockey="${h.jockey}" trainer="${h.trainer}"`).join('\n             '));
}
