// muster_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var FARBEN = [
  "#ec4899","#f97316","#fbbf24","#22c55e",
  "#3b82f6","#8b5cf6","#06b6d4","#ffffff",
  "#ef4444","#86efac","#93c5fd","#fde68a"
];

var state = {
  muster: "kreis",
  farbe: "#ec4899",
  linien: 12,
  schritt: 0,
  animTimer: null
};

// ── SVG-Muster-Generatoren ────────────────────────────────────────────────────
function genKreis(cx, cy, r, n, farbe){
  var els = [];
  for(var i = 0; i < n; i++){
    var radius = r * (i + 1) / n;
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", cx); c.setAttribute("cy", cy);
    c.setAttribute("r", radius);
    c.setAttribute("fill","none");
    c.setAttribute("stroke", farbe);
    c.setAttribute("stroke-width", "1.5");
    c.setAttribute("opacity", 0.4 + 0.6 * (i / n));
    els.push(c);
  }
  return els;
}

function genStern(cx, cy, r, n, farbe){
  var els = [];
  for(var i = 0; i < n; i++){
    var winkel = (Math.PI * 2 * i) / n;
    var x2 = cx + r * Math.cos(winkel);
    var y2 = cy + r * Math.sin(winkel);
    var x3 = cx + r * Math.cos(winkel + Math.PI / n);
    var y3 = cy + r * Math.sin(winkel + Math.PI / n);
    var l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1", x2); l.setAttribute("y1", y2);
    l.setAttribute("x2", x3); l.setAttribute("y2", y3);
    l.setAttribute("stroke", farbe); l.setAttribute("stroke-width","1.5");
    l.setAttribute("opacity","0.85");
    els.push(l);
  }
  return els;
}

function genSpirale(cx, cy, r, n, farbe){
  var punkte = [];
  for(var i = 0; i <= n * 3; i++){
    var t = (i / (n * 3)) * Math.PI * 6;
    var radius = r * (i / (n * 3));
    punkte.push((cx + radius * Math.cos(t)).toFixed(1) + "," + (cy + radius * Math.sin(t)).toFixed(1));
  }
  var p = document.createElementNS("http://www.w3.org/2000/svg","polyline");
  p.setAttribute("points", punkte.join(" "));
  p.setAttribute("fill","none"); p.setAttribute("stroke", farbe);
  p.setAttribute("stroke-width","1.8"); p.setAttribute("opacity","0.9");
  return [p];
}

function genWelle(cx, cy, r, n, farbe){
  var els = [];
  for(var w = 0; w < 4; w++){
    var punkte = [];
    for(var i = 0; i <= 60; i++){
      var x = cx - r + (2 * r * i / 60);
      var y = cy + (r * 0.3 * (w - 1.5)) + (r * 0.15 * Math.sin(Math.PI * 2 * n * i / 60));
      punkte.push(x.toFixed(1) + "," + y.toFixed(1));
    }
    var pl = document.createElementNS("http://www.w3.org/2000/svg","polyline");
    pl.setAttribute("points", punkte.join(" "));
    pl.setAttribute("fill","none"); pl.setAttribute("stroke", farbe);
    pl.setAttribute("stroke-width","2"); pl.setAttribute("opacity", 0.5 + 0.15 * w);
    els.push(pl);
  }
  return els;
}

function genBlume(cx, cy, r, n, farbe){
  var els = [];
  for(var i = 0; i < n; i++){
    var winkel = (Math.PI * 2 * i) / n;
    var bx = cx + (r * 0.45) * Math.cos(winkel);
    var by = cy + (r * 0.45) * Math.sin(winkel);
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", bx); c.setAttribute("cy", by);
    c.setAttribute("r", r * 0.38);
    c.setAttribute("fill","none"); c.setAttribute("stroke", farbe);
    c.setAttribute("stroke-width","1.5"); c.setAttribute("opacity","0.75");
    els.push(c);
  }
  var kern = document.createElementNS("http://www.w3.org/2000/svg","circle");
  kern.setAttribute("cx", cx); kern.setAttribute("cy", cy);
  kern.setAttribute("r", r * 0.2);
  kern.setAttribute("fill", farbe); kern.setAttribute("opacity","0.5");
  els.push(kern);
  return els;
}

function genNetz(cx, cy, r, n, farbe){
  var els = [];
  var punkte = [];
  for(var i = 0; i < n; i++){
    var w = (Math.PI * 2 * i) / n;
    punkte.push([cx + r * Math.cos(w), cy + r * Math.sin(w)]);
  }
  for(var a = 0; a < punkte.length; a++){
    for(var b2 = a + 1; b2 < punkte.length; b2++){
      var l = document.createElementNS("http://www.w3.org/2000/svg","line");
      l.setAttribute("x1", punkte[a][0].toFixed(1)); l.setAttribute("y1", punkte[a][1].toFixed(1));
      l.setAttribute("x2", punkte[b2][0].toFixed(1)); l.setAttribute("y2", punkte[b2][1].toFixed(1));
      l.setAttribute("stroke", farbe); l.setAttribute("stroke-width","0.8"); l.setAttribute("opacity","0.4");
      els.push(l);
    }
  }
  return els;
}

function genDiamant(cx, cy, r, n, farbe){
  var els = [];
  for(var i = 1; i <= n; i++){
    var s = r * i / n;
    var poly = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    poly.setAttribute("points",
      cx+","+  (cy-s)+" "+
      (cx+s)+","+ cy+" "+
      cx+","+   (cy+s)+" "+
      (cx-s)+","+cy
    );
    poly.setAttribute("fill","none"); poly.setAttribute("stroke", farbe);
    poly.setAttribute("stroke-width","1.2"); poly.setAttribute("opacity", 0.3 + 0.7 * (i/n));
    els.push(poly);
  }
  return els;
}

function genStrahlen(cx, cy, r, n, farbe){
  var els = [];
  for(var i = 0; i < n; i++){
    var w = (Math.PI * 2 * i) / n;
    var l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1", cx); l.setAttribute("y1", cy);
    l.setAttribute("x2", (cx + r * Math.cos(w)).toFixed(1));
    l.setAttribute("y2", (cy + r * Math.sin(w)).toFixed(1));
    l.setAttribute("stroke", farbe); l.setAttribute("stroke-width","1.5");
    l.setAttribute("opacity", 0.4 + 0.6 * Math.abs(Math.cos(w)));
    els.push(l);
  }
  return els;
}

var GENERATOREN = {
  kreis: genKreis, stern: genStern, spirale: genSpirale,
  welle: genWelle, blume: genBlume, netz: genNetz,
  diamant: genDiamant, strahlen: genStrahlen
};

// ── Zeichnen ──────────────────────────────────────────────────────────────────
function zeichne(extra){
  var svg = document.getElementById("leinwand");
  var wrap = document.getElementById("leinwandWrap");
  var size = Math.min(wrap.clientWidth - 16, wrap.clientHeight - 16);
  svg.setAttribute("width", size); svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 " + size + " " + size);
  svg.style.background = "#1a1a2e";

  // Hintergrundrechteck
  svg.innerHTML = "";
  var bg = document.createElementNS("http://www.w3.org/2000/svg","rect");
  bg.setAttribute("width", size); bg.setAttribute("height", size);
  bg.setAttribute("fill","#1a1a2e");
  svg.appendChild(bg);

  var gen = GENERATOREN[state.muster] || genKreis;
  var n = extra || state.linien;
  var els = gen(size/2, size/2, size * 0.44, n, state.farbe);
  els.forEach(function(el){ svg.appendChild(el); });
}

function zeigeStatus(msg){
  var el = document.getElementById("topTitelText");
  if(el){ el.textContent = msg; setTimeout(function(){ el.textContent = "✨ Muster-Magie"; }, 2000); }
}

// ── Farbpalette ───────────────────────────────────────────────────────────────
function baueFarben(){
  var grid = document.getElementById("farbGrid");
  FARBEN.forEach(function(farbe){
    var a = document.createElement("a");
    a.href = "#"; a.className = "farbBtn" + (farbe === state.farbe ? " gewaehlt" : "");
    a.style.background = farbe; a.setAttribute("data-farbe", farbe);
    a.addEventListener("click", function(ev){
      ev.preventDefault(); state.farbe = farbe;
      grid.querySelectorAll(".farbBtn").forEach(function(b){ b.classList.toggle("gewaehlt", b.getAttribute("data-farbe") === farbe); });
      zeichne();
    });
    grid.appendChild(a);
  });
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _dh = null;
function rebindDwell(){
  var att = window.LaetitiaAttachDwell || function(){ return { cancelDwell: function(){} }; };
  if(_dh) _dh.cancelDwell();
  var ms = Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 700, 700);
  var lg = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
  _dh = att("a.musterBtn, a.farbBtn, a.schnellBtn, a.topBtn, a.animBtn, #btnZurueck",{
    dwellMs: ms, leaveGrace: lg,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
  });
}

// ── Buttons ───────────────────────────────────────────────────────────────────
document.querySelectorAll(".musterBtn").forEach(function(btn){
  btn.addEventListener("click", function(ev){
    ev.preventDefault();
    state.muster = btn.getAttribute("data-muster");
    document.querySelectorAll(".musterBtn").forEach(function(b){ b.classList.remove("aktiv"); });
    btn.classList.add("aktiv");
    zeichne();
  });
});

document.querySelectorAll(".schnellBtn").forEach(function(btn){
  btn.addEventListener("click", function(ev){
    ev.preventDefault();
    state.linien = parseInt(btn.getAttribute("data-n"));
    document.querySelectorAll(".schnellBtn").forEach(function(b){ b.classList.remove("aktiv"); });
    btn.classList.add("aktiv");
    zeichne();
  });
});

// Animieren: Linienanzahl schrittweise erhöhen
document.getElementById("btnAnimieren").addEventListener("click", function(ev){
  ev.preventDefault();
  if(state.animTimer){ clearInterval(state.animTimer); state.animTimer = null; this.textContent = "▶ Animieren"; return; }
  var self = this; var n = 1;
  self.textContent = "⏹ Stop";
  state.animTimer = setInterval(function(){
    zeichne(n);
    n++;
    if(n > state.linien){ clearInterval(state.animTimer); state.animTimer = null; self.textContent = "▶ Animieren"; }
  }, 80);
});

// Schritt: ein Schritt weiter
document.getElementById("btnAnim2").addEventListener("click", function(ev){
  ev.preventDefault();
  state.schritt = (state.schritt % state.linien) + 1;
  zeichne(state.schritt);
});

document.getElementById("btnNeu").addEventListener("click", function(ev){
  ev.preventDefault(); state.schritt = 0; zeichne();
});

document.getElementById("btnSpeichern").addEventListener("click", function(ev){
  ev.preventDefault();
  try{
    var svg = document.getElementById("leinwand");
    localStorage.setItem("laetitia_muster", JSON.stringify({ muster: state.muster, farbe: state.farbe, linien: state.linien }));
    zeigeStatus("Gespeichert! ✅");
  }catch(e){}
});

// ── Init ──────────────────────────────────────────────────────────────────────
try{
  var d = JSON.parse(localStorage.getItem("laetitia_muster") || "null");
  if(d){ state.muster = d.muster || "kreis"; state.farbe = d.farbe || "#ec4899"; state.linien = d.linien || 12; }
}catch(e){}

baueFarben();
zeichne();
rebindDwell();

})();
