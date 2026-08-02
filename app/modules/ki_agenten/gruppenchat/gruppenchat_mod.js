// gruppenchat_mod.js -- Laetitia Lernsystem
// Gruppenchat -- ein Gespraech, mehrere Stimmen (Nova/Fabu/Milo).
// Themenbasiertes Routing entscheidet je Nachricht, welcher Charakter
// antwortet -- KEIN eigenstaendiges Handeln der Charaktere (kein Tool-Use,
// keine Aktionen in der App), nur Text-Antworten wie in den einzelnen
// Agenten-Chats. Motor ist eine Verallgemeinerung von milo_mod.js.
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen

(function(){
"use strict";

var LISTENER_URL = "http://localhost:9999";
var verlauf       = []; // { rolle:"user"|"assistant", text, agentId }
var zustand       = "start";
var aktAgentId    = null;   // wer zuletzt gesprochen hat
var miloAngesprochen = false; // Lernkontext nur beim ersten Milo-Turn mitschicken
var _dwell        = null;

function $(id){ return document.getElementById(id); }

// ── Agenten-Steckbrief (Name/Emoji/Farbe/Listener-Pfad) ──────────────────────
var AGENTEN = {
  nova: { name:"Nova", emoji:"✨", farbe:"#8b5cf6", bg:"#ede9fe", agentPfad:"ki_gespraech" },
  fabu: { name:"Fabu", emoji:"🦊", farbe:"#d97706", bg:"#fef3c7", agentPfad:"ki_agenten/fabu" },
  milo: { name:"Milo", emoji:"🦉", farbe:"#0d9488", bg:"#ccfbf1", agentPfad:"ki_agenten/milo" }
};
var STIMMUNG_EMOJI = { neutral:"😊", schnippisch:"😏", ruhig:"😌", aufgeregt:"🤩" };

// ── Themenbasiertes Routing ───────────────────────────────────────────────────
// Bewusst einfache Stichwort-Heuristik (kein Modell-Aufruf zur Auswahl noetig) --
// passend zur Charakterrolle aus registry.js: Fabu=Geschichtenerzaehler,
// Milo=Lernbegleiter, Nova=allgemeine Gespraeche/Standard.
var FABU_WOERTER = ["geschichte","erzähl","erzahl","märchen","marchen","gedicht","reim","vorlesen","fabel","sage","abenteuer"];
var MILO_WOERTER = ["lernen","übung","ubung","aufgabe","hausaufgabe","mathe","logik","grammatik","üben","uben","erklär","erklar","hilfe bei","verstehe nicht","schwierig","note","test","prüfung","prufung"];

function waehleAgent(text){
  var t = (text || "").toLowerCase();
  if(FABU_WOERTER.some(function(w){ return t.indexOf(w) >= 0; })) return "fabu";
  if(MILO_WOERTER.some(function(w){ return t.indexOf(w) >= 0; })) return "milo";
  return "nova";
}

// ── TTS ──────────────────────────────────────────────────────────────────────
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
        var stopp = function(){ if(danach) danach(); };
        u.onend = stopp; u.onerror = stopp;
        speechSynthesis.speak(u);
      }catch(e){ if(danach) danach(); }
    }, 120);
  }catch(e){ if(danach) danach(); }
}

// ── Lernkontext (nur fuer Milo -- 1:1 aus milo_mod.js uebernommen) ───────────
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

function erklaerungMapAusRegistry(dataKey){
  var map = {};
  var api = window.LaetitiaDataRegistryApi;
  var tasks = api ? api.get(dataKey) : null;
  if(Array.isArray(tasks)){
    tasks.forEach(function(t){
      if(!t.erklaerung) return;
      var id = String(t.stufe || "").trim().toUpperCase()
        + "|" + String(t.seite != null ? t.seite : "").trim()
        + "|" + String(t.text || "").trim()
        + "|" + String(t.frage || "").trim();
      map[id] = t.erklaerung;
    });
  }
  return map;
}

function sammleFachKontextMitErklaerung(modul, anzeigeName, erklaerungMap){
  var schwach = window.LaetitiaStats.schwacheAufgaben(modul).slice(0, 5);
  var level   = window.LaetitiaStats.levelEmpfehlungen(modul);
  var muster  = window.LaetitiaStats.musterWarnung(modul, 10);
  var teile = [];
  if(schwach.length){
    teile.push(anzeigeName + " -- Aufgaben mit haeufigen Fehlern: " + schwach.map(function(s){
      var erkl = erklaerungMap[s.id];
      return s.id + " (" + s.fehlerRate + "% falsch bei " + s.gesamt + " Versuchen)"
        + (erkl ? " -- Erklaerung dazu: \"" + erkl + "\"" : "");
    }).join("; "));
  }
  if(level.length){
    teile.push(anzeigeName + " -- Stufen, die schon mehrfach fehlerfrei geschafft wurden: " + level.map(function(l){
      return l.stufe + " (" + l.allesRichtig + "x fehlerfrei)";
    }).join(", "));
  }
  if(muster){
    teile.push(anzeigeName + " -- Hinweis: " + muster.warnung + " (evtl. eher geraten als ueberlegt)");
  }
  return teile;
}

function schuleMatheErklaerungMap(){
  var map = {};
  var api = window.LaetitiaDataRegistryApi;
  var alle = (api ? api.get("schule_mathe") : null) || window.LaetitiaSchuleMatheAufgaben || [];
  var indexProStufe = {};
  alle.forEach(function(t){
    var stufe = String(t.stufe || "");
    var idx = indexProStufe[stufe] || 0;
    indexProStufe[stufe] = idx + 1;
    if(!t.erklaerung) return;
    var id = stufe + "|" + idx + "|" + (t.text || "");
    map[id] = t.erklaerung;
  });
  return map;
}

function reimErklaerungMap(){
  var map = {};
  var einheiten = window.REIM_EINHEITEN || [];
  einheiten.forEach(function(einheit){
    (einheit.aufgaben || []).forEach(function(a, idx){
      if(!a.erklaerung) return;
      var schluessel = a.wort || a.zeile_bekannt || (a.wort1 + "-" + a.wort2);
      map[einheit.id + "|" + idx + "|" + schluessel] = a.erklaerung;
    });
  });
  return map;
}

function sammleLernkontext(){
  if(!window.LaetitiaStats) return null;
  try{
    var teile = [];
    teile = teile.concat(sammleGrammatikKontext());
    teile = teile.concat(sammleFachKontextMitErklaerung("mathe", "Mathe", erklaerungMapAusRegistry("mathe")));
    teile = teile.concat(sammleFachKontextMitErklaerung("logik", "Logik", erklaerungMapAusRegistry("logik")));
    teile = teile.concat(sammleFachKontextMitErklaerung("schule_mathe", "Schulheft (Nase vorn! Rechnen bis 20)", schuleMatheErklaerungMap()));
    teile = teile.concat(sammleFachKontextMitErklaerung("deutsch", "Deutsch", erklaerungMapAusRegistry("deutsch")));
    teile = teile.concat(sammleFachKontextMitErklaerung("sinnesorgane", "Sinnesorgane", erklaerungMapAusRegistry("sinnesorgane")));
    teile = teile.concat(sammleFachKontextMitErklaerung("reim", "Reime-Werkstatt", reimErklaerungMap()));
    var lesenSchwach = window.LaetitiaStats.schwacheAufgaben("lesen").slice(0, 3);
    if(lesenSchwach.length){
      teile.push("Lesen -- Aufgaben mit haeufigen Fehlern: " + lesenSchwach.map(function(s){
        return s.id + " (" + s.fehlerRate + "% falsch bei " + s.gesamt + " Versuchen)";
      }).join("; "));
    }
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

function zeigeLaden(agentId){
  zustand = "laden"; alleVerstecken();
  var el = $("ladenScreen"); if(el) el.style.display = "";
  var a = AGENTEN[agentId] || AGENTEN.nova;
  var lt = $("ladenText"); if(lt) lt.textContent = a.emoji + " " + a.name + " denkt nach…";
}

function zeigeAbschluss(info){
  zustand = "abschluss"; alleVerstecken();
  var el = $("abschlussScreen"); if(el) el.style.display = "";
  var infoEl = $("abschlussInfo"); if(infoEl) infoEl.textContent = info || "";
  rebindDwell();
}

function zeigeGespraech(agentId, antwort, vorschlaege, stimmung, nachAnzeige){
  zustand = "gespraech"; alleVerstecken();
  var a = AGENTEN[agentId] || AGENTEN.nova;

  var gc = $("gespraechContainer"); if(gc) gc.style.display = "";
  var bB = $("btnBeenden");         if(bB) bB.style.display = "";

  var badge = $("sprecherBadge");
  if(badge){ badge.style.borderColor = a.farbe; badge.style.background = a.bg; }
  var se = $("sprecherEmoji"); if(se) se.textContent = a.emoji;
  var sn = $("sprecherName");  if(sn){ sn.textContent = a.name; sn.style.color = a.farbe; }
  var ss = $("sprecherStimmung"); if(ss) ss.textContent = STIMMUNG_EMOJI[stimmung] || "";

  var liste = (Array.isArray(vorschlaege) && vorschlaege.length > 0)
    ? vorschlaege.slice(0, 4)
    : ["Ja", "Nein", "Erzähl mehr", "Okay"];

  var antwortEl = $("chatAntwort");
  if(antwortEl){
    // Regel 20: Antwortvorschlaege zuerst im passiven Lesebereich zeigen
    // (hier bereits pointer-events:none), getrennt von den Dwell-Buttons
    // unten -- sonst loest schon das Lesen/Vergleichen eine Auswahl aus.
    var html = antwort + "<div class=\"vorschlaege-lese\">" +
      liste.map(function(v){
        return "<div class=\"vorschlag-lese-eintrag\" style=\"border-color:" + a.farbe + ";background:" + a.bg + ";color:" + a.farbe + "\">" + v + "</div>";
      }).join("") +
    "</div>";
    antwortEl.innerHTML = html;
  }

  var grid = $("vorschlaegeGrid");
  if(grid) grid.innerHTML = "";

  // Zurueck/Beenden sofort per Dwell erreichbar, waehrend gesprochen wird --
  // Vorschlaege + "Eigene Antwort" werden erst NACH TTS-Ende sichtbar (Regel 18).
  rebindDwell(true);

  sprich(antwort, function(){
    if(grid){
      liste.forEach(function(v){
        var btn = document.createElement("button");
        btn.className = "vorschlag-btn";
        btn.style.borderColor = a.farbe; btn.style.background = a.bg; btn.style.color = a.farbe;
        btn.innerHTML = "<span style='pointer-events:none'>" + v + "</span>"
          + "<svg class='dwell-ring-svg' viewBox='0 0 70 70'>"
          + "<circle cx='35' cy='35' r='30' style='stroke:" + a.farbe + "'/></svg>";
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
// Baut den an listener.ps1 gesendeten Verlauf: fruehere Antworten bekommen
// einen Namens-Praefix ("[Fabu] ..."), damit der jeweils antwortende
// Charakter versteht, dass vorherige Beitraege evtl. von einem anderen
// Charakter stammen -- ohne dass listener.ps1 selbst etwas ueber mehrere
// Sprecher wissen muss (bleibt bei role user/assistant, wie gehabt).
function baueApiVerlauf(){
  return verlauf.map(function(eintrag){
    if(eintrag.rolle === "assistant"){
      var a = AGENTEN[eintrag.agentId] || AGENTEN.nova;
      return { rolle: "assistant", text: "[" + a.name + "] " + eintrag.text };
    }
    return { rolle: "user", text: eintrag.text };
  });
}

function sendeNachricht(text, erzwingeAgent){
  var zielAgent = erzwingeAgent || waehleAgent(text);
  zeigeLaden(zielAgent);

  var daten = { agent: AGENTEN[zielAgent].agentPfad, nachricht: text, verlauf: baueApiVerlauf() };
  if(zielAgent === "milo" && !miloAngesprochen){
    var kontext = sammleLernkontext();
    if(kontext) daten.kontext = kontext;
  }

  apiFetch("/chat", daten, function(err, data){
    if(err || data.fehler){
      zeigeGespraech(
        zielAgent,
        "Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal.",
        ["Nochmal versuchen", "Okay"],
        null,
        function(){
          var grid = $("vorschlaegeGrid");
          if(grid && grid.firstChild){
            grid.firstChild.addEventListener("click", function(){ sendeNachricht(text, zielAgent); }, { once: true });
          }
        }
      );
      return;
    }
    if(zielAgent === "milo") miloAngesprochen = true;
    verlauf.push({ rolle: "user",      text: text,        agentId: zielAgent });
    verlauf.push({ rolle: "assistant", text: data.antwort, agentId: zielAgent });
    aktAgentId = zielAgent;
    zeigeGespraech(zielAgent, data.antwort, data.vorschlaege, data.stimmung);
  });
}

function beendeGespraech(){
  zeigeAbschluss("Zusammenfassung wird gespeichert...");
  sprich("Bis bald!");
  var abschlussAgent = aktAgentId || "nova";
  var daten = { agent: AGENTEN[abschlussAgent].agentPfad, verlauf: baueApiVerlauf() };
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
  // Eroeffnung immer per Nova (allgemeine Gespraechspartnerin, Standard-Stimme
  // beim Betreten des Gruppenchats) -- Fabu/Milo kommen erst themenbasiert dazu.
  if(bS) bS.addEventListener("click", function(){
    sendeNachricht("Hallo!", "nova");
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

window.GruppenchatMod = { init: init, waehleAgent: waehleAgent };
})();
