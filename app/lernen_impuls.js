// lernen_impuls.js -- Laetitia Lernsystem
// Proaktiver Impuls auf der Lernen-Uebersicht: zeigt hoechstens 1x pro Tag
// einen kleinen, WARMEN Hinweis eines KI-Charakters, OHNE dass Laetitia
// vorher den Chat geoeffnet hat. Bewusst nur positive/einladende Anlaesse
// (kein "du hast Fehler gemacht") -- soll nicht wie Ueberwachung wirken.
// Rein deterministisch aus window.LaetitiaStats (localStorage), KEIN
// Netzwerk-/Gemini-Aufruf noetig, listener.ps1 bleibt unangetastet.
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
// REGEL 13: Logik in externer Datei (dieses File), Inline-Script bleibt kurz

(function(){
"use strict";

var COOLDOWN_KEY = "laetitia_impuls_datum_v1";

var NOVA_GRUESSE = [
  "Schön, dass du da bist! Magst du kurz Hallo sagen?",
  "Ich hab an dich gedacht — hast du kurz Zeit für mich?",
  "Wie war dein Tag bisher? Ich würde es gern hören.",
  "Ich freu mich, dich zu sehen! Lust auf ein kurzes Gespräch?"
];

function heuteAlsText(){
  var d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function schonHeuteGezeigt(){
  try{ return localStorage.getItem(COOLDOWN_KEY) === heuteAlsText(); }
  catch(e){ return false; }
}

function merkeHeuteGezeigt(){
  try{ localStorage.setItem(COOLDOWN_KEY, heuteAlsText()); }catch(e){}
}

var MODUL_NAMEN = {
  deutsch:"Deutsch", lesen:"Lesen", mathe:"Mathe", logik:"Logik",
  schule_mathe:"Schulheft", grammatik:"Grammatik", reim:"Reimen", sinnesorgane:"Sinnesorgane"
};

// Prioritaet 1: kuerzlich ein Level mehrfach fehlerfrei geschafft -> Milo gratuliert.
function findeLevelImpuls(){
  if(!window.LaetitiaStats) return null;
  var liste = window.LaetitiaStats.levelEmpfehlungen(null);
  if(!liste || !liste.length) return null;
  var e = liste[0];
  var modulName = MODUL_NAMEN[e.modul] || e.modul;
  return {
    agent: "milo", emoji: "🦉", name: "Milo",
    text: "Du hast " + e.stufe + " bei " + modulName + " schon " + e.allesRichtig + "x fehlerfrei geschafft! Sollen wir zusammen weitermachen?",
    ziel: "./modules/ki_agenten/milo/milo.html"
  };
}

// Prioritaet 2: immer verfuegbarer, warmer Standard-Gruss von Nova.
function findeNovaImpuls(){
  var tagesIndex = new Date().getDate() % NOVA_GRUESSE.length;
  return {
    agent: "nova", emoji: "✨", name: "Nova",
    text: NOVA_GRUESSE[tagesIndex],
    ziel: "./modules/ki_gespraech/ki_gespraech.html"
  };
}

function ermittleImpuls(){
  return findeLevelImpuls() || findeNovaImpuls();
}

function zeigeImpuls(){
  if(schonHeuteGezeigt()) return;
  var impuls = ermittleImpuls();
  if(!impuls) return;

  var karte = document.getElementById("impulsKarte");
  var emoji = document.getElementById("impulsEmoji");
  var text  = document.getElementById("impulsText");
  var btn   = document.getElementById("impulsBtn");
  if(!karte || !emoji || !text || !btn) return;

  emoji.textContent = impuls.emoji;
  text.textContent  = impuls.name + ": " + impuls.text;
  btn.href = impuls.ziel;
  karte.style.display = "flex";
  karte.style.borderColor = impuls.agent === "milo" ? "#0d9488" : "#8b5cf6";

  merkeHeuteGezeigt();
}

window.LaetitiaLernenImpuls = { zeigeImpuls: zeigeImpuls };
})();
