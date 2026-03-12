import { historicalData } from './src/data/historicalData.js';

let missingJockey = 0, missingTrainer = 0, missingFinishPos = 0;
let top3DupeEntries = 0, top3MissingJockey = 0;
const winnerMismatch = [];

for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    const loc = `${year}/${race.raceName}`;
    for (const h of (race.field || [])) {
      if (!h.jockey) missingJockey++;
      if (!h.trainer) missingTrainer++;
      if (h.finishPosition === undefined) missingFinishPos++;
    }
    const seen = new Set();
    for (const t of (race.top3 || [])) {
      if (!t.jockey) top3MissingJockey++;
      if (seen.has(t.horseName)) top3DupeEntries++;
      seen.add(t.horseName);
    }
    if (race.top3?.[0] && race.field) {
      const w = race.field.find(h => h.horseName === race.top3[0].horseName);
      if (w && w.finishPosition !== 1) winnerMismatch.push(`${loc}: "${race.top3[0].horseName}" field.pos=${w.finishPosition}`);
    }
  }
}

console.log('Missing jockey in field[]:', missingJockey);
console.log('Missing trainer in field[]:', missingTrainer);
console.log('finishPosition=undefined in field[]:', missingFinishPos);
console.log('Duplicate horse in top3[]:', top3DupeEntries);
console.log('Missing jockey in top3[]:', top3MissingJockey);
console.log('\nTOP3_WINNER_MISMATCH detail:');
winnerMismatch.forEach(x => console.log(' ', x));
