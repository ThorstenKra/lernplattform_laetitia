// mathe_data.js -- Laetitia Lernsystem
// Stand: 2026-04-08
// M1_NACHBAR: Nachbarzahlen Klasse 1  (20 Aufgaben)
// M1_REIHE:   Zahlenreihen Klasse 1   (20 Aufgaben)
// M1: Addition 0-10     (40 Aufgaben)
// M2: Subtraktion 0-10  (40 Aufgaben)
// M3: Addition 0-20     (40 Aufgaben)
// M4: Subtraktion 0-20  (40 Aufgaben)
// Zufallsgenerator in moduleKit.js waehlt automatisch 15 pro Sitzung.

(function(){
  "use strict";
  var tasks = [

    // ══════════════════════════════════════════════
    // M1_NACHBAR -- Nachbarzahlen Klasse 1
    // ══════════════════════════════════════════════

    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 1 - 2 - 3",         antwort_a:"2", antwort_b:"5", antwort_c:"4", antwort_d:"3", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 2 - 3 - ___",        antwort_a:"2", antwort_b:"5", antwort_c:"4", antwort_d:"3", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 3 - 4 - ___",        antwort_a:"5", antwort_b:"6", antwort_c:"4", antwort_d:"3", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 4 - 5 - ___",        antwort_a:"7", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 5 - 6 - ___",        antwort_a:"6", antwort_b:"8", antwort_c:"7", antwort_d:"5", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 6 - 7 - ___",        antwort_a:"8", antwort_b:"7", antwort_c:"6", antwort_d:"9", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 7 - 8 - ___",        antwort_a:"9", antwort_b:"8", antwort_c:"7", antwort_d:"10", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 8 - 9 - ___",        antwort_a:"9", antwort_b:"10", antwort_c:"11", antwort_d:"8", richtig:"B" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 2 - 3",        antwort_a:"4", antwort_b:"1", antwort_c:"2", antwort_d:"3", richtig:"B" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 3 - 4",        antwort_a:"2", antwort_b:"3", antwort_c:"1", antwort_d:"4", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 4 - 5",        antwort_a:"3", antwort_b:"4", antwort_c:"2", antwort_d:"1", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 5 - 6",        antwort_a:"2", antwort_b:"5", antwort_c:"4", antwort_d:"3", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 6 - 7",        antwort_a:"5", antwort_b:"6", antwort_c:"4", antwort_d:"3", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 7 - 8",        antwort_a:"7", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 8 - 9",        antwort_a:"6", antwort_b:"8", antwort_c:"7", antwort_d:"5", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: ___ - 9 - 10",       antwort_a:"8", antwort_b:"7", antwort_c:"6", antwort_d:"9", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 1 - ___ - 3",        antwort_a:"2", antwort_b:"3", antwort_c:"1", antwort_d:"4", richtig:"A" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 3 - ___ - 5",        antwort_a:"2", antwort_b:"5", antwort_c:"4", antwort_d:"3", richtig:"C" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 5 - ___ - 7",        antwort_a:"7", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1_NACHBAR", seite:"", text:"Nachbarzahlen - Klasse 1", frage:"Setze die fehlende Nachbarzahl ein: 7 - ___ - 9",        antwort_a:"8", antwort_b:"7", antwort_c:"6", antwort_d:"9", richtig:"A" },

    // ══════════════════════════════════════════════
    // M1_REIHE -- Zahlenreihen Klasse 1
    // ══════════════════════════════════════════════

    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 1 - 2 - 3 - ___ - 5",    antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 1 - ___ - 3 - 4 - 5",    antwort_a:"1", antwort_b:"4", antwort_c:"3", antwort_d:"2", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 2 - 3 - ___ - 5 - 6",    antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 3 - 4 - 5 - 6 - ___",    antwort_a:"8", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? ___ - 5 - 6 - 7 - 8",    antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 5 - 6 - ___ - 8 - 9",    antwort_a:"8", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 6 - ___ - 8 - 9 - 10",   antwort_a:"8", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 1 - 3 - ___ - 7 - 9",    antwort_a:"6", antwort_b:"3", antwort_c:"5", antwort_d:"4", richtig:"C" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 2 - 4 - 6 - ___ - 10",   antwort_a:"9", antwort_b:"7", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 1 - 2 - 3 - 4 - ___",    antwort_a:"6", antwort_b:"3", antwort_c:"5", antwort_d:"4", richtig:"C" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? ___ - 3 - 4 - 5 - 6",    antwort_a:"1", antwort_b:"4", antwort_c:"3", antwort_d:"2", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 3 - ___ - 5 - 6 - 7",    antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 4 - 5 - 6 - ___ - 8",    antwort_a:"8", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? ___ - 6 - 7 - 8 - 9",    antwort_a:"6", antwort_b:"3", antwort_c:"5", antwort_d:"4", richtig:"C" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 6 - 7 - 8 - 9 - ___",    antwort_a:"11", antwort_b:"9", antwort_c:"8", antwort_d:"10", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? ___ - 3 - 5 - 7 - 9",    antwort_a:"4", antwort_b:"2", antwort_c:"1", antwort_d:"3", richtig:"C" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 2 - ___ - 6 - 8 - 10",   antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 1 - 2 - ___ - 4 - 5",    antwort_a:"3", antwort_b:"2", antwort_c:"4", antwort_d:"1", richtig:"A" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 3 - 4 - 5 - ___ - 7",    antwort_a:"5", antwort_b:"4", antwort_c:"7", antwort_d:"6", richtig:"D" },
    { stufe:"M1_REIHE", seite:"", text:"Zahlenreihen - Klasse 1", frage:"Welche Zahl gehört in die Lücke? 2 - 4 - 6 - 8 - ___",    antwort_a:"11", antwort_b:"9", antwort_c:"8", antwort_d:"10", richtig:"D" },

    // ══════════════════════════════════════════════
    // M1 -- Addition im Zahlenraum 0 bis 10
    // ══════════════════════════════════════════════

    { stufe:"M1", seite:"1",  text:"0 + 1 = ?", frage:"Was ist 0 + 1?", antwort_a:"0", antwort_b:"2", antwort_c:"1", antwort_d:"3", richtig:"C" },
    { stufe:"M1", seite:"2",  text:"1 + 1 = ?", frage:"Was ist 1 + 1?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M1", seite:"3",  text:"1 + 2 = ?", frage:"Was ist 1 + 2?", antwort_a:"4", antwort_b:"2", antwort_c:"3", antwort_d:"5", richtig:"C" },
    { stufe:"M1", seite:"4",  text:"2 + 2 = ?", frage:"Was ist 2 + 2?", antwort_a:"3", antwort_b:"5", antwort_c:"6", antwort_d:"4", richtig:"D" },
    { stufe:"M1", seite:"5",  text:"2 + 3 = ?", frage:"Was ist 2 + 3?", antwort_a:"4", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"C" },
    { stufe:"M1", seite:"6",  text:"3 + 3 = ?", frage:"Was ist 3 + 3?", antwort_a:"5", antwort_b:"7", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1", seite:"7",  text:"3 + 4 = ?", frage:"Was ist 3 + 4?", antwort_a:"6", antwort_b:"8", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1", seite:"8",  text:"4 + 4 = ?", frage:"Was ist 4 + 4?", antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1", seite:"9",  text:"4 + 5 = ?", frage:"Was ist 4 + 5?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"10", text:"5 + 5 = ?", frage:"Was ist 5 + 5?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"11", text:"0 + 5 = ?", frage:"Was ist 0 + 5?", antwort_a:"4", antwort_b:"6", antwort_c:"3", antwort_d:"5", richtig:"D" },
    { stufe:"M1", seite:"12", text:"1 + 3 = ?", frage:"Was ist 1 + 3?", antwort_a:"3", antwort_b:"5", antwort_c:"4", antwort_d:"2", richtig:"C" },
    { stufe:"M1", seite:"13", text:"1 + 4 = ?", frage:"Was ist 1 + 4?", antwort_a:"4", antwort_b:"6", antwort_c:"3", antwort_d:"5", richtig:"D" },
    { stufe:"M1", seite:"14", text:"1 + 5 = ?", frage:"Was ist 1 + 5?", antwort_a:"5", antwort_b:"7", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1", seite:"15", text:"1 + 6 = ?", frage:"Was ist 1 + 6?", antwort_a:"6", antwort_b:"8", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1", seite:"16", text:"1 + 7 = ?", frage:"Was ist 1 + 7?", antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1", seite:"17", text:"1 + 8 = ?", frage:"Was ist 1 + 8?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"18", text:"1 + 9 = ?", frage:"Was ist 1 + 9?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"19", text:"2 + 4 = ?", frage:"Was ist 2 + 4?", antwort_a:"5", antwort_b:"7", antwort_c:"4", antwort_d:"6", richtig:"D" },
    { stufe:"M1", seite:"20", text:"2 + 5 = ?", frage:"Was ist 2 + 5?", antwort_a:"6", antwort_b:"8", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1", seite:"21", text:"2 + 6 = ?", frage:"Was ist 2 + 6?", antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1", seite:"22", text:"2 + 7 = ?", frage:"Was ist 2 + 7?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"23", text:"2 + 8 = ?", frage:"Was ist 2 + 8?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"7", richtig:"C" },
    { stufe:"M1", seite:"24", text:"3 + 5 = ?", frage:"Was ist 3 + 5?", antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1", seite:"25", text:"3 + 6 = ?", frage:"Was ist 3 + 6?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"26", text:"3 + 7 = ?", frage:"Was ist 3 + 7?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"27", text:"4 + 6 = ?", frage:"Was ist 4 + 6?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"28", text:"0 + 3 = ?", frage:"Was ist 0 + 3?", antwort_a:"2", antwort_b:"4", antwort_c:"1", antwort_d:"3", richtig:"D" },
    { stufe:"M1", seite:"29", text:"0 + 7 = ?", frage:"Was ist 0 + 7?", antwort_a:"6", antwort_b:"8", antwort_c:"5", antwort_d:"7", richtig:"D" },
    { stufe:"M1", seite:"30", text:"0 + 10 = ?", frage:"Was ist 0 + 10?", antwort_a:"9", antwort_b:"11", antwort_c:"8", antwort_d:"10", richtig:"D" },
    { stufe:"M1", seite:"31", text:"5 + 4 = ?", frage:"Was ist 5 + 4?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"32", text:"6 + 3 = ?", frage:"Was ist 6 + 3?", antwort_a:"8", antwort_b:"10", antwort_c:"9", antwort_d:"7", richtig:"C" },
    { stufe:"M1", seite:"33", text:"7 + 2 = ?", frage:"Was ist 7 + 2?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"34", text:"8 + 1 = ?", frage:"Was ist 8 + 1?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M1", seite:"35", text:"9 + 1 = ?", frage:"Was ist 9 + 1?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"36", text:"6 + 4 = ?", frage:"Was ist 6 + 4?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"37", text:"7 + 3 = ?", frage:"Was ist 7 + 3?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"38", text:"8 + 2 = ?", frage:"Was ist 8 + 2?", antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C" },
    { stufe:"M1", seite:"39", text:"5 + 3 = ?", frage:"Was ist 5 + 3?", antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D" },
    { stufe:"M1", seite:"40", text:"4 + 3 = ?", frage:"Was ist 4 + 3?", antwort_a:"6", antwort_b:"8", antwort_c:"5", antwort_d:"7", richtig:"D" },

    // ══════════════════════════════════════════════
    // M2 -- Subtraktion im Zahlenraum 0 bis 10
    // ══════════════════════════════════════════════

    { stufe:"M2", seite:"1",  text:"1 - 0 = ?", frage:"Was ist 1 - 0?", antwort_a:"0", antwort_b:"2", antwort_c:"1", antwort_d:"3", richtig:"C" },
    { stufe:"M2", seite:"2",  text:"2 - 1 = ?", frage:"Was ist 2 - 1?", antwort_a:"3", antwort_b:"1", antwort_c:"0", antwort_d:"2", richtig:"B" },
    { stufe:"M2", seite:"3",  text:"3 - 1 = ?", frage:"Was ist 3 - 1?", antwort_a:"3", antwort_b:"1", antwort_c:"2", antwort_d:"4", richtig:"C" },
    { stufe:"M2", seite:"4",  text:"3 - 2 = ?", frage:"Was ist 3 - 2?", antwort_a:"3", antwort_b:"2", antwort_c:"0", antwort_d:"1", richtig:"D" },
    { stufe:"M2", seite:"5",  text:"4 - 1 = ?", frage:"Was ist 4 - 1?", antwort_a:"2", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"D" },
    { stufe:"M2", seite:"6",  text:"4 - 2 = ?", frage:"Was ist 4 - 2?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"7",  text:"4 - 3 = ?", frage:"Was ist 4 - 3?", antwort_a:"2", antwort_b:"3", antwort_c:"4", antwort_d:"1", richtig:"D" },
    { stufe:"M2", seite:"8",  text:"4 - 4 = ?", frage:"Was ist 4 - 4?", antwort_a:"1", antwort_b:"4", antwort_c:"0", antwort_d:"2", richtig:"C" },
    { stufe:"M2", seite:"9",  text:"5 - 1 = ?", frage:"Was ist 5 - 1?", antwort_a:"3", antwort_b:"5", antwort_c:"6", antwort_d:"4", richtig:"D" },
    { stufe:"M2", seite:"10", text:"5 - 2 = ?", frage:"Was ist 5 - 2?", antwort_a:"2", antwort_b:"4", antwort_c:"3", antwort_d:"6", richtig:"C" },
    { stufe:"M2", seite:"11", text:"5 - 3 = ?", frage:"Was ist 5 - 3?", antwort_a:"1", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"12", text:"5 - 4 = ?", frage:"Was ist 5 - 4?", antwort_a:"2", antwort_b:"3", antwort_c:"4", antwort_d:"1", richtig:"D" },
    { stufe:"M2", seite:"13", text:"5 - 5 = ?", frage:"Was ist 5 - 5?", antwort_a:"1", antwort_b:"5", antwort_c:"0", antwort_d:"2", richtig:"C" },
    { stufe:"M2", seite:"14", text:"6 - 1 = ?", frage:"Was ist 6 - 1?", antwort_a:"4", antwort_b:"6", antwort_c:"7", antwort_d:"5", richtig:"D" },
    { stufe:"M2", seite:"15", text:"6 - 2 = ?", frage:"Was ist 6 - 2?", antwort_a:"3", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"C" },
    { stufe:"M2", seite:"16", text:"6 - 3 = ?", frage:"Was ist 6 - 3?", antwort_a:"2", antwort_b:"4", antwort_c:"3", antwort_d:"5", richtig:"C" },
    { stufe:"M2", seite:"17", text:"6 - 4 = ?", frage:"Was ist 6 - 4?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"18", text:"6 - 5 = ?", frage:"Was ist 6 - 5?", antwort_a:"2", antwort_b:"3", antwort_c:"4", antwort_d:"1", richtig:"D" },
    { stufe:"M2", seite:"19", text:"6 - 6 = ?", frage:"Was ist 6 - 6?", antwort_a:"1", antwort_b:"6", antwort_c:"0", antwort_d:"2", richtig:"C" },
    { stufe:"M2", seite:"20", text:"7 - 2 = ?", frage:"Was ist 7 - 2?", antwort_a:"4", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"C" },
    { stufe:"M2", seite:"21", text:"7 - 3 = ?", frage:"Was ist 7 - 3?", antwort_a:"3", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"C" },
    { stufe:"M2", seite:"22", text:"7 - 4 = ?", frage:"Was ist 7 - 4?", antwort_a:"2", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"D" },
    { stufe:"M2", seite:"23", text:"7 - 5 = ?", frage:"Was ist 7 - 5?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"24", text:"7 - 6 = ?", frage:"Was ist 7 - 6?", antwort_a:"2", antwort_b:"3", antwort_c:"4", antwort_d:"1", richtig:"D" },
    { stufe:"M2", seite:"25", text:"7 - 7 = ?", frage:"Was ist 7 - 7?", antwort_a:"1", antwort_b:"7", antwort_c:"0", antwort_d:"2", richtig:"C" },
    { stufe:"M2", seite:"26", text:"8 - 2 = ?", frage:"Was ist 8 - 2?", antwort_a:"5", antwort_b:"7", antwort_c:"6", antwort_d:"8", richtig:"C" },
    { stufe:"M2", seite:"27", text:"8 - 3 = ?", frage:"Was ist 8 - 3?", antwort_a:"4", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"C" },
    { stufe:"M2", seite:"28", text:"8 - 4 = ?", frage:"Was ist 8 - 4?", antwort_a:"3", antwort_b:"5", antwort_c:"4", antwort_d:"6", richtig:"B" },
    { stufe:"M2", seite:"29", text:"8 - 5 = ?", frage:"Was ist 8 - 5?", antwort_a:"2", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"D" },
    { stufe:"M2", seite:"30", text:"8 - 6 = ?", frage:"Was ist 8 - 6?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"31", text:"9 - 3 = ?", frage:"Was ist 9 - 3?", antwort_a:"5", antwort_b:"7", antwort_c:"6", antwort_d:"8", richtig:"C" },
    { stufe:"M2", seite:"32", text:"9 - 4 = ?", frage:"Was ist 9 - 4?", antwort_a:"4", antwort_b:"6", antwort_c:"7", antwort_d:"5", richtig:"D" },
    { stufe:"M2", seite:"33", text:"9 - 5 = ?", frage:"Was ist 9 - 5?", antwort_a:"3", antwort_b:"5", antwort_c:"6", antwort_d:"4", richtig:"D" },
    { stufe:"M2", seite:"34", text:"9 - 6 = ?", frage:"Was ist 9 - 6?", antwort_a:"2", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"D" },
    { stufe:"M2", seite:"35", text:"9 - 7 = ?", frage:"Was ist 9 - 7?", antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D" },
    { stufe:"M2", seite:"36", text:"10 - 1 = ?", frage:"Was ist 10 - 1?", antwort_a:"8", antwort_b:"10", antwort_c:"7", antwort_d:"9", richtig:"D" },
    { stufe:"M2", seite:"37", text:"10 - 3 = ?", frage:"Was ist 10 - 3?", antwort_a:"6", antwort_b:"8", antwort_c:"7", antwort_d:"5", richtig:"C" },
    { stufe:"M2", seite:"38", text:"10 - 5 = ?", frage:"Was ist 10 - 5?", antwort_a:"4", antwort_b:"6", antwort_c:"3", antwort_d:"5", richtig:"D" },
    { stufe:"M2", seite:"39", text:"10 - 7 = ?", frage:"Was ist 10 - 7?", antwort_a:"4", antwort_b:"2", antwort_c:"5", antwort_d:"3", richtig:"D" },
    { stufe:"M2", seite:"40", text:"10 - 10 = ?", frage:"Was ist 10 - 10?", antwort_a:"1", antwort_b:"10", antwort_c:"0", antwort_d:"2", richtig:"C" },

    // ══════════════════════════════════════════════
    // M3 -- Addition im Zahlenraum 0 bis 20
    // ══════════════════════════════════════════════

    { stufe:"M3", seite:"1",  text:"8 + 3 = ?",  frage:"Was ist 8 + 3?",  antwort_a:"10", antwort_b:"12", antwort_c:"9",  antwort_d:"11", richtig:"D" },
    { stufe:"M3", seite:"2",  text:"8 + 4 = ?",  frage:"Was ist 8 + 4?",  antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M3", seite:"3",  text:"8 + 5 = ?",  frage:"Was ist 8 + 5?",  antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M3", seite:"4",  text:"8 + 6 = ?",  frage:"Was ist 8 + 6?",  antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"5",  text:"8 + 7 = ?",  frage:"Was ist 8 + 7?",  antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M3", seite:"6",  text:"9 + 3 = ?",  frage:"Was ist 9 + 3?",  antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M3", seite:"7",  text:"9 + 4 = ?",  frage:"Was ist 9 + 4?",  antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M3", seite:"8",  text:"9 + 5 = ?",  frage:"Was ist 9 + 5?",  antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"9",  text:"9 + 6 = ?",  frage:"Was ist 9 + 6?",  antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M3", seite:"10", text:"9 + 9 = ?",  frage:"Was ist 9 + 9?",  antwort_a:"17", antwort_b:"19", antwort_c:"16", antwort_d:"18", richtig:"D" },
    { stufe:"M3", seite:"11", text:"7 + 4 = ?",  frage:"Was ist 7 + 4?",  antwort_a:"10", antwort_b:"12", antwort_c:"9",  antwort_d:"11", richtig:"D" },
    { stufe:"M3", seite:"12", text:"7 + 5 = ?",  frage:"Was ist 7 + 5?",  antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M3", seite:"13", text:"7 + 6 = ?",  frage:"Was ist 7 + 6?",  antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M3", seite:"14", text:"7 + 7 = ?",  frage:"Was ist 7 + 7?",  antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"15", text:"7 + 8 = ?",  frage:"Was ist 7 + 8?",  antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M3", seite:"16", text:"6 + 5 = ?",  frage:"Was ist 6 + 5?",  antwort_a:"10", antwort_b:"12", antwort_c:"9",  antwort_d:"11", richtig:"D" },
    { stufe:"M3", seite:"17", text:"6 + 6 = ?",  frage:"Was ist 6 + 6?",  antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M3", seite:"18", text:"6 + 7 = ?",  frage:"Was ist 6 + 7?",  antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M3", seite:"19", text:"6 + 8 = ?",  frage:"Was ist 6 + 8?",  antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"20", text:"6 + 9 = ?",  frage:"Was ist 6 + 9?",  antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M3", seite:"21", text:"10 + 1 = ?", frage:"Was ist 10 + 1?", antwort_a:"10", antwort_b:"12", antwort_c:"9",  antwort_d:"11", richtig:"D" },
    { stufe:"M3", seite:"22", text:"10 + 2 = ?", frage:"Was ist 10 + 2?", antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M3", seite:"23", text:"10 + 3 = ?", frage:"Was ist 10 + 3?", antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M3", seite:"24", text:"10 + 4 = ?", frage:"Was ist 10 + 4?", antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"25", text:"10 + 5 = ?", frage:"Was ist 10 + 5?", antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M3", seite:"26", text:"10 + 6 = ?", frage:"Was ist 10 + 6?", antwort_a:"15", antwort_b:"17", antwort_c:"14", antwort_d:"16", richtig:"D" },
    { stufe:"M3", seite:"27", text:"10 + 7 = ?", frage:"Was ist 10 + 7?", antwort_a:"16", antwort_b:"18", antwort_c:"15", antwort_d:"17", richtig:"D" },
    { stufe:"M3", seite:"28", text:"10 + 8 = ?", frage:"Was ist 10 + 8?", antwort_a:"17", antwort_b:"19", antwort_c:"16", antwort_d:"18", richtig:"D" },
    { stufe:"M3", seite:"29", text:"10 + 9 = ?", frage:"Was ist 10 + 9?", antwort_a:"18", antwort_b:"20", antwort_c:"17", antwort_d:"19", richtig:"D" },
    { stufe:"M3", seite:"30", text:"10 + 10 = ?", frage:"Was ist 10 + 10?", antwort_a:"19", antwort_b:"18", antwort_c:"20", antwort_d:"21", richtig:"C" },
    { stufe:"M3", seite:"31", text:"11 + 3 = ?", frage:"Was ist 11 + 3?", antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M3", seite:"32", text:"11 + 5 = ?", frage:"Was ist 11 + 5?", antwort_a:"15", antwort_b:"17", antwort_c:"14", antwort_d:"16", richtig:"D" },
    { stufe:"M3", seite:"33", text:"12 + 4 = ?", frage:"Was ist 12 + 4?", antwort_a:"15", antwort_b:"17", antwort_c:"14", antwort_d:"16", richtig:"D" },
    { stufe:"M3", seite:"34", text:"12 + 6 = ?", frage:"Was ist 12 + 6?", antwort_a:"17", antwort_b:"19", antwort_c:"16", antwort_d:"18", richtig:"D" },
    { stufe:"M3", seite:"35", text:"13 + 4 = ?", frage:"Was ist 13 + 4?", antwort_a:"16", antwort_b:"18", antwort_c:"15", antwort_d:"17", richtig:"D" },
    { stufe:"M3", seite:"36", text:"13 + 7 = ?", frage:"Was ist 13 + 7?", antwort_a:"19", antwort_b:"18", antwort_c:"20", antwort_d:"21", richtig:"C" },
    { stufe:"M3", seite:"37", text:"14 + 5 = ?", frage:"Was ist 14 + 5?", antwort_a:"18", antwort_b:"20", antwort_c:"17", antwort_d:"19", richtig:"D" },
    { stufe:"M3", seite:"38", text:"14 + 6 = ?", frage:"Was ist 14 + 6?", antwort_a:"19", antwort_b:"18", antwort_c:"20", antwort_d:"21", richtig:"C" },
    { stufe:"M3", seite:"39", text:"15 + 4 = ?", frage:"Was ist 15 + 4?", antwort_a:"18", antwort_b:"20", antwort_c:"17", antwort_d:"19", richtig:"D" },
    { stufe:"M3", seite:"40", text:"15 + 5 = ?", frage:"Was ist 15 + 5?", antwort_a:"19", antwort_b:"18", antwort_c:"20", antwort_d:"21", richtig:"C" },

    // ══════════════════════════════════════════════
    // M4 -- Subtraktion im Zahlenraum 0 bis 20
    // ══════════════════════════════════════════════

    { stufe:"M4", seite:"1",  text:"11 - 1 = ?",  frage:"Was ist 11 - 1?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"2",  text:"11 - 2 = ?",  frage:"Was ist 11 - 2?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"3",  text:"11 - 3 = ?",  frage:"Was ist 11 - 3?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"4",  text:"12 - 2 = ?",  frage:"Was ist 12 - 2?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"5",  text:"12 - 3 = ?",  frage:"Was ist 12 - 3?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"6",  text:"12 - 4 = ?",  frage:"Was ist 12 - 4?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"7",  text:"12 - 5 = ?",  frage:"Was ist 12 - 5?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"8",  text:"13 - 3 = ?",  frage:"Was ist 13 - 3?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"9",  text:"13 - 4 = ?",  frage:"Was ist 13 - 4?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"10", text:"13 - 5 = ?",  frage:"Was ist 13 - 5?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"11", text:"13 - 6 = ?",  frage:"Was ist 13 - 6?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"12", text:"14 - 4 = ?",  frage:"Was ist 14 - 4?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"13", text:"14 - 5 = ?",  frage:"Was ist 14 - 5?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"14", text:"14 - 6 = ?",  frage:"Was ist 14 - 6?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"15", text:"14 - 7 = ?",  frage:"Was ist 14 - 7?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"16", text:"15 - 5 = ?",  frage:"Was ist 15 - 5?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"17", text:"15 - 6 = ?",  frage:"Was ist 15 - 6?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"18", text:"15 - 7 = ?",  frage:"Was ist 15 - 7?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"19", text:"15 - 8 = ?",  frage:"Was ist 15 - 8?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"20", text:"16 - 6 = ?",  frage:"Was ist 16 - 6?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"21", text:"16 - 7 = ?",  frage:"Was ist 16 - 7?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"22", text:"16 - 8 = ?",  frage:"Was ist 16 - 8?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"23", text:"16 - 9 = ?",  frage:"Was ist 16 - 9?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"24", text:"17 - 7 = ?",  frage:"Was ist 17 - 7?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"25", text:"17 - 8 = ?",  frage:"Was ist 17 - 8?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"26", text:"17 - 9 = ?",  frage:"Was ist 17 - 9?",  antwort_a:"7",  antwort_b:"9",  antwort_c:"6",  antwort_d:"8",  richtig:"D" },
    { stufe:"M4", seite:"27", text:"18 - 8 = ?",  frage:"Was ist 18 - 8?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"28", text:"18 - 9 = ?",  frage:"Was ist 18 - 9?",  antwort_a:"8",  antwort_b:"10", antwort_c:"7",  antwort_d:"9",  richtig:"D" },
    { stufe:"M4", seite:"29", text:"19 - 9 = ?",  frage:"Was ist 19 - 9?",  antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"30", text:"20 - 10 = ?", frage:"Was ist 20 - 10?", antwort_a:"9",  antwort_b:"11", antwort_c:"8",  antwort_d:"10", richtig:"D" },
    { stufe:"M4", seite:"31", text:"20 - 5 = ?",  frage:"Was ist 20 - 5?",  antwort_a:"14", antwort_b:"16", antwort_c:"13", antwort_d:"15", richtig:"D" },
    { stufe:"M4", seite:"32", text:"20 - 3 = ?",  frage:"Was ist 20 - 3?",  antwort_a:"16", antwort_b:"18", antwort_c:"15", antwort_d:"17", richtig:"D" },
    { stufe:"M4", seite:"33", text:"20 - 7 = ?",  frage:"Was ist 20 - 7?",  antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D" },
    { stufe:"M4", seite:"34", text:"20 - 8 = ?",  frage:"Was ist 20 - 8?",  antwort_a:"11", antwort_b:"13", antwort_c:"10", antwort_d:"12", richtig:"D" },
    { stufe:"M4", seite:"35", text:"20 - 9 = ?",  frage:"Was ist 20 - 9?",  antwort_a:"10", antwort_b:"12", antwort_c:"9",  antwort_d:"11", richtig:"D" },
    { stufe:"M4", seite:"36", text:"20 - 4 = ?",  frage:"Was ist 20 - 4?",  antwort_a:"15", antwort_b:"17", antwort_c:"14", antwort_d:"16", richtig:"D" },
    { stufe:"M4", seite:"37", text:"20 - 6 = ?",  frage:"Was ist 20 - 6?",  antwort_a:"13", antwort_b:"15", antwort_c:"12", antwort_d:"14", richtig:"D" },
    { stufe:"M4", seite:"38", text:"11 - 4 = ?",  frage:"Was ist 11 - 4?",  antwort_a:"6",  antwort_b:"8",  antwort_c:"5",  antwort_d:"7",  richtig:"D" },
    { stufe:"M4", seite:"39", text:"12 - 6 = ?",  frage:"Was ist 12 - 6?",  antwort_a:"5",  antwort_b:"7",  antwort_c:"4",  antwort_d:"6",  richtig:"D" },
    { stufe:"M4", seite:"40", text:"13 - 7 = ?",  frage:"Was ist 13 - 7?",  antwort_a:"5",  antwort_b:"7",  antwort_c:"4",  antwort_d:"6",  richtig:"D" }

  ];

  if(window.LaetitiaDataRegistryApi){
    window.LaetitiaDataRegistryApi.set("mathe", tasks);
  }
})();
