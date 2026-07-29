// labyrinth_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Level-Definitionen ────────────────────────────────────────────────────────
// Raster: W=Wand, _=frei, S=Start, Z=Ziel
// Level 1–2: sehr einfach, Level 3–4: mittel, Level 5: herausfordernd

var LEVEL = [

  // Level 1 — 6 Schritte, 7×5
  { titel:"Level 1", cols:7, rows:5, karte:[
    "WWWWWWW",
    "WS____W",
    "WWWW__W",
    "W____ZW",
    "WWWWWWW"
  ]},

  // Level 2 — 9 Schritte, 8×6
  { titel:"Level 2", cols:8, rows:6, karte:[
    "WWWWWWWW",
    "WS___WWW",
    "W_WWWWWW",
    "W______W",
    "WWWWWW_W",
    "W_____ZW"
  ]},

  // Level 3 — 17 Schritte, 9×7
  { titel:"Level 3", cols:9, rows:7, karte:[
    "WWWWWWWWW",
    "WS_W____W",
    "W_WW_WW_W",
    "W____W__W",
    "WWWW_W_WW",
    "W____W__W",
    "WWWWWWWZW"
  ]},

  // Level 4 — 27 Schritte, 10×9 (Schlangenweg)
  { titel:"Level 4", cols:10, rows:9, karte:[
    "WWWWWWWWWW",
    "WS_______W",
    "WWWWWWWW_W",
    "W________W",
    "W_WWWWWWWW",
    "W________W",
    "WWWWWWWW_W",
    "W_______ZW",
    "WWWWWWWWWW"
  ]},

  // Level 5 — 19 Schritte, 11×9
  { titel:"Level 5", cols:11, rows:9, karte:[
    "WWWWWWWWWWW",
    "WS_W_____WW",
    "W_WW_WWWW_W",
    "W___W_W___W",
    "WWW_W_W_W_W",
    "W___W___W_W",
    "W_WWWWWWW_W",
    "W_________W",
    "WWWWWWWWWZW"
  ]}

];

// ── Zustand ───────────────────────────────────────────────────────────────────
var aktLevelIdx = 0;
var spielerR = 0, spielerC = 0;
var schritte = 0;
var levelFertig = [false,false,false,false,false];
var karte = [];        // 2D-Array: "W" | "_" | "S" | "Z"
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

// ── DOM ───────────────────────────────────────────────────────────────────────
var brett      = document.getElementById("brett");
var elSchritte = document.getElementById("schritte");
var overlay    = document.getElementById("overlay");
var ovEmoji    = document.getElementById("ovEmoji");
var ovTitle    = document.getElementById("ovTitle");
var ovSterne   = document.getElementById("ovSterne");
var ovSub      = document.getElementById("ovSub");
var ovWeiter   = document.getElementById("ovWeiter");
var ovNochmal  = document.getElementById("ovNochmal");
var levelDots  = document.getElementById("levelDots");
var konfettiWrap = document.getElementById("konfettiWrap");

var DIRS = {
  oben:   { dr:-1, dc: 0, btn:"btnOben",  bar:"barOben"  },
  unten:  { dr: 1, dc: 0, btn:"btnUnten", bar:"barUnten" },
  links:  { dr: 0, dc:-1, btn:"btnLinks", bar:"barLinks" },
  rechts: { dr: 0, dc: 1, btn:"btnRechts",bar:"barRechts"}
};

// ── Level laden ───────────────────────────────────────────────────────────────
function ladeLevel(idx){
  aktLevelIdx = idx;
  schritte = 0;
  elSchritte.textContent = "0";
  var lv = LEVEL[idx];

  // Karte parsen
  karte = [];
  for(var r=0; r<lv.rows; r++){
    karte.push(lv.karte[r].split(""));
  }

  // Startposition finden
  for(var r=0; r<lv.rows; r++){
    for(var c=0; c<lv.cols; c++){
      if(karte[r][c]==="S"){ spielerR=r; spielerC=c; }
    }
  }

  // Brett aufbauen
  brett.style.gridTemplateColumns = "repeat("+lv.cols+", var(--cell))";
  brett.style.gridTemplateRows    = "repeat("+lv.rows+", var(--cell))";
  zeichneBrett();
  aktualisiereRichtungen();
  aktualisiereLevelDots();
  overlay.classList.remove("show");
  // Audio: Level-Jingle + Ambience starten
  spieleLevelStart(idx);
  starteAmbience();
}

// ── Brett zeichnen ────────────────────────────────────────────────────────────
function zeichneBrett(){
  brett.innerHTML = "";
  var lv = LEVEL[aktLevelIdx];
  for(var r=0; r<lv.rows; r++){
    for(var c=0; c<lv.cols; c++){
      var z = document.createElement("div");
      z.className = "zelle";
      var typ = karte[r][c];
      if(typ==="W"){
        z.classList.add("wand");
      } else if(r===spielerR && c===spielerC){
        z.classList.add("spieler");
        z.textContent = "🐭";
      } else if(typ==="Z"){
        z.classList.add("ziel");
        z.textContent = "🧀";
      } else {
        z.classList.add("frei");
      }
      brett.appendChild(z);
    }
  }
}

// ── Bewegung ──────────────────────────────────────────────────────────────────
function kannBewegen(dir){
  var d = DIRS[dir];
  var nr = spielerR + d.dr;
  var nc = spielerC + d.dc;
  var lv = LEVEL[aktLevelIdx];
  if(nr<0||nr>=lv.rows||nc<0||nc>=lv.cols) return false;
  return karte[nr][nc] !== "W";
}

function bewege(dir){
  if(!kannBewegen(dir)) return;
  var d = DIRS[dir];
  var lv = LEVEL[aktLevelIdx];
  var zielErreicht = (lv.karte[spielerR + d.dr][spielerC + d.dc] === "Z");
  // Spur markieren (nur freie Felder, nicht Ziel)
  if(karte[spielerR][spielerC] !== "S") karte[spielerR][spielerC] = ".";
  spielerR += d.dr;
  spielerC += d.dc;
  schritte++;
  elSchritte.textContent = String(schritte);
  // Schritt-Ton
  if(!zielErreicht) spieleSchritt();
  zeichneBrett();
  aktualisiereRichtungen();
  // Nähe zum Ziel prüfen und ggf. Ping + Herzschlag
  if(!zielErreicht){
    var dist = berechneManhattan();
    if(dist <= 3) spieleNaehePing(dist);
    aktualisiereNaehe();
  }
  if(zielErreicht) zeigeSieg();
}

// ── Richtungs-Buttons aktualisieren ──────────────────────────────────────────
function aktualisiereRichtungen(){
  Object.keys(DIRS).forEach(function(dir){
    var btn = document.getElementById(DIRS[dir].btn);
    var frei = kannBewegen(dir);
    btn.classList.toggle("frei", frei);
    btn.classList.toggle("wand", !frei);
    // Dwell nur auf freie Buttons
    btn._kannBewegen = frei;
  });
}

// ── Audio-System ──────────────────────────────────────────────────────────────
var _ac = null;
function getAC(){
  if(!_ac){ try{ _ac=new(window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
  if(_ac&&_ac.state==="suspended") _ac.resume();
  return _ac;
}

// Lautstärke aus Einstellungen (10%–80%, default 60%)
function getLautstaerke(){
  return (parseInt(localStorage.getItem("laetitia_lautstaerke")) || 60) / 100;
}

// ── Schritt-Ton ───────────────────────────────────────────────────────────────
// Kurzes perkussives Klack — Tonhöhe steigt sanft mit Fortschritt
var _schrittBasis = 180; // Hz, steigt pro Schritt leicht
function spieleSchritt(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.55;
  var t = ac.currentTime;
  // Zwei Schichten: kurzer Noise-Burst + tiefer Sinuston
  // Noise (Schritt auf Stein)
  var bufLen = Math.floor(ac.sampleRate * 0.04);
  var buf = ac.createBuffer(1, bufLen, ac.sampleRate);
  var data = buf.getChannelData(0);
  for(var i=0;i<bufLen;i++) data[i]=(Math.random()*2-1)*Math.pow(1-i/bufLen,3);
  var src = ac.createBufferSource();
  src.buffer = buf;
  var hpf = ac.createBiquadFilter();
  hpf.type="bandpass"; hpf.frequency.value=400; hpf.Q.value=0.8;
  var gn = ac.createGain();
  src.connect(hpf); hpf.connect(gn); gn.connect(ac.destination);
  gn.gain.setValueAtTime(vol*0.7, t);
  gn.gain.exponentialRampToValueAtTime(0.001, t+0.06);
  src.start(t); src.stop(t+0.07);
  // Bodenton — Tonhöhe steigt leicht mit Schritt-Zähler (gibt Fortschrittsgefühl)
  var freq = _schrittBasis + Math.min(schritte * 3, 120);
  var osc = ac.createOscillator();
  var g2  = ac.createGain();
  osc.connect(g2); g2.connect(ac.destination);
  osc.type="sine"; osc.frequency.setValueAtTime(freq, t);
  g2.gain.setValueAtTime(vol*0.4, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t+0.12);
  osc.start(t); osc.stop(t+0.13);
}

// ── Wand-Ton ──────────────────────────────────────────────────────────────────
// Weiches "Bumm" — Laetitia merkt: diese Richtung ist zu
function spieleWand(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.35;
  var t = ac.currentTime;
  var osc = ac.createOscillator();
  var g   = ac.createGain();
  osc.connect(g); g.connect(ac.destination);
  osc.type="sine";
  osc.frequency.setValueAtTime(90, t);
  osc.frequency.exponentialRampToValueAtTime(40, t+0.18);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t+0.20);
  osc.start(t); osc.stop(t+0.22);
}

// ── Dwell-Tick ────────────────────────────────────────────────────────────────
// Leiser Metronom-Tick beim Start eines Dwell (einmal, nicht wiederholt)
function spieleDwellTick(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.18;
  var t = ac.currentTime;
  var osc = ac.createOscillator();
  var g   = ac.createGain();
  osc.connect(g); g.connect(ac.destination);
  osc.type="sine"; osc.frequency.setValueAtTime(880, t);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t+0.04);
  osc.start(t); osc.stop(t+0.05);
}

// ── Nähe-zum-Ziel-Ton ────────────────────────────────────────────────────────
// Sanftes Ping wenn die Maus nah am Käse ist (≤ 3 Felder Manhattan-Distanz)
function berechneManhattan(){
  var lv = LEVEL[aktLevelIdx];
  var zR=-1, zC=-1;
  for(var r=0;r<lv.rows;r++) for(var c=0;c<lv.cols;c++)
    if(lv.karte[r][c]==="Z"){ zR=r; zC=c; }
  return Math.abs(spielerR-zR)+Math.abs(spielerC-zC);
}

function spieleNaehePing(distanz){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * (distanz<=1 ? 0.45 : 0.28);
  var freq = distanz<=1 ? 1047 : 784; // C' oder G
  var t = ac.currentTime;
  var osc = ac.createOscillator();
  var g   = ac.createGain();
  osc.connect(g); g.connect(ac.destination);
  osc.type="triangle"; osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t+0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t+0.35);
  osc.start(t); osc.stop(t+0.4);
}

// ── Level-Start-Jingle ────────────────────────────────────────────────────────
// Kurze aufmunternde Melodie beim Laden eines neuen Levels
function spieleLevelStart(levelIdx){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.32;
  // Steigt mit Level-Nummer: einfach=niedrig, schwer=hoch+lebhafter
  var basis = [262, 294, 330, 349, 392][Math.min(levelIdx, 4)];
  var toene  = [basis, basis*1.25, basis*1.5, basis*2];
  var zeiten = [0, 0.10, 0.20, 0.32];
  var dauern = [0.12, 0.12, 0.12, 0.35];
  toene.forEach(function(freq,i){
    var o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type="triangle";
    o.frequency.setValueAtTime(freq, ac.currentTime+zeiten[i]);
    g.gain.setValueAtTime(0, ac.currentTime+zeiten[i]);
    g.gain.linearRampToValueAtTime(vol, ac.currentTime+zeiten[i]+0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+zeiten[i]+dauern[i]);
    o.start(ac.currentTime+zeiten[i]);
    o.stop(ac.currentTime+zeiten[i]+dauern[i]+0.05);
  });
}

// ── Hintergrund-Ambience ──────────────────────────────────────────────────────
// Sanfte pentatonische Loop — erzeugt Labyrinth-Atmosphäre
var _ambienceNodes = [];
var _ambienceTimer = null;
var _ambienceRunning = false;
var _ambienceNahe = false; // Herzschlag-Modus wenn nah am Ziel

// Pentatonik C-Dur: C D E G A (low)
var _PENTA = [130.81, 146.83, 164.81, 196.00, 220.00,
              261.63, 293.66, 329.63, 392.00, 440.00];

function stopAmbience(){
  _ambienceRunning = false;
  if(_ambienceTimer){ clearTimeout(_ambienceTimer); _ambienceTimer=null; }
  _ambienceNodes.forEach(function(n){ try{n.stop();}catch(e){} });
  _ambienceNodes = [];
}

function spieleAmbienceTon(){
  var ac = getAC(); if(!ac||!_ambienceRunning) return;
  var vol = getLautstaerke() * (_ambienceNahe ? 0.10 : 0.07);
  var t = ac.currentTime;
  // Zufällige Note aus Pentatonik
  var freq = _PENTA[Math.floor(Math.random()*_PENTA.length)];
  var osc = ac.createOscillator();
  var g   = ac.createGain();
  osc.connect(g); g.connect(ac.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t+0.08);
  g.gain.exponentialRampToValueAtTime(0.001, t+1.2);
  osc.start(t); osc.stop(t+1.3);
  _ambienceNodes.push(osc);
  // Altes entfernen
  if(_ambienceNodes.length>6) _ambienceNodes.shift();
  // Nächsten Ton planen — kürzere Abstände wenn nahe am Ziel (Spannung!)
  var naechster = _ambienceNahe
    ? 400 + Math.random()*300   // schneller: Herzschlag-Feeling
    : 1200 + Math.random()*1600; // langsam: mystische Stille
  _ambienceTimer = setTimeout(spieleAmbienceTon, naechster);
}

function starteAmbience(){
  stopAmbience();
  _ambienceRunning = true;
  _ambienceTimer = setTimeout(spieleAmbienceTon, 800);
}

// Herzschlag-Puls wenn sehr nah am Ziel (Distanz ≤ 2)
var _herzschlagTimer = null;
function stopHerzschlag(){
  if(_herzschlagTimer){ clearTimeout(_herzschlagTimer); _herzschlagTimer=null; }
}
function spieleHerzschlag(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.22;
  var t = ac.currentTime;
  // Doppelschlag: lub-dub
  [0, 0.15].forEach(function(offset){
    var o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type="sine"; o.frequency.setValueAtTime(offset===0?80:60, t+offset);
    g.gain.setValueAtTime(0, t+offset);
    g.gain.linearRampToValueAtTime(vol*(offset===0?1:0.7), t+offset+0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t+offset+0.14);
    o.start(t+offset); o.stop(t+offset+0.16);
  });
  _herzschlagTimer = setTimeout(spieleHerzschlag, 700);
}

function aktualisiereNaehe(){
  var dist = berechneManhattan();
  var warNahe = _ambienceNahe;
  _ambienceNahe = (dist <= 3);
  if(dist <= 2 && !warNahe){
    // Nah am Ziel: Herzschlag starten
    stopHerzschlag();
    spieleHerzschlag();
  } else if(dist > 2){
    stopHerzschlag();
  }
}

// ── Sieges-Melodien ───────────────────────────────────────────────────────────
function spieleFreudenmelodie(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.50;
  var toene = [523,659,784,1047,784,1047,1319];
  var zeiten= [0, 0.12, 0.24, 0.36, 0.55, 0.65, 0.78];
  var dauern= [0.25,0.25,0.25,0.45,0.18,0.18,0.6];
  toene.forEach(function(freq,i){
    var o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type="sine";
    o.frequency.setValueAtTime(freq, ac.currentTime+zeiten[i]);
    g.gain.setValueAtTime(0, ac.currentTime+zeiten[i]);
    g.gain.linearRampToValueAtTime(vol, ac.currentTime+zeiten[i]+0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+zeiten[i]+dauern[i]);
    o.start(ac.currentTime+zeiten[i]);
    o.stop(ac.currentTime+zeiten[i]+dauern[i]+0.05);
  });
}

function spieleGrandFinale(){
  var ac = getAC(); if(!ac) return;
  var vol = getLautstaerke() * 0.45;
  var toene = [523,659,784,1047,1319,1047,784,1047,1319,1047,659,784,1047];
  var zeiten= [0,.1,.2,.32,.46,.60,.68,.76,.88,1.0,1.12,1.22,1.35];
  var dauern= [.18,.18,.18,.22,.28,.12,.12,.18,.28,.18,.12,.18,.8];
  toene.forEach(function(freq,i){
    var o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type=(i%3===2)?"triangle":"sine";
    o.frequency.setValueAtTime(freq, ac.currentTime+zeiten[i]);
    g.gain.setValueAtTime(0, ac.currentTime+zeiten[i]);
    g.gain.linearRampToValueAtTime(vol, ac.currentTime+zeiten[i]+0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+zeiten[i]+dauern[i]);
    o.start(ac.currentTime+zeiten[i]);
    o.stop(ac.currentTime+zeiten[i]+dauern[i]+0.05);
  });
}

// ── Konfetti ──────────────────────────────────────────────────────────────────
var _konfettiTimers = [];
function stopKonfetti(){
  _konfettiTimers.forEach(function(id){ clearTimeout(id); });
  _konfettiTimers = [];
  konfettiWrap.innerHTML = "";
}

function starteKonfetti(anzahl, dauerMs){
  stopKonfetti();
  var farben=["#f43f5e","#f97316","#facc15","#22c55e","#06b6d4","#8b5cf6","#ec4899","#3b82f6"];
  for(var i=0; i<anzahl; i++){
    (function(idx){
      var delay = Math.random()*1200;
      var tid = setTimeout(function(){
        var el = document.createElement("div");
        el.className = "kf";
        el.style.left = (Math.random()*100)+"%";
        el.style.background = farben[Math.floor(Math.random()*farben.length)];
        el.style.width  = (8+Math.random()*10)+"px";
        el.style.height = (10+Math.random()*14)+"px";
        el.style.borderRadius = Math.random()>0.5?"50%":"3px";
        var fallDauer = (1.8+Math.random()*2.2).toFixed(2)+"s";
        el.style.animationDuration = fallDauer;
        el.style.animationDelay = "0s";
        konfettiWrap.appendChild(el);
        // Nach Animation entfernen
        var rid = setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, parseFloat(fallDauer)*1000+100);
        _konfettiTimers.push(rid);
      }, delay);
      _konfettiTimers.push(tid);
    })(i);
  }
  // Alles stoppen nach dauerMs
  var stopId = setTimeout(stopKonfetti, dauerMs);
  _konfettiTimers.push(stopId);
}

// ── TTS Lob ───────────────────────────────────────────────────────────────────
function sprichLob(text){
  try{
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var voices = window.speechSynthesis.getVoices();
    var de = voices.find(function(v){ return (v.lang||"").toLowerCase().startsWith("de"); });
    if(de) u.voice = de;
    u.rate=0.88; u.pitch=1.15; u.volume=1.0;
    window.speechSynthesis.speak(u);
  }catch(e){}
}

// ── Stern-Bewertung ───────────────────────────────────────────────────────────
function berechneSterne(schritte, levelIdx){
  // Optimale Schritte pro Level (BFS-Ergebnis)
  var optimal=[6,9,17,27,19];
  var opt = optimal[levelIdx] || schritte;
  var ratio = schritte / opt;
  if(ratio <= 1.2) return 3;   // fast optimal
  if(ratio <= 1.8) return 2;   // gut
  return 1;                     // geschafft!
}

// ── Sieg ─────────────────────────────────────────────────────────────────────
function zeigeSieg(){
  levelFertig[aktLevelIdx] = true;
  aktualisiereLevelDots();
  var istLetztes = aktLevelIdx >= LEVEL.length - 1;
  var sterne = berechneSterne(schritte, aktLevelIdx);

  // Sterne-Anzeige
  ovSterne.textContent = "⭐".repeat(sterne) + (sterne<3 ? "☆".repeat(3-sterne) : "");

  // Texte
  var lobTexte = [
    ["Gut gemacht!", "Super!", "Klasse!"],          // 1 Stern
    ["Sehr gut!", "Toll!", "Prima!"],                // 2 Sterne
    ["Fantastisch!", "Perfekt!", "Wunderbar!"]       // 3 Sterne
  ];
  var lob = lobTexte[sterne-1][Math.floor(Math.random()*3)];

  if(istLetztes){
    ovEmoji.textContent  = "🏆";
    ovTitle.textContent  = "Alle Level geschafft!";
    ovTitle.className    = "ov-title gold";
    ovSub.textContent    = schritte+" Schritte — Du bist eine Heldin! 🌟";
    ovWeiter.textContent = "Nochmal von vorne 🔄";
    ovSterne.textContent = "🏆🌟🏆";
    starteKonfetti(120, 6000);
    spieleGrandFinale();
    sprichLob("Herzlichen Glückwunsch! Du hast alle Level geschafft! Du bist fantastisch!");
  } else {
    ovEmoji.textContent  = sterne===3 ? "🎉" : sterne===2 ? "😊" : "🙂";
    ovTitle.textContent  = lob;
    ovTitle.className    = "ov-title";
    ovSub.textContent    = schritte+" Schritte — "+LEVEL[aktLevelIdx].titel+" gemeistert!";
    ovWeiter.textContent = "Weiter ▶";
    starteKonfetti(sterne===3?80:sterne===2?50:30, 4000);
    spieleFreudenmelodie();
    sprichLob(lob + " " + LEVEL[aktLevelIdx].titel + " geschafft!");
  }

  // Overlay kurz verzögert einblenden (nach Ton-Start)
  stopAmbience();
  stopHerzschlag();
  setTimeout(function(){ overlay.classList.add("show"); }, 180);
}

// ── Level-Dots ────────────────────────────────────────────────────────────────
function aktualisiereLevelDots(){
  levelDots.innerHTML = "";
  LEVEL.forEach(function(lv, i){
    var d = document.createElement("div");
    d.className = "ldot" +
      (levelFertig[i] ? " fertig" : "") +
      (i===aktLevelIdx && !levelFertig[i] ? " aktiv" : "");
    levelDots.appendChild(d);
  });
}

// ── Level-Auswahl-Overlay (einfach: Nochmal startet aktuelles, Weiter nächstes) ─
ovWeiter.addEventListener("click", function(){
  overlay.classList.remove("show");
  stopKonfetti();
  stopAmbience();
  stopHerzschlag();
  try{ window.speechSynthesis.cancel(); }catch(e){}
  var naechstes = (aktLevelIdx >= LEVEL.length-1) ? 0 : aktLevelIdx+1;
  ladeLevel(naechstes);
});
ovNochmal.addEventListener("click", function(){
  overlay.classList.remove("show");
  stopKonfetti();
  stopAmbience();
  stopHerzschlag();
  try{ window.speechSynthesis.cancel(); }catch(e){}
  ladeLevel(aktLevelIdx);
});

// Overlay-Buttons Dwell
[ovWeiter, ovNochmal].forEach(function(btn){
  var timer=null;
  function start(){ if(timer) return; btn.classList.add("dwell-active"); timer=setTimeout(function(){ timer=null; btn.click(); },dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } btn.classList.remove("dwell-active"); }
  btn.addEventListener("pointerenter",start); btn.addEventListener("pointerleave",stop);
  btn.addEventListener("mouseenter",start);   btn.addEventListener("mouseleave",stop);
  btn.addEventListener("click",stop);
});

// ── Dwell auf Richtungs-Buttons ───────────────────────────────────────────────
// Mit sichtbarem Fortschrittsbalken für besseres Feedback
Object.keys(DIRS).forEach(function(dir){
  var d   = DIRS[dir];
  var btn = document.getElementById(d.btn);
  var bar = document.getElementById(d.bar);
  var timer = null;
  var rafId = null;
  var startTime = 0;

  function startDwell(){
    if(!btn._kannBewegen){
      spieleWand(); // kurzes Bumm — Wand erkannt
      return;
    }
    if(timer) return;
    spieleDwellTick(); // leiser Tick beim Dwell-Start
    btn.classList.add("dwell-active");
    startTime = Date.now();

    // Fortschrittsbalken animieren
    function tick(){
      var elapsed = Date.now() - startTime;
      var pct = Math.min(100, (elapsed / dwellMs) * 100);
      bar.style.width = pct + "%";
      if(elapsed < dwellMs) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    timer = setTimeout(function(){
      timer = null;
      bar.style.width = "0%";
      btn.classList.remove("dwell-active");
      if(btn._kannBewegen){
        bewege(dir);
      }
    }, dwellMs);
  }

  function stopDwell(){
    if(timer){ clearTimeout(timer); timer=null; }
    if(rafId){ cancelAnimationFrame(rafId); rafId=null; }
    bar.style.width = "0%";
    btn.classList.remove("dwell-active");
  }

  btn.addEventListener("pointerenter", startDwell);
  btn.addEventListener("pointerleave", stopDwell);
  btn.addEventListener("mouseenter", startDwell);
  btn.addEventListener("mouseleave", stopDwell);
  btn.addEventListener("click", function(){
    stopDwell();
    if(btn._kannBewegen){ bewege(dir); }
  });
});

// ── Level-Wahl Button ─────────────────────────────────────────────────────────
// Einfach: beim Klick zum nächsten unverlockten Level
var _lvIdx = 0;
document.getElementById("btnLevel").addEventListener("click", function(){
  _lvIdx = (_lvIdx + 1) % LEVEL.length;
  ladeLevel(_lvIdx);
});
(function(){
  var el = document.getElementById("btnLevel");
  var timer=null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer=setTimeout(function(){ timer=null; el.click(); },dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter",start); el.addEventListener("pointerleave",stop);
  el.addEventListener("mouseenter",start);   el.addEventListener("mouseleave",stop);
  el.addEventListener("click",stop);
})();

// ── Back-Button ───────────────────────────────────────────────────────────────
(function(){
  var el = document.getElementById("btnBack");
  var timer=null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer=setTimeout(function(){ timer=null; el.click(); },dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter",start); el.addEventListener("pointerleave",stop);
  el.addEventListener("mouseenter",start);   el.addEventListener("mouseleave",stop);
  el.addEventListener("click",function(){
    var url = localStorage.getItem("laetitia_return_url_v1") ||
              new URL("../../spielewelt.html", window.location.href).href;
    window.location.href = url;
  });
})();

// ── Zurück-Button ─────────────────────────────────────────────────────────────
(function(){
  var el = document.getElementById("btnZurueck");
  var url = localStorage.getItem("laetitia_return_url_v1") ||
            new URL("../../spielewelt.html", window.location.href).href;
  el.href = url;
  var timer=null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer=setTimeout(function(){ timer=null; try{el.click();}catch(e){} },dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter",start); el.addEventListener("pointerleave",stop);
  el.addEventListener("mouseenter",start);   el.addEventListener("mouseleave",stop);
  el.addEventListener("click",stop);
})();

// ── Start ─────────────────────────────────────────────────────────────────────
// AudioContext beim ersten Interaktion aufwecken (Browser-Policy)
document.addEventListener("pointerdown", function w(){ getAC(); document.removeEventListener("pointerdown",w); },{once:true});
document.addEventListener("click", function w(){ getAC(); document.removeEventListener("click",w); },{once:true});
// Stimmen vorladen
try{ window.speechSynthesis.getVoices(); }catch(e){}

ladeLevel(0);
