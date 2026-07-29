// glossar_mod.js -- Laetitia Lernsystem
// REGEL 4: Nur gerade Anfuehrungszeichen
// Hinweis: bewusst NICHT IIFE-gewrapt -- toggleUpload()/saveGlossar()/
// exportGlossar()/onErklaerung()/cycleNuvoice()/speakWord()/speakErklaerung()/
// speakAll() muessen global bleiben fuer onclick-Attribute im HTML.
"use strict";

const STORAGE_KEY = "laetitia_glossar_v1";
const PAGE_SIZE   = 50;
let currentPage   = 0;
let filteredWords = [];

// ── Glossar laden ────────────────────────────────────────────────────────────
// Priorität: localStorage → window.LaetitiaGlossar (glossar.js)
let glossar = {};

function loadGlossar(){
  // 1. localStorage (gespeicherte Änderungen)
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) glossar = JSON.parse(raw);
  }catch{}

  // 2. glossar.js als Basis-Vorlage (neue Wörter die noch nicht im localStorage sind)
  if(window.LaetitiaGlossar){
    Object.entries(window.LaetitiaGlossar).forEach(([w, data]) => {
      if(!glossar[w]){
        glossar[w] = { ...data };
      }
    });
  }
}

function saveGlossar(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(glossar));
    const msg = document.getElementById("saveMsg");
    msg.classList.add("show");
    setTimeout(()=> msg.classList.remove("show"), 2500);
    updateStats();
  }catch(e){ alert("Fehler beim Speichern: " + e.message); }
}

// ── Statistiken ──────────────────────────────────────────────────────────────
function updateStats(){
  const all    = Object.keys(glossar).length;
  const filled = Object.values(glossar).filter(v => v.erklaerung && v.erklaerung.trim()).length;
  const nuvNull = Object.values(glossar).filter(v => v.nuvoice === null).length;
  document.getElementById("statTotal").textContent  = all;
  document.getElementById("statFilled").textContent = filled;
  document.getElementById("statEmpty").textContent  = all - filled;
  document.getElementById("statNuv").textContent    = nuvNull;
}

// ── Tabelle rendern ───────────────────────────────────────────────────────────
function getFiltered(){
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const filter = document.getElementById("filterSel")?.value || "all";

  return Object.entries(glossar).filter(([w, data]) => {
    if(search && !w.toLowerCase().includes(search)) return false;
    if(filter === "empty"    && (data.erklaerung && data.erklaerung.trim())) return false;
    if(filter === "filled"   && !(data.erklaerung && data.erklaerung.trim())) return false;
    if(filter === "nuv_no"   && data.nuvoice !== false) return false;
    if(filter === "nuv_null" && data.nuvoice !== null)  return false;
    if(filter === "nuv_yes"  && data.nuvoice !== true)  return false;
    return true;
  });
}

function renderTable(){
  filteredWords = getFiltered();
  const total   = filteredWords.length;
  const start   = currentPage * PAGE_SIZE;
  const page    = filteredWords.slice(start, start + PAGE_SIZE);

  document.getElementById("countLabel").textContent =
    `${total} Wörter${total !== Object.keys(glossar).length ? " (gefiltert)" : ""}`;

  const tbody = document.getElementById("glossarBody");
  tbody.innerHTML = "";

  page.forEach(([w, data], i) => {
    const globalIdx = start + i + 1;
    const hasFill = data.erklaerung && data.erklaerung.trim();
    const nuvClass = data.nuvoice === true ? "nuv-yes" : data.nuvoice === false ? "nuv-no" : "nuv-null";
    const nuvText  = data.nuvoice === true ? "✅ vorhanden" : data.nuvoice === false ? "❌ fehlt" : "⚠ ungeprüft";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="freq-cell">${globalIdx}</td>
      <td class="word-cell">${w}
        <span style="font-size:10px;color:var(--muted);font-weight:800">
          ${data.freq ? " ·"+data.freq+"×" : ""}
        </span>
      </td>
      <td class="freq-cell">${data.freq || ""}</td>
      <td>
        <input class="erklaerung-input ${hasFill ? "filled" : ""}"
          type="text" value="${escHtml(data.erklaerung || "")}"
          placeholder="Erklärung eingeben…"
          data-word="${escAttr(w)}"
          oninput="onErklaerung(this)">
      </td>
      <td>
        <span class="nuv-badge ${nuvClass}" onclick="cycleNuvoice('${escAttr(w)}')"
          title="Klick zum Umschalten">
          ${nuvText}
        </span>
      </td>
      <td style="display:flex;gap:4px;flex-wrap:wrap">
        <button class="rowBtn speak" onclick="speakWord('${escAttr(w)}')">🔊</button>
        <button class="rowBtn" onclick="speakErklaerung('${escAttr(w)}')">📖</button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Pager
  const pager = document.getElementById("pager");
  const pages = Math.ceil(total / PAGE_SIZE);
  pager.innerHTML = "";
  if(pages > 1){
    pager.innerHTML = `<span>Seite ${currentPage+1} von ${pages}</span>`;
    for(let p=0; p<pages; p++){
      const btn = document.createElement("button");
      btn.className = "rowBtn" + (p===currentPage?" "+" dwell-active":"");
      btn.style.cssText = p===currentPage ? "background:var(--green);color:#0b1b10;" : "";
      btn.textContent = p+1;
      btn.onclick = ()=>{ currentPage=p; renderTable(); };
      pager.appendChild(btn);
    }
  }
}

function escHtml(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function escAttr(s){ return (s||"").replace(/'/g,"\\'"); }

// ── Event-Handler ─────────────────────────────────────────────────────────────
function onErklaerung(input){
  const w = input.dataset.word;
  if(!glossar[w]) return;
  glossar[w].erklaerung = input.value;
  input.classList.toggle("filled", !!(input.value.trim()));
}

function cycleNuvoice(w){
  if(!glossar[w]) return;
  const cur = glossar[w].nuvoice;
  glossar[w].nuvoice = cur === null ? true : cur === true ? false : null;
  renderTable();
  updateStats();
}

// ── TTS ──────────────────────────────────────────────────────────────────────
function speak(text, rate){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const de = voices.find(v => (v.lang||"").toLowerCase().startsWith("de"));
    if(de) u.voice = de;
    u.rate  = rate || 0.90;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  }catch(e){ console.warn("TTS Fehler:", e); }
}

function speakWord(w){ speak(w, 0.75); }

function speakErklaerung(w){
  const data = glossar[w];
  if(!data) return;
  if(data.erklaerung && data.erklaerung.trim()){
    speak(w + ". " + data.erklaerung, 0.85);
  } else {
    speak(w + " — keine Erklärung vorhanden.", 0.85);
  }
}

function speakAll(){
  const words = filteredWords.slice(0, 10); // max 10 auf einmal
  if(!words.length) return;
  let i = 0;
  function next(){
    if(i >= words.length) return;
    const [w, data] = words[i++];
    const text = data.erklaerung ? `${w}: ${data.erklaerung}` : w;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const de = voices.find(v => (v.lang||"").toLowerCase().startsWith("de"));
      if(de) u.voice = de;
      u.rate = 0.85;
      u.onend = next;
      speechSynthesis.speak(u);
    }catch{}
  }
  next();
}

// ── Nuvoice-Import ────────────────────────────────────────────────────────────
function toggleUpload(){
  const z = document.getElementById("uploadZone");
  z.classList.toggle("hidden");
}

document.getElementById("nuvoiceFile").addEventListener("change", function(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    const text = ev.target.result;
    // Ein Wort pro Zeile, Leerzeilen ignorieren
    const nuvoiceWords = new Set(
      text.split(/\r?\n/)
        .map(l => l.trim().toLowerCase())
        .filter(l => l.length > 0)
    );

    let matched = 0, notFound = 0;
    Object.keys(glossar).forEach(w => {
      if(nuvoiceWords.has(w.toLowerCase())){
        glossar[w].nuvoice = true; matched++;
      } else {
        glossar[w].nuvoice = false; notFound++;
      }
    });

    document.getElementById("uploadResult").textContent =
      `✅ Importiert: ${nuvoiceWords.size} Wörter. Abgeglichen: ${matched} vorhanden, ${notFound} fehlen im Nuvoice-Wortschatz.`;
    renderTable();
    updateStats();
  };
  reader.readAsText(file, "utf-8");
});

// ── Export ────────────────────────────────────────────────────────────────────
function exportGlossar(){
  // Als glossar.js-Datei exportieren
  let out = "// app/core/glossar.js\n";
  out += "// Glossar für Laetitia Lernsystem\n";
  out += "// Exportiert: " + new Date().toLocaleDateString("de-DE") + "\n\n";
  out += "(function(){\n\"use strict\";\n\n";
  out += "window.LaetitiaGlossar = {\n\n";

  Object.entries(glossar).forEach(([w, data]) => {
    const erk  = (data.erklaerung || "").replace(/"/g, '\\"');
    const nuv  = data.nuvoice === true ? "true" : data.nuvoice === false ? "false" : "null";
    const freq = data.freq ? `  // ${data.freq}x\n` : "";
    out += `${freq}  "${w}": { erklaerung: "${erk}", nuvoice: ${nuv} },\n`;
  });

  out += "\n};\n\n})();\n";

  const blob = new Blob([out], {type:"text/javascript"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "glossar.js";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadGlossar();
updateStats();
renderTable();
try{ speechSynthesis.getVoices(); }catch{}
