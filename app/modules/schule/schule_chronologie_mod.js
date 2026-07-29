// schule_chronologie_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Alle Aufgaben aus allen Quellen sammeln ───────────────────────────────────
var alleAufgaben = [];

(function(){
  // Aus Registry
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    ["schule_liesmal3","schule_liesmal3_raetsel","schule_liesmal3_buchstaben","schule_mathe"].forEach(function(key){
      var items = api.get(key) || [];
      alleAufgaben = alleAufgaben.concat(items);
    });
  }
  // Fallback: globale Variablen
  if(!alleAufgaben.length){
    var quellen = [
      window.LaetitiaSchuleLiesmal3Aufgaben,
      window.LaetitiaSchuleLiesmal3Raetsel,
      window.LaetitiaSchuleLiesmal3Buchstaben,
      window.LaetitiaSchuleMatheAufgaben
    ];
    quellen.forEach(function(q){ if(Array.isArray(q)) alleAufgaben = alleAufgaben.concat(q); });
  }
  // Lies-Bloecke separat (anderes Format)
  // werden direkt aus window.LaetitiaSchuleLiesmal3Lies gelesen
})();

// ── Heft-Konfiguration ────────────────────────────────────────────────────────
// Wird automatisch aus den Daten abgeleitet + hier angereichert
var HEFT_META = {
  "liesmal3": {
    emoji: "📖",
    titel: "Lies mal 3",
    untertitel: "Das Heft mit der Robbe (Jandorf Verlag)",
    farbe: "#16a34a",
    spielSeiten: {
      "ja_nein":     { url:"./schule_jaein.html",      label:"Stimmt das?",      icon:"✅" },
      "raetsel":     { url:"./schule_raetsel.html",    label:"Was bin ich?",     icon:"🔍" },
      "buchstaben":  { url:"./schule_buchstaben.html", label:"Buchstabenraetsel",icon:"🔤" },
      "lies_leuchte":{ url:"./schule_lies.html",       label:"Lies und leuchte", icon:"💡" }
    }
  },
  "nasevorn": {
    emoji: "🔢",
    titel: "Nase vorn!",
    untertitel: "Rechnen bis 20 (Cornelsen, Klasse 1)",
    farbe: "#2563eb",
    spielSeiten: {
      "mathe": { url:"./schule_mathe.html", label:"Mathe üben", icon:"🔢" }
    }
  }
};

// ── Daten nach Heft + Seite gruppieren ────────────────────────────────────────
function gruppiereNachHeftUndSeite(){
  var hefte = {}; // { heft: { seite: [aufgaben] } }

  // Normale Aufgaben
  alleAufgaben.forEach(function(t){
    if(!t.heft || !t.seite) return;
    if(!hefte[t.heft]) hefte[t.heft] = {};
    var s = String(t.seite);
    if(!hefte[t.heft][s]) hefte[t.heft][s] = [];
    hefte[t.heft][s].push(t);
  });

  // Lies-Bloecke einfuegen
  var liesBloecke = window.LaetitiaSchuleLiesmal3Lies || [];
  liesBloecke.forEach(function(block){
    var heft = block.heft || "liesmal3";
    var s = String(block.seite);
    if(!hefte[heft]) hefte[heft] = {};
    if(!hefte[heft][s]) hefte[heft][s] = [];
    // Als Pseudo-Aufgabe eintragen
    hefte[heft][s].push({
      heft: heft,
      seite: block.seite,
      typ: "lies_leuchte",
      stufe: "SL_LIES",
      text: block.titel,
      _liesBlock: true,
      _blockTitel: block.titel
    });
  });

  return hefte;
}

// ── Typ-Labels ────────────────────────────────────────────────────────────────
var TYP_LABELS = {
  "ja_nein":     { icon:"✅", label:"Ja / Nein" },
  "raetsel":     { icon:"🔍", label:"Was bin ich?" },
  "buchstaben":  { icon:"🔤", label:"Buchstabenraetsel" },
  "lies_leuchte":{ icon:"💡", label:"Lies und leuchte" },
  "mathe":       { icon:"🔢", label:"Mathe" }
};

// ── Screen-Steuerung ──────────────────────────────────────────────────────────
function zeigeScreen(id){
  document.getElementById("screenHeft").style.display    = (id==="heft")     ? "block" : "none";
  document.getElementById("screenTimeline").style.display= (id==="timeline") ? "flex"  : "none";
}

// ── Heft-Auswahl aufbauen ─────────────────────────────────────────────────────
var hefte = {};

function aufbauenHeftAuswahl(){
  hefte = gruppiereNachHeftUndSeite();
  var grid = document.getElementById("heftGrid");
  grid.innerHTML = "";

  Object.keys(hefte).forEach(function(heftKey){
    var meta = HEFT_META[heftKey] || { emoji:"📄", titel:heftKey, untertitel:"", farbe:"#6b7280" };
    var seitenCount = Object.keys(hefte[heftKey]).length;
    var aufgabenCount = 0;
    Object.values(hefte[heftKey]).forEach(function(arr){ aufgabenCount += arr.length; });

    var btn = document.createElement("div");
    btn.className = "heft-btn";
    btn.innerHTML =
      '<svg class="dwell-ring-svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" style="stroke:'+meta.farbe+'"/></svg>'+
      '<div class="heft-btn-emoji">'+meta.emoji+'</div>'+
      '<div class="heft-btn-titel">'+meta.titel+'</div>'+
      '<div class="heft-btn-sub">'+meta.untertitel+'</div>'+
      '<div class="heft-btn-count">'+seitenCount+' Seiten · '+aufgabenCount+' Aufgaben</div>';
    btn.addEventListener("click", function(){ zeigeTimeline(heftKey); });
    bindDwellEinzel(btn);
    grid.appendChild(btn);
  });

  zeigeScreen("heft");
}

// ── Timeline aufbauen ─────────────────────────────────────────────────────────
function zeigeTimeline(heftKey){
  var meta = HEFT_META[heftKey] || { emoji:"📄", titel:heftKey, farbe:"#6b7280", spielSeiten:{} };
  document.getElementById("timelineTitel").textContent = meta.emoji+" "+meta.titel;

  var seitenData = hefte[heftKey];
  var seitenNummern = Object.keys(seitenData).map(Number).sort(function(a,b){return a-b;});

  var liste = document.getElementById("seitenListe");
  liste.innerHTML = "";

  seitenNummern.forEach(function(seiteNr){
    var aufgaben = seitenData[String(seiteNr)];
    if(!aufgaben || !aufgaben.length) return;

    // Typen auf dieser Seite ermitteln
    var typen = {};
    aufgaben.forEach(function(t){ typen[t.typ] = (typen[t.typ]||0)+1; });
    var ersterTyp = Object.keys(typen)[0];
    var typInfo = TYP_LABELS[ersterTyp] || { icon:"📄", label:ersterTyp };

    var karte = document.createElement("div");
    karte.className = "seite-karte";

    // Header
    var header = document.createElement("div");
    header.className = "seite-header";
    header.innerHTML =
      '<span class="seite-nr">Seite '+seiteNr+'</span>'+
      '<span class="seite-typ-icon">'+typInfo.icon+'</span>'+
      '<span class="seite-typ-label">'+typInfo.label+'</span>'+
      '<span class="seite-aufgaben-count">'+aufgaben.length+' Aufgaben</span>'+
      '<span class="seite-chevron">▶</span>';
    header.addEventListener("click", function(){
      karte.classList.toggle("offen");
    });

    // Body
    var body = document.createElement("div");
    body.className = "seite-body";

    // Aufgaben-Vorschau (max. 3)
    var preview = document.createElement("div");
    preview.className = "aufgaben-preview";
    var max = Math.min(aufgaben.length, 3);
    for(var i=0; i<max; i++){
      var zeile = document.createElement("div");
      zeile.className = "aufgabe-zeile";
      var t = aufgaben[i];
      if(t._liesBlock){
        zeile.textContent = "📖 "+t._blockTitel;
      } else {
        zeile.textContent = (t.text||"").substring(0,70) + (t.text && t.text.length>70?"…":"");
      }
      preview.appendChild(zeile);
    }
    if(aufgaben.length > 3){
      var mehr = document.createElement("div");
      mehr.className = "aufgabe-zeile mehr";
      mehr.textContent = "... und "+(aufgaben.length-3)+" weitere Aufgaben";
      preview.appendChild(mehr);
    }
    body.appendChild(preview);

    // Spiel-Buttons fuer jeden Typ auf dieser Seite
    Object.keys(typen).forEach(function(typ){
      var spielInfo = (meta.spielSeiten||{})[typ];
      if(!spielInfo) return;

      var spielBtn = document.createElement("a");
      spielBtn.className = "spiel-btn" + (typ==="lies_leuchte"?" lies-btn":"");
      spielBtn.innerHTML =
        '<svg class="dwell-ring-svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25"/></svg>'+
        spielInfo.icon+' '+spielInfo.label+' — Seite '+seiteNr+' spielen';

      // URL mit Seiten-Filter
      spielBtn.href = spielInfo.url + "?seite="+seiteNr+"&heft="+heftKey;
      bindDwellEinzel(spielBtn);
      body.appendChild(spielBtn);
    });

    karte.appendChild(header);
    karte.appendChild(body);
    liste.appendChild(karte);
  });

  zeigeScreen("timeline");
}

// ── Seiten-Filter in Spielseiten ──────────────────────────────────────────────
// Die Spielseiten lesen den ?seite= Parameter um nur diese Seite zu spielen.
// Das wird in den Spielseiten selbst implementiert — hier nur der Link.

// ── Navigation ────────────────────────────────────────────────────────────────
document.getElementById("btnZurueckHeft").addEventListener("click", function(){
  zeigeScreen("heft");
});

// ── Dwell (Regel 7: LaetitiaAttachDwell) ─────────────────────────────────────
var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
var _dwellHandle = { cancelDwell: function(){} };

var DWELL_SELECTOR = "a.heft-btn, a.spiel-btn, #btnZurueck, #btnZurueckHeft, a.zurueckBtn";

function rebindDwell(){
  if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function") _dwellHandle.cancelDwell();
  _dwellHandle = _attachDwell(DWELL_SELECTOR, {
    dwellMs: dwellMs, leaveGrace: leaveGrace,
    onActivate: function(el){
      if(el.getAttribute("aria-disabled") === "true") return;
      if(el.classList.contains("is-disabled")) return;
      try{ el.click(); }catch(e){}
    }
  });
}
function bindDwellEinzel(el){ rebindDwell(); }

try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule.html", window.location.href).href); }catch(e){}

aufbauenHeftAuswahl();
