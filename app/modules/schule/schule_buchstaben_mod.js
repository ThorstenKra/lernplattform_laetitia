// schule_buchstaben_mod.js -- Laetitia Lernsystem
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


var alleAufgaben = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function") alleAufgaben = api.get("schule_liesmal3_buchstaben") || [];
  if(!alleAufgaben.length) alleAufgaben = window.LaetitiaSchuleLiesmal3Buchstaben || [];
})();

// Aufgaben nach Loesungswort gruppieren — ein Durchlauf = ein Loesungswort
var gruppen = [];
(function(){
  var seen = {};
  alleAufgaben.forEach(function(t){
    if(!seen[t.loesungswort]){
      seen[t.loesungswort] = [];
      gruppen.push({ wort: t.loesungswort, aufgaben: seen[t.loesungswort] });
    }
    seen[t.loesungswort].push(t);
  });
})();

var aktGruppe = 0;
var session = [], index = 0, richtigCount = 0, beantwortet = false;
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

function mischen(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

function starteGruppe(gi){
  aktGruppe = gi;
  var g = gruppen[gi];
  session = g.aufgaben; // nicht mischen — Reihenfolge = Buchstaben des Loesungswortes
  index = 0; richtigCount = 0;
  renderLoesungswort(g.wort, -1, []);
  zeigeAufgabe();
}

function renderLoesungswort(wort, aktuellerIndex, aufgedeckte){
  var container = document.getElementById("lwBuchstaben");
  container.innerHTML = "";
  for(var i=0; i<wort.length; i++){
    var box = document.createElement("div");
    box.className = "lw-box";
    if(aufgedeckte.indexOf(i) >= 0){ box.textContent = wort[i]; box.classList.add("aufgedeckt"); }
    else if(i === aktuellerIndex){ box.textContent = "?"; box.classList.add("aktuell"); }
    else { box.textContent = "_"; }
    container.appendChild(box);
  }
}

function zeigeAufgabe(){
  if(index >= session.length){ zeigeAbschluss(); return; }
  var t = session[index];
  beantwortet = false;
  var g = gruppen[aktGruppe];

  document.getElementById("progressFill").style.width = Math.round((index/session.length)*100)+"%";
  document.getElementById("fortschrittText").textContent = (index+1)+" / "+session.length;
  document.getElementById("hinweisNr").textContent = "Hinweis "+(index+1)+" — Buchstabe "+(index+1);
  document.getElementById("hinweisText").textContent = t.text;
  document.getElementById("aufgabeFrage").textContent = t.frage || "Was ist das?";
  document.getElementById("seitenInfo").textContent = t.seite ? "Lies mal 3 — Seite "+t.seite : "";

  // Loesungswort aktualisieren
  var aufgedeckte = [];
  for(var i=0; i<index; i++) aufgedeckte.push(i);
  renderLoesungswort(g.wort, index, aufgedeckte);

  document.getElementById("labelA").textContent = t.antwort_a;
  document.getElementById("labelB").textContent = t.antwort_b;
  document.getElementById("labelC").textContent = t.antwort_c;
  document.getElementById("labelD").textContent = t.antwort_d || "";

  // Regel 20: Antwortoptionen zuerst passiv anzeigen (optionen-lese hat
  // pointer-events:none), getrennt von den Dwell-Buttons btnA-D unten.
  var optLese = document.getElementById("optionenLese");
  if(optLese){
    optLese.innerHTML = "";
    [t.antwort_a, t.antwort_b, t.antwort_c, t.antwort_d].forEach(function(w){
      if(!w) return;
      var span = document.createElement("span");
      span.className = "optionen-lese-eintrag";
      span.textContent = w;
      optLese.appendChild(span);
    });
  }

  var btnD = document.getElementById("btnD");
  btnD.style.display = t.antwort_d ? "" : "none";

  setInfoLine("","");
  // Regel 18: Antwort-Buttons erst nach TTS-Ende freigeben -- Zurueck bleibt sofort erreichbar
  ["btnA","btnB","btnC","btnD"].forEach(function(id){
    var b=document.getElementById(id); if(b){ b.classList.remove("correct-flash","falsch-gewaehlt"); b.classList.add("is-disabled"); delete b.dataset.pdwell; }
  });
  var btnZurueck = document.getElementById("btnZurueck");
  if(btnZurueck){ btnZurueck.classList.remove("is-disabled","correct-flash","falsch-gewaehlt"); delete btnZurueck.dataset.pdwell; }
  bindDwellEinzel(btnZurueck);

  setTimeout(function(){
    sprich(t.text + ". " + (t.frage||"Was ist das?"), function(){
      ["btnA","btnB","btnC","btnD"].forEach(function(id){
        var b=document.getElementById(id); if(b) b.classList.remove("is-disabled");
      });
      rebindDwell();
    });
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
    setInfoLine("✓ Richtig!" + (erkl ? "  "+erkl : ""), "richtig");
    sprich(erkl ? zufallsLob()+" "+erkl : zufallsLob(), function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  } else {
    if(gewaehlt) gewaehlt.classList.add("falsch-gewaehlt");
    var richtigBtn = document.getElementById("btn"+t.richtig);
    if(richtigBtn){ richtigBtn.classList.add("correct-flash"); }
    var richtigLabel = t["antwort_"+t.richtig.toLowerCase()] || "";
    var erkl2 = t.erklaerung || "";
    setInfoLine("✗ Falsch. Richtig wäre: "+richtigLabel+(erkl2?" — "+erkl2:""), "falsch");
    sprich("Das ist leider falsch. Richtig wäre: "+richtigLabel+(erkl2?". "+erkl2:""), function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  }
  
}

function setInfoLine(text, art){
  var el=document.getElementById("infoLine");
  if(!el) return;
  el.className="infoLine"+(art?" "+art:"");
  el.textContent=text||"";
  el.style.display=text?"":"none";
}

function zeigeAbschluss(){
  // Alle Buchstaben aufdecken
  var g = gruppen[aktGruppe];
  var alle = [];
  for(var i=0;i<g.wort.length;i++) alle.push(i);
  renderLoesungswort(g.wort, -1, alle);

  document.getElementById("mainBereich").style.display="none";
  var zl=document.getElementById("navLeiste"); if(zl) zl.style.display="none";
  var sc=document.getElementById("abschlussScreen"); sc.classList.add("sichtbar");
  var pct=Math.round((richtigCount/session.length)*100);
  document.getElementById("abschlussScore").textContent=richtigCount+" von "+session.length+" richtig";
  document.getElementById("abschlussEmoji").textContent=pct>=80?"🌟":pct>=60?"😊":"💪";
  document.getElementById("abschlussTitel").textContent=pct>=80?"Rätsel-Meisterin!":pct>=60?"Gut gemacht!":"Weiter so!";
  document.getElementById("abschlussSub").textContent="Lösungswort: "+g.wort;
  sprich("Das Lösungswort ist: "+g.wort);
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

try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule_deutsch.html", window.location.href).href); }catch(e){}

if(gruppen.length===0){ document.getElementById("hinweisText").textContent="Keine Aufgaben gefunden."; }
else {
    speechSynthesis.addEventListener("voiceschanged", function(){ starteGruppe(0); }, {once:true});
    setTimeout(function(){ starteGruppe(0); }, 800);
  }
