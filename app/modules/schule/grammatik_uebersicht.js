// grammatik_uebersicht.js — Einheiten-Übersicht und Fortschrittsanzeige

(function(){

var STORAGE_KEY = "laetitia_grammatik_v1";

var STUFE_NAMEN = {
  0: "Stufe 0 — Satz und Wort",
  1: "Stufe 1 — Nomen",
  2: "Stufe 2 — Artikel",
  3: "Stufe 3 — Sätze bauen"
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

function baueUebersicht(){
  var stand   = ladeStand();
  var bereich = document.getElementById("einheitenBereich");
  if(!bereich) return;
  bereich.innerHTML = "";

  var aktStufe = -1;
  var gridEl   = null;

  GRAMMATIK_EINHEITEN.forEach(function(einheit, index){
    if(einheit.stufe !== aktStufe){
      aktStufe = einheit.stufe;
      var label = document.createElement("div");
      label.className = "stufe-label";
      label.textContent = STUFE_NAMEN[aktStufe] || ("Stufe " + aktStufe);
      bereich.appendChild(label);
      gridEl = document.createElement("div");
      gridEl.className = "einheiten-grid";
      bereich.appendChild(gridEl);
    }

    var freigegeben = (index === 0) || einheitAbgeschlossen(GRAMMATIK_EINHEITEN[index - 1].id, stand);
    var gemeistert  = einheitAbgeschlossen(einheit.id, stand);
    var quote       = stand[einheit.id] ? stand[einheit.id].besteQuote : 0;
    var istGold     = gemeistert && quote >= 0.8;

    var statusEmoji = gemeistert ? (istGold ? "⭐" : "✓") : (freigegeben ? "▶" : "🔒");
    var klasse = "einheit-btn" +
      (gemeistert ? " gemeistert" : (freigegeben ? " verfuegbar" : " gesperrt"));

    var btn = document.createElement("a");
    btn.className = klasse;
    btn.setAttribute("data-id", einheit.id);
    if(freigegeben){
      btn.href = "./grammatik_spiel.html?einheit=" + einheit.id;
    }
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>" +
      "<div class=\"einheit-status\">" + statusEmoji + "</div>" +
      "<div class=\"einheit-id\">" + einheit.id + "</div>" +
      "<div class=\"einheit-label\">" + einheit.titel + "</div>";

    gridEl.appendChild(btn);
  });

  var gesamt   = GRAMMATIK_EINHEITEN.length;
  var abgeschl = GRAMMATIK_EINHEITEN.filter(function(e){ return einheitAbgeschlossen(e.id, stand); }).length;
  var sub = document.getElementById("headerSub");
  if(sub) sub.textContent = abgeschl + " / " + gesamt + " gemeistert";

  var attach    = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  attach("a.einheit-btn.verfuegbar, a.einheit-btn.gemeistert, a.zurueckBtn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.classList.contains("gesperrt")) return;
      try{ el.click(); }catch(e){}
    }
  });
}

window.GrammatikUebersicht = { baueUebersicht: baueUebersicht };

})();
