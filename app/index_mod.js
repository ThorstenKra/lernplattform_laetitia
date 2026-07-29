// index_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
// Hinweis: bewusst NICHT IIFE-gewrapt -- audioWaehlen() muss global bleiben,
// da die Audio-Dialog-Buttons in index.html per onclick-Attribut darauf zugreifen.

var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
if(!localStorage.getItem("laetitia_welcome_spoken")){
  window.addEventListener("load", function(){
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance("Hallo Lätitzia! Was möchten wir heute machen?");
        u.lang = "de-DE"; u.rate = 0.92;
        var vv = speechSynthesis.getVoices();
        var de = vv.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
              || vv.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
              || vv.find(function(v){ return v.name.indexOf("Katja") >= 0; })
              || vv.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
              || vv.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
              || vv.find(function(v){ return v.lang.startsWith("de"); });
        if(de) u.voice = de;
        if(window.LaetitiaSprich){ window.LaetitiaSprich.wrap(u, null); } else { speechSynthesis.speak(u); }
        localStorage.setItem("laetitia_welcome_spoken","1");
      }catch(e){}
    },500);
  });
}
try{ localStorage.setItem("laetitia_return_url_v1","./index.html"); }catch(e){}
// Dwell-Zeit vorbelegen falls noch nie gesetzt (erstes Starten)
if(!localStorage.getItem("laetitia_dwell_ms")){
  localStorage.setItem("laetitia_dwell_ms", "2000");
}
if(!localStorage.getItem("laetitia_leave_grace_ms")){
  localStorage.setItem("laetitia_leave_grace_ms", "150");
}
var cfg = (function(){ try{ return JSON.parse(localStorage.getItem("laetitia_config_v1")||"{}"); }catch(e){ return {}; } })();
var delaySeconds = Number.isFinite(parseInt(cfg.delay)) ? parseInt(cfg.delay) : 4;
var delayEnabled = (cfg.togDelay !== false);
var DELAY_MS = Math.max(0, delaySeconds) * 1000;
var grid = document.getElementById("kategorieGrid");
var statusEl = document.getElementById("statustext");
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 2000;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
function setEnabled(enabled){
  grid.querySelectorAll("a.katBtn").forEach(function(a){
    if(enabled){ a.classList.remove("is-disabled"); } else { a.classList.add("is-disabled"); }
  });
}
function bindDwell(){
  attachDwell("a.katBtn:not(.is-disabled)", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled")==="true") return;
      if(el.classList.contains("is-disabled")) return;
      try{ el.click(); }catch(e){}
    }
  });
}
bindDwell(); // Keine Startverzoegerung auf der Startseite

// ── Schulmodus ───────────────────────────────────────────────────────────────
(function(){
  var sp = window.LaetitiaSchulprofil;
  if(!sp || !sp.istSchulzeit()) return;

  // Schulmodus aktiv — gesperrte Module ausgrauen + Dwell deaktivieren
  var gesperrt = sp.SCHULMODUS_GESPERRT || [];
  gesperrt.forEach(function(klasse){
    var btn = document.querySelector("a.katBtn." + klasse);
    if(!btn) return;
    btn.classList.add("schul-gesperrt");
    // Dwell komplett blockieren
    btn.addEventListener("pointerenter", function(e){ e.stopImmediatePropagation(); }, true);
    btn.addEventListener("mouseenter",   function(e){ e.stopImmediatePropagation(); }, true);
    btn.addEventListener("click",        function(e){ e.preventDefault(); e.stopImmediatePropagation(); }, true);
  });

  // TTS-Hinweis beim ersten Aufrufen im Schulmodus
  var schluessel = "laetitia_schulmodus_hinweis_" + (new Date().toISOString().slice(0,10));
  if(!localStorage.getItem(schluessel)){
    localStorage.setItem(schluessel, "1");
    setTimeout(function(){
      try{
        var u = new SpeechSynthesisUtterance("Schulmodus aktiv. Einige Bereiche sind heute Nachmittag verfuegbar.");
        var voices = speechSynthesis.getVoices();
        var de = (voices||[]).find(function(v){ return (v.lang||"").toLowerCase().startsWith("de"); });
        if(de) u.voice = de;
        speechSynthesis.speak(u);
      }catch(e){}
    }, 1500);
  }
})();

// Quasselkiste-Button: Signal an lokalen Mini-Server senden
// lernwelt_starten.exe hat einen HTTP-Listener auf localhost:9999 gestartet.
// Sobald der Listener eine Anfrage empfängt → Edge beenden → NuVoice starten.
// Quasselkiste-Button: Audio zurueck auf intern + Signal an listener
document.getElementById("btnQuassel").addEventListener("click", function(e){
  e.preventDefault();
  if(window.LaetitiaGeraete) window.LaetitiaGeraete.internZurueck();
  setTimeout(function(){
    fetch("http://localhost:9999/zurueck", { mode: "no-cors" })
      .catch(function(){});
  }, 300);
});

// ── Audio-Dialog ─────────────────────────────────────────────────────────────
function audioDialogZeigen(){
  var dlg = document.getElementById("audioDialog");
  if(dlg) dlg.style.display = "flex";
  // Dwell auf die zwei Buttons
  var att = window.LaetitiaAttachDwell || function(){};
  att(".audio-btn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
  });
}

function audioWaehlen(geraet){
  var hinweis = document.getElementById("audioHinweis");
  var dlg     = document.getElementById("audioDialog");
  if(!window.LaetitiaGeraete){ if(dlg) dlg.style.display="none"; return; }
  if(geraet === "intern"){
    window.LaetitiaGeraete.audioUmschalten("intern", function(){});
    if(dlg) dlg.style.display = "none";
    return;
  }
  // JBL: erst pruefen ob verfuegbar
  hinweis.style.display = "block";
  hinweis.textContent = "Verbinde mit JBL Clip 5...";
  window.LaetitiaGeraete.jblPruefen(function(verfuegbar){
    if(!verfuegbar){
      hinweis.style.display = "block";
      hinweis.textContent = "JBL Clip 5 nicht gefunden. Starte mit Geraet-Lautsprecher.";
      window.LaetitiaGeraete.audioUmschalten("intern", function(){});
      setTimeout(function(){ if(dlg) dlg.style.display="none"; }, 2500);
      return;
    }
    window.LaetitiaGeraete.audioUmschalten("jbl", function(ok, fehler){
      if(ok){
        hinweis.style.display = "none";
        if(dlg) dlg.style.display = "none";
      } else {
        hinweis.textContent = "Umschaltung fehlgeschlagen: " + (fehler||"unbekannt") + ". Starte mit Geraet-Lautsprecher.";
        window.LaetitiaGeraete.audioUmschalten("intern", function(){});
        setTimeout(function(){ if(dlg) dlg.style.display="none"; }, 2500);
      }
    });
  });
}

// Dialog nur anzeigen wenn Listener erreichbar (Tobii-Geraet)
// Auf Geraeten ohne Listener (z.B. Asus ExpertBook): intern sofort setzen
window.addEventListener("load", function(){
  setTimeout(function(){
    if(!window.LaetitiaGeraete){
      return;
    }
    window.LaetitiaGeraete.listenerPruefen(function(erreichbar){
      if(!erreichbar){
        localStorage.setItem("laetitia_audio_geraet", "intern");
        return;
      }
      audioDialogZeigen();
    }, 500);
  }, 600);
});
