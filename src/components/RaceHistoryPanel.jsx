/**
 * RaceHistoryPanel.jsx
 *
 * Analyses each known race type across all historical years.
 * Calls getRaceHistory() for each race name and derives:
 *   - Per-year SP totals and perfect scores
 *   - Average SP total (from actual data rows only — no assumed sample size)
 *   - Highest and lowest SP total years
 *   - Race classification: Swing / Judgement / Banker
 *
 * Rules: no hardcoded derived values, no null inference.
 */

import { getRaceHistory, spToPoints } from '../data/historicalData';
import { ALL_RACE_NAMES }             from '../engine/backtester';

const RACE_NAMES = ALL_RACE_NAMES;

// ── Classification thresholds (per spec) ─────────────────────────────────────
function classifyRace(avgSpTotal) {
  if (avgSpTotal > 43) return { label: 'Swing Race',      colour: 'text-rose-600',   badge: 'bg-rose-950 text-rose-300 border border-rose-800' };
  if (avgSpTotal > 23) return { label: 'Judgement Race',  colour: 'text-amber-400',  badge: 'bg-amber-950 text-amber-300 border border-amber-800' };
  return                       { label: 'Banker Race',    colour: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-400' };
}

// ── Small stat helpers ────────────────────────────────────────────────────────

function average(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function maxBy(rows, key) {
  return rows.reduce((best, row) => (row[key] > best[key] ? row : best), rows[0]);
}

function minBy(rows, key) {
  return rows.reduce((best, row) => (row[key] < best[key] ? row : best), rows[0]);
}

// ── Position badge styles matching HistoricalDisplay ─────────────────────────
const positionStyles = [
  'bg-yellow-500 text-yellow-950',
  'bg-gray-400 text-gray-900',
  'bg-amber-700 text-amber-100',
];
const positionLabels = ['1st', '2nd', '3rd'];

// ── Single race card ──────────────────────────────────────────────────────────
function RaceCard({ raceName }) {
  const rows = getRaceHistory(raceName);

  // If this race name doesn't appear in any year's data, show a notice
  if (!rows || rows.length === 0) {
    return (
      <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-4 py-3">
          <h2 className="text-lg font-bold text-gray-900">{raceName}</h2>
          <p className="text-gray-500 text-sm mt-1">No data available for this race.</p>
        </div>
      </div>
    );
  }

  const spTotals = rows.map(r => r.spTotal);
  const avgSp    = average(spTotals);
  const highRow  = maxBy(rows, 'spTotal');
  const lowRow   = minBy(rows, 'spTotal');
  const cls      = classifyRace(avgSp);

  return (
    <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">

      {/* ── Card header ── */}
      <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">{raceName}</h2>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls.badge}`}>
            {cls.label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 uppercase tracking-wide block">
            Avg SP Total
          </span>
          <span className={`text-xl font-bold ${cls.colour}`}>
            {avgSp.toFixed(1)} pts
          </span>
        </div>
      </div>

      {/* ── Results table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-gray-500 font-medium">Year</th>
              <th className="text-left px-4 py-2 text-gray-500 font-medium">1st SP (pts)</th>
              <th className="text-left px-4 py-2 text-gray-500 font-medium">2nd SP (pts)</th>
              <th className="text-left px-4 py-2 text-gray-500 font-medium">3rd SP (pts)</th>
              <th className="text-right px-4 py-2 text-gray-500 font-medium">SP Total</th>
              <th className="text-right px-4 py-2 text-gray-500 font-medium">Perfect Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isHigh = row.year === highRow.year;
              const isLow  = row.year === lowRow.year;
              // Only flag high/low when there are multiple rows (ties are both shown)
              const rowHighlight = isHigh && rows.length > 1
                ? 'bg-emerald-100'
                : isLow && rows.length > 1
                  ? 'bg-rose-50'
                  : '';

              return (
                <tr
                  key={row.year}
                  className={`border-b border-gray-200 ${
                    rowHighlight || (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50')
                  }`}
                >
                  {/* Year */}
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {row.year}
                    {isHigh && rows.length > 1 && (
                      <span className="ml-2 text-xs text-emerald-700 font-normal">↑ high</span>
                    )}
                    {isLow && rows.length > 1 && (
                      <span className="ml-2 text-xs text-rose-600 font-normal">↓ low</span>
                    )}
                  </td>

                  {/* Top 3 horses — sp and points */}
                  {row.top3.map((horse, pos) => (
                    <td key={pos} className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${positionStyles[pos]}`}>
                          {positionLabels[pos]}
                        </span>
                        <span className="text-gray-700 text-xs font-mono">
                          {horse.sp !== null ? horse.sp.toFixed(2) : '—'}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {horse.sp !== null ? `(${spToPoints(horse.sp).toFixed(1)}p)` : ''}
                        </span>
                      </div>
                    </td>
                  ))}

                  {/* SP total */}
                  <td className="px-4 py-3 text-right font-mono font-medium text-gray-700">
                    {row.spTotal.toFixed(1)}
                  </td>

                  {/* Perfect score */}
                  <td className="px-4 py-3 text-right font-bold text-emerald-700">
                    {row.perfectScore.toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Summary footer ── */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Years in data</span>
          <div className="text-gray-700 font-medium">{rows.length}</div>
        </div>
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Avg SP Total</span>
          <div className={`font-bold ${cls.colour}`}>{avgSp.toFixed(1)}</div>
        </div>
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Highest SP year</span>
          <div className="text-gray-700 font-medium">
            {highRow.year}{' '}
            <span className="text-emerald-700 font-bold">{highRow.spTotal.toFixed(1)}</span>
          </div>
        </div>
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Lowest SP year</span>
          <div className="text-gray-700 font-medium">
            {lowRow.year}{' '}
            <span className="text-rose-600 font-bold">{lowRow.spTotal.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RaceHistoryPanel() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 font-sans">

      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">
          Race History
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Per-race SP analysis across all historical Gold Cup Days
        </p>
        {/* Classification key */}
        <div className="flex justify-center gap-4 mt-3 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-400">
            Banker Race — avg SP ≤ 23
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
            Judgement Race — avg SP 24–43
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
            Swing Race — avg SP &gt; 43
          </span>
        </div>
      </div>

      {/* One card per race name */}
      {RACE_NAMES.map(name => (
        <RaceCard key={name} raceName={name} />
      ))}

      <p className="text-center text-gray-500 text-xs pb-6">
        Champion Tipster — race character analysis
      </p>
    </div>
  );
}
