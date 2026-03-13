import { enrichRunners, enrichRunnersHenery } from '../src/engine/probability.js';
import { readFileSync } from 'fs';

const seed = JSON.parse(readFileSync('./src/data/seed-friday.json', 'utf8'));

function best(enrich, runners) {
  const e = enrich(runners);
  let b = null;
  for (let i = 0; i < e.length; i++)
    for (let j = i + 1; j < e.length; j++)
      for (let k = j + 1; k < e.length; k++) {
        const ev = e[i].pWin * e[j].pWin * e[k].pWin;
        if (!b || ev > b.ev)
          b = { ev, g: [e[i].gatePosition, e[j].gatePosition, e[k].gatePosition].sort((a, b) => a - b) };
      }
  return b.g;
}

const races = [
  ['Triumph Hurdle', 'T1'],
  ['County Hurdle', 'T2'],
  ['Mares Chase', 'T3'],
  ["Albert Bartlett Novices' Hurdle", 'T4'],
  ['Gold Cup', 'T5'],
  ["St James's Place Hunters' Chase", 'T6'],
  ['Martin Pipe Handicap Hurdle', 'T7'],
];

for (const [k, l] of races) {
  const r = seed[k];
  if (!r) { console.log(l + ' NOT FOUND'); continue; }
  const h = best(enrichRunners, r.runners);
  const hen = best(enrichRunnersHenery, r.runners);
  console.log(`${l} | Harville: ${h.join(',')} | Henery: ${hen.join(',')}`);
}
