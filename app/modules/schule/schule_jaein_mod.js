// schule_jaein_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Lob-Texte ─────────────────────────────────────────────────────────────────
var LOB_TEXTE = ["Wunderbar!","Fantastisch!","Super!","Toll gemacht!",
  "Du überraschst mich!","Klasse!","Sehr gut!","Bravo!","Genial!","Perfekt!"];
function zufallsLob(){ return LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]; }

// ── Daten laden ───────────────────────────────────────────────────────────────
var alleAufgaben = [];
(function(){
  var api = window.LaetitiaDataRegistryApi;
  // Primärer Key wie in schule_liesmal3_data.js registriert
  var alle = [];
  if(api && typeof api.get === "function"){
    alle = api.get("schule_liesmal3") || [];
  }
  if(!alle.length){
    alle = window.LaetitiaSchuleLiesmal3Aufgaben || [];
  }
  alleAufgaben = alle.filter(function(t){ return t.typ === "ja_nein"; });
  // URL-Filter
  try{
    var params = new URLSearchParams(window.location.search);
    var nurSeite = params.get("seite");
    var nurHeft  = params.get("heft");
    if(nurSeite) alleAufgaben = alleAufgaben.filter(function(t){ return String(t.seite)===nurSeite; });
    if(nurHeft)  alleAufgaben = alleAufgaben.filter(function(t){ return t.heft===nurHeft; });
  }catch(e){}
})();

// ── Einheiten aufbauen (gruppiert nach Seite, in Originalreihenfolge) ─────────
var einheiten = [];
(function(){
  var seiteMap = {};
  var seitenReihenfolge = [];
  alleAufgaben.forEach(function(a){
    var key = (a.heft||"") + "_" + a.seite;
    if(!seiteMap[key]){
      seiteMap[key] = { seite: a.seite, heft: a.heft,
        kontext: a.kontext||"", bild: a.bild||null, fragen:[] };
      seitenReihenfolge.push(key);
    }
    seiteMap[key].fragen.push(a);
  });
  seitenReihenfolge.forEach(function(k){ einheiten.push(seiteMap[k]); });
})();

// ── Zustand ───────────────────────────────────────────────────────────────────
var einheitIndex = 0;
var antworten = [];   // pro Frage: null | "richtig" | "falsch"
var gesamtRichtig = 0, gesamtGesamt = 0;

// ── Screen-Wechsel ────────────────────────────────────────────────────────────
function zeigeScreen(id){
  ["screenBild","screenFragen","screenAbschluss"].forEach(function(s){
    document.getElementById(s).classList.remove("aktiv");
  });
  document.getElementById(id).classList.add("aktiv");
  rebindDwell();
}

// ── Fortschritt ───────────────────────────────────────────────────────────────
function aktualisiereProgress(){
  var pct = einheiten.length > 0
    ? Math.round((einheitIndex / einheiten.length) * 100) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("topbarInfo").textContent =
    "Thema " + (einheitIndex+1) + " / " + einheiten.length;
}


// ── Crop-Werte pro Bild-Key ───────────────────────────────────────────────────
var BILD_CROP = {
  "bello_dino":     { width:"122.0%", ml:"-13.4%", mt:"-26.8%" },
  "fisch_comic":    { width:"117.6%", ml:"-11.8%", mt:"-8.8%"  },
  "weltraum_flummi":{ width:"119.0%", ml:"-13.1%", mt:"-27.0%" },
  "krake_lies":     { width:"175.4%", ml:"-36.8%", mt:"-76.9%" },
  "pizza_mia":      { width:"126.6%", ml:"-15.2%", mt:"-19.5%" },
  "taucher_lies":   { width:"122.0%", ml:"-13.4%", mt:"-26.8%" }
};

function bildCropSetzen(bildKey){
  var img = document.getElementById("bildImg");
  var crop = BILD_CROP[bildKey];
  if(crop){
    img.style.width       = crop.width;
    img.style.marginLeft  = crop.ml;
    img.style.marginTop   = crop.mt;
  } else {
    img.style.width = "100%";
    img.style.marginLeft = "0";
    img.style.marginTop  = "0";
  }
}

// ── Einheit starten ───────────────────────────────────────────────────────────
function starteEinheit(){
  if(einheitIndex >= einheiten.length){ zeigeAbschluss(); return; }
  var e = einheiten[einheitIndex];
  antworten = e.fragen.map(function(){ return null; });

  aktualisiereProgress();

  var bild = e.bild && window.SCHULE_LIESMAL3_BILDER && window.SCHULE_LIESMAL3_BILDER[e.bild];

  if(bild){
    // Hat Bild → zeige Bild-Screen zuerst
    document.getElementById("bildImg").src = bild;
    bildCropSetzen(e.bild);
    document.getElementById("bildWrapper").style.display = "";
    document.getElementById("bildSub").textContent = "Lies mal 3 — Seite " + e.seite;
    document.getElementById("bildKontext").textContent = e.kontext || "";
    document.getElementById("bildKontext").style.display = e.kontext ? "" : "none";
    zeigeScreen("screenBild");
  } else {
    // Kein Bild → direkt Fragen
    zeigeFragen();
  }
}

// ── Fragen-Screen aufbauen ────────────────────────────────────────────────────
function zeigeFragen(){
  var e = einheiten[einheitIndex];
  var scroll = document.getElementById("fragenScroll");
  scroll.innerHTML = "";

  // Seiten-Hinweis oben
  if(e.seite){
    var hinweis = document.createElement("div");
    hinweis.className = "kein-bild-hinweis";
    hinweis.textContent = "Lies mal 3 — Seite " + e.seite;
    scroll.appendChild(hinweis);
  }

  e.fragen.forEach(function(frage, i){
    var zeile = document.createElement("div");
    zeile.className = "frage-zeile";
    zeile.id = "zeile_" + i;

    var status = document.createElement("div");
    status.className = "frage-status";
    status.id = "status_" + i;
    status.textContent = "○";

    var text = document.createElement("div");
    text.className = "frage-text";
    text.textContent = frage.text;

    var btns = document.createElement("div");
    btns.className = "frage-btns";

    // Ja-Button
    var btnJa = document.createElement("button");
    btnJa.className = "frage-btn frage-btn-ja";
    btnJa.id = "btnJa_" + i;
    btnJa.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>✅ Ja';
    btnJa.onclick = (function(idx){ return function(){ beantworte(idx, "A"); }; })(i);

    // Nein-Button
    var btnNein = document.createElement("button");
    btnNein.className = "frage-btn frage-btn-nein";
    btnNein.id = "btnNein_" + i;
    btnNein.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>❌ Nein';
    btnNein.onclick = (function(idx){ return function(){ beantworte(idx, "B"); }; })(i);

    // Vorlesen-Button
    var btnVorlesen = document.createElement("button");
    btnVorlesen.className = "frage-btn frage-btn-vorlesen";
    btnVorlesen.id = "btnVor_" + i;
    btnVorlesen.innerHTML = '<svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30"/></svg>🔊';
    btnVorlesen.onclick = (function(f, btn){ return function(){ vorlesenFrage(f, btn); }; })(frage, btnVorlesen);

    btns.appendChild(btnJa);
    btns.appendChild(btnNein);
    btns.appendChild(btnVorlesen);

    zeile.appendChild(status);
    zeile.appendChild(text);
    zeile.appendChild(btns);
    scroll.appendChild(zeile);
  });

  // Weiter-Button zurücksetzen
  var btnW = document.getElementById("btnWeiterEinheit");
  btnW.classList.add("gesperrt");

  var bild = e.bild && window.SCHULE_LIESMAL3_BILDER && window.SCHULE_LIESMAL3_BILDER[e.bild];
  // Bild-Button nur zeigen wenn Bild vorhanden
  document.getElementById("btnZuBild").style.display = bild ? "" : "none";

  zeigeScreen("screenFragen");
}

// ── Bild-Kontext vorlesen ────────────────────────────────────────────────────
function vorlesenBild(){
  var e = einheiten[einheitIndex];
  var btn = document.getElementById("btnBildVorlesen");
  if(btn) btn.classList.add("spricht");
  var text = e.kontext || ("Seite " + e.seite);
  sprich(text, function(){
    if(btn) btn.classList.remove("spricht");
    rebindDwell();
  });
}

// ── Bild-Screen zeigen ────────────────────────────────────────────────────────
function zeigeBild(){
  zeigeScreen("screenBild");
}

// ── Frage beantworten ─────────────────────────────────────────────────────────
function beantworte(i, buchstabe){
  var e = einheiten[einheitIndex];
  var frage = e.fragen[i];
  if(antworten[i] !== null) return; // bereits beantwortet

  var korrekt = (buchstabe === frage.richtig);
  antworten[i] = korrekt ? "richtig" : "falsch";

  gesamtGesamt++;
  if(korrekt) gesamtRichtig++;

  // Zeile einfärben
  var zeile = document.getElementById("zeile_" + i);
  zeile.classList.add("beantwortet");
  zeile.classList.add(korrekt ? "richtig" : "falsch");

  // Status-Emoji
  var status = document.getElementById("status_" + i);
  status.textContent = korrekt ? "✅" : "❌";

  // Gewählten Button markieren
  var gewaehlt = document.getElementById(buchstabe === "A" ? "btnJa_"+i : "btnNein_"+i);
  gewaehlt.classList.add("gewaehlt");

  // TTS-Feedback
  var tts;
  if(korrekt){
    tts = zufallsLob() + (frage.erklaerung ? " " + frage.erklaerung : "");
  } else {
    var richtigWort = (frage.richtig === "A") ? "Ja" : "Nein";
    tts = "Leider falsch. Richtig ist " + richtigWort + "." + (frage.erklaerung ? " " + frage.erklaerung : "");
  }
  sprich(tts);

  // Prüfe ob alle beantwortet
  pruefeAlleBeantwortet();
  rebindDwell();
}

// ── Alle beantwortet? → Weiter-Button freischalten ───────────────────────────
function pruefeAlleBeantwortet(){
  var alle = antworten.every(function(a){ return a !== null; });
  var btn = document.getElementById("btnWeiterEinheit");
  if(alle){
    btn.classList.remove("gesperrt");
  }
}

// ── Vorlesen ──────────────────────────────────────────────────────────────────
function vorlesenFrage(frage, btn){
  btn.classList.add("spricht");
  sprich(frage.text + ". Stimmt das?", function(){
    btn.classList.remove("spricht");
    rebindDwell();
  });
}

// ── Nächste Einheit ───────────────────────────────────────────────────────────
function ueberspringen(){
  naechsteEinheit();
}

function naechsteEinheit(){
  einheitIndex++;
  if(einheitIndex >= einheiten.length){
    zeigeAbschluss();
  } else {
    starteEinheit();
  }
}

// ── Abschluss ─────────────────────────────────────────────────────────────────
function zeigeAbschluss(){
  document.getElementById("progressFill").style.width = "100%";
  var pct = gesamtGesamt > 0 ? Math.round((gesamtRichtig/gesamtGesamt)*100) : 100;
  var e, ti, su;
  if(pct >= 80){ e="🌟"; ti="Fantastisch!"; su="Du kennst das super!"; }
  else if(pct >= 60){ e="😊"; ti="Gut gemacht!"; su="Immer besser!"; }
  else { e="💪"; ti="Weiter so!"; su="Beim nächsten Mal klappt es noch besser!"; }
  document.getElementById("abschlussEmoji").textContent = e;
  document.getElementById("abschlussTitel").textContent = ti;
  document.getElementById("abschlussScore").textContent = gesamtRichtig + " von " + gesamtGesamt + " richtig";
  document.getElementById("abschlussSub").textContent = su;
  zeigeScreen("screenAbschluss");
  sprich(ti + " " + gesamtRichtig + " von " + gesamtGesamt + " Fragen richtig.");
}

// ── TTS ───────────────────────────────────────────────────────────────────────
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.92;
    var voices = speechSynthesis.getVoices();
    // Katja bevorzugen (natürliche weibliche Stimme), dann andere Microsoft-Stimmen
    var de = voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
          || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
          || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      // Kurzer Delay nach cancel() damit Edge den Anfang nicht verschluckt
      setTimeout(function(){
        var fired = false; var watchdog = null;
        function naechster(){
          if(fired) return; fired = true;
          if(watchdog) clearTimeout(watchdog);
          if(danach) setTimeout(danach, 300);
        }
        u.onend = naechster; u.onerror = naechster;
        watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
        speechSynthesis.speak(u);
      }, 120);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}

// ── Dwell ─────────────────────────────────────────────────────────────────────
var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms"))    || 900;
var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
var _dwellHandle = { cancelDwell: function(){} };

function rebindDwell(){
  if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function") _dwellHandle.cancelDwell();
  _dwellHandle = _attachDwell(
    "#btnZuFragen, #btnZuBild, #btnWeiterEinheit:not(.gesperrt), #btnBildVorlesen, #btnZurueckBild, .frage-btn",
    { dwellMs: dwellMs, leaveGrace: leaveGrace,
      onActivate: function(el){
        if(el.classList.contains("gesperrt")) return;
        try{ el.click(); }catch(e){}
      }
    }
  );
}

// ── Start ─────────────────────────────────────────────────────────────────────
try{ localStorage.setItem("laetitia_return_url_v1", new URL("./schule_deutsch.html", window.location.href).href); }catch(e){}

if(einheiten.length === 0){
  document.getElementById("screenFragen").innerHTML = "<div style='padding:24px;text-align:center;color:var(--muted);font-weight:800;'>Keine Aufgaben gefunden.</div>";
  zeigeScreen("screenFragen");
} else {
  if(speechSynthesis.getVoices().length > 0){
    starteEinheit();
  } else {
    speechSynthesis.addEventListener("voiceschanged", function(){ starteEinheit(); }, {once:true});
    setTimeout(function(){ starteEinheit(); }, 800);
  }
}
