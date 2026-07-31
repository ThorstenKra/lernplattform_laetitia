// sinnesorgane_info_mod.js -- Laetitia Lernsystem
// Info-Modul: 2 Ebenen (Organ-Karte + Detail)
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  var daten        = window.SINNESORGANE_INFO || [];
  var idx          = 0;
  var aktView      = "organ";
  var _dwellHandle = null;
  var _attach      = null;

  function $(id){ return document.getElementById(id); }

  // ── Dwell (Regel 7) ──────────────────────────────────────────────────────────
  function loadDwell(){
    if(_attach) return _attach;
    _attach = (typeof window.LaetitiaAttachDwell === "function")
      ? window.LaetitiaAttachDwell
      : function(){ return { cancelDwell: function(){} }; };
    return _attach;
  }

  function rebindDwell(){
    if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
      _dwellHandle.cancelDwell();
    }
    var ms    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
    var grace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
    _dwellHandle = loadDwell()(
      "button.nav-btn, a.nav-btn, button.tiefBtn",
      {
        dwellMs:    ms,
        leaveGrace: grace,
        onActivate: function(el){
          if(el.getAttribute("aria-disabled") === "true") return;
          try{ el.click(); }catch(e){}
        }
      }
    );
  }

  // ── TTS (Goldstandard Katja) ─────────────────────────────────────────────────
  function sprich(text){
    try{
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE"; u.rate = 0.92;
      var vv = speechSynthesis.getVoices();
      var de = vv.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
            || vv.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
            || vv.find(function(v){ return v.name.indexOf("Katja") >= 0; })
            || vv.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
            || vv.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
            || vv.find(function(v){ return v.lang.startsWith("de"); });
      if(de) u.voice = de;
      if(window.LaetitiaSprich){
        window.LaetitiaSprich.wrap(u, null);
      } else {
        setTimeout(function(){ speechSynthesis.speak(u); }, 120);
      }
    }catch(e){}
  }

  // ── Nav-Button aktualisieren ─────────────────────────────────────────────────
  function setNavBtn(id, label, cls, stroke, fn, disabled){
    var btn = $(id);
    if(!btn) return;
    var span = btn.querySelector(".btnLabel");
    if(span) span.textContent = label;
    btn.className = "nav-btn " + (cls || "");
    var circle = btn.querySelector(".dwell-ring-svg circle");
    if(circle && stroke) circle.style.stroke = stroke;
    if(disabled){
      btn.setAttribute("aria-disabled", "true");
      btn.onclick = null;
    } else {
      btn.removeAttribute("aria-disabled");
      btn.onclick = fn || null;
    }
  }

  // ── Fortschrittspunkte ───────────────────────────────────────────────────────
  function aktualisiereDots(){
    document.querySelectorAll(".dot").forEach(function(dot, j){
      dot.classList.toggle("aktiv", j === idx);
    });
  }

  // ── Organ-Karte anzeigen ─────────────────────────────────────────────────────
  function zeigeOrgan(i){
    if(!daten.length) return;
    idx = Math.max(0, Math.min(i, daten.length - 1));
    aktView = "organ";
    var d = daten[idx];

    $("organEmoji").textContent       = d.emoji;
    $("organName").textContent        = d.name;
    $("organSinn").textContent        = d.sinn;
    $("organKernaussage").textContent = d.kernaussage;
    $("organErklaerung").textContent  = d.erklaerung;

    var bs = $("btnStaunen"); if(bs) bs.querySelector(".btnLabel").textContent = d.staunen.icon + " " + d.staunen.titel;
    var bl = $("btnLeben");   if(bl) bl.querySelector(".btnLabel").textContent = d.leben.icon   + " " + d.leben.titel;

    $("headerBreadcrumb").textContent = d.emoji + " " + d.name;
    $("headerCount").textContent      = "Organ " + (idx + 1) + " von " + daten.length;

    $("screenOrgan").classList.remove("hidden");
    $("screenDetail").classList.add("hidden");
    aktualisiereDots();

    setNavBtn("navBtn1", "← Zurück",    "nav-btn-zurueck", "#8b5cf6",
      function(){ window.location.href = "./sinnesorgane.html"; });
    setNavBtn("navBtn2", "🔊 Hören",    "nav-btn-vorlesen", "#3b82f6",
      function(){ sprich(d.tts_organ); });
    setNavBtn("navBtn3", "◀ Vorher",    "nav-btn-nav",     "#16a34a",
      function(){ zeigeOrgan(idx - 1); }, idx === 0);
    setNavBtn("navBtn4", "Nächstes ▶",  "nav-btn-nav",     "#16a34a",
      function(){ zeigeOrgan(idx + 1); }, idx === daten.length - 1);

    rebindDwell();
  }

  // ── Detail-Ansicht anzeigen ──────────────────────────────────────────────────
  function zeigeDetail(typ){
    if(!daten.length) return;
    aktView = typ;
    var d      = daten[idx];
    var detail = d[typ];
    var anderer       = (typ === "staunen") ? "leben" : "staunen";
    var andDetail     = d[anderer];
    var andStroke     = (anderer === "staunen") ? "#f59e0b" : "#0ea5e9";
    var andClass      = (anderer === "staunen") ? "nav-btn-staunen" : "nav-btn-leben";

    $("detailIcon").textContent  = detail.icon;
    $("detailTitel").textContent = detail.titel;
    $("detailText").textContent  = detail.text;
    $("headerBreadcrumb").textContent = daten[idx].emoji + " " + daten[idx].name + " › " + detail.icon;

    $("screenOrgan").classList.add("hidden");
    $("screenDetail").classList.remove("hidden");

    setNavBtn("navBtn1", "← Zurueck",                              "nav-btn-zurueck", "#8b5cf6",
      function(){ zeigeOrgan(idx); });
    setNavBtn("navBtn2", "🔊 Hören",                               "nav-btn-vorlesen", "#3b82f6",
      function(){ sprich(detail.tts); });
    setNavBtn("navBtn3", andDetail.icon + " " + andDetail.titel,   andClass, andStroke,
      function(){ zeigeDetail(anderer); });
    setNavBtn("navBtn4", "🎯 Quiz",                                "nav-btn-quiz", "#16a34a",
      function(){ window.location.href = "./sinnesorgane_quiz.html"; });

    rebindDwell();
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init(){
    // Fortschrittspunkte aufbauen
    var container = $("progressDots");
    if(container){
      container.innerHTML = "";
      daten.forEach(function(){
        var dot = document.createElement("div");
        dot.className = "dot";
        container.appendChild(dot);
      });
    }

    // Tief-Buttons binden
    var bs = $("btnStaunen");
    var bl = $("btnLeben");
    if(bs) bs.addEventListener("click", function(){ zeigeDetail("staunen"); });
    if(bl) bl.addEventListener("click", function(){ zeigeDetail("leben"); });

    zeigeOrgan(0);
  }

  window.SinnInfoMod = { init: init };
})();
