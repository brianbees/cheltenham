/**
 * OptimiserPanel.jsx  —  Phase 3: Live Race Optimiser
 *
 * Route: /optimiser
 *
 * User flow:
 *   1. Select the race from the dropdown.
 *   2. Enter today's runners — gate number, horse name, odds (fractional or decimal).
 *   3. Press "Optimise" to rank all C(N,3) gate combinations by Expected Value.
 *   4. Results table shows every combination ranked, with EV breakdown.
 *
 * Odds input supports both formats:
 *   Fractional  "10/1"  → decimal 11.0
 *   Decimal     "11.0"  → decimal 11.0
 */

import { useState, useCallback } from 'react';
import { enrichRunners }    from '../engine/probability';
import { rankCombinations } from '../engine/optimiser';
import { getRaceHistory }   from '../data/historicalData';

// ── Constants ─────────────────────────────────────────────────────────────────

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

const BLANK_RUNNER = () => ({ id: Date.now() + Math.random(), gate: '', name: '', odds: '' });

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse fractional (10/1) or decimal (11.0) odds string → number or null */
function parseOdds(raw) {
  const str = raw.trim();
  if (!str) return null;
  if (str.includes('/')) {
    const [num, den] = str.split('/').map(Number);
    if (!den || isNaN(num) || isNaN(den)) return null;
    return num / den + 1;           // fractional → decimal
  }
  const d = parseFloat(str);
  return isNaN(d) || d <= 1 ? null : d;  // must be > 1 to be valid decimal
}

/** Gate → odds string as typed, for display convenience */
function oddsDisplay(raw) {
  const d = parseOdds(raw);
  if (d === null) return raw;
  // Show as fractional if it's a clean integer fraction
  const frac = d - 1;
  if (Number.isInteger(frac)) return `${frac}/1`;
  return d.toFixed(2);
}

/** Get Banker/Judgement/Swing classification for a race */
function getRaceClass(raceName) {
  const rows = getRaceHistory(raceName);
  if (!rows || rows.length === 0) return null;
  const avg = rows.reduce((s, r) => s + r.spTotal, 0) / rows.length;
  if (avg > 40) return { label: 'Swing Race',     badge: 'bg-rose-950 text-rose-300 border border-rose-800' };
  if (avg > 20) return { label: 'Judgement Race', badge: 'bg-amber-950 text-amber-300 border border-amber-800' };
  return             { label: 'Banker Race',      badge: 'bg-emerald-950 text-emerald-300 border border-emerald-800' };
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Single runner input row */
function RunnerRow({ runner, onChange, onRemove, canRemove }) {
  return (
    <tr className="border-b border-gray-800">
      {/* Gate */}
      <td className="px-3 py-2">
        <input
          type="number"
          min="1"
          placeholder="1"
          value={runner.gate}
          onChange={e => onChange(runner.id, 'gate', e.target.value)}
          className="w-16 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100
                     focus:outline-none focus:border-emerald-500 text-center"
        />
      </td>

      {/* Horse name */}
      <td className="px-3 py-2">
        <input
          type="text"
          placeholder="Horse name"
          value={runner.name}
          onChange={e => onChange(runner.id, 'name', e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100
                     focus:outline-none focus:border-emerald-500"
        />
      </td>

      {/* Odds */}
      <td className="px-3 py-2">
        <input
          type="text"
          placeholder="10/1 or 11.0"
          value={runner.odds}
          onChange={e => onChange(runner.id, 'odds', e.target.value)}
          className="w-28 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100
                     font-mono focus:outline-none focus:border-emerald-500 text-center"
        />
      </td>

      {/* Parsed decimal preview */}
      <td className="px-3 py-2 text-center">
        {runner.odds && parseOdds(runner.odds) !== null ? (
          <span className="text-xs text-gray-400 font-mono">
            {parseOdds(runner.odds).toFixed(2)}
          </span>
        ) : (
          <span className="text-xs text-gray-700">—</span>
        )}
      </td>

      {/* Remove */}
      <td className="px-3 py-2 text-center">
        <button
          onClick={() => onRemove(runner.id)}
          disabled={!canRemove}
          className="text-gray-600 hover:text-rose-400 disabled:opacity-20 text-lg leading-none transition-colors"
          title="Remove runner"
        >
          ×
        </button>
      </td>
    </tr>
  );
}

/** One combination result row */
function ComboRow({ combo, isTop }) {
  const bgClass = isTop
    ? 'bg-emerald-950/40 border-b border-emerald-900/60'
    : 'border-b border-gray-800 hover:bg-gray-900/40';

  return (
    <tr className={bgClass}>
      {/* Rank */}
      <td className="px-4 py-3 text-center">
        {isTop ? (
          <span className="inline-block w-7 h-7 rounded-full bg-emerald-500 text-emerald-950
                           text-xs font-black flex items-center justify-center">
            {combo.rank}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">{combo.rank}</span>
        )}
      </td>

      {/* Gates */}
      <td className="px-4 py-3">
        <div className="flex gap-1.5 flex-wrap">
          {combo.runners.map((r, i) => (
            <span key={i}
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                isTop ? 'bg-emerald-700 text-emerald-100' : 'bg-gray-800 text-gray-300'
              }`}>
              Gate {r.gatePosition}
            </span>
          ))}
        </div>
        <div className="mt-1 flex gap-2 flex-wrap">
          {combo.runners.map((r, i) => (
            <span key={i} className="text-xs text-gray-400">{r.horseName || '—'}</span>
          ))}
        </div>
      </td>

      {/* EV total */}
      <td className="px-4 py-3 text-right font-mono font-bold text-base">
        <span className={isTop ? 'text-emerald-400' : 'text-gray-200'}>
          {combo.ev.toFixed(2)}
        </span>
      </td>

      {/* SP EV */}
      <td className="px-4 py-3 text-right text-sm font-mono text-gray-400">
        {combo.evSp.toFixed(2)}
      </td>

      {/* Win bonus EV */}
      <td className="px-4 py-3 text-right text-sm font-mono text-gray-400">
        {combo.evWin.toFixed(2)}
      </td>

      {/* Jackpot EV */}
      <td className="px-4 py-3 text-right text-sm font-mono text-gray-400">
        {combo.evJackpot.toFixed(2)}
      </td>

      {/* Jackpot probability */}
      <td className="px-4 py-3 text-right text-xs font-mono text-gray-500">
        {(combo.pJackpot * 100).toFixed(2)}%
      </td>
    </tr>
  );
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateRunners(runners) {
  const errors = [];
  const valid  = runners.filter(r => r.gate !== '' || r.name !== '' || r.odds !== '');

  if (valid.length < 3) {
    errors.push('Enter at least 3 runners.');
    return { errors, parsed: [] };
  }

  const parsed = [];
  const gates  = new Set();

  valid.forEach((r, i) => {
    const gate = parseInt(r.gate, 10);
    const odds = parseOdds(r.odds);

    if (!r.gate || isNaN(gate) || gate < 1)
      errors.push(`Row ${i + 1}: gate number is required and must be ≥ 1.`);
    else if (gates.has(gate))
      errors.push(`Row ${i + 1}: gate ${gate} is duplicated.`);
    else
      gates.add(gate);

    if (odds === null)
      errors.push(`Row ${i + 1} (${r.name || 'unnamed'}): invalid odds "${r.odds}".`);

    if (!errors.length || (gate >= 1 && odds !== null && !gates.has(gate) + (gates.add(gate) && 0))) {
      parsed.push({
        gatePosition: gate,
        horseName:   r.name.trim() || `Gate ${gate}`,
        decimalOdds: odds,
      });
    }
  });

  // re-derive parsed cleanly when no errors
  if (errors.length === 0) {
    return {
      errors: [],
      parsed: valid.map(r => ({
        gatePosition: parseInt(r.gate, 10),
        horseName:   r.name.trim() || `Gate ${parseInt(r.gate, 10)}`,
        decimalOdds: parseOdds(r.odds),
      })),
    };
  }

  return { errors, parsed: [] };
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OptimiserPanel() {
  const [selectedRace, setSelectedRace] = useState(RACE_NAMES[0]);
  const [runners,      setRunners]      = useState(() => Array.from({ length: 6 }, BLANK_RUNNER));
  const [results,      setResults]      = useState(null);   // ranked combos
  const [errors,       setErrors]       = useState([]);

  const raceClass = getRaceClass(selectedRace);

  // ── Runner table handlers ─────────────────────────────────────────────
  const handleChange = useCallback((id, field, value) => {
    setRunners(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    setResults(null);  // clear results on any edit
  }, []);

  const addRunner = () => setRunners(prev => [...prev, BLANK_RUNNER()]);

  const removeRunner = (id) =>
    setRunners(prev => prev.length > 3 ? prev.filter(r => r.id !== id) : prev);

  const clearAll = () => {
    setRunners(Array.from({ length: 6 }, BLANK_RUNNER));
    setResults(null);
    setErrors([]);
  };

  // ── Optimise ──────────────────────────────────────────────────────────
  const handleOptimise = () => {
    const { errors: errs, parsed } = validateRunners(runners);
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);
    const enriched = enrichRunners(parsed);
    const ranked   = rankCombinations(enriched);
    setResults({ ranked, enriched, fieldSize: parsed.length });
  };

  const filledCount = runners.filter(r => r.gate && r.odds).length;
  const canOptimise = filledCount >= 3;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans">

      {/* ── Page header ── */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-400 tracking-tight">Optimiser</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Enter today's field · find the highest Expected Value combination
        </p>
      </div>

      {/* ── Input card ── */}
      <div className="max-w-4xl mx-auto mb-8 border border-gray-800 rounded-xl overflow-hidden">

        {/* Card header: race selector */}
        <div className="bg-gray-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400 font-medium">Race</label>
            <select
              value={selectedRace}
              onChange={e => { setSelectedRace(e.target.value); setResults(null); setErrors([]); }}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-100
                         focus:outline-none focus:border-emerald-500"
            >
              {RACE_NAMES.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {raceClass && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${raceClass.badge}`}>
                {raceClass.label}
              </span>
            )}
          </div>
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Runner entry table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="text-left px-3 py-2 text-gray-400 font-medium w-20">Gate</th>
                <th className="text-left px-3 py-2 text-gray-400 font-medium">Horse name</th>
                <th className="text-left px-3 py-2 text-gray-400 font-medium w-36">Odds</th>
                <th className="text-center px-3 py-2 text-gray-400 font-medium w-24">Decimal</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {runners.map(r => (
                <RunnerRow
                  key={r.id}
                  runner={r}
                  onChange={handleChange}
                  onRemove={removeRunner}
                  canRemove={runners.length > 3}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Card footer: add runner + optimise */}
        <div className="bg-gray-900 px-4 py-3 border-t border-gray-800 flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={addRunner}
            className="text-sm text-emerald-500 hover:text-emerald-300 transition-colors"
          >
            + Add runner
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              {filledCount} runner{filledCount !== 1 ? 's' : ''} ready
              {filledCount >= 3 && ` · ${Math.round(filledCount * (filledCount - 1) * (filledCount - 2) / 6)} combos`}
            </span>
            <button
              onClick={handleOptimise}
              disabled={!canOptimise}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-colors
                         bg-emerald-600 hover:bg-emerald-500 text-white
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Optimise
            </button>
          </div>
        </div>
      </div>

      {/* ── Validation errors ── */}
      {errors.length > 0 && (
        <div className="max-w-4xl mx-auto mb-6 border border-rose-800 rounded-xl bg-rose-950/40 px-4 py-3">
          <p className="text-rose-400 text-sm font-semibold mb-1">Please fix the following:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {errors.map((e, i) => (
              <li key={i} className="text-rose-300 text-sm">{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Results ── */}
      {results && (
        <div className="max-w-4xl mx-auto border border-gray-800 rounded-xl overflow-hidden">

          {/* Results header */}
          <div className="bg-gray-900 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-white">{selectedRace} — Ranked Combinations</h2>
              <p className="text-gray-500 text-xs mt-0.5">
                {results.ranked.length} combinations · {results.fieldSize} runners
                {raceClass && ` · ${raceClass.label}`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide block">Best EV</span>
              <span className="text-emerald-400 font-bold text-xl font-mono">
                {results.ranked[0]?.ev.toFixed(2)} pts
              </span>
            </div>
          </div>

          {/* Probability summary per runner */}
          <div className="border-b border-gray-800 bg-gray-950 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-900">
                  <th className="text-left px-4 py-2 text-gray-600 font-medium">Gate</th>
                  <th className="text-left px-4 py-2 text-gray-600 font-medium">Horse</th>
                  <th className="text-right px-4 py-2 text-gray-600 font-medium">Odds</th>
                  <th className="text-right px-4 py-2 text-gray-600 font-medium">P(Win)</th>
                  <th className="text-right px-4 py-2 text-gray-600 font-medium">P(Place)</th>
                  <th className="text-right px-4 py-2 text-gray-600 font-medium">SP pts</th>
                </tr>
              </thead>
              <tbody>
                {results.enriched
                  .slice()
                  .sort((a, b) => b.pPlace - a.pPlace)
                  .map((r, i) => (
                    <tr key={i} className="border-b border-gray-900">
                      <td className="px-4 py-1.5 font-mono text-gray-400">{r.gatePosition}</td>
                      <td className="px-4 py-1.5 text-gray-300">{r.horseName}</td>
                      <td className="px-4 py-1.5 text-right font-mono text-gray-400">
                        {(r.decimalOdds - 1 % 1 === 0
                          ? `${r.decimalOdds - 1}/1`
                          : r.decimalOdds.toFixed(2))}
                      </td>
                      <td className="px-4 py-1.5 text-right font-mono text-gray-400">
                        {(r.pWin * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-1.5 text-right font-mono text-emerald-500">
                        {(r.pPlace * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-1.5 text-right font-mono text-gray-400">
                        {(r.decimalOdds - 1).toFixed(1)}p
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Combinations table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/60 border-b border-gray-800">
                  <th className="px-4 py-2 text-gray-400 font-medium text-center w-12">#</th>
                  <th className="text-left px-4 py-2 text-gray-400 font-medium">Combination</th>
                  <th className="text-right px-4 py-2 text-gray-400 font-medium">Total EV</th>
                  <th className="text-right px-4 py-2 text-gray-400 font-medium">SP EV</th>
                  <th className="text-right px-4 py-2 text-gray-400 font-medium">Win EV</th>
                  <th className="text-right px-4 py-2 text-gray-400 font-medium">Jackpot EV</th>
                  <th className="text-right px-4 py-2 text-gray-400 font-medium">P(Jackpot)</th>
                </tr>
              </thead>
              <tbody>
                {results.ranked.map(combo => (
                  <ComboRow key={combo.rank} combo={combo} isTop={combo.rank === 1} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900 px-4 py-2 border-t border-gray-800">
            <p className="text-gray-600 text-xs text-center">
              EV = expected SP points + expected win bonus (×10) + expected jackpot (×25) · Harville model
            </p>
          </div>
        </div>
      )}

      <p className="text-center text-gray-700 text-xs py-6">Champion Tipster — optimiser</p>
    </div>
  );
}
