// pixelart_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";
var FARBEN=["#1a1a2e","#6b7280","#e5e7eb","#ef4444","#f97316","#fbbf24","#86efac","#22c55e","#166534","#06b6d4","#93c5fd","#3b82f6","#1e3a8a","#8b5cf6","#ec4899","#92400e","#fde68a","#ffffff"];
var VORLAGEN={
  frei:null,
  herz:{g:12,f:["#ef4444","#fca5a5"],m:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,2,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  stern:{g:12,f:["#fbbf24","#f97316"],m:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,2,1,2,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  haus:{g:12,f:["#ef4444","#f97316","#92400e","#fbbf24","#6b7280"],m:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,2,1,1,1,1,0,0,0,3,3,3,3,3,3,3,3,3,0,0,0,3,3,4,4,3,3,5,5,3,0,0,0,3,3,4,4,3,3,5,5,3,0,0,0,3,3,4,4,3,3,3,3,3,0,0,0,3,3,4,4,3,3,3,3,3,0,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  blume:{g:12,f:["#ec4899","#fbbf24","#22c55e"],m:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,2,1,1,0,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,0,1,1,2,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  smiley:{g:12,f:["#fbbf24","#1a1a2e","#ef4444"],m:[0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,2,1,1,1,2,1,1,1,0,0,1,1,2,1,1,1,2,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,3,1,1,1,1,3,1,1,0,0,1,1,1,3,3,3,3,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
};
var state={groesse:12,aktiveFarbe:"#ec4899",radierer:false,raster:[],history:[]};

function speichern(){
  try{
    var d=JSON.parse(localStorage.getItem("laetitia_pixelart")||"{}");
    d[state.groesse]=state.raster.slice();
    localStorage.setItem("laetitia_pixelart",JSON.stringify(d));
    zeigeStatus("Gespeichert! ✅");
  }catch(e){}
}
function ladeGespeichert(){
  try{
    var d=JSON.parse(localStorage.getItem("laetitia_pixelart")||"{}");
    return d[state.groesse]||null;
  }catch(e){return null;}
}
function zeigeStatus(msg){
  var el=document.getElementById("topTitelText");
  if(el){el.textContent=msg;setTimeout(function(){el.textContent="🟦 Pixel-Art";},2000);}
}

function baueRaster(vorlage){
  var g=state.groesse;
  var wrap=document.getElementById("rasterWrap");
  var maxPx=Math.min(wrap.clientWidth,wrap.clientHeight)-16;
  var px=Math.max(20,Math.floor(maxPx/g));
  var grid=document.getElementById("pixelRaster");
  grid.innerHTML="";
  grid.style.gridTemplateColumns="repeat("+g+","+px+"px)";
  grid.style.gridTemplateRows="repeat("+g+","+px+"px)";
  state.raster=[];
  var ges=ladeGespeichert();
  for(var i=0;i<g*g;i++){
    var farbe="#ffffff";
    if(vorlage&&vorlage.m&&i<vorlage.m.length){
      var idx=vorlage.m[i];
      farbe=idx===0?"#ffffff":(vorlage.f[idx-1]||"#ffffff");
    }else if(ges&&ges[i]){farbe=ges[i];}
    state.raster.push(farbe);
    var a=document.createElement("a");
    a.href="#"; a.className="pixel"; a.style.background=farbe;
    a.setAttribute("data-idx",i);
    a.addEventListener("click",function(ev){
      ev.preventDefault();
      var ix=parseInt(this.getAttribute("data-idx"));
      var nf=state.radierer?"#ffffff":state.aktiveFarbe;
      state.history.push({ix:ix,alt:state.raster[ix]});
      if(state.history.length>100)state.history.shift();
      state.raster[ix]=nf; this.style.background=nf;
      this.classList.add("popping");
      var s=this;setTimeout(function(){s.classList.remove("popping");},200);
    });
    grid.appendChild(a);
  }
  state.history=[];
  rebindDwell();
}

function baueFarben(){
  var grid=document.getElementById("farbGrid");
  FARBEN.forEach(function(farbe){
    var a=document.createElement("a");
    a.href="#"; a.className="farbBtn"+(farbe===state.aktiveFarbe?" gewaehlt":"");
    a.style.background=farbe;
    if(farbe==="#ffffff")a.style.border="3px solid #ccc";
    a.setAttribute("data-farbe",farbe);
    a.addEventListener("click",function(ev){
      ev.preventDefault(); state.aktiveFarbe=farbe; state.radierer=false;
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
  _dh=att("a.pixel, a.farbBtn, a.vorlagenBtn, a.topBtn, a.radierer, #btnZurueck",{
    dwellMs:ms,leaveGrace:lg,onActivate:function(el){try{el.click();}catch(e){}}
  });
}

document.getElementById("btnUndo").addEventListener("click",function(ev){ev.preventDefault();if(!state.history.length)return;var l=state.history.pop();state.raster[l.ix]=l.alt;var p=document.querySelector(".pixel[data-idx='"+l.ix+"']");if(p)p.style.background=l.alt;});
document.getElementById("btnReset").addEventListener("click",function(ev){ev.preventDefault();baueRaster(null);});
document.getElementById("btnSpeichern").addEventListener("click",function(ev){ev.preventDefault();speichern();});
document.getElementById("btnRadierer").addEventListener("click",function(ev){ev.preventDefault();state.radierer=!state.radierer;this.classList.toggle("aktiv",state.radierer);if(state.radierer)document.querySelectorAll(".farbBtn").forEach(function(b){b.classList.remove("gewaehlt");});});

[8,12,16].forEach(function(g){
  var btn=document.getElementById("btnG"+g);
  if(!btn)return;
  btn.addEventListener("click",function(ev){ev.preventDefault();state.groesse=g;[8,12,16].forEach(function(x){var b=document.getElementById("btnG"+x);if(b)b.classList.toggle("aktiv",x===g);});baueRaster(null);});
});

var vm={vFrei:"frei",vHerz:"herz",vStern:"stern",vHaus:"haus",vBlume:"blume",vSmiley:"smiley"};
Object.keys(vm).forEach(function(bid){
  var vid=vm[bid];
  var btn=document.getElementById(bid);
  if(!btn)return;
  btn.addEventListener("click",function(ev){
    ev.preventDefault();
    document.querySelectorAll(".vorlagenBtn").forEach(function(b){b.classList.remove("aktiv");});
    btn.classList.add("aktiv");
    var v=VORLAGEN[vid]||null;
    if(v&&v.g)state.groesse=v.g;
    [8,12,16].forEach(function(x){var b=document.getElementById("btnG"+x);if(b)b.classList.toggle("aktiv",x===state.groesse);});
    baueRaster(v);
  });
});

baueFarben(); baueRaster(null);
})();
