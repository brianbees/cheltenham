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
          { gatePosition: 15, horseName: "Soldatino",              sp:  7.0  },
          { gatePosition:  3, horseName: "Barizan",                sp: 15.0  },
          { gatePosition:  2, horseName: "Alaivan",                sp:  5.5  },
        ],
        field: [
          // NR: Bob's Legend (IRE), Secant Star (FR)
          { gatePosition:  1, horseName: "Advisor",                sp:  9.0,  finishPosition: 11 },
          { gatePosition:  2, horseName: "Alaivan",                sp:  5.5,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Barizan",                sp: 15.0,  finishPosition:  2 },
          { gatePosition:  4, horseName: "Barwell Bridge",         sp: 17.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Blazing Buck",           sp: 101.0, finishPosition:  7 },
          { gatePosition:  7, horseName: "Carlito Brigante",       sp:  4.5,  finishPosition:  4 }, // 7/2 FAV
          { gatePosition:  8, horseName: "Gilded Age",             sp: 29.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Investissement",         sp: 67.0,  finishPosition: null },
          { gatePosition: 10, horseName: "Olofi",                  sp: 11.0,  finishPosition:  9 },
          { gatePosition: 11, horseName: "Pittoni",                sp: 10.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "Puzzlemaster",           sp: 151.0, finishPosition:  8 },
          { gatePosition: 13, horseName: "Rupestrian",             sp: 41.0,  finishPosition: null },
          { gatePosition: 15, horseName: "Soldatino",              sp:  7.0,  finishPosition:  1 },
          { gatePosition: 16, horseName: "Troubletimestwo",        sp: 101.0, finishPosition: 12 },
          { gatePosition: 17, horseName: "Westlin' Winds",         sp: 11.0,  finishPosition: 14 },
          { gatePosition: 18, horseName: "Blue Nymph",             sp: 51.0,  finishPosition: 13 },
          { gatePosition: 19, horseName: "Pebble In A Pool",       sp: 201.0, finishPosition: null },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 28,
        top3: [
          { gatePosition: 15, horseName: "Thousand Stars",         sp: 21.0  },
          { gatePosition: 23, horseName: "Arcalis",                sp: 34.0  },
          { gatePosition: 13, horseName: "Dee Ee Williams",        sp: 21.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Rock Noir",              sp: 10.0,  finishPosition: 21 },
          { gatePosition:  2, horseName: "Marodima",               sp: 41.0,  finishPosition: 19 },
          { gatePosition:  3, horseName: "Bahrain Storm",          sp: 34.0,  finishPosition: 18 },
          { gatePosition:  4, horseName: "Noble Prince",           sp: 12.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Bellvano",               sp: 12.0,  finishPosition: 17 },
          { gatePosition:  6, horseName: "Puyol",                  sp: 17.0,  finishPosition: 20 },
          { gatePosition:  7, horseName: "Songe",                  sp: 51.0,  finishPosition: 10 },
          { gatePosition:  8, horseName: "Mutual Friend",          sp: 41.0,  finishPosition: 16 },
          { gatePosition:  9, horseName: "Tawaagg",                sp: 13.0,  finishPosition: 24 },
          { gatePosition: 10, horseName: "Any Given Day",          sp: 15.0,  finishPosition: 14 },
          { gatePosition: 11, horseName: "Eradicate",              sp: 17.0,  finishPosition: 22 },
          { gatePosition: 12, horseName: "Tito Bustillo",          sp:  8.0,  finishPosition: 23 }, // 7/1 FAV
          { gatePosition: 13, horseName: "Dee Ee Williams",        sp: 21.0,  finishPosition:  3 },
          { gatePosition: 14, horseName: "Secret Dancer",          sp: 26.0,  finishPosition:  7 },
          { gatePosition: 15, horseName: "Thousand Stars",         sp: 21.0,  finishPosition:  1 },
          { gatePosition: 16, horseName: "Keki Buku",              sp: 34.0,  finishPosition:  8 },
          { gatePosition: 17, horseName: "European Dream",         sp: 51.0,  finishPosition: 26 },
          { gatePosition: 18, horseName: "Inventor",               sp: 26.0,  finishPosition:  9 },
          { gatePosition: 19, horseName: "Zanir",                  sp: 51.0,  finishPosition:  4 },
          { gatePosition: 20, horseName: "Santa's Son",            sp: 101.0, finishPosition: 25 },
          { gatePosition: 21, horseName: "Izita Star",             sp: 101.0, finishPosition: null },
          { gatePosition: 22, horseName: "Fushe Jo",               sp: 101.0, finishPosition: 15 },
          { gatePosition: 23, horseName: "Arcalis",                sp: 34.0,  finishPosition:  2 },
          { gatePosition: 24, horseName: "Gloucester",             sp: 51.0,  finishPosition:  6 },
          { gatePosition: 25, horseName: "Stradbrook",             sp: 34.0,  finishPosition: null },
          { gatePosition: 26, horseName: "Oldrik",                 sp:  9.0,  finishPosition: 13 },
          { gatePosition: 27, horseName: "Pascha Bere",            sp: 34.0,  finishPosition: 12 },
          { gatePosition: 28, horseName: "Tarkari",                sp: 15.0,  finishPosition: 11 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 19,
        top3: [
          { gatePosition:  2, horseName: "Berties Dream",          sp: 34.0  },
          { gatePosition:  9, horseName: "Najaf",                  sp: 26.0  },
          { gatePosition:  8, horseName: "Kennel Hill",            sp: 67.0  },
        ],
        field: [
          // NR: Wayward Prince (vet's certificate)
          { gatePosition:  1, horseName: "Arvika Ligeonniere",     sp: 29.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Berties Dream",          sp: 34.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Bostons Angel",          sp: 51.0,  finishPosition: null },
          { gatePosition:  4, horseName: "Cappa Bleu",             sp: 19.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Chartreux",              sp: 29.0,  finishPosition:  9 },
          { gatePosition:  6, horseName: "Enterprise Park",        sp: 12.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Fionnegas",              sp: 17.0,  finishPosition: null },
          { gatePosition:  8, horseName: "Kennel Hill",            sp: 67.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Najaf",                  sp: 26.0,  finishPosition:  2 },
          { gatePosition: 10, horseName: "Possol",                 sp: 29.0,  finishPosition:  5 },
          { gatePosition: 11, horseName: "Quel Esprit",            sp:  6.5,  finishPosition:  6 }, // 11/2
          { gatePosition: 12, horseName: "Restless Harry",         sp:  9.0,  finishPosition: null },
          { gatePosition: 13, horseName: "Shinrock Paddy",         sp:  9.0,  finishPosition: null },
          { gatePosition: 14, horseName: "Tell Massini",           sp:  4.33, finishPosition: null }, // 100/30 FAV
          { gatePosition: 15, horseName: "The Betchworth Kid",     sp: 17.0,  finishPosition: null },
          { gatePosition: 16, horseName: "The Hurl",               sp: 26.0,  finishPosition: null },
          { gatePosition: 17, horseName: "Watamu Bay",             sp: 67.0,  finishPosition: 10 },
          { gatePosition: 19, horseName: "Premier Victory",        sp: 34.0,  finishPosition:  8 },
          { gatePosition: 20, horseName: "Silver Kate",            sp: 15.0,  finishPosition:  7 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 11,
        top3: [
          { gatePosition:  6, horseName: "Imperial Commander",     sp:  8.0  },
          { gatePosition:  5, horseName: "Denman",                 sp:  5.0  },
          { gatePosition:  8, horseName: "Mon Mome",               sp: 51.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Calgary Bay",            sp: 51.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Carruthers",             sp: 34.0,  finishPosition:  4 },
          { gatePosition:  3, horseName: "Cerium",                 sp: 201.0, finishPosition:  8 },
          { gatePosition:  4, horseName: "Cooldine",               sp: 11.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Denman",                 sp:  5.0,  finishPosition:  2 },
          { gatePosition:  6, horseName: "Imperial Commander",     sp:  8.0,  finishPosition:  1 },
          { gatePosition:  7, horseName: "Kauto Star",             sp:  1.73, finishPosition: null }, // 8/11 FAV — F
          { gatePosition:  8, horseName: "Mon Mome",               sp: 51.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Mr Pointment",           sp: 251.0, finishPosition: 10 },
          { gatePosition: 10, horseName: "My Will",                sp: 81.0,  finishPosition:  7 },
          { gatePosition: 11, horseName: "Tricky Trickster",       sp: 13.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 24,
        top3: [
          { gatePosition:  2, horseName: "Baby Run",               sp:  5.5  },
          { gatePosition: 12, horseName: "Kilty Storm",            sp: 17.0  },
          { gatePosition: 16, horseName: "Reach For The Top",      sp: 67.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Amicelli",               sp: 26.0,  finishPosition: null },
          { gatePosition:  2, horseName: "Baby Run",               sp:  5.5,  finishPosition:  1 }, // 9/2 JT FAV
          { gatePosition:  3, horseName: "Bob Hall",               sp: 26.0,  finishPosition: null },
          { gatePosition:  4, horseName: "Burntoakboy",            sp: 51.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Cowboyboots",            sp: 34.0,  finishPosition: 12 },
          { gatePosition:  6, horseName: "Drybrook Bedouin",       sp: 26.0,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Dun Doire",              sp: 13.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "Dusty Doolan",           sp: 81.0,  finishPosition: 15 },
          { gatePosition:  9, horseName: "Gentle George I",        sp: 11.0,  finishPosition:  4 },
          { gatePosition: 10, horseName: "Here's Johnny",          sp: 34.0,  finishPosition: null },
          { gatePosition: 11, horseName: "James Pine",             sp: 201.0, finishPosition: 14 },
          { gatePosition: 12, horseName: "Kilty Storm",            sp: 17.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Le Duc I",               sp: 41.0,  finishPosition: null },
          { gatePosition: 14, horseName: "Man From Highworth",     sp: 151.0, finishPosition: 13 },
          { gatePosition: 15, horseName: "On The Net",             sp: 34.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Reach For The Top",      sp: 67.0,  finishPosition:  3 },
          { gatePosition: 17, horseName: "Robbers Glen",           sp: 21.0,  finishPosition:  6 },
          { gatePosition: 18, horseName: "Roulez Cool",            sp:  5.5,  finishPosition: null }, // 9/2 JT FAV — BD
          { gatePosition: 19, horseName: "Southwestern",           sp: 21.0,  finishPosition: null },
          { gatePosition: 20, horseName: "Take The Stand",         sp: 67.0,  finishPosition: null },
          { gatePosition: 21, horseName: "Trust Fund",             sp:  8.5,  finishPosition: 10 }, // 15/2
          { gatePosition: 22, horseName: "Turthen",                sp: 11.0,  finishPosition:  8 },
          { gatePosition: 23, horseName: "Chesnut Annie",          sp: 23.0,  finishPosition: null },
          { gatePosition: 24, horseName: "Sericina",               sp: 17.0,  finishPosition: null },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition:  3, horseName: "Pause And Clause",       sp: 15.0  },
          { gatePosition: 17, horseName: "Radium",                 sp: 15.0  },
          { gatePosition: 21, horseName: "Clova Island",           sp: 15.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Sarando",                sp: 41.0,  finishPosition: 12 },
          { gatePosition:  2, horseName: "Peveril",                sp:  6.0,  finishPosition:  4 },
          { gatePosition:  3, horseName: "Pause And Clause",       sp: 15.0,  finishPosition:  1 },
          { gatePosition:  4, horseName: "Ashkazar",               sp:  5.5,  finishPosition:  7 }, // 9/2 FAV
          { gatePosition:  5, horseName: "Saticon",                sp: 34.0,  finishPosition:  9 },
          { gatePosition:  6, horseName: "Lord Generous",          sp: 17.0,  finishPosition:  5 },
          { gatePosition:  7, horseName: "Simarian",               sp: 51.0,  finishPosition: 14 },
          { gatePosition:  8, horseName: "On Borrowed Wings",      sp: 26.0,  finishPosition:  8 },
          { gatePosition:  9, horseName: "Earth Magic",            sp: 81.0,  finishPosition: 19 },
          { gatePosition: 10, horseName: "Dansimar",               sp: 34.0,  finishPosition: 17 },
          { gatePosition: 11, horseName: "Larkwing",               sp: 51.0,  finishPosition: 20 },
          { gatePosition: 12, horseName: "Fairyland",              sp: 17.0,  finishPosition: null },
          { gatePosition: 13, horseName: "Shore Thing",            sp: 101.0, finishPosition: null },
          { gatePosition: 14, horseName: "Born Again",             sp: 21.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "C'Est Ca",               sp: 12.0,  finishPosition: null },
          { gatePosition: 16, horseName: "Balthazar King",         sp: 11.0,  finishPosition: null },
          { gatePosition: 17, horseName: "Radium",                 sp: 15.0,  finishPosition:  2 },
          { gatePosition: 18, horseName: "Always Bold",            sp: 41.0,  finishPosition: 10 },
          { gatePosition: 19, horseName: "Balzaccio",              sp: 34.0,  finishPosition: 16 },
          { gatePosition: 20, horseName: "Mahonia",                sp: 34.0,  finishPosition: 15 },
          { gatePosition: 21, horseName: "Clova Island",           sp: 15.0,  finishPosition:  3 },
          { gatePosition: 22, horseName: "Quentin Collonges",      sp: 17.0,  finishPosition:  6 },
          { gatePosition: 23, horseName: "Meath All Star",         sp: 13.0,  finishPosition: 11 },
          { gatePosition: 24, horseName: "Love Of Tara",           sp: 34.0,  finishPosition: 18 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 19,
        top3: [
          { gatePosition: 24, horseName: "Pigeon Island",          sp: 17.0  },
          { gatePosition:  1, horseName: "French Opera",           sp: 11.0  },
          { gatePosition:  7, horseName: "Consigliere",            sp: 17.0  },
        ],
        field: [
          // NR: Lord Henry, Leo's Lucky Star, Sunnyhillboy, Tataniano, Green Belt Elite
          { gatePosition:  1, horseName: "French Opera",           sp: 11.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "Free World",             sp:  8.0,  finishPosition: 10 },
          { gatePosition:  3, horseName: "Cornas",                 sp: 17.0,  finishPosition:  4 },
          { gatePosition:  4, horseName: "Tartak",                 sp: 13.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Oiseau De Nuit",         sp:  9.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Consigliere",            sp: 17.0,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Lennon",                 sp: 21.0,  finishPosition:  9 },
          { gatePosition: 11, horseName: "Nomecheki",              sp: 21.0,  finishPosition:  8 },
          { gatePosition: 12, horseName: "Moon Over Miami",        sp: 21.0,  finishPosition: null },
          { gatePosition: 13, horseName: "You're The Top",         sp:  7.5,  finishPosition: null }, // 13/2 FAV
          { gatePosition: 14, horseName: "Pepsyrock",              sp: 17.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Tramantano",             sp: 34.0,  finishPosition: null },
          { gatePosition: 16, horseName: "Beggars Cap",            sp: 17.0,  finishPosition: null },
          { gatePosition: 19, horseName: "Nikola",                 sp: 29.0,  finishPosition:  7 },
          { gatePosition: 20, horseName: "Safari Journey",         sp: 13.0,  finishPosition:  6 },
          { gatePosition: 21, horseName: "Russian Flag",           sp: 26.0,  finishPosition: null },
          { gatePosition: 22, horseName: "Calatagan",              sp: 51.0,  finishPosition: 12 },
          { gatePosition: 23, horseName: "Fighting Chance",        sp: 11.0,  finishPosition: null },
          { gatePosition: 24, horseName: "Pigeon Island",          sp: 17.0,  finishPosition:  1 },
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
        fieldSize: 15,
        top3: [
          { gatePosition: 15, horseName: "Tiger Roll",             sp: 11.0  },
          { gatePosition:  9, horseName: "Kentucky Hyden",         sp: 21.0  },
          { gatePosition:  8, horseName: "Guitar Pete",            sp:  8.0  },
        ],
        field: [
          // NR: Ballyglasheen (cloth 4)
          { gatePosition:  1, horseName: "Abbyssial",              sp:  9.0,  finishPosition: null }, // F
          { gatePosition:  2, horseName: "Achtung",                sp: 251.0, finishPosition: 11 },
          { gatePosition:  3, horseName: "Amoruccio",              sp: 151.0, finishPosition: 10 },
          { gatePosition:  5, horseName: "Broughton",              sp:  7.5,  finishPosition:  8 }, // 13/2
          { gatePosition:  6, horseName: "Calipto",                sp:  6.5,  finishPosition:  4 }, // 11/2F
          { gatePosition:  7, horseName: "Cherry Tiger",           sp: 251.0, finishPosition: null }, // REF
          { gatePosition:  8, horseName: "Guitar Pete",            sp:  8.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Kentucky Hyden",         sp: 21.0,  finishPosition:  2 },
          { gatePosition: 10, horseName: "Lindenhurst",            sp: 17.0,  finishPosition:  9 },
          { gatePosition: 11, horseName: "Pearl Castle",           sp: 13.0,  finishPosition:  7 },
          { gatePosition: 12, horseName: "Plinth",                 sp: 13.0,  finishPosition: 12 },
          { gatePosition: 13, horseName: "Royal Irish Hussar",     sp:  7.0,  finishPosition:  6 },
          { gatePosition: 14, horseName: "Rutherglen",             sp: 11.0,  finishPosition:  5 },
          { gatePosition: 15, horseName: "Tiger Roll",             sp: 11.0,  finishPosition:  1 },
          { gatePosition: 16, horseName: "Adriana Des Mottes",     sp: 21.0,  finishPosition: null }, // BD
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 28,
        top3: [
          { gatePosition: 11, horseName: "Lac Fontana",            sp: 12.0  },
          { gatePosition:  7, horseName: "Arctic Fire",            sp:  8.0  },
          { gatePosition:  8, horseName: "Montbazon",              sp: 21.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Diakali",                sp: 26.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Flaxen Flare",           sp: 21.0,  finishPosition:  5 },
          { gatePosition:  3, horseName: "Cinders And Ashes",      sp: 29.0,  finishPosition: null },
          { gatePosition:  4, horseName: "Runswick Royal",         sp: 34.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Upazo",                  sp: 34.0,  finishPosition: 22 },
          { gatePosition:  6, horseName: "Never Enough Time",      sp: 10.0,  finishPosition: 24 },
          { gatePosition:  7, horseName: "Arctic Fire",            sp:  8.0,  finishPosition:  2 },
          { gatePosition:  8, horseName: "Montbazon",              sp: 21.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Lyvius",                 sp: 21.0,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Minella Foru",           sp: 13.0,  finishPosition:  6 },
          { gatePosition: 11, horseName: "Lac Fontana",            sp: 12.0,  finishPosition:  1 },
          { gatePosition: 12, horseName: "Deep Trouble",           sp: 34.0,  finishPosition:  7 },
          { gatePosition: 13, horseName: "Rainbow Peak",           sp: 26.0,  finishPosition: 12 },
          { gatePosition: 14, horseName: "Thomas Edison",          sp: 21.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Cash And Go",            sp: 26.0,  finishPosition: 11 },
          { gatePosition: 16, horseName: "Strongpoint",            sp: 34.0,  finishPosition: 19 },
          { gatePosition: 17, horseName: "Dunraven Storm",         sp: 34.0,  finishPosition: 14 },
          { gatePosition: 18, horseName: "Cheltenian",             sp:  6.0,  finishPosition: null }, // 5/1F PU
          { gatePosition: 19, horseName: "Makari",                 sp: 34.0,  finishPosition: 17 },
          { gatePosition: 20, horseName: "Master Of The Game",     sp: 34.0,  finishPosition: 25 },
          { gatePosition: 21, horseName: "Barizan",                sp: 51.0,  finishPosition: 10 },
          { gatePosition: 22, horseName: "Jumps Road",             sp: 67.0,  finishPosition: 16 },
          { gatePosition: 23, horseName: "Morning Royalty",        sp: 67.0,  finishPosition: 15 },
          { gatePosition: 24, horseName: "Tzora",                  sp: 34.0,  finishPosition: 21 },
          { gatePosition: 25, horseName: "Citizenship",            sp: 67.0,  finishPosition: 23 },
          { gatePosition: 26, horseName: "Lough Kent",             sp: 51.0,  finishPosition: 20 },
          { gatePosition: 27, horseName: "Anay Turge",             sp: 34.0,  finishPosition: 18 },
          { gatePosition: 28, horseName: "Alaivan",                sp: 11.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 18,
        top3: [
          { gatePosition: 20, horseName: "Very Wood",              sp: 34.0  },
          { gatePosition:  7, horseName: "Deputy Dan",             sp: 11.0  },
          { gatePosition:  1, horseName: "Apache Jack",            sp: 21.0  },
        ],
        field: [
          // NR: Blakemount (cloth 2), Port Melon (cloth 12)
          { gatePosition:  1, horseName: "Apache Jack",            sp: 21.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Briar Hill",             sp:  3.0,  finishPosition: null }, // 2/1F F
          { gatePosition:  4, horseName: "Captain Cutter",         sp:  8.0,  finishPosition: null }, // PU
          { gatePosition:  5, horseName: "Champagne West",         sp: 15.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Cogry",                  sp: 67.0,  finishPosition:  8 },
          { gatePosition:  7, horseName: "Deputy Dan",             sp: 11.0,  finishPosition:  2 },
          { gatePosition:  8, horseName: "Kings Palace",           sp:  3.5,  finishPosition: null }, // 5/2 F
          { gatePosition:  9, horseName: "Madness Light",          sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Masters Hill",           sp: 67.0,  finishPosition:  5 },
          { gatePosition: 11, horseName: "Mosspark",               sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Prince Siegfried",       sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Regal Diamond",          sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 15, horseName: "Rydon Pynes",            sp: 67.0,  finishPosition: null }, // F
          { gatePosition: 16, horseName: "Saint Roque",            sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Sausalito Sunrise",      sp: 51.0,  finishPosition:  6 },
          { gatePosition: 18, horseName: "The Job Is Right",       sp: 81.0,  finishPosition: null }, // PU
          { gatePosition: 19, horseName: "Urban Hymn",             sp: 15.0,  finishPosition:  7 },
          { gatePosition: 20, horseName: "Very Wood",              sp: 34.0,  finishPosition:  1 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 13,
        top3: [
          { gatePosition:  8, horseName: "Lord Windermere",        sp: 21.0  },
          { gatePosition: 10, horseName: "On His Own",             sp: 17.0  },
          { gatePosition: 13, horseName: "The Giant Bolster",      sp: 15.0  },
        ],
        field: [
          // NR: First Lieutenant (cloth 3)
          { gatePosition:  1, horseName: "Bobs Worth",             sp:  2.5,  finishPosition:  5 }, // 6/4F
          { gatePosition:  2, horseName: "Cloudy Too",             sp: 51.0,  finishPosition: null }, // UR
          { gatePosition:  4, horseName: "Houblon Des Obeaux",     sp: 51.0,  finishPosition:  9 },
          { gatePosition:  5, horseName: "Katenko",                sp: 67.0,  finishPosition: 11 },
          { gatePosition:  6, horseName: "Knockara Beau",          sp: 67.0,  finishPosition:  7 },
          { gatePosition:  7, horseName: "Last Instalment",        sp:  8.5,  finishPosition: null }, // 15/2 UR
          { gatePosition:  8, horseName: "Lord Windermere",        sp: 21.0,  finishPosition:  1 },
          { gatePosition:  9, horseName: "Lyreen Legend",          sp: 34.0,  finishPosition:  6 },
          { gatePosition: 10, horseName: "On His Own",             sp: 17.0,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Silviniaco Conti",       sp:  3.75, finishPosition:  4 }, // 11/4
          { gatePosition: 12, horseName: "Teaforthree",            sp: 34.0,  finishPosition:  8 },
          { gatePosition: 13, horseName: "The Giant Bolster",      sp: 15.0,  finishPosition:  3 },
          { gatePosition: 14, horseName: "Triolo D'Alene",         sp: 11.0,  finishPosition: 10 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 24,
        top3: [
          { gatePosition: 21, horseName: "Tammys Hill",            sp:  8.5  },
          { gatePosition:  3, horseName: "Carsonstown Boy",        sp: 41.0  },
          { gatePosition: 16, horseName: "On The Fringe",          sp:  6.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Berties Dream",          sp: 11.0,  finishPosition: 12 },
          { gatePosition:  2, horseName: "Boxing Along",           sp: 101.0, finishPosition:  9 },
          { gatePosition:  3, horseName: "Carsonstown Boy",        sp: 41.0,  finishPosition:  2 },
          { gatePosition:  4, horseName: "Certain Flight",         sp: 21.0,  finishPosition: 13 },
          { gatePosition:  5, horseName: "Croan Rock",             sp: 101.0, finishPosition: null },
          { gatePosition:  6, horseName: "Divine Intavention",     sp: 10.0,  finishPosition: null }, // UR
          { gatePosition:  7, horseName: "Doctor Kingsley",        sp: 29.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "Double Bank",            sp: 67.0,  finishPosition: null }, // UR
          { gatePosition:  9, horseName: "Foundry Square",         sp: 51.0,  finishPosition: null },
          { gatePosition: 10, horseName: "Gale Force Oscar",       sp: 151.0, finishPosition: null },
          { gatePosition: 11, horseName: "Ganbei",                 sp: 67.0,  finishPosition: null }, // F
          { gatePosition: 12, horseName: "Harbour Court",          sp:  6.0,  finishPosition:  5 }, // 5/1F
          { gatePosition: 13, horseName: "Made In Time",           sp: 15.0,  finishPosition: null }, // F
          { gatePosition: 14, horseName: "Minella Stars",          sp: 67.0,  finishPosition:  6 },
          { gatePosition: 15, horseName: "Ockey De Neulliac",      sp: 67.0,  finishPosition: null }, // UR
          { gatePosition: 16, horseName: "On The Fringe",          sp:  6.5,  finishPosition:  3 }, // 11/2
          { gatePosition: 17, horseName: "Oscar Delta",            sp:  6.5,  finishPosition: 10 }, // 11/2
          { gatePosition: 18, horseName: "Pearlysteps",            sp:  9.0,  finishPosition:  4 },
          { gatePosition: 19, horseName: "Ravethebrave",           sp: 101.0, finishPosition: null },
          { gatePosition: 20, horseName: "Shy John",               sp: 26.0,  finishPosition:  8 },
          { gatePosition: 21, horseName: "Tammys Hill",            sp:  8.5,  finishPosition:  1 }, // 15/2
          { gatePosition: 22, horseName: "That's Rhythm",          sp: 26.0,  finishPosition: null },
          { gatePosition: 23, horseName: "The Hollinwell",         sp: 51.0,  finishPosition: 14 },
          { gatePosition: 24, horseName: "Lucette Annie",          sp: 151.0, finishPosition: 11 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition:  3, horseName: "Don Poli",               sp: 13.0  },
          { gatePosition: 20, horseName: "Thomas Crapper",         sp: 11.0  },
          { gatePosition:  4, horseName: "Caid Du Berlais",        sp: 10.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Virak",                  sp: 26.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Rum And Butter",         sp: 21.0,  finishPosition: 23 },
          { gatePosition:  3, horseName: "Don Poli",               sp: 13.0,  finishPosition:  1 },
          { gatePosition:  4, horseName: "Caid Du Berlais",        sp: 10.0,  finishPosition:  3 },
          { gatePosition:  5, horseName: "Local Hero",             sp: 34.0,  finishPosition:  7 },
          { gatePosition:  6, horseName: "Une Artiste",            sp: 17.0,  finishPosition:  8 },
          { gatePosition:  7, horseName: "Carlito Brigante",       sp: 41.0,  finishPosition: 18 },
          { gatePosition:  8, horseName: "Ruacana",                sp: 51.0,  finishPosition: 12 },
          { gatePosition:  9, horseName: "The Skyfarmer",          sp: 11.0,  finishPosition: 16 },
          { gatePosition: 10, horseName: "Vieux Lion Rouge",       sp:  6.0,  finishPosition: 21 },
          { gatePosition: 11, horseName: "Dolatulo",               sp: 41.0,  finishPosition: 20 },
          { gatePosition: 12, horseName: "Princely Player",        sp: 34.0,  finishPosition:  9 },
          { gatePosition: 13, horseName: "Shantou Magic",          sp: 34.0,  finishPosition: 14 },
          { gatePosition: 14, horseName: "Junction Fourteen",      sp: 21.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Hazy Tom",               sp: 67.0,  finishPosition: 19 },
          { gatePosition: 16, horseName: "Full Shift",             sp:  5.5,  finishPosition: 11 }, // 9/2F
          { gatePosition: 17, horseName: "Leo Luna",               sp: 17.0,  finishPosition: 15 },
          { gatePosition: 18, horseName: "Open Day",               sp: 34.0,  finishPosition: null },
          { gatePosition: 19, horseName: "Urbain De Sivola",       sp: 34.0,  finishPosition:  4 },
          { gatePosition: 20, horseName: "Thomas Crapper",         sp: 11.0,  finishPosition:  2 },
          { gatePosition: 21, horseName: "The Disengager",         sp: 67.0,  finishPosition: 22 },
          { gatePosition: 22, horseName: "Art Professor",          sp: 34.0,  finishPosition: 17 },
          { gatePosition: 23, horseName: "Royal Regatta",          sp: 13.0,  finishPosition: 10 },
          { gatePosition: 24, horseName: "One Lucky Lady",         sp: 34.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 23,
        top3: [
          { gatePosition:  6, horseName: "Savello",                sp: 17.0  },
          { gatePosition: 21, horseName: "Ned Buntline",           sp:  7.0  },
          { gatePosition: 13, horseName: "Claret Cloak",           sp:  7.0  },
        ],
        field: [
          // NR: Oscar Hill (cloth 14; withdrawn, bolted on way to start)
          { gatePosition:  1, horseName: "French Opera",           sp: 34.0,  finishPosition:  5 },
          { gatePosition:  2, horseName: "Oiseau De Nuit",         sp: 29.0,  finishPosition: null }, // F
          { gatePosition:  3, horseName: "Raya Star",              sp:  8.0,  finishPosition: null }, // F fatally injured
          { gatePosition:  4, horseName: "Easter Meteor",          sp: 26.0,  finishPosition: null }, // BD
          { gatePosition:  5, horseName: "Mr Mole",                sp:  8.0,  finishPosition: null }, // F
          { gatePosition:  6, horseName: "Savello",                sp: 17.0,  finishPosition:  1 },
          { gatePosition:  7, horseName: "Eastlake",               sp: 21.0,  finishPosition:  6 },
          { gatePosition:  8, horseName: "Drumshambo",             sp: 41.0,  finishPosition: 13 },
          { gatePosition:  9, horseName: "Viva Colonia",           sp: 41.0,  finishPosition: 11 },
          { gatePosition: 10, horseName: "Tanks For That",         sp: 13.0,  finishPosition:  9 },
          { gatePosition: 11, horseName: "Astracad",               sp: 23.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Next Sensation",         sp:  8.0,  finishPosition:  4 },
          { gatePosition: 13, horseName: "Claret Cloak",           sp:  7.0,  finishPosition:  3 }, // 6/1J
          { gatePosition: 15, horseName: "His Excellency",         sp: 15.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "Dare Me",                sp: 15.0,  finishPosition:  7 },
          { gatePosition: 17, horseName: "Lancetto",               sp: 51.0,  finishPosition: 15 },
          { gatePosition: 18, horseName: "Competitive Edge",       sp: 41.0,  finishPosition: null }, // F
          { gatePosition: 19, horseName: "Anquetta",               sp: 51.0,  finishPosition: 10 },
          { gatePosition: 20, horseName: "Passage Vendome",        sp: 34.0,  finishPosition: null }, // F
          { gatePosition: 21, horseName: "Ned Buntline",           sp:  7.0,  finishPosition:  2 }, // 6/1J
          { gatePosition: 22, horseName: "Changing The Guard",     sp: 26.0,  finishPosition: 12 },
          { gatePosition: 23, horseName: "Shooters Wood",          sp: 41.0,  finishPosition: 16 },
          { gatePosition: 24, horseName: "Lucky Landing",          sp: 67.0,  finishPosition:  8 },
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
        fieldSize: 16,
        top3: [
          { gatePosition:  5, horseName: "Peace And Co",            sp:  3.0  },
          { gatePosition:  2, horseName: "Top Notch",               sp:  8.0  },
          { gatePosition:  7, horseName: "Hargam",                  sp:  9.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Charli Parcs",            sp: 21.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Top Notch",               sp:  8.0,  finishPosition:  2 },
          { gatePosition:  3, horseName: "Shaneshill",              sp: 15.0,  finishPosition:  4 },
          { gatePosition:  4, horseName: "Dicosimo",                sp: 13.0,  finishPosition: 12 },
          { gatePosition:  5, horseName: "Peace And Co",            sp:  3.0,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Mohaayed",                sp: 34.0,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Hargam",                  sp:  9.0,  finishPosition:  3 },
          { gatePosition:  8, horseName: "Simenon",                 sp: 51.0,  finishPosition: 14 },
          { gatePosition:  9, horseName: "Wonderful Charm",         sp: 15.0,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Landofhopeandglory",      sp: 67.0,  finishPosition: 13 },
          { gatePosition: 11, horseName: "Ptit Zig",                sp: 13.0,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Zubayr",                  sp: 34.0,  finishPosition: 11 },
          { gatePosition: 13, horseName: "Bold Henry",              sp: 101.0, finishPosition: 15 },
          { gatePosition: 14, horseName: "Bel Ami De Sivola",       sp: 34.0,  finishPosition: 10 },
          { gatePosition: 15, horseName: "The Tullow Tank",         sp: 41.0,  finishPosition:  7 },
          { gatePosition: 16, horseName: "Petite Parisienne",       sp: 12.0,  finishPosition: 16 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 26,
        top3: [
          { gatePosition: 16, horseName: "Wicklow Brave",           sp: 26.0  },
          { gatePosition: 25, horseName: "Sort It Out",             sp:  9.5  },
          { gatePosition: 21, horseName: "Quick Jack",              sp:  9.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Cause Of Causes",         sp: 26.0,  finishPosition: 26 },
          { gatePosition:  2, horseName: "Cheltenian",              sp: 13.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Sempre Medici",           sp: 34.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Analifet",                sp: 34.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Arctic Skipper",          sp: 51.0,  finishPosition: 17 },
          { gatePosition:  6, horseName: "Cloudy Too",              sp: 21.0,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Voix Du Reve",            sp: 34.0,  finishPosition: 20 },
          { gatePosition:  8, horseName: "Taquin Du Seuil",         sp:  9.0,  finishPosition: 12 },
          { gatePosition:  9, horseName: "Whisper",                 sp: 17.0,  finishPosition: 23 },
          { gatePosition: 10, horseName: "The Game Changer",        sp: 11.0,  finishPosition: 15 },
          { gatePosition: 11, horseName: "Nichols Canyon",          sp: 15.0,  finishPosition: 16 },
          { gatePosition: 12, horseName: "Jezki",                   sp:  9.0,  finishPosition: 24 },
          { gatePosition: 13, horseName: "Kayf Grace",              sp: 67.0,  finishPosition: 19 },
          { gatePosition: 14, horseName: "High Expectation",        sp: 67.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Whiteout",                sp: 101.0, finishPosition: 21 },
          { gatePosition: 16, horseName: "Wicklow Brave",           sp: 26.0,  finishPosition:  1 },
          { gatePosition: 17, horseName: "Baltimore Rock",          sp: 13.0,  finishPosition:  7 },
          { gatePosition: 18, horseName: "Max Dynamite",            sp: 15.0,  finishPosition:  4 },
          { gatePosition: 19, horseName: "More Of That",            sp: 13.0,  finishPosition: 25 },
          { gatePosition: 20, horseName: "Ballycasey",              sp: 51.0,  finishPosition: 22 },
          { gatePosition: 21, horseName: "Quick Jack",              sp:  9.0,  finishPosition:  3 },
          { gatePosition: 22, horseName: "Clyne",                   sp: 12.0,  finishPosition: 10 },
          { gatePosition: 23, horseName: "Rich Coast",              sp: 21.0,  finishPosition: 18 },
          { gatePosition: 24, horseName: "Faugheen's Sister",       sp: 101.0, finishPosition: 14 },
          { gatePosition: 25, horseName: "Sort It Out",             sp:  9.5,  finishPosition:  2 },
          { gatePosition: 26, horseName: "Irving",                  sp:  4.5,  finishPosition: 11 }, // 7/2F
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 15,
        top3: [
          { gatePosition:  5, horseName: "Martello Tower",          sp: 15.0  },
          { gatePosition: 14, horseName: "Milsean",                 sp: 34.0  },
          { gatePosition:  7, horseName: "No More Heroes",          sp:  7.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ballycasey",              sp: 34.0,  finishPosition: 14 },
          { gatePosition:  2, horseName: "Value At Risk",           sp: 11.0,  finishPosition:  5 },
          { gatePosition:  3, horseName: "Gitano Hernando",         sp: 17.0,  finishPosition:  8 },
          { gatePosition:  4, horseName: "Shaneshill",              sp: 15.0,  finishPosition:  4 },
          { gatePosition:  5, horseName: "Martello Tower",          sp: 15.0,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Roi Des Francs",          sp: 15.0,  finishPosition:  7 },
          { gatePosition:  7, horseName: "No More Heroes",          sp:  7.0,  finishPosition:  3 },
          { gatePosition:  8, horseName: "Wonderful Charm",         sp: 51.0,  finishPosition: 13 },
          { gatePosition:  9, horseName: "Killultagh Vic",          sp:  8.0,  finishPosition:  6 },
          { gatePosition: 10, horseName: "Starchitect",             sp: 34.0,  finishPosition: 11 },
          { gatePosition: 11, horseName: "Balbir Du Mathan",        sp: 41.0,  finishPosition:  9 },
          { gatePosition: 12, horseName: "Lord Windermere",         sp: 11.0,  finishPosition: 10 },
          { gatePosition: 13, horseName: "Don Poli",                sp:  2.5,  finishPosition: 12 }, // 6/4F
          { gatePosition: 14, horseName: "Milsean",                 sp: 34.0,  finishPosition:  2 },
          { gatePosition: 15, horseName: "Road To Riches",          sp: 11.0,  finishPosition: 15 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 16,
        top3: [
          { gatePosition:  4, horseName: "Coneygree",               sp:  8.0  },
          { gatePosition:  5, horseName: "Djakadam",                sp: 11.0  },
          { gatePosition: 14, horseName: "Road To Riches",          sp:  9.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Carlingford Lough",       sp: 12.0,  finishPosition:  9 },
          { gatePosition:  2, horseName: "Champagne Fever",         sp: 13.0,  finishPosition: 13 },
          { gatePosition:  3, horseName: "Ballycasey",              sp: 67.0,  finishPosition: 11 },
          { gatePosition:  4, horseName: "Coneygree",               sp:  8.0,  finishPosition:  1 },
          { gatePosition:  5, horseName: "Djakadam",                sp: 11.0,  finishPosition:  2 },
          { gatePosition:  6, horseName: "Vautour",                 sp:  6.5,  finishPosition: null },
          { gatePosition:  7, horseName: "Holywell",                sp:  9.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "The Giant Bolster",       sp: 34.0,  finishPosition: 10 },
          { gatePosition:  9, horseName: "Mala Beach",              sp: 51.0,  finishPosition: 14 },
          { gatePosition: 11, horseName: "Many Clouds",             sp:  8.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "On His Own",              sp: 34.0,  finishPosition:  5 },
          { gatePosition: 13, horseName: "Box Office",              sp: 101.0, finishPosition: null },
          { gatePosition: 14, horseName: "Road To Riches",          sp:  9.0,  finishPosition:  3 },
          { gatePosition: 15, horseName: "Bennys Vale",             sp: 67.0,  finishPosition: 12 },
          { gatePosition: 16, horseName: "Silviniaco Conti",        sp:  4.0,  finishPosition:  7 }, // 3/1F
          { gatePosition: 17, horseName: "Smad Place",              sp: 26.0,  finishPosition:  8 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 13,
        top3: [
          { gatePosition:  6, horseName: "Heir Of Excitement",      sp:  6.0  }, // corrected — was wrong
          { gatePosition: 12, horseName: "Kruzhlinin",              sp: 15.0  },
          { gatePosition:  3, horseName: "Ur Man Vinnie",           sp: 15.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ballydine",               sp: 26.0,  finishPosition: 11 },
          { gatePosition:  2, horseName: "Howaya Tommy",            sp: 34.0,  finishPosition:  9 },
          { gatePosition:  3, horseName: "Ur Man Vinnie",           sp: 15.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "The Sliotar",             sp: 26.0,  finishPosition:  8 },
          { gatePosition:  5, horseName: "Foxrock",                 sp:  3.75, finishPosition:  4 }, // 11/4F
          { gatePosition:  6, horseName: "Heir Of Excitement",      sp:  6.0,  finishPosition:  1 },
          { gatePosition:  7, horseName: "Grumeti",                 sp: 34.0,  finishPosition: 10 },
          { gatePosition:  8, horseName: "Carsonstown Boy",         sp: 19.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Markov",                  sp: 13.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "Barbury Bandit",          sp: 101.0, finishPosition: 12 },
          { gatePosition: 11, horseName: "Paint The Clouds",        sp:  5.5,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Kruzhlinin",              sp: 15.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Moonlone Lane",           sp: 51.0,  finishPosition: null },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 16,
        top3: [
          { gatePosition:  3, horseName: "Roi Des Francs",          sp:  6.0  }, // corrected — was wrong
          { gatePosition: 15, horseName: "Le Mercurey",             sp: 10.0  },
          { gatePosition:  8, horseName: "Vyta Du Roc",             sp: 13.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Reve De Sivola",          sp: 11.0,  finishPosition:  5 },
          { gatePosition:  2, horseName: "Shaneshill",              sp: 21.0,  finishPosition: 11 },
          { gatePosition:  3, horseName: "Roi Des Francs",          sp:  6.0,  finishPosition:  1 },
          { gatePosition:  4, horseName: "Present View",            sp: 15.0,  finishPosition:  9 },
          { gatePosition:  5, horseName: "Bertimont",               sp: 17.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Thomas Tod",              sp: 67.0,  finishPosition: 12 },
          { gatePosition:  7, horseName: "Killala Bay",             sp: 26.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Vyta Du Roc",             sp: 13.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Rons Dream",              sp: 34.0,  finishPosition: 10 },
          { gatePosition: 10, horseName: "Planet Of Sound",         sp: 21.0,  finishPosition:  7 },
          { gatePosition: 11, horseName: "My Tent Or Yours",        sp:  9.0,  finishPosition: 13 },
          { gatePosition: 12, horseName: "Ballypatrick",            sp: 34.0,  finishPosition:  6 },
          { gatePosition: 13, horseName: "De Plotting Shed",        sp: 34.0,  finishPosition: 15 },
          { gatePosition: 14, horseName: "Vibrato Valtat",          sp: 11.0,  finishPosition: 14 },
          { gatePosition: 15, horseName: "Le Mercurey",             sp: 10.0,  finishPosition:  2 },
          { gatePosition: 16, horseName: "Balbir Du Mathan",        sp: 21.0,  finishPosition: 16 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 15,
        top3: [
          { gatePosition:  7, horseName: "Next Sensation",          sp: 13.0  }, // corrected — was wrong
          { gatePosition: 14, horseName: "Eastlake",                sp: 17.0  },
          { gatePosition: 11, horseName: "Qualando",                sp: 21.0  }, // corrected — was "Claret Cloak"
        ],
        field: [
          { gatePosition:  1, horseName: "Roalco De Farges",        sp: 21.0,  finishPosition: 11 },
          { gatePosition:  2, horseName: "Hidden Cyclone",          sp: 11.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Khachaturian",            sp: 34.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Zarkandar",               sp:  5.5,  finishPosition:  9 },
          { gatePosition:  5, horseName: "Uxizandre",               sp:  2.75, finishPosition:  4 }, // 7/4F
          { gatePosition:  6, horseName: "Mister Miyagi",           sp: 34.0,  finishPosition: 12 },
          { gatePosition:  7, horseName: "Next Sensation",          sp: 13.0,  finishPosition:  1 },
          { gatePosition:  8, horseName: "Hammersly Lake",          sp: 13.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Balder Succes",           sp:  9.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Savello",                 sp: 26.0,  finishPosition: 13 },
          { gatePosition: 11, horseName: "Qualando",                sp: 21.0,  finishPosition:  3 },
          { gatePosition: 12, horseName: "Benefficient",            sp: 15.0,  finishPosition: 10 },
          { gatePosition: 13, horseName: "Wishfull Thinking",       sp: 17.0,  finishPosition: 14 },
          { gatePosition: 14, horseName: "Eastlake",                sp: 17.0,  finishPosition:  2 },
          { gatePosition: 15, horseName: "Presented",               sp: 67.0,  finishPosition: null },
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
        fieldSize: 16,
        top3: [
          { gatePosition:  8, horseName: "Ivanovich Gorbatov",        sp:  5.5  },
          { gatePosition: 14, horseName: "Apple's Jade",               sp: 13.0  },
          { gatePosition:  5, horseName: "Footpad",                    sp:  6.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Brio Conti",                 sp: 34.0,  finishPosition: 15 },
          { gatePosition:  2, horseName: "Clan Des Obeaux",            sp: 13.0,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Connetable",                 sp: 15.0,  finishPosition: 11 },
          { gatePosition:  4, horseName: "Consul De Thaix",            sp: 34.0,  finishPosition: 10 },
          { gatePosition:  5, horseName: "Footpad",                    sp:  6.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Frodon",                     sp: 21.0,  finishPosition:  8 },
          { gatePosition:  7, horseName: "Gibralfaro",                 sp: 26.0,  finishPosition:  9 },
          { gatePosition:  8, horseName: "Ivanovich Gorbatov",         sp:  5.5,  finishPosition:  1 },
          { gatePosition:  9, horseName: "Leoncavallo",                sp: 19.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Way Back When",              sp: 41.0,  finishPosition: 14 },
          { gatePosition: 11, horseName: "Tommy Silver",               sp: 26.0,  finishPosition:  7 },
          { gatePosition: 12, horseName: "Divin Bere",                 sp: 41.0,  finishPosition: 16 },
          { gatePosition: 13, horseName: "Meri Devie",                 sp: 67.0,  finishPosition: 12 },
          { gatePosition: 14, horseName: "Apple's Jade",               sp: 13.0,  finishPosition:  2 },
          { gatePosition: 15, horseName: "Let's Dance",                sp: 12.0,  finishPosition:  4 },
          { gatePosition: 16, horseName: "Moon Racer",                 sp:  4.5,  finishPosition: 13 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 28,
        top3: [
          { gatePosition:  4, horseName: "Superb Story",               sp:  9.0  },
          { gatePosition: 19, horseName: "Fethard Player",             sp: 34.0  },
          { gatePosition: 10, horseName: "Sternrubin",                 sp: 34.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Wait For Me",                sp:  8.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Thomas Crapper",             sp: 67.0,  finishPosition: 10 },
          { gatePosition:  3, horseName: "Parlour Games",              sp: 67.0,  finishPosition: 19 },
          { gatePosition:  4, horseName: "Superb Story",               sp:  9.0,  finishPosition:  1 },
          { gatePosition:  5, horseName: "Very Wood",                  sp: 34.0,  finishPosition: 15 },
          { gatePosition:  6, horseName: "Movewiththemarket",          sp: 26.0,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Sceau Royal",                sp:  8.0,  finishPosition: 14 },
          { gatePosition:  8, horseName: "Minella Foru",               sp: 26.0,  finishPosition:  8 },
          { gatePosition:  9, horseName: "Final Approach",             sp: 26.0,  finishPosition: 24 },
          { gatePosition: 10, horseName: "Sternrubin",                 sp: 34.0,  finishPosition:  3 },
          { gatePosition: 11, horseName: "Thousand Stars",             sp: 17.0,  finishPosition: 16 },
          { gatePosition: 12, horseName: "Snow Falcon",                sp: 17.0,  finishPosition: null },
          { gatePosition: 13, horseName: "Tully East",                 sp: 21.0,  finishPosition: 22 },
          { gatePosition: 14, horseName: "Salsify",                    sp: 51.0,  finishPosition: 26 },
          { gatePosition: 15, horseName: "Tom George",                 sp: 26.0,  finishPosition: 21 },
          { gatePosition: 16, horseName: "Diamond King",               sp: 13.0,  finishPosition: 25 },
          { gatePosition: 17, horseName: "Agrapart",                   sp: 15.0,  finishPosition: 11 },
          { gatePosition: 18, horseName: "Beneagles",                  sp: 21.0,  finishPosition: 18 },
          { gatePosition: 19, horseName: "Fethard Player",             sp: 34.0,  finishPosition:  2 },
          { gatePosition: 20, horseName: "Fingal Bay",                 sp: 67.0,  finishPosition: 20 },
          { gatePosition: 21, horseName: "Aachen",                     sp: 51.0,  finishPosition: 23 },
          { gatePosition: 22, horseName: "Spring Low",                 sp: 67.0,  finishPosition: null },
          { gatePosition: 23, horseName: "Percy Veer",                 sp: 51.0,  finishPosition: 12 },
          { gatePosition: 24, horseName: "Leighton Aspell",            sp: 51.0,  finishPosition: 17 },
          { gatePosition: 25, horseName: "Doitforthevillage",          sp: 34.0,  finishPosition:  6 },
          { gatePosition: 26, horseName: "Spring Heeled",              sp: 26.0,  finishPosition:  7 },
          { gatePosition: 27, horseName: "Whisper",                    sp:  5.5,  finishPosition: 13 },
          { gatePosition: 28, horseName: "Identity Thief",             sp: 10.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 19,
        top3: [
          { gatePosition:  9, horseName: "Unowhatimeanharry",          sp: 12.0  },
          { gatePosition:  4, horseName: "Fagan",                      sp: 34.0  },
          { gatePosition: 12, horseName: "Champers On Ice",            sp: 21.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Barters Hill",               sp:  5.0,  finishPosition:  4 }, // 4/1J
          { gatePosition:  2, horseName: "Yanworth",                   sp:  5.0,  finishPosition:  7 }, // 4/1J
          { gatePosition:  3, horseName: "Minella Rockstar",           sp: 34.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Fagan",                      sp: 34.0,  finishPosition:  2 },
          { gatePosition:  5, horseName: "Beyond The Law",             sp: 51.0,  finishPosition:  9 },
          { gatePosition:  6, horseName: "Shantou Village",            sp:  4.5,  finishPosition: null }, // 7/2F PU
          { gatePosition:  7, horseName: "Mall Dini",                  sp: 15.0,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Felix Yonger",               sp: 15.0,  finishPosition: 18 },
          { gatePosition:  9, horseName: "Unowhatimeanharry",          sp: 12.0,  finishPosition:  1 },
          { gatePosition: 10, horseName: "Killultagh Vic",             sp: 21.0,  finishPosition: 16 },
          { gatePosition: 11, horseName: "Squouateur",                 sp: 26.0,  finishPosition: 13 },
          { gatePosition: 12, horseName: "Champers On Ice",            sp: 21.0,  finishPosition:  3 },
          { gatePosition: 13, horseName: "Windsor Park",               sp: 34.0,  finishPosition: 11 },
          { gatePosition: 14, horseName: "Ballyoptic",                 sp: 17.0,  finishPosition:  8 },
          { gatePosition: 15, horseName: "Clondaw Warrior",            sp: 34.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "Drumcliff",                  sp: 34.0,  finishPosition: 10 },
          { gatePosition: 17, horseName: "Another Hero",               sp: 51.0,  finishPosition: 17 },
          { gatePosition: 18, horseName: "Moon Over Germany",          sp: 51.0,  finishPosition: 15 },
          { gatePosition: 19, horseName: "Oscar Knight",               sp: 51.0,  finishPosition: 12 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 9,
        top3: [
          { gatePosition:  4, horseName: "Don Cossack",                sp:  3.25 },
          { gatePosition:  3, horseName: "Djakadam",                   sp:  5.5  },
          { gatePosition:  5, horseName: "Don Poli",                   sp:  5.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Carlingford Lough",          sp: 26.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Cue Card",                   sp:  3.5,  finishPosition: null },
          { gatePosition:  3, horseName: "Djakadam",                   sp:  5.5,  finishPosition:  2 },
          { gatePosition:  4, horseName: "Don Cossack",                sp:  3.25, finishPosition:  1 },
          { gatePosition:  5, horseName: "Don Poli",                   sp:  5.5,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Irish Cavalier",             sp: 67.0,  finishPosition:  5 },
          { gatePosition:  7, horseName: "O'Faolains Boy",             sp: 41.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "On His Own",                 sp: 51.0,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Smad Place",                 sp: 11.0,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 9,
        top3: [
          { gatePosition:  1, horseName: "On The Fringe",              sp:  2.625 },
          { gatePosition:  5, horseName: "Marito",                     sp: 15.0  },
          { gatePosition:  7, horseName: "Paint The Clouds",           sp:  5.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "On The Fringe",              sp:  2.625, finishPosition:  1 }, // 13/8F
          { gatePosition:  2, horseName: "Master Dee",                 sp: 17.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Dashing Oscar",              sp: 21.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Hinterland",                 sp:  4.5,  finishPosition: null },
          { gatePosition:  5, horseName: "Marito",                     sp: 15.0,  finishPosition:  2 },
          { gatePosition:  6, horseName: "Minella On Tour",            sp:  9.0,  finishPosition:  4 },
          { gatePosition:  7, horseName: "Paint The Clouds",           sp:  5.5,  finishPosition:  3 },
          { gatePosition:  8, horseName: "Quantitativeeasing",         sp: 34.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Pacha Du Polder",            sp:  9.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition: 16, horseName: "Ibis Du Rheu",               sp: 15.0  },
          { gatePosition: 15, horseName: "Flying Angel",               sp:  9.0  },
          { gatePosition: 22, horseName: "Sky Khan",                   sp: 51.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Jezki",                      sp:  6.5,  finishPosition:  6 }, // 11/2F
          { gatePosition:  2, horseName: "Faugheen",                   sp: 11.0,  finishPosition: 18 },
          { gatePosition:  3, horseName: "Some Man",                   sp: 21.0,  finishPosition:  8 },
          { gatePosition:  4, horseName: "Minella Outlet",             sp: 15.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Alelchi Inois",              sp: 34.0,  finishPosition: 20 },
          { gatePosition:  6, horseName: "Bless The Wings",            sp: 34.0,  finishPosition: 15 },
          { gatePosition:  7, horseName: "Empire Of Dirt",             sp: 10.0,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Mall Dini",                  sp: 15.0,  finishPosition: 17 },
          { gatePosition:  9, horseName: "Step Back",                  sp: 15.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Winter Lion",                sp: 26.0,  finishPosition: 22 },
          { gatePosition: 11, horseName: "Clondaw Banker",             sp: 15.0,  finishPosition: 16 },
          { gatePosition: 12, horseName: "Tully East",                 sp: 51.0,  finishPosition:  4 },
          { gatePosition: 13, horseName: "Coo Star Sivola",            sp: 26.0,  finishPosition: 23 },
          { gatePosition: 14, horseName: "Many Clouds",                sp: 21.0,  finishPosition: 14 },
          { gatePosition: 15, horseName: "Flying Angel",               sp:  9.0,  finishPosition:  2 },
          { gatePosition: 16, horseName: "Ibis Du Rheu",               sp: 15.0,  finishPosition:  1 },
          { gatePosition: 17, horseName: "Baily Green",                sp: 15.0,  finishPosition: 13 },
          { gatePosition: 18, horseName: "Vicente",                    sp: 51.0,  finishPosition: 24 },
          { gatePosition: 19, horseName: "Kilbree Kid",                sp: 41.0,  finishPosition: 10 },
          { gatePosition: 20, horseName: "Josies Orders",              sp: 26.0,  finishPosition: 21 },
          { gatePosition: 21, horseName: "Black Hercules",             sp:  6.0,  finishPosition: 12 },
          { gatePosition: 22, horseName: "Sky Khan",                   sp: 51.0,  finishPosition:  3 },
          { gatePosition: 23, horseName: "Tiger Roll",                 sp: 11.0,  finishPosition: 19 },
          { gatePosition: 24, horseName: "Present Man",                sp: 21.0,  finishPosition:  7 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 24,
        top3: [
          { gatePosition: 21, horseName: "Solar Impulse",              sp: 29.0  },
          { gatePosition:  7, horseName: "Dandridge",                  sp:  9.0  },
          { gatePosition: 20, horseName: "Rock The World",             sp:  5.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Village Vic",                sp: 26.0,  finishPosition: 14 },
          { gatePosition:  2, horseName: "Charbel",                    sp:  9.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Diakali",                    sp: 13.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Foxtail Hill",               sp: 17.0,  finishPosition: 10 },
          { gatePosition:  5, horseName: "Ballypatrick Forest",        sp: 34.0,  finishPosition: 17 },
          { gatePosition:  6, horseName: "Special Tiara",              sp: 11.0,  finishPosition: 11 },
          { gatePosition:  7, horseName: "Dandridge",                  sp:  9.0,  finishPosition:  2 },
          { gatePosition:  8, horseName: "Bentelimar",                 sp: 26.0,  finishPosition: 18 },
          { gatePosition:  9, horseName: "Vaniteux",                   sp:  4.5,  finishPosition: null },
          { gatePosition: 10, horseName: "Just A Par",                 sp: 21.0,  finishPosition: 21 },
          { gatePosition: 11, horseName: "God's Own",                  sp:  9.0,  finishPosition: 20 },
          { gatePosition: 12, horseName: "Ballyandre",                 sp: 34.0,  finishPosition:  5 },
          { gatePosition: 13, horseName: "Acapella Bourgeois",         sp: 26.0,  finishPosition: 19 },
          { gatePosition: 14, horseName: "No More Heroes",             sp: 17.0,  finishPosition: 15 },
          { gatePosition: 15, horseName: "The Game Changer",           sp: 26.0,  finishPosition: 12 },
          { gatePosition: 16, horseName: "Savello",                    sp: 26.0,  finishPosition:  4 },
          { gatePosition: 17, horseName: "Un Ace",                     sp: 34.0,  finishPosition: 13 },
          { gatePosition: 18, horseName: "Different Gravey",           sp: 34.0,  finishPosition: null },
          { gatePosition: 19, horseName: "Sire De Grugy",              sp: 15.0,  finishPosition:  7 },
          { gatePosition: 20, horseName: "Rock The World",             sp:  5.5,  finishPosition:  3 },
          { gatePosition: 21, horseName: "Solar Impulse",              sp: 29.0,  finishPosition:  1 },
          { gatePosition: 22, horseName: "Born Survivor",              sp: 34.0,  finishPosition: 16 },
          { gatePosition: 23, horseName: "One Track Mind",             sp: 51.0,  finishPosition: null },
          { gatePosition: 24, horseName: "Karezak",                    sp: 26.0,  finishPosition:  9 },
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
        fieldSize: 15,
        top3: [
          { gatePosition:  5, horseName: "Defi Du Seuil",       sp:  3.5  },
          { gatePosition: 12, horseName: "Mega Fortune",        sp:  8.0  },
          { gatePosition:  1, horseName: "Bapaume",             sp: 11.0  },
        ],
        field: [
          // NR: King Julien (cloth 8) — excluded
          { gatePosition:  1, horseName: "Bapaume",                sp: 11.0,  finishPosition:  3 },
          { gatePosition:  2, horseName: "Charli Parcs",           sp:  5.5,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Coeur De Lion",          sp: 34.0,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Dandy Mag",              sp: 23.0,  finishPosition: 13 },
          { gatePosition:  5, horseName: "Defi Du Seuil",          sp:  3.5,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Ex Patriot",             sp: 29.0,  finishPosition:  4 },
          { gatePosition:  7, horseName: "I See You Well",         sp: 201.0, finishPosition: 14 },
          { gatePosition:  9, horseName: "Landin",                 sp: 151.0, finishPosition:  8 },
          { gatePosition: 10, horseName: "Landofhopeandglory",     sp:  9.0,  finishPosition:  5 },
          { gatePosition: 11, horseName: "Master Blueyes",         sp:  9.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "Mega Fortune",           sp:  8.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Soldier In Action",      sp: 17.0,  finishPosition: 15 },
          { gatePosition: 14, horseName: "Dinaria Des Obeaux",     sp: 11.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Evening Hush",           sp: 51.0,  finishPosition: 12 },
          { gatePosition: 16, horseName: "Magie Du Ma",            sp: 41.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 25,
        top3: [
          { gatePosition:  1, horseName: "Arctic Fire",            sp: 21.0  },
          { gatePosition:  2, horseName: "L'Ami Serge",            sp: 26.0  },
          { gatePosition: 24, horseName: "Ozzie The Oscar",        sp: 51.0  },
        ],
        field: [
          // NR: Mick Jazz (cloth 8) — excluded
          { gatePosition:  1, horseName: "Arctic Fire",            sp: 21.0,  finishPosition:  1 },
          { gatePosition:  2, horseName: "L'Ami Serge",            sp: 26.0,  finishPosition:  2 },
          { gatePosition:  3, horseName: "Ivanovich Gorbatov",     sp:  6.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Renneti",                sp: 12.0,  finishPosition:  8 },
          { gatePosition:  5, horseName: "Diego Du Charmil",       sp: 13.0,  finishPosition: 12 },
          { gatePosition:  6, horseName: "North Hill Harvey",      sp:  9.0,  finishPosition: 16 },
          { gatePosition:  7, horseName: "Court Minstrel",         sp: 34.0,  finishPosition: 10 },
          { gatePosition:  9, horseName: "Tell Us More",           sp: 15.0,  finishPosition: 21 },
          { gatePosition: 10, horseName: "Wakea",                  sp: 34.0,  finishPosition: 11 },
          { gatePosition: 11, horseName: "Boite",                  sp: 51.0,  finishPosition: 19 },
          { gatePosition: 12, horseName: "Winter Escape",          sp: 10.0,  finishPosition:  5 },
          { gatePosition: 13, horseName: "Joey Sasa",              sp: 21.0,  finishPosition: 20 },
          { gatePosition: 14, horseName: "Air Horse One",          sp: 11.0,  finishPosition:  4 },
          { gatePosition: 15, horseName: "Vosne Romanee",          sp: 19.0,  finishPosition: 22 },
          { gatePosition: 16, horseName: "Bertimont",              sp: 51.0,  finishPosition: 15 },
          { gatePosition: 17, horseName: "Baltimore Rock",         sp: 67.0,  finishPosition: 14 },
          { gatePosition: 18, horseName: "Crievhill",              sp: 34.0,  finishPosition: 13 },
          { gatePosition: 19, horseName: "De Name Escapes Me",     sp: 29.0,  finishPosition: null },
          { gatePosition: 20, horseName: "Kapstadt",               sp: 34.0,  finishPosition: 17 },
          { gatePosition: 21, horseName: "Wait For Me",            sp: 11.0,  finishPosition:  9 },
          { gatePosition: 22, horseName: "Dominada",               sp: 41.0,  finishPosition: 23 },
          { gatePosition: 23, horseName: "Jaleo",                  sp: 41.0,  finishPosition: null },
          { gatePosition: 24, horseName: "Ozzie The Oscar",        sp: 51.0,  finishPosition:  3 },
          { gatePosition: 25, horseName: "Song Light",             sp: 21.0,  finishPosition: 18 },
          { gatePosition: 26, horseName: "Mohaayed",               sp: 17.0,  finishPosition:  7 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 15,
        top3: [
          { gatePosition:  9, horseName: "Penhill",                sp: 17.0  },
          { gatePosition:  8, horseName: "Monalee",                sp:  9.0  },
          { gatePosition: 14, horseName: "Wholestone",             sp:  7.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ami Desbois",            sp: 34.0,  finishPosition:  5 },
          { gatePosition:  2, horseName: "Any Drama",              sp: 26.0,  finishPosition: null },
          { gatePosition:  3, horseName: "Baden",                  sp: 101.0, finishPosition: 11 },
          { gatePosition:  4, horseName: "C'Est Jersey",           sp: 101.0, finishPosition: 10 },
          { gatePosition:  5, horseName: "Constantine Bay",        sp: 13.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Death Duty",             sp:  2.63, finishPosition: null }, // 13/8F — UR Ruby Walsh
          { gatePosition:  7, horseName: "Elegant Escape",         sp: 101.0, finishPosition:  7 },
          { gatePosition:  8, horseName: "Monalee",                sp:  9.0,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Penhill",                sp: 17.0,  finishPosition:  1 },
          { gatePosition: 10, horseName: "Step Back",              sp: 101.0, finishPosition:  9 },
          { gatePosition: 11, horseName: "The Worlds End",         sp: 11.0,  finishPosition: null },
          { gatePosition: 12, horseName: "Tommy Rapper",           sp: 34.0,  finishPosition:  8 },
          { gatePosition: 13, horseName: "Turcagua",               sp: 67.0,  finishPosition: null },
          { gatePosition: 14, horseName: "Wholestone",             sp:  7.5,  finishPosition:  3 },
          { gatePosition: 15, horseName: "Augusta Kate",           sp:  6.5,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 13,
        top3: [
          { gatePosition: 12, horseName: "Sizing John",            sp:  8.0  },
          { gatePosition:  7, horseName: "Minella Rocco",          sp: 19.0  },
          { gatePosition:  9, horseName: "Native River",           sp:  4.5  },
        ],
        field: [
          // NR: Empire Of Dirt (cloth 5) — excluded
          { gatePosition:  1, horseName: "Bristol De Mai",         sp: 17.0,  finishPosition:  7 },
          { gatePosition:  2, horseName: "Champagne West",         sp: 15.0,  finishPosition:  9 },
          { gatePosition:  3, horseName: "Cue Card",               sp:  5.5,  finishPosition: null },
          { gatePosition:  4, horseName: "Djakadam",               sp:  4.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Irish Cavalier",         sp: 67.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Minella Rocco",          sp: 19.0,  finishPosition:  2 },
          { gatePosition:  8, horseName: "More Of That",           sp: 15.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Native River",           sp:  4.5,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Outlander",              sp: 11.0,  finishPosition: 10 },
          { gatePosition: 11, horseName: "Saphir Du Rheu",         sp: 34.0,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Sizing John",            sp:  8.0,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Smad Place",             sp: 51.0,  finishPosition:  8 },
          { gatePosition: 14, horseName: "Tea For Two",            sp: 41.0,  finishPosition: null },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 23,
        top3: [
          { gatePosition: 17, horseName: "Pacha Du Polder",        sp: 17.0  },
          { gatePosition: 24, horseName: "Wonderful Charm",        sp:  4.5  },
          { gatePosition:  5, horseName: "Barel Of Laughs",        sp: 101.0 },
        ],
        field: [
          // NR: Anseanachai Cliste (cloth 1) — excluded
          { gatePosition:  2, horseName: "Ask The Weatherman",     sp:  7.5,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Aupcharlie",             sp: 34.0,  finishPosition: 13 },
          { gatePosition:  4, horseName: "Balnaslow",              sp: 41.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Barel Of Laughs",        sp: 101.0, finishPosition:  3 },
          { gatePosition:  6, horseName: "Black Thunder",          sp: 21.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Buckers Bridge",         sp: 51.0,  finishPosition: null },
          { gatePosition:  8, horseName: "Cottage Oak",            sp: 151.0, finishPosition: null },
          { gatePosition:  9, horseName: "Current Event",          sp: 67.0,  finishPosition: 16 },
          { gatePosition: 10, horseName: "Dolatulo",               sp: 67.0,  finishPosition: 17 },
          { gatePosition: 11, horseName: "Grand Jesture",          sp: 41.0,  finishPosition: 15 },
          { gatePosition: 12, horseName: "Grand Vision",           sp: 51.0,  finishPosition: 14 },
          { gatePosition: 13, horseName: "Lets Get Serious",       sp: 201.0, finishPosition: null },
          { gatePosition: 14, horseName: "Mendip Express",         sp: 67.0,  finishPosition:  9 },
          { gatePosition: 15, horseName: "Minella For Value",      sp: 101.0, finishPosition:  6 },
          { gatePosition: 16, horseName: "On The Fringe",          sp:  2.38, finishPosition:  4 }, // 11/8F
          { gatePosition: 17, horseName: "Pacha Du Polder",        sp: 17.0,  finishPosition:  1 },
          { gatePosition: 18, horseName: "Paint The Clouds",       sp: 12.0,  finishPosition:  8 },
          { gatePosition: 19, horseName: "Pentiffic",              sp: 151.0, finishPosition: 11 },
          { gatePosition: 20, horseName: "Premier Portrait",       sp: 101.0, finishPosition: 18 },
          { gatePosition: 21, horseName: "Salsify",                sp: 51.0,  finishPosition: 10 },
          { gatePosition: 22, horseName: "Sweet As A Nut",         sp: 15.0,  finishPosition: null },
          { gatePosition: 23, horseName: "Warden Hill",            sp: 101.0, finishPosition: 12 },
          { gatePosition: 24, horseName: "Wonderful Charm",        sp:  4.5,  finishPosition:  2 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 24,
        top3: [
          { gatePosition:  4, horseName: "Rock The World",         sp: 11.0  },
          { gatePosition: 11, horseName: "Gardefort",              sp: 21.0  },
          { gatePosition: 14, horseName: "Theinval",               sp: 10.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Eastlake",               sp: 29.0,  finishPosition: 10 },
          { gatePosition:  2, horseName: "Dodging Bullets",        sp:  9.0,  finishPosition: null },
          { gatePosition:  3, horseName: "The Game Changer",       sp: 10.0,  finishPosition: 21 },
          { gatePosition:  4, horseName: "Rock The World",         sp: 11.0,  finishPosition:  1 },
          { gatePosition:  5, horseName: "Quite By Chance",        sp: 34.0,  finishPosition: 13 },
          { gatePosition:  6, horseName: "Le Prezien",             sp:  4.5,  finishPosition:  8 }, // 7/2F
          { gatePosition:  7, horseName: "Upsilon Bleu",           sp: 34.0,  finishPosition: 17 },
          { gatePosition:  8, horseName: "Bright New Dawn",        sp: 51.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Velvet Maker",           sp: 17.0,  finishPosition: 20 },
          { gatePosition: 10, horseName: "Dandridge",              sp:  7.5,  finishPosition:  4 },
          { gatePosition: 11, horseName: "Gardefort",              sp: 21.0,  finishPosition:  2 },
          { gatePosition: 12, horseName: "Mr Fiftyone",            sp: 41.0,  finishPosition: 15 },
          { gatePosition: 13, horseName: "Sizing Platinum",        sp: 21.0,  finishPosition: 19 },
          { gatePosition: 14, horseName: "Theinval",               sp: 10.0,  finishPosition:  3 },
          { gatePosition: 15, horseName: "Croco Bay",              sp: 41.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Pairofbrowneyes",        sp: 19.0,  finishPosition: 11 },
          { gatePosition: 17, horseName: "Bold Henry",             sp: 34.0,  finishPosition: 12 },
          { gatePosition: 18, horseName: "Solita",                 sp: 26.0,  finishPosition: null },
          { gatePosition: 19, horseName: "Calipto",                sp: 15.0,  finishPosition:  6 },
          { gatePosition: 20, horseName: "Ultragold",              sp: 101.0, finishPosition:  9 },
          { gatePosition: 21, horseName: "Solar Impulse",          sp: 34.0,  finishPosition: 16 },
          { gatePosition: 22, horseName: "Un Beau Roman",          sp: 67.0,  finishPosition: null },
          { gatePosition: 23, horseName: "Mick Thonic",            sp: 51.0,  finishPosition: 14 },
          { gatePosition: 24, horseName: "Witness In Court",       sp: 41.0,  finishPosition: 18 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 23,
        top3: [
          { gatePosition: 12, horseName: "Champagne Classic",      sp: 13.0  },
          { gatePosition: 23, horseName: "Verni",                  sp: 26.0  }, // corrected from "Presenting Percy"
          { gatePosition:  5, horseName: "Runfordave",             sp: 10.0  }, // corrected from "Bedrock" / 8.0
        ],
        field: [
          // NR: Protek Des Flos (cloth 20) — excluded
          { gatePosition:  1, horseName: "Tagliatelle",            sp: 21.0,  finishPosition: 12 },
          { gatePosition:  2, horseName: "Born Survivor",          sp: 34.0,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Gibralfaro",             sp: 51.0,  finishPosition: null },
          { gatePosition:  4, horseName: "Tommy Silver",           sp: 21.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Runfordave",             sp: 10.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Lac Fontana",            sp: 21.0,  finishPosition: 16 },
          { gatePosition:  7, horseName: "I Shot The Sheriff",     sp: 21.0,  finishPosition: null },
          { gatePosition:  8, horseName: "Remiluc",                sp: 51.0,  finishPosition: 15 },
          { gatePosition:  9, horseName: "Castello Sforza",        sp: 12.0,  finishPosition: 10 },
          { gatePosition: 10, horseName: "Coo Star Sivola",        sp:  7.5,  finishPosition:  4 },
          { gatePosition: 11, horseName: "Dell' Arca",             sp: 34.0,  finishPosition: 18 },
          { gatePosition: 12, horseName: "Champagne Classic",      sp: 13.0,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Massini's Trap",         sp: 101.0, finishPosition: 14 },
          { gatePosition: 14, horseName: "No Comment",             sp:  8.5,  finishPosition:  7 },
          { gatePosition: 15, horseName: "Thomas Campbell",        sp: 21.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Doesyourdogbite",        sp: 34.0,  finishPosition: 13 },
          { gatePosition: 17, horseName: "Pain Au Chocolat",       sp: 101.0, finishPosition: 17 },
          { gatePosition: 18, horseName: "Ballyhill",              sp: 81.0,  finishPosition: 19 },
          { gatePosition: 19, horseName: "Dadsintrouble",          sp: 15.0,  finishPosition:  9 },
          { gatePosition: 21, horseName: "Rather Be",              sp: 11.0,  finishPosition: null },
          { gatePosition: 22, horseName: "Battleford",             sp:  5.5,  finishPosition:  8 },
          { gatePosition: 23, horseName: "Verni",                  sp: 26.0,  finishPosition:  2 },
          { gatePosition: 24, horseName: "Catamaran Du Seuil",     sp: 34.0,  finishPosition: 20 },
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
        fieldSize: 9,
        top3: [
          { gatePosition:  1, horseName: "Farclas",          sp: 10.0 },
          { gatePosition:  3, horseName: "Mr Adjudicator",   sp:  9.0 },
          { gatePosition:  6, horseName: "Sayo",             sp: 34.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Farclas",          sp: 10.0, finishPosition:  1 },
          { gatePosition:  2, horseName: "Gumball",          sp: 41.0, finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Mr Adjudicator",   sp:  9.0, finishPosition:  2 },
          { gatePosition:  4, horseName: "Redicean",         sp:  8.0, finishPosition:  6 },
          { gatePosition:  5, horseName: "Saldier",          sp: 15.0, finishPosition:  5 },
          { gatePosition:  6, horseName: "Sayo",             sp: 34.0, finishPosition:  3 },
          { gatePosition:  7, horseName: "Sussex Ranger",    sp: 29.0, finishPosition:  7 },
          { gatePosition:  8, horseName: "Apple's Shakira",  sp:  2.2, finishPosition:  4 },
          { gatePosition:  9, horseName: "Stormy Ireland",   sp:  5.5, finishPosition: null }, // F
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 24,
        top3: [
          { gatePosition: 21, horseName: "Mohaayed",         sp: 34.0 },
          { gatePosition:  9, horseName: "Remiluc",          sp: 51.0 },
          { gatePosition: 14, horseName: "Whiskey Sour",     sp:  8.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Bleu Et Rouge",          sp: 11.0, finishPosition: 14 },
          { gatePosition:  2, horseName: "Jenkins",                sp: 34.0, finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Ivanovich Gorbatov",     sp: 26.0, finishPosition: 17 },
          { gatePosition:  4, horseName: "Tigris River",           sp: 51.0, finishPosition: null }, // PU
          { gatePosition:  5, horseName: "Lagostovegas",           sp: 21.0, finishPosition:  5 }, // dead-heat
          { gatePosition:  6, horseName: "Le Richebourg",          sp: 34.0, finishPosition: 15 },
          { gatePosition:  7, horseName: "A Hare Breath",          sp: 21.0, finishPosition:  8 },
          { gatePosition:  8, horseName: "Sandsend",               sp: 12.0, finishPosition: null }, // UR
          { gatePosition:  9, horseName: "Remiluc",                sp: 51.0, finishPosition:  2 },
          { gatePosition: 10, horseName: "Sternrubin",             sp: 41.0, finishPosition: 10 },
          { gatePosition: 11, horseName: "Moon Racer",             sp: 21.0, finishPosition:  9 },
          { gatePosition: 12, horseName: "Brelade",                sp: 26.0, finishPosition:  7 },
          { gatePosition: 13, horseName: "Meri Devie",             sp: 13.0, finishPosition: 13 },
          { gatePosition: 14, horseName: "Whiskey Sour",           sp:  8.0, finishPosition:  3 },
          { gatePosition: 15, horseName: "Divin Bere",             sp: 34.0, finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Flying Tiger",           sp:  7.0, finishPosition: 16 },
          { gatePosition: 17, horseName: "All Set To Go",          sp: 101.0, finishPosition: 18 },
          { gatePosition: 18, horseName: "Chesterfield",           sp: 17.0, finishPosition:  4 },
          { gatePosition: 19, horseName: "Spiritofthegames",       sp: 13.0, finishPosition:  5 }, // dead-heat
          { gatePosition: 20, horseName: "Ben Dundee",             sp: 13.0, finishPosition: 11 },
          { gatePosition: 21, horseName: "Mohaayed",               sp: 34.0, finishPosition:  1 },
          { gatePosition: 22, horseName: "Smaoineamh Alainn",      sp: 17.0, finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Duca De Thaix",          sp: 11.0, finishPosition: 19 },
          { gatePosition: 25, horseName: "William H Bonney",       sp: 17.0, finishPosition: 12 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 20,
        top3: [
          { gatePosition: 10, horseName: "Kilbricken Storm",  sp: 34.0 },
          { gatePosition: 13, horseName: "Ok Corral",         sp: 17.0 },
          { gatePosition: 18, horseName: "Santini",           sp:  3.75 },
        ],
        field: [
          { gatePosition:  1, horseName: "Ballyward",         sp: 21.0, finishPosition:  4 },
          { gatePosition:  2, horseName: "Beyond The Law",    sp: 51.0, finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Calett Mad",        sp: 17.0, finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Chef Des Obeaux",   sp:  7.0, finishPosition: null }, // PU
          { gatePosition:  5, horseName: "Chris's Dream",     sp:  7.0, finishPosition:  9 },
          { gatePosition:  6, horseName: "Crucial Role",      sp: 67.0, finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Dortmund Park",     sp: 13.0, finishPosition:  8 },
          { gatePosition:  8, horseName: "Enniscoffey Oscar", sp: 26.0, finishPosition: 12 },
          { gatePosition:  9, horseName: "Fabulous Saga",     sp: 21.0, finishPosition:  7 },
          { gatePosition: 10, horseName: "Kilbricken Storm",  sp: 34.0, finishPosition:  1 },
          { gatePosition: 11, horseName: "Mr Whipped",        sp: 17.0, finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Mulcahys Hill",     sp: 51.0, finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Ok Corral",         sp: 17.0, finishPosition:  2 },
          { gatePosition: 14, horseName: "Paisley Park",      sp: 34.0, finishPosition: 13 },
          { gatePosition: 15, horseName: "Poetic Rhythm",     sp: 11.0, finishPosition: 10 },
          { gatePosition: 16, horseName: "Real Steel",        sp: 34.0, finishPosition: 11 },
          { gatePosition: 17, horseName: "Robin Waters",      sp: 51.0, finishPosition:  6 },
          { gatePosition: 18, horseName: "Santini",           sp:  3.75, finishPosition:  3 },
          { gatePosition: 19, horseName: "Talkischeap",       sp: 26.0, finishPosition: null }, // PU
          { gatePosition: 20, horseName: "Tower Bridge",      sp: 34.0, finishPosition:  5 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 15,
        top3: [
          { gatePosition: 11, horseName: "Native River",      sp:  6.0 },
          { gatePosition:  9, horseName: "Might Bite",        sp:  5.0 },
          { gatePosition:  2, horseName: "Anibale Fly",       sp: 34.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "American",          sp: 26.0, finishPosition:  9 },
          { gatePosition:  2, horseName: "Anibale Fly",       sp: 34.0, finishPosition:  3 },
          { gatePosition:  3, horseName: "Bachasson",         sp: 34.0, finishPosition: null }, // F
          { gatePosition:  4, horseName: "Definitly Red",     sp:  9.0, finishPosition:  6 },
          { gatePosition:  5, horseName: "Djakadam",          sp: 26.0, finishPosition:  5 },
          { gatePosition:  7, horseName: "Edwulf",            sp: 21.0, finishPosition:  8 },
          { gatePosition:  8, horseName: "Killultagh Vic",    sp:  9.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Might Bite",        sp:  5.0, finishPosition:  2 },
          { gatePosition: 11, horseName: "Native River",      sp:  6.0, finishPosition:  1 },
          { gatePosition: 12, horseName: "Our Duke",          sp:  5.5, finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Outlander",         sp: 21.0, finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Road To Respect",   sp: 10.0, finishPosition:  4 },
          { gatePosition: 15, horseName: "Saphir Du Rheu",    sp: 67.0, finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Tea For Two",       sp: 51.0, finishPosition:  7 },
          { gatePosition: 18, horseName: "Total Recall",      sp: 15.0, finishPosition: null }, // F
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 24,
        top3: [
          { gatePosition: 10, horseName: "Pacha Du Polder",   sp: 26.0 },
          { gatePosition: 16, horseName: "Top Wood",          sp: 51.0 },
          { gatePosition:  2, horseName: "Barel Of Laughs",   sp: 15.0 }, // dead-heat 3rd
        ],
        field: [
          { gatePosition:  1, horseName: "Balnaslow",         sp: 29.0, finishPosition:  7 },
          { gatePosition:  2, horseName: "Barel Of Laughs",   sp: 15.0, finishPosition:  3 }, // dead-heat
          { gatePosition:  3, horseName: "Burning Ambition",  sp:  5.0, finishPosition:  8 },
          { gatePosition:  4, horseName: "Caid Du Berlais",   sp: 13.0, finishPosition:  5 },
          { gatePosition:  5, horseName: "Cousin Pete",       sp: 67.0, finishPosition:  3 }, // dead-heat
          { gatePosition:  6, horseName: "Foxrock",           sp:  5.5, finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Grand Vision",      sp: 15.0, finishPosition:  6 },
          { gatePosition:  8, horseName: "Minella For Value", sp: 26.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "On The Fringe",     sp: 15.0, finishPosition:  9 },
          { gatePosition: 10, horseName: "Pacha Du Polder",   sp: 26.0, finishPosition:  1 },
          { gatePosition: 11, horseName: "Wells De Lune",     sp: null, finishPosition: null }, // PU – SP unknown
          { gatePosition: 12, horseName: "Saddlers Encore",   sp: 101.0, finishPosition: null }, // F
          { gatePosition: 13, horseName: "Shantou Magic",     sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Shotavodka",        sp: 34.0, finishPosition: 14 },
          { gatePosition: 15, horseName: "Sir Jack Yeats",    sp: 21.0, finishPosition: 12 },
          { gatePosition: 16, horseName: "Top Wood",          sp: 51.0, finishPosition:  2 },
          { gatePosition: 17, horseName: "Unioniste",         sp: 13.0, finishPosition: 10 },
          { gatePosition: 18, horseName: "Premier Portrait",  sp: null, finishPosition: null }, // PU – SP unknown
          { gatePosition: 19, horseName: "Virak",             sp: 15.0, finishPosition: 13 },
          { gatePosition: 20, horseName: "Volnay De Thaix",   sp: 34.0, finishPosition: 11 },
          { gatePosition: 21, horseName: "Warden Hill",       sp: 101.0, finishPosition: 15 },
          { gatePosition: 22, horseName: "Vincitore",         sp: null, finishPosition: null }, // PU – SP unknown
          { gatePosition: 23, horseName: "Wonderful Charm",   sp:  6.5, finishPosition: null }, // PU
          { gatePosition: 24, horseName: "Young Hurricane",   sp: 51.0, finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 22,
        top3: [
          { gatePosition:  7, horseName: "Le Prezien",        sp:  8.5 },
          { gatePosition:  4, horseName: "Gino Trail",        sp: 26.0 },
          { gatePosition:  9, horseName: "Top Gamble",        sp: 17.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Garde La Victoire", sp: 17.0, finishPosition: 13 },
          { gatePosition:  3, horseName: "Rock The World",    sp: 13.0, finishPosition:  9 },
          { gatePosition:  4, horseName: "Gino Trail",        sp: 26.0, finishPosition:  2 },
          { gatePosition:  5, horseName: "Vaniteux",          sp: 11.0, finishPosition: 14 },
          { gatePosition:  6, horseName: "North Hill Harvey", sp:  9.0, finishPosition: null }, // F
          { gatePosition:  7, horseName: "Le Prezien",        sp:  8.5, finishPosition:  1 },
          { gatePosition:  8, horseName: "Don't Touch It",    sp:  8.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Top Gamble",        sp: 17.0, finishPosition:  3 },
          { gatePosition: 10, horseName: "Valdez",            sp: 15.0, finishPosition: null }, // UR
          { gatePosition: 11, horseName: "Dolos",             sp: 15.0, finishPosition:  7 },
          { gatePosition: 12, horseName: "Sizing Platinum",   sp: 26.0, finishPosition: 12 },
          { gatePosition: 13, horseName: "Eastlake",          sp: 26.0, finishPosition: 15 },
          { gatePosition: 14, horseName: "Some Plan",         sp: 17.0, finishPosition: null }, // F
          { gatePosition: 15, horseName: "Three Stars",       sp: 21.0, finishPosition:  5 },
          { gatePosition: 16, horseName: "Townshend",         sp: 21.0, finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Dresden",           sp: 26.0, finishPosition: null }, // F
          { gatePosition: 18, horseName: "Foxtail Hill",      sp: 15.0, finishPosition: 11 },
          { gatePosition: 19, horseName: "Bouvreuil",         sp: 17.0, finishPosition: null }, // BD
          { gatePosition: 21, horseName: "Theinval",          sp: 11.0, finishPosition:  4 },
          { gatePosition: 22, horseName: "Born Survivor",     sp: 21.0, finishPosition:  8 },
          { gatePosition: 23, horseName: "Bright New Dawn",   sp: 34.0, finishPosition: 10 },
          { gatePosition: 24, horseName: "Doitforthevillage", sp: 26.0, finishPosition:  6 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 23,
        top3: [
          { gatePosition:  1, horseName: "Blow By Blow",      sp: 12.0 },
          { gatePosition: 23, horseName: "Discorama",         sp: 34.0 },
          { gatePosition:  5, horseName: "Early Doors",       sp: 10.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Blow By Blow",      sp: 12.0, finishPosition:  1 },
          { gatePosition:  2, horseName: "Sire Du Berlais",   sp: 11.0, finishPosition:  4 },
          { gatePosition:  3, horseName: "Flaxen Flare",      sp: 34.0, finishPosition: 20 },
          { gatePosition:  4, horseName: "Diese Des Bieffes", sp:  8.0, finishPosition:  5 },
          { gatePosition:  5, horseName: "Early Doors",       sp: 10.0, finishPosition:  3 },
          { gatePosition:  6, horseName: "No Hassle Hoff",    sp: 26.0, finishPosition: 14 },
          { gatePosition:  7, horseName: "Brelan D'As",       sp: 26.0, finishPosition: 17 },
          { gatePosition:  8, horseName: "Brillare Momento",  sp: 21.0, finishPosition:  8 },
          { gatePosition:  9, horseName: "Tommy Rapper",      sp: 17.0, finishPosition:  9 },
          { gatePosition: 10, horseName: "Coeur de Lion",     sp: 21.0, finishPosition: 15 },
          { gatePosition: 11, horseName: "Carter Mckay",      sp: 15.0, finishPosition: 11 },
          { gatePosition: 12, horseName: "Flawless Escape",   sp:  7.5, finishPosition: 12 },
          { gatePosition: 13, horseName: "Mr Big Shot",       sp: 15.0, finishPosition: 10 },
          { gatePosition: 14, horseName: "Arthington",        sp: 26.0, finishPosition: 18 },
          { gatePosition: 15, horseName: "Dream Berry",       sp: 21.0, finishPosition:  7 },
          { gatePosition: 16, horseName: "Delire D'Estruval", sp: 13.0, finishPosition: 16 },
          { gatePosition: 17, horseName: "Brave Eagle",       sp: 15.0, finishPosition: 13 },
          { gatePosition: 18, horseName: "Melrose Boy",       sp: 17.0, finishPosition: 19 },
          { gatePosition: 20, horseName: "Lough Derg Spirit", sp: 17.0, finishPosition:  6 },
          { gatePosition: 21, horseName: "Deal D'Estruval",   sp: 11.0, finishPosition: 21 },
          { gatePosition: 22, horseName: "Poppy Kay",         sp: 34.0, finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Discorama",         sp: 34.0, finishPosition:  2 },
          { gatePosition: 24, horseName: "Burrows Saint",     sp: 26.0, finishPosition: 22 },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2019 – 14 March (Thursday / St Patrick's Day) ──────────────────────────
  2019: {
    date: "14 March 2019",
    races: [
      {
        raceName: "Turners Novices' Chase",
        fieldSize: 10,
        top3: [
          { gatePosition:  2, horseName: "Defi Du Seuil",     sp:  4.0  },
          { gatePosition:  4, horseName: "Lostintranslation", sp:  5.0  },
          { gatePosition:  5, horseName: "Mengli Khan",       sp: 10.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Capeland",          sp: 29.0,  finishPosition:  8 },
          { gatePosition:  2, horseName: "Defi Du Seuil",     sp:  4.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Kildisart",         sp: 10.0,  finishPosition:  4 },
          { gatePosition:  4, horseName: "Lostintranslation", sp:  5.0,  finishPosition:  2 },
          { gatePosition:  5, horseName: "Mengli Khan",       sp: 10.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Real Steel",        sp:  7.5,  finishPosition:  6 },
          { gatePosition:  7, horseName: "Vinndication",      sp:  6.5,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Voix Du Reve",      sp: 10.0,  finishPosition: null }, // UR
          { gatePosition:  9, horseName: "Castafiore",        sp: 34.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "Pravalaguna",       sp: 15.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Pertemps Final",
        fieldSize: 24,
        top3: [
          { gatePosition:  3, horseName: "Sire Du Berlais", sp:  5.0  },
          { gatePosition: 19, horseName: "Tobefair",        sp: 41.0  },
          { gatePosition: 11, horseName: "Not Many Left",   sp: 17.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Walk To Freedom",    sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  2, horseName: "A Toi Phil",         sp: 21.0,  finishPosition:  5 },
          { gatePosition:  3, horseName: "Sire Du Berlais",    sp:  5.0,  finishPosition:  1 },
          { gatePosition:  4, horseName: "Boyhood",            sp: 26.0,  finishPosition: 15 },
          { gatePosition:  5, horseName: "Padleyourowncanoe",  sp: 51.0,  finishPosition:  8 },
          { gatePosition:  6, horseName: "First Assignment",   sp:  8.5,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Eminent Poet",       sp: 67.0,  finishPosition: 16 },
          { gatePosition:  8, horseName: "Aaron Lad",          sp: 17.0,  finishPosition: 14 },
          { gatePosition:  9, horseName: "Culture De Sivola",  sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Black Mischief",     sp: 51.0,  finishPosition: 11 },
          { gatePosition: 11, horseName: "Not Many Left",      sp: 17.0,  finishPosition:  3 },
          { gatePosition: 12, horseName: "Coole Cody",         sp: 34.0,  finishPosition: 17 },
          { gatePosition: 13, horseName: "Theclockisticking",  sp: 26.0,  finishPosition:  6 },
          { gatePosition: 14, horseName: "Thermistocles",      sp: 10.0,  finishPosition:  7 },
          { gatePosition: 15, horseName: "Flemcara",           sp: 15.0,  finishPosition: 10 },
          { gatePosition: 16, horseName: "Cuneo",              sp: 13.0,  finishPosition:  4 },
          { gatePosition: 17, horseName: "Oh Land Abloom",     sp: 67.0,  finishPosition: 13 },
          { gatePosition: 18, horseName: "Wait For Me",        sp: 34.0,  finishPosition: null }, // UR
          { gatePosition: 19, horseName: "Tobefair",           sp: 41.0,  finishPosition:  2 },
          { gatePosition: 20, horseName: "Samburu Shujaa",     sp:  9.5,  finishPosition: 12 },
          { gatePosition: 21, horseName: "Notwhatiam",         sp: 17.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Champers On Ice",    sp: 11.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Abolitionist",       sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 24, horseName: "Aspen Colorado",     sp: 34.0,  finishPosition: 18 },
        ],
      },
      {
        raceName: "Ryanair Chase",
        fieldSize: 12,
        top3: [
          { gatePosition:  6, horseName: "Frodon",          sp:  5.5  },
          { gatePosition:  1, horseName: "Aso",             sp: 34.0  },
          { gatePosition:  8, horseName: "Road To Respect", sp:  5.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Aso",             sp: 34.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "Balko Des Flos",  sp: 17.0,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Charbel",         sp: 41.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Coney Island",    sp: 26.0,  finishPosition:  6 },
          { gatePosition:  5, horseName: "Footpad",         sp:  4.5,  finishPosition:  8 },
          { gatePosition:  6, horseName: "Frodon",          sp:  5.5,  finishPosition:  1 },
          { gatePosition:  7, horseName: "Monalee",         sp:  6.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Road To Respect", sp:  5.5,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Sub Lieutenant",  sp: 67.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Terrefort",       sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 11, horseName: "The Storyteller", sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Un De Sceaux",    sp:  6.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Stayers' Hurdle",
        fieldSize: 18,
        top3: [
          { gatePosition: 10, horseName: "Paisley Park",  sp:  2.375 },
          { gatePosition: 12, horseName: "Sam Spinner",   sp: 34.0   },
          { gatePosition:  5, horseName: "Faugheen",      sp:  5.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Bacardys",        sp: 21.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Bapaume",         sp: 17.0,  finishPosition:  4 },
          { gatePosition:  3, horseName: "Black Op",        sp: 15.0,  finishPosition: 12 },
          { gatePosition:  4, horseName: "Coquin Mans",     sp:101.0,  finishPosition: 17 },
          { gatePosition:  5, horseName: "Faugheen",        sp:  5.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Keeper Hill",     sp: 67.0,  finishPosition: 10 },
          { gatePosition:  7, horseName: "Kilbricken Storm",sp: 17.0,  finishPosition: 11 },
          { gatePosition:  8, horseName: "Man Of Plenty",   sp:201.0,  finishPosition: 16 },
          { gatePosition:  9, horseName: "Nautical Nitwit", sp:101.0,  finishPosition: 18 },
          { gatePosition: 10, horseName: "Paisley Park",    sp:  2.375,finishPosition:  1 },
          { gatePosition: 11, horseName: "Petit Mouchoir",  sp: 26.0,  finishPosition: 14 },
          { gatePosition: 12, horseName: "Sam Spinner",     sp: 34.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Supasundae",      sp: 10.0,  finishPosition:  7 },
          { gatePosition: 14, horseName: "The Mighty Don",  sp: 67.0,  finishPosition:  8 },
          { gatePosition: 15, horseName: "Top Notch",       sp: 13.0,  finishPosition: 15 },
          { gatePosition: 16, horseName: "West Approach",   sp: 34.0,  finishPosition:  9 },
          { gatePosition: 17, horseName: "Wholestone",      sp: 34.0,  finishPosition:  5 },
          { gatePosition: 18, horseName: "Yanworth",        sp: 34.0,  finishPosition: 13 },
        ],
      },
      {
        raceName: "Plate Handicap Chase",
        fieldSize: 22,
        top3: [
          { gatePosition: 12, horseName: "Siruh Du Lac",     sp:  5.5  },
          { gatePosition:  1, horseName: "Janika",           sp:  4.0  },
          { gatePosition:  3, horseName: "Spiritofthegames", sp:  7.0  },
        ],
        field: [
          // NR: Ballyhill, Romain De Senam
          { gatePosition:  1, horseName: "Janika",            sp:  4.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "River Wylde",       sp: 11.0,  finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Spiritofthegames",  sp:  7.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "Modus",             sp: 21.0,  finishPosition: 16 },
          { gatePosition:  5, horseName: "Kalondra",          sp: 13.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Valseur Lido",      sp: 34.0,  finishPosition: 14 },
          { gatePosition:  7, horseName: "Kauto Riko",        sp: 67.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Bigmartre",         sp: 41.0,  finishPosition: 12 },
          { gatePosition:  9, horseName: "Polidam",           sp: 34.0,  finishPosition: 13 },
          { gatePosition: 11, horseName: "Bouvreuil",         sp: 34.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "Siruh Du Lac",      sp:  5.5,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Some Buckle",       sp: 67.0,  finishPosition:  9 },
          { gatePosition: 14, horseName: "Templehills",       sp:101.0,  finishPosition: 10 },
          { gatePosition: 15, horseName: "Doitforthevillage", sp: 17.0,  finishPosition: 11 },
          { gatePosition: 16, horseName: "Voix D'Eau",        sp:101.0,  finishPosition: 15 },
          { gatePosition: 17, horseName: "Testify",           sp: 34.0,  finishPosition: null }, // PU
          { gatePosition: 18, horseName: "Gardefort",         sp: 29.0,  finishPosition: null }, // PU
          { gatePosition: 19, horseName: "Azzerti",           sp: 21.0,  finishPosition:  7 },
          { gatePosition: 21, horseName: "Eamon An Cnoic",    sp: 11.0,  finishPosition:  4 },
          { gatePosition: 22, horseName: "Splash Of Ginge",   sp: 26.0,  finishPosition: 17 },
          { gatePosition: 23, horseName: "King's Odyssey",    sp: 21.0,  finishPosition: null }, // F
          { gatePosition: 24, horseName: "Didero Vallis",     sp: 17.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Dawn Run Mares' Hurdle",
        fieldSize: 22,
        top3: [
          { gatePosition: 16, horseName: "Eglantine Du Seuil", sp: 51.0  },
          { gatePosition: 13, horseName: "Concertista",        sp: 67.0  },
          { gatePosition:  9, horseName: "Tintangle",          sp: 41.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Posh Trish",         sp:  4.0,  finishPosition:  8 },
          { gatePosition:  2, horseName: "Queenohearts",       sp: 11.0,  finishPosition: 10 },
          { gatePosition:  3, horseName: "Sancta Simona",      sp: 21.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Sinoria",            sp: 12.0,  finishPosition: 19 },
          { gatePosition:  5, horseName: "Awayinthewest",      sp:101.0,  finishPosition: 18 },
          { gatePosition:  6, horseName: "Court Maid",         sp:101.0,  finishPosition: 12 },
          { gatePosition:  7, horseName: "Lust For Glory",     sp: 21.0,  finishPosition: 15 },
          { gatePosition:  8, horseName: "Presidente Line",    sp:101.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Tintangle",          sp: 41.0,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Allez Dance",        sp: 41.0,  finishPosition: 17 },
          { gatePosition: 11, horseName: "Black Tears",        sp: 26.0,  finishPosition:  4 },
          { gatePosition: 12, horseName: "Buildmeupbuttercup", sp: 67.0,  finishPosition: 11 },
          { gatePosition: 13, horseName: "Concertista",        sp: 67.0,  finishPosition:  2 },
          { gatePosition: 14, horseName: "Dame Du Soir",       sp:101.0,  finishPosition: null }, // PU
          { gatePosition: 15, horseName: "Diamond Gait",       sp:101.0,  finishPosition: 16 },
          { gatePosition: 16, horseName: "Eglantine Du Seuil", sp: 51.0,  finishPosition:  1 },
          { gatePosition: 17, horseName: "Elfile",             sp: 51.0,  finishPosition:  6 },
          { gatePosition: 18, horseName: "Elusive Belle",      sp: 21.0,  finishPosition: 14 },
          { gatePosition: 19, horseName: "Emily Moon",         sp: 26.0,  finishPosition: null }, // PU
          { gatePosition: 20, horseName: "Epatante",           sp:  2.875,finishPosition:  9 },
          { gatePosition: 21, horseName: "Indefatigable",      sp: 34.0,  finishPosition:  5 },
          { gatePosition: 22, horseName: "My Sister Sarah",    sp:  7.5,  finishPosition: 13 },
        ],
      },
      {
        raceName: "Kim Muir",
        fieldSize: 23,
        top3: [
          { gatePosition:  2, horseName: "Any Second Now",  sp:  7.0  },
          { gatePosition:  8, horseName: "Kilfilum Cross",  sp:  8.0  },
          { gatePosition:  3, horseName: "The Young Master",sp: 23.0  },
        ],
        field: [
          // NR: Out Sam
          { gatePosition:  1, horseName: "Livelovelaugh",    sp: 17.0,  finishPosition: 12 },
          { gatePosition:  2, horseName: "Any Second Now",   sp:  7.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "The Young Master", sp: 23.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "Pearl Royale",     sp: 67.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Crievehill",       sp: 41.0,  finishPosition:  4 },
          { gatePosition:  7, horseName: "Perfect Candidate",sp: 26.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Kilfilum Cross",   sp:  8.0,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Speaker Connolly", sp: 15.0,  finishPosition: null }, // UR
          { gatePosition: 10, horseName: "Arkwrisht",        sp: 34.0,  finishPosition: null }, // F
          { gatePosition: 11, horseName: "No Comment",       sp: 13.0,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Squouateur",       sp: 34.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Measureofmydreams",sp:  4.0,  finishPosition:  8 },
          { gatePosition: 14, horseName: "Sumkindofking",    sp: 67.0,  finishPosition: 14 },
          { gatePosition: 15, horseName: "Rogue Angel",      sp: 21.0,  finishPosition: 13 },
          { gatePosition: 16, horseName: "Just A Sting",     sp: 17.0,  finishPosition: 10 },
          { gatePosition: 17, horseName: "Ah Littleluck",    sp: 51.0,  finishPosition: 11 },
          { gatePosition: 18, horseName: "Captain Chaos",    sp: 21.0,  finishPosition:  6 },
          { gatePosition: 19, horseName: "Treackle Tart",    sp: 26.0,  finishPosition: 17 },
          { gatePosition: 20, horseName: "Sky Pirate",       sp: 17.0,  finishPosition:  7 },
          { gatePosition: 21, horseName: "Uhlan Bute",       sp: 51.0,  finishPosition: 16 },
          { gatePosition: 22, horseName: "Touch Kick",       sp: 12.0,  finishPosition:  9 },
          { gatePosition: 23, horseName: "Its All Guesswork",sp: 13.0,  finishPosition: 15 },
          { gatePosition: 24, horseName: "Drumconnor Lad",   sp:101.0,  finishPosition: null }, // F
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

// ─── 2020 – 13 March ────────────────────────────────────────────────────────
  2020: {
    date: "13 March 2020",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: 13,
        top3: [
          { gatePosition: 12, horseName: "Burning Victory",          sp: 13.0 },
          { gatePosition:  2, horseName: "Aspire Tower",             sp:  6.0 },
          { gatePosition:  1, horseName: "Allmankind",               sp:  4.5 },
        ],
        field: [
          { gatePosition:  1, horseName: "Allmankind",               sp:  4.5,  finishPosition:  3 },
          { gatePosition:  2, horseName: "Aspire Tower",             sp:  6.0,  finishPosition:  2 },
          { gatePosition:  3, horseName: "A Wave Of The Sea",        sp: 13.0,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Cerberus",                 sp: 21.0,  finishPosition:  6 },
          { gatePosition:  5, horseName: "Goshen",                   sp:  3.5,  finishPosition: null }, // UR at last — was ~10L clear
          { gatePosition:  6, horseName: "Lord Lamington",           sp: 101.0, finishPosition: 10 },
          { gatePosition:  7, horseName: "Navajo Pass",              sp: 51.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Never Do Nothing",         sp: 101.0, finishPosition:  9 },
          { gatePosition:  9, horseName: "Sir Psycho",               sp: 17.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Solo",                     sp:  5.0,  finishPosition:  8 },
          { gatePosition: 11, horseName: "Yellow Tiger",             sp: 101.0, finishPosition: 12 },
          { gatePosition: 12, horseName: "Burning Victory",          sp: 13.0,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Hook Up",                  sp: 34.0,  finishPosition: 11 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 24,
        top3: [
          { gatePosition: 18, horseName: "Saint Roi",                sp:  6.5 },
          { gatePosition:  2, horseName: "Aramon",                   sp:  9.0 },
          { gatePosition:  3, horseName: "Embittered",               sp: 15.0 },
        ],
        field: [
          // Cloth 1-11 confirmed directly from Racing Post; 12-24 approximate per source
          { gatePosition:  1, horseName: "Fact Of The Matter",       sp: 21.0,  finishPosition: 14 },
          { gatePosition:  2, horseName: "Aramon",                   sp:  9.0,  finishPosition:  2 },
          { gatePosition:  3, horseName: "Embittered",               sp: 15.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "Malone Road",              sp: 15.0,  finishPosition: 17 },
          { gatePosition:  5, horseName: "Petit Mouchoir",           sp: 15.0,  finishPosition: 13 },
          { gatePosition:  6, horseName: "Scaramanga",               sp: 51.0,  finishPosition: 11 },
          { gatePosition:  7, horseName: "Mohaayed",                 sp: 12.0,  finishPosition: 10 },
          { gatePosition:  8, horseName: "Hardline",                 sp: 11.0,  finishPosition: 16 },
          { gatePosition:  9, horseName: "Moon Over Germany",        sp: 26.0,  finishPosition:  6 },
          { gatePosition: 10, horseName: "Buildmeupbuttercup",       sp: 17.0,  finishPosition:  4 },
          { gatePosition: 11, horseName: "Band Of Outlaws",          sp: 17.0,  finishPosition: 24 },
          { gatePosition: 12, horseName: "Sharjah",                  sp:  9.0,  finishPosition: 20 }, // ⚠ approx
          { gatePosition: 13, horseName: "Global Citizen",           sp: 26.0,  finishPosition: 22 },
          { gatePosition: 15, horseName: "Thatsy",                   sp:  9.0,  finishPosition:  7 },
          { gatePosition: 16, horseName: "Abacadabras",              sp:  9.0,  finishPosition: 12 },
          { gatePosition: 17, horseName: "Beat The Judge",           sp: 67.0,  finishPosition:  8 },
          { gatePosition: 18, horseName: "Saint Roi",                sp:  6.5,  finishPosition:  1 },
          { gatePosition: 19, horseName: "Coeur Sublime",            sp: 34.0,  finishPosition: 21 },
          { gatePosition: 20, horseName: "Elusive Belle",            sp: 21.0,  finishPosition:  5 },
          { gatePosition: 21, horseName: "Espoir D'Allen",           sp: 11.0,  finishPosition: 18 },
          { gatePosition: 22, horseName: "Carefully Selected",       sp: 26.0,  finishPosition: 19 },
          { gatePosition: 23, horseName: "Eglantine Du Seuil",       sp: 21.0,  finishPosition: 15 },
          { gatePosition: 24, horseName: "Felix Desjy",              sp: 17.0,  finishPosition: 23 },
          { gatePosition: 25, horseName: "Sir Valentine",            sp: 21.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 19,
        top3: [
          { gatePosition: 12, horseName: "Monkfish",                 sp:  6.0 },
          { gatePosition: 10, horseName: "Latest Exhibition",        sp:  5.5 },
          { gatePosition:  5, horseName: "Fury Road",                sp:  6.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Aione",                    sp: 34.0,  finishPosition: 10 },
          { gatePosition:  2, horseName: "Cat Tiger",                sp: 51.0,  finishPosition: null },
          { gatePosition:  3, horseName: "Cobbler's Way",            sp: 15.0,  finishPosition: null },
          { gatePosition:  4, horseName: "Foxy Jacks",               sp: 101.0, finishPosition:  9 },
          { gatePosition:  5, horseName: "Fury Road",                sp:  6.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Harry Senior",             sp: 17.0,  finishPosition: null },
          { gatePosition:  7, horseName: "House Island",             sp: 67.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Janidil",                  sp: 17.0,  finishPosition:  5 },
          { gatePosition:  9, horseName: "Kiltealy Briggs",          sp: 101.0, finishPosition: null },
          { gatePosition: 10, horseName: "Latest Exhibition",        sp:  5.5,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Lieutenant Rocco",         sp: 34.0,  finishPosition: null },
          { gatePosition: 12, horseName: "Monkfish",                 sp:  6.0,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Oscar Academy",            sp: 101.0, finishPosition: 12 },
          { gatePosition: 14, horseName: "Ramses De Teillee",        sp: 13.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Redford Road",             sp: 41.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "Sempo",                    sp: 13.0,  finishPosition:  6 },
          { gatePosition: 17, horseName: "The Wolf",                 sp: 101.0, finishPosition:  7 },
          { gatePosition: 18, horseName: "The Cashel Man",           sp: 26.0,  finishPosition: 11 },
          { gatePosition: 19, horseName: "Thyme Hill",               sp:  5.0,  finishPosition:  4 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 12,
        top3: [
          { gatePosition:  1, horseName: "Al Boum Photo",            sp:  4.33 },
          { gatePosition: 12, horseName: "Santini",                  sp:  6.0  },
          { gatePosition:  8, horseName: "Lostintranslation",        sp: 11.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Al Boum Photo",            sp:  4.33, finishPosition:  1 },
          { gatePosition:  2, horseName: "Bristol De Mai",           sp: 19.0,  finishPosition:  9 },
          { gatePosition:  3, horseName: "Chris's Dream",            sp: 21.0,  finishPosition: 10 },
          { gatePosition:  4, horseName: "Clan Des Obeaux",          sp:  8.0,  finishPosition:  8 },
          { gatePosition:  5, horseName: "Delta Work",               sp:  6.0,  finishPosition:  5 },
          { gatePosition:  6, horseName: "Elegant Escape",           sp: 67.0,  finishPosition: 11 },
          { gatePosition:  7, horseName: "Kemboy",                   sp:  9.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "Lostintranslation",        sp: 11.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Monalee",                  sp: 21.0,  finishPosition:  4 },
          { gatePosition: 10, horseName: "Presenting Percy",         sp: 11.0,  finishPosition: null }, // F 2nd last
          { gatePosition: 11, horseName: "Real Steel",               sp: 51.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "Santini",                  sp:  6.0,  finishPosition:  2 },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 21,
        top3: [
          { gatePosition: 12, horseName: "It Came To Pass",          sp: 67.0 },
          { gatePosition:  3, horseName: "Billaway",                 sp:  3.75 },
          { gatePosition: 19, horseName: "Shantou Flyer",            sp:  4.0 },
        ],
        field: [
          // NR: Chosen Dream, Don Bersy, Hazel Hill
          { gatePosition:  1, horseName: "Alcala",                   sp: 34.0,  finishPosition:  9 },
          { gatePosition:  2, horseName: "Arctic Skipper",           sp: 101.0, finishPosition: 12 },
          { gatePosition:  3, horseName: "Billaway",                 sp:  3.75, finishPosition:  2 },
          { gatePosition:  4, horseName: "Bishops Road",             sp: 34.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Caid Du Berlais",          sp:  9.0,  finishPosition: null },
          { gatePosition:  8, horseName: "Don Poli",                 sp: 26.0,  finishPosition: 11 },
          { gatePosition:  9, horseName: "Duhallow Tornado",         sp: 67.0,  finishPosition: 14 },
          { gatePosition: 10, horseName: "Dylrow",                   sp: 51.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "It Came To Pass",          sp: 67.0,  finishPosition:  1 },
          { gatePosition: 13, horseName: "Law Of Gold",              sp: 13.0,  finishPosition:  7 },
          { gatePosition: 14, horseName: "Marcle Ridge",             sp: 101.0, finishPosition:  6 },
          { gatePosition: 15, horseName: "Minella Rocco",            sp:  6.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Mr Mercurial",             sp: 101.0, finishPosition: 16 },
          { gatePosition: 17, horseName: "Rewritetherules",          sp: 51.0,  finishPosition: null },
          { gatePosition: 18, horseName: "Sausalito Sunrise",        sp: 101.0, finishPosition: 17 },
          { gatePosition: 19, horseName: "Shantou Flyer",            sp:  4.0,  finishPosition:  3 },
          { gatePosition: 20, horseName: "Southfield Theatre",       sp: 51.0,  finishPosition: 15 },
          { gatePosition: 21, horseName: "Staker Wallace",           sp:  8.5,  finishPosition:  4 },
          { gatePosition: 22, horseName: "Stellar Notion",           sp: 101.0, finishPosition: null },
          { gatePosition: 23, horseName: "Top Wood",                 sp: 26.0,  finishPosition: 13 },
          { gatePosition: 24, horseName: "Kalabaloo",                sp: 41.0,  finishPosition:  8 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 18,
        top3: [
          { gatePosition: 10, horseName: "Chosen Mate",              sp:  4.5 },
          { gatePosition:  8, horseName: "Eclair De Beaufeu",        sp:  7.5 },
          { gatePosition:  9, horseName: "Us And Them",              sp: 11.0 },
        ],
        field: [
          // NR: Adrrastos, Caid Du Lin
          { gatePosition:  1, horseName: "Great Field",              sp: 34.0,  finishPosition: null },
          { gatePosition:  2, horseName: "Marracudja",               sp: 51.0,  finishPosition: 13 },
          { gatePosition:  3, horseName: "Capeland",                 sp: 26.0,  finishPosition: 14 },
          { gatePosition:  4, horseName: "Paloma Blue",              sp:  9.5,  finishPosition: 12 },
          { gatePosition:  5, horseName: "Mcgroarty",                sp: 51.0,  finishPosition: null },
          { gatePosition:  6, horseName: "Gino Trail",               sp: 21.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Greaneteen",               sp:  6.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Eclair De Beaufeu",        sp:  7.5,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Us And Them",              sp: 11.0,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Chosen Mate",              sp:  4.5,  finishPosition:  1 },
          { gatePosition: 11, horseName: "Ballywood",                sp: 29.0,  finishPosition:  6 },
          { gatePosition: 13, horseName: "Winter Escape",            sp: 34.0,  finishPosition: 15 },
          { gatePosition: 14, horseName: "Two Taffs",                sp: 15.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Croco Bay",                sp: 26.0,  finishPosition:  9 },
          { gatePosition: 16, horseName: "Lisp",                     sp:  8.0,  finishPosition:  7 },
          { gatePosition: 17, horseName: "Jan Maat",                 sp: 13.0,  finishPosition: 10 },
          { gatePosition: 19, horseName: "Theinval",                 sp: 51.0,  finishPosition:  5 },
          { gatePosition: 20, horseName: "The Bay Birch",            sp: 51.0,  finishPosition:  8 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 21,
        top3: [
          { gatePosition:  2, horseName: "Indefatigable",            sp: 26.0 },
          { gatePosition: 18, horseName: "Pileon",                   sp: 10.0 },
          { gatePosition: 24, horseName: "Great White Shark",        sp: 41.0 },
        ],
        field: [
          // NR: Assemble (vet cert), Braid Blue (unsuitable ground)
          { gatePosition:  2, horseName: "Indefatigable",            sp: 26.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Five O'Clock",             sp:  8.0,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Column Of Fire",           sp:  7.5,  finishPosition: null }, // F
          { gatePosition:  5, horseName: "Espoir De Romay",          sp: 21.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "Doctor Duffy",             sp: 21.0,  finishPosition: 10 },
          { gatePosition:  8, horseName: "Mill Green",               sp: 67.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Umbrigado",                sp: 10.0,  finishPosition: 11 },
          { gatePosition: 10, horseName: "Big Blue",                 sp: 67.0,  finishPosition: 19 },
          { gatePosition: 11, horseName: "My Sister Sarah",          sp: 34.0,  finishPosition: null }, // BD
          { gatePosition: 12, horseName: "Front View",               sp:  5.0,  finishPosition: 12 },
          { gatePosition: 13, horseName: "Ilikedwayurthinkin",       sp:  7.5,  finishPosition:  8 },
          { gatePosition: 14, horseName: "Cliffs Of Dover",          sp: 67.0,  finishPosition: 18 },
          { gatePosition: 15, horseName: "The Bosses Oscar",         sp: 12.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Anything Will Do",         sp: 67.0,  finishPosition: 16 },
          { gatePosition: 17, horseName: "Flash The Steel",          sp: 21.0,  finishPosition:  9 },
          { gatePosition: 18, horseName: "Pileon",                   sp: 10.0,  finishPosition:  2 },
          { gatePosition: 20, horseName: "Thomas Macdonagh",         sp: 51.0,  finishPosition: 14 },
          { gatePosition: 21, horseName: "Ecco",                     sp: 51.0,  finishPosition: 17 },
          { gatePosition: 22, horseName: "Happygolucky",             sp: 26.0,  finishPosition:  4 },
          { gatePosition: 24, horseName: "Great White Shark",        sp: 41.0,  finishPosition:  3 },
          { gatePosition: 25, horseName: "Escaria Ten",              sp: 17.0,  finishPosition: 15 },
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2021 – 19 March ────────────────────────────────────────────────────────
  2021: {
    date: "19 March 2021",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: 8,
        top3: [
          { gatePosition:  4, horseName: "Quilixios",          sp:  3.0  },
          { gatePosition:  1, horseName: "Adagio",             sp: 11.0  },
          { gatePosition:  2, horseName: "Haut En Couleurs",   sp: 21.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Adagio",             sp: 11.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "Haut En Couleurs",   sp: 21.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Historic Heart",     sp: 126.0, finishPosition:  8 },
          { gatePosition:  4, horseName: "Quilixios",          sp:  3.0,  finishPosition:  1 },
          { gatePosition:  5, horseName: "Tax For Max",        sp: 34.0,  finishPosition:  6 },
          { gatePosition:  6, horseName: "Tritonic",           sp:  5.0,  finishPosition:  5 },
          { gatePosition:  7, horseName: "Zanahiyr",           sp:  2.375, finishPosition: 4 },
          { gatePosition:  8, horseName: "Talking About You",  sp: 126.0, finishPosition:  7 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 25,
        top3: [
          { gatePosition: 26, horseName: "Belfast Banter",     sp: 34.0  },
          { gatePosition:  1, horseName: "Petit Mouchoir",     sp: 23.0  },
          { gatePosition: 15, horseName: "Milkwood",           sp: 29.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Petit Mouchoir",        sp: 23.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "Global Citizen",         sp: 101.0, finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Cayd Boy",               sp: 23.0,  finishPosition: 13 },
          { gatePosition:  4, horseName: "Edwardstone",            sp: 19.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Darasso",                sp: 81.0,  finishPosition: 19 },
          { gatePosition:  6, horseName: "Buildmeupbuttercup",     sp: 26.0,  finishPosition: 24 },
          { gatePosition:  7, horseName: "Drop The Anchor",        sp: 34.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Champagne Gold",         sp:  7.0,  finishPosition: 17 },
          { gatePosition: 10, horseName: "Third Time Lucki",       sp:  9.0,  finishPosition:  6 },
          { gatePosition: 11, horseName: "Mengli Khan",            sp: 67.0,  finishPosition: 21 },
          { gatePosition: 12, horseName: "You Raised Me Up",       sp:  6.0,  finishPosition: 10 },
          { gatePosition: 13, horseName: "Wolf Prince",            sp: 67.0,  finishPosition: 22 },
          { gatePosition: 14, horseName: "Thyme White",            sp: 29.0,  finishPosition: 12 },
          { gatePosition: 15, horseName: "Milkwood",               sp: 29.0,  finishPosition:  3 },
          { gatePosition: 16, horseName: "Ciel De Neige",          sp: 23.0,  finishPosition:  9 },
          { gatePosition: 17, horseName: "Ganapathi",              sp:  7.0,  finishPosition: 14 },
          { gatePosition: 18, horseName: "Eclair De Beaufeu",      sp: 12.0,  finishPosition:  4 },
          { gatePosition: 19, horseName: "Saint D'Oroux",          sp: 41.0,  finishPosition: 15 },
          { gatePosition: 20, horseName: "Gowel Road",             sp: 13.0,  finishPosition: 20 },
          { gatePosition: 21, horseName: "Getaway Gorgeous",       sp: 67.0,  finishPosition: 23 },
          { gatePosition: 22, horseName: "Anna Bunina",            sp: 126.0, finishPosition:  8 },
          { gatePosition: 23, horseName: "Fifty Ball",             sp: 13.0,  finishPosition: 16 },
          { gatePosition: 24, horseName: "Captain Kangaroo",       sp: 19.0,  finishPosition: 11 },
          { gatePosition: 25, horseName: "Strong Glance",          sp: 41.0,  finishPosition: 18 },
          { gatePosition: 26, horseName: "Belfast Banter",         sp: 34.0,  finishPosition:  1 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 16,
        top3: [
          { gatePosition: 17, horseName: "Vanillier",          sp: 15.0  },
          { gatePosition: 10, horseName: "Oscar Elite",        sp: 41.0  },
          { gatePosition: 13, horseName: "Streets Of Doyen",   sp: 11.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Adrimel",            sp: 10.0,  finishPosition: null }, // PU
          { gatePosition:  2, horseName: "Alaphilippe",        sp: 12.0,  finishPosition:  5 },
          { gatePosition:  3, horseName: "Ask A Honey Bee",    sp: 81.0,  finishPosition: 14 },
          { gatePosition:  4, horseName: "Barbados Buck's",    sp:  9.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Beatthebullet",      sp: 201.0, finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Champagnesuperover", sp: 101.0, finishPosition:  7 },
          { gatePosition:  8, horseName: "Fakiera",            sp:  5.0,  finishPosition: 10 },
          { gatePosition:  9, horseName: "N'Golo",             sp: 41.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Oscar Elite",        sp: 41.0,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Pats Fancy",         sp: 29.0,  finishPosition: 13 },
          { gatePosition: 12, horseName: "Stattler",           sp:  4.5,  finishPosition:  4 },
          { gatePosition: 13, horseName: "Streets Of Doyen",   sp: 11.0,  finishPosition:  3 },
          { gatePosition: 14, horseName: "The Cob",            sp: 29.0,  finishPosition: 12 },
          { gatePosition: 15, horseName: "Threeunderthrufive", sp: 12.0,  finishPosition:  6 },
          { gatePosition: 16, horseName: "Torygraph",          sp:  8.0,  finishPosition:  8 },
          { gatePosition: 17, horseName: "Vanillier",          sp: 15.0,  finishPosition:  1 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 12,
        top3: [
          { gatePosition:  9, horseName: "Minella Indo",       sp: 10.0  },
          { gatePosition:  2, horseName: "A Plus Tard",        sp:  4.333 },
          { gatePosition:  1, horseName: "Al Boum Photo",      sp:  3.25 },
        ],
        field: [
          { gatePosition:  1, horseName: "Al Boum Photo",      sp:  3.25,  finishPosition:  3 },
          { gatePosition:  2, horseName: "A Plus Tard",        sp:  4.333, finishPosition:  2 },
          { gatePosition:  3, horseName: "Aso",                sp: 151.0,  finishPosition:  8 },
          { gatePosition:  4, horseName: "Black Op",           sp: 126.0,  finishPosition:  7 },
          { gatePosition:  5, horseName: "Kemboy",             sp: 17.0,   finishPosition:  9 }, // ⚠ cloth inferred
          { gatePosition:  6, horseName: "Frodon",             sp: 17.0,   finishPosition:  5 },
          { gatePosition:  7, horseName: "Champ",              sp:  7.5,   finishPosition: null }, // PU — cloth inferred
          { gatePosition:  8, horseName: "Santini",            sp: 13.0,   finishPosition: null }, // PU — cloth inferred
          { gatePosition:  9, horseName: "Minella Indo",       sp: 10.0,   finishPosition:  1 },
          { gatePosition: 10, horseName: "Native River",       sp: 13.0,   finishPosition:  4 },
          { gatePosition: 11, horseName: "Royale Pagaille",    sp: 15.0,   finishPosition:  6 },
          { gatePosition: 12, horseName: "Lostintranslation",  sp: 41.0,   finishPosition: null }, // PU — cloth inferred
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 18,
        top3: [
          { gatePosition: 11, horseName: "Porlock Bay",        sp: 17.0  },
          { gatePosition:  1, horseName: "Billaway",           sp:  3.0  },
          { gatePosition: 16, horseName: "Staker Wallace",     sp: 10.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Billaway",           sp:  3.0,  finishPosition:  2 },
          { gatePosition:  2, horseName: "Bob And Co",         sp:  5.5,  finishPosition: null }, // UR
          { gatePosition:  3, horseName: "Chameron",           sp: 15.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Hazel Hill",         sp: 26.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "It Came To Pass",    sp: 11.0,  finishPosition:  7 },
          { gatePosition:  6, horseName: "Latenightpass",      sp: 13.0,  finishPosition:  4 },
          { gatePosition:  7, horseName: "Law Of Gold",        sp: 126.0, finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Mighty Stowaway",    sp: 34.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Monbeg Gold",        sp: 81.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Mr Mantilla",        sp: 41.0,  finishPosition:  8 },
          { gatePosition: 11, horseName: "Porlock Bay",        sp: 17.0,  finishPosition:  1 },
          { gatePosition: 12, horseName: "Ravished",           sp: 151.0, finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Red Indian",         sp: 13.0,  finishPosition:  9 },
          { gatePosition: 14, horseName: "Salvatore",          sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 15, horseName: "Sonneofpresenting",  sp: 251.0, finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Staker Wallace",     sp: 10.0,  finishPosition:  3 },
          { gatePosition: 17, horseName: "Stand Up And Fight", sp: 12.0,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Wishing And Hoping", sp: 51.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: 11,
        top3: [
          { gatePosition:  1, horseName: "Colreevy",           sp:  3.25 },
          { gatePosition:  2, horseName: "Elimay",             sp:  2.2  },
          { gatePosition: 10, horseName: "Shattered Love",     sp:  7.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Colreevy",           sp:  3.25, finishPosition:  1 },
          { gatePosition:  2, horseName: "Elimay",             sp:  2.2,  finishPosition:  2 },
          { gatePosition:  3, horseName: "Salsaretta",         sp: 41.0,  finishPosition:  4 },
          { gatePosition:  4, horseName: "Cabaret Queen",      sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  5, horseName: "Chilli Filli",       sp: 81.0,  finishPosition:  6 },
          { gatePosition:  6, horseName: "Cut The Mustard",    sp: 51.0,  finishPosition:  7 },
          { gatePosition:  7, horseName: "Magic Of Light",     sp: 12.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Moyhenna",           sp: 29.0,  finishPosition:  5 },
          { gatePosition:  9, horseName: "Really Super",       sp: 81.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Shattered Love",     sp:  7.0,  finishPosition:  3 },
          { gatePosition: 11, horseName: "Zambella",           sp: 29.0,  finishPosition: null }, // F
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 22,
        top3: [
          { gatePosition:  5, horseName: "Galopin Des Champs", sp:  9.0  },
          { gatePosition: 22, horseName: "Langer Dan",         sp:  7.5  },
          { gatePosition:  1, horseName: "Floueur",            sp: 34.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Floueur",            sp: 34.0,  finishPosition:  3 },
          { gatePosition:  2, horseName: "Eglantine Du Seuil", sp: 34.0,  finishPosition: 11 },
          { gatePosition:  3, horseName: "Leoncavallo",        sp: 29.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Dallas Des Pictons", sp: 67.0,  finishPosition:  5 },
          { gatePosition:  5, horseName: "Galopin Des Champs", sp:  9.0,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Amour de Nuit",      sp: 101.0, finishPosition:  9 },
          { gatePosition:  7, horseName: "Gabynako",           sp:  5.5,  finishPosition: null }, // UR
          { gatePosition:  9, horseName: "Mill Green",         sp: 41.0,  finishPosition:  7 },
          { gatePosition: 11, horseName: "Gentleman De Mee",   sp:  5.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "Fire Attack",        sp:  9.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Commandingpresence", sp: 23.0,  finishPosition: 15 },
          { gatePosition: 14, horseName: "First Lord De Cuet", sp: 51.0,  finishPosition: 14 },
          { gatePosition: 15, horseName: "Fabulous Saga",      sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Whatsupwithyou",     sp: 34.0,  finishPosition:  4 },
          { gatePosition: 17, horseName: "Clondaw Cian",       sp: 101.0, finishPosition: 12 },
          { gatePosition: 18, horseName: "Frontal Assault",    sp: 17.0,  finishPosition:  8 },
          { gatePosition: 19, horseName: "Dream Berry",        sp: 67.0,  finishPosition: 13 },
          { gatePosition: 20, horseName: "Dolciano Dici",      sp: 301.0, finishPosition: 16 },
          { gatePosition: 21, horseName: "Adjali",             sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Langer Dan",         sp:  7.5,  finishPosition:  2 },
          { gatePosition: 24, horseName: "Martinhal",          sp: 19.0,  finishPosition: 17 },
          { gatePosition: 25, horseName: "Folcano",            sp:  8.5,  finishPosition: null }, // UR
        ],
      },
    ],
    leaderboard: [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
    ],
  },

  // ─── 2022 – 18 March ────────────────────────────────────────────────────────
  2022: {
    date: "18 March 2022",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: 12,
        top3: [
          { gatePosition: 12, horseName: "Vauban",     sp:  2.5 },
          { gatePosition:  3, horseName: "Fil Dor",    sp:  6.5 },
          { gatePosition:  9, horseName: "Pied Piper", sp:  4.5 },
        ],
        field: [
          { gatePosition:  1, horseName: "Ages Of Man",      sp: 201.0, finishPosition: 12 },
          { gatePosition:  2, horseName: "Koi Dodville",     sp: 201.0, finishPosition: 11 },
          { gatePosition:  3, horseName: "Fil Dor",          sp:  6.5,  finishPosition:  2 },
          { gatePosition:  4, horseName: "Doctor Parnassus", sp: 26.0,  finishPosition:  7 },
          { gatePosition:  5, horseName: "Knight Salute",    sp: 17.0,  finishPosition:  9 },
          { gatePosition:  6, horseName: "Lunar Power",      sp: 81.0,  finishPosition:  8 },
          { gatePosition:  7, horseName: "Icare Allen",      sp: 11.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Il Etait Temps",   sp: 13.0,  finishPosition:  5 },
          { gatePosition:  9, horseName: "Pied Piper",       sp:  4.5,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Teddy Blue",       sp: 41.0,  finishPosition: 10 },
          { gatePosition: 11, horseName: "Porticello",       sp:  9.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "Vauban",           sp:  2.5,  finishPosition:  1 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 26,
        top3: [
          { gatePosition: 15, horseName: "State Man",       sp:  3.75 },
          { gatePosition:  8, horseName: "First Street",    sp: 17.0  },
          { gatePosition: 16, horseName: "Colonel Mustard", sp: 14.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "West Cork",           sp:  7.5,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Farout",              sp: 26.0,  finishPosition: 19 },
          { gatePosition:  3, horseName: "Greatwood",           sp: 29.0,  finishPosition: 11 },
          { gatePosition:  4, horseName: "Stepney Causeway",    sp: 41.0,  finishPosition: 13 },
          { gatePosition:  5, horseName: "Breakeven",           sp: 17.0,  finishPosition: 23 },
          { gatePosition:  6, horseName: "Ballyadam",           sp: 15.0,  finishPosition:  5 },
          { gatePosition:  7, horseName: "Eclair De Beaufeu",   sp: 29.0,  finishPosition: 22 },
          { gatePosition:  8, horseName: "First Street",        sp: 17.0,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Cormier",             sp: 13.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "My Mate Mozzie",      sp: 17.0,  finishPosition:  8 },
          { gatePosition: 11, horseName: "Champagne Gold",      sp: 29.0,  finishPosition: 17 },
          { gatePosition: 12, horseName: "Ganapathi",           sp: 34.0,  finishPosition: 14 },
          { gatePosition: 13, horseName: "Get My Drift",        sp: 26.0,  finishPosition: null }, // F
          { gatePosition: 14, horseName: "Surprise Package",    sp: 21.0,  finishPosition:  6 },
          { gatePosition: 15, horseName: "State Man",           sp:  3.75, finishPosition:  1 },
          { gatePosition: 16, horseName: "Colonel Mustard",     sp: 14.0,  finishPosition:  3 },
          { gatePosition: 17, horseName: "Toneche",             sp: 34.0,  finishPosition: 24 },
          { gatePosition: 18, horseName: "Autumn Evening",      sp: 15.0,  finishPosition: 16 },
          { gatePosition: 19, horseName: "Top Bandit",          sp: 11.0,  finishPosition:  9 },
          { gatePosition: 20, horseName: "Call Me Lyreen",      sp: 17.0,  finishPosition: 21 },
          { gatePosition: 21, horseName: "Mikael D'Haguenet",   sp: 34.0,  finishPosition: 12 },
          { gatePosition: 22, horseName: "Petit Mouchoir",      sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Gloire D'Athon",      sp: 23.0,  finishPosition: 15 },
          { gatePosition: 24, horseName: "Sea Ducor",           sp: 41.0,  finishPosition: 20 },
          { gatePosition: 25, horseName: "I Like To Move It",   sp: 17.0,  finishPosition: 10 },
          { gatePosition: 26, horseName: "Broomfield Hall",     sp: 51.0,  finishPosition: 18 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 16,
        top3: [
          { gatePosition: 17, horseName: "The Nice Guy",     sp: 19.0 },
          { gatePosition: 13, horseName: "Minella Cocooner", sp:  5.5 },
          { gatePosition:  2, horseName: "Bardenstown Lad",  sp: 21.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Ginto",             sp:  3.25, finishPosition: null }, // PU
          { gatePosition:  2, horseName: "Bardenstown Lad",   sp: 21.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Hollow Games",      sp:  6.5,  finishPosition: 14 },
          { gatePosition:  4, horseName: "Ballygrifincottage",sp: 29.0,  finishPosition:  4 },
          { gatePosition:  5, horseName: "Good Time Jonny",   sp: 17.0,  finishPosition: 12 },
          { gatePosition:  6, horseName: "Hartur D'Arc",      sp: 67.0,  finishPosition: 11 },
          { gatePosition:  7, horseName: "Hillcrest",         sp:  6.0,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Green Book",        sp: 26.0,  finishPosition:  7 },
          { gatePosition:  9, horseName: "Lakota Warrior",    sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Desertmore House",  sp: 29.0,  finishPosition:  8 },
          { gatePosition: 13, horseName: "Minella Cocooner",  sp:  5.5,  finishPosition:  2 },
          { gatePosition: 15, horseName: "Presente Primo",    sp: 101.0, finishPosition: 13 },
          { gatePosition: 16, horseName: "Ramo",              sp: 51.0,  finishPosition: 10 },
          { gatePosition: 17, horseName: "The Nice Guy",      sp: 19.0,  finishPosition:  1 },
          { gatePosition: 18, horseName: "The Real Whacker",  sp: 51.0,  finishPosition:  9 },
          { gatePosition: 19, horseName: "Shantreusse",       sp: 15.0,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 11,
        top3: [
          { gatePosition:  2, horseName: "A Plus Tard",  sp:  4.0   },
          { gatePosition:  7, horseName: "Minella Indo", sp:  8.0   },
          { gatePosition:  8, horseName: "Protektorat",  sp: 11.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Al Boum Photo",    sp:  7.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "A Plus Tard",      sp:  4.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Asterion Forlonge",sp: 23.0,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Aye Right",        sp: 81.0,  finishPosition:  9 },
          { gatePosition:  5, horseName: "Chantry House",    sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Galvin",           sp:  4.333, finishPosition: 4 },
          { gatePosition:  7, horseName: "Minella Indo",     sp:  8.0,  finishPosition:  2 },
          { gatePosition:  8, horseName: "Protektorat",      sp: 11.0,  finishPosition:  3 },
          { gatePosition:  9, horseName: "Royale Pagaille",  sp: 21.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Santini",          sp: 67.0,  finishPosition:  8 },
          { gatePosition: 11, horseName: "Tornado Flyer",    sp: 10.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 19,
        top3: [
          { gatePosition:  2, horseName: "Billaway",        sp:  2.625 },
          { gatePosition: 19, horseName: "Winged Leader",   sp:  5.5   },
          { gatePosition: 11, horseName: "Mighty Stowaway", sp: 34.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Cousin Pascal",     sp: 26.0,  finishPosition:  7 },
          { gatePosition:  2, horseName: "Billaway",          sp:  2.625, finishPosition:  1 },
          { gatePosition:  3, horseName: "Brain Power",       sp: 26.0,  finishPosition:  8 },
          { gatePosition:  4, horseName: "Cat Tiger",         sp: 15.0,  finishPosition: 13 },
          { gatePosition:  5, horseName: "Vaucelet",          sp:  8.5,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Chris's Dream",     sp: 11.0,  finishPosition:  5 },
          { gatePosition:  7, horseName: "Downtown Getaway",  sp: 34.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Fact Of The Matter",sp: 101.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Hazel Hill",        sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Latenightpass",     sp: 17.0,  finishPosition:  9 },
          { gatePosition: 11, horseName: "Mighty Stowaway",   sp: 34.0,  finishPosition:  3 },
          { gatePosition: 12, horseName: "Porlock Bay",       sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Rio Diamond",       sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Dashing Perk",      sp: 101.0, finishPosition: 12 },
          { gatePosition: 15, horseName: "Dubai Quest",       sp:  6.5,  finishPosition:  6 },
          { gatePosition: 16, horseName: "Super Citizen",     sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 17, horseName: "The Storyteller",   sp: 26.0,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Wagner",            sp: 67.0,  finishPosition: 11 },
          { gatePosition: 19, horseName: "Winged Leader",     sp:  5.5,  finishPosition:  2 },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: 9,
        top3: [
          { gatePosition: 3, horseName: "Elimay",          sp:  3.25 },
          { gatePosition: 6, horseName: "Pink Legend",     sp: 34.0  },
          { gatePosition: 2, horseName: "Scarlet And Dove",sp: 29.0  },
        ],
        field: [
          { gatePosition: 1, horseName: "Zambella",             sp:  6.5,  finishPosition:  4 },
          { gatePosition: 2, horseName: "Scarlet And Dove",     sp: 29.0,  finishPosition:  3 },
          { gatePosition: 3, horseName: "Elimay",               sp:  3.25, finishPosition:  1 },
          { gatePosition: 4, horseName: "Court Maid",           sp: 11.0,  finishPosition:  8 },
          { gatePosition: 5, horseName: "Grangee",              sp:  4.333, finishPosition: 7 },
          { gatePosition: 6, horseName: "Pink Legend",          sp: 34.0,  finishPosition:  2 },
          { gatePosition: 7, horseName: "Vienna Court",         sp: 15.0,  finishPosition:  5 },
          { gatePosition: 8, horseName: "The Moonlight Melody", sp: 13.0,  finishPosition:  6 },
          { gatePosition: 9, horseName: "Kapga De Lily",        sp: 26.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 23,
        top3: [
          { gatePosition: 11, horseName: "Banbridge",       sp: 13.0 },
          { gatePosition: 15, horseName: "Cobblers Dream",  sp: 13.0 },
          { gatePosition: 18, horseName: "Hollow Games",    sp:  5.5 },
        ],
        field: [
          { gatePosition:  1, horseName: "Party Central",      sp:  4.5,  finishPosition:  5 },
          { gatePosition:  2, horseName: "Top Bandit",         sp: 11.0,  finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Decimation",         sp: 26.0,  finishPosition: 16 },
          { gatePosition:  4, horseName: "Lucky Max",          sp: 29.0,  finishPosition: 18 },
          { gatePosition:  5, horseName: "Langer Dan",         sp:  5.0,  finishPosition:  6 },
          { gatePosition:  6, horseName: "Ilikedwayurthinkin", sp: 41.0,  finishPosition: 12 },
          { gatePosition:  7, horseName: "Au Fleuron",         sp: 41.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "Silver Sheen",       sp: 67.0,  finishPosition: 14 },
          { gatePosition:  9, horseName: "Freedom To Dream",   sp: 21.0,  finishPosition:  4 },
          { gatePosition: 10, horseName: "Eric Bloodaxe",      sp: 12.0,  finishPosition:  8 },
          { gatePosition: 11, horseName: "Banbridge",          sp: 13.0,  finishPosition:  1 },
          { gatePosition: 12, horseName: "Perfect Attitude",   sp: 17.0,  finishPosition: 15 },
          { gatePosition: 13, horseName: "Grand Jury",         sp: 11.0,  finishPosition:  9 },
          { gatePosition: 14, horseName: "The Little Yank",    sp: 41.0,  finishPosition: 10 },
          { gatePosition: 15, horseName: "Cobblers Dream",     sp: 13.0,  finishPosition:  2 },
          { gatePosition: 16, horseName: "Chemical Energy",    sp: 21.0,  finishPosition: 11 },
          { gatePosition: 17, horseName: "Whatdeawant",        sp: 17.0,  finishPosition: 13 },
          { gatePosition: 18, horseName: "Hollow Games",       sp:  5.5,  finishPosition:  3 },
          { gatePosition: 19, horseName: "Mighty Tom",         sp: 101.0, finishPosition: 17 },
          { gatePosition: 20, horseName: "The Very Man",       sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 21, horseName: "Humble Glory",       sp: 81.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Bigz Belief",        sp: 67.0,  finishPosition: 19 },
          { gatePosition: 23, horseName: "Father Jed",         sp: 101.0, finishPosition: null }, // UR
        ],
      },

      // ── Thursday (St Patrick's Day) – 17 March 2022 ──────────────────────────
      {
        raceName: "Turners Novices' Chase",
        fieldSize: 4,
        top3: [
          { gatePosition:  1, horseName: "Bob Olinger",        sp:  2.1   },
          { gatePosition:  4, horseName: "Busselton",          sp: 51.0   },
          { gatePosition:  2, horseName: "El Barra",           sp: 19.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Bob Olinger",         sp:  2.1,   finishPosition:  1 },
          { gatePosition:  2, horseName: "El Barra",            sp: 19.0,   finishPosition:  3 },
          { gatePosition:  3, horseName: "Galopin Des Champs",  sp:  1.833, finishPosition: null }, // F
          { gatePosition:  4, horseName: "Busselton",           sp: 51.0,   finishPosition:  2 },
        ],
      },
      {
        raceName: "Pertemps Final",
        fieldSize: 22,
        top3: [
          { gatePosition:  8, horseName: "Third Wind",   sp: 26.0 },
          { gatePosition: 13, horseName: "Alaphilippe",  sp:  6.5 },
          { gatePosition: 12, horseName: "Mill Green",   sp: 34.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Sire Du Berlais",    sp:  6.5,  finishPosition: 11 },
          { gatePosition:  2, horseName: "Ballyandy",          sp: 13.0,  finishPosition: 10 },
          { gatePosition:  3, horseName: "Dallas Des Pictons", sp: 41.0,  finishPosition: 12 },
          { gatePosition:  5, horseName: "The Jam Man",        sp: 29.0,  finishPosition: 14 },
          { gatePosition:  6, horseName: "Sassy Yet Classy",   sp: 10.0,  finishPosition: null }, // BD
          { gatePosition:  7, horseName: "Honest Vic",         sp: 41.0,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Third Wind",         sp: 26.0,  finishPosition:  1 },
          { gatePosition:  9, horseName: "Tullybeg",           sp: 29.0,  finishPosition: 18 },
          { gatePosition: 10, horseName: "Dame De Compagnie",  sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Stoney Mountain",    sp:126.0,  finishPosition: 17 },
          { gatePosition: 12, horseName: "Mill Green",         sp: 34.0,  finishPosition:  3 },
          { gatePosition: 13, horseName: "Alaphilippe",        sp:  6.5,  finishPosition:  2 },
          { gatePosition: 14, horseName: "Winter Fog",         sp:  6.5,  finishPosition:  4 },
          { gatePosition: 15, horseName: "Whatsnotoknow",      sp: 41.0,  finishPosition:  7 },
          { gatePosition: 16, horseName: "If The Cap Fits",    sp: 34.0,  finishPosition:  6 },
          { gatePosition: 17, horseName: "Folcano",            sp: 19.0,  finishPosition:  9 },
          { gatePosition: 18, horseName: "Pileon",             sp: 29.0,  finishPosition: 15 },
          { gatePosition: 19, horseName: "Born Patriot",       sp: 15.0,  finishPosition: null }, // F (fatal)
          { gatePosition: 20, horseName: "Coeur Serein",       sp: 34.0,  finishPosition:  8 },
          { gatePosition: 21, horseName: "Kansas City Chief",  sp: 29.0,  finishPosition: 13 },
          { gatePosition: 23, horseName: "The Cob",            sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 24, horseName: "Dunboyne",           sp:  8.0,  finishPosition: 16 },
        ],
      },
      {
        raceName: "Ryanair Chase",
        fieldSize: 7,
        top3: [
          { gatePosition:  1, horseName: "Allaho",         sp:  1.571 },
          { gatePosition:  5, horseName: "Janidil",        sp: 13.0   },
          { gatePosition:  3, horseName: "Eldorado Allen", sp: 15.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Allaho",             sp:  1.571, finishPosition:  1 },
          { gatePosition:  2, horseName: "Conflated",          sp:  8.0,   finishPosition: null }, // F
          { gatePosition:  3, horseName: "Eldorado Allen",     sp: 15.0,   finishPosition:  3 },
          { gatePosition:  4, horseName: "Fanion D'Estruval",  sp: 29.0,   finishPosition:  4 },
          { gatePosition:  5, horseName: "Janidil",            sp: 13.0,   finishPosition:  2 },
          { gatePosition:  6, horseName: "Melon",              sp: 17.0,   finishPosition:  5 },
          { gatePosition:  9, horseName: "Shan Blue",          sp: 11.0,   finishPosition:  6 },
        ],
      },
      {
        raceName: "Stayers' Hurdle",
        fieldSize: 10,
        top3: [
          { gatePosition:  2, horseName: "Flooring Porter", sp:  5.0 },
          { gatePosition:  9, horseName: "Thyme Hill",      sp:  6.5 },
          { gatePosition:  7, horseName: "Paisley Park",    sp:  9.5 },
        ],
        field: [
          { gatePosition:  1, horseName: "Champ",            sp:  6.5,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Flooring Porter",  sp:  5.0,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Home By The Lee",  sp: 34.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "Klassical Dream",  sp:  3.75, finishPosition:  5 },
          { gatePosition:  5, horseName: "Koshari",          sp:101.0,  finishPosition:  7 },
          { gatePosition:  6, horseName: "Lisnagar Oscar",   sp: 41.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Paisley Park",     sp:  9.5,  finishPosition:  3 },
          { gatePosition:  8, horseName: "Song For Someone", sp: 34.0,  finishPosition:  9 },
          { gatePosition:  9, horseName: "Thyme Hill",       sp:  6.5,  finishPosition:  2 },
          { gatePosition: 10, horseName: "Royal Kahala",     sp:  6.5,  finishPosition:  8 },
        ],
      },
      {
        raceName: "Plate Handicap Chase",
        fieldSize: 15,
        top3: [
          { gatePosition:  8, horseName: "Coole Cody",       sp: 23.0 },
          { gatePosition:  4, horseName: "Imperial Alcazar", sp:  4.5 },
          { gatePosition: 18, horseName: "Spiritofthegames", sp: 13.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Hardline",           sp: 51.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Imperial Alcazar",   sp:  4.5,  finishPosition:  2 },
          { gatePosition:  6, horseName: "Wishing And Hoping", sp: 41.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Coole Cody",         sp: 23.0,  finishPosition:  1 },
          { gatePosition:  9, horseName: "Schiehallion Munro", sp: 34.0,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Grand Paradis",      sp:  6.5,  finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Stolen Silver",      sp: 19.0,  finishPosition:  4 },
          { gatePosition: 13, horseName: "The Glancing Queen", sp:  5.0,  finishPosition:  7 },
          { gatePosition: 14, horseName: "Celebre d'Allen",    sp:  5.0,  finishPosition:  5 },
          { gatePosition: 15, horseName: "Adrimel",            sp:  8.0,  finishPosition:  9 },
          { gatePosition: 16, horseName: "Born By The Sea",    sp: 67.0,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Spiritofthegames",   sp: 13.0,  finishPosition:  3 },
          { gatePosition: 19, horseName: "Slate House",        sp: 41.0,  finishPosition:  6 },
          { gatePosition: 20, horseName: "Fire Away",          sp:101.0,  finishPosition: 11 },
          { gatePosition: 21, horseName: "Chinwag",            sp: 29.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Dawn Run Mares' Hurdle",
        fieldSize: 19,
        top3: [
          { gatePosition:  2, horseName: "Love Envoi",       sp:  8.5  },
          { gatePosition:  8, horseName: "Ahorsewithnoname", sp: 51.0  },
          { gatePosition: 12, horseName: "Grangee",          sp:  7.5  },
        ],
        field: [
          { gatePosition:  1, horseName: "Impervious",         sp: 23.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Love Envoi",         sp:  8.5,  finishPosition:  1 },
          { gatePosition:  3, horseName: "Party Central",      sp:  6.5,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Statuaire",          sp: 29.0,  finishPosition: 10 },
          { gatePosition:  5, horseName: "Choice Of Words",    sp: 34.0,  finishPosition: 16 },
          { gatePosition:  6, horseName: "Nina The Terrier",   sp: 51.0,  finishPosition: 14 },
          { gatePosition:  7, horseName: "Tweed Skirt",        sp:101.0,  finishPosition: 15 },
          { gatePosition:  8, horseName: "Ahorsewithnoname",   sp: 51.0,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Braganza",           sp:126.0,  finishPosition:  5 },
          { gatePosition: 11, horseName: "Dinoblue",           sp:  2.375, finishPosition:  9 },
          { gatePosition: 12, horseName: "Grangee",            sp:  7.5,  finishPosition:  3 },
          { gatePosition: 13, horseName: "Heia",               sp: 34.0,  finishPosition: 13 },
          { gatePosition: 14, horseName: "Hidden Land",        sp:201.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Hors Piste",         sp: 13.0,  finishPosition:  8 },
          { gatePosition: 16, horseName: "Mayhem Mya",         sp:126.0,  finishPosition: 12 },
          { gatePosition: 17, horseName: "Mighty Blue",        sp: 17.0,  finishPosition: 17 },
          { gatePosition: 18, horseName: "Monishter Are Mwee", sp:151.0,  finishPosition: 18 },
          { gatePosition: 19, horseName: "Nurse Susan",        sp: 15.0,  finishPosition:  4 },
          { gatePosition: 21, horseName: "The Player Queen",   sp:151.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Kim Muir",
        fieldSize: 20,
        top3: [
          { gatePosition: 20, horseName: "Chambard",      sp: 41.0 },
          { gatePosition: 11, horseName: "Mister Coffey", sp:  6.0 },
          { gatePosition: 25, horseName: "Didero Vallis", sp: 67.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Frontal Assault",    sp:  7.0,  finishPosition: null }, // PU
          { gatePosition:  2, horseName: "Fakir d'Alene",      sp: 34.0,  finishPosition:  4 },
          { gatePosition:  3, horseName: "Ain't That A Shame", sp:  7.0,  finishPosition: 13 },
          { gatePosition:  5, horseName: "Cat Tiger",          sp: 26.0,  finishPosition: 12 },
          { gatePosition:  6, horseName: "School Boy Hours",   sp:  6.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Elegant Escape",     sp: 51.0,  finishPosition: null }, // UR
          { gatePosition:  8, horseName: "Smoking Gun",        sp: 15.0,  finishPosition:  8 },
          { gatePosition:  9, horseName: "Mister Fogpatches",  sp: 10.0,  finishPosition:  6 },
          { gatePosition: 10, horseName: "Almazhar Garde",     sp: 67.0,  finishPosition: 11 },
          { gatePosition: 11, horseName: "Mister Coffey",      sp:  6.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Mindsmadeup",        sp: 67.0,  finishPosition: null }, // F (fatal)
          { gatePosition: 14, horseName: "Come On Teddy",      sp: 10.0,  finishPosition: null }, // PU
          { gatePosition: 15, horseName: "Omar Maretti",       sp: 10.0,  finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Mint Condition",     sp: 34.0,  finishPosition:  5 },
          { gatePosition: 18, horseName: "Glenloe",            sp: 15.0,  finishPosition: 10 },
          { gatePosition: 20, horseName: "Chambard",           sp: 41.0,  finishPosition:  1 },
          { gatePosition: 21, horseName: "Larry",              sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Rightplacerightime", sp: 19.0,  finishPosition:  7 },
          { gatePosition: 23, horseName: "Powerstown Park",    sp: 51.0,  finishPosition:  9 },
          { gatePosition: 25, horseName: "Didero Vallis",      sp: 67.0,  finishPosition:  3 },
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
        fieldSize: 15,
        top3: [
          { gatePosition: 14, horseName: "Lossiemouth",  sp:  2.375 },
          { gatePosition: 13, horseName: "Gala Marceau", sp:  4.333 },
          { gatePosition: 15, horseName: "Zenta",        sp: 13.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "Blood Destiny",   sp:  3.0,  finishPosition:  7 },
          { gatePosition:  2, horseName: "Cinsa",           sp: 81.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Al Muhtasib",     sp: 126.0, finishPosition: 11 },
          { gatePosition:  4, horseName: "Ascending",       sp: 101.0, finishPosition: 13 },
          { gatePosition:  5, horseName: "Jipcot",          sp: 13.0,  finishPosition:  9 },
          { gatePosition:  6, horseName: "Jupiter Du Gite", sp: 67.0,  finishPosition: 12 },
          { gatePosition:  7, horseName: "Rightsotom",      sp: 41.0,  finishPosition: 14 },
          { gatePosition:  8, horseName: "Active Duty",     sp: 151.0, finishPosition: 15 },
          { gatePosition:  9, horseName: "Punta Del Este",  sp: 51.0,  finishPosition: 10 },
          { gatePosition: 10, horseName: "Rare Middleton",  sp: 34.0,  finishPosition:  6 },
          { gatePosition: 11, horseName: "Stela Star",      sp: 67.0,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Gust Of Wind",    sp: 101.0, finishPosition:  4 },
          { gatePosition: 13, horseName: "Gala Marceau",    sp:  4.333, finishPosition: 2 },
          { gatePosition: 14, horseName: "Lossiemouth",     sp:  2.375, finishPosition: 1 },
          { gatePosition: 15, horseName: "Zenta",           sp: 13.0,  finishPosition:  3 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 26,
        top3: [
          { gatePosition: 17, horseName: "Faivoir",    sp: 34.0 },
          { gatePosition:  2, horseName: "Pied Piper", sp: 13.0 },
          { gatePosition: 13, horseName: "Filey Bay",  sp:  7.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Sharjah",           sp: 11.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Pied Piper",        sp: 13.0,  finishPosition:  2 },
          { gatePosition:  3, horseName: "First Street",      sp: 17.0,  finishPosition: 21 },
          { gatePosition:  4, horseName: "Anna Bunina",       sp: 51.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Hunters Yarn",      sp:  6.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Colonel Mustard",   sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Winter Fog",        sp:  7.0,  finishPosition: 14 },
          { gatePosition:  8, horseName: "Tax For Max",       sp: 51.0,  finishPosition: 16 },
          { gatePosition:  9, horseName: "Prairie Dancer",    sp: 41.0,  finishPosition: 22 },
          { gatePosition: 10, horseName: "Ganapathi",         sp: 101.0, finishPosition: 15 },
          { gatePosition: 11, horseName: "Ballyadam",         sp: 13.0,  finishPosition:  5 },
          { gatePosition: 12, horseName: "Pembroke",          sp:  5.5,  finishPosition:  8 },
          { gatePosition: 13, horseName: "Filey Bay",         sp:  7.0,  finishPosition:  3 },
          { gatePosition: 14, horseName: "Petit Tonnerre",    sp: 26.0,  finishPosition:  7 },
          { gatePosition: 15, horseName: "Aucunrisque",       sp: 23.0,  finishPosition: 13 },
          { gatePosition: 16, horseName: "Luttrell Lad",      sp: 101.0, finishPosition: 20 },
          { gatePosition: 17, horseName: "Faivoir",           sp: 34.0,  finishPosition:  1 },
          { gatePosition: 18, horseName: "Teddy Blue",        sp: 29.0,  finishPosition: 12 },
          { gatePosition: 19, horseName: "Gin Coco",          sp: 10.0,  finishPosition: 10 },
          { gatePosition: 20, horseName: "Zoffanien",         sp: 101.0, finishPosition: 19 },
          { gatePosition: 21, horseName: "West Cork",         sp: 26.0,  finishPosition: 17 },
          { gatePosition: 22, horseName: "Path d'Oroux",      sp: 17.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Hms Seahorse",      sp: 12.0,  finishPosition: 18 },
          { gatePosition: 24, horseName: "Wonderwall",        sp: 29.0,  finishPosition:  9 },
          { gatePosition: 25, horseName: "Milkwood",          sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 26, horseName: "Highway One O Two", sp: 51.0,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 20,
        top3: [
          { gatePosition: 16, horseName: "Stay Away Fay",  sp: 19.0  },
          { gatePosition:  1, horseName: "Affordale Fury", sp: 151.0 },
          { gatePosition: 15, horseName: "Sandor Clegane", sp: 29.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Affordale Fury",       sp: 151.0, finishPosition:  2 },
          { gatePosition:  2, horseName: "Cool Survivor",        sp: 17.0,  finishPosition: 16 },
          { gatePosition:  3, horseName: "Corbetts Cross",       sp:  3.25, finishPosition:  5 },
          { gatePosition:  4, horseName: "Dawn Rising",          sp: 12.0,  finishPosition:  8 },
          { gatePosition:  5, horseName: "Embassy Gardens",      sp:  8.0,  finishPosition: 13 },
          { gatePosition:  6, horseName: "Favori De Champdou",   sp: 12.0,  finishPosition:  6 },
          { gatePosition:  7, horseName: "Search For Glory",     sp: 51.0,  finishPosition: 15 },
          { gatePosition:  8, horseName: "Hiddenvalley Lake",    sp:  8.5,  finishPosition: 11 },
          { gatePosition:  9, horseName: "Inothewayurthinkin",   sp: 17.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Idas Boy",             sp: 101.0, finishPosition: 14 },
          { gatePosition: 11, horseName: "Let's Beclearaboutit", sp: 17.0,  finishPosition:  4 },
          { gatePosition: 12, horseName: "Monty's Star",         sp: 12.0,  finishPosition: 10 },
          { gatePosition: 13, horseName: "Quizzical Girl",       sp: 151.0, finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Rock My Way",          sp: 34.0,  finishPosition:  9 },
          { gatePosition: 15, horseName: "Sandor Clegane",       sp: 29.0,  finishPosition:  3 },
          { gatePosition: 16, horseName: "Stay Away Fay",        sp: 19.0,  finishPosition:  1 },
          { gatePosition: 17, horseName: "Three Card Brag",      sp:  5.0,  finishPosition:  7 },
          { gatePosition: 18, horseName: "Thomas Hill",          sp: 101.0, finishPosition: 12 },
          { gatePosition: 19, horseName: "Shanbally Kid",        sp: 26.0,  finishPosition: null }, // PU
          { gatePosition: 20, horseName: "Weveallbeencaught",    sp: 41.0,  finishPosition: 17 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 13,
        top3: [
          { gatePosition:  6, horseName: "Galopin Des Champs", sp:  2.4  },
          { gatePosition:  3, horseName: "Bravemansgame",      sp:  7.0  },
          { gatePosition:  4, horseName: "Conflated",          sp: 23.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ahoy Senor",       sp: 15.0, finishPosition: null }, // F
          { gatePosition:  2, horseName: "A Plus Tard",      sp:  5.0, finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Bravemansgame",    sp:  7.0, finishPosition:  2 },
          { gatePosition:  4, horseName: "Conflated",        sp: 23.0, finishPosition:  3 },
          { gatePosition:  5, horseName: "Eldorado Allen",   sp: 101.0, finishPosition: 7 },
          { gatePosition:  6, horseName: "Galopin Des Champs", sp: 2.4, finishPosition: 1 },
          { gatePosition:  7, horseName: "Hewick",           sp: 41.0, finishPosition: null }, // F
          { gatePosition:  8, horseName: "Minella Indo",     sp: 21.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Noble Yeats",      sp: 15.0, finishPosition:  4 },
          { gatePosition: 10, horseName: "Protektorat",      sp: 26.0, finishPosition:  5 },
          { gatePosition: 11, horseName: "Royale Pagaille",  sp: 51.0, finishPosition:  6 },
          { gatePosition: 12, horseName: "Sounds Russian",   sp: 51.0, finishPosition: null }, // BD
          { gatePosition: 13, horseName: "Stattler",         sp: 17.0, finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 23,
        top3: [
          { gatePosition: 16, horseName: "Premier Magic",   sp: 67.0 },
          { gatePosition: 11, horseName: "Its On The Line", sp: 29.0 },
          { gatePosition: 19, horseName: "Shasta Daisy",    sp: 13.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Billaway",         sp:  9.0,  finishPosition:  4 },
          { gatePosition:  2, horseName: "Bob And Co",       sp: 41.0,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Brain Power",      sp: 101.0, finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Cat Tiger",        sp: 21.0,  finishPosition:  8 },
          { gatePosition:  5, horseName: "Chris's Dream",    sp:  5.5,  finishPosition:  7 },
          { gatePosition:  6, horseName: "D'jango",          sp: 41.0,  finishPosition: 16 },
          { gatePosition:  7, horseName: "Envoye Special",   sp: 101.0, finishPosition: 17 },
          { gatePosition:  8, horseName: "Famous Clermont",  sp:  5.5,  finishPosition: 12 },
          { gatePosition:  9, horseName: "Ferns Lock",       sp:  8.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "I K Brunel",       sp: 151.0, finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Its On The Line",  sp: 29.0,  finishPosition:  2 },
          { gatePosition: 12, horseName: "Latenightpass",    sp: 12.0,  finishPosition:  5 },
          { gatePosition: 13, horseName: "Law of Gold",      sp: 81.0,  finishPosition: 14 },
          { gatePosition: 14, horseName: "Not That Fuisse",  sp: 15.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Pont Aven",        sp: 41.0,  finishPosition: 13 },
          { gatePosition: 16, horseName: "Premier Magic",    sp: 67.0,  finishPosition:  1 },
          { gatePosition: 17, horseName: "Rocky's Howya",    sp: 12.0,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Black Op",         sp: 101.0, finishPosition: 18 },
          { gatePosition: 19, horseName: "Shasta Daisy",     sp: 13.0,  finishPosition:  3 },
          { gatePosition: 20, horseName: "Secret Investor",  sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 21, horseName: "Vaucelet",         sp:  3.25, finishPosition:  9 },
          { gatePosition: 22, horseName: "Storyteller",      sp: 26.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Winged Leader",    sp: 15.0,  finishPosition: 15 },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: 9,
        top3: [
          { gatePosition: 3, horseName: "Impervious",         sp:  2.875 },
          { gatePosition: 1, horseName: "Allegorie De Vassy", sp:  2.625 },
          { gatePosition: 8, horseName: "Pink Legend",        sp: 34.0   },
        ],
        field: [
          { gatePosition: 1, horseName: "Allegorie De Vassy", sp:  2.625, finishPosition: 2 },
          { gatePosition: 2, horseName: "Elimay",             sp: 21.0,  finishPosition:  9 },
          { gatePosition: 3, horseName: "Impervious",         sp:  2.875, finishPosition: 1 },
          { gatePosition: 4, horseName: "Dolcita",            sp: 51.0,  finishPosition:  8 },
          { gatePosition: 5, horseName: "Jeremys Flame",      sp: 12.0,  finishPosition:  5 },
          { gatePosition: 7, horseName: "Magic Daze",         sp: 15.0,  finishPosition:  7 },
          { gatePosition: 8, horseName: "Pink Legend",        sp: 34.0,  finishPosition:  3 },
          { gatePosition: 9, horseName: "Riviere D'etel",     sp: 17.0,  finishPosition:  4 },
          { gatePosition: 10, horseName: "Zambella",          sp: 17.0,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition:  8, horseName: "Iroko",          sp:  7.0  },
          { gatePosition:  4, horseName: "No Ordinary Joe", sp: 15.0 },
          { gatePosition: 21, horseName: "Buddy One",       sp: 29.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Spanish Harlem",      sp:  5.0,  finishPosition: 11 },
          { gatePosition:  2, horseName: "Langer Dan",          sp: 11.0,  finishPosition: 12 },
          { gatePosition:  3, horseName: "Cool Survivor",       sp: 17.0,  finishPosition:  6 },
          { gatePosition:  4, horseName: "No Ordinary Joe",     sp: 15.0,  finishPosition:  2 },
          { gatePosition:  5, horseName: "Imagine",             sp:  6.0,  finishPosition:  5 },
          { gatePosition:  6, horseName: "Hms Seahorse",        sp: 13.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Felix Desjy",         sp: 51.0,  finishPosition: 19 },
          { gatePosition:  8, horseName: "Iroko",               sp:  7.0,  finishPosition:  1 },
          { gatePosition:  9, horseName: "Master McShee",       sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Might I",             sp:  7.0,  finishPosition:  4 },
          { gatePosition: 11, horseName: "West Highland",       sp: 26.0,  finishPosition:  7 },
          { gatePosition: 12, horseName: "Green Glory",         sp: 15.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Mark of Gold",        sp: 41.0,  finishPosition: 13 },
          { gatePosition: 14, horseName: "Hollow Games",        sp: 17.0,  finishPosition: 20 },
          { gatePosition: 15, horseName: "Spirit of Legend",    sp: 21.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "In From The Cold",    sp: 151.0, finishPosition: 10 },
          { gatePosition: 17, horseName: "AU Fleuron",          sp: 26.0,  finishPosition: 15 },
          { gatePosition: 18, horseName: "Sa Fureur",           sp: 12.0,  finishPosition:  8 },
          { gatePosition: 19, horseName: "Irish Hill",          sp: 17.0,  finishPosition: 18 },
          { gatePosition: 20, horseName: "Fifty Ball",          sp: 67.0,  finishPosition: 17 },
          { gatePosition: 21, horseName: "Buddy One",           sp: 29.0,  finishPosition:  3 },
          { gatePosition: 22, horseName: "Mollys Olly Wishes",  sp: 51.0,  finishPosition:  9 },
          { gatePosition: 23, horseName: "Sayl",                sp: 101.0, finishPosition: 16 },
          { gatePosition: 24, horseName: "Firm Footings",       sp: 13.0,  finishPosition: null }, // PU
        ],
      },

      // ── Thursday (St Patrick's Day) – 16 March 2023 ──────────────────────────
      {
        raceName: "Turners Novices' Chase",
        fieldSize: 7,
        top3: [
          { gatePosition: 8, horseName: "Stage Star",      sp:  8.5   },
          { gatePosition: 7, horseName: "Notlongtillmay",  sp: 41.0   },
          { gatePosition: 6, horseName: "Mighty Potter",   sp:  1.667 },
        ],
        field: [
          // NR: Banbridge, Christopher Wood
          { gatePosition:  1, horseName: "Appreciate It",    sp:  4.0,   finishPosition:  4 },
          { gatePosition:  2, horseName: "Balco Coastal",    sp: 17.0,   finishPosition:  7 },
          { gatePosition:  5, horseName: "James Du Berlais", sp: 17.0,   finishPosition:  6 },
          { gatePosition:  6, horseName: "Mighty Potter",    sp:  1.667, finishPosition:  3 },
          { gatePosition:  7, horseName: "Notlongtillmay",   sp: 41.0,   finishPosition:  2 },
          { gatePosition:  8, horseName: "Stage Star",       sp:  8.5,   finishPosition:  1 },
          { gatePosition:  9, horseName: "Unexpected Party", sp: 101.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Pertemps Final",
        fieldSize: 23,
        top3: [
          { gatePosition:  5, horseName: "Good Time Jonny", sp: 10.0 },
          { gatePosition:  1, horseName: "Salvador Ziggy",  sp: 11.0 },
          { gatePosition: 11, horseName: "Mill Green",      sp: 23.0 },
        ],
        field: [
          // NR: Jet Of Magic (#16)
          { gatePosition:  1, horseName: "Salvador Ziggy",    sp: 11.0,   finishPosition:  2 },
          { gatePosition:  2, horseName: "The Bosses Oscar",  sp: 19.0,   finishPosition: 15 },
          { gatePosition:  3, horseName: "Maxxum",            sp:  5.5,   finishPosition: 14 },
          { gatePosition:  4, horseName: "Itchy Feet",        sp: 41.0,   finishPosition: 11 },
          { gatePosition:  5, horseName: "Good Time Jonny",   sp: 10.0,   finishPosition:  1 },
          { gatePosition:  6, horseName: "Wakool",            sp: 34.0,   finishPosition: 13 },
          { gatePosition:  7, horseName: "Captain Morgs",     sp: 23.0,   finishPosition: 20 },
          { gatePosition:  8, horseName: "Coltor",            sp: 29.0,   finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Green Book",        sp: 41.0,   finishPosition:  4 },
          { gatePosition: 10, horseName: "An Tailliur",       sp: 11.0,   finishPosition:  6 },
          { gatePosition: 11, horseName: "Mill Green",        sp: 23.0,   finishPosition:  3 },
          { gatePosition: 12, horseName: "Walking On Air",    sp: 10.0,   finishPosition:  5 },
          { gatePosition: 13, horseName: "Glimpse Of Gala",   sp: 41.0,   finishPosition: 21 },
          { gatePosition: 14, horseName: "Bear Ghylls",       sp: 26.0,   finishPosition: 16 },
          { gatePosition: 15, horseName: "Hector Javilex",    sp: 15.0,   finishPosition: 19 },
          { gatePosition: 17, horseName: "The Changing Man",  sp: 19.0,   finishPosition:  8 },
          { gatePosition: 18, horseName: "Thanksforthehelp",  sp:  4.333, finishPosition: 12 },
          { gatePosition: 19, horseName: "Level Neverending", sp: 29.0,   finishPosition: 10 },
          { gatePosition: 20, horseName: "Burrows Park",      sp: 101.0,  finishPosition: 17 },
          { gatePosition: 21, horseName: "Risk And Roll",     sp: 151.0,  finishPosition:  9 },
          { gatePosition: 22, horseName: "Moka De Vassy",     sp: 17.0,   finishPosition: null }, // F
          { gatePosition: 23, horseName: "Takarengo",         sp: 67.0,   finishPosition: 18 },
          { gatePosition: 24, horseName: "Brandy McQueen",    sp: 81.0,   finishPosition:  7 },
        ],
      },
      {
        raceName: "Ryanair Chase",
        fieldSize: 9,
        top3: [
          { gatePosition: 3, horseName: "Envoi Allen",  sp:  7.5  },
          { gatePosition: 9, horseName: "Shishkin",     sp:  2.0  },
          { gatePosition: 7, horseName: "Hitman",       sp: 23.0  },
        ],
        field: [
          { gatePosition: 1, horseName: "Blue Lord",       sp:  6.5,  finishPosition:  8 },
          { gatePosition: 2, horseName: "Chacun Pour Soi", sp: 41.0,  finishPosition:  9 },
          { gatePosition: 3, horseName: "Envoi Allen",     sp:  7.5,  finishPosition:  1 },
          { gatePosition: 4, horseName: "French Dynamite", sp: 29.0,  finishPosition:  4 },
          { gatePosition: 5, horseName: "Fury Road",       sp: 11.0,  finishPosition:  6 },
          { gatePosition: 6, horseName: "Ga Law",          sp: 41.0,  finishPosition:  5 },
          { gatePosition: 7, horseName: "Hitman",          sp: 23.0,  finishPosition:  3 },
          { gatePosition: 8, horseName: "Janidil",         sp:  8.0,  finishPosition:  7 },
          { gatePosition: 9, horseName: "Shishkin",        sp:  2.0,  finishPosition:  2 },
        ],
      },
      {
        raceName: "Stayers' Hurdle",
        fieldSize: 11,
        top3: [
          // Official result after appeal: original pass-the-post order reinstated
          { gatePosition: 10, horseName: "Sire Du Berlais", sp: 34.0 },
          { gatePosition:  3, horseName: "Dashel Drasher",  sp: 41.0 },
          { gatePosition: 11, horseName: "Teahupoo",        sp:  3.25 },
        ],
        field: [
          { gatePosition:  1, horseName: "Ashdale Bob",     sp: 26.0,  finishPosition: null }, // PU
          { gatePosition:  2, horseName: "Blazing Khal",    sp:  5.5,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Dashel Drasher",  sp: 41.0,  finishPosition:  2 },
          { gatePosition:  4, horseName: "Flooring Porter", sp:  5.5,  finishPosition:  4 },
          { gatePosition:  5, horseName: "Gold Tweet",      sp:  8.0,  finishPosition:  8 },
          { gatePosition:  6, horseName: "Henri Le Farceur",sp: 81.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Home By The Lee", sp: 10.0,  finishPosition:  5 },
          { gatePosition:  8, horseName: "Klassical Dream", sp:  8.5,  finishPosition:  9 },
          { gatePosition:  9, horseName: "Paisley Park",    sp: 23.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "Sire Du Berlais", sp: 34.0,  finishPosition:  1 },
          { gatePosition: 11, horseName: "Teahupoo",        sp:  3.25, finishPosition:  3 },
        ],
      },
      {
        raceName: "Plate Handicap Chase",
        fieldSize: 23,
        top3: [
          { gatePosition: 13, horseName: "Seddon",          sp: 21.0 },
          { gatePosition:  6, horseName: "Fugitif",         sp: 12.0 },
          { gatePosition: 16, horseName: "Shakem Up'arry",  sp: 17.0 },
        ],
        field: [
          // NR: Captain Tom Cat (#23)
          { gatePosition:  1, horseName: "Haut En Couleurs",  sp:  8.5,   finishPosition:  5 },
          { gatePosition:  2, horseName: "Two For Gold",      sp: 81.0,   finishPosition: 18 },
          { gatePosition:  3, horseName: "Stolen Silver",     sp: 41.0,   finishPosition: 15 },
          { gatePosition:  4, horseName: "Midnight River",    sp:  8.5,   finishPosition: 11 },
          { gatePosition:  5, horseName: "Escaria Ten",       sp: 51.0,   finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Fugitif",          sp: 12.0,   finishPosition:  2 },
          { gatePosition:  7, horseName: "Il Ridoto",        sp:  8.0,   finishPosition:  6 },
          { gatePosition:  8, horseName: "Datsalrightgino",  sp:  6.0,   finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Embittered",       sp: 67.0,   finishPosition: null }, // PU
          { gatePosition: 10, horseName: "War Lord",         sp: 26.0,   finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Coole Cody",       sp: 29.0,   finishPosition:  8 },
          { gatePosition: 12, horseName: "So Scottish",      sp:  6.5,   finishPosition:  7 },
          { gatePosition: 13, horseName: "Seddon",           sp: 21.0,   finishPosition:  1 },
          { gatePosition: 14, horseName: "Marvel De Cerisy", sp:  8.0,   finishPosition:  9 },
          { gatePosition: 15, horseName: "Champagne Gold",   sp: 34.0,   finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Shakem Up'arry",   sp: 17.0,   finishPosition:  3 },
          { gatePosition: 17, horseName: "Mars Harper",      sp: 51.0,   finishPosition: 17 },
          { gatePosition: 18, horseName: "Gevrey",           sp: 126.0,  finishPosition:  4 },
          { gatePosition: 19, horseName: "Hereditary Rule",  sp: 51.0,   finishPosition: 16 },
          { gatePosition: 20, horseName: "Celebre d'Allen",  sp: 41.0,   finishPosition: 10 },
          { gatePosition: 21, horseName: "Frero Banbou",     sp: 15.0,   finishPosition: 12 },
          { gatePosition: 22, horseName: "Born By The Sea",  sp: 151.0,  finishPosition: 14 },
          { gatePosition: 24, horseName: "Bowtogreatness",   sp: 101.0,  finishPosition: 13 },
        ],
      },
      {
        raceName: "Dawn Run Mares' Hurdle",
        fieldSize: 21,
        top3: [
          { gatePosition:  3, horseName: "You Wear It Well",  sp: 17.0 },
          { gatePosition:  2, horseName: "Magical Zoe",       sp:  8.5 },
          { gatePosition:  9, horseName: "Halka Du Tabert",   sp: 13.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Luccia",              sp:  2.5,   finishPosition:  4 },
          { gatePosition:  2, horseName: "Magical Zoe",         sp:  8.5,   finishPosition:  2 },
          { gatePosition:  3, horseName: "You Wear It Well",    sp: 17.0,   finishPosition:  1 },
          { gatePosition:  4, horseName: "Belle The Lioness",   sp: 41.0,   finishPosition: 19 },
          { gatePosition:  5, horseName: "Ahorsewithnoname",    sp: 26.0,   finishPosition: 10 },
          { gatePosition:  6, horseName: "Banntown Girl",       sp: 201.0,  finishPosition: 21 },
          { gatePosition:  7, horseName: "Endless Escape",      sp: 126.0,  finishPosition:  7 },
          { gatePosition:  8, horseName: "Foxy Girl",           sp:  7.5,   finishPosition:  8 },
          { gatePosition:  9, horseName: "Halka Du Tabert",     sp: 13.0,   finishPosition:  3 },
          { gatePosition: 10, horseName: "Jetara",              sp: 26.0,   finishPosition: 11 },
          { gatePosition: 11, horseName: "Ladybank",            sp: 101.0,  finishPosition: 13 },
          { gatePosition: 12, horseName: "Lot Of Joy",          sp:  6.5,   finishPosition: 14 },
          { gatePosition: 13, horseName: "Mullenbeg",           sp: 81.0,   finishPosition:  9 },
          { gatePosition: 14, horseName: "Nikini",              sp: 15.0,   finishPosition: 12 },
          { gatePosition: 15, horseName: "Poetic Music",        sp: 101.0,  finishPosition: 17 },
          { gatePosition: 16, horseName: "Princess Zoe",        sp: 10.0,   finishPosition:  5 },
          { gatePosition: 17, horseName: "Shecouldbeanything",  sp: 67.0,   finishPosition:  6 },
          { gatePosition: 18, horseName: "Still Ciel",          sp: 251.0,  finishPosition: 15 },
          { gatePosition: 19, horseName: "The Model Kingdom",   sp: 34.0,   finishPosition: 16 },
          { gatePosition: 20, horseName: "Inspiratrice",        sp: 301.0,  finishPosition: 18 },
          { gatePosition: 21, horseName: "Under Control",       sp: 23.0,   finishPosition: 20 },
        ],
      },
      {
        raceName: "Kim Muir",
        fieldSize: 23,
        top3: [
          { gatePosition: 22, horseName: "Angels Dawn",  sp: 11.0 },
          { gatePosition: 15, horseName: "Stumptown",    sp:  4.5 },
          { gatePosition:  1, horseName: "Mr Incredible",sp:  5.0 },
        ],
        field: [
          // NR: Captain Cattistock (#13), Chambard (#21), One More Fleurie (#24)
          { gatePosition:  1, horseName: "Mr Incredible",     sp:  5.0,  finishPosition:  3 },
          { gatePosition:  2, horseName: "Annual Invictus",   sp: 34.0,  finishPosition:  8 },
          { gatePosition:  3, horseName: "Beauport",          sp:  8.5,  finishPosition:  9 },
          { gatePosition:  4, horseName: "Farinet",           sp: 51.0,  finishPosition: null }, // PU
          { gatePosition:  5, horseName: "Rapper",            sp: 15.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Dunboyne",          sp:  9.0,  finishPosition:  4 },
          { gatePosition:  7, horseName: "Coeur Serein",      sp: 51.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Slipway",           sp: 67.0,  finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Defi Bleu",         sp: 41.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Royal Thief",       sp: 12.0,  finishPosition:  6 },
          { gatePosition: 11, horseName: "Lord Accord",       sp: 34.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Punitive",          sp: 41.0,  finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Dr Kananga",        sp: 23.0,  finishPosition: 11 },
          { gatePosition: 15, horseName: "Stumptown",         sp:  4.5,  finishPosition:  2 },
          { gatePosition: 16, horseName: "Fontaine Collonges",sp: 15.0,  finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Musical Slave",     sp: 26.0,  finishPosition: null }, // PU
          { gatePosition: 18, horseName: "Anightinlambourn",  sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 19, horseName: "Emir Sacree",       sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 20, horseName: "Western Zara",      sp: 26.0,  finishPosition:  7 },
          { gatePosition: 22, horseName: "Angels Dawn",       sp: 11.0,  finishPosition:  1 },
          { gatePosition: 23, horseName: "Ballykeel",         sp: 29.0,  finishPosition: 10 },
          { gatePosition: 25, horseName: "Coo Star Sivola",   sp: 67.0,  finishPosition: null }, // PU
          { gatePosition: 26, horseName: "Didero Vallis",     sp: 41.0,  finishPosition: null }, // PU
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
        fieldSize: 12,
        top3: [
          { gatePosition:  5, horseName: "Majborough",  sp:  7.0 },
          { gatePosition: 14, horseName: "Kargese",     sp:  5.0 },
          { gatePosition: 10, horseName: "Salver",      sp: 11.0 },
        ],
        // Full field — cloth numbers, SPs and finish positions (source: official 2024 result)
        field: [
          { gatePosition:  1, horseName: "Bunting",          sp:  6.5,  finishPosition:  7 },
          { gatePosition:  2, horseName: "Ethical Diamond",  sp: 26.0,  finishPosition: 10 },
          { gatePosition:  3, horseName: "Highwind",         sp: 34.0,  finishPosition:  9 },
          { gatePosition:  4, horseName: "Ithaca's Arrow",   sp: 151.0, finishPosition:  8 },
          { gatePosition:  5, horseName: "Majborough",       sp:  7.0,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Mighty Bandit",    sp: 29.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Nurburgring",      sp:  7.0,  finishPosition:  4 },
          { gatePosition:  9, horseName: "Salvator Mundi",   sp:  9.5,  finishPosition:  6 },
          { gatePosition: 10, horseName: "Salver",           sp: 11.0,  finishPosition:  3 },
          { gatePosition: 12, horseName: "Storm Heart",      sp:  4.5,  finishPosition:  5 },
          { gatePosition: 13, horseName: "Fratas",           sp: 67.0,  finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Kargese",          sp:  5.0,  finishPosition:  2 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 23,
        top3: [
          { gatePosition:  4, horseName: "Absurde",      sp: 13.0 },
          { gatePosition: 15, horseName: "L'Eau Du Sud", sp:  4.5 },
          { gatePosition:  2, horseName: "Pied Piper",   sp: 15.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Hansard",          sp: 23.0,  finishPosition: 12 },
          { gatePosition:  2, horseName: "Pied Piper",       sp: 15.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Zarak The Brave",  sp: 17.0,  finishPosition: 15 },
          { gatePosition:  4, horseName: "Absurde",          sp: 13.0,  finishPosition:  1 },
          { gatePosition:  5, horseName: "Zenta",            sp: 15.0,  finishPosition: 13 },
          { gatePosition:  6, horseName: "King Of Kingsfield", sp: 8.5, finishPosition: 10 },
          { gatePosition:  7, horseName: "Iberico Lord",     sp:  8.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Many Transitions", sp: 101.0, finishPosition: null }, // F
          { gatePosition:  9, horseName: "Risk Belle",       sp: 13.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "Magical Zoe",      sp:  9.0,  finishPosition:  4 },
          { gatePosition: 11, horseName: "Encanto Bruno",    sp: 34.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Petit Tonnerre",   sp: 51.0,  finishPosition:  6 },
          { gatePosition: 13, horseName: "Westport Cove",    sp: 51.0,  finishPosition: 11 },
          { gatePosition: 14, horseName: "Bialystok",        sp: 17.0,  finishPosition: 17 },
          { gatePosition: 15, horseName: "L'Eau Du Sud",     sp:  4.5,  finishPosition:  2 },
          { gatePosition: 16, horseName: "Faivoir",          sp: 34.0,  finishPosition:  8 },
          { gatePosition: 17, horseName: "So Scottish",      sp: 13.0,  finishPosition:  9 },
          { gatePosition: 18, horseName: "By Your Side",     sp: 67.0,  finishPosition: 16 },
          { gatePosition: 20, horseName: "Samui",            sp: 19.0,  finishPosition: null }, // UR
          { gatePosition: 21, horseName: "Parramount",       sp: 67.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Rare Middleton",   sp: 81.0,  finishPosition: null }, // PU
          { gatePosition: 24, horseName: "Afadil",           sp: 41.0,  finishPosition:  5 },
          { gatePosition: 25, horseName: "Media Naranja",    sp: 81.0,  finishPosition: 14 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 13,
        top3: [
          { gatePosition: 11, horseName: "Stellar Story",    sp: 34.0 },
          { gatePosition: 12, horseName: "The Jukebox Man",  sp: 19.0 },
          { gatePosition:  3, horseName: "Dancing City",     sp:  9.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Answer To Kayf",       sp: 12.0, finishPosition:  8 },
          { gatePosition:  2, horseName: "Captain Teague",       sp: 10.0, finishPosition:  9 },
          { gatePosition:  3, horseName: "Dancing City",         sp:  9.0, finishPosition:  3 },
          { gatePosition:  4, horseName: "Gidleigh Park",        sp:  9.0, finishPosition:  6 },
          { gatePosition:  5, horseName: "High Class Hero",      sp:  9.5, finishPosition: 10 },
          { gatePosition:  6, horseName: "Johnnywho",            sp: 26.0, finishPosition:  7 },
          { gatePosition:  7, horseName: "Lecky Watson",         sp: 17.0, finishPosition:  5 },
          { gatePosition:  8, horseName: "Search For Glory",     sp: 34.0, finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Readin Tommy Wrong",   sp:  3.0, finishPosition: null }, // PU
          { gatePosition: 10, horseName: "Spread Boss Bill",     sp: 41.0, finishPosition:  4 },
          { gatePosition: 11, horseName: "Stellar Story",        sp: 34.0, finishPosition:  1 },
          { gatePosition: 12, horseName: "The Jukebox Man",      sp: 19.0, finishPosition:  2 },
          { gatePosition: 13, horseName: "Chigorin",             sp: 51.0, finishPosition: 11 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 11,
        top3: [
          { gatePosition:  4, horseName: "Galopin Des Champs", sp:  1.91 },
          { gatePosition:  6, horseName: "Gerri Colombe",      sp:  7.5  },
          { gatePosition:  2, horseName: "Corach Rambler",     sp: 15.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Bravemansgame",    sp: 15.0, finishPosition:  5 },
          { gatePosition:  2, horseName: "Corach Rambler",   sp: 15.0, finishPosition:  3 },
          { gatePosition:  3, horseName: "Fastorslow",       sp:  9.0, finishPosition: null }, // UR
          { gatePosition:  4, horseName: "Galopin Des Champs", sp: 1.91, finishPosition: 1 },
          { gatePosition:  5, horseName: "Gentlemansgame",   sp: 26.0, finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Gerri Colombe",    sp:  7.5, finishPosition:  2 },
          { gatePosition:  8, horseName: "Jungle Boogie",    sp: 17.0, finishPosition:  6 },
          { gatePosition:  9, horseName: "L'Homme Presse",   sp: 17.0, finishPosition:  4 },
          { gatePosition: 10, horseName: "Monkfish",         sp: 19.0, finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Nassalam",         sp: 34.0, finishPosition: null }, // PU
          { gatePosition: 12, horseName: "The Real Whacker", sp: 41.0, finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 12,
        top3: [
          { gatePosition: 10, horseName: "Sine Nomine",     sp:  9.0   },
          { gatePosition:  4, horseName: "Its On The Line", sp:  2.375 },
          { gatePosition: 11, horseName: "Time Leader",     sp: 51.0   },
        ],
        field: [
          { gatePosition:  1, horseName: "D'jango",          sp: 126.0, finishPosition:  4 },
          { gatePosition:  2, horseName: "Billaway",         sp: 12.0,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Spyglass Hill",    sp: 67.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Its On The Line",  sp:  2.375, finishPosition: 2 },
          { gatePosition:  5, horseName: "Ferns Lock",       sp:  5.0,  finishPosition:  5 },
          { gatePosition:  6, horseName: "Shantou Flyer",    sp: 34.0,  finishPosition: null }, // PU
          { gatePosition:  7, horseName: "Premier Magic",    sp: 13.0,  finishPosition:  6 },
          { gatePosition:  8, horseName: "Ramillies",        sp: 17.0,  finishPosition:  8 },
          { gatePosition:  9, horseName: "Samcro",           sp: 26.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Sine Nomine",      sp:  9.0,  finishPosition:  1 },
          { gatePosition: 11, horseName: "Time Leader",      sp: 51.0,  finishPosition:  3 },
          { gatePosition: 12, horseName: "From The Heart",   sp: 201.0, finishPosition: 10 },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: 9,
        top3: [
          { gatePosition: 6, horseName: "Limerick Lace", sp:  4.0   },
          { gatePosition: 2, horseName: "Dinoblue",      sp:  2.875 },
          { gatePosition: 8, horseName: "Marsh Wren",    sp: 29.0   },
        ],
        field: [
          { gatePosition: 1, horseName: "Allegorie De Vassy", sp:  9.5,  finishPosition:  4 },
          { gatePosition: 2, horseName: "Dinoblue",           sp:  2.875, finishPosition: 2 },
          { gatePosition: 3, horseName: "Carole's Pass",      sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 4, horseName: "Harmonya Maker",     sp: 15.0,  finishPosition:  7 },
          { gatePosition: 5, horseName: "Instit",             sp: 41.0,  finishPosition:  5 },
          { gatePosition: 6, horseName: "Limerick Lace",      sp:  4.0,  finishPosition:  1 },
          { gatePosition: 7, horseName: "Kelsoclene",         sp: 67.0,  finishPosition:  8 },
          { gatePosition: 8, horseName: "Marsh Wren",         sp: 29.0,  finishPosition:  3 },
          { gatePosition: 9, horseName: "Riviere D'etel",     sp: 17.0,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 16,
        top3: [
          { gatePosition:  6, horseName: "Better Days Ahead",  sp:  6.0  },
          { gatePosition: 13, horseName: "Waterford Whispers", sp:  4.33 },
          { gatePosition:  5, horseName: "Quai De Bourbon",    sp:  5.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Magic Tricks",        sp: 26.0, finishPosition:  8 },
          { gatePosition:  4, horseName: "No Ordinary Joe",     sp: 13.0, finishPosition: 11 },
          { gatePosition:  5, horseName: "Quai De Bourbon",     sp:  5.0, finishPosition:  3 },
          { gatePosition:  6, horseName: "Better Days Ahead",   sp:  6.0, finishPosition:  1 },
          { gatePosition:  7, horseName: "Hollow Games",        sp: 51.0, finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Sonigino",            sp: 21.0, finishPosition:  9 },
          { gatePosition:  9, horseName: "Yeats Star",          sp: 26.0, finishPosition: 12 },
          { gatePosition: 10, horseName: "Answer To Kayf",      sp: 11.0, finishPosition:  4 },
          { gatePosition: 11, horseName: "Angels Breath",       sp: 67.0, finishPosition:  7 },
          { gatePosition: 12, horseName: "Mel Monroe",          sp: 41.0, finishPosition: 14 },
          { gatePosition: 13, horseName: "Waterford Whispers",  sp:  4.33, finishPosition: 2 },
          { gatePosition: 14, horseName: "Sequestered",         sp: 26.0, finishPosition: 10 },
          { gatePosition: 15, horseName: "Teddy Blue",          sp: 81.0, finishPosition: null }, // PU
          { gatePosition: 16, horseName: "What's Up Darling",   sp: 15.0, finishPosition:  6 },
          { gatePosition: 17, horseName: "Stuzzikini",          sp: 67.0, finishPosition: 13 },
          { gatePosition: 20, horseName: "Ocastle Des Mottes",  sp:  8.0, finishPosition:  5 },
        ],
      },

      // ── Thursday (St Patrick's Day) – 14 March 2024 ─────────────────────────
      {
        raceName: "Turners Novices' Chase",
        fieldSize: 11,
        top3: [
          { gatePosition:  5, horseName: "Grey Dawning",    sp:  3.5  },
          { gatePosition:  4, horseName: "Ginny's Destiny", sp:  6.5  },
          { gatePosition:  2, horseName: "Djelo",           sp: 26.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Colonel Harry",         sp: 29.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Djelo",                 sp: 26.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Facile Vega",           sp:  3.5,  finishPosition:  7 },
          { gatePosition:  4, horseName: "Ginny's Destiny",       sp:  6.5,  finishPosition:  2 },
          { gatePosition:  5, horseName: "Grey Dawning",          sp:  3.5,  finishPosition:  1 },
          { gatePosition:  6, horseName: "Iroko",                 sp:  7.5,  finishPosition:  5 },
          { gatePosition:  7, horseName: "Le Patron",             sp: 101.0, finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Letsbeclearaboutit",    sp: 13.0,  finishPosition:  8 },
          { gatePosition:  9, horseName: "Sharjah",               sp: 26.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Zanahiyr",              sp:  9.5,  finishPosition:  4 },
          { gatePosition: 11, horseName: "Jamaico",               sp: 151.0, finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Pertemps Final",
        fieldSize: 22,
        top3: [
          { gatePosition: 14, horseName: "Monmiral",        sp: 26.0 },
          { gatePosition: 22, horseName: "Kyntara",         sp: 17.0 },
          { gatePosition: 12, horseName: "Cuthbert Dibble", sp:  6.5 },
        ],
        field: [
          // NR: Judicial Law (#2), Springwell Bay (#20)
          { gatePosition:  1, horseName: "Farouk d'Alene",  sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  3, horseName: "Flight Deck",     sp: 81.0,  finishPosition: 17 },
          { gatePosition:  4, horseName: "Chantry House",   sp: 21.0,  finishPosition: 10 },
          { gatePosition:  5, horseName: "Bold Endeavour",  sp: 51.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Le Milos",        sp:  7.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "Icare Allen",     sp:  8.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Gowel Road",      sp: 17.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Anna Bunina",     sp: 23.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "Mill Green",      sp: 41.0,  finishPosition: 15 },
          { gatePosition: 11, horseName: "Cleatus Poolaw",  sp:  8.5,  finishPosition:  9 },
          { gatePosition: 12, horseName: "Cuthbert Dibble", sp:  6.5,  finishPosition:  3 },
          { gatePosition: 13, horseName: "Prairie Dancer",  sp: 51.0,  finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Monmiral",        sp: 26.0,  finishPosition:  1 },
          { gatePosition: 15, horseName: "Emitom",          sp: 26.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Gaoth Chuil",     sp:  8.0,  finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Hyland",          sp: 34.0,  finishPosition: 14 },
          { gatePosition: 18, horseName: "Hector Javilex",  sp: 41.0,  finishPosition: 12 },
          { gatePosition: 19, horseName: "Gabbys Cross",    sp: 10.0,  finishPosition: 18 },
          { gatePosition: 21, horseName: "Popova",          sp: 17.0,  finishPosition:  8 },
          { gatePosition: 22, horseName: "Kyntara",         sp: 17.0,  finishPosition:  2 },
          { gatePosition: 23, horseName: "Alpesh Amin",     sp: 23.0,  finishPosition: 11 },
          { gatePosition: 24, horseName: "Noble Birth",     sp: 29.0,  finishPosition: 16 },
        ],
      },
      {
        raceName: "Ryanair Chase",
        fieldSize: 11,
        top3: [
          { gatePosition: 10, horseName: "Protektorat",  sp:  9.5  },
          { gatePosition:  5, horseName: "Envoi Allen",  sp:  3.25 },
          { gatePosition:  4, horseName: "Conflated",    sp: 12.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ahoy Senor",  sp: 19.0,  finishPosition:  6 },
          { gatePosition:  2, horseName: "Banbridge",    sp:  5.0,  finishPosition:  9 },
          { gatePosition:  3, horseName: "Capodanno",   sp: 10.0,  finishPosition:  4 },
          { gatePosition:  4, horseName: "Conflated",   sp: 12.0,  finishPosition:  3 },
          { gatePosition:  5, horseName: "Envoi Allen", sp:  3.25, finishPosition:  2 },
          { gatePosition:  6, horseName: "Fil Dor",     sp: 29.0,  finishPosition:  7 },
          { gatePosition:  7, horseName: "Fugitif",     sp: 17.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Ga Law",      sp: 23.0,  finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Hitman",      sp: 41.0,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Protektorat", sp:  9.5,  finishPosition:  1 },
          { gatePosition: 11, horseName: "Stage Star",  sp:  7.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Stayers' Hurdle",
        fieldSize: 12,
        top3: [
          { gatePosition: 13, horseName: "Teahupoo",        sp:  2.25 },
          { gatePosition:  6, horseName: "Flooring Porter", sp: 10.0  },
          { gatePosition:  7, horseName: "Home By The Lee", sp: 17.0  },
        ],
        field: [
          // NR: Champ (#3)
          { gatePosition:  1, horseName: "Asterion Forlonge", sp: 34.0, finishPosition:  6 },
          { gatePosition:  2, horseName: "Buddy One",          sp: 41.0, finishPosition:  4 },
          { gatePosition:  4, horseName: "Crambo",             sp:  8.0, finishPosition:  9 },
          { gatePosition:  5, horseName: "Dashel Drasher",     sp: 17.0, finishPosition:  8 },
          { gatePosition:  6, horseName: "Flooring Porter",    sp: 10.0, finishPosition:  2 },
          { gatePosition:  7, horseName: "Home By The Lee",    sp: 17.0, finishPosition:  3 },
          { gatePosition:  8, horseName: "Janidil",            sp: 67.0, finishPosition: 11 },
          { gatePosition:  9, horseName: "Noble Yeats",        sp:  8.0, finishPosition:  7 },
          { gatePosition: 10, horseName: "Paisley Park",       sp: 15.0, finishPosition: 10 },
          { gatePosition: 11, horseName: "Sire Du Berlais",    sp: 15.0, finishPosition:  5 },
          { gatePosition: 12, horseName: "Sir Gerhard",        sp: 10.0, finishPosition: 12 },
          { gatePosition: 13, horseName: "Teahupoo",           sp:  2.25, finishPosition: 1 },
        ],
      },
      {
        raceName: "Plate Handicap Chase",
        fieldSize: 21,
        top3: [
          { gatePosition:  7, horseName: "Shakem Up'arry", sp:  9.0  },
          { gatePosition: 10, horseName: "Crebilly",        sp:  4.5  },
          { gatePosition: 18, horseName: "Straw Fan Jack",  sp: 29.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "James Du Berlais", sp: 13.0,  finishPosition:  7 },
          { gatePosition:  2, horseName: "Embittered",       sp: 81.0,  finishPosition: 11 },
          { gatePosition:  3, horseName: "Il Ridoto",        sp: 15.0,  finishPosition:  8 },
          { gatePosition:  4, horseName: "Glengouly",        sp: 26.0,  finishPosition: 16 },
          { gatePosition:  5, horseName: "Saint Felicien",   sp:  7.5,  finishPosition: null }, // BD
          { gatePosition:  6, horseName: "Mars Harper",      sp: 81.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "Shakem Up'arry",   sp:  9.0,  finishPosition:  1 },
          { gatePosition:  8, horseName: "Riaan",            sp: 21.0,  finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Watch House Cross",sp: 29.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Crebilly",         sp:  4.5,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Life In The Park", sp: 29.0,  finishPosition:  4 },
          { gatePosition: 12, horseName: "Hereditary Rule",  sp: 126.0, finishPosition: 17 },
          { gatePosition: 13, horseName: "In Excelsis Deo",  sp: 15.0,  finishPosition:  5 },
          { gatePosition: 14, horseName: "Theatre Man",      sp:  4.333,finishPosition: null }, // F
          { gatePosition: 15, horseName: "Fighter Allen",    sp: 101.0, finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Ciel De Neige",    sp: 101.0, finishPosition: 14 },
          { gatePosition: 17, horseName: "Arctic Bresil",    sp: 12.0,  finishPosition: 12 },
          { gatePosition: 18, horseName: "Straw Fan Jack",   sp: 29.0,  finishPosition:  3 },
          { gatePosition: 19, horseName: "Frero Banbou",     sp: 29.0,  finishPosition:  6 },
          { gatePosition: 20, horseName: "Killer Kane",      sp: 41.0,  finishPosition: 15 },
          { gatePosition: 21, horseName: "Torn And Frayed",  sp: 51.0,  finishPosition: 10 },
        ],
      },
      {
        raceName: "Dawn Run Mares' Hurdle",
        fieldSize: 8,
        top3: [
          { gatePosition:  6, horseName: "Golden Ace",         sp: 11.0  },
          { gatePosition:  2, horseName: "Brighterdaysahead",  sp:  1.833 },
          { gatePosition:  1, horseName: "Birdie Or Bust",     sp: 11.0  },
        ],
        field: [
          // NR: Casa No Mento (#4), Dysart Enos (#5), Little Miss Dante (#7)
          { gatePosition:  1, horseName: "Birdie Or Bust",       sp: 11.0,  finishPosition:  3 },
          { gatePosition:  2, horseName: "Brighterdaysahead",    sp:  1.833,finishPosition:  2 },
          { gatePosition:  3, horseName: "Jade De Grugy",        sp:  3.0,  finishPosition:  4 },
          { gatePosition:  6, horseName: "Golden Ace",           sp: 11.0,  finishPosition:  1 },
          { gatePosition:  8, horseName: "Majestic Force",       sp: 26.0,  finishPosition:  5 },
          { gatePosition:  9, horseName: "Mollys Mango",         sp: 41.0,  finishPosition:  6 },
          { gatePosition: 10, horseName: "Titanium Moon",        sp: 81.0,  finishPosition:  7 },
          { gatePosition: 11, horseName: "Victoria Milano",      sp: 126.0, finishPosition:  8 },
        ],
      },
      {
        raceName: "Kim Muir",
        fieldSize: 22,
        top3: [
          { gatePosition:  6, horseName: "Inothewayurthinkin", sp:  2.625 },
          { gatePosition: 19, horseName: "Git Maker",          sp: 29.0  },
          { gatePosition: 21, horseName: "Whacker Clan",       sp:  9.5  },
        ],
        field: [
          // NR: Amirite, Back On The Lash (cloth nos. unconfirmed); Cloudy Glen cloth may be ~5 (site showed duplicate 6)
          { gatePosition:  2, horseName: "Annual Invictus",     sp: 29.0,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Fakir d'Alene",       sp: 34.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Angels Dawn",         sp: 15.0,  finishPosition: null }, // F
          { gatePosition:  5, horseName: "Cloudy Glen",         sp: 34.0,  finishPosition: null }, // PU (cloth uncertain)
          { gatePosition:  6, horseName: "Inothewayurthinkin",  sp:  2.625,finishPosition:  1 },
          { gatePosition:  7, horseName: "Whistleinthedark",    sp: 101.0, finishPosition: 10 },
          { gatePosition:  8, horseName: "Cepage",              sp: 81.0,  finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Celebre d'Allen",     sp: 51.0,  finishPosition: null }, // UR
          { gatePosition: 10, horseName: "Rapper",              sp: 34.0,  finishPosition: null }, // F
          { gatePosition: 11, horseName: "City Chief",          sp: 34.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Chavez",              sp: 21.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "A Wave Of The Sea",   sp: 67.0,  finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Cool Survivor",       sp: 12.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Where It All Began",  sp:  9.0,  finishPosition:  4 },
          { gatePosition: 16, horseName: "Bowtogreatness",      sp: 19.0,  finishPosition: 11 },
          { gatePosition: 17, horseName: "Flash De Touzaine",   sp: 126.0, finishPosition: 12 },
          { gatePosition: 18, horseName: "Demnat",              sp: 34.0,  finishPosition:  9 },
          { gatePosition: 19, horseName: "Git Maker",           sp: 29.0,  finishPosition:  2 },
          { gatePosition: 20, horseName: "Grozni",              sp: 51.0,  finishPosition:  6 },
          { gatePosition: 21, horseName: "Whacker Clan",        sp:  9.5,  finishPosition:  3 },
          { gatePosition: 23, horseName: "Daily Present",       sp:  6.5,  finishPosition:  5 },
          { gatePosition: 24, horseName: "Dom Of Mary",         sp: 21.0,  finishPosition:  8 },
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
        fieldSize: 17,
        top3: [
          { gatePosition: 11, horseName: "Poniros",              sp: 101.0 },
          { gatePosition:  7, horseName: "Lulamba",              sp:   3.75 },
          { gatePosition:  3, horseName: "East India Dock",      sp:   2.25 },
        ],
        field: [
          // NR: Marche d'Aligre — unsuitable ground
          { gatePosition:  1, horseName: "Blue Lemons",          sp: 13.0,  finishPosition: null },
          { gatePosition:  2, horseName: "Charlus",              sp: 67.0,  finishPosition: 12 },
          { gatePosition:  3, horseName: "East India Dock",      sp:  2.25, finishPosition:  3 },
          { gatePosition:  4, horseName: "Gibbs Island",         sp: 29.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Hello Neighbour",      sp:  4.5,  finishPosition:  6 },
          { gatePosition:  6, horseName: "Larzac",               sp: 34.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "Lulamba",              sp:  3.75, finishPosition:  2 },
          { gatePosition:  9, horseName: "Mondo Man",            sp: 34.0,  finishPosition:  9 },
          { gatePosition: 10, horseName: "Pappano",              sp: 151.0, finishPosition: null },
          { gatePosition: 11, horseName: "Poniros",              sp: 101.0, finishPosition:  1 },
          { gatePosition: 12, horseName: "Too Bossy For Us",     sp: 51.0,  finishPosition:  7 },
          { gatePosition: 13, horseName: "Willy De Houelle",     sp: 41.0,  finishPosition: 11 },
          { gatePosition: 14, horseName: "Lady Vega Allen",      sp: 15.0,  finishPosition:  4 },
          { gatePosition: 15, horseName: "Lumiere Du Large",     sp: 201.0, finishPosition: 10 },
          { gatePosition: 16, horseName: "Opec",                 sp: 151.0, finishPosition: null },
          { gatePosition: 17, horseName: "Place De La Nation",   sp: 101.0, finishPosition:  5 },
          { gatePosition: 18, horseName: "Sainte Lucie",         sp: 51.0,  finishPosition:  8 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 16,
        top3: [
          { gatePosition:  7, horseName: "Kargese",              sp:  4.0  },
          { gatePosition:  8, horseName: "Ndaawi",               sp: 26.0  },
          { gatePosition:  2, horseName: "Absurde",              sp:  6.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Daddy Long Legs",      sp: 15.0,  finishPosition:  9 },
          { gatePosition:  2, horseName: "Absurde",              sp:  6.0,  finishPosition:  3 },
          { gatePosition:  3, horseName: "Fils d'Oudairies",     sp: 81.0,  finishPosition: 12 },
          { gatePosition:  4, horseName: "Ethical Diamond",      sp: 17.0,  finishPosition:  4 },
          { gatePosition:  5, horseName: "Pinot Gris",           sp: 15.0,  finishPosition:  8 },
          { gatePosition:  6, horseName: "Hansard",              sp: 17.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "Kargese",              sp:  4.0,  finishPosition:  1 },
          { gatePosition:  8, horseName: "Ndaawi",               sp: 26.0,  finishPosition:  2 },
          { gatePosition:  9, horseName: "Cracking Rhapsody",    sp: 21.0,  finishPosition:  7 },
          { gatePosition: 10, horseName: "McLaurey",             sp:  9.5,  finishPosition: 16 },
          { gatePosition: 11, horseName: "Our Champ",            sp: 15.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "Valgrand",             sp:  9.0,  finishPosition: 15 },
          { gatePosition: 13, horseName: "Lark In The Mornin",   sp:  6.5,  finishPosition: 14 },
          { gatePosition: 14, horseName: "Irish Panther",        sp: 13.0,  finishPosition: 10 },
          { gatePosition: 15, horseName: "Spirit d'Aunou",       sp: 26.0,  finishPosition:  5 },
          { gatePosition: 16, horseName: "Norman Fletcher",      sp: 41.0,  finishPosition: 11 },
        ],
      },
      {
        raceName: "Mares Chase",
        fieldSize: 9,
        top3: [
          { gatePosition:  1, horseName: "Dinoblue",             sp:  2.5  },
          { gatePosition:  2, horseName: "Brides Hill",          sp:  5.5  },
          { gatePosition:  9, horseName: "Shecouldbeanything",   sp: 13.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Dinoblue",             sp:  2.5,  finishPosition:  1 },
          { gatePosition:  2, horseName: "Brides Hill",          sp:  5.5,  finishPosition:  2 },
          { gatePosition:  3, horseName: "Limerick Lace",        sp:  4.5,  finishPosition:  5 },
          { gatePosition:  4, horseName: "Allegorie De Vassy",   sp:  5.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Fontaine Collonges",   sp: 67.0,  finishPosition:  7 },
          { gatePosition:  6, horseName: "Je T'Ai Porte",        sp: 101.0, finishPosition:  8 },
          { gatePosition:  7, horseName: "Mayhem Mya",           sp: 51.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Royale Margaux",       sp: 29.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "Shecouldbeanything",   sp: 13.0,  finishPosition:  3 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 20,
        top3: [
          { gatePosition:  9, horseName: "Jasmin De Vaux",       sp:  7.0  },
          { gatePosition: 20, horseName: "The Big Westerner",    sp:  5.5  },
          { gatePosition:  3, horseName: "Derryhassen Paddy",    sp: 11.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Argento Boy",          sp: 15.0,  finishPosition: 14 },
          { gatePosition:  2, horseName: "Ballybow",             sp: 23.0,  finishPosition: 12 },
          { gatePosition:  3, horseName: "Derryhassen Paddy",    sp: 11.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "First Confession",     sp: 51.0,  finishPosition: null },
          { gatePosition:  5, horseName: "Fishery Lane",         sp: 51.0,  finishPosition: null },
          { gatePosition:  6, horseName: "Flicker Of Hope",      sp: 26.0,  finishPosition: null },
          { gatePosition:  7, horseName: "Inn At The Park",      sp: 67.0,  finishPosition: 13 },
          { gatePosition:  8, horseName: "Intense Approach",     sp: 15.0,  finishPosition: null },
          { gatePosition:  9, horseName: "Jasmin De Vaux",       sp:  7.0,  finishPosition:  1 },
          { gatePosition: 10, horseName: "Jax Junior",           sp: 23.0,  finishPosition: null },
          { gatePosition: 11, horseName: "Jet Blue",             sp:  6.0,  finishPosition:  9 },
          { gatePosition: 12, horseName: "Jig's Forge",          sp: 126.0, finishPosition:  6 },
          { gatePosition: 13, horseName: "Ma Shantou",           sp: 26.0,  finishPosition:  7 },
          { gatePosition: 14, horseName: "Nativehill",           sp: 67.0,  finishPosition: null },
          { gatePosition: 15, horseName: "Port Joulain",         sp: 51.0,  finishPosition: 11 },
          { gatePosition: 16, horseName: "Sounds Victorius",     sp: 21.0,  finishPosition:  8 },
          { gatePosition: 17, horseName: "Wendigo",              sp: 17.0,  finishPosition:  5 },
          { gatePosition: 18, horseName: "Wingmen",              sp:  7.0,  finishPosition: 10 },
          { gatePosition: 19, horseName: "Yellow Car",           sp: 34.0,  finishPosition:  4 },
          { gatePosition: 20, horseName: "The Big Westerner",    sp:  5.5,  finishPosition:  2 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 9,
        top3: [
          { gatePosition:  6, horseName: "Inothewayurthinkin",   sp:  8.5  },
          { gatePosition:  4, horseName: "Galopin Des Champs",   sp:  1.62 },
          { gatePosition:  5, horseName: "Gentlemansgame",       sp: 41.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Ahoy Senor",           sp: 29.0,  finishPosition: null },
          { gatePosition:  2, horseName: "Banbridge",            sp:  7.5,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Corbetts Cross",       sp: 15.0,  finishPosition: null }, // fatal fall
          { gatePosition:  4, horseName: "Galopin Des Champs",   sp:  1.62, finishPosition:  2 },
          { gatePosition:  5, horseName: "Gentlemansgame",       sp: 41.0,  finishPosition:  3 },
          { gatePosition:  6, horseName: "Inothewayurthinkin",   sp:  8.5,  finishPosition:  1 },
          { gatePosition:  7, horseName: "Monty's Star",         sp:  9.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Royale Pagaille",      sp: 81.0,  finishPosition:  6 },
          { gatePosition:  9, horseName: "The Real Whacker",     sp: 29.0,  finishPosition:  5 },
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 24,
        top3: [
          { gatePosition: 23, horseName: "Wonderwall",           sp: 29.0 },
          { gatePosition: 10, horseName: "Its On The Line",      sp:  5.0 },
          { gatePosition: 22, horseName: "Willitgoahead",        sp:  7.5 },
        ],
        field: [
          { gatePosition:  1, horseName: "Allmankind",           sp: 21.0,  finishPosition: null },
          { gatePosition:  2, horseName: "Angels Breath",        sp: 67.0,  finishPosition: null },
          { gatePosition:  3, horseName: "Au Fleuron",           sp: 201.0, finishPosition: 17 },
          { gatePosition:  4, horseName: "Bardenstown Lad",      sp: 67.0,  finishPosition: 11 },
          { gatePosition:  5, horseName: "Carnfunnock",          sp: 101.0, finishPosition:  6 },
          { gatePosition:  6, horseName: "D'Jango",              sp: 67.0,  finishPosition: 14 },
          { gatePosition:  7, horseName: "Fairly Famous",        sp:  9.5,  finishPosition: null },
          { gatePosition:  8, horseName: "Go On Chez",           sp: 67.0,  finishPosition: 16 },
          { gatePosition:  9, horseName: "Haven't Time",         sp: 67.0,  finishPosition: null },
          { gatePosition: 10, horseName: "Its On The Line",      sp:  5.0,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Lift Me Up",           sp: 34.0,  finishPosition: 13 },
          { gatePosition: 12, horseName: "Lisleigh Lad",         sp: 201.0, finishPosition: null },
          { gatePosition: 13, horseName: "Music Drive",          sp: 34.0,  finishPosition:  4 },
          { gatePosition: 14, horseName: "Ontheropes",           sp: 34.0,  finishPosition:  8 },
          { gatePosition: 15, horseName: "Plan Of Attack",       sp: 67.0,  finishPosition:  7 },
          { gatePosition: 16, horseName: "Rocky's Howya",        sp: 12.0,  finishPosition: 15 },
          { gatePosition: 17, horseName: "Ryehill",              sp:  9.5,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Shearer",              sp:  7.0,  finishPosition:  5 },
          { gatePosition: 19, horseName: "Take All",             sp: 126.0, finishPosition: null },
          { gatePosition: 20, horseName: "West Of Carrig",       sp: 126.0, finishPosition: null },
          { gatePosition: 21, horseName: "What A Glance",        sp: 41.0,  finishPosition: 12 },
          { gatePosition: 22, horseName: "Willitgoahead",        sp:  7.5,  finishPosition:  3 },
          { gatePosition: 23, horseName: "Wonderwall",           sp: 29.0,  finishPosition:  1 },
          { gatePosition: 24, horseName: "Angels Dawn",          sp:  4.0,  finishPosition:  9 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition:  2, horseName: "Wodhooh",              sp:  5.5  },
          { gatePosition: 12, horseName: "Act Of Authority",     sp: 29.0  },
          { gatePosition: 17, horseName: "Raglan Road",          sp: 26.0  },
        ],
        field: [
          { gatePosition:  1, horseName: "Tounsivator",          sp: 51.0,  finishPosition: 13 },
          { gatePosition:  2, horseName: "Wodhooh",              sp:  5.5,  finishPosition:  1 },
          { gatePosition:  3, horseName: "No Ordinary Joe",      sp: 12.0,  finishPosition: 12 },
          { gatePosition:  4, horseName: "No Questions Asked",   sp: 29.0,  finishPosition: 22 },
          { gatePosition:  5, horseName: "Minella Sixo",         sp: 23.0,  finishPosition: 18 },
          { gatePosition:  6, horseName: "The Enabler",          sp: 26.0,  finishPosition: 16 },
          { gatePosition:  7, horseName: "Uncle Bert",           sp: 51.0,  finishPosition:  9 },
          { gatePosition:  8, horseName: "Kopeck De Mee",        sp:  3.5,  finishPosition: 20 },
          { gatePosition:  9, horseName: "Taponthego",           sp:  9.0,  finishPosition:  4 },
          { gatePosition: 10, horseName: "Karafon",              sp: 26.0,  finishPosition: 21 },
          { gatePosition: 11, horseName: "Push The Button",      sp: 81.0,  finishPosition:  6 },
          { gatePosition: 12, horseName: "Act Of Authority",     sp: 29.0,  finishPosition:  2 },
          { gatePosition: 13, horseName: "Nurse Susan",          sp: 17.0,  finishPosition: 11 },
          { gatePosition: 14, horseName: "Doyen Quest",          sp: 41.0,  finishPosition: 19 },
          { gatePosition: 15, horseName: "Electric Mason",       sp: 34.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "Park Of Kings",        sp: 26.0,  finishPosition:  5 },
          { gatePosition: 17, horseName: "Raglan Road",          sp: 26.0,  finishPosition:  3 },
          { gatePosition: 18, horseName: "Flash Collonges",      sp: 151.0, finishPosition: null },
          { gatePosition: 19, horseName: "Punctuation",          sp: 41.0,  finishPosition: 15 },
          { gatePosition: 20, horseName: "Stormbreaker",         sp: 81.0,  finishPosition: 10 },
          { gatePosition: 21, horseName: "Mordor",               sp: 67.0,  finishPosition:  8 },
          { gatePosition: 22, horseName: "East India Express",   sp:  5.0,  finishPosition:  7 },
          { gatePosition: 23, horseName: "Harsh",                sp: 101.0, finishPosition: 17 },
          { gatePosition: 24, horseName: "Wilde About Oscar",    sp: 151.0, finishPosition: null },
        ],
      },
      // ─── Thursday 13 March 2025 ────────────────────────────────────────────
      {
        raceName: "Dawn Run Mares' Hurdle",
        fieldSize: 23,
        top3: [
          { gatePosition:  1, horseName: "Air Of Entitlement",  sp:  17.0  },
          { gatePosition: 21, horseName: "Sixandahalf",         sp:   2.833 },
          { gatePosition:  6, horseName: "Diva Luna",           sp:  13.0  },
        ],
        field: [
          // NR: Disco Dancer (cloth #5)
          { gatePosition:  1, horseName: "Air Of Entitlement",  sp:  17.0,  finishPosition:  1 },
          { gatePosition:  2, horseName: "Aurora Vega",         sp:  10.0,  finishPosition: 11 },
          { gatePosition:  3, horseName: "Bluey",               sp:  15.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Brendas Asking",      sp: 201.0,  finishPosition: 18 },
          { gatePosition:  6, horseName: "Diva Luna",           sp:  13.0,  finishPosition:  3 },
          { gatePosition:  7, horseName: "Hollygrove Cha Cha",  sp:  23.0,  finishPosition: null }, // PU
          { gatePosition:  8, horseName: "Jane Eire",           sp:  67.0,  finishPosition: 10 },
          { gatePosition:  9, horseName: "Jubilee Alpha",       sp:   8.5,  finishPosition:  8 },
          { gatePosition: 10, horseName: "Just A Rose",         sp:  26.0,  finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Karamoja",            sp:  29.0,  finishPosition:  7 },
          { gatePosition: 12, horseName: "Karoline Banbou",     sp:  11.0,  finishPosition:  4 },
          { gatePosition: 13, horseName: "Kimi De Mai",         sp:  67.0,  finishPosition: 14 },
          { gatePosition: 14, horseName: "Kitty Foyle",         sp: 201.0,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Lagertha",            sp: 201.0,  finishPosition: 19 },
          { gatePosition: 16, horseName: "Magic McColgan",      sp: 101.0,  finishPosition: 12 },
          { gatePosition: 17, horseName: "Maughreen",           sp:  12.0,  finishPosition: 20 },
          { gatePosition: 18, horseName: "Metkayina",           sp:  51.0,  finishPosition:  5 },
          { gatePosition: 19, horseName: "Mystical Goddess",    sp: 151.0,  finishPosition: 17 },
          { gatePosition: 20, horseName: "Queenie St Clair",    sp: 251.0,  finishPosition: 15 },
          { gatePosition: 21, horseName: "Sixandahalf",         sp:   2.833, finishPosition:  2 },
          { gatePosition: 22, horseName: "Tour Ovalie",         sp: 101.0,  finishPosition:  9 },
          { gatePosition: 23, horseName: "Venusienne",          sp:  34.0,  finishPosition: 16 },
          { gatePosition: 24, horseName: "Galileo Dame",        sp:   5.5,  finishPosition:  6 },
        ],
      },
      {
        raceName: "Turners Novices' Chase",
        fieldSize: 19,
        top3: [
          { gatePosition:  3, horseName: "Caldwell Potter",    sp:   8.0  },
          { gatePosition: 10, horseName: "Anyway",             sp: 126.0  },
          { gatePosition:  9, horseName: "O'Moore Park",       sp:  67.0  },
        ],
        field: [
          // NR: Ryan's Rocket (cloth #19)
          { gatePosition:  1, horseName: "Springwell Bay",     sp:   7.5,  finishPosition: null }, // F (fatally injured)
          { gatePosition:  2, horseName: "Firefox",            sp:   5.0,  finishPosition:  6 },
          { gatePosition:  3, horseName: "Caldwell Potter",    sp:   8.0,  finishPosition:  1 },
          { gatePosition:  4, horseName: "Dee Capo",           sp:  51.0,  finishPosition: 12 },
          { gatePosition:  5, horseName: "Answer To Kayf",     sp:  15.0,  finishPosition: 11 },
          { gatePosition:  6, horseName: "Asian Master",       sp:   8.5,  finishPosition:  9 },
          { gatePosition:  7, horseName: "Insurrection",       sp:  26.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Nurburgring",        sp:  10.0,  finishPosition:  4 },
          { gatePosition:  9, horseName: "O'Moore Park",       sp:  67.0,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Anyway",             sp: 126.0,  finishPosition:  2 },
          { gatePosition: 11, horseName: "San Salvador",       sp:  41.0,  finishPosition: 15 },
          { gatePosition: 12, horseName: "The Other Mozzie",   sp:  21.0,  finishPosition:  7 },
          { gatePosition: 13, horseName: "What's Up Darling",  sp:  23.0,  finishPosition: null }, // BD
          { gatePosition: 14, horseName: "Pic Roc",            sp:   9.5,  finishPosition: 13 },
          { gatePosition: 15, horseName: "Densworth",          sp:  51.0,  finishPosition: 14 },
          { gatePosition: 16, horseName: "Moon d'Orange",      sp:   8.0,  finishPosition: null }, // PU
          { gatePosition: 17, horseName: "Lord Of Thunder",    sp:  13.0,  finishPosition: 10 },
          { gatePosition: 18, horseName: "Es Perfecto",        sp:  34.0,  finishPosition:  5 },
          { gatePosition: 20, horseName: "Shanbally Kid",      sp:  67.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Pertemps Final",
        fieldSize: 24,
        top3: [
          { gatePosition: 19, horseName: "Doddiethegreat",      sp: 26.0 },
          { gatePosition: 10, horseName: "Jeriko Du Reponet",   sp:  6.5 },
          { gatePosition: 20, horseName: "Catch Him Derry",     sp: 15.0 },
        ],
        field: [
          { gatePosition:  1, horseName: "Thomas Mor",          sp:  41.0,  finishPosition: 15 },
          { gatePosition:  2, horseName: "Karl Des Tourelles",  sp:  21.0,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Bugise Seagull",      sp:  34.0,  finishPosition: null }, // PU
          { gatePosition:  4, horseName: "Win Some Lose Some",  sp:   9.0,  finishPosition: 14 },
          { gatePosition:  5, horseName: "Harbour Lake",        sp:  34.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Supreme Gift",        sp:  67.0,  finishPosition: 13 },
          { gatePosition:  7, horseName: "D Art D Art",         sp:   8.0,  finishPosition:  8 },
          { gatePosition:  8, horseName: "Feet Of A Dancer",    sp:   8.5,  finishPosition:  4 },
          { gatePosition:  9, horseName: "Lucky Lyreen",        sp:  34.0,  finishPosition: 19 },
          { gatePosition: 10, horseName: "Jeriko Du Reponet",   sp:   6.5,  finishPosition:  2 },
          { gatePosition: 11, horseName: "Patter Merchant",     sp:  17.0,  finishPosition:  9 },
          { gatePosition: 12, horseName: "Henri The Second",    sp:  17.0,  finishPosition: 17 },
          { gatePosition: 13, horseName: "Will The Wise",       sp:   9.0,  finishPosition:  6 },
          { gatePosition: 14, horseName: "One Big Bang",        sp:  15.0,  finishPosition:  5 },
          { gatePosition: 15, horseName: "Super Survivor",      sp:  26.0,  finishPosition: 11 },
          { gatePosition: 16, horseName: "J'Ai Froid",          sp: 101.0,  finishPosition: 18 },
          { gatePosition: 17, horseName: "Maxi Mac Gold",       sp:  34.0,  finishPosition: 20 },
          { gatePosition: 18, horseName: "Shanagh Bob",         sp:  26.0,  finishPosition: 16 },
          { gatePosition: 19, horseName: "Doddiethegreat",      sp:  26.0,  finishPosition:  1 },
          { gatePosition: 20, horseName: "Catch Him Derry",     sp:  15.0,  finishPosition:  3 },
          { gatePosition: 21, horseName: "Guard The Moon",      sp:  34.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Zain Nights",         sp:  21.0,  finishPosition: null }, // PU
          { gatePosition: 23, horseName: "Idem",                sp:  29.0,  finishPosition: 10 },
          { gatePosition: 24, horseName: "American Sniper",     sp:  41.0,  finishPosition: 12 },
        ],
      },
      {
        raceName: "Ryanair Chase",
        fieldSize: 9,
        top3: [
          { gatePosition: 3, horseName: "Fact To File",   sp:  2.5  },
          { gatePosition: 5, horseName: "Heart Wood",     sp: 19.0  },
          { gatePosition: 2, horseName: "Envoi Allen",    sp: 13.0  },
        ],
        field: [
          { gatePosition: 1, horseName: "Djelo",          sp:   8.5,  finishPosition:  7 },
          { gatePosition: 2, horseName: "Envoi Allen",    sp:  13.0,  finishPosition:  3 },
          { gatePosition: 3, horseName: "Fact To File",   sp:   2.5,  finishPosition:  1 },
          { gatePosition: 4, horseName: "Hang In There",  sp:  67.0,  finishPosition: null }, // PU
          { gatePosition: 5, horseName: "Heart Wood",     sp:  19.0,  finishPosition:  2 },
          { gatePosition: 6, horseName: "Il Est Francais", sp:  4.333, finishPosition:  6 },
          { gatePosition: 7, horseName: "Jungle Boogie",  sp:  17.0,  finishPosition: null }, // PU
          { gatePosition: 8, horseName: "Master Chewy",   sp:  41.0,  finishPosition:  5 },
          { gatePosition: 9, horseName: "Protektorat",    sp:   6.0,  finishPosition:  4 },
        ],
      },
      {
        raceName: "Stayers' Hurdle",
        fieldSize: 13,
        top3: [
          { gatePosition:  1, horseName: "Bob Olinger",   sp:  9.0  },
          { gatePosition: 14, horseName: "Teahupoo",      sp:  2.75 },
          { gatePosition: 15, horseName: "The Wallpark",  sp:  8.0  },
        ],
        field: [
          // NR: Langer Dan (cloth #8), Monmiral (cloth #10)
          { gatePosition:  1, horseName: "Bob Olinger",      sp:   9.0,  finishPosition:  1 },
          { gatePosition:  2, horseName: "Buddy One",        sp:  51.0,  finishPosition:  5 },
          { gatePosition:  3, horseName: "Crambo",           sp:  41.0,  finishPosition: null }, // F
          { gatePosition:  4, horseName: "Franciscan Rock",  sp:  81.0,  finishPosition:  6 },
          { gatePosition:  5, horseName: "Ga Law",           sp:  51.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Gowel Road",       sp:  34.0,  finishPosition:  8 },
          { gatePosition:  7, horseName: "Home By The Lee",  sp:   7.5,  finishPosition: null }, // UR
          { gatePosition:  9, horseName: "Lucky Place",      sp:   6.5,  finishPosition:  7 },
          { gatePosition: 11, horseName: "Mystical Power",   sp:  15.0,  finishPosition: null }, // PU
          { gatePosition: 12, horseName: "Nemean Lion",      sp:  17.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Rocky's Diamond",  sp:  29.0,  finishPosition:  4 },
          { gatePosition: 14, horseName: "Teahupoo",         sp:   2.75, finishPosition:  2 },
          { gatePosition: 15, horseName: "The Wallpark",     sp:   8.0,  finishPosition:  3 },
        ],
      },
      {
        raceName: "Plate Handicap Chase",
        fieldSize: 20,
        top3: [
          { gatePosition: 13, horseName: "Jagwar",             sp:  4.0  },
          { gatePosition: 14, horseName: "Thecompanysergeant", sp:  5.0  },
          { gatePosition:  9, horseName: "Masaccio",           sp: 12.0  },
        ],
        field: [
          // NR: Lord Of Thunder (cloth #19)
          { gatePosition:  1, horseName: "Conflated",           sp:  41.0,  finishPosition:  8 },
          { gatePosition:  2, horseName: "Ginny's Destiny",     sp:   9.0,  finishPosition:  7 },
          { gatePosition:  3, horseName: "Jordans",             sp:  10.0,  finishPosition:  5 },
          { gatePosition:  4, horseName: "Fugitif",             sp:  21.0,  finishPosition: 15 },
          { gatePosition:  5, horseName: "Path d'Oroux",        sp:  13.0,  finishPosition: 11 },
          { gatePosition:  6, horseName: "Shakem Up'arry",      sp:  21.0,  finishPosition: 14 },
          { gatePosition:  7, horseName: "Il Ridoto",           sp:  26.0,  finishPosition: 12 },
          { gatePosition:  8, horseName: "La Malmason",         sp:  29.0,  finishPosition: 13 },
          { gatePosition:  9, horseName: "Masaccio",            sp:  12.0,  finishPosition:  3 },
          { gatePosition: 10, horseName: "Gemirande",           sp:  29.0,  finishPosition: 17 },
          { gatePosition: 11, horseName: "Seddon",              sp:  29.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "Tahmuras",            sp:  81.0,  finishPosition: null }, // PU
          { gatePosition: 13, horseName: "Jagwar",              sp:   4.0,  finishPosition:  1 },
          { gatePosition: 14, horseName: "Thecompanysergeant",  sp:   5.0,  finishPosition:  2 },
          { gatePosition: 15, horseName: "Personal Ambition",   sp:  10.0,  finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Riaan",               sp:  67.0,  finishPosition:  6 },
          { gatePosition: 17, horseName: "Mars Harper",         sp: 101.0,  finishPosition:  4 },
          { gatePosition: 18, horseName: "An Peann Dearg",      sp:  19.0,  finishPosition: 16 },
          { gatePosition: 20, horseName: "Demnat",              sp:  21.0,  finishPosition:  9 },
          { gatePosition: 21, horseName: "Individualiste",      sp: 101.0,  finishPosition: null }, // PU
        ],
      },
      {
        raceName: "Kim Muir",
        fieldSize: 23,
        top3: [
          { gatePosition: 18, horseName: "Daily Present",  sp: 13.0 },
          { gatePosition:  4, horseName: "Johnnywho",      sp:  5.5 },
          { gatePosition:  3, horseName: "Sa Majeste",     sp:  9.0 },
        ],
        field: [
          // NR: Where It All Began (cloth #15)
          { gatePosition:  1, horseName: "Fantastic Lady",       sp:  23.0,  finishPosition: null }, // PU
          { gatePosition:  2, horseName: "Yeah Man",             sp:  12.0,  finishPosition:  9 },
          { gatePosition:  3, horseName: "Sa Majeste",           sp:   9.0,  finishPosition:  3 },
          { gatePosition:  4, horseName: "Johnnywho",            sp:   5.5,  finishPosition:  2 },
          { gatePosition:  5, horseName: "Gelino Bello",         sp:  51.0,  finishPosition: null }, // PU
          { gatePosition:  6, horseName: "Mint Boy",             sp:   9.0,  finishPosition: null }, // UR
          { gatePosition:  7, horseName: "Weveallbeencaught",    sp:  29.0,  finishPosition:  4 },
          { gatePosition:  8, horseName: "Cleatus Poolaw",       sp:  34.0,  finishPosition: null }, // PU
          { gatePosition:  9, horseName: "Manothepeople",        sp:  41.0,  finishPosition:  5 },
          { gatePosition: 10, horseName: "Sine Nomine",          sp:  41.0,  finishPosition: null }, // PU
          { gatePosition: 11, horseName: "Git Maker",            sp:  15.0,  finishPosition: 10 },
          { gatePosition: 12, horseName: "Nine Graces",          sp:  12.0,  finishPosition: 12 },
          { gatePosition: 13, horseName: "Midnight Our Fred",    sp:   9.0,  finishPosition: null }, // PU
          { gatePosition: 14, horseName: "Music Of Tara",        sp:  21.0,  finishPosition: null }, // PU
          { gatePosition: 16, horseName: "Westerninthepark",     sp:  17.0,  finishPosition: 13 },
          { gatePosition: 17, horseName: "Wiseguy",              sp:  29.0,  finishPosition:  7 },
          { gatePosition: 18, horseName: "Daily Present",        sp:  13.0,  finishPosition:  1 },
          { gatePosition: 19, horseName: "Galop De Chasse",      sp:  81.0,  finishPosition: null }, // PU
          { gatePosition: 20, horseName: "Now Where Or When",    sp:  81.0,  finishPosition: null }, // PU
          { gatePosition: 21, horseName: "Pats Fancy",           sp: 126.0,  finishPosition: null }, // PU
          { gatePosition: 22, horseName: "Grozni",               sp:  34.0,  finishPosition:  6 },
          { gatePosition: 23, horseName: "Walking On Air",       sp:   8.0,  finishPosition: 11 },
          { gatePosition: 24, horseName: "Dom Of Mary",          sp:  51.0,  finishPosition:  8 },
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
