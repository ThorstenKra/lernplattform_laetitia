// grammatik_uebersicht.js — Einheiten-Übersicht und Fortschrittsanzeige

(function(){

var STORAGE_KEY = "laetitia_grammatik_v1";

var STUFE_NAMEN = {
  1: "Stufe 1 — Nomen, Verben, Adjektive",
  2: "Stufe 2 — Artikel der / die / das",
  3: "Stufe 3 — Sätze bauen",
  4: "Stufe 4 — Konjugation Gegenwart",
  5: "Stufe 5 — Singular & Plural",
  6: "Stufe 6 — Groß- und Kleinschreibung",
  7: "Stufe 7 — Wer-Fall und Wen-Fall",
  8: "Stufe 8 — Pronomen"
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

    var freigegeben = true;
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

function initAdmin(){
  var headerEl = document.querySelector(".header");
  if(!headerEl) return;
  var timer = null;
  function startHold(){ timer = setTimeout(oeffnePanel, 3000); }
  function stopHold(){ if(timer){ clearTimeout(timer); timer = null; } }
  headerEl.addEventListener("mousedown",  startHold);
  headerEl.addEventListener("touchstart", startHold, {passive:true});
  headerEl.addEventListener("mouseup",    stopHold);
  headerEl.addEventListener("mouseleave", stopHold);
  headerEl.addEventListener("touchend",   stopHold);

  function btn(text, css, fn){
    var b = document.createElement("button");
    b.textContent = text;
    b.style.cssText = "display:block;width:100%;margin-bottom:8px;padding:12px 10px;" +
      "border-radius:12px;font-size:13px;font-weight:1000;cursor:pointer;text-align:left;border:2px solid;" + css;
    b.onclick = fn;
    return b;
  }

  function oeffnePanel(){
    var overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;" +
      "background:rgba(0,0,0,.6);z-index:1000;display:flex;align-items:center;justify-content:center;";

    var panel = document.createElement("div");
    panel.style.cssText = "background:#fff;border-radius:16px;padding:20px;" +
      "max-width:340px;width:92%;max-height:80vh;overflow-y:auto;";

    var titel = document.createElement("p");
    titel.textContent = "🔧 Admin";
    titel.style.cssText = "font-size:17px;font-weight:1000;color:#7c3aed;margin-bottom:14px;";
    panel.appendChild(titel);

    panel.appendChild(btn(
      "🗑️ Alle Fortschritte löschen",
      "border-color:#ef4444;background:#fef2f2;color:#b91c1c;margin-top:12px;",
      function(){
        if(confirm("Wirklich alle Fortschritte löschen?")){
          localStorage.removeItem(STORAGE_KEY);
          document.body.removeChild(overlay);
          location.reload();
        }
      }
    ));
    panel.appendChild(btn(
      "✕ Schließen",
      "border-color:#94a3b8;background:#f8fafc;color:#475569;",
      function(){ document.body.removeChild(overlay); }
    ));

    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  }
}

window.GrammatikUebersicht = { baueUebersicht: baueUebersicht, initAdmin: initAdmin };

})();
