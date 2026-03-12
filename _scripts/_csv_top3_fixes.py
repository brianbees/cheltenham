"""
_csv_top3_fixes.py — Auto-generated top3 fix script from archive CSV data
Fixes 299 TOP3 second/third mismatches.
"""
import re

JS_PATH = r"src\data\historicalData.js"

with open(JS_PATH, encoding="utf-8") as f:
    src = f.read()

original = src
fixes = 0
not_found = 0

REPLACEMENTS = [
    # (year, race, pos, old_horseName, old_gatePosition, new_gatePosition, new_horseName, new_sp, new_jockey, new_trainer)
    ('2002', 'Ballymore Novices Hurdle', 2, 'Galileo (POL)', 9, 18, 'Over The Bar I (IRE)', 15, 'Norman Williamson', "E J O'Grady"),
    ('2002', 'Triumph Hurdle', 2, 'Scolardy (IRE)', 17, 27, 'Newhall (IRE)', 9, 'F J Flood', 'F Flood'),
    ('2002', 'Triumph Hurdle', 3, 'Newhall (IRE)', 27, 5, 'Diamond Joshua (IRE)', 67, 'Jim Culloty', 'John Berry'),
    ('2002', 'Arkle Challenge Trophy', 2, 'Moscow Flyer (IRE)', 6, 7, 'Seebald (GER)', 3.5, 'A P McCoy', 'M C Pipe'),
    ('2002', 'Arkle Challenge Trophy', 3, 'Seebald (GER)', 7, 10, 'Armaturk (FR)', 9, 'Timmy Murphy', 'Paul Nicholls'),
    ('2002', 'Queen Mother Champion Chase', 2, 'Flagship Uberalles (IRE)', 5, 8, 'Native Upmanship (IRE)', 10, "Conor O'Dwyer", 'A L T Moore'),
    ('2002', 'Queen Mother Champion Chase', 3, 'Native Upmanship (IRE)', 8, 1, 'Cenkos (FR)', 67, 'Timmy Murphy', 'Paul Nicholls'),
    ('2002', 'Champion Hurdle', 2, 'Hors La Loi III (FR)', 4, 7, 'Marble Arch', 2, 'R Walsh', 'Hughie Morrison'),
    ('2002', 'Champion Hurdle', 3, 'Marble Arch', 7, 14, 'Bilboa (FR)', 15, 'T Doumen', 'F Doumen'),
    ('2002', 'Coral Cup', 2, 'Ilnamar (FR)', 3, 15, 'Joss Naylor (IRE)', 7.5, 'L Cooper', "Jonjo O'Neill"),
    ('2002', 'Coral Cup', 3, 'Joss Naylor (IRE)', 15, 8, 'Master Tern (USA)', 9, 'Tony Dobbin', "Jonjo O'Neill"),
    ('2002', 'Gold Cup', 2, 'Best Mate (IRE)', 4, 5, 'Commanche Court (IRE)', 26, 'R Walsh', 'T M Walsh'),
    ('2002', 'Gold Cup', 3, 'Commanche Court (IRE)', 5, 15, 'See More Business (IRE)', 41, 'Joe Tizzard', 'Paul Nicholls'),
    ('2002', 'Brown Advisory Novices Chase', 2, 'Hussard Collonges (FR)', 10, 12, 'Iznogoud (FR)', 15, 'A P McCoy', 'M C Pipe'),
    ('2002', 'Brown Advisory Novices Chase', 3, 'Iznogoud (FR)', 12, 2, 'Chives (IRE)', 34, 'Richard Guest', 'Henrietta C Knight'),
    ('2002', 'Foxhunter Chase', 2, 'Last Option', 9, 6, 'Gunner Welburn', 1.1, 'Mr R', 'Cope Caroline Bailey'),
    ('2002', 'Foxhunter Chase', 3, 'Gunner Welburn', 6, 21, 'Torduff Express (IRE)', 11, 'Miss P Gundry', 'Paul Nicholls'),
    ('2002', 'Kim Muir', 2, 'The Bushkeeper (IRE)', 4, 10, 'Ceanannas Mor (IRE)', 21, 'Mr R H Fowler', 'Nicky Henderson'),
    ('2002', 'Kim Muir', 3, 'Ceanannas Mor (IRE)', 10, 3, 'Cadougold (FR)', 26, 'Mr G Elliott', 'M C Pipe'),
    ('2002', 'Grand Annual', 2, 'Fadoudal Du Cochet (FR)', 9, 2, 'Exit Swinger (FR)', 5, 'A P McCoy', 'M C Pipe'),
    ('2002', 'Grand Annual', 3, 'Exit Swinger (FR)', 2, 13, "Dark'n Sharp (GER)", 7.5, 'Richard Johnson', 'Richard Phillips'),
    ('2002', 'Pertemps Final', 2, 'Freetown I (IRE)', 6, 18, 'Surprising I', 1.1, 'Richard Johnson', 'Philip Hobbs'),
    ('2002', 'County Hurdle', 2, 'Rooster Booster', 2, 6, 'The Gatherer (IRE)', 13, "Conor O'Dwyer", 'A L T Moore'),
    ('2002', 'County Hurdle', 3, 'The Gatherer (IRE)', 6, 7, 'Ben Ewar', 51, 'Barry Fenton', 'Ken Cunningham-Brown'),
    ('2003', 'Supreme Novices Hurdle', 2, 'Back In Front (IRE)', 2, 10, 'Kicking King (IRE)', 7.5, 'Barry Geraghty', 'T J Taaffe'),
    ('2003', 'Supreme Novices Hurdle', 3, 'Kicking King (IRE)', 10, 3, 'Chauvinist (IRE)', 21, 'Mick Fitzgerald', 'Nicky Henderson'),
    ('2003', 'Ballymore Novices Hurdle', 2, 'Hardy Eustace (IRE)', 5, 12, 'Pizarro (IRE)', 3, 'Norman Williamson', "E J O'Grady"),
    ('2003', 'Ballymore Novices Hurdle', 3, 'Pizarro (IRE)', 12, 8, 'Lord Sam (IRE)', 11, 'Warren Marston', 'Victor Dartnall'),
    ('2003', 'Brown Advisory Novices Chase', 2, 'One Knight I (IRE)', 6, 4, 'Jair Du Cochet (FR)', 5, 'Jacques Ricou', 'G Macaire'),
    ('2003', 'Brown Advisory Novices Chase', 3, 'Jair Du Cochet (FR)', 4, 1, 'Barrow Drive', 1.1, 'Barry Geraghty', 'Anthony Mullins'),
    ('2003', 'Arkle Challenge Trophy', 2, 'Azertyuiop (FR)', 2, 5, 'Impek (FR)', 7, 'Jim Culloty', 'Henrietta C Knight'),
    ('2003', 'Arkle Challenge Trophy', 3, 'Impek (FR)', 5, 6, 'Isio (FR)', 11, 'Mick Fitzgerald', 'Nicky Henderson'),
    ('2003', "Stayers' Hurdle", 2, 'Baracouda (FR)', 1, 7, "Iris's Gift", 1.1, 'Barry Geraghty', "Jonjo O'Neill"),
    ('2003', "Stayers' Hurdle", 3, "Iris's Gift", 7, 8, 'Limestone Lad (IRE)', 3.2, 'Paul Carberry', 'James Bowe'),
    ('2003', 'Queen Mother Champion Chase', 2, 'Moscow Flyer (IRE)', 8, 9, 'Native Upmanship (IRE)', 13, "Conor O'Dwyer", 'A L T Moore'),
    ('2003', 'Queen Mother Champion Chase', 3, 'Native Upmanship (IRE)', 9, 1, 'Cenkos (FR)', 8, 'R Walsh', 'Paul Nicholls'),
    ('2003', 'Champion Hurdle', 2, 'Rooster Booster', 11, 16, 'Westender (FR)', 34, 'Rodi Greene', 'M C Pipe'),
    ('2003', 'Champion Hurdle', 3, 'Westender (FR)', 16, 10, 'Rhinestone Cowboy (IRE)', 3.5, 'Norman Williamson', "Jonjo O'Neill"),
    ('2003', 'Gold Cup', 2, 'Best Mate (IRE)', 3, 14, 'Truckers Tavern (IRE)', 34, 'Davy Russell', 'Ferdy Murphy'),
    ('2003', 'Gold Cup', 3, 'Truckers Tavern (IRE)', 14, 8, 'Harbour Pilot (IRE)', 41, 'Paul Carberry', 'Noel Meade'),
    ('2003', 'Coral Cup', 2, 'Xenophon (IRE)', 19, 16, 'Samon (GER)', 26, 'D J Casey', 'M C Pipe'),
    ('2003', 'Coral Cup', 3, 'Samon (GER)', 16, 4, 'Spectrometer', 1.1, 'Richard Johnson', 'Philip Hobbs'),
    ('2003', 'Foxhunter Chase', 2, 'Kingscliff (IRE)', 12, 2, 'Bright Approach I (IRE)', 21, 'Miss P Gundry', 'Mrs O Bush'),
    ('2003', 'Foxhunter Chase', 3, 'Bright Approach I (IRE)', 2, 13, 'Last Option', 1.1, 'Mrs F', 'Needham R Tate'),
    ('2003', 'Grand Annual', 2, 'Palarshan (FR)', 17, 12, 'Risk Accessor (IRE)', 21, 'Seamus Durack', 'C Roche'),
    ('2003', 'Grand Annual', 3, 'Risk Accessor (IRE)', 12, 2, "Dark'n Sharp (GER)", 7.5, 'Richard Johnson', 'Richard Phillips'),
    ('2003', 'National Hunt Chase', 2, 'Sudden Shock (GER)', 23, 6, 'Stormez (FR)', 2.8, 'Jamie Moore', 'M C Pipe'),
    ('2003', 'National Hunt Chase', 3, 'Stormez (FR)', 6, 17, 'Young Ottoman (IRE)', 11, 'Mr J M Pritchard', 'Victor Dartnall'),
    ('2003', 'Kim Muir', 2, 'Royal Predica (FR)', 4, 23, 'Ibis Rochelais (FR)', 5, 'Larry McGrath', 'A Ennis'),
    ('2003', 'Kim Muir', 3, 'Ibis Rochelais (FR)', 23, 2, 'Rathbawn Prince (IRE)', 41, 'Roger Loughran', 'D T Hughes'),
    ('2003', 'Champion Bumper', 2, 'Liberman (IRE)', 15, 22, 'Trabolgan (IRE)', 51, 'Seamus Durack', 'Nicky Henderson'),
    ('2003', 'Champion Bumper', 3, 'Trabolgan (IRE)', 22, 25, 'Widemouth Bay (IRE)', 34, 'Richard Johnson', 'Philip Hobbs'),
    ('2004', 'Ballymore Novices Hurdle', 2, 'Fundamentalist (IRE)', 6, 8, 'Inglis Drever', 2.8, 'Graham Lee', 'Howard Johnson'),
    ('2004', 'Ballymore Novices Hurdle', 3, 'Inglis Drever', 8, 7, 'Grey Report (IRE)', 26, 'Richard Johnson', 'Philip Hobbs'),
    ('2004', 'Triumph Hurdle', 2, 'Made In Japan (JPN)', 11, 6, 'Chief Yeoman', 41, 'Tony Dobbin', 'Venetia Williams'),
    ('2004', 'Brown Advisory Novices Chase', 2, 'Rule Supreme (IRE)', 10, 9, 'Royal Emperor (IRE)', 7, 'Dominic Elsworth', 'Sue Smith'),
    ('2004', 'Brown Advisory Novices Chase', 3, 'Royal Emperor (IRE)', 9, 6, 'Our Vic (IRE)', 2.4, 'A P McCoy', 'M C Pipe'),
    ('2004', 'Arkle Challenge Trophy', 3, 'Kicking King (IRE)', 7, 14, 'Le Duc I (FR)', 26, 'Joe Tizzard', 'Paul Nicholls'),
    ('2004', 'Coral Cup', 2, 'Monkerhostin (FR)', 5, 23, 'Court Shareef', 201, 'Wayne Hutchinson', 'Richard Price'),
    ('2004', 'Coral Cup', 3, 'Court Shareef', 23, 1, 'Rhinestone Cowboy (IRE)', 6, 'Mr J P Magnier', "Jonjo O'Neill"),
    ('2004', 'Foxhunter Chase', 2, 'Earthmover (IRE)', 8, 14, 'Never Compromise (IRE)', 5.5, 'Alan Crowe', 'T M Walsh'),
    ('2004', 'National Hunt Chase', 2, 'Native Emperor', 18, 10, 'Celestial Gold (IRE)', 34, 'Mr A Farrant', 'M C Pipe'),
    ('2004', 'National Hunt Chase', 3, 'Celestial Gold (IRE)', 10, 22, 'Drombeag (IRE)', 9, 'Mr J T McNamara', "Jonjo O'Neill"),
    ('2004', 'Grand Annual', 2, 'St Pirran (IRE)', 17, 10, 'Ground Ball (IRE)', 11, 'D J Casey', 'C F Swan'),
    ('2004', 'Grand Annual', 3, 'Ground Ball (IRE)', 10, 24, 'Reiziger (FR)', 34, 'Paddy Brennan', 'Philip Hobbs'),
    ('2004', 'Kim Muir', 2, 'Maximize (IRE)', 7, 8, 'Merchants Friend (IRE)', 21, 'Mr P Cashman', 'Charlie Mann'),
    ('2004', 'Kim Muir', 3, 'Merchants Friend (IRE)', 8, 13, 'Ibis Rochelais (FR)', 8, 'Mr T Greenall', 'A Ennis'),
    ('2004', 'Pertemps Final', 2, 'Creon', 22, 18, 'G V A Ireland (IRE)', 15, 'F J Flood', 'F Flood'),
    ('2004', 'Pertemps Final', 3, 'G V A Ireland (IRE)', 18, 5, 'Alexanderthegreat (IRE)', 26, 'R Walsh', 'Paul Nicholls'),
    ('2004', 'Champion Bumper', 2, 'Total Enjoyment (IRE)', 24, 22, 'Refinement (IRE)', 8, 'Barry Geraghty', "Jonjo O'Neill"),
    ('2004', 'Champion Bumper', 3, 'Refinement (IRE)', 22, 12, 'Master Albert (IRE)', 51, 'Mr J P Magnier', 'David Wachman'),
    ('2004', 'County Hurdle', 2, 'Sporazene (IRE)', 2, 26, 'Hawadeth', 51, 'Tom Malone', 'Victor Dartnall'),
    ('2004', 'County Hurdle', 3, 'Hawadeth', 26, 6, 'Copeland', 2, 'Jamie Moore', 'M C Pipe'),
    ('2005', 'Ballymore Novices Hurdle', 2, 'No Refuge (IRE)', 6, 10, 'Racing Demon (IRE)', 15, 'Jim Culloty', 'Henrietta C Knight'),
    ('2005', 'Ballymore Novices Hurdle', 3, 'Racing Demon (IRE)', 10, 8, 'Our Ben', 34, 'R Walsh', 'W P Mullins'),
    ('2005', 'Arkle Challenge Trophy', 2, 'Contraband', 2, 1, 'Ashley Brook (IRE)', 21, 'Paddy Brennan', 'Kevin Bishop'),
    ('2005', 'Arkle Challenge Trophy', 3, 'Ashley Brook (IRE)', 1, 6, 'River City (IRE)', 11, 'Tom Doyle', 'Noel Chance'),
    ('2005', 'Brown Advisory Novices Chase', 2, 'Trabolgan (IRE)', 8, 3, 'Comply Or Die (IRE)', 4, 'Timmy Murphy', 'M C Pipe'),
    ('2005', 'Brown Advisory Novices Chase', 3, 'Comply Or Die (IRE)', 3, 4, 'Cornish Rebel (IRE)', 5.5, 'R Walsh', 'Paul Nicholls'),
    ('2005', 'Albert Bartlett', 2, 'Moulin Riche (FR)', 10, 11, 'Over The Creek', 1.2, 'Timmy Murphy', 'M C Pipe'),
    ('2005', 'Novice Handicap Chase', 2, 'King Harald (IRE)', 19, 1, 'Keen Leader', 2, 'Barry Geraghty', "Jonjo O'Neill"),
    ('2005', 'Novice Handicap Chase', 3, 'King Harald (IRE)', 19, 6, 'See You Sometime', 1.1, 'Andrew Thornton', 'Seamus Mullins'),
    ('2005', 'Coral Cup', 2, 'Idole First (IRE)', 15, 9, 'Dancing Bay', 1.1, 'Mick Fitzgerald', 'Nicky Henderson'),
    ('2005', 'Coral Cup', 3, 'Dancing Bay', 9, 11, 'Tumbling Dice (IRE)', 17, 'Barry Geraghty', 'T J Taaffe'),
    ('2005', 'Foxhunter Chase', 2, 'Sleeping Night (FR)', 19, 7, 'Foly Pleasant (FR)', 21, 'Mr R Burton', 'Nick Shutts'),
    ('2005', 'Foxhunter Chase', 3, 'Foly Pleasant (FR)', 7, 17, 'Placid Man (IRE)', 15, 'Ms A Embiricos', 'Ms A E Embiricos'),
    ('2005', 'Kim Muir', 2, 'Juveigneur (FR)', 6, 8, 'Lord Of The River (IRE)', 51, 'Mr A Fitzgerald', 'Nicky Henderson'),
    ('2005', 'Kim Muir', 3, 'Lord Of The River (IRE)', 8, 7, 'Parsons Legacy (IRE)', 17, "Mr Derek O'Connor", 'Philip Hobbs'),
    ('2005', 'National Hunt Chase', 2, 'Another Rum (IRE)', 17, 10, 'Caislean Ui Cuain (IRE)', 151, "James O'Farrell", 'J J Lambe'),
    ('2005', 'National Hunt Chase', 3, 'Caislean Ui Cuain (IRE)', 10, 1, 'Control Man (IRE)', 12, 'Mr G Elliott', 'M C Pipe'),
    ('2005', 'Grand Annual', 2, 'Fota Island (IRE)', 16, 17, "Bambi De L'Orme (FR)", 17, 'Graham Lee', 'Ian Williams'),
    ('2005', 'Grand Annual', 3, "Bambi De L'Orme (FR)", 17, 5, 'Caracciola (GER)', 17, 'Marcus Foley', 'Nicky Henderson'),
    ('2005', 'Fred Winter Juvenile Hurdle', 2, 'Dabiroun (IRE)', 5, 12, 'At Your Request', 34, 'David Dennis', 'Ian Williams'),
    ('2005', 'Fred Winter Juvenile Hurdle', 3, 'At Your Request', 12, 7, 'Nation State', 1.1, 'Jamie Moore', 'Gary Moore'),
    ('2005', 'Pertemps Final', 2, 'Oulart', 21, 24, "Mioche D'Estruval (FR)", 67, 'Tom Scudamore', 'M C Pipe'),
    ('2005', 'Pertemps Final', 3, "Mioche D'Estruval (FR)", 24, 2, 'QuickI', 51, 'Andrew Glassonbury', 'M C Pipe'),
    ('2005', 'County Hurdle', 3, 'Fontanesi (IRE)', 30, 2, 'Buena Vista (IRE)', 15, 'Timmy Murphy', 'M C Pipe'),
    ('2006', 'Triumph Hurdle', 2, 'Detroit City I (USA)', 4, 5, 'Fair Along (GER)', 26, 'Paddy Brennan', 'Philip Hobbs'),
    ('2006', 'Triumph Hurdle', 3, 'Fair Along (GER)', 5, 2, 'Blazing Bailey', 15, 'Robert Thornton', 'Alan King'),
    ('2006', 'Albert Bartlett', 2, 'Black Jack Ketchum (IRE)', 3, 12, 'Powerstation (IRE)', 10, 'Davy Russell', 'C Byrnes'),
    ('2006', 'Albert Bartlett', 3, 'Powerstation (IRE)', 12, 17, 'Travino (IRE)', 7, 'Barry Geraghty', 'Ms Margaret Mullins'),
    ('2006', 'Gold Cup', 2, 'War Of Attrition (IRE)', 24, 7, 'Hedgehunter (IRE)', 17, 'R Walsh', 'W P Mullins'),
    ('2006', 'Gold Cup', 3, 'Hedgehunter (IRE)', 7, 6, 'Forget The Past', 10, 'Barry Geraghty', "M J P O'Brien"),
    ('2006', 'Foxhunter Chase', 2, 'Whyso Mayo (IRE)', 24, 11, 'First Down Jets (IRE)', 67, 'Mr C J Sweeney', 'W J Burke'),
    ('2006', 'Foxhunter Chase', 3, 'First Down Jets (IRE)', 11, 16, 'Joe Blake (IRE)', 15, "Mr M J O'Hare", 'I R Ferguson'),
    ('2006', 'County Hurdle', 2, 'Desert QuestI (IRE)', 15, 13, 'Noble Request (FR)', 26, 'Richard Johnson', 'Philip Hobbs'),
    ('2006', 'County Hurdle', 3, 'Noble Request (FR)', 13, 9, 'Adamant Approach (IRE)', 51, 'Mr R J Kiely', 'W P Mullins'),
    ('2006', 'Grand Annual', 2, 'Greenhope (IRE)', 15, 13, 'Tiger Cry (IRE)', 7, '', ''),
    ('2006', 'Grand Annual', 3, 'Tiger Cry (IRE)', 13, 24, 'Madison Du Berlais (FR)', 12, '', ''),
    ('2006', 'National Hunt Chase', 3, 'Wolf Creek (IRE)', 13, 6, 'Far From Trouble (IRE)', 4.5, 'Mr J T McNamara', 'C Roche'),
    ('2006', 'Cross Country Chase', 3, 'Il De Boitron (FR)', 10, 16, 'Buailtes And Fadas (IRE)', 7, 'Ms N Carberry', 'E Bolger'),
    ('2006', 'Champion Bumper', 3, 'Perce Rock', 21, 9, 'Kicks For Free (IRE)', 6, 'Mick Fitzgerald', 'Paul Nicholls'),
    ('2007', 'Triumph Hurdle', 2, 'Katchit (IRE)', 11, 13, 'Liberate I', 13, 'Tom Scudamore', 'Venetia Williams'),
    ('2007', 'Triumph Hurdle', 3, 'Liberate I', 13, 16, 'Mobaasher (USA)', 34, 'Noel Fehily', 'Charlie Mann'),
    ('2007', 'Gold Cup', 3, 'Exotic Dancer (FR)', 4, 19, 'Turpin Green (IRE)', 41, 'Tony Dobbin', 'Nicky Richards'),
    ('2007', 'County Hurdle', 3, 'Ouninpohja (IRE)', 18, 19, 'Premier Dane', 101, 'P A Carberry', 'Anthony Mullins'),
    ('2007', 'Ryanair Chase', 3, "Monet's Garden (IRE)", 2, 5, 'Billyvoddan (IRE)', 21, 'Richard Johnson', 'Henry Daly'),
    ('2008', 'Albert Bartlett', 3, 'Liskennett (IRE)', 18, 15, 'The Tother One (IRE)', 5.5, 'Sam Thomas', 'Paul Nicholls'),
    ('2008', 'Gold Cup', 3, 'Kauto Star (FR)', 10, 12, 'Neptune Collonges', 26, '', ''),
    ('2008', 'County Hurdle', 2, 'Silver Jaro (FR)', 13, 18, 'Psycho (IRE)', 6, 'Paul Carberry', 'A J Martin'),
    ('2008', 'County Hurdle', 3, 'Psycho (IRE)', 18, 7, 'French Saulaie (FR)', 41, 'Richard Johnson', 'Philip Hobbs'),
    ('2008', 'Grand Annual', 2, 'Tiger Cry (IRE)', 16, 18, 'My Petra', 4, '', ''),
    ('2009', 'Triumph Hurdle', 2, 'Zaynar (FR)', 18, 17, 'Walkon (FR)', 5, 'Robert Thornton', 'Alan King'),
    ('2009', 'Triumph Hurdle', 3, 'Walkon (FR)', 17, 8, 'Mourad (IRE)', 15, 'R Walsh', 'W P Mullins'),
    ('2009', 'County Hurdle', 2, 'Cockney Trucker (IRE)', 25, 28, 'Stradbrook (IRE)', 67, 'Richie McLernon', "Jonjo O'Neill"),
    ('2009', 'County Hurdle', 3, 'Stradbrook (IRE)', 28, 25, 'Cockney Trucker (IRE)', 9.5, 'Richard Johnson', 'Philip Hobbs'),
    ('2009', 'Albert Bartlett', 3, 'Pride Of Dulcote (FR)', 12, 13, 'The Midnight Club (IRE)', 15, 'Emmet Mullins', 'W P Mullins'),
    ('2009', 'Gold Cup', 3, 'Denman (IRE)', 5, 6, 'Exotic Dancer (FR)', 9, 'A P McCoy', "Jonjo O'Neill"),
    ('2009', 'Foxhunter Chase', 3, 'Turthen (FR)', 23, 3, 'Baby Run (FR)', 15, 'Sam Twiston-Davies', 'Nigel Twiston-Davies'),
    ('2009', 'Martin Pipe', 3, 'Midnight Chase', 24, 11, 'Big Eared Fran (IRE)', 4.5, 'Johnny Farrelly', 'David Pipe'),
    ('2009', 'Arkle Challenge Trophy', 3, 'Made In Taipan (IRE)', 13, 16, 'Planet Of Sound', 11, 'Richard Johnson', 'Philip Hobbs'),
    ('2010', 'Triumph Hurdle', 3, 'Barizan (IRE)', 3, 2, 'Alaivan (IRE)', 5.5, 'Andrew J McNamara', "E J O'Grady"),
    ('2010', 'County Hurdle', 2, 'Thousand Stars (FR)', 15, 23, 'Arcalis', 34, "Denis O'Regan", 'Howard Johnson'),
    ('2010', 'County Hurdle', 3, 'Arcalis', 23, 13, 'Dee Ee Williams (IRE)', 21, 'Liam Treadwell', 'Nick Gifford'),
    ('2010', 'Albert Bartlett', 2, 'Berties Dream (IRE)', 2, 9, 'Najaf (FR)', 26, 'Timmy Murphy', 'Paul Nicholls'),
    ('2010', 'Gold Cup', 2, 'Imperial Commander (IRE)', 6, 5, 'Denman (IRE)', 5, 'A P McCoy', 'Paul Nicholls'),
    ('2010', 'Gold Cup', 3, 'Denman (IRE)', 5, 8, 'Mon Mome (FR)', 51, 'Aidan Coleman', 'Venetia Williams'),
    ('2010', 'Foxhunter Chase', 3, 'Kilty Storm (IRE)', 12, 16, 'Reach For The Top (IRE)', 67, 'Mr B J Tuckey', 'M J Tuckey'),
    ('2010', 'Martin Pipe', 2, 'Pause And Clause (IRE)', 3, 17, 'Radium (FR)', 15, 'Harry Skelton', 'Nicky Henderson'),
    ('2010', 'Martin Pipe', 3, 'Radium (FR)', 17, 21, 'Clova Island', 15, 'Giles Hawkins', 'Philip Hobbs'),
    ('2011', 'Triumph Hurdle', 2, 'Zarkandar (IRE)', 20, 23, 'Unaccompanied (IRE)', 6.5, 'Paul Townend', 'D K Weld'),
    ('2011', 'Triumph Hurdle', 3, 'Unaccompanied (IRE)', 23, 5, 'Grandouet (FR)', 7.5, 'Barry Geraghty', 'Nicky Henderson'),
    ('2011', 'Albert Bartlett', 3, 'Mossley (IRE)', 13, 5, 'Court In Motion (IRE)', 10, 'Jack Doyle', 'Emma Lavelle'),
    ('2011', 'Martin Pipe', 2, 'Sir Des Champs (FR)', 11, 1, 'Son Of Flicka', 29, 'Henry Brooke', 'Donald McCain'),
    ('2011', 'Martin Pipe', 3, 'Son Of Flicka', 1, 6, 'First Point (GER)', 21, 'David Bass', 'Nicky Henderson'),
    ('2012', 'Triumph Hurdle', 2, 'Countrywide Flame', 5, 10, 'Hisaabaat (IRE)', 21, 'A E Lynch', 'D K Weld'),
    ('2012', 'Triumph Hurdle', 3, 'Hisaabaat (IRE)', 10, 9, 'Grumeti', 6, 'Robert Thornton', 'Alan King'),
    ('2012', 'County Hurdle', 2, 'Alderwood (IRE)', 13, 17, 'Edgardo Sol (FR)', 26, 'Harry Derham', 'Paul Nicholls'),
    ('2012', 'County Hurdle', 3, 'Edgardo Sol (FR)', 17, 6, 'Sailors Warn', 17, 'Robert Thornton', 'Alan King'),
    ('2012', 'Albert Bartlett', 2, 'Brindisi Breeze (IRE)', 5, 4, 'Boston Bob (IRE)', 2.2, 'R Walsh', 'W P Mullins'),
    ('2012', 'Albert Bartlett', 3, 'Boston Bob (IRE)', 4, 9, 'Grand Vision (IRE)', 26, "Tom O'Brien", 'Colin Tizzard'),
    ('2012', 'Gold Cup', 3, 'The Giant Bolster', 11, 7, 'Long Run (FR)', 2.8, 'Mr Sam Waley-Cohen', 'Nicky Henderson'),
    ('2012', 'Foxhunter Chase', 3, 'Chapoturgeon (FR)', 5, 16, 'Oscar Delta (IRE)', 29, 'Mr D Murphy', 'James Joseph Mangan'),
    ('2012', 'Grand Annual', 2, 'Bellvano (GER)', 14, 4, 'Tanks For That (IRE)', 10, '', ''),
    ('2012', 'Grand Annual', 3, 'Tanks For That (IRE)', 4, 8, 'Kumbeshwar', 17, '', ''),
    ('2012', 'Cross Country Chase', 3, 'Sizing Australia (IRE)', 4, 15, 'Wedger Pardy (IRE)', 34, 'Miss J Coward', 'Kim Bailey'),
    ('2013', 'Triumph Hurdle', 3, 'Far West (FR)', 4, 13, 'Sametegal (FR)', 34, 'Ryan Mahon', 'Paul Nicholls'),
    ('2013', 'County Hurdle', 2, 'Ted Veale (IRE)', 24, 10, 'Tennis Cap (FR)', 12, 'D J Casey', 'W P Mullins'),
    ('2013', 'Albert Bartlett', 2, 'At Fishers Cross (IRE)', 3, 2, 'African Gold (IRE)', 5.5, 'Sam Twiston-Davies', 'Nigel Twiston-Davies'),
    ('2013', 'Albert Bartlett', 3, 'African Gold (IRE)', 2, 8, 'Inish Island', 7.5, 'Tom Scudamore', 'David Pipe'),
    ('2013', 'Gold Cup', 2, 'Bobs Worth (IRE)', 1, 8, 'Sir Des Champs (FR)', 5, 'A P McCoy', 'W P Mullins'),
    ('2013', 'Gold Cup', 3, 'Sir Des Champs (FR)', 8, 5, 'Long Run (FR)', 4.5, 'Mr Sam Waley-Cohen', 'Nicky Henderson'),
    ('2013', 'Martin Pipe', 3, 'Nagpur (FR)', 18, 9, 'Double Ross (IRE)', 15, 'Adam Wedge', 'Nigel Twiston-Davies'),
    ('2013', 'Kim Muir', 3, 'Alfie Sherrin', 14, 22, 'Romanesco (FR)', 9, 'Ms N Carberry', 'Gordon Elliott'),
    ('2014', 'Triumph Hurdle', 2, 'Tiger Roll (IRE)', 15, 9, 'Kentucky Hyden (IRE)', 21, 'David Bass', 'Nicky Henderson'),
    ('2014', 'County Hurdle', 2, 'Lac Fontana (FR)', 11, 7, 'Arctic Fire (GER)', 8, 'D J Casey', 'W P Mullins'),
    ('2014', 'County Hurdle', 3, 'Arctic Fire (GER)', 7, 8, 'Montbazon (FR)', 21, 'Robert Thornton', 'Alan King'),
    ('2014', 'Albert Bartlett', 2, 'Very Wood (FR)', 20, 7, 'Deputy Dan (IRE)', 11, 'Leighton Aspell', 'Oliver Sherwood'),
    ('2014', 'Albert Bartlett', 3, 'Deputy Dan (IRE)', 7, 1, 'Apache Jack', 21, 'D J Casey', 'W P Mullins'),
    ('2014', 'Foxhunter Chase', 2, 'Tammys Hill (IRE)', 21, 3, 'Carsonstown Boy (IRE)', 41, 'Mr N McParlan', 'C A McBratney'),
    ('2014', 'Martin Pipe', 2, 'Don Poli (IRE)', 3, 20, 'Thomas Crapper', 11, 'Joseph Palmowski', 'Robin Dickin'),
    ('2014', 'Martin Pipe', 3, 'Thomas Crapper', 20, 4, 'Caid Du Berlais (FR)', 10, 'Harry Derham', 'Paul Nicholls'),
    ('2014', 'Grand Annual', 2, 'Savello (IRE)', 6, 21, 'Ned Buntline', 7, 'Paul Carberry', 'Noel Meade'),
    ('2014', 'Arkle Challenge Trophy', 3, 'Dodging Bullets', 3, 7, 'Trifolium (FR)', 3.8, 'B J Cooper', 'C Byrnes'),
    ('2014', 'Champion Hurdle', 3, 'Hurricane Fly (IRE)', 3, 9, 'The New One (IRE)', 4.3, 'Sam Twiston-Davies', 'Nigel Twiston-Davies'),
    ('2014', 'National Hunt Chase', 3, 'Adrenalin Flight (IRE)', 2, 15, 'Suntiep (FR)', 10, 'Mr P W Mullins', 'W P Mullins'),
    ('2014', 'Coral Cup', 3, 'Smashing I (FR)', 13, 22, 'Bayan (IRE)', 12, 'Davy Condon', 'Gordon Elliott'),
    ('2014', 'Cross Country Chase', 3, 'Duke Of Lucca (IRE)', 10, 3, 'Big Shu (IRE)', 4, 'Paul Carberry', 'Peter Maher'),
    ('2015', 'Albert Bartlett', 2, 'Martello Tower (IRE)', 10, 12, 'Milsean (IRE)', 34, 'Danny Mullins', 'W P Mullins'),
    ('2015', 'Martin Pipe', 2, 'Killultagh Vic (IRE)', 21, 1, 'Le Mercurey (FR)', 9, 'Sean Bowen', 'Paul Nicholls'),
    ('2016', 'Albert Bartlett', 3, 'Minella Rockstar', 3, 12, 'Champers On Ice', 21, '', ''),
    ('2016', 'Gold Cup', 2, 'Don Cossack (GER)', 4, 3, 'Djakadam (FR)', 5.5, 'R Walsh', 'W P Mullins'),
    ('2016', 'Gold Cup', 3, 'Djakadam (FR)', 3, 5, 'Don Poli (IRE)', 5.5, 'Davy Russell', 'W P Mullins'),
    ('2016', 'Grand Annual', 3, 'Dandridge', 24, 20, 'Rock The World', 5.5, 'Robbie Power', 'Mrs John Harrington'),
    ('2016', 'Coral Cup', 2, 'Diamond King (IRE)', 8, 22, 'Long House Hall (IRE)', 17, '', ''),
    ('2016', 'Champion Bumper', 3, 'Castello Sforza (IRE)', 6, 2, 'Bacardys (FR)', 17, 'R Walsh', 'W P Mullins'),
    ('2017', 'Triumph Hurdle', 2, 'Defi Du Seuil (FR)', 5, 12, 'Mega Fortune (FR)', 8, 'Davy Russell', 'Gordon Elliott'),
    ('2017', 'Triumph Hurdle', 3, 'Mega Fortune (FR)', 12, 1, 'Bapaume', 11, 'Noel Fehily', 'Nicky Henderson'),
    ('2017', 'County Hurdle', 2, 'Arctic Fire (GER)', 1, 2, "L'Ami Serge", 26, 'R Walsh', 'W P Mullins'),
    ('2017', 'County Hurdle', 3, "L'Ami Serge", 2, 24, 'Ozzie The Oscar', 51, 'Kevin Jones', 'Seamus Mullins'),
    ('2017', 'Albert Bartlett', 2, 'Penhill', 9, 8, 'Monalee (IRE)', 9, 'David Mullins', 'Henry De Bromhead'),
    ('2017', 'Gold Cup', 3, 'Minella Rocco (IRE)', 7, 9, 'Native River', 4.5, 'B J Cooper', 'Gordon Elliott'),
    ('2017', 'Foxhunter Chase', 2, 'Pacha Du Polder (FR)', 17, 24, 'Wonderful Charm', 4.5, '', ''),
    ('2017', 'Foxhunter Chase', 3, 'Wonderful Charm', 24, 5, 'Barel Of Laughs', 101, "Ms L O'Neill", 'Mrs Rose Loxton'),
    ('2017', 'Grand Annual', 2, 'Rock The World (IRE)', 4, 11, 'Gardefort (FR)', 21, 'Daryl Jacob', 'Venetia Williams'),
    ('2017', 'Grand Annual', 3, 'Gardefort (FR)', 11, 14, 'Theinval', 10, 'Kielan Woods', 'Ben Case'),
    ('2017', 'Martin Pipe', 2, 'Champagne Classic (IRE)', 12, 23, 'Verni (FR)', 26, 'Tom Cheesman', 'Philip Hobbs'),
    ('2017', 'Martin Pipe', 3, 'Verni (FR)', 23, 5, 'Runfordave (IRE)', 10, 'Donagh Meyler', 'Gordon Elliott'),
    ('2017', 'Plate Handicap Chase', 3, 'Buywise (IRE)', 14, 2, 'Noble Endeavor (IRE)', 8.5, '', ''),
    ('2017', 'Ultima Handicap Chase', 3, 'Buywise (IRE)', 14, 2, 'Noble Endeavor (IRE)', 8.5, 'Davy Russell', 'Gordon Elliott'),
    ('2017', 'Queen Mother Champion Chase', 3, "God's Own (IRE)", 4, 6, 'Sir Valentino (FR)', 34, 'Paddy Brennan', 'Tom George'),
    ('2018', 'Triumph Hurdle', 3, 'Mr Adjudicator', 3, 6, 'Sayo', 34, 'Danny Mullins', 'W P Mullins'),
    ('2018', 'Albert Bartlett', 3, 'Ok Corral (IRE)', 13, 18, 'Santini', 3.8, 'Nico de Boinville', 'Nicky Henderson'),
    ('2018', 'Gold Cup', 3, 'Might Bite (IRE)', 9, 2, 'Anibale Fly (FR)', 34, 'Barry Geraghty', 'A J Martin'),
    ('2018', 'Foxhunter Chase', 2, 'Pacha Du Polder (FR)', 10, 16, 'Top Wood', 51, 'Mr David Maxwell', 'Paul Nicholls'),
    ('2018', 'Foxhunter Chase', 3, 'Top Wood', 16, 2, 'Barel Of Laughs (IRE)', 15, 'Alex Edwards', 'Philip Rowley'),
    ('2018', 'Grand Annual', 2, 'Le Prezien (FR)', 7, 4, 'Gino Trail (IRE)', 26, 'Jamie Moore', 'Kerry Lee'),
    ('2018', 'Martin Pipe', 3, 'Discorama (FR)', 23, 5, 'Early Doors (FR)', 10, 'J J Slevin', "Joseph Patrick O'Brien"),
    ('2018', "Turners Novices' Chase", 2, 'Shattered Love (IRE)', 10, 9, 'Terrefort (FR)', 4, '', ''),
    ('2018', "Turners Novices' Chase", 3, 'Bigmartre (FR)', 2, 1, 'Benatar (IRE)', 11, '', ''),
    ('2018', 'Champion Hurdle', 3, 'Identity Thief (IRE)', 6, 9, 'Mick Jazz (FR)', 26, 'Davy Russell', 'Gordon Elliott'),
    ('2018', 'Coral Cup', 3, 'William Henry (IRE)', 2, 23, 'Barra (FR)', 17, 'Jack Kennedy', 'Gordon Elliott'),
    ('2018', 'Champion Bumper', 3, 'Acey Milan (IRE)', 21, 18, 'Tornado Flyer (IRE)', 15, 'Paul Townend', 'W P Mullins'),
    ('2019', 'Ryanair Chase', 2, 'Frodon (FR)', 6, 1, 'Aso (FR)', 34, 'Charlie Deutsch', 'Venetia Williams'),
    ('2019', 'Ryanair Chase', 3, 'Aso (FR)', 1, 8, 'Road To Respect (IRE)', 5.5, 'Sean Flanagan', 'Noel Meade'),
    ('2019', "Stayers' Hurdle", 2, 'Paisley Park (IRE)', 10, 12, 'Sam Spinner', 34, 'Joe Colliver', "Jedd O'Keeffe"),
    ('2019', "Stayers' Hurdle", 3, 'Sam Spinner', 12, 5, 'Faugheen (IRE)', 5, 'R Walsh', 'W P Mullins'),
    ('2019', "Dawn Run Mares' Hurdle", 3, 'Roksana (IRE)', 13, 9, 'Tintangle (IRE)', 41, 'Jack Kennedy', 'Gordon Elliott'),
    ('2019', 'Kim Muir', 3, 'Kilfilum Cross (IRE)', 8, 3, 'The Young Master', 23, 'Mr Sam Waley-Cohen', 'Neil Mulholland'),
    ('2019', 'Grand Annual', 2, 'Croco Bay (IRE)', 17, 5, 'Bun Doran (IRE)', 12, '', ''),
    ('2019', 'Grand Annual', 3, 'Bun Doran (IRE)', 5, 19, "Brelan D'As (FR)", 9, '', ''),
    ('2019', 'Gold Cup', 2, 'Al Boum Photo (FR)', 1, 2, 'Anibale Fly (FR)', 23, '', ''),
    ('2019', 'Gold Cup', 3, 'Anibale Fly (FR)', 2, 4, 'Bristol De Mai (FR)', 19, '', ''),
    ('2020', 'Triumph Hurdle', 2, 'Burning Victory (FR)', 12, 2, 'Aspire Tower (IRE)', 6, 'Rachael Blackmore', 'Henry De Bromhead'),
    ('2020', 'Triumph Hurdle', 3, 'Aspire Tower (IRE)', 2, 1, 'Allmankind', 4.5, 'Harry Skelton', 'Dan Skelton'),
    ('2020', 'County Hurdle', 3, 'Aramon (GER)', 2, 3, 'Embittered', 15, 'Rachael Blackmore', 'Henry De Bromhead'),
    ('2020', 'Albert Bartlett', 3, 'Thyme Hill', 19, 5, 'Fury Road', 6, 'Gavin Sheehan', 'Paul Webber'),
    ('2020', 'Gold Cup', 2, 'Al Boum Photo (FR)', 1, 12, 'Santini', 6, '', ''),
    ('2020', 'Gold Cup', 3, 'Santini', 12, 8, 'Lostintranslation (IRE)', 11, 'Robbie Power', 'Colin Tizzard'),
    ('2020', 'Grand Annual', 3, 'Eclair De Beaufeu (FR)', 8, 9, 'Us And Them (IRE)', 11, 'J J Slevin', "Joseph Patrick O'Brien"),
    ('2020', 'Ryanair Chase', 3, 'Frodon (FR)', 4, 1, 'A Plus Tard (FR)', 2.8, 'Rachael Blackmore', 'Henry De Bromhead'),
    ('2020', 'Ultima Handicap Chase', 3, 'Cobra De Mai (FR)', 15, 7, 'Discorama (FR)', 6.5, 'B J Cooper', 'Paul Nolan'),
    ('2021', 'Triumph Hurdle', 2, 'Quilixios', 4, 1, 'Adagio (GER)', 11, 'Tom Scudamore', 'David Pipe'),
    ('2021', 'Triumph Hurdle', 3, 'Adagio (GER)', 1, 2, 'Haut En Couleurs', 21, 'David Noonan', 'Nigel Hawke'),
    ('2021', 'County Hurdle', 2, 'Belfast Banter (IRE)', 26, 1, 'Petit Mouchoir (FR)', 23, 'Jordan Gainford', 'Mrs Denise Foster'),
    ('2021', 'County Hurdle', 3, 'Petit Mouchoir (FR)', 1, 15, 'Milkwood (IRE)', 29, 'Robert Dunne', 'Neil Mulholland'),
    ('2021', 'Albert Bartlett', 2, 'Vanillier (FR)', 17, 10, 'Oscar Elite (IRE)', 41, "Jonjo O'Neill Jr", 'Colin Tizzard'),
    ('2021', 'Albert Bartlett', 3, 'Oscar Elite (IRE)', 10, 13, 'Streets Of Doyen (IRE)', 11, 'Simon Torrens', 'John C McConnell'),
    ('2021', 'Martin Pipe', 3, 'Langer Dan (IRE)', 22, 1, 'Floueur (FR)', 34, "Paul O'Brien", "Joseph Patrick O'Brien"),
    ('2021', 'Plate Handicap Chase', 2, 'The Shunter (IRE)', 14, 7, 'Farclas (FR)', 6, '', ''),
    ('2021', 'Plate Handicap Chase', 3, 'Farclas (FR)', 7, 1, 'Top Notch (FR)', 51, '', ''),
    ('2021', "Dawn Run Mares' Hurdle", 2, 'Telmesomethinggirl (IRE)', 14, 8, 'Magic Daze (IRE)', 23, '', ''),
    ('2021', "Dawn Run Mares' Hurdle", 3, 'Black Tears', 1, 10, 'Mighty Blue (FR)', 13, '', ''),
    ('2021', 'Cross Country Chase', 2, 'Easysland (FR)', 5, 5, 'Easysland (FR)', 2, 'Felix De Giles', 'D Cottin'),
    ('2021', 'Grand Annual', 3, 'On The Slopes', 14, 4, 'Ibleo (FR)', 10, 'Charlie Deutsch', 'Venetia Williams'),
    ('2022', 'Triumph Hurdle', 2, 'Vauban (FR)', 12, 3, 'Fil Dor (FR)', 6.5, 'Davy Russell', 'Gordon Elliott'),
    ('2022', 'Triumph Hurdle', 3, 'Fil Dor (FR)', 3, 9, 'Pied Piper', 4.5, 'Joshua Moore', 'Gary Moore'),
    ('2022', 'County Hurdle', 3, 'First Street', 8, 16, 'Colonel Mustard (FR)', 7.5, 'Conor Orr', 'Mrs Lorna Fowler'),
    ('2022', 'Gold Cup', 3, 'Minella Indo (IRE)', 7, 8, 'Protektorat (FR)', 11, 'Harry Skelton', 'Dan Skelton'),
    ('2022', 'Mares Chase', 3, 'Pink Legend', 6, 2, 'Scarlet And Dove', 29, 'Mark Walsh', 'W P Mullins'),
    ('2022', 'Martin Pipe', 3, 'Cobblers Dream (IRE)', 15, 18, 'Hollow Games', 5.5, 'Jordan Gainford', 'Gordon Elliott'),
    ('2022', "Turners Novices' Chase", 2, 'Bob Olinger (IRE)', 1, 4, 'Busselton (FR)', 51, 'J J Slevin', "Joseph Patrick O'Brien"),
    ('2022', "Turners Novices' Chase", 3, 'Busselton (FR)', 4, 2, 'El Barra (FR)', 19, 'Mr P W Mullins', 'W P Mullins'),
    ('2022', 'Pertemps Final', 2, 'Third Wind', 8, 13, 'Alaphilippe', 6.5, "Darragh O'Keeffe", 'M F Morris'),
    ('2022', 'Pertemps Final', 3, 'Alaphilippe', 13, 12, 'Mill Green', 34, 'Nico de Boinville', 'Nicky Henderson'),
    ('2022', 'Ryanair Chase', 2, 'Allaho (FR)', 1, 5, 'Janidil (FR)', 13, 'Mark Walsh', 'W P Mullins'),
    ('2022', 'Ryanair Chase', 3, 'Janidil (FR)', 5, 3, 'Eldorado Allen (FR)', 15, 'Brendan Powell', 'Colin Tizzard'),
    ('2022', "Stayers' Hurdle", 2, 'Flooring Porter (IRE)', 2, 9, 'Thyme Hill', 6.5, "Tom O'Brien", 'Philip Hobbs'),
    ('2022', "Dawn Run Mares' Hurdle", 2, 'Choice Of Words', 5, 8, 'Ahorsewithnoname', 51, 'Nico de Boinville', 'Nicky Henderson'),
    ('2022', "Dawn Run Mares' Hurdle", 3, 'Ahorsewithnoname', 8, 12, 'Grangee (FR)', 7.5, 'Paul Townend', 'W P Mullins'),
    ('2022', 'Kim Muir', 2, 'Chambard (FR)', 20, 11, 'Mister Coffey (FR)', 6, 'Mr Sam Waley-Cohen', 'Nicky Henderson'),
    ('2022', 'Kim Muir', 3, 'Mister Coffey (FR)', 11, 25, 'Didero Vallis (FR)', 67, 'Mr James King', 'Venetia Williams'),
    ('2022', 'Champion Hurdle', 2, 'Zanahiyr (IRE)', 8, 9, 'Epatante (FR)', 17, 'Aidan Coleman', 'Nicky Henderson'),
    ('2022', 'Champion Hurdle', 3, 'Epatante (FR)', 9, 5, 'Saint Roi (FR)', 34, 'Mark Walsh', 'W P Mullins'),
    ('2022', 'Coral Cup', 3, 'Camprond (FR)', 19, 2, 'Ashdale Bob (IRE)', 15, 'Jack Foley', 'Mrs John Harrington'),
    ('2023', 'Gold Cup', 3, 'Bravemansgame (FR)', 3, 4, 'Conflated (IRE)', 23, 'Sam Ewing', 'Gordon Elliott'),
    ('2023', 'Mares Chase', 2, 'Impervious (IRE)', 3, 1, 'Allegorie De Vassy (FR)', 2.6, 'Paul Townend', 'W P Mullins'),
    ('2023', 'Martin Pipe', 2, 'Iroko (FR)', 8, 7, 'No Ordinary Joe (IRE)', 15, 'Luca Morgan', 'Nicky Henderson'),
    ('2023', 'Martin Pipe', 3, 'No Ordinary Joe', 4, 21, 'Buddy One', 29, 'Shane Fitzgerald', 'Gordon Elliott'),
    ('2023', "Turners Novices' Chase", 2, 'Stage Star (IRE)', 8, 7, 'Notlongtillmay', 41, 'Adam Wedge', 'L J Morgan'),
    ('2023', "Turners Novices' Chase", 3, 'Notlongtillmay', 7, 6, 'Mighty Potter (FR)', 1.7, 'Davy Russell', 'Gordon Elliott'),
    ('2023', 'Pertemps Final', 2, 'Good Time Jonny (IRE)', 5, 1, 'Salvador Ziggy (IRE)', 11, 'Aidan Kelly', 'Gordon Elliott'),
    ('2023', 'Ryanair Chase', 2, 'Envoi Allen (FR)', 3, 9, 'Shishkin (IRE)', 23, 'Harry Cobden', 'Paul Nicholls'),
    ('2023', 'Ryanair Chase', 3, 'Shishkin (IRE)', 9, 7, 'Hitman', 23, 'Mark Walsh', 'W P Mullins'),
    ('2023', "Stayers' Hurdle", 2, 'Sire Du Berlais (FR)', 10, 3, 'Dashel Drasher', 41, 'Rex Dingle', 'Jeremy Scott'),
    ('2023', "Stayers' Hurdle", 3, 'Dashel Drasher', 3, 11, 'Teahupoo', 3.2, '', ''),
    ('2023', "Dawn Run Mares' Hurdle", 2, 'Epatante (FR)', 3, 2, 'Magical Zoe (IRE)', 8.5, 'A P Heskin', 'Henry De Bromhead'),
    ('2023', 'Kim Muir', 2, 'Angels Dawn (IRE)', 22, 15, 'Stumptown', 4.5, 'Tiernan Power Roche', 'Paul Nolan'),
    ('2023', 'Kim Muir', 3, 'Stumptown', 15, 1, 'Mr Incredible (IRE)', 5, 'Mr P W Mullins', 'W P Mullins'),
    ('2024', 'Triumph Hurdle', 3, 'Kargese (FR)', 14, 10, 'Salver (FR)', 11, 'Gavin Sheehan', 'Gary Moore'),
    ('2024', 'Albert Bartlett', 3, 'Chigorin (IRE)', 3, 4, 'Dancing City (FR)', 9, 'Danny Mullins', 'W P Mullins'),
    ('2024', 'Martin Pipe', 3, 'Waterford Whispers (IRE)', 13, 5, 'Quai De Bourbon (FR)', 5, "Michael O'Sullivan", 'W P Mullins'),
    ('2024', "Turners Novices' Chase", 3, "Ginny's Destiny (IRE)", 4, 2, 'Djelo (FR)', 26, 'Charlie Deutsch', 'Venetia Williams'),
    ('2024', "Stayers' Hurdle", 3, 'Flooring Porter (IRE)', 6, 7, 'Home By The Lee (IRE)', 17, 'J J Slevin', "Joseph Patrick O'Brien"),
    ('2024', 'Plate Handicap Chase', 2, "Shakem Up'arry (IRE)", 7, 10, 'Crebilly (IRE)', 4.5, "Jonjo O'Neill Jr", "Jonjo O'Neill"),
    ('2024', 'Plate Handicap Chase', 3, 'Crebilly (IRE)', 10, 18, 'Straw Fan Jack', 29, 'Charlie Deutsch', 'Venetia Williams'),
    ('2024', "Dawn Run Mares' Hurdle", 2, 'Lossiemouth (FR)', 6, 2, 'Brighterdaysahead (FR)', 1.8, 'Jack Kennedy', 'Gordon Elliott'),
    ('2024', "Dawn Run Mares' Hurdle", 3, 'Lossiemouth (FR)', 6, 1, 'Birdie Or Bust (IRE)', 11, 'Rachael Blackmore', 'Henry De Bromhead'),
    ('2025', 'County Hurdle', 3, 'Ndaawi', 8, 2, 'Absurde (FR)', 6, 'Danny Mullins', 'W P Mullins'),
    ('2025', 'Gold Cup', 2, 'Inothewayurthinkin (IRE)', 6, 4, 'Galopin Des Champs (FR)', 1.6, 'Paul Townend', 'W P Mullins'),
    ('2025', 'Gold Cup', 3, 'Galopin Des Champs (FR)', 4, 5, 'Gentlemansgame', 41, "Darragh O'Keeffe", 'M F Morris'),
    ('2025', 'Martin Pipe', 3, 'Act Of Authority (FR)', 12, 17, 'Raglan Road (IRE)', 26, 'Gavin Brouder', 'Henry De Bromhead'),
    ('2025', "Dawn Run Mares' Hurdle", 3, 'Jubilee Alpha (IRE)', 9, 6, 'Diva Luna (IRE)', 13, 'Ben Jones', 'Ben Pauling'),
    ('2025', "Turners Novices' Chase", 2, 'Caldwell Potter (FR)', 3, 10, 'Anyway (GER)', 126, "Darragh O'Keeffe", 'David Kenneth Budds'),
    ('2025', 'Pertemps Final', 2, 'Doddiethegreat (IRE)', 19, 10, 'Jeriko Du Reponet (FR)', 6.5, 'Nico de Boinville', 'Nicky Henderson'),
    ('2025', 'Pertemps Final', 3, 'Jeriko Du Reponet (FR)', 10, 20, 'Catch Him Derry (IRE)', 15, 'Harry Skelton', 'Dan Skelton'),
    ('2025', 'Ryanair Chase', 3, 'Heart Wood (FR)', 5, 2, 'Envoi Allen (FR)', 13, 'Rachael Blackmore', 'Henry De Bromhead'),
    ('2025', "Stayers' Hurdle", 2, 'Bob Olinger (IRE)', 1, 14, 'Teahupoo (FR)', 2.8, 'Jack Kennedy', 'Gordon Elliott'),
    ('2025', "Stayers' Hurdle", 3, 'Teahupoo (FR)', 14, 15, 'The Wallpark (IRE)', 8, 'Mark Walsh', 'Gordon Elliott'),
]

# ── Positional replacement: process file line-by-line, fix Nth entry in top3 ──
from collections import defaultdict
by_race = defaultdict(dict)
for fix_tuple in REPLACEMENTS:
    year, race, pos, old_name, old_gate, new_gate, new_name, new_sp, new_jockey, new_trainer = fix_tuple
    by_race[(year, race)][pos] = {'new_gate': new_gate, 'new_name': new_name, 'new_sp': new_sp, 'new_jockey': new_jockey, 'new_trainer': new_trainer}

lines = src.split('\n')
out = []
current_year = None
current_race = None
in_top3 = False
top3_idx = 0

i = 0
while i < len(lines):
    line = lines[i]

    year_m = re.match(r'\s*(\d{4})\s*:\s*\{', line)
    if year_m:
        current_year = year_m.group(1)
        current_race = None
        in_top3 = False

    race_m = re.search(r'raceName:\s*"([^"]+)"', line)
    if race_m:
        current_race = race_m.group(1)
        in_top3 = False
        top3_idx = 0

    if re.search(r'\btop3\s*:\s*\[', line):
        in_top3 = True
        top3_idx = 0

    if re.search(r'\bfield\s*:\s*\[', line):
        in_top3 = False

    if in_top3 and 'gatePosition' in line:
        pos = top3_idx + 1
        top3_idx += 1
        # Detect if entry is single-line (has closing }) or two-line
        is_single_line = '}' in line
        key = (current_year, current_race)
        fix = by_race.get(key, {}).get(pos)

        if fix:
            sp_str = f"{fix['new_sp']:.1f}" if isinstance(fix['new_sp'], float) else str(fix['new_sp'])
            indent = re.match(r'(\s*)', line).group(1)
            new_line = (
                f"{indent}{{ gatePosition: {str(fix['new_gate']).rjust(2)}, "
                f"horseName: \"{fix['new_name']}\", "
                f"sp: {sp_str},  "
                f"jockey: \"{fix['new_jockey']}\",  "
                f"trainer: \"{fix['new_trainer']}\" }},"
            )
            out.append(new_line)
            fixes += 1
            if not is_single_line:
                i += 1  # skip the `, sp: ...` continuation line
        else:
            out.append(line)
            if not is_single_line:
                i += 1
                out.append(lines[i])
    else:
        out.append(line)

    i += 1

print(f"Fixes applied: {fixes}, Not found: {len(REPLACEMENTS) - fixes}")

if fixes > 0:
    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write('\n'.join(out))
    print(f"Written {JS_PATH}")
else:
    print("No changes made.")
