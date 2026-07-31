// schule_liesmal3_lies_data.js
// "Lies und male"-Seiten aus "Lies mal 3" als digitale "Lies und leuchte"-Aufgaben
// Jeder Satz = eine Aufgabe: Laetitia bestaetigt ob der Satz stimmt (grün) oder nicht (grau)

(function(){
"use strict";

// Format: saetze = Array von { satz, stimmt: true/false }
// Die ganze Seite ist ein Aufgabenblock den man zusammen durchgeht

var bloecke = [

  // ── Seite 1: Lies und male — Riesen am Strand ───────────────────────────────
  { heft:"liesmal3", seite:1, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Riesen am Strand",
    bild_beschreibung:"Male das Bild nach den Sätzen aus!",
    saetze:[
      { satz:"Riesen tanzen hier am Strand.", stimmt:true },
      { satz:"Sie tragen rote Hosen.", stimmt:true },
      { satz:"Sie halten Blumen in der Hand.", stimmt:true },
      { satz:"Sie trinken Saft aus Dosen.", stimmt:true }
    ]
  },

  // ── Seite 4: Lies und male — Giraffe Gerti ─────────────────────────────────
  { heft:"liesmal3", seite:4, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Giraffe Gerti",
    bild_beschreibung:"Male Gerti nach den Sätzen!",
    frage_am_ende:{ text:"Tragen Giraffen gerne Hüte?", richtig:"B", antwort_a:"Ja", antwort_b:"Nein",
      erklaerung:"Giraffen tragen keine Hüte — das ist eine lustige Geschichte!" },
    saetze:[
      { satz:"Hier siehst du die Giraffe Gerti.", stimmt:true },
      { satz:"Gerti ist eine modische Giraffe.", stimmt:true },
      { satz:"Sie hat einen bunten Hut auf.", stimmt:true },
      { satz:"An dem Hut steckt eine Feder.", stimmt:true },
      { satz:"Um ihren Hals hängt ein Schal.", stimmt:true },
      { satz:"Gerti trägt rote Socken.", stimmt:true },
      { satz:"Ihre Flecken sind grün gefärbt.", stimmt:true },
      { satz:"Gerti steht vor einer gelben Wand.", stimmt:true },
      { satz:"Male viele Blumen an die Wand.", stimmt:true },
      { satz:"Gerti ist eine lustige Giraffe.", stimmt:true }
    ]
  },

  // ── Seite 10: Lies und male — Zwerg Heini ──────────────────────────────────
  { heft:"liesmal3", seite:10, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Zwerg Heini",
    bild_beschreibung:"Male Heini nach den Sätzen!",
    frage_am_ende:{ text:"Gibt es Zwerge nur im Märchen?", richtig:"A", antwort_a:"Ja", antwort_b:"Nein",
      erklaerung:"Richtig, Zwerge gibt es nur in Märchen und Fantasiegeschichten." },
    saetze:[
      { satz:"Das ist der Zwerg Heini.", stimmt:true },
      { satz:"Er steht hinter einem gelben Zaun.", stimmt:true },
      { satz:"Heini trägt eine gestreifte Jacke.", stimmt:true },
      { satz:"Er hat einen roten Bart.", stimmt:true },
      { satz:"Auf Heinis Mütze sind Punkte.", stimmt:true },
      { satz:"Vor dem Zaun sitzt ein kleiner Dino.", stimmt:true },
      { satz:"Der kleine Dino heißt Kleini.", stimmt:true },
      { satz:"Was fliegt denn da herum?", stimmt:true },
      { satz:"Acht kleine lila Wölkchen.", stimmt:true },
      { satz:"Heini und Kleini sind Freunde.", stimmt:true }
    ]
  },

  // ── Seite 16: Lies und male — Krake Kevin ──────────────────────────────────
  { heft:"liesmal3", seite:16, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Krake Kevin",
    bild_beschreibung:"Male Kevin nach den Sätzen!",
    frage_am_ende:{ text:"Tragen Kraken gerne Schmuck?", richtig:"B", antwort_a:"Ja", antwort_b:"Nein",
      erklaerung:"Nein, das ist eine lustige Fantasiegeschichte. Echte Kraken tragen keinen Schmuck." },
    saetze:[
      { satz:"Kevin ist ein Krake.", stimmt:true },
      { satz:"Kraken lieben Kostueme.", stimmt:true },
      { satz:"Kevin findet Prinzen toll.", stimmt:true },
      { satz:"Er trägt eine goldene Krone.", stimmt:true },
      { satz:"und eine Kette mit Diamanten.", stimmt:true },
      { satz:"An seinen Armen sind viele Ringe.", stimmt:true },
      { satz:"Kevin pustet Blasen ins Wasser.", stimmt:true },
      { satz:"Ueberall sind bunte Luftschlangen.", stimmt:true },
      { satz:"Und was liegt da auf dem Boden?", stimmt:true },
      { satz:"Das ist ja ein roter Teppich!", stimmt:true }
    ]
  },

  // ── Seite 22: Lies und male — Koch Konrad ──────────────────────────────────
  { heft:"liesmal3", seite:22, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Koch Konrad",
    bild_beschreibung:"Male Konrad nach den Sätzen!",
    frage_am_ende:{ text:"Werden Spaghetti in Tee gekocht?", richtig:"B", antwort_a:"Ja", antwort_b:"Nein",
      erklaerung:"Nein, Spaghetti werden in Wasser gekocht, nicht in Tee." },
    saetze:[
      { satz:"Das ist der Koch Konrad.", stimmt:true },
      { satz:"Konrad steht hinter seinem Herd.", stimmt:true },
      { satz:"Er hat gerade gekocht.", stimmt:true },
      { satz:"Das sieht man!", stimmt:true },
      { satz:"Auf seiner Mütze steht ein Topf.", stimmt:true },
      { satz:"Sein Gesicht ist grün vom Spinat.", stimmt:true },
      { satz:"Am Kochloeffel haengen Spaghetti.", stimmt:true },
      { satz:"Auf dem Hemd klebt ein Spiegelei.", stimmt:true },
      { satz:"Acht Wuerste fliegen durch die Luft.", stimmt:true },
      { satz:"Konrad freut sich auf das Essen.", stimmt:true }
    ]
  },

  // ── Seite 28: Lies und male — Taucher im Meer ──────────────────────────────
  { heft:"liesmal3", seite:28, typ:"lies_leuchte", stufe:"SL_LIES",
    titel:"Taucher im Meer",
    bild_beschreibung:"Male den Taucher nach den Sätzen!",
    frage_am_ende:{ text:"Gehören Sofas ins Meer?", richtig:"B", antwort_a:"Ja", antwort_b:"Nein",
      erklaerung:"Nein, das ist eine lustige Fantasiegeschichte!" },
    saetze:[
      { satz:"Hier taucht ein Taucher im Meer.", stimmt:true },
      { satz:"Seine Flossen sind braun.", stimmt:true },
      { satz:"Die Pressluftflasche ist gelb.", stimmt:true },
      { satz:"Der Taucheranzug ist rot.", stimmt:true },
      { satz:"Schau auf den Meeresboden!", stimmt:true },
      { satz:"Da steht ja ein gruenes Sofa!", stimmt:true },
      { satz:"Auf dem Sofa liegen Muscheln.", stimmt:true },
      { satz:"und ein alter Schuh.", stimmt:true },
      { satz:"Zwei Seepferdchen tanzen umher.", stimmt:true },
      { satz:"Male das Wasser blau.", stimmt:true }
    ]
  }

];

(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    api.set("schule_liesmal3_lies", bloecke);
  } else {
    window.LaetitiaSchuleLiesmal3Lies = bloecke;
  }
})();

})();
