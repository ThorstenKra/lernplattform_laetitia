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
var RATE_BASIS = 1.104; // Goldstandard-Basiswert (0.92) + 20% bei Tempo = 100%

// Stimmung (Stufe 1) beeinflusst Wortwahl (Gemini) + Avatar-Mimik (MOOD_AVATAR),
// NICHT mehr Tempo/Tonhoehe der Sprachausgabe -- dieselbe feste Stimme wie in den
// Grammatik-Aufgaben (kein Pitch-Wechsel je Stimmung, wirkte inkonsistent).

// ── Avatar (3D, TalkingHead-Bibliothek, Stufe 2) ──────────────────────────────
// Bibliothek liegt als fertig gebuendeltes <script src="vendor/talkinghead.bundle.js">
// vor (REGEL 1: kein import()/type="module" -- daher vorab mit esbuild gebuendelt,
// window.TalkingHead wird dort global gesetzt).
var AVATAR_URL = "./nova_avatar.glb";
var novaHead      = null;   // TalkingHead-Instanz
var novaHeadBereit = false; // true sobald showAvatar() erfolgreich geladen hat
var sprechIntervall = null;

// TalkingHead kennt keine eigenen "schnippisch/ruhig"-Stimmungen -- Abbildung auf
// die eingebauten Moods (neutral/happy/angry/sad/fear/disgust/love/sleep).
var STIMMUNG_ZU_MOOD = {
  neutral:     "neutral",
  schnippisch: "happy",
  ruhig:       "neutral",
  aufgeregt:   "love"
};

function initAvatar(){
  var node = $("novaAvatar3d");
  if(!node || typeof window.TalkingHead !== "function") return;
  try{
    novaHead = new window.TalkingHead(node, {
      cameraView: "head",
      avatarMood: "neutral",
      cameraRotateEnable: false,
      cameraPanEnable: false,
      cameraZoomEnable: false,
      lipsyncModules: []
    });
    novaHead.showAvatar({ url: AVATAR_URL, body: "F", avatarMood: "neutral" })
      .then(function(){ novaHeadBereit = true; aktualisiereAvatarGroesse(); })
      .catch(function(){ novaHeadBereit = false; });
  }catch(e){ novaHead = null; novaHeadBereit = false; }
}

// initAvatar() laeuft beim Seitenstart, waehrend #gespraechContainer noch
// display:none ist (Startbildschirm) -- der ResizeObserver in TalkingHead
// bekommt daher beim Konstruieren Groesse 0x0 und zeichnet den Canvas nicht neu,
// sobald der Container spaeter sichtbar wird. onResize() ist eine oeffentliche
// Methode der TalkingHead-Klasse, daher hier manuell nachgetriggert.
function aktualisiereAvatarGroesse(){
  if(!novaHeadBereit || !novaHead) return;
  try{ novaHead.onResize(); }catch(e){}
}

function wendeStimmungAufAvatar(stimmung){
  if(!novaHeadBereit || !novaHead) return;
  var mood = STIMMUNG_ZU_MOOD[stimmung] || "neutral";
  try{ novaHead.setMood(mood); }catch(e){}
}

// Angenaeherte Mundbewegung waehrend der Katja-Sprachausgabe -- keine exakte
// Lippensynchronisation (dafuer bräuchte TalkingHead eine TTS mit Wort-Zeitstempeln,
// siehe UEBERGABE-Dokumentation). setFixedValue ueberschreibt die interne Animation
// bis es wieder auf null gesetzt wird.
function starteSprechAnimation(){
  if(!novaHeadBereit || !novaHead) return;
  stoppeSprechAnimation();
  var offen = false;
  sprechIntervall = setInterval(function(){
    offen = !offen;
    try{ novaHead.setFixedValue("jawOpen", offen ? 0.4 : 0.05); }catch(e){}
  }, 180);
}

function stoppeSprechAnimation(){
  if(sprechIntervall){ clearInterval(sprechIntervall); sprechIntervall = null; }
  if(novaHeadBereit && novaHead){
    try{ novaHead.setFixedValue("jawOpen", null); }catch(e){}
  }
}

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
// danach (optional): wird nach TTS-Ende aufgerufen
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "de-DE";
        u.rate   = RATE_BASIS * (ladeTempo() / 100);
        u.volume = ladeLautstaerke();
        var vv = speechSynthesis.getVoices();
        var v = vv.find(function(x){ return x.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
             || vv.find(function(x){ return x.name === "Microsoft Katja - German (Germany)"; })
             || vv.find(function(x){ return x.name.indexOf("Katja") >= 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de") && x.name.indexOf("Hedda") < 0; })
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        u.onstart = starteSprechAnimation;
        u.onend   = function(){ stoppeSprechAnimation(); if(danach) danach(); };
        u.onerror = function(){ stoppeSprechAnimation(); if(danach) danach(); };
        speechSynthesis.speak(u);
      }catch(e){ if(danach) danach(); }
    }, 120);
  }catch(e){ if(danach) danach(); }
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
// skipRecheck: unterdrueckt dwell.js' Hover-Recheck (prueft 1.3s nach dem Rebind,
// ob Blick/Maus bereits auf einem Element ruht, und loest sonst SOFORT einen
// Dwell aus). Bei jeder neuen Nova-Antwort erscheinen die Vorschlag-Buttons
// exakt an derselben Bildschirmposition wie zuvor -- ruht der Blick dort waehrend
// des Wartens auf Nova, wuerde der Recheck einen ungewollten Phantom-Klick
// ausloesen und Nova wuerde auf eine nie gestellte "Antwort" reagieren.
function rebindDwell(skipRecheck){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var grace   = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = attach(".vorschlag-btn, .nav-btn:not([style*='display:none']), #btnStarten, .einstellung-btn, .tasten-btn, #btnEigeneAntwort, #btnTastaturFertig, #btnTastaturLoeschen", {
    dwellMs: dwellMs, leaveGrace: grace,
    skipHoverRecheck: !!skipRecheck,
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
  var bE = $("btnEigeneAntwort"); if(bE) bE.style.display = "none";
  schliesseTastatur();
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

function zeigeGespraech(antwort, vorschlaege, stimmung, nachAnzeige){
  zustand = "gespraech"; alleVerstecken();

  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";
  aktualisiereAvatarGroesse();

  wendeStimmungAufAvatar(stimmung);

  var novaEl = $("novaAntwort");
  if(novaEl) novaEl.textContent = antwort;

  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";

  // Regel 18: Vorschlaege + Eigene-Antwort-Button erst NACH TTS-Ende sichtbar --
  // Zurueck/Beenden bleiben sofort per Dwell erreichbar, waehrend Nova spricht.
  rebindDwell(true);

  sprich(antwort, function(){
    if(grid){
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
    var bE = $("btnEigeneAntwort");
    if(bE) bE.style.display = "";
    // skipRecheck=true: Vorschlag-Buttons erscheinen an derselben Position wie
    // die vorherige Antwortrunde -- kein Auto-Dwell auf ruhendem Blick (siehe oben).
    rebindDwell(true);
    if(typeof nachAnzeige === "function") nachAnzeige();
  });
}

// ── Konversation ──────────────────────────────────────────────────────────────
function sendeNachricht(text){
  zeigeLaden();
  apiFetch("/chat", { agent: "ki_gespraech", nachricht: text, verlauf: verlauf }, function(err, data){
    if(err || data.fehler){
      zeigeGespraech(
        "Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal.",
        ["Nochmal versuchen", "Okay"],
        null,
        function(){
          // "Nochmal versuchen" soll denselben Text nochmals senden
          var grid = $("vorschlaegeGrid");
          if(grid && grid.firstChild){
            grid.firstChild.addEventListener("click", function(){ sendeNachricht(text); }, { once: true });
          }
        }
      );
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
  var daten = { agent: "ki_gespraech", verlauf: verlauf };
  if(window.LaetitiaLernfortschritt){
    var lf = window.LaetitiaLernfortschritt.kurzZusammenfassung();
    if(lf) daten.lernfortschritt = lf;
  }
  apiFetch("/chat/abschliessen", daten, function(){
    zeigeAbschluss("Gespräch gespeichert. Bis zum nächsten Mal!");
  });
}

// ── Eigene Antwort (Bildschirmtastatur) ─────────────────────────────────────────
var TASTEN_REIHEN = [
  ["Q","W","E","R","T","Z","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","Ö","Ä"],
  ["Y","X","C","V","B","N","M","Ü","ß"]
];
var tastaturText = "";

function baueTastatur(){
  var el = $("tastaturTasten");
  if(!el) return;
  el.innerHTML = "";
  TASTEN_REIHEN.forEach(function(reihe){
    reihe.forEach(function(taste){
      var btn = document.createElement("button");
      btn.className = "tasten-btn";
      btn.textContent = taste;
      btn.addEventListener("click", function(){
        tastaturText += taste.toLowerCase();
        aktualisiereTastaturAnzeige();
      });
      el.appendChild(btn);
    });
  });
  var leer = document.createElement("button");
  leer.className = "tasten-btn";
  leer.style.gridColumn = "1 / -1";
  leer.textContent = "Leerzeichen";
  leer.addEventListener("click", function(){
    tastaturText += " ";
    aktualisiereTastaturAnzeige();
  });
  el.appendChild(leer);
}

function aktualisiereTastaturAnzeige(){
  var el = $("tastaturAnzeige");
  if(el) el.textContent = tastaturText || "…";
}

function oeffneTastatur(){
  tastaturText = "";
  aktualisiereTastaturAnzeige();
  var el = $("tastaturOverlay"); if(el) el.style.display = "flex";
  rebindDwell(true);
}

function schliesseTastatur(){
  var el = $("tastaturOverlay");
  if(el) el.style.display = "none";
}

function tastaturLoeschen(){
  tastaturText = tastaturText.slice(0, -1);
  aktualisiereTastaturAnzeige();
}

function tastaturBestaetigen(){
  var text = tastaturText.trim();
  schliesseTastatur();
  if(text){ sendeNachricht(text); }
  else { rebindDwell(true); }
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "gespraech" || zustand === "laden"){
    beendeGespraech(); return;
  }
  try{
    window.location.href = new URL("../ki_agenten/ki_agenten.html", window.location.href).href;
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

  var bEA = $("btnEigeneAntwort");
  if(bEA) bEA.addEventListener("click", oeffneTastatur);

  var bTL = $("btnTastaturLoeschen");
  if(bTL) bTL.addEventListener("click", tastaturLoeschen);

  var bTF = $("btnTastaturFertig");
  if(bTF) bTF.addEventListener("click", tastaturBestaetigen);
  baueTastatur();

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
  initAvatar();
  zeigeStart();
}

window.KiGespraechMod = { init: init };
})();
