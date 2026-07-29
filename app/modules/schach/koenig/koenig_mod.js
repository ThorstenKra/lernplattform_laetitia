// koenig_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Dwell: core/dwell.js geladen als <script src> (Regel 1) ──────────────
// window.LaetitiaAttachDwell ist synchron verfuegbar nach Script-Load


// ── Storage & State ───────────────────────────────────────────────────────
const STORAGE_KEY = "koenig_v2";
function loadState(){
  try{ const r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; }catch{return null;}
}
function saveState(s){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
function defaultState(){ return {stars:0, bestUnlocked:1, completed:{}, lastLevel:1}; }

let state = loadState() || defaultState();
if(typeof state.bestUnlocked!=="number") state.bestUnlocked=1;
if(!state.completed) state.completed={};
if(typeof state.lastLevel!=="number") state.lastLevel=1;
saveState(state);

// ── Level-Definitionen ────────────────────────────────────────────────────
// Jedes Level hat: Erklärung, Brett-Größe, Start, Ziel, Blöcke, Gegner, MoveLimit
const LEVELS = [
  // ── GRUPPE 1: König bewegen (keine Hindernisse) ──
  {
    id:1, group:"König lernen", name:"Erster Schritt",
    boardSize:4, playerStart:[3,1], goal:[2,2], blocks:[], enemy:null, moveLimit:3,
    tutorial:{
      title:"Der König – Schritt 1",
      text:"Der König ist die wichtigste Figur beim Schach. Er kann auf jedes benachbarte Feld ziehen: nach vorne, hinten, links, rechts oder diagonal.",
      tip:"♔ = König  |  ⭐ = Zielfeld  |  Leuchtendes Feld = möglicher Zug"
    }
  },
  {
    id:2, group:"König lernen", name:"Drei Züge",
    boardSize:4, playerStart:[3,0], goal:[1,2], blocks:[], enemy:null, moveLimit:4,
    tutorial:null
  },
  {
    id:3, group:"König lernen", name:"Zur Ecke",
    boardSize:4, playerStart:[3,3], goal:[0,0], blocks:[], enemy:null, moveLimit:6,
    tutorial:null
  },
  {
    id:4, group:"König lernen", name:"Kürzester Weg",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[], enemy:null, moveLimit:5,
    tutorial:{
      title:"Tipp: Diagonal ist schnell!",
      text:"Der König kann diagonal ziehen. Das ist oft der schnellste Weg.",
      tip:"Tipp: Diagonal von Ecke zu Ecke geht in 3 Zügen!"
    }
  },

  // ── GRUPPE 2: Hindernisse ausweichen ──
  {
    id:5, group:"Hindernisse", name:"Ein Block",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[[2,1]], enemy:null, moveLimit:8,
    tutorial:{
      title:"Hindernisse",
      text:"Manche Felder sind blockiert (■). Der König darf sie nicht betreten. Finde einen Weg drum herum!",
      tip:"■ = blockiertes Feld – nicht betretbar"
    }
  },
  {
    id:6, group:"Hindernisse", name:"Zwei Blöcke",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[[2,1],[1,2]], enemy:null, moveLimit:10,
    tutorial:null
  },
  {
    id:7, group:"Hindernisse", name:"Labyrinth",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[[2,1],[2,2],[1,1]], enemy:null, moveLimit:12,
    tutorial:null
  },
  {
    id:8, group:"Hindernisse", name:"Enger Pfad",
    boardSize:5, playerStart:[4,0], goal:[0,4], blocks:[[3,1],[3,2],[2,3],[1,2],[1,3]], enemy:null, moveLimit:14,
    tutorial:null
  },

  // ── GRUPPE 3: Gegner ausweichen ──
  {
    id:9, group:"Gegner meiden", name:"Gefahr!",
    boardSize:4, playerStart:[3,0], goal:[0,3],
    blocks:[], enemy:{pos:[1,1], symbol:"♛", name:"Feindliche Dame"},
    forbidAdjacent:true, moveLimit:10,
    tutorial:{
      title:"Gegner meiden",
      text:"Es gibt jetzt einen Gegner auf dem Brett (♛). Dein König darf keine Felder betreten, die der Gegner kontrolliert. Diese Felder sind markiert.",
      tip:"Vermeide Felder, die direkt neben dem Gegner liegen (♛)!"
    }
  },
  {
    id:10, group:"Gegner meiden", name:"Zwei Gefahren",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[2,2]], enemy:{pos:[1,1], symbol:"♛", name:"Feindliche Dame"},
    forbidAdjacent:true, moveLimit:14,
    tutorial:null
  },

  // ── GRUPPE 4: Größeres Brett / Planung ──
  {
    id:11, group:"Planung", name:"5×5 Brett",
    boardSize:5, playerStart:[4,0], goal:[0,4], blocks:[], enemy:null, moveLimit:8,
    tutorial:{
      title:"Größeres Brett",
      text:"Jetzt spielen wir auf einem 5×5-Brett. Mehr Felder, mehr Wege!",
      tip:"Plane voraus: Wie viele Schritte brauchst du mindestens?"
    }
  },
  {
    id:12, group:"Planung", name:"5×5 mit Blöcken",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[3,2],[2,1],[2,3],[1,2]], enemy:null, moveLimit:14,
    tutorial:null
  },
  {
    id:13, group:"Planung", name:"Schnellster Weg",
    boardSize:5, playerStart:[4,2], goal:[0,2],
    blocks:[[3,1],[3,3],[2,0],[2,4],[1,1],[1,3]], enemy:null, moveLimit:10,
    tutorial:null
  },
  {
    id:14, group:"Planung", name:"Finale",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[3,1],[2,2],[1,3]], enemy:{pos:[2,4], symbol:"♜", name:"Feindlicher Turm"},
    forbidAdjacent:true, moveLimit:16,
    tutorial:{
      title:"Das große Finale!",
      text:"Alle Fähigkeiten zusammen: Hindernisse ausweichen und den Gegner meiden.",
      tip:"Nutze alle gelernten Tricks!"
    }
  }
];

// ── TTS ───────────────────────────────────────────────────────────────────
function speak(text, rate){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text||""));
    const voices = speechSynthesis.getVoices();
    const de = voices.find(v=>(v.lang||"").toLowerCase().startsWith("de"));
    if(de) u.voice = de;
    u.rate  = rate || 0.95;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  }catch(e){}
}

// ── Dwell: Alias auf zentrale Bibliothek (core/dwell.js) ─────────────────
const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;

let _dwellHandle = null;

// rebindDwell(noProtect) — Dwell neu binden nach jedem render()
// Brett-Zellen: direkt pointerenter/pointerleave (wie Eierjagd) — kein attachDwell
// Buttons: weiter über LaetitiaAttachDwell
function rebindDwell(noProtect){
  // Schutzzeit zurücksetzen
  if(window._LDwellState){
    if(window._LDwellState.dwellTimer){ clearTimeout(window._LDwellState.dwellTimer); window._LDwellState.dwellTimer = null; }
    if(window._LDwellState.leaveTimer){ clearTimeout(window._LDwellState.leaveTimer); window._LDwellState.leaveTimer = null; }
    if(window._LDwellState.target){
      window._LDwellState.target.classList.remove("dwell-active");
      window._LDwellState.target = null;
    }
    window._LDwellState.protectUntil = noProtect ? 0 : Date.now() + 300;
  }

  // ── Brett-Zellen: eigenes Dwell direkt mit pointerenter (wie Eierjagd) ──
  document.querySelectorAll(".cell.active").forEach(function(el){
    if(el.getAttribute("data-ei-dwell") === "1") return;
    el.setAttribute("data-ei-dwell", "1");

    var timer = null;

    function startCellDwell(){
      if(timer) return; // läuft bereits
      el.classList.add("dwell-active");
      // Ring einblenden
      var ring = el.querySelector(".dwell-ring-svg circle");
      if(ring){
        ring.classList.remove("animating");
        void ring.offsetWidth; // Reflow
        ring.style.setProperty("--dwell-duration", (DWELL_MS/1000)+"s");
        ring.classList.add("animating");
      }
      timer = setTimeout(function(){
        timer = null;
        if(typeof el.onclick === "function") el.onclick();
      }, DWELL_MS);
    }

    function stopCellDwell(){
      if(timer){ clearTimeout(timer); timer = null; }
      el.classList.remove("dwell-active");
      var ring = el.querySelector(".dwell-ring-svg circle");
      if(ring) ring.classList.remove("animating");
    }

    el.addEventListener("pointerenter", startCellDwell);
    el.addEventListener("pointerleave", stopCellDwell);
    el.addEventListener("click",        stopCellDwell);
  });

  // data-ei-dwell für statische Buttons zurücksetzen damit sie neu gebunden werden
  document.querySelectorAll("[data-ei-dwell]").forEach(function(el){
    if(!el.classList.contains("cell")) el.removeAttribute("data-ei-dwell");
  });

  // ── Buttons: ebenfalls direkt mit pointerenter (wie Brett-Zellen) ──────
  // data-dwell-bound-Flags von Buttons zurücksetzen
  document.querySelectorAll("[data-dwell-bound]").forEach(function(el){
    if(!el.classList.contains("cell")) el.removeAttribute("data-dwell-bound");
  });

  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };

  var selector = [
    "#btnBack", "#btnPause",
    "#viewRoot .btn:not(:disabled)", "#viewRoot button:not(:disabled)",
    ".overlay .btn:not(:disabled)", ".overlay button:not(:disabled)",
    ".lvlSelectBtn:not(:disabled)",
    "#btnTutOk", "#btnPauseContinue", "#btnLevelSelectClose",
    "#btnZurueckInfo"
  ].join(", ");

  // Alle Buttons direkt mit pointerenter binden
  document.querySelectorAll(selector).forEach(function(el){
    if(el.getAttribute("data-ei-dwell") === "1") return;
    if(el.disabled || el.getAttribute("aria-disabled") === "true") return;
    el.setAttribute("data-ei-dwell", "1");

    var timer = null;

    function startBtnDwell(){
      if(timer) return;
      el.classList.add("dwell-active");
      var ring = el.querySelector(".dwell-ring-svg circle");
      if(ring){
        ring.classList.remove("animating");
        void ring.offsetWidth;
        ring.style.setProperty("--dwell-duration", (DWELL_MS/1000)+"s");
        ring.classList.add("animating");
      }
      timer = setTimeout(function(){
        timer = null;
        try{ el.click(); }catch(e){}
      }, DWELL_MS);
    }

    function stopBtnDwell(){
      if(timer){ clearTimeout(timer); timer = null; }
      el.classList.remove("dwell-active");
      var ring = el.querySelector(".dwell-ring-svg circle");
      if(ring) ring.classList.remove("animating");
    }

    el.addEventListener("pointerenter", startBtnDwell);
    el.addEventListener("pointerleave", stopBtnDwell);
    el.addEventListener("click",        stopBtnDwell);
  });

  // attachDwell noch für den Fallback (mouseenter auf Desktop)
  attach(selector, {
    dwellMs:    DWELL_MS,
    leaveGrace: LEAVE_GRACE,
    onActivate: function(el){
      if(el.disabled) return;
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// initDwell() — leer, rebindDwell() übernimmt alles
function initDwell(){ }

// ── Spiel-State ───────────────────────────────────────────────────────────
let game = null;
const viewRoot = document.getElementById("viewRoot");

function samePos(a,b){ return a[0]===b[0]&&a[1]===b[1]; }
function keyPos(p){ return `${p[0]},${p[1]}`; }
function inBounds(r,c,n){ return r>=0&&c>=0&&r<n&&c<n; }
function clampLevel(id){ return Math.max(1,Math.min(LEVELS.length,id)); }

function getEnemyDanger(enemyPos, n){
  if(!enemyPos) return new Set();
  const danger = new Set();
  const deltas=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  danger.add(keyPos(enemyPos));
  deltas.forEach(([dr,dc])=>{
    const r=enemyPos[0]+dr, c=enemyPos[1]+dc;
    if(inBounds(r,c,n)) danger.add(`${r},${c}`);
  });
  return danger;
}

function legalMoves(fromPos, n, blocksSet, dangerSet, forbidAdjacent){
  const deltas=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  return deltas
    .map(([dr,dc])=>[fromPos[0]+dr, fromPos[1]+dc])
    .filter(([r,c])=>{
      if(!inBounds(r,c,n)) return false;
      if(blocksSet.has(`${r},${c}`)) return false;
      if(forbidAdjacent && dangerSet.has(`${r},${c}`)) return false;
      return true;
    });
}

function startLevel(levelId, skipTutorial){
  const lvl = LEVELS.find(x=>x.id===clampLevel(levelId)) || LEVELS[0];
  state.lastLevel = lvl.id;
  saveState(state);

  game = {
    level:      lvl,
    n:          lvl.boardSize,
    player:     [...lvl.playerStart],
    goal:       [...lvl.goal],
    blocks:     new Set((lvl.blocks||[]).map(keyPos)),
    enemy:      lvl.enemy ? {pos:[...lvl.enemy.pos], symbol:lvl.enemy.symbol} : null,
    forbidAdj:  !!lvl.forbidAdjacent,
    movesMade:  0,
    status:     "playing",
    _hintGiven: false,
    feedback:   {text:"Wähle ein leuchtendes Feld.", kind:""}
  };

  if(!skipTutorial && lvl.tutorial){
    showTutorial(lvl.tutorial, ()=>{ render(); });
  } else {
    render();
    speak(`Level ${lvl.id}: ${lvl.name}. ${lvl.group}.`);
  }
}

function showTutorial(tut, onOk){
  // Einleitungstext deaktiviert -- direkt zum Level
  onOk();
}

function render(){
  const lvl   = game.level;
  const total = LEVELS.length;
  const cur   = lvl.id;
  const pct   = Math.round((cur/total)*100);
  const moveInfo = `Züge: ${game.movesMade} · ⭐ ${state.stars}`;
  const dangerSet = (game.enemy && game.forbidAdj)
    ? getEnemyDanger(game.enemy.pos, game.n)
    : new Set();
  const moves = (game.status==="playing")
    ? legalMoves(game.player, game.n, game.blocks, dangerSet, game.forbidAdj)
    : [];
  const moveSet = new Set(moves.map(keyPos));

  const groupLabel = lvl.group ? lvl.group : "";

  // Rechte Seite befüllen
  viewRoot.innerHTML = `
    <div class="progressWrap">
      <div class="progressTop">
        <div>Level ${cur}/${total}</div>
        <div>${groupLabel}</div>
      </div>
      <div class="bar"><div style="width:${pct}%"></div></div>
      <div class="moveInfo">${moveInfo}</div>
    </div>

    <div class="instruction" id="instruction">${lvl.name}</div>
    <div class="subline" id="subline">Wähle ein leuchtendes Feld.</div>

    <div class="legend">
      <div class="pill gruen"><b>▪</b> Zug möglich</div>
      <div class="pill gold"><b>♔</b> König</div>
      <div class="pill blau"><b>⭐</b> Ziel</div>
      ${game.enemy         ? `<div class="pill rot"><b>${game.enemy.symbol}</b> Gegner</div>` : ""}
      ${game.forbidAdj     ? `<div class="pill rot"><b>⚠</b> Gefahr</div>` : ""}
      ${lvl.blocks?.length ? `<div class="pill"><b>■</b> Block</div>` : ""}
    </div>

    <div class="feedback ${game.feedback.kind}" id="feedback">${game.feedback.text}</div>

    <div class="btn-gruppe">
      <button class="btn green" id="btnNextLevel" ${game.status==="won"?"":"disabled"}>Nächstes ▶</button>
      <button class="btn aktion" id="btnRestart">↺ Neu starten</button>
      <button class="btn aktion" id="btnHint">💡 Tipp</button>
      <button class="btn aktion" id="btnLevels">☰ Alle Level</button>
      <button class="btn aktion" id="btnLevel1">⏮ Level 1</button>
      <button class="btn zurueck" id="btnZurueckInfo">← Zurück</button>
    </div>
  `;

  // Brett aufbauen (separate div#grid)
  const grid = document.getElementById("grid");
  grid.style.gridTemplateColumns = `repeat(${game.n}, 1fr)`;
  grid.style.gridTemplateRows    = `repeat(${game.n}, 1fr)`;
  grid.innerHTML = "";

  for(let r=0; r<game.n; r++){
    for(let c=0; c<game.n; c++){
      const k   = keyPos([r,c]);
      const alt = (r+c)%2===0;
      const isBlock   = game.blocks.has(k);
      const isPlayer  = samePos([r,c], game.player);
      const isGoal    = samePos([r,c], game.goal);
      const isEnemy   = game.enemy && samePos([r,c], game.enemy.pos);
      const isDanger  = game.forbidAdj && dangerSet.has(k) && !isPlayer;
      const isActive  = moveSet.has(k) && game.status==="playing";

      let symbol = "";
      if(isBlock)  symbol = "■";
      if(isGoal)   symbol = "⭐";
      if(isEnemy)  symbol = game.enemy.symbol;
      if(isPlayer) symbol = "♔";

      let cls = "cell";
      if(alt)       cls += " alt";
      if(isActive)  cls += " active";
      else          cls += " inactive";
      if(isPlayer)  cls += " player";
      if(isGoal && !isPlayer) cls += " goal-cell";
      if(isEnemy)   cls += " enemy-cell";

      const cell = document.createElement("div");
      cell.className = cls;
      cell.textContent = symbol;

      if(isDanger && !isBlock && !isEnemy){
        cell.style.background = "rgba(255,80,80,.12)";
        cell.style.borderColor = "rgba(255,80,80,.30)";
        if(!symbol) cell.textContent = "⚠";
        cell.style.opacity = "0.70";
      }

      if(isActive){
        cell.onclick = ()=> makeMove([r,c]);
        // Dwell-Ring-SVG einfügen (wie Eierjagd)
        cell.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/></svg>';
        cell.childNodes[0].insertAdjacentText ? null : null; // kein Text-Reset
        // Symbol als zweites Kind
        if(symbol){
          var sym = document.createElement("span");
          sym.textContent = symbol;
          sym.style.cssText = "position:relative;z-index:1;";
          cell.appendChild(sym);
        }
      }
      grid.appendChild(cell);
    }
  }

  // Font-Größe
  const rect = grid.getBoundingClientRect();
  const fs = Math.max(26, Math.min(64, Math.floor((Math.min(rect.width,rect.height)/game.n)*0.50)));
  grid.querySelectorAll(".cell").forEach(el=> el.style.fontSize = fs+"px");

  // Button-Handler rechte Seite
  document.getElementById("btnLevel1").onclick    = ()=> startLevel(1);
  document.getElementById("btnLevels").onclick    = ()=> openLevelSelect();
  document.getElementById("btnRestart").onclick   = ()=> startLevel(game.level.id, true);
  document.getElementById("btnNextLevel").onclick = ()=>{ if(game.status==="won") startLevel(clampLevel(game.level.id+1)); };
  document.getElementById("btnHint").onclick      = ()=> showHint();
  document.getElementById("btnZurueckInfo").onclick = ()=> location.href = returnUrl;

  rebindDwell(true);
}

function makeMove(pos){
  if(game.status!=="playing") return;
  game.player = [...pos];
  game.movesMade++;

  if(samePos(game.player, game.goal)){
    win();
  } else {
    // Weiches Limit: einmaliger sanfter Hinweis bei doppeltem Limit — kein Abbruch
    const lim = game.level.moveLimit;
    if(lim && game.movesMade === lim + 1 && !game._hintGiven){
      game._hintGiven = true;
      game.feedback = {text:"💡 Tipp: Es gibt einen kürzeren Weg!", kind:""};
      speak("Tipp: Es gibt einen kürzeren Weg!");
    } else if(!game._hintGiven || game.movesMade > lim + 1){
      game.feedback = {text:"Gut! Weiter zum Ziel.", kind:""};
    }
    render();
  }
}

function win(){
  game.status = "won";
  game.feedback = {text:"🎉 Geschafft! Sehr gut!", kind:"good"};
  speak(`Geschafft! Level ${game.level.id} abgeschlossen. Super gemacht!`);

  if(!state.completed[String(game.level.id)]){
    state.completed[String(game.level.id)] = true;
    state.stars++;
  }
  if(game.level.id >= state.bestUnlocked){
    state.bestUnlocked = Math.min(LEVELS.length, game.level.id+1);
  }
  saveState(state);
  render();
}

function showHint(){
  const hints = [
    "Der König zieht immer nur 1 Feld.",
    "Diagonal ist oft der schnellste Weg!",
    "Leuchtendes Feld = erlaubter Zug.",
    "Felder mit ⚠ sind Gefahrenfelder.",
    "Blockierte Felder (■) kann der König nicht betreten."
  ];
  const lvl = game.level;
  let hint = hints[Math.min(lvl.id-1, hints.length-1)];
  game.feedback = {text:"💡 "+hint, kind:""};
  speak(hint);
  render();
}

// ── Level-Auswahl-Overlay ─────────────────────────────────────────────────
function openLevelSelect(){
  const grid = document.getElementById("levelSelectGrid");
  grid.innerHTML = "";

  // Gruppiert anzeigen
  let lastGroup = "";
  LEVELS.forEach(lvl=>{
    if(lvl.group !== lastGroup){
      lastGroup = lvl.group;
      const header = document.createElement("div");
      header.style.cssText = "grid-column:1/-1; font-size:12px; font-weight:900; color:var(--muted); padding:6px 0 2px;";
      header.textContent = lvl.group;
      grid.appendChild(header);
    }
    const locked = lvl.id > state.bestUnlocked;
    const done   = !!state.completed[String(lvl.id)];
    const btn    = document.createElement("button");
    btn.className = "lvlSelectBtn" + (done?" done":"");
    btn.disabled  = locked;
    btn.innerHTML = `
      <span class="lvlNum">${lvl.id}. ${lvl.name}</span>
      <span class="lvlName">${lvl.group}</span>
      ${done ? `<span class="lvlStar">⭐ Abgeschlossen</span>` : ""}
      ${locked ? `<span class="lvlName" style="color:#ff8a8a">🔒 Gesperrt</span>` : ""}
    `;
    btn.onclick = ()=>{
      document.getElementById("overlayLevelSelect").classList.remove("show");
      startLevel(lvl.id);
    };
    grid.appendChild(btn);
  });

  document.getElementById("overlayLevelSelect").classList.add("show");
  setTimeout(rebindDwell, 50);
}

document.getElementById("btnLevelSelectClose").onclick = ()=>{
  document.getElementById("overlayLevelSelect").classList.remove("show");
};

// ── Top-Bar ───────────────────────────────────────────────────────────────
const returnUrl = localStorage.getItem("laetitia_return_url_v1") || "../schach.html";
document.getElementById("btnBack").onclick    = ()=> location.href = returnUrl;
document.getElementById("btnPause").onclick   = ()=> document.getElementById("overlayPause").classList.add("show");
document.getElementById("btnPauseContinue").onclick = ()=>{
  document.getElementById("overlayPause").classList.remove("show");
  rebindDwell();
};

// ── Start ─────────────────────────────────────────────────────────────────
// Stimmen vorladen
try{ speechSynthesis.getVoices(); }catch(e){}

startLevel(state.lastLevel || 1);
initDwell(); // statische Buttons einmalig binden (btnBack, btnPause)
