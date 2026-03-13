/**
 * FridaySPCompositionPanel.jsx
 *
 * SP composition analysis for Friday's 7 races at Cheltenham 2026.
 * Shows historical Short / Mid / Big price distribution, average SP total,
 * race type (Judgement vs Swing), and upset percentage.
 */

const RACES = [
  { name: 'Triumph Hurdle',       yrs: 24, short: 39, mid: 39, big: 22, avgSP: 39.1, type: 'Judgement', upset: 13 },
  { name: 'County Hurdle',        yrs: 23, short: 17, mid: 33, big: 49, avgSP: 65.8, type: 'Swing',     upset: 39 },
  { name: 'Mares Chase',          yrs:  5, short: 67, mid: 13, big: 20, avgSP: 30.0, type: 'Judgement', upset:  0 },
  { name: 'Albert Bartlett',      yrs: 21, short: 30, mid: 30, big: 40, avgSP: 55.7, type: 'Swing',     upset: 43 },
  { name: 'Gold Cup',             yrs: 24, short: 43, mid: 31, big: 26, avgSP: 38.1, type: 'Judgement', upset:  4 },
  { name: "Hunters' Chase",       yrs:  5, short: 27, mid: 27, big: 47, avgSP: 61.8, type: 'Swing',     upset: 60 },
  { name: 'Martin Pipe',          yrs: 16, short: 17, mid: 48, big: 35, avgSP: 58.9, type: 'Swing',     upset: 25 },
];

function Bar({ pct, colour }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${colour}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-600 w-8 text-right">{pct}%</span>
    </div>
  );
}

function UpsetBadge({ pct }) {
  const colour =
    pct >= 50 ? 'bg-red-100 text-red-700' :
    pct >= 30 ? 'bg-orange-100 text-orange-700' :
    pct >= 10 ? 'bg-yellow-100 text-yellow-700' :
                'bg-emerald-100 text-emerald-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${colour}`}>
      {pct}%
    </span>
  );
}

function TypeBadge({ type }) {
  return type === 'Judgement'
    ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Judgement</span>
    : <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">🔴 Swing</span>;
}

export default function FridaySPCompositionPanel() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Friday SP Composition</h1>
      <p className="text-sm text-gray-500 mb-5">
        Historical starting-price distribution for Friday's 7 races · Cheltenham 2026 ·{' '}
        <span className="font-medium text-gray-700">Short</span> = SP ≤5/1 ·{' '}
        <span className="font-medium text-gray-700">Mid</span> = 6/1–14/1 ·{' '}
        <span className="font-medium text-gray-700">Big</span> = 15/1+
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Race</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">Yrs</th>
              <th className="px-4 py-3 font-semibold text-emerald-700">Short ≤5/1</th>
              <th className="px-4 py-3 font-semibold text-blue-700">Mid 6–14/1</th>
              <th className="px-4 py-3 font-semibold text-purple-700">Big 15/1+</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">Avg SP Total</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">Type</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">Upset %</th>
            </tr>
          </thead>
          <tbody>
            {RACES.map((r, i) => (
              <tr key={r.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.name}</td>
                <td className="px-3 py-3 text-center text-gray-500">{r.yrs}</td>
                <td className="px-4 py-3"><Bar pct={r.short} colour="bg-emerald-500" /></td>
                <td className="px-4 py-3"><Bar pct={r.mid}   colour="bg-blue-400"    /></td>
                <td className="px-4 py-3"><Bar pct={r.big}   colour="bg-purple-400"  /></td>
                <td className="px-3 py-3 text-center font-mono text-gray-700">{r.avgSP.toFixed(1)}</td>
                <td className="px-3 py-3 text-center"><TypeBadge type={r.type} /></td>
                <td className="px-3 py-3 text-center"><UpsetBadge pct={r.upset} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {RACES.map(r => (
          <div key={r.name} className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800">{r.name}</span>
              <TypeBadge type={r.type} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 w-24">Short ≤5/1</span>
                <Bar pct={r.short} colour="bg-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 w-24">Mid 6–14/1</span>
                <Bar pct={r.mid} colour="bg-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 w-24">Big 15/1+</span>
                <Bar pct={r.big} colour="bg-purple-400" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>{r.yrs} yrs · Avg SP {r.avgSP.toFixed(1)}</span>
              <span>Upset: <UpsetBadge pct={r.upset} /></span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend / Notes */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-semibold text-emerald-800 mb-1">Judgement races</p>
          <p className="text-xs text-emerald-700">
            Triumph Hurdle, Mares Chase, and Gold Cup are historically dominated by market leaders.
            Favourites and well-backed runners land over 95% of win opportunities (Gold Cup 96%, Mares 100%).
            Odds-on and short-priced runners should be trusted.
          </p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-semibold text-red-800 mb-1">Swing races</p>
          <p className="text-xs text-red-700">
            County, Albert Bartlett, Hunters' Chase, and Martin Pipe carry the highest upset risk.
            Albert Bartlett (43%) and County (39%) are the most volatile — big-priced horses regularly
            feature in the frame. Hunters' Chase is the most extreme with 60% upset rate.
          </p>
        </div>
      </div>
    </div>
  );
}
