// reim_uebersicht.js -- Laetitia Lernsystem
// Baut die Einheiten-Kacheln (ein Gedicht = eine Einheit) dynamisch aus
// REIM_EINHEITEN -- neue Gedichte brauchen nur einen neuen Eintrag in
// reim_data.js, keine HTML-Aenderung.
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){

var STORAGE_KEY = "laetitia_reim_v1";

function ladeStand(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function baueUebersicht(){
  var stand   = ladeStand();
  var bereich = document.getElementById("einheitenBereich");
  if(!bereich) return;
  bereich.innerHTML = "";

  var einheiten = window.REIM_EINHEITEN || [];
  einheiten.forEach(function(e){
    var gemeistert = !!(stand[e.id] && stand[e.id].abgeschlossen);

    var btn = document.createElement("a");
    btn.className = "einheit-btn" + (gemeistert ? " gemeistert" : "");
    btn.href = "./reim_spielen.html?einheit=" + e.id;
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>" +
      "<div class=\"einheit-emoji\">" + e.emoji + "</div>" +
      "<div class=\"einheit-titel\">" + e.titel + "</div>" +
      "<div class=\"einheit-autor\">" + e.autor + "</div>" +
      "<div class=\"einheit-count\">" + e.aufgaben.length + " Aufgaben" + (gemeistert ? " · ⭐ gemeistert" : "") + "</div>";

    bereich.appendChild(btn);
  });

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

window.ReimUebersicht = { baueUebersicht: baueUebersicht };

})();
