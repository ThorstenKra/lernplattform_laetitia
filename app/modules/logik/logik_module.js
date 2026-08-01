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

  // ── Milo-Tipp: sokratischer Hinweis je Aufgabentyp (Hilfe-Button, offline) ──
  var MILO_TIPPS = {
    L1: "Schau dir immer drei der vier Dinge an — was haben die gemeinsam? Das vierte gehört nicht dazu.",
    L2: "Schau genau hin, wie sich die Zeichen von einem zum nächsten verändern. Wiederholt sich etwas?",
    L3: "Überlege zuerst, wie die beiden Dinge im ersten Beispiel zusammenhängen. Genau diese Beziehung brauchst du auch für das zweite Beispiel.",
    L4: "Lies den Satz noch einmal ganz genau durch. Stimmt wirklich jedes einzelne Wort?",
    L5: "Überlege: Was passiert normalerweise, wenn genau das eintritt, was im Text beschrieben wird?"
  };

  function zeigeMiloTipp(t){
    var text = (t && MILO_TIPPS[t.stufe]) || "Schau dir die Aufgabe noch einmal ganz genau an.";
    var textEl = document.getElementById("miloTippText");
    var ov     = document.getElementById("overlayMilo");
    if(textEl) textEl.textContent = text;
    if(ov) ov.classList.add("show");
    var AQ = window.LaetitiaAudioQueue;
    if(AQ && typeof AQ.speak === "function") AQ.speak(text, 0.92);
  }

  document.getElementById("btnMiloClose")?.addEventListener("click", function(ev){
    ev.preventDefault();
    try{ window.speechSynthesis.cancel(); }catch(e){}
    var ov = document.getElementById("overlayMilo");
    if(ov) ov.classList.remove("show");
  });

  var mod = kit.createFourChoiceModule({
    moduleId:   "logik",
    moduleName: "Logik",
    icon:       "🧩",
    dataKey:    "logik",

    levelOrder: ["L1","L2","L3","L4","L5"],

    levelLabel: function(lv){
      var namen = {
        L1: "L1 - Was passt nicht?",
        L2: "L2 - Was kommt als Nächstes?",
        L3: "L3 - Was ist ähnlich?",
        L4: "L4 - Richtig oder Falsch?",
        L5: "L5 - Wenn ... dann ...?"
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
