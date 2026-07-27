// ki_gespraech_mod.js -- Laetitia Lernsystem
// KI-Gespraechspartnerin Nova -- Gemini API via listener.ps1 /chat
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var LISTENER_URL = "http://localhost:9999";
var verlauf      = [];   // [{rolle:"user"|"assistant", text:"..."}]
var zustand      = "start";
var _dwell       = null;

// ── Lautstaerke / Tempo ────────────────────────────────────────────────────────
var LAUT_KEY   = "laetitia_nova_lautstaerke";   // 0.3 - 1.0
var TEMPO_KEY  = "laetitia_nova_tempo";         // 50 - 150 (Prozent)
var LAUT_MIN = 0.3, LAUT_MAX = 1.0, LAUT_STEP = 0.1;
var TEMPO_MIN = 50, TEMPO_MAX = 150, TEMPO_STEP = 10;
var RATE_BASIS = 0.92; // Goldstandard-Basiswert bei Tempo = 100%

// ── Stimmungen (Stufe 1 Personalisierung) ─────────────────────────────────────
// Gemini waehlt pro Antwort eine Stimmung (siehe listener.ps1 Systemprompt);
// hier nur grobe rate/pitch-Anpassung -- Web-Speech-API kennt keine echten
// Emotionen/Sprachstile. Feinere Ausdruckskraft: siehe TODO in UEBERGABE.
var STIMMUNG_PRESETS = {
  neutral:    { rateMul: 1.00, pitch: 1.00 },
  schnippisch:{ rateMul: 1.12, pitch: 1.12 },
  ruhig:      { rateMul: 0.88, pitch: 0.95 },
  aufgeregt:  { rateMul: 1.08, pitch: 1.08 }
};

function ladeLautstaerke(){
  var v = parseFloat(localStorage.getItem(LAUT_KEY));
  if(isNaN(v) || v < LAUT_MIN || v > LAUT_MAX) v = LAUT_MAX;
  return v;
}
function ladeTempo(){
  var t = parseInt(localStorage.getItem(TEMPO_KEY), 10);
  if(isNaN(t) || t < TEMPO_MIN || t > TEMPO_MAX) t = 100;
  return t;
}
function aktualisiereEinstellungenAnzeige(){
  var la = $("lautAnzeige");   if(la) la.textContent = Math.round(ladeLautstaerke() * 100) + "%";
  var ta = $("tempoAnzeige");  if(ta) ta.textContent = ladeTempo() + "%";
}

function $(id){ return document.getElementById(id); }

// ── TTS ──────────────────────────────────────────────────────────────────────
function sprich(text, stimmung){
  try{
    speechSynthesis.cancel();
    var preset = STIMMUNG_PRESETS[stimmung] || STIMMUNG_PRESETS.neutral;
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "de-DE";
        u.rate   = RATE_BASIS * (ladeTempo() / 100) * preset.rateMul;
        u.pitch  = preset.pitch;
        u.volume = ladeLautstaerke();
        var vv = speechSynthesis.getVoices();
        var v = vv.find(function(x){ return x.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
             || vv.find(function(x){ return x.name === "Microsoft Katja - German (Germany)"; })
             || vv.find(function(x){ return x.name.indexOf("Katja") >= 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de") && x.name.indexOf("Hedda") < 0; })
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        speechSynthesis.speak(u);
      }catch(e){}
    }, 120);
  }catch(e){}
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
function rebindDwell(){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var grace   = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = attach(".vorschlag-btn, .nav-btn:not([style*='display:none']), #btnStarten, .einstellung-btn", {
    dwellMs: dwellMs, leaveGrace: grace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── HTTP ──────────────────────────────────────────────────────────────────────
function apiFetch(pfad, daten, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", LISTENER_URL + pfad, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.timeout = 25000;
  xhr.onload = function(){
    try{ cb(null, JSON.parse(xhr.responseText)); }
    catch(e){ cb(null, {}); }
  };
  xhr.onerror = xhr.ontimeout = function(){ cb(new Error("Verbindungsfehler")); };
  xhr.send(JSON.stringify(daten));
}

// ── Screens ───────────────────────────────────────────────────────────────────
function alleVerstecken(){
  ["startScreen","ladenScreen","gespraechContainer","abschlussScreen"].forEach(function(id){
    var el = $(id); if(el) el.style.display = "none";
  });
  var bB = $("btnBeenden"); if(bB) bB.style.display = "none";
}

function zeigeStart(){
  zustand = "start"; alleVerstecken();
  var el = $("startScreen"); if(el) el.style.display = "";
  rebindDwell();
}

function zeigeLaden(){
  zustand = "laden"; alleVerstecken();
  var el = $("ladenScreen"); if(el) el.style.display = "";
}

function zeigeAbschluss(info){
  zustand = "abschluss"; alleVerstecken();
  var el = $("abschlussScreen"); if(el) el.style.display = "";
  var infoEl = $("abschlussInfo"); if(infoEl) infoEl.textContent = info || "";
  rebindDwell();
}

function zeigeGespraech(antwort, vorschlaege, stimmung){
  zustand = "gespraech"; alleVerstecken();

  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";

  var novaEl = $("novaAntwort");
  if(novaEl) novaEl.textContent = antwort;
  sprich(antwort, stimmung);

  var grid = $("vorschlaegeGrid");
  if(grid){
    grid.innerHTML = "";
    var liste = (Array.isArray(vorschlaege) && vorschlaege.length > 0)
      ? vorschlaege.slice(0, 4)
      : ["Ja", "Nein", "Erzaehl mehr", "Okay"];
    liste.forEach(function(v){
      var btn = document.createElement("button");
      btn.className = "vorschlag-btn";
      btn.innerHTML = "<span style='pointer-events:none'>" + v + "</span>"
        + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
        + "<circle cx='35' cy='35' r='30' style='stroke:#8b5cf6'/></svg>";
      btn.addEventListener("click", function(){ sendeNachricht(v); });
      grid.appendChild(btn);
    });
  }
  rebindDwell();
}

// ── Konversation ──────────────────────────────────────────────────────────────
function sendeNachricht(text){
  zeigeLaden();
  apiFetch("/chat", { nachricht: text, verlauf: verlauf }, function(err, data){
    if(err || data.fehler){
      zeigeGespraech(
        "Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal.",
        ["Nochmal versuchen", "Okay"]
      );
      // "Nochmal versuchen" soll denselben Text nochmals senden
      var grid = $("vorschlaegeGrid");
      if(grid && grid.firstChild){
        grid.firstChild.addEventListener("click", function(){ sendeNachricht(text); }, { once: true });
      }
      return;
    }
    verlauf.push({ rolle: "user",      text: text });
    verlauf.push({ rolle: "assistant", text: data.antwort });
    zeigeGespraech(data.antwort, data.vorschlaege, data.stimmung);
  });
}

function beendeGespraech(){
  zeigeAbschluss("Zusammenfassung wird gespeichert...");
  sprich("Tschüss! Bis zum nächsten Mal.");
  apiFetch("/chat/abschliessen", { verlauf: verlauf }, function(){
    zeigeAbschluss("Gespräch gespeichert. Bis zum nächsten Mal!");
  });
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "gespraech" || zustand === "laden"){
    beendeGespraech(); return;
  }
  try{
    window.location.href = new URL("../../spielewelt.html", window.location.href).href;
  }catch(e){ history.back(); }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init(){
  var bS = $("btnStarten");
  if(bS) bS.addEventListener("click", function(){
    sendeNachricht("Hallo Nova!");
  });

  var bZ = $("btnZurueck");
  if(bZ) bZ.addEventListener("click", zurueck);

  var bB = $("btnBeenden");
  if(bB) bB.addEventListener("click", beendeGespraech);

  var bLM = $("btnLautMinus");
  if(bLM) bLM.addEventListener("click", function(){
    var neu = Math.max(LAUT_MIN, Math.round((ladeLautstaerke() - LAUT_STEP) * 10) / 10);
    localStorage.setItem(LAUT_KEY, String(neu));
    aktualisiereEinstellungenAnzeige();
  });
  var bLP = $("btnLautPlus");
  if(bLP) bLP.addEventListener("click", function(){
    var neu = Math.min(LAUT_MAX, Math.round((ladeLautstaerke() + LAUT_STEP) * 10) / 10);
    localStorage.setItem(LAUT_KEY, String(neu));
    aktualisiereEinstellungenAnzeige();
  });
  var bTM = $("btnTempoMinus");
  if(bTM) bTM.addEventListener("click", function(){
    var neu = Math.max(TEMPO_MIN, ladeTempo() - TEMPO_STEP);
    localStorage.setItem(TEMPO_KEY, String(neu));
    aktualisiereEinstellungenAnzeige();
  });
  var bTP = $("btnTempoPlus");
  if(bTP) bTP.addEventListener("click", function(){
    var neu = Math.min(TEMPO_MAX, ladeTempo() + TEMPO_STEP);
    localStorage.setItem(TEMPO_KEY, String(neu));
    aktualisiereEinstellungenAnzeige();
  });

  aktualisiereEinstellungenAnzeige();
  zeigeStart();
}

window.KiGespraechMod = { init: init };
})();
