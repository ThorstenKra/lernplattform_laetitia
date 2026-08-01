// mathe_uebersicht_mod.js — Schwierigkeitsstufen-Auswahl (Grundlagen/Fortgeschritten/Profi/Champion)

(function(){

var KATEGORIEN = [
  { id:"grundlagen",      titel:"Grundlagen",      emoji:"🌱", levels:["M0a","M0b","M0c","M0f"] },
  { id:"fortgeschritten", titel:"Fortgeschritten", emoji:"🌿", levels:["M0d","M0e","M1_NACHBAR","M1_REIHE"] },
  { id:"profi",           titel:"Profi",           emoji:"🌳", levels:["M1","M2"] },
  { id:"champion",        titel:"Champion",        emoji:"🏆", levels:["M3","M4"] }
];

function baueUebersicht(){
  var bereich = document.getElementById("kategorienBereich");
  if(!bereich) return;
  bereich.innerHTML = "";

  var rueckkehr = encodeURIComponent("./mathe_uebersicht.html");

  KATEGORIEN.forEach(function(kat){
    var btn = document.createElement("a");
    btn.className = "kategorie-btn verfuegbar";
    btn.setAttribute("data-kat", kat.id);
    btn.href = "./mathe.html?kat=" + kat.id + "&return=" + rueckkehr;
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>" +
      "<div class=\"kategorie-emoji\">" + kat.emoji + "</div>" +
      "<div class=\"kategorie-titel\">" + kat.titel + "</div>" +
      "<div class=\"kategorie-sub\">" + kat.levels.length + " Lektionen</div>";

    bereich.appendChild(btn);
  });

  var attach    = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  attach("a.kategorie-btn, a.zurueckBtn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      try{ el.click(); }catch(e){}
    }
  });
}

window.MatheUebersicht = { baueUebersicht: baueUebersicht };

})();
