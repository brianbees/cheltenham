// Dumps all races as JSON for use by Python scripts
import { historicalData } from './src/data/historicalData.js';
import { writeFileSync } from 'fs';

const out = [];
for (const [year, yearData] of Object.entries(historicalData)) {
  const races = yearData.races ?? yearData;
  for (const race of races) {
    out.push({
      year,
      raceName: race.raceName,
      raceType: race.raceType,
      fieldSize: race.fieldSize,
      top3: race.top3 || [],
      field: (race.field || []).map(h => ({
        gatePosition: h.gatePosition,
        horseName: h.horseName,
        sp: h.sp,
        finishPosition: h.finishPosition,
        jockey: h.jockey,
        trainer: h.trainer,
      }))
    });
  }
}

writeFileSync('_races_dump.json', JSON.stringify(out));
console.log(`Exported ${out.length} races`);
