// milo_mod.js -- Laetitia Lernsystem
// Milo -- Lernbegleiter-Agent (Multi-Agenten-System, zweiter Agent)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen

(function(){
"use strict";

var LISTENER_URL = "http://localhost:9999";
var AGENT_ID     = "ki_agenten/milo";
var verlauf      = [];
var zustand      = "start";
var _dwell       = null;

function $(id){ return document.getElementById(id); }

// ── Avatar (SVG-Gesicht, Eule, 4 Stimmungen) ──────────────────────────────────
var MOOD_AVATAR = {
  neutral:     { browL: "M55,74 Q72,66 90,74",  browR: "M110,74 Q128,66 145,74", mund: "M85,150 Q100,158 115,150", eyeR: 13 },
  schnippisch: { browL: "M53,68 Q72,54 92,70",  browR: "M108,78 Q128,76 147,78", mund: "M88,152 Q102,160 112,148", eyeR: 12 },
  ruhig:       { browL: "M58,80 Q72,76 86,80",  browR: "M114,80 Q128,76 142,80", mund: "M90,150 Q100,154 110,150", eyeR: 8  },
  aufgeregt:   { browL: "M50,64 Q72,48 94,66",  browR: "M106,66 Q128,48 150,64", mund: "M82,148 Q100,142 118,148", eyeR: 16 }
};

function setzeStimmung(stimmung){
  var mood = MOOD_AVATAR[stimmung] ? stimmung : "neutral";
  var m = MOOD_AVATAR[mood];
  var av = $("miloAvatar");
  if(!av) return;
  av.setAttribute("class", "milo-avatar blink stimmung-" + mood);
  var bl = $("mlBraueL"); if(bl) bl.setAttribute("d", m.browL);
  var br = $("mlBraueR"); if(br) br.setAttribute("d", m.browR);
  var mu = $("mlMund");   if(mu) mu.setAttribute("d", m.mund);
  var eL = $("mlAugeL");  if(eL) eL.setAttribute("r", m.eyeR);
  var eR = $("mlAugeR");  if(eR) eR.setAttribute("r", m.eyeR);
}

// ── TTS ──────────────────────────────────────────────────────────────────────
// danach (optional): wird nach TTS-Ende aufgerufen (z.B. Vorschlaege erst dann einblenden)
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "de-DE"; u.rate = 0.92;
        var vv = speechSynthesis.getVoices();
        var v = vv.find(function(x){ return x.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
             || vv.find(function(x){ return x.name === "Microsoft Katja - German (Germany)"; })
             || vv.find(function(x){ return x.name.indexOf("Katja") >= 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de") && x.name.indexOf("Hedda") < 0; })
             || vv.find(function(x){ return x.name.indexOf("Microsoft") >= 0 && x.lang.startsWith("de"); })
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        u.onstart = function(){ var av = $("miloAvatar"); if(av) av.classList.add("spricht"); };
        var stopp = function(){
          var av = $("miloAvatar"); if(av) av.classList.remove("spricht");
          if(danach) danach();
        };
        u.onend = stopp; u.onerror = stopp;
        speechSynthesis.speak(u);
      }catch(e){ if(danach) danach(); }
    }, 120);
  }catch(e){ if(danach) danach(); }
}

// ── Lernkontext (LaetitiaStats -> Grammatik-Werkstatt, Mathe, Lesen) ──────────

// Grammatik-Merksatz zu einer Einheit nachschlagen (aus grammatik_data.js),
// damit Milo bei einer schwachen Aufgabe weiss WORUM es inhaltlich geht,
// nicht nur DASS sie oft falsch beantwortet wird.
function findeGrammatikMerksatz(taskId){
  if(!window.GRAMMATIK_EINHEITEN) return null;
  var einheitId = String(taskId).split("|")[0];
  var einheit = window.GRAMMATIK_EINHEITEN.filter(function(e){ return e.id === einheitId; })[0];
  return einheit ? einheit.erklaerung_merksatz : null;
}

function sammleGrammatikKontext(){
  var schwach = window.LaetitiaStats.schwacheAufgaben("grammatik").slice(0, 5);
  var level   = window.LaetitiaStats.levelEmpfehlungen("grammatik");
  var muster  = window.LaetitiaStats.musterWarnung("grammatik", 10);
  var teile = [];
  if(schwach.length){
    teile.push("Grammatik-Werkstatt -- Aufgaben mit haeufigen Fehlern: " + schwach.map(function(s){
      var merksatz = findeGrammatikMerksatz(s.id);
      return s.id + " (" + s.fehlerRate + "% falsch bei " + s.gesamt + " Versuchen)"
        + (merksatz ? " -- Merksatz dazu: \"" + merksatz + "\"" : "");
    }).join("; "));
  }
  if(level.length){
    teile.push("Grammatik-Werkstatt -- Einheiten, die schon mehrfach fehlerfrei geschafft wurden: " + level.map(function(l){
      return l.stufe + " (" + l.allesRichtig + "x fehlerfrei)";
    }).join(", "));
  }
  if(muster){
    teile.push("Grammatik-Werkstatt -- Hinweis: " + muster.warnung + " (evtl. eher geraten als ueberlegt)");
  }
  return teile;
}

// Mathe-Erklaerung zu einer Aufgaben-ID nachschlagen (aus mathe_data.js/mathe_m0_data.js),
// damit Milo bei einer schwachen Aufgabe weiss WORUM es inhaltlich geht,
// nicht nur DASS sie oft falsch beantwortet wird. Aufgaben-ID-Format identisch
// zu moduleKit.js taskId(): stufe|seite|text|frage.
var _matheErklaerungMap = null;
function matheErklaerungMap(){
  if(_matheErklaerungMap) return _matheErklaerungMap;
  _matheErklaerungMap = {};
  var api = window.LaetitiaDataRegistryApi;
  var tasks = api ? api.get("mathe") : null;
  if(Array.isArray(tasks)){
    tasks.forEach(function(t){
      if(!t.erklaerung) return;
      var id = String(t.stufe || "").trim().toUpperCase()
        + "|" + String(t.seite != null ? t.seite : "").trim()
        + "|" + String(t.text || "").trim()
        + "|" + String(t.frage || "").trim();
      _matheErklaerungMap[id] = t.erklaerung;
    });
  }
  return _matheErklaerungMap;
}

function findeMatheErklaerung(taskId){
  return matheErklaerungMap()[String(taskId)] || null;
}

function sammleMatheKontext(){
  var schwach = window.LaetitiaStats.schwacheAufgaben("mathe").slice(0, 5);
  var level   = window.LaetitiaStats.levelEmpfehlungen("mathe");
  var muster  = window.LaetitiaStats.musterWarnung("mathe", 10);
  var teile = [];
  if(schwach.length){
    teile.push("Mathe -- Aufgaben mit haeufigen Fehlern: " + schwach.map(function(s){
      var erkl = findeMatheErklaerung(s.id);
      return s.id + " (" + s.fehlerRate + "% falsch bei " + s.gesamt + " Versuchen)"
        + (erkl ? " -- Erklaerung dazu: \"" + erkl + "\"" : "");
    }).join("; "));
  }
  if(level.length){
    teile.push("Mathe -- Stufen, die schon mehrfach fehlerfrei geschafft wurden: " + level.map(function(l){
      return l.stufe + " (" + l.allesRichtig + "x fehlerfrei)";
    }).join(", "));
  }
  if(muster){
    teile.push("Mathe -- Hinweis: " + muster.warnung + " (evtl. eher geraten als ueberlegt)");
  }
  return teile;
}

// Lesen trackt noch keine eigenen Erklaerungen -- solange nur die reine
// Fehlerquote zeigen, sobald genug Sessions gesammelt wurden.
function sammleFachKontext(modul, anzeigeName){
  var schwach = window.LaetitiaStats.schwacheAufgaben(modul).slice(0, 3);
  if(!schwach.length) return [];
  return [anzeigeName + " -- Aufgaben mit haeufigen Fehlern: " + schwach.map(function(s){
    return s.id + " (" + s.fehlerRate + "% falsch bei " + s.gesamt + " Versuchen)";
  }).join("; ")];
}

function sammleLernkontext(){
  if(!window.LaetitiaStats) return null;
  try{
    var teile = [];
    teile = teile.concat(sammleGrammatikKontext());
    teile = teile.concat(sammleMatheKontext());
    teile = teile.concat(sammleFachKontext("lesen", "Lesen"));
    if(!teile.length) return null;
    return teile.join("\n");
  }catch(e){ return null; }
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
function rebindDwell(skipRecheck){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var grace   = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = attach(".vorschlag-btn, .nav-btn:not([style*='display:none']), #btnStarten, .tasten-btn, #btnEigeneAntwort, #btnTastaturFertig, #btnTastaturLoeschen", {
    dwellMs: dwellMs, leaveGrace: grace,
    skipHoverRecheck: !!skipRecheck,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── HTTP ──────────────────────────────────────────────────────────────────────
function apiFetch(pfad, daten, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", LISTENER_URL + pfad, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.timeout = 25000;
  xhr.onload = function(){
    try{ cb(null, JSON.parse(xhr.responseText)); }
    catch(e){ cb(null, {}); }
  };
  xhr.onerror = xhr.ontimeout = function(){ cb(new Error("Verbindungsfehler")); };
  xhr.send(JSON.stringify(daten));
}

// ── Screens ───────────────────────────────────────────────────────────────────
function alleVerstecken(){
  ["startScreen","ladenScreen","gespraechContainer","abschlussScreen"].forEach(function(id){
    var el = $(id); if(el) el.style.display = "none";
  });
  var bB = $("btnBeenden"); if(bB) bB.style.display = "none";
  var bE = $("btnEigeneAntwort"); if(bE) bE.style.display = "none";
  schliesseTastatur();
}

function zeigeStart(){
  zustand = "start"; alleVerstecken();
  var el = $("startScreen"); if(el) el.style.display = "";
  rebindDwell();
}

function zeigeLaden(){
  zustand = "laden"; alleVerstecken();
  var el = $("ladenScreen"); if(el) el.style.display = "";
}

function zeigeAbschluss(info){
  zustand = "abschluss"; alleVerstecken();
  var el = $("abschlussScreen"); if(el) el.style.display = "";
  var infoEl = $("abschlussInfo"); if(infoEl) infoEl.textContent = info || "";
  rebindDwell();
}

function zeigeGespraech(antwort, vorschlaege, stimmung, nachAnzeige){
  zustand = "gespraech"; alleVerstecken();

  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";

  setzeStimmung(stimmung);

  var miloEl = $("miloAntwort");
  if(miloEl) miloEl.textContent = antwort;

  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";

  // Zurueck/Beenden sofort per Dwell erreichbar, waehrend Milo noch spricht --
  // Vorschlaege + "Eigene Antwort" werden erst NACH TTS-Ende sichtbar (siehe unten),
  // damit kein Blick auf den entstehenden Text versehentlich einen Klick ausloest.
  rebindDwell(true);

  sprich(antwort, function(){
    if(grid){
      var liste = (Array.isArray(vorschlaege) && vorschlaege.length > 0)
        ? vorschlaege.slice(0, 4)
        : ["Ja", "Nein", "Erzähl mehr", "Okay"];
      liste.forEach(function(v){
        var btn = document.createElement("button");
        btn.className = "vorschlag-btn";
        btn.innerHTML = "<span style='pointer-events:none'>" + v + "</span>"
          + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
          + "<circle cx='35' cy='35' r='30' style='stroke:#0d9488'/></svg>";
        btn.addEventListener("click", function(){ sendeNachricht(v); });
        grid.appendChild(btn);
      });
    }
    var bE = $("btnEigeneAntwort");
    if(bE) bE.style.display = "";
    rebindDwell(true);
    if(typeof nachAnzeige === "function") nachAnzeige();
  });
}

// ── Konversation ──────────────────────────────────────────────────────────────
function sendeNachricht(text){
  zeigeLaden();
  var daten = { agent: AGENT_ID, nachricht: text, verlauf: verlauf };
  if(verlauf.length === 0){
    var kontext = sammleLernkontext();
    if(kontext) daten.kontext = kontext;
  }
  apiFetch("/chat", daten, function(err, data){
    if(err || data.fehler){
      zeigeGespraech(
        "Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal.",
        ["Nochmal versuchen", "Okay"],
        null,
        function(){
          var grid = $("vorschlaegeGrid");
          if(grid && grid.firstChild){
            grid.firstChild.addEventListener("click", function(){ sendeNachricht(text); }, { once: true });
          }
        }
      );
      return;
    }
    verlauf.push({ rolle: "user",      text: text });
    verlauf.push({ rolle: "assistant", text: data.antwort });
    zeigeGespraech(data.antwort, data.vorschlaege, data.stimmung);
  });
}

function beendeGespraech(){
  zeigeAbschluss("Zusammenfassung wird gespeichert...");
  sprich("Bis bald!");
  var daten = { agent: AGENT_ID, verlauf: verlauf };
  if(window.LaetitiaLernfortschritt){
    var lf = window.LaetitiaLernfortschritt.kurzZusammenfassung();
    if(lf) daten.lernfortschritt = lf;
  }
  apiFetch("/chat/abschliessen", daten, function(){
    zeigeAbschluss("Gespräch gespeichert. Bis bald!");
  });
}

// ── Eigene Antwort (Bildschirmtastatur) ─────────────────────────────────────────
var TASTEN_REIHEN = [
  ["Q","W","E","R","T","Z","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","Ö","Ä"],
  ["Y","X","C","V","B","N","M","Ü","ß"]
];
var tastaturText = "";

function baueTastatur(){
  var el = $("tastaturTasten");
  if(!el) return;
  el.innerHTML = "";
  TASTEN_REIHEN.forEach(function(reihe){
    reihe.forEach(function(taste){
      var btn = document.createElement("button");
      btn.className = "tasten-btn";
      btn.textContent = taste;
      btn.addEventListener("click", function(){
        tastaturText += taste.toLowerCase();
        aktualisiereTastaturAnzeige();
      });
      el.appendChild(btn);
    });
  });
  var leer = document.createElement("button");
  leer.className = "tasten-btn";
  leer.style.gridColumn = "1 / -1";
  leer.textContent = "Leerzeichen";
  leer.addEventListener("click", function(){
    tastaturText += " ";
    aktualisiereTastaturAnzeige();
  });
  el.appendChild(leer);
}

function aktualisiereTastaturAnzeige(){
  var el = $("tastaturAnzeige");
  if(el) el.textContent = tastaturText || "…";
}

function oeffneTastatur(){
  tastaturText = "";
  aktualisiereTastaturAnzeige();
  var el = $("tastaturOverlay"); if(el) el.style.display = "flex";
  rebindDwell(true);
}

function schliesseTastatur(){
  var el = $("tastaturOverlay");
  if(el) el.style.display = "none";
}

function tastaturLoeschen(){
  tastaturText = tastaturText.slice(0, -1);
  aktualisiereTastaturAnzeige();
}

function tastaturBestaetigen(){
  var text = tastaturText.trim();
  schliesseTastatur();
  if(text){ sendeNachricht(text); }
  else { rebindDwell(true); }
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "gespraech" || zustand === "laden"){
    beendeGespraech(); return;
  }
  try{
    window.location.href = new URL("../ki_agenten.html", window.location.href).href;
  }catch(e){ history.back(); }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init(){
  var bS = $("btnStarten");
  if(bS) bS.addEventListener("click", function(){
    sendeNachricht("Hallo Milo!");
  });

  var bZ = $("btnZurueck");
  if(bZ) bZ.addEventListener("click", zurueck);

  var bB = $("btnBeenden");
  if(bB) bB.addEventListener("click", beendeGespraech);

  var bEA = $("btnEigeneAntwort");
  if(bEA) bEA.addEventListener("click", oeffneTastatur);

  var bTL = $("btnTastaturLoeschen");
  if(bTL) bTL.addEventListener("click", tastaturLoeschen);

  var bTF = $("btnTastaturFertig");
  if(bTF) bTF.addEventListener("click", tastaturBestaetigen);
  baueTastatur();

  zeigeStart();
}

window.MiloMod = { init: init };
})();
