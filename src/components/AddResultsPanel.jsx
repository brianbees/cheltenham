/**
 * AddResultsPanel.jsx — Enter actual race results
 *
 * Route: /add-results
 *
 * Enter the 1st/2nd/3rd finishers for each festival race.
 * Results are stored in localStorage via addRuntimeResult() and immediately
 * affect Race History, Optimiser classification, and Badge labels.
 *
 * SP input accepts fractional (10/1, 5/2, Evs) or decimal (11.0, 3.5).
 */

import { useState } from 'react';
import { addRuntimeResult, removeRuntimeResult, getRuntimeResults } from '../data/historicalData';
import { FESTIVAL_DAYS } from '../data/schedule';

// ── SP helpers ────────────────────────────────────────────────────────────────

function parseSP(raw) {
  if (!raw) return null;
  const s = raw.trim().toLowerCase();
  if (s === 'evs' || s === 'evens' || s === '1/1') return 2.0;
  if (s.includes('/')) {
    const [n, d] = s.split('/').map(Number);
    if (!isNaN(n) && !isNaN(d) && d > 0) return +(n / d + 1);
  }
  const dec = parseFloat(s);
  return isNaN(dec) ? null : dec;
}

function spDisplay(decimal) {
  if (!decimal) return '';
  const frac = decimal - 1;
  if (Number.isInteger(frac) && frac >= 1) return `${frac}/1`;
  return decimal.toFixed(2);
}

// ── Sub-components ────────────────────────────────────────────────────────────

const emptyPlace = () => ({ gate: '', horse: '', sp: '' });

function PlaceRow({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-500 w-7 shrink-0 text-right">{label}</span>
      <input
        type="number" min="1" max="40"
        value={value.gate}
        onChange={e => onChange({ ...value, gate: e.target.value })}
        placeholder="Gate"
        className="w-16 px-2 py-1.5 text-sm border border-gray-300 rounded
                   focus:outline-none focus:border-emerald-500 text-center"
      />
      <input
        type="text"
        value={value.horse}
        onChange={e => onChange({ ...value, horse: e.target.value })}
        placeholder="Horse name"
        className="flex-1 min-w-0 px-2 py-1.5 text-sm border border-gray-300 rounded
                   focus:outline-none focus:border-emerald-500"
      />
      <input
        type="text"
        value={value.sp}
        onChange={e => onChange({ ...value, sp: e.target.value })}
        placeholder="SP e.g. 10/1"
        className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded
                   focus:outline-none focus:border-emerald-500 font-mono"
      />
    </div>
  );
}

// ── Race entry card ────────────────────────────────────────────────────────────
// Keyed by year+race.name in parent so it remounts cleanly when year changes.

function RaceEntryCard({ race, year, existingEntry, onSaved, onDeleted }) {
  const dataName = race.dataName ?? race.name;

  const [fieldSize, setFieldSize] = useState(existingEntry?.fieldSize?.toString() ?? '');
  const [places, setPlaces] = useState(() =>
    existingEntry
      ? existingEntry.top3.map(h => ({
          gate:  h.gatePosition?.toString() ?? '',
          horse: h.horseName,
          sp:    spDisplay(h.sp),
        }))
      : [emptyPlace(), emptyPlace(), emptyPlace()]
  );
  const [error, setError]   = useState(null);
  const [saved, setSaved]   = useState(!!existingEntry);
  const [dirty, setDirty]   = useState(false);

  const updatePlace = (i, val) => {
    const next = [...places];
    next[i] = val;
    setPlaces(next);
    setSaved(false);
    setDirty(true);
  };

  const handleFieldSize = e => {
    setFieldSize(e.target.value);
    setSaved(false);
    setDirty(true);
  };

  const handleSave = () => {
    setError(null);
    const top3 = places.map((p, i) => {
      const sp   = parseSP(p.sp);
      const gate = parseInt(p.gate) || null;
      if (!p.horse.trim()) return { _err: `Place ${i + 1}: horse name required` };
      if (!sp)              return { _err: `Place ${i + 1}: invalid SP "${p.sp}"` };
      return { gatePosition: gate, horseName: p.horse.trim(), sp, jockey: '', trainer: '' };
    });
    const firstErr = top3.find(t => t._err);
    if (firstErr) { setError(firstErr._err); return; }

    const entry = { year, raceName: dataName, fieldSize: parseInt(fieldSize) || null, top3 };
    addRuntimeResult(entry);
    setSaved(true);
    setDirty(false);
    onSaved(entry);
  };

  const handleDelete = () => {
    removeRuntimeResult(year, dataName);
    setPlaces([emptyPlace(), emptyPlace(), emptyPlace()]);
    setFieldSize('');
    setSaved(false);
    setDirty(false);
    onDeleted(dataName);
  };

  return (
    <div className={`border rounded-xl overflow-hidden shadow-sm transition-colors ${
      saved ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-white'
    }`}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2">
        <span className="text-emerald-600 font-mono text-sm font-bold shrink-0">{race.time}</span>
        <span className="font-semibold text-sm text-gray-900 flex-1 min-w-0">{race.name}</span>
        {saved && !dirty && (
          <span className="text-xs text-emerald-600 font-semibold shrink-0">✓ Saved</span>
        )}
        {dirty && (
          <span className="text-xs text-amber-500 shrink-0">Unsaved changes</span>
        )}
        {saved && (
          <button
            onClick={handleDelete}
            className="text-xs text-gray-500 hover:text-rose-600 transition-colors px-1"
            title="Delete this result"
          >
            ✕
          </button>
        )}
      </div>

      {/* Form */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 shrink-0">Field size:</span>
          <input
            type="number" min="3" max="60"
            value={fieldSize}
            onChange={handleFieldSize}
            placeholder="e.g. 22"
            className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded
                       focus:outline-none focus:border-emerald-500 text-center"
          />
          <span className="text-xs text-gray-500 hidden sm:inline">
            Gate · Horse · SP (fractional or decimal)
          </span>
        </div>

        <div className="space-y-2">
          {['1st', '2nd', '3rd'].map((label, i) => (
            <PlaceRow key={i} label={label} value={places[i]} onChange={v => updatePlace(i, v)} />
          ))}
        </div>

        {error && <p className="text-xs text-rose-600">{error}</p>}

        <button
          onClick={handleSave}
          className="text-sm px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700
                     text-gray-900 font-semibold transition-colors"
        >
          {saved && !dirty ? '↻ Update' : 'Save Result'}
        </button>
      </div>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

export default function AddResultsPanel() {
  const currentYear = new Date().getFullYear();
  const [year, setYear]           = useState(currentYear);
  const [activeDay, setActiveDay] = useState('Tuesday');
  const [tick, setTick]           = useState(0); // bump to re-read getRuntimeResults

  // Derive saved map fresh on every render (getRuntimeResults reads _runtime array)
  const allRuntime = getRuntimeResults(); // eslint-disable-line react-hooks/exhaustive-deps
  const savedMap   = {};
  for (const e of allRuntime) {
    savedMap[`${e.year}:${e.raceName.toLowerCase()}`] = e;
  }

  const schedule   = FESTIVAL_DAYS[activeDay] ?? [];
  const yearSaved  = allRuntime.filter(e => e.year === year);
  const savedCount = schedule.filter(r => {
    const key = `${year}:${(r.dataName ?? r.name).toLowerCase()}`;
    return !!savedMap[key];
  }).length;

  const onSaved   = () => setTick(t => t + 1);
  const onDeleted = () => setTick(t => t + 1);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-emerald-600 tracking-tight">Add Results</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Enter finishing positions · results feed into Race History &amp; analysis immediately
          </p>
        </div>

        {/* Year + totals */}
        <div className="mb-5 flex items-center gap-3 flex-wrap">
          <label className="text-sm font-semibold text-gray-500">Year:</label>
          <input
            type="number" min="2002" max="2035"
            value={year}
            onChange={e => setYear(parseInt(e.target.value) || currentYear)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:outline-none focus:border-emerald-500"
          />
          {yearSaved.length > 0 && (
            <span className="text-xs text-emerald-600 font-semibold">
              {yearSaved.length} race{yearSaved.length !== 1 ? 's' : ''} saved for {year}
            </span>
          )}
        </div>

        {/* Day tabs */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.keys(FESTIVAL_DAYS).map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeDay === day
                  ? 'bg-emerald-600 text-gray-900 shadow'
                  : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-800 hover:border-gray-400'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Progress */}
        <p className="text-xs text-gray-500 mb-4">
          {savedCount} of {schedule.length} {activeDay} races entered for {year}
        </p>

        {/* Race entry cards */}
        <div className="space-y-4">
          {schedule.map(race => {
            const dataName = race.dataName ?? race.name;
            const key      = `${year}:${dataName.toLowerCase()}`;
            return (
              <RaceEntryCard
                key={`${year}-${race.name}`}
                race={race}
                year={year}
                existingEntry={savedMap[key] ?? null}
                onSaved={onSaved}
                onDeleted={onDeleted}
              />
            );
          })}
        </div>

        {/* Summary of all results for this year */}
        {yearSaved.length > 0 && (
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-3">
              All {year} results in analysis
            </h2>
            <div className="space-y-2">
              {yearSaved.map(e => (
                <div key={e.raceName} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-800">{e.raceName}</span>
                    {e.fieldSize && (
                      <span className="text-xs text-gray-500">{e.fieldSize} runners</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {e.top3.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-bold w-7 text-right shrink-0 text-gray-500">
                          {['1st', '2nd', '3rd'][i]}
                        </span>
                        {h.gatePosition && (
                          <span className="font-mono text-gray-500 shrink-0">G{h.gatePosition}</span>
                        )}
                        <span className="font-medium flex-1">{h.horseName}</span>
                        <span className="font-mono text-emerald-700 shrink-0">{spDisplay(h.sp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
