// kleckse_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";
var FARBEN=["#1a1a2e","#ef4444","#f97316","#fbbf24","#22c55e","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#86efac","#fde68a","#ffffff","#92400e","#6b7280","#fca5a5","#93c5fd","#bbf7d0","#ddd6fe"];
var ZELLENGROESSE = 40; // px pro Hover-Zelle
var state={ farbe:"#ec4899", groesse:22, radierer:false, kleckse:[], leinwandSize:400 };

function zeigeStatus(msg){ var el=document.getElementById("topTitelText"); if(el){el.textContent=msg;setTimeout(function(){el.textContent="🖌️ Kleckse";},2000);} }

function baueLeinwand(){
  var wrap=document.getElementById("leinwandWrap");
  var size=Math.min(wrap.clientWidth-16, wrap.clientHeight-16);
  state.leinwandSize=size;
  var svg=document.getElementById("leinwand");
  svg.setAttribute("width",size); svg.setAttribute("height",size);
  svg.setAttribute("viewBox","0 0 "+size+" "+size);
  svg.style.background="#fff";

  // Zellen-Grid aufbauen
  var grid=document.getElementById("zellenGrid");
  var lw=document.getElementById("leinwandWrap");
  var svgRect={left:(lw.clientWidth-size)/2, top:(lw.clientHeight-size)/2, width:size, height:size};
  grid.style.left=svgRect.left+"px"; grid.style.top=svgRect.top+"px";
  grid.style.width=size+"px"; grid.style.height=size+"px";
  var cols=Math.floor(size/ZELLENGROESSE);
  var rows=Math.floor(size/ZELLENGROESSE);
  grid.style.gridTemplateColumns="repeat("+cols+","+ZELLENGROESSE+"px)";
  grid.style.gridTemplateRows="repeat("+rows+","+ZELLENGROESSE+"px)";
  grid.innerHTML="";
  for(var r=0;r<rows;r++){
    for(var c=0;c<cols;c++){
      var a=document.createElement("a");
      a.href="#"; a.className="zelle";
      a.style.width=ZELLENGROESSE+"px"; a.style.height=ZELLENGROESSE+"px";
      var cx=(c+0.5)*ZELLENGROESSE; var cy=(r+0.5)*ZELLENGROESSE;
      (function(x,y){ a.addEventListener("click",function(ev){ ev.preventDefault(); setzeKlecks(x,y); }); })(cx,cy);
      grid.appendChild(a);
    }
  }
  renderAlleKleckse();
  rebindDwell();
}

function setzeKlecks(x,y){
  if(state.radierer){
    // Alle Kleckse entfernen die diesen Punkt treffen
    state.kleckse=state.kleckse.filter(function(k){ return Math.hypot(k.x-x,k.y-y)>k.r*0.8; });
  } else {
    state.kleckse.push({x:x,y:y,r:state.groesse,f:state.farbe});
  }
  renderAlleKleckse();
}

function renderAlleKleckse(){
  var svg=document.getElementById("leinwand");
  svg.innerHTML="";
  var bg=document.createElementNS("http://www.w3.org/2000/svg","rect");
  bg.setAttribute("width",state.leinwandSize); bg.setAttribute("height",state.leinwandSize); bg.setAttribute("fill","#fff");
  svg.appendChild(bg);
  state.kleckse.forEach(function(k){
    var c=document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",k.x); c.setAttribute("cy",k.y); c.setAttribute("r",k.r);
    c.setAttribute("fill",k.f); c.setAttribute("opacity","0.85");
    svg.appendChild(c);
  });
}

function baueFarben(){
  var grid=document.getElementById("farbGrid");
  FARBEN.forEach(function(farbe){
    var a=document.createElement("a");
    a.href="#"; a.className="farbBtn"+(farbe===state.farbe?" gewaehlt":"");
    a.style.background=farbe;
    if(farbe==="#ffffff")a.style.border="3px solid #ccc";
    a.setAttribute("data-farbe",farbe);
    a.addEventListener("click",function(ev){
      ev.preventDefault(); state.farbe=farbe; state.radierer=false;
      document.getElementById("btnRadierer").classList.remove("aktiv");
      grid.querySelectorAll(".farbBtn").forEach(function(b){b.classList.toggle("gewaehlt",b.getAttribute("data-farbe")===farbe);});
    });
    grid.appendChild(a);
  });
}

var _dh=null;
function rebindDwell(){
  var att=window.LaetitiaAttachDwell||function(){return{cancelDwell:function(){}};};
  if(_dh)_dh.cancelDwell();
  var ms=Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 700, 700);
  var lg=parseInt(localStorage.getItem("laetitia_leave_grace_ms"))||100;
  _dh=att("a.zelle, a.farbBtn, a.groesseBtn, a.topBtn, a.radierer, #btnZurueck",{
    dwellMs:ms, leaveGrace:lg, onActivate:function(el){try{el.click();}catch(e){}}
  });
}

document.querySelectorAll(".groesseBtn").forEach(function(btn){
  btn.addEventListener("click",function(ev){
    ev.preventDefault(); state.groesse=parseInt(btn.getAttribute("data-groesse"));
    document.querySelectorAll(".groesseBtn").forEach(function(b){b.classList.remove("aktiv");});
    btn.classList.add("aktiv");
  });
});
document.getElementById("btnRadierer").addEventListener("click",function(ev){
  ev.preventDefault(); state.radierer=!state.radierer;
  this.classList.toggle("aktiv",state.radierer);
  if(state.radierer)document.querySelectorAll(".farbBtn").forEach(function(b){b.classList.remove("gewaehlt");});
});
document.getElementById("btnUndo").addEventListener("click",function(ev){
  ev.preventDefault(); if(state.kleckse.length){state.kleckse.pop(); renderAlleKleckse();}
});
document.getElementById("btnReset").addEventListener("click",function(ev){
  ev.preventDefault(); state.kleckse=[]; renderAlleKleckse();
});
document.getElementById("btnSpeichern").addEventListener("click",function(ev){
  ev.preventDefault();
  try{ localStorage.setItem("laetitia_kleckse",JSON.stringify(state.kleckse)); zeigeStatus("Gespeichert! ✅"); }catch(e){}
});

// Gespeichertes laden
try{ var d=JSON.parse(localStorage.getItem("laetitia_kleckse")||"null"); if(d)state.kleckse=d; }catch(e){}

baueFarben();
baueLeinwand();
})();
