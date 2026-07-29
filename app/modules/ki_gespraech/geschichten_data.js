// geschichten_data.js -- Laetitia Lernsystem
// Story-Bibliothek fuer Nova: window.GESCHICHTEN
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
//
// Jede Geschichte ist in Abschnitte unterteilt. Nova liest einen Abschnitt vor
// und macht danach eine Pause. Abschnitte mit "frage" zeigen zusaetzlich
// Antwort-Vorschlaege (kleine Gespraechsanregung), Abschnitte ohne "frage"
// gehen nach einer kurzen Pause automatisch weiter (wie Grammatik-Werkstatt
// Auto-Weiter). Der letzte Abschnitt hat "ende:true".
//
// "fluss_schlange" ist eine kindgerechte freie Nacherzaehlung, inspiriert von
// Motiven aus Horacio Quirogas "A la deriva" (Fluss, Schlangenbiss, Kanufahrt)
// -- bewusst mit gutem Ausgang statt Todesfall umgeschrieben, da das Original
// fuer Laetitia thematisch zu belastend waere (siehe UEBERGABE-Dokumentation).

window.GESCHICHTEN = [
  {
    id: "fluss_schlange",
    titel: "Der Fluss und die Schlange",
    emoji: "🛶",
    abschnitte: [
      {
        text: "Ein Mann ging durch den Wald, ganz in der Naehe eines grossen Flusses. Er wollte zurueck zu seiner Huette. Ploetzlich spuerte er einen kleinen Stich am Fuss. Er war auf eine Schlange getreten. Der Mann erschrak, aber er blieb ruhig.",
        frage: "Was, glaubst du, macht der Mann jetzt zuerst?",
        vorschlaege: ["Er ueberlegt kurz", "Er rennt einfach weiter", "Er ruft laut um Hilfe", "Weiss ich nicht"]
      },
      {
        text: "Der Mann band sich ein Tuch um den Fuss. Er wusste genau, was zu tun war: Im Dorf am Fluss gab es einen Arzt. Er lief zu seinem Kanu, stieg ein und paddelte los, so schnell er konnte."
      },
      {
        text: "Der Fluss glitzerte golden in der Abendsonne. Bunte Voegel flogen ueber das Wasser. Der Fuss tat dem Mann weh, und er wurde langsam muede. Aber er dachte an seine Familie, die zu Hause auf ihn wartete, und paddelte einfach weiter.",
        frage: "Der Mann hat Angst, aber er gibt nicht auf. Warst du auch schon mal mutig, obwohl dir etwas Angst gemacht hat?",
        vorschlaege: ["Ja, das kenne ich", "Nein, noch nicht", "Erzaehl weiter", "Was ist dann passiert?"]
      },
      {
        text: "Endlich sah der Mann die Lichter vom Dorf. Ein Freund stand am Ufer und erkannte ihn sofort. Schnell, du brauchst Hilfe, rief er, und half ihm aus dem Kanu. Der Arzt im Dorf kuemmerte sich sofort um die Wunde am Fuss."
      },
      {
        text: "Nach ein paar Tagen ging es dem Mann schon viel besser. Er war sehr froh, dass er schnell ins Kanu gestiegen war, um Hilfe zu holen. Seine Familie freute sich riesig, ihn wieder gesund zu sehen.",
        frage: "Zu wem wuerdest du gehen, wenn dir etwas Schlimmes passiert?",
        vorschlaege: ["Zu Mama oder Papa", "Zu einer Betreuerin", "Zu einem Arzt", "Erzaehl mir noch eine Geschichte"],
        ende: true
      }
    ]
  }
];
