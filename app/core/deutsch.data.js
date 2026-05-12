// app/core/dwell.js
// Dwell-System für Eye-Tracking / Hover-Fokus
// - Standard-Klick bleibt unangetastet
// - Dwell löst nach dwellMs eine Aktivierung aus
// - Respektiert disabled: aria-disabled="true" oder data-disabled="1"
// - leaveGrace: kurze Toleranzzeit bei mouseleave (verhindert Abbruch durch Zittern)

export function attachDwell(selector, opts = {}) {
  const dwellMs   = Number.isFinite(opts.dwellMs)   ? opts.dwellMs   : 800;
  // leaveGrace: ms die der Blick das Element verlassen darf ohne Abbruch
  // 120ms ist erprobt für Tobii/Nuvoice – bei Bedarf via opts.leaveGrace anpassen
  const leaveGrace = Number.isFinite(opts.leaveGrace) ? opts.leaveGrace : 120;

  const onActivate = opts.onActivate ?? ((el) => {
    const href = el.getAttribute("href");
    if (!href) return;
    const url = new URL(href, document.baseURI).href;
    window.location.assign(url);
  });

  let dwellTarget  = null;
  let dwellTimer   = null;
  let leaveTimer   = null; // Toleranz-Timer für mouseleave

  function isDisabled(el){
    if(!el) return true;
    const aria = (el.getAttribute("aria-disabled") || "").toLowerCase() === "true";
    const data = (el.getAttribute("data-disabled") || "") === "1";
    return aria || data;
  }

  function makeSvgRing() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "dwell-ring-svg");
    svg.setAttribute("viewBox", "0 0 70 70");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", "35");
    c.setAttribute("cy", "35");
    c.setAttribute("r", "32");
    svg.appendChild(c);
    return svg;
  }

  function cancelDwell() {
    if (leaveTimer)  { clearTimeout(leaveTimer);  leaveTimer  = null; }
    if (dwellTimer)  { clearTimeout(dwellTimer);  dwellTimer  = null; }
    if (dwellTarget) {
      dwellTarget.classList.remove("dwell-active");
      dwellTarget.querySelectorAll(".dwell-ring-svg").forEach((s) => s.remove());
      dwellTarget = null;
    }
  }

  function startDwell(el) {
    if (!el) return;
    if (isDisabled(el)) return;

    // Toleranz-Timer löschen falls Blick kurz weg war
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }

    // Bereits auf diesem Element → nichts tun, läuft schon
    if (dwellTarget === el) return;

    // Anderes Element → altes sauber abbrechen, neues starten
    cancelDwell();
    dwellTarget = el;

    el.classList.add("dwell-active");

    const svg = makeSvgRing();
    svg.style.setProperty("--dwell-duration", (dwellMs / 1000) + "s");
    el.appendChild(svg);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const c = svg.querySelector("circle");
        if (c) c.classList.add("animating");
      })
    );

    dwellTimer = setTimeout(() => {
      try {
        if(!isDisabled(el)) onActivate(el);
      } finally {
        cancelDwell();
      }
    }, dwellMs);
  }

  function scheduledLeave() {
    // Erst nach leaveGrace ms wirklich abbrechen
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
    leaveTimer = setTimeout(() => {
      leaveTimer = null;
      cancelDwell();
    }, leaveGrace);
  }

  // Listener nur einmal pro Element binden (data-dwell-bound verhindert Duplikate
  // wenn attachDwell mehrfach mit demselben Selektor aufgerufen wird)
  document.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.dwellBound === "1") return;
    el.dataset.dwellBound = "1";

    el.addEventListener("mouseenter", () => startDwell(el));
    el.addEventListener("mouseleave", scheduledLeave);
    el.addEventListener("focus",      () => startDwell(el));
    el.addEventListener("blur",       scheduledLeave);
  });

  return { cancelDwell };
}
