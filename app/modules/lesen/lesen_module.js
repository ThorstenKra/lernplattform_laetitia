// app/modules/lesen/lesen.module.js
// IIFE (kein ES-Modul) – wird per <script src> geladen
(function(){
  "use strict";
  const MK = window.LaetitiaModuleKit;
  if(!MK || typeof MK.createFourChoiceModule !== "function"){
    const st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: moduleKit fehlt.";
    return;
  }
  let tasks = [];
  try{
    const api = window.LaetitiaDataRegistryApi;
    const v = api && typeof api.get === "function" ? api.get("lesen") : null;
    if(Array.isArray(v) && v.length > 0) tasks = v;
  }catch(e){}
  if(tasks.length === 0 && Array.isArray(window.LaetitiaLesenTasks)){
    tasks = window.LaetitiaLesenTasks;
  }
  const mod = MK.createFourChoiceModule({
    moduleId:   "lesen",
    moduleName: "Leseverständnis",
    icon:       "🔊",
    tasks,
    levelOrder: ["L1","L2","L3","L4","L5","L6","L7","L8"],
    levelLabel: (lv) => ({
      L1:"L1 – sehr einfach", L2:"L2 – einfach",
      L3:"L3 – mittel",       L4:"L4 – anspruchsvoll",
      L5:"L5 – Aufbau 1",     L6:"L6 – Aufbau 2",
      L7:"L7 – Transfer 1",   L8:"L8 – Transfer 2"
    }[lv] || lv),
    readAloud:   true,
    allowUnlock: false,
    audio: {
      lob: ["audio/lob_01.wav","audio/lob_02.wav","audio/lob_03.wav",
            "audio/lob_04.wav","audio/lob_05.wav","audio/lob_06.wav",
            "audio/lob_07.wav","audio/lob_08.wav","audio/lob_09.wav","audio/lob_10.wav"],
      abschluss: ["audio/abschluss_01.wav","audio/abschluss_02.wav",
                  "audio/abschluss_03.wav","audio/abschluss_04.wav","audio/abschluss_05.wav"],
      falsch:       "audio/system_falsch.wav",
      richtigWaere: "audio/system_richtig_waere.wav",
      geschafft:    "audio/system_geschafft.wav",
      freischalten: "audio/system_freischalten.wav"
    },
    onHelp: (task) => {
      if(!task) return;
      const params = new URLSearchParams({
        text:  task.text  || "",
        frage: task.frage || "",
        stufe: task.stufe || ""
      });
      window.location.href = "./lesen_hilfe.html?" + params.toString();
    }
  });
  mod.init().catch(err => {
    const st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: " +
      String(err && err.message ? err.message : err);
  });
})();
