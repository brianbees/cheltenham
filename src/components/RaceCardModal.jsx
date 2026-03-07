/**
 * RaceCardModal.jsx  —  Race Card Paste & Parse Modal
 *
 * Two-step flow:
 *   Step 1 — Paste: user pastes raw race card text and clicks "Parse"
 *   Step 2 — Preview: shows parsed runners per race, warnings, confirm buttons
 *
 * Props:
 *   onClose()             – close without loading anything
 *   onLoadRace(raceData)  – load a race into the optimiser
 *                           raceData = { raceName, runners, result }
 *                           runners = [{ gatePosition, horseName, decimalOdds }]
 *                           result  = [{ gatePosition, horseName, sp }] | null
 */

import { useState } from 'react';
import { parseRaceCardText } from '../engine/parser';

// ── Position badge styles ─────────────────────────────────────────────────────
const POS_BADGE = {
  1: 'bg-yellow-500 text-yellow-950',
  2: 'bg-gray-400  text-gray-900',
  3: 'bg-amber-700 text-amber-100',
};
const POS_LABEL = { 1: '1st', 2: '2nd', 3: '3rd' };

// Derive finish position for a runner within a parsed race's result array
function finishPosition(runner, result) {
  if (!result) return null;
  const idx = result.findIndex(r => r.gatePosition === runner.gatePosition);
  return idx === -1 ? null : idx + 1;
}

// Display decimal odds as fractional when it's a clean integer fraction
function oddsLabel(decimal) {
  const frac = decimal - 1;
  if (Number.isInteger(frac)) return `${frac}/1`;
  // Try to round to common fractions at one decimal
  return decimal.toFixed(2);
}

// ── Parsed race preview card ──────────────────────────────────────────────────
function ParsedRaceCard({ race, index, onLoad, totalRaces }) {
  const hasResult  = race.result !== null;
  const hasWarnings = race.warnings.length > 0;

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden mb-4">

      {/* Card header */}
      <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-semibold text-sm">{race.raceName}</span>
          <span className="text-gray-500 text-xs">
            {race.runners.length} runner{race.runners.length !== 1 ? 's' : ''}
          </span>
          {hasResult && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700">
              Result detected
            </span>
          )}
          {hasWarnings && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 border border-amber-700">
              {race.warnings.length} warning{race.warnings.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={() => onLoad(race)}
          disabled={race.runners.length < 3}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500
                     text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Load into Optimiser →
        </button>
      </div>

      {/* Runners table */}
      {race.runners.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="text-left px-3 py-1.5 text-gray-500 font-medium w-14">Gate</th>
                <th className="text-left px-3 py-1.5 text-gray-500 font-medium">Horse</th>
                <th className="text-right px-3 py-1.5 text-gray-500 font-medium w-20">Odds</th>
                <th className="text-right px-3 py-1.5 text-gray-500 font-medium w-20">Decimal</th>
                <th className="text-center px-3 py-1.5 text-gray-500 font-medium w-16">Finish</th>
              </tr>
            </thead>
            <tbody>
              {race.runners.map((r, i) => {
                const pos = finishPosition(r, race.result);
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-800 ${
                      pos ? 'bg-emerald-950/30' : i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/40'
                    }`}
                  >
                    <td className="px-3 py-1.5 font-mono text-gray-400">{r.gatePosition}</td>
                    <td className="px-3 py-1.5 text-gray-200">{r.horseName}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-gray-300">
                      {oddsLabel(r.decimalOdds)}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-gray-500">
                      {r.decimalOdds.toFixed(2)}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      {pos ? (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${POS_BADGE[pos]}`}>
                          {POS_LABEL[pos]}
                        </span>
                      ) : (
                        <span className="text-gray-700">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Warnings */}
      {hasWarnings && (
        <div className="border-t border-amber-900/40 bg-amber-950/20 px-4 py-2">
          <p className="text-amber-400 text-xs font-semibold mb-1">Parse warnings:</p>
          <ul className="space-y-0.5">
            {race.warnings.map((w, i) => (
              <li key={i} className="text-amber-300/80 text-xs font-mono">{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Result summary */}
      {hasResult && (
        <div className="border-t border-emerald-900/40 bg-emerald-950/20 px-4 py-2 flex gap-4 flex-wrap">
          <span className="text-xs text-emerald-500 font-semibold">Top 3 detected:</span>
          {race.result.map((r, i) => (
            <span key={i} className="text-xs text-emerald-300 font-mono">
              <span className={`font-bold px-1 py-0.5 rounded mr-1 ${POS_BADGE[i + 1]}`}>
                {POS_LABEL[i + 1]}
              </span>
              Gate {r.gatePosition} · {r.horseName} · {oddsLabel(r.sp)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Paste step ────────────────────────────────────────────────────────────────
function StepPaste({ rawText, onChange, onParse, onClose }) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <p className="text-gray-300 text-sm mb-1">
          Paste a race card — one or multiple races. Accepted formats:
        </p>
        <ul className="text-gray-500 text-xs space-y-0.5 list-disc list-inside mb-3">
          <li>Tab-separated or multi-space columns</li>
          <li>Column order: Gate · Horse name · Odds · (Trainer · Jockey — ignored)</li>
          <li>Fractional odds: <span className="font-mono text-gray-400">6/1</span>, <span className="font-mono text-gray-400">7/2 Fav</span>, <span className="font-mono text-gray-400">4/1 (2nd)</span></li>
          <li>Finish positions optional: <span className="font-mono text-gray-400">(1st)</span> <span className="font-mono text-gray-400">(2nd)</span> <span className="font-mono text-gray-400">(3rd)</span></li>
          <li>Multiple races: separate each block with the race name on its own line</li>
        </ul>
        <textarea
          autoFocus
          value={rawText}
          onChange={e => onChange(e.target.value)}
          placeholder={`Triumph Hurdle\n1\tBunting (FR)\t11/2\tW.P. Mullins\tSean O'Keeffe\n7\tMajborough (FR)\t6/1 (1st)\tW.P. Mullins\tMark Walsh\n...`}
          className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2
                     text-sm text-gray-200 font-mono resize-y
                     focus:outline-none focus:border-emerald-500
                     placeholder:text-gray-700"
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onParse}
          disabled={!rawText.trim()}
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500
                     text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Parse →
        </button>
      </div>
    </div>
  );
}

// ── Preview step ──────────────────────────────────────────────────────────────
function StepPreview({ parsed, onBack, onLoad, onClose }) {
  const { races } = parsed;

  if (races.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="border border-rose-800 rounded-xl bg-rose-950/40 px-4 py-4 text-center">
          <p className="text-rose-400 font-semibold mb-1">No runners could be parsed.</p>
          <p className="text-rose-300/70 text-sm">
            Check that your data has gate numbers in the first column and odds in the third column.
          </p>
        </div>
        <div className="flex justify-between">
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
            ← Back
          </button>
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <p className="text-gray-300 text-sm">
          {races.length === 1
            ? '1 race parsed — review and load.'
            : `${races.length} races parsed — load each into the Optimiser separately.`}
        </p>
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Edit paste
        </button>
      </div>

      <div className="overflow-y-auto max-h-[55vh] pr-1">
        {races.map((race, i) => (
          <ParsedRaceCard
            key={i}
            race={race}
            index={i}
            onLoad={onLoad}
            totalRaces={races.length}
          />
        ))}
      </div>

      <div className="flex justify-end pt-1">
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}

// ── Modal shell ───────────────────────────────────────────────────────────────
export default function RaceCardModal({ onClose, onLoadRace }) {
  const [step,    setStep]    = useState('paste');   // 'paste' | 'preview'
  const [rawText, setRawText] = useState('');
  const [parsed,  setParsed]  = useState(null);

  function handleParse() {
    const result = parseRaceCardText(rawText);
    setParsed(result);
    setStep('preview');
  }

  function handleBack() {
    setStep('paste');
  }

  function handleLoad(race) {
    onLoadRace(race);
    onClose();
  }

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-gray-950 border border-gray-700 rounded-2xl w-full max-w-2xl shadow-2xl
                      flex flex-col max-h-[90vh]">

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div>
            <h2 className="text-white font-bold text-base">Paste Race Card</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {step === 'paste' ? 'Step 1 of 2 — Paste data' : 'Step 2 of 2 — Review & confirm'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-300 text-xl leading-none transition-colors"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-4 overflow-y-auto flex-1">
          {step === 'paste' ? (
            <StepPaste
              rawText={rawText}
              onChange={setRawText}
              onParse={handleParse}
              onClose={onClose}
            />
          ) : (
            <StepPreview
              parsed={parsed}
              onBack={handleBack}
              onLoad={handleLoad}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
