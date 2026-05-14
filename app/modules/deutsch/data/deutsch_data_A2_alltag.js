// deutsch_data_A2_alltag.js
// A2-Aufgaben: Alltagssituationen, 2 Saetze Text + Frage + erklaerung (neue Version)
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── Morgens ──────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"301",
    text:"Jonas wacht früh auf und schaut aus dem Fenster.\nDraußen liegt frischer Schnee auf dem Boden.",
    frage:"Was sieht Jonas aus dem Fenster?",
    antwort_a:"Starken Regen",
    antwort_b:"Frischen Schnee",
    antwort_c:"Einen Regenbogen",
    antwort_d:"Dichten Nebel",
    richtig:"B",
    erklaerung:"Jonas schaut aus dem Fenster und sieht frischen Schnee auf dem Boden." },

  { stufe:"A2", seite:"302",
    text:"Mama bereitet das Frühstück vor.\nSie schneidet Obst und macht Joghurt dazu.",
    frage:"Was macht Mama zum Frühstück?",
    antwort_a:"Sie backt Brötchen",
    antwort_b:"Sie kocht Eier",
    antwort_c:"Sie schneidet Obst und macht Joghurt dazu",
    antwort_d:"Sie brät Speck",
    richtig:"C",
    erklaerung:"Mama bereitet Frühstück vor: Sie schneidet Obst und macht Joghurt dazu." },

  { stufe:"A2", seite:"303",
    text:"Felix zieht sich für die Schule an.\nEr findet nur einen Handschuh.",
    frage:"Was findet Felix nur einen davon?",
    antwort_a:"Schuh",
    antwort_b:"Socke",
    antwort_c:"Handschuh",
    antwort_d:"Stiefel",
    richtig:"C",
    erklaerung:"Felix findet beim Anziehen nur einen Handschuh — der andere fehlt." },

  // ── Schule ───────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"304",
    text:"Im Unterricht erklärt die Lehrerin die Aufgabe.\nAnna meldet sich als erste.",
    frage:"Was macht Anna im Unterricht?",
    antwort_a:"Sie flüstert mit ihrer Freundin",
    antwort_b:"Sie meldet sich als erste",
    antwort_c:"Sie schreibt die Aufgabe ab",
    antwort_d:"Sie schläft fast ein",
    richtig:"B",
    erklaerung:"Als die Lehrerin die Aufgabe erklärt, meldet sich Anna als erste." },

  { stufe:"A2", seite:"305",
    text:"In der Schulpause spielen die Kinder Fangen.\nDer schnellste Junge fängt alle.",
    frage:"Was macht der schnellste Junge?",
    antwort_a:"Er rennt weg",
    antwort_b:"Er fängt alle",
    antwort_c:"Er fällt hin",
    antwort_d:"Er schaut zu",
    richtig:"B",
    erklaerung:"Der schnellste Junge läuft am schnellsten und fängt deshalb alle anderen." },

  { stufe:"A2", seite:"306",
    text:"Paul hat seinen Ranzen falsch gepackt.\nEr hat zwei linke Turnschuhe eingepackt.",
    frage:"Was hat Paul falsch eingepackt?",
    antwort_a:"Zwei verschiedene Bücher",
    antwort_b:"Zwei linke Turnschuhe",
    antwort_c:"Zwei Hefte statt Bücher",
    antwort_d:"Zwei Äpfel statt einem",
    richtig:"B",
    erklaerung:"Paul hat den Ranzen falsch gepackt — er hat zwei linke Turnschuhe dabei." },

  // ── Unterwegs ─────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"307",
    text:"Der Bus hat heute Verspätung.\nNina wartet schon zwanzig Minuten an der Haltestelle.",
    frage:"Wie lange wartet Nina an der Haltestelle?",
    antwort_a:"Fünf Minuten",
    antwort_b:"Eine Stunde",
    antwort_c:"Zwanzig Minuten",
    antwort_d:"Zehn Minuten",
    richtig:"C",
    erklaerung:"Der Bus hat Verspätung — Nina wartet schon zwanzig Minuten an der Haltestelle." },

  { stufe:"A2", seite:"308",
    text:"Oma geht zum Wochenmarkt.\nSie kauft frisches Gemüse und selbstgemachte Marmelade.",
    frage:"Was kauft Oma auf dem Wochenmarkt?",
    antwort_a:"Kleidung und Schuhe",
    antwort_b:"Frisches Gemüse und Marmelade",
    antwort_c:"Blumen und Töpfe",
    antwort_d:"Bücher und Zeitschriften",
    richtig:"B",
    erklaerung:"Oma kauft auf dem Wochenmarkt frisches Gemüse und selbstgemachte Marmelade." },

  { stufe:"A2", seite:"309",
    text:"Tom fährt mit dem Fahrrad zur Schule.\nEr muss zweimal die Klingel läuten, damit Fußgänger Platz machen.",
    frage:"Wozu benutzt Tom die Klingel?",
    antwort_a:"Um Freunde zu begrüßen",
    antwort_b:"Um Platz auf dem Weg zu bekommen",
    antwort_c:"Um die Zeit anzuzeigen",
    antwort_d:"Um den Reifen zu prüfen",
    richtig:"B",
    erklaerung:"Tom klingelt zweimal, damit die Fußgänger Platz machen und er vorbeikann." },

  // ── Zuhause ──────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"310",
    text:"Klara räumt nach dem Mittagessen den Tisch ab.\nSie stellt die sauberen Teller in den Schrank.",
    frage:"Was macht Klara nach dem Mittagessen?",
    antwort_a:"Sie wäscht die Teller ab",
    antwort_b:"Sie räumt den Tisch ab und stellt Teller in den Schrank",
    antwort_c:"Sie kocht Kaffee",
    antwort_d:"Sie geht schlafen",
    richtig:"B",
    erklaerung:"Klara räumt den Tisch ab und stellt die sauberen Teller in den Schrank." },

  { stufe:"A2", seite:"311",
    text:"Papa repariert den kaputten Stuhl.\nEr braucht Schrauben und einen Schraubenzieher.",
    frage:"Was braucht Papa für die Reparatur?",
    antwort_a:"Hammer und Nägel",
    antwort_b:"Klebeband und Schere",
    antwort_c:"Schrauben und einen Schraubenzieher",
    antwort_d:"Farbe und Pinsel",
    richtig:"C",
    erklaerung:"Papa repariert den Stuhl — dafür braucht er Schrauben und einen Schraubenzieher." },

  { stufe:"A2", seite:"312",
    text:"Die Blumen auf dem Balkon brauchen Wasser.\nMia gießt sie jeden Morgen mit der Gießkanne.",
    frage:"Wann gießt Mia die Blumen?",
    antwort_a:"Jeden Abend",
    antwort_b:"Einmal in der Woche",
    antwort_c:"Jeden Morgen",
    antwort_d:"Nur am Wochenende",
    richtig:"C",
    erklaerung:"Mia gießt die Blumen auf dem Balkon jeden Morgen mit der Gießkanne." },

  // ── Einkaufen ────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"313",
    text:"Frau Braun kauft im Supermarkt Brot und Milch.\nAn der Kasse stellt sie fest, dass sie ihre Geldbörse vergessen hat.",
    frage:"Was vergisst Frau Braun?",
    antwort_a:"Ihre Einkaufstasche",
    antwort_b:"Ihre Geldbörse",
    antwort_c:"Ihre Einkaufsliste",
    antwort_d:"Ihren Schlüssel",
    richtig:"B",
    erklaerung:"An der Kasse merkt Frau Braun, dass sie ihre Geldbörse vergessen hat." },

  { stufe:"A2", seite:"314",
    text:"Der Bäcker backt jeden Morgen frische Brötchen.\nUm sieben Uhr öffnet er seinen Laden.",
    frage:"Wann öffnet der Bäcker seinen Laden?",
    antwort_a:"Um sechs Uhr",
    antwort_b:"Um acht Uhr",
    antwort_c:"Um sieben Uhr",
    antwort_d:"Um neun Uhr",
    richtig:"C",
    erklaerung:"Der Bäcker öffnet seinen Laden um sieben Uhr — da sind die Brötchen frisch gebacken." },

  { stufe:"A2", seite:"315",
    text:"Lena kauft im Geschäft ein rotes Kleid.\nEs ist ihr Lieblingskleid für Feste.",
    frage:"Wofür kauft Lena das Kleid?",
    antwort_a:"Für die Schule",
    antwort_b:"Für den Sport",
    antwort_c:"Für Feste",
    antwort_d:"Für die Gartenarbeit",
    richtig:"C",
    erklaerung:"Lena kauft das rote Kleid, weil es ihr Lieblingskleid für Feste ist." },

  // ── Natur und Tiere ──────────────────────────────────────────────────────

  { stufe:"A2", seite:"316",
    text:"Im Garten sitzt ein Eichhörnchen auf dem Zaun.\nEs hält eine Nuss in den Pfoten.",
    frage:"Was hält das Eichhörnchen in den Pfoten?",
    antwort_a:"Einen Apfel",
    antwort_b:"Eine Nuss",
    antwort_c:"Ein Blatt",
    antwort_d:"Einen Zweig",
    richtig:"B",
    erklaerung:"Das Eichhörnchen sitzt auf dem Zaun und hält eine Nuss in den Pfoten." },

  { stufe:"A2", seite:"317",
    text:"Im Herbst fallen die bunten Blätter von den Bäumen.\nMax sammelt sie und bastelt ein Bild.",
    frage:"Was macht Max mit den Blättern?",
    antwort_a:"Er verbrennt sie",
    antwort_b:"Er bastelt ein Bild",
    antwort_c:"Er wirft sie fort",
    antwort_d:"Er presst sie ins Buch",
    richtig:"B",
    erklaerung:"Max sammelt die bunten Herbstblätter und bastelt damit ein Bild." },

  { stufe:"A2", seite:"318",
    text:"Im Frühling blühen die ersten Blumen.\nBienen fliegen von Blüte zu Blüte.",
    frage:"Was machen die Bienen im Frühling?",
    antwort_a:"Sie schlafen noch",
    antwort_b:"Sie bauen neue Nester",
    antwort_c:"Sie fliegen von Blüte zu Blüte",
    antwort_d:"Sie fressen Honig",
    richtig:"C",
    erklaerung:"Im Frühling fliegen die Bienen von Blüte zu Blüte, wenn die ersten Blumen blühen." },

  // ── Sport und Freizeit ───────────────────────────────────────────────────

  { stufe:"A2", seite:"319",
    text:"Nico trainiert zweimal in der Woche Fußball.\nSein Trainer lobt ihn für seinen guten Pass.",
    frage:"Wofür lobt der Trainer Nico?",
    antwort_a:"Für sein schnelles Laufen",
    antwort_b:"Für seinen guten Pass",
    antwort_c:"Für sein Tor",
    antwort_d:"Für seine Ausdauer",
    richtig:"B",
    erklaerung:"Der Trainer lobt Nico für seinen guten Pass beim Fußballtraining." },

  { stufe:"A2", seite:"320",
    text:"Sara liest jeden Abend vor dem Schlafen.\nSie liest gerade ein Buch über Delfine.",
    frage:"Worüber liest Sara gerade?",
    antwort_a:"Über Wale",
    antwort_b:"Über Delfine",
    antwort_c:"Über Haie",
    antwort_d:"Über Pinguine",
    richtig:"B",
    erklaerung:"Sara liest vor dem Schlafen ein Buch über Delfine." },

  { stufe:"A2", seite:"321",
    text:"Die Kinder bauen im Winter einen Schneemann.\nSie setzen ihm einen alten Hut auf den Kopf.",
    frage:"Was setzen die Kinder dem Schneemann auf?",
    antwort_a:"Eine Mütze",
    antwort_b:"Einen Schal",
    antwort_c:"Einen alten Hut",
    antwort_d:"Eine Perücke",
    richtig:"C",
    erklaerung:"Die Kinder bauen einen Schneemann und setzen ihm einen alten Hut auf den Kopf." },

  // ── Kochen und Essen ─────────────────────────────────────────────────────

  { stufe:"A2", seite:"322",
    text:"Opa kocht heute Mittag Kartoffelsuppe.\nEr würzt sie mit Pfeffer und Petersilie.",
    frage:"Was kocht Opa heute Mittag?",
    antwort_a:"Tomatensuppe",
    antwort_b:"Kartoffelsuppe",
    antwort_c:"Erbsensuppe",
    antwort_d:"Hühnersuppe",
    richtig:"B",
    erklaerung:"Opa kocht Kartoffelsuppe und würzt sie mit Pfeffer und Petersilie." },

  { stufe:"A2", seite:"323",
    text:"Ben hilft Mama beim Kuchenbacken.\nEr rührt den Teig kräftig mit dem Löffel.",
    frage:"Was macht Ben beim Backen?",
    antwort_a:"Er streut Mehl auf den Tisch",
    antwort_b:"Er rührt den Teig kräftig",
    antwort_c:"Er heizt den Ofen auf",
    antwort_d:"Er schmiert die Form ein",
    richtig:"B",
    erklaerung:"Ben hilft beim Kuchenbacken und rührt den Teig kräftig mit dem Löffel." },

  // ── Abend ────────────────────────────────────────────────────────────────

  { stufe:"A2", seite:"324",
    text:"Die Familie spielt nach dem Abendessen ein Brettspiel.\nOpa gewinnt dreimal hintereinander.",
    frage:"Wer gewinnt das Brettspiel?",
    antwort_a:"Papa",
    antwort_b:"Die Kinder",
    antwort_c:"Mama",
    antwort_d:"Opa",
    richtig:"D",
    erklaerung:"Opa gewinnt das Brettspiel dreimal hintereinander — er ist sehr gut!" },

  { stufe:"A2", seite:"325",
    text:"Emma legt vor dem Schlafen ihre Sachen für morgen bereit.\nSie packt auch ihren Pausensnack in die Tasche.",
    frage:"Was packt Emma in die Tasche?",
    antwort_a:"Ihr Lieblingsbuch",
    antwort_b:"Ihren Pausensnack",
    antwort_c:"Ihre Hausschuhe",
    antwort_d:"Ihr Portemonnaie",
    richtig:"B",
    erklaerung:"Emma legt alles für morgen bereit und packt auch ihren Pausensnack in die Tasche." }

];

var existing = D.get("deutsch") || [];
var ohneAlteA2 = existing.filter(function(t){
  return (t.stufe || "").toUpperCase() !== "A2";
});
D.set("deutsch", ohneAlteA2.concat(aufgaben));

})();
