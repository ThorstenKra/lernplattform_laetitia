// melodie_maler_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Konfiguration ──────────────────────────────────────────────────────────────
var COLS = 16; // Zeit-Achse (Spalten)

// Tonhöhen (Pentatonik C-Dur, 8 Zeilen — tiefste Zeile unten)
var NOTES = [
  { label:"Do",  freq:523.25 },
  { label:"Re",  freq:587.33 },
  { label:"Mi",  freq:659.25 },
  { label:"Fa",  freq:698.46 },
  { label:"Sol", freq:784.00 },
  { label:"La",  freq:880.00 },
  { label:"Si",  freq:987.77 },
  { label:"Do'", freq:1046.50}
];
var ROWS = NOTES.length; // 8

// Farben (eine pro Zeile + Radiergummi)
var FARBEN = [
  { hex:"#ef4444", name:"Rot"   },
  { hex:"#f97316", name:"Orange"},
  { hex:"#eab308", name:"Gelb"  },
  { hex:"#22c55e", name:"Grün"  },
  { hex:"#06b6d4", name:"Cyan"  },
  { hex:"#3b82f6", name:"Blau"  },
  { hex:"#8b5cf6", name:"Lila"  },
  { hex:"#ec4899", name:"Pink"  }
];

// Zustand: grid[row][col] = farbHex | null
var grid = [];
for(var r=0;r<ROWS;r++){
  grid.push([]);
  for(var c=0;c<COLS;c++) grid[r].push(null);
}

var aktiveFarbe = null; // null = Radiergummi
var bpm = 80;
var playing = false;
var currentCol = -1;
var intervalId = null;
var audioCtx = null;
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

// ── Audio ──────────────────────────────────────────────────────────────────────
function getCtx(){
  if(!audioCtx){
    try{ audioCtx = new(window.AudioContext||window.webkitAudioContext)(); }catch(e){}
  }
  if(audioCtx && audioCtx.state==="suspended") audioCtx.resume();
  return audioCtx;
}

function spieleNote(freq, farbe){
  var ctx = getCtx();
  if(!ctx) return;
  var t = ctx.currentTime;

  var osc  = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0, t);
  gain.gain.linearRampToValueAtTime(0.45, t+0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t+0.45);
  osc.start(t);
  osc.stop(t+0.5);
}

// ── Sequencer ──────────────────────────────────────────────────────────────────
function tick(){
  currentCol = (currentCol + 1) % COLS;
  updateColHighlight();

  var ctx = getCtx();
  for(var r=0; r<ROWS; r++){
    var farbe = grid[r][currentCol];
    if(farbe){
      spieleNote(NOTES[r].freq, farbe);
    }
  }
}

function updateColHighlight(){
  document.querySelectorAll(".cell.current-col").forEach(function(el){
    el.classList.remove("current-col");
  });
  document.querySelectorAll(".cell[data-col='"+currentCol+"']").forEach(function(el){
    el.classList.add("current-col");
  });
}

function startPlay(){
  if(playing) return;
  getCtx();
  playing = true;
  currentCol = -1;
  var ms = Math.round(60000 / bpm / 4);
  intervalId = setInterval(tick, ms);
  document.getElementById("btnPlay").textContent = "⏹ Stop";
  document.getElementById("btnPlay").classList.add("active");
}
function stopPlay(){
  if(!playing) return;
  playing = false;
  clearInterval(intervalId);
  intervalId = null;
  currentCol = -1;
  updateColHighlight();
  document.getElementById("btnPlay").textContent = "▶ Start";
  document.getElementById("btnPlay").classList.remove("active");
}

// ── Raster bauen ───────────────────────────────────────────────────────────────
var cellEls = []; // cellEls[row][col]

function buildGrid(){
  var wrap = document.getElementById("gridWrap");
  var labWrap = document.getElementById("noteLabels");
  wrap.innerHTML = "";
  labWrap.innerHTML = "";
  cellEls = [];

  for(var r=0; r<ROWS; r++){
    cellEls.push([]);

    // Label
    var lab = document.createElement("div");
    lab.className = "noteLabel";
    lab.textContent = NOTES[r].label;
    labWrap.appendChild(lab);

    // Zeile
    var rowEl = document.createElement("div");
    rowEl.className = "gridRow";
    rowEl.style.gridTemplateColumns = "repeat("+COLS+", 1fr)";

    for(var c=0; c<COLS; c++){
      (function(row, col){
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-col", col);

        function mal(){
          if(aktiveFarbe){
            // Malen
            grid[row][col] = aktiveFarbe;
            cell.style.background = aktiveFarbe;
            cell.style.setProperty("--cell-color", aktiveFarbe);
            cell.classList.add("on");
          } else {
            // Radiergummi
            grid[row][col] = null;
            cell.style.background = "";
            cell.classList.remove("on");
          }
        }

        cell.addEventListener("click", function(){
          mal();
          // Vorschau-Ton beim Malen
          if(aktiveFarbe) spieleNote(NOTES[row].freq, aktiveFarbe);
        });

        // Dwell
        var timer = null;
        function start(){
          if(timer) return;
          cell.classList.add("dwell-active");
          timer = setTimeout(function(){
            timer = null;
            cell.classList.remove("dwell-active");
            mal();
            if(aktiveFarbe) spieleNote(NOTES[row].freq, aktiveFarbe);
          }, dwellMs);
        }
        function stop(){
          if(timer){ clearTimeout(timer); timer=null; }
          cell.classList.remove("dwell-active");
        }
        cell.addEventListener("pointerenter", start);
        cell.addEventListener("pointerleave", stop);
        cell.addEventListener("mouseenter", start);
        cell.addEventListener("mouseleave", stop);

        rowEl.appendChild(cell);
        cellEls[row].push(cell);
      })(r, c);
    }
    wrap.appendChild(rowEl);
  }
}

function updateGridUI(){
  for(var r=0; r<ROWS; r++){
    for(var c=0; c<COLS; c++){
      var farbe = grid[r][c];
      var cell = cellEls[r][c];
      if(!cell) continue;
      if(farbe){
        cell.style.background = farbe;
        cell.style.setProperty("--cell-color", farbe);
        cell.classList.add("on");
      } else {
        cell.style.background = "";
        cell.classList.remove("on");
      }
    }
  }
}

// ── Farb-Palette bauen ─────────────────────────────────────────────────────────
function buildPalette(){
  var wrap = document.getElementById("paletteWrap");
  wrap.style.display = "flex";
  wrap.style.gap = "6px";
  wrap.style.alignItems = "center";
  FARBEN.forEach(function(f, i){
    var btn = document.createElement("button");
    btn.className = "pBtn";
    btn.style.background = f.hex;
    btn.title = f.name;

    function waehle(){
      aktiveFarbe = f.hex;
      document.querySelectorAll(".pBtn").forEach(function(b){ b.classList.remove("selected"); });
      document.getElementById("btnEraser").classList.remove("selected");
      btn.classList.add("selected");
    }

    btn.addEventListener("click", waehle);
    // Dwell
    var timer = null;
    function start(){ if(timer) return; btn.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; btn.click(); }, dwellMs); }
    function stop(){ if(timer){ clearTimeout(timer); timer=null; } btn.classList.remove("dwell-active"); }
    btn.addEventListener("pointerenter", start);
    btn.addEventListener("pointerleave", stop);
    btn.addEventListener("mouseenter", start);
    btn.addEventListener("mouseleave", stop);
    btn.addEventListener("click", stop);

    wrap.appendChild(btn);
  });
}

// Radiergummi
(function(){
  var btn = document.getElementById("btnEraser");
  btn.addEventListener("click", function(){
    aktiveFarbe = null;
    document.querySelectorAll(".pBtn").forEach(function(b){ b.classList.remove("selected"); });
    btn.classList.add("selected");
  });
  var timer = null;
  function start(){ if(timer) return; btn.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; btn.click(); }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } btn.classList.remove("dwell-active"); }
  btn.addEventListener("pointerenter", start);
  btn.addEventListener("pointerleave", stop);
  btn.addEventListener("mouseenter", start);
  btn.addEventListener("mouseleave", stop);
  btn.addEventListener("click", stop);
})();

// ── Vorlagen ───────────────────────────────────────────────────────────────────
// Zeilen: 0=Do(tief) ... 7=Do'(hoch), Spalten 0–15
var VORLAGEN = {
  bogen: function(){
    // Melodie steigt auf, dann ab — Regenbogen-Kurve
    var kurve = [0,1,2,3,4,5,6,7,7,6,5,4,3,2,1,0];
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) grid[r][c]=null;
    kurve.forEach(function(row, col){
      grid[row][col] = FARBEN[row].hex;
    });
  },
  welle: function(){
    // Sinus-artige Welle
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) grid[r][c]=null;
    var sinus = [3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4];
    sinus.forEach(function(row, col){
      grid[row][col] = FARBEN[row].hex;
    });
  },
  treppe: function(){
    // Aufsteigende Stufen: 2 Noten pro Zeile
    for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) grid[r][c]=null;
    var stufen = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
    stufen.forEach(function(row, col){
      grid[row][col] = FARBEN[row].hex;
    });
  }
};

function ladeVorlage(name){
  stopPlay();
  VORLAGEN[name]();
  updateGridUI();
  startPlay();
}

// ── Buttons binden ─────────────────────────────────────────────────────────────
function bindBtn(id, fn){
  var el = document.getElementById(id);
  if(!el) return;
  var timer = null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; fn(); }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("click", fn);
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
}

bindBtn("btnPlay", function(){ if(playing) stopPlay(); else startPlay(); });
bindBtn("btnClear", function(){
  stopPlay();
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) grid[r][c]=null;
  updateGridUI();
});
bindBtn("btnTempoDown", function(){
  bpm = Math.max(40,bpm-10);
  document.getElementById("tempoVal").textContent = bpm+" BPM";
  if(playing){ stopPlay(); startPlay(); }
});
bindBtn("btnTempoUp", function(){
  bpm = Math.min(200,bpm+10);
  document.getElementById("tempoVal").textContent = bpm+" BPM";
  if(playing){ stopPlay(); startPlay(); }
});
bindBtn("btnVorl1", function(){ ladeVorlage("bogen"); });
bindBtn("btnVorl2", function(){ ladeVorlage("welle"); });
bindBtn("btnVorl3", function(){ ladeVorlage("treppe"); });

// Zurück
var returnUrl = localStorage.getItem("laetitia_return_url_musik") ||
  new URL("./musik_machen.html", window.location.href).href;
bindBtn("btnZurueck", function(){ stopPlay(); location.href = returnUrl; });
document.getElementById("btnBack").addEventListener("click", function(){ stopPlay(); location.href = returnUrl; });
(function(){
  var el = document.getElementById("btnBack");
  var timer = null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; el.click(); }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
})();

// AudioContext aufwecken
document.addEventListener("pointerdown", function w(){ getCtx(); document.removeEventListener("pointerdown",w); },{once:true});
document.addEventListener("click",       function w(){ getCtx(); document.removeEventListener("click",w);       },{once:true});

// ── Init ───────────────────────────────────────────────────────────────────────
buildPalette();
buildGrid();
// Erste Farbe vorwählen
document.querySelector(".pBtn").click();
