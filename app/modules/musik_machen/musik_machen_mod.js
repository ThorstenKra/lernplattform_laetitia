// musik_machen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

try{
  var _retAbs = new URL("./musik_machen.html", window.location.href).href;
  localStorage.setItem("laetitia_return_url_v1", _retAbs);
}catch(e){}
var returnUrl = localStorage.getItem("laetitia_return_url_kreativitaet") ||
  new URL("../../kreativitaet.html", window.location.href).href;
document.getElementById("btnZurueck").href = returnUrl;

// Speichere Rückpfad für Untermodule
try{
  localStorage.setItem("laetitia_return_url_musik", new URL("./musik_machen.html", window.location.href).href);
}catch(e){}

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
