/**
 * BacktesterPanel.jsx  —  Historical Backtester
 *
 * Route: /backtester
 *
 * Shows what the data tells us now (Tier 1: SP-based analysis)
 * and clearly marks what requires full pre-race field data (Tier 2).
 *
 * Sections:
 *   1. Summary bar  – total years, data completeness, tier 2 readiness
 *   2. Per-race cards – year-by-year SP analysis, composition, classification
 *   3. Year-by-year view – all races in a single year side by side
 */

import { useState } from 'react';
import { analyseRace, analyseYear, analyseAll } from '../engine/backtester';
import { historicalData } from '../data/historicalData';

// ── Classification styles ──────────────────────────────────────────────────────
const CLS_STYLES = {
  Swing:      { badge: 'bg-rose-950 text-rose-300 border border-rose-800',     colour: 'text-rose-400'    },
  Judgement:  { badge: 'bg-amber-950 text-amber-300 border border-amber-800',  colour: 'text-amber-400'   },
  Banker:     { badge: 'bg-emerald-950 text-emerald-300 border border-emerald-800', colour: 'text-emerald-400' },
};

// ── Completeness badge ────────────────────────────────────────────────────────
const COMPLETENESS_STYLES = {
  FULL:    'bg-emerald-900 text-emerald-300 border border-emerald-700',
  PARTIAL: 'bg-blue-900 text-blue-300 border border-blue-700',
  SP_ONLY: 'bg-gray-800 text-gray-400 border border-gray-700',
  MISSING: 'bg-rose-950 text-rose-400 border border-rose-800',
};
const COMPLETENESS_LABEL = {
  FULL:    'Full',
  PARTIAL: 'Partial',
  SP_ONLY: 'SP Only',
  MISSING: 'Missing',
};

// ── SP composition bar ────────────────────────────────────────────────────────
function CompositionBar({ shortRate, midRate, bigRate }) {
  const s = (shortRate * 100).toFixed(0);
  const m = (midRate   * 100).toFixed(0);
  const b = (bigRate   * 100).toFixed(0);
  return (
    <div>
      <div className="flex rounded overflow-hidden h-2 w-full">
        <div style={{ width: `${s}%` }} className="bg-emerald-500" title={`Short-priced ${s}%`} />
        <div style={{ width: `${m}%` }} className="bg-amber-400"   title={`Mid-priced ${m}%`} />
        <div style={{ width: `${b}%` }} className="bg-rose-500"    title={`Big-priced ${b}%`} />
      </div>
      <div className="flex gap-3 mt-1 text-xs text-gray-500">
        <span><span className="text-emerald-400">{s}%</span> short (≤5/1)</span>
        <span><span className="text-amber-400">{m}%</span> mid</span>
        <span><span className="text-rose-400">{b}%</span> big (15/1+)</span>
      </div>
    </div>
  );
}

// ── Composition mini-badge for a single year ──────────────────────────────────
function CompBadges({ composition }) {
  const colours = { short: 'bg-emerald-700 text-emerald-100', mid: 'bg-amber-700 text-amber-100', big: 'bg-rose-700 text-rose-100' };
  return (
    <div className="flex gap-0.5">
      {['short','mid','big'].map(k =>
        Array.from({ length: composition[k] }).map((_, i) => (
          <span key={`${k}${i}`} className={`text-xs px-1 rounded font-bold ${colours[k]}`}>
            {k === 'short' ? 'S' : k === 'mid' ? 'M' : 'B'}
          </span>
        ))
      )}
    </div>
  );
}

// ── Single race card ──────────────────────────────────────────────────────────
function RaceBacktestCard({ raceName }) {
  const [expanded, setExpanded] = useState(false);
  const data = analyseRace(raceName);

  if (!data.available) {
    return (
      <div className="mb-6 border border-gray-800 rounded-xl overflow-hidden opacity-50">
        <div className="bg-gray-900 px-4 py-3">
          <h2 className="text-base font-bold text-gray-400">{raceName}</h2>
          <p className="text-gray-600 text-xs mt-0.5">No data available</p>
        </div>
      </div>
    );
  }

  const agg = data.aggregates;
  const cls = CLS_STYLES[agg.classification];
  const availableYears = data.years.filter(y => y.available);
  const fullCount      = data.years.filter(y => y.completeness === 'FULL').length;

  return (
    <div className="mb-6 border border-gray-800 rounded-xl overflow-hidden">

      {/* ── Card header ── */}
      <div className="bg-gray-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-base font-bold text-white">{raceName}</h2>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls.badge}`}>
            {agg.classification} Race
          </span>
          {fullCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700">
              {fullCount} yr{fullCount !== 1 ? 's' : ''} full data
            </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wide block">Avg SP Total</span>
            <span className={`text-lg font-bold font-mono ${cls.colour}`}>
              {agg.avgSpTotal.toFixed(1)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wide block">Avg Perfect</span>
            <span className="text-lg font-bold font-mono text-gray-200">
              {agg.avgPerfectScore.toFixed(1)}
            </span>
          </div>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-gray-500 hover:text-gray-200 text-sm transition-colors px-2"
          >
            {expanded ? '▲ Hide' : '▼ Show'} years
          </button>
        </div>
      </div>

      {/* ── Aggregate stats row ── */}
      <div className="bg-gray-950 border-b border-gray-800 px-4 py-3 flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">SP Composition</span>
          <div className="mt-1 w-48">
            <CompositionBar
              shortRate={agg.shortRate}
              midRate={agg.midRate}
              bigRate={agg.bigRate}
            />
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">High year</span>
          <span className="text-emerald-400 font-bold font-mono">
            {agg.highYear.year}
          </span>{' '}
          <span className="text-gray-400 text-xs font-mono">
            {agg.highYear.spTotal.toFixed(1)} SP pts
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">Low year</span>
          <span className="text-rose-400 font-bold font-mono">
            {agg.lowYear.year}
          </span>{' '}
          <span className="text-gray-400 text-xs font-mono">
            {agg.lowYear.spTotal.toFixed(1)} SP pts
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">Upset rate</span>
          <span className="text-gray-200 font-bold font-mono">
            {(agg.upsetRate * 100).toFixed(0)}%
          </span>
          <span className="text-gray-500 text-xs ml-1">(15/1+ wins)</span>
        </div>
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">Years in data</span>
          <span className="text-gray-200 font-bold">{agg.count}</span>
        </div>
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wide block">Tier 2 ready</span>
          <span className={fullCount > 0 ? 'text-emerald-400 font-bold' : 'text-gray-600'}>
            {fullCount > 0 ? `${fullCount} / ${agg.count}` : 'Needs gate data'}
          </span>
        </div>
      </div>

      {/* ── Year-by-year table (collapsible) ── */}
      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="text-left px-3 py-2 text-gray-500 font-medium">Year</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">1st</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">2nd</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">3rd</th>
                <th className="text-right px-3 py-2 text-gray-500 font-medium">SP pts</th>
                <th className="text-right px-3 py-2 text-gray-500 font-medium">Perfect</th>
                <th className="text-center px-3 py-2 text-gray-500 font-medium">Comp</th>
                <th className="text-center px-3 py-2 text-gray-500 font-medium">Data</th>
                <th className="text-center px-3 py-2 text-gray-500 font-medium text-amber-600">Model rank</th>
              </tr>
            </thead>
            <tbody>
              {data.years.map((row, i) => {
                if (!row.available) return (
                  <tr key={row.year} className="border-b border-gray-800 opacity-40">
                    <td className="px-3 py-2 font-mono text-gray-500">{row.year}</td>
                    <td colSpan={8} className="px-3 py-2 text-gray-700 italic">No data</td>
                  </tr>
                );
                const isHigh = row.year === agg.highYear.year;
                const isLow  = row.year === agg.lowYear.year;
                const rowBg  = isHigh ? 'bg-emerald-950/30' : isLow ? 'bg-rose-950/20' : i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/40';
                const posStyles = ['bg-yellow-500 text-yellow-950', 'bg-gray-400 text-gray-900', 'bg-amber-700 text-amber-100'];
                return (
                  <tr key={row.year} className={`border-b border-gray-800 ${rowBg}`}>
                    <td className="px-3 py-2 font-mono font-medium text-gray-300">
                      {row.year}
                      {isHigh && <span className="ml-1 text-emerald-400 text-xs">↑</span>}
                      {isLow  && <span className="ml-1 text-rose-400 text-xs">↓</span>}
                    </td>
                    {row.top3.map((h, pos) => (
                      <td key={pos} className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-bold px-1 rounded ${posStyles[pos]}`}>
                            {['1','2','3'][pos]}
                          </span>
                          <span className="text-gray-300 truncate max-w-28">{h.horseName}</span>
                          <span className="text-gray-600 font-mono">
                            {h.sp !== null ? (h.sp - 1 % 1 === 0 ? `${h.sp-1}/1` : h.sp.toFixed(2)) : '—'}
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-mono font-medium text-gray-200">
                      {row.spTotal.toFixed(1)}
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-emerald-400">
                      {row.perfectScore.toFixed(1)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <CompBadges composition={row.composition} />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${COMPLETENESS_STYLES[row.completeness]}`}>
                        {COMPLETENESS_LABEL[row.completeness]}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center text-gray-700 text-xs italic">
                      {row.completeness === 'FULL' ? (
                        <span className="text-amber-500">Ready</span>
                      ) : (
                        <span>Needs data</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Summary bar ───────────────────────────────────────────────────────────────
function SummaryBar({ summary }) {
  const tier2Pct = summary.totalRaceEntries > 0
    ? ((summary.fullDataEntries / summary.totalRaceEntries) * 100).toFixed(0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto mb-8 border border-gray-800 rounded-xl bg-gray-900 px-5 py-4 flex flex-wrap gap-8 items-center">
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wide block">Years in dataset</span>
        <span className="text-2xl font-bold text-white">{summary.totalYears}</span>
      </div>
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wide block">Race entries</span>
        <span className="text-2xl font-bold text-white">{summary.totalRaceEntries}</span>
      </div>
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wide block">SP-only</span>
        <span className="text-2xl font-bold text-gray-400">{summary.spOnlyEntries}</span>
        <span className="text-gray-600 text-xs ml-1">(Tier 1)</span>
      </div>
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wide block">Full data</span>
        <span className={`text-2xl font-bold ${summary.fullDataEntries > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
          {summary.fullDataEntries}
        </span>
        <span className="text-gray-600 text-xs ml-1">(Tier 2)</span>
      </div>
      <div className="flex-1 min-w-48">
        <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
          Tier 2 model backtesting readiness
        </span>
        <div className="flex rounded overflow-hidden h-2 bg-gray-800 w-full">
          <div
            style={{ width: `${tier2Pct}%` }}
            className="bg-emerald-500 transition-all"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-0.5">
          <span>{summary.fullDataEntries} races ready</span>
          <span>{tier2Pct}%</span>
        </div>
      </div>
      <div className="border-l border-gray-700 pl-6">
        <p className="text-xs text-gray-500 max-w-sm">
          <span className="text-emerald-400 font-semibold">Tier 1</span> — SP analysis from result data only.<br/>
          <span className="text-amber-400 font-semibold">Tier 2</span> — Full model validation requires gate positions
          + complete pre-race field odds.
        </p>
      </div>
    </div>
  );
}

// ── All-years overview table ──────────────────────────────────────────────────
function YearOverviewTable() {
  const years = Object.keys(historicalData).map(Number).sort((a, b) => a - b);

  return (
    <div className="max-w-5xl mx-auto mb-8 border border-gray-800 rounded-xl overflow-hidden">
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-800">
        <h2 className="text-base font-bold text-white">Year-by-Year Scoring Landscape</h2>
        <p className="text-gray-500 text-xs mt-0.5">
          Perfect score = SP total of all 3 placed horses + win bonus (10) + jackpot (25).
          Reflects maximum points achievable if you had correctly picked all 3 placed gates.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900/60 border-b border-gray-800">
              <th className="text-left px-4 py-2 text-gray-400 font-medium">Year</th>
              <th className="text-left px-4 py-2 text-gray-400 font-medium">Date</th>
              <th className="text-right px-4 py-2 text-gray-400 font-medium">Total SP pts</th>
              <th className="text-right px-4 py-2 text-gray-400 font-medium">Perfect score</th>
              <th className="text-right px-4 py-2 text-gray-400 font-medium">Winner score</th>
              <th className="text-left px-4 py-2 text-gray-400 font-medium">Winner</th>
            </tr>
          </thead>
          <tbody>
            {years.map((year, i) => {
              const y = analyseYear(year);
              if (!y) return null;
              const winner = y.leaderboard?.[0];
              return (
                <tr key={year} className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/40'}`}>
                  <td className="px-4 py-2.5 font-mono font-bold text-gray-200">{year}</td>
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{y.date}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-gray-300">{y.totalSpTotal.toFixed(1)}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-400">
                    {y.totalPerfectScore.toFixed(1)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono">
                    {winner?.score
                      ? <span className="text-amber-400 font-bold">{winner.score}</span>
                      : <span className="text-gray-700">—</span>
                    }
                  </td>
                  <td className="px-4 py-2.5 text-gray-300 text-sm">
                    {winner?.name || <span className="text-gray-700 italic">unknown</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const RACE_NAMES = [
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

export default function BacktesterPanel() {
  const { summary } = analyseAll();
  const [view, setView] = useState('by-race');  // 'by-race' | 'by-year'

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans">

      {/* ── Page header ── */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-400 tracking-tight">Backtester</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Historical model validation — what does the data tell us?
        </p>
      </div>

      {/* ── Summary bar ── */}
      <SummaryBar summary={summary} />

      {/* ── View toggle ── */}
      <div className="max-w-5xl mx-auto mb-6 flex gap-2">
        <button
          onClick={() => setView('by-race')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'by-race'
              ? 'bg-gray-800 text-emerald-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          By Race
        </button>
        <button
          onClick={() => setView('by-year')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'by-year'
              ? 'bg-gray-800 text-emerald-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          By Year
        </button>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto">
        {view === 'by-race' ? (
          RACE_NAMES.map(name => (
            <RaceBacktestCard key={name} raceName={name} />
          ))
        ) : (
          <YearOverviewTable />
        )}
      </div>

      <p className="text-center text-gray-700 text-xs py-6">
        Champion Tipster — backtester · Tier 2 requires full pre-race field data
      </p>
    </div>
  );
}
