// depth:3 — Pfade: ../../../core/
// Modul-Logik fuer sinnesorgane_info.html (Regel 18: kein Logik-Code inline)
(function(){
  "use strict";

  var daten      = window.SINNESORGANE_INFO || [];
  var idx        = 0;
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;

  function zeige(i){
    if(!daten.length) return;
    idx = Math.max(0, Math.min(i, daten.length - 1));
    var d = daten[idx];

    document.getElementById("organEmoji").textContent       = d.emoji;
    document.getElementById("organName").textContent        = d.name;
    document.getElementById("organSinn").textContent        = d.sinn;
    document.getElementById("organKoerper").textContent     = d.koerperteil;
    document.getElementById("organWahrnehmung").textContent = d.wahrnehmen;
    document.getElementById("organFunktion").textContent    = d.funktion;
    document.getElementById("organAlltag").textContent      = d.alltag;
    document.getElementById("organFakt").textContent        = d.fakt;
    document.getElementById("fortschritt").textContent      = "Organ " + (idx+1) + " von " + daten.length;

    document.getElementById("btnPrev").setAttribute("aria-disabled", idx === 0 ? "true" : "false");
    document.getElementById("btnNext").setAttribute("aria-disabled", idx === daten.length - 1 ? "true" : "false");

    document.querySelectorAll(".dot").forEach(function(dot, j){
      dot.classList.toggle("aktiv", j === idx);
    });

    try{
      var text = d.name + ". " + d.sinn + ". " + d.funktion + " " + d.fakt;
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92;
      var voices = speechSynthesis.getVoices();
      var katja = voices.find(function(v){ return v.name && v.name.indexOf("Katja") >= 0; });
      var de    = voices.find(function(v){ return (v.lang||"").toLowerCase().startsWith("de"); });
      if(katja) u.voice = katja;
      else if(de) u.voice = de;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }catch(e){}
  }

  function aufbauenDots(){
    var container = document.getElementById("progressDots");
    container.innerHTML = "";
    daten.forEach(function(){
      var dot = document.createElement("div");
      dot.className = "dot";
      container.appendChild(dot);
    });
  }

  function bindUI(){
    document.getElementById("btnNext").addEventListener("click", function(e){
      e.preventDefault();
      if(idx < daten.length - 1) zeige(idx + 1);
    });
    document.getElementById("btnPrev").addEventListener("click", function(e){
      e.preventDefault();
      if(idx > 0) zeige(idx - 1);
    });
  }

  function bindDwell(){
    var attach = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
    attach("a.infBtn", {
      dwellMs: dwellMs, leaveGrace: leaveGrace,
      onActivate: function(el){
        if(el.getAttribute("aria-disabled") === "true") return;
        try{ el.click(); }catch(e){}
      }
    });
  }

  if(typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = function(){};
  }

  aufbauenDots();
  zeige(0);
  bindUI();
  bindDwell();
})();
