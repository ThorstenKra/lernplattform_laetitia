// fabu_mod.js -- Laetitia Lernsystem
// Fabu -- Geschichtenerzähler-Agent (Multi-Agenten-System, erster Agent)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
//
// Rein lokal, kein Gemini-Aufruf -- Fabus Bibliothek (geschichten_data.js)
// treibt Vorlesen + Diskussionsfragen komplett offline. Siehe persona.json
// für Charakter/Adaptionsregel.

(function(){
"use strict";

var zustand = "start";
var _dwell  = null;

function $(id){ return document.getElementById(id); }

// ── Avatar (SVG-Gesicht, Fuchs) ───────────────────────────────────────────────
function setzeStimmung(freude){
  var av = $("fabuAvatar");
  if(av) av.setAttribute("class", "fabu-avatar blink" + (freude ? " freude" : ""));
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
  _dwell = attach(".vorschlag-btn, .nav-btn:not([style*='display:none']), #btnStarten, .geschichte-btn", {
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
  ["startScreen","geschichtenAuswahlScreen","gespraechContainer"].forEach(function(id){
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

// ── Geschichten ────────────────────────────────────────────────────────────────
var aktGeschichte   = null;
var aktAbschnitt    = 0;
var geschichteTimer = null;

function stoppeGeschichteTimer(){
  if(geschichteTimer){ clearTimeout(geschichteTimer); geschichteTimer = null; }
}

function zeigeGeschichtenAuswahl(){
  zustand = "geschichten_auswahl"; alleVerstecken();
  aktGeschichte = null; aktAbschnitt = 0;
  var el = $("geschichtenAuswahlScreen"); if(el) el.style.display = "";
  var liste = $("geschichtenListe");
  if(liste){
    liste.innerHTML = "";
    var geschichten = Array.isArray(window.GESCHICHTEN) ? window.GESCHICHTEN : [];
    geschichten.forEach(function(g){
      var btn = document.createElement("button");
      btn.className = "geschichte-btn";
      btn.innerHTML = "<span class='geschichte-emoji' style='pointer-events:none'>" + (g.emoji || "📖") + "</span>"
        + "<span style='pointer-events:none'>" + g.titel + "</span>"
        + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
        + "<circle cx='35' cy='35' r='30' style='stroke:#d97706'/></svg>";
      btn.addEventListener("click", function(){ starteGeschichte(g); });
      liste.appendChild(btn);
    });
  }
  rebindDwell();
}

function starteGeschichte(geschichte){
  aktGeschichte = geschichte;
  aktAbschnitt = 0;
  zeigeAbschnitt();
}

function zeigeAbschnitt(){
  stoppeGeschichteTimer();
  var abschnitt = aktGeschichte ? aktGeschichte.abschnitte[aktAbschnitt] : null;
  if(!abschnitt){ zeigeGeschichtenAuswahl(); return; }

  zustand = "geschichte"; alleVerstecken();
  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";
  setzeStimmung(!!abschnitt.ende);

  var text = abschnitt.text + (abschnitt.frage ? (" " + abschnitt.frage) : "");
  var fabuEl = $("fabuAntwort"); if(fabuEl) fabuEl.textContent = text;

  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";

  if(abschnitt.frage && Array.isArray(abschnitt.vorschlaege)){
    sprich(text);
    abschnitt.vorschlaege.slice(0, 4).forEach(function(v){
      var btn = document.createElement("button");
      btn.className = "vorschlag-btn";
      btn.innerHTML = "<span style='pointer-events:none'>" + v + "</span>"
        + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
        + "<circle cx='35' cy='35' r='30' style='stroke:#d97706'/></svg>";
      btn.addEventListener("click", function(){ weiterInGeschichte(); });
      if(grid) grid.appendChild(btn);
    });
  } else {
    var bW = $("btnGeschichteWeiter"); if(bW) bW.style.display = "";
    sprich(text, function(){
      geschichteTimer = setTimeout(weiterInGeschichte, 3000);
    });
  }
  rebindDwell(true);
}

function weiterInGeschichte(){
  stoppeGeschichteTimer();
  var abschnitt = aktGeschichte ? aktGeschichte.abschnitte[aktAbschnitt] : null;
  if(!abschnitt || abschnitt.ende){ zeigeGeschichtenAuswahl(); return; }
  aktAbschnitt++;
  zeigeAbschnitt();
}

function beendeGeschichte(){
  speechSynthesis.cancel();
  stoppeGeschichteTimer();
  zeigeGeschichtenAuswahl();
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "geschichte"){ beendeGeschichte(); return; }
  if(zustand === "geschichten_auswahl"){ zeigeStart(); return; }
  try{
    window.location.href = new URL("../ki_agenten.html", window.location.href).href;
  }catch(e){ history.back(); }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init(){
  var bS = $("btnStarten");
  if(bS) bS.addEventListener("click", zeigeGeschichtenAuswahl);

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
