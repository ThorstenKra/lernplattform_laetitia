// bauer_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Storage & State ───────────────────────────────────────────────────────
const STORAGE_KEY = "bauer_v1";
function loadState(){ try{ const r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; }catch{return null;} }
function saveState(s){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
function defaultState(){ return {stars:0, bestUnlocked:1, completed:{}, lastLevel:1}; }

let state = loadState() || defaultState();
if(typeof state.bestUnlocked!=="number") state.bestUnlocked=1;
if(!state.completed) state.completed={};
if(typeof state.lastLevel!=="number") state.lastLevel=1;
saveState(state);

// ── Level-Definitionen ────────────────────────────────────────────────────
// Der Bauer ist die einzige ASYMMETRISCHE Figur:
//   - Zieht NUR vorwärts (Richtung Zeile 0)
//   - Startdoppelzug: von der Startzeile aus optional 2 Felder (wenn frei)
//   - Schlägt NUR diagonal vorwärts (wenn Ziel dort steht)
//   - Kann NICHT rückwärts
// Alle Level BFS-verifiziert lösbar!

const LEVELS = [

  // ── GRUPPE 1: Gerader Zug ────────────────────────────────────────────────
  {
    id:1, group:"Gerader Zug", name:"Erster Schritt",
    boardSize:4, playerStart:[3,1], goal:[2,1], blocks:[], moveLimit:1,
    tutorial:{
      title:"Der Bauer – eine besondere Figur",
      text:"Der Bauer ist anders als alle anderen Figuren: Er zieht NUR vorwärts — niemals rückwärts oder zur Seite. Immer Schritt für Schritt nach vorne!",
      tip:"♙ = Bauer  |  ⭐ = Ziel  |  Grüne Felder = mögliche Züge"
    }
  },
  {
    id:2, group:"Gerader Zug", name:"Startdoppelzug",
    boardSize:4, playerStart:[3,1], goal:[1,1], blocks:[], moveLimit:1,
    tutorial:{
      title:"Der Startdoppelzug",
      text:"Ganz am Anfang darf der Bauer einmal zwei Felder auf einmal vorziehen — aber nur vom Startfeld aus! Danach immer nur ein Feld.",
      tip:"Vom Startfeld: 1 oder 2 Felder vorwärts. Später: immer nur 1 Feld."
    }
  },
  {
    id:3, group:"Gerader Zug", name:"Doppelzug nutzen",
    boardSize:5, playerStart:[4,2], goal:[2,2], blocks:[], moveLimit:1,
    tutorial:null
  },
  {
    id:4, group:"Gerader Zug", name:"Weiter laufen",
    boardSize:5, playerStart:[4,1], goal:[0,1], blocks:[], moveLimit:4,
    tutorial:{
      title:"Immer geradeaus!",
      text:"Wenn kein Hindernis im Weg ist, läuft der Bauer einfach geradeaus — Schritt für Schritt bis er das Ziel erreicht.",
      tip:"Der Bauer kann nicht ausweichen — er zieht immer geradeaus."
    }
  },
  {
    id:5, group:"Gerader Zug", name:"Schnell ans Ziel",
    boardSize:5, playerStart:[4,2], goal:[0,2], blocks:[], moveLimit:4,
    tutorial:null
  },

  // ── GRUPPE 2: Schlagzug diagonal ─────────────────────────────────────────
  {
    id:6, group:"Schlagzug", name:"Diagonal schlagen",
    boardSize:4, playerStart:[3,1], goal:[2,2], blocks:[[2,1]], moveLimit:1,
    tutorial:{
      title:"Der Schlagzug — diagonal vorwärts",
      text:"Der Bauer schlägt ANDERS als er zieht! Er schlägt diagonal vorwärts — also schräg nach vorne links oder vorne rechts. Nur wenn das Ziel dort steht!",
      tip:"Grüner Weg = geradeaus ziehen. Gelb-oranges Feld = diagonal schlagen."
    }
  },
  {
    id:7, group:"Schlagzug", name:"Nach links schlagen",
    boardSize:4, playerStart:[3,2], goal:[2,1], blocks:[[2,2]], moveLimit:1,
    tutorial:{
      title:"Schlagen nach links",
      text:"Der Bauer kann auch nach links-vorne schlagen. Der gerade Weg ist blockiert — aber diagonal links liegt das Ziel!",
      tip:"Zwei Möglichkeiten: gerade (wenn frei) oder diagonal (wenn Ziel dort steht)."
    }
  },
  {
    id:8, group:"Schlagzug", name:"Schlag von der Seite",
    boardSize:5, playerStart:[4,2], goal:[3,3], blocks:[[3,2]], moveLimit:1,
    tutorial:null
  },
  {
    id:9, group:"Schlagzug", name:"Umweg durch Schlag",
    boardSize:5, playerStart:[4,3], goal:[2,2], blocks:[[2,3]], moveLimit:2,
    tutorial:null
  },

  // ── GRUPPE 3: Kombination ────────────────────────────────────────────────
  {
    id:10, group:"Kombination", name:"Erst gerade, dann schlagen",
    boardSize:5, playerStart:[4,1], goal:[2,2], blocks:[[2,1]], moveLimit:2,
    tutorial:{
      title:"Gerade und diagonal kombinieren",
      text:"Manchmal zieht der Bauer erst gerade nach vorne und schlägt dann diagonal. Beides zusammen gibt ihm mehr Möglichkeiten!",
      tip:"Erst vorwärts, dann schräg schlagen — das ist die Kombination!"
    }
  },
  {
    id:11, group:"Kombination", name:"Drei Schritte",
    boardSize:5, playerStart:[4,2], goal:[1,3], blocks:[[1,2]], moveLimit:3,
    tutorial:null
  },
  {
    id:12, group:"Kombination", name:"Blockiert und schlagen",
    boardSize:5, playerStart:[4,1], goal:[1,2], blocks:[[1,1]], moveLimit:3,
    tutorial:{
      title:"Den Weg finden",
      text:"Der gerade Weg ist am Ende blockiert — der Bauer muss rechtzeitig auf das Schlagfeld schwenken. Überlege wann der Schlag am besten passt!",
      tip:"Denke voraus: Wo liegt das Blockfeld? Wann sollte ich schlagen?"
    }
  },

  // ── GRUPPE 4: Großes Brett ────────────────────────────────────────────────
  {
    id:13, group:"Großes Brett", name:"6×6 geradeaus",
    boardSize:6, playerStart:[5,2], goal:[0,2], blocks:[], moveLimit:5,
    tutorial:{
      title:"Der lange Weg",
      text:"Auf einem großen Brett braucht der Bauer viele Züge — aber er geht immer geradeaus. Geduld ist seine Stärke!",
      tip:"Der Startdoppelzug hilft: 2 Felder auf einmal sparen Zeit."
    }
  },
  {
    id:14, group:"Großes Brett", name:"6×6 mit Schlag",
    boardSize:6, playerStart:[5,1], goal:[2,2], blocks:[[2,1]], moveLimit:4,
    tutorial:null
  },
  {
    id:15, group:"Großes Brett", name:"Das große Finale",
    boardSize:6, playerStart:[5,2], goal:[1,3], blocks:[[1,2]], moveLimit:4,
    tutorial:{
      title:"Das große Finale!",
      text:"Letztes Level — gerade vorwärts und am Ende diagonal schlagen. Der Bauer zeigt seine ganze Stärke!",
      tip:"Nutze den Startdoppelzug! Und denke rechtzeitig an den Schlag."
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
    u.rate = rate||0.95; u.pitch = 1.0;
    speechSynthesis.speak(u);
  }catch(e){}
}

// ── Dwell (Goldstandard) ─────────────────────────────────────────────────
const DWELL_MS = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

function bindPointerDwell(el, onActivate){
  if(el.getAttribute("data-pdwell")==="1") return;
  el.setAttribute("data-pdwell","1");
  var timer = null;
  function start(){
    if(timer) return;
    el.classList.add("dwell-active");
    var ring = el.querySelector(".dwell-ring-svg circle");
    if(ring){
      ring.classList.remove("animating"); void ring.offsetWidth;
      ring.style.setProperty("--dwell-duration",(DWELL_MS/1000)+"s");
      ring.classList.add("animating");
    }
    timer = setTimeout(function(){ timer=null; onActivate(el); }, DWELL_MS);
  }
  function stop(){
    if(timer){ clearTimeout(timer); timer=null; }
    el.classList.remove("dwell-active");
    var ring = el.querySelector(".dwell-ring-svg circle");
    if(ring) ring.classList.remove("animating");
  }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("click", stop);
  el.addEventListener("mouseenter", function(){
    if(!el._lastPointer||Date.now()-el._lastPointer>50) start();
  });
  el.addEventListener("mouseleave", stop);
}

function rebindDwell(){
  document.querySelectorAll("[data-pdwell]").forEach(function(el){
    if(!el.classList.contains("cell")) el.removeAttribute("data-pdwell");
  });
  document.querySelectorAll(".cell.active").forEach(function(el){
    bindPointerDwell(el, function(){
      if(typeof el.onclick==="function") el.onclick();
    });
  });
  var btns = [
    "#btnBack","#btnPause",
    "#viewRoot .btn:not(:disabled)","#viewRoot button:not(:disabled)",
    ".overlay .btn:not(:disabled)",".overlay button:not(:disabled)",
    ".lvlSelectBtn:not(:disabled)",
    "#btnTutOk","#btnPauseContinue","#btnLevelSelectClose","#btnZurueckInfo"
  ].join(",");
  document.querySelectorAll(btns).forEach(function(el){
    if(el.disabled||el.getAttribute("aria-disabled")==="true") return;
    bindPointerDwell(el, function(){ try{ el.click(); }catch(e){} });
  });
}

// ── Spiellogik ────────────────────────────────────────────────────────────
let game = null;
const viewRoot = document.getElementById("viewRoot");

function samePos(a,b){ return a[0]===b[0]&&a[1]===b[1]; }
function keyPos(p){ return p[0]+","+p[1]; }
function inBounds(r,c,n){ return r>=0&&c>=0&&r<n&&c<n; }
function clampLevel(id){ return Math.max(1,Math.min(LEVELS.length,id)); }

// ── Bauer-Zugberechnung ───────────────────────────────────────────────────
// Richtung: Bauer zieht immer Richtung Zeile 0 (aufwärts = r-1)
// WICHTIG: schlagMoves werden separat markiert für visuelle Unterscheidung
function legalMoves(fromPos, n, blocksSet, goal, startRow){
  const moves = [];
  const [r, c] = fromPos;

  // 1. Gerader Zug (1 Feld vorwärts)
  const nr = r - 1;
  if(nr >= 0 && !blocksSet.has(keyPos([nr,c]))){
    moves.push({pos:[nr,c], type:"gerade"});
    // 2. Startdoppelzug (nur von Startzeile, wenn BEIDE Felder frei)
    if(r === startRow && nr-1 >= 0 && !blocksSet.has(keyPos([nr-1,c]))){
      moves.push({pos:[nr-1,c], type:"gerade"});
    }
  }

  // 3. Schlagzug (nur diagonal vorwärts, NUR wenn Ziel dort steht)
  for(const dc of [-1, 1]){
    const sr = r - 1;
    const sc = c + dc;
    if(inBounds(sr, sc, n) && samePos([sr,sc], goal)){
      moves.push({pos:[sr,sc], type:"schlag"});
    }
  }

  return moves;
}

// Vorwärts-Felder für visuellen Hinweis (alle Felder vor dem Bauer)
function vorwaertsFelder(fromPos, n, blocksSet){
  const felder = new Set();
  let r = fromPos[0] - 1;
  const c = fromPos[1];
  while(r >= 0 && !blocksSet.has(keyPos([r,c]))){
    felder.add(keyPos([r,c]));
    r--;
  }
  return felder;
}

function startLevel(levelId, skipTutorial){
  const lvl = LEVELS.find(x=>x.id===clampLevel(levelId)) || LEVELS[0];
  state.lastLevel = lvl.id;
  saveState(state);
  // Startzeile aus Level-Definition (unterste Reihe)
  const startRow = lvl.playerStart[0];
  game = {
    level:      lvl,
    n:          lvl.boardSize,
    player:     [...lvl.playerStart],
    goal:       [...lvl.goal],
    blocks:     new Set((lvl.blocks||[]).map(keyPos)),
    startRow:   startRow,
    movesMade:  0,
    status:     "playing",
    _hintGiven: false,
    feedback:   {text:"Wähle ein leuchtendes Feld.", kind:""}
  };
  if(!skipTutorial && lvl.tutorial){
    showTutorial(lvl.tutorial, ()=>{ render(); });
  } else {
    render();
    speak("Level "+lvl.id+": "+lvl.name+". "+lvl.group+".");
  }
}

function showTutorial(tut, onOk){
  document.getElementById("tutTitle").textContent = tut.title;
  document.getElementById("tutText").textContent  = tut.text;
  document.getElementById("tutTip").textContent   = tut.tip;
  document.getElementById("overlayTutorial").classList.add("show");
  document.getElementById("btnTutOk").onclick = ()=>{
    document.getElementById("overlayTutorial").classList.remove("show");
    onOk(); setTimeout(rebindDwell, 50);
  };
  setTimeout(rebindDwell, 50);
}

function render(){
  const lvl   = game.level;
  const total = LEVELS.length;
  const cur   = lvl.id;
  const pct   = Math.round((cur/total)*100);

  const moves    = game.status==="playing"
    ? legalMoves(game.player, game.n, game.blocks, game.goal, game.startRow)
    : [];
  const moveSet  = new Map(moves.map(m=>[keyPos(m.pos), m.type]));
  const vorwSet  = vorwaertsFelder(game.player, game.n, game.blocks);

  // Gibt es Schlagzüge?
  const hatSchlag = moves.some(m=>m.type==="schlag");

  viewRoot.innerHTML = `
    <div class="progressWrap">
      <div class="progressTop">
        <div>Level ${cur}/${total}</div>
        <div>${lvl.group||""}</div>
      </div>
      <div class="bar"><div style="width:${pct}%"></div></div>
      <div class="moveInfo">Züge: ${game.movesMade} · ⭐ ${state.stars}</div>
    </div>
    <div class="instruction">${lvl.name}</div>
    <div class="subline">Wähle ein leuchtendes Feld.</div>
    <div class="legend">
      <div class="pill gruen"><b>▪</b> Vorwärts</div>
      ${hatSchlag ? `<div class="pill gelb"><b>◆</b> Schlagzug</div>` : ""}
      <div class="pill dunkelgruen"><b>♙</b> Bauer</div>
      <div class="pill gold"><b>⭐</b> Ziel</div>
      ${lvl.blocks&&lvl.blocks.length?`<div class="pill grau"><b>■</b> Block</div>`:""}
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
      const moveType = moveSet.get(k);
      const isActive = moveType !== undefined && game.status==="playing";
      const isVorw   = !isActive && !isPlayer && !isGoal && !isBlock && vorwSet.has(k);

      let symbol = "";
      if(isBlock)  symbol = "■";
      if(isGoal)   symbol = "⭐";
      if(isPlayer) symbol = "♙";

      let cls = "cell";
      if(alt) cls += " alt";
      if(isBlock){
        cls += " inactive";
      } else if(isActive){
        cls += " active";
        if(moveType === "schlag") cls += " schlag-cell";
      } else if(isVorw && !isGoal){
        cls += " vorwaerts inactive";
      } else {
        cls += " inactive";
      }
      if(isPlayer)  cls += " player";
      if(isGoal && !isPlayer) cls += " goal-cell";

      const cell = document.createElement("div");
      cell.className = cls;
      if(isBlock) cell.style.background="#334155";

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

  const rect = grid.getBoundingClientRect();
  const fs = Math.max(24, Math.min(60, Math.floor((Math.min(rect.width,rect.height)/game.n)*0.52)));
  grid.querySelectorAll(".cell").forEach(el=> el.style.fontSize = fs+"px");

  document.getElementById("btnNextLevel").onclick = ()=>{ if(game.status==="won") startLevel(clampLevel(game.level.id+1)); };
  document.getElementById("btnRestart").onclick   = ()=> startLevel(game.level.id, true);
  document.getElementById("btnHint").onclick      = ()=> showHint();
  document.getElementById("btnLevels").onclick    = ()=> openLevelSelect();
  document.getElementById("btnLevel1").onclick    = ()=> startLevel(1);
  document.getElementById("btnZurueckInfo").onclick = ()=> location.href = returnUrl;

  rebindDwell();
}

function makeMove(pos){
  if(game.status!=="playing") return;
  game.player = [...pos];
  game.movesMade++;
  if(samePos(game.player, game.goal)){
    win();
  } else {
    const lim = game.level.moveLimit;
    if(lim && game.movesMade===lim+1 && !game._hintGiven){
      game._hintGiven = true;
      game.feedback = {text:"💡 Tipp: Es gibt einen kürzeren Weg!", kind:""};
      speak("Tipp: Es gibt einen kürzeren Weg!");
    } else if(!game._hintGiven || game.movesMade<=lim+1){
      game.feedback = {text:"Gut! Weiter zum Ziel.", kind:""};
    }
    render();
  }
}

function win(){
  game.status = "won";
  game.feedback = {text:"🎉 Geschafft! Sehr gut!", kind:"good"};
  speak("Geschafft! Level "+game.level.id+" abgeschlossen. Super gemacht!");
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
    "Der Bauer zieht NUR vorwärts — niemals zurück!",
    "Vom Startfeld aus darf der Bauer 2 Felder auf einmal ziehen.",
    "Der Bauer schlägt diagonal — aber nur wenn das Ziel dort steht!",
    "Ist der gerade Weg blockiert? Vielleicht liegt das Ziel diagonal.",
    "Denke voraus: Wann soll ich gerade ziehen, wann diagonal schlagen?"
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
      const hdr = document.createElement("div");
      hdr.style.cssText = "grid-column:1/-1;font-size:12px;font-weight:900;color:var(--muted);padding:6px 0 2px;";
      hdr.textContent = lvl.group;
      grid.appendChild(hdr);
    }
    const locked = lvl.id > state.bestUnlocked;
    const done   = !!state.completed[String(lvl.id)];
    const btn = document.createElement("button");
    btn.className = "lvlSelectBtn"+(done?" done":"");
    btn.disabled = locked;
    btn.innerHTML = `
      <span class="lvlNum">${lvl.id}. ${lvl.name}</span>
      <span class="lvlName">${lvl.group}</span>
      ${done   ? `<span class="lvlStar">⭐ Abgeschlossen</span>` : ""}
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

// ── Navigation ────────────────────────────────────────────────────────────
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
rebindDwell();
