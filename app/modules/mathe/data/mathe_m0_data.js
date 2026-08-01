// Neue Zähl-Stufen M0a–M0e für Laetitia
// Emoji mit breiten Abständen (\u2003 = em-Leerzeichen) für gute Lesbarkeit
// textContent-kompatibel (kein HTML)

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

// Hilfsfunktion: Emoji mit Abstand wiederholen, ab 6 Symbolen je 5 pro Zeile
function em(symbol, n){
  var arr = [];
  for(var i=0; i<n; i++) arr.push(symbol);
  if(n <= 5){
    return arr.join("\u2003"); // alles in einer Zeile
  }
  // Mehr als 5: in Zeilen zu je 5 aufteilen
  var zeilen = [];
  for(var z=0; z<arr.length; z+=5){
    zeilen.push(arr.slice(z, z+5).join("\u2003"));
  }
  return zeilen.join("\n");
}

var aufgaben = [

  // ═══════════════════════════════════════════════════════
  // M0a — Mengen bis 3 zählen
  // ═══════════════════════════════════════════════════════

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🍎",1),
    antwort_a:"1", antwort_b:"2", antwort_c:"3", antwort_d:"4", richtig:"A", erklaerung:"Es ist eins (1)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🐱",2),
    antwort_a:"1", antwort_b:"2", antwort_c:"3", antwort_d:"4", richtig:"B", erklaerung:"Es sind zwei (2)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("⭐",3),
    antwort_a:"1", antwort_b:"2", antwort_c:"3", antwort_d:"4", richtig:"C", erklaerung:"Es sind drei (3)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🐣",2),
    antwort_a:"3", antwort_b:"1", antwort_c:"2", antwort_d:"4", richtig:"C", erklaerung:"Es sind zwei (2)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🌸",1),
    antwort_a:"2", antwort_b:"3", antwort_c:"1", antwort_d:"4", richtig:"C", erklaerung:"Es ist eins (1)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🍭",3),
    antwort_a:"2", antwort_b:"3", antwort_c:"1", antwort_d:"4", richtig:"B", erklaerung:"Es sind drei (3)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🐠",2),
    antwort_a:"1", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"D", erklaerung:"Es sind zwei (2)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🌈",1),
    antwort_a:"3", antwort_b:"2", antwort_c:"1", antwort_d:"4", richtig:"C", erklaerung:"Es ist eins (1)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🦋",3),
    antwort_a:"4", antwort_b:"1", antwort_c:"2", antwort_d:"3", richtig:"D", erklaerung:"Es sind drei (3)." },

  { stufe:"M0a", text:"Wie viele siehst du?",
    frage: em("🍓",2),
    antwort_a:"4", antwort_b:"2", antwort_c:"3", antwort_d:"1", richtig:"B", erklaerung:"Es sind zwei (2)." },

  // ═══════════════════════════════════════════════════════
  // M0b — Mengen bis 5 zählen
  // ═══════════════════════════════════════════════════════

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🐸",4),
    antwort_a:"3", antwort_b:"4", antwort_c:"5", antwort_d:"2", richtig:"B", erklaerung:"Es sind vier (4)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🌻",5),
    antwort_a:"4", antwort_b:"3", antwort_c:"6", antwort_d:"5", richtig:"D", erklaerung:"Es sind fünf (5)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🍊",3),
    antwort_a:"5", antwort_b:"4", antwort_c:"3", antwort_d:"2", richtig:"C", erklaerung:"Es sind drei (3)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🐧",4),
    antwort_a:"2", antwort_b:"5", antwort_c:"3", antwort_d:"4", richtig:"D", erklaerung:"Es sind vier (4)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🎈",5),
    antwort_a:"6", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"C", erklaerung:"Es sind fünf (5)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🌙",3),
    antwort_a:"4", antwort_b:"3", antwort_c:"5", antwort_d:"2", richtig:"B", erklaerung:"Es sind drei (3)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🍀",5),
    antwort_a:"3", antwort_b:"6", antwort_c:"4", antwort_d:"5", richtig:"D", erklaerung:"Es sind fünf (5)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🐝",4),
    antwort_a:"5", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"C", erklaerung:"Es sind vier (4)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🎵",3),
    antwort_a:"2", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"D", erklaerung:"Es sind drei (3)." },

  { stufe:"M0b", text:"Wie viele siehst du?",
    frage: em("🌺",5),
    antwort_a:"4", antwort_b:"5", antwort_c:"3", antwort_d:"6", richtig:"B", erklaerung:"Es sind fünf (5)." },

  // ═══════════════════════════════════════════════════════
  // M0c — Mengen bis 10 zählen
  // ═══════════════════════════════════════════════════════

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("⭐",6),
    antwort_a:"5", antwort_b:"7", antwort_c:"6", antwort_d:"8", richtig:"C", erklaerung:"Es sind sechs (6)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🍒",7),
    antwort_a:"6", antwort_b:"7", antwort_c:"8", antwort_d:"5", richtig:"B", erklaerung:"Es sind sieben (7)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🐟",8),
    antwort_a:"7", antwort_b:"9", antwort_c:"6", antwort_d:"8", richtig:"D", erklaerung:"Es sind acht (8)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🌟",9),
    antwort_a:"8", antwort_b:"10", antwort_c:"9", antwort_d:"7", richtig:"C", erklaerung:"Es sind neun (9)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🍇",10),
    antwort_a:"9", antwort_b:"8", antwort_c:"10", antwort_d:"11", richtig:"C", erklaerung:"Es sind zehn (10)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🐛",6),
    antwort_a:"5", antwort_b:"6", antwort_c:"7", antwort_d:"4", richtig:"B", erklaerung:"Es sind sechs (6)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🌸",8),
    antwort_a:"9", antwort_b:"7", antwort_c:"6", antwort_d:"8", richtig:"D", erklaerung:"Es sind acht (8)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🎪",7),
    antwort_a:"8", antwort_b:"6", antwort_c:"7", antwort_d:"9", richtig:"C", erklaerung:"Es sind sieben (7)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🦆",9),
    antwort_a:"10", antwort_b:"8", antwort_c:"9", antwort_d:"7", richtig:"C", erklaerung:"Es sind neun (9)." },

  { stufe:"M0c", text:"Wie viele siehst du?",
    frage: em("🍄",10),
    antwort_a:"8", antwort_b:"10", antwort_c:"9", antwort_d:"7", richtig:"B", erklaerung:"Es sind zehn (10)." },

  // ═══════════════════════════════════════════════════════
  // M0f — Mengen bis 20 zählen
  // ═══════════════════════════════════════════════════════

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("⭐",11),
    antwort_a:"10", antwort_b:"12", antwort_c:"11", antwort_d:"13", richtig:"C", erklaerung:"Es sind elf (11)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🍎",13),
    antwort_a:"12", antwort_b:"14", antwort_c:"11", antwort_d:"13", richtig:"D", erklaerung:"Es sind dreizehn (13)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🐧",15),
    antwort_a:"14", antwort_b:"16", antwort_c:"15", antwort_d:"13", richtig:"C", erklaerung:"Es sind fünfzehn (15)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🌻",12),
    antwort_a:"13", antwort_b:"11", antwort_c:"14", antwort_d:"12", richtig:"D", erklaerung:"Es sind zwölf (12)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🍓",17),
    antwort_a:"16", antwort_b:"18", antwort_c:"15", antwort_d:"17", richtig:"D", erklaerung:"Es sind siebzehn (17)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🐸",14),
    antwort_a:"13", antwort_b:"14", antwort_c:"15", antwort_d:"12", richtig:"B", erklaerung:"Es sind vierzehn (14)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🦋",16),
    antwort_a:"17", antwort_b:"15", antwort_c:"18", antwort_d:"16", richtig:"D", erklaerung:"Es sind sechzehn (16)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🎈",20),
    antwort_a:"18", antwort_b:"19", antwort_c:"21", antwort_d:"20", richtig:"D", erklaerung:"Es sind zwanzig (20)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🍊",18),
    antwort_a:"17", antwort_b:"19", antwort_c:"18", antwort_d:"20", richtig:"C", erklaerung:"Es sind achtzehn (18)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🌙",19),
    antwort_a:"20", antwort_b:"18", antwort_c:"19", antwort_d:"17", richtig:"C", erklaerung:"Es sind neunzehn (19)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🐝",11),
    antwort_a:"10", antwort_b:"11", antwort_c:"12", antwort_d:"13", richtig:"B", erklaerung:"Es sind elf (11)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🍒",20),
    antwort_a:"19", antwort_b:"21", antwort_c:"18", antwort_d:"20", richtig:"D", erklaerung:"Es sind zwanzig (20)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🦆",13),
    antwort_a:"14", antwort_b:"12", antwort_c:"11", antwort_d:"13", richtig:"D", erklaerung:"Es sind dreizehn (13)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🌺",16),
    antwort_a:"15", antwort_b:"16", antwort_c:"17", antwort_d:"14", richtig:"B", erklaerung:"Es sind sechzehn (16)." },

  { stufe:"M0f", text:"Wie viele siehst du?",
    frage: em("🍄",12),
    antwort_a:"11", antwort_b:"13", antwort_c:"12", antwort_d:"14", richtig:"C", erklaerung:"Es sind zwölf (12)." },

  // ═══════════════════════════════════════════════════════
  // M0d — Eins dazulegen (bildlich, bis 5)
  // ═══════════════════════════════════════════════════════

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🍎",1) + "  +  🍎",
    antwort_a:"1", antwort_b:"3", antwort_c:"2", antwort_d:"4", richtig:"C", erklaerung:"Eins und noch eins macht zwei (2)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🐱",2) + "  +  🐱",
    antwort_a:"2", antwort_b:"4", antwort_c:"1", antwort_d:"3", richtig:"D", erklaerung:"Zwei und noch eins macht drei (3)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("⭐",3) + "  +  ⭐",
    antwort_a:"5", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"C", erklaerung:"Drei und noch eins macht vier (4)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🌸",4) + "  +  🌸",
    antwort_a:"4", antwort_b:"6", antwort_c:"3", antwort_d:"5", richtig:"D", erklaerung:"Vier und noch eins macht fünf (5)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🐣",1) + "  +  🐣",
    antwort_a:"3", antwort_b:"2", antwort_c:"4", antwort_d:"1", richtig:"B", erklaerung:"Eins und noch eins macht zwei (2)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🍭",2) + "  +  🍭",
    antwort_a:"4", antwort_b:"1", antwort_c:"3", antwort_d:"2", richtig:"C", erklaerung:"Zwei und noch eins macht drei (3)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🦋",3) + "  +  🦋",
    antwort_a:"3", antwort_b:"5", antwort_c:"2", antwort_d:"4", richtig:"D", erklaerung:"Drei und noch eins macht vier (4)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🍓",4) + "  +  🍓",
    antwort_a:"6", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"C", erklaerung:"Vier und noch eins macht fünf (5)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🐸",2) + "  +  🐸",
    antwort_a:"2", antwort_b:"4", antwort_c:"1", antwort_d:"3", richtig:"D", erklaerung:"Zwei und noch eins macht drei (3)." },

  { stufe:"M0d", text:"Noch eins dazu — wie viele jetzt?",
    frage: em("🌻",3) + "  +  🌻",
    antwort_a:"5", antwort_b:"2", antwort_c:"4", antwort_d:"3", richtig:"C", erklaerung:"Drei und noch eins macht vier (4)." },

  // ═══════════════════════════════════════════════════════
  // M0e — Zwei dazulegen (bildlich, bis 7)
  // ═══════════════════════════════════════════════════════

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🍎",1) + "  +  🍎\u2003🍎",
    antwort_a:"2", antwort_b:"4", antwort_c:"3", antwort_d:"1", richtig:"C", erklaerung:"Eins und noch zwei macht drei (3)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("⭐",2) + "  +  ⭐\u2003⭐",
    antwort_a:"3", antwort_b:"5", antwort_c:"6", antwort_d:"4", richtig:"D", erklaerung:"Zwei und noch zwei macht vier (4)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🐧",3) + "  +  🐧\u2003🐧",
    antwort_a:"4", antwort_b:"6", antwort_c:"5", antwort_d:"3", richtig:"C", erklaerung:"Drei und noch zwei macht fünf (5)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🌙",4) + "  +  🌙\u2003🌙",
    antwort_a:"5", antwort_b:"7", antwort_c:"8", antwort_d:"6", richtig:"D", erklaerung:"Vier und noch zwei macht sechs (6)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🍊",2) + "  +  🍊\u2003🍊",
    antwort_a:"5", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"C", erklaerung:"Zwei und noch zwei macht vier (4)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🐝",3) + "  +  🐝\u2003🐝",
    antwort_a:"6", antwort_b:"4", antwort_c:"5", antwort_d:"3", richtig:"C", erklaerung:"Drei und noch zwei macht fünf (5)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🎈",1) + "  +  🎈\u2003🎈",
    antwort_a:"4", antwort_b:"2", antwort_c:"3", antwort_d:"1", richtig:"C", erklaerung:"Eins und noch zwei macht drei (3)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🦆",4) + "  +  🦆\u2003🦆",
    antwort_a:"7", antwort_b:"5", antwort_c:"8", antwort_d:"6", richtig:"D", erklaerung:"Vier und noch zwei macht sechs (6)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🌺",2) + "  +  🌺\u2003🌺",
    antwort_a:"3", antwort_b:"5", antwort_c:"4", antwort_d:"2", richtig:"C", erklaerung:"Zwei und noch zwei macht vier (4)." },

  { stufe:"M0e", text:"Noch zwei dazu — wie viele jetzt?",
    frage: em("🍒",3) + "  +  🍒\u2003🍒",
    antwort_a:"4", antwort_b:"6", antwort_c:"5", antwort_d:"7", richtig:"C", erklaerung:"Drei und noch zwei macht fünf (5)." }

];

// In Registry eintragen — anhängen an bestehende Mathe-Daten
var existing = D.get("mathe") || [];
D.set("mathe", existing.concat(aufgaben));

})();
