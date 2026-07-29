// dame_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Storage & State ───────────────────────────────────────────────────────
const STORAGE_KEY = "dame_v1";
function loadState(){ try{ const r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; }catch{return null;} }
function saveState(s){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
function defaultState(){ return {stars:0, bestUnlocked:1, completed:{}, lastLevel:1}; }

let state = loadState() || defaultState();
if(typeof state.bestUnlocked!=="number") state.bestUnlocked=1;
if(!state.completed) state.completed={};
if(typeof state.lastLevel!=="number") state.lastLevel=1;
saveState(state);

// ── Level-Definitionen ────────────────────────────────────────────────────
// Die Dame kombiniert Turm + Läufer:
//   gerade Linien (oben/unten/links/rechts) UND Diagonalen — so weit sie will.
// Sie ist die stärkste Figur im Schach!

const LEVELS = [

  // ── GRUPPE 1: Die Dame kennenlernen ──────────────────────────────────────
  {
    id:1, group:"Dame lernen", name:"Wie der Turm",
    boardSize:4, playerStart:[3,0], goal:[0,0], blocks:[], moveLimit:1,
    tutorial:{
      title:"Die Dame – die stärkste Figur",
      text:"Die Dame kann wie der Turm ziehen: gerade nach oben, unten, links und rechts — so weit sie will.",
      tip:"♕ = Dame  |  ⭐ = Ziel  |  Alle grünen Felder = mögliche Züge"
    }
  },
  {
    id:2, group:"Dame lernen", name:"Wie der Läufer",
    boardSize:4, playerStart:[3,0], goal:[0,3], blocks:[], moveLimit:1,
    tutorial:{
      title:"Die Dame zieht auch diagonal!",
      text:"Die Dame kann außerdem wie der Läufer ziehen: diagonal in alle vier Richtungen. Sie kann sogar beide Möglichkeiten kombinieren!",
      tip:"Schau: Sie kann gerade UND schräg ziehen — viel mehr als Turm oder Läufer!"
    }
  },
  {
    id:3, group:"Dame lernen", name:"Alles zusammen",
    boardSize:5, playerStart:[2,2], goal:[0,4], blocks:[], moveLimit:1,
    tutorial:{
      title:"Dame = Turm + Läufer",
      text:"Die Dame vereint Turm und Läufer. Sie zieht in alle 8 Richtungen: 4 gerade und 4 diagonal. Das macht sie zur stärksten Figur!",
      tip:"Zähle mit: Wie viele Felder kann die Dame von der Mitte aus erreichen?"
    }
  },
  {
    id:4, group:"Dame lernen", name:"Zwei Züge",
    boardSize:5, playerStart:[4,0], goal:[0,0], blocks:[], moveLimit:1,
    tutorial:null
  },
  {
    id:5, group:"Dame lernen", name:"Schneller Weg",
    boardSize:5, playerStart:[4,4], goal:[4,0], blocks:[], moveLimit:1,
    tutorial:{
      title:"Die Dame ist sehr schnell!",
      text:"Die Dame braucht von vielen Positionen aus nur einen einzigen Zug um ihr Ziel zu erreichen — egal wie weit weg.",
      tip:"Denke groß: Ein Zug kann das ganze Brett überqueren!"
    }
  },

  // ── GRUPPE 2: Hindernisse umgehen ────────────────────────────────────────
  {
    id:6, group:"Hindernisse", name:"Erster Block",
    boardSize:4, playerStart:[3,0], goal:[0,3],
    blocks:[[2,1]], moveLimit:2,
    tutorial:{
      title:"Blöcke stoppen die Dame",
      text:"Blöcke stoppen die Dame — genau wie beim Turm und Läufer. Sie kann weder drüber noch drumherum ziehen, muss also einen anderen Weg nehmen.",
      tip:"Die Dame hat viele Alternativen — nutze eine andere Richtung!"
    }
  },
  {
    id:7, group:"Hindernisse", name:"Zwei Blöcke",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[3,1],[1,3]], moveLimit:2,
    tutorial:null
  },
  {
    id:8, group:"Hindernisse", name:"Engpass",
    boardSize:5, playerStart:[4,0], goal:[0,2],
    blocks:[[2,0],[2,1],[2,3],[2,4]], moveLimit:2,
    tutorial:{
      title:"Durch den Engpass",
      text:"Manchmal ist nur eine Lücke frei. Die Dame muss die einzige offene Linie oder Diagonale finden.",
      tip:"Suche die Lücke — sie liegt genau in der Mitte!"
    }
  },
  {
    id:9, group:"Hindernisse", name:"Viele Blöcke",
    boardSize:6, playerStart:[5,0], goal:[0,5],
    blocks:[[4,1],[3,2],[2,3],[1,4],[4,3],[2,1]], moveLimit:3,
    tutorial:null
  },

  // ── GRUPPE 3: Stärke nutzen ───────────────────────────────────────────────
  {
    id:10, group:"Stärke nutzen", name:"Immer ein Weg",
    boardSize:5, playerStart:[4,4], goal:[0,0],
    blocks:[[3,3],[2,2]], moveLimit:2,
    tutorial:{
      title:"Die Dame findet immer einen Weg",
      text:"Selbst wenn die direkte Diagonale blockiert ist, kann die Dame über gerade Linien ausweichen — oder umgekehrt. Sie hat immer Alternativen!",
      tip:"Gerade oder diagonal — beide Wege prüfen!"
    }
  },
  {
    id:11, group:"Stärke nutzen", name:"Kürzester Weg",
    boardSize:6, playerStart:[5,0], goal:[2,3],
    blocks:[[4,1],[3,0]], moveLimit:2,
    tutorial:null
  },
  {
    id:12, group:"Stärke nutzen", name:"Drei Felder frei",
    boardSize:6, playerStart:[5,5], goal:[0,0],
    blocks:[[4,4],[4,0],[0,4],[3,3],[2,2]], moveLimit:2,
    tutorial:{
      title:"Welcher Weg ist der kürzeste?",
      text:"Die Dame kann oft auf mehreren Routen zum Ziel gelangen. Überlege welche Route die wenigsten Züge braucht!",
      tip:"Erst gerade, dann diagonal — oder umgekehrt?"
    }
  },

  // ── GRUPPE 4: Großes Brett ────────────────────────────────────────────────
  {
    id:13, group:"Großes Brett", name:"7×7 freies Feld",
    boardSize:7, playerStart:[6,0], goal:[0,6], blocks:[], moveLimit:1,
    tutorial:{
      title:"Die Dame auf großem Brett",
      text:"Auf einem 7×7-Brett zeigt die Dame ihre volle Stärke. Von der Ecke zur gegenüberliegenden Ecke: ein einziger Diagonalzug!",
      tip:"Eine Ecke zur anderen: Das schafft nur die Dame in einem Zug!"
    }
  },
  {
    id:14, group:"Großes Brett", name:"7×7 mit Blöcken",
    boardSize:7, playerStart:[6,0], goal:[0,6],
    blocks:[[5,1],[4,2],[3,3],[2,4],[1,5],[5,3],[3,5]], moveLimit:3,
    tutorial:null
  },
  {
    id:15, group:"Großes Brett", name:"Das große Finale",
    boardSize:7, playerStart:[6,3], goal:[0,3],
    blocks:[[5,3],[5,2],[5,4],[4,1],[4,5],[3,2],[3,4],[2,1],[2,5],[1,2],[1,4]], moveLimit:3,
    tutorial:{
      title:"Das große Finale!",
      text:"Das schwierigste Dame-Level. Alle geraden Wege sind versperrt — nutze die Diagonalen clever!",
      tip:"Manchmal führt der Umweg über die Seite schneller ans Ziel."
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

// ── Dame-Zugberechnung: 8 Richtungen (Turm + Läufer) ─────────────────────
function legalMoves(fromPos, n, blocksSet){
  const moves = [];
  // Alle 8 Richtungen: gerade (wie Turm) + diagonal (wie Läufer)
  const dirs = [
    [-1,0],[1,0],[0,-1],[0,1],   // gerade
    [-1,-1],[-1,1],[1,-1],[1,1]  // diagonal
  ];
  dirs.forEach(([dr,dc])=>{
    let r = fromPos[0]+dr;
    let c = fromPos[1]+dc;
    while(inBounds(r,c,n)){
      if(blocksSet.has(keyPos([r,c]))) break;
      moves.push([r,c]);
      r += dr; c += dc;
    }
  });
  return moves;
}

// Reichweiten-Felder (alle Linien + Diagonalen, auch hinter Blöcken gestoppt)
function reichweiteFelder(fromPos, n, blocksSet){
  // Identisch zu legalMoves — alle erreichbaren Felder sind die Reichweite
  return new Set(legalMoves(fromPos, n, blocksSet).map(keyPos));
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

  const moves      = game.status==="playing" ? legalMoves(game.player, game.n, game.blocks) : [];
  const moveSet    = new Set(moves.map(keyPos));
  const reichweite = reichweiteFelder(game.player, game.n, game.blocks);

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
      <div class="pill gruen"><b>▪</b> Zug möglich</div>
      <div class="pill rot"><b>♕</b> Dame</div>
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
      const isActive = moveSet.has(k) && game.status==="playing";
      const isReich  = !isActive && !isPlayer && !isGoal && !isBlock && reichweite.has(k);

      let symbol = "";
      if(isBlock)  symbol = "■";
      if(isGoal)   symbol = "⭐";
      if(isPlayer) symbol = "♕";

      let cls = "cell";
      if(alt) cls += " alt";
      if(isBlock){
        cls += " inactive"; cell_bg(cls);
      } else if(isActive){
        cls += " active";
      } else if(isReich && !isGoal){
        cls += " reichweite inactive";
      } else {
        cls += " inactive";
      }
      if(isPlayer) cls += " player";
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
  const fs = Math.max(22, Math.min(58, Math.floor((Math.min(rect.width,rect.height)/game.n)*0.50)));
  grid.querySelectorAll(".cell").forEach(el=> el.style.fontSize = fs+"px");

  document.getElementById("btnNextLevel").onclick = ()=>{ if(game.status==="won") startLevel(clampLevel(game.level.id+1)); };
  document.getElementById("btnRestart").onclick   = ()=> startLevel(game.level.id, true);
  document.getElementById("btnHint").onclick      = ()=> showHint();
  document.getElementById("btnLevels").onclick    = ()=> openLevelSelect();
  document.getElementById("btnLevel1").onclick    = ()=> startLevel(1);
  document.getElementById("btnZurueckInfo").onclick = ()=> location.href = returnUrl;

  rebindDwell();
}

// Hilfsfunktion — wird nur für Block-Styling gebraucht
function cell_bg(cls){ return cls; }

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
    "Die Dame zieht wie Turm UND Läufer zusammen — in alle 8 Richtungen!",
    "Gerade Linien ODER Diagonalen — beide Wege sind möglich.",
    "Blöcke stoppen die Dame, aber sie hat immer viele Alternativen.",
    "Oft reicht ein einziger langer Zug um das Ziel zu erreichen.",
    "Denke in Richtungen: Welche Route braucht die wenigsten Züge?"
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
