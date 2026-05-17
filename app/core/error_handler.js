// error_handler.js  v3
// Globaler Fehler-Handler fuer das Laetitia-Lernsystem
//
// Features:
//   1. Globale JS-Fehler (window.onerror + unhandledrejection)
//   2. TTS-Watchdog: sprich() haengt nie mehr → onend-Timeout nach 12s
//   3. Page-Alive-Monitor: alle 60s prueft ob Seite noch reagiert
//   4. localStorage-Schutzfunktionen (sicher lesen/schreiben)
//   5. Fehler-Log (letzte 10, in localStorage)
//   6. Diagnose-Panel (aktivierbar via localStorage-Flag fuer Entwicklung)
//   7. Not-Overlay mit grossem Zurueck-Button + TTS (Laetitia kommt selbst raus)
//   8. Link-Navigator-Guard: prueft Zieldatei per XHR vor Navigation (kein Browser-404)
//
// Einbindung: nach dwell.js, vor Modul-Scripts
//   <script src="../../core/dwell.js"></script>
//   <script src="../../core/error_handler.js"></script>
//
// WICHTIG: Ueberschreibt NICHT audioQueue.js - der hat eigene Fehlerbehandlung
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var LOG_KEY        = "laetitia_error_log_v1";
var RETURN_KEY     = "laetitia_return_url_v1";
var DIAG_KEY       = "laetitia_diag_mode";   // auf "1" setzen fuer Diagnose-Panel
var MAX_LOGS       = 10;
var TTS_TIMEOUT_MS = 12000;  // 12s: laengster Text ~3s gesprochen + Sicherheitspuffer
var ALIVE_CHECK_MS = 60000;  // 60s: Page-Alive-Pruefung

var _fehlerAktiv   = false;  // True wenn Overlay sichtbar
var _aliveTimer    = null;
var _lastAliveTs   = Date.now();

// ── 1. HILFSFUNKTIONEN ───────────────────────────────────────────────────────

// Sicheres localStorage lesen (nie crashen)
function lsGet(key, fallback){
  try{ var v = localStorage.getItem(key); return (v !== null && v !== undefined) ? v : fallback; }
  catch(e){ return fallback; }
}

// Sicheres localStorage schreiben
function lsSet(key, value){
  try{ localStorage.setItem(key, value); return true; }
  catch(e){ return false; }
}

// Fehler in Log schreiben
function logFehler(typ, nachricht, datei, zeile){
  try{
    var logs = [];
    try{ logs = JSON.parse(lsGet(LOG_KEY, "[]")); }catch(e){}
    if(!Array.isArray(logs)) logs = [];
    logs.unshift({
      ts:   new Date().toISOString(),
      typ:  typ,
      msg:  String(nachricht||"").substring(0, 300),
      url:  String(datei||window.location.href).split("/").pop(),
      line: String(zeile||""),
      ua:   navigator.userAgent.substring(0, 80)
    });
    if(logs.length > MAX_LOGS) logs = logs.slice(0, MAX_LOGS);
    lsSet(LOG_KEY, JSON.stringify(logs));
  }catch(e){}
}

// TTS sprechen (nur fuer Fehler-Overlay - nutzt direkte speechSynthesis)
function sprichFehler(text){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.88;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){
      return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de");
    }) || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    speechSynthesis.speak(u);
  }catch(e){}
}

// Return-URL ermitteln (mehrere Fallbacks)
function ermittleRueckUrl(){
  var saved = lsGet(RETURN_KEY, "");
  if(saved && (saved.startsWith("file://") || saved.startsWith("http"))) return saved;
  try{
    var parts = window.location.href.split("/");
    // Gehe so weit hoch bis index.html erreichbar
    while(parts.length > 3 && parts[parts.length-1] !== "index.html"){
      parts.pop();
      if(parts[parts.length-1] === "app") return parts.join("/") + "/index.html";
    }
  }catch(e){}
  return "../../index.html";
}

// ── 2. FEHLER-OVERLAY ────────────────────────────────────────────────────────

function zeigeFehlerschirm(nachricht, typ){
  if(_fehlerAktiv) return;
  _fehlerAktiv = true;

  // Alle laufenden Dwell-Timer stoppen
  try{
    if(window._LDwellState){
      if(window._LDwellState.dwellTimer) clearTimeout(window._LDwellState.dwellTimer);
      if(window._LDwellState.leaveTimer) clearTimeout(window._LDwellState.leaveTimer);
      window._LDwellState.dwellTimer = null;
      window._LDwellState.leaveTimer = null;
      window._LDwellState.target = null;
      window._LDwellState.protectUntil = Date.now() + 2500;
    }
  }catch(e){}

  // TTS abbrechen (kein hängendes Audio)
  try{ speechSynthesis.cancel(); }catch(e){}

  // Page-Alive-Monitor stoppen
  if(_aliveTimer){ clearInterval(_aliveTimer); _aliveTimer = null; }

  var body = document.body;
  if(!body){ setTimeout(function(){ zeigeFehlerschirm(nachricht, typ); }, 200); return; }

  var rueckUrl = ermittleRueckUrl();
  var istTtsHang = (typ === "tts_watchdog");

  // Overlay
  var ov = document.createElement("div");
  ov.id = "laetitia-fehler-overlay";
  ov.setAttribute("style", [
    "position:fixed","top:0","left:0","width:100vw","height:100vh",
    "background:rgba(15,23,42,0.93)","z-index:99999",
    "display:flex","flex-direction:column",
    "align-items:center","justify-content:center",
    "gap:20px","padding:32px","box-sizing:border-box",
    "font-family:system-ui,sans-serif"
  ].join(";"));

  // Emoji + Titel
  var emoji = document.createElement("div");
  emoji.textContent = istTtsHang ? "🔇" : "😟";
  emoji.setAttribute("style","font-size:68px;");

  var titel = document.createElement("div");
  titel.textContent = istTtsHang
    ? "Die Sprache hat nicht geantwortet."
    : "Ups! Da ist etwas schiefgelaufen.";
  titel.setAttribute("style",[
    "font-size:clamp(18px,3.5vw,30px)","font-weight:1000",
    "color:#f1f5f9","text-align:center","max-width:620px","line-height:1.3"
  ].join(";"));

  var untertitel = document.createElement("div");
  untertitel.textContent = "Schau auf den Pfeil, um weiterzumachen.";
  untertitel.setAttribute("style",[
    "font-size:clamp(15px,2.5vw,22px)","font-weight:900",
    "color:rgba(241,245,249,0.75)","text-align:center"
  ].join(";"));

  // Grosser Zurueck-Button
  var btn = document.createElement("a");
  btn.href = rueckUrl;
  btn.textContent = "\u2190 Zur\u00fcck zur Startseite";
  btn.setAttribute("style",[
    "display:flex","align-items:center","justify-content:center",
    "min-height:90px","min-width:320px","padding:16px 32px",
    "background:#ede9fe","color:#4c1d95",
    "border:3px solid #8b5cf6","border-radius:20px",
    "font-size:clamp(18px,3vw,24px)","font-weight:1000",
    "text-decoration:none","cursor:pointer","user-select:none",
    "position:relative","margin-top:8px"
  ].join(";"));

  // Weiter-Button (Seite neu laden - fuer TTS-Hang sinnvoll)
  var btnWeiter = document.createElement("button");
  btnWeiter.textContent = "\u21ba Seite neu laden";
  btnWeiter.setAttribute("style",[
    "display:flex","align-items:center","justify-content:center",
    "min-height:70px","min-width:280px","padding:12px 28px",
    "background:rgba(241,245,249,0.12)","color:#f1f5f9",
    "border:2px solid rgba(241,245,249,0.35)","border-radius:18px",
    "font-size:clamp(15px,2.5vw,20px)","font-weight:900",
    "cursor:pointer","user-select:none","position:relative"
  ].join(";"));
  btnWeiter.addEventListener("click", function(){
    try{ window.location.reload(); }catch(e){}
  });

  // Fehler-Detail (klein, fuer Diagnose)
  var detail = document.createElement("div");
  if(nachricht){
    detail.textContent = String(nachricht).substring(0, 150);
    detail.setAttribute("style",[
      "font-family:monospace","font-size:11px",
      "color:rgba(241,245,249,0.35)","text-align:center",
      "max-width:700px","word-break:break-all","margin-top:4px"
    ].join(";"));
  }

  ov.appendChild(emoji);
  ov.appendChild(titel);
  ov.appendChild(untertitel);
  ov.appendChild(btn);
  ov.appendChild(btnWeiter);
  if(nachricht) ov.appendChild(detail);
  body.appendChild(ov);

  // Dwell auf beide Buttons binden
  setTimeout(function(){
    try{
      var attach = window.LaetitiaAttachDwell;
      if(attach){
        var ms = parseInt(lsGet("laetitia_dwell_ms","900")) || 900;
        attach("#laetitia-fehler-overlay a, #laetitia-fehler-overlay button", {
          dwellMs: ms, leaveGrace: 200,
          onActivate: function(el){ try{ el.click(); }catch(e){} }
        });
      }
    }catch(e){}
    // TTS nach kurzem Delay (Overlay muss erst gerendert sein)
    sprichFehler(istTtsHang
      ? "Die Sprache hat nicht geantwortet. Schau auf den Pfeil, um zurueckzugehen."
      : "Ups! Da ist etwas schiefgelaufen. Schau auf den Pfeil, um zurueckzugehen."
    );
  }, 500);
}

// ── 3. GLOBALE FEHLER-HANDLER ────────────────────────────────────────────────

window.onerror = function(msg, url, line, col, err){
  if(_fehlerAktiv) return true;
  var kurzeUrl = (url||"").split("/").pop();
  var stack    = (err && err.stack) ? err.stack.substring(0, 200) : "";
  logFehler("onerror", msg + (stack?" | "+stack:""), kurzeUrl, line);
  zeigeFehlerschirm(msg + (kurzeUrl ? " ("+kurzeUrl+" Z."+line+")" : ""), "onerror");
  return true;
};

window.addEventListener("unhandledrejection", function(ev){
  if(_fehlerAktiv) return;
  var msg = ev.reason
    ? (ev.reason.message || String(ev.reason)).substring(0, 200)
    : "Unbekannter Promise-Fehler";
  logFehler("promise", msg, window.location.href.split("/").pop(), "");
  zeigeFehlerschirm(msg, "promise");
});

// ── 4. TTS-WATCHDOG ─────────────────────────────────────────────────────────
// Wrapper-Funktion fuer direkte speechSynthesis.speak() in neuen Modulen.
// audioQueue.js hat eigene Fehlerbehandlung und wird NICHT beeinflusst.
//
// Verwendung in Modulen: statt speechSynthesis.speak(u) direkt ->
// wird automatisch durch Patchen der globalen sprich()-Aufrufe genutzt.
// Module die LaetitiaSprich.wrap(u, danach) aufrufen bekommen Watchdog gratis.

window.LaetitiaSprich = {
  // Spricht eine Utterance und garantiert dass danach() aufgerufen wird
  // (entweder durch onend, onerror, oder Watchdog-Timeout)
  wrap: function(u, danach){
    if(!u) { if(danach) setTimeout(danach, 100); return; }
    var aufgerufen = false;
    var watchdogTimer = null;

    function fertig(){
      if(aufgerufen) return;
      aufgerufen = true;
      if(watchdogTimer){ clearTimeout(watchdogTimer); watchdogTimer = null; }
      if(danach) setTimeout(danach, 200);
    }

    u.onend   = fertig;
    u.onerror = fertig;

    // Watchdog: wenn onend nach TTS_TIMEOUT_MS nicht gefeuert hat
    watchdogTimer = setTimeout(function(){
      if(aufgerufen) return;
      logFehler("tts_watchdog", "TTS onend nicht aufgerufen nach "+TTS_TIMEOUT_MS+"ms",
                window.location.href.split("/").pop(), "");
      // Sanft: erst nur weiterschalten, nicht sofort Overlay
      fertig();
    }, TTS_TIMEOUT_MS);

    try{
      speechSynthesis.speak(u);
    }catch(e){
      logFehler("tts_speak_error", String(e), window.location.href.split("/").pop(), "");
      fertig();
    }
  }
};

// ── 5. PAGE-ALIVE-MONITOR ────────────────────────────────────────────────────
// Prueft alle 60s ob die Seite noch in einem gueltigen Zustand ist.
// FALSE-POSITIVE-SCHUTZ: prueft nur DOM-Konsistenz, NICHT Dwell-Aktivitaet
// (Hoeerbuch, Musik, Eierjagd: lange Phasen ohne Interaktion sind normal!)

function starteAliveMonitor(){
  if(_aliveTimer) return;
  _lastAliveTs = Date.now();

  _aliveTimer = setInterval(function(){
    if(_fehlerAktiv) return;

    // Test 1: Ist das body-Element noch vorhanden?
    if(!document.body){
      logFehler("alive", "document.body fehlt", window.location.href.split("/").pop(), "");
      zeigeFehlerschirm("Die Seite ist in einem ungueltigen Zustand.", "alive");
      return;
    }

    // Test 2: Ist speechSynthesis noch verwendbar? (Edge kann es suspendieren)
    try{
      if(window.speechSynthesis && window.speechSynthesis.speaking === undefined){
        logFehler("alive", "speechSynthesis.speaking nicht verfuegbar",
                  window.location.href.split("/").pop(), "");
      }
    }catch(e){}

    // Test 3: Ist localStorage noch zugaenglich?
    try{
      var probe = "laetitia_alive_probe";
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
    }catch(e){
      logFehler("alive", "localStorage nicht zugaenglich: "+String(e),
                window.location.href.split("/").pop(), "");
      // Kein Overlay - localStorage-Fehler sind meist temporaer
    }

    _lastAliveTs = Date.now();
  }, ALIVE_CHECK_MS);
}

// ── 6. DIAGNOSE-PANEL ────────────────────────────────────────────────────────
// Nur aktiv wenn localStorage["laetitia_diag_mode"] === "1"
// Zeigt Fehler-Log als kleines Panel oben rechts

function zeigeDiagPanel(){
  if(lsGet(DIAG_KEY, "0") !== "1") return;

  var logs = [];
  try{ logs = JSON.parse(lsGet(LOG_KEY, "[]")); }catch(e){}
  if(!logs.length) return;

  var panel = document.createElement("div");
  panel.id = "laetitia-diag-panel";
  panel.setAttribute("style",[
    "position:fixed","bottom:0","left:0","right:0",
    "max-height:180px","overflow-y:auto",
    "background:rgba(0,0,0,0.88)","z-index:88888",
    "padding:8px 12px","font-family:monospace","font-size:11px",
    "color:#86efac","border-top:2px solid #16a34a"
  ].join(";"));

  var titel = document.createElement("div");
  titel.textContent = "LAETITIA FEHLER-LOG (" + logs.length + ") — localStorage[\""+DIAG_KEY+"\"]=\"0\" zum Ausblenden";
  titel.setAttribute("style","font-weight:bold;margin-bottom:4px;color:#bbf7d0;");
  panel.appendChild(titel);

  logs.forEach(function(e){
    var z = document.createElement("div");
    z.textContent = "["+e.ts.substring(11,19)+"] "+e.typ+": "+e.msg+" ("+e.url+(e.line?" Z."+e.line:"")+")";
    panel.appendChild(z);
  });

  if(document.body) document.body.appendChild(panel);
}

// ── 8. LINK-NAVIGATOR-GUARD ──────────────────────────────────────────────────
// Faengt alle Klicks auf <a href> ab und prueft per XHR ob die Zieldatei
// existiert, bevor die Navigation stattfindet.
// Bei fehlender Datei -> Fehler-Overlay statt Browser-"Datei nicht gefunden"-Seite.
// Funktioniert mit Dwell (dwell.js ruft el.click() auf → Interceptor greift).

var _navPending = false;

document.addEventListener("click", function(ev){
  if(_fehlerAktiv || _navPending) return;

  // Naechstes <a>-Element im Klickpfad suchen
  var el = ev.target;
  while(el && el.tagName !== "A"){ el = el.parentElement; }
  if(!el) return;

  var raw  = el.getAttribute("href") || "";
  var href = el.href || "";

  // Nur lokale relative Pfade pruefen; externe/Anker/Spezial ueberspringen
  if(!raw || raw.charAt(0) === "#" ||
     raw.indexOf("javascript") === 0 ||
     raw.indexOf("mailto")     === 0 ||
     raw.indexOf("http")       === 0 ||
     raw.indexOf("data:")      === 0) return;
  if(!href.startsWith("file://")) return;

  ev.preventDefault();
  _navPending = true;

  // Query-String und Hash fuer Existenzpruefung entfernen
  var checkUrl = href.split("?")[0].split("#")[0];

  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    _navPending = false;
    window.location.href = href;
  };
  xhr.onerror = function(){
    _navPending = false;
    logFehler("nav_404", "Datei nicht gefunden: " + raw,
              window.location.href.split("/").pop(), "");
    zeigeFehlerschirm(
      "Seite nicht gefunden: " + raw.split("/").pop().split("?")[0],
      "nav_404"
    );
  };
  try{
    xhr.open("GET", checkUrl, true);
    xhr.send();
  }catch(e){
    _navPending = false;
    logFehler("nav_404", "XHR-Fehler: " + raw + " | " + String(e),
              window.location.href.split("/").pop(), "");
    zeigeFehlerschirm(
      "Seite nicht erreichbar: " + raw.split("/").pop().split("?")[0],
      "nav_404"
    );
  }
}, true); // capture-Phase: greift vor allen anderen Handlern

// ── 9. ÖFFENTLICHE API ───────────────────────────────────────────────────────

window.LaetitiaFehler = {
  // Manuell einen Fehler-Screen anzeigen
  zeige: function(nachricht, typ){
    logFehler("manuell", nachricht, window.location.href.split("/").pop(), "");
    zeigeFehlerschirm(nachricht, typ||"manuell");
  },
  // Letzte Fehler abrufen
  logs: function(){
    try{ return JSON.parse(lsGet(LOG_KEY, "[]")); }catch(e){ return []; }
  },
  // Log loeschen
  clear: function(){
    lsSet(LOG_KEY, "[]");
  },
  // Diagnose-Panel ein/ausschalten
  diag: function(an){
    lsSet(DIAG_KEY, an ? "1" : "0");
    if(an) zeigeDiagPanel();
    else{
      var p = document.getElementById("laetitia-diag-panel");
      if(p) p.parentNode.removeChild(p);
    }
  },
  // Sicheres localStorage-Lesen (fuer Module)
  lsGet: lsGet,
  // Sicheres localStorage-Schreiben (fuer Module)
  lsSet: lsSet
};

// ── INITIALISIERUNG ──────────────────────────────────────────────────────────

// Alive-Monitor starten (nach DOM-ready)
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", function(){
    starteAliveMonitor();
    zeigeDiagPanel();
  });
} else {
  starteAliveMonitor();
  zeigeDiagPanel();
}

})();
