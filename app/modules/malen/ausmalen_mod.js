// ausmalen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

// ══════════════════════════════════════════════════════════════════════════════
// ausmalen.js — SVG-Ausmalen Modul
// REGEL 1: Kein import(), REGEL 4: Nur gerade Anfuehrungszeichen
// ══════════════════════════════════════════════════════════════════════════════
(function(){
"use strict";

// ── Farbpalette (18 Farben) ──────────────────────────────────────────────────
var FARBEN = [
  { name:"Weiß",         hex:"#ffffff" },
  { name:"Hellgrau",     hex:"#e5e7eb" },
  { name:"Grau",         hex:"#6b7280" },
  { name:"Schwarz",      hex:"#1a1a2e" },
  { name:"Rot",          hex:"#ef4444" },
  { name:"Dunkelrot",    hex:"#991b1b" },
  { name:"Orange",       hex:"#f97316" },
  { name:"Gelb",         hex:"#fbbf24" },
  { name:"Hellgrün",     hex:"#86efac" },
  { name:"Grün",         hex:"#22c55e" },
  { name:"Dunkelgrün",   hex:"#166534" },
  { name:"Türkis",       hex:"#06b6d4" },
  { name:"Hellblau",     hex:"#93c5fd" },
  { name:"Blau",         hex:"#3b82f6" },
  { name:"Dunkelblau",   hex:"#1e3a8a" },
  { name:"Lila",         hex:"#8b5cf6" },
  { name:"Pink",         hex:"#ec4899" },
  { name:"Braun",        hex:"#92400e" }
];

// ── SVG-Vorlagen ─────────────────────────────────────────────────────────────
// Jede Vorlage: id, name, emoji, thema, flaechen[]
// flaechen: { id, d (SVG-Pfad oder rx/ry fuer Ellipse), form, cx,cy,rx,ry fuer Kreise }

var VORLAGEN = [

  // ── TIERE ──────────────────────────────────────────────────────────────────
  {
    id:"katze", name:"Katze", emoji:"🐱", thema:"Tiere",
    flaechen:[
      { id:"k_kopf",    fill:"#f97316", d:"M150,180 Q150,100 250,100 Q350,100 350,180 Q370,260 250,280 Q130,260 150,180 Z" },
      { id:"k_ohr_l",   fill:"#f97316", d:"M160,155 L145,90 L215,130 Z" },
      { id:"k_ohr_r",   fill:"#f97316", d:"M340,155 L355,90 L285,130 Z" },
      { id:"k_ohr_li",  fill:"#ec4899", d:"M167,150 L155,100 L210,132 Z" },
      { id:"k_ohr_ri",  fill:"#ec4899", d:"M333,150 L345,100 L290,132 Z" },
      { id:"k_gesicht", fill:"#fde68a", d:"M190,175 Q250,160 310,175 Q320,220 250,235 Q180,220 190,175 Z" },
      { id:"k_nase",    fill:"#ec4899", d:"M238,205 L250,215 L262,205 Q250,195 238,205 Z" },
      { id:"k_aug_l",   fill:"#22c55e", form:"ellipse", cx:205, cy:185, rx:18, ry:14 },
      { id:"k_aug_r",   fill:"#22c55e", form:"ellipse", cx:295, cy:185, rx:18, ry:14 },
      { id:"k_pupil_l", fill:"#1a1a2e", form:"ellipse", cx:205, cy:185, rx:7, ry:12 },
      { id:"k_pupil_r", fill:"#1a1a2e", form:"ellipse", cx:295, cy:185, rx:7, ry:12 },
      { id:"k_koerper", fill:"#f97316", d:"M170,275 Q140,360 150,420 Q200,450 250,450 Q300,450 350,420 Q360,360 330,275 Q290,300 250,300 Q210,300 170,275 Z" },
      { id:"k_bauch",   fill:"#fde68a", d:"M200,300 Q250,290 300,300 Q310,360 250,380 Q190,360 200,300 Z" },
      { id:"k_schw",    fill:"#f97316", d:"M340,380 Q400,340 420,280 Q430,250 410,240 Q390,250 390,280 Q380,320 330,360 Z" },
      { id:"k_pf_vl",   fill:"#f97316", d:"M180,400 Q165,430 170,455 Q185,460 200,455 Q205,430 195,400 Z" },
      { id:"k_pf_vr",   fill:"#f97316", d:"M320,400 Q335,430 330,455 Q315,460 300,455 Q295,430 305,400 Z" }
    ]
  },

  {
    id:"vogel", name:"Vogel", emoji:"🐦", thema:"Tiere",
    flaechen:[
      { id:"v_koerper", fill:"#3b82f6", d:"M180,220 Q160,280 180,340 Q220,380 280,370 Q340,355 355,290 Q365,230 320,200 Q280,175 230,185 Z" },
      { id:"v_kopf",    fill:"#3b82f6", d:"M280,175 Q290,120 320,110 Q350,105 355,130 Q360,155 335,170 Q310,185 280,175 Z" },
      { id:"v_auge",    fill:"#ffffff", form:"ellipse", cx:325, cy:138, rx:12, ry:12 },
      { id:"v_pupille", fill:"#1a1a2e", form:"ellipse", cx:328, cy:138, rx:6,  ry:6 },
      { id:"v_schnab",  fill:"#fbbf24", d:"M350,140 L385,148 L350,156 Z" },
      { id:"v_flueg_l", fill:"#1e3a8a", d:"M185,240 Q120,210 100,260 Q95,310 150,320 Q185,315 195,280 Z" },
      { id:"v_flueg_r", fill:"#1e3a8a", d:"M350,240 Q390,230 400,270 Q405,310 370,330 Q345,325 340,285 Z" },
      { id:"v_bauch",   fill:"#e0f2fe", d:"M210,260 Q250,240 290,255 Q310,295 280,340 Q250,355 220,340 Q195,300 210,260 Z" },
      { id:"v_bein_l",  fill:"#fbbf24", d:"M220,368 L210,410 L225,415 L235,375 Z" },
      { id:"v_bein_r",  fill:"#fbbf24", d:"M270,368 L280,410 L265,415 L255,375 Z" },
      { id:"v_fuss_l",  fill:"#fbbf24", d:"M210,410 L195,425 L210,428 L225,415 Z" },
      { id:"v_fuss_r",  fill:"#fbbf24", d:"M280,410 L295,425 L280,428 L265,415 Z" }
    ]
  },

  {
    id:"hund", name:"Hund", emoji:"🐶", thema:"Tiere",
    flaechen:[
      { id:"h_kopf",    fill:"#92400e", d:"M155,170 Q155,90 250,85 Q345,90 345,170 Q355,250 250,265 Q145,250 155,170 Z" },
      { id:"h_ohr_l",   fill:"#92400e", d:"M155,155 Q100,130 110,200 Q120,240 165,220 Q160,185 155,155 Z" },
      { id:"h_ohr_r",   fill:"#92400e", d:"M345,155 Q400,130 390,200 Q380,240 335,220 Q340,185 345,155 Z" },
      { id:"h_gesicht", fill:"#fde68a", d:"M195,185 Q250,170 305,185 Q315,230 250,248 Q185,230 195,185 Z" },
      { id:"h_nase",    fill:"#1a1a2e", d:"M230,205 Q250,195 270,205 Q265,222 250,225 Q235,222 230,205 Z" },
      { id:"h_aug_l",   fill:"#92400e", form:"ellipse", cx:205, cy:175, rx:18, ry:16 },
      { id:"h_aug_r",   fill:"#92400e", form:"ellipse", cx:295, cy:175, rx:18, ry:16 },
      { id:"h_gl_l",    fill:"#ffffff", form:"ellipse", cx:200, cy:172, rx:8,  ry:8 },
      { id:"h_gl_r",    fill:"#ffffff", form:"ellipse", cx:290, cy:172, rx:8,  ry:8 },
      { id:"h_koerper", fill:"#92400e", d:"M165,260 Q140,350 150,430 Q195,455 250,455 Q305,455 350,430 Q360,350 335,260 Q295,285 250,285 Q205,285 165,260 Z" },
      { id:"h_bauch",   fill:"#fde68a", d:"M200,295 Q250,280 300,295 Q310,365 250,385 Q190,365 200,295 Z" },
      { id:"h_schw",    fill:"#92400e", d:"M345,300 Q395,265 405,230 Q400,210 385,218 Q378,245 360,275 Q350,290 340,305 Z" },
      { id:"h_bein_vl", fill:"#92400e", d:"M185,405 Q175,435 178,455 Q190,460 202,455 Q206,435 200,405 Z" },
      { id:"h_bein_vr", fill:"#92400e", d:"M315,405 Q325,435 322,455 Q310,460 298,455 Q294,435 300,405 Z" }
    ]
  },

  // ── NATUR ──────────────────────────────────────────────────────────────────
  {
    id:"sonne", name:"Sonne", emoji:"☀️", thema:"Natur",
    flaechen:[
      { id:"s_kreis",   fill:"#fbbf24", form:"ellipse", cx:250, cy:250, rx:100, ry:100 },
      { id:"s_str1",    fill:"#fbbf24", d:"M250,120 L265,145 L235,145 Z" },
      { id:"s_str2",    fill:"#fbbf24", d:"M250,380 L265,355 L235,355 Z" },
      { id:"s_str3",    fill:"#fbbf24", d:"M120,250 L145,265 L145,235 Z" },
      { id:"s_str4",    fill:"#fbbf24", d:"M380,250 L355,265 L355,235 Z" },
      { id:"s_str5",    fill:"#fbbf24", d:"M155,155 L175,178 L152,182 Z" },
      { id:"s_str6",    fill:"#fbbf24", d:"M345,155 L325,178 L348,182 Z" },
      { id:"s_str7",    fill:"#fbbf24", d:"M155,345 L178,325 L182,348 Z" },
      { id:"s_str8",    fill:"#fbbf24", d:"M345,345 L322,325 L318,348 Z" },
      { id:"s_auge_l",  fill:"#1a1a2e", form:"ellipse", cx:220, cy:235, rx:12, ry:14 },
      { id:"s_auge_r",  fill:"#1a1a2e", form:"ellipse", cx:280, cy:235, rx:12, ry:14 },
      { id:"s_mund",    fill:"#f97316", d:"M215,268 Q250,295 285,268" },
      { id:"s_wange_l", fill:"#fca5a5", form:"ellipse", cx:200, cy:268, rx:18, ry:12 },
      { id:"s_wange_r", fill:"#fca5a5", form:"ellipse", cx:300, cy:268, rx:18, ry:12 },
      { id:"s_himmel",  fill:"#bfdbfe", d:"M0,380 Q250,320 500,380 L500,500 L0,500 Z" },
      { id:"s_erde",    fill:"#86efac", d:"M0,440 Q250,400 500,440 L500,500 L0,500 Z" }
    ]
  },

  {
    id:"blume", name:"Blume", emoji:"🌸", thema:"Natur",
    flaechen:[
      { id:"bl_stiel",  fill:"#22c55e", d:"M240,480 L240,310 L260,310 L260,480 Z" },
      { id:"bl_blatt_l",fill:"#22c55e", d:"M240,380 Q180,340 175,300 Q200,290 240,340 Z" },
      { id:"bl_blatt_r",fill:"#22c55e", d:"M260,380 Q320,340 325,300 Q300,290 260,340 Z" },
      { id:"bl_blt1",   fill:"#ec4899", d:"M250,175 Q270,130 310,140 Q320,180 290,200 Q265,210 250,190 Z" },
      { id:"bl_blt2",   fill:"#ec4899", d:"M250,175 Q295,150 310,185 Q300,220 270,215 Q248,205 250,185 Z" },
      { id:"bl_blt3",   fill:"#ec4899", d:"M250,190 Q295,215 285,255 Q255,265 240,242 Q228,220 248,205 Z" },
      { id:"bl_blt4",   fill:"#ec4899", d:"M250,190 Q205,215 215,255 Q245,265 260,242 Q272,220 252,205 Z" },
      { id:"bl_blt5",   fill:"#ec4899", d:"M250,175 Q205,150 190,185 Q200,220 230,215 Q252,205 250,185 Z" },
      { id:"bl_blt6",   fill:"#ec4899", d:"M250,175 Q230,130 190,140 Q180,180 210,200 Q235,210 250,190 Z" },
      { id:"bl_mitte",  fill:"#fbbf24", form:"ellipse", cx:250, cy:210, rx:40, ry:40 },
      { id:"bl_kern",   fill:"#f97316", form:"ellipse", cx:250, cy:210, rx:20, ry:20 }
    ]
  },

  {
    id:"baum", name:"Baum", emoji:"🌳", thema:"Natur",
    flaechen:[
      { id:"ba_stamm",  fill:"#92400e", d:"M220,480 L220,320 L280,320 L280,480 Z" },
      { id:"ba_wurz_l", fill:"#92400e", d:"M220,440 Q175,450 160,465 Q165,475 175,472 Q195,462 220,460 Z" },
      { id:"ba_wurz_r", fill:"#92400e", d:"M280,440 Q325,450 340,465 Q335,475 325,472 Q305,462 280,460 Z" },
      { id:"ba_krone3", fill:"#166534", d:"M130,330 Q150,240 250,220 Q350,240 370,330 Q350,360 250,370 Q150,360 130,330 Z" },
      { id:"ba_krone2", fill:"#22c55e", d:"M155,290 Q175,205 250,188 Q325,205 345,290 Q325,320 250,330 Q175,320 155,290 Z" },
      { id:"ba_krone1", fill:"#86efac", d:"M180,255 Q200,180 250,165 Q300,180 320,255 Q300,285 250,295 Q200,285 180,255 Z" },
      { id:"ba_aepf1",  fill:"#ef4444", form:"ellipse", cx:215, cy:270, rx:16, ry:16 },
      { id:"ba_aepf2",  fill:"#ef4444", form:"ellipse", cx:285, cy:258, rx:16, ry:16 },
      { id:"ba_aepf3",  fill:"#ef4444", form:"ellipse", cx:250, cy:310, rx:14, ry:14 },
      { id:"ba_boden",  fill:"#86efac", d:"M50,470 Q250,450 450,470 L500,500 L0,500 Z" },
      { id:"ba_erde",   fill:"#92400e", d:"M50,490 Q250,478 450,490 L500,500 L0,500 Z" }
    ]
  },

  // ── MÄRCHEN ────────────────────────────────────────────────────────────────
  {
    id:"stern", name:"Zauberstern", emoji:"⭐", thema:"Märchen",
    flaechen:[
      { id:"st_hg",     fill:"#1e3a8a", d:"M0,0 L500,0 L500,500 L0,500 Z" },
      { id:"st_stern",  fill:"#fbbf24", d:"M250,80 L278,168 L370,168 L296,220 L322,308 L250,258 L178,308 L204,220 L130,168 L222,168 Z" },
      { id:"st_gl1",    fill:"#ffffff", form:"ellipse", cx:178, cy:138, rx:8, ry:8 },
      { id:"st_gl2",    fill:"#ffffff", form:"ellipse", cx:322, cy:125, rx:6, ry:6 },
      { id:"st_gl3",    fill:"#ffffff", form:"ellipse", cx:140, cy:220, rx:5, ry:5 },
      { id:"st_gl4",    fill:"#ffffff", form:"ellipse", cx:370, cy:200, rx:7, ry:7 },
      { id:"st_gl5",    fill:"#ffffff", form:"ellipse", cx:200, cy:380, rx:4, ry:4 },
      { id:"st_gl6",    fill:"#ffffff", form:"ellipse", cx:330, cy:390, rx:6, ry:6 },
      { id:"st_gl7",    fill:"#ffffff", form:"ellipse", cx:95,  cy:310, rx:5, ry:5 },
      { id:"st_gl8",    fill:"#ffffff", form:"ellipse", cx:415, cy:350, rx:4, ry:4 },
      { id:"st_mnd",    fill:"#f97316", d:"M225,230 Q250,248 275,230" },
      { id:"st_aug_l",  fill:"#1a1a2e", form:"ellipse", cx:228, cy:210, rx:9, ry:10 },
      { id:"st_aug_r",  fill:"#1a1a2e", form:"ellipse", cx:272, cy:210, rx:9, ry:10 }
    ]
  },

  {
    id:"drache", name:"Drache", emoji:"🐉", thema:"Märchen",
    flaechen:[
      { id:"dr_koerp",  fill:"#22c55e", d:"M150,280 Q130,360 145,430 Q185,460 235,455 Q265,440 275,400 Q285,360 270,300 Q240,285 205,285 Z" },
      { id:"dr_kopf",   fill:"#22c55e", d:"M255,190 Q240,140 280,120 Q330,115 345,150 Q355,185 325,210 Q295,230 255,220 Z" },
      { id:"dr_hals",   fill:"#22c55e", d:"M230,270 Q245,240 260,220 Q280,215 295,225 Q300,255 285,278 Q260,290 230,270 Z" },
      { id:"dr_bauch",  fill:"#86efac", d:"M158,300 Q178,290 200,298 Q215,350 205,420 Q185,438 160,428 Q145,385 158,300 Z" },
      { id:"dr_aug",    fill:"#fbbf24", form:"ellipse", cx:318, cy:148, rx:14, ry:14 },
      { id:"dr_pupil",  fill:"#1a1a2e", form:"ellipse", cx:321, cy:148, rx:6,  ry:10 },
      { id:"dr_nase",   fill:"#166534", form:"ellipse", cx:347, cy:135, rx:6,  ry:5 },
      { id:"dr_feuer",  fill:"#f97316", d:"M348,160 Q380,155 400,140 Q395,168 375,175 Q390,178 405,170 Q398,192 372,193 Q385,200 395,195 Q385,215 358,208 Z" },
      { id:"dr_feuer2", fill:"#fbbf24", d:"M348,163 Q372,160 388,148 Q384,168 368,173 Z" },
      { id:"dr_flueg_l",fill:"#166534", d:"M200,260 Q145,200 120,155 Q150,140 185,175 Q205,215 215,255 Z" },
      { id:"dr_flueg_r",fill:"#166534", d:"M270,255 Q330,200 355,155 Q325,140 295,175 Q275,215 268,250 Z" },
      { id:"dr_schw",   fill:"#22c55e", d:"M260,400 Q310,390 340,360 Q355,330 340,315 Q322,318 315,340 Q300,368 262,385 Z" },
      { id:"dr_horn_l", fill:"#166534", d:"M272,122 L265,88 L285,108 Z" },
      { id:"dr_horn_r", fill:"#166534", d:"M300,115 L305,80 L318,103 Z" }
    ]
  },

  {
    id:"schloss", name:"Schloss", emoji:"🏰", thema:"Märchen",
    flaechen:[
      { id:"sc_himmel", fill:"#bfdbfe", d:"M0,0 L500,0 L500,320 L0,320 Z" },
      { id:"sc_boden",  fill:"#86efac", d:"M0,400 L500,400 L500,500 L0,500 Z" },
      { id:"sc_weg",    fill:"#e5e7eb", d:"M200,400 Q250,395 300,400 L310,500 L190,500 Z" },
      { id:"sc_turm_l", fill:"#e5e7eb", d:"M60,200 L60,400 L140,400 L140,200 Z" },
      { id:"sc_turm_m", fill:"#ffffff", d:"M160,150 L160,400 L340,400 L340,150 Z" },
      { id:"sc_turm_r", fill:"#e5e7eb", d:"M360,200 L360,400 L440,400 L440,200 Z" },
      { id:"sc_dach_l", fill:"#ec4899", d:"M45,205 L100,120 L155,205 Z" },
      { id:"sc_dach_m", fill:"#8b5cf6", d:"M145,155 L250,60 L355,155 Z" },
      { id:"sc_dach_r", fill:"#ec4899", d:"M345,205 L400,120 L455,205 Z" },
      { id:"sc_fahn_l", fill:"#ef4444", d:"M100,120 L100,90 L130,105 Z" },
      { id:"sc_fahn_m", fill:"#fbbf24", d:"M250,60 L250,28 L285,44 Z" },
      { id:"sc_fahn_r", fill:"#ef4444", d:"M400,120 L400,90 L430,105 Z" },
      { id:"sc_tor",    fill:"#1a1a2e", d:"M210,400 Q210,330 250,325 Q290,330 290,400 Z" },
      { id:"sc_fenl1",  fill:"#fbbf24", form:"ellipse", cx:100, cy:290, rx:18, ry:22 },
      { id:"sc_fenl2",  fill:"#fbbf24", form:"ellipse", cx:100, cy:350, rx:18, ry:22 },
      { id:"sc_fenm1",  fill:"#fbbf24", form:"ellipse", cx:200, cy:240, rx:20, ry:24 },
      { id:"sc_fenm2",  fill:"#fbbf24", form:"ellipse", cx:300, cy:240, rx:20, ry:24 },
      { id:"sc_fenm3",  fill:"#fbbf24", form:"ellipse", cx:200, cy:320, rx:18, ry:22 },
      { id:"sc_fenm4",  fill:"#fbbf24", form:"ellipse", cx:300, cy:320, rx:18, ry:22 },
      { id:"sc_fenr1",  fill:"#fbbf24", form:"ellipse", cx:400, cy:290, rx:18, ry:22 },
      { id:"sc_fenr2",  fill:"#fbbf24", form:"ellipse", cx:400, cy:350, rx:18, ry:22 }
    ]
  }

]; // Ende VORLAGEN

// ── State ────────────────────────────────────────────────────────────────────
var state = {
  aktiveVorlage:  null,
  aktiveFarbe:    "#fbbf24",
  farbHistory:    [],   // [{id, alteFarbe}] fuer Undo
  gespeichert:    {}    // { vorlagenId: { flaechenId: farbe } }
};

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

function ladeSpeicherstand(){
  try{
    var s = localStorage.getItem("laetitia_malen_ausmal");
    state.gespeichert = s ? JSON.parse(s) : {};
  }catch(e){ state.gespeichert = {}; }
}

function speichern(){
  try{
    if(!state.aktiveVorlage) return;
    var id = state.aktiveVorlage.id;
    if(!state.gespeichert[id]) state.gespeichert[id] = {};
    // Aktuellen Stand auslesen
    var leinwand = $("leinwand");
    state.aktiveVorlage.flaechen.forEach(function(f){
      var el = leinwand.querySelector("#" + f.id);
      if(el) state.gespeichert[id][f.id] = el.getAttribute("fill");
    });
    localStorage.setItem("laetitia_malen_ausmal", JSON.stringify(state.gespeichert));
    zeigeStatus("Gespeichert! ✅");
  }catch(e){ zeigeStatus("Fehler beim Speichern."); }
}

function zeigeStatus(msg){
  var t = $("topTitelText");
  if(t){ t.textContent = msg; setTimeout(function(){ t.textContent = "🖌️ Ausmalen"; }, 2000); }
}

// ── Farbpalette bauen ────────────────────────────────────────────────────────
function baueFarbpalette(){
  var liste = $("farbListe");
  if(!liste) return;
  liste.innerHTML = "";
  FARBEN.forEach(function(farbe){
    var a = document.createElement("a");
    a.href = "#";
    a.className = "farbBtn" + (farbe.hex === state.aktiveFarbe ? " gewaehlt" : "");
    a.style.background = farbe.hex;
    if(farbe.hex === "#ffffff") a.style.border = "3px solid #ccc";
    a.title = farbe.name;
    a.setAttribute("data-farbe", farbe.hex);
    a.addEventListener("click", function(ev){
      ev.preventDefault();
      state.aktiveFarbe = farbe.hex;
      liste.querySelectorAll(".farbBtn").forEach(function(b){
        b.classList.toggle("gewaehlt", b.getAttribute("data-farbe") === farbe.hex);
      });
    });
    liste.appendChild(a);
  });
}

// ── Vorlagenliste bauen ──────────────────────────────────────────────────────
function baueVorlagenliste(){
  var liste = $("vorlagenListe");
  if(!liste) return;
  liste.innerHTML = "";
  var letzteThema = "";
  VORLAGEN.forEach(function(vorlage){
    if(vorlage.thema !== letzteThema){
      var tr = document.createElement("div");
      tr.className = "themenTrennlinie";
      tr.textContent = vorlage.thema;
      liste.appendChild(tr);
      letzteThema = vorlage.thema;
    }
    var a = document.createElement("a");
    a.href = "#";
    a.className = "vorlagenBtn" + (state.aktiveVorlage && state.aktiveVorlage.id === vorlage.id ? " aktiv" : "");
    a.innerHTML = '<span class="vorlagenEmoji">' + vorlage.emoji + '</span>' + vorlage.name;
    a.addEventListener("click", function(ev){
      ev.preventDefault();
      ladeVorlage(vorlage);
    });
    liste.appendChild(a);
  });
}

// ── Vorlage laden ────────────────────────────────────────────────────────────
function ladeVorlage(vorlage){
  state.aktiveVorlage = vorlage;
  state.farbHistory = [];

  var leinwand = $("leinwand");
  leinwand.innerHTML = "";

  var gespeichertefarben = (state.gespeichert[vorlage.id]) || {};

  // Hintergrund
  var bg = document.createElementNS("http://www.w3.org/2000/svg","rect");
  bg.setAttribute("x","0"); bg.setAttribute("y","0");
  bg.setAttribute("width","500"); bg.setAttribute("height","500");
  bg.setAttribute("fill","#fff");
  leinwand.appendChild(bg);

  // Flächen
  vorlage.flaechen.forEach(function(f){
    var el;
    var fillFarbe = gespeichertefarben[f.id] || f.fill;

    if(f.form === "ellipse"){
      el = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      el.setAttribute("cx", f.cx);
      el.setAttribute("cy", f.cy);
      el.setAttribute("rx", f.rx);
      el.setAttribute("ry", f.ry);
    } else {
      el = document.createElementNS("http://www.w3.org/2000/svg","path");
      el.setAttribute("d", f.d);
    }

    el.setAttribute("id", f.id);
    el.setAttribute("fill", fillFarbe);
    el.setAttribute("class","malFlaeche");
    el.style.cursor = "pointer";

    // Klick = Fläche ausmalen
    el.addEventListener("click", function(){
      var alteFarbe = el.getAttribute("fill");
      state.farbHistory.push({ id: f.id, alteFarbe: alteFarbe });
      if(state.farbHistory.length > 50) state.farbHistory.shift();
      el.setAttribute("fill", state.aktiveFarbe);
      el.classList.add("popping");
      setTimeout(function(){ el.classList.remove("popping"); }, 300);
    });

    leinwand.appendChild(el);
  });

  // Vorlagen-Markierung aktualisieren
  var vorlagenListe = $("vorlagenListe");
  if(vorlagenListe){
    vorlagenListe.querySelectorAll(".vorlagenBtn").forEach(function(btn){
      btn.classList.remove("aktiv");
    });
    // Aktiven Button markieren
    var alle = vorlagenListe.querySelectorAll(".vorlagenBtn");
    var idx = VORLAGEN.indexOf(vorlage);
    var zaehler = 0;
    for(var i=0; i<alle.length; i++){
      if(alle[i].className.indexOf("vorlagenBtn") >= 0){
        if(zaehler === idx){ alle[i].classList.add("aktiv"); break; }
        zaehler++;
      }
    }
  }

  rebindDwell();
}

// ── Undo ─────────────────────────────────────────────────────────────────────
function undo(){
  if(state.farbHistory.length === 0) return;
  var last = state.farbHistory.pop();
  var el = $("leinwand").querySelector("#" + last.id);
  if(el) el.setAttribute("fill", last.alteFarbe);
}

// ── Dwell (Singleton: EIN attachDwell-Aufruf, 2400ms Standard) ────────────────
var _dwellHandle = null;
function rebindDwell(){
  var attach = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  if(_dwellHandle) _dwellHandle.cancelDwell();
  var dwellMs    = Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 700, 700); // Malen-Modul: 2400ms Standard
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
  _dwellHandle = attach(
    "a.vorlagenBtn, a.farbBtn, a.topBtn, a.malFlaeche, #btnZurueck",
    {
      dwellMs: dwellMs, leaveGrace: leaveGrace,
      onActivate: function(el){ try{ el.click(); }catch(e){} }
    }
  );
}

// ── Buttons ──────────────────────────────────────────────────────────────────
function bindButtons(){
  var btnUndo = $("btnUndo");
  if(btnUndo) btnUndo.addEventListener("click", function(ev){ ev.preventDefault(); undo(); });

  var btnReset = $("btnReset");
  if(btnReset) btnReset.addEventListener("click", function(ev){
    ev.preventDefault();
    if(state.aktiveVorlage) ladeVorlage(state.aktiveVorlage);
  });

  var btnSpeichern = $("btnSpeichern");
  if(btnSpeichern) btnSpeichern.addEventListener("click", function(ev){ ev.preventDefault(); speichern(); });
}

// Titel-Element merken fuer Status-Meldungen
var topTitelDiv = document.querySelector(".topTitel");
if(topTitelDiv) topTitelDiv.id = "topTitelText";

// ── Init ─────────────────────────────────────────────────────────────────────
ladeSpeicherstand();
baueFarbpalette();
baueVorlagenliste();
bindButtons();
ladeVorlage(VORLAGEN[0]); // Katze als Standard

})();
