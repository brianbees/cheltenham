/**
 * ResultsTablePanel.jsx
 *
 * Route: /results-table
 *
 * Displays a year-by-year table of first-three finishers for every race,
 * with their decimal SPs, drawn directly from the top3 arrays in historicalData.
 */

import { historicalData } from '../data/historicalData';

// Preferred display order — any races not listed here appear after in the order
// they are first encountered.
const RACE_ORDER = [
  'Triumph Hurdle',
  'County Hurdle',
  'Albert Bartlett',
  'Gold Cup',
  'Foxhunter Chase',
  'Hunters Chase',
  'Mares Chase',
  'Martin Pipe',
  'Grand Annual',
];

function spDisplay(sp) {
  if (sp == null) return '—';
  return sp % 1 === 0 ? sp.toFixed(0) : sp.toString();
}

// Collect all distinct race names from the data in preferred order
function getRaceNames() {
  const seen = new Set();
  const ordered = [...RACE_ORDER];
  for (const yearData of Object.values(historicalData)) {
    for (const race of yearData.races ?? []) {
      if (!seen.has(race.raceName)) {
        seen.add(race.raceName);
        if (!ordered.includes(race.raceName)) ordered.push(race.raceName);
      }
    }
  }
  // Only return names that actually exist in the data
  return ordered.filter(name => seen.has(name));
}

// Build rows for one race name
function buildRows(raceName) {
  return Object.entries(historicalData)
    .map(([yearStr, yearData]) => {
      const race = yearData.races?.find(r => r.raceName === raceName);
      if (!race) return null;
      const [first, second, third] = race.top3 ?? [];
      return { year: Number(yearStr), first, second, third };
    })
    .filter(Boolean)
    .sort((a, b) => a.year - b.year);
}

function RaceTable({ raceName }) {
  const rows = buildRows(raceName);
  if (rows.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-white mb-3">{raceName}</h2>
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-400 text-left">
              <th className="px-4 py-2.5 font-medium w-16">Year</th>
              <th className="px-4 py-2.5 font-medium">1st</th>
              <th className="px-4 py-2.5 font-medium text-right w-16">SP</th>
              <th className="px-4 py-2.5 font-medium">2nd</th>
              <th className="px-4 py-2.5 font-medium text-right w-16">SP</th>
              <th className="px-4 py-2.5 font-medium">3rd</th>
              <th className="px-4 py-2.5 font-medium text-right w-16">SP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ year, first, second, third }, i) => (
              <tr
                key={year}
                className={i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900'}
              >
                <td className="px-4 py-2 font-mono text-gray-300">{year}</td>

                <td className="px-4 py-2 text-yellow-300 font-medium">
                  {first?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-300">
                  {spDisplay(first?.sp)}
                </td>

                <td className="px-4 py-2 text-gray-200">
                  {second?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-300">
                  {spDisplay(second?.sp)}
                </td>

                <td className="px-4 py-2 text-gray-400">
                  {third?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-300">
                  {spDisplay(third?.sp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 text-xs mt-1.5">{rows.length} years of data</p>
    </section>
  );
}

export default function ResultsTablePanel() {
  const raceNames = getRaceNames();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-1">Race Results</h1>
      <p className="text-gray-400 text-sm mb-8">
        First-three finishers for each race across all years in the dataset.
        Decimal SPs taken directly from the{' '}
        <code className="text-gray-300">top3</code> arrays.
      </p>

      {raceNames.map(name => (
        <RaceTable key={name} raceName={name} />
      ))}
    </div>
  );
}
