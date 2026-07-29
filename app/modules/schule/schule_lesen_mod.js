// schule_lesen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

// ── Konfiguration ────────────────────────────────────────────────
var LOB_TEXTE = [
  "Fantastisch! Du bist so schlau!",
  "Wow, richtig! Großartig!",
  "Super! Das hast du toll gelesen!",
  "Ja! Genau richtig! Weiter so!",
  "Wunderbar! Du bist eine echte Leseratte!",
  "Toll! Das war nicht leicht — und du hast es geschafft!",
  "Perfekt! Ich bin so stolz auf dich!",
  "Richtig! Du liest so gut!"
];
function zufallsLob(){ return LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]; }

// ── URL-Parameter ────────────────────────────────────────────────
var params  = new URLSearchParams(window.location.search);
var heft    = params.get("heft")  || "sachkunde_fruehling";
var thema   = params.get("thema") || null;

// ── Daten laden ──────────────────────────────────────────────────
var alleAufgaben = (window.SCHULE_LESEN_DATEN || []).filter(function(t){
  if(t.heft !== heft) return false;
  if(thema && t.thema !== thema) return false;
  return true;
});

if(!alleAufgaben || alleAufgaben.length === 0){
  if(window.LaetitiaFehler) window.LaetitiaFehler.zeige("Keine Aufgaben gefunden — Datendatei prüfen.");
}

// Mischen
function mischen(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
  return a;
}
var aufgaben   = alleAufgaben.slice();
var aktIndex   = 0;
var richtigCnt = 0;
var gesamtCnt  = aufgaben.length;
var aktAufgabe = null;
var gesperrt   = false;

// ── Header ───────────────────────────────────────────────────────
var HEFT_NAMEN = {
  "sachkunde_fruehling": "Frühling — Texte",
  "sachkunde_lesekarten": "Frühling — Lesekarten"
};
document.getElementById("headerTitel").textContent =
  HEFT_NAMEN[heft] || "Lesen & Verstehen";

// ── TTS ──────────────────────────────────────────────────────────
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
          || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
          || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    u.rate = 0.90;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      var fired = false;
      var watchdog = null;
      function naechster(){
        if(fired) return; fired = true;
        if(watchdog) clearTimeout(watchdog);
        if(danach) setTimeout(danach, 300);
      }
      u.onend  = naechster;
      u.onerror = naechster;
      watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}

function vorlesenText(){
  if(!aktAufgabe) return;
  var btn = document.getElementById("vorleseBtnNav");
  if(btn){ btn.classList.add("spricht"); btn.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>🔊 Lese vor…'; }
  sprich(aktAufgabe.text, function(){
    if(btn){ btn.classList.remove("spricht"); btn.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>🔊 Vorlesen'; }
    bindeDwell();
  });
}

// ── Aufgabe rendern ──────────────────────────────────────────────
function zeigeAufgabe(){
  if(aktIndex >= aufgaben.length){ zeigeFertig(); return; }
  aktAufgabe = aufgaben[aktIndex];
  gesperrt   = false;

  // Fortschritt
  var pct = Math.round((aktIndex / gesamtCnt) * 100);
  document.getElementById("fortschritt").style.width = pct + "%";
  document.getElementById("headerSub").textContent =
    (aktIndex+1) + " / " + gesamtCnt;

  // Text + Bild
  document.getElementById("textTitel").textContent  = aktAufgabe.titel;
  document.getElementById("textInhalt").textContent = aktAufgabe.text;

  var vorBtn = document.getElementById("vorleseBtnNav");
  if(vorBtn){ vorBtn.classList.remove("spricht"); vorBtn.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>🔊 Vorlesen'; }

  // Frage
  document.getElementById("frageText").textContent = aktAufgabe.frage;

  // Antworten mischen (Reihenfolge zufällig)
  var optionen = [
    { key:"A", text:aktAufgabe.antwort_a },
    { key:"B", text:aktAufgabe.antwort_b },
    { key:"C", text:aktAufgabe.antwort_c }
  ].filter(function(o){ return !!o.text; });
  optionen = mischen(optionen);

  var grid = document.getElementById("antwortGrid");
  grid.innerHTML = "";
  optionen.forEach(function(opt){
    var zeile = document.createElement("div");
    zeile.className = "antwortZeile";
    zeile.setAttribute("data-key", opt.key);
    var txt = document.createElement("div");
    txt.className = "antwort-text";
    txt.textContent = opt.text;
    var btn = document.createElement("button");
    btn.className = "antwortBtn";
    btn.setAttribute("data-key", opt.key);
    delete btn.dataset.pdwell;
    btn.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>✓';
    btn.addEventListener("click", function(){ pruefeAntwort(opt.key, zeile, btn); });
    zeile.appendChild(txt);
    zeile.appendChild(btn);
    grid.appendChild(zeile);
  });

  // Info zurücksetzen
  var info = document.getElementById("infoZeile");
  info.className = "info-zeile";
  info.textContent = "";
  var weiter = document.getElementById("weiterBtn");
  weiter.className = "weiter-btn";
  var ub=document.getElementById("btnUeberspringen"); if(ub){ ub.style.display = ""; }
  document.getElementById("fertigScreen").className = "fertig-screen";

  bindeDwell();

  // Frage vorlesen nach kurzem Delay
  setTimeout(function(){
    sprich(aktAufgabe.frage);
  }, 600);
}

// ── Antwort prüfen ───────────────────────────────────────────────
function pruefeAntwort(key, gewaehltZeile, gewaehltBtn){
  if(gesperrt) return;
  gesperrt = true;

  var alleZeilen = document.querySelectorAll(".antwortZeile");
  var alleBtns   = document.querySelectorAll(".antwortBtn");
  alleZeilen.forEach(function(z){ z.classList.add("disabled"); });
  alleBtns.forEach(function(b){ b.classList.add("disabled"); });

  var richtigerKey = aktAufgabe.richtig;
  var info  = document.getElementById("infoZeile");
  var weiter = document.getElementById("weiterBtn");
  var ub     = document.getElementById("btnUeberspringen");

  if(key === richtigerKey){
    richtigCnt++;
    gewaehltZeile.classList.add("richtig");
    gewaehltBtn.textContent = "✓";
    info.className = "info-zeile richtig";
    info.textContent = "✓ Richtig! " + aktAufgabe.erklaerung;
    sprich(zufallsLob() + " " + aktAufgabe.erklaerung, function(){
      weiter.className = "weiter-btn sichtbar";
      if(ub) ub.style.display = "none";
      bindeDwell();
    });
  } else {
    gewaehltZeile.classList.add("falsch");
    gewaehltBtn.textContent = "✗";
    // Richtige Zeile grün
    alleZeilen.forEach(function(z){
      if(z.getAttribute("data-key") === richtigerKey){ z.classList.add("richtig"); }
    });
    var richtigText = "";
    if(richtigerKey==="A") richtigText = aktAufgabe.antwort_a;
    else if(richtigerKey==="B") richtigText = aktAufgabe.antwort_b;
    else if(richtigerKey==="C") richtigText = aktAufgabe.antwort_c;
    info.className = "info-zeile falsch";
    info.textContent = "✗ Nicht ganz. Richtig ist: " + richtigText + " — " + aktAufgabe.erklaerung;
    sprich("Das stimmt leider nicht. Richtig ist: " + richtigText + ". " + aktAufgabe.erklaerung, function(){
      weiter.className = "weiter-btn sichtbar";
      if(ub) ub.style.display = "none";
      bindeDwell();
    });
  }
}

// ── Navigation ───────────────────────────────────────────────────
function ueberspringen(){
  if(aktIndex >= aufgaben.length - 1){ zeigeFertig(); return; }
  aktIndex++;
  zeigeAufgabe();
}

function naechsteAufgabe(){
  // KEIN speechSynthesis.cancel() hier — Weiter-Button erscheint erst nach onend
  aktIndex++;
  zeigeAufgabe();
}

function zeigeFertig(){
  document.getElementById("textCard").style.display = "none";
  document.getElementById("frageCard").style.display = "none";
  document.getElementById("infoZeile").style.display = "none";
  document.getElementById("weiterBtn").style.display = "none";
  document.getElementById("fertigScreen").className = "fertig-screen sichtbar";
  document.getElementById("fertigPunkte").textContent =
    richtigCnt + " von " + gesamtCnt + " richtig";
  document.getElementById("fortschritt").style.width = "100%";
  sprich("Super! Du hast alle Aufgaben erledigt! " + richtigCnt + " von " + gesamtCnt + " waren richtig. Toll gemacht!");
  bindeDwell();
}

function nochmal(){
  aktIndex   = 0;
  richtigCnt = 0;
  aufgaben   = alleAufgaben.slice();
  document.getElementById("textCard").style.display = "";
  document.getElementById("frageCard").style.display = "";
  zeigeAufgabe();
}

// ── Dwell ────────────────────────────────────────────────────────
var dwellCtrl = null;
function bindeDwell(){
  if(dwellCtrl) dwellCtrl.cancelDwell();
  var attach = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  dwellCtrl = attach(".antwortBtn:not(.disabled), #vorleseBtnNav, .weiter-btn.sichtbar, #btnUeberspringen, #nochmalBtn, #btnZurueck", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.classList.contains("disabled")) return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── Voices laden & starten ───────────────────────────────────────
try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule_sachkunde.html", window.location.href).href); }catch(e){}

if(speechSynthesis.getVoices().length > 0){
  zeigeAufgabe();
} else {
  speechSynthesis.addEventListener("voiceschanged", function(){ zeigeAufgabe(); }, {once:true});
  setTimeout(function(){ if(aktAufgabe===null) zeigeAufgabe(); }, 800);
}
