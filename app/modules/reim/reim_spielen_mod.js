// reim_spielen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Lob-Texte (Goldstandard aus moduleKit) ───────────────────────────────────
var LOB_TEXTE = [
  "Wunderbar!", "Fantastisch!", "Super!", "Toll gemacht!",
  "Du ueberraschst mich!", "Klasse!", "Sehr gut!", "Bravo!",
  "Genial!", "Das sitzt!", "Perfekt!", "Grossartig!"
];
function zufallsLob(){ return LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]; }

// ── Setup ─────────────────────────────────────────────────────────────────────
var params  = new URLSearchParams(window.location.search);
var modus   = params.get("modus") || "R1";
var session = [], index = 0, richtigCount = 0, beantwortet = false;
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

// Modus-Titel
var modusMeta = {
  R1: { titel:"🔍 Reimpaar finden",    hinweis:"Welches Wort reimt sich?" },
  R2: { titel:"📜 Gedicht vollenden",  hinweis:"Welches Wort passt ans Ende?" },
  R3: { titel:"🤔 Reim oder kein Reim?", hinweis:"Reimen sich diese zwei Worter?" },
  R4: { titel:"✏️ Meinen Reim bauen",  hinweis:"Ich waehle das Reimwort!" }
};
document.getElementById("topbarTitel").textContent = (modusMeta[modus]||modusMeta.R1).titel;

// Session aufbauen
function shuffle(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
if(window.REIM_DATEN && window.REIM_DATEN[modus]){
  session = shuffle(window.REIM_DATEN[modus]);
} else {
  session = [];
}

// ── TTS ───────────────────────────────────────────────────────────────────────
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.88;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      if(danach) u.onend = function(){ setTimeout(danach, 300); };
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}

// ── Fortschritt ───────────────────────────────────────────────────────────────
function aktualisiereProgress(){
  var pct = session.length > 0 ? Math.round((index/session.length)*100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("fortschrittText").textContent =
    index < session.length ? (index+1) + " / " + session.length : session.length + " / " + session.length;
}

// ── Screens ───────────────────────────────────────────────────────────────────
function zeigeScreen(id){
  ["screenAntwort","screenJaNein"].forEach(function(sid){
    var el = document.getElementById(sid);
    el.style.display = "none";
  });
  var s = document.getElementById(id);
  if(s){ s.style.display = "flex"; }
}

// ── Haupt-Dispatcher ──────────────────────────────────────────────────────────
function zeigeAufgabe(){
  beantwortet = false;
  if(index >= session.length){ zeigeAbschluss(); return; }
  aktualisiereProgress();
  var t = session[index];
  if(t.modus === "R3"){ zeigeJaNein(t); }
  else               { zeigeAntwortKarte(t); }
}

// ── R1 / R2 / R4 ─────────────────────────────────────────────────────────────
function zeigeAntwortKarte(t){
  var wortEl   = document.getElementById("reimWort");
  var z1El     = document.getElementById("reimZeile1");
  var z2El     = document.getElementById("reimZeile2");
  var hinweis  = document.getElementById("reimHinweis");
  var vorschau = document.getElementById("reimVorschau");

  // Felder zuruecksetzen
  wortEl.style.display  = "none";
  z1El.style.display    = "none";
  z2El.style.display    = "none";
  vorschau.className    = "reim-vorschau";
  vorschau.textContent  = "";
  setInfoLine("infoLineAntwort","","");

  // Anzeige je Modus
  if(t.modus === "R1"){
    wortEl.textContent = t.wort;
    wortEl.style.display = "block";
    hinweis.textContent  = "Welches Wort reimt sich auf: " + t.wort + "?";
    document.getElementById("btnPlay").dataset.tts = t.tts;
  }
  if(t.modus === "R2"){
    z1El.textContent = t.zeile1;
    z1El.style.display = "block";
    z2El.innerHTML = t.zeile2_anfang + ' <span class="reim-luecke">___?</span>';
    z2El.style.display = "block";
    hinweis.textContent = "Welches Wort reimt sich ans Ende?";
    document.getElementById("btnPlay").dataset.tts = t.tts_zeile1 + " " + t.tts_zeile2_anfang;
  }
  if(t.modus === "R4"){
    z1El.textContent = t.zeile1;
    z1El.style.display = "block";
    z2El.innerHTML = t.zeile2_anfang + ' <span class="reim-luecke">___?</span>';
    z2El.style.display = "block";
    hinweis.textContent = "Ich suche das Reimwort — welches passt?";
    document.getElementById("btnPlay").dataset.tts = t.tts_zeile1;
  }

  // Buttons befuellen
  var btns = ["A","B","C","D"];
  btns.forEach(function(b){
    var btn = document.getElementById("btn"+b);
    document.getElementById("text"+b).textContent = t["antwort_"+b.toLowerCase()];
    btn.classList.remove("is-disabled","correct-flash","falsch-gewaehlt");
    delete btn.dataset.pdwell;
    bindDwellEinzel(btn);
  });

  // Play-Button Dwell
  delete document.getElementById("btnPlay").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnPlay"));
  // Zurueck-Button
  delete document.getElementById("btnZurueck").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnZurueck"));

  zeigeScreen("screenAntwort");
  setTimeout(function(){
    if(t.modus==="R1") sprich(t.tts);
    if(t.modus==="R2") sprich(t.tts_zeile1 + " — " + t.tts_zeile2_anfang);
    if(t.modus==="R4") sprich(t.tts_zeile1);
  }, 350);
}

function antworten(buchstabe){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = buchstabe === t.richtig;
  var btnMap = {A:"btnA",B:"btnB",C:"btnC",D:"btnD"};

  // Alle deaktivieren
  ["A","B","C","D"].forEach(function(b){
    document.getElementById("btn"+b).classList.add("is-disabled");
  });

  if(korrekt){
    richtigCount++;
    document.getElementById(btnMap[buchstabe]).classList.add("correct-flash");
    setInfoLine("infoLineAntwort","✓ Richtig! " + t.erklaerung,"richtig");

    // R4: komplettes Gedicht vorlesen
    if(t.modus === "R4"){
      var vorschau = document.getElementById("reimVorschau");
      var z1 = t.zeile1;
      var gewaehltes = t["antwort_"+buchstabe.toLowerCase()];
      var z2 = t.zeile2_anfang + " " + gewaehltes + "!";
      vorschau.textContent = z1 + "\n" + z2;
      vorschau.className = "reim-vorschau sichtbar";
      sprich(t["tts_"+buchstabe.toLowerCase()], function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 400); });
    } else {
      sprich(zufallsLob() + " " + t.erklaerung, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 400); });
    }
  } else {
    document.getElementById(btnMap[buchstabe]).classList.add("falsch-gewaehlt");
    document.getElementById(btnMap[t.richtig]).classList.add("correct-flash");
    var richtigText = t["antwort_"+t.richtig.toLowerCase()];
    setInfoLine("infoLineAntwort","✗ Das war nicht richtig. " + t.erklaerung,"falsch");

    if(t.modus === "R4"){
      sprich(t["tts_"+t.richtig.toLowerCase()], function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 400); });
    } else {
      sprich("Das war leider falsch. " + t.erklaerung, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 400); });
    }
  }
}

// ── R3: Ja / Nein ─────────────────────────────────────────────────────────────
function zeigeJaNein(t){
  document.getElementById("jnWort1").textContent = t.wort1;
  document.getElementById("jnWort2").textContent = t.wort2;
  document.getElementById("btnPlayJN").dataset.tts = t.tts;
  setInfoLine("infoLineJN","","");

  ["btnJa","btnNein"].forEach(function(id){
    var b = document.getElementById(id);
    b.classList.remove("is-disabled","correct-flash","falsch-gewaehlt");
    delete b.dataset.pdwell;
    bindDwellEinzel(b);
  });
  delete document.getElementById("btnPlayJN").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnPlayJN"));
  delete document.getElementById("btnZurueck").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnZurueck"));

  zeigeScreen("screenJaNein");
  setTimeout(function(){ sprich(t.wort1 + " — " + t.wort2); }, 350);
}

function antwortenJN(jaGewaehlt){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = (jaGewaehlt === t.reimt);

  document.getElementById("btnJa").classList.add("is-disabled");
  document.getElementById("btnNein").classList.add("is-disabled");

  if(korrekt){
    richtigCount++;
    var btn = document.getElementById(jaGewaehlt ? "btnJa" : "btnNein");
    btn.classList.add("correct-flash");
    setInfoLine("infoLineJN","✓ Richtig! " + t.erklaerung,"richtig");
    sprich(t.erklaerung);
  } else {
    var gewaehltBtn  = document.getElementById(jaGewaehlt ? "btnJa" : "btnNein");
    var richtigBtn   = document.getElementById(t.reimt ? "btnJa" : "btnNein");
    gewaehltBtn.classList.add("falsch-gewaehlt");
    richtigBtn.classList.add("correct-flash");
    setInfoLine("infoLineJN","✗ " + t.erklaerung,"falsch");
    sprich(t.erklaerung, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 400); });
  }
}

// ── Abschluss ─────────────────────────────────────────────────────────────────
function zeigeAbschluss(){
  document.getElementById("mainBereich").style.display = "none";
  document.getElementById("zurueckLeiste").style.display = "none";
  var sc = document.getElementById("abschlussScreen");
  sc.classList.add("sichtbar");
  var pct = session.length > 0 ? Math.round((richtigCount/session.length)*100) : 0;
  document.getElementById("abschlussScore").textContent =
    richtigCount + " von " + session.length + " richtig";
  var e, ti, su;
  if(pct >= 80){ e="🌟"; ti="Super gemacht!"; su="Du bist ein Reim-Profi!"; }
  else if(pct >= 60){ e="😊"; ti="Toll!"; su="Du wirst immer besser!"; }
  else{ e="💪"; ti="Weiter ueben!"; su="Reimen macht Spass — noch einmal!"; }
  document.getElementById("abschlussEmoji").textContent = e;
  document.getElementById("abschlussTitel").textContent = ti;
  document.getElementById("abschlussSub").textContent = su;
  sprich(ti + " " + richtigCount + " von " + session.length + " richtig.");
  document.getElementById("progressFill").style.width = "100%";
  delete document.getElementById("btnAbschluss").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnAbschluss"));
}

// ── Feedback-Helper ───────────────────────────────────────────────────────────
function setInfoLine(id, text, art){
  var el = document.getElementById(id);
  if(!el) return;
  el.className = "infoLine" + (art ? " "+art : "");
  el.textContent = text || "";
  el.style.display = text ? "" : "none";
}

// ── Play-Buttons ──────────────────────────────────────────────────────────────
document.getElementById("btnPlay").addEventListener("click", function(){
  var tts = this.dataset.tts; if(tts) sprich(tts);
});
document.getElementById("btnPlayJN").addEventListener("click", function(){
  var tts = this.dataset.tts; if(tts) sprich(tts);
});

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
var _dwellHandle = { cancelDwell: function(){} };

var DWELL_SELECTOR = [
  ".antwort-btn", ".janein-btn", ".play-btn",
  "#btnZurueck", "#btnAbschluss", "a.zurueckBtn"
].join(", ");

function rebindDwell(){
  if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function") _dwellHandle.cancelDwell();
  _dwellHandle = _attachDwell(DWELL_SELECTOR, {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      if(el.classList.contains("is-disabled")) return;
      try{ el.click(); }catch(e){}
    }
  });
}

// bindDwellEinzel als Alias fuer Kompatibilitaet mit bestehendem Code
function bindDwellEinzel(el){ rebindDwell(); }

try{
  localStorage.setItem("laetitia_return_url_v1", new URL("./modules/reim/reim.html", window.location.href).href);
}catch(e){}
rebindDwell();

// Start
zeigeAufgabe();
