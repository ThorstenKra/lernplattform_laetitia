// quasselkiste_mod.js -- Laetitia Lernsystem
// Quasselkiste 60: Raster-Emulation + Pfad-Training
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var felder   = window.QUASSELKISTE_FELDER || [];
var pfade    = window.QUASSELKISTE_PFADE  || [];
var pfadKey  = [];       // aktuell angeklickte Felder [{r,c},...]
var _attach  = null;
var _dwell   = null;

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

// ── Feld-Key ─────────────────────────────────────────────────────────────────
function feldKey(r, c){ return r + "_" + c; }

function feldByKey(k){
  var p = k.split("_");
  var r = parseInt(p[0]), c = parseInt(p[1]);
  return felder.find(function(f){ return f.r === r && f.c === c; }) || null;
}

// ── Pfad-Suche ───────────────────────────────────────────────────────────────
function suchePfad(keys){
  if(!keys.length) return null;
  return pfade.find(function(p){
    if(p.pfad.length !== keys.length) return false;
    return p.pfad.every(function(step, i){
      return step.r === keys[i].r && step.c === keys[i].c;
    });
  }) || null;
}

// ── UI-Aktualisierung ────────────────────────────────────────────────────────
function aktualisiereAnzeige(){
  var names = pfadKey.map(function(k){
    var f = feldByKey(k);
    return f ? f.name : k;
  });
  var el = $("pfadAnzeige");
  if(el) el.textContent = names.length ? names.join(" + ") : "";

  var match = suchePfad(pfadKey.map(function(k){
    var p = k.split("_");
    return {r:parseInt(p[0]), c:parseInt(p[1])};
  }));
  var aus = $("ausgabe");
  if(aus) aus.textContent = match ? match.wort : (names.length ? names.join(" – ") : "–");
}

function hightlightPfad(){
  document.querySelectorAll(".kachel").forEach(function(el){
    el.classList.remove("gewaehlt");
  });
  pfadKey.forEach(function(k, i){
    var p = k.split("_");
    var el = document.querySelector(".kachel[data-r=\""+p[0]+"\"][data-c=\""+p[1]+"\"]");
    if(el) el.classList.add("gewaehlt");
    if(i === 0) el && el.classList.add("gewaehlt-1");
  });
}

// ── Klick auf Kachel ─────────────────────────────────────────────────────────
function kachelKlick(r, c){
  var f = felder.find(function(x){ return x.r === r && x.c === c; });
  if(!f) return;

  sprich(f.name || "");

  var k = feldKey(r, c);
  if(pfadKey.length < 3){
    pfadKey.push(k);
  }

  hightlightPfad();
  aktualisiereAnzeige();

  // Nach Treffer kurz zeigen, dann Reset
  var match = suchePfad(pfadKey.map(function(k2){
    var p2 = k2.split("_");
    return {r:parseInt(p2[0]), c:parseInt(p2[1])};
  }));
  if(match){
    sprich(match.tts || match.wort);
    setTimeout(loesche, 2000);
  }
}

// ── Loeschen ─────────────────────────────────────────────────────────────────
function loesche(){
  pfadKey = [];
  hightlightPfad();
  aktualisiereAnzeige();
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

    var nameEl = document.createElement("div");
    nameEl.className = "kachel-name";
    nameEl.textContent = f.name || "";
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
  aktualisiereAnzeige();

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

  // AudioContext fuer Dwell-Klick vorinitialisieren
  ["pointerdown","click"].forEach(function(ev){
    document.addEventListener(ev, function(){
      try{ speechSynthesis.getVoices(); }catch(e){}
    }, {once:true, passive:true});
  });
}

window.QuasselKisteMod = { init: init };
})();
