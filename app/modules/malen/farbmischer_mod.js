// farbmischer_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

// Farbkreis-Segmente
var KREISFARBEN = [
  {name:"Rot",       hex:"#ef4444", h:0},
  {name:"Rot-Orange",hex:"#f97316", h:30},
  {name:"Orange",    hex:"#fb923c", h:45},
  {name:"Gelb-Orange",hex:"#fbbf24",h:60},
  {name:"Gelb",      hex:"#facc15", h:75},
  {name:"Gelb-Grün", hex:"#a3e635", h:90},
  {name:"Grün",      hex:"#22c55e", h:120},
  {name:"Blau-Grün", hex:"#10b981", h:150},
  {name:"Türkis",    hex:"#06b6d4", h:180},
  {name:"Blau",      hex:"#3b82f6", h:210},
  {name:"Blau-Violett",hex:"#6366f1",h:240},
  {name:"Violett",   hex:"#8b5cf6", h:270},
  {name:"Rot-Violett",hex:"#c026d3",h:300},
  {name:"Magenta",   hex:"#ec4899", h:330},
  {name:"Rosa",      hex:"#fb7185", h:345},
  {name:"Weiß",      hex:"#ffffff", h:-1},
  {name:"Schwarz",   hex:"#1a1a2e", h:-2}
];

var MISCHFARBEN = [
  "#ef4444","#f97316","#fbbf24","#22c55e","#3b82f6","#8b5cf6",
  "#ec4899","#06b6d4","#ffffff","#1a1a2e","#92400e","#fde68a"
];

// Bekannte Mischungen
var MISCHUNGEN = [
  {f1:"#ef4444",f2:"#fbbf24",ergebnis:"#f97316",name:"Orange"},
  {f1:"#fbbf24",f2:"#ef4444",ergebnis:"#f97316",name:"Orange"},
  {f1:"#ef4444",f2:"#3b82f6",ergebnis:"#8b5cf6",name:"Violett"},
  {f1:"#3b82f6",f2:"#ef4444",ergebnis:"#8b5cf6",name:"Violett"},
  {f1:"#fbbf24",f2:"#3b82f6",ergebnis:"#22c55e",name:"Grün"},
  {f1:"#3b82f6",f2:"#fbbf24",ergebnis:"#22c55e",name:"Grün"},
  {f1:"#ef4444",f2:"#ffffff",ergebnis:"#fca5a5",name:"Rosa"},
  {f1:"#ffffff",f2:"#ef4444",ergebnis:"#fca5a5",name:"Rosa"},
  {f1:"#3b82f6",f2:"#ffffff",ergebnis:"#bfdbfe",name:"Hellblau"},
  {f1:"#ffffff",f2:"#3b82f6",ergebnis:"#bfdbfe",name:"Hellblau"},
  {f1:"#fbbf24",f2:"#ffffff",ergebnis:"#fde68a",name:"Hellgelb"},
  {f1:"#1a1a2e",f2:"#ffffff",ergebnis:"#6b7280",name:"Grau"},
  {f1:"#ef4444",f2:"#1a1a2e",ergebnis:"#7f1d1d",name:"Dunkelrot"},
  {f1:"#ec4899",f2:"#8b5cf6",ergebnis:"#c026d3",name:"Magenta"},
  {f1:"#22c55e",f2:"#3b82f6",ergebnis:"#06b6d4",name:"Türkis"},
  {f1:"#3b82f6",f2:"#22c55e",ergebnis:"#06b6d4",name:"Türkis"},
  {f1:"#f97316",f2:"#fbbf24",ergebnis:"#fbbf24",name:"Goldgelb"},
  {f1:"#92400e",f2:"#ef4444",ergebnis:"#b45309",name:"Rostrot"}
];

var LERN = [
  "Rot + Gelb = Orange 🟠",
  "Rot + Blau = Violett 💜",
  "Gelb + Blau = Grün 💚",
  "Farbe + Weiß = heller ☀️",
  "Farbe + Schwarz = dunkler 🌙",
  "Rosa, Grün und Violett heißen Sekundärfarben",
  "Rot, Gelb und Blau heißen Primärfarben"
];

var state = { gewaehlt1: "#ef4444", gewaehlt2: "#3b82f6" };

// ── Farbkreis ─────────────────────────────────────────────────────────────────
function baueFarbkreis(){
  var svg = document.getElementById("farbkreisSvg");
  var cx = 140, cy = 140, r = 125, ri = 55;
  var n = 15; // äußere Segmente (ohne Weiß/Schwarz)
  svg.innerHTML = "";

  for(var i = 0; i < n; i++){
    var a1 = (2*Math.PI*i/n) - Math.PI/2;
    var a2 = (2*Math.PI*(i+1)/n) - Math.PI/2;
    var x1o = cx + r*Math.cos(a1), y1o = cy + r*Math.sin(a1);
    var x2o = cx + r*Math.cos(a2), y2o = cy + r*Math.sin(a2);
    var x1i = cx + ri*Math.cos(a1), y1i = cy + ri*Math.sin(a1);
    var x2i = cx + ri*Math.cos(a2), y2i = cy + ri*Math.sin(a2);
    var d = "M"+x1i.toFixed(1)+","+y1i.toFixed(1)+" L"+x1o.toFixed(1)+","+y1o.toFixed(1)+" A"+r+","+r+" 0 0,1 "+x2o.toFixed(1)+","+y2o.toFixed(1)+" L"+x2i.toFixed(1)+","+y2i.toFixed(1)+" A"+ri+","+ri+" 0 0,0 "+x1i.toFixed(1)+","+y1i.toFixed(1)+" Z";
    var farbe = KREISFARBEN[i];
    var path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",d); path.setAttribute("fill",farbe.hex);
    path.setAttribute("class","farbkreisSektor"); path.setAttribute("tabindex","0");
    path.setAttribute("data-hex",farbe.hex); path.setAttribute("data-name",farbe.name);
    path.addEventListener("click",function(){
      waehleFarbe(this.getAttribute("data-hex"), this.getAttribute("data-name"));
    });
    svg.appendChild(path);
  }
  // Weiß und Schwarz als kleine Kreise in der Mitte
  [{f:"#ffffff",n:"Weiß",cx:125,cy:140},{f:"#1a1a2e",n:"Schwarz",cx:155,cy:140}].forEach(function(s){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",s.cx); c.setAttribute("cy",s.cy); c.setAttribute("r","22");
    c.setAttribute("fill",s.f); c.setAttribute("stroke","#e5e7eb"); c.setAttribute("stroke-width","2");
    c.setAttribute("class","farbkreisSektor"); c.setAttribute("tabindex","0");
    c.setAttribute("data-hex",s.f); c.setAttribute("data-name",s.n);
    c.addEventListener("click",function(){ waehleFarbe(s.f,s.n); });
    svg.appendChild(c);
  });
}

function waehleFarbe(hex, name){
  document.getElementById("gewaehltBox").style.background = hex;
  document.getElementById("gewaehltName").textContent = name;
}

// ── Misch-Palette ─────────────────────────────────────────────────────────────
function baueMischPalette(containerId, auswahl){
  var grid = document.getElementById(containerId);
  grid.innerHTML = "";
  MISCHFARBEN.forEach(function(farbe){
    var a = document.createElement("a");
    a.href = "#"; a.className = "mischFarbBtn" + (farbe === auswahl ? " gewaehlt" : "");
    a.style.background = farbe;
    if(farbe==="#ffffff") a.style.border="3px solid #ccc";
    a.setAttribute("data-farbe",farbe);
    a.addEventListener("click",function(ev){
      ev.preventDefault();
      if(containerId==="farbAuswahl1") state.gewaehlt1=farbe;
      else state.gewaehlt2=farbe;
      grid.querySelectorAll(".mischFarbBtn").forEach(function(b){b.classList.toggle("gewaehlt",b.getAttribute("data-farbe")===farbe);});
      mischen();
    });
    grid.appendChild(a);
  });
}

function mischen(){
  var f1=state.gewaehlt1, f2=state.gewaehlt2;
  var gefunden=null;
  MISCHUNGEN.forEach(function(m){ if(m.f1===f1&&m.f2===f2) gefunden=m; });

  var ergebnis, info;
  if(gefunden){
    ergebnis=gefunden.ergebnis;
    info="✨ Ergibt: "+gefunden.name;
  } else {
    // Farben numerisch mischen
    var r1=parseInt(f1.slice(1,3),16), g1=parseInt(f1.slice(3,5),16), b1=parseInt(f1.slice(5,7),16);
    var r2=parseInt(f2.slice(1,3),16), g2=parseInt(f2.slice(3,5),16), b2=parseInt(f2.slice(5,7),16);
    var rm=Math.round((r1+r2)/2), gm=Math.round((g1+g2)/2), bm=Math.round((b1+b2)/2);
    ergebnis="#"+rm.toString(16).padStart(2,"0")+gm.toString(16).padStart(2,"0")+bm.toString(16).padStart(2,"0");
    info="Gemischte Farbe";
  }
  document.getElementById("ergebnisAnzeige").style.background=ergebnis;
  document.getElementById("ergebnisAnzeige").textContent="";
  document.getElementById("mischInfo").textContent=info;
}

// ── Lern-Einträge ─────────────────────────────────────────────────────────────
function baueLernListe(){
  var liste=document.getElementById("lernListe");
  LERN.forEach(function(l){
    var div=document.createElement("div");
    div.className="lernEintrag"; div.textContent=l;
    liste.appendChild(div);
  });
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _dh=null;
function rebindDwell(){
  var att=window.LaetitiaAttachDwell||function(){return{cancelDwell:function(){}};};
  if(_dh)_dh.cancelDwell();
  var ms=Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 700, 700);
  var lg=parseInt(localStorage.getItem("laetitia_leave_grace_ms"))||100;
  _dh=att("path.farbkreisSektor, circle.farbkreisSektor, a.mischFarbBtn, a.topBtn, #btnZurueck",{
    dwellMs:ms, leaveGrace:lg, onActivate:function(el){try{el.click();}catch(e){}}
  });
}

baueFarbkreis();
baueMischPalette("farbAuswahl1","#ef4444");
baueMischPalette("farbAuswahl2","#3b82f6");
baueLernListe();
mischen();
rebindDwell();
})();
