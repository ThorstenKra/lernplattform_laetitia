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
  },
  {
    id: "kluger_igel",
    titel: "Der kluge Igel",
    emoji: "🦔",
    abschnitte: [
      {
        text: "Im Wald stand ein alter Apfelbaum voller roter Äpfel. Der kleine Igel Stachel schaute hinauf und hatte großen Hunger. Aber er konnte nicht klettern, und die Äpfel hingen viel zu hoch. Da kam der große, starke Dachs Bruno vorbei und schnaubte: Die Äpfel sind viel zu hoch für dich, Kleiner.",
        frage: "Was, glaubst du, macht Stachel jetzt?",
        vorschlaege: ["Er überlegt sich was", "Er gibt auf", "Er bittet Bruno um Hilfe", "Weiß ich nicht"]
      },
      {
        text: "Stachel dachte kurz nach. Dann sagte er: Bruno, du bist so stark – kannst du mal kräftig gegen den Baum stupsen? Bruno lachte, aber er tat es. Er stemmte sich mit aller Kraft gegen den Stamm, und der ganze Baum wackelte kräftig hin und her."
      },
      {
        text: "Plopp, plopp, plopp! Die Äpfel fielen einer nach dem anderen ins weiche Gras. Stachel freute sich riesig. Ich hätte das allein nie geschafft, sagte er zu Bruno. Und ich wäre nie auf die Idee gekommen, den Baum zu schütteln, brummte Bruno anerkennend.",
        frage: "Manchmal schafft man zusammen mehr als allein. Hast du auch schon mal mit jemandem zusammen etwas geschafft?",
        vorschlaege: ["Ja, das kenne ich", "Nein, noch nicht", "Erzähl weiter", "Was ist dann passiert?"]
      },
      {
        text: "Die beiden setzten sich zusammen ins Gras und teilten sich die Äpfel. Bruno sagte: Tut mir leid, dass ich gedacht habe, du kannst nichts machen, weil du klein bist. Du hast einen richtig klugen Kopf, Stachel! Der kleine Igel strahlte vor Stolz."
      },
      {
        text: "Von da an waren Stachel und Bruno die besten Freunde im Wald. Wenn einer von beiden ein Problem hatte, dachten sie einfach gemeinsam nach – und fanden fast immer eine Lösung.",
        frage: "Was kannst du besonders gut, womit du anderen helfen kannst?",
        vorschlaege: ["Gut zuhören", "Gut nachdenken", "Andere aufmuntern", "Weiß ich noch nicht"],
        ende: true
      }
    ]
  },
  {
    id: "amsel_jahreszeiten",
    titel: "Die Amsel und die vier Jahreszeiten",
    emoji: "🐦",
    abschnitte: [
      {
        text: "Im Frühling baute die Amsel Frieda ihr Nest in einem dichten Busch, ganz nah an einem großen Fenster. Von dort aus konnte sie in ein gemütliches Wohnzimmer schauen, in dem oft jemand am Fenster saß. Frieda sammelte Zweig um Zweig und sang dabei ihr schönstes Lied.",
        frage: "Was, glaubst du, baut Frieda als Nächstes in ihr Nest?",
        vorschlaege: ["Weiche Federn", "Ein paar Blätter", "Moos", "Weiß ich nicht"]
      },
      {
        text: "Im Sommer schlüpften drei kleine Amselkinder aus ihren Eiern. Sie waren winzig und hatten großen Hunger. Den ganzen Tag flog Frieda hin und her, um Würmer und Beeren zu holen. Am Fenster gegenüber winkte manchmal eine Hand, wenn die kleinen Vögel piepsten."
      },
      {
        text: "Im Herbst waren die Amselkinder groß genug, um selbst zu fliegen. Eines nach dem anderen breitete die Flügel aus und flog davon, um eigene Wege zu finden. Frieda blieb allein im leeren Nest zurück und war ein bisschen traurig.",
        frage: "Frieda vermisst ihre Kinder. Hast du auch schon mal jemanden vermisst?",
        vorschlaege: ["Ja, das kenne ich", "Nein, noch nicht", "Erzähl weiter", "Was macht sie jetzt?"]
      },
      {
        text: "Im Winter wurde es kalt, und Schnee bedeckte den Garten. Frieda kuschelte sich in einen dichten Tannenbaum, um sich zu wärmen. Abends leuchtete das große Fenster gemütlich warm, und Frieda wusste: bald wird es wieder Frühling."
      },
      {
        text: "Und tatsächlich: Als der Frühling zurückkam, kehrte Frieda genau zu ihrem alten Busch zurück. Sie baute ein neues Nest und sang wieder ihr schönstes Lied, so froh wie eh und je. Manche Dinge kommen eben immer wieder.",
        frage: "Worauf freust du dich, wenn du an nächstes Jahr denkst?",
        vorschlaege: ["Auf den Frühling", "Auf einen Feiertag", "Auf ein Wiedersehen", "Weiß ich noch nicht"],
        ende: true
      }
    ]
  },
  {
    id: "maulwurf_helfer",
    titel: "Der Maulwurf mit der feinen Nase",
    emoji: "🕳️",
    abschnitte: [
      {
        text: "Tief unter der Wiese lebte eine Familie Maulwürfe in einem verzweigten Tunnelsystem. Der kleine Maulwurf Momo hatte viel kleinere Pfoten als seine Geschwister und konnte nicht so schnell graben wie sie. Seine Geschwister gruben schon längst neue Gänge, während Momo noch mühsam an seinem kleinen Tunnel arbeitete.",
        frage: "Wie, glaubst du, fühlt sich Momo dabei?",
        vorschlaege: ["Ein bisschen traurig", "Es macht ihm nichts aus", "Wütend", "Weiß ich nicht"]
      },
      {
        text: "Aber Momo hatte etwas ganz Besonderes: eine unglaublich feine Nase und scharfe Ohren. Eines Tages roch er ganz deutlich Regen in der Luft, lange bevor die anderen etwas merkten. Und er hörte leise Schritte über der Erde – viel früher als alle anderen."
      },
      {
        text: "Fuchs! rief Momo so laut er konnte. Sofort zogen sich alle Maulwürfe tief in die sichersten Gänge zurück. Der Fuchs schnüffelte oben vergeblich herum und zog schließlich weiter. Ohne Momos feine Nase und Ohren wäre die Gefahr viel zu spät bemerkt worden.",
        frage: "Momo konnte etwas ganz Besonderes, was die anderen nicht konnten. Was kannst du besonders gut?",
        vorschlaege: ["Gut zuhören", "Gut riechen oder schmecken", "Etwas ganz anderes", "Weiß ich noch nicht"]
      },
      {
        text: "Die ganze Familie versammelte sich um Momo. Deine Nase und deine Ohren sind das Wichtigste, was wir haben, sagte seine Mutter stolz. Nicht jeder muss am schnellsten graben können – manchmal ist etwas ganz anderes genau richtig."
      },
      {
        text: "Von da an hatte Momo eine besondere Aufgabe in der Familie: Er passte auf und warnte alle, wenn Gefahr in der Nähe war. Er war genauso wichtig wie jeder gute Gräber – nur auf seine eigene Art.",
        frage: "Jeder kann etwas anderes besonders gut. Freust du dich, wenn dir jemand für etwas dankt?",
        vorschlaege: ["Ja, total", "Ein bisschen", "Ist mir nicht so wichtig", "Erzähl mir noch eine Geschichte"],
        ende: true
      }
    ]
  },
  {
    id: "zwei_fuechse_fund",
    titel: "Zwei Füchse und der geteilte Fund",
    emoji: "🦊",
    abschnitte: [
      {
        text: "Im Wald lebten zwei Füchse: der schnelle Rotfell, der immer als Erster überall war, und die bedächtige Silberpfote, die sich lieber Zeit ließ und genau hinschaute. Eines Tages entdeckten beide gleichzeitig ein wunderschönes Beerenfeld, so groß, wie sie es noch nie gesehen hatten.",
        frage: "Was, glaubst du, macht Rotfell als Erstes?",
        vorschlaege: ["Er rennt schnell hin", "Er wartet auf Silberpfote", "Er ruft laut Hurra", "Weiß ich nicht"]
      },
      {
        text: "Rotfell rannte sofort los und stopfte sich voller Freude die Backen mit Beeren voll. Er aß so schnell, dass ihm bald der Bauch weh tat. Silberpfote dagegen schaute sich das Feld erst in Ruhe an und suchte die allerbesten, reifsten Beeren aus."
      },
      {
        text: "Autsch, mein Bauch, stöhnte Rotfell. Silberpfote lachte leise und teilte ihm ein paar von ihren sorgfältig ausgesuchten Beeren. Die schmecken viel besser, oder? fragte sie. Rotfell nickte. Vielleicht sollten wir das nächste Mal zusammen suchen – du findest die besten, ich finde die meisten!",
        frage: "Bist du eher jemand, der schnell zupackt, oder lieber jemand, der sich Zeit nimmt und genau hinschaut?",
        vorschlaege: ["Eher schnell zupacken", "Eher Zeit nehmen", "Mal so, mal so", "Weiß ich nicht"]
      },
      {
        text: "Von da an suchten die beiden Füchse gemeinsam. Rotfell entdeckte mit seinem scharfen Blick immer neue Stellen mit Beeren, und Silberpfote wählte in Ruhe die allerbesten davon aus. Am Ende hatten sie einen riesigen Vorrat an den köstlichsten Beeren, den sie je gesammelt hatten."
      },
      {
        text: "Am Abend setzten sich Rotfell und Silberpfote zusammen und teilten sich die Beeren gerecht auf. Gemeinsam macht es viel mehr Spaß, sagte Rotfell zufrieden. Und wir ergänzen uns richtig gut, fügte Silberpfote hinzu und lächelte.",
        frage: "Mit wem machst du gerne Dinge zusammen, weil ihr euch gut ergänzt?",
        vorschlaege: ["Mit meiner Familie", "Mit einer Freundin/einem Freund", "Mit Fabu!", "Weiß ich noch nicht"],
        ende: true
      }
    ]
  }
];
