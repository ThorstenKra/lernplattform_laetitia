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
