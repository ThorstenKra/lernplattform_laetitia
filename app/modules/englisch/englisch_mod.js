// englisch_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Daten laden ───────────────────────────────────────────────────────────────
var alleAufgaben = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function") alleAufgaben = api.get("englisch") || [];
  if(!alleAufgaben.length) alleAufgaben = window.LaetitiaEnglischAufgaben || [];
})();

var SESSION = 8;
var session = [], index = 0, richtigCount = 0, beantwortet = false;
var aktStufe = "";
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

// ── TTS — englisch mit britischer/amerikanischer Stimme ───────────────────────
function sprichEN(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    var voices = speechSynthesis.getVoices();
    // Bevorzuge Microsoft-Stimmen (Edge TTS) mit en-GB, dann en-US, dann beliebig en
    var en = voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang === "en-GB"; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("en-"); })
          || voices.find(function(v){ return v.lang === "en-GB"; })
          || voices.find(function(v){ return v.lang.startsWith("en-"); });
    if(en) u.voice = en;
    u.rate = 0.82;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      if(danach) u.onend = function(){ setTimeout(danach, 200); };
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 300); }
}

function sprichDE(text){
  try{
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    u.rate = 0.90;
    speechSynthesis.speak(u);
  }catch(e){}
}

function sprichMitOnend_DE(text, danach){
  try{
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.90;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      if(danach) u.onend = function(){ setTimeout(danach, 200); };
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 300); }
}

// ── Screen-Steuerung ──────────────────────────────────────────────────────────
function zeigeScreen(id){
  ["screenStufen","screenEmoji","screenWort"].forEach(function(s){
    var el = document.getElementById(s);
    if(el) el.style.display = (s===id) ? "flex" : "none";
  });
}

// ── Stufen-Auswahl ────────────────────────────────────────────────────────────
var STUFEN_META = {
  "E1":{ emoji:"🔤", label:"Stufe 1", sub:"Wörter hören", farbe:"var(--akzent)" },
  "E2":{ emoji:"🗣️", label:"Stufe 2", sub:"Sätze verstehen", farbe:"var(--en)" },
  "E3":{ emoji:"✍️", label:"Stufe 3", sub:"Sätze bauen", farbe:"var(--akzent2)" }
};

function aufbauenStufenAuswahl(){
  var grid = document.getElementById("stufenGrid");
  grid.innerHTML = "";
  ["E1","E2","E3"].forEach(function(code){
    var meta = STUFEN_META[code];
    var count = alleAufgaben.filter(function(t){ return t.stufe===code; }).length;
    var btn = document.createElement("div");
    btn.className = "stufe-btn";
    btn.innerHTML =
      '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>'+
      '<div class="stufe-emoji">'+meta.emoji+'</div>'+
      '<div class="stufe-label">'+meta.label+'</div>'+
      '<div class="stufe-sub">'+meta.sub+'</div>'+
      '<div class="stufe-count">'+count+' Aufgaben</div>';
    btn.addEventListener("click", function(){ starteStufe(code); });
    bindDwellEinzel(btn);
    grid.appendChild(btn);
  });
  zeigeScreen("screenStufen");
  document.getElementById("fortschrittText").textContent = "";
}

// ── Stufe starten ─────────────────────────────────────────────────────────────
function mischen(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

function starteStufe(code){
  aktStufe = code;
  var gefiltert = alleAufgaben.filter(function(t){ return t.stufe===code; });
  session = mischen(gefiltert).slice(0, SESSION);
  index = 0; richtigCount = 0;
  document.getElementById("fortschrittText").textContent = STUFEN_META[code].label;
  zeigeAufgabe();
}

// ── Aufgabe anzeigen ──────────────────────────────────────────────────────────
function zeigeAufgabe(){
  if(index >= session.length){ zeigeAbschluss(); return; }
  var t = session[index];
  beantwortet = false;

  document.getElementById("progressFill").style.width = Math.round((index/session.length)*100)+"%";

  if(t.stufe === "E1" || t.stufe === "E2"){
    zeigeEmojiAufgabe(t);
  } else {
    zeigeWortAufgabe(t);
  }
}

// ── E1/E2: Emoji-Paar ─────────────────────────────────────────────────────────
function zeigeEmojiAufgabe(t){
  document.getElementById("enText").textContent = t.text;
  document.getElementById("enAufgabe").textContent = t.stufe==="E1"
    ? "Welches Bild passt?"
    : "Was passiert hier?";

  // Zufaellig tauschen
  var richtigLinks = Math.random() > 0.5;
  var slots = richtigLinks
    ? [{ emoji:t.emoji_richtig, label:t.label_richtig, korrekt:true  },
       { emoji:t.emoji_falsch,  label:t.label_falsch,  korrekt:false }]
    : [{ emoji:t.emoji_falsch,  label:t.label_falsch,  korrekt:false },
       { emoji:t.emoji_richtig, label:t.label_richtig, korrekt:true  }];

  for(var i=0;i<2;i++){
    document.getElementById("emoji"+i).textContent   = slots[i].emoji;
    document.getElementById("label"+i).textContent   = slots[i].label;
    document.getElementById("btnEmoji"+i).dataset.korrekt = slots[i].korrekt ? "1" : "0";
    var b = document.getElementById("btnEmoji"+i);
    // Regel 18: erst nach TTS-Ende freigeben
    b.classList.remove("correct-flash","falsch-gewaehlt");
    b.classList.add("is-disabled");
    delete b.dataset.pdwell;
  }

  setInfoLine("infoLineEmoji","","");
  document.getElementById("btnPlay").dataset.tts = t.tts_en;
  delete document.getElementById("btnPlay").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnPlay"));
  delete document.getElementById("btnZurueck").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnZurueck"));

  zeigeScreen("screenEmoji");
  setTimeout(function(){
    sprichEN(t.tts_en, function(){
      document.getElementById("btnEmoji0").classList.remove("is-disabled");
      document.getElementById("btnEmoji1").classList.remove("is-disabled");
      rebindDwell();
    });
  }, 400);
}

function antwortenEmoji(idx){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = document.getElementById("btnEmoji"+idx).dataset.korrekt === "1";

  document.getElementById("btnEmoji0").classList.add("is-disabled");
  document.getElementById("btnEmoji1").classList.add("is-disabled");

  if(korrekt){
    richtigCount++;
    document.getElementById("btnEmoji"+idx).classList.add("correct-flash");
    setInfoLine("infoLineEmoji","✓ Correct! — "+t.erklaerung_de,"richtig");
    sprichEN("Correct! Well done!", function(){ sprichMitOnend_DE(t.erklaerung_de, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 600); }); });
  } else {
    document.getElementById("btnEmoji"+idx).classList.add("falsch-gewaehlt");
    // Richtigen Button finden und flashen
    var richtigIdx = document.getElementById("btnEmoji0").dataset.korrekt==="1" ? 0 : 1;
    document.getElementById("btnEmoji"+richtigIdx).classList.add("correct-flash");
    setInfoLine("infoLineEmoji","✗ Das war: "+t.emoji_richtig+" "+t.label_richtig+" — "+t.erklaerung_de,"falsch");
    sprichEN("Not quite. The answer is: "+t.label_richtig+". "+t.erklaerung_de, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 600); });
  }
}

// ── E3: Wort einsetzen ────────────────────────────────────────────────────────
function zeigeWortAufgabe(t){
  document.getElementById("wortText").textContent = t.text;
  document.getElementById("wortA").textContent = t.antwort_a;
  document.getElementById("wortB").textContent = t.antwort_b;
  document.getElementById("wortC").textContent = t.antwort_c;

  ["btnW0","btnW1","btnW2"].forEach(function(id){
    var b=document.getElementById(id);
    // Regel 18: erst nach TTS-Ende freigeben
    b.classList.remove("correct-flash","falsch-gewaehlt");
    b.classList.add("is-disabled");
    delete b.dataset.pdwell;
  });

  setInfoLine("infoLineWort","","");
  document.getElementById("btnPlayWort").dataset.tts = t.tts_en;
  delete document.getElementById("btnPlayWort").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnPlayWort"));
  delete document.getElementById("btnZurueck").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnZurueck"));

  zeigeScreen("screenWort");
  setTimeout(function(){
    sprichEN(t.tts_en, function(){
      ["btnW0","btnW1","btnW2"].forEach(function(id){ document.getElementById(id).classList.remove("is-disabled"); });
      rebindDwell();
    });
  }, 400);
}

function antwortenWort(buchstabe){
  if(beantwortet) return;
  beantwortet = true;
  var t = session[index];
  var korrekt = buchstabe === t.richtig;
  var btnMap = {A:"btnW0", B:"btnW1", C:"btnW2"};

  ["btnW0","btnW1","btnW2"].forEach(function(id){ document.getElementById(id).classList.add("is-disabled"); });

  if(korrekt){
    richtigCount++;
    document.getElementById(btnMap[buchstabe]).classList.add("correct-flash");
    setInfoLine("infoLineWort","✓ Correct! — "+t.erklaerung_de,"richtig");
    sprichEN(t.tts_komplett, function(){ sprichDE(t.erklaerung_de); });
  } else {
    document.getElementById(btnMap[buchstabe]).classList.add("falsch-gewaehlt");
    document.getElementById(btnMap[t.richtig]).classList.add("correct-flash");
    var richtigAntwort = t["antwort_"+t.richtig.toLowerCase()];
    setInfoLine("infoLineWort","✗ Richtig wäre: "+richtigAntwort+" — "+t.erklaerung_de,"falsch");
    sprichEN(t.tts_komplett, function(){ sprichMitOnend_DE(t.erklaerung_de, function(){ setTimeout(function(){ index++; zeigeAufgabe(); }, 600); }); });
  }
}

// ── Feedback-Helfer ───────────────────────────────────────────────────────────
function setInfoLine(id, text, art){
  var el = document.getElementById(id);
  if(!el) return;
  el.className = "infoLine"+(art?" "+art:"");
  el.textContent = text||"";
  el.style.display = text?"":"none";
}

// ── Abschluss ─────────────────────────────────────────────────────────────────
function zeigeAbschluss(){
  document.getElementById("mainBereich").style.display="none";
  document.getElementById("zurueckLeiste").style.display="none";
  var sc=document.getElementById("abschlussScreen"); sc.classList.add("sichtbar");
  var pct=Math.round((richtigCount/session.length)*100);
  document.getElementById("abschlussScore").textContent=richtigCount+" von "+session.length+" richtig";
  var e,ti,su;
  if(pct>=80){e="🌟";ti="Amazing!";su="Du lernst Englisch super schnell!";}
  else if(pct>=60){e="😊";ti="Good job!";su="Immer besser! Keep going!";}
  else{e="💪";ti="Keep trying!";su="Jede Übung macht dich besser!";}
  document.getElementById("abschlussEmoji").textContent=e;
  document.getElementById("abschlussTitel").textContent=ti;
  document.getElementById("abschlussSub").textContent=su;
  sprichEN(ti+" "+richtigCount+" out of "+session.length+" correct.");
  delete document.getElementById("btnAbschluss").dataset.pdwell;
  bindDwellEinzel(document.getElementById("btnAbschluss"));
  document.getElementById("progressFill").style.width="100%";
}

// ── Play-Buttons ──────────────────────────────────────────────────────────────
document.getElementById("btnPlay").addEventListener("click", function(){
  var tts = this.dataset.tts;
  if(tts) sprichEN(tts);
});
document.getElementById("btnPlayWort").addEventListener("click", function(){
  var tts = this.dataset.tts;
  if(tts) sprichEN(tts);
});

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
var _dwellHandle = { cancelDwell: function(){} };

var DWELL_SELECTOR = [
  ".stufe-btn", ".emoji-btn", ".wort-btn",
  ".play-btn", "#btnZurueck", "#btnAbschluss", "a.zurueckBtn"
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

try{ localStorage.setItem("laetitia_return_url_v1", new URL("../../lernen.html", window.location.href).href); }catch(e){}
rebindDwell();

aufbauenStufenAuswahl();
