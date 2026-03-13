/**
 * ResultsTablePanel.jsx
 *
 * Route: /results-table
 *
 * Displays a year-by-year table of first-three finishers for every race,
 * with their decimal SPs, drawn directly from the top3 arrays in historicalData.
 */

import { historicalData } from '../data/historicalData';
import { RACE_CATEGORY } from '../engine/backtester';

const CATEGORY_ORDER = [
  'Grade 1 Championship',
  'Novice',
  'Handicap',
  'Mares',
  'Specialist',
  'Historical',
  'Other',
];

function spDisplay(sp) {
  if (sp == null) return '—';
  return sp % 1 === 0 ? sp.toFixed(0) : sp.toString();
}

// Collect all distinct race names from the data, sorted category-then-alpha
function getRaceNames() {
  const seen = new Set();
  for (const yearData of Object.values(historicalData)) {
    for (const race of yearData.races ?? []) seen.add(race.raceName);
  }
  return [...seen].sort((a, b) => {
    const ca = RACE_CATEGORY[a] || 'Other';
    const cb = RACE_CATEGORY[b] || 'Other';
    const ci = CATEGORY_ORDER.indexOf(ca) - CATEGORY_ORDER.indexOf(cb);
    return ci !== 0 ? ci : a.localeCompare(b);
  });
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
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{raceName}</h2>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-left">
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
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 font-mono text-gray-700">{year}</td>

                <td className="px-4 py-2 text-yellow-300 font-medium">
                  {first?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {spDisplay(first?.sp)}
                </td>

                <td className="px-4 py-2 text-gray-700">
                  {second?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {spDisplay(second?.sp)}
                </td>

                <td className="px-4 py-2 text-gray-500">
                  {third?.horseName ?? '—'}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {spDisplay(third?.sp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-500 text-xs mt-1.5">{rows.length} years of data</p>
    </section>
  );
}

export default function ResultsTablePanel() {
  const raceNames = getRaceNames();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Race Results</h1>
      <p className="text-gray-500 text-sm mb-8">
        First-three finishers for each race across all years in the dataset.
        Decimal SPs taken directly from the{' '}
        <code className="text-gray-700">top3</code> arrays.
      </p>

      {raceNames.map(name => (
        <RaceTable key={name} raceName={name} />
      ))}
    </div>
  );
}
