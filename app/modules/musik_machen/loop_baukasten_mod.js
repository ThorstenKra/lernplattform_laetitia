// loop_baukasten_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Konfiguration ──────────────────────────────────────────────────────────
var STEPS = 16;
var ROWS = [
  { label:"Kick 🥁",   color:"var(--c0)", freq:60,  type:"kick"  },
  { label:"Snare 🪘",  color:"var(--c1)", freq:200, type:"snare" },
  { label:"Hi-Hat 🎩", color:"var(--c2)", freq:800, type:"hihat" },
  { label:"Bass 🎸",   color:"var(--c3)", freq:110, type:"bass"  },
  { label:"Glocke 🔔", color:"var(--c4)", freq:880, type:"bell"  },
  { label:"Melodie 🎵",color:"var(--c5)", freq:440, type:"melody"}
];

// Pentatonik-Skala für Melodie (C-Dur Pentatonik)
var PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25,
                  784.00, 880.00, 1046.50, 1174.66];
var melodyNotes = [523.25, 659.25, 784.00, 880.00, 659.25, 523.25, 392.00, 440.00,
                   523.25, 659.25, 523.25, 392.00, 329.63, 392.00, 523.25, 659.25];

var bpm = 90;
var playing = false;
var currentStep = -1;
var intervalId = null;
var audioCtx = null;

// Zustand: grid[row][step] = true/false
var grid = [];
for(var r=0; r<ROWS.length; r++){
  grid.push([]);
  for(var s=0; s<STEPS; s++) grid[r].push(false);
}

// Presets
var PRESETS = [
  // Beat 1: einfacher 4/4
  [[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],  // Kick
   [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],  // Snare
   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],  // Hi-Hat
   [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],  // Bass
   [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0],  // Glocke
   [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0]], // Melodie
  // Beat 2: Latin
  [[1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
   [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
   [1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
   [1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0],
   [0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1],
   [1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0]],
  // Beat 3: sanft
  [[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
   [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
   [1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
   [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0],
   [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0]]
];

// ── Audio ──────────────────────────────────────────────────────────────────
function getAudioCtx(){
  if(!audioCtx){
    try{ audioCtx = new(window.AudioContext||window.webkitAudioContext)(); }catch(e){}
  }
  if(audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playSound(type, freq, when){
  var ctx = getAudioCtx();
  if(!ctx) return;
  var t = when || ctx.currentTime;

  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if(type === "kick"){
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(0.01, t+0.3);
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t+0.3);
    osc.type = "sine";
    osc.start(t); osc.stop(t+0.3);
  } else if(type === "snare"){
    // Noise für Snare
    var bufLen = ctx.sampleRate * 0.15;
    var buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for(var i=0;i<bufLen;i++) data[i] = Math.random()*2-1;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var g2 = ctx.createGain();
    src.connect(g2); g2.connect(ctx.destination);
    g2.gain.setValueAtTime(0.8, t);
    g2.gain.exponentialRampToValueAtTime(0.01, t+0.15);
    src.start(t); src.stop(t+0.15);
    return;
  } else if(type === "hihat"){
    var bufLen2 = ctx.sampleRate * 0.05;
    var buf2 = ctx.createBuffer(1, bufLen2, ctx.sampleRate);
    var data2 = buf2.getChannelData(0);
    for(var i=0;i<bufLen2;i++) data2[i] = Math.random()*2-1;
    var src2 = ctx.createBufferSource();
    src2.buffer = buf2;
    var hpf = ctx.createBiquadFilter();
    hpf.type = "highpass"; hpf.frequency.value = 7000;
    var g3 = ctx.createGain();
    src2.connect(hpf); hpf.connect(g3); g3.connect(ctx.destination);
    g3.gain.setValueAtTime(0.4, t);
    g3.gain.exponentialRampToValueAtTime(0.01, t+0.05);
    src2.start(t); src2.stop(t+0.05);
    return;
  } else if(type === "bass"){
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq*0.5, t+0.25);
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t+0.25);
    osc.type = "sawtooth";
    osc.start(t); osc.stop(t+0.25);
  } else if(type === "bell"){
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t+0.6);
    osc.type = "sine";
    osc.start(t); osc.stop(t+0.6);
  } else if(type === "melody"){
    // Melodie-Zeile nutzt feste Noten pro Schritt
    return; // wird separat behandelt
  } else {
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t+0.3);
    osc.type = "sine";
    osc.start(t); osc.stop(t+0.3);
  }
}

function playMelodyNote(stepIdx, when){
  var ctx = getAudioCtx();
  if(!ctx) return;
  var t = when || ctx.currentTime;
  var freq = melodyNotes[stepIdx % melodyNotes.length];
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = "triangle";
  gain.gain.setValueAtTime(0.4, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t+0.35);
  osc.start(t); osc.stop(t+0.35);
}

// ── Sequencer ──────────────────────────────────────────────────────────────
function tick(){
  currentStep = (currentStep + 1) % STEPS;
  updateCurrentHighlight();

  var ctx = getAudioCtx();
  var now = ctx ? ctx.currentTime : 0;

  for(var r=0; r<ROWS.length; r++){
    if(grid[r][currentStep]){
      if(ROWS[r].type === "melody"){
        playMelodyNote(currentStep, now);
      } else {
        playSound(ROWS[r].type, ROWS[r].freq, now);
      }
    }
  }
}

function updateCurrentHighlight(){
  document.querySelectorAll(".cell.current").forEach(function(el){
    el.classList.remove("current");
  });
  var cols = document.querySelectorAll(".cell[data-step='"+currentStep+"']");
  cols.forEach(function(el){ el.classList.add("current"); });
}

function startLoop(){
  if(playing) return;
  getAudioCtx();
  playing = true;
  currentStep = -1;
  var interval = Math.round(60000 / bpm / 4); // 16tel-Noten
  intervalId = setInterval(tick, interval);
  document.getElementById("btnPlay").textContent = "⏹ Stop";
  document.getElementById("btnPlay").classList.add("active");
}

function stopLoop(){
  if(!playing) return;
  playing = false;
  clearInterval(intervalId);
  intervalId = null;
  currentStep = -1;
  updateCurrentHighlight();
  document.getElementById("btnPlay").textContent = "▶ Start";
  document.getElementById("btnPlay").classList.remove("active");
}

// ── Grid bauen ─────────────────────────────────────────────────────────────
function buildGrid(){
  var wrap = document.getElementById("gridWrap");
  wrap.innerHTML = "";
  ROWS.forEach(function(row, r){
    var rowEl = document.createElement("div");
    rowEl.className = "row";
    var label = document.createElement("div");
    label.className = "rowLabel";
    label.textContent = row.label;
    rowEl.appendChild(label);
    var cells = document.createElement("div");
    cells.className = "cells";
    for(var s=0; s<STEPS; s++){
      (function(step){
        var cell = document.createElement("div");
        cell.className = "cell" + (grid[r][step] ? " on" : "");
        cell.style.setProperty("--row-color", row.color);
        cell.setAttribute("data-row", r);
        cell.setAttribute("data-step", step);

        // Toggle bei Klick
        cell.addEventListener("click", function(){
          grid[r][step] = !grid[r][step];
          cell.classList.toggle("on", grid[r][step]);
          if(grid[r][step]) playSound(row.type, row.freq);
        });

        // Dwell: pointerenter direkt
        var dwellTimer = null;
        cell.addEventListener("pointerenter", function(){
          if(dwellTimer) return;
          cell.classList.add("dwell-active");
          dwellTimer = setTimeout(function(){
            dwellTimer = null;
            grid[r][step] = !grid[r][step];
            cell.classList.toggle("on", grid[r][step]);
            cell.classList.remove("dwell-active");
            if(grid[r][step]) playSound(row.type, row.freq);
          }, dwellMs);
        });
        cell.addEventListener("pointerleave", function(){
          if(dwellTimer){ clearTimeout(dwellTimer); dwellTimer=null; }
          cell.classList.remove("dwell-active");
        });
        cell.addEventListener("mouseenter", function(){
          if(dwellTimer) return;
          cell.classList.add("dwell-active");
          dwellTimer = setTimeout(function(){
            dwellTimer = null;
            grid[r][step] = !grid[r][step];
            cell.classList.toggle("on", grid[r][step]);
            cell.classList.remove("dwell-active");
            if(grid[r][step]) playSound(row.type, row.freq);
          }, dwellMs);
        });
        cell.addEventListener("mouseleave", function(){
          if(dwellTimer){ clearTimeout(dwellTimer); dwellTimer=null; }
          cell.classList.remove("dwell-active");
        });

        cells.appendChild(cell);
      })(s);
    }
    rowEl.appendChild(cells);
    wrap.appendChild(rowEl);
  });
}

function updateGridUI(){
  document.querySelectorAll(".cell").forEach(function(el){
    var r = parseInt(el.getAttribute("data-row"));
    var s = parseInt(el.getAttribute("data-step"));
    el.classList.toggle("on", grid[r][s]);
  });
}

// ── Controls ───────────────────────────────────────────────────────────────
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

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

bindBtn("btnPlay", function(){
  if(playing) stopLoop(); else startLoop();
});

bindBtn("btnClear", function(){
  stopLoop();
  for(var r=0;r<ROWS.length;r++) for(var s=0;s<STEPS;s++) grid[r][s]=false;
  updateGridUI();
});

bindBtn("btnTempoDown", function(){
  bpm = Math.max(40, bpm-10);
  document.getElementById("tempoVal").textContent = bpm+" BPM";
  if(playing){ stopLoop(); startLoop(); }
});

bindBtn("btnTempoUp", function(){
  bpm = Math.min(200, bpm+20);
  document.getElementById("tempoVal").textContent = bpm+" BPM";
  if(playing){ stopLoop(); startLoop(); }
});

// Presets
[1,2,3].forEach(function(n){
  bindBtn("btnPreset"+n, function(){
    var p = PRESETS[n-1];
    for(var r=0;r<ROWS.length;r++) for(var s=0;s<STEPS;s++) grid[r][s]=!!p[r][s];
    updateGridUI();
    if(!playing) startLoop();
  });
});

bindBtn("btnPresetClear", function(){
  for(var r=0;r<ROWS.length;r++) for(var s=0;s<STEPS;s++) grid[r][s]=false;
  updateGridUI();
  stopLoop();
});

// Zurück
var returnUrl = localStorage.getItem("laetitia_return_url_musik") ||
  new URL("./musik_machen.html", window.location.href).href;
bindBtn("btnBack", function(){ stopLoop(); location.href = returnUrl; });

// ── Start ──────────────────────────────────────────────────────────────────
buildGrid();
// Beat 1 als Standard vorladen
(function(){
  var p = PRESETS[0];
  for(var r=0;r<ROWS.length;r++) for(var s=0;s<STEPS;s++) grid[r][s]=!!p[r][s];
  updateGridUI();
})();
