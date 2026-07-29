// deutsch_hilfe_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

const STOP = new Set([
  "der","die","das","ein","eine","einer","eines","einem","einen",
  "und","oder","aber","nicht","kein","keine","ist","sind","war","mit",
  "auf","in","im","am","an","aus","bei","zu","von","für","als","wie",
  "sie","er","es","ich","du","wir","ihr","sich","man","hat","haben",
  "wird","wird","nach","über","unter","beim","seit","ohne"
]);

// ── Parameter aus URL lesen ─────────────────────────────────────────────
const params = new URLSearchParams(location.search);
const taskText  = params.get("text")  || "";
const taskFrage = params.get("frage") || "";
const returnUrl = params.get("return") || "../../index.html";

// ── Wörter extrahieren ──────────────────────────────────────────────────
const wörter = [...new Set(
  [taskText, taskFrage].join(" ")
    .toLowerCase()
    .replace(/[^\wäöüß\s]/gi," ")
    .split(/\s+/)
    .filter(w => w.length >= 4 && !STOP.has(w))
)];

const glossar = window.LaetitiaGlossar || {};

// ── Wortliste aufbauen ──────────────────────────────────────────────────
const list = document.getElementById("wordList");
let activeWord = null;

wörter.forEach(w => {
  const eintrag = glossar[w];
  const row = document.createElement("div");
  row.className = "wordRow";
  row.dataset.word = w;

  const name = document.createElement("span");
  name.className = "wordName";
  name.textContent = w;

  const badge = document.createElement("span");
  badge.className = "wordBadge " + (eintrag ? "badge-ok" : "badge-tts");
  badge.textContent = eintrag ? "✓ Erklärung" : "🔊";

  row.appendChild(name);
  row.appendChild(badge);
  row.addEventListener("click", () => showWord(w));
  list.appendChild(row);
});

if(wörter.length === 0){
  list.innerHTML = '<div style="padding:12px;color:var(--muted);font-weight:900;">Keine Wörter gefunden.</div>';
}

// ── Wort anzeigen ───────────────────────────────────────────────────────
function showWord(w){
  // Aktiv-Markierung
  list.querySelectorAll(".wordRow").forEach(r => r.classList.remove("active"));
  const activeRow = list.querySelector(`.wordRow[data-word="${w}"]`);
  if(activeRow) activeRow.classList.add("active");
  activeWord = w;

  const eintrag = glossar[w];
  const empty   = document.getElementById("explainEmpty");
  const content = document.getElementById("explainContent");
  const btnSpeak = document.getElementById("btnSpeak");

  empty.style.display = "none";
  content.style.display = "flex";
  btnSpeak.style.display = "";

  document.getElementById("explainWord").textContent = w;

  if(eintrag && eintrag.erklaerung){
    // Erklärung parsen: [Wortart] Text | Synonym: ... | Gegenteil: ...
    let erk = eintrag.erklaerung;

    // Seltenpräfix entfernen (wird separat angezeigt)
    const isSelten = erk.startsWith("✨");
    erk = erk.replace("✨ Das ist ein ganz besonderes Wort — es lohnt sich, es zu lernen! ","");

    // Wortart extrahieren
    const wortartMatch = erk.match(/^\[([^\]]+)\]\s*/);
    let wortart = "", mainErk = erk;
    if(wortartMatch){
      wortart = wortartMatch[1];
      mainErk = erk.substring(wortartMatch[0].length);
    }

    // Teile aufsplitten
    const parts = mainErk.split(" | ");
    const hauptText = parts[0] || "";
    const metaParts = parts.slice(1);

    document.getElementById("explainWortart").textContent = wortart;
    document.getElementById("explainWortart").style.display = wortart ? "" : "none";
    document.getElementById("explainText").textContent = hauptText;
    document.getElementById("explainSelten").style.display = isSelten ? "" : "none";

    const meta = document.getElementById("explainMeta");
    meta.innerHTML = "";
    metaParts.forEach(p => {
      const div = document.createElement("div");
      div.className = "explain-meta-row";
      // "Synonym: ..." → fett "Synonym:", dann Text
      const colon = p.indexOf(":");
      if(colon > -1){
        div.innerHTML = `<strong>${p.substring(0,colon+1)}</strong>${p.substring(colon+1)}`;
      } else {
        div.textContent = p;
      }
      meta.appendChild(div);
    });
  } else {
    // Kein Glossar-Eintrag — nur vorlesen
    document.getElementById("explainWortart").style.display = "none";
    document.getElementById("explainText").textContent = "Für dieses Wort gibt es noch keine Erklärung. Du kannst es aber vorlesen lassen.";
    document.getElementById("explainMeta").innerHTML = "";
    document.getElementById("explainSelten").style.display = "none";
  }

  // Dwell neu binden (kein automatisches Vorlesen — Edge blockiert TTS ohne direkten Klick)
  rebindDwell();
}

// ── TTS — robust für file:// in Edge ────────────────────────────────────
// Edge liefert getVoices() beim ersten Aufruf leer → onvoiceschanged abwarten
let _deVoice = null;

function loadVoice(callback){
  if(_deVoice){ callback(_deVoice); return; }
  var voices = window.speechSynthesis.getVoices();
  var de = voices.find(v => (v.lang||"").toLowerCase().startsWith("de"));
  if(de){ _deVoice = de; callback(de); return; }
  // Noch nicht geladen — auf Event warten
  window.speechSynthesis.onvoiceschanged = function(){
    var v2 = window.speechSynthesis.getVoices();
    var de2 = v2.find(v => (v.lang||"").toLowerCase().startsWith("de"));
    _deVoice = de2 || null;
    callback(_deVoice);
    window.speechSynthesis.onvoiceschanged = null;
  };
  // Fallback: nach 800ms nochmal versuchen auch ohne Event
  setTimeout(function(){
    if(_deVoice) return;
    var v3 = window.speechSynthesis.getVoices();
    _deVoice = v3.find(v => (v.lang||"").toLowerCase().startsWith("de")) || null;
    callback(_deVoice);
  }, 800);
}

function speakWord(w, eintrag){
  var btn = document.getElementById("btnSpeak");
  var lbl = document.getElementById("btnSpeakLabel");
  // Zweiter Klick = Stopp
  if(window.speechSynthesis.speaking){
    window.speechSynthesis.cancel();
    if(btn) btn.classList.remove("speaking");
    if(lbl) lbl.textContent = "🔊 Erklärung vorlesen";
    return;
  }
  loadVoice(function(voice){
    try{
      window.speechSynthesis.cancel();
      var text = w;
      if(eintrag && eintrag.erklaerung){
        var erk = eintrag.erklaerung
          .replace("✨ Das ist ein ganz besonderes Wort — es lohnt sich, es zu lernen! ","")
          .replace(/\[[^\]]+\]\s*/,"")
          .replace(/ \| Synonym:[^|]*/,"")
          .replace(/ \| Gegenteil:[^|]*/,"");
        text = w + ". " + erk;
      }
      var u = new SpeechSynthesisUtterance(text);
      if(voice) u.voice = voice;
      u.lang  = "de-DE";
      u.rate  = 0.88;
      u.pitch = 1.0;
      if(btn) btn.classList.add("speaking");
      if(lbl) lbl.textContent = "⏹ Stopp";
      u.onend   = function(){
        if(btn) btn.classList.remove("speaking");
        if(lbl) lbl.textContent = "🔊 Erklärung vorlesen";
      };
      u.onerror = function(e){
        console.warn("TTS Fehler:",e);
        if(btn) btn.classList.remove("speaking");
        if(lbl) lbl.textContent = "🔊 Erklärung vorlesen";
      };
      window.speechSynthesis.speak(u);
    }catch(e){
      console.warn("TTS Exception:", e);
      if(btn) btn.classList.remove("speaking");
      if(lbl) lbl.textContent = "🔊 Erklärung vorlesen";
    }
  });
}

document.getElementById("btnSpeak").addEventListener("click", ()=>{
  if(activeWord) speakWord(activeWord, glossar[activeWord]);
});

// ── Zurück ───────────────────────────────────────────────────────────────
document.getElementById("btnBack").addEventListener("click", ()=>{
  history.back();
});

// ── Dwell ────────────────────────────────────────────────────────────────
const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 600;
const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;

function rebindDwell(){
  if(window._dwellHandle && typeof window._dwellHandle.cancelDwell === "function"){
    window._dwellHandle.cancelDwell();
  }
  const attach = window.LaetitiaAttachDwell;
  if(!attach) return;
  window._dwellHandle = attach(".wordRow, #btnBack, #btnSpeak", {
    dwellMs:    DWELL_MS,
    leaveGrace: LEAVE_GRACE,
    onActivate: (el) => {
      if(el.classList.contains("wordRow")) showWord(el.dataset.word);
      else try{ el.click(); }catch(e){}
    }
  });
}

// Stimmen sofort vorladen damit TTS beim ersten Klick funktioniert
loadVoice(function(v){
  console.log("TTS Stimme geladen:", v ? v.name : "Systemstimme");
});
setTimeout(rebindDwell, 100);
