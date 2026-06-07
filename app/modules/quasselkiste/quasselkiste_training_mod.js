// quasselkiste_training_mod.js -- Laetitia Lernsystem
// Pfad-Training Modus 1: Gefuehrt (Ebene-1-Seiten + Ebene-2-Visualisierung)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var pfade   = (window.QUASSELKISTE_PFADE || []).filter(function(p){
  return p.wort && p.wort.length >= 2 && p.wort.length <= 40 &&
         p.wort.indexOf("Ôßþ") < 0 &&
         p.wort.indexOf("WIZARD") < 0 &&
         p.wort.indexOf("Mfrag") < 0 &&
         /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
});
// Modus 0: 1:1-Filter wie quasselkiste_mod.js (erlaubt Satzzeichen, laengere Woerter)
var pfadeFrei = (window.QUASSELKISTE_PFADE || []).filter(function(p){
  return p.wort && p.wort.length >= 2 && p.wort.length <= 60 &&
         p.wort.indexOf("Ôßþ") < 0 &&
         p.wort.indexOf("WIZARD") < 0 &&
         p.wort.indexOf("Mfrag") < 0 &&
         /^[a-zA-ZäöüÄÖÜß\s\-!?,'.äöüÄÖÜß]+$/.test(p.wort);
});
var felder      = window.QUASSELKISTE_FELDER || [];
var aktivePfade = [];
var aktStufe    = 0;
var aktModus    = "training"; // "training" | "frei" (Modus 0 = 1:1-Quasselkiste)
var aktSeite    = 1;       // Aktuelle Seite der Ebene 1 (1, 2 oder 3)
var aktEbene    = 1;       // 1 = Hauptebene, 2 = Zweite Ebene
var zielEintrag = null;
var aktSchritt  = 0;
var fehlerCount = 0;
var geloest     = 0;
var freiEbene2Map = {};    // Modus 0: "r_c" -> wort fuer gueltige Zweitschritte
var _attach     = null;
var _dwell      = null;
var _dwellMs    = 900;
var _graceMs    = 150;

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

// ── Dwell ────────────────────────────────────────────────────────────────────
function loadDwell(){
  if(_attach) return _attach;
  _attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  return _attach;
}

function rebindDwell(){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  _dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  _graceMs = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = loadDwell()(".kachel:not(.kachel-unsichtbar):not(.ebene2-leer), .nav-btn", {
    dwellMs: _dwellMs, leaveGrace: _graceMs,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

function rebindDwellStart(){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  _dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  _graceMs = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = loadDwell()(".stufe-btn, #startZurueck", {
    dwellMs: _dwellMs, leaveGrace: _graceMs,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
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
    el.classList.remove("richtig","falsch","hinweis","ebene2-treffer","ebene2-leer");
    var nameEl = el.querySelector(".kachel-name");
    if(nameEl){
      var r = parseInt(el.getAttribute("data-r"));
      var c = parseInt(el.getAttribute("data-c"));
      var f = felder.find(function(x){ return x.r===r && x.c===c; });
      nameEl.textContent = f ? (f.name||"") : "";
      nameEl.style.display = "none";
    }
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

// ── Seiten-Logik (Ebene 1) ───────────────────────────────────────────────────
function kachelAufSeite(f, seite){
  if(f.r !== 1) return true;                    // r=2..6: immer sichtbar
  var s = f.seiten || [];
  if(s.length === 0) return false;              // leere Kachel: nie
  return s.indexOf(seite) >= 0;
}

function aktualisiereSeiteAnzeige(){
  var lbl = $("seiteLabel");
  if(lbl) lbl.textContent = "S " + aktSeite;
}

function aktualisiereKachelSichtbarkeit(){
  felder.forEach(function(f){
    var el = kachelEl(f.r, f.c);
    if(!el) return;
    if(kachelAufSeite(f, aktSeite)){
      el.classList.remove("kachel-unsichtbar");
    } else {
      el.classList.add("kachel-unsichtbar");
    }
  });
}

function wechsleSeite(){
  aktSeite = (aktSeite % 3) + 1;
  aktualisiereSeiteAnzeige();
  aktualisiereKachelSichtbarkeit();
  // Ebene 2 bei Seitenwechsel beenden
  if(aktEbene === 2){ zeigeEbene1Wiederher(); }
  rebindDwell();
}

// Automatisch zur richtigen Seite navigieren fuer eine gegebene Kachel
function navigiereZuKachel(r, c){
  if(r !== 1) return;                           // Hauptgrid: kein Wechsel noetig
  var f = felder.find(function(x){ return x.r===r && x.c===c; });
  if(!f || !f.seiten || f.seiten.length === 0) return;
  if(f.seiten.indexOf(aktSeite) >= 0) return;  // schon richtige Seite
  aktSeite = f.seiten[0];
  aktualisiereSeiteAnzeige();
  aktualisiereKachelSichtbarkeit();
}

// ── Ebene 2 ──────────────────────────────────────────────────────────────────
function zeigeEbene2(r1, c1){
  aktEbene = 2;
  // Alle gueltigen Zweitschritte berechnen
  var zweiteMap = {};
  aktivePfade.forEach(function(p){
    if(p.pfad.length === 2 && p.pfad[0].r === r1 && p.pfad[0].c === c1){
      var k = p.pfad[1].r + "_" + p.pfad[1].c;
      if(!zweiteMap[k]) zweiteMap[k] = p.wort;
    }
  });

  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var k = r + "_" + c;
    var nameEl = el.querySelector(".kachel-name");
    var istUnsichtbar = el.classList.contains("kachel-unsichtbar");

    el.classList.remove("ebene2-treffer","ebene2-leer","hinweis");

    if(r === r1 && c === c1){
      // Erste Kachel: sichtbar halten auch wenn auf anderer Seite
      el.classList.remove("kachel-unsichtbar");
    } else if(zweiteMap[k] !== undefined){
      // Gueltiger Zweitschritt: immer anzeigen, auch wenn auf anderer Seite
      el.classList.remove("kachel-unsichtbar");
      el.classList.add("ebene2-treffer");
      if(nameEl){
        nameEl.textContent = zweiteMap[k];
        nameEl.style.display = "";
      }
    } else if(!istUnsichtbar){
      // Nur sichtbare Kacheln dimmen — unsichtbare (andere Seite) bleiben versteckt
      el.classList.add("ebene2-leer");
    }
  });
  rebindDwell();
}

function zeigeEbene1Wiederher(){
  aktEbene = 1;
  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var f = felder.find(function(x){ return x.r===r && x.c===c; });
    var nameEl = el.querySelector(".kachel-name");
    el.classList.remove("ebene2-treffer","ebene2-leer","richtig","falsch","hinweis");
    if(nameEl){
      nameEl.textContent = f ? (f.name||"") : "";
      nameEl.style.display = "none";
    }
  });
  aktualisiereKachelSichtbarkeit();
  rebindDwell();
}

// ── Modus 0: 1:1-Quasselkiste (frei sprechen, kein Training) ────────────────
function zeigeNavTraining(){
  var bh = $("btnHinweis"), bw = $("btnWeiter"), bl = $("btnLoesche"), bs = $("btnSpreche");
  if(bh) bh.style.display = "";
  if(bw) bw.style.display = "";
  if(bl) bl.style.display = "none";
  if(bs) bs.style.display = "none";
}

function zeigeNavFrei(){
  var bh = $("btnHinweis"), bw = $("btnWeiter"), bl = $("btnLoesche"), bs = $("btnSpreche");
  if(bh) bh.style.display = "none";
  if(bw) bw.style.display = "none";
  if(bl) bl.style.display = "";
  if(bs) bs.style.display = "";
}

function holeZweiteSchritteFrei(r, c){
  var map = {};
  pfadeFrei.forEach(function(p){
    if(p.pfad.length === 2 && p.pfad[0].r === r && p.pfad[0].c === c){
      var k = p.pfad[1].r + "_" + p.pfad[1].c;
      if(!map[k]) map[k] = p.wort;
    }
  });
  return map;
}

function zeigeEbene2Frei(r1, c1, combosMap){
  aktEbene = 2;
  freiEbene2Map = combosMap;
  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var k = r + "_" + c;
    var nameEl = el.querySelector(".kachel-name");
    var istUnsichtbar = el.classList.contains("kachel-unsichtbar");

    el.classList.remove("ebene2-treffer","ebene2-leer","hinweis");

    if(r === r1 && c === c1){
      el.classList.remove("kachel-unsichtbar");
    } else if(combosMap[k] !== undefined){
      el.classList.remove("kachel-unsichtbar");
      el.classList.add("ebene2-treffer");
      if(nameEl){ nameEl.textContent = combosMap[k]; nameEl.style.display = ""; }
    } else if(!istUnsichtbar){
      el.classList.add("ebene2-leer");
    }
  });
  var f1 = felder.find(function(x){ return x.r === r1 && x.c === c1; });
  var pfadEl = $("pfadAnzeige");
  if(pfadEl) pfadEl.textContent = (f1 ? f1.name : "") + " →";
  rebindDwell();
}

function loescheFrei(){
  aktEbene = 1;
  freiEbene2Map = {};
  document.querySelectorAll(".kachel").forEach(function(el){
    var r = parseInt(el.getAttribute("data-r"));
    var c = parseInt(el.getAttribute("data-c"));
    var f = felder.find(function(x){ return x.r===r && x.c===c; });
    var nameEl = el.querySelector(".kachel-name");
    el.classList.remove("ebene2-treffer","ebene2-leer","richtig","falsch","hinweis");
    if(nameEl){
      nameEl.textContent = f ? (f.name||"") : "";
      nameEl.style.display = "none";
    }
  });
  aktualisiereKachelSichtbarkeit();
  var za = $("zielAnzeige");
  if(za) za.textContent = "–";
  var pfadEl = $("pfadAnzeige");
  if(pfadEl) pfadEl.textContent = "";
  rebindDwell();
}

function kachelKlickFrei(r, c){
  var f = felder.find(function(x){ return x.r === r && x.c === c; });
  if(!f) return;

  if(aktEbene === 1){
    sprich(f.name || "");
    var combosMap = holeZweiteSchritteFrei(r, c);

    if(Object.keys(combosMap).length > 0){
      zeigeEbene2Frei(r, c, combosMap);
    } else {
      var za = $("zielAnzeige");
      if(za) za.textContent = f.name || "–";
    }
  } else {
    var wort = freiEbene2Map[r + "_" + c];
    if(wort){
      sprich(wort);
      var za = $("zielAnzeige");
      if(za) za.textContent = wort;
      setTimeout(loescheFrei, 2200);
    } else {
      loescheFrei();
    }
  }
}

function starteModus0(){
  aktStufe      = 0;
  aktModus      = "frei";
  aktSeite      = 1;
  aktEbene      = 1;
  zielEintrag   = null;
  freiEbene2Map = {};
  $("startScreen").style.display = "none";
  $("grid").style.display = "grid";
  $("navLeiste").style.display = "";
  var sb = $("btnSeite"); if(sb) sb.style.display = "";
  var za = $("zielAnzeige"); if(za) za.textContent = "–";
  var pfadEl = $("pfadAnzeige"); if(pfadEl) pfadEl.textContent = "";
  zeigeNavFrei();
  aktualisiereSeiteAnzeige();
  clearHighlights();
  aktualisiereKachelSichtbarkeit();
  rebindDwell();
}

// ── Start-Screen ─────────────────────────────────────────────────────────────
function zeigeStartScreen(){
  $("startScreen").style.display = "";
  $("grid").style.display = "none";
  $("navLeiste").style.display = "none";
  var sb = $("btnSeite"); if(sb) sb.style.display = "none";
  var za = $("zielAnzeige"); if(za) za.textContent = "Wähle eine Stufe";
  var pfadEl = $("pfadAnzeige"); if(pfadEl) pfadEl.textContent = "";
  aktStufe = 0; aktModus = "training"; aktSeite = 1; aktEbene = 1;
  geloest = 0; zielEintrag = null; freiEbene2Map = {};
  clearHighlights();
  rebindDwellStart();
}

function startTraining(stufe){
  aktStufe    = stufe;
  aktModus    = "training";
  aktSeite    = 1;
  aktEbene    = 1;
  geloest     = 0;
  zielEintrag = null;
  aktivePfade = pfade.filter(function(p){ return p.pfad.length === stufe; });
  $("startScreen").style.display = "none";
  $("grid").style.display = "grid";
  $("navLeiste").style.display = "";
  var sb = $("btnSeite");
  if(sb) sb.style.display = ""; // Seiten-Button in allen Stufen
  zeigeNavTraining();
  aktualisiereSeiteAnzeige();
  aktualisiereKachelSichtbarkeit();
  rebindDwell();
  neuesWort();
}

// ── Neues Wort ───────────────────────────────────────────────────────────────
function neuesWort(){
  if(!aktivePfade.length) return;
  var vorher = zielEintrag ? zielEintrag.wort : null;
  var pool = aktivePfade.filter(function(p){ return p.wort !== vorher; });
  if(!pool.length) pool = aktivePfade;
  var entry = pool[Math.floor(Math.random() * pool.length)];

  zielEintrag = entry;
  aktSchritt  = 0;
  fehlerCount = 0;
  aktEbene    = 1;

  // Automatisch zur richtigen Seite navigieren (alle Stufen)
  if(entry.pfad.length >= 1){
    navigiereZuKachel(entry.pfad[0].r, entry.pfad[0].c);
  }

  clearHighlights();
  aktualisiereZiel();
  sprich(entry.tts || entry.wort);
}

function aktualisiereZiel(){
  var el = $("zielAnzeige");
  if(el) el.textContent = zielEintrag ? "Finde: " + zielEintrag.wort + " (" + geloest + " gelöst)" : "–";
}

// ── Kachel angeklickt ────────────────────────────────────────────────────────
function kachelKlick(r, c){
  if(!zielEintrag) return;
  var erwartet = zielEintrag.pfad[aktSchritt];
  if(!erwartet) return;

  if(r === erwartet.r && c === erwartet.c){
    // Richtiger Klick
    markiereRichtig(r, c);
    clearHinweis();
    fehlerCount = 0;
    aktSchritt++;

    if(aktSchritt >= zielEintrag.pfad.length){
      // Pfad vollstaendig
      geloest++;
      aktualisiereZiel();
      sprich(zielEintrag.tts || zielEintrag.wort);
      setTimeout(function(){
        spieleErfolg();
        setTimeout(function(){
          zeigeEbene1Wiederher();
          neuesWort();
        }, 1800);
      }, 500);
    } else {
      // Erster Schritt korrekt (Stufe 2): Ebene 2 anzeigen
      var n = feldName(r, c);
      if(n) sprich(n);
      setTimeout(function(){
        zeigeEbene2(r, c);
        // Zur Seite der zweiten Zielkachel navigieren
        var step2 = zielEintrag.pfad[1];
        if(step2) navigiereZuKachel(step2.r, step2.c);
        aktualisiereKachelSichtbarkeit();
        rebindDwell();
      }, 400);
    }
  } else {
    // Falscher Klick
    markiereFalsch(r, c);
    fehlerCount++;
    if(fehlerCount >= 3){ zeigeHinweis(); }
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
      if(aktModus === "frei") kachelKlickFrei(f.r, f.c);
      else kachelKlick(f.r, f.c);
    });
    grid.appendChild(el);
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
function init(){
  bauGrid();

  var btnS1 = $("btnStufe1");
  if(btnS1) btnS1.addEventListener("click", function(){ startTraining(1); });
  var btnS2 = $("btnStufe2");
  if(btnS2) btnS2.addEventListener("click", function(){ startTraining(2); });
  var btnM0 = $("btnModus0");
  if(btnM0) btnM0.addEventListener("click", starteModus0);

  var btnSite = $("btnSeite");
  if(btnSite) btnSite.addEventListener("click", wechsleSeite);

  var btnSZ = $("startZurueck");
  if(btnSZ) btnSZ.addEventListener("click", function(e){
    e.preventDefault();
    try{ window.location.href = new URL("../../spielewelt.html", window.location.href).href; }
    catch(ex){ history.back(); }
  });

  var btnZ = $("btnZurueck");
  if(btnZ) btnZ.addEventListener("click", function(e){
    e.preventDefault();
    if(aktStufe > 0 || aktModus === "frei"){
      zeigeStartScreen();
    } else {
      try{ window.location.href = new URL("../../spielewelt.html", window.location.href).href; }
      catch(ex){ history.back(); }
    }
  });

  var btnL = $("btnLoesche");
  if(btnL) btnL.addEventListener("click", loescheFrei);

  var btnSp = $("btnSpreche");
  if(btnSp) btnSp.addEventListener("click", function(){
    var za = $("zielAnzeige");
    if(za && za.textContent && za.textContent !== "–") sprich(za.textContent);
  });

  var btnH = $("btnHinweis");
  if(btnH) btnH.addEventListener("click", zeigeHinweis);

  var btnW = $("btnWeiter");
  if(btnW) btnW.addEventListener("click", function(){
    if(zielEintrag){
      zielEintrag.pfad.forEach(function(step){
        var el = kachelEl(step.r, step.c);
        if(el) el.classList.add("hinweis");
      });
      setTimeout(function(){
        zeigeEbene1Wiederher();
        neuesWort();
      }, 1200);
    }
  });

  ["pointerdown","click"].forEach(function(ev){
    document.addEventListener(ev, function(){
      try{ speechSynthesis.getVoices(); }catch(e){}
    }, {once:true, passive:true});
  });

  zeigeStartScreen();
}

window.QuasselTrainingMod = { init: init };
})();
