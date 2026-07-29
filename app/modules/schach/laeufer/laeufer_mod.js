// laeufer_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Storage & State ───────────────────────────────────────────────────────
const STORAGE_KEY = "laeufer_v1";
function loadState(){ try{ const r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; }catch{return null;} }
function saveState(s){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
function defaultState(){ return {stars:0, bestUnlocked:1, completed:{}, lastLevel:1}; }

let state = loadState() || defaultState();
if(typeof state.bestUnlocked!=="number") state.bestUnlocked=1;
if(!state.completed) state.completed={};
if(typeof state.lastLevel!=="number") state.lastLevel=1;
saveState(state);

// ── Level-Definitionen ────────────────────────────────────────────────────
// blocks: [[r,c], ...]   enemy: null (noch nicht eingesetzt)
// Der Läufer zieht NUR diagonal — aber so weit er will!
// Wichtig: Läufer bleibt immer auf derselben Farbe! Das ist ein Lernziel.
const LEVELS = [

  // ── GRUPPE 1: Diagonalen verstehen ──────────────────────────────────────
  {
    id:1, group:"Diagonal lernen", name:"Erste Diagonale",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[], enemy:null, moveLimit:1,
    tutorial:{
      title:"Der Läufer – wie er zieht",
      text:"Der Läufer zieht NUR diagonal — schräg, so weit er will. Er kann niemals gerade ziehen. Schau auf die leuchtenden Felder!",
      tip:"♗ = Läufer  |  ⭐ = Ziel  |  Grüne Felder = mögliche Züge"
    }
  },
  {
    id:2, group:"Diagonal lernen", name:"Andere Richtung",
    boardSize:4, playerStart:[3,3], goal:[0,0], blocks:[], enemy:null, moveLimit:1,
    tutorial:null
  },
  {
    id:3, group:"Diagonal lernen", name:"Kurze Diagonale",
    boardSize:4, playerStart:[3,0], goal:[1,2], blocks:[], enemy:null, moveLimit:1,
    tutorial:{
      title:"Kurze und lange Diagonalen",
      text:"Der Läufer kann einen oder mehrere Schritte diagonal ziehen — er wählt selbst wie weit!",
      tip:"Alle Felder auf der Diagonale leuchten grün."
    }
  },
  {
    id:4, group:"Diagonal lernen", name:"Zwei Züge",
    boardSize:4, playerStart:[3,0], goal:[0,0], blocks:[], enemy:null, moveLimit:2,
    tutorial:{
      title:"Zwei Züge nötig!",
      text:"Manche Felder kann der Läufer nicht in einem Zug erreichen — er bleibt immer auf seiner Feldfarbe!",
      tip:"Erst eine Diagonale, dann zurück auf die andere Seite."
    }
  },
  {
    id:5, group:"Diagonal lernen", name:"Kreuz der Diagonalen",
    boardSize:5, playerStart:[4,0], goal:[0,4], blocks:[], enemy:null, moveLimit:1,
    tutorial:null
  },

  // ── GRUPPE 2: Hindernisse ────────────────────────────────────────────────
  {
    id:6, group:"Hindernisse", name:"Erster Block",
    boardSize:4, playerStart:[3,0], goal:[0,3],
    blocks:[[2,1]], enemy:null, moveLimit:3,
    tutorial:{
      title:"Blöcke auf der Diagonale",
      text:"Blöcke stoppen den Läufer! Er kann nicht über sie hinweg ziehen. Weiche auf eine andere Diagonale aus.",
      tip:"■ = Block — der Läufer muss davor stoppen!"
    }
  },
  {
    id:7, group:"Hindernisse", name:"Zwei Blöcke",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[3,1],[1,3]], enemy:null, moveLimit:3,
    tutorial:null
  },
  {
    id:8, group:"Hindernisse", name:"Engpass",
    boardSize:5, playerStart:[4,0], goal:[0,2],
    blocks:[[3,1],[3,3]], enemy:null, moveLimit:3,
    tutorial:{
      title:"Durch den Engpass",
      text:"Wenn die direkten Diagonalen blockiert sind, braucht der Läufer einen Umweg über mehrere Züge.",
      tip:"Suche eine freie Diagonale als Umweg!"
    }
  },
  {
    id:9, group:"Hindernisse", name:"Viele Blöcke",
    boardSize:6, playerStart:[5,0], goal:[1,4],
    blocks:[[4,1],[3,2],[2,3],[4,3]], enemy:null, moveLimit:4,
    tutorial:null
  },

  // ── GRUPPE 3: Planung ───────────────────────────────────────────────────
  {
    id:10, group:"Planung", name:"Die gleiche Farbe",
    boardSize:5, playerStart:[4,4], goal:[0,4], blocks:[], enemy:null, moveLimit:2,
    tutorial:{
      title:"Wichtige Regel: Feldfarbe!",
      text:"Der Läufer bleibt IMMER auf seiner Feldfarbe. Ein Läufer auf einem hellen Feld kann nie ein dunkles Feld erreichen — egal wie viele Züge!",
      tip:"Achte darauf, welche Farbe das Zielfeld hat."
    }
  },
  {
    id:11, group:"Planung", name:"Umweg planen",
    boardSize:5, playerStart:[4,0], goal:[0,0],
    blocks:[[3,1],[1,1]], enemy:null, moveLimit:4,
    tutorial:null
  },
  {
    id:12, group:"Planung", name:"Drei Züge",
    boardSize:5, playerStart:[4,4], goal:[0,0],
    blocks:[[3,3],[2,2]], enemy:null, moveLimit:3,
    tutorial:null
  },

  // ── GRUPPE 4: Großes Brett ───────────────────────────────────────────────
  {
    id:13, group:"Großes Brett", name:"6×6 Freies Feld",
    boardSize:6, playerStart:[5,0], goal:[0,5], blocks:[], enemy:null, moveLimit:1,
    tutorial:{
      title:"Mehr Raum, mehr Kraft!",
      text:"Auf einem größeren Brett hat der Läufer noch mehr Reichweite. Er zieht immer noch diagonal — jetzt bis zu 5 Felder weit!",
      tip:"Eine lange Diagonale kann das ganze Brett durchqueren."
    }
  },
  {
    id:14, group:"Großes Brett", name:"6×6 mit Blöcken",
    boardSize:6, playerStart:[5,0], goal:[1,4],
    blocks:[[4,1],[3,2],[2,1],[4,3]], enemy:null, moveLimit:4,
    tutorial:null
  },
  {
    id:15, group:"Großes Brett", name:"Das große Finale",
    boardSize:6, playerStart:[5,5], goal:[0,0],
    blocks:[[4,4],[3,3],[4,2],[2,4],[1,3]], enemy:null, moveLimit:4,
    tutorial:{
      title:"Das große Finale!",
      text:"Das schwierigste Läufer-Level. Plane jeden Zug sorgfältig — es gibt einen Weg!",
      tip:"Manchmal muss man einen Umweg nehmen, um ans Ziel zu kommen."
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

// ── Dwell ─────────────────────────────────────────────────────────────────
const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;

function bindPointerDwell(el, onActivate){
  if(el.getAttribute("data-pdwell") === "1") return;
  el.setAttribute("data-pdwell", "1");
  var timer = null;

  function start(){
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
      onActivate(el);
    }, DWELL_MS);
  }
  function stop(){
    if(timer){ clearTimeout(timer); timer = null; }
    el.classList.remove("dwell-active");
    var ring = el.querySelector(".dwell-ring-svg circle");
    if(ring) ring.classList.remove("animating");
  }

  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("click",        stop);
  el.addEventListener("mouseenter", function(){
    if(!el._lastPointer || Date.now() - el._lastPointer > 50) start();
  });
  el.addEventListener("mouseleave", stop);
}

function rebindDwell(noProtect){
  document.querySelectorAll("[data-pdwell]").forEach(function(el){
    if(!el.classList.contains("cell")) el.removeAttribute("data-pdwell");
  });
  // Brett-Zellen
  document.querySelectorAll(".cell.active").forEach(function(el){
    bindPointerDwell(el, function(){
      if(typeof el.onclick === "function") el.onclick();
    });
  });
  // Buttons
  var btnSelector = [
    "#btnBack","#btnPause",
    "#viewRoot .btn:not(:disabled)","#viewRoot button:not(:disabled)",
    ".overlay .btn:not(:disabled)",".overlay button:not(:disabled)",
    ".lvlSelectBtn:not(:disabled)",
    "#btnTutOk","#btnPauseContinue","#btnLevelSelectClose","#btnZurueckInfo"
  ].join(",");
  document.querySelectorAll(btnSelector).forEach(function(el){
    if(el.disabled || el.getAttribute("aria-disabled")==="true") return;
    bindPointerDwell(el, function(){ try{ el.click(); }catch(e){} });
  });
}

function initDwell(){ rebindDwell(); }

// ── Spiellogik ────────────────────────────────────────────────────────────
let game = null;
const viewRoot = document.getElementById("viewRoot");

function samePos(a,b){ return a[0]===b[0]&&a[1]===b[1]; }
function keyPos(p){ return `${p[0]},${p[1]}`; }
function inBounds(r,c,n){ return r>=0&&c>=0&&r<n&&c<n; }
function clampLevel(id){ return Math.max(1,Math.min(LEVELS.length,id)); }

// ── Läufer-Zugberechnung: alle 4 Diagonalen ───────────────────────────────
function legalMoves(fromPos, n, blocksSet){
  const moves = [];
  // Alle 4 diagonalen Richtungen: oben-links, oben-rechts, unten-links, unten-rechts
  const dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
  dirs.forEach(([dr,dc])=>{
    let r = fromPos[0]+dr;
    let c = fromPos[1]+dc;
    while(inBounds(r,c,n)){
      if(blocksSet.has(`${r},${c}`)) break; // Block stoppt den Läufer
      moves.push([r,c]);
      r += dr;
      c += dc;
    }
  });
  return moves;
}

// Alle Felder auf den Diagonalen des Läufers (für visuellen Hinweis)
function diagFelder(fromPos, n){
  const felder = new Set();
  const dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
  dirs.forEach(([dr,dc])=>{
    let r = fromPos[0]+dr;
    let c = fromPos[1]+dc;
    while(inBounds(r,c,n)){
      felder.add(`${r},${c}`);
      r += dr; c += dc;
    }
  });
  return felder;
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
  document.getElementById("tutTitle").textContent = tut.title;
  document.getElementById("tutText").textContent  = tut.text;
  document.getElementById("tutTip").textContent   = tut.tip;
  document.getElementById("overlayTutorial").classList.add("show");
  document.getElementById("btnTutOk").onclick = ()=>{
    document.getElementById("overlayTutorial").classList.remove("show");
    onOk();
    setTimeout(rebindDwell, 50);
  };
  setTimeout(rebindDwell, 50);
}

function render(){
  const lvl   = game.level;
  const total = LEVELS.length;
  const cur   = lvl.id;
  const pct   = Math.round((cur/total)*100);
  const moveInfo = `Züge: ${game.movesMade} · ⭐ ${state.stars}`;

  const moves   = game.status==="playing" ? legalMoves(game.player, game.n, game.blocks) : [];
  const moveSet = new Set(moves.map(keyPos));
  const diagSet = diagFelder(game.player, game.n);

  // Rechte Seite
  viewRoot.innerHTML = `
    <div class="progressWrap">
      <div class="progressTop">
        <div>Level ${cur}/${total}</div>
        <div>${lvl.group||""}</div>
      </div>
      <div class="bar"><div style="width:${pct}%"></div></div>
      <div class="moveInfo">${moveInfo}</div>
    </div>
    <div class="instruction" id="instruction">${lvl.name}</div>
    <div class="subline" id="subline">Wähle ein leuchtendes Feld.</div>
    <div class="legend">
      <div class="pill gruen"><b>▪</b> Zug möglich</div>
      <div class="pill violett"><b>♗</b> Läufer</div>
      <div class="pill gold"><b>⭐</b> Ziel</div>
      ${lvl.blocks?.length ? `<div class="pill grau"><b>■</b> Block</div>` : ""}
    </div>
    <div class="feedback ${game.feedback.kind}" id="feedback">${game.feedback.text}</div>
    <div class="btn-gruppe">
      <button class="btn gruen" id="btnNextLevel" ${game.status==="won"?"":"disabled"}>Nächstes ▶</button>
      <button class="btn aktion" id="btnRestart">↺ Neu starten</button>
      <button class="btn aktion" id="btnHint">💡 Tipp</button>
      <button class="btn aktion" id="btnLevels">☰ Alle Level</button>
      <button class="btn aktion" id="btnLevel1">⏮ Level 1</button>
      <button class="btn zurueck" id="btnZurueckInfo">← Zurück</button>
    </div>
  `;

  // Brett
  const grid = document.getElementById("grid");
  grid.style.gridTemplateColumns = `repeat(${game.n},1fr)`;
  grid.style.gridTemplateRows    = `repeat(${game.n},1fr)`;
  grid.innerHTML = "";

  for(let r=0; r<game.n; r++){
    for(let c=0; c<game.n; c++){
      const k        = keyPos([r,c]);
      const alt      = (r+c)%2===0;
      const isBlock  = game.blocks.has(k);
      const isPlayer = samePos([r,c], game.player);
      const isGoal   = samePos([r,c], game.goal);
      const isActive = moveSet.has(k) && game.status==="playing";
      // Felder auf Diagonalen des Läufers — visueller Hinweis
      const isDiag   = !isBlock && !isPlayer && !isActive && diagSet.has(k) && !isGoal;

      let symbol = "";
      if(isBlock)  symbol = "■";
      if(isGoal)   symbol = "⭐";
      if(isPlayer) symbol = "♗";

      let cls = "cell";
      if(alt)       cls += " alt";
      if(isActive)  cls += " active";
      else if(isDiag && !isGoal) cls += " diag";
      else          cls += " inactive";
      if(isPlayer)  cls += " player";
      if(isGoal && !isPlayer) cls += " goal-cell";

      const cell = document.createElement("div");
      cell.className = cls;

      if(isActive){
        cell.innerHTML = `<svg class="dwell-ring-svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/></svg>`;
        if(symbol){
          const sym = document.createElement("span");
          sym.textContent = symbol;
          sym.style.cssText = "position:relative;z-index:1;";
          cell.appendChild(sym);
        }
        cell.onclick = ()=> makeMove([r,c]);
      } else {
        cell.textContent = symbol;
      }

      grid.appendChild(cell);
    }
  }

  // Font-Größe
  const rect = grid.getBoundingClientRect();
  const fs = Math.max(26, Math.min(64, Math.floor((Math.min(rect.width,rect.height)/game.n)*0.50)));
  grid.querySelectorAll(".cell").forEach(el=> el.style.fontSize = fs+"px");

  // Button-Handler
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
    const lim = game.level.moveLimit;
    if(lim && game.movesMade === lim + 1 && !game._hintGiven){
      game._hintGiven = true;
      game.feedback = {text:"💡 Tipp: Es gibt einen kürzeren Weg!", kind:""};
      speak("Tipp: Es gibt einen kürzeren Weg!");
    } else if(!game._hintGiven || game.movesMade <= lim + 1){
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
    "Der Läufer zieht NUR diagonal — niemals gerade!",
    "Der Läufer bleibt immer auf seiner Feldfarbe.",
    "Auf einer freien Diagonale kann der Läufer so weit ziehen wie er will.",
    "Blöcke stoppen den Läufer auf der Diagonale — weiche auf eine andere aus.",
    "Manchmal braucht es zwei Züge: erst in eine Richtung, dann auf die Zieldiagonale."
  ];
  const hint = hints[Math.min(game.level.id-1, hints.length-1)];
  game.feedback = {text:"💡 "+hint, kind:""};
  speak(hint);
  render();
}

// ── Level-Auswahl ─────────────────────────────────────────────────────────
function openLevelSelect(){
  const grid = document.getElementById("levelSelectGrid");
  grid.innerHTML = "";
  let lastGroup = "";
  LEVELS.forEach(lvl=>{
    if(lvl.group !== lastGroup){
      lastGroup = lvl.group;
      const header = document.createElement("div");
      header.style.cssText = "grid-column:1/-1;font-size:12px;font-weight:900;color:var(--muted);padding:6px 0 2px;";
      header.textContent = lvl.group;
      grid.appendChild(header);
    }
    const locked = lvl.id > state.bestUnlocked;
    const done   = !!state.completed[String(lvl.id)];
    const btn    = document.createElement("button");
    btn.className = "lvlSelectBtn"+(done?" done":"");
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
document.getElementById("btnBack").onclick  = ()=> location.href = returnUrl;
document.getElementById("btnPause").onclick = ()=> document.getElementById("overlayPause").classList.add("show");
document.getElementById("btnPauseContinue").onclick = ()=>{
  document.getElementById("overlayPause").classList.remove("show");
  rebindDwell();
};

// ── Start ─────────────────────────────────────────────────────────────────
try{ speechSynthesis.getVoices(); }catch(e){}
startLevel(state.lastLevel || 1);
initDwell();
