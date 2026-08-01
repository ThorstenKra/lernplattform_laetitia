// rechengeschichten_data.js -- Laetitia Lernsystem
// Rechengeschichten-Bibliothek für Fabu (Geschichtenerzähler-Agent): window.RECHENGESCHICHTEN
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
//
// Gleiche Abschnitte-Form wie GESCHICHTEN/GEDICHTE, mit einer Erweiterung:
// Abschnitte, die eine Matheaufgabe stellen, haben zusätzlich "richtig" (die
// korrekte Antwort aus "vorschlaege") und "erklaerung" (Rechenweg in Worten).
// Diese Abschnitte werden von fabu_mod.js lokal/offline ausgewertet (kein
// Gemini-Aufruf) -- richtig/falsch ist bei Mathe eindeutig, das darf nicht
// Gemini ueberlassen werden. Abschnitte OHNE "richtig" bleiben echte
// Diskussionsfragen wie gewohnt (reagiereAufAntwort, Gemini-Live-Reaktion).
// Zahlenbereich orientiert sich an Mathe M1-M4 (Addition/Subtraktion bis 20).

window.RECHENGESCHICHTEN = [
  {
    id: "fabu_sammelt_nuesse",
    titel: "Fabu sammelt Nüsse",
    emoji: "🌰",
    abschnitte: [
      {
        text: "Es ist Herbst im Wald. Die Blätter sind bunt und fallen von den Bäumen. Fabu der Fuchs geht durch den Wald und sammelt Nüsse für den Winter."
      },
      {
        text: "Fabu findet 3 Nüsse unter einer Eiche. Dann findet er noch 2 Nüsse unter einem Busch.",
        frage: "Wie viele Nüsse hat Fabu jetzt zusammen?",
        vorschlaege: ["4", "5", "6", "3"],
        richtig: "5",
        erklaerung: "3 Nüsse und 2 Nüsse macht 5 Nüsse. 3 + 2 = 5."
      },
      {
        text: "Fabu freut sich über die Nüsse. Er trägt sie vorsichtig in seiner kleinen Tasche weiter durch den Wald, zu seinem gemütlichen Bau unter der alten Eiche."
      },
      {
        text: "Zu Hause legt Fabu seine 5 Nüsse auf einen Haufen. Dann isst er 2 Nüsse als kleinen Snack.",
        frage: "Wie viele Nüsse hat Fabu jetzt noch?",
        vorschlaege: ["3", "2", "4", "7"],
        richtig: "3",
        erklaerung: "5 Nüsse minus 2 gegessene Nüsse sind noch 3 Nüsse übrig. 5 - 2 = 3."
      },
      {
        text: "Fabu kuschelt sich zufrieden in sein weiches Nest aus Blättern. Der Winter kann kommen — er hat genug gesammelt.",
        frage: "Was sammelst du gerne, wenn du draußen spazieren gehst?",
        vorschlaege: ["Steine", "Blätter", "Blumen", "Nichts, ich schaue nur"],
        ende: true
      }
    ]
  },
  {
    id: "der_wald_markt",
    titel: "Der Wald-Markt",
    emoji: "🧺",
    abschnitte: [
      {
        text: "Im Wald gibt es einmal im Jahr einen kleinen Markt. Die Tiere tauschen dort, was sie gesammelt haben. Fabu geht mit seinem Korb voller Beeren dorthin."
      },
      {
        text: "Fabu hat 8 Beeren in seinem Korb. Der Igel schenkt ihm noch 6 Beeren dazu.",
        frage: "Wie viele Beeren hat Fabu jetzt?",
        vorschlaege: ["13", "14", "15", "12"],
        richtig: "14",
        erklaerung: "8 Beeren und 6 Beeren dazu sind 14 Beeren. 8 + 6 = 14."
      },
      {
        text: "Am Marktstand vom Eichhörnchen liegen glänzende Kastanien. Fabu bleibt stehen und schaut sie sich an."
      },
      {
        text: "Das Eichhörnchen hatte 20 Kastanien auf seinem Tisch. Es hat schon 9 Kastanien an andere Tiere verkauft.",
        frage: "Wie viele Kastanien liegen noch auf dem Tisch?",
        vorschlaege: ["11", "10", "12", "9"],
        richtig: "11",
        erklaerung: "20 Kastanien minus 9 verkaufte sind noch 11 Kastanien übrig. 20 - 9 = 11."
      },
      {
        text: "Fabu tauscht ein paar Beeren gegen eine schöne glänzende Kastanie. Zufrieden macht er sich auf den Heimweg, die Kastanie fest in der Pfote.",
        frage: "Was würdest du auf dem Wald-Markt gerne eintauschen?",
        vorschlaege: ["Etwas zum Naschen", "Etwas Glitzerndes", "Ein Kuscheltier", "Ich würde nur zuschauen"],
        ende: true
      }
    ]
  },
  {
    id: "die_eichhoernchen_party",
    titel: "Die Eichhörnchen-Party",
    emoji: "🎉",
    abschnitte: [
      {
        text: "Die Eichhörnchen feiern heute ein großes Fest im Wald. Überall hängen bunte Blätter als Girlanden. Fabu ist eingeladen und bringt ein Geschenk mit."
      },
      {
        text: "Am Anfang tanzen 4 kleine Eichhörnchen im Kreis. Dann kommen noch 5 Eichhörnchen dazu und tanzen mit.",
        frage: "Wie viele Eichhörnchen tanzen jetzt zusammen?",
        vorschlaege: ["8", "9", "10", "7"],
        richtig: "9",
        erklaerung: "4 Eichhörnchen und 5 Eichhörnchen dazu sind 9 Eichhörnchen. 4 + 5 = 9."
      },
      {
        text: "Auf dem Festtisch stehen kleine Schalen mit Nüssen und Beeren. Es duftet nach frisch gebackenem Waldbrot."
      },
      {
        text: "Auf dem Tisch stehen 12 kleine Kuchen. Die Gäste essen im Laufe des Festes 7 Kuchen auf.",
        frage: "Wie viele Kuchen sind noch übrig?",
        vorschlaege: ["5", "6", "4", "7"],
        richtig: "5",
        erklaerung: "12 Kuchen minus 7 gegessene sind noch 5 Kuchen übrig. 12 - 7 = 5."
      },
      {
        text: "Als die Sonne untergeht, sitzen alle zusammen und schauen in den rosa Himmel. Es war ein wundervolles Fest.",
        frage: "Was ist dein Lieblingsteil an einer Feier?",
        vorschlaege: ["Das Essen", "Die Musik und der Tanz", "Die Freunde treffen", "Die Geschenke"],
        ende: true
      }
    ]
  }
];
