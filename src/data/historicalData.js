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
        fieldSize: 16,
        top3: [
          { gatePosition:  8, horseName: "Ivanovich Gorbatov",  sp:  5.5  },
          { gatePosition: 14, horseName: "Apple's Jade",        sp: 13.0  },
          { gatePosition:  5, horseName: "Footpad",             sp:  6.0  },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 28,
        top3: [
          { gatePosition:  4, horseName: "Superb Story",        sp:  9.0  },
          { gatePosition: 19, horseName: "Fethard Player",      sp: 34.0  },
          { gatePosition: 10, horseName: "Sternrubin",          sp: 34.0  },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 19,
        top3: [
          { gatePosition:  9, horseName: "Unowhatimeanharry",   sp: 12.0  },
          { gatePosition:  4, horseName: "Fagan",               sp: 34.0  },
          { gatePosition: 12, horseName: "Champers On Ice",     sp: 21.0  },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 9,
        top3: [
          { gatePosition:  4, horseName: "Don Cossack",         sp:  3.25 },
          { gatePosition:  3, horseName: "Djakadam",            sp:  5.5  },
          { gatePosition:  5, horseName: "Don Poli",            sp:  5.5  },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 9,
        top3: [
          { gatePosition:  1, horseName: "On The Fringe",       sp:  2.625 },
          { gatePosition:  5, horseName: "Marito",              sp: 15.0  },
          { gatePosition:  7, horseName: "Paint The Clouds",    sp:  5.5  },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 24,
        top3: [
          { gatePosition: 21, horseName: "Solar Impulse",       sp: 29.0  },
          { gatePosition:  7, horseName: "Dandridge",           sp:  9.0  },
          { gatePosition: 20, horseName: "Rock The World",      sp:  5.5  },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 24,
        top3: [
          { gatePosition: 16, horseName: "Ibis Du Rheu",        sp: 15.0  },
          { gatePosition: 15, horseName: "Flying Angel",        sp:  9.0  },
          { gatePosition: 22, horseName: "Sky Khan",            sp: 51.0  },
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
      },
      {
        raceName: "County Hurdle",
        fieldSize: 25,
        top3: [
          { gatePosition:  1, horseName: "Arctic Fire",         sp: 21.0  },
          { gatePosition:  2, horseName: "L'Ami Serge",         sp: 26.0  },
          { gatePosition: 24, horseName: "Ozzie The Oscar",     sp: 51.0  },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 15,
        top3: [
          { gatePosition:  9, horseName: "Penhill",             sp: 17.0  },
          { gatePosition:  8, horseName: "Monalee",             sp:  9.0  },
          { gatePosition: 14, horseName: "Wholestone",          sp:  7.5  },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 13,
        top3: [
          { gatePosition: 12, horseName: "Sizing John",         sp:  8.0  },
          { gatePosition:  7, horseName: "Minella Rocco",       sp: 19.0  },
          { gatePosition:  9, horseName: "Native River",        sp:  4.5  },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: 23,
        top3: [
          { gatePosition: 17, horseName: "Pacha Du Polder",     sp: 17.0  },
          { gatePosition: 24, horseName: "Wonderful Charm",     sp:  4.5  },
          { gatePosition:  5, horseName: "Barel Of Laughs",     sp: 101.0 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: 24,
        top3: [
          { gatePosition:  4, horseName: "Rock The World",      sp: 11.0  },
          { gatePosition: 11, horseName: "Gardefort",           sp: 21.0  },
          { gatePosition: 14, horseName: "Theinval",            sp: 10.0  },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 23,
        top3: [
          { gatePosition: 12, horseName: "Champagne Classic",   sp: 13.0  },
          { gatePosition: 23, horseName: "Presenting Percy",    sp: 26.0  },
          { gatePosition:  5, horseName: "Bedrock",             sp:  8.0  },
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

// ─── 2020 – 13 March ────────────────────────────────────────────────────────
  2020: {
    date: "13 March 2020",
    races: [
      {
        raceName: "Triumph Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Burning Victory",    sp: 13.0 },
          { gatePosition: null, horseName: "Aspire Tower",       sp:  6.0 },
          { gatePosition: null, horseName: "Allmankind",         sp:  4.5 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Saint Roi",          sp:  6.5 },
          { gatePosition: null, horseName: "Aramon",             sp:  9.0 },
          { gatePosition: null, horseName: "Embittered",         sp: 15.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Monkfish",           sp:  6.0 },
          { gatePosition: null, horseName: "Latest Exhibition",  sp:  5.5 },
          { gatePosition: null, horseName: "Fury Road",          sp:  6.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Al Boum Photo",      sp:  4.33 },
          { gatePosition: null, horseName: "Santini",            sp:  6.0  },
          { gatePosition: null, horseName: "Lostintranslation",  sp: 11.0  },
        ],
      },
      {
        raceName: "Foxhunter Chase",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "It Came To Pass",    sp: 67.0 },
          { gatePosition: null, horseName: "Billaway",           sp:  3.75 },
          { gatePosition: null, horseName: "Shantou Flyer",      sp:  4.0 },
        ],
      },
      {
        raceName: "Grand Annual",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Chosen Mate",        sp:  4.5 },
          { gatePosition: null, horseName: "Eclair De Beaufeu",  sp:  7.5 },
          { gatePosition: null, horseName: "Us And Them",        sp: 11.0 },
        ],
      },
      {
        raceName: "Martin Pipe",
        fieldSize: null,
        top3: [
          { gatePosition: null, horseName: "Indefatigable",      sp: 26.0 },
          { gatePosition: null, horseName: "Pileon",             sp: 10.0 },
          { gatePosition: null, horseName: "Great White Shark",  sp: 41.0 },
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
          { gatePosition:  4, horseName: "Quilixios",          sp:  3.0 },
          { gatePosition:  3, horseName: "Adagio",             sp: 11.0 },
          { gatePosition:  2, horseName: "Haut En Couleurs",   sp: 21.0 },
        ],
      },
      {
        raceName: "County Hurdle",
        fieldSize: 25,
        top3: [
          { gatePosition: 26, horseName: "Belfast Banter",     sp: 34.0 },
          { gatePosition:  1, horseName: "Petit Mouchoir",     sp: 23.0 },
          { gatePosition: 15, horseName: "Milkwood",           sp: 29.0 },
        ],
      },
      {
        raceName: "Albert Bartlett",
        fieldSize: 16,
        top3: [
          { gatePosition:  1, horseName: "Vanillier",          sp: 15.0 },
          { gatePosition: 10, horseName: "Oscar Elite",        sp: 41.0 },
          { gatePosition: 13, horseName: "Streets Of Doyen",   sp: 11.0 },
        ],
      },
      {
        raceName: "Gold Cup",
        fieldSize: 12,
        top3: [
          { gatePosition:  5, horseName: "Minella Indo",       sp: 10.0 },
          { gatePosition:  2, horseName: "A Plus Tard",        sp:  4.33 },
          { gatePosition:  1, horseName: "Al Boum Photo",      sp:  3.25 },
        ],
      },
      {
        raceName: "Hunters Chase",
        fieldSize: 18,
        top3: [
          { gatePosition:  1, horseName: "Porlock Bay",        sp: 17.0 },
          { gatePosition:  2, horseName: "Billaway",           sp:  3.0 },
          { gatePosition: null, horseName: "Staker Wallace",     sp: 10.0 },
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
      },
      {
        raceName: "Martin Pipe",
        fieldSize: 22,
        top3: [
          { gatePosition:  5, horseName: "Galopin Des Champs", sp:  9.0 },
          { gatePosition:  2, horseName: "Langer Dan",         sp:  7.5 },
          { gatePosition:  1, horseName: "Floueur",            sp: 34.0 },
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
        fieldSize: 9,
        top3: [
          { gatePosition:  6, horseName: "Inothewayurthinkin",  sp:  8.5  },
          { gatePosition:  4, horseName: "Galopin Des Champs",  sp:  1.62 },
          { gatePosition:  5, horseName: "Gentlemansgame",      sp: 41.0  },
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
