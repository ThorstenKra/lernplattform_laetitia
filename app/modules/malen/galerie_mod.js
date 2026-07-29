// galerie_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

// ── Gespeicherte Kunstwerke laden ─────────────────────────────────────────────
function ladeWerke(){
  var werke=[];

  // 1. Ausmalen
  try{
    var ausmal=JSON.parse(localStorage.getItem("laetitia_malen_ausmal")||"null");
    if(ausmal){
      Object.keys(ausmal).forEach(function(vorlagenId){
        werke.push({typ:"ausmal",id:vorlagenId,daten:ausmal[vorlagenId]});
      });
    }
  }catch(e){}

  // 2. Kleckse
  try{
    var kleckse=JSON.parse(localStorage.getItem("laetitia_kleckse")||"null");
    if(kleckse&&kleckse.length>0) werke.push({typ:"kleckse",daten:kleckse});
  }catch(e){}

  // 3. Stempel
  try{
    var stempel=JSON.parse(localStorage.getItem("laetitia_stempel")||"null");
    if(stempel&&stempel.platziert&&stempel.platziert.length>0) werke.push({typ:"stempel",daten:stempel});
  }catch(e){}

  // 4. Muster
  try{
    var muster=JSON.parse(localStorage.getItem("laetitia_muster")||"null");
    if(muster) werke.push({typ:"muster",daten:muster});
  }catch(e){}

  // 5. Gesichter
  try{
    var gesichter=JSON.parse(localStorage.getItem("laetitia_gesichter")||"null");
    if(gesichter) werke.push({typ:"gesichter",daten:gesichter});
  }catch(e){}

  // 6. Puzzle
  try{
    var puzzle=JSON.parse(localStorage.getItem("laetitia_puzzle")||"null");
    if(puzzle&&Object.keys(puzzle).length>0) werke.push({typ:"puzzle",daten:puzzle});
  }catch(e){}

  return werke;
}

var state={werke:[],aktuell:0,diashow:false,diashowTimer:null,fortschritt:0,fortTimer:null};
state.werke=ladeWerke();

// ── Vorschau-Rendering ────────────────────────────────────────────────────────
var WERKGROESSE=340;

function TITELNAMEN(){return{ausmal:"🖌️ Ausmalen",kleckse:"🎨 Kleckse",stempel:"🌟 Stempel",muster:"✨ Muster",gesichter:"🎭 Gesicht",puzzle:"🧩 Puzzle"};}

function renderWerk(werk){
  var div=document.createElement("div");
  div.className="werkCanvas einblenden";
  var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("width",WERKGROESSE); svg.setAttribute("height",WERKGROESSE);
  svg.setAttribute("viewBox","0 0 "+WERKGROESSE+" "+WERKGROESSE);

  if(werk.typ==="kleckse"){
    var bg=document.createElementNS("http://www.w3.org/2000/svg","rect");
    bg.setAttribute("width",WERKGROESSE); bg.setAttribute("height",WERKGROESSE); bg.setAttribute("fill","#fff");
    svg.appendChild(bg);
    (werk.daten||[]).forEach(function(k){
      var c=document.createElementNS("http://www.w3.org/2000/svg","circle");
      // Skalieren von ursprünglicher Größe
      var scale=WERKGROESSE/(k.leinwandSize||400);
      c.setAttribute("cx",k.x*scale); c.setAttribute("cy",k.y*scale); c.setAttribute("r",k.r*scale);
      c.setAttribute("fill",k.f); c.setAttribute("opacity","0.85");
      svg.appendChild(c);
    });
  } else if(werk.typ==="muster"){
    var d=werk.daten;
    var bg2=document.createElementNS("http://www.w3.org/2000/svg","rect");
    bg2.setAttribute("width",WERKGROESSE); bg2.setAttribute("height",WERKGROESSE); bg2.setAttribute("fill","#1a1a2e");
    svg.appendChild(bg2);
    // Vereinfachtes Muster neu zeichnen
    var n=d.linien||12; var farbe=d.farbe||"#ec4899";
    var r=WERKGROESSE*0.44; var cx=WERKGROESSE/2; var cy=WERKGROESSE/2;
    for(var i=0;i<n;i++){
      var w=(2*Math.PI*i/n)-Math.PI/2;
      var line=document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1",cx); line.setAttribute("y1",cy);
      line.setAttribute("x2",(cx+r*Math.cos(w)).toFixed(1)); line.setAttribute("y2",(cy+r*Math.sin(w)).toFixed(1));
      line.setAttribute("stroke",farbe); line.setAttribute("stroke-width","1.5"); line.setAttribute("opacity","0.8");
      svg.appendChild(line);
    }
  } else if(werk.typ==="stempel"){
    var d2=werk.daten;
    var bg3=document.createElementNS("http://www.w3.org/2000/svg","rect");
    bg3.setAttribute("width",WERKGROESSE); bg3.setAttribute("height",WERKGROESSE); bg3.setAttribute("fill",d2.hintergrund||"#fff");
    svg.appendChild(bg3);
    var GROESSEN={"small":"28px","medium":"42px","large":"60px"};
    var RASTER=5;
    (d2.platziert||[]).forEach(function(s){
      var fo=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
      var zg=WERKGROESSE/RASTER;
      var x=s.col*zg; var y=s.row*zg;
      fo.setAttribute("x",x); fo.setAttribute("y",y);
      fo.setAttribute("width",zg); fo.setAttribute("height",zg);
      var d3=document.createElement("div");
      d3.style.cssText="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:"+(parseInt(GROESSEN[s.groesse])*WERKGROESSE/400)+"px;line-height:1;";
      d3.textContent=s.stempel;
      fo.appendChild(d3);
      svg.appendChild(fo);
    });
  } else {
    // Fallback: leeres Bild mit Typ-Anzeige
    var bg4=document.createElementNS("http://www.w3.org/2000/svg","rect");
    bg4.setAttribute("width",WERKGROESSE); bg4.setAttribute("height",WERKGROESSE); bg4.setAttribute("fill","#f1f5f9");
    svg.appendChild(bg4);
    var t=document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",WERKGROESSE/2); t.setAttribute("y",WERKGROESSE/2);
    t.setAttribute("text-anchor","middle"); t.setAttribute("font-size","48"); t.textContent="🎨";
    svg.appendChild(t);
  }

  div.appendChild(svg);
  return div;
}

// ── Anzeige ───────────────────────────────────────────────────────────────────
function zeigeAktuell(){
  var bereich=document.getElementById("showBereich");
  // Altes Werk entfernen (außer Balken)
  var alt=bereich.querySelector(".werkAnzeige,.leerZustand");
  if(alt) alt.remove();

  if(state.werke.length===0){
    var leer=document.createElement("div");
    leer.className="leerZustand";
    leer.innerHTML='<div class="leerEmoji">🎨</div><div class="leerText">Noch keine Kunstwerke gespeichert</div><div class="leerSub">Male etwas und tippe auf 💾 Speichern!</div>';
    bereich.appendChild(leer);
    document.getElementById("navInfo").textContent="– / –";
    document.getElementById("btnVorig").setAttribute("aria-disabled","true");
    document.getElementById("btnWeiter").setAttribute("aria-disabled","true");
    return;
  }

  var werk=state.werke[state.aktuell];
  var container=document.createElement("div");
  container.className="werkAnzeige";
  var titel=document.createElement("div");
  titel.className="werkTitel";
  var namen=TITELNAMEN();
  titel.textContent=(namen[werk.typ]||werk.typ)+" ("+(state.aktuell+1)+" / "+state.werke.length+")";
  container.appendChild(titel);
  container.appendChild(renderWerk(werk));
  bereich.appendChild(container);

  document.getElementById("navInfo").textContent=(state.aktuell+1)+" / "+state.werke.length;
  document.getElementById("btnVorig").setAttribute("aria-disabled",state.aktuell===0?"true":"false");
  document.getElementById("btnWeiter").setAttribute("aria-disabled",state.aktuell>=state.werke.length-1?"true":"false");
  rebindDwell();
}

// ── Diashow ───────────────────────────────────────────────────────────────────
var DIASHOW_DAUER=4000;
function startDiashow(){
  if(state.werke.length<2){zeigeStatus("Zu wenig Werke für Diashow");return;}
  state.diashow=true;
  document.getElementById("btnDiashow").textContent="⏹ Stop";
  document.getElementById("btnDiashow").classList.add("aktiv");
  naechstesDia();
}
function stopDiashow(){
  state.diashow=false;
  clearTimeout(state.diashowTimer); clearInterval(state.fortTimer);
  document.getElementById("diashowBalken").style.width="0%";
  document.getElementById("btnDiashow").textContent="▶ Diashow";
  document.getElementById("btnDiashow").classList.remove("aktiv");
}
function naechstesDia(){
  if(!state.diashow)return;
  var start=Date.now();
  clearInterval(state.fortTimer);
  state.fortTimer=setInterval(function(){
    var p=Math.min(100,((Date.now()-start)/DIASHOW_DAUER)*100);
    document.getElementById("diashowBalken").style.width=p+"%";
    if(p>=100)clearInterval(state.fortTimer);
  },50);
  state.diashowTimer=setTimeout(function(){
    state.aktuell=(state.aktuell+1)%state.werke.length;
    zeigeAktuell();
    naechstesDia();
  },DIASHOW_DAUER);
}
function zeigeStatus(msg){
  var el=document.querySelector(".topTitel");
  if(el){el.textContent=msg;setTimeout(function(){el.textContent="🖼️ Meine Galerie";},2000);}
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _dh=null;
function rebindDwell(){
  var att=window.LaetitiaAttachDwell||function(){return{cancelDwell:function(){}};};
  if(_dh)_dh.cancelDwell();
  var ms=Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 800, 1000);
  var lg=parseInt(localStorage.getItem("laetitia_leave_grace_ms"))||100;
  _dh=att("a.navBtn, a.topBtn, #btnZurueck",{
    dwellMs:ms, leaveGrace:lg, onActivate:function(el){try{el.click();}catch(e){}}
  });
}

document.getElementById("btnVorig").addEventListener("click",function(ev){
  ev.preventDefault(); stopDiashow();
  if(state.aktuell>0){state.aktuell--;zeigeAktuell();}
});
document.getElementById("btnWeiter").addEventListener("click",function(ev){
  ev.preventDefault(); stopDiashow();
  if(state.aktuell<state.werke.length-1){state.aktuell++;zeigeAktuell();}
});
document.getElementById("btnDiashow").addEventListener("click",function(ev){
  ev.preventDefault();
  if(state.diashow)stopDiashow(); else startDiashow();
});

zeigeAktuell();
})();
