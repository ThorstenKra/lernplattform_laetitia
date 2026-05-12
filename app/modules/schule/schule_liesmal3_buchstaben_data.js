// schule_liesmal3_buchstaben_data.js
// Buchstabenraetsel aus "Lies mal 3" Seiten 7, 13, 19, 25
// Jeder Hinweis = eine eigene Aufgabe mit 4 Antwortmoeglichkeiten

(function(){
"use strict";

var aufgaben = [

  // ── Seite 7: Loesungswort SPRINGSEIL ────────────────────────────────────────
  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Er ist rund und rollt.",
    frage:"Was ist das?",
    antwort_a:"Fußball", antwort_b:"Apfel", antwort_c:"Stein", antwort_d:"Tisch",
    richtig:"A", erklaerung:"Ein Fußball ist rund und rollt." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Sie ist rot und saftig.",
    frage:"Was ist das?",
    antwort_a:"Banane", antwort_b:"Tomate", antwort_c:"Zitrone", antwort_d:"Gurke",
    richtig:"B", erklaerung:"Eine Tomate ist rot und saftig." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Sie steht an der Straße.",
    frage:"Was ist das?",
    antwort_a:"Baum", antwort_b:"Bank", antwort_c:"Ampel", antwort_d:"Zaun",
    richtig:"C", erklaerung:"Eine Ampel steht an der Straße und zeigt Rot, Gelb oder Grün." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Es ist ein kleines Pferd.",
    frage:"Was ist das?",
    antwort_a:"Esel", antwort_b:"Pony", antwort_c:"Kamel", antwort_d:"Schaf",
    richtig:"B", erklaerung:"Ein Pony ist ein kleines Pferd." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Er kann Feuer spucken.",
    frage:"Was ist das?",
    antwort_a:"Hund", antwort_b:"Löwe", antwort_c:"Drache", antwort_d:"Vogel",
    richtig:"C", erklaerung:"Ein Drache aus dem Märchen spuckt Feuer." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Aus ihm wird getrunken.",
    frage:"Was ist das?",
    antwort_a:"Glas", antwort_b:"Teller", antwort_c:"Topf", antwort_d:"Schüssel",
    richtig:"A", erklaerung:"Aus einem Glas trinkt man." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Sie zeigt uns die Zeit an.",
    frage:"Was ist das?",
    antwort_a:"Kalender", antwort_b:"Uhr", antwort_c:"Sonne", antwort_d:"Lampe",
    richtig:"B", erklaerung:"Eine Uhr zeigt uns die Zeit." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Der Briefträger bringt ihn.",
    frage:"Was ist das?",
    antwort_a:"Paket", antwort_b:"Brief", antwort_c:"Zeitung", antwort_d:"Koffer",
    richtig:"B", erklaerung:"Der Briefträger bringt Briefe und Pakete." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Er hängt an einem Schiff.",
    frage:"Was ist das?",
    antwort_a:"Tau", antwort_b:"Ruder", antwort_c:"Anker", antwort_d:"Segel",
    richtig:"C", erklaerung:"Ein Anker hängt am Schiff und hält es fest." },

  { heft:"liesmal3", seite:7, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SPRINGSEIL",
    text:"Mit ihm kann man würfeln.",
    frage:"Was ist das?",
    antwort_a:"Ball", antwort_b:"Würfel", antwort_c:"Karte", antwort_d:"Stein",
    richtig:"B", erklaerung:"Mit einem Würfel kann man würfeln." },

  // ── Seite 13: Loesungswort LOKOMOTIVE ───────────────────────────────────────
  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Mit ihr können wir riechen.",
    frage:"Was ist das?",
    antwort_a:"Mund", antwort_b:"Ohr", antwort_c:"Nase", antwort_d:"Auge",
    richtig:"C", erklaerung:"Mit der Nase riechen wir." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Mit ihm können wir sehen.",
    frage:"Was ist das?",
    antwort_a:"Ohr", antwort_b:"Auge", antwort_c:"Nase", antwort_d:"Mund",
    richtig:"B", erklaerung:"Mit den Augen können wir sehen." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Er ist gerade im Weltraum.",
    frage:"Was ist das?",
    antwort_a:"Pilot", antwort_b:"Taucher", antwort_c:"Astronaut", antwort_d:"Fahrer",
    richtig:"C", erklaerung:"Ein Astronaut fliegt in den Weltraum." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Er klingelt fruehs am Morgen.",
    frage:"Was ist das?",
    antwort_a:"Telefon", antwort_b:"Wecker", antwort_c:"Vogel", antwort_d:"Radio",
    richtig:"B", erklaerung:"Der Wecker klingelt am Morgen und weckt uns." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"An ihr befinden sich Finger.",
    frage:"Was ist das?",
    antwort_a:"Fuss", antwort_b:"Hand", antwort_c:"Arm", antwort_d:"Schulter",
    richtig:"B", erklaerung:"An der Hand befinden sich Finger." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Er wird am Finger getragen.",
    frage:"Was ist das?",
    antwort_a:"Armband", antwort_b:"Kette", antwort_c:"Ring", antwort_d:"Uhr",
    richtig:"C", erklaerung:"Ein Ring wird am Finger getragen." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Sie kann voll oder leer sein.",
    frage:"Was ist das?",
    antwort_a:"Flasche", antwort_b:"Stein", antwort_c:"Sonne", antwort_d:"Baum",
    richtig:"A", erklaerung:"Eine Flasche kann voll oder leer sein." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Dieses Tier hat zwei Hoecker.",
    frage:"Was ist das?",
    antwort_a:"Elefant", antwort_b:"Kamel", antwort_c:"Lama", antwort_d:"Kuh",
    richtig:"B", erklaerung:"Das Kamel hat zwei Hoecker auf dem Ruecken." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Es steht auf dem Fussballfeld.",
    frage:"Was ist das?",
    antwort_a:"Zaun", antwort_b:"Tor", antwort_c:"Bank", antwort_d:"Fahne",
    richtig:"B", erklaerung:"Das Tor steht auf dem Fussballfeld." },

  { heft:"liesmal3", seite:13, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"LOKOMOTIVE",
    text:"Kaiser und Koenige tragen sie.",
    frage:"Was ist das?",
    antwort_a:"Krone", antwort_b:"Mütze", antwort_c:"Helm", antwort_d:"Kappe",
    richtig:"A", erklaerung:"Kaiser und Koenige tragen eine Krone." },

  // ── Seite 19: Loesungswort SCHMETTERLING ────────────────────────────────────
  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Er leuchtet Schiffen den Weg.",
    frage:"Was ist das?",
    antwort_a:"Leuchtturm", antwort_b:"Laterne", antwort_c:"Sonne", antwort_d:"Mond",
    richtig:"A", erklaerung:"Ein Leuchtturm leuchtet Schiffen den Weg." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Er steht auf vielen Baustellen.",
    frage:"Was ist das?",
    antwort_a:"Bagger", antwort_b:"Kran", antwort_c:"Auto", antwort_d:"Traktor",
    richtig:"B", erklaerung:"Ein Kran steht auf Baustellen und hebt schwere Dinge." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Im Märchen kann man sie zaubern.",
    frage:"Was ist das?",
    antwort_a:"Drachen", antwort_b:"Hexen", antwort_c:"Zwerge", antwort_d:"Riesen",
    richtig:"B", erklaerung:"Im Märchen können Hexen zaubern." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"In ihm sitzt man sehr bequem.",
    frage:"Was ist das?",
    antwort_a:"Stuhl", antwort_b:"Bett", antwort_c:"Sofa", antwort_d:"Kissen",
    richtig:"C", erklaerung:"Auf dem Sofa sitzt oder liegt man sehr bequem." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Aus ihr wird ein Schmetterling geflochten.",
    frage:"Was ist das?",
    antwort_a:"Wolle", antwort_b:"Raupe", antwort_c:"Blume", antwort_d:"Faden",
    richtig:"B", erklaerung:"Aus einer Raupe wird ein Schmetterling." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Auf diesem Planeten leben wir.",
    frage:"Was ist das?",
    antwort_a:"Mond", antwort_b:"Mars", antwort_c:"Erde", antwort_d:"Sonne",
    richtig:"C", erklaerung:"Wir leben auf der Erde." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Er ist suess und schmeckt nicht lecker.",
    frage:"Was ist das? (Das klingt komisch — es stimmt nicht!)",
    antwort_a:"Zucker", antwort_b:"Senf", antwort_c:"Salz", antwort_d:"Pfeffer",
    richtig:"B", erklaerung:"Senf schmeckt nicht suess und lecker wie Zucker." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Sie hat einen sehr langen Hals.",
    frage:"Was ist das?",
    antwort_a:"Elefant", antwort_b:"Giraffe", antwort_c:"Kamel", antwort_d:"Straussenvogel",
    richtig:"B", erklaerung:"Die Giraffe hat den laengsten Hals aller Tiere." },

  { heft:"liesmal3", seite:19, typ:"buchstaben", stufe:"SL_BUCHSTABEN",
    loesungswort:"SCHMETTERLING",
    text:"Ohne Bogen fliegt er nicht weit.",
    frage:"Was ist das?",
    antwort_a:"Pfeil", antwort_b:"Ball", antwort_c:"Stein", antwort_d:"Drachen",
    richtig:"A", erklaerung:"Ein Pfeil wird mit einem Bogen geschossen." }

];

(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    var existing = api.get("schule_liesmal3_buchstaben") || [];
    api.set("schule_liesmal3_buchstaben", existing.filter(function(t){
      return t.heft !== "liesmal3";
    }).concat(aufgaben));
  } else {
    window.LaetitiaSchuleLiesmal3Buchstaben = aufgaben;
  }
})();

})();
