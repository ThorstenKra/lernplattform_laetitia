// reim_spielen_mod.js — Spiellogik für das Reimen-Modul  v2
// Layout-Prinzip: Lesebereich (passiv) OBEN, Aktionsbereich (dwell) UNTEN.
// Nach Antwort: Buttons vollständig ausgeblendet, Feedback sichtbar,
//               nach TTS-Ende 3 s Auto-Weiter (oder sofort per Weiter-Button).
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen

(function(){

var STORAGE_KEY = "laetitia_reim_v1";

var LOB_TEXTE = [
  "Super! Das war richtig!",
  "Fantastisch! Du hörst das ganz genau!",
  "Wow, genau richtig! Toll!",
  "Ja! Das hast du prima erkannt!",
  "Wunderbar! Weiter so!",
  "Perfekt! Ich bin stolz auf dich!",
  "Klasse! Das war die richtige Antwort!",
  "Sehr gut! Dein Ohr für Reime wird immer besser!"
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
  [".antwort-zweier", ".antwort-vierer"].forEach(function(sel){
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
window.ReimMod = {

  starteEinheit: function(einheitId){
    stoppAutoWeiter();
    aktEinheit = null;
    var liste = window.REIM_EINHEITEN || [];
    for(var i = 0; i < liste.length; i++){
      if(liste[i].id === einheitId){
        aktEinheit = liste[i];
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

    if(window.LaetitiaStats) window.LaetitiaStats.sessionStart("reim", einheitId);

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
      "<div class=\"erklaer-titel\">" + esc(aktEinheit.titel) + "</div>" +
      "<div class=\"erklaer-autor\">" + esc(aktEinheit.autor) + "</div>" +
      "<div class=\"erklaer-merksatz\">" + esc(aktEinheit.erklaerung_merksatz) + "</div>" +
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

  if     (aufgabe.typ === "reim_wahl")   rendereReimWahl(spielfeld, aufgabe);
  else if(aufgabe.typ === "luecke_wahl") rendereLueckeWahl(spielfeld, aufgabe);
  else if(aufgabe.typ === "reim_janein") rendereReimJaNein(spielfeld, aufgabe);
}

// ── Typ: Reim-Wahl (A/B/C/D — welches Wort reimt sich?) ──────────
function rendereReimWahl(container, aufgabe){
  container.innerHTML =
    leseHtml("Welches Wort reimt sich auf:", aufgabe.wort) +
      "<div class=\"antwort-vierer\">" +
        "<button class=\"antwort-btn\" id=\"btnA\" onclick=\"window._ReimAntwort('A')\">" + esc(aufgabe.antwort_a) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnB\" onclick=\"window._ReimAntwort('B')\">" + esc(aufgabe.antwort_b) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnC\" onclick=\"window._ReimAntwort('C')\">" + esc(aufgabe.antwort_c) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnD\" onclick=\"window._ReimAntwort('D')\">" + esc(aufgabe.antwort_d) + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._ReimAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  bindeDwell("#btnA, #btnB, #btnC, #btnD, #btnZurueck, #btnUeberspringen");
  setTimeout(function(){ sprich(aufgabe.tts); }, 400);
}

// ── Typ: Lücke-Wahl (echte Gedichtzeile, fehlendes Reimwort) ─────
function rendereLueckeWahl(container, aufgabe){
  var satzHtml = esc(aufgabe.zeile_bekannt) + "<br>" + esc(aufgabe.zeile_luecke) + " <span class=\"lese-luecke\">___?</span>";
  container.innerHTML =
    "<div class=\"lese-bereich\">" +
      "<div class=\"lese-frage\">Welches Wort fehlt am Ende?</div>" +
      "<div class=\"lese-satz\">" + satzHtml + "</div>" +
    "</div>" +
    "<div class=\"trenn-streifen\"><span class=\"trenn-label\">👆 Deine Antwort</span></div>" +
    "<div class=\"aktions-bereich\" id=\"aktionsBereich\">" +
      "<div class=\"antwort-vierer\">" +
        "<button class=\"antwort-btn\" id=\"btnA\" onclick=\"window._ReimAntwort('A')\">" + esc(aufgabe.antwort_a) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnB\" onclick=\"window._ReimAntwort('B')\">" + esc(aufgabe.antwort_b) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnC\" onclick=\"window._ReimAntwort('C')\">" + esc(aufgabe.antwort_c) + RING + "</button>" +
        "<button class=\"antwort-btn\" id=\"btnD\" onclick=\"window._ReimAntwort('D')\">" + esc(aufgabe.antwort_d) + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    "</div>";

  window._ReimAntwort = function(wahl){
    pruefeAntwort(wahl, aufgabe.richtig, aufgabe.erklaerung, aufgabe);
  };
  bindeDwell("#btnA, #btnB, #btnC, #btnD, #btnZurueck, #btnUeberspringen");
  setTimeout(function(){ sprich(aufgabe.tts_bekannt + " " + aufgabe.tts_luecke); }, 400);
}

// ── Typ: Reim Ja/Nein ─────────────────────────────────────────────
function rendereReimJaNein(container, aufgabe){
  var extraHtml =
    "<div class=\"lese-woerter\">" +
      "<span>" + esc(aufgabe.wort1) + "</span>" +
      "<span class=\"lese-trenner\">—</span>" +
      "<span>" + esc(aufgabe.wort2) + "</span>" +
    "</div>";
  container.innerHTML =
    leseHtml("Reimen sich diese zwei Wörter?", null, extraHtml) +
      "<div class=\"antwort-zweier\">" +
        "<button class=\"antwort-btn antwort-ja\"   id=\"btnJa\"   onclick=\"window._ReimAntwort('ja')\">✅ Ja! Reim!" + RING + "</button>" +
        "<button class=\"antwort-btn antwort-nein\" id=\"btnNein\" onclick=\"window._ReimAntwort('nein')\">❌ Nein!" + RING + "</button>" +
      "</div>" +
      "<div class=\"feedback-zeile\" id=\"feedbackZeile\"></div>" +
    leseHtmlEnde();

  window._ReimAntwort = function(wahl){
    var gewaehltJa = (wahl === "ja");
    var korrekt    = gewaehltJa === !!aufgabe.reimt;
    pruefeAntwort(korrekt ? "richtig" : "falsch", "richtig", aufgabe.erklaerung, aufgabe, wahl);
  };
  bindeDwell("#btnJa, #btnNein, #btnZurueck, #btnUeberspringen");
  setTimeout(function(){ sprich(aufgabe.tts); }, 400);
}

// ── Antwort auswerten ────────────────────────────────────────────
// gewaehltRoh (optional): fuer reim_janein das tatsaechlich geklickte "ja"/"nein",
// da dort "gewaehlt"/"richtig" bereits zu "richtig"/"falsch" normalisiert wurden.
function pruefeAntwort(gewaehlt, richtig, erklaerung, aufgabe, gewaehltRoh){
  if(gesperrt) return;
  gesperrt = true;

  var alleBtns = document.querySelectorAll(".antwort-btn");
  alleBtns.forEach(function(b){ b.disabled = true; b.classList.add("gesperrt"); });
  verbergeAntwortButtons();

  var feedback = document.getElementById("feedbackZeile");
  var weiter   = document.getElementById("weiterBtn");
  var ub       = document.getElementById("btnUeberspringen");

  var istRichtig = (gewaehlt === richtig);
  var taskId = aktEinheit.id + "|" + aktIndex + "|" + (aufgabe.wort || aufgabe.zeile_bekannt || (aufgabe.wort1 + "-" + aufgabe.wort2));
  if(window.LaetitiaStats) window.LaetitiaStats.taskAnswer(taskId, istRichtig, gewaehltRoh || gewaehlt, false, null);

  if(ub) ub.style.display = "none";

  function nachTts(){
    if(weiter){
      weiter.className = "nav-btn nav-btn-weiter sichtbar";
      weiter.onclick = function(){
        stoppAutoWeiter();
        aktIndex++;
        zeigeAufgabe();
      };
    }
    bindeDwell("#weiterBtn, #btnZurueck");
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

// ── Ganzes Gedicht hören ──────────────────────────────────────────
function ladeGanzesGedicht(){
  var liste = window.GEDICHTE || [];
  for(var i = 0; i < liste.length; i++){
    if(liste[i].id === aktEinheit.gedicht_ref) return liste[i];
  }
  return null;
}

function leseGanzesGedicht(){
  var gedicht = ladeGanzesGedicht();
  if(!gedicht) return;
  var teile = gedicht.strophen.map(function(strophe){ return strophe.join(" "); });
  sprich(teile.join(" ... "));
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

  var hatGedicht = !!ladeGanzesGedicht();
  var spielfeld = document.getElementById("spielfeld");
  spielfeld.innerHTML =
    "<div class=\"fertig-screen\">" +
      "<div class=\"" + sternClass + "\">🎉</div>" +
      "<div class=\"fertig-titel\">" + sternText + "</div>" +
      "<div class=\"fertig-punkte\">" + richtigCnt + " von " + gesamt + " richtig</div>" +
      (hatGedicht ? "<button class=\"fertig-btn vorlesen\" id=\"vorlesenBtn\" onclick=\"window._ReimVorlesen()\">" + RING + "📖 Ganzes Gedicht hören</button>" : "") +
      "<button class=\"fertig-btn\" id=\"nochmalBtn\" onclick=\"window.ReimMod.starteEinheit('" + aktEinheit.id + "')\">" +
        RING + "🔁 Nochmal" +
      "</button>" +
    "</div>";

  window._ReimVorlesen = leseGanzesGedicht;

  var weiter = document.getElementById("weiterBtn");
  if(weiter) weiter.className = "nav-btn nav-btn-weiter";
  var ub = document.getElementById("btnUeberspringen");
  if(ub) ub.style.display = "none";

  sprich(ttsText, function(){
    bindeDwell(hatGedicht ? "#vorlesenBtn, #nochmalBtn, #btnZurueck" : "#nochmalBtn, #btnZurueck");
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
