// stempel_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var HINTERGRUNDFARBEN = [
  "#ffffff","#fffbf0","#fef9c3","#fce7f3","#ede9fe","#dbeafe",
  "#dcfce7","#ffedd5","#f1f5f9","#fde68a","#bfdbfe","#bbf7d0"
];

var GROESSEN = { small: "28px", medium: "42px", large: "60px" };
var RASTER = 5; // 5x5 Positionen

var state = {
  aktiverStempel: "⭐",
  aktiveFarbe: "#ffffff",
  aktiveGroesse: "medium",
  platziert: [],    // [{stempel, row, col, groesse}]
  hintergrund: "#ffffff"
};

// ── Leinwand aufbauen ────────────────────────────────────────────────────────
function baueLeinwand(){
  var wrap = document.getElementById("leinwandWrap");
  var leinwand = document.getElementById("leinwand");
  var posGrid  = document.getElementById("posGrid");

  var maxW = wrap.clientWidth  - 24;
  var maxH = wrap.clientHeight - 24;
  var size = Math.min(maxW, maxH);

  leinwand.style.width  = size + "px";
  leinwand.style.height = size + "px";
  leinwand.style.background = state.hintergrund;

  posGrid.style.gridTemplateColumns = "repeat(" + RASTER + ", 1fr)";
  posGrid.style.gridTemplateRows    = "repeat(" + RASTER + ", 1fr)";
  posGrid.innerHTML = "";

  for(var row = 0; row < RASTER; row++){
    for(var col = 0; col < RASTER; col++){
      var a = document.createElement("a");
      a.href = "#";
      a.className = "posBtn";
      a.setAttribute("data-row", row);
      a.setAttribute("data-col", col);
      (function(r, c){
        a.addEventListener("click", function(ev){
          ev.preventDefault();
          platziere(r, c);
        });
      })(row, col);
      posGrid.appendChild(a);
    }
  }

  // Gespeicherte Stempel neu zeichnen
  renderAllStempel();
  rebindDwell();
}

function platziere(row, col){
  // Stempel platzieren
  var eintrag = { stempel: state.aktiverStempel, row: row, col: col, groesse: state.aktiveGroesse };
  state.platziert.push(eintrag);
  renderStempel(eintrag, state.platziert.length - 1);
  rebindDwell();
}

function renderAllStempel(){
  // Alle alten Stempel-Divs entfernen
  var leinwand = document.getElementById("leinwand");
  leinwand.querySelectorAll(".platzierterStempel").forEach(function(el){ el.remove(); });
  state.platziert.forEach(function(e, i){ renderStempel(e, i); });
}

function renderStempel(e, idx){
  var leinwand = document.getElementById("leinwand");
  var size = parseFloat(leinwand.style.width) || 400;
  var zellGroesse = size / RASTER;

  var div = document.createElement("div");
  div.className = "platzierterStempel";
  div.textContent = e.stempel;
  div.style.fontSize = GROESSEN[e.groesse] || "42px";
  div.style.left = (e.col * zellGroesse + zellGroesse / 2) + "px";
  div.style.top  = (e.row * zellGroesse + zellGroesse / 2) + "px";
  div.setAttribute("data-idx", idx);
  leinwand.appendChild(div);
}

// ── Farbpalette Hintergrund ──────────────────────────────────────────────────
function baueFarben(){
  var grid = document.getElementById("farbGrid");
  HINTERGRUNDFARBEN.forEach(function(farbe){
    var a = document.createElement("a");
    a.href = "#";
    a.className = "farbBtn" + (farbe === state.hintergrund ? " gewaehlt" : "");
    a.style.background = farbe;
    if(farbe === "#ffffff") a.style.border = "3px solid #ccc";
    a.setAttribute("data-farbe", farbe);
    a.addEventListener("click", function(ev){
      ev.preventDefault();
      state.hintergrund = farbe;
      document.getElementById("leinwand").style.background = farbe;
      grid.querySelectorAll(".farbBtn").forEach(function(b){
        b.classList.toggle("gewaehlt", b.getAttribute("data-farbe") === farbe);
      });
    });
    grid.appendChild(a);
  });
}

// ── Speichern ────────────────────────────────────────────────────────────────
function speichern(){
  try{
    localStorage.setItem("laetitia_stempel", JSON.stringify({
      platziert: state.platziert,
      hintergrund: state.hintergrund
    }));
    zeigeStatus("Gespeichert! ✅");
  }catch(e){}
}
function laden(){
  try{
    var d = JSON.parse(localStorage.getItem("laetitia_stempel") || "null");
    if(d){ state.platziert = d.platziert || []; state.hintergrund = d.hintergrund || "#ffffff"; }
  }catch(e){}
}

function zeigeStatus(msg){
  var el = document.getElementById("topTitelText");
  if(el){ el.textContent = msg; setTimeout(function(){ el.textContent = "🌟 Stempel"; }, 2000); }
}

// ── Dwell ────────────────────────────────────────────────────────────────────
var _dh = null;
function rebindDwell(){
  var att = window.LaetitiaAttachDwell || function(){ return { cancelDwell: function(){} }; };
  if(_dh) _dh.cancelDwell();
  var ms = Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 700, 700);
  var lg = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
  _dh = att("a.stempelBtn, a.posBtn, a.groesseBtn, a.farbBtn, a.topBtn, #btnZurueck",{
    dwellMs: ms, leaveGrace: lg,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
  });
}

// ── Buttons ──────────────────────────────────────────────────────────────────
document.querySelectorAll(".stempelBtn").forEach(function(btn){
  btn.addEventListener("click", function(ev){
    ev.preventDefault();
    state.aktiverStempel = btn.getAttribute("data-stempel");
    document.querySelectorAll(".stempelBtn").forEach(function(b){ b.classList.remove("gewaehlt"); });
    btn.classList.add("gewaehlt");
  });
});

document.querySelectorAll(".groesseBtn").forEach(function(btn){
  btn.addEventListener("click", function(ev){
    ev.preventDefault();
    state.aktiveGroesse = btn.getAttribute("data-groesse");
    document.querySelectorAll(".groesseBtn").forEach(function(b){ b.classList.remove("aktiv"); });
    btn.classList.add("aktiv");
  });
});

document.getElementById("btnUndo").addEventListener("click", function(ev){
  ev.preventDefault();
  if(!state.platziert.length) return;
  state.platziert.pop();
  renderAllStempel();
  rebindDwell();
});

document.getElementById("btnReset").addEventListener("click", function(ev){
  ev.preventDefault();
  state.platziert = [];
  renderAllStempel();
  rebindDwell();
});

document.getElementById("btnSpeichern").addEventListener("click", function(ev){ ev.preventDefault(); speichern(); });

// ── Init ─────────────────────────────────────────────────────────────────────
laden();
baueFarben();
baueLeinwand();

})();
