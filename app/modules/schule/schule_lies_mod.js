// schule_lies_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Lob-Texte (Goldstandard aus moduleKit) ───────────────────────────────────
var LOB_TEXTE = [
  "Wunderbar!", "Fantastisch!", "Super!", "Toll gemacht!",
  "Du überraschst mich!", "Klasse!", "Sehr gut!", "Bravo!",
  "Genial!", "Das sitzt!", "Perfekt!", "Großartig!"
];
function zufallsLob(){ return LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]; }


var alleBlocke = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function") alleBlocke = api.get("schule_liesmal3_lies") || [];
  if(!alleBlocke.length) alleBlocke = window.LaetitiaSchuleLiesmal3Lies || [];
})();

var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
var aktBlock = null;
var satzIndex = 0;

// ── Screen-Steuerung ──────────────────────────────────────────────────────────
function zeigeScreen(id){
  ["screenAuswahl","screenSaetze","screenFrage"].forEach(function(s){
    var el=document.getElementById(s);
    if(el) el.style.display=(s===id)?"flex":"none";
  });
}

// ── Block-Auswahl aufbauen ────────────────────────────────────────────────────
function aufbauenAuswahl(){
  var container = document.getElementById("blockAuswahl");
  container.innerHTML = "";
  var emojis = ["📖","🦒","🧙","🐙","🍕","🤿"];
  alleBlocke.forEach(function(block, i){
    var btn = document.createElement("div");
    btn.className = "block-btn";
    btn.innerHTML =
      '<svg class="dwell-ring-svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25"/></svg>'+
      '<div class="block-btn-emoji">'+(emojis[i]||"📄")+'</div>'+
      '<div class="block-btn-titel">'+block.titel+'</div>'+
      '<div class="block-btn-seite">Seite '+block.seite+'</div>';
    btn.addEventListener("click", function(){ starteBlock(i); });
    bindDwellEinzel(btn);
    container.appendChild(btn);
  });
  zeigeScreen("screenAuswahl");
  document.getElementById("fortschrittText").textContent = "";
}

// ── Block starten ──────────────────────────────────────────────────────────────
function starteBlock(i){
  aktBlock = alleBlocke[i];
  satzIndex = 0;

  document.getElementById("satzTitel").textContent = aktBlock.titel;
  document.getElementById("satzSeitenInfo").textContent = "Lies mal 3 — Seite "+aktBlock.seite;

  // Sätze als anklickbare Items aufbauen
  var liste = document.getElementById("satzListe");
  liste.innerHTML = "";
  aktBlock.saetze.forEach(function(s, idx){
    var item = document.createElement("div");
    item.className = "satz-item";
    item.innerHTML =
      '<svg class="dwell-ring-svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25"/></svg>'+
      '<span class="satz-icon">📄</span>'+
      '<span class="satz-text">'+s.satz+'</span>';
    item.dataset.idx = idx;
    item.addEventListener("click", function(){
      item.classList.toggle("bestaetigt");
      item.querySelector(".satz-icon").textContent = item.classList.contains("bestaetigt") ? "✅" : "📄";
    });
    bindDwellEinzel(item);
    liste.appendChild(item);
  });

  // Weiter-Button
  var btnWeiter = document.getElementById("btnWeiter");
  delete btnWeiter.dataset.pdwell;
  btnWeiter.onclick = function(){
    if(aktBlock.frage_am_ende){ zeigeSchlussFrage(); }
    else { zeigeAbschluss("Toll gelesen!"); }
  };
  bindDwellEinzel(btnWeiter);

  zeigeScreen("screenSaetze");
  document.getElementById("fortschrittText").textContent = aktBlock.titel;
  document.getElementById("btnWeiter").classList.add("sichtbar");
  document.getElementById("btnUeberspringen").classList.add("sichtbar");

}

// ── Schluss-Frage ─────────────────────────────────────────────────────────────
function zeigeSchlussFrage(){
  var frage = aktBlock.frage_am_ende;
  document.getElementById("schlussFrageText").textContent = frage.text;
  setInfoLine("","");
  ["btnSchlusJa","btnSchlusNein","btnZurueck"].forEach(function(id){
    var b=document.getElementById(id); if(b){ b.classList.remove("is-disabled","correct-flash","falsch-gewaehlt"); delete b.dataset.pdwell; bindDwellEinzel(b); }
  });
  document.getElementById("btnWeiter").classList.remove("sichtbar");
  document.getElementById("btnUeberspringen").classList.remove("sichtbar");
  zeigeScreen("screenFrage");
}

function schlussAntworten(buchstabe){
  var frage = aktBlock.frage_am_ende;
  var korrekt = buchstabe === frage.richtig;
  document.getElementById("btnSchlusJa").classList.add("is-disabled");
  document.getElementById("btnSchlusNein").classList.add("is-disabled");

  var gewaehlt = document.getElementById(buchstabe==="A"?"btnSchlusJa":"btnSchlusNein");
  if(korrekt){
    gewaehlt.classList.add("correct-flash");
    var erkl = frage.erklaerung || "";
    setInfoLine("✓ Richtig!"+(erkl?" "+erkl:""), "richtig");
    sprich(erkl?zufallsLob()+" "+erkl:zufallsLob(), function(){ setTimeout(function(){ zeigeAbschluss(korrekt?"Super gemacht!":"Weiter so!"); }, 400); });
  } else {
    gewaehlt.classList.add("falsch-gewaehlt");
    var richtigBtn = document.getElementById(frage.richtig==="A"?"btnSchlusJa":"btnSchlusNein");
    if(richtigBtn) richtigBtn.classList.add("correct-flash");
    var richtigeAntwort = frage.richtig==="A" ? (frage.antwort_a||"Ja") : (frage.antwort_b||"Nein");
    var erkl2 = frage.erklaerung || "";
    setInfoLine("✗ Falsch. Richtig wäre: "+richtigeAntwort+(erkl2?" — "+erkl2:""), "falsch");
    sprich("Das ist leider falsch. Richtig wäre: "+richtigeAntwort+(erkl2?". "+erkl2:""), function(){ setTimeout(function(){ zeigeAbschluss(korrekt?"Super gemacht!":"Weiter so!"); }, 400); });
  }
}

function zeigeAbschluss(titel){
  document.getElementById("mainBereich").style.display="none";
  var zl=document.getElementById("navLeiste"); if(zl) zl.style.display="none";
  var sc=document.getElementById("abschlussScreen"); sc.classList.add("sichtbar");
  document.getElementById("abschlussTitel").textContent=titel;
  document.getElementById("abschlussSub").textContent = aktBlock ? "Geschichte: "+aktBlock.titel : "";
  sprich(titel+" Du hast die Geschichte gelesen!");
  delete document.getElementById("btnAbschluss").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnAbschluss"));
  document.getElementById("progressFill").style.width="100%";
}

function setInfoLine(text, art){
  var el=document.getElementById("infoLine"); if(!el) return;
  el.className="infoLine"+(art?" "+art:""); el.textContent=text||""; el.style.display=text?"":"none";
}

function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.92;
    var voices = speechSynthesis.getVoices();
    // Katja bevorzugen (natürliche weibliche Stimme), dann andere Microsoft-Stimmen
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
      // Kurzer Delay nach cancel() damit Edge den Anfang nicht verschluckt
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

// ── Dwell (Regel 7: LaetitiaAttachDwell) ─────────────────────────────────────
var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
var _dwellHandle = { cancelDwell: function(){} };

function ueberspringen(){
  var btnWeiter = document.getElementById("btnWeiter");
  if(btnWeiter && btnWeiter.onclick) btnWeiter.onclick();
}

var DWELL_SELECTOR = ".satz-btn, #btnWeiter, #btnUeberspringen, #btnZurueck, #btnAbschluss";

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
function bindDwellEinzel(el){ rebindDwell(); }

try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule_deutsch.html", window.location.href).href); }catch(e){}
bindDwellEinzel(document.getElementById("btnZurueck"));

if(alleBlocke.length===0){ document.getElementById("screenAuswahl").innerHTML="<p>Keine Daten gefunden.</p>"; }
else {
    speechSynthesis.addEventListener("voiceschanged", function(){ aufbauenAuswahl(); }, {once:true});
    setTimeout(function(){ aufbauenAuswahl(); }, 800);
  }
