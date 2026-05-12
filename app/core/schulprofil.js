// schulprofil.js — Laetitia Lernsystem
// Zentrale Wahrheitsquelle fuer den Schulmodus
// REGEL 1: kein import(), kein type="module"
// REGEL 4: nur gerade Anfuehrungszeichen

(function(){
"use strict";

// ── Konfiguration ────────────────────────────────────────────────────────────

// Welche Module auf index.html sind im Schulmodus GESPERRT?
// Schule und Quasselkiste bleiben immer verfuegbar.
var SCHULMODUS_GESPERRT = ["lernen", "spiele", "entertain", "kreativ", "glaube"];

// Feste Schulzeiten (Minuten seit Mitternacht)
var SCHULZEIT_VON = 8 * 60 + 30;   // 08:30
var SCHULZEIT_BIS = 15 * 60 + 30;  // 15:30

// localStorage-Key fuer Schultage
var KEY_SCHULTAGE = "laetitia_schultage_v1";

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────

function ladeSchultage(){
  try{
    var raw = localStorage.getItem(KEY_SCHULTAGE);
    if(!raw) return [];
    var arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  }catch(e){ return []; }
}

function speichereSchultage(tage){
  try{ localStorage.setItem(KEY_SCHULTAGE, JSON.stringify(tage)); }catch(e){}
}

function datumZuKey(d){
  var y = d.getFullYear();
  var m = String(d.getMonth()+1).padStart(2,"0");
  var t = String(d.getDate()).padStart(2,"0");
  return y + "-" + m + "-" + t;
}

// ── Kernfunktion ─────────────────────────────────────────────────────────────

function istSchulzeit(){
  var jetzt = new Date();

  // 1. Ist heute ein eingetragener Schultag?
  var heuteKey = datumZuKey(jetzt);
  var schultage = ladeSchultage();
  if(!schultage.includes(heuteKey)) return false;

  // 2. Liegt die Uhrzeit im Schulzeitfenster?
  var minutenJetzt = jetzt.getHours() * 60 + jetzt.getMinutes();
  if(minutenJetzt < SCHULZEIT_VON || minutenJetzt > SCHULZEIT_BIS) return false;

  return true;
}

// ── Oeffentliche API ─────────────────────────────────────────────────────────

window.LaetitiaSchulprofil = {
  istSchulzeit:        istSchulzeit,
  ladeSchultage:       ladeSchultage,
  speichereSchultage:  speichereSchultage,
  datumZuKey:          datumZuKey,
  SCHULMODUS_GESPERRT: SCHULMODUS_GESPERRT,
  SCHULZEIT_VON:       SCHULZEIT_VON,
  SCHULZEIT_BIS:       SCHULZEIT_BIS
};

})();
