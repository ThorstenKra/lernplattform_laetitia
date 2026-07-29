// pruefung_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  var nErr = 0, nWrn = 0, nOk = 0;
  var out = document.getElementById("out");

  function add(cls, prefix, msg){
    var d = document.createElement("div");
    d.className = "item " + cls;
    d.textContent = prefix + " " + msg;
    out.appendChild(d);
  }
  function head(t){ add("head","—",t); }
  function ok(m)  { add("ok", "✓",m); nOk++; }
  function wrn(m) { add("wrn","⚠",m); nWrn++; }
  function err(m) { add("err","✗",m); nErr++; }

  // ── Core-Systeme ────────────────────────────────────────────────
  head("Core-Systeme");

  if(window.LaetitiaAttachDwell)
    ok("dwell.js: LaetitiaAttachDwell geladen");
  else
    err("dwell.js: LaetitiaAttachDwell fehlt — Dwell-Steuerung defekt!");

  if(window._LDwellState)
    ok("_LDwellState initialisiert (dwellMs=" + (window._LDwellState.dwellMs||"?") + "ms)");
  else
    err("_LDwellState fehlt");

  if(window.LaetitiaFehler && typeof window.LaetitiaFehler.zeige === "function")
    ok("error_handler.js: LaetitiaFehler.zeige() verfügbar");
  else
    err("error_handler.js: LaetitiaFehler fehlt");

  if(window.LaetitiaConfig)
    ok("config.js: LaetitiaConfig geladen");
  else
    err("config.js: LaetitiaConfig fehlt");

  if(window.LaetitiaStorage && typeof window.LaetitiaStorage.getJson === "function")
    ok("storage.js: LaetitiaStorage geladen");
  else
    wrn("storage.js: LaetitiaStorage nicht gefunden");

  if(window.LaetitiaDataRegistryApi)
    ok("dataRegistry.js: LaetitiaDataRegistryApi geladen");
  else
    err("dataRegistry.js: LaetitiaDataRegistryApi fehlt");

  // ── localStorage ────────────────────────────────────────────────
  head("localStorage");
  try{
    localStorage.setItem("_pruef","1");
    if(localStorage.getItem("_pruef") === "1"){ ok("Lesen/Schreiben funktioniert"); }
    else { err("Schreiben fehlgeschlagen"); }
    localStorage.removeItem("_pruef");
  }catch(e){ err("localStorage Fehler: " + e.message); }

  var dwMs = parseInt(localStorage.getItem("laetitia_dwell_ms"));
  if(dwMs > 0) ok("laetitia_dwell_ms = " + dwMs + " ms");
  else         wrn("laetitia_dwell_ms nicht gesetzt (Standard wird verwendet)");

  var inputMode = localStorage.getItem("laetitia_input_mode") || "(nicht gesetzt → tobii)";
  ok("laetitia_input_mode = " + inputMode);

  // ── TTS (async — verzögert prüfen) ─────────────────────────────
  head("Text-to-Speech (TTS)");
  if(typeof speechSynthesis === "undefined"){
    err("speechSynthesis nicht verfügbar");
    ttsCheck([]);
  } else {
    var voices = speechSynthesis.getVoices();
    if(voices.length > 0){ ttsCheck(voices); }
    else {
      speechSynthesis.onvoiceschanged = function(){
        ttsCheck(speechSynthesis.getVoices());
        renderSummary();
      };
      setTimeout(function(){
        if(speechSynthesis.getVoices().length === 0){
          err("Stimmen konnten nicht geladen werden");
          renderSummary();
        }
      }, 2000);
    }
  }

  function ttsCheck(voices){
    var katja = voices.find(function(v){ return v.name && v.name.indexOf("Katja") >= 0; });
    var de    = voices.find(function(v){ return (v.lang||"").toLowerCase().startsWith("de"); });
    if(katja)
      ok("Microsoft Katja Online verfügbar (" + katja.lang + ")");
    else if(de)
      wrn("Katja nicht gefunden — Fallback: " + de.name + " (" + de.lang + ")");
    else
      err("Keine deutsche TTS-Stimme gefunden!");
    ok("Gesamt " + voices.length + " Stimmen verfügbar");
  }

  // ── Browser-Fähigkeiten ─────────────────────────────────────────
  head("Browser-Fähigkeiten");
  if(typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined")
    ok("Web Audio API verfügbar");
  else
    wrn("Web Audio API nicht gefunden");

  if(typeof fetch !== "undefined") ok("fetch() verfügbar");
  else wrn("fetch() nicht verfügbar");

  if(typeof URL !== "undefined") ok("URL API verfügbar");
  else err("URL API fehlt");

  // ── Zusammenfassung ─────────────────────────────────────────────
  function renderSummary(){
    var sum = document.getElementById("summary");
    var total = nErr + nWrn + nOk;
    var bg = nErr > 0 ? "#fee2e2" : nWrn > 0 ? "#fef3c7" : "#d1fae5";
    var col = nErr > 0 ? "#991b1b" : nWrn > 0 ? "#92400e" : "#065f46";
    sum.style.background = bg;
    sum.style.color = col;
    var msg = nErr > 0 ? "Fehler beheben!" : nWrn > 0 ? "Warnungen prüfen." : "Alle Prüfungen bestanden.";
    sum.textContent = nErr + " Fehler  |  " + nWrn + " Warnungen  |  " + nOk + " OK  —  " + msg;
  }
  renderSummary();

})();
