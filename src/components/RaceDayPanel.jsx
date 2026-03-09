/**
 * RaceDayPanel.jsx — Festival Day Dashboard
 *
 * Paste a race card for each race in the day's schedule.
 * Results auto-compute — no "Optimise" button needed.
 * All top-3 gate combos visible on one page.
 */

import { useState, useEffect } from 'react';
import { parseRaceCardText } from '../engine/parser';
import { enrichRunners }     from '../engine/probability';
import { rankCombinations }  from '../engine/optimiser';
import { getRaceHistory }    from '../data/historicalData';

// ── Festival schedule ─────────────────────────────────────────────────────────

const FESTIVAL_DAYS = {
  Tuesday: [
    { time: '13:20', name: "Supreme Novices' Hurdle",             dataName: 'Supreme Novices Hurdle' },
    { time: '14:00', name: 'Arkle Chase',                          dataName: 'Arkle Challenge Trophy' },
    { time: '14:40', name: 'Fred Winter Juvenile Handicap Hurdle', dataName: 'Fred Winter Juvenile Hurdle' },
    { time: '15:20', name: 'Ultima Handicap Chase' },
    { time: '16:00', name: 'Champion Hurdle' },
    { time: '16:40', name: 'TrustATrader Festival Plate Handicap', dataName: 'Plate Handicap Chase' },
    { time: '17:20', name: 'National Hunt Chase' },
  ],
  Wednesday: [
    { time: '13:20', name: "Turner's Novices' Hurdle",             dataName: 'Ballymore Novices Hurdle' },
    { time: '14:00', name: "Brown Advisory Novices' Chase",        dataName: 'Brown Advisory Novices Chase' },
    { time: '14:40', name: 'BetMGM Cup Hurdle (Coral Cup)',        dataName: 'Coral Cup' },
    { time: '15:20', name: 'Glenfarclas Cross Country Chase',      dataName: 'Cross Country Chase' },
    { time: '16:00', name: 'Champion Chase',                       dataName: 'Queen Mother Champion Chase' },
    { time: '16:40', name: 'Grand Annual Chase',                   dataName: 'Grand Annual' },
    { time: '17:20', name: 'Champion Bumper' },
  ],
  Thursday: [
    { time: '13:20', name: "Ryanair Mares' Novices' Hurdle",       dataName: "Mares' Novices' Hurdle" },
    { time: '14:00', name: "Jack Richards Novices' Chase",         dataName: "Turners Novices' Chase" },
    { time: '14:40', name: "Mares' Hurdle",                        dataName: "Dawn Run Mares' Hurdle" },
    { time: '15:20', name: "Stayers' Hurdle" },
    { time: '16:00', name: 'Ryanair Chase' },
    { time: '16:40', name: 'Pertemps Handicap Hurdle',             dataName: 'Pertemps Final' },
    { time: '17:20', name: 'Kim Muir Handicap Chase',              dataName: 'Kim Muir' },
  ],
  Friday: [
    { time: '13:20', name: 'Triumph Hurdle' },
    { time: '14:00', name: 'County Hurdle' },
    { time: '14:40', name: 'Mares Chase' },
    { time: '15:20', name: "Albert Bartlett Novices' Hurdle",      dataName: 'Albert Bartlett' },
    { time: '16:00', name: 'Gold Cup' },
    { time: '16:40', name: "St James's Place Hunters' Chase",      dataName: 'Foxhunter Chase' },
    { time: '17:20', name: 'Martin Pipe Handicap Hurdle',          dataName: 'Martin Pipe' },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRaceClass(raceName, dataName) {
  const rows = getRaceHistory(dataName || raceName);
  if (!rows || rows.length === 0) return null;
  const avg = rows.reduce((s, r) => s + r.spTotal, 0) / rows.length;
  const count = rows.length;
  if (avg > 40) return { label: 'Swing',     count, color: 'bg-rose-100 text-rose-700 border border-rose-300' };
  if (avg > 20) return { label: 'Judgement', count, color: 'bg-amber-100 text-amber-700 border border-amber-300' };
  return             { label: 'Banker',     count, color: 'bg-emerald-100 text-emerald-700 border border-emerald-300' };
}

function computeRaceResults(runners) {
  if (!runners || runners.length < 3) return null;
  const enriched = enrichRunners(runners);
  const ranked   = rankCombinations(enriched);
  return { combo: ranked[0] ?? null, enriched, ranked };
}

function fmtOdds(decimal) {
  if (!decimal) return '';
  const frac = decimal - 1;
  if (Number.isInteger(frac) && frac > 0) return `${frac}/1`;
  return decimal.toFixed(2);
}

// ── RaceCard (per-race widget) ────────────────────────────────────────────────

function RaceCard({ race, data, onPaste, onSave, onClear }) {
  const [pasting,        setPasting]        = useState(false);
  const [text,           setText]           = useState('');
  const [parseError,     setParseError]     = useState(null);
  const [saving,         setSaving]         = useState(false);
  const [saveError,      setSaveError]      = useState(null);
  const [showHistory,    setShowHistory]    = useState(false);
  const [historyEntries, setHistoryEntries] = useState(null);   // null = not yet loaded
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleShowHistory = async () => {
    if (showHistory) { setShowHistory(false); return; }
    setShowHistory(true);
    if (historyEntries !== null) return;   // already fetched
    setLoadingHistory(true);
    try {
      const all   = await fetch('/api/results').then(r => r.json());
      const key   = race.dataName || race.name;
      const mine  = all.filter(e => e.race === key);
      setHistoryEntries(mine);   // newest first (server sorts that way)
    } catch {
      setHistoryEntries([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleLoadEntry = (entry) => {
    const runners = entry.runners.map(r => ({
      gatePosition: r.gatePosition,
      horseName:    r.horseName,
      decimalOdds:  r.decimalOdds,
    }));
    onPaste(runners);
    onSave(new Date(entry.timestamp));
    setShowHistory(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveError(null);
    const now = new Date();
    const payload = {
      race:      race.dataName || race.name,
      timestamp: now.toISOString(),
      fieldSize: data.runners.length,
      runners: data.enriched.map(r => ({
        gatePosition: r.gatePosition,
        horseName:    r.horseName,
        decimalOdds:  r.decimalOdds,
        pWin:         +r.pWin.toFixed(6),
        pPlace:       +r.pPlace.toFixed(6),
        spPoints:     +(r.decimalOdds - 1).toFixed(2),
      })),
      combinations: data.ranked.map(c => ({
        rank:      c.rank,
        gates:     c.runners.map(r => r.gatePosition),
        horses:    c.runners.map(r => r.horseName),
        ev:        +c.ev.toFixed(4),
        evSp:      +c.evSp.toFixed(4),
        evWin:     +c.evWin.toFixed(4),
        evJackpot: +c.evJackpot.toFixed(4),
        pJackpot:  +c.pJackpot.toFixed(6),
      })),
    };
    try {
      const resp = await fetch('/api/save-results', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${resp.status}`);
      }
      onSave(now);
    } catch {
      setSaveError('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const raceClass = getRaceClass(race.name, race.dataName);

  const handleParse = () => {
    setParseError(null);
    if (!text.trim()) return;

    const { races } = parseRaceCardText(text);
    const r = races?.[0];

    if (!r || r.runners.length === 0) {
      setParseError('No runners found — check the pasted text.');
      return;
    }
    if (r.runners.length < 3) {
      setParseError(`Only ${r.runners.length} runner(s) found — need at least 3.`);
      return;
    }

    onPaste(r.runners);
    setPasting(false);
    setText('');
  };

  const combo   = data?.combo   ?? null;
  const runners = data?.runners ?? null;
  const savedAt = data?.savedAt ?? null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">

      {/* ── Header ── */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 space-y-2">
        {/* Row 1: time + name + buttons */}
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-mono text-sm font-bold shrink-0">{race.time}</span>
          <span className="text-gray-900 font-semibold text-sm flex-1 min-w-0 leading-snug">{race.name}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {runners && (
              <button
                onClick={onClear}
                className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                title="Clear"
              >
                ✕
              </button>
            )}
            <button
              onClick={handleShowHistory}
              title="View save history"
              className={`px-2 py-2 rounded border text-xs transition-colors ${
                showHistory
                  ? 'border-sky-400 text-sky-600 bg-sky-50'
                  : 'border-gray-300 text-gray-400 hover:border-sky-400 hover:text-sky-500'
              }`}
            >
              ⏱
            </button>
            <button
              onClick={() => { setPasting(p => !p); setParseError(null); setText(''); }}
              className="text-xs px-3 py-2 rounded border border-gray-300 text-gray-500
                         hover:border-emerald-500 hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {pasting ? 'Cancel' : runners ? '↻ Re-paste' : '⬆ Paste Card'}
            </button>
          </div>
        </div>
        {/* Row 2: race class badge */}
        {raceClass && (
          <div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${raceClass.color}`}>
              {raceClass.label} · {raceClass.count}yr
            </span>
          </div>
        )}
      </div>

      {/* ── History dropdown ── */}
      {showHistory && (
        <div className="bg-sky-50 border-b border-sky-100 px-4 py-3">
          <p className="text-xs font-semibold text-sky-700 mb-2">Saved versions — click to load</p>
          {loadingHistory && <p className="text-xs text-gray-400 italic">Loading…</p>}
          {!loadingHistory && historyEntries && historyEntries.length === 0 && (
            <p className="text-xs text-gray-400 italic">No saves found for this race.</p>
          )}
          {!loadingHistory && historyEntries && historyEntries.length > 0 && (
            <div className="space-y-1">
              {historyEntries.map((entry, i) => {
                const ts = new Date(entry.timestamp);
                const label = ts.toLocaleString('en-GB', {
                  day: '2-digit', month: 'short',
                  hour: '2-digit', minute: '2-digit', second: '2-digit',
                });
                return (
                  <button
                    key={entry.file}
                    onClick={() => handleLoadEntry(entry)}
                    className="w-full text-left px-3 py-1.5 rounded border border-sky-200
                               bg-white hover:border-sky-400 hover:bg-sky-50 transition-colors
                               flex items-center justify-between gap-3"
                  >
                    <span className="text-xs font-mono text-sky-700">{label}</span>
                    <span className="text-xs text-gray-400">{entry.fieldSize} runners</span>
                    {i === 0 && (
                      <span className="text-xs bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded">latest</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Paste area ── */}
      {pasting && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 space-y-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={'Paste race card text here…\n\nFormat: gate  horse name  odds\ne.g.\n1  Big Buck\'s  5/1\n2  Kauto Star  2/1'}
            className="w-full h-40 bg-white border border-gray-300 rounded px-3 py-2
                       text-sm text-gray-800 font-mono focus:outline-none focus:border-emerald-500
                       resize-y placeholder-gray-400"
            autoFocus
          />
          {parseError && (
            <p className="text-rose-600 text-xs">{parseError}</p>
          )}
          <button
            onClick={handleParse}
            disabled={!text.trim()}
            className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700
                       text-white text-sm font-semibold disabled:opacity-40 transition-colors"
          >
            Parse &amp; Run →
          </button>
        </div>
      )}

      {/* ── Result ── */}
      {!pasting && combo && (
        <div className="px-4 py-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Best bet</span>
              <span className="text-emerald-600 font-mono font-bold text-sm">EV {combo.ev.toFixed(2)}</span>
            </div>
            <div className="space-y-1.5">
              {combo.runners.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">
                    Gate {r.gatePosition}
                  </span>
                  <span className="text-gray-800 text-sm font-medium flex-1 min-w-0">{r.horseName}</span>
                  <span className="text-gray-400 text-xs font-mono shrink-0">{fmtOdds(r.decimalOdds)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-gray-400">
              {runners.length} runners · {(runners.length * (runners.length - 1) * (runners.length - 2) / 6).toFixed(0)} combos evaluated
            </span>
            <div className="flex items-center gap-3">
              {savedAt && (
                <span className="text-xs text-sky-600 font-mono">
                  Saved {savedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              )}
              {saveError && <span className="text-xs text-rose-500">{saveError}</span>}
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-xs px-3 py-1 rounded border border-sky-300 text-sky-600
                           hover:border-sky-500 hover:text-sky-700 disabled:opacity-40 transition-colors"
              >
                {saving ? 'Saving…' : savedAt ? '↻ Re-save' : '💾 Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!pasting && !combo && (
        <div className="px-4 py-3 text-sm text-gray-400 italic">
          No card loaded
        </div>
      )}

    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

const LS_KEY = 'raceDayData_v1';

export default function RaceDayPanel() {
  const [activeDay, setActiveDay] = useState('Tuesday');

  // Initialise from localStorage so data survives navigation + window close
  const [raceData, setRaceData] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (!stored) return {};
      const parsed = JSON.parse(stored);
      const restored = {};
      for (const [name, entry] of Object.entries(parsed)) {
        if (!entry.runners) continue;
        const results = computeRaceResults(entry.runners);
        if (results) {
          restored[name] = {
            ...results,
            runners: entry.runners,
            savedAt: entry.savedAt ? new Date(entry.savedAt) : null,
          };
        }
      }
      return restored;
    } catch { return {}; }
  });

  // Persist slim copy (runners + savedAt only) on every change
  useEffect(() => {
    try {
      const slim = {};
      for (const [name, entry] of Object.entries(raceData)) {
        slim[name] = {
          runners: entry.runners,
          savedAt: entry.savedAt?.toISOString() ?? null,
        };
      }
      localStorage.setItem(LS_KEY, JSON.stringify(slim));
    } catch {}
  }, [raceData]);

  const [restoring,  setRestoring]  = useState(false);
  const [restoreMsg, setRestoreMsg] = useState('');

  const schedule = FESTIVAL_DAYS[activeDay] ?? [];
  const loaded   = schedule.filter(r => raceData[r.name]).length;

  const handlePaste = (raceName, runners) => {
    const results = computeRaceResults(runners);
    if (!results) return;
    setRaceData(prev => ({
      ...prev,
      [raceName]: { runners, combo: results.combo, enriched: results.enriched, ranked: results.ranked, savedAt: prev[raceName]?.savedAt ?? null },
    }));
  };

  const handleSaved = (raceName, time) => {
    setRaceData(prev => ({ ...prev, [raceName]: { ...prev[raceName], savedAt: time } }));
  };

  const handleClear = (raceName) => {
    setRaceData(prev => {
      const next = { ...prev };
      delete next[raceName];
      return next;
    });
  };

  const handleRestore = async () => {
    setRestoring(true);
    setRestoreMsg('');
    try {
      const entries = await fetch('/api/results').then(r => r.json());
      // Build map: saveName → most-recent entry (array is already newest-first)
      const byRace = {};
      for (const entry of entries) {
        if (entry.race && !byRace[entry.race]) byRace[entry.race] = entry;
      }
      let count = 0;
      const updates = {};
      for (const race of Object.values(FESTIVAL_DAYS).flat()) {
        const key   = race.dataName || race.name;
        const entry = byRace[key];
        if (!entry || !entry.runners) continue;
        const runners = entry.runners.map(r => ({
          gatePosition: r.gatePosition,
          horseName:    r.horseName,
          decimalOdds:  r.decimalOdds,
        }));
        const results = computeRaceResults(runners);
        if (!results) continue;
        updates[race.name] = {
          runners,
          combo:    results.combo,
          enriched: results.enriched,
          ranked:   results.ranked,
          savedAt:  entry.timestamp ? new Date(entry.timestamp) : null,
        };
        count++;
      }
      setRaceData(prev => ({ ...prev, ...updates }));
      setRestoreMsg(count > 0 ? `Restored ${count} race${count !== 1 ? 's' : ''}` : 'No saved races found');
    } catch {
      setRestoreMsg('Restore failed — try restarting the dev server');
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 font-sans">

      {/* ── Header ── */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-600 tracking-tight">Race Day</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Paste each race card · results compute automatically · all races on one page
        </p>
      </div>

      {/* ── Day selector ── */}
      <div className="max-w-5xl mx-auto mb-5 flex gap-2 justify-center flex-wrap">
        {Object.keys(FESTIVAL_DAYS).map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeDay === day
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-800 hover:border-gray-400'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="max-w-5xl mx-auto mb-5">
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-gray-400 mb-1">
          <span className="shrink-0">{loaded} of {schedule.length} races loaded</span>
          <div className="flex items-center gap-2 flex-wrap">
            {restoreMsg && <span className="text-emerald-600">{restoreMsg}</span>}
            <button
              onClick={handleRestore}
              disabled={restoring}
              className="px-3 py-1.5 rounded border border-gray-300 text-gray-500
                         hover:border-emerald-500 hover:text-emerald-600
                         disabled:opacity-40 transition-colors"
            >
              {restoring ? 'Restoring…' : '↩ Restore saved'}
            </button>
            {loaded === schedule.length && loaded > 0 && (
              <span className="text-emerald-600 font-semibold">All races loaded ✓</span>
            )}
          </div>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: schedule.length > 0 ? `${(loaded / schedule.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* ── Race cards grid ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {schedule.map(race => (
          <RaceCard
            key={race.name}
            race={race}
            data={raceData[race.name] ?? null}
            onPaste={(runners) => handlePaste(race.name, runners)}
            onSave={(time) => handleSaved(race.name, time)}
            onClear={() => handleClear(race.name)}
          />
        ))}
      </div>

    </div>
  );
}
