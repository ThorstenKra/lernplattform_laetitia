// schach_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

// dwell.js geladen als <script src>
var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };

// ── Fortschritt aus König-Modul laden ─────────────────────────────────────
function loadKoenigState(){
  try{ const raw = localStorage.getItem("koenig_v2"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
function loadTurmState(){
  try{ const raw = localStorage.getItem("turm_v1"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
function loadBauerState(){
  try{ const raw = localStorage.getItem("bauer_v1"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
function loadDameState(){
  try{ const raw = localStorage.getItem("dame_v1"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
function loadSpringerState(){
  try{ const raw = localStorage.getItem("springer_v1"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
function loadLaeuferState(){
  try{ const raw = localStorage.getItem("laeufer_v1"); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}

function updateProgress(){
  const sk = loadKoenigState();
  const st = loadTurmState();
  const sl = loadLaeuferState();
  const sb = loadBauerState();
  const sd = loadDameState();
  const ss = loadSpringerState();

  const kStars     = sk ? (sk.stars||0) : 0;
  const kCompleted = sk ? Object.keys(sk.completed||{}).length : 0;
  const kTotal     = 14;
  const tStars     = st ? (st.stars||0) : 0;
  const tCompleted = st ? Object.keys(st.completed||{}).length : 0;
  const tTotal     = 15;
  const lStars     = sl ? (sl.stars||0) : 0;
  const lCompleted = sl ? Object.keys(sl.completed||{}).length : 0;
  const lTotal     = 15;
  const bStars     = sb ? (sb.stars||0) : 0;
  const bCompleted = sb ? Object.keys(sb.completed||{}).length : 0;
  const bTotal     = 15;
  const dStars     = sd ? (sd.stars||0) : 0;
  const dCompleted = sd ? Object.keys(sd.completed||{}).length : 0;
  const dTotal     = 15;
  const sStars     = ss ? (ss.stars||0) : 0;
  const sCompleted = ss ? Object.keys(ss.completed||{}).length : 0;
  const sTotal     = 15;

  // Gesamt-Sterne
  document.getElementById("progressStars").textContent = "⭐ " + (kStars + tStars + lStars + sStars + dStars + bStars);

  // Balken: König + Turm + Läufer je 1/6 des Gesamtbalkens
  const pct = Math.round(
    ((kCompleted/kTotal) + (tCompleted/tTotal) + (lCompleted/lTotal) + (sCompleted/sTotal) + (dCompleted/dTotal) + (bCompleted/bTotal)) * (100/6)
  );
  document.getElementById("progressFill").style.width = Math.min(pct, 100) + "%";

  // König-Sterne
  const skEl = document.getElementById("starsKoenig");
  if(skEl){ skEl.textContent = "⭐".repeat(Math.min(kStars,3)) + "☆".repeat(Math.max(0,3-Math.min(kStars,3))); }
  if(kCompleted >= kTotal){
    const b = document.querySelector("#btnKoenig .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }

  // Turm-Sterne
  const stEl = document.getElementById("starsTurm");
  if(stEl){ stEl.textContent = "⭐".repeat(Math.min(tStars,3)) + "☆".repeat(Math.max(0,3-Math.min(tStars,3))); }
  if(tCompleted >= tTotal){
    const b = document.querySelector("#btnTurm .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }

  // Läufer-Sterne
  const slEl = document.getElementById("starsLaeufer");
  if(slEl){ slEl.textContent = "⭐".repeat(Math.min(lStars,3)) + "☆".repeat(Math.max(0,3-Math.min(lStars,3))); }
  if(lCompleted >= lTotal){
    const b = document.querySelector("#btnLaeufer .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }

  // Dame-Sterne
  const sdEl = document.getElementById("starsDame");
  if(sdEl){ sdEl.textContent = "⭐".repeat(Math.min(dStars,3)) + "☆".repeat(Math.max(0,3-Math.min(dStars,3))); }
  if(dCompleted >= dTotal){
    const b = document.querySelector("#btnDame .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }

  // Bauer-Sterne
  const sbEl = document.getElementById("starsBauer");
  if(sbEl){ sbEl.textContent = "⭐".repeat(Math.min(bStars,3)) + "☆".repeat(Math.max(0,3-Math.min(bStars,3))); }
  if(bCompleted >= bTotal){
    const b = document.querySelector("#btnBauer .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }

  // Springer-Sterne
  const ssEl = document.getElementById("starsSpringer");
  if(ssEl){ ssEl.textContent = "⭐".repeat(Math.min(sStars,3)) + "☆".repeat(Math.max(0,3-Math.min(sStars,3))); }
  if(sCompleted >= sTotal){
    const b = document.querySelector("#btnSpringer .fig-badge");
    if(b){ b.textContent = "✓ fertig"; b.className = "fig-badge done"; }
  }
}

updateProgress();

// ── Return-URL für Untermodule setzen ────────────────────────────────────
// König und Turm lesen laetitia_return_url_v1 um zurückzuspringen.
// schach.html muss sich selbst als Ziel eintragen bevor ein Modul geöffnet wird.
try{
  var eigeneUrl = new URL(window.location.href).href;
  localStorage.setItem("laetitia_return_url_v1", eigeneUrl);
}catch(e){}

// ── Dwell binden ──────────────────────────────────────────────────────────
const dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
const leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;

// Direkt pointerenter binden (wie Eierjagd) — funktioniert auf Tobii Accent
document.querySelectorAll("a.figBtn:not(.locked), #btnZurueck").forEach(function(el){
  var timer = null;

  function start(){
    if(timer) return;
    el.classList.add("dwell-active");
    timer = setTimeout(function(){
      timer = null;
      try{ el.click(); }catch(e){}
    }, dwellMs);
  }
  function stop(){
    if(timer){ clearTimeout(timer); timer = null; }
    el.classList.remove("dwell-active");
  }

  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("click",        stop);
  // Desktop-Fallback
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
});
