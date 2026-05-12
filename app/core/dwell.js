// app/core/dwell.js  v10
// Dwell-System für Tobii Accent 1400 + Mausbedienung
// WICHTIG: Als normales <script> laden, NICHT per import()
// window.LaetitiaAttachDwell wird gesetzt
//
// v10: Drei Fixes für Tobii-Zuverlässigkeit:
//   1. mouseenter + pointerenter dedupliziert — kein doppelter Timer-Neustart
//   2. Laufender Timer wird bei erneutem Enter NICHT unterbrochen (S.target===el Guard)
//   3. pointerleave hat eigene Grace-Zeit (300ms) — Blickzittern wird ignoriert

(function(){
"use strict";

function getMode(){
  return localStorage.getItem("laetitia_input_mode") || "tobii";
}

if(!window._LDwellState){
  window._LDwellState = {
    target:           null,
    dwellTimer:       null,
    leaveTimer:       null,
    onActivate:       null,
    dwellMs:          600,
    leaveGrace:       100,
    pointerLeaveGrace: 300, // längere Grace-Zeit für Tobii-Blickzittern
    protectUntil:     0
  };
}
var S = window._LDwellState;

// Schutzzeit setzen — verhindert sofortige Auslösung nach Seitenwechsel
// Wird von cancelDwell() und beim ersten Laden aufgerufen
function setProtection(ms){
  S.protectUntil = Date.now() + (ms || 1200);
}

function isDisabled(el){
  if(!el) return true;
  return (el.getAttribute("aria-disabled")||"").toLowerCase() === "true"
      || (el.getAttribute("data-disabled")||"") === "1";
}

function makeSvgRing(){
  var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","dwell-ring-svg");
  svg.setAttribute("viewBox","0 0 70 70");
  var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx","35"); c.setAttribute("cy","35"); c.setAttribute("r","32");
  svg.appendChild(c);
  return svg;
}

function clearRing(){
  if(S.leaveTimer){ clearTimeout(S.leaveTimer); S.leaveTimer = null; }
  if(S.dwellTimer){ clearTimeout(S.dwellTimer); S.dwellTimer = null; }
  if(S.target){
    S.target.classList.remove("dwell-active");
    var rings = S.target.querySelectorAll(".dwell-ring-svg");
    for(var i=0;i<rings.length;i++){
      if(rings[i].parentNode) rings[i].parentNode.removeChild(rings[i]);
    }
    S.target = null;
  }
}

function showRingOnly(el){
  // Mouse-Modus: visueller Ring ohne Timer
  if(S.target === el) return;
  clearRing();
  S.target = el;
  el.classList.add("dwell-active");
  var svg = makeSvgRing();
  svg.style.setProperty("--dwell-duration","0.3s");
  el.appendChild(svg);
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      var c = svg.querySelector("circle");
      if(c) c.classList.add("animating");
    });
  });
  // KEIN Timer — nativer click-Event des Buttons bleibt allein zuständig
}

function startDwell(el){
  // Tobii-Modus: Ring + Timer → onActivate
  if(!el || isDisabled(el)) return;
  // Schutzzeit: kein Auslösen kurz nach Seitenwechsel
  if(Date.now() < S.protectUntil) return;
  // leaveTimer stoppen — Element wieder betreten
  if(S.leaveTimer){ clearTimeout(S.leaveTimer); S.leaveTimer = null; }
  // Bereits auf diesem Element mit laufendem Timer → NICHT neu starten
  // (verhindert Timer-Reset durch doppelte mouseenter/pointerenter Events)
  if(S.target === el) return;

  clearRing();
  S.target = el;
  el.classList.add("dwell-active");

  var svg = makeSvgRing();
  svg.style.setProperty("--dwell-duration",(S.dwellMs/1000)+"s");
  el.appendChild(svg);
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      var c = svg.querySelector("circle");
      if(c) c.classList.add("animating");
    });
  });

  S.dwellTimer = setTimeout(function(){
    S.dwellTimer = null;
    var target = S.target;
    clearRing();
    if(target && !isDisabled(target) && typeof S.onActivate === "function"){
      S.onActivate(target);
    }
  }, S.dwellMs);
}

function scheduledLeave(){
  if(S.leaveTimer){ clearTimeout(S.leaveTimer); S.leaveTimer = null; }
  S.leaveTimer = setTimeout(function(){
    S.leaveTimer = null;
    clearRing();
  }, S.leaveGrace);
}

function attachDwell(selector, opts){
  opts = opts || {};

  if(typeof opts.dwellMs    === "number") S.dwellMs    = opts.dwellMs;
  if(typeof opts.leaveGrace === "number") S.leaveGrace = opts.leaveGrace;
  if(typeof opts.onActivate === "function") S.onActivate = opts.onActivate;

  if(!S.onActivate){
    S.onActivate = function(el){
      var href = el.getAttribute("href");
      if(!href || href === "#") return;
      try{ window.location.assign(new URL(href, document.baseURI).href); }catch(e){}
    };
  }

  function cancelDwell(){
    clearRing();
    // Schutzzeit setzen — verhindert sofortige Auslösung nach rebindDwell()
    setProtection(1200);
    var bound = document.querySelectorAll("[data-dwell-bound]");
    for(var i=0;i<bound.length;i++){
      bound[i].removeAttribute("data-dwell-bound");
    }
  }

  var els = document.querySelectorAll(selector);
  for(var i=0;i<els.length;i++){
    (function(el){
      if(el.getAttribute("data-dwell-bound") === "1") return;
      el.setAttribute("data-dwell-bound","1");

      // Einzel-Flag verhindert Doppel-Start durch mouseenter + pointerenter
      // auf demselben Element im selben Moment (passiert bei <button>-Elementen)
      var _lastEnterTime = 0;

      el.addEventListener("mouseenter", function(){
        var now = Date.now();
        if(now - _lastEnterTime < 30) return; // Duplikat-Schutz: 30ms Fenster
        _lastEnterTime = now;
        if(getMode() === "mouse"){
          showRingOnly(el);
        } else {
          startDwell(el);
        }
      });

      // Tobii Accent sendet pointerenter statt mouseenter auf div/button-Elementen.
      el.addEventListener("pointerenter", function(){
        if(Date.now() < S.protectUntil) return;
        var now = Date.now();
        if(now - _lastEnterTime < 30) return; // Duplikat-Schutz
        _lastEnterTime = now;
        if(getMode() === "mouse"){
          showRingOnly(el);
        } else {
          startDwell(el);
        }
      });

      el.addEventListener("mouseleave", scheduledLeave);

      // Tobii: pointerleave mit deutlich längerer Grace-Zeit (Blickzittern)
      el.addEventListener("pointerleave", function(){
        if(S.leaveTimer){ clearTimeout(S.leaveTimer); S.leaveTimer = null; }
        S.leaveTimer = setTimeout(function(){
          S.leaveTimer = null;
          // Nur abbrechen wenn wirklich verlassen (kein pointerenter in der Zwischenzeit)
          if(S.target === el){
            clearRing();
          }
        }, S.pointerLeaveGrace);
      });

      // Klick-Handler — Ring abräumen beim Klick (beide Modi)
      // Der native click bubbled zur Event-Delegation in bindUI —
      // KEIN onActivate() hier aufrufen, das würde eine Endlosschleife erzeugen
      el.addEventListener("click", function(){
        if(isDisabled(el)) return;
        clearRing();
        // Schutzzeit kurz zurücksetzen damit Dwell nach Klick nicht sofort auslöst
        S.protectUntil = Date.now() + 500;
      });

      el.addEventListener("focus", function(){
        if(getMode() === "mouse") showRingOnly(el);
        else startDwell(el);
      });
      el.addEventListener("blur", scheduledLeave);
    })(els[i]);
  }

  return { cancelDwell: cancelDwell };
}

window.LaetitiaAttachDwell = attachDwell;

// Schutzzeit beim ersten Laden der Seite
setProtection(1500);

})();
