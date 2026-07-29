// sachkunde_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";
  try{
    var abs = new URL("./sachkunde.html", window.location.href).href;
    localStorage.setItem("laetitia_return_url_v1", abs);
  }catch(e){}

  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;

  // Rule 7: LaetitiaAttachDwell als primaerer Mechanismus
  var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  attachDwell("a.modBtn, a.zurueckBtn", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
  });

  // Direktes pointerenter als Fallback (zuverlaessig auf Tobii Accent)
  document.querySelectorAll("a.modBtn, a.zurueckBtn").forEach(function(el){
    var timer = null;
    var ring  = el.querySelector(".dwell-ring-svg circle");

    function start(){
      if(timer) return;
      el.classList.add("dwell-active");
      if(ring){
        ring.classList.remove("animating");
        void ring.offsetWidth;
        ring.style.setProperty("--dwell-duration", (dwellMs/1000) + "s");
        ring.classList.add("animating");
      }
      timer = setTimeout(function(){
        timer = null;
        try{ el.click(); }catch(e){}
      }, dwellMs);
    }
    function stop(){
      if(timer){ clearTimeout(timer); timer = null; }
      el.classList.remove("dwell-active");
      if(ring) ring.classList.remove("animating");
    }

    el.addEventListener("pointerenter", start);
    el.addEventListener("pointerleave", stop);
    el.addEventListener("mouseenter",   start);
    el.addEventListener("mouseleave",   stop);
    el.addEventListener("click",        stop);
  });
})();
