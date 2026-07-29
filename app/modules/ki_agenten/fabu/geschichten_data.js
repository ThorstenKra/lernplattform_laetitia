// geschichten_data.js -- Laetitia Lernsystem
// Story-Bibliothek für Fabu (Geschichtenerzähler-Agent): window.GESCHICHTEN
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
//
// Jede Geschichte ist in Abschnitte unterteilt. Fabu liest einen Abschnitt vor
// und macht danach eine Pause. Abschnitte mit "frage" zeigen zusätzlich
// Antwort-Vorschläge (kleine Gesprächsanregung), Abschnitte ohne "frage"
// gehen nach einer kurzen Pause automatisch weiter (wie Grammatik-Werkstatt
// Auto-Weiter). Der letzte Abschnitt hat "ende:true".
//
// "fluss_schlange" ist eine kindgerechte freie Nacherzählung, inspiriert von
// Motiven aus Horacio Quirogas "A la deriva" (Fluss, Schlangenbiss, Kanufahrt)
// -- bewusst mit gutem Ausgang statt Todesfall umgeschrieben, da das Original
// für Laetitia thematisch zu belastend wäre (siehe ÜBERGABE-Dokumentation).

window.GESCHICHTEN = [
  {
    id: "fluss_schlange",
    titel: "Der Fluss und die Schlange",
    emoji: "🛶",
    abschnitte: [
      {
        text: "Ein Mann ging durch den Wald, ganz in der Nähe eines großen Flusses. Er wollte zurück zu seiner Hütte. Plötzlich spürte er einen kleinen Stich am Fuß. Er war auf eine Schlange getreten. Der Mann erschrak, aber er blieb ruhig.",
        frage: "Was, glaubst du, macht der Mann jetzt zuerst?",
        vorschlaege: ["Er überlegt kurz", "Er rennt einfach weiter", "Er ruft laut um Hilfe", "Weiß ich nicht"]
      },
      {
        text: "Der Mann band sich ein Tuch um den Fuß. Er wusste genau, was zu tun war: Im Dorf am Fluss gab es einen Arzt. Er lief zu seinem Kanu, stieg ein und paddelte los, so schnell er konnte."
      },
      {
        text: "Der Fluss glitzerte golden in der Abendsonne. Bunte Vögel flogen über das Wasser. Der Fuß tat dem Mann weh, und er wurde langsam müde. Aber er dachte an seine Familie, die zu Hause auf ihn wartete, und paddelte einfach weiter.",
        frage: "Der Mann hat Angst, aber er gibt nicht auf. Warst du auch schon mal mutig, obwohl dir etwas Angst gemacht hat?",
        vorschlaege: ["Ja, das kenne ich", "Nein, noch nicht", "Erzähl weiter", "Was ist dann passiert?"]
      },
      {
        text: "Endlich sah der Mann die Lichter vom Dorf. Ein Freund stand am Ufer und erkannte ihn sofort. Schnell, du brauchst Hilfe, rief er, und half ihm aus dem Kanu. Der Arzt im Dorf kümmerte sich sofort um die Wunde am Fuß."
      },
      {
        text: "Nach ein paar Tagen ging es dem Mann schon viel besser. Er war sehr froh, dass er schnell ins Kanu gestiegen war, um Hilfe zu holen. Seine Familie freute sich riesig, ihn wieder gesund zu sehen.",
        frage: "Zu wem würdest du gehen, wenn dir etwas Schlimmes passiert?",
        vorschlaege: ["Zu Mama oder Papa", "Zu einer Betreuerin", "Zu einem Arzt", "Erzähl mir noch eine Geschichte"],
        ende: true
      }
    ]
  }
];
