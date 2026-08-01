// logik_data_L10.js -- Laetitia Lernsystem
// Logik-Aufgaben L10: visuelle Muster-Matrizen (non-verbales IQ-Test-Format)
// Jede Aufgabe ist ein 3x3-Raster aus drei sich wiederholenden Zeichen, so
// angeordnet dass jedes Zeichen in jeder Zeile und jeder Spalte genau einmal
// vorkommt (lateinisches Quadrat). Ein Feld fehlt (❓), gesucht ist das
// passende Zeichen dafuer.
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var HINWEIS = "Schau dir das Muster ganz genau an. Jedes Zeichen kommt in jeder Zeile und in jeder Spalte genau einmal vor. Was passt anstelle vom ❓?";

var aufgaben = [

  { stufe:"L10", text:HINWEIS,
    frage:"🔴 🔵 🟢\\n🔵 🟢 🔴\\n🟢 🔴 ❓",
    antwort_a:"🔵", antwort_b:"🔴", antwort_c:"🟢", antwort_d:"🟡",
    richtig:"A",
    erklaerung:"In der letzten Reihe und der letzten Spalte sind schon Rot und Grün zu sehen — nur Blau fehlt noch, das gehört an die Stelle vom ❓." },

  { stufe:"L10", text:HINWEIS,
    frage:"⭐ ❓ ⚪\\n⬛ ⚪ ⭐\\n⚪ ⭐ ⬛",
    antwort_a:"⭐", antwort_b:"⬛", antwort_c:"⚪", antwort_d:"🔺",
    richtig:"B",
    erklaerung:"In dieser Reihe und Spalte sieht man schon den Stern und den Kreis — nur das Quadrat fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🐱 🐶 🐰\\n🐶 ❓ 🐱\\n🐰 🐱 🐶",
    antwort_a:"🐱", antwort_b:"🐶", antwort_c:"🐰", antwort_d:"🐭",
    richtig:"C",
    erklaerung:"Hund und Katze sind in dieser Reihe und Spalte schon da — nur der Hase fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🍎 🍌 🍇\\n🍌 🍇 🍎\\n❓ 🍎 🍌",
    antwort_a:"🍎", antwort_b:"🍌", antwort_c:"🍊", antwort_d:"🍇",
    richtig:"D",
    erklaerung:"Apfel und Banane sind schon in der Reihe und Spalte zu sehen — nur die Traube fehlt." },

  { stufe:"L10", text:HINWEIS,
    frage:"☀️ 🌧️ ❓\\n🌧️ ☁️ ☀️\\n☁️ ☀️ 🌧️",
    antwort_a:"☁️", antwort_b:"☀️", antwort_c:"🌧️", antwort_d:"❄️",
    richtig:"A",
    erklaerung:"Sonne und Regen sind in dieser Reihe und Spalte schon da — nur die Wolke fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🚗 🚲 🚌\\n🚲 🚌 ❓\\n🚌 🚗 🚲",
    antwort_a:"🚲", antwort_b:"🚗", antwort_c:"🚌", antwort_d:"🚂",
    richtig:"B",
    erklaerung:"Fahrrad und Bus sind in dieser Reihe und Spalte schon da — nur das Auto fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"❓ 🐙 🦀\\n🐙 🦀 🐠\\n🦀 🐠 🐙",
    antwort_a:"🐙", antwort_b:"🦀", antwort_c:"🐠", antwort_d:"🐳",
    richtig:"C",
    erklaerung:"Krake und Krabbe sind in dieser Reihe und Spalte schon da — nur der Fisch fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🌸 🌻 🌷\\n🌻 🌷 🌸\\n🌷 ❓ 🌻",
    antwort_a:"🌻", antwort_b:"🌷", antwort_c:"🌹", antwort_d:"🌸",
    richtig:"D",
    erklaerung:"Sonnenblume und Tulpe sind in dieser Reihe und Spalte schon da — nur die Kirschblüte fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🐝 🦋 🐞\\n❓ 🐞 🐝\\n🐞 🐝 🦋",
    antwort_a:"🦋", antwort_b:"🐝", antwort_c:"🐞", antwort_d:"🐜",
    richtig:"A",
    erklaerung:"Biene und Marienkäfer sind in dieser Reihe und Spalte schon da — nur der Schmetterling fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"🟡 🟣 🟤\\n🟣 🟤 🟡\\n🟤 🟡 ❓",
    antwort_a:"🟡", antwort_b:"🟣", antwort_c:"🟤", antwort_d:"🟢",
    richtig:"B",
    erklaerung:"Braun und Gelb sind in dieser Reihe und Spalte schon da — nur Lila fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"😀 😢 😮\\n😢 ❓ 😀\\n😮 😀 😢",
    antwort_a:"😀", antwort_b:"😢", antwort_c:"😮", antwort_d:"😡",
    richtig:"C",
    erklaerung:"Das lachende und das weinende Gesicht sind in dieser Reihe und Spalte schon da — nur das erstaunte Gesicht fehlt noch." },

  { stufe:"L10", text:HINWEIS,
    frage:"⚽ 🏀 🎾\\n🏀 🎾 ⚽\\n❓ ⚽ 🏀",
    antwort_a:"⚽", antwort_b:"🏀", antwort_c:"🏈", antwort_d:"🎾",
    richtig:"D",
    erklaerung:"Fußball und Basketball sind in dieser Reihe und Spalte schon da — nur der Tennisball fehlt noch." }

];

var existing = D.get("logik") || [];
var neueStufen = ["L10"];
var ohneAlteStufen = existing.filter(function(t){
  return neueStufen.indexOf((t.stufe || "").toUpperCase()) === -1;
});
D.set("logik", ohneAlteStufen.concat(aufgaben));

})();
