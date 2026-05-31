// quasselkiste_training_mod.js -- Laetitia Lernsystem
// Pfad-Training: Zielwort vorgeben, Pfad suchen
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var pfade       = (window.QUASSELKISTE_PFADE || []).filter(function(p){
  return p.wort && p.wort.length >= 2 && p.wort.length <= 40 &&
         p.wort.indexOf("Ôßþ") < 0 &&
         p.wort.indexOf("WIZARD") < 0 &&
         p.wort.indexOf("Mfrag") < 0 &&
         /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
});
var felder      = window.QUASSELKISTE_FELDER || [];
var zielEintrag = null;   // { wort, tts, pfad:[{r,c},...] }
var aktSchritt  = 0;      // wie weit im Pfad schon korrekt geklickt
var fehlerCount = 0;      // Fehler beim aktuellen Schritt
var geloest     = 0;      // korrekt abgeschlossene Woerter
var _attach     = null;
var _dwell      = null;

function $(id){ return document.getElementById(id); }

// ── TTS (Katja-Goldstandard) ─────────────────────────────────────────────────
function sprich(text){
  try{
    speechSynthesis.cancel();
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "de-DE"; u.rate = 0.92; u.pitch = 1.0; u.volume = 1.0;
        var vv = speechSynthesis.getVoices();
        var v = vv.find(function(x){ return x.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
             || vv.find(function(x){ return x.name === "Microsoft Katja - German (Germany)"; })
             || vv.find(function(x){ return x.name.indexOf("Katja") >= 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de") && x.name.indexOf("Hedda") < 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de"); })
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        speechSynthesis.speak(u);
      }catch(e){}
    }, 120);
  }catch(e){}
}

function spieleErfolg(){
  var texte = ["Super!", "Toll!", "Genial!", "Bravo!", "Wunderbar!", "Klasse!", "Fantastisch!", "Perfekt!"];
  sprich(texte[Math.floor(Math.random() * texte.length)]);
}

// ── Dwell (Regel 7) ──────────────────────────────────────────────────────────
function loadDwell(){
  if(_attach) return _attach;
  _attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  return _attach;
}

function rebindDwell(){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var ms    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var grace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = loadDwell()(".kachel, .nav-btn", {
    dwellMs: ms, leaveGrace: grace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────
function kachelEl(r, c){
  return document.querySelector(".kachel[data-r=\""+r+"\"][data-c=\""+c+"\"]");
}

function feldName(r, c){
  var f = felder.find(function(x){ return x.r === r && x.c === c; });
  return f ? f.name : "";
}

function clearHighlights(){
  document.querySelectorAll(".kachel").forEach(function(el){
    el.classList.remove("richtig","falsch","hinweis");
  });
}

function markiereRichtig(r, c){
  var el = kachelEl(r, c);
  if(el){ el.classList.remove("falsch","hinweis"); el.classList.add("richtig"); }
}

function markiereFalsch(r, c){
  var el = kachelEl(r, c);
  if(!el) return;
  el.classList.add("falsch");
  setTimeout(function(){ el.classList.remove("falsch"); }, 700);
}

function zeigeHinweis(){
  if(!zielEintrag) return;
  clearHinweis();
  var step = zielEintrag.pfad[aktSchritt];
  if(!step) return;
  var el = kachelEl(step.r, step.c);
  if(el) el.classList.add("hinweis");
}

function clearHinweis(){
  document.querySelectorAll(".kachel.hinweis").forEach(function(el){
    el.classList.remove("hinweis");
  });
}

// ── Neues Wort ───────────────────────────────────────────────────────────────
function neuesWort(){
  if(!pfade.length) return;
  var vorher = zielEintrag ? zielEintrag.wort : null;
  // Prefer entries where the word differs from the previous one
  var pool = pfade.filter(function(p){ return p.wort !== vorher; });
  if(!pool.length) pool = pfade;
  var entry = pool[Math.floor(Math.random() * pool.length)];

  zielEintrag = entry;
  aktSchritt  = 0;
  fehlerCount = 0;
  clearHighlights();
  aktualisiereZiel();
  sprich(entry.tts || entry.wort);
}

function aktualisiereZiel(){
  var el = $("zielAnzeige");
  if(el) el.textContent = zielEintrag ? "Finde: " + zielEintrag.wort : "–";
  var st = $("statsAnzeige");
  if(st) st.textContent = geloest + " gelöst";
}

// ── Kachel angeklickt ────────────────────────────────────────────────────────
function kachelKlick(r, c){
  if(!zielEintrag) return;
  var erwartet = zielEintrag.pfad[aktSchritt];
  if(!erwartet) return;

  if(r === erwartet.r && c === erwartet.c){
    markiereRichtig(r, c);
    clearHinweis();
    fehlerCount = 0;
    aktSchritt++;

    if(aktSchritt >= zielEintrag.pfad.length){
      // Pfad vollstaendig!
      geloest++;
      aktualisiereZiel();
      sprich(zielEintrag.tts || zielEintrag.wort);
      setTimeout(function(){
        spieleErfolg();
        setTimeout(neuesWort, 1800);
      }, 500);
    } else {
      // Naechsten Schritt sprechen
      var n = feldName(r, c);
      if(n) sprich(n);
    }
  } else {
    markiereFalsch(r, c);
    fehlerCount++;
    if(fehlerCount >= 3){
      zeigeHinweis();
    }
  }
}

// ── Grid aufbauen ────────────────────────────────────────────────────────────
function bauGrid(){
  var grid = $("grid");
  if(!grid) return;
  grid.innerHTML = "";

  felder.forEach(function(f){
    var el = document.createElement("div");
    el.className = "kachel";
    el.setAttribute("data-r", String(f.r));
    el.setAttribute("data-c", String(f.c));
    el.style.background = f.bg || "#FFFFFF";
    el.tabIndex = 0;

    var imgEl = document.createElement("img");
    imgEl.className = "kachel-img";
    imgEl.src = "./tiles/tile_r" + f.r + "c" + f.c + ".png";
    imgEl.alt = f.name || "";
    imgEl.setAttribute("draggable", "false");
    el.appendChild(imgEl);

    var nameEl = document.createElement("div");
    nameEl.className = "kachel-name";
    nameEl.textContent = f.name || "";
    nameEl.style.display = "none";
    imgEl.onerror = (function(n){ return function(){ this.style.display="none"; n.style.display=""; }; }(nameEl));
    el.appendChild(nameEl);

    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("class","dwell-ring-svg");
    svg.setAttribute("viewBox","0 0 70 70");
    var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circ.setAttribute("cx","35"); circ.setAttribute("cy","35"); circ.setAttribute("r","30");
    circ.style.stroke = "#1a1a1a";
    svg.appendChild(circ);
    el.appendChild(svg);

    el.addEventListener("click", function(){
      kachelKlick(f.r, f.c);
    });
    grid.appendChild(el);
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
function init(){
  bauGrid();

  var btnZ = $("btnZurueck");
  if(btnZ) btnZ.addEventListener("click", function(e){
    e.preventDefault();
    try{
      window.location.href = new URL("../../spielewelt.html", window.location.href).href;
    }catch(ex){ history.back(); }
  });

  var btnH = $("btnHinweis");
  if(btnH) btnH.addEventListener("click", zeigeHinweis);

  var btnW = $("btnWeiter");
  if(btnW) btnW.addEventListener("click", function(){
    if(zielEintrag){
      // Highlight the correct path briefly, then move on
      zielEintrag.pfad.forEach(function(step){
        var el = kachelEl(step.r, step.c);
        if(el) el.classList.add("hinweis");
      });
      setTimeout(neuesWort, 1200);
    }
  });

  rebindDwell();

  ["pointerdown","click"].forEach(function(ev){
    document.addEventListener(ev, function(){
      try{ speechSynthesis.getVoices(); }catch(e){}
    }, {once:true, passive:true});
  });

  neuesWort();
}

window.QuasselTrainingMod = { init: init };
})();
