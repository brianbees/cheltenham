/**
 * schedule.js — Cheltenham Festival race schedule
 *
 * Shared by RaceDayPanel (pre-race card entry) and AddResultsPanel (post-race
 * result entry).  Each race has:
 *   time      – scheduled off time
 *   name      – display name used in the UI
 *   dataName  – canonical name used in historicalData.js (omitted when same as name)
 */

export const FESTIVAL_DAYS = {
  Tuesday: [
    { time: '13:20', name: "Supreme Novices' Hurdle",             dataName: 'Supreme Novices Hurdle' },
    { time: '14:00', name: 'Arkle Chase',                          dataName: 'Arkle Challenge Trophy' },
    { time: '14:40', name: 'Fred Winter Juvenile Handicap Hurdle', dataName: 'Fred Winter Juvenile Hurdle' },
    { time: '15:20', name: 'Ultima Handicap Chase' },
    { time: '16:00', name: 'Champion Hurdle' },
    { time: '16:40', name: 'TrustATrader Festival Plate Handicap', dataName: 'Plate Handicap Chase' },
    { time: '17:20', name: 'National Hunt Chase',                  aliases: ['NH Challenge Cup', 'National Hunt Challenge Cup'] },
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
