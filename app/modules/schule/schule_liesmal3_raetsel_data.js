// schule_liesmal3_raetsel_data.js
// Raetsel aus "Lies mal 3" Seiten 6, 12, 18
// Format: Beschreibungstext → 3 Antworten (A/B/C), richtige Antwort

(function(){
"use strict";

var aufgaben = [

  // ── Seite 6: 4 Beschreibungsraetsel ────────────────────────────────────────
  { heft:"liesmal3", seite:6, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Man kann sie essen.\nSie haben eine Schale.\nDie Schale ist fest und gelb.\nSie sind nicht lang und nicht krumm.\nSie sind sehr sauer.",
    frage:"Was bin ich?",
    antwort_a:"Bananen", antwort_b:"Zitronen", antwort_c:"Kiwis", antwort_d:"",
    richtig:"B",
    erklaerung:"Zitronen sind rund, gelb und sehr sauer." },

  { heft:"liesmal3", seite:6, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Sie sind Tiere.\nSie sind Haustiere.\nSie leben nicht im Wasser.\nSie haben ein Fell.\nSie können bellen.",
    frage:"Was bin ich?",
    antwort_a:"Fische", antwort_b:"Hunde", antwort_c:"Katzen", antwort_d:"",
    richtig:"B",
    erklaerung:"Nur Hunde können bellen!" },

  { heft:"liesmal3", seite:6, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Sie ist eine Zahl.\nDiese Zahl ist größer als 4.\nDiese Zahl ist kleiner als 10.\nDiese Zahl ist ungerade.\nSo viele Finger hat eine Hand.",
    frage:"Was bin ich?",
    antwort_a:"5", antwort_b:"8", antwort_c:"11", antwort_d:"",
    richtig:"A",
    erklaerung:"Eine Hand hat 5 Finger. 5 ist ungrade, größer als 4 und kleiner als 10." },

  { heft:"liesmal3", seite:6, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Man kann sie nicht sehen.\nSie ist immer um uns herum.\nSie kann warm oder kalt sein.\nWir brauchen sie zum Leben.\nWir atmen sie ein und aus.",
    frage:"Was bin ich?",
    antwort_a:"Lava", antwort_b:"Luft", antwort_c:"Licht", antwort_d:"",
    richtig:"B",
    erklaerung:"Wir atmen Luft. Ohne Luft können wir nicht leben." },

  // ── Seite 12: 4 Beschreibungsraetsel ───────────────────────────────────────
  { heft:"liesmal3", seite:12, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Sie befinden sich am Kopf.\nDer Mensch hat zwei von ihnen.\nWir schmecken nicht mit ihnen.\nWir sehen nicht mit ihnen.\nWir hören mit ihnen.",
    frage:"Was bin ich?",
    antwort_a:"Augen", antwort_b:"Zähne", antwort_c:"Ohren", antwort_d:"",
    richtig:"C",
    erklaerung:"Mit Ohren hören wir. Der Mensch hat zwei Ohren am Kopf." },

  { heft:"liesmal3", seite:12, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Es ist ein Fach in der Schule.\nViele Kinder lieben dieses Fach.\nMan sitzt nicht an einem Tisch.\nMan darf laufen und springen.\nMan turnt in der Turnhalle.",
    frage:"Was bin ich?",
    antwort_a:"Sport", antwort_b:"Kunst", antwort_c:"Musik", antwort_d:"",
    richtig:"A",
    erklaerung:"In Sport turnt man in der Turnhalle." },

  { heft:"liesmal3", seite:12, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Er ist eine Pflanze.\nEr wächst in trockenen Gebieten.\nMan findet ihn sogar in Wüsten.\nEr kann Wasser speichern.\nOft ist er sehr stachelig.",
    frage:"Was bin ich?",
    antwort_a:"Kaktus", antwort_b:"Rosenkohl", antwort_c:"Salat", antwort_d:"",
    richtig:"A",
    erklaerung:"Kaktus wächst in der Wüste und ist stachelig." },

  { heft:"liesmal3", seite:12, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Man kann sie anziehen.\nMaedchen und Jungen tragen sie.\nMan trägt sie nicht auf dem Kopf.\nSie haben keine Ärmel.\nSie haben zwei Beine.",
    frage:"Was bin ich?",
    antwort_a:"Hosen", antwort_b:"Hemden", antwort_c:"Mützen", antwort_d:"",
    richtig:"A",
    erklaerung:"Hosen haben zwei Beine und keine Ärmel." },

  // ── Seite 18: 4 Beschreibungsraetsel ───────────────────────────────────────
  { heft:"liesmal3", seite:18, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Er ist nicht sehr groß.\nMan braucht ihn in der Schule.\nEr ist oft in einem Mäppchen.\nEr hat eine scharfe Klinge.\nMit ihm werden Stifte gespitzt.",
    frage:"Was bin ich?",
    antwort_a:"Stuhl", antwort_b:"Bleistift", antwort_c:"Spitzer", antwort_d:"",
    richtig:"C",
    erklaerung:"Mit einem Spitzer spitzt man Bleistifte." },

  { heft:"liesmal3", seite:18, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Sie sind kleine Tiere.\nSie können sehr gut fliegen.\nSie haben einen haarigen Körper.\nSie haben einen Stachel.\nSie stellen Honig her.",
    frage:"Was bin ich?",
    antwort_a:"Bienen", antwort_b:"Mücken", antwort_c:"Fliegen", antwort_d:"",
    richtig:"A",
    erklaerung:"Bienen machen Honig und haben einen Stachel." },

  { heft:"liesmal3", seite:18, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Sie sind nicht immer zu sehen.\nSie bewegen sich am Himmel.\nSie bewegen sich.\nSie können nicht immer weiß oder grau sein.\nAus ihnen faellt der Regen.",
    frage:"Was bin ich?",
    antwort_a:"Maeuse", antwort_b:"Wolken", antwort_c:"Tauben", antwort_d:"",
    richtig:"B",
    erklaerung:"Aus Wolken kommt der Regen." },

  { heft:"liesmal3", seite:18, typ:"raetsel", stufe:"SL_RAETSEL",
    text:"Mit ihr macht man Musik.\nIhre Toene können sehr laut sein.\nSie hat keine Saiten.\nSie ist aus Metall.\nMan blaest in sie hinein.",
    frage:"Was bin ich?",
    antwort_a:"Trommel", antwort_b:"Trompete", antwort_c:"Geige", antwort_d:"",
    richtig:"B",
    erklaerung:"Die Trompete ist ein Blasinstrument aus Metall." }

];

// In Registry eintragen
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    var existing = api.get("schule_liesmal3_raetsel") || [];
    api.set("schule_liesmal3_raetsel", existing.filter(function(t){
      return t.heft !== "liesmal3";
    }).concat(aufgaben));
  } else {
    window.LaetitiaSchuleLiesmal3Raetsel = aufgaben;
  }
})();

})();
