// schule_mathe_mod.js -- Laetitia Lernsystem
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

// Zahlen als TTS-Antwort korrekt vorlesen (verhindert "Dritter" statt "Drei")
function ttsAntwort(s){
  if(/^\d+$/.test((s||"").trim())){
    return "die Zahl " + s;
  }
  return s;
}


var alleAufgaben = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function") alleAufgaben = api.get("schule_mathe") || [];
  if(!alleAufgaben.length) alleAufgaben = window.LaetitiaSchuleMatheAufgaben || [];
})();

var STUFEN = [
  { code:"SMA1", titel:"Rechnen mit der 10", sub:"Seiten 7 + 23", emoji:"🔟" },
  { code:"SMA2", titel:"Grosse und kleine Aufgaben", sub:"Seiten 8 + 24", emoji:"📏" },
  { code:"SMA3", titel:"Verdoppeln + Halbieren", sub:"Seiten 13 + 15", emoji:"✌️" },
  { code:"SMA4", titel:"Fast verdoppeln", sub:"Seite 14", emoji:"➕" },
  { code:"SMA5", titel:"Tauschaufgaben", sub:"Seiten 9 + 16", emoji:"🔄" },
  { code:"SMA6", titel:"+9 / +11 / -9 / -11", sub:"Seiten 12 + 28", emoji:"9️⃣" }
];

var session = [], index = 0, richtigCount = 0, beantwortet = false;
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
var aktStufe = "";

function mischen(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

// URL-Parameter lesen
(function(){
  try{
    var params = new URLSearchParams(window.location.search);
    var s = params.get("stufe");
    if(s) aktStufe = s;
    // Seiten-Filter aus Chronologie
    var nurSeite = params.get("seite");
    var nurHeft  = params.get("heft");
    if(nurSeite || nurHeft){
      alleAufgaben = alleAufgaben.filter(function(t){
        var seiteOk = !nurSeite || String(t.seite)===nurSeite;
        var heftOk  = !nurHeft  || t.heft===nurHeft;
        return seiteOk && heftOk;
      });
    }
  }catch(e){}
})();

function aufbauenStufen(){
  var grid = document.getElementById("stufenGrid");
  grid.innerHTML = "";
  STUFEN.forEach(function(s){
    var count = alleAufgaben.filter(function(t){ return t.stufe===s.code; }).length;
    if(!count) return;
    var btn = document.createElement("div");
    btn.className = "stufe-btn";
    btn.innerHTML =
      '<svg class="dwell-ring-svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25"/></svg>'+
      '<div class="stufe-btn-code">'+s.code+'</div>'+
      '<div class="stufe-btn-emoji">'+s.emoji+'</div>'+
      '<div class="stufe-btn-titel">'+s.titel+'</div>'+
      '<div class="stufe-btn-sub">'+s.sub+' · '+count+' Aufgaben</div>';
    btn.addEventListener("click", function(){ starteStufe(s.code, s.titel); });
    bindDwellEinzel(btn);
    grid.appendChild(btn);
  });
  document.getElementById("screenStufen").style.display = "block";
  document.getElementById("screenAufgabe").style.display = "none";
}

function starteStufe(code, titel){
  aktStufe = code;
  var gefiltert = alleAufgaben.filter(function(t){ return t.stufe===code; });
  session = gefiltert.slice();
  index = 0; richtigCount = 0;
  document.getElementById("screenStufen").style.display = "none";
  document.getElementById("screenAufgabe").style.display = "flex";
  document.getElementById("fortschrittText").textContent = titel;
  zeigeAufgabe();
}

function zeigeAufgabe(){
  if(index >= session.length){ zeigeAbschluss(); return; }
  var t = session[index];
  beantwortet = false;

  document.getElementById("progressFill").style.width = Math.round((index/session.length)*100)+"%";
  document.getElementById("aufgabeText").textContent = t.text;
  document.getElementById("aufgabeFrage").textContent = t.frage || "Was ist das Ergebnis?";
  document.getElementById("seitenInfo").textContent = t.seite ? "Nase vorn! — Seite "+t.seite : "";
  document.getElementById("labelA").textContent = t.antwort_a;
  document.getElementById("labelB").textContent = t.antwort_b;
  document.getElementById("labelC").textContent = t.antwort_c;
  document.getElementById("labelD").textContent = t.antwort_d || "";
  document.getElementById("btnD").style.display = t.antwort_d ? "" : "none";

  setInfoLine("","");
  ["btnA","btnB","btnC","btnD","btnZurueck"].forEach(function(id){
    var b=document.getElementById(id); if(b){ b.classList.remove("is-disabled","correct-flash","falsch-gewaehlt"); delete b.dataset.pdwell; bindDwellEinzel(b); }
  });
  var weiter = document.getElementById("weiterBtn");
  if(weiter) weiter.className = "nav-btn nav-btn-weiter";

  setTimeout(function(){
    var ttsText = (t.text||"").replace(/(\d)\./g,"$1").replace(/\?/g,"").replace(/=/g," gleich ").replace(/\+/g," plus ").replace(/\-/g," minus ").trim();
    sprich(ttsText + ". " + (t.frage||""));
  }, 300);
}

function antworten(buchstabe){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = buchstabe === t.richtig;
  ["btnA","btnB","btnC","btnD"].forEach(function(id){ var b=document.getElementById(id); if(b) b.classList.add("is-disabled"); });

  var gewaehlt = document.getElementById("btn"+buchstabe);
  if(korrekt){
    richtigCount++;
    if(gewaehlt) gewaehlt.classList.add("correct-flash");
    var erkl = t.erklaerung || "";
    setInfoLine("✓ Richtig!"+(erkl?" "+erkl:""), "richtig");
    sprich(erkl?zufallsLob()+" "+erkl:zufallsLob(), function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  } else {
    if(gewaehlt) gewaehlt.classList.add("falsch-gewaehlt");
    var richtigBtn = document.getElementById("btn"+t.richtig);
    if(richtigBtn) richtigBtn.classList.add("correct-flash");
    var richtigLabel = t["antwort_"+t.richtig.toLowerCase()] || "";
    var erkl2 = t.erklaerung || "";
    setInfoLine("✗ Falsch. Richtig wäre: "+richtigLabel+(erkl2?" — "+erkl2:""), "falsch");
    sprich("Das ist leider falsch. Richtig ist: "+ttsAntwort(richtigLabel)+(erkl2?". "+erkl2:""), function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  }
  
}

function setInfoLine(text, art){
  var el=document.getElementById("infoLine"); if(!el) return;
  el.className="infoLine"+(art?" "+art:""); el.textContent=text||""; el.style.display=text?"":"none";
}

function zeigeAbschluss(){
  document.getElementById("mainBereich").style.display="none";
  var zl=document.getElementById("navLeiste"); if(zl) zl.style.display="none";
  var sc=document.getElementById("abschlussScreen"); sc.classList.add("sichtbar");
  var pct=Math.round((richtigCount/session.length)*100);
  document.getElementById("abschlussScore").textContent=richtigCount+" von "+session.length+" richtig";
  document.getElementById("abschlussEmoji").textContent=pct>=80?"🌟":pct>=60?"😊":"💪";
  document.getElementById("abschlussTitel").textContent=pct>=80?"Mathe-Meisterin!":pct>=60?"Gut gerechnet!":"Weiter so!";
  document.getElementById("abschlussSub").textContent="Thema: "+aktStufe;
  sprich(pct>=80?"Fantastisch!":"Gut gemacht! "+richtigCount+" von "+session.length+" richtig.");
  delete document.getElementById("btnAbschluss").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnAbschluss"));
  document.getElementById("progressFill").style.width="100%";
}

function ueberspringen(){
  if(index >= session.length - 1){ zeigeAbschluss(); return; }
  index++;
  zeigeAufgabe();
}

function naechsteAufgabe(){
  index++;
  zeigeAufgabe();
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

var DWELL_SELECTOR = "#btnA, #btnB, #btnC, #btnD, #weiterBtn.sichtbar, #btnUeberspringen, #btnZurueck, #btnAbschluss";

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

try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule_mathe_uebersicht.html", window.location.href).href); }catch(e){}
bindDwellEinzel(document.getElementById("btnZurueck"));

function _start(){
  if(aktStufe){
    var stufenInfo = STUFEN.find(function(s){ return s.code===aktStufe; });
    starteStufe(aktStufe, stufenInfo ? stufenInfo.titel : aktStufe);
  } else {
    aufbauenStufen();
  }
}
if(speechSynthesis.getVoices().length > 0){
  _start();
} else {
  speechSynthesis.addEventListener("voiceschanged", function(){ _start(); }, {once:true});
  setTimeout(function(){ _start(); }, 800);
}
