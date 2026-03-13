/**
 * HistoricalDisplay.jsx
 *
 * Renders all historical Gold Cup Day data in a readable set of tables.
 * Purpose: confirm that historicalData.js is loading correctly before
 * building the maths engine on top of it.
 *
 * Shows per year:
 *   - Date
 *   - All 7 races with top-3 SPs and perfect-score calculation
 *   - Competition leaderboard (top 3)
 *   - Theoretical maximum score for that year
 */

import { historicalData, spToPoints, getPerfectScore, getAllYearSummaries } from '../data/historicalData';

// ── Small helper: format SP decimal back to a readable fractional-style string
// e.g. 11.0 → "10/1", 1.91 → "0.91/1" but we just show the decimal for clarity
function formatSP(sp) {
  if (sp === null) return '—';
  return sp.toFixed(2);
}

// ── Badge colours for 1st / 2nd / 3rd position
const positionStyles = [
  'bg-yellow-500 text-yellow-950',  // 1st
  'bg-gray-400 text-gray-900',      // 2nd
  'bg-amber-700 text-amber-100',    // 3rd
];

const positionLabels = ['1st', '2nd', '3rd'];

export default function HistoricalDisplay() {
  const years = getAllYearSummaries();

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 font-sans">

      {/* ── Page header ── */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">
          Champion Tipster
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Historical Data — Gold Cup Day Results
        </p>
      </div>

      {/* ── Year-by-year cards ── */}
      {years.map((yearData) => (
        <div
          key={yearData.year}
          className="mb-10 border border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Year header */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">{yearData.year}</span>
              <span className="ml-3 text-gray-500 text-sm">{yearData.date}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Theoretical Max
              </span>
              <div className="text-emerald-700 font-bold text-lg">
                {yearData.races.some(r => r.top3.some(h => h.sp === null))
                  ? '— pts'
                  : `${yearData.theoreticalMax.toFixed(1)} pts`}
              </div>
            </div>
          </div>

          {/* Race results table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2 text-gray-500 font-medium w-40">Race</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">1st</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">2nd</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">3rd</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">SP pts</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">+Bonuses</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">Max</th>
                </tr>
              </thead>
              <tbody>
                {yearData.races.map((race, raceIdx) => {
                  const hasNullSP = race.top3.some(h => h.sp === null);
                  const spTotal = hasNullSP ? null : race.top3.reduce(
                    (sum, h) => sum + spToPoints(h.sp),
                    0
                  );
                  const perfectScore = hasNullSP ? null : getPerfectScore(race);

                  return (
                    <tr
                      key={raceIdx}
                      className={
                        raceIdx % 2 === 0
                          ? 'bg-white border-b border-gray-200'
                          : 'bg-gray-50 border-b border-gray-200'
                      }
                    >
                      {/* Race name */}
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                        {race.raceName}
                      </td>

                      {/* Top 3 horses */}
                      {race.top3.map((horse, pos) => (
                        <td key={pos} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold px-1.5 py-0.5 rounded ${positionStyles[pos]}`}
                            >
                              {positionLabels[pos]}
                            </span>
                            <div>
                              <div className="text-gray-800 text-xs font-medium leading-tight">
                                {horse.horseName}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {formatSP(horse.sp)}{horse.sp !== null && ` (${spToPoints(horse.sp).toFixed(1)}pts)`}
                              </div>
                            </div>
                          </div>
                        </td>
                      ))}

                      {/* SP total */}
                      <td className="px-4 py-3 text-right font-mono text-gray-700">
                        {spTotal !== null ? spTotal.toFixed(1) : '—'}
                      </td>

                      {/* Bonus breakdown */}
                      <td className="px-4 py-3 text-right text-xs text-gray-500">
                        {spTotal !== null ? '+10 +25' : ''}
                      </td>

                      {/* Perfect score */}
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">
                        {perfectScore !== null ? perfectScore.toFixed(1) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Competition leaderboard for this year */}
          <div className="bg-gray-50 px-4 py-3 flex items-center gap-6 border-t border-gray-200">
            <span className="text-xs uppercase tracking-wide text-gray-500 mr-2">
              Top 3
            </span>
            {yearData.leaderboard.map((entry, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${positionStyles[i]}`}>
                  {positionLabels[i]}
                </span>
                <span className="font-medium text-gray-700">{entry.name}</span>
                <span className="text-emerald-700 font-bold">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── All-time leaderboard summary ── */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
        <div className="bg-gray-50 px-4 py-3">
          <h2 className="text-lg font-bold text-gray-900">All-Time Winners</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Benchmark scores used by the optimiser
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-gray-500 font-medium">Year</th>
              <th className="text-left px-4 py-2 text-gray-500 font-medium">Winner</th>
              <th className="text-right px-4 py-2 text-gray-500 font-medium">Winning Score</th>
              <th className="text-right px-4 py-2 text-gray-500 font-medium">Theoretical Max</th>
            </tr>
          </thead>
          <tbody>
            {years.map((yearData, idx) => {
              const winner = yearData.leaderboard[0];
              return (
                <tr
                  key={yearData.year}
                  className={
                    idx % 2 === 0
                      ? 'bg-white border-b border-gray-200'
                      : 'bg-gray-50 border-b border-gray-200'
                  }
                >
                  <td className="px-4 py-3 text-gray-700">{yearData.year}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {winner ? winner.name : <span className="text-gray-500 italic">No data</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-700">
                    {winner ? winner.score : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {yearData.theoreticalMax.toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-500 text-xs pb-6">
        Champion Tipster v0.1 — data verification screen
      </p>
    </div>
  );
}
