// grammatik_kategorie.js — Lektionen-Raster je Schwierigkeitsstufe (kein Scrollen noetig)

(function(){

var STORAGE_KEY = "laetitia_grammatik_v1";
var SPALTEN = 4;

var KATEGORIEN = {
  grundlagen:       { titel:"Grundlagen",       emoji:"🌱", stufen:[1,2] },
  fortgeschrittene: { titel:"Fortgeschrittene", emoji:"🌿", stufen:[3,4] },
  profi:            { titel:"Profi",            emoji:"🌳", stufen:[5,6] },
  champion:         { titel:"Champion",         emoji:"🏆", stufen:[7,8] }
};

function ladeStand(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function einheitAbgeschlossen(id, stand){
  return !!(stand[id] && stand[id].abgeschlossen);
}

function baueKategorie(){
  var katId = new URLSearchParams(window.location.search).get("kat") || "grundlagen";
  var kat   = KATEGORIEN[katId] || KATEGORIEN.grundlagen;

  var stand     = ladeStand();
  var bereich   = document.getElementById("einheitenBereich");
  if(!bereich) return;
  bereich.innerHTML = "";

  var einheiten = GRAMMATIK_EINHEITEN.filter(function(e){ return kat.stufen.indexOf(e.stufe) !== -1; });
  var zeilen    = Math.max(1, Math.ceil(einheiten.length / SPALTEN));
  bereich.style.gridTemplateRows = "repeat(" + zeilen + ", 1fr)";

  einheiten.forEach(function(einheit){
    var gemeistert = einheitAbgeschlossen(einheit.id, stand);
    var quote      = stand[einheit.id] ? stand[einheit.id].besteQuote : 0;
    var istGold    = gemeistert && quote >= 0.8;
    var statusEmoji = gemeistert ? (istGold ? "⭐" : "✓") : "▶";

    var btn = document.createElement("a");
    btn.className = "einheit-btn" + (gemeistert ? " gemeistert" : " verfuegbar");
    btn.setAttribute("data-id", einheit.id);
    btn.href = "./grammatik_spiel.html?einheit=" + einheit.id + "&kat=" + katId;
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>" +
      "<div class=\"einheit-status\">" + statusEmoji + "</div>" +
      "<div class=\"einheit-id\">" + einheit.id + "</div>" +
      "<div class=\"einheit-label\">" + einheit.titel + "</div>";

    bereich.appendChild(btn);
  });

  var titelEl = document.getElementById("headerTitel");
  var emojiEl = document.getElementById("headerEmoji");
  var subEl   = document.getElementById("headerSub");
  if(titelEl) titelEl.textContent = kat.titel;
  if(emojiEl) emojiEl.textContent = kat.emoji;
  if(subEl){
    var abgeschl = einheiten.filter(function(e){ return einheitAbgeschlossen(e.id, stand); }).length;
    subEl.textContent = abgeschl + " / " + einheiten.length + " gemeistert";
  }

  var attach     = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  attach("a.einheit-btn, a.zurueckBtn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      try{ el.click(); }catch(e){}
    }
  });
}

window.GrammatikKategorie = { baueKategorie: baueKategorie };

})();
