// logik_module.js -- Laetitia Lernsystem
// Logik-Modul: Kategorien, Muster, Analogien, Schlussfolgerungen
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  var kit = window.LaetitiaModuleKit;
  if(!kit || typeof kit.createFourChoiceModule !== "function"){
    var st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: moduleKit fehlt.";
    return;
  }

  // ── Milo-Tipp: Stufe A (offline, sokratischer Hinweis je Aufgabentyp) ───────
  var MILO_TIPPS = {
    L1: "Schau dir immer drei der vier Dinge an — was haben die gemeinsam? Das vierte gehört nicht dazu.",
    L2: "Schau genau hin, wie sich die Zeichen von einem zum nächsten verändern. Wiederholt sich etwas?",
    L3: "Überlege zuerst, wie die beiden Dinge im ersten Beispiel zusammenhängen. Genau diese Beziehung brauchst du auch für das zweite Beispiel.",
    L4: "Lies den Satz noch einmal ganz genau durch. Stimmt wirklich jedes einzelne Wort?",
    L5: "Überlege: Was passiert normalerweise, wenn genau das eintritt, was im Text beschrieben wird?",
    L6: "Überlege, was zuerst da sein oder passieren muss, damit das andere danach überhaupt möglich wird.",
    L7: "Überlege: Was müsste vorher passiert sein, damit genau das entsteht, was in der Frage beschrieben wird?",
    L8: "Lies dir alle vier Sätze der Reihe nach durch — bei welchem passt etwas gar nicht zusammen?",
    L9: "Schau dir beide Mengen genau an und zähle nach, bevor du dich entscheidest.",
    L10: "Schau dir jede Zeile UND jede Spalte an — welche zwei Zeichen sind dort schon zu sehen? Das dritte fehlt noch."
  };

  function offlineTipp(t){
    return (t && MILO_TIPPS[t.stufe]) || "Schau dir die Aufgabe noch einmal ganz genau an.";
  }

  function zeigeMiloOverlay(text, sprechen){
    var textEl = document.getElementById("miloTippText");
    var ov     = document.getElementById("overlayMilo");
    if(textEl) textEl.textContent = text;
    if(ov) ov.classList.add("show");
    if(sprechen !== false){
      var AQ = window.LaetitiaAudioQueue;
      if(AQ && typeof AQ.speak === "function") AQ.speak(text, 0.92);
    }
  }

  // ── Milo-Tipp: Stufe B (online, live per Gemini ueber listener.ps1) ─────────
  // Faellt bei Verbindungsproblemen unauffaellig auf den Stufe-A-Text zurueck
  // (gleiches Fallback-Muster wie Fabus Live-Reaktionen in fabu_mod.js).
  var LISTENER_URL = "http://localhost:9999";
  var MILO_AGENT_ID = "ki_agenten/milo";
  var _miloAnfrageId = 0;

  function apiFetchMilo(daten, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", LISTENER_URL + "/chat", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.timeout = 25000;
    xhr.onload = function(){
      try{ cb(null, JSON.parse(xhr.responseText)); }
      catch(e){ cb(new Error("Antwort ungueltig")); }
    };
    xhr.onerror = xhr.ontimeout = function(){ cb(new Error("Verbindungsfehler")); };
    xhr.send(JSON.stringify(daten));
  }

  function zeigeMiloTipp(t){
    var meineId = ++_miloAnfrageId;
    zeigeMiloOverlay("🦉 Milo denkt nach …", false);

    var kontext = "Ihr uebt gerade zusammen eine Logik-Aufgabe. Die Aufgabe: \"" + (t && t.frage || "") + "\""
      + (t && t.text ? " (" + t.text + ")" : "") + ". "
      + "Die richtige Loesung waere: \"" + (t && t.erklaerung || "") + "\" -- das darfst du NICHT direkt verraten. "
      + "Gib NUR einen kurzen, ermutigenden Denkanstoss (1 Satz, maximal 2), der sie selbst auf die Loesung "
      + "kommen laesst, ohne die Antwort zu nennen.";

    apiFetchMilo({ agent: MILO_AGENT_ID, nachricht: "Kannst du mir einen Tipp geben?", verlauf: [], kontext: kontext }, function(err, data){
      if(meineId !== _miloAnfrageId) return; // ueberholt durch neuere Anfrage
      if(err || !data || data.fehler || !data.antwort){
        zeigeMiloOverlay(offlineTipp(t));
        return;
      }
      zeigeMiloOverlay(data.antwort);
    });
  }

  document.getElementById("btnMiloClose")?.addEventListener("click", function(ev){
    ev.preventDefault();
    _miloAnfrageId++; // laufende Online-Anfrage invalidieren -- Overlay soll nicht nachtraeglich wieder aufspringen
    try{ window.speechSynthesis.cancel(); }catch(e){}
    var ov = document.getElementById("overlayMilo");
    if(ov) ov.classList.remove("show");
  });

  var mod = kit.createFourChoiceModule({
    moduleId:   "logik",
    moduleName: "Logik",
    icon:       "🧩",
    dataKey:    "logik",

    levelOrder: ["L1","L2","L3","L4","L5","L6","L7","L8","L9","L10"],

    levelLabel: function(lv){
      var namen = {
        L1: "L1 - Was passt nicht?",
        L2: "L2 - Was kommt als Nächstes?",
        L3: "L3 - Was ist ähnlich?",
        L4: "L4 - Richtig oder Falsch?",
        L5: "L5 - Wenn ... dann ...?",
        L6: "L6 - Was zuerst, was zuletzt?",
        L7: "L7 - Ursache und Wirkung",
        L8: "L8 - Was stimmt nicht?",
        L9: "L9 - Was ist mehr?",
        L10: "L10 - Muster-Raster"
      };
      return namen[lv] || lv;
    },

    onHelp: zeigeMiloTipp,

    allowUnlock: false,

    finishTextGut:    "Du denkst super logisch!",
    finishTextWeiter: "Logik lernt man durch Üben. Weiter so!",

    audio: {
      lob: [
        "audio/lob_01.wav","audio/lob_02.wav","audio/lob_03.wav",
        "audio/lob_04.wav","audio/lob_05.wav","audio/lob_06.wav",
        "audio/lob_07.wav","audio/lob_08.wav","audio/lob_09.wav",
        "audio/lob_10.wav"
      ],
      abschluss: [
        "audio/abschluss_01.wav","audio/abschluss_02.wav","audio/abschluss_03.wav",
        "audio/abschluss_04.wav","audio/abschluss_05.wav"
      ],
      falsch:       "audio/system_falsch.wav",
      richtigWaere: "audio/system_richtig_waere.wav",
      geschafft:    "audio/system_geschafft.wav",
      freischalten: "audio/system_freischalten.wav"
    }
  });

  mod.init().then(function(){
    // Erfolgreich
  }).catch(function(err){
    var st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: " + String(err && err.message ? err.message : err);
  });

})();
