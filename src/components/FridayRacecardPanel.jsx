import { useState } from 'react';

/**
 * FridayRacecardPanel.jsx
 *
 * Route: /friday-racecard
 *
 * Displays the Friday 14 March 2026 Cheltenham racecard.
 * Odds column is a placeholder — to be filled in on race day.
 */

// ── Data ─────────────────────────────────────────────────────────────────────

const RACES = [
  {
    time: '13:20',
    name: 'JCB Triumph Hurdle',
    grade: 'Grade 1',
    distance: '2m 179y',
    runners: 20,
    prize: '£150,000',
    runners: [
      { no: 1,  horse: 'Apolon De Charnie (FR)',   form: '2',        age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'Mr P W Mullins',    rating: 0.5 },
      { no: 2,  horse: 'Berto Ramirez',             form: '574',      age: 4, wt: '11-2', or: 115,  trainer: 'A J McNamara',    jockey: 'Darragh O\'Keeffe', rating: 0.0 },
      { no: 3,  horse: 'Fantasy World (IRE)',        form: '43',       age: 4, wt: '11-2', or: null, trainer: 'N J Henderson',   jockey: 'N de Boinville',    rating: 3.5 },
      { no: 4,  horse: 'Forty Fifty (FR)',           form: '4',        age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'J J Burke',         rating: 0.0 },
      { no: 5,  horse: 'Indian River (IRE)',         form: '111',      age: 4, wt: '11-2', or: 122,  trainer: 'A Keatley',       jockey: 'Kielan Woods',      rating: 3.0 },
      { no: 6,  horse: 'Kai Lung (FR)',              form: '1',        age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'Sean O\'Keeffe',    rating: 0.5 },
      { no: 7,  horse: 'Lord Byron (IRE)',           form: '244',      age: 4, wt: '11-2', or: 123,  trainer: 'Faye Bramley',    jockey: 'Ben Jones',         rating: 1.5 },
      { no: 8,  horse: 'Macho Man (FR)',             form: '1-2',      age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'Brian Hayes',       rating: 1.0 },
      { no: 9,  horse: 'Maestro Conti (FR)',         form: '111',      age: 4, wt: '11-2', or: 135,  trainer: 'D Skelton',       jockey: 'Harry Skelton',     rating: 5.0 },
      { no: 10, horse: 'Minella Academy (IRE)',      form: '1',        age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'Danny Mullins',     rating: 0.5 },
      { no: 11, horse: 'Minella Study',              form: '1-11',     age: 4, wt: '11-2', or: 139,  trainer: 'A Nicol',         jockey: 'Ryan Mania',        rating: 4.5 },
      { no: 12, horse: 'Mon Creuset (FR)',           form: '1-4',      age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'H Cobden',          rating: 0.5 },
      { no: 13, horse: 'North Shore (FR)',           form: '34',       age: 4, wt: '11-2', or: null, trainer: 'G P Cromwell',    jockey: 'Keith Donoghue',    rating: 1.5 },
      { no: 14, horse: 'One Horse Town (IRE)',       form: '111322',   age: 4, wt: '11-2', or: 132,  trainer: 'Harry Derham',    jockey: 'Paul O\'Brien',     rating: 3.0 },
      { no: 15, horse: 'Proactif (FR)',              form: '1-1',      age: 4, wt: '11-2', or: null, trainer: 'W P Mullins',     jockey: 'Mark Walsh',        rating: 1.0 },
      { no: 16, horse: 'Wolf Rayet (IRE)',           form: '243',      age: 4, wt: '11-2', or: 120,  trainer: 'S Drinkwater',    jockey: 'R T Dunne',         rating: 0.5 },
      { no: 17, horse: 'Highland Crystal (IRE)',     form: '111',      age: 4, wt: '10-9', or: 133,  trainer: 'G Elliott',       jockey: 'Jack Kennedy',      rating: 3.0 },
      { no: 18, horse: 'Noemie De La Vis (FR)',      form: '2-2',      age: 4, wt: '10-9', or: null, trainer: 'W P Mullins',     jockey: 'Daniel King',       rating: 0.0 },
      { no: 19, horse: 'Selma De Vary (FR)',         form: '2-512',    age: 4, wt: '10-9', or: 136,  trainer: 'W P Mullins',     jockey: 'Paul Townend',      rating: 2.5 },
      { no: 20, horse: 'Tenter Le Tout (FR)',        form: '4116',     age: 4, wt: '10-9', or: 123,  trainer: 'Chester Williams', jockey: 'G Sheehan',        rating: 4.0 },
    ],
  },
  {
    time: '14:00',
    name: 'William Hill County Handicap Hurdle',
    grade: 'Premier Handicap',
    distance: '2m 179y',
    runners: 23,
    prize: '£110,000',
    runners: [
      { no: 1,  horse: 'Ndaawi',                    form: '36/22-13',  age: 6, wt: '12-0',  or: 156,  trainer: 'G Elliott',       jockey: 'Josh Williamson',   rating: 1.5 },
      { no: 2,  horse: 'Absurde (FR)',               form: '6P41/31-',  age: 8, wt: '11-13', or: 155,  trainer: 'W P Mullins',     jockey: 'Mr P W Mullins',    rating: 4.0 },
      { no: 3,  horse: 'Bowensonfire (FR)',          form: '333211',    age: 6, wt: '11-11', or: 153,  trainer: 'G Elliott',       jockey: 'Jack Kennedy',      rating: 5.0 },
      { no: 4,  horse: 'Karbau (FR)',                form: '41033-2',   age: 6, wt: '11-8',  or: 150,  trainer: 'W P Mullins',     jockey: 'Paul Townend',      rating: 4.5 },
      { no: 5,  horse: 'Hello Neighbour (IRE)',      form: '1163-57',   age: 5, wt: '11-6',  or: 148,  trainer: 'G P Cromwell',    jockey: 'Keith Donoghue',    rating: 2.0 },
      { no: 6,  horse: 'Wilful (IRE)',               form: 'P12-312',   age: 7, wt: '11-2',  or: 144,  trainer: 'J & A O\'Neill',  jockey: 'Jonjo O\'Neill Jr.', rating: 5.0 },
      { no: 7,  horse: 'Pinot Gris (IRE)',           form: '21287-0',   age: 6, wt: '11-1',  or: 143,  trainer: 'H De Bromhead',   jockey: 'Darragh O\'Keeffe', rating: 0.5 },
      { no: 8,  horse: 'Murcia (FR)',                form: '2814-34',   age: 5, wt: '11-0',  or: 142,  trainer: 'W P Mullins',     jockey: 'Danny Mullins',     rating: 2.5 },
      { no: 9,  horse: 'Tripoli Flyer (IRE)',        form: '63-U452',   age: 7, wt: '11-0',  or: 142,  trainer: 'F O\'Brien',      jockey: 'Fern O\'Brien',     rating: 2.5 },
      { no: 10, horse: 'Helvic Dream (IRE)',         form: '32525-2',   age: 9, wt: '10-13', or: 141,  trainer: 'N Meade',         jockey: 'Donagh Meyler',     rating: 0.0 },
      { no: 11, horse: 'Sixandahalf (IRE)',          form: '1/123-24',  age: 6, wt: '10-11', or: 139,  trainer: 'G P Cromwell',    jockey: 'Conor Stone-Walsh', rating: 1.0 },
      { no: 12, horse: 'Jubilee Alpha (IRE)',        form: '81-2522',   age: 7, wt: '10-11', or: 139,  trainer: 'P F Nicholls',    jockey: 'H Cobden',          rating: 3.0 },
      { no: 13, horse: 'Williethebuilder (IRE)',     form: '632114',    age: 7, wt: '10-10', or: 138,  trainer: 'Christian Williams', jockey: 'Jack Tudor',     rating: 4.0 },
      { no: 14, horse: 'Sticktotheplan (FR)',        form: '121130',    age: 6, wt: '10-10', or: 138,  trainer: 'O Murphy',        jockey: 'S Bowen',           rating: 4.5 },
      { no: 15, horse: 'Cracking Rhapsody (IRE)',   form: '71-0666',   age: 7, wt: '10-8',  or: 136,  trainer: 'Ewan Whillans',   jockey: 'Craig Nichol',      rating: 0.5 },
      { no: 16, horse: 'Joyeuse (FR)',               form: '69-2294',   age: 7, wt: '10-7',  or: 135,  trainer: 'N J Henderson',   jockey: 'N de Boinville',    rating: 2.5 },
      { no: 17, horse: 'Gibbs Island',               form: 'P8-1057',   age: 5, wt: '10-6',  or: 134,  trainer: 'T Lacey',         jockey: 'Stan Sheppard',     rating: 1.0 },
      { no: 18, horse: 'Hamlet\'s Night (IRE)',      form: '211220',    age: 5, wt: '10-6',  or: 134,  trainer: 'James Owen',      jockey: 'James Bowen',       rating: 3.0, nr: true },
      { no: 19, horse: 'Balko D\'ange (FR)',         form: '4513F6',    age: 6, wt: '10-6',  or: 134,  trainer: 'P Fenton',        jockey: 'Brian Hayes',       rating: 1.0 },
      { no: 20, horse: 'Bowmore (IRE)',              form: '433-213',   age: 8, wt: '10-6',  or: 134,  trainer: 'C E Longsdon',    jockey: 'Daire James McConville', rating: 3.0 },
      { no: 21, horse: 'Tellherthename (IRE)',       form: '10/4P5-3',  age: 7, wt: '10-5',  or: 133,  trainer: 'D Skelton',       jockey: 'Kielan Woods',      rating: 2.0 },
      { no: 22, horse: 'Sinnatra (IRE)',             form: '4-22131',   age: 6, wt: '10-5',  or: 133,  trainer: 'D Skelton',       jockey: 'Harry Skelton',     rating: 5.0 },
      { no: 23, horse: 'Secret Squirrel',            form: '5/3F1F-3',  age: 7, wt: '10-5',  or: 133,  trainer: 'H Morrison',      jockey: 'J J Burke',         rating: 1.0 },
      { no: 24, horse: 'Ooh Betty (IRE)',            form: '03-0001',   age: 8, wt: '10-4',  or: 132,  trainer: 'Ben Clarke',      jockey: 'Ben Jones',         rating: 3.0 },
    ],
  },
  {
    time: '14:40',
    name: 'Mrs Paddy Power Mares\' Chase',
    grade: 'Grade 2',
    distance: '2m 4f 127y',
    runners: 9,
    prize: '£130,000',
    runners: [
      { no: 1, horse: 'Spindleberry (IRE)',   form: '111-11P',  age: 8,  wt: '11-7', or: 153, trainer: 'W P Mullins',    jockey: 'Paul Townend',      rating: 3.5 },
      { no: 2, horse: 'Dinoblue (FR)',         form: '111-211',  age: 9,  wt: '11-5', or: 159, trainer: 'W P Mullins',    jockey: 'Mark Walsh',        rating: 3.5 },
      { no: 3, horse: 'July Flower (FR)',      form: '155-113',  age: 7,  wt: '11-5', or: 143, trainer: 'H De Bromhead',  jockey: 'Darragh O\'Keeffe', rating: 1.5 },
      { no: 4, horse: 'Only By Night (IRE)',   form: '1122-15',  age: 8,  wt: '11-5', or: 148, trainer: 'G P Cromwell',   jockey: 'Keith Donoghue',    rating: 2.0 },
      { no: 5, horse: 'All The Glory',         form: '0-26334',  age: 9,  wt: '11-2', or: 127, trainer: 'J & A O\'Neill', jockey: 'Jonjo O\'Neill Jr.', rating: 0.0 },
      { no: 6, horse: 'Diva Luna (IRE)',       form: '1237-11',  age: 7,  wt: '11-2', or: 143, trainer: 'B Pauling',      jockey: 'Ben Jones',         rating: 3.5 },
      { no: 7, horse: 'Panic Attack (IRE)',    form: '312-111',  age: 10, wt: '11-2', or: 147, trainer: 'D Skelton',      jockey: 'Harry Skelton',     rating: 5.0 },
      { no: 8, horse: 'Piper Park (IRE)',      form: '13/6-2',   age: 7,  wt: '11-2', or: null, trainer: 'T Lacey',       jockey: 'Stan Sheppard',     rating: 0.0 },
      { no: 9, horse: 'Telepathique',          form: '211-242',  age: 8,  wt: '11-2', or: 147, trainer: 'L Wadham',       jockey: 'Tom Cannon',        rating: 1.5 },
    ],
  },
  {
    time: '15:20',
    name: 'Albert Bartlett Novices\' Hurdle',
    grade: 'Grade 1',
    distance: '2m 7f 213y',
    runners: 22,
    prize: '£154,650',
    runners: [
      { no: 1,  horse: 'Doctor Du Mesnil (FR)',      form: '1-22',     age: 6, wt: '11-7', or: null, trainer: 'W P Mullins',     jockey: 'Danny Mullins',       rating: 0.0 },
      { no: 2,  horse: 'Doctor Steinberg (IRE)',     form: '2-15111',  age: 6, wt: '11-7', or: 147,  trainer: 'W P Mullins',     jockey: 'Paul Townend',        rating: 5.0 },
      { no: 3,  horse: 'Espresso Milan (IRE)',       form: '427-11',   age: 6, wt: '11-7', or: null, trainer: 'W P Mullins',     jockey: 'Mr P W Mullins',      rating: 0.5 },
      { no: 4,  horse: 'Fruit De Mer (IRE)',         form: '1/2-13',   age: 6, wt: '11-7', or: null, trainer: 'H De Bromhead',   jockey: 'Sean Flanagan',       rating: 0.5 },
      { no: 5,  horse: 'Hipop De Loire (FR)',        form: '2-1',      age: 9, wt: '11-7', or: null, trainer: 'W P Mullins',     jockey: 'H Cobden',            rating: 0.5 },
      { no: 6,  horse: 'Jalon D\'oudairies (FR)',    form: '113/221',  age: 7, wt: '11-7', or: null, trainer: 'G Elliott',       jockey: 'Danny Gilligan',      rating: 0.0 },
      { no: 7,  horse: 'Johnny\'s Jury (IRE)',       form: '3-11',     age: 6, wt: '11-7', or: 129,  trainer: 'Jamie Snowden',   jockey: 'G Sheehan',           rating: 1.5 },
      { no: 8,  horse: 'Kazansky (IRE)',             form: '21-B112',  age: 6, wt: '11-7', or: 139,  trainer: 'G Elliott',       jockey: 'Jordan Gainford',     rating: 3.5 },
      { no: 9,  horse: 'Kicour La (FR)',             form: '2-114',    age: 6, wt: '11-7', or: 131,  trainer: 'B Pauling',       jockey: 'Callum Pritchard',    rating: 2.5 },
      { no: 10, horse: 'King\'s Bucks (FR)',         form: '1243-2',   age: 6, wt: '11-7', or: 130,  trainer: 'H De Bromhead',   jockey: 'Darragh O\'Keeffe',  rating: 0.5 },
      { no: 11, horse: 'Kripticjim (FR)',            form: '21-2111',  age: 6, wt: '11-7', or: 135,  trainer: 'J Tizzard',       jockey: 'Brendan Powell',      rating: 4.5 },
      { no: 12, horse: 'Mondoui\'boy (FR)',          form: '2/26-11',  age: 6, wt: '11-7', or: 134,  trainer: 'B Pauling',       jockey: 'Ben Jones',           rating: 2.5 },
      { no: 13, horse: 'Moneygarrow (IRE)',          form: '22-3511',  age: 6, wt: '11-7', or: 133,  trainer: 'D Skelton',       jockey: 'Harry Skelton',       rating: 3.5 },
      { no: 14, horse: 'Road Exile (IRE)',           form: '121-312',  age: 6, wt: '11-7', or: 134,  trainer: 'G Elliott',       jockey: 'Sam Ewing',           rating: 0.5 },
      { no: 15, horse: 'Spinningayarn (IRE)',        form: '1/14-311', age: 6, wt: '11-7', or: 136,  trainer: 'G Elliott',       jockey: 'Jack Kennedy',        rating: 0.0 },
      { no: 16, horse: 'Swindon Village (IRE)',      form: '36-3131',  age: 6, wt: '11-7', or: 133,  trainer: 'C E Longsdon',    jockey: 'David Bass',          rating: 2.0 },
      { no: 17, horse: 'Tackletommywoowoo (IRE)',    form: 'F16117',   age: 6, wt: '11-7', or: 132,  trainer: 'D Queally',       jockey: 'Mr D L Queally',      rating: 3.0 },
      { no: 18, horse: 'Thedeviluno (IRE)',          form: '22212-1',  age: 7, wt: '11-7', or: 141,  trainer: 'P Nolan',         jockey: 'Sean O\'Keeffe',     rating: 3.0 },
      { no: 19, horse: 'The Passing Wife',           form: '11-3351',  age: 7, wt: '11-7', or: 139,  trainer: 'G P Cromwell',    jockey: 'Keith Donoghue',      rating: 1.5 },
      { no: 20, horse: 'The Price Of Peace (IRE)',   form: '2U1-215',  age: 7, wt: '11-7', or: 131,  trainer: 'Miss R Curtis',   jockey: 'S Bowen',             rating: 1.5 },
      { no: 21, horse: 'Ubatuba (IRE)',              form: 'U1-112',   age: 6, wt: '11-7', or: 133,  trainer: 'O Murphy',        jockey: 'Ben Sutton',          rating: 3.0 },
      { no: 22, horse: 'Park Princess (IRE)',        form: '9/12171',  age: 6, wt: '11-0', or: 132,  trainer: 'A J Honeyball',   jockey: 'Sam Twiston-Davies',  rating: 3.5 },
    ],
  },
  {
    time: '16:00',
    name: 'Boodles Cheltenham Gold Cup Chase',
    grade: 'Grade 1',
    distance: '3m 2f 70y',
    runners: 11,
    prize: '£625,000',
    runners: [
      { no: 1,  horse: 'Envoi Allen (FR)',           form: '24/1U3-1',  age: 12, wt: '11-10', or: 162, trainer: 'H De Bromhead',  jockey: 'Darragh O\'Keeffe',  rating: 3.5 },
      { no: 2,  horse: 'Firefox (IRE)',              form: '362-124',   age: 8,  wt: '11-10', or: 158, trainer: 'G Elliott',      jockey: 'Jack Kennedy',        rating: 3.5 },
      { no: 3,  horse: 'Gaelic Warrior (GER)',       form: '311-132',   age: 8,  wt: '11-10', or: 172, trainer: 'W P Mullins',    jockey: 'Paul Townend',        rating: 5.0 },
      { no: 4,  horse: 'Gold Tweet (FR)',            form: 'F-26535',   age: 9,  wt: '11-10', or: 144, trainer: 'Gabriel Leenders', jockey: 'C Lefebvre',        rating: 0.0 },
      { no: 5,  horse: 'Grey Dawning (IRE)',         form: '2P12-13',   age: 9,  wt: '11-10', or: 166, trainer: 'D Skelton',      jockey: 'Harry Skelton',       rating: 5.0 },
      { no: 6,  horse: 'Haiti Couleurs (FR)',        form: '11-1P11',   age: 9,  wt: '11-10', or: 166, trainer: 'Miss R Curtis',  jockey: 'S Bowen',             rating: 5.0 },
      { no: 7,  horse: 'Inothewayurthinkin (IRE)',   form: '541-59F',   age: 8,  wt: '11-10', or: 172, trainer: 'G P Cromwell',   jockey: 'Mark Walsh',          rating: 0.5 },
      { no: 8,  horse: 'Jango Baie (FR)',            form: '1213-14',   age: 7,  wt: '11-10', or: 167, trainer: 'N J Henderson',  jockey: 'N de Boinville',      rating: 4.5 },
      { no: 9,  horse: 'L\'Homme Presse (FR)',       form: '31P-222',   age: 11, wt: '11-10', or: 164, trainer: 'Miss V Williams', jockey: 'Charlie Deutsch',    rating: 3.5 },
      { no: 10, horse: 'Spillane\'s Tower (IRE)',    form: '252-931',   age: 8,  wt: '11-10', or: 163, trainer: 'J J Mangan',     jockey: 'H Cobden',            rating: 2.5 },
      { no: 11, horse: 'The Jukebox Man (IRE)',      form: '22/11-11',  age: 8,  wt: '11-10', or: 168, trainer: 'B Pauling',      jockey: 'Ben Jones',           rating: 4.5 },
    ],
  },
  {
    time: '16:40',
    name: 'Princess Royal Challenge Cup Open Hunters\' Chase',
    grade: 'Class 2',
    distance: '3m 2f 70y',
    runners: 24,
    prize: '£50,000',
    runners: [
      { no: 1,  horse: 'Barton Snow (IRE)',          form: '211-111',   age: 9,  wt: '12-0', or: 142, trainer: 'J J O\'Shea',        jockey: 'Mr H Crow',                    rating: 5.0 },
      { no: 2,  horse: 'Carnfunnock (IRE)',          form: '16P-161',   age: 9,  wt: '12-0', or: 126, trainer: 'S R B Crawford',     jockey: 'Mr Stephen Connor',            rating: 0.0 },
      { no: 3,  horse: 'Chemical Energy (IRE)',      form: '465-011',   age: 10, wt: '12-0', or: 141, trainer: 'G Elliott',          jockey: 'Mr B O\'Neill',                rating: 1.0 },
      { no: 4,  horse: 'Con\'s Roc (IRE)',           form: '11/12-13',  age: 9,  wt: '12-0', or: 132, trainer: 'T O\'Brien',         jockey: 'Mr Darragh Allen',             rating: 1.0 },
      { no: 5,  horse: 'Golden Son (FR)',            form: '93P3-11',   age: 8,  wt: '12-0', or: 132, trainer: 'P F Nicholls',       jockey: 'Miss O Nicholls',              rating: 2.0 },
      { no: 6,  horse: 'Gracchus De Balme (FR)',     form: 'P1-21P2',   age: 10, wt: '12-0', or: 133, trainer: 'J J O\'Shea',        jockey: 'Mr P A King',                  rating: 4.5 },
      { no: 7,  horse: 'Its On The Line (IRE)',      form: '321-412',   age: 9,  wt: '12-0', or: 140, trainer: 'E Mullins',          jockey: 'Mr D O\'Connor',               rating: 3.0 },
      { no: 8,  horse: 'King Alex (FR)',             form: '25-3212',   age: 12, wt: '12-0', or: 120, trainer: 'G Ahern',            jockey: 'Mr J Ahern',                   rating: 0.0 },
      { no: 9,  horse: 'Kings Jet (IRE)',            form: '1P2162',    age: 6,  wt: '12-0', or: 120, trainer: 'C W J Farrell',      jockey: 'Mr T A Halford',               rating: 0.5 },
      { no: 10, horse: 'Lift Me Up (IRE)',           form: 'P101-4P',   age: 10, wt: '12-0', or: 122, trainer: 'Miss M Filby',       jockey: 'Miss Heidi Palin',             rating: 1.0 },
      { no: 11, horse: 'Linelee King (FR)',          form: '3P4/1-21',  age: 11, wt: '12-0', or: 124, trainer: 'O Murphy',           jockey: 'Mr James King',                rating: 1.5 },
      { no: 12, horse: 'Music Drive (FR)',           form: '9/114-12',  age: 9,  wt: '12-0', or: 131, trainer: 'Miss Kelly Morgan',  jockey: 'Miss Ellie Callwood',          rating: 2.0 },
      { no: 13, horse: 'Panda Boy (IRE)',            form: '3U-8311',   age: 10, wt: '12-0', or: 142, trainer: 'M Brassil',          jockey: 'Mr J L Gleeson',               rating: 1.5 },
      { no: 14, horse: 'Paul Marvel (FR)',           form: '21P211',    age: 9,  wt: '12-0', or: 120, trainer: 'J J O\'Shea',        jockey: 'Miss Amber Jackson-Fennell',   rating: 3.0 },
      { no: 15, horse: 'Pyleigh Court',              form: '3/31P-12',  age: 11, wt: '12-0', or: 123, trainer: 'R Pudd',             jockey: 'Miss Ella Herbison',           rating: 2.5 },
      { no: 16, horse: 'Shearer (IRE)',              form: '11/115-3',  age: 10, wt: '12-0', or: 132, trainer: 'P F Nicholls',       jockey: 'Miss Gina Andrews',            rating: 1.5 },
      { no: 17, horse: 'Solitary Man (IRE)',         form: '312141',    age: 8,  wt: '12-0', or: 136, trainer: 'E Bolger',           jockey: 'Miss A B O\'Connor',           rating: 1.0 },
      { no: 18, horse: 'Stattler (IRE)',             form: '624P/21',   age: 11, wt: '12-0', or: 137, trainer: 'Faye Bramley',       jockey: 'Mr P W Mullins',               rating: 3.0 },
      { no: 19, horse: 'Take All (IRE)',             form: 'F1-4432',   age: 11, wt: '12-0', or: 126, trainer: 'Myles Osborne',      jockey: 'Mr Samuel Scott',              rating: 1.5 },
      { no: 20, horse: 'What A Glance',              form: '220-5F2',   age: 11, wt: '12-0', or: 137, trainer: 'T Britten',          jockey: 'Miss Clara Brewitt',           rating: 0.5 },
      { no: 21, horse: 'Willewonga',                 form: '22P2-32',   age: 10, wt: '12-0', or: 127, trainer: 'J J O\'Shea',        jockey: 'Mr Thomas Easterby',           rating: 1.0 },
      { no: 22, horse: 'Willitgoahead (IRE)',        form: '130P-2U',   age: 8,  wt: '12-0', or: 134, trainer: 'G Elliott',          jockey: 'Mr H C Swan',                  rating: 0.5 },
      { no: 23, horse: 'Wonderwall (IRE)',           form: '32111-1',   age: 10, wt: '12-0', or: 140, trainer: 'S Curling',          jockey: 'Mr R James',                   rating: 3.5 },
      { no: 24, horse: 'Wrappedupinmay (IRE)',       form: '1/3P-211',  age: 8,  wt: '12-0', or: 118, trainer: 'S Curling',          jockey: 'Mr D Doyle',                   rating: 0.0 },
    ],
  },
  {
    time: '17:20',
    name: 'Martin Pipe Conditional Jockeys\' Handicap Hurdle',
    grade: 'Class 2',
    distance: '2m 4f 56y',
    runners: 24,
    prize: '£75,000',
    runners: [
      { no: 1,  horse: 'Its Bilbo (FR)',             form: '522-431',   age: 5, wt: '11-12', or: 141, trainer: 'H De Bromhead',  jockey: 'Mike O\'Connor',       rating: 2.0 },
      { no: 2,  horse: 'Nurse Susan (FR)',           form: '09-9114',   age: 9, wt: '11-11', or: 140, trainer: 'D Skelton',      jockey: 'Tristan Durrell',      rating: 5.0 },
      { no: 3,  horse: 'Air Of Entitlement (IRE)',   form: '7/117-20',  age: 7, wt: '11-10', or: 139, trainer: 'H De Bromhead',  jockey: 'Patrick M O\'Brien',   rating: 1.0 },
      { no: 4,  horse: 'Sa Fureur (IRE)',            form: '00-4742',   age: 9, wt: '11-9',  or: 138, trainer: 'G Elliott',      jockey: 'Eoin Staples',         rating: 1.5 },
      { no: 5,  horse: 'Farfromnowhere (IRE)',       form: '201P24',    age: 8, wt: '11-9',  or: 138, trainer: 'P Nolan',        jockey: 'Conor Stone-Walsh',    rating: 1.0 },
      { no: 6,  horse: 'Karl Des Tourelles (FR)',    form: '74-6464',   age: 6, wt: '11-9',  or: 138, trainer: 'P Fenton',       jockey: 'Gavin Brouder',        rating: 0.0 },
      { no: 7,  horse: 'Zillow',                     form: '70-110F',   age: 6, wt: '11-9',  or: 138, trainer: 'W P Mullins',    jockey: 'Sean Cleary-Farrell',  rating: 2.5 },
      { no: 8,  horse: 'Kel Histoire (FR)',          form: '1/128-55',  age: 6, wt: '11-8',  or: 137, trainer: 'W P Mullins',    jockey: 'Michael Kenneally',    rating: 1.0 },
      { no: 9,  horse: 'Fiercely Proud (IRE)',       form: '1PP-501',   age: 7, wt: '11-8',  or: 137, trainer: 'B Pauling',      jockey: 'Callum Pritchard',     rating: 2.5 },
      { no: 10, horse: 'East India Express (IRE)',   form: '71/FP92-',  age: 7, wt: '11-8',  or: 137, trainer: 'N J Henderson',  jockey: 'Freddie Gordon',       rating: 1.0 },
      { no: 11, horse: 'Da Capo Glory (IRE)',        form: '79/FP33',   age: 9, wt: '11-8',  or: 137, trainer: 'Padraig Butler', jockey: 'Cian Quirke',          rating: 0.0 },
      { no: 12, horse: 'Intellotto (IRE)',           form: '4/3-1334',  age: 6, wt: '11-6',  or: 135, trainer: 'Daisy Hitchins', jockey: 'Robbie David',         rating: 1.0 },
      { no: 13, horse: 'Act Of Authority (FR)',      form: '27/4348-',  age: 8, wt: '11-6',  or: 135, trainer: 'O Murphy',       jockey: 'Lewis Saunders',       rating: 1.5 },
      { no: 14, horse: 'Wendrock (FR)',              form: '53-745P',   age: 5, wt: '11-5',  or: 134, trainer: 'G Elliott',      jockey: 'Carl Millar',          rating: 1.0 },
      { no: 15, horse: 'Open Secret',               form: '42142',     age: 5, wt: '11-4',  or: 133, trainer: 'G Elliott',      jockey: 'James Smith',          rating: 2.0 },
      { no: 16, horse: 'Stede Bonnet (IRE)',         form: '16211-3',   age: 5, wt: '11-4',  or: 133, trainer: 'G Elliott',      jockey: 'Josh Williamson',      rating: 2.5 },
      { no: 17, horse: 'Jump Allen (FR)',            form: '543121-',   age: 7, wt: '11-4',  or: 133, trainer: 'W P Mullins',    jockey: 'Anna McGuinness',      rating: 3.0 },
      { no: 18, horse: 'Andashan (IRE)',             form: '315-321',   age: 6, wt: '11-4',  or: 133, trainer: 'C Gordon',       jockey: 'Dylan Johnston',       rating: 3.0 },
      { no: 19, horse: 'Ballykinlar (IRE)',          form: '111432',    age: 7, wt: '11-3',  or: 132, trainer: 'M Bowen',        jockey: 'Shane Fenelon',        rating: 0.5 },
      { no: 20, horse: 'Saint Le Fort (FR)',         form: '984531',    age: 6, wt: '11-3',  or: 132, trainer: 'P Fenton',       jockey: 'Niall Moore',          rating: 3.0 },
      { no: 21, horse: 'Roc Dino (FR)',              form: '723-22',    age: 5, wt: '11-2',  or: 131, trainer: 'W P Mullins',    jockey: 'John Shinnick',        rating: 0.5 },
      { no: 22, horse: 'Charlus (IRE)',              form: '10-2FP',    age: 5, wt: '11-1',  or: 130, trainer: 'D Skelton',      jockey: 'Harry Atkins',         rating: 0.5 },
      { no: 23, horse: 'Hot Fuss (IRE)',             form: '4-6241P',   age: 5, wt: '11-1',  or: 130, trainer: 'Tom Dascombe',   jockey: 'Joe Anderson',         rating: 1.5 },
      { no: 24, horse: 'Sainte Lucie (FR)',          form: '8857-00',   age: 5, wt: '11-0',  or: 129, trainer: 'W P Mullins',    jockey: 'Charlie O\'Dwyer',     rating: 0.5 },
    ],
  },
];

// ── Odds (Win/EW prices) ─────────────────────────────────────────────────────

const ODDS = {
  '13:20': { 1:'20/1', 2:'150/1', 3:'40/1', 4:'50/1', 5:'40/1', 6:'28/1', 7:'50/1', 8:'12/1', 9:'7/1', 10:'16/1', 11:'6/1', 12:'22/1', 13:'25/1', 14:'40/1', 15:'9/2', 16:'200/1', 17:'7/1', 18:'66/1', 19:'7/2', 20:'80/1' },
  '14:00': { 1:'28/1', 2:'22/1', 3:'20/1', 4:'4/1', 5:'16/1', 6:'14/1', 7:'66/1', 8:'10/1', 9:'33/1', 10:'33/1', 11:'12/1', 12:'16/1', 13:'33/1', 14:'40/1', 15:'80/1', 16:'9/1', 17:'66/1', 19:'66/1', 20:'80/1', 21:'12/1', 22:'9/2', 23:'10/1', 24:'40/1' },
  '14:40': { 1:'5/1', 2:'2/1', 3:'12/1', 4:'10/1', 5:'100/1', 6:'8/1', 7:'5/2', 8:'100/1', 9:'50/1' },
  '15:20': { 1:'28/1', 2:'11/4', 3:'14/1', 4:'33/1', 5:'25/1', 6:'20/1', 7:'22/1', 8:'14/1', 9:'100/1', 10:'25/1', 11:'20/1', 12:'14/1', 13:'12/1', 14:'33/1', 15:'16/1', 16:'100/1', 17:'66/1', 18:'11/2', 19:'9/1', 20:'80/1', 21:'28/1', 22:'50/1' },
  '16:00': { 1:'40/1', 2:'40/1', 3:'3/1', 4:'100/1', 5:'14/1', 6:'6/1', 7:'8/1', 8:'5/1', 9:'50/1', 10:'16/1', 11:'7/2' },
  '16:40': { 1:'8/1', 2:'50/1', 3:'14/1', 4:'6/1', 5:'14/1', 6:'40/1', 7:'5/1', 8:'125/1', 9:'100/1', 10:'150/1', 11:'28/1', 12:'18/1', 13:'11/2', 14:'80/1', 15:'125/1', 16:'22/1', 17:'33/1', 18:'12/1', 19:'80/1', 20:'150/1', 21:'125/1', 22:'18/1', 23:'6/1', 24:'12/1' },
  '17:20': { 1:'18/1', 2:'18/1', 3:'11/1', 4:'22/1', 5:'20/1', 6:'14/1', 7:'33/1', 8:'4/1', 9:'22/1', 10:'17/2', 11:'66/1', 12:'50/1', 13:'14/1', 14:'10/1', 15:'20/1', 16:'20/1', 17:'17/2', 18:'16/1', 19:'80/1', 20:'28/1', 21:'10/1', 22:'80/1', 23:'33/1', 24:'40/1' },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function ratingColor(r) {
  if (r >= 5.0) return 'text-emerald-400 font-bold';
  if (r >= 3.5) return 'text-emerald-400';
  if (r >= 2.5) return 'text-yellow-400';
  if (r >= 1.5) return 'text-orange-400';
  if (r >= 0.5) return 'text-gray-400';
  return 'text-gray-600';
}

function parseHorse(horse) {
  const m = horse.match(/^(.*?)\s*\(([A-Z]{2,3})\)\s*$/);
  return m ? { name: m[1].trim(), country: m[2] } : { name: horse, country: '' };
}

function oddsToDecimal(str) {
  if (!str) return 9999;
  const parts = str.split('/');
  if (parts.length !== 2) return 9999;
  return Number(parts[0]) / Number(parts[1]);
}

function getSorted(runners, key, dir, raceTime) {
  const mul = dir === 'asc' ? 1 : -1;
  return [...runners].sort((a, b) => {
    switch (key) {
      case 'no':      return mul * (a.no - b.no);
      case 'horse':   return mul * parseHorse(a.horse).name.localeCompare(parseHorse(b.horse).name);
      case 'country': return mul * (parseHorse(a.horse).country || '').localeCompare(parseHorse(b.horse).country || '');
      case 'age':     return mul * (a.age - b.age);
      case 'or':      return mul * ((a.or ?? 0) - (b.or ?? 0));
      case 'rating':  return mul * (a.rating - b.rating);
      case 'odds': {
        const ao = oddsToDecimal(ODDS[raceTime]?.[a.no]);
        const bo = oddsToDecimal(ODDS[raceTime]?.[b.no]);
        return mul * (ao - bo);
      }
      default: return 0;
    }
  });
}

function RatingDots({ value }) {
  const filled = Math.round(value);
  return (
    <span className="flex gap-0.5 items-center">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`inline-block w-2 h-2 rounded-full ${i <= filled ? (filled >= 5 ? 'bg-emerald-400' : filled >= 3 ? 'bg-emerald-500' : 'bg-orange-400') : 'bg-gray-700'}`} />
      ))}
    </span>
  );
}

// ── Components ────────────────────────────────────────────────────────────────

function RunnerRow({ runner, raceTime }) {
  const { no, horse, form, age, wt, or: officialRating, trainer, jockey, rating, nr } = runner;
  const { name: horseName, country } = parseHorse(horse);
  const odds = ODDS[raceTime]?.[no] ?? null;
  return (
    <div className={`grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_3rem_5rem_3rem_4rem_4rem_1fr_1fr_auto_6rem] gap-x-3 gap-y-0.5 items-center py-2 border-b border-gray-800 last:border-0 text-sm ${nr ? 'opacity-40' : ''}`}>
      <span className="text-gray-500 font-mono text-xs text-right">{no}{nr ? ' NR' : ''}</span>
      <span className="text-white font-medium truncate">{horseName}</span>
      <span className="flex justify-end md:hidden"><RatingDots value={rating} /></span>
      <span className="hidden md:block text-gray-500 text-xs text-center font-mono">{country || '—'}</span>
      <span className="hidden md:block text-gray-400 font-mono text-xs">{form}</span>
      <span className="hidden md:block text-gray-500 text-xs text-center">{age}</span>
      <span className="hidden md:block text-gray-400 text-xs font-mono">{wt}</span>
      <span className="hidden md:block text-gray-500 text-xs text-center">{officialRating ?? '—'}</span>
      <span className="hidden md:block text-gray-400 text-xs truncate">{trainer}</span>
      <span className="hidden md:block text-gray-300 text-xs truncate">{jockey}</span>
      <span className="hidden md:flex items-center"><RatingDots value={rating} /></span>
      <span className="hidden md:block text-right">
        <span className={`inline-block text-xs font-mono px-2 py-0.5 rounded border min-w-[3rem] text-center ${odds ? 'bg-emerald-950 text-emerald-300 border-emerald-800 font-semibold' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>{odds ?? '—'}</span>
      </span>
    </div>
  );
}

function RaceCard({ race }) {
  const [sortKey, setSortKey] = useState('no');
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortBtn = ({ col, label, className = '' }) => (
    <button
      onClick={() => handleSort(col)}
      className={`flex items-center gap-0.5 hover:text-gray-300 transition-colors uppercase tracking-wide ${sortKey === col ? 'text-emerald-400' : 'text-gray-600'} ${className}`}
    >
      {label}
      <span className="text-[10px]">{sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
    </button>
  );

  const sorted = getSorted(race.runners, sortKey, sortDir, race.time);

  return (
    <section className="mb-8 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      {/* Race header */}
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-emerald-400 font-bold font-mono text-lg">{race.time}</span>
          <h2 className="text-white font-bold text-base flex-1">{race.name}</h2>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{race.grade}</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-400">
          <span>{race.distance}</span>
          <span>{race.runners.filter(r => !r.nr).length} runners</span>
          <span>{race.prize} added</span>
        </div>
      </div>

      {/* Column headers — desktop only, all sortable */}
      <div className="hidden md:grid grid-cols-[2rem_1fr_3rem_5rem_3rem_4rem_4rem_1fr_1fr_auto_6rem] gap-x-3 px-4 py-2 bg-gray-850 border-b border-gray-800 text-xs">
        <SortBtn col="no" label="#" className="justify-end" />
        <SortBtn col="horse" label="Horse" />
        <SortBtn col="country" label="Ctry" className="justify-center" />
        <span className="text-gray-600 uppercase tracking-wide">Form</span>
        <SortBtn col="age" label="Age" className="justify-center" />
        <span className="text-gray-600 uppercase tracking-wide">Weight</span>
        <SortBtn col="or" label="OR" className="justify-center" />
        <span className="text-gray-600 uppercase tracking-wide">Trainer</span>
        <span className="text-gray-600 uppercase tracking-wide">Jockey</span>
        <SortBtn col="rating" label="Rating" />
        <SortBtn col="odds" label="Odds" className="justify-end" />
      </div>

      {/* Runners */}
      <div className="px-4">
        {sorted.map(r => <RunnerRow key={r.no} runner={r} raceTime={race.time} />)}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FridayRacecardPanel() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Friday 14 March 2026</h1>
        <p className="text-gray-400 text-sm mt-1">Gold Cup Day — Cheltenham Festival · 7 races</p>
      </div>

      {RACES.map(race => <RaceCard key={race.time} race={race} />)}
    </div>
  );
}
