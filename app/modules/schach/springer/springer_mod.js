// springer_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Storage & State ───────────────────────────────────────────────────────
const STORAGE_KEY = "springer_v1";
function loadState(){ try{ const r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; }catch{return null;} }
function saveState(s){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
function defaultState(){ return {stars:0, bestUnlocked:1, completed:{}, lastLevel:1}; }

let state = loadState() || defaultState();
if(typeof state.bestUnlocked!=="number") state.bestUnlocked=1;
if(!state.completed) state.completed={};
if(typeof state.lastLevel!=="number") state.lastLevel=1;
saveState(state);

// ── Level-Definitionen ────────────────────────────────────────────────────
// Der Springer zieht im L: 2 Felder in eine Richtung, dann 1 Feld senkrecht dazu.
// Er ist die EINZIGE Figur die über andere springen kann!
// Alle 8 möglichen L-Sprünge vom aktuellen Feld aus.

const LEVELS = [

  // ── GRUPPE 1: Den L-Zug verstehen ────────────────────────────────────────
  {
    id:1, group:"L-Zug lernen", name:"Erster Sprung",
    boardSize:5, playerStart:[4,2], goal:[2,3], blocks:[], moveLimit:1,
    tutorial:{
      title:"Der Springer – der besondere Zug",
      text:"Der Springer zieht immer im L: 2 Felder in eine Richtung, dann 1 Feld zur Seite. Er kann über andere Figuren springen — das kann keine andere Figur!",
      tip:"♘ = Springer  |  ⭐ = Ziel  |  Alle grünen Felder = mögliche Sprünge"
    }
  },
  {
    id:2, group:"L-Zug lernen", name:"Alle Richtungen",
    boardSize:5, playerStart:[2,2], goal:[0,1], blocks:[], moveLimit:1,
    tutorial:{
      title:"8 mögliche Sprünge",
      text:"Vom gleichen Feld aus kann der Springer bis zu 8 verschiedene Felder springen — je nach Position auf dem Brett auch weniger.",
      tip:"Zähle mit: Wie viele grüne Felder siehst du?"
    }
  },
  {
    id:3, group:"L-Zug lernen", name:"Randfelder",
    boardSize:5, playerStart:[4,0], goal:[2,1], blocks:[], moveLimit:1,
    tutorial:{
      title:"Am Rand ist der Springer schwächer",
      text:"Am Rand des Bretts hat der Springer weniger Möglichkeiten. In der Mitte ist er am stärksten!",
      tip:"Am Rand: nur 2–4 Sprünge. In der Mitte: bis zu 8!"
    }
  },
  {
    id:4, group:"L-Zug lernen", name:"Zwei Züge",
    boardSize:5, playerStart:[4,0], goal:[4,4], blocks:[], moveLimit:2,
    tutorial:{
      title:"Mehrere Züge planen",
      text:"Manche Felder brauchen zwei Sprünge. Überlege: Wo muss der Springer nach dem ersten Sprung landen, damit er das Ziel erreicht?",
      tip:"Denke einen Sprung voraus!"
    }
  },
  {
    id:5, group:"L-Zug lernen", name:"Drei Züge",
    boardSize:5, playerStart:[4,0], goal:[0,0], blocks:[], moveLimit:3,
    tutorial:null
  },

  // ── GRUPPE 2: Über Blöcke springen ───────────────────────────────────────
  {
    id:6, group:"Über Hindernisse", name:"Erster Sprung drüber",
    boardSize:5, playerStart:[4,2], goal:[2,1],
    blocks:[[3,2],[3,1]], moveLimit:1,
    tutorial:{
      title:"Der Springer springt DRÜBER!",
      text:"Der Springer ist die einzige Figur, die über Blöcke und andere Figuren springen kann. Blöcke stoppen ihn nicht — er landet einfach dahinter!",
      tip:"■ = Block — der Springer springt einfach darüber hinweg!"
    }
  },
  {
    id:7, group:"Über Hindernisse", name:"Viele Blöcke",
    boardSize:5, playerStart:[4,0], goal:[2,4],
    blocks:[[3,1],[3,2],[3,3],[2,2]], moveLimit:2,
    tutorial:null
  },
  {
    id:8, group:"Über Hindernisse", name:"Blockierter Weg",
    boardSize:5, playerStart:[4,0], goal:[0,4],
    blocks:[[3,1],[2,2],[1,3],[3,3],[1,1]], moveLimit:3,
    tutorial:{
      title:"Der Vorteil des Springers",
      text:"Während Turm und Läufer von Blöcken gestoppt werden, springt der Springer einfach darüber. Das ist sein größter Vorteil!",
      tip:"Suche den Sprung der über alle Blöcke hinwegführt."
    }
  },
  {
    id:9, group:"Über Hindernisse", name:"Engpass",
    boardSize:5, playerStart:[4,4], goal:[0,0],
    blocks:[[3,3],[2,2],[1,1],[3,1],[1,3]], moveLimit:4,
    tutorial:null
  },

  // ── GRUPPE 3: Planung ─────────────────────────────────────────────────────
  {
    id:10, group:"Planung", name:"Welche Farbe?",
    boardSize:5, playerStart:[4,0], goal:[2,2], blocks:[], moveLimit:2,
    tutorial:{
      title:"Wichtig: Feldfarben wechseln!",
      text:"Bei jedem Sprung wechselt der Springer die Feldfarbe — von hell zu dunkel und zurück. Das kann beim Planen helfen!",
      tip:"Zähle die Sprünge: Auf welcher Farbe landet der Springer?"
    }
  },
  {
    id:11, group:"Planung", name:"Drei Felder",
    boardSize:5, playerStart:[4,4], goal:[2,0],
    blocks:[[3,2],[2,3]], moveLimit:3,
    tutorial:null
  },
  {
    id:12, group:"Planung", name:"Kein direkter Weg",
    boardSize:5, playerStart:[4,4], goal:[3,2],
    blocks:[], moveLimit:2,
    tutorial:{
      title:"Umweg nötig",
      text:"Manchmal führt kein direkter Sprung ans Ziel. Dann braucht es einen Umweg über ein Zwischenfeld.",
      tip:"Überlege: Von welchem Zwischenfeld aus kann der Springer das Ziel erreichen?"
    }
  },

  // ── GRUPPE 4: Großes Brett ────────────────────────────────────────────────
  {
    id:13, group:"Großes Brett", name:"6×6 Freies Feld",
    boardSize:6, playerStart:[5,0], goal:[0,1], blocks:[], moveLimit:3,
    tutorial:{
      title:"Mehr Raum zum Springen!",
      text:"Auf einem größeren Brett hat der Springer mehr Möglichkeiten — er kann weiter planen und mehr Routen nehmen.",
      tip:"In der Mitte eines 6×6-Bretts hat der Springer bis zu 8 Sprünge!"
    }
  },
  {
    id:14, group:"Großes Brett", name:"6×6 mit Blöcken",
    boardSize:6, playerStart:[5,0], goal:[1,5],
    blocks:[[4,1],[3,2],[2,3],[3,4],[4,3]], moveLimit:4,
    tutorial:null
  },
  {
    id:15, group:"Großes Brett", name:"Das große Finale",
    boardSize:6, playerStart:[5,5], goal:[0,0],
    blocks:[[4,4],[3,3],[4,2],[2,4],[3,1],[1,3]], moveLimit:5,
    tutorial:{
      title:"Das große Finale!",
      text:"Das schwierigste Springer-Level. Plane jeden Sprung sorgfältig — der Springer kann über alle Blöcke springen!",
      tip:"Denke mehrere Züge voraus. Es gibt einen Weg!"
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

// ── Dwell (Goldstandard: direktes pointerenter) ───────────────────────────
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
      ring.classList.remove("animating");
      void ring.offsetWidth;
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
    if(!el._lastPointer || Date.now()-el._lastPointer>50) start();
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
    if(el.disabled || el.getAttribute("aria-disabled")==="true") return;
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

// ── Springer-Zugberechnung: alle 8 L-Züge ────────────────────────────────
// Der Springer springt ÜBER Blöcke — blocksSet ist für ihn irrelevant!
// Er darf nur nicht AUF einem Block landen.
function legalMoves(fromPos, n, blocksSet){
  const moves = [];
  const lSprunge = [
    [-2,-1],[-2,1],[-1,-2],[-1,2],
    [1,-2], [1,2], [2,-1], [2,1]
  ];
  lSprunge.forEach(([dr,dc])=>{
    const r = fromPos[0]+dr;
    const c = fromPos[1]+dc;
    if(inBounds(r,c,n) && !blocksSet.has(keyPos([r,c]))){
      moves.push([r,c]);
    }
  });
  return moves;
}

// L-Arm-Felder: die "Zwischenfelder" des L-Zugs (für visuellen Hinweis)
// Zeigt welche Felder der Springer "überquert" obwohl er drüberspringt
function larmFelder(fromPos, n){
  const felder = new Set();
  // Für jeden L-Zug die beiden Arm-Felder markieren
  const lSprunge = [
    [-2,-1],[-2,1],[-1,-2],[-1,2],
    [1,-2], [1,2], [2,-1], [2,1]
  ];
  lSprunge.forEach(([dr,dc])=>{
    // Erstes Feld des Arms (in der 2er-Richtung)
    const r1 = fromPos[0]+(dr>0?1:dr<0?-1:0)*(Math.abs(dr)>1?1:0);
    const c1 = fromPos[1]+(dc>0?1:dc<0?-1:0)*(Math.abs(dc)>1?1:0);
    // Zweites Feld in der längeren Richtung
    const r2 = fromPos[0]+(Math.abs(dr)===2?(dr>0?1:-1):0);
    const c2 = fromPos[1]+(Math.abs(dc)===2?(dc>0?1:-1):0);
    if(inBounds(r1,c1,n)) felder.add(keyPos([r1,c1]));
    if(inBounds(r2,c2,n)) felder.add(keyPos([r2,c2]));
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

  const moves   = game.status==="playing" ? legalMoves(game.player, game.n, game.blocks) : [];
  const moveSet = new Set(moves.map(keyPos));
  const larmSet = larmFelder(game.player, game.n);

  // Rechte Seite rendern
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
      <div class="pill gruen"><b>▪</b> Sprung möglich</div>
      <div class="pill orange"><b>♘</b> Springer</div>
      <div class="pill gold"><b>⭐</b> Ziel</div>
      ${lvl.blocks&&lvl.blocks.length ? `<div class="pill grau"><b>■</b> Block (springt drüber!)</div>` : ""}
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

  // Brett rendern
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
      const isLarm   = !isActive && !isPlayer && !isGoal && !isBlock && larmSet.has(k);

      let symbol = "";
      if(isBlock)  symbol = "■";
      if(isGoal)   symbol = "⭐";
      if(isPlayer) symbol = "♘";

      let cls = "cell";
      if(alt) cls += " alt";
      if(isBlock){
        cls += " block-cell inactive";
      } else if(isActive){
        cls += " active";
      } else if(isLarm && !isGoal){
        cls += " larm inactive";
      } else {
        cls += " inactive";
      }
      if(isPlayer) cls += " player";
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

  // Font-Größe anpassen
  const rect = grid.getBoundingClientRect();
  const fs = Math.max(26, Math.min(64, Math.floor((Math.min(rect.width,rect.height)/game.n)*0.50)));
  grid.querySelectorAll(".cell").forEach(el=> el.style.fontSize = fs+"px");

  // Button-Handler
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
    "Der Springer zieht immer im L: 2 Felder, dann 1 Feld zur Seite.",
    "Der Springer springt über Blöcke drüber — das ist sein Vorteil!",
    "Bei jedem Sprung wechselt der Springer die Feldfarbe.",
    "In der Mitte hat der Springer mehr Möglichkeiten als am Rand.",
    "Überlege: Von welchem Zwischenfeld aus kann der Springer das Ziel erreichen?"
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
    btn.disabled  = locked;
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
