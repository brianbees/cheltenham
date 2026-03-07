/**
 * RaceCoveragePanel.jsx
 *
 * Route: /race-coverage
 *
 * Shows every distinct race name that appears in historicalData, the number
 * of years it has been entered, and the list of those years.
 */

import { historicalData } from '../data/historicalData';

export default function RaceCoveragePanel() {
  // Build a map: raceName → sorted array of years
  const coverage = {};

  for (const [yearStr, yearData] of Object.entries(historicalData)) {
    const year = Number(yearStr);
    if (!Array.isArray(yearData.races)) continue;
    for (const race of yearData.races) {
      const name = race.raceName;
      if (!coverage[name]) coverage[name] = [];
      if (!coverage[name].includes(year)) coverage[name].push(year);
    }
  }

  // Sort by number of entries descending, then alphabetically
  const rows = Object.entries(coverage)
    .map(([name, years]) => ({ name, years: years.sort((a, b) => a - b) }))
    .sort((a, b) => b.years.length - a.years.length || a.name.localeCompare(b.name));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-1">Race Coverage</h1>
      <p className="text-gray-400 text-sm mb-6">
        {rows.length} distinct races across {Object.keys(historicalData).length} years of data.
      </p>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-400 text-left">
              <th className="px-4 py-3 font-medium w-8">#</th>
              <th className="px-4 py-3 font-medium">Race</th>
              <th className="px-4 py-3 font-medium text-center w-20">Years</th>
              <th className="px-4 py-3 font-medium">Year list</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.name}
                className={`border-t border-gray-800 ${i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900'}`}
              >
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-white font-medium">{row.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block bg-emerald-900 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full">
                    {row.years.length}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 leading-relaxed">
                  {row.years.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
