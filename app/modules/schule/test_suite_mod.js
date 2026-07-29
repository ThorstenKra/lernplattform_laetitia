// test_suite_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

// MODUS: fetch() (mit --allow-file-access-from-files) oder script-only (ohne Flag)
var MODUS = "unbekannt";

function pruefeModusUndInit(){
  fetch("./test_suite.html")
    .then(function(r){ return r.text(); })
    .then(function(){
      MODUS = "fetch";
      document.getElementById("modusAnzeige").innerHTML =
        'HTML-Checks aktiv <span class="modus-badge fetch">FETCH-MODUS</span>';
      document.getElementById("hinweisBox").className = "hinweis-box";
      buildUI();
    })
    .catch(function(){
      MODUS = "script";
      document.getElementById("modusAnzeige").innerHTML =
        'Nur JS-Checks aktiv <span class="modus-badge script">SCRIPT-MODUS</span>';
      zeigeFetchHinweis();
      buildUI();
    });
}

function zeigeFetchHinweis(){
  var box = document.getElementById("hinweisBox");
  box.className = "hinweis-box sichtbar";
  box.innerHTML =
    "<strong>HTML-Checks nicht moeglich (file:// Einschraenkung)</strong><br>" +
    "JS-Variablen-Checks laufen trotzdem. Fuer HTML-Checks Edge so starten:<br>" +
    '<code>"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --allow-file-access-from-files --user-data-dir="C:\\EdgeDwell"</code>';
}

// HTML-Checks (nur FETCH-MODUS)
function ladeHtmlFetch(pfad){
  return fetch(pfad)
    .then(function(r){ return r.text(); })
    .then(function(html){ return {ok:true, html:html}; })
    .catch(function(e){ return {ok:false, fehler:e.message}; });
}
function hatScript(teil){
  return function(html){
    var re = new RegExp("src=['\"][^'\"]*" + teil.replace(/\./g,"\\.") + "['\"]");
    if(re.test(html)) return {ok:true, msg:"eingebunden"};
    return {ok:false, msg:"script src=" + teil + " fehlt"};
  };
}
function hatText(text){
  return function(html){
    if(html.indexOf(text) >= 0) return {ok:true, msg:"gefunden"};
    return {ok:false, msg:'"' + text + '" nicht gefunden'};
  };
}
function keinAutoTimeout(html){
  if(/setTimeout[^}]+index\+\+[^}]+zeigeAufgabe/.test(html))
    return {ok:false, msg:"Auto-setTimeout(index++) gefunden"};
  return {ok:true, msg:"kein automatischer Uebergang"};
}

// JS-Checks via dynamischem script-Tag (immer moeglich)
function ladeScriptUndPruefe(pfad, checkFn){
  return new Promise(function(resolve){
    var script = document.createElement("script");
    script.src = pfad + "?t=" + Date.now();
    script.onload = function(){
      try{
        var r = checkFn();
        resolve({ok:r.ok, msg:r.msg});
      } catch(e){
        resolve({ok:false, msg:"Fehler: " + e.message});
      }
      try{ document.head.removeChild(script); }catch(e2){}
    };
    script.onerror = function(){
      resolve({ok:false, msg:"Nicht ladbar: " + pfad});
      try{ document.head.removeChild(script); }catch(e){}
    };
    document.head.appendChild(script);
  });
}

// Modul-Definitionen
var MODULE = [
  {
    name: "schule_jaein.html",
    htmlPfad: "./schule_jaein.html",
    htmlChecks: [
      {name:"dwell.js eingebunden",  fn: hatScript("dwell.js")},
      {name:"error_handler.js",      fn: hatScript("error_handler.js")},
      {name:"liesmal3_bilder.js",    fn: hatScript("liesmal3_bilder.js")},
      {name:"liesmal3_data.js",      fn: hatScript("liesmal3_data.js")},
      {name:"voiceschanged",         fn: hatText("voiceschanged")},
      {name:"LaetitiaAttachDwell",   fn: hatText("LaetitiaAttachDwell")},
      {name:"LaetitiaSprich",        fn: hatText("LaetitiaSprich")},
      {name:"Katja-Stimme",          fn: hatText("Katja")},
      {name:"120ms cancel-Delay",    fn: hatText("120")},
      {name:"Weiter-Button",         fn: hatText("weiterBtn")},
      {name:"BILD_CROP",             fn: hatText("BILD_CROP")},
      {name:"kein Auto-setTimeout",  fn: keinAutoTimeout},
    ],
    jsChecks: [
      {
        name:"liesmal3_data: ja_nein Aufgaben",
        pfad:"./schule_liesmal3_data.js",
        fn: function(){
          var api = window.LaetitiaDataRegistryApi;
          var daten = api ? (api.get("schule_liesmal3")||[]) : (window.LaetitiaSchuleLiesmal3Aufgaben||[]);
          var jaein = daten.filter(function(d){return d.typ==="ja_nein";});
          if(!jaein.length) return {ok:false, msg:"keine ja_nein-Aufgaben"};
          var seiten = jaein.map(function(d){return d.seite;});
          var unique = seiten.filter(function(v,i){return seiten.indexOf(v)===i;});
          return {ok:true, msg: jaein.length + " Aufgaben, " + unique.length + " Seiten"};
        }
      },
      {
        name:"liesmal3_bilder: 6 Bilder",
        pfad:"./schule_liesmal3_bilder.js",
        fn: function(){
          var b = window.SCHULE_LIESMAL3_BILDER;
          if(!b) return {ok:false, msg:"SCHULE_LIESMAL3_BILDER fehlt"};
          var keys = Object.keys(b);
          if(keys.length < 6) return {ok:false, msg: keys.length + " Bilder (mind. 6)"};
          return {ok:true, msg: keys.length + " Bilder: " + keys.join(", ")};
        }
      }
    ]
  },
  {
    name: "schule_raetsel.html",
    htmlPfad: "./schule_raetsel.html",
    htmlChecks: [
      {name:"dwell.js",         fn: hatScript("dwell.js")},
      {name:"error_handler.js", fn: hatScript("error_handler.js")},
      {name:"raetsel_data.js",  fn: hatScript("raetsel_data.js")},
      {name:"voiceschanged",    fn: hatText("voiceschanged")},
      {name:"LaetitiaSprich",   fn: hatText("LaetitiaSprich")},
      {name:"Katja-Stimme",     fn: hatText("Katja")},
      {name:"120ms Delay",      fn: hatText("120")},
      {name:"Weiter-Button",    fn: hatText("weiterBtn")},
    ],
    jsChecks: [
      {
        name:"raetsel_data: Aufgaben",
        pfad:"./schule_liesmal3_raetsel_data.js",
        fn: function(){
          var api = window.LaetitiaDataRegistryApi;
          var daten = api ? (api.get("schule_liesmal3_raetsel")||[]) : [];
          if(!daten.length) daten = window.LaetitiaSchuleLiesmal3Raetsel || [];
          if(!daten.length) return {ok:false, msg:"keine Daten"};
          return {ok:true, msg: daten.length + " Aufgaben"};
        }
      }
    ]
  },
  {
    name: "schule_lies.html",
    htmlPfad: "./schule_lies.html",
    htmlChecks: [
      {name:"dwell.js",            fn: hatScript("dwell.js")},
      {name:"error_handler.js",    fn: hatScript("error_handler.js")},
      {name:"liesmal3_bilder.js",  fn: hatScript("liesmal3_bilder.js")},
      {name:"lies_data.js",        fn: hatScript("lies_data.js")},
      {name:"voiceschanged",       fn: hatText("voiceschanged")},
      {name:"LaetitiaSprich",      fn: hatText("LaetitiaSprich")},
      {name:"Katja-Stimme",        fn: hatText("Katja")},
      {name:"blockBild Container", fn: hatText("blockBild")},
    ],
    jsChecks: []
  },
  {
    name: "schule_buchstaben.html",
    htmlPfad: "./schule_buchstaben.html",
    htmlChecks: [
      {name:"dwell.js",            fn: hatScript("dwell.js")},
      {name:"error_handler.js",    fn: hatScript("error_handler.js")},
      {name:"buchstaben_data.js",  fn: hatScript("buchstaben_data.js")},
      {name:"voiceschanged",       fn: hatText("voiceschanged")},
      {name:"LaetitiaSprich",      fn: hatText("LaetitiaSprich")},
      {name:"Katja-Stimme",        fn: hatText("Katja")},
      {name:"120ms Delay",         fn: hatText("120")},
      {name:"Weiter-Button",       fn: hatText("weiterBtn")},
    ],
    jsChecks: []
  },
  {
    name: "schule_mathe.html",
    htmlPfad: "./schule_mathe.html",
    htmlChecks: [
      {name:"dwell.js",         fn: hatScript("dwell.js")},
      {name:"error_handler.js", fn: hatScript("error_handler.js")},
      {name:"mathe_data.js",    fn: hatScript("mathe_data.js")},
      {name:"voiceschanged",    fn: hatText("voiceschanged")},
      {name:"LaetitiaSprich",   fn: hatText("LaetitiaSprich")},
      {name:"Katja-Stimme",     fn: hatText("Katja")},
      {name:"120ms Delay",      fn: hatText("120")},
      {name:"Weiter-Button",    fn: hatText("weiterBtn")},
    ],
    jsChecks: []
  },
  {
    name: "schule_lesen.html",
    htmlPfad: "./schule_lesen.html",
    htmlChecks: [
      {name:"dwell.js",         fn: hatScript("dwell.js")},
      {name:"error_handler.js", fn: hatScript("error_handler.js")},
      {name:"lesen_bilder.js",  fn: hatScript("lesen_bilder.js")},
      {name:"lesen_data.js",    fn: hatScript("lesen_data.js")},
      {name:"voiceschanged",    fn: hatText("voiceschanged")},
      {name:"LaetitiaSprich",   fn: hatText("LaetitiaSprich")},
    ],
    jsChecks: [
      {
        name:"lesen_bilder: 10 Pflicht-Keys",
        pfad:"./schule_lesen_bilder.js",
        fn: function(){
          var keys = ["marienkaefer","fruehlingszeit","baum","igel","erdbeere",
                      "kleidung","fruehblueher","tulpe","osterfest","himbeereis"];
          var obj = window.SCHULE_LESEN_BILDER;
          if(!obj){
            for(var k in window){
              if(typeof window[k]==="object" && window[k] && window[k]["marienkaefer"]){ obj=window[k]; break; }
            }
          }
          if(!obj) return {ok:false, msg:"Bilder-Objekt nicht gefunden"};
          var vorh = keys.filter(function(k){return !!obj[k];});
          if(vorh.length < 10) return {ok:false, msg: vorh.length + "/10 fehlt: " + keys.filter(function(k){return !obj[k];}).join(", ")};
          return {ok:true, msg: Object.keys(obj).length + " Bilder, alle 10 Keys ok"};
        }
      }
    ]
  }
];

// UI
function buildUI(){
  var liste = document.getElementById("modulListe");
  liste.innerHTML = "";
  MODULE.forEach(function(m, i){
    var card = document.createElement("div");
    card.className = "modul-card"; card.id = "card_"+i;
    card.innerHTML =
      "<div class=\"ampel\" id=\"ampel_"+i+"\">&#9675;</div>"+
      "<div class=\"modul-info\">"+
        "<div class=\"modul-name\">"+m.name+"</div>"+
        "<div id=\"detail_"+i+"\"></div>"+
      "</div>";
    liste.appendChild(card);
  });
}

function setzeStatus(idx, ok, details){
  document.getElementById("card_"+idx).className = "modul-card " + (ok?"ok":"fehler");
  document.getElementById("ampel_"+idx).textContent = ok ? "OK" : "!!";
  document.getElementById("detail_"+idx).innerHTML = details.map(function(d){
    var cls = d.skip ? "info" : (d.ok ? "ok" : "fehler");
    var icon = d.skip ? "o" : (d.ok ? "+" : "-");
    return "<div class=\"check-zeile "+cls+"\">["+icon+"] "+d.name+": "+d.msg+"</div>";
  }).join("");
}

async function testModul(modul, idx){
  document.getElementById("ampel_"+idx).textContent = "...";
  document.getElementById("card_"+idx).className = "modul-card laeuft";

  var details = [];
  var allOk = true;

  if(MODUS === "fetch"){
    var r = await ladeHtmlFetch(modul.htmlPfad);
    if(!r.ok){
      details.push({ok:false, name:"Datei laden", msg:r.fehler});
      setzeStatus(idx, false, details);
      return false;
    }
    var html = r.html;
    modul.htmlChecks.forEach(function(c){
      var res = c.fn(html);
      details.push({ok:res.ok, name:c.name, msg:res.msg});
      if(!res.ok) allOk = false;
    });
  } else {
    details.push({ok:true, skip:true, name:"HTML-Checks", msg:"uebersprungen (kein --allow-file-access-from-files)"});
  }

  for(var j=0; j < modul.jsChecks.length; j++){
    var jc = modul.jsChecks[j];
    var jres = await ladeScriptUndPruefe(jc.pfad, jc.fn);
    details.push({ok:jres.ok, name:jc.name, msg:jres.msg});
    if(!jres.ok) allOk = false;
  }

  var echteChecks = details.filter(function(d){return !d.skip;});
  if(echteChecks.length === 0){
    document.getElementById("card_"+idx).className = "modul-card laeuft";
    document.getElementById("ampel_"+idx).textContent = "~";
    document.getElementById("detail_"+idx).innerHTML =
      details.map(function(d){
        return "<div class=\"check-zeile info\">[o] "+d.name+": "+d.msg+"</div>";
      }).join("");
    return true;
  }

  setzeStatus(idx, allOk, details);
  return allOk;
}

async function allesTesten(){
  var btn = document.getElementById("btnTest");
  btn.disabled = true; btn.textContent = "Teste...";
  document.getElementById("zusammenfassung").className = "zusammenfassung";
  buildUI();

  var ok=0, fehler=0;
  for(var i=0; i<MODULE.length; i++){
    document.getElementById("progressFill").style.width = Math.round(i/MODULE.length*100)+"%";
    var res = await testModul(MODULE[i], i);
    if(res) ok++; else fehler++;
  }
  document.getElementById("progressFill").style.width = "100%";

  var zus = document.getElementById("zusammenfassung");
  zus.className = "zusammenfassung sichtbar";
  zus.style.borderLeftColor = fehler===0 ? "#16a34a" : "#dc2626";
  if(MODUS === "script"){
    zus.textContent = "Script-Modus: JS-Checks fertig. HTML-Checks benoetigen --allow-file-access-from-files.";
  } else {
    zus.textContent = fehler===0
      ? "Alle " + ok + " Module bestanden!"
      : ok + " bestanden / " + fehler + " mit Problemen";
  }

  btn.disabled = false;
  btn.textContent = "Nochmal testen";
}

pruefeModusUndInit();
