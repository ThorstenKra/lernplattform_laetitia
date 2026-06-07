// grammatik_uebersicht.js — Schwierigkeitsstufen-Auswahl (Grundlagen/Fortgeschrittene/Profi/Champion)

(function(){

var STORAGE_KEY = "laetitia_grammatik_v1";

var KATEGORIEN = [
  { id:"grundlagen",       titel:"Grundlagen",       emoji:"🌱", stufen:[1,2] },
  { id:"fortgeschrittene", titel:"Fortgeschrittene", emoji:"🌿", stufen:[3,4] },
  { id:"profi",            titel:"Profi",            emoji:"🌳", stufen:[5,6] },
  { id:"champion",         titel:"Champion",         emoji:"🏆", stufen:[7,8,9] }
];

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
  var bereich = document.getElementById("kategorienBereich");
  if(!bereich) return;
  bereich.innerHTML = "";

  KATEGORIEN.forEach(function(kat){
    var einheiten = GRAMMATIK_EINHEITEN.filter(function(e){ return kat.stufen.indexOf(e.stufe) !== -1; });
    var gemeistert = einheiten.filter(function(e){ return einheitAbgeschlossen(e.id, stand); }).length;

    var btn = document.createElement("a");
    btn.className = "kategorie-btn verfuegbar";
    btn.setAttribute("data-kat", kat.id);
    btn.href = "./grammatik_kategorie.html?kat=" + kat.id;
    btn.innerHTML =
      "<svg class=\"dwell-ring-svg\" viewBox=\"0 0 70 70\"><circle cx=\"35\" cy=\"35\" r=\"30\"/></svg>" +
      "<div class=\"kategorie-emoji\">" + kat.emoji + "</div>" +
      "<div class=\"kategorie-titel\">" + kat.titel + "</div>" +
      "<div class=\"kategorie-sub\">" + gemeistert + " / " + einheiten.length + " gemeistert</div>";

    bereich.appendChild(btn);
  });

  var gesamt   = GRAMMATIK_EINHEITEN.length;
  var abgeschl = GRAMMATIK_EINHEITEN.filter(function(e){ return einheitAbgeschlossen(e.id, stand); }).length;
  var sub = document.getElementById("headerSub");
  if(sub) sub.textContent = abgeschl + " / " + gesamt + " gemeistert";

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
