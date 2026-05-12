(function(){
  "use strict";
  // dataLoader.js — lädt Aufgaben aus JSON oder CSV
  async function fetchText(url){
    const res = await fetch(url, {cache:"no-store"});
    if(!res.ok) throw new Error("Konnte nicht laden: " + url);
    return await res.text();
  }

  async function loadTasks(url){
    const lower = String(url||"").toLowerCase();
    if(lower.endsWith(".json")){
      const res = await fetch(url, {cache:"no-store"});
      if(!res.ok) throw new Error("Konnte nicht laden: " + url);
      const json = await res.json();
      if(Array.isArray(json)) return json;
      if(Array.isArray(json.tasks)) return json.tasks;
      return [];
    }
    // default: CSV/DSV
    const txt = await fetchText(url);
    const rows = (window.LaetitiaCSV && LaetitiaCSV.parse) ? LaetitiaCSV.parse(txt, ";") : [];
    // Normalisieren auf die Felder, die unsere 4er-Engine erwartet
    return rows.map(r => ({
      modul: r.modul || r.Modul || "",
      stufe: r.stufe || r.Stufe || "",
      seite: r.seite || r.Seite || "",
      text: r.text || r.Text || "",
      frage: r.frage || r.Frage || "",
      antwort_a: r.antwort_a || r.Antwort_A || r.a || "",
      antwort_b: r.antwort_b || r.Antwort_B || r.b || "",
      antwort_c: r.antwort_c || r.Antwort_C || r.c || "",
      antwort_d: r.antwort_d || r.Antwort_D || r.d || "",
      richtig: r.richtig || r.Richtig || r.loesung || r.Loesung || ""
    }));
  }

  window.LaetitiaDataLoader = { loadTasks };
})();