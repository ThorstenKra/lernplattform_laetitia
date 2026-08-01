// statistik_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Aktueller Modul-Filter ───────────────────────────────────────────────────
let aktivesModul = "alle";

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

function escHtml(s){
  return String(s||"")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// Aufgaben-ID parsen: "A2|1|Textanfang…|Frage…"
function parseAufgabeId(id){
  const parts = id.split("|");
  return {
    stufe: parts[0] || "?",
    seite: parts[1] || "?",
    text:  (parts[2] || "").slice(0, 60) + ((parts[2]||"").length > 60 ? "…" : ""),
    frage: (parts[3] || "").slice(0, 80)
  };
}

// Modul aus Aufgaben-ID ableiten (Prefix A/L/M)
function modulAusId(id){
  const stufe = (id.split("|")[0]||"").toUpperCase();
  if(stufe.startsWith("A")) return "deutsch";
  if(stufe.startsWith("L")) return "lesen";
  if(stufe.startsWith("M")) return "mathe";
  return "?";
}

function modulLabel(m){
  return {deutsch:"📖 Deutsch", lesen:"🔊 Lesen", mathe:"🔢 Mathe", logik:"🧩 Logik", schule_mathe:"📘 Schulheft", grammatik:"📝 Grammatik", reim:"🎵 Reimen", sinnesorgane:"👁️ Sinnesorgane"}[m] || m;
}

function msFormatieren(ms){
  if(ms == null) return "–";
  if(ms < 1000) return ms + " ms";
  return (ms/1000).toFixed(1) + " s";
}

// ── Daten berechnen ──────────────────────────────────────────────────────────
function getFilteredSessions(modul){
  const stats = window.LaetitiaStats ? window.LaetitiaStats.getStats() : {sessions:[]};
  if(!modul || modul === "alle") return stats.sessions;
  return stats.sessions.filter(s => s.modul === modul);
}

function berechneKPIs(sessions){
  let aufgaben = 0, richtig = 0;
  for(const s of sessions){
    for(const a of s.aufgaben){
      if(a.richtig !== null){ aufgaben++; if(a.richtig) richtig++; }
    }
  }
  return {
    sessions: sessions.length,
    aufgaben,
    richtig,
    quote: aufgaben > 0 ? Math.round((richtig/aufgaben)*100) : null
  };
}

function berechneFortschrittProModul(sessions){
  const module = ["deutsch","lesen","mathe","logik","schule_mathe","grammatik","reim","sinnesorgane"];
  const result = [];
  for(const m of module){
    const ms = sessions.filter(s => s.modul === m);
    if(!ms.length) continue;
    let richtig = 0, gesamt = 0;
    for(const s of ms) for(const a of s.aufgaben){
      if(a.richtig !== null){ gesamt++; if(a.richtig) richtig++; }
    }
    result.push({ modul: m, richtig, gesamt, sessions: ms.length });
  }
  return result;
}

// ── Render-Funktionen ────────────────────────────────────────────────────────

function renderKPIs(sessions){
  const k = berechneKPIs(sessions);
  $("kpiSessions").textContent = k.sessions;
  $("kpiAufgaben").textContent = k.aufgaben;
  $("kpiRichtig").textContent  = k.richtig;
  $("kpiQuote").textContent    = k.quote !== null ? k.quote + "%" : "–";
}

function renderFortschritt(sessions, modul){
  const el = $("fortschrittContent");
  const sf = $("sectionFortschritt");

  if(modul !== "alle"){
    // Einzelmodul: kompakten Balken anzeigen
    sf.style.display = "";
    let richtig = 0, gesamt = 0;
    for(const s of sessions) for(const a of s.aufgaben){
      if(a.richtig !== null){ gesamt++; if(a.richtig) richtig++; }
    }
    if(!gesamt){
      el.innerHTML = `<div class="empty"><span class="empty-icon">📭</span>Noch keine Daten für dieses Modul.</div>`;
      return;
    }
    const pct = Math.round((richtig/gesamt)*100);
    el.innerHTML = `
      <div class="modul-row">
        <div class="modul-label">${escHtml(modulLabel(modul))}</div>
        <div class="bar-track">
          <div class="bar-richtig" style="width:${pct}%">
            ${pct > 12 ? `<span class="bar-label">${richtig} richtig</span>` : ""}
          </div>
        </div>
        <div class="modul-pct">${pct}%</div>
        <div class="modul-sessions">${sessions.length} Sessions</div>
      </div>`;
    return;
  }

  // Alle Module
  const rows = berechneFortschrittProModul(sessions);
  if(!rows.length){
    el.innerHTML = `<div class="empty"><span class="empty-icon">📭</span>Noch keine Statistik-Daten vorhanden.</div>`;
    return;
  }
  el.innerHTML = rows.map(r => {
    const pct = r.gesamt > 0 ? Math.round((r.richtig/r.gesamt)*100) : 0;
    return `<div class="modul-row">
      <div class="modul-label">${escHtml(modulLabel(r.modul))}</div>
      <div class="bar-track">
        <div class="bar-richtig" style="width:${pct}%">
          ${pct > 12 ? `<span class="bar-label">${r.richtig} richtig</span>` : ""}
        </div>
      </div>
      <div class="modul-pct">${pct}%</div>
      <div class="modul-sessions">${r.sessions} Sessions</div>
    </div>`;
  }).join("");
}

function renderSchwach(modul){
  const el = $("schwachContent");
  if(!window.LaetitiaStats){ el.innerHTML = `<div class="empty">Stats nicht verfügbar.</div>`; return; }

  const m = modul === "alle" ? null : modul;
  const liste = window.LaetitiaStats.schwacheAufgaben(m);

  if(!liste.length){
    el.innerHTML = `<div class="empty"><span class="empty-icon">✅</span>Keine schwachen Aufgaben – weiter so!</div>`;
    return;
  }

  el.innerHTML = liste.slice(0, 15).map(a => {
    const p = parseAufgabeId(a.id);
    const cl = a.fehlerRate >= 75 ? "rot" : "warn";
    return `<div class="aufgabe-row">
      <div class="aufgabe-badge ${cl}">${a.fehlerRate}%</div>
      <div class="aufgabe-id">
        <strong>${escHtml(p.stufe)} · Seite ${escHtml(p.seite)}</strong>
        ${escHtml(p.frage || p.text)}
      </div>
      <div class="aufgabe-meta">${a.gesamt}× · ⌀ ${msFormatieren(a.avgMs)}</div>
    </div>`;
  }).join("");
}

function renderHilfe(modul){
  const el = $("hilfeContent");
  if(!window.LaetitiaStats){ el.innerHTML = `<div class="empty">Stats nicht verfügbar.</div>`; return; }

  const m = modul === "alle" ? null : modul;
  const liste = window.LaetitiaStats.hilfeWortRanking(m);

  if(!liste.length){
    el.innerHTML = `<div class="empty"><span class="empty-icon">📖</span>Noch keine Hilfe-Wörter nachgeschlagen.</div>`;
    return;
  }

  el.innerHTML = `<div class="wort-chips">` +
    liste.slice(0, 20).map(w =>
      `<div class="wort-chip">${escHtml(w.wort)}<span class="cnt">${w.anzahl}×</span></div>`
    ).join("") +
    `</div>`;
}

function renderEmpfehlungen(modul){
  const el = $("empfehlungContent");
  if(!window.LaetitiaStats){ el.innerHTML = `<div class="empty">Stats nicht verfügbar.</div>`; return; }

  const m = modul === "alle" ? null : modul;
  const liste = window.LaetitiaStats.levelEmpfehlungen(m);

  if(!liste.length){
    el.innerHTML = `<div class="empty"><span class="empty-icon">🎯</span>Noch kein Level 3× fehlerfrei gespielt.</div>`;
    return;
  }

  el.innerHTML = liste.map(e =>
    `<div class="empfehlung-row">
      <div class="empf-badge">${escHtml(e.modul)} ${escHtml(e.stufe)}</div>
      <div class="empf-text">Bereit für nächstes Level</div>
      <div class="empf-sessions">${e.allesRichtig}× fehlerfrei / ${e.sessions} Sessions</div>
    </div>`
  ).join("");
}

function renderMuster(modul){
  const el = $("musterContent");
  if(!window.LaetitiaStats){ el.innerHTML = `<div class="empty">Stats nicht verfügbar.</div>`; return; }

  const module = modul === "alle"
    ? ["deutsch","lesen","mathe","logik","schule_mathe","grammatik","reim","sinnesorgane"]
    : [modul];

  const warnungen = [];
  for(const m of module){
    const w = window.LaetitiaStats.musterWarnung(m, 10);
    if(w) warnungen.push({ modul: m, ...w });
  }

  if(!warnungen.length){
    el.innerHTML = `<div class="muster-box ok">
      <div class="muster-icon">✅</div>
      <div>
        <div class="muster-title">Kein Muster erkannt</div>
        <div class="muster-desc">Die Antwort-Buttons werden abwechslungsreich genutzt.</div>
      </div>
    </div>`;
    return;
  }

  el.innerHTML = warnungen.map(w =>
    `<div class="muster-box warn" style="margin-bottom:8px;">
      <div class="muster-icon">⚠️</div>
      <div>
        <div class="muster-title">${escHtml(modulLabel(w.modul))}: Muster-Verdacht</div>
        <div class="muster-desc">${escHtml(w.warnung)}<br>
        Insgesamt ${w.gesamt} Antworten ausgewertet.</div>
      </div>
    </div>`
  ).join("");
}

// ── Alles rendern ────────────────────────────────────────────────────────────
function render(modul){
  const sessions = getFilteredSessions(modul);
  const stats    = window.LaetitiaStats ? window.LaetitiaStats.getStats() : {sessions:[]};
  const total    = stats.sessions.length;

  $("headerSub").textContent = `${total} Sessions gesamt · Stand: ${new Date().toLocaleDateString("de-DE")}`;

  renderKPIs(sessions);
  renderFortschritt(sessions, modul);
  renderSchwach(modul);
  renderHilfe(modul);
  renderEmpfehlungen(modul);
  renderMuster(modul);
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    aktivesModul = tab.dataset.modul;
    render(aktivesModul);
  });
});

// ── Statistik löschen ────────────────────────────────────────────────────────
$("btnClear").addEventListener("click", () => {
  if(!confirm("Wirklich alle Statistik-Daten löschen? Das kann nicht rückgängig gemacht werden.")) return;
  if(window.LaetitiaStats) window.LaetitiaStats.clearStats();
  const fb = $("clearFeedback");
  fb.classList.add("show");
  setTimeout(() => fb.classList.remove("show"), 3000);
  render(aktivesModul);
});

// ── Init ─────────────────────────────────────────────────────────────────────
render(aktivesModul);
