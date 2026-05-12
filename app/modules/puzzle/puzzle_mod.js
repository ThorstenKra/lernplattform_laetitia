// app/modules/puzzle/puzzle_mod.js
// Zuordnungs-Puzzle für Laetitia — Augensteuerung (Tobii Accent 1400)
//
// MECHANIK:
//   1. Referenzbild oben zeigt Zielbild (klein, nummeriert)
//   2. Puzzle-Teile liegen durcheinander in der Auswahl-Leiste
//   3. Dwell auf Teil → Teil wird ausgewählt (leuchtet)
//   4. Dwell auf Zielfeld im Grid → Teil wird platziert
//   5. Falsch platziert → visuelles Feedback, Teil zurück
//   6. Alle richtig → Gewonnen!

(function(){ "use strict";

// ══════════════════════════════════════════════════════════════════════════════
// BILD-KONFIGURATION — hier neue Bilder/Motive hinzufügen
//
// type: "css"  → eingebettetes CSS/SVG-Motiv (offline, kein Bild nötig)
// type: "img"  → externes Bild (JPEG/PNG), src relativ zu puzzle.html
//
// Für type:"img" muss die Datei unter app/modules/puzzle/images/ liegen.
// Das Bild wird per CSS object-fit:cover + object-position in Teile zerschnitten.
// ══════════════════════════════════════════════════════════════════════════════
const PUZZLE_IMAGES = {

  // ── CSS-Motive (eingebettet, immer verfügbar) ─────────────────────────────

  regenbogen: {
    id:    "regenbogen",
    label: "Regenbogen",
    type:  "css",
    // Jeder Teil bekommt einen CSS-Hintergrund (gradient/color)
    // Teile sind von links-oben nach rechts-unten nummeriert (0-basiert)
    // Für 3x3: 9 Teile, für 4x4: 16 Teile
    // css_tiles: Array von CSS background-strings, Länge = cols*rows
    // Wird pro Stufe unterschiedlich generiert (slice der passenden Länge)
    css_generator: (col, row, cols, rows) => {
      // Regenbogen: horizontale Farbstreifen
      const colors = ["#FF4444","#FF8800","#FFDD00","#44CC44","#2299FF","#6644FF","#CC44CC","#FF4499"];
      // Jede Zeile hat eine Farbe, jede Spalte leicht heller/dunkler
      const baseColor = colors[row % colors.length];
      const brightness = 85 + (col / Math.max(cols-1,1)) * 30;
      return `linear-gradient(135deg, ${baseColor} 0%, hsl(${getHue(baseColor)},80%,${brightness}%) 100%)`;
    },
    emoji: "🌈"
  },

  weltall: {
    id:    "weltall",
    label: "Weltall",
    type:  "css",
    css_generator: (col, row, cols, rows) => {
      // Weltall: dunkle Hintergründe mit Punkten/Sternen-Tönen
      const baseHues = [220, 240, 200, 260, 210, 250, 230, 270];
      const hue = baseHues[(row * cols + col) % baseHues.length];
      const light = 8 + (row / Math.max(rows-1,1)) * 12;
      const sat   = 40 + (col / Math.max(cols-1,1)) * 30;
      return `radial-gradient(circle at ${30+col*15}% ${30+row*15}%, hsl(${hue},${sat}%,${light+10}%) 0%, hsl(${hue},${sat}%,${light}%) 100%)`;
    },
    emoji: "🚀"
  },

  wiese: {
    id:    "wiese",
    label: "Wiese & Himmel",
    type:  "css",
    css_generator: (col, row, cols, rows) => {
      // Obere Hälfte = Himmel (blau→hellblau), untere = Wiese (grün)
      const himmelAnteil = Math.floor(rows * 0.5);
      if(row < himmelAnteil){
        const t = row / Math.max(himmelAnteil-1,1);
        const l = 45 + t * 25;
        return `linear-gradient(180deg, hsl(205,75%,${l+5}%) 0%, hsl(200,70%,${l}%) 100%)`;
      } else {
        const t = (row - himmelAnteil) / Math.max(rows - himmelAnteil - 1, 1);
        const l = 35 - t * 10;
        return `linear-gradient(180deg, hsl(120,55%,${l+5}%) 0%, hsl(115,50%,${l}%) 100%)`;
      }
    },
    emoji: "🌿"
  },

  ozean: {
    id:    "ozean",
    label: "Ozean",
    type:  "css",
    css_generator: (col, row, cols, rows) => {
      const t = row / Math.max(rows-1,1);
      const c = col / Math.max(cols-1,1);
      const hue  = 195 + t * 20;
      const light = 55 - t * 30;
      const sat   = 70 + c * 20;
      return `linear-gradient(135deg, hsl(${hue},${sat}%,${light+8}%) 0%, hsl(${hue+10},${sat}%,${light}%) 100%)`;
    },
    emoji: "🌊"
  },

  // ── Foto-Platzhalter (type:"img") ─────────────────────────────────────────
  // Aktivieren sobald Bilddatei unter app/modules/puzzle/images/ liegt.
  // Einfach auskommentieren und src-Pfad anpassen.

  // foto_katze: {
  //   id:    "foto_katze",
  //   label: "Katze",
  //   type:  "img",
  //   src:   "./images/katze.jpg",
  //   emoji: "🐱"
  // },

  // foto_hund: {
  //   id:    "foto_hund",
  //   label: "Hund",
  //   type:  "img",
  //   src:   "./images/hund.jpg",
  //   emoji: "🐶"
  // },

  // foto_laetitia: {
  //   id:    "foto_laetitia",
  //   label: "Mein Foto",
  //   type:  "img",
  //   src:   "./images/laetitia.jpg",
  //   emoji: "📷"
  // },

};

function getHue(hex){
  // Vereinfacht: gibt grob den Farbton zurück
  const map = {"#FF4444":0,"#FF8800":30,"#FFDD00":55,"#44CC44":120,"#2299FF":210,"#6644FF":260,"#CC44CC":300,"#FF4499":330};
  return map[hex] || 0;
}

// ══════════════════════════════════════════════════════════════════════════════
// STUFEN-KONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════
const STUFEN = [
  { id:"S1", label:"Stufe 1", cols:2, rows:2, beschreibung:"4 Teile · sehr einfach"  },
  { id:"S2", label:"Stufe 2", cols:3, rows:3, beschreibung:"9 Teile · einfach"       },
  { id:"S3", label:"Stufe 3", cols:4, rows:3, beschreibung:"12 Teile · mittel"       },
  { id:"S4", label:"Stufe 4", cols:4, rows:4, beschreibung:"16 Teile · schwer"       },
];

// ══════════════════════════════════════════════════════════════════════════════
// KONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════
const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 600;
const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;

// ══════════════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════════════
let activeImage  = Object.values(PUZZLE_IMAGES)[0];
let activeStufe  = null;
let pieces       = [];   // [{id, correctPos, currentPos|null, placed}]
                         // id = 0-basierter Index (0 = oben-links)
let selectedPiece = null; // id des aktuell ausgewählten Teils
let placedCount  = 0;
let moves        = 0;
let startTime    = null;
let timerInterval = null;

// Dwell
let _attachDwell = null;
let _dwellHandle = null;

// ══════════════════════════════════════════════════════════════════════════════
// DWELL
// ══════════════════════════════════════════════════════════════════════════════
function loadDwell(){
  if(_attachDwell) return _attachDwell;
  try{
    const scriptEl = document.querySelector('script[src*="puzzle_mod"]');
    const base = scriptEl ? scriptEl.src : location.href;
    const url  = new URL("../../core/dwell.js", base).href;
    if(typeof window.LaetitiaAttachDwell === "function"){
    _attachDwell = window.LaetitiaAttachDwell;
  } else { _attachDwell = function(){ return {cancelDwell:function(){}}; }; }
  }catch(e){
    console.warn("[Puzzle] dwell.js nicht geladen:", e);
    _attachDwell = () => ({ cancelDwell: ()=>{} });
  }
  return _attachDwell;
}

function rebindDwell(){
  if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
    _dwellHandle.cancelDwell();
  }
  var attach = loadDwell();
  const selector = [
    ".imgBtn", ".stufeBtn", ".pieceBtn:not([data-placed='1'])",
    ".targetCell:not([data-placed='1'])",
    "#btnRetry", "#btnMenu", "#btnReturnFromMenu",
    "[data-action='RETRY']", "[data-action='MENU']"
  ].join(", ");

  _dwellHandle = attach(selector, {
    dwellMs:    DWELL_MS,
    leaveGrace: LEAVE_GRACE,
    onActivate: (el) => {
      if(el.getAttribute("aria-disabled") === "true") return;
      if(el.getAttribute("data-disabled")  === "1")   return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ══════════════════════════════════════════════════════════════════════════════
function $(id){ return document.getElementById(id); }

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function formatTime(ms){
  const s = Math.floor(ms/1000);
  const m = Math.floor(s/60);
  return m > 0 ? `${m}:${String(s%60).padStart(2,"0")} min` : `${s} s`;
}

function setStatus(msg){
  const el = $("puzStatus");
  if(el) el.textContent = msg;
}

// Hintergrundstil für ein Puzzle-Teil generieren
function getTileStyle(image, col, row, cols, rows, size){
  if(image.type === "css"){
    return `background:${image.css_generator(col, row, cols, rows)};`;
  }
  if(image.type === "img"){
    // Bild wird per object-fit gestreckt, object-position zerschneidet
    const px = -(col * size);
    const py = -(row * size);
    return `background:none; overflow:hidden; position:relative;`;
    // img-Tag wird separat eingefügt (siehe renderPiece)
  }
  return "background:#ccc;";
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════════════════════
function hideAll(){
  ["screenMenu","screenGame","screenEnd"].forEach(id=> $(id)?.classList.add("hidden"));
}

function showMenu(){
  stopTimer();
  hideAll();
  $("screenMenu")?.classList.remove("hidden");
  renderImageButtons();
  renderStufeButtons();
  rebindDwell();
}

function showEnd(){
  stopTimer();
  hideAll();
  const elapsed = startTime ? Date.now() - startTime : 0;
  $("endEmoji").textContent  = "🎉";
  $("endTitle").textContent  = "Puzzle gelöst!";
  $("endMoves").textContent  = `Züge: ${moves}`;
  $("endTime").textContent   = `Zeit: ${formatTime(elapsed)}`;
  $("endStufe").textContent  = activeStufe?.label || "";
  $("screenEnd")?.classList.remove("hidden");
  rebindDwell();
  playLob();
}

// ══════════════════════════════════════════════════════════════════════════════
// MENÜ
// ══════════════════════════════════════════════════════════════════════════════
function renderImageButtons(){
  const container = $("imgGrid");
  if(!container) return;
  container.innerHTML = "";
  Object.values(PUZZLE_IMAGES).forEach(img=>{
    const btn = document.createElement("button");
    btn.className = "imgBtn" + (img.id === activeImage.id ? " imgBtn--active" : "");
    btn.dataset.imgId = img.id;

    // Mini-Vorschau
    const preview = document.createElement("div");
    preview.className = "imgPreview";
    if(img.type === "css"){
      // 4 kleine Kacheln als Vorschau (2x2)
      preview.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:2px; width:48px; height:48px; border-radius:6px; overflow:hidden;";
      for(let r=0;r<2;r++) for(let c=0;c<2;c++){
        const tile = document.createElement("div");
        tile.style.cssText = img.css_generator(c,r,2,2);
        preview.appendChild(tile);
      }
    } else if(img.type === "img"){
      const im = document.createElement("img");
      im.src = img.src;
      im.style.cssText = "width:48px; height:48px; object-fit:cover; border-radius:6px;";
      im.onerror = () => { im.style.display="none"; preview.textContent = img.emoji; };
      preview.appendChild(im);
    }

    btn.appendChild(preview);
    const label = document.createElement("span");
    label.className = "imgLabel";
    label.textContent = img.label;
    btn.appendChild(label);

    btn.addEventListener("click", ()=>{
      activeImage = PUZZLE_IMAGES[img.id];
      renderImageButtons();
      rebindDwell();
    });
    container.appendChild(btn);
  });
}

function renderStufeButtons(){
  const container = $("stufeGrid");
  if(!container) return;
  container.innerHTML = "";
  STUFEN.forEach(stufe=>{
    const btn = document.createElement("button");
    btn.className = "stufeBtn";
    btn.dataset.stufeId = stufe.id;
    btn.innerHTML = `
      <div class="stufeName">${stufe.label}</div>
      <div class="stufeDesc">${stufe.beschreibung}</div>`;
    btn.addEventListener("click", ()=> startGame(stufe));
    container.appendChild(btn);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SPIEL STARTEN
// ══════════════════════════════════════════════════════════════════════════════
function startGame(stufe){
  activeStufe   = stufe;
  selectedPiece = null;
  placedCount   = 0;
  moves         = 0;
  startTime     = Date.now();

  const total = stufe.cols * stufe.rows;

  // Pieces erstellen: id = korrekte Position (0 = oben-links, zeilenweise)
  const ids = Array.from({length: total}, (_,i) => i);
  const shuffled = shuffle(ids);

  pieces = ids.map(id => ({
    id,
    col:     id % stufe.cols,
    row:     Math.floor(id / stufe.cols),
    placed:  false,
    slotIdx: null  // welcher Slot in der Auswahl-Leiste
  }));

  // Zufällige Reihenfolge in der Auswahl-Leiste
  pieces.forEach((p, i) => { p.slotIdx = shuffled.indexOf(p.id); });

  hideAll();
  $("screenGame")?.classList.remove("hidden");
  updateStats();
  renderGame();
  startTimer();
}

// ══════════════════════════════════════════════════════════════════════════════
// SPIEL RENDERN
// ══════════════════════════════════════════════════════════════════════════════
function renderGame(){
  if(!activeStufe || !activeImage) return;
  const { cols, rows } = activeStufe;

  renderReferenceImage();
  renderTargetGrid();
  renderPieceBar();
  rebindDwell();
}

function renderReferenceImage(){
  const container = $("refImage");
  if(!container) return;
  const { cols, rows } = activeStufe;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows    = `repeat(${rows}, 1fr)`;
  container.innerHTML = "";

  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      const id = r * cols + c;
      const tile = document.createElement("div");
      tile.className = "refTile";
      applyTileStyle(tile, c, r, cols, rows, activeImage, "ref");
      // Nummer einblenden
      const num = document.createElement("span");
      num.className = "tileNum";
      num.textContent = id + 1;
      tile.appendChild(num);
      container.appendChild(tile);
    }
  }
}

function renderTargetGrid(){
  const container = $("targetGrid");
  if(!container) return;
  const { cols, rows } = activeStufe;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows    = `repeat(${rows}, 1fr)`;
  container.innerHTML = "";

  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      const id = r * cols + c;
      const piece = pieces[id];
      const cell = document.createElement("div");
      cell.className = "targetCell" + (piece.placed ? " targetCell--placed" : "");
      cell.dataset.targetId = String(id);
      if(piece.placed) cell.dataset.placed = "1";

      if(piece.placed){
        // Platziertes Teil anzeigen
        applyTileStyle(cell, c, r, cols, rows, activeImage, "target");
        const num = document.createElement("span");
        num.className = "tileNum tileNum--placed";
        num.textContent = id + 1;
        cell.appendChild(num);
      } else {
        // Leeres Zielfeld
        cell.innerHTML = `<span class="targetNum">${id + 1}</span>`;
        cell.addEventListener("click", ()=> onTargetClick(id));
      }
      container.appendChild(cell);
    }
  }
}

function renderPieceBar(){
  const container = $("pieceBar");
  if(!container) return;
  const { cols, rows } = activeStufe;
  container.innerHTML = "";

  // Stücke nach slotIdx sortiert anzeigen
  const sorted = [...pieces].sort((a,b) => a.slotIdx - b.slotIdx);

  sorted.forEach(piece=>{
    if(piece.placed){
      // Platzhalter für bereits platzierte Teile
      const ph = document.createElement("div");
      ph.className = "piecePlaceholder";
      container.appendChild(ph);
      return;
    }

    const btn = document.createElement("button");
    btn.className = "pieceBtn" + (selectedPiece === piece.id ? " pieceBtn--selected" : "");
    btn.dataset.pieceId = String(piece.id);
    applyTileStyle(btn, piece.col, piece.row, cols, rows, activeImage, "piece");

    const num = document.createElement("span");
    num.className = "tileNum";
    num.textContent = piece.id + 1;
    btn.appendChild(num);

    btn.addEventListener("click", ()=> onPieceClick(piece.id));
    container.appendChild(btn);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// STIL ANWENDEN
// ══════════════════════════════════════════════════════════════════════════════
function applyTileStyle(el, col, row, cols, rows, image, context){
  if(image.type === "css"){
    el.style.background = image.css_generator(col, row, cols, rows);
  } else if(image.type === "img"){
    // Bild per background-image zerschneiden
    const pctX = cols <= 1 ? 0 : (col / (cols-1)) * 100;
    const pctY = rows <= 1 ? 0 : (row / (rows-1)) * 100;
    el.style.backgroundImage    = `url('${image.src}')`;
    el.style.backgroundSize     = `${cols * 100}% ${rows * 100}%`;
    el.style.backgroundPosition = `${pctX}% ${pctY}%`;
    el.style.backgroundRepeat   = "no-repeat";
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// KLICK-HANDLER
// ══════════════════════════════════════════════════════════════════════════════
function onPieceClick(pieceId){
  const piece = pieces[pieceId];
  if(!piece || piece.placed) return;

  if(selectedPiece === pieceId){
    // Abwählen
    selectedPiece = null;
    setStatus("Teil abgewählt. Neues Teil wählen.");
  } else {
    selectedPiece = pieceId;
    setStatus(`Teil ${pieceId + 1} ausgewählt. Jetzt Zielfeld wählen.`);
  }
  renderPieceBar();
  rebindDwell();
}

function onTargetClick(targetId){
  if(selectedPiece === null){
    setStatus("Zuerst ein Teil aus der Leiste auswählen!");
    return;
  }

  const piece = pieces[selectedPiece];
  if(!piece || piece.placed) return;

  moves++;
  updateStats();

  if(selectedPiece === targetId){
    // RICHTIG
    piece.placed = true;
    placedCount++;
    selectedPiece = null;

    setStatus(`✅ Richtig! ${placedCount} von ${activeStufe.cols * activeStufe.rows} Teilen platziert.`);
    renderGame();

    if(placedCount === activeStufe.cols * activeStufe.rows){
      setTimeout(()=> showEnd(), 500);
    }
  } else {
    // FALSCH
    setStatus(`❌ Nicht ganz richtig — Teil ${selectedPiece + 1} gehört auf Feld ${selectedPiece + 1}, nicht ${targetId + 1}.`);

    // Kurzes visuelles Feedback am Zielfeld
    const targetEl = document.querySelector(`.targetCell[data-target-id="${targetId}"]`);
    if(targetEl){
      targetEl.classList.add("targetCell--wrong");
      setTimeout(()=> targetEl?.classList.remove("targetCell--wrong"), 800);
    }
    // Teil bleibt ausgewählt damit Kind nochmal versuchen kann
    // nach kurzer Pause Dwell neu binden
    setTimeout(()=> rebindDwell(), 300);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// STATS & TIMER
// ══════════════════════════════════════════════════════════════════════════════
function updateStats(){
  const el = $("puzStats");
  if(!el) return;
  const total = activeStufe?.cols * activeStufe?.rows || 0;
  el.textContent = `Züge: ${moves}  |  Teile: ${placedCount} / ${total}`;
}

function startTimer(){
  stopTimer();
  timerInterval = setInterval(()=>{
    const el = $("puzTimer");
    if(el && startTime) el.textContent = formatTime(Date.now() - startTime);
  }, 1000);
}

function stopTimer(){
  if(timerInterval){ clearInterval(timerInterval); timerInterval = null; }
}

// ══════════════════════════════════════════════════════════════════════════════
// AUDIO
// ══════════════════════════════════════════════════════════════════════════════
function playLob(){
  try{
    const AQ = window.LaetitiaAudioQueue;
    if(!AQ) return;
    const q = AQ.createQueue();
    q.play([{type:"wav", file:"audio/lob_01.wav", fallback:"Toll gemacht!"}]);
  }catch(e){}
}

// ══════════════════════════════════════════════════════════════════════════════
// EVENT-BINDING
// ══════════════════════════════════════════════════════════════════════════════
function bindUI(){
  $("btnRetry")?.addEventListener("click", ()=>{ if(activeStufe) startGame(activeStufe); });
  $("btnMenu") ?.addEventListener("click", ()=> showMenu());
  document.querySelectorAll("[data-action='RETRY']").forEach(el=>{
    el.addEventListener("click", ev=>{ ev.preventDefault(); if(activeStufe) startGame(activeStufe); });
  });
  document.querySelectorAll("[data-action='MENU']").forEach(el=>{
    el.addEventListener("click", ev=>{ ev.preventDefault(); showMenu(); });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════════
(async function init(){
  loadDwell();
  bindUI();
  showMenu();
})();

})();
