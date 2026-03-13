/**
 * App.jsx
 *
 * Root component. Defines top-level routing and the persistent navigation bar.
 * Routes:
 *   /              → HistoricalDisplay (raw data verification)
 *   /race-history  → RaceHistoryPanel  (per-race character analysis)
 */

import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import HistoricalDisplay  from './components/HistoricalDisplay';
import RaceHistoryPanel   from './components/RaceHistoryPanel';
import OptimiserPanel     from './components/OptimiserPanel';
import BacktesterPanel    from './components/BacktesterPanel';
import RaceCoveragePanel  from './components/RaceCoveragePanel';
import HelpPanel          from './components/HelpPanel';
import ResultsTablePanel  from './components/ResultsTablePanel';
import RaceDayPanel       from './components/RaceDayPanel';
import AddResultsPanel      from './components/AddResultsPanel';
import FridayRacecardPanel       from './components/FridayRacecardPanel';
import FridaySPCompositionPanel  from './components/FridaySPCompositionPanel';
import { loadRuntimeResults } from './data/historicalData';

const NAV_LINKS = [
  { to: '/',                  end: true,  label: 'Historical Data' },
  { to: '/race-history',     end: false, label: 'Race History' },
  { to: '/optimiser',        end: true,  label: 'Optimiser' },
  { to: '/optimiser/henery', end: false, label: 'Optimiser (Henery)' },
  { to: '/backtester',       end: false, label: 'Backtester' },
  { to: '/race-coverage',    end: false, label: 'Race Coverage' },
  { to: '/results-table',    end: false, label: 'Results Table' },
  { to: '/race-day',         end: false, label: 'Race Day' },
  { to: '/add-results',      end: false, label: 'Add Results' },
  { to: '/friday-racecard',      end: false, label: 'Friday Racecard' },
  { to: '/friday-sp-composition', end: false, label: 'Friday SP Composition' },
  { to: '/help',             end: false, label: 'Help' },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const base    = 'px-4 py-2 rounded text-sm font-medium transition-colors';
  const active   = `${base} bg-gray-100 text-emerald-700`;
  const inactive = `${base} text-gray-500 hover:text-gray-800 hover:bg-gray-100`;
  const mobileActive   = 'block px-4 py-3 text-sm font-medium text-emerald-700 bg-gray-100 rounded';
  const mobileInactive = 'block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded';

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-emerald-700 font-bold text-base tracking-tight">
            Champion Tipster
          </span>
          <span className="text-emerald-700 font-bold text-base tracking-tight font-mono">
            v{__BUILD_LABEL__}
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-wrap">
          {NAV_LINKS.map(({ to, end, label }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => isActive ? active : inactive}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          {open
            ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-2 pb-3 space-y-1">
          {NAV_LINKS.map(({ to, end, label }) => (
            <NavLink key={to} to={to} end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => isActive ? mobileActive : mobileInactive}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function App() {
  // Load any runtime results (entered via Add Results page) from localStorage
  useEffect(() => { loadRuntimeResults(); }, []);

  return (
    <div className="dark min-h-screen bg-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<HistoricalDisplay />} />
        <Route path="/race-history" element={<RaceHistoryPanel />} />
        <Route path="/optimiser" element={<OptimiserPanel />} />
        <Route path="/optimiser/henery" element={<OptimiserPanel model="henery" />} />
        <Route path="/backtester" element={<BacktesterPanel />} />
        <Route path="/race-coverage" element={<RaceCoveragePanel />} />
        <Route path="/results-table" element={<ResultsTablePanel />} />
        <Route path="/race-day" element={<RaceDayPanel />} />
        <Route path="/add-results" element={<AddResultsPanel />} />
        <Route path="/friday-racecard"      element={<FridayRacecardPanel />} />
        <Route path="/friday-sp-composition" element={<FridaySPCompositionPanel />} />
        <Route path="/help" element={<HelpPanel />} />
      </Routes>
    </div>
  );
}
