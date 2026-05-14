// sinnesorgane_quiz_mod.js -- Laetitia Lernsystem
// Quiz-Modul: Sinnesorgane S1 + S2
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
    moduleId:   "sinnesorgane",
    moduleName: "Sinnesorgane",
    icon:       "👁️",
    dataKey:    "sinnesorgane",

    levelOrder: ["S1","S2"],

    levelLabel: function(lv){
      var namen = {
        S1: "S1 - Welches Sinnesorgan?",
        S2: "S2 - Was kann es?"
      };
      return namen[lv] || lv;
    },

    allowUnlock: false,

    finishTextGut:    "Du kennst dich super mit den Sinnesorganen aus!",
    finishTextWeiter: "Die Sinnesorgane sind spannend. Üb weiter!"
  });

  mod.init().then(function(){
    // Erfolgreich
  }).catch(function(err){
    var st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: " + String(err && err.message ? err.message : err);
  });

})();
