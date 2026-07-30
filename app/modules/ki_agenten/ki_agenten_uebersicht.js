// ki_agenten_uebersicht.js -- Laetitia Lernsystem
// Baut die KI-Freunde-Auswahl dynamisch aus registry.js (window.KI_AGENTEN)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){

function baueUebersicht(){
  var bereich = document.getElementById("agentenBereich");
  if(!bereich || !window.KI_AGENTEN) return;
  bereich.innerHTML = "";

  window.KI_AGENTEN.forEach(function(agent){
    var btn = document.createElement("a");
    btn.className = "agent-btn";
    btn.href = agent.pfad;
    btn.style.borderColor = agent.farbe;
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\" style=\"stroke:" + agent.farbe + "\"/></svg>" +
      "<div class=\"agent-emoji\">" + agent.emoji + "</div>" +
      "<div class=\"agent-name\" style=\"color:" + agent.farbe + "\">" + agent.name + "</div>" +
      "<div class=\"agent-rolle\">" + agent.rolle + "</div>";
    bereich.appendChild(btn);
  });

  var attach     = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  attach("a.agent-btn, a.zurueckBtn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      try{ el.click(); }catch(e){}
    }
  });
}

window.KiAgentenUebersicht = { baueUebersicht: baueUebersicht };

})();
