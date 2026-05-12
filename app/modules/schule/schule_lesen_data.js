// schule_lesen_data.js — Sachkunde Frühling
// Generiert aus Schulmaterial 2026-04-20
// Format: heft, seite, typ, stufe, thema, titel, text, frage, antwort_a/b/c, richtig, erklaerung

var SCHULE_LESEN_DATEN = window.SCHULE_LESEN_DATEN || [];

SCHULE_LESEN_DATEN = SCHULE_LESEN_DATEN.filter(function(t){
  return t.heft !== "sachkunde_fruehling" && t.heft !== "sachkunde_lesekarten";
}).concat([

  // ─── LANGE TEXTE — sachkunde_fruehling ───────────────────────────────────

  {
    heft:"sachkunde_fruehling", seite:1, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Kleidung im Frühling", bild:"kleidung",
    text:"Im Frühling ist das Wetter oft wechselhaft. Am Morgen ist es kühl. Später wird es warm. Deshalb ist die Zwiebeltechnik sinnvoll. Man trägt mehrere Schichten Kleidung übereinander. Wird es warm, kann man etwas ausziehen. Eine Jacke schützt vor Regen und Wind.",
    frage:"Was schützt vor Regen und Wind?",
    antwort_a:"Eine Jacke", antwort_b:"Ein Schal", antwort_c:"Eine Mütze",
    richtig:"A", erklaerung:"Eine Jacke schützt vor Regen und Wind."
  },
  {
    heft:"sachkunde_fruehling", seite:2, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Kleidung im Frühling", bild:"kleidung",
    text:"Im Frühling ist das Wetter oft wechselhaft. Am Morgen ist es kühl. Später wird es warm. Deshalb ist die Zwiebeltechnik sinnvoll. Man trägt mehrere Schichten Kleidung übereinander. Wird es warm, kann man etwas ausziehen. Eine Jacke schützt vor Regen und Wind.",
    frage:"Was bedeutet Zwiebeltechnik?",
    antwort_a:"Zwiebelsuppe kochen", antwort_b:"Mehrere Kleidungsschichten übereinander tragen", antwort_c:"Nur eine dicke Jacke tragen",
    richtig:"B", erklaerung:"Zwiebeltechnik bedeutet, mehrere Schichten Kleidung übereinander zu tragen."
  },

  {
    heft:"sachkunde_fruehling", seite:3, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Frühblüher", bild:"fruehblueher",
    text:"Frühblüher sind Pflanzen, die sehr früh im Jahr blühen. Oft liegt noch Schnee. Bekannte Frühblüher sind die Tulpe, die Narzisse, das Schneeglöckchen und der Krokus. Unter der Erde befindet sich ihre Wurzel. Die Wurzel speichert Nährstoffe, die die Pflanze zum Wachsen im Frühling dringend braucht.",
    frage:"Was speichert die Wurzel des Frühblühers?",
    antwort_a:"Wasser und Sonnenlicht", antwort_b:"Nährstoffe", antwort_c:"Samen und Pollen",
    richtig:"B", erklaerung:"Die Wurzel speichert Nährstoffe, die die Pflanze zum Wachsen braucht."
  },
  {
    heft:"sachkunde_fruehling", seite:4, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Frühblüher", bild:"fruehblueher",
    text:"Frühblüher sind Pflanzen, die sehr früh im Jahr blühen. Oft liegt noch Schnee. Bekannte Frühblüher sind die Tulpe, die Narzisse, das Schneeglöckchen und der Krokus. Unter der Erde befindet sich ihre Wurzel. Die Wurzel speichert Nährstoffe, die die Pflanze zum Wachsen im Frühling dringend braucht.",
    frage:"Welches ist kein Frühblüher?",
    antwort_a:"Die Tulpe", antwort_b:"Der Krokus", antwort_c:"Die Sonnenblume",
    richtig:"C", erklaerung:"Die Sonnenblume ist kein Frühblüher. Bekannte Frühblüher sind Tulpe, Narzisse, Schneeglöckchen und Krokus."
  },

  {
    heft:"sachkunde_fruehling", seite:5, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Die Tulpe und ihre Teile", bild:"tulpe",
    text:"Die Tulpe ist ein Frühblüher. Unter der Erde befindet sich ihre Zwiebel. Im Frühling wächst der Stängel schnell aus der Erde. Die bunte Blüte lockt Insekten an. Der Stängel trägt die Blume und gibt ihr Halt. Die Blätter nehmen Sonnenlicht auf. Die Zwiebel speichert wichtige Nährstoffe für neues Wachstum.",
    frage:"Was macht die Zwiebel der Tulpe?",
    antwort_a:"Sie lockt Insekten an", antwort_b:"Sie speichert Nährstoffe", antwort_c:"Sie nimmt Sonnenlicht auf",
    richtig:"B", erklaerung:"Die Zwiebel der Tulpe speichert wichtige Nährstoffe für neues Wachstum."
  },
  {
    heft:"sachkunde_fruehling", seite:6, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Die Tulpe und ihre Teile", bild:"tulpe",
    text:"Die Tulpe ist ein Frühblüher. Unter der Erde befindet sich ihre Zwiebel. Im Frühling wächst der Stängel schnell aus der Erde. Die bunte Blüte lockt Insekten an. Der Stängel trägt die Blume und gibt ihr Halt. Die Blätter nehmen Sonnenlicht auf. Die Zwiebel speichert wichtige Nährstoffe für neues Wachstum.",
    frage:"Was nehmen die Blätter der Tulpe auf?",
    antwort_a:"Regen", antwort_b:"Nährstoffe aus der Erde", antwort_c:"Sonnenlicht",
    richtig:"C", erklaerung:"Die Blätter der Tulpe nehmen Sonnenlicht auf."
  },

  {
    heft:"sachkunde_fruehling", seite:7, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Die Erdbeere", bild:"erdbeere",
    text:"Die Erdbeere ist eine leckere Nussfrucht. Ihre rote Farbe und die vielen kleinen Samen auf der Oberfläche machen sie besonders. Die kleinen Kerne werden Nüsschen genannt. Erdbeeren wachsen in Gärten oder im Wald. Die Erntezeit liegt zwischen Juni und August. Manchmal beginnt sie früher, je nach Wetter und Wärme.",
    frage:"Wann ist die Erntezeit der Erdbeere?",
    antwort_a:"Januar bis März", antwort_b:"Juni bis August", antwort_c:"Oktober bis Dezember",
    richtig:"B", erklaerung:"Die Erntezeit der Erdbeere liegt zwischen Juni und August."
  },
  {
    heft:"sachkunde_fruehling", seite:8, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Die Erdbeere", bild:"erdbeere",
    text:"Die Erdbeere ist eine leckere Nussfrucht. Ihre rote Farbe und die vielen kleinen Samen auf der Oberfläche machen sie besonders. Die kleinen Kerne werden Nüsschen genannt. Erdbeeren wachsen in Gärten oder im Wald. Die Erntezeit liegt zwischen Juni und August. Manchmal beginnt sie früher, je nach Wetter und Wärme.",
    frage:"Wie heißen die kleinen Kerne auf der Erdbeere?",
    antwort_a:"Körner", antwort_b:"Nüsschen", antwort_c:"Samen",
    richtig:"B", erklaerung:"Die kleinen Kerne auf der Erdbeere werden Nüsschen genannt."
  },

  {
    heft:"sachkunde_fruehling", seite:9, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Das Osterfest", bild:"osterfest",
    text:"Ostern ist ein christliches Fest im Frühling. Ein bekannter Brauchtum ist der Osterhase. Er versteckt bunte Eier im Garten. Kinder suchen die Eier mit Freude. Oft werden Eier vorher bemalt und verziert. Das Eierbemalen macht Spaß und gehört für viele Familien zu Ostern dazu.",
    frage:"Was versteckt der Osterhase im Garten?",
    antwort_a:"Süßigkeiten", antwort_b:"Bunte Eier", antwort_c:"Blumen",
    richtig:"B", erklaerung:"Der Osterhase versteckt bunte Eier im Garten."
  },
  {
    heft:"sachkunde_fruehling", seite:10, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Das Osterfest", bild:"osterfest",
    text:"Ostern ist ein christliches Fest im Frühling. Ein bekannter Brauchtum ist der Osterhase. Er versteckt bunte Eier im Garten. Kinder suchen die Eier mit Freude. Oft werden Eier vorher bemalt und verziert. Das Eierbemalen macht Spaß und gehört für viele Familien zu Ostern dazu.",
    frage:"Was ist Ostern?",
    antwort_a:"Ein Sportfest", antwort_b:"Ein christliches Fest im Frühling", antwort_c:"Ein Schulfest im Herbst",
    richtig:"B", erklaerung:"Ostern ist ein christliches Fest im Frühling."
  },

  {
    heft:"sachkunde_fruehling", seite:11, typ:"lesen", stufe:"SL_LESEN",
    thema:"tiere", titel:"Marienkäfer", bild:"marienkaefer",
    text:"Marienkäfer sind kleine Käfer. Sie haben meist einen roten Körper mit schwarzen Punkten. Marienkäfer leben in Gärten und auf Wiesen. Sie fressen Blattläuse. Zum Fliegen öffnen sie ihre Flugflügel, die unter den Deckflügeln liegen. Zu ihren natürlichen Feinden gehören Spinnen und Vögel.",
    frage:"Was fressen Marienkäfer?",
    antwort_a:"Blätter", antwort_b:"Blattläuse", antwort_c:"Blumen",
    richtig:"B", erklaerung:"Marienkäfer fressen Blattläuse."
  },
  {
    heft:"sachkunde_fruehling", seite:12, typ:"lesen", stufe:"SL_LESEN",
    thema:"tiere", titel:"Marienkäfer", bild:"marienkaefer",
    text:"Marienkäfer sind kleine Käfer. Sie haben meist einen roten Körper mit schwarzen Punkten. Marienkäfer leben in Gärten und auf Wiesen. Sie fressen Blattläuse. Zum Fliegen öffnen sie ihre Flugflügel, die unter den Deckflügeln liegen. Zu ihren natürlichen Feinden gehören Spinnen und Vögel.",
    frage:"Welche Farbe hat der Körper des Marienkäfers meistens?",
    antwort_a:"Gelb mit blauen Punkten", antwort_b:"Rot mit schwarzen Punkten", antwort_c:"Grün mit weißen Streifen",
    richtig:"B", erklaerung:"Marienkäfer haben meist einen roten Körper mit schwarzen Punkten."
  },

  {
    heft:"sachkunde_fruehling", seite:13, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Frühlingszeit", bild:"fruehlingszeit",
    text:"Der Frühling ist da. Die Sonne scheint. Die Tage werden wärmer und es bleibt länger hell. Erste Blumen blühen. Die Bäume bekommen neue Blätter. Wir können die Vögel wieder zwitschern hören. Einige Tiere erwachen aus dem Winterschlaf. Die Kinder können wieder draußen spielen.",
    frage:"Was machen einige Tiere im Frühling?",
    antwort_a:"Sie schlafen ein", antwort_b:"Sie fliegen in den Süden", antwort_c:"Sie erwachen aus dem Winterschlaf",
    richtig:"C", erklaerung:"Einige Tiere erwachen im Frühling aus dem Winterschlaf."
  },
  {
    heft:"sachkunde_fruehling", seite:14, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Frühlingszeit", bild:"fruehlingszeit",
    text:"Der Frühling ist da. Die Sonne scheint. Die Tage werden wärmer und es bleibt länger hell. Erste Blumen blühen. Die Bäume bekommen neue Blätter. Wir können die Vögel wieder zwitschern hören. Einige Tiere erwachen aus dem Winterschlaf. Die Kinder können wieder draußen spielen.",
    frage:"Was bekommen die Bäume im Frühling?",
    antwort_a:"Neue Blätter", antwort_b:"Früchte", antwort_c:"Schneekappen",
    richtig:"A", erklaerung:"Im Frühling bekommen die Bäume neue Blätter."
  },

  {
    heft:"sachkunde_fruehling", seite:15, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Der Baum im Frühling", bild:"baum",
    text:"Im Frühling wachsen die Bäume wieder. Kleine Knospen sprießen und neue Blätter sind zu sehen. Die Zweige werden langsam grün. Viele Vögel bauen ihre Nester in den Baumkronen. Der Baum bietet Schatten und einen Lebensraum für viele Tiere. Kinder spielen gern unter ihm und genießen die warme Frühlingssonne.",
    frage:"Wo bauen viele Vögel ihre Nester?",
    antwort_a:"In Höhlen unter der Erde", antwort_b:"In den Baumkronen", antwort_c:"Auf dem Dach von Häusern",
    richtig:"B", erklaerung:"Viele Vögel bauen ihre Nester in den Baumkronen."
  },
  {
    heft:"sachkunde_fruehling", seite:16, typ:"lesen", stufe:"SL_LESEN",
    thema:"fruehling", titel:"Der Baum im Frühling", bild:"baum",
    text:"Im Frühling wachsen die Bäume wieder. Kleine Knospen sprießen und neue Blätter sind zu sehen. Die Zweige werden langsam grün. Viele Vögel bauen ihre Nester in den Baumkronen. Der Baum bietet Schatten und einen Lebensraum für viele Tiere. Kinder spielen gern unter ihm und genießen die warme Frühlingssonne.",
    frage:"Was sprießt als erstes an den Bäumen im Frühling?",
    antwort_a:"Äpfel", antwort_b:"Knospen", antwort_c:"Zapfen",
    richtig:"B", erklaerung:"Kleine Knospen sprießen als erstes — dann sind neue Blätter zu sehen."
  },

  {
    heft:"sachkunde_fruehling", seite:17, typ:"lesen", stufe:"SL_LESEN",
    thema:"kochen", titel:"Himbeereis herstellen", bild:"himbeereis",
    text:"Für Himbeereis im Frühling braucht man frische Himbeeren, Zucker und Sahne. Zuerst werden die Himbeeren gewaschen. Dann werden die Himbeeren mit einer Gabel zerdrückt. Danach werden Zucker und Sahne hinzugegeben. Alles wird verrührt. Die Masse kommt in den Gefrierschrank. Nach einiger Zeit ist das Eis fertig und es schmeckt süß und frisch.",
    frage:"Was braucht man für Himbeereis?",
    antwort_a:"Himbeeren, Mehl und Eier", antwort_b:"Himbeeren, Zucker und Sahne", antwort_c:"Himbeeren, Milch und Butter",
    richtig:"B", erklaerung:"Für Himbeereis braucht man frische Himbeeren, Zucker und Sahne."
  },
  {
    heft:"sachkunde_fruehling", seite:18, typ:"lesen", stufe:"SL_LESEN",
    thema:"kochen", titel:"Himbeereis herstellen", bild:"himbeereis",
    text:"Für Himbeereis im Frühling braucht man frische Himbeeren, Zucker und Sahne. Zuerst werden die Himbeeren gewaschen. Dann werden die Himbeeren mit einer Gabel zerdrückt. Danach werden Zucker und Sahne hinzugegeben. Alles wird verrührt. Die Masse kommt in den Gefrierschrank. Nach einiger Zeit ist das Eis fertig und es schmeckt süß und frisch.",
    frage:"Wohin kommt die Eismasse zum Gefrieren?",
    antwort_a:"In den Kühlschrank", antwort_b:"In den Backofen", antwort_c:"In den Gefrierschrank",
    richtig:"C", erklaerung:"Die Masse kommt in den Gefrierschrank — dann ist das Eis nach einiger Zeit fertig."
  },

  {
    heft:"sachkunde_fruehling", seite:19, typ:"lesen", stufe:"SL_LESEN",
    thema:"tiere", titel:"Der Igel nach dem Winterschlaf", bild:"igel",
    text:"Der Igel wacht nach dem Winterschlaf auf. Er ist sehr hungrig und noch müde. Langsam läuft er durch den Garten. Er sucht nach Futter. Der Igel frisst Käfer, Würmer und Schnecken. Er baut sich ein neues Nest aus Blättern und Gras. Dort schläft der Igel.",
    frage:"Was frisst der Igel?",
    antwort_a:"Gras und Blätter", antwort_b:"Käfer, Würmer und Schnecken", antwort_c:"Beeren und Früchte",
    richtig:"B", erklaerung:"Der Igel frisst Käfer, Würmer und Schnecken."
  },
  {
    heft:"sachkunde_fruehling", seite:20, typ:"lesen", stufe:"SL_LESEN",
    thema:"tiere", titel:"Der Igel nach dem Winterschlaf", bild:"igel",
    text:"Der Igel wacht nach dem Winterschlaf auf. Er ist sehr hungrig und noch müde. Langsam läuft er durch den Garten. Er sucht nach Futter. Der Igel frisst Käfer, Würmer und Schnecken. Er baut sich ein neues Nest aus Blättern und Gras. Dort schläft der Igel.",
    frage:"Woraus baut der Igel sein Nest?",
    antwort_a:"Aus Zweigen und Steinen", antwort_b:"Aus Blättern und Gras", antwort_c:"Aus Schlamm und Sand",
    richtig:"B", erklaerung:"Der Igel baut sein Nest aus Blättern und Gras."
  },

  // ─── LESEKÄRTCHEN — sachkunde_lesekarten ─────────────────────────────────

  {
    heft:"sachkunde_lesekarten", seite:1, typ:"lesen", stufe:"SL_LESEN",
    thema:"wiese", titel:"Die Wiese", bild:"wiese",
    text:"Die Wiese ist grün. Viele Blumen wachsen dort. Häufig sind Schmetterlinge zu sehen.",
    frage:"Was ist häufig auf der Wiese zu sehen?",
    antwort_a:"Fische", antwort_b:"Schmetterlinge", antwort_c:"Pinguine",
    richtig:"B", erklaerung:"Häufig sind Schmetterlinge auf der Wiese zu sehen."
  },
  {
    heft:"sachkunde_lesekarten", seite:2, typ:"lesen", stufe:"SL_LESEN",
    thema:"baeume", titel:"Der Apfelbaum", bild:"apfelbaum",
    text:"Der Apfelbaum blüht weiß und rosa. Seine Blüten duften süß. Im Herbst gibt es Äpfel.",
    frage:"Welche Farbe haben die Blüten des Apfelbaums?",
    antwort_a:"Gelb und orange", antwort_b:"Weiß und rosa", antwort_c:"Rot und lila",
    richtig:"B", erklaerung:"Die Blüten des Apfelbaums sind weiß und rosa."
  },
  {
    heft:"sachkunde_lesekarten", seite:3, typ:"lesen", stufe:"SL_LESEN",
    thema:"blumen", titel:"Das Gänseblümchen", bild:"gaensebluemchen",
    text:"Das Gänseblümchen ist klein. Es blüht weiß und gelb. Kinder machen Blumenkränze daraus.",
    frage:"Welche Farben hat das Gänseblümchen?",
    antwort_a:"Rot und blau", antwort_b:"Weiß und gelb", antwort_c:"Lila und grün",
    richtig:"B", erklaerung:"Das Gänseblümchen blüht weiß und gelb."
  },
  {
    heft:"sachkunde_lesekarten", seite:4, typ:"lesen", stufe:"SL_LESEN",
    thema:"baeume", titel:"Der Kirschbaum", bild:"kirschbaum",
    text:"Die Kirschblüten sind rosa. Sie duften in der Sonne. Bald wachsen Kirschen.",
    frage:"Welche Farbe haben die Kirschblüten?",
    antwort_a:"Weiß", antwort_b:"Gelb", antwort_c:"Rosa",
    richtig:"C", erklaerung:"Die Kirschblüten sind rosa."
  },
  {
    heft:"sachkunde_lesekarten", seite:5, typ:"lesen", stufe:"SL_LESEN",
    thema:"blumen", titel:"Die Hyazinthe", bild:"hyazinthe",
    text:"Die Hyazinthe blüht bunt. Sie duftet stark. Bienen mögen ihren Nektar.",
    frage:"Wer mag den Nektar der Hyazinthe?",
    antwort_a:"Schmetterlinge", antwort_b:"Bienen", antwort_c:"Ameisen",
    richtig:"B", erklaerung:"Bienen mögen den Nektar der Hyazinthe."
  },
  {
    heft:"sachkunde_lesekarten", seite:6, typ:"lesen", stufe:"SL_LESEN",
    thema:"blumen", titel:"Die Narzisse", bild:"narzisse",
    text:"Die Narzisse ist gelb. Sie blüht im Frühling. Ihr Duft ist stark.",
    frage:"Welche Farbe hat die Narzisse?",
    antwort_a:"Rot", antwort_b:"Blau", antwort_c:"Gelb",
    richtig:"C", erklaerung:"Die Narzisse ist gelb."
  },
  {
    heft:"sachkunde_lesekarten", seite:7, typ:"lesen", stufe:"SL_LESEN",
    thema:"blumen", titel:"Der Krokus", bild:"krokus",
    text:"Der Krokus wächst aus einer Knolle. Seine Blüten sind lila oder gelb. Er öffnet sich in der Sonne.",
    frage:"Woraus wächst der Krokus?",
    antwort_a:"Aus einem Samen", antwort_b:"Aus einer Knolle", antwort_c:"Aus einer Frucht",
    richtig:"B", erklaerung:"Der Krokus wächst aus einer Knolle."
  },
  {
    heft:"sachkunde_lesekarten", seite:8, typ:"lesen", stufe:"SL_LESEN",
    thema:"blumen", titel:"Die Tulpe", bild:"tulpe_lesekarte",
    text:"Die Tulpe ist rot und gelb. Sie blüht in vielen Gärten. Bienen mögen ihre Blüten.",
    frage:"Was mögen Bienen an der Tulpe?",
    antwort_a:"Die Blätter", antwort_b:"Die Blüten", antwort_c:"Die Zwiebel",
    richtig:"B", erklaerung:"Bienen mögen die Blüten der Tulpe."
  }

]);
