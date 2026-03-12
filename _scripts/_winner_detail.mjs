// Show winner mismatches: what top3[0] says vs what field[] says
import { historicalData } from './src/data/historicalData.js';

const mismatches = [
  ['2005', "Turners Novices' Chase"],
  ['2005', 'Champion Hurdle'],
  ['2005', 'Queen Mother Champion Chase'],
  ["2005", "Stayers' Hurdle"],
  ['2005', 'Cross Country Chase'],
  ['2005', 'County Hurdle'],
  ['2005', 'Ryanair Chase'],
  ['2015', 'Triumph Hurdle'],
  ['2015', 'Martin Pipe'],
  ['2016', 'Albert Bartlett'],
  ['2016', 'Martin Pipe'],
  ['2023', 'County Hurdle'],
  ["2023", "Dawn Run Mares' Hurdle"],
];

for (const [year, raceName] of mismatches) {
  const races = historicalData[year]?.races ?? historicalData[year] ?? [];
  const race = races.find(r => r.raceName === raceName);
  if (!race) { console.log(`NOT FOUND: ${year}/${raceName}`); continue; }

  const fieldWinner = race.field?.find(h => h.finishPosition === 1);
  const top3Winner  = race.top3?.[0];

  console.log(`\n${year}/${raceName}`);
  console.log(`  top3[0]: gate=${top3Winner?.gatePosition} "${top3Winner?.horseName}" sp=${top3Winner?.sp}`);
  console.log(`  field winner (pos=1): gate=${fieldWinner?.gatePosition} "${fieldWinner?.horseName}" sp=${fieldWinner?.sp} jockey="${fieldWinner?.jockey}" trainer="${fieldWinner?.trainer}"`);
  // Also show full top3 for context
  race.top3?.forEach((t,i) => console.log(`  top3[${i}]: gate=${t.gatePosition} "${t.horseName}"`));
}
