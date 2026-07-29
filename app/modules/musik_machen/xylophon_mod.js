// xylophon_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Tastendefinition ──────────────────────────────────────────────────────────
// idx 0–7: Ganztöne C D E F G A H C'
// idx 8–12: Halbtöne Cis Dis Fis Gis Ais
// halb:null = kein Halbton (zwischen E/F und H/C')
var TASTEN = [
  { idx:0, note:"C",  freq:523.25, farbe:"#ef4444", label:"Do",  breite:"100%",
    halb:{ idx:8,  note:"C#", freq:554.37, label:"C#" } },
  { idx:1, note:"D",  freq:587.33, farbe:"#f97316", label:"Re",  breite:"93%",
    halb:{ idx:9,  note:"D#", freq:622.25, label:"D#" } },
  { idx:2, note:"E",  freq:659.25, farbe:"#eab308", label:"Mi",  breite:"86%",
    halb: null },
  { idx:3, note:"F",  freq:698.46, farbe:"#22c55e", label:"Fa",  breite:"79%",
    halb:{ idx:10, note:"F#", freq:739.99, label:"F#" } },
  { idx:4, note:"G",  freq:784.00, farbe:"#06b6d4", label:"Sol", breite:"72%",
    halb:{ idx:11, note:"G#", freq:830.61, label:"G#" } },
  { idx:5, note:"A",  freq:880.00, farbe:"#3b82f6", label:"La",  breite:"65%",
    halb:{ idx:12, note:"A#", freq:932.33, label:"A#" } },
  { idx:6, note:"H",  freq:987.77, farbe:"#8b5cf6", label:"Si",  breite:"58%",
    halb: null },
  { idx:7, note:"C'", freq:1046.50,farbe:"#ec4899", label:"Do'", breite:"51%",
    halb: null }
];

// Frequenz-Map für alle Töne (Ganz + Halb)
var FREQ = {};
TASTEN.forEach(function(t){
  FREQ[t.idx] = t.freq;
  if(t.halb) FREQ[t.halb.idx] = t.halb.freq;
});

// ── Audio ─────────────────────────────────────────────────────────────────────
var _ctx = null;
function getCtx(){
  if(!_ctx){ try{ _ctx = new(window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
  return _ctx;
}
function spieleTon(freq, dauerSek){
  dauerSek = dauerSek || 0.7;
  try{
    var ctx = getCtx(); if(!ctx) return;
    var o1 = ctx.createOscillator(), g1 = ctx.createGain();
    var o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o1.connect(g1); g1.connect(ctx.destination);
    o2.connect(g2); g2.connect(ctx.destination);
    o1.type = "sine";
    o1.frequency.setValueAtTime(freq, ctx.currentTime);
    g1.gain.setValueAtTime(0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(0.52, ctx.currentTime + 0.008);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dauerSek);
    o2.type = "sine";
    o2.frequency.setValueAtTime(freq * 2.76, ctx.currentTime);
    g2.gain.setValueAtTime(0, ctx.currentTime);
    g2.gain.linearRampToValueAtTime(0.11, ctx.currentTime + 0.005);
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dauerSek * 0.4);
    o1.start(ctx.currentTime); o1.stop(ctx.currentTime + dauerSek + 0.05);
    o2.start(ctx.currentTime); o2.stop(ctx.currentTime + dauerSek * 0.4 + 0.05);
  }catch(e){}
}

// ── Tasten bauen ──────────────────────────────────────────────────────────────
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
var keyElMap = {}; // tonIdx → DOM-Element

function bindTaste(el, freq, tonIdx){
  function aktiviere(){
    el.classList.add("playing");
    spieleTon(freq, 0.85);
    setTimeout(function(){ el.classList.remove("playing"); }, 320);
  }
  el.addEventListener("click", aktiviere);
  var timer = null;
  function start(){
    if(timer) return;
    el.classList.add("dwell-active");
    timer = setTimeout(function(){ timer=null; aktiviere(); }, dwellMs);
  }
  function stop(){
    if(timer){ clearTimeout(timer); timer=null; }
    el.classList.remove("dwell-active");
  }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
  if(tonIdx !== undefined) keyElMap[tonIdx] = el;
}

var xyloWrap = document.getElementById("xyloWrap");
TASTEN.forEach(function(t){
  var row = document.createElement("div");
  row.className = "key-row";

  // Ganztontaste
  var key = document.createElement("div");
  key.className = "key";
  key.style.background = t.farbe;
  key.style.width = t.breite;
  key.style.alignSelf = "flex-start";
  key.innerHTML = "<span class='key-label'>" + t.label + "</span>" +
                  "<span class='key-note'>" + t.note + "</span>";
  bindTaste(key, t.freq, t.idx);
  row.appendChild(key);

  // Halbtontaste oder Platzhalter
  if(t.halb){
    var half = document.createElement("div");
    half.className = "key-half";
    half.style.background = t.farbe;
    half.innerHTML = "<span class='key-half-label'>" + t.halb.label + "</span>";
    bindTaste(half, t.halb.freq, t.halb.idx);
    row.appendChild(half);
  } else {
    var sp = document.createElement("div");
    sp.className = "key-half-spacer";
    row.appendChild(sp);
  }

  xyloWrap.appendChild(row);
});

// ── Lieder ────────────────────────────────────────────────────────────────────
// Noten: [tonIdx, dauerFaktor]
// dauerFaktor: 0.5=Achtel, 1=Viertel, 1.5=Punkt.Viertel, 2=Halbe, 3=Punkt.Halbe/Ganze
// Halbtöne: C#=8, D#=9, F#=10, G#=11, A#=12

var LIEDER = [
  {
    emoji:"🦆", titel:"Alle meine Entchen", bpm:170,
    // C D E F | G(2) | A A A A G(2) | A A A A G(2) | F F F F E E | G G G G C(4)
    noten:[
      [0,1],[1,1],[2,1],[3,1],
      [4,2],
      [5,1],[5,1],[5,1],[5,1],[4,2],
      [5,1],[5,1],[5,1],[5,1],[4,2],
      [3,1],[3,1],[3,1],[3,1],[2,1],[2,1],
      [4,1],[4,1],[4,1],[4,1],[0,4]
    ]
  },
  {
    emoji:"🧒", titel:"Hänschen klein", bpm:160,
    // G E(2) E(2) | F D(2) D(2) | C D E F G(2) G(2) | G E(2) E(2) | F D(2) D(2) | C E G(2) G(2) C(4)
    noten:[
      [4,1],[2,2],[2,1],
      [3,1],[1,2],[1,1],
      [0,1],[1,1],[2,1],[3,1],[4,2],[4,2],
      [4,1],[2,2],[2,1],
      [3,1],[1,2],[1,1],
      [0,1],[2,1],[4,2],[4,2],[0,4]
    ]
  },
  {
    emoji:"🎄", titel:"Nikolaus", bpm:155,
    noten:[
      [0,1],[0,1],[0,1],
      [1,1],[2,1],[1,1],
      [2,1],[3,1],[2,1],[1,1],
      [0,1],[0,1],[0,1],
      [1,1],[2,1],[1,1],
      [2,1],[4,1],[2,1],[0,1],
      [5,1],[5,1],[5,1],
      [4,1],[4,1],[4,1],
      [3,1],[4,1],[3,1],[2,1],
      [0,1],[0,1],[0,1],
      [1,1],[2,1],[1,1],
      [2,1],[4,1],[0,2],[0,2]
    ]
  },
  {
    emoji:"🐻", titel:"Gute Nacht", bpm:115,
    // Guten Abend, gute Nacht — Walzertakt, echte Notenlängen
    noten:[
      [4,1],[2,2],
      [4,1],[2,2],
      [4,1.5],[5,0.5],[4,1],
      [3,1],[1,2],
      [3,1],[1,2],
      [3,1.5],[4,0.5],[3,1],
      [2,1],[4,1],[0,1],
      [2,1],[1,1],[1,1],
      [1,1.5],[2,0.5],[1,1],
      [0,1],[1,1],[2,1],[3,1],
      [4,2],[4,1],
      [4,3]
    ]
  },
  {
    emoji:"🌞", titel:"Auf der Mauer", bpm:160,
    noten:[
      [2,1],[2,1],[4,1],[4,1],[2,1],[2,1],[0,2],
      [2,1],[2,1],[4,1],[4,1],[2,1],[2,1],[0,2],
      [4,1],[4,1],[5,1],[5,1],[4,1],[2,1],
      [4,1],[4,1],[5,1],[5,1],[4,1],[2,1],
      [2,1],[2,1],[4,1],[4,1],[2,1],[2,1],[0,4]
    ]
  },
  {
    emoji:"🎂", titel:"Happy Birthday", bpm:150,
    // echte Rhythmik: Achtel Achtel Viertel Viertel Punkt.Viertel ...
    noten:[
      [0,0.5],[0,0.5],[1,1],[0,1],[3,1.5],[2,2],
      [0,0.5],[0,0.5],[1,1],[0,1],[4,1.5],[3,2],
      [0,0.5],[0,0.5],[7,1],[5,1],[3,1],[2,1],[1,2],
      [12,0.5],[12,0.5],[5,1],[3,1],[4,1.5],[3,3]
    ]
  }
];

var _spielTimer = [];
var _aktivLied  = -1;

function stopLied(){
  _spielTimer.forEach(function(id){ clearTimeout(id); });
  _spielTimer = [];
  document.querySelectorAll(".liedBtn").forEach(function(b){ b.classList.remove("playing"); });
  Object.keys(keyElMap).forEach(function(k){ keyElMap[k].classList.remove("playing"); });
  _aktivLied = -1;
}

function spieleLied(idx){
  if(_aktivLied === idx){ stopLied(); return; }
  stopLied();
  _aktivLied = idx;
  var lied   = LIEDER[idx];
  var viMs   = Math.round(60000 / lied.bpm); // Viertelnotendauer in ms
  var btn    = document.getElementById("liedBtn_" + idx);
  if(btn) btn.classList.add("playing");

  var t = 0;
  lied.noten.forEach(function(n, i){
    var tonIdx  = n[0];
    var dFaktor = n[1];
    var dauerMs = Math.round(dFaktor * viMs);
    var dauerSek= dFaktor * viMs / 1000;

    (function(offset, tIdx, dMs, dSek, isLast){
      var id = setTimeout(function(){
        if(_aktivLied !== idx) return;
        var f = FREQ[tIdx];
        if(f) spieleTon(f, dSek * 0.86);
        var el = keyElMap[tIdx];
        if(el){
          el.classList.add("playing");
          setTimeout(function(){ el.classList.remove("playing"); }, dMs * 0.72);
        }
        if(isLast){
          var endId = setTimeout(function(){
            if(btn) btn.classList.remove("playing");
            _aktivLied = -1;
          }, dMs + 200);
          _spielTimer.push(endId);
        }
      }, offset);
      _spielTimer.push(id);
    })(t, tonIdx, dauerMs, dauerSek, i === lied.noten.length - 1);

    t += dauerMs;
  });
}

// Lied-Buttons bauen
var liedBtns = document.getElementById("liedBtns");
LIEDER.forEach(function(lied, idx){
  var btn = document.createElement("button");
  btn.className = "liedBtn";
  btn.id = "liedBtn_" + idx;
  btn.innerHTML = "<span class='lied-emoji'>" + lied.emoji + "</span><span>" + lied.titel + "</span>";
  btn.addEventListener("click", function(){ spieleLied(idx); });
  var timer = null;
  function start(){ if(timer) return; btn.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; btn.click(); }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } btn.classList.remove("dwell-active"); }
  btn.addEventListener("pointerenter", start);
  btn.addEventListener("pointerleave", stop);
  btn.addEventListener("mouseenter", start);
  btn.addEventListener("mouseleave", stop);
  btn.addEventListener("click", stop);
  liedBtns.appendChild(btn);
});

// ── Navigation ────────────────────────────────────────────────────────────────
var returnUrl = localStorage.getItem("laetitia_return_url_musik") ||
  new URL("./musik_machen.html", window.location.href).href;
document.getElementById("btnZurueck").href = returnUrl;

(function(){
  var el = document.getElementById("btnZurueck");
  var timer = null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; try{el.click();}catch(e){} }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
  el.addEventListener("click", stop);
})();

document.addEventListener("pointerdown", function w(){ getCtx(); document.removeEventListener("pointerdown",w); },{once:true});
document.addEventListener("click",       function w(){ getCtx(); document.removeEventListener("click",w); },      {once:true});
