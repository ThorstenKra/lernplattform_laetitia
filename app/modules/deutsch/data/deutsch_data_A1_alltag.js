// deutsch_data_A1_alltag.js
// A1-Aufgaben: Alltagssituationen mit Humor (neue Version)
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── Zoo ──────────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"401",
    text:"Der Löwe schläft im Zoo.\nEr schnarcht sehr laut.",
    frage:"Was macht der Löwe?",
    antwort_a:"Er brüllt",
    antwort_b:"Er schnarcht sehr laut",
    antwort_c:"Er spielt",
    antwort_d:"Er frisst",
    richtig:"B",
    erklaerung:"Der Löwe schläft und schnarcht dabei sehr laut — Löwen brauchen viel Schlaf!" },

  { stufe:"A1", seite:"402",
    text:"Die Giraffe streckt den Hals sehr weit.\nSie frisst Blätter vom höchsten Ast.",
    frage:"Was frisst die Giraffe?",
    antwort_a:"Äpfel vom Boden",
    antwort_b:"Blätter vom höchsten Ast",
    antwort_c:"Gras auf der Wiese",
    antwort_d:"Möhren aus dem Eimer",
    richtig:"B",
    erklaerung:"Die Giraffe streckt ihren langen Hals und frisst Blätter vom höchsten Ast." },

  { stufe:"A1", seite:"403",
    text:"Der Pinguin watschelt zum Wasser.\nEr fällt dabei hin.",
    frage:"Was passiert dem Pinguin?",
    antwort_a:"Er fliegt davon",
    antwort_b:"Er fällt hin",
    antwort_c:"Er schwimmt fort",
    antwort_d:"Er schläft ein",
    richtig:"B",
    erklaerung:"Der Pinguin watschelt und fällt dabei hin — Pinguine sind beim Gehen nicht besonders geschickt!" },

  // ── Spielzeug ────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"404",
    text:"Tim sucht seinen Lieblingsteddy.\nEr findet ihn im Kühlschrank.",
    frage:"Wo findet Tim seinen Teddy?",
    antwort_a:"Unter dem Bett",
    antwort_b:"Im Kühlschrank",
    antwort_c:"Im Regal",
    antwort_d:"Im Garten",
    richtig:"B",
    erklaerung:"Tim findet seinen Teddy im Kühlschrank — wie er da hingekommen ist, bleibt ein Geheimnis!" },

  { stufe:"A1", seite:"405",
    text:"Mia baut einen Turm aus Bausteinen.\nEr ist sehr hoch — dann fällt er um.",
    frage:"Was passiert mit dem Turm?",
    antwort_a:"Er wird noch höher",
    antwort_b:"Er fällt um",
    antwort_c:"Er bleibt stehen",
    antwort_d:"Er leuchtet",
    richtig:"B",
    erklaerung:"Mia baut einen hohen Turm aus Bausteinen — aber dann fällt er um!" },

  // ── Schule ───────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"406",
    text:"Lukas hat sein Heft vergessen.\nEr schreibt auf seinen Arm.",
    frage:"Worauf schreibt Lukas?",
    antwort_a:"Auf Papier",
    antwort_b:"Auf die Tafel",
    antwort_c:"Auf seinen Arm",
    antwort_d:"Auf den Tisch",
    richtig:"C",
    erklaerung:"Lukas hat sein Heft vergessen und schreibt deshalb auf seinen Arm — das ist kreativ!" },

  { stufe:"A1", seite:"407",
    text:"Die Lehrerin schreibt an die Tafel.\nIhre Kreide bricht mittendrin ab.",
    frage:"Was passiert mit der Kreide?",
    antwort_a:"Sie fällt auf den Boden",
    antwort_b:"Sie bricht ab",
    antwort_c:"Sie verschwindet",
    antwort_d:"Sie wird bunt",
    richtig:"B",
    erklaerung:"Die Kreide bricht mittendrin ab — das passiert Lehrern manchmal!" },

  { stufe:"A1", seite:"408",
    text:"In der Pause isst Lena ihr Brot.\nSie hat die Butter drauf vergessen.",
    frage:"Was hat Lena vergessen?",
    antwort_a:"Das Brot",
    antwort_b:"Ihre Tasche",
    antwort_c:"Die Butter",
    antwort_d:"Ihren Löffel",
    richtig:"C",
    erklaerung:"Lena hat vergessen, Butter auf ihr Brot zu tun — das Brot ist trotzdem schnell weg!" },

  // ── Spielplatz ───────────────────────────────────────────────────────────

  { stufe:"A1", seite:"409",
    text:"Ben schaukelt sehr hoch.\nSeine Schuhe fliegen vom Fuß.",
    frage:"Was passiert beim Schaukeln?",
    antwort_a:"Ben fällt runter",
    antwort_b:"Die Schuhe fliegen vom Fuß",
    antwort_c:"Die Schaukel bricht",
    antwort_d:"Ben schläft ein",
    richtig:"B",
    erklaerung:"Ben schaukelt so hoch, dass seine Schuhe vom Fuß fliegen — das war zu viel Schwung!" },

  { stufe:"A1", seite:"410",
    text:"Sara rutscht die Rutsche hinunter.\nUnten wartet eine Pfütze.",
    frage:"Was wartet unten an der Rutsche?",
    antwort_a:"Ein Hund",
    antwort_b:"Eine Pfütze",
    antwort_c:"Mama",
    antwort_d:"Ein Kissen",
    richtig:"B",
    erklaerung:"Am Ende der Rutsche wartet eine Pfütze — Sara wird nasse Hosen bekommen!" },

  // ── Friseur ──────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"411",
    text:"Nico geht zum Friseur.\nEr will nur wenig abschneiden — aber danach sind seine Haare sehr kurz.",
    frage:"Wie sind Nicos Haare nach dem Friseur?",
    antwort_a:"Sehr lang",
    antwort_b:"Gelockt",
    antwort_c:"Sehr kurz",
    antwort_d:"Bunt",
    richtig:"C",
    erklaerung:"Nico wollte nur wenig abschneiden, aber danach sind die Haare sehr kurz — ups!" },

  { stufe:"A1", seite:"412",
    text:"Klara sitzt beim Friseur.\nSie kämmt auch ihrer Puppe die Haare.",
    frage:"Was macht Klara beim Friseur?",
    antwort_a:"Sie schläft",
    antwort_b:"Sie kämmt ihrer Puppe die Haare",
    antwort_c:"Sie liest ein Buch",
    antwort_d:"Sie singt ein Lied",
    richtig:"B",
    erklaerung:"Klara wartet beim Friseur und kämmt dabei ihrer Puppe die Haare — so vergeht die Zeit!" },

  // ── Tierarzt ─────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"413",
    text:"Der Hund will nicht zum Tierarzt.\nEr versteckt sich unter dem Bett.",
    frage:"Was macht der Hund?",
    antwort_a:"Er springt ins Auto",
    antwort_b:"Er versteckt sich unter dem Bett",
    antwort_c:"Er bellt laut",
    antwort_d:"Er schläft",
    richtig:"B",
    erklaerung:"Der Hund mag den Tierarzt nicht und versteckt sich deshalb unter dem Bett!" },

  { stufe:"A1", seite:"414",
    text:"Die Katze hat Bauchschmerzen.\nBeim Tierarzt schnurrt sie ganz laut.",
    frage:"Was macht die Katze beim Tierarzt?",
    antwort_a:"Sie kratzt",
    antwort_b:"Sie schläft",
    antwort_c:"Sie schnurrt ganz laut",
    antwort_d:"Sie läuft weg",
    richtig:"C",
    erklaerung:"Obwohl die Katze Bauchschmerzen hat, schnurrt sie beim Tierarzt ganz laut — Katzen sind manchmal komisch!" },

  // ── Picknick ─────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"415",
    text:"Die Familie macht ein Picknick im Park.\nEine Ente klaut das Brot.",
    frage:"Wer klaut das Brot?",
    antwort_a:"Ein Hund",
    antwort_b:"Ein Kind",
    antwort_c:"Eine Ente",
    antwort_d:"Eine Taube",
    richtig:"C",
    erklaerung:"Beim Picknick kommt eine Ente und klaut das Brot — Enten sind sehr mutig!" },

  { stufe:"A1", seite:"416",
    text:"Papa packt zu viel Essen ein.\nDie Tasche ist so schwer, dass er sie kaum trägt.",
    frage:"Warum ist die Tasche so schwer?",
    antwort_a:"Die Tasche ist kaputt",
    antwort_b:"Papa hat zu viel Essen eingepackt",
    antwort_c:"Es liegen Steine drin",
    antwort_d:"Das Wetter ist schlecht",
    richtig:"B",
    erklaerung:"Papa hat zu viel Essen fürs Picknick eingepackt — jetzt ist die Tasche sehr schwer!" },

  // ── Geburtstag ───────────────────────────────────────────────────────────

  { stufe:"A1", seite:"417",
    text:"Heute ist Emmas Geburtstag.\nSie pustet alle Kerzen auf einmal aus.",
    frage:"Was macht Emma mit den Kerzen?",
    antwort_a:"Sie bläst eine nach der anderen aus",
    antwort_b:"Sie pustet alle auf einmal aus",
    antwort_c:"Sie zündet sie wieder an",
    antwort_d:"Sie lässt Papa pusten",
    richtig:"B",
    erklaerung:"Emma pustet alle Kerzen auf einmal aus — das ist ein starker Atem!" },

  { stufe:"A1", seite:"418",
    text:"Der Kuchen sieht etwas schief aus.\nMama hat ihn selbst gebacken und ist trotzdem stolz.",
    frage:"Wie sieht der Kuchen aus?",
    antwort_a:"Perfekt rund",
    antwort_b:"Sehr groß",
    antwort_c:"Etwas schief",
    antwort_d:"Ganz bunt",
    richtig:"C",
    erklaerung:"Mama hat den Kuchen selbst gebacken — er sieht etwas schief aus, aber das macht ihn besonders!" },

  // ── Wetter ───────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"419",
    text:"Es schneit und alles ist weiß.\nDer Hund frisst den Schnee.",
    frage:"Was macht der Hund im Schnee?",
    antwort_a:"Er buddelt ein Loch",
    antwort_b:"Er frisst den Schnee",
    antwort_c:"Er läuft nach Hause",
    antwort_d:"Er schläft",
    richtig:"B",
    erklaerung:"Der Hund findet Schnee sehr interessant und frisst ihn einfach — das macht er manchmal!" },

  { stufe:"A1", seite:"420",
    text:"Ein starker Wind bläst Papas Hut vom Kopf.\nEr läuft hinterher.",
    frage:"Was passiert mit Papas Hut?",
    antwort_a:"Er wird nass",
    antwort_b:"Er fliegt vom Kopf",
    antwort_c:"Er wird kleiner",
    antwort_d:"Er fällt in eine Pfütze",
    richtig:"B",
    erklaerung:"Der Wind bläst Papas Hut vom Kopf — jetzt muss Papa rennen!" },

  // ── Bauernhof ────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"421",
    text:"Das Huhn läuft über den Hof.\nEs legt ein Ei mitten in Papas Schuh.",
    frage:"Wohin legt das Huhn das Ei?",
    antwort_a:"Ins Nest",
    antwort_b:"In den Korb",
    antwort_c:"Mitten in Papas Schuh",
    antwort_d:"Auf den Tisch",
    richtig:"C",
    erklaerung:"Das Huhn legt sein Ei mitten in Papas Schuh — das ist eine besondere Überraschung!" },

  { stufe:"A1", seite:"422",
    text:"Die Kuh muht sehr laut.\nSie weckt den ganzen Hof auf.",
    frage:"Was macht die Kuh?",
    antwort_a:"Sie schläft tief",
    antwort_b:"Sie muht sehr laut und weckt alle auf",
    antwort_c:"Sie frisst Heu",
    antwort_d:"Sie läuft weg",
    richtig:"B",
    erklaerung:"Die Kuh muht so laut, dass alle auf dem Hof aufwachen — sie ist der beste Wecker!" },

  // ── Strand ───────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"423",
    text:"Felix baut eine Sandburg am Strand.\nEine Welle spült sie weg.",
    frage:"Was passiert mit der Sandburg?",
    antwort_a:"Sie wird größer",
    antwort_b:"Eine Welle spült sie weg",
    antwort_c:"Sie fällt von selbst um",
    antwort_d:"Ein Kind tritt drauf",
    richtig:"B",
    erklaerung:"Felix hat lange an der Sandburg gebaut — aber eine Welle spült sie leider weg!" },

  { stufe:"A1", seite:"424",
    text:"Oma liegt unter dem Sonnenschirm.\nSie schläft und schnarcht leise.",
    frage:"Was macht Oma am Strand?",
    antwort_a:"Sie schwimmt",
    antwort_b:"Sie liest ein Buch",
    antwort_c:"Sie schläft und schnarcht leise",
    antwort_d:"Sie baut eine Burg",
    richtig:"C",
    erklaerung:"Oma schläft unter dem Sonnenschirm und schnarcht dabei leise — die Meeresluft macht müde!" },

  // ── Hausaufgaben ─────────────────────────────────────────────────────────

  { stufe:"A1", seite:"425",
    text:"Leon macht Hausaufgaben am Küchentisch.\nSein Bleistift rollt immer wieder runter.",
    frage:"Was passiert mit Leons Bleistift?",
    antwort_a:"Er bricht ab",
    antwort_b:"Er verschwindet",
    antwort_c:"Er rollt immer wieder runter",
    antwort_d:"Er wird kleiner",
    richtig:"C",
    erklaerung:"Leons Bleistift rollt immer wieder vom Küchentisch — das ist sehr ärgerlich beim Hausaufgabenmachen!" }

];

var existing = D.get("deutsch") || [];
var ohneAlteA1 = existing.filter(function(t){
  return (t.stufe || "").toUpperCase() !== "A1";
});
D.set("deutsch", ohneAlteA1.concat(aufgaben));

})();
