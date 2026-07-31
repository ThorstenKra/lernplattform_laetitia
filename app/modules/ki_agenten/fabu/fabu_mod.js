// fabu_mod.js -- Laetitia Lernsystem
// Fabu -- Geschichtenerzähler-Agent (Multi-Agenten-System, erster Agent)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
//
// Vorlesen der Geschichten selbst bleibt komplett offline (geschichten_data.js).
// Seit 30.07.2026 reagiert Fabu zusaetzlich live per Gemini auf die Antwort, die
// Laetitia bei einer Diskussionsfrage waehlt (siehe reagiereAufAntwort) -- faellt
// bei Verbindungsproblemen ohne Fehleranzeige auf direktes Weitererzaehlen zurueck,
// damit die Geschichte nie blockiert. Siehe persona.json fuer Charakter/Adaptionsregel.
//
// Seit 31.07.2026: zweite Bibliothek "Gedichte" (gedichte_data.js, gemeinsam mit
// dem Reime-Modul genutzt). Gleiche "abschnitte"-Datenform wie GESCHICHTEN, daher
// verallgemeinerte Player-Logik (aktInhalt/aktQuelle statt nur aktGeschichte) --
// siehe persona.json Abschnitt "gedichte" fuer die Erlkoenig-Rahmungsregel.

(function(){
"use strict";

var LISTENER_URL = "http://localhost:9999";
var AGENT_ID     = "ki_agenten/fabu";
var verlauf      = [];
var zustand = "start";
var _dwell  = null;

function $(id){ return document.getElementById(id); }

// ── Avatar (SVG-Gesicht, Fuchs) ───────────────────────────────────────────────
function setzeStimmung(freude){
  var av = $("fabuAvatar");
  if(av) av.setAttribute("class", "fabu-avatar blink" + (freude ? " freude" : ""));
}

// ── HTTP ──────────────────────────────────────────────────────────────────────
function apiFetch(pfad, daten, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", LISTENER_URL + pfad, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.timeout = 25000;
  xhr.onload = function(){
    try{ cb(null, JSON.parse(xhr.responseText)); }
    catch(e){ cb(new Error("Antwort ungueltig")); }
  };
  xhr.onerror = xhr.ontimeout = function(){ cb(new Error("Verbindungsfehler")); };
  xhr.send(JSON.stringify(daten));
}

// ── TTS ──────────────────────────────────────────────────────────────────────
// danach (optional): wird nach TTS-Ende aufgerufen (Geschichten-Auto-Weiter)
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "de-DE"; u.rate = 0.88; // etwas ruhiger als Novas Standardtempo
        var vv = speechSynthesis.getVoices();
        var v = vv.find(function(x){ return x.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
             || vv.find(function(x){ return x.name === "Microsoft Katja - German (Germany)"; })
             || vv.find(function(x){ return x.name.indexOf("Katja") >= 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de") && x.name.indexOf("Hedda") < 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de"); })
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        u.onstart = function(){ var av = $("fabuAvatar"); if(av) av.classList.add("spricht"); };
        var stopp = function(){
          var av = $("fabuAvatar"); if(av) av.classList.remove("spricht");
          if(danach) danach();
        };
        u.onend = stopp; u.onerror = stopp;
        speechSynthesis.speak(u);
      }catch(e){ if(danach) danach(); }
    }, 120);
  }catch(e){ if(danach) danach(); }
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
function rebindDwell(skipRecheck){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var grace   = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = attach(".vorschlag-btn, .nav-btn:not([style*='display:none']), #btnStarten, #btnGedichte, .geschichte-btn", {
    dwellMs: dwellMs, leaveGrace: grace,
    skipHoverRecheck: !!skipRecheck,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── Screens ───────────────────────────────────────────────────────────────────
function alleVerstecken(){
  ["startScreen","geschichtenAuswahlScreen","gedichteAuswahlScreen","gespraechContainer"].forEach(function(id){
    var el = $(id); if(el) el.style.display = "none";
  });
  var bB = $("btnBeenden"); if(bB) bB.style.display = "none";
  var bW = $("btnGeschichteWeiter"); if(bW) bW.style.display = "none";
  stoppeGeschichteTimer();
}

function zeigeStart(){
  zustand = "start"; alleVerstecken();
  var el = $("startScreen"); if(el) el.style.display = "";
  rebindDwell();
}

// ── Geschichten + Gedichte ───────────────────────────────────────────────────
// aktInhalt: aktuell gespieltes Element aus GESCHICHTEN oder GEDICHTE (gleiche
// "abschnitte"-Form). aktQuelle unterscheidet nur Label/Rueckkehr-Bildschirm.
var aktInhalt        = null;
var aktQuelle        = "geschichte"; // "geschichte" | "gedicht"
var aktAbschnitt      = 0;
var geschichteTimer   = null;

function stoppeGeschichteTimer(){
  if(geschichteTimer){ clearTimeout(geschichteTimer); geschichteTimer = null; }
}

function baueListe(screenId, listeId, quelle, daten){
  zustand = quelle === "gedicht" ? "gedichte_auswahl" : "geschichten_auswahl";
  alleVerstecken();
  aktInhalt = null; aktAbschnitt = 0;
  var el = $(screenId); if(el) el.style.display = "";
  var liste = $(listeId);
  if(liste){
    liste.innerHTML = "";
    var eintraege = Array.isArray(daten) ? daten : [];
    eintraege.forEach(function(g){
      var btn = document.createElement("button");
      btn.className = "geschichte-btn";
      btn.innerHTML = "<span class='geschichte-emoji' style='pointer-events:none'>" + (g.emoji || "📖") + "</span>"
        + "<span style='pointer-events:none'>" + g.titel + "</span>"
        + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
        + "<circle cx='35' cy='35' r='30' style='stroke:#d97706'/></svg>";
      btn.addEventListener("click", function(){ starteInhalt(g, quelle); });
      liste.appendChild(btn);
    });
  }
  rebindDwell();
}

function zeigeGeschichtenAuswahl(){
  baueListe("geschichtenAuswahlScreen", "geschichtenListe", "geschichte", window.GESCHICHTEN);
}

function zeigeGedichteAuswahl(){
  baueListe("gedichteAuswahlScreen", "gedichteListe", "gedicht", window.GEDICHTE);
}

function starteInhalt(inhalt, quelle){
  aktInhalt = inhalt;
  aktQuelle = quelle;
  aktAbschnitt = 0;
  verlauf = [];
  zeigeAbschnitt();
}

function zeigeAbschnitt(){
  stoppeGeschichteTimer();
  var abschnitt = aktInhalt ? aktInhalt.abschnitte[aktAbschnitt] : null;
  if(!abschnitt){ zeigeAuswahlFuerQuelle(); return; }

  zustand = "inhalt"; alleVerstecken();
  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";
  setzeStimmung(!!abschnitt.ende);

  var label = $("fabuLabel");
  if(label) label.textContent = aktQuelle === "gedicht" ? "Fabu liest vor:" : "Fabu erzählt:";

  var text = abschnitt.text + (abschnitt.frage ? (" " + abschnitt.frage) : "");
  var fabuEl = $("fabuAntwort"); if(fabuEl) fabuEl.textContent = text;

  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";

  // Zurueck/Beenden sofort per Dwell erreichbar, waehrend Fabu noch spricht --
  // Vorschlaege bzw. Weiter-Button werden erst NACH TTS-Ende sichtbar (siehe unten),
  // damit kein Blick auf den entstehenden Text versehentlich einen Klick ausloest.
  rebindDwell(true);

  if(abschnitt.frage && Array.isArray(abschnitt.vorschlaege)){
    sprich(text, function(){
      abschnitt.vorschlaege.slice(0, 4).forEach(function(v){
        var btn = document.createElement("button");
        btn.className = "vorschlag-btn";
        btn.innerHTML = "<span style='pointer-events:none'>" + v + "</span>"
          + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
          + "<circle cx='35' cy='35' r='30' style='stroke:#d97706'/></svg>";
        btn.addEventListener("click", function(){ reagiereAufAntwort(abschnitt, v); });
        if(grid) grid.appendChild(btn);
      });
      rebindDwell(true);
    });
  } else {
    sprich(text, function(){
      var bW = $("btnGeschichteWeiter"); if(bW) bW.style.display = "";
      rebindDwell(true);
      geschichteTimer = setTimeout(weiterInGeschichte, 3000);
    });
  }
}

function zeigeAuswahlFuerQuelle(){
  if(aktQuelle === "gedicht") zeigeGedichteAuswahl();
  else zeigeGeschichtenAuswahl();
}

function weiterInGeschichte(){
  stoppeGeschichteTimer();
  var abschnitt = aktInhalt ? aktInhalt.abschnitte[aktAbschnitt] : null;
  if(!abschnitt || abschnitt.ende){ speichereGespraech(); zeigeAuswahlFuerQuelle(); return; }
  aktAbschnitt++;
  zeigeAbschnitt();
}

// Gemeinsam genutzt von natuerlichem Geschichtenende (ende:true) und explizitem
// "Geschichte beenden"-Button -- beide Wege sollen das Gespraech sichern.
function speichereGespraech(){
  if(verlauf.length > 0){
    var daten = { agent: AGENT_ID, verlauf: verlauf };
    if(window.LaetitiaLernfortschritt){
      var lf = window.LaetitiaLernfortschritt.kurzZusammenfassung();
      if(lf) daten.lernfortschritt = lf;
    }
    apiFetch("/chat/abschliessen", daten, function(){});
    verlauf = [];
  }
}

// Live-Reaktion auf die gewaehlte Diskussionsantwort -- faellt bei Fehlern
// unauffaellig auf direktes Weitererzaehlen zurueck (Story blockiert nie).
function reagiereAufAntwort(abschnitt, gewaehlterText){
  stoppeGeschichteTimer();
  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";
  var fabuEl = $("fabuAntwort");
  if(fabuEl) fabuEl.textContent = "🦊 …";

  var kontextEinleitung = aktQuelle === "gedicht"
    ? "Ihr lest gerade gemeinsam das Gedicht \""
    : "Ihr lest gerade gemeinsam die Geschichte \"";
  var kontext = kontextEinleitung + (aktInhalt ? aktInhalt.titel : "") + "\". "
    + "Fabu hat gerade erzaehlt: \"" + abschnitt.text + "\" und dann gefragt: \"" + abschnitt.frage + "\". "
    + "Antworte NUR mit einer ganz kurzen persoenlichen Reaktion auf ihre Antwort (1 Satz, maximal 2). "
    + "Erzaehle die Geschichte NICHT selbst weiter und stelle KEINE neue Frage -- die Fortsetzung der "
    + "Geschichte kommt anschliessend automatisch von der App, nicht von dir.";

  apiFetch("/chat", { agent: AGENT_ID, nachricht: gewaehlterText, verlauf: verlauf, kontext: kontext }, function(err, data){
    if(err || !data || data.fehler){
      weiterInGeschichte();
      return;
    }
    verlauf.push({ rolle: "user",      text: gewaehlterText });
    verlauf.push({ rolle: "assistant", text: data.antwort });

    if(fabuEl) fabuEl.textContent = data.antwort;
    setzeStimmung(data.stimmung === "aufgeregt" || data.stimmung === "schnippisch");

    sprich(data.antwort, function(){
      var bW = $("btnGeschichteWeiter"); if(bW) bW.style.display = "";
      rebindDwell(true);
      geschichteTimer = setTimeout(weiterInGeschichte, 3000);
    });
  });
}

function beendeGeschichte(){
  speechSynthesis.cancel();
  stoppeGeschichteTimer();
  speichereGespraech();
  zeigeAuswahlFuerQuelle();
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "inhalt"){ beendeGeschichte(); return; }
  if(zustand === "geschichten_auswahl" || zustand === "gedichte_auswahl"){ zeigeStart(); return; }
  try{
    window.location.href = new URL("../ki_agenten.html", window.location.href).href;
  }catch(e){ history.back(); }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init(){
  var bS = $("btnStarten");
  if(bS) bS.addEventListener("click", zeigeGeschichtenAuswahl);

  var bG = $("btnGedichte");
  if(bG) bG.addEventListener("click", zeigeGedichteAuswahl);

  var bZ = $("btnZurueck");
  if(bZ) bZ.addEventListener("click", zurueck);

  var bB = $("btnBeenden");
  if(bB) bB.addEventListener("click", beendeGeschichte);

  var bGW = $("btnGeschichteWeiter");
  if(bGW) bGW.addEventListener("click", weiterInGeschichte);

  zeigeStart();
}

window.FabuMod = { init: init };
})();
