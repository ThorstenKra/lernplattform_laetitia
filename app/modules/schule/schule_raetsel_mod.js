// schule_raetsel_mod.js -- Laetitia Lernsystem
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

function ttsAntwort(s){
  if(/^\d+$/.test((s||"").trim())){
    return "die Zahl " + s;
  }
  return s;
}


var alleAufgaben = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    alleAufgaben = api.get("schule_liesmal3_raetsel") || [];
  }
  if(!alleAufgaben.length){
    alleAufgaben = window.LaetitiaSchuleLiesmal3Raetsel || [];
  }
})();

var session = [], index = 0, richtigCount = 0, beantwortet = false;
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

function mischen(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

function starteSession(){
  session = alleAufgaben.slice();
  index = 0; richtigCount = 0;
  zeigeAufgabe();
}

function zeigeAufgabe(){
  if(index >= session.length){ zeigeAbschluss(); return; }
  var t = session[index];
  beantwortet = false;

  document.getElementById("progressFill").style.width = Math.round((index/session.length)*100)+"%";
  document.getElementById("fortschrittText").textContent = (index+1)+" / "+session.length;

  // Hinweise als Liste
  var hinweise = t.text.split("\n").filter(function(s){ return s.trim(); });
  var ul = document.getElementById("hinweisListe");
  ul.innerHTML = "";
  hinweise.forEach(function(h){
    var li = document.createElement("li");
    li.className = "hinweis-item";
    li.textContent = h;
    ul.appendChild(li);
  });

  document.getElementById("aufgabeFrage").textContent = t.frage || "Was bin ich?";
  document.getElementById("seitenInfo").textContent = t.seite ? "Lies mal 3 — Seite "+t.seite : "";

  document.getElementById("labelA").textContent = t.antwort_a;
  document.getElementById("labelB").textContent = t.antwort_b;
  document.getElementById("labelC").textContent = t.antwort_c;

  var weiter = document.getElementById("weiterBtn");
  if(weiter) weiter.className = "nav-btn nav-btn-weiter";
  var fb = document.getElementById("feedbackBanner");
  fb.className = "feedback-banner"; fb.textContent = "";

  ["btnA","btnB","btnC"].forEach(function(id){
    var b = document.getElementById(id);
    b.classList.remove("is-disabled","richtig-flash","falsch-flash");
    delete b.dataset.pdwell;
    bindDwellEinzel(b);
  });
  delete document.getElementById("btnZurueck").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnZurueck"));

  // TTS: alle Hinweise vorlesen
  setTimeout(function(){ sprich(hinweise.join(". ") + ". Was bin ich?"); }, 300);
}

function antworten(buchstabe){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = (buchstabe === t.richtig);
  ["btnA","btnB","btnC"].forEach(function(id){ document.getElementById(id).classList.add("is-disabled"); });
  var gewaehlt = document.getElementById("btn"+buchstabe);
  var fb = document.getElementById("feedbackBanner");
  if(korrekt){
    richtigCount++;
    gewaehlt.classList.add("richtig-flash");
    fb.className = "feedback-banner richtig";
    fb.textContent = "✅ Richtig!" + (t.erklaerung ? "  "+t.erklaerung : "");
    sprich(zufallsLob() + " " + (t.erklaerung||""), function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  } else {
    gewaehlt.classList.add("falsch-flash");
    var richtigLabel = t["antwort_"+t.richtig.toLowerCase()];
    fb.className = "feedback-banner falsch";
    fb.textContent = "Die Antwort ist: " + richtigLabel + (t.erklaerung ? ".  "+t.erklaerung : ".");
    sprich("Die Antwort ist " + ttsAntwort(richtigLabel) + ".", function(){
      var weiter = document.getElementById("weiterBtn");
      if(weiter){ weiter.className = "nav-btn nav-btn-weiter sichtbar"; rebindDwell(); }
    });
  }
  
}

function zeigeAbschluss(){
  document.getElementById("mainBereich").style.display = "none";
  var zl=document.getElementById("navLeiste"); if(zl) zl.style.display="none";
  var sc = document.getElementById("abschlussScreen");
  sc.classList.add("sichtbar");
  var pct = Math.round((richtigCount/session.length)*100);
  document.getElementById("abschlussScore").textContent = richtigCount+" von "+session.length+" richtig";
  var e,ti,su;
  if(pct>=80){e="🌟";ti="Raetsel-Meisterin!";su="Du kennst alle Antworten!";}
  else if(pct>=60){e="😊";ti="Gut geraetselt!";su="Immer besser!";}
  else{e="💪";ti="Weiter so!";su="Nächstes Mal klappt es noch besser!";}
  document.getElementById("abschlussEmoji").textContent=e;
  document.getElementById("abschlussTitel").textContent=ti;
  document.getElementById("abschlussSub").textContent=su;
  sprich(ti);
  delete document.getElementById("btnAbschluss").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnAbschluss"));
  document.getElementById("progressFill").style.width="100%";
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

function ueberspringen(){
  if(index >= session.length - 1){ zeigeAbschluss(); return; }
  index++;
  zeigeAufgabe();
}

var DWELL_SELECTOR = "#btnA, #btnB, #btnC, #weiterBtn.sichtbar, #btnUeberspringen, #btnZurueck, #btnAbschluss";

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

if(alleAufgaben.length===0){
  document.getElementById("hinweisListe").innerHTML = "<li class='hinweis-item'>Keine Aufgaben gefunden.</li>";
} else {
  if(speechSynthesis.getVoices().length > 0){
    starteSession();
  } else {
    speechSynthesis.addEventListener("voiceschanged", function(){ starteSession(); }, {once:true});
    setTimeout(function(){ starteSession(); }, 800);
  }
}
