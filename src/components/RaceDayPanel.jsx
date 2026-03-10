/**
 * RaceDayPanel.jsx — Festival Day Dashboard
 *
 * Paste a race card for each race in the day's schedule.
 * Results auto-compute — no "Optimise" button needed.
 * All top-3 gate combos visible on one page.
 */

import { useState, useEffect, useRef } from 'react';
import { parseRaceCardText } from '../engine/parser';
import { enrichRunners, enrichRunnersHenery } from '../engine/probability';
import { rankCombinations }  from '../engine/optimiser';
import { getRaceHistory }    from '../data/historicalData';
import { FESTIVAL_DAYS }     from '../data/schedule';
import SEED_TUESDAY         from '../data/seed-tuesday.json';

// ── Festival schedule ─────────────────────────────────────────────────────────

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
  const enriched       = enrichRunners(runners);
  const ranked         = rankCombinations(enriched);
  const enrichedHenery = enrichRunnersHenery(runners);
  const rankedHenery   = rankCombinations(enrichedHenery);
  return {
    combo:        ranked[0]        ?? null,
    comboHenery:  rankedHenery[0]  ?? null,
    enriched,
    ranked,
  };
}

function fmtOdds(decimal) {
  if (!decimal) return '';
  const frac = decimal - 1;
  if (Number.isInteger(frac) && frac > 0) return `${frac}/1`;
  return decimal.toFixed(2);
}

// ── ModelResult sub-component ─────────────────────────────────────────────────

function ModelResult({ label, combo, fmtOdds, accent = 'emerald', originalOdds = {} }) {
  const gateColor = accent === 'blue'
    ? 'bg-blue-600 text-white'
    : 'bg-emerald-600 text-white';
  const evColor = accent === 'blue'
    ? 'text-blue-600'
    : 'text-emerald-600';
  const labelColor = accent === 'blue'
    ? 'text-blue-500'
    : 'text-gray-400';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs uppercase tracking-wider font-semibold ${labelColor}`}>{label}</span>
        <span className={`font-mono font-bold text-sm ${evColor}`}>EV {combo.ev.toFixed(2)}</span>
      </div>
      {combo.runners.map((r, i) => {
        const orig = originalOdds[r.gatePosition];
        const moved = orig && Math.abs(r.decimalOdds - orig) > 0.05;
        const shortened = moved && r.decimalOdds < orig;
        const drifted   = moved && r.decimalOdds > orig;
        return (
          <div key={i} className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${gateColor}`}>
              Gate {r.gatePosition}
            </span>
            <span className="text-gray-800 text-sm font-medium flex-1 min-w-0">{r.horseName}</span>
            <span className="text-gray-400 text-xs font-mono shrink-0">{fmtOdds(r.decimalOdds)}</span>
            {shortened && (
              <span className="text-emerald-600 text-xs font-bold shrink-0" title={`Shortened from ${fmtOdds(orig)}`}>▼</span>
            )}
            {drifted && (
              <span className="text-amber-500 text-xs font-bold shrink-0" title={`Drifted from ${fmtOdds(orig)}`}>▲</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── RaceCard (per-race widget) ────────────────────────────────────────────────

function RaceCard({ race, data, onPaste, onSave, onClear }) {
  const [pasting,        setPasting]        = useState(false);
  const [parseError,     setParseError]     = useState(null);
  const [saving,         setSaving]         = useState(false);
  const [saveError,      setSaveError]      = useState(null);
  const [showHistory,    setShowHistory]    = useState(false);
  const [historyEntries, setHistoryEntries] = useState(null);   // null = not yet loaded
  const [loadingHistory, setLoadingHistory] = useState(false);
  const textareaRef = useRef(null);

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

  const [rawDebug, setRawDebug] = useState(null);

  const handleParse = (rawText) => {
    const src = rawText ?? textareaRef.current?.value ?? '';
    setParseError(null);
    setRawDebug(null);
    if (!src.trim()) return;

    const { races } = parseRaceCardText(src);
    const r = races?.[0];

    if (!r || r.runners.length === 0) {
      setRawDebug(src.slice(0, 300));
      setParseError('No runners found — see raw text below.');
      return;
    }
    if (r.runners.length < 3) {
      setRawDebug(src.slice(0, 300));
      setParseError(`Only ${r.runners.length} runner(s) found — need at least 3.`);
      return;
    }

    onPaste(r.runners);
    setPasting(false);
    if (textareaRef.current) textareaRef.current.value = '';
  };

  const handleClipboardPaste = async () => {
    setParseError(null);
    if (!navigator.clipboard?.readText) {
      // API not available (Samsung Internet etc) — focus textarea so user can long-press paste
      textareaRef.current?.focus();
      setParseError('Tap the box below, long-press, then choose Paste.');
      return;
    }
    try {
      const clipText = await navigator.clipboard.readText();
      if (!clipText?.trim()) {
        setParseError('Clipboard is empty — copy the race card text first.');
        return;
      }
      // Put text into the uncontrolled textarea so user can see it, then parse
      if (textareaRef.current) textareaRef.current.value = clipText;
      handleParse(clipText);
    } catch {
      textareaRef.current?.focus();
      setParseError('Clipboard access denied — tap the box below, long-press, then choose Paste.');
    }
  };

  // No onPaste handler needed — textarea is uncontrolled, browser inserts text
  // naturally. User sees the text and taps "Parse & Run" to submit.

  const combo        = data?.combo        ?? null;
  const comboHenery  = data?.comboHenery  ?? null;
  const runners      = data?.runners      ?? null;
  const savedAt      = data?.savedAt      ?? null;
  const originalOdds = data?.originalOdds ?? {};

  // Are both models suggesting the same gates?
  const sameAsHarville = combo && comboHenery &&
    [...combo.runners.map(r => r.gatePosition)].sort().join() ===
    [...comboHenery.runners.map(r => r.gatePosition)].sort().join();

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
              onClick={() => { setPasting(p => !p); setParseError(null); if (textareaRef.current) textareaRef.current.value = ''; }}
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
          {/* Clipboard API button — most reliable on mobile (Android/iOS) */}
          <button
            onClick={handleClipboardPaste}
            className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
                       text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            📋 Paste from clipboard
          </button>
          <p className="text-xs text-gray-400 text-center">— or type / paste manually below —</p>
          <textarea
            ref={textareaRef}
            placeholder={'Paste race card text here…\n\nFormat: gate  horse name  odds\ne.g.\n1  Big Buck\'s  5/1\n2  Kauto Star  2/1'}
            className="w-full h-36 bg-white border border-gray-300 rounded px-3 py-2
                       text-sm text-gray-800 font-mono focus:outline-none focus:border-emerald-500
                       resize-y placeholder-gray-400"
          />
          {parseError && (
            <div className="space-y-1">
              <p className="text-rose-600 text-xs">{parseError}</p>
              {rawDebug && (
                <pre className="text-xs bg-gray-100 border border-gray-200 rounded p-2 overflow-auto max-h-32 text-gray-600 whitespace-pre-wrap break-all">{rawDebug}</pre>
              )}
            </div>
          )}
          <button
            onClick={() => handleParse()}
            className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700
                       text-white text-sm font-semibold transition-colors"
          >
            Parse &amp; Run →
          </button>
        </div>
      )}

      {/* ── Result ── */}
      {!pasting && combo && (
        <div className="px-4 py-3 space-y-3">

          {/* Harville model */}
          <ModelResult label="Harville" combo={combo} fmtOdds={fmtOdds} originalOdds={originalOdds} />

          {/* Henery model — only show separately when it disagrees */}
          {!sameAsHarville && comboHenery && (
            <ModelResult label="Henery" combo={comboHenery} fmtOdds={fmtOdds} accent="blue" originalOdds={originalOdds} />
          )}
          {sameAsHarville && (
            <p className="text-xs text-gray-400 italic">Both models agree ✓</p>
          )}
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

  // Initialise from localStorage, or seed Tuesday's card on first load
  const [raceData, setRaceData] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      const source = stored ? JSON.parse(stored) : SEED_TUESDAY;
      const parsed = source;
      const restored = {};
      for (const [name, entry] of Object.entries(parsed)) {
        if (!entry.runners) continue;
        const results = computeRaceResults(entry.runners);
        if (results) {
          restored[name] = {
            ...results,
            runners: entry.runners,
            savedAt: entry.savedAt ? new Date(entry.savedAt) : null,
            originalOdds: entry.originalOdds ?? null,
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
          originalOdds: entry.originalOdds ?? null,
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
    setRaceData(prev => {
      // On first paste, record the baseline odds. On re-paste, keep the original.
      const existing = prev[raceName];
      const originalOdds = existing?.originalOdds ??
        Object.fromEntries(runners.map(r => [r.gatePosition, r.decimalOdds]));
      return {
        ...prev,
        [raceName]: { runners, combo: results.combo, comboHenery: results.comboHenery, enriched: results.enriched, ranked: results.ranked, savedAt: existing?.savedAt ?? null, originalOdds },
      };
    });
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
          combo:        results.combo,
          comboHenery:  results.comboHenery,
          enriched:     results.enriched,
          ranked:       results.ranked,
          savedAt:      entry.timestamp ? new Date(entry.timestamp) : null,
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
