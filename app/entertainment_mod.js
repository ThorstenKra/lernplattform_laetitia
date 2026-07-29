// entertainment_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 2000;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
function bindDwell(){
  attachDwell("a.modBtn:not(.is-disabled), #btnZurueck", {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      if(el.classList.contains("is-disabled")) return;
      try{ el.click(); }catch(e){}
    }
  });
}
try{
  var _retAbs = new URL("./entertainment.html", window.location.href).href;
  localStorage.setItem("laetitia_return_url_v1", _retAbs);
}catch(e){}
// Dwell direkt mit pointerenter
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
document.querySelectorAll("a.modBtn:not(.is-disabled), #btnZurueck").forEach(function(el){
  var timer = null;
  function start(){ if(timer) return; el.classList.add("dwell-active"); timer = setTimeout(function(){ timer=null; try{ el.click(); }catch(e){} }, dwellMs); }
  function stop(){ if(timer){ clearTimeout(timer); timer=null; } el.classList.remove("dwell-active"); }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("click", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
});
