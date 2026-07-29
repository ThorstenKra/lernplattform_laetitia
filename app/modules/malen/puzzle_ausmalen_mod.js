// puzzle_ausmalen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";
var FARBEN=["#ffffff","#e5e7eb","#fbbf24","#f97316","#ef4444","#ec4899","#8b5cf6","#3b82f6","#06b6d4","#22c55e","#166534","#92400e","#1a1a2e","#fde68a","#bfdbfe","#86efac","#fca5a5","#ddd6fe"];

// Puzzle-Vorlagen: Array von {id, d, standardFarbe, label}
// Jedes Teil ist ein SVG-Pfad im 500x500 Koordinatensystem
var VORLAGEN = {
  land: {
    name:"Landschaft",
    teile:[
      {id:"l_himmel1", d:"M0,0 L250,0 L260,80 Q200,100 150,80 Q80,60 0,80 Z", f:"#bfdbfe", l:"Himmel links"},
      {id:"l_himmel2", d:"M250,0 L500,0 L500,80 Q420,60 350,80 Q300,100 260,80 Z", f:"#bfdbfe", l:"Himmel rechts"},
      {id:"l_sonne",   d:"M380,30 Q395,15 410,30 Q425,45 410,60 Q395,75 380,60 Q365,45 380,30 Z", f:"#fbbf24", l:"Sonne"},
      {id:"l_berg1",   d:"M0,80 Q80,60 150,80 L200,200 L0,200 Z", f:"#6b7280", l:"Berg links"},
      {id:"l_berg2",   d:"M260,80 Q300,100 350,80 Q420,60 500,80 L500,200 L200,200 Z", f:"#4b5563", l:"Berg rechts"},
      {id:"l_schnee1", d:"M100,120 L150,80 L200,120 Z", f:"#ffffff", l:"Schnee links"},
      {id:"l_schnee2", d:"M310,100 L350,80 L390,100 Z", f:"#ffffff", l:"Schnee rechts"},
      {id:"l_wiese1",  d:"M0,200 L500,200 Q480,240 400,250 Q300,265 250,260 Q150,265 80,250 Q30,240 0,230 Z", f:"#86efac", l:"Wiese vorn"},
      {id:"l_wiese2",  d:"M0,230 Q30,240 80,250 Q150,265 250,260 Q300,265 400,250 Q480,240 500,200 L500,320 L0,320 Z", f:"#22c55e", l:"Wiese mitte"},
      {id:"l_weg",     d:"M200,260 Q250,255 300,260 L320,320 L180,320 Z", f:"#e5e7eb", l:"Weg"},
      {id:"l_baum1",   d:"M80,320 L70,200 L90,200 Z", f:"#92400e", l:"Baum Stamm 1"},
      {id:"l_krone1",  d:"M80,160 Q95,130 110,160 Q120,190 80,195 Q40,190 50,160 Q65,130 80,160 Z", f:"#166534", l:"Baum Krone 1"},
      {id:"l_baum2",   d:"M400,320 L390,220 L410,220 Z", f:"#92400e", l:"Baum Stamm 2"},
      {id:"l_krone2",  d:"M400,180 Q415,150 430,180 Q440,205 400,210 Q360,205 370,180 Q385,150 400,180 Z", f:"#166534", l:"Baum Krone 2"},
      {id:"l_boden",   d:"M0,320 L500,320 L500,500 L0,500 Z", f:"#92400e", l:"Erde"},
      {id:"l_gras",    d:"M0,320 L500,320 Q480,340 380,345 Q280,355 250,352 Q180,355 120,345 Q40,340 0,330 Z", f:"#22c55e", l:"Gras"}
    ]
  },
  tier: {
    name:"Löwe",
    teile:[
      {id:"t_bg",     d:"M0,0 L500,0 L500,500 L0,500 Z", f:"#fde68a", l:"Hintergrund"},
      {id:"t_maehne", d:"M250,320 Q140,310 110,220 Q90,150 140,100 Q180,60 250,50 Q320,60 360,100 Q410,150 390,220 Q360,310 250,320 Z", f:"#f97316", l:"Mähne"},
      {id:"t_kopf",   d:"M250,290 Q170,280 150,210 Q135,150 180,115 Q210,88 250,85 Q290,88 320,115 Q365,150 350,210 Q330,280 250,290 Z", f:"#fbbf24", l:"Kopf"},
      {id:"t_gesicht",d:"M250,268 Q200,260 185,220 Q175,188 200,168 Q220,152 250,150 Q280,152 300,168 Q325,188 315,220 Q300,260 250,268 Z", f:"#fde68a", l:"Gesicht"},
      {id:"t_nase",   d:"M235,215 Q250,205 265,215 Q260,232 250,235 Q240,232 235,215 Z", f:"#f97316", l:"Nase"},
      {id:"t_aug_l",  d:"M208,178 Q215,168 225,175 Q230,185 220,192 Q210,192 208,178 Z", f:"#92400e", l:"Auge links"},
      {id:"t_aug_r",  d:"M275,178 Q285,168 292,178 Q292,192 282,192 Q272,185 275,178 Z", f:"#92400e", l:"Auge rechts"},
      {id:"t_ohr_l",  d:"M155,115 Q140,80 165,75 Q185,78 180,108 Z", f:"#fbbf24", l:"Ohr links"},
      {id:"t_ohr_r",  d:"M345,115 Q360,80 335,75 Q315,78 320,108 Z", f:"#fbbf24", l:"Ohr rechts"},
      {id:"t_koerper",d:"M160,320 Q120,380 140,450 Q180,490 250,490 Q320,490 360,450 Q380,380 340,320 Q300,340 250,340 Q200,340 160,320 Z", f:"#fbbf24", l:"Körper"},
      {id:"t_bauch",  d:"M190,355 Q250,340 310,355 Q320,410 250,430 Q180,410 190,355 Z", f:"#fde68a", l:"Bauch"},
      {id:"t_schw",   d:"M340,350 Q390,320 405,280 Q400,260 385,268 Q378,295 355,330 Z", f:"#fbbf24", l:"Schwanz"},
      {id:"t_schw2",  d:"M395,258 Q412,240 408,225 Q398,228 395,258 Z", f:"#f97316", l:"Schwanzspitze"}
    ]
  },
  meer: {
    name:"Meer",
    teile:[
      {id:"m_himmel",  d:"M0,0 L500,0 L500,180 L0,180 Z", f:"#bfdbfe", l:"Himmel"},
      {id:"m_sonne",   d:"M420,40 Q435,25 450,40 Q465,55 450,70 Q435,85 420,70 Q405,55 420,40 Z", f:"#fbbf24", l:"Sonne"},
      {id:"m_wolke1",  d:"M80,50 Q95,35 115,45 Q125,30 145,38 Q160,30 170,45 Q185,40 185,55 Q185,70 170,70 L80,70 Q65,70 65,58 Q65,45 80,50 Z", f:"#ffffff", l:"Wolke 1"},
      {id:"m_wolke2",  d:"M280,30 Q295,18 310,25 Q318,15 335,22 Q348,15 355,28 Q368,25 368,38 Q368,50 355,50 L280,50 Q268,50 268,40 Q268,28 280,30 Z", f:"#ffffff", l:"Wolke 2"},
      {id:"m_meer1",   d:"M0,180 Q125,160 250,175 Q375,190 500,170 L500,260 Q375,280 250,265 Q125,250 0,270 Z", f:"#3b82f6", l:"Meer oben"},
      {id:"m_meer2",   d:"M0,270 Q125,250 250,265 Q375,280 500,260 L500,350 Q375,370 250,355 Q125,340 0,360 Z", f:"#2563eb", l:"Meer mitte"},
      {id:"m_meer3",   d:"M0,360 Q125,340 250,355 Q375,370 500,350 L500,440 Q375,460 250,445 Q125,430 0,450 Z", f:"#1d4ed8", l:"Meer tief"},
      {id:"m_sand",    d:"M0,450 Q125,430 250,445 Q375,460 500,440 L500,500 L0,500 Z", f:"#fde68a", l:"Sand"},
      {id:"m_insel",   d:"M175,355 Q200,340 250,338 Q300,340 325,355 Q330,375 250,380 Q170,375 175,355 Z", f:"#fde68a", l:"Insel"},
      {id:"m_palme_s", d:"M248,380 L244,320 L256,320 Z", f:"#92400e", l:"Palme Stamm"},
      {id:"m_palme_b1",d:"M250,320 Q285,300 305,310 Q290,328 250,328 Z", f:"#166534", l:"Palme Blatt 1"},
      {id:"m_palme_b2",d:"M250,320 Q215,300 195,310 Q210,328 250,328 Z", f:"#166534", l:"Palme Blatt 2"},
      {id:"m_palme_b3",d:"M250,318 Q250,290 262,275 Q272,285 268,318 Z", f:"#166534", l:"Palme Blatt 3"},
      {id:"m_fisch1",  d:"M100,300 Q120,290 135,300 Q120,310 100,300 Z", f:"#f97316", l:"Fisch 1"},
      {id:"m_fisch2",  d:"M360,330 Q380,320 395,330 Q380,340 360,330 Z", f:"#ec4899", l:"Fisch 2"}
    ]
  },
  all: {
    name:"Weltall",
    teile:[
      {id:"a_bg",     d:"M0,0 L500,0 L500,500 L0,500 Z", f:"#1a1a2e", l:"Weltall"},
      {id:"a_planet1",d:"M250,250 Q310,250 330,290 Q350,330 310,360 Q270,390 230,370 Q185,345 185,300 Q185,250 250,250 Z", f:"#8b5cf6", l:"Planet groß"},
      {id:"a_ring",   d:"M160,310 Q185,275 250,268 Q315,262 355,285 Q380,300 355,320 Q325,340 250,345 Q175,350 150,330 Q138,322 160,310 Z", f:"#6d28d9", l:"Planetenring"},
      {id:"a_ring2",  d:"M170,308 Q200,285 250,280 Q300,275 340,295 Q310,310 250,315 Q190,320 165,308 Z", f:"#1a1a2e", l:"Ring Mitte"},
      {id:"a_mond",   d:"M380,80 Q400,62 420,78 Q438,95 420,112 Q400,128 382,110 Q365,93 380,80 Z", f:"#fde68a", l:"Mond"},
      {id:"a_rakete_k",d:"M130,180 Q140,150 150,130 Q160,150 170,180 Z", f:"#ef4444", l:"Rakete Spitze"},
      {id:"a_rakete_r",d:"M130,180 L170,180 L170,260 L130,260 Z", f:"#e5e7eb", l:"Rakete Rumpf"},
      {id:"a_rakete_f",d:"M120,260 L130,240 L130,260 Z", f:"#f97316", l:"Flosse links"},
      {id:"a_rakete_f2",d:"M170,260 L170,240 L180,260 Z", f:"#f97316", l:"Flosse rechts"},
      {id:"a_feuer",  d:"M135,260 Q150,285 165,260 Q158,295 150,300 Q142,295 135,260 Z", f:"#f97316", l:"Feuer"},
      {id:"a_stern1", d:"M60,60 L63,72 L75,72 L66,79 L69,91 L60,84 L51,91 L54,79 L45,72 L57,72 Z", f:"#fbbf24", l:"Stern 1"},
      {id:"a_stern2", d:"M430,200 L432,208 L440,208 L434,213 L436,221 L430,217 L424,221 L426,213 L420,208 L428,208 Z", f:"#fbbf24", l:"Stern 2"},
      {id:"a_stern3", d:"M80,380 L82,388 L90,388 L84,393 L86,401 L80,397 L74,401 L76,393 L70,388 L78,388 Z", f:"#fbbf24", l:"Stern 3"},
      {id:"a_stern4", d:"M440,400 L442,408 L450,408 L444,413 L446,421 L440,417 L434,421 L436,413 L430,408 L438,408 Z", f:"#fbbf24", l:"Stern 4"},
      {id:"a_komet",  d:"M300,100 Q340,80 380,60 Q360,90 320,110 Z", f:"#93c5fd", l:"Komet"}
    ]
  },
  stadt: {
    name:"Stadt",
    teile:[
      {id:"s_himmel",  d:"M0,0 L500,0 L500,200 L0,200 Z", f:"#bfdbfe", l:"Himmel"},
      {id:"s_sonne",   d:"M450,50 Q462,38 474,50 Q486,62 474,74 Q462,86 450,74 Q438,62 450,50 Z", f:"#fbbf24", l:"Sonne"},
      {id:"s_geb1",    d:"M0,200 L0,380 L80,380 L80,160 L40,130 Z", f:"#6b7280", l:"Gebäude 1"},
      {id:"s_geb2",    d:"M80,200 L80,380 L180,380 L180,120 L130,90 Z", f:"#9ca3af", l:"Gebäude 2"},
      {id:"s_geb3",    d:"M180,200 L180,380 L300,380 L300,80 L240,50 Z", f:"#6b7280", l:"Gebäude 3"},
      {id:"s_geb4",    d:"M300,200 L300,380 L400,380 L400,140 L350,110 Z", f:"#4b5563", l:"Gebäude 4"},
      {id:"s_geb5",    d:"M400,200 L400,380 L500,380 L500,170 L450,140 Z", f:"#9ca3af", l:"Gebäude 5"},
      {id:"s_fen1a",   d:"M20,220 L50,220 L50,250 L20,250 Z", f:"#fbbf24", l:"Fenster 1a"},
      {id:"s_fen1b",   d:"M20,270 L50,270 L50,300 L20,300 Z", f:"#fbbf24", l:"Fenster 1b"},
      {id:"s_fen2a",   d:"M100,180 L130,180 L130,210 L100,210 Z", f:"#fbbf24", l:"Fenster 2a"},
      {id:"s_fen2b",   d:"M100,230 L130,230 L130,260 L100,260 Z", f:"#93c5fd", l:"Fenster 2b"},
      {id:"s_fen3a",   d:"M200,120 L230,120 L230,150 L200,150 Z", f:"#fbbf24", l:"Fenster 3a"},
      {id:"s_fen3b",   d:"M200,170 L230,170 L230,200 L200,200 Z", f:"#93c5fd", l:"Fenster 3b"},
      {id:"s_fen3c",   d:"M250,120 L280,120 L280,150 L250,150 Z", f:"#fde68a", l:"Fenster 3c"},
      {id:"s_fen4a",   d:"M315,160 L345,160 L345,190 L315,190 Z", f:"#fbbf24", l:"Fenster 4a"},
      {id:"s_fen4b",   d:"M315,210 L345,210 L345,240 L315,240 Z", f:"#93c5fd", l:"Fenster 4b"},
      {id:"s_strasse", d:"M0,380 L500,380 L500,500 L0,500 Z", f:"#6b7280", l:"Straße"},
      {id:"s_weg",     d:"M0,450 L500,450 L500,500 L0,500 Z", f:"#9ca3af", l:"Gehweg"},
      {id:"s_mittel",  d:"M0,408 L500,408 L500,418 L0,418 Z", f:"#fbbf24", l:"Mittelstreifen"}
    ]
  }
};

var state={ vorlage:"land", farbe:"#3b82f6", farben:{}, history:[] };

function zeigeStatus(msg){ var el=document.getElementById("topTitelText"); if(el){el.textContent=msg;setTimeout(function(){el.textContent="🧩 Puzzle ausmalen";},2000);} }

function ladeSpeicherstand(){
  try{ var d=JSON.parse(localStorage.getItem("laetitia_puzzle")||"{}"); state.farben=d; }catch(e){}
}
function speichern(){
  try{ localStorage.setItem("laetitia_puzzle",JSON.stringify(state.farben)); zeigeStatus("Gespeichert! ✅"); }catch(e){}
}

function aktualisiereFortschritt(){
  var v=VORLAGEN[state.vorlage];
  var gesamt=v.teile.length;
  var ausgemalt=v.teile.filter(function(t){ return state.farben[state.vorlage+"_"+t.id] && state.farben[state.vorlage+"_"+t.id]!==t.f; }).length;
  var el=document.getElementById("fortschritt");
  if(el) el.textContent = ausgemalt+" / "+gesamt+" Teile verändert";
}

function baueVorlage(vid){
  state.vorlage=vid;
  var v=VORLAGEN[vid];
  var wrap=document.getElementById("leinwandWrap");
  var size=Math.min(wrap.clientWidth-16, wrap.clientHeight-40);
  var svg=document.getElementById("puzzleSvg");
  svg.setAttribute("width",size); svg.setAttribute("height",size);
  svg.setAttribute("viewBox","0 0 500 500");
  svg.innerHTML="";
  v.teile.forEach(function(t){
    var el=document.createElementNS("http://www.w3.org/2000/svg","path");
    el.setAttribute("d",t.d);
    var gespeichert=state.farben[vid+"_"+t.id];
    el.setAttribute("fill",gespeichert||t.f);
    el.setAttribute("class","puzzleTeil");
    el.setAttribute("id","pt_"+t.id);
    el.setAttribute("title",t.l);
    el.addEventListener("click",function(){
      var alteFarbe=el.getAttribute("fill");
      state.history.push({vid:vid,id:t.id,alt:alteFarbe});
      if(state.history.length>50)state.history.shift();
      el.setAttribute("fill",state.farbe);
      state.farben[vid+"_"+t.id]=state.farbe;
      el.classList.add("popping");
      setTimeout(function(){el.classList.remove("popping");},250);
      aktualisiereFortschritt();
    });
    svg.appendChild(el);
  });
  aktualisiereFortschritt();
  rebindDwell();
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
      ev.preventDefault(); state.farbe=farbe;
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
  _dh=att("path.puzzleTeil, a.farbBtn, a.vorlagenBtn, a.topBtn, #btnZurueck",{
    dwellMs:ms, leaveGrace:lg, onActivate:function(el){try{el.click();}catch(e){}}
  });
}

document.querySelectorAll(".vorlagenBtn").forEach(function(btn){
  btn.addEventListener("click",function(ev){
    ev.preventDefault();
    document.querySelectorAll(".vorlagenBtn").forEach(function(b){b.classList.remove("aktiv");});
    btn.classList.add("aktiv");
    baueVorlage(btn.getAttribute("data-vorlage"));
  });
});
document.getElementById("btnUndo").addEventListener("click",function(ev){
  ev.preventDefault();
  if(!state.history.length)return;
  var last=state.history.pop();
  var el=document.getElementById("pt_"+last.id);
  if(el){el.setAttribute("fill",last.alt); state.farben[last.vid+"_"+last.id]=last.alt;}
  aktualisiereFortschritt();
});
document.getElementById("btnReset").addEventListener("click",function(ev){
  ev.preventDefault();
  var v=VORLAGEN[state.vorlage];
  v.teile.forEach(function(t){ state.farben[state.vorlage+"_"+t.id]=t.f; var el=document.getElementById("pt_"+t.id); if(el)el.setAttribute("fill",t.f); });
  state.history=[]; aktualisiereFortschritt();
});
document.getElementById("btnSpeichern").addEventListener("click",function(ev){ev.preventDefault();speichern();});

ladeSpeicherstand(); baueFarben(); baueVorlage("land");
})();
