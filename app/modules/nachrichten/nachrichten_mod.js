// nachrichten_mod.js -- Laetitia Lernsystem
// Nachrichten-Modul: empfaengt Telegram-Nachrichten ueber lokale Bridge-API
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var BRIDGE_URL  = "http://127.0.0.1:3737";
var POLL_MS     = 30000;   // Inbox alle 30s aktualisieren

// Zustand
var zustand       = "laden";  // laden|offline|liste|nachricht|antwort|bestaetigung
var nachrichten   = [];
var aktNachricht  = null;
var antwortSeite  = 0;
var antwortOptionen = [];
var pollTimer     = null;
var _dwell        = null;

function $(id){ return document.getElementById(id); }

// ── TTS ──────────────────────────────────────────────────────────────────────
function sprich(text){
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
             || vv.find(function(x){ return x.lang.startsWith("de"); });
        if(v) u.voice = v;
        speechSynthesis.speak(u);
      }catch(e){}
    }, 120);
  }catch(e){}
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
function rebindDwell(){
  if(_dwell && typeof _dwell.cancelDwell === "function") _dwell.cancelDwell();
  var attach = (typeof window.LaetitiaAttachDwell === "function")
    ? window.LaetitiaAttachDwell
    : function(){ return { cancelDwell: function(){} }; };
  var dwellMs  = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var graceMs  = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  _dwell = attach(".nachricht-item, .antwort-btn, .nav-btn:not([style*='display:none'])", {
    dwellMs: dwellMs, leaveGrace: graceMs,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      try{ el.click(); }catch(e){}
    }
  });
}

// ── Bridge-HTTP-Anfragen ──────────────────────────────────────────────────────
function apiFetch(methode, pfad, daten, cb){
  var xhr = new XMLHttpRequest();
  xhr.open(methode, BRIDGE_URL + pfad, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.timeout = 6000;
  xhr.onload = function(){
    try{ cb(null, JSON.parse(xhr.responseText)); }
    catch(e){ cb(null, {}); }
  };
  xhr.onerror = xhr.ontimeout = function(){ cb(new Error("Verbindungsfehler")); };
  xhr.send(daten ? JSON.stringify(daten) : null);
}

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────
function alleVerstecken(){
  ["ladenScreen","offlineScreen","listeContainer",
   "nachrichtContainer","antwortContainer","bestaetigungContainer"].forEach(function(id){
    var el = $(id); if(el) el.style.display = "none";
  });
  var bA = $("btnAntwort"); if(bA) bA.style.display = "none";
  var bS = $("btnSeite");   if(bS) bS.style.display = "none";
}

function zeitLabel(ts){
  var d = new Date(ts);
  var jetzt = new Date();
  var gleichTag = d.toDateString() === jetzt.toDateString();
  if(gleichTag){
    return d.getHours().toString().padStart(2,"0") + ":" +
           d.getMinutes().toString().padStart(2,"0");
  }
  return d.getDate() + "." + (d.getMonth()+1) + ". " +
         d.getHours().toString().padStart(2,"0") + ":" +
         d.getMinutes().toString().padStart(2,"0");
}

function typEmoji(typ){
  return { foto:"📷", video:"🎥", voice:"🎤", text:"💬" }[typ] || "💬";
}

function vorschauText(n){
  if(n.typ === "foto")  return n.text ? n.text : "(Foto)";
  if(n.typ === "video") return n.text ? n.text : "(Video)";
  if(n.typ === "voice") return "(Sprachnachricht)";
  return n.text || "";
}

function anzahlUngelesen(){
  return nachrichten.filter(function(n){ return !n.gelesen; }).length;
}

function aktualisiereKopf(){
  var anz = anzahlUngelesen();
  var badge = $("neuBadge");
  if(!badge) return;
  if(anz > 0){
    badge.textContent = anz + " neu";
    badge.style.display = "";
  } else {
    badge.style.display = "none";
  }
}

// ── Screens ───────────────────────────────────────────────────────────────────
function zeigeLaden(){
  zustand = "laden";
  alleVerstecken();
  var el = $("ladenScreen"); if(el) el.style.display = "";
  rebindDwell();
}

function zeigeOffline(){
  zustand = "offline";
  alleVerstecken();
  var el = $("offlineScreen"); if(el) el.style.display = "";
  rebindDwell();
}

function zeigeListe(){
  zustand = "liste";
  aktNachricht = null;
  alleVerstecken();

  var container = $("listeContainer");
  if(!container) return;
  container.style.display = "";
  container.innerHTML = "";

  if(nachrichten.length === 0){
    var leer = document.createElement("div");
    leer.className = "status-screen";
    leer.innerHTML = "<div class='status-emoji'>📭</div><div class='status-text'>Keine Nachrichten</div>";
    container.appendChild(leer);
    rebindDwell();
    return;
  }

  var sichtbar = Math.min(nachrichten.length, 5);
  for(var i = 0; i < sichtbar; i++){
    var n = nachrichten[i];
    (function(nn){
      var btn = document.createElement("button");
      btn.className = "nachricht-item" + (nn.gelesen ? "" : " ungelesen");
      btn.innerHTML =
        "<div class='ni-dot" + (nn.gelesen ? " gelesen" : "") + "'></div>" +
        "<div class='ni-typ'>" + typEmoji(nn.typ) + "</div>" +
        "<div class='ni-rechts'>" +
          "<div class='ni-kopf'>" +
            "<div class='ni-von'>" + nn.von + "</div>" +
            "<div class='ni-ts'>" + zeitLabel(nn.ts) + "</div>" +
          "</div>" +
          "<div class='ni-vorschau'>" + (vorschauText(nn).slice(0, 60) || "") + "</div>" +
        "</div>" +
        "<svg class='dwell-ring-svg' viewBox='0 0 70 70'><circle cx='35' cy='35' r='30' style='stroke:#8b5cf6'/></svg>";
      btn.addEventListener("click", function(){ zeigeNachricht(nn); });
      container.appendChild(btn);
    }(n));
  }

  aktualisiereKopf();
  rebindDwell();
}

function zeigeNachricht(n){
  zustand = "nachricht";
  aktNachricht = n;
  alleVerstecken();

  var nc = $("nachrichtContainer"); if(nc) nc.style.display = "";
  var bA = $("btnAntwort");        if(bA) bA.style.display = "";

  var vonEl = $("nachrichtVon");
  if(vonEl) vonEl.textContent = n.von;
  var tsEl = $("nachrichtTs");
  if(tsEl) tsEl.textContent = zeitLabel(n.ts);

  var mediaEl = $("nachrichtMedia");
  var textEl  = $("nachrichtText");
  if(mediaEl) mediaEl.style.display = "none";
  if(textEl)  textEl.style.display  = "none";
  if(mediaEl) mediaEl.innerHTML = "";

  if(n.typ === "foto" && n.mediaPfad){
    var img = document.createElement("img");
    img.src = BRIDGE_URL + "/" + n.mediaPfad;
    img.alt = n.text || "Foto";
    if(mediaEl){ mediaEl.appendChild(img); mediaEl.style.display = ""; }
  } else if(n.typ === "video" && n.mediaPfad){
    var vid = document.createElement("video");
    vid.src = BRIDGE_URL + "/" + n.mediaPfad;
    vid.controls = true; vid.autoplay = false;
    if(mediaEl){ mediaEl.appendChild(vid); mediaEl.style.display = ""; }
  } else if(n.typ === "voice" && n.mediaPfad){
    var aud = document.createElement("audio");
    aud.src = BRIDGE_URL + "/" + n.mediaPfad;
    aud.controls = true;
    if(mediaEl){ mediaEl.appendChild(aud); mediaEl.style.display = ""; }
  }

  if(n.text && textEl){
    textEl.textContent = n.text;
    textEl.style.display = "";
  }

  sprich(n.von + " schreibt: " + (n.text || typEmoji(n.typ)));

  if(!n.gelesen){
    apiFetch("POST", "/gelesen/" + n.id, null, function(){});
    n.gelesen = true;
    aktualisiereKopf();
  }

  rebindDwell();
}

function zeigeAntwort(){
  zustand = "antwort";
  antwortSeite = 0;
  alleVerstecken();

  var ac = $("antwortContainer"); if(ac) ac.style.display = "";
  var bS = $("btnSeite");
  if(bS && antwortOptionen.length > 4){
    bS.style.display = "";
  }

  baueAntwortGrid();
  rebindDwell();
}

function baueAntwortGrid(){
  var grid = $("antwortGrid");
  if(!grid) return;
  grid.innerHTML = "";

  var start = antwortSeite * 4;
  var seiteOptionen = antwortOptionen.slice(start, start + 4);

  seiteOptionen.forEach(function(opt){
    var btn = document.createElement("button");
    btn.className = "antwort-btn";
    btn.innerHTML =
      "<div class='ab-emoji'>" + opt.emoji + "</div>" +
      "<div class='ab-text'>" + opt.text + "</div>" +
      "<svg class='dwell-ring-svg' viewBox='0 0 70 70'><circle cx='35' cy='35' r='30' style='stroke:#8b5cf6'/></svg>";
    btn.addEventListener("click", function(){ sendeAntwort(opt.text); });
    grid.appendChild(btn);
  });

  rebindDwell();
}

function naechsteAntwortSeite(){
  var maxSeiten = Math.ceil(antwortOptionen.length / 4);
  antwortSeite = (antwortSeite + 1) % maxSeiten;
  baueAntwortGrid();
}

function sendeAntwort(text){
  if(!aktNachricht) return;
  var daten = {
    text:      text,
    replyToId: aktNachricht.id,
    chatId:    aktNachricht.chatId
  };
  sprich("Ich sende: " + text);
  apiFetch("POST", "/antwort", daten, function(err){
    if(err){
      sprich("Senden fehlgeschlagen.");
    } else {
      zeigeBestaetigung(text);
    }
  });
}

function zeigeBestaetigung(text){
  zustand = "bestaetigung";
  alleVerstecken();
  var bc = $("bestaetigungContainer"); if(bc) bc.style.display = "";
  var bt = $("bestaetigungText");
  if(bt) bt.textContent = "Gesendet: " + text;
  sprich("Gesendet!");
  setTimeout(function(){
    if(zustand === "bestaetigung") zeigeListe();
  }, 3000);
  rebindDwell();
}

// ── Inbox laden ───────────────────────────────────────────────────────────────
function ladeInbox(){
  apiFetch("GET", "/inbox", null, function(err, daten){
    if(err){
      if(zustand === "laden" || zustand === "liste") zeigeOffline();
      return;
    }
    nachrichten = Array.isArray(daten) ? daten : [];
    if(zustand === "laden" || zustand === "offline" || zustand === "liste"){
      zeigeListe();
    } else {
      aktualisiereKopf();
    }
  });
}

function ladeOptionen(){
  apiFetch("GET", "/optionen", null, function(err, daten){
    if(!err && Array.isArray(daten) && daten.length > 0){
      antwortOptionen = daten;
    } else {
      antwortOptionen = [
        { emoji:"❤️", text:"Ich liebe dich!" },
        { emoji:"😊", text:"Das freut mich!" },
        { emoji:"👍", text:"Ja, gerne!" },
        { emoji:"😢", text:"Das ist schade." },
        { emoji:"🎉", text:"Super!" },
        { emoji:"🤗", text:"Ich vermisse dich!" },
        { emoji:"😂", text:"Das ist lustig!" },
        { emoji:"🙋", text:"Ich auch!" }
      ];
    }
  });
}

function startePoll(){
  if(pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(function(){
    if(zustand !== "nachricht" && zustand !== "antwort" && zustand !== "bestaetigung"){
      ladeInbox();
    }
  }, POLL_MS);
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function zurueck(){
  if(zustand === "antwort")      { zeigeNachricht(aktNachricht); return; }
  if(zustand === "nachricht")    { zeigeListe(); return; }
  if(zustand === "bestaetigung") { zeigeListe(); return; }
  // liste oder offline: zurueck zur spielewelt
  try{
    window.location.href = new URL("../../spielewelt.html", window.location.href).href;
  }catch(e){ history.back(); }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init(){
  var bZ = $("btnZurueck");
  if(bZ) bZ.addEventListener("click", function(e){ e.preventDefault(); zurueck(); });

  var bA = $("btnAntwort");
  if(bA) bA.addEventListener("click", function(){ if(aktNachricht) zeigeAntwort(); });

  var bS = $("btnSeite");
  if(bS) bS.addEventListener("click", naechsteAntwortSeite);

  zeigeLaden();
  ladeOptionen();
  ladeInbox();
  startePoll();
}

window.NachrichtenMod = { init: init };
})();
