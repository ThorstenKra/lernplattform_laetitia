// quasselkiste_mod.js -- Laetitia Lernsystem
// Quasselkiste 60: Raster-Emulation + Zwei-Ebenen-Navigation
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var felder = window.QUASSELKISTE_FELDER || [];
var pfade  = (window.QUASSELKISTE_PFADE || []).filter(function(p){
  return p.wort && p.wort.length >= 2 && p.wort.length <= 60 &&
         p.wort.indexOf("Ôßþ") < 0 &&
         p.wort.indexOf("WIZARD") < 0 &&
         p.wort.indexOf("Mfrag") < 0 &&
         /^[a-zA-ZäöüÄÖÜß\s\-!?,'.äöüÄÖÜß]+$/.test(p.wort);
});

var ebene       = 1;         // 1 = Hauptebene, 2 = Zweite Ebene
var erstesTaste = null;      // {r, c} der ersten gewaehlten Kachel
var ebene2Map   = {};        // "r_c" -> wort fuer alle gueltigen Zweit-Schritte
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

// ── Zweite-Schritt-Suche ─────────────────────────────────────────────────────
// Gibt {"r_c": wort} zurueck fuer alle 2-Schritt-Pfade mit (r,c) als erster Taste
function holeZweiteSchritte(r, c){
  var map = {};
  pfade.forEach(function(p){
    if(p.pfad.length === 2 && p.pfad[0].r === r && p.pfad[0].c === c){
      var k = p.pfad[1].r + "_" + p.pfad[1].c;
      if(!map[k]) map[k] = p.wort;
    }
  });
  return map;
}

// ── Zweite Ebene anzeigen ────────────────────────────────────────────────────
function zeigeEbene2(r1, c1, combosMap){
  ebene2Map = combosMap;
  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var nameEl = el.querySelector(".kachel-name");
    el.classList.remove("ebene2-treffer", "ebene2-leer");
    if(combosMap[r + "_" + c] !== undefined){
      el.classList.add("ebene2-treffer");
      if(nameEl) nameEl.textContent = combosMap[r + "_" + c];
    } else {
      el.classList.add("ebene2-leer");
    }
  });
  var f1 = felder.find(function(x){ return x.r === r1 && x.c === c1; });
  var pfadEl = $("pfadAnzeige");
  if(pfadEl) pfadEl.textContent = (f1 ? f1.name : "") + " →";
}

// ── Erste Ebene wiederherstellen ─────────────────────────────────────────────
function zeigeEbene1(){
  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var nameEl = el.querySelector(".kachel-name");
    el.classList.remove("ebene2-treffer", "ebene2-leer");
    if(nameEl){
      var f = felder.find(function(x){ return x.r === r && x.c === c; });
      nameEl.textContent = f ? (f.name || "") : "";
    }
  });
}

// ── Klick auf Kachel ─────────────────────────────────────────────────────────
function kachelKlick(r, c){
  var f = felder.find(function(x){ return x.r === r && x.c === c; });
  if(!f) return;

  if(ebene === 1){
    sprich(f.name || "");
    var combosMap = holeZweiteSchritte(r, c);

    if(Object.keys(combosMap).length > 0){
      ebene = 2;
      erstesTaste = {r: r, c: c};
      zeigeEbene2(r, c, combosMap);
    } else {
      // Keine zweite Ebene: Kachelname in Ausgabe anzeigen
      var aus = $("ausgabe");
      if(aus) aus.textContent = f.name || "–";
    }

  } else {
    // Zweite Ebene: passendes Ergebnis suchen
    var wort = ebene2Map[r + "_" + c];
    if(wort){
      sprich(wort);
      var aus = $("ausgabe");
      if(aus) aus.textContent = wort;
      setTimeout(loesche, 2200);
    } else {
      loesche();
    }
  }
}

// ── Loeschen / Zurueck zu Ebene 1 ───────────────────────────────────────────
function loesche(){
  ebene = 1;
  erstesTaste = null;
  ebene2Map = {};
  zeigeEbene1();
  var aus = $("ausgabe");
  if(aus) aus.textContent = "–";
  var pfadEl = $("pfadAnzeige");
  if(pfadEl) pfadEl.textContent = "";
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
    el.setAttribute("aria-label", f.name || "");

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

  var btnL = $("btnLoesche");
  if(btnL) btnL.addEventListener("click", loesche);

  var btnS = $("btnSpreche");
  if(btnS) btnS.addEventListener("click", function(){
    var aus = $("ausgabe");
    if(aus && aus.textContent && aus.textContent !== "–") sprich(aus.textContent);
  });

  var btnZ = $("btnZurueck");
  if(btnZ) btnZ.addEventListener("click", function(e){
    e.preventDefault();
    try{
      window.location.href = new URL("../../spielewelt.html", window.location.href).href;
    }catch(ex){ history.back(); }
  });

  rebindDwell();

  ["pointerdown","click"].forEach(function(ev){
    document.addEventListener(ev, function(){
      try{ speechSynthesis.getVoices(); }catch(e){}
    }, {once:true, passive:true});
  });
}

window.QuasselKisteMod = { init: init };
})();
