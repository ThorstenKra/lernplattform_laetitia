// grammatik_mod.js — Spiellogik für die Grammatik-Werkstatt  v3
// Layout-Prinzip: Lesebereich (passiv) OBEN, Aktionsbereich (dwell) UNTEN.
// Nach Antwort: Buttons vollständig ausgeblendet, Feedback sichtbar,
//               nach TTS-Ende 3 s Auto-Weiter (oder sofort per Weiter-Button).

(function(){

var STORAGE_KEY = "laetitia_grammatik_v1";

var LOB_TEXTE = [
  "Super! Das war richtig!",
  "Fantastisch! Du bist so klug!",
  "Wow, genau richtig! Toll!",
  "Ja! Das hast du prima erkannt!",
  "Wunderbar! Weiter so!",
  "Perfekt! Ich bin stolz auf dich!",
  "Klasse! Das war die richtige Antwort!",
  "Sehr gut! Du lernst das richtig schnell!"
];

function zufallsLob(){
  return LOB_TEXTE[Math.floor(Math.random() * LOB_TEXTE.length)];
}

// ── Fortschritt speichern/laden ──────────────────────────────────
function ladeStand(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function speichereStand(stand){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(stand)); }catch(e){}
}

// ── TTS (Goldstandard) ───────────────────────────────────────────
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.90;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
          || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
          || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      setTimeout(function(){
        var fired = false; var watchdog = null;
        function naechster(){
          if(fired) return; fired = true;
          if(watchdog) clearTimeout(watchdog);
          if(danach) setTimeout(danach, 300);
        }
        u.onend = naechster; u.onerror = naechster;
        watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
        speechSynthesis.speak(u);
      }, 120);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}

// ── Dwell ────────────────────────────────────────────────────────
var dwellCtrl = null;
function bindeDwell(selector){
  if(dwellCtrl) dwellCtrl.cancelDwell();
  var attach     = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  dwellCtrl = attach(selector, {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.disabled || el.classList.contains("gesperrt")) return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── Auto-Weiter-Timer ────────────────────────────────────────────
var autoTimer = null;

function starteAutoWeiter(fn){
  stoppAutoWeiter();
  autoTimer = setTimeout(function(){ autoTimer = null; fn(); }, 3000);
}

function stoppAutoWeiter(){
  if(autoTimer){ clearTimeout(autoTimer); autoTimer = null; }
}

// ── Buttons nach Antwort vollständig ausblenden ──────────────────
function verbergeAntwortButtons(){
  [".antwort-zweier", ".antwort-dreier", ".wort-reihe"].forEach(function(sel){
    var el = document.querySelector(sel);
    if(el) el.style.display = "none";
  });
}

// ── HTML-Bausteine ───────────────────────────────────────────────
function leseHtml(frage, satz, extraHtml){
  var satzBlock = satz
    ? "<div class=\"lese-satz\">" + esc(satz) + "</div>"
    : "";
  return "<div class=\"lese-bereich\">" +
    "<div class=\"lese-frage\">" + esc(frage) + "</div>" +
    satzBlock +
    (extraHtml || "") +
    "</div>" +
    "<div class=\"trenn-streifen\"><span class=\"trenn-label\">👆 Deine Antwort</span></div>" +
    "<div class=\"aktions-bereich\" id=\"aktionsBereich\">";
}
function leseHtmlEnde(){ return "</div>"; }

var RING = "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>";

// ── Spielzustand ─────────────────────────────────────────────────
var aktEinheit  = null;
var aufgaben    = [];
var aktIndex    = 0;
var richtigCnt  = 0;
var gesperrt    = false;
var wiederholungsQueue = [];

// ── Öffentliche API ──────────────────────────────────────────────
window.GrammatikMod = {

  starteEinheit: function(einheitId){
    stoppAutoWeiter();
    aktEinheit = null;
    for(var i = 0; i < GRAMMATIK_EINHEITEN.length; i++){
      if(GRAMMATIK_EINHEITEN[i].id === einheitId){
        aktEinheit = GRAMMATIK_EINHEITEN[i];
        break;
      }
    }
    if(!aktEinheit){ return; }

    var ht = document.getElementById("headerTitel");
    if(ht) ht.textContent = aktEinheit.emoji + " " + aktEinheit.titel;
    if(document.title) document.title = "Laetitia - " + aktEinheit.titel;

    aufgaben   = aktEinheit.aufgaben.slice();
    aktIndex   = 0;
    richtigCnt = 0;
    gesperrt   = false;
    wiederholungsQueue = [];

    if(window.LaetitiaStats) window.LaetitiaStats.sessionStart("grammatik", einheitId);

    zeigeErklaerung();
  },

  ladeStand: ladeStand
};

// ── Erklär-Screen ────────────────────────────────────────────────
function zeigeErklaerung(){
  stoppAutoWeiter();
  var spielfeld = document.getElementById("spielfeld");
  spielfeld.innerHTML =
    "<div class=\"erklaer-card\" id=\"erklaerCard\">" +
      "<div class=\"erklaer-emoji\">" + aktEinheit.emoji + "</div>" +
      "<div class=\"erklaer-titel\">" + aktEinheit.titel + "</div>" +
      "<div class=\"erklaer-merksatz\">" + aktEinheit.erklaerung_merksatz + "</div>" +
    "</div>";

  setFortschritt(0);
  setHeaderSub("Einführung");

  var weiter = document.getElementById("weiterBtn");
  if(weiter){
    weiter.className = "nav-btn nav-btn-weiter sichtbar";
    weiter.onclick   = function(){ zeigeAufgabe(); };
  }
  var ub = document.getElementById("btnUeberspringen");
  if(ub) ub.style.display = "none";

  bindeDwell("#btnZurueck");
  sprich(aktEinheit.erklaerung_tts, function(){
    bindeDwell("#weiterBtn, #btnZurueck");
  });
}

// ── Aufgabe anzeigen ─────────────────────────────────────────────
function zeigeAufgabe(){
  stoppAutoWeiter();

  if(aktIndex >= aufgaben.length){
    if(wiederholungsQueue.length > 0){
      aufgaben = wiederholungsQueue.slice();
      wiederholungsQueue = [];
      aktIndex = 0;
    } else {
      zeigeFertig();
      return;
    }
  }

  var aufgabe = aufgaben[aktIndex];
  gesperrt    = false;

  if(window.LaetitiaStats) window.LaetitiaStats.taskStart();

  setFortschritt(Math.round((aktIndex / aufgaben.length) * 100));
  setHeaderSub((aktIndex + 1) + " / " + aufgaben.length);

  var weiter = document.getElementById("weiterBtn");
  if(weiter) weiter.className = "nav-btn nav-btn-weiter";
  var ub = document.getElementById("btnUeberspringen");
  if(ub){ ub.style.display = ""; ub.onclick = ueberspringen; }

  var spielfeld = document.getElementById("spielfeld");

  if     (aufgabe.typ === "ja_nein")        rendereJaNein(spielfeld, aufgabe);
  else if(aufgabe.typ === "ab_wahl")        rendereAbWahl(spielfeld, aufgabe);
  else if(aufgabe.typ === "abc_wahl")       rendereAbcWahl(spielfeld, aufgabe);
  else if(aufgabe.typ === "wort_button")    rendereWortButton(spielfeld, aufgabe);
  else if(aufgabe.typ === "richtig_falsch") rendereRichtigFalsch(spielfeld, aufgabe);
}

// ── Regel 18: Antwort-Buttons erst nach TTS-Ende dwell-aktiv ─────────────
// Zurueck bleibt sofort erreichbar, waehrend die Frage noch vorgelesen wird.
function aktiviereNachTts(tts, vollSelektor){
  bindeDwell("#btnZurueck, #btnUeberspringen");
  setTimeout(function(){
    sprich(tts, function(){ bindeDwell(vollSelektor); });
  }, 400);
}

// ── Typ: Ja / Nein ───────────────────────────────────────────────
function rendereJaNein(container, aufgabe){
  container.innerHTML =
    leseHtml(aufgabe.frage, aufgabe.satz || null) +
      "<div class=\"antwort-zweier\">" +
        "<button class=\"antwort-btn antwort-ja\"   id=\"btnJa\"   onclick=\"window._GrammAntwort('ja')  \">JA"   + RING + "</button>" +
        "<button class=\"antwort-btn antwort-nein\"  id=\"btnNein\" onclick=\"window._GrammAntwort('nein')\">NEIN" + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._GrammAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  aktiviereNachTts(aufgabe.tts, "#btnJa, #btnNein, #btnZurueck, #btnUeberspringen");
}

// ── Typ: A / B Wahl ──────────────────────────────────────────────
function rendereAbWahl(container, aufgabe){
  var optionenHtml =
    "<div class=\"lese-optionen\">" +
      "<span class=\"lese-options-eintrag\"><b>A</b> " + esc(aufgabe.option_a) + "</span>" +
      "<span class=\"lese-options-eintrag\"><b>B</b> " + esc(aufgabe.option_b) + "</span>" +
    "</div>";
  container.innerHTML =
    leseHtml(aufgabe.frage, aufgabe.satz || null, optionenHtml) +
      "<div class=\"antwort-zweier\">" +
        "<button class=\"antwort-btn\" id=\"btnA\" onclick=\"window._GrammAntwort('a')\">" + esc(aufgabe.option_a) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnB\" onclick=\"window._GrammAntwort('b')\">" + esc(aufgabe.option_b) + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._GrammAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  aktiviereNachTts(aufgabe.tts, "#btnA, #btnB, #btnZurueck, #btnUeberspringen");
}

// ── Typ: A / B / C Wahl ──────────────────────────────────────────
function rendereAbcWahl(container, aufgabe){
  var optionenHtml =
    "<div class=\"lese-optionen\">" +
      "<span class=\"lese-options-eintrag\"><b>A</b> " + esc(aufgabe.option_a) + "</span>" +
      "<span class=\"lese-options-eintrag\"><b>B</b> " + esc(aufgabe.option_b) + "</span>" +
      "<span class=\"lese-options-eintrag\"><b>C</b> " + esc(aufgabe.option_c) + "</span>" +
    "</div>";
  container.innerHTML =
    leseHtml(aufgabe.frage, aufgabe.satz || null, optionenHtml) +
      "<div class=\"antwort-dreier\">" +
        "<button class=\"antwort-btn\" id=\"btnA\" onclick=\"window._GrammAntwort('a')\">" + esc(aufgabe.option_a) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnB\" onclick=\"window._GrammAntwort('b')\">" + esc(aufgabe.option_b) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnC\" onclick=\"window._GrammAntwort('c')\">" + esc(aufgabe.option_c) + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._GrammAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  aktiviereNachTts(aufgabe.tts, "#btnA, #btnB, #btnC, #btnZurueck, #btnUeberspringen");
}

// ── Typ: Wort-Button ─────────────────────────────────────────────
function rendereWortButton(container, aufgabe){
  var btnHtml = "";
  aufgabe.woerter.forEach(function(wort, i){
    btnHtml += "<button class=\"wort-btn\" id=\"wortBtn" + i + "\" onclick=\"window._GrammAntwort(" + i + ")\">" +
      esc(wort) + RING + "</button>";
  });

  var satzText = aufgabe.woerter.join(" ");
  container.innerHTML =
    leseHtml(aufgabe.frage, satzText) +
      "<div class=\"wort-reihe\">" + btnHtml + "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._GrammAntwort = function(index){
    var gewaehlt = String(index);
    var richtig  = String(aufgabe.richtig);
    // Visuelles Feedback auf Buttons vor dem Ausblenden kurz zeigen
    var alle = container.querySelectorAll(".wort-btn");
    alle.forEach(function(b){ b.disabled = true; });
    var gewaehltBtn = document.getElementById("wortBtn" + index);
    var richtigBtn  = document.getElementById("wortBtn" + aufgabe.richtig);
    if(gewaehlt === richtig){
      if(gewaehltBtn) gewaehltBtn.classList.add("btn-richtig");
    } else {
      if(gewaehltBtn) gewaehltBtn.classList.add("btn-falsch");
      if(richtigBtn)  richtigBtn.classList.add("btn-richtig");
    }
    // Kurze Pause damit Farbe sichtbar ist, dann ausblenden
    setTimeout(function(){ pruefeAntwort(gewaehlt, richtig, aufgabe.erklaerung, aufgabe); }, 400);
  };

  var dwellSel = aufgabe.woerter.map(function(w, i){ return "#wortBtn" + i; }).join(", ") + ", #btnZurueck, #btnUeberspringen";
  aktiviereNachTts(aufgabe.tts, dwellSel);
}

// ── Typ: Richtig / Falsch ────────────────────────────────────────
function rendereRichtigFalsch(container, aufgabe){
  container.innerHTML =
    leseHtml(aufgabe.frage, aufgabe.satz) +
      "<div class=\"antwort-zweier\">" +
        "<button class=\"antwort-btn antwort-richtig-btn\" id=\"btnRichtig\" onclick=\"window._GrammAntwort('richtig')\">✓ Richtig" + RING + "</button>" +
        "<button class=\"antwort-btn antwort-falsch-btn\"  id=\"btnFalsch\"  onclick=\"window._GrammAntwort('falsch') \">✗ Falsch"  + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._GrammAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  aktiviereNachTts(aufgabe.tts, "#btnRichtig, #btnFalsch, #btnZurueck, #btnUeberspringen");
}

// ── Antwort auswerten ────────────────────────────────────────────
function pruefeAntwort(gewaehlt, richtig, erklaerung, aufgabe){
  if(gesperrt) return;
  gesperrt = true;

  // Alle Antwort-Buttons sofort deaktivieren und vollständig ausblenden
  var alleBtns = document.querySelectorAll(".antwort-btn, .wort-btn");
  alleBtns.forEach(function(b){ b.disabled = true; b.classList.add("gesperrt"); });
  verbergeAntwortButtons();

  var feedback = document.getElementById("feedbackZeile");
  var weiter   = document.getElementById("weiterBtn");
  var ub       = document.getElementById("btnUeberspringen");

  var istRichtig = (gewaehlt === richtig);
  var taskId = aktEinheit.id + "|" + aktIndex + "|" + (aufgabe.frage || aufgabe.satz || "");
  if(window.LaetitiaStats) window.LaetitiaStats.taskAnswer(taskId, istRichtig, gewaehlt, false, null);

  // Überspringen-Button sofort weg
  if(ub) ub.style.display = "none";

  function nachTts(){
    // Weiter-Button einblenden
    if(weiter){
      weiter.className = "nav-btn nav-btn-weiter sichtbar";
      weiter.onclick = function(){
        stoppAutoWeiter();
        aktIndex++;
        zeigeAufgabe();
      };
    }
    bindeDwell("#weiterBtn, #btnZurueck");
    // 3 Sekunden Auto-Weiter
    starteAutoWeiter(function(){ aktIndex++; zeigeAufgabe(); });
  }

  if(istRichtig){
    richtigCnt++;
    if(feedback){ feedback.className = "feedback-zeile feedback-richtig"; feedback.textContent = "✓ " + erklaerung; }
    sprich(zufallsLob() + " " + erklaerung, nachTts);
  } else {
    wiederholungsQueue.push(aufgabe);
    if(feedback){ feedback.className = "feedback-zeile feedback-falsch"; feedback.textContent = "✗ " + erklaerung; }
    sprich("Das stimmt leider nicht. " + erklaerung, nachTts);
  }
}

// ── Überspringen ──────────────────────────────────────────────────
function ueberspringen(){
  stoppAutoWeiter();
  aktIndex++;
  zeigeAufgabe();
}

// ── Fertig-Screen ─────────────────────────────────────────────────
function zeigeFertig(){
  stoppAutoWeiter();
  var gesamt    = aktEinheit.aufgaben.length;
  var quote     = gesamt > 0 ? richtigCnt / gesamt : 0;
  var bestanden = quote >= 0.8;

  if(window.LaetitiaStats) window.LaetitiaStats.sessionEnd(bestanden);

  var stand = ladeStand();
  var bisherBeste = stand[aktEinheit.id] ? stand[aktEinheit.id].besteQuote : 0;
  stand[aktEinheit.id] = {
    abgeschlossen: true,
    besteQuote:    Math.max(quote, bisherBeste),
    versuche:      ((stand[aktEinheit.id] || {}).versuche || 0) + 1
  };
  speichereStand(stand);

  var sternText  = bestanden ? "⭐ Gemeistert!" : "Weiter üben!";
  var sternClass = bestanden ? "fertig-stern gold" : "fertig-stern";
  var ttsText    = bestanden
    ? zufallsLob() + " Du hast " + richtigCnt + " von " + gesamt + " Aufgaben richtig. Diese Einheit ist gemeistert!"
    : "Du hast " + richtigCnt + " von " + gesamt + " Aufgaben richtig. Versuch es nochmal — du schaffst das!";

  setFortschritt(100);

  var spielfeld = document.getElementById("spielfeld");
  spielfeld.innerHTML =
    "<div class=\"fertig-screen\">" +
      "<div class=\"" + sternClass + "\">🎉</div>" +
      "<div class=\"fertig-titel\">" + sternText + "</div>" +
      "<div class=\"fertig-punkte\">" + richtigCnt + " von " + gesamt + " richtig</div>" +
      "<button class=\"fertig-nochmal-btn\" id=\"nochmalBtn\" onclick=\"window.GrammatikMod.starteEinheit('" + aktEinheit.id + "')\">" +
        RING + "🔁 Nochmal" +
      "</button>" +
    "</div>";

  var weiter = document.getElementById("weiterBtn");
  if(weiter) weiter.className = "nav-btn nav-btn-weiter";
  var ub = document.getElementById("btnUeberspringen");
  if(ub) ub.style.display = "none";

  sprich(ttsText, function(){
    bindeDwell("#nochmalBtn, #btnZurueck");
  });
}

// ── Hilfsfunktionen ───────────────────────────────────────────────
function esc(str){
  if(!str) return "";
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

function setFortschritt(pct){
  var el = document.getElementById("fortschritt");
  if(el) el.style.width = pct + "%";
}

function setHeaderSub(text){
  var el = document.getElementById("headerSub");
  if(el) el.textContent = text;
}

})();
