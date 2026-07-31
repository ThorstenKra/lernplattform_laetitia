// einstellungen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Werte laden ────────────────────────────────────────────────────────────
function getCfg(){
  try{ return JSON.parse(localStorage.getItem("laetitia_config_v1")||"{}"); }catch{ return {}; }
}
function saveCfg(obj){
  try{ localStorage.setItem("laetitia_config_v1", JSON.stringify(obj)); }catch{}
}

const cfg = getCfg();

// Default jetzt 400ms statt 600ms
const dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 600;
const graceMs = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;

// ── Eingabemodus ──────────────────────────────────────────────────────────
function setMode(mode){
  localStorage.setItem("laetitia_input_mode", mode);
  updateModeButtons();
}
function updateModeButtons(){
  const mode = localStorage.getItem("laetitia_input_mode") || "tobii";
  const btnT = document.getElementById("btnModeTobii");
  const btnM = document.getElementById("btnModeMouse");
  const info = document.getElementById("modeInfo");
  // cssText += akkumuliert Styles — stattdessen einzelne Properties setzen
  if(btnT){
    const on = mode === "tobii";
    btnT.style.background  = on ? "var(--green)"            : "rgba(15,23,42,.06)";
    btnT.style.color       = on ? "#0b1b10"                 : "var(--text)";
    btnT.style.borderColor = on ? "var(--green)"            : "var(--border)";
    btnT.style.boxShadow   = on ? "0 0 0 3px rgba(29,185,84,.35)" : "none";
  }
  if(btnM){
    const on = mode === "mouse";
    btnM.style.background  = on ? "var(--green)"            : "rgba(15,23,42,.06)";
    btnM.style.color       = on ? "#0b1b10"                 : "var(--text)";
    btnM.style.borderColor = on ? "var(--green)"            : "var(--border)";
    btnM.style.boxShadow   = on ? "0 0 0 3px rgba(29,185,84,.35)" : "none";
  }
  if(info){
    info.style.cssText = mode === "tobii"
      ? "margin-top:8px;font-size:14px;font-weight:900;padding:8px 12px;border-radius:10px;background:rgba(29,185,84,.12);border:1px solid rgba(29,185,84,.35);color:#0b5c22;"
      : "margin-top:8px;font-size:14px;font-weight:900;padding:8px 12px;border-radius:10px;background:rgba(34,153,255,.10);border:1px solid rgba(34,153,255,.30);color:#0a3d6b;";
    info.textContent = mode === "tobii"
      ? "👁️ Aktiv: Augensteuerung — Buttons lösen automatisch nach Verweilzeit aus."
      : "🖱️ Aktiv: Mausbedienung — Buttons lösen NUR per Klick aus. Kein automatisches Auslösen.";
  }
}
updateModeButtons();

document.getElementById("dwellSlider").value   = dwellMs;
document.getElementById("graceSlider").value   = graceMs;
document.getElementById("delaySlider").value   = cfg.delay   ?? 1;
document.getElementById("fragenSlider").value  = cfg.fragen  ?? 10;
document.getElementById("schwelleSlider").value= cfg.schwelle?? 50;

// ── Schnell-Wahl Buttons ────────────────────────────────────────────────────
function updateQuickActive(ms){
  document.querySelectorAll(".qdBtn").forEach(btn=>{
    const val = parseInt(btn.dataset.ms);
    btn.classList.toggle("qdActive", val === ms);
  });
}
updateQuickActive(dwellMs);

// Dwell auf Schnell-Wahl-Buttons
const QD_DWELL = 1500; // fest 1500ms damit Schnellwahl-Buttons immer erreichbar sind
let qdTimers = new Map();
let qdLeaveTimers = new Map();

document.querySelectorAll(".qdBtn").forEach(btn=>{
  function startQd(){
    if(qdTimers.has(btn)) return;
    if(qdLeaveTimers.has(btn)){ clearTimeout(qdLeaveTimers.get(btn)); qdLeaveTimers.delete(btn); }
    btn.classList.add("dwell-active");

    // Ring-Animation
    let svg = btn.querySelector(".dwell-ring-svg");
    if(!svg){
      svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
      svg.setAttribute("class","dwell-ring-svg"); svg.setAttribute("viewBox","0 0 64 64");
      const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
      c.setAttribute("cx","32"); c.setAttribute("cy","32"); c.setAttribute("r","27");
      svg.appendChild(c); btn.appendChild(svg);
    }
    svg.style.setProperty("--dwell-duration",(QD_DWELL/1000)+"s");
    const circle = svg.querySelector("circle");
    circle.classList.remove("animating");
    requestAnimationFrame(()=>requestAnimationFrame(()=>circle.classList.add("animating")));

    const t = setTimeout(()=>{
      cancelQd(btn);
      const ms = parseInt(btn.dataset.ms);
      document.getElementById("dwellSlider").value = ms;
      document.getElementById("dwellVal").textContent = ms + " ms";
      updateQuickActive(ms);
      // Kurzes visuelles Feedback
      btn.classList.add("qdActive");
    }, QD_DWELL);
    qdTimers.set(btn, t);
  }

  function cancelQd(b){
    if(qdTimers.has(b)){ clearTimeout(qdTimers.get(b)); qdTimers.delete(b); }
    b.classList.remove("dwell-active");
    const svg = b.querySelector(".dwell-ring-svg");
    if(svg) svg.remove();
  }

  btn.addEventListener("mouseenter", startQd);
  btn.addEventListener("focus", startQd);
  btn.addEventListener("mouseleave", ()=>{
    const t = setTimeout(()=>cancelQd(btn), graceMs);
    qdLeaveTimers.set(btn, t);
  });
  btn.addEventListener("blur", ()=>cancelQd(btn));
  btn.addEventListener("click", ()=>{
    const ms = parseInt(btn.dataset.ms);
    document.getElementById("dwellSlider").value = ms;
    document.getElementById("dwellVal").textContent = ms + " ms";
    updateQuickActive(ms);
  });
});

// ── Live-Anzeige ────────────────────────────────────────────────────────────
function bindSlider(sliderId, valId, format){
  const s = document.getElementById(sliderId);
  const v = document.getElementById(valId);
  v.textContent = format(s.value);
  s.addEventListener("input", ()=>{
    v.textContent = format(s.value);
    // Slider-Bewegung synchronisiert Schnell-Wahl-Markierung
    if(sliderId === "dwellSlider") updateQuickActive(parseInt(s.value));
  });
}
bindSlider("dwellSlider",   "dwellVal",   v=> v + " ms");
bindSlider("graceSlider",   "graceVal",   v=> v + " ms");
bindSlider("delaySlider",   "delayVal",   v=> v + " s");
bindSlider("fragenSlider",  "fragenVal",  v=> v);
bindSlider("schwelleSlider","schwelleVal",v=> v + " %");

// ── Dwell-Test-Button ────────────────────────────────────────────────────────
let testTimer = null, testLeave = null, testTarget = null;

function cancelTest(){
  if(testTimer){ clearTimeout(testTimer); testTimer = null; }
  if(testLeave){ clearTimeout(testLeave); testLeave = null; }
  if(testTarget){
    testTarget.classList.remove("dwell-active");
    testTarget.querySelectorAll(".dwell-ring-svg").forEach(s=>s.remove());
    testTarget = null;
  }
}

function startTest(el){
  if(el === testTarget) return;
  if(testLeave){ clearTimeout(testLeave); testLeave = null; }
  cancelTest();

  const dMs = parseInt(document.getElementById("dwellSlider").value) || 600;
  testTarget = el;
  el.classList.add("dwell-active");

  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","dwell-ring-svg"); svg.setAttribute("viewBox","0 0 64 64");
  const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx","32"); c.setAttribute("cy","32"); c.setAttribute("r","27");
  svg.appendChild(c); el.appendChild(svg);
  svg.style.setProperty("--dwell-duration",(dMs/1000)+"s");
  requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add("animating")));

  testTimer = setTimeout(()=>{
    cancelTest();
    const fb = document.getElementById("testFeedback");
    fb.textContent = `✅ Ausgelöst nach ${dMs} ms!`;
    fb.classList.add("show");
    setTimeout(()=>fb.classList.remove("show"), 2500);
  }, dMs);
}

const btn = document.getElementById("btnDwellTest");
btn.addEventListener("mouseenter", ()=> startTest(btn));
btn.addEventListener("mouseleave", ()=>{
  const gMs = parseInt(document.getElementById("graceSlider").value)||150;
  if(testLeave){ clearTimeout(testLeave); }
  testLeave = setTimeout(cancelTest, gMs);
});
btn.addEventListener("focus",      ()=> startTest(btn));
btn.addEventListener("blur",       cancelTest);

// ── Speichern ────────────────────────────────────────────────────────────────
document.getElementById("btnSave").addEventListener("click", ()=>{
  const dMs  = parseInt(document.getElementById("dwellSlider").value);
  const gMs  = parseInt(document.getElementById("graceSlider").value);
  const delay    = parseInt(document.getElementById("delaySlider").value);
  const fragen   = parseInt(document.getElementById("fragenSlider").value);
  const schwelle = parseInt(document.getElementById("schwelleSlider").value);

  // Dwell-spezifische Keys
  localStorage.setItem("laetitia_dwell_ms",       String(dMs));
  localStorage.setItem("laetitia_leave_grace_ms",  String(gMs));

  // Lern-Config
  const neu = { ...getCfg(), delay, fragen, schwelle };
  saveCfg(neu);

  const ok = document.getElementById("saveOk");
  ok.classList.add("show");
  setTimeout(()=>ok.classList.remove("show"), 2500);
});

// ── Zurücksetzen ──────────────────────────────────────────────────────────────
document.getElementById("btnResetWrong").addEventListener("click", ()=>{
  // Alle laetitia_wrong_*-Keys löschen
  const keys = [];
  for(let i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
  keys.filter(k=>k&&k.startsWith("laetitia_wrong")).forEach(k=>localStorage.removeItem(k));
  const fb = document.getElementById("resetFeedback");
  fb.textContent = "✅ Falsche Antworten gelöscht.";
  fb.classList.add("show");
  setTimeout(()=>fb.classList.remove("show"), 2500);
});

document.getElementById("btnResetUnlock").addEventListener("click", ()=>{
  localStorage.removeItem("laetitia_unlocked_v1");
  const fb = document.getElementById("resetFeedback");
  fb.textContent = "✅ Spielewelt-Sperre zurückgesetzt.";
  fb.classList.add("show");
  setTimeout(()=>fb.classList.remove("show"), 2500);
});

// ── Schultage-Kalender ────────────────────────────────────────────────────────

var schulAktuellerMonat = new Date();
schulAktuellerMonat.setDate(1);

var MONATSNAMEN = ["Januar","Februar","März","April","Mai","Juni",
                   "Juli","August","September","Oktober","November","Dezember"];

function schulTagKey(y, m, d){
  return y + "-" + String(m+1).padStart(2,"0") + "-" + String(d).padStart(2,"0");
}

function schulRenderKalender(){
  var heute = new Date();
  var heuteKey = schulTagKey(heute.getFullYear(), heute.getMonth(), heute.getDate());
  var schultage = (function(){
    try{ var r=localStorage.getItem("laetitia_schultage_v1"); return r?JSON.parse(r):[]; }catch(e){return [];}
  })();
  var schultageSet = new Set(schultage);

  var y = schulAktuellerMonat.getFullYear();
  var m = schulAktuellerMonat.getMonth();

  document.getElementById("schulMonatTitel").textContent =
    MONATSNAMEN[m] + " " + y;

  var grid = document.getElementById("schulGrid");
  grid.innerHTML = "";

  // Erster Wochentag des Monats (Mo=0 ... So=6)
  var ersterTag = new Date(y, m, 1);
  var startWt = (ersterTag.getDay() + 6) % 7; // Mo=0

  // Leere Zellen am Anfang
  for(var i=0; i<startWt; i++){
    var leer = document.createElement("div");
    leer.className = "schul-tag leer";
    grid.appendChild(leer);
  }

  // Tage des Monats
  var tageImMonat = new Date(y, m+1, 0).getDate();
  var anzahlSchultage = 0;

  for(var t=1; t<=tageImMonat; t++){
    var key = schulTagKey(y, m, t);
    var wt = (new Date(y, m, t).getDay() + 6) % 7; // Mo=0
    var istWochenende = wt >= 5;
    var istHeute = key === heuteKey;
    var istSchultag = schultageSet.has(key);
    var istVergangen = new Date(y, m, t) < new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());

    if(istSchultag) anzahlSchultage++;

    var el = document.createElement("div");
    el.textContent = t;
    el.className = "schul-tag" +
      (istSchultag  ? " schultag"   : "") +
      (istHeute     ? " heute"      : "") +
      (istVergangen ? " vergangen"  : "") +
      (istWochenende? " wochenende" : "");
    el.dataset.key = key;

    (function(tagEl, tagKey){
      tagEl.addEventListener("click", function(){
        var tage = (function(){
          try{ var r=localStorage.getItem("laetitia_schultage_v1"); return r?JSON.parse(r):[]; }catch(e){return [];}
        })();
        var idx = tage.indexOf(tagKey);
        if(idx >= 0){ tage.splice(idx,1); }
        else { tage.push(tagKey); }
        try{ localStorage.setItem("laetitia_schultage_v1", JSON.stringify(tage)); }catch(e){}
        schulRenderKalender();
        schulUpdateStatus();
      });
    })(el, key);

    grid.appendChild(el);
  }

  // Info-Zeile
  var info = document.getElementById("schulInfo");
  info.innerHTML = "<strong>" + anzahlSchultage + " Schultage</strong> in " +
    MONATSNAMEN[m] + " eingetragen";
}

function schulUpdateStatus(){
  // schulprofil.js muss geladen sein — Fallback falls nicht
  var istSchule = false;
  if(window.LaetitiaSchulprofil){
    istSchule = window.LaetitiaSchulprofil.istSchulzeit();
  }
  var badge = document.getElementById("schulStatusBadge");
  if(!badge) return;
  if(istSchule){
    badge.className = "schul-status-badge schule";
    badge.textContent = "🏫 Jetzt: Schulmodus (08:30–15:30)";
  } else {
    badge.className = "schul-status-badge freizeit";
    badge.textContent = "🏠 Jetzt: Freizeitmodus";
  }
}

// Navigation
document.getElementById("schulPrev").addEventListener("click", function(){
  schulAktuellerMonat.setMonth(schulAktuellerMonat.getMonth()-1);
  schulRenderKalender();
});
document.getElementById("schulNext").addEventListener("click", function(){
  schulAktuellerMonat.setMonth(schulAktuellerMonat.getMonth()+1);
  schulRenderKalender();
});

// Schnell-Aktionen
document.getElementById("schulBtnWoche").addEventListener("click", function(){
  var heute = new Date();
  var wt = (heute.getDay()+6)%7;
  var montag = new Date(heute);
  montag.setDate(heute.getDate()-wt);
  var tage = (function(){
    try{ var r=localStorage.getItem("laetitia_schultage_v1"); return r?JSON.parse(r):[]; }catch(e){return [];}
  })();
  var tageSet = new Set(tage);
  for(var d=0; d<5; d++){
    var tag = new Date(montag);
    tag.setDate(montag.getDate()+d);
    var key = schulTagKey(tag.getFullYear(), tag.getMonth(), tag.getDate());
    tageSet.add(key);
  }
  try{ localStorage.setItem("laetitia_schultage_v1", JSON.stringify(Array.from(tageSet))); }catch(e){}
  schulRenderKalender();
  schulUpdateStatus();
});

document.getElementById("schulBtnMonat").addEventListener("click", function(){
  var y = schulAktuellerMonat.getFullYear();
  var m = schulAktuellerMonat.getMonth();
  var tageImMonat = new Date(y, m+1, 0).getDate();
  var tage = (function(){
    try{ var r=localStorage.getItem("laetitia_schultage_v1"); return r?JSON.parse(r):[]; }catch(e){return [];}
  })();
  var tageSet = new Set(tage);
  for(var t=1; t<=tageImMonat; t++){
    var wt = (new Date(y,m,t).getDay()+6)%7;
    if(wt < 5){ // Mo–Fr
      tageSet.add(schulTagKey(y,m,t));
    }
  }
  try{ localStorage.setItem("laetitia_schultage_v1", JSON.stringify(Array.from(tageSet))); }catch(e){}
  schulRenderKalender();
  schulUpdateStatus();
});

document.getElementById("schulBtnClear").addEventListener("click", function(){
  var y = schulAktuellerMonat.getFullYear();
  var m = schulAktuellerMonat.getMonth();
  var prefix = y + "-" + String(m+1).padStart(2,"0") + "-";
  var tage = (function(){
    try{ var r=localStorage.getItem("laetitia_schultage_v1"); return r?JSON.parse(r):[]; }catch(e){return [];}
  })();
  tage = tage.filter(function(k){ return !k.startsWith(prefix); });
  try{ localStorage.setItem("laetitia_schultage_v1", JSON.stringify(tage)); }catch(e){}
  schulRenderKalender();
  schulUpdateStatus();
});

// Init
schulRenderKalender();
schulUpdateStatus();

// ── Zurück ────────────────────────────────────────────────────────────────────
document.getElementById("btnBack").addEventListener("click", ()=>{
  history.back() || (location.href = "../index.html");
});
