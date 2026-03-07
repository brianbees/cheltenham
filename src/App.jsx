/**
 * App.jsx
 *
 * Root component. Defines top-level routing and the persistent navigation bar.
 * Routes:
 *   /              → HistoricalDisplay (raw data verification)
 *   /race-history  → RaceHistoryPanel  (per-race character analysis)
 */

import { Routes, Route, NavLink } from 'react-router-dom';
import HistoricalDisplay from './components/HistoricalDisplay';
import RaceHistoryPanel from './components/RaceHistoryPanel';
import OptimiserPanel  from './components/OptimiserPanel';

// NavLink receives an isActive boolean from react-router-dom and applies
// the appropriate class so the current page link is highlighted.
function NavBar() {
  const base = 'px-4 py-2 rounded text-sm font-medium transition-colors';
  const active = `${base} bg-gray-800 text-emerald-400`;
  const inactive = `${base} text-gray-400 hover:text-gray-100 hover:bg-gray-800`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-2">
      <span className="text-emerald-400 font-bold text-base mr-4 tracking-tight">
        Champion Tipster
      </span>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? active : inactive)}
      >
        Historical Data
      </NavLink>
      <NavLink
        to="/race-history"
        className={({ isActive }) => (isActive ? active : inactive)}
      >
        Race History
      </NavLink>
      <NavLink
        to="/optimiser"
        className={({ isActive }) => (isActive ? active : inactive)}
      >
        Optimiser
      </NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <div className="dark min-h-screen bg-gray-950">
      <NavBar />
      <Routes>
        <Route path="/" element={<HistoricalDisplay />} />
        <Route path="/race-history" element={<RaceHistoryPanel />} />
        <Route path="/optimiser" element={<OptimiserPanel />} />
      </Routes>
    </div>
  );
}
