/**
 * historicalData.js
 *
 * All known Gold Cup Day results for the Champion Tipster competition.
 *
 * SP values are stored as DECIMAL ODDS (e.g. a 10/1 shot = 11.0).
 * Points scored from SP = decimal - 1 (so 11.0 decimal → 10 points).
 *
 * Race structure:
 *   - raceName:  Human-readable name used for display and race-character lookup
 *   - fieldSize: Number of runners in the race (null = unknown, to be populated)
 *   - top3:      Ordered array [1st, 2nd, 3rd], each with:
 *                  gatePosition  – gate/stall number (null = unknown)
 *                  horseName     – horse name as a string
 *                  sp            – decimal SP (e.g. 21.0 for a 20/1 shot)
 *
 * Leaderboard entries are the top-3 finishers in the group competition that year.
 */

export const historicalData = {

  // ─── 2010 – 19 March ────────────────────────────────────────────────────────
  2010: {
    date: "19 March 2010",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: 17,
        top3: [
          { gatePosition: null, horseName: "Soldatino",        sp:  7.0 },
          { gatePosition: null, horseName: "Barizan",          sp: 15.0 },
          { gatePosition: null, horseName: "Alaivan",          sp:  5.5 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 28,
        top3: [
          { gatePosition: null, horseName: "Thousand Stars",   sp: 21.0 },
          { gatePosition: null, horseName: "Arcalis",          sp: 34.0 },
          { gatePosition: null, horseName: "Dee Ee Williams",  sp: 21.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 19,
        top3: [
          { gatePosition: null, horseName: "Berties Dream",    sp: 34.0 },
          { gatePosition: null, horseName: "Najaf",            sp: 26.0 },
          { gatePosition: null, horseName: "Kennel Hill",      sp: 67.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 11,
        top3: [
          { gatePosition: null, horseName: "Imperial Commander",  sp:  8.0 },
          { gatePosition: null, horseName: "Denman",              sp:  5.0 },
          { gatePosition: null, horseName: "Mon Mome",            sp: 51.0 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 24,
        top3: [
          { gatePosition: null, horseName: "Baby Run",            sp:  5.5 },
          { gatePosition: null, horseName: "Kilty Storm",         sp: 17.0 },
          { gatePosition: null, horseName: "Reach For The Top",   sp: 67.0 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition: null, horseName: "Pause And Clause",    sp: 15.0 },
          { gatePosition: null, horseName: "Radium",              sp: 15.0 },
          { gatePosition: null, horseName: "Clova Island",        sp: 15.0 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 19,
        top3: [
          { gatePosition: null, horseName: "Pigeon Island",       sp: 17.0 },
          { gatePosition: null, horseName: "French Opera",        sp: 11.0 },
          { gatePosition: null, horseName: "Consigliere",         sp: 17.0 },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2014 – 14 March ────────────────────────────────────────────────────────
  2014: {
    date: "14 March 2014",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Tiger Roll",       sp: 11.0 },
          { gatePosition: null, horseName: "Kentucky Hyden",   sp: 21.0 },
          { gatePosition: null, horseName: "Guitar Pete",      sp:  8.0 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Lac Fontana",  sp: 12.0 },
          { gatePosition: null, horseName: "Arctic Fire",   sp:  8.0 },
          { gatePosition: null, horseName: "Montbazon",    sp: 21.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Very Wood",    sp: 34.0 },
          { gatePosition: null, horseName: "Deputy Dan",   sp: 11.0 },
          { gatePosition: null, horseName: "Apache Jack",  sp: 21.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Lord Windermere",    sp: 21.0 },
          { gatePosition: null, horseName: "On His Own",         sp: 17.0 },
          { gatePosition: null, horseName: "The Giant Bolster",  sp: 15.0 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Tammys Hill",      sp:  8.5 },
          { gatePosition: null, horseName: "Carsonstown Boy",  sp: 41.0 },
          { gatePosition: null, horseName: "On The Fringe",    sp:  6.5 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Don Poli",          sp: 13.0 },
          { gatePosition: null, horseName: "Thomas Crapper",    sp: 11.0 },
          { gatePosition: null, horseName: "Caid Du Berlais",   sp: 10.0 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Savello",      sp: 17.0 },
          { gatePosition: null, horseName: "Ned Buntline", sp:  7.0 },
          { gatePosition: null, horseName: "Claret Cloak", sp:  7.0 },
        ],
      },
    ],
    leaderboard: [
      { name: "Brian",    score: 125 },
      { name: "Holly",    score:  97 },
      { name: "Log",      score:  93 },
    ],
  },

  // ─── 2015 – 13 March ────────────────────────────────────────────────────────
  2015: {
    date: "13 March 2015",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Peace And Co",  sp:  3.0 },
          { gatePosition: null, horseName: "Top Notch",     sp:  8.0 },
          { gatePosition: null, horseName: "Hargam",        sp:  9.0 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Wicklow Brave",  sp: 26.0 },
          { gatePosition: null, horseName: "Sort It Out",    sp:  9.5 },
          { gatePosition: null, horseName: "Quick Jack",     sp:  9.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Martello Tower",  sp: 15.0 },
          { gatePosition: null, horseName: "Milsean",         sp: 34.0 },
          { gatePosition: null, horseName: "No More Heroes",  sp:  7.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Coneygree",         sp:  8.0 },
          { gatePosition: null, horseName: "Djakadam",          sp: 11.0 },
          { gatePosition: null, horseName: "Road To Riches",    sp:  9.0 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "On The Fringe",    sp: 7.0 },
          { gatePosition: null, horseName: "Tammys Hill",      sp: 6.0 },
          { gatePosition: null, horseName: "Paint The Clouds", sp: 7.0 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Killultagh Vic",  sp:  8.0 },
          { gatePosition: null, horseName: "Roi Des Francs",  sp:  6.0 },
          { gatePosition: null, horseName: "Le Mercurey",     sp: 10.0 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Next Sensation",  sp: 17.0 },
          { gatePosition: null, horseName: "Eastlake",        sp: 17.0 },
          { gatePosition: null, horseName: "Claret Cloak",    sp:  7.0 },
        ],
      },
    ],
    leaderboard: [
      { name: "Philippa",  score: 156 },
      { name: "Liz",       score:  94 },
      { name: "Coco",      score:  80 },
    ],
  },

  // ─── 2016 – 18 March ────────────────────────────────────────────────────────
  2016: {
    date: "18 March 2016",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Ivanovich Gorbatov",  sp: null },
          { gatePosition: null, horseName: "Bapaume",             sp: null },
          { gatePosition: null, horseName: "Defi Du Seuil",       sp: null },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Superb Story",        sp: null },
          { gatePosition: null, horseName: "Aux Ptits Soins",     sp: null },
          { gatePosition: null, horseName: "My Tent Or Yours",    sp: null },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Unowhatimeanharry",   sp: null },
          { gatePosition: null, horseName: "Mall Dini",           sp: null },
          { gatePosition: null, horseName: "Yanworth",            sp: null },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Don Cossack",         sp: null },
          { gatePosition: null, horseName: "Djakadam",            sp: null },
          { gatePosition: null, horseName: "Don Poli",            sp: null },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "On The Fringe",       sp: null },
          { gatePosition: null, horseName: "Gilgamboa",           sp: null },
          { gatePosition: null, horseName: "Urgent De Gregaine",  sp: null },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Solar Impulse",       sp: null },
          { gatePosition: null, horseName: "Sizing Granite",      sp: null },
          { gatePosition: null, horseName: "Bless The Wings",     sp: null },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition: null, horseName: "Ibis Du Rheu",   sp: 15.0 },
          { gatePosition: null, horseName: "Flying Angel",   sp:  9.0 },
          { gatePosition: null, horseName: "Sky Khan",       sp: 51.0 },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2017 – 17 March ────────────────────────────────────────────────────────
  2017: {
    date: "17 March 2017",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Defi Du Seuil",       sp: null },
          { gatePosition: null, horseName: "River Wylde",         sp: null },
          { gatePosition: null, horseName: "Mega Fortune",        sp: null },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Arctic Fire",         sp: null },
          { gatePosition: null, horseName: "Clyne",               sp: null },
          { gatePosition: null, horseName: "Bravissimo",          sp: null },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Penhill",             sp: null },
          { gatePosition: null, horseName: "Monalee",             sp: null },
          { gatePosition: null, horseName: "Presenting Percy",    sp: null },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Sizing John",         sp: null },
          { gatePosition: null, horseName: "Minella Rocco",       sp: null },
          { gatePosition: null, horseName: "Native River",        sp: null },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "On The Fringe",       sp: null },
          { gatePosition: null, horseName: "Foxrock",             sp: null },
          { gatePosition: null, horseName: "Gilgamboa",           sp: null },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Ballybolley",         sp: null },
          { gatePosition: null, horseName: "Mick Jazz",           sp: null },
          { gatePosition: null, horseName: "Solar Impulse",       sp: null },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Champagne At Tara",   sp: null },
          { gatePosition: null, horseName: "Tiger Tap Tap",       sp: null },
          { gatePosition: null, horseName: "Finian's Oscar",      sp: null },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2018 – 16 March ────────────────────────────────────────────────────────
  2018: {
    date: "16 March 2018",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Farclas",             sp: null },
          { gatePosition: null, horseName: "Blow By Blow",        sp: null },
          { gatePosition: null, horseName: "A Plus Tard",         sp: null },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Mohaayed",            sp: null },
          { gatePosition: null, horseName: "Jer's Girl",          sp: null },
          { gatePosition: null, horseName: "William Henry",       sp: null },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Kilbricken Storm",    sp: null },
          { gatePosition: null, horseName: "Ballyward",           sp: null },
          { gatePosition: null, horseName: "Veneer Of Charm",     sp: null },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Native River",        sp:  6.0 },
          { gatePosition: null, horseName: "Might Bite",          sp:  5.0 },
          { gatePosition: null, horseName: "Anibale Fly",         sp: 34.0 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Pacha Du Polder",     sp: null },
          { gatePosition: null, horseName: "Urgent De Gregaine",  sp: null },
          { gatePosition: null, horseName: "Gilgamboa",           sp: null },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Ballybolley",         sp: null },
          { gatePosition: null, horseName: "Sire De Grugy",       sp: null },
          { gatePosition: null, horseName: "Beware The Bear",     sp: null },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Blow By Blow",        sp: null },
          { gatePosition: null, horseName: "Finian's Oscar",      sp: null },
          { gatePosition: null, horseName: "Lisnagar Oscar",      sp: null },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2023 – 17 March ────────────────────────────────────────────────────────
  2023: {
    date: "17 March 2023",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Lossiemouth",    sp:  2.73 },
          { gatePosition: null, horseName: "Gala Marceau",   sp:  4.33 },
          { gatePosition: null, horseName: "Zenta",          sp: 13.0  },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Faivoir",        sp: 34.0  },
          { gatePosition: null, horseName: "Pied Piper",     sp: 13.0  },
          { gatePosition: null, horseName: "Filey Bay",      sp:  7.0  },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Stay Away Fay",  sp: 19.0  },
          { gatePosition: null, horseName: "Affordale Fury", sp: 151.0 },
          { gatePosition: null, horseName: "Sandor Clegane", sp: 29.0  },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Galopin Des Champs", sp:  2.4  },
          { gatePosition: null, horseName: "Bravemansgame",      sp:  7.0  },
          { gatePosition: null, horseName: "Conflated",          sp: 23.0  },
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Premier Magic",      sp: 67.0  },
          { gatePosition: null, horseName: "Its On The Line",    sp: 29.0  },
          { gatePosition: null, horseName: "Shantou Flyer",      sp: 51.0  },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Impervious",          sp:  2.875 },
          { gatePosition: null, horseName: "Allegorie De Vassy",  sp:  2.625 },
          { gatePosition: null, horseName: "Pink Legend",         sp: 34.0   },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Iroko",          sp:  7.0  },
          { gatePosition: null, horseName: "No Ordinary Joe", sp: 15.0  },
          { gatePosition: null, horseName: "Buddy One",       sp: 29.0  },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },
  // ─── 2024 – 15 March ────────────────────────────────────────────────────────
  2024: {
    date: "15 March 2024",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Majborough",  sp:  7.0 },
          { gatePosition: null, horseName: "Kargese",     sp:  5.0 },
          { gatePosition: null, horseName: "Salver",      sp: 11.0 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Absurde",        sp: 13.0 },
          { gatePosition: null, horseName: "L'Eau Du Sud",   sp:  4.5 },
          { gatePosition: null, horseName: "Pied Piper",     sp: 15.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Stellar Story",  sp: 34.0 },
          { gatePosition: null, horseName: "Jukebox Man",    sp: 19.0 },
          { gatePosition: null, horseName: "Dancing City",   sp:  9.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Galopin Des Champs",  sp:  1.91 },
          { gatePosition: null, horseName: "Gerri Colombe",       sp:  7.5  },
          { gatePosition: null, horseName: "Corach Rambler",      sp: 15.0  },
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Sine Nomine",     sp:  9.0  },
          { gatePosition: null, horseName: "Its On The Line", sp:  2.38 },
          { gatePosition: null, horseName: "Time Leader",     sp: 51.0  },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Limerick Lace",  sp:  4.0  },
          { gatePosition: null, horseName: "Dinoblue",       sp:  2.88 },
          { gatePosition: null, horseName: "Marsh Wren",     sp: 29.0  },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Better Days Ahead",   sp:  6.0  },
          { gatePosition: null, horseName: "Waterford Whispers",  sp:  4.33 },
          { gatePosition: null, horseName: "Quai De Bourbon",     sp:  5.0  },
        ],
      },
    ],
    leaderboard: [
      { name: "Brian",  score: 151 },
      { name: "Mark",   score: 138 },
      { name: "Allan",  score: 124 },
    ],
  },

  // ─── 2025 – 14 March ────────────────────────────────────────────────────────
  2025: {
    date: "14 March 2025",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Poniros",          sp: 101.0 },
          { gatePosition: null, horseName: "Lulamba",          sp:   3.75 },
          { gatePosition: null, horseName: "East India Dock",  sp:   2.25 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Kargese",   sp:  4.0  },
          { gatePosition: null, horseName: "Ndawai",    sp: 26.0  },
          { gatePosition: null, horseName: "Absurde",   sp:  6.0  },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Dinoblue",             sp:  2.5  },
          { gatePosition: null, horseName: "Brides Hill",          sp:  5.5  },
          { gatePosition: null, horseName: "Shecouldbeanything",   sp: 13.0  },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Jasmin De Vaux",      sp:  7.0  },
          { gatePosition: null, horseName: "Big Westerner",       sp:  5.5  },
          { gatePosition: null, horseName: "Derryhassen Paddy",   sp: 11.0  },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Inothewayurthinkin",  sp:  8.5  },
          { gatePosition: null, horseName: "Galopin Des Champs",  sp:  1.62 },
          { gatePosition: null, horseName: "Gentlemansgame",      sp: 41.0  },
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Wonderwall",       sp: 29.0 },
          { gatePosition: null, horseName: "Its On The Line",  sp:  5.0 },
          { gatePosition: null, horseName: "Willitgoahead",    sp:  7.5 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Wodhooh",           sp:  5.5  },
          { gatePosition: null, horseName: "Act of Authority",  sp: 29.0  },
          { gatePosition: null, horseName: "Raglan Road",       sp: 26.0  },
        ],
      },
    ],
    leaderboard: [
      { name: "Coco",     score: 85 },
      { name: "Philippa", score: 79 },
      { name: "Dave",     score: 69 },
    ],
  },
};

// ─── Derived helpers ──────────────────────────────────────────────────────────

/**
 * spToPoints(sp)
 * Converts decimal SP to competition points.
 * A 10/1 shot has decimal 11.0 → scores 10 points (fractional equivalent).
 * Formula: points = decimal - 1
 */
export function spToPoints(sp) {
  return sp - 1;
}

/**
 * getPerfectScore(raceResult)
 * Returns the maximum possible score for a single race if you had
 * picked all three placed horses:
 *   SP points for all three + 10 (win bonus) + 25 (jackpot)
 */
export function getPerfectScore(race) {
  const spTotal = race.top3.reduce((sum, h) => sum + spToPoints(h.sp), 0);
  return spTotal + 10 + 25; // win bonus + jackpot
}

/**
 * getRaceHistory(raceName)
 * Returns an array of { year, top3, perfectScore } objects for every year
 * that race appears in the historical data. Useful for race-character analysis.
 */
export function getRaceHistory(raceName) {
  return Object.entries(historicalData).map(([year, yearData]) => {
    const race = yearData.races.find(
      (r) => r.raceName.toLowerCase() === raceName.toLowerCase()
    );
    if (!race) return null;
    if (race.top3.some(h => h.sp === null)) return null;
    return {
      year: Number(year),
      top3: race.top3,
      spTotal: race.top3.reduce((sum, h) => sum + spToPoints(h.sp), 0),
      perfectScore: getPerfectScore(race),
    };
  }).filter(Boolean);
}

/**
 * getAllYearSummaries()
 * Returns an array of per-year summary objects for the leaderboard display,
 * showing the winning score and top-3 finishers for each year.
 */
export function getAllYearSummaries() {
  return Object.entries(historicalData).map(([year, yearData]) => ({
    year: Number(year),
    date: yearData.date,
    races: yearData.races,
    leaderboard: yearData.leaderboard,
    // Maximum theoretically achievable score if all 7 jackpots and win bonuses hit
    theoreticalMax: yearData.races.reduce(
      (sum, race) => sum + getPerfectScore(race),
      0
    ),
  }));
}
