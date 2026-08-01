// logik_data_L6_L9.js -- Laetitia Lernsystem
// Logik-Aufgaben L6-L9: Reihenfolgen, Ursache-Wirkung, Widersprueche, Mengenvergleiche
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── L6: Was passiert zuerst / zuletzt? ───────────────────────────────────

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du willst dir die Hände waschen. Was machst du zuerst?",
    antwort_a:"Wasser aufdrehen", antwort_b:"Hände abtrocknen", antwort_c:"Seife weglegen", antwort_d:"Hahn zudrehen",
    richtig:"A",
    erklaerung:"Zuerst muss man das Wasser aufdrehen, bevor man die Hände nass machen und einseifen kann." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du deckst den Tisch zum Essen. Was kommt zuerst?",
    antwort_a:"Teller hinstellen", antwort_b:"Tischdecke auflegen", antwort_c:"Essen auftun", antwort_d:"Besteck hinlegen",
    richtig:"B",
    erklaerung:"Zuerst legt man die Tischdecke auf den Tisch. Danach kommen Teller und Besteck darauf." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Ein Ei wird zum Küken. Was passiert zuerst?",
    antwort_a:"Das Küken wird groß", antwort_b:"Das Küken schlüpft", antwort_c:"Das Ei wird gelegt", antwort_d:"Das Küken legt selbst Eier",
    richtig:"C",
    erklaerung:"Zuerst wird das Ei gelegt. Erst danach wächst darin das Küken, bis es schlüpft." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du willst raus in den Regen. Was ziehst du zuletzt an?",
    antwort_a:"Socken", antwort_b:"Hose", antwort_c:"Schuhe", antwort_d:"Regenjacke",
    richtig:"D",
    erklaerung:"Man zieht sich erst drinnen fertig an — die Regenjacke kommt ganz zum Schluss, bevor man rausgeht." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Ein Same wird zur Blume. Was passiert zuerst?",
    antwort_a:"Die Blume blüht", antwort_b:"Ein kleiner Trieb wächst", antwort_c:"Die Blume verwelkt", antwort_d:"Der Same wird in die Erde gesteckt",
    richtig:"D",
    erklaerung:"Zuerst steckt man den Samen in die Erde. Erst danach wächst daraus eine Pflanze." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du backst einen Kuchen. Was machst du zuerst?",
    antwort_a:"Den Kuchen aus dem Ofen holen", antwort_b:"Den Kuchen essen", antwort_c:"Die Zutaten abmessen", antwort_d:"Den Ofen ausschalten",
    richtig:"C",
    erklaerung:"Zuerst müssen die Zutaten bereit sein, bevor man überhaupt backen kann." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du gehst abends schlafen. Was machst du zuletzt?",
    antwort_a:"Zähne putzen", antwort_b:"Pyjama anziehen", antwort_c:"Ins Bett legen", antwort_d:"Licht ausmachen",
    richtig:"D",
    erklaerung:"Ganz zum Schluss macht man das Licht aus, kurz bevor man einschläft." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Eine Raupe wird zum Schmetterling. Was passiert zuerst?",
    antwort_a:"Der Schmetterling fliegt davon", antwort_b:"Die Raupe frisst viele Blätter", antwort_c:"Die Raupe spinnt einen Kokon", antwort_d:"Aus dem Kokon kommt ein Schmetterling",
    richtig:"B",
    erklaerung:"Zuerst frisst die Raupe, um zu wachsen. Erst danach spinnt sie einen Kokon." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du putzt dir die Zähne. Was kommt zuerst?",
    antwort_a:"Mund ausspülen", antwort_b:"Zähne putzen", antwort_c:"Zahnbürste weglegen", antwort_d:"Zahnpasta auf die Bürste geben",
    richtig:"D",
    erklaerung:"Erst kommt die Zahnpasta auf die Bürste, danach putzt man die Zähne." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Es wird Winter, dann Frühling. Was passiert zuerst?",
    antwort_a:"Blumen blühen", antwort_b:"Die Sonne wird wärmer", antwort_c:"Schnee fällt", antwort_d:"Die Vögel kommen zurück",
    richtig:"C",
    erklaerung:"Im Winter fällt zuerst Schnee. Erst danach kommt der Frühling mit Blumen und Wärme." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du machst dir ein Brot. Was zuerst?",
    antwort_a:"Butter draufstreichen", antwort_b:"Brot essen", antwort_c:"Belag drauflegen", antwort_d:"Brot aus der Tüte nehmen",
    richtig:"D",
    erklaerung:"Zuerst braucht man das Brot selbst, bevor man Butter und Belag draufmachen kann." },

  { stufe:"L6", text:"Überlege die richtige Reihenfolge.",
    frage:"Du gießt eine Pflanze jeden Tag. Was passiert zuerst?",
    antwort_a:"Die Pflanze wächst", antwort_b:"Die Pflanze bekommt Blüten", antwort_c:"Die Pflanze bekommt Wasser", antwort_d:"Die Pflanze wird groß und stark",
    richtig:"C",
    erklaerung:"Erst kommt das Wasser, danach kann die Pflanze wachsen." },

  // ── L7: Ursache und Wirkung ───────────────────────────────────────────────

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Der Boden ist nass. Was ist wahrscheinlich die Ursache?",
    antwort_a:"Es hat geregnet", antwort_b:"Die Sonne scheint", antwort_c:"Es ist windig", antwort_d:"Es ist kalt",
    richtig:"A",
    erklaerung:"Nasser Boden kommt meistens vom Regen." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Die Blumen im Garten sind vertrocknet. Warum wohl?",
    antwort_a:"Es hat zu viel geregnet", antwort_b:"Sie wurden lange nicht gegossen", antwort_c:"Es war zu kalt", antwort_d:"Es war zu dunkel",
    richtig:"B",
    erklaerung:"Pflanzen vertrocknen, wenn sie zu lange kein Wasser bekommen." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Das Eis in der Sonne wird flüssig. Warum?",
    antwort_a:"Es wird kälter", antwort_b:"Es wird windig", antwort_c:"Die Wärme lässt es schmelzen", antwort_d:"Es wird dunkel",
    richtig:"C",
    erklaerung:"Wärme lässt Eis schmelzen — das nennt man tauen." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Der Luftballon ist geplatzt. Was ist wohl die Ursache?",
    antwort_a:"Er war zu leicht", antwort_b:"Er war zu bunt", antwort_c:"Er war zu klein", antwort_d:"Er wurde zu voll aufgepustet",
    richtig:"D",
    erklaerung:"Wenn ein Luftballon zu voll wird, hält die Hülle nicht mehr und er platzt." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Im Zimmer ist es plötzlich dunkel. Was ist die wahrscheinlichste Ursache?",
    antwort_a:"Es ist Mittag", antwort_b:"Die Tür ist offen", antwort_c:"Das Licht wurde ausgeschaltet", antwort_d:"Es ist warm",
    richtig:"C",
    erklaerung:"Wenn im Raum kein Fenster ist, macht meistens das Ausschalten des Lichts es dunkel." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Die Straße ist glatt und rutschig. Was ist wohl die Ursache?",
    antwort_a:"Es ist sehr warm", antwort_b:"Es ist windstill", antwort_c:"Es ist Mittag", antwort_d:"Es ist gefroren oder nass",
    richtig:"D",
    erklaerung:"Glätte entsteht meistens durch Eis oder Nässe auf der Straße." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Der Kuchen ist verbrannt. Was ist wahrscheinlich passiert?",
    antwort_a:"Er hatte zu viel Zucker", antwort_b:"Er war zu lange im Ofen", antwort_c:"Er war zu klein", antwort_d:"Der Ofen war zu kalt",
    richtig:"B",
    erklaerung:"Wenn etwas zu lange im heißen Ofen bleibt, verbrennt es." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Ein Kind weint laut. Was könnte die Ursache sein?",
    antwort_a:"Es hat gelacht", antwort_b:"Es hat gegessen", antwort_c:"Es hat sich wehgetan", antwort_d:"Es ist eingeschlafen",
    richtig:"C",
    erklaerung:"Weinen ist oft ein Zeichen dafür, dass jemand Schmerzen hat oder traurig ist." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Die Milch riecht komisch und schmeckt sauer. Was ist die Ursache?",
    antwort_a:"Sie war zu kalt", antwort_b:"Sie war zu warm im Kühlschrank", antwort_c:"Sie wurde geschüttelt", antwort_d:"Sie ist zu alt und verdorben",
    richtig:"D",
    erklaerung:"Milch verdirbt mit der Zeit — dann riecht und schmeckt sie schlecht." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Die Fensterscheibe ist beschlagen. Was ist wahrscheinlich die Ursache?",
    antwort_a:"Es ist Sommer", antwort_b:"Drinnen ist es warm, draußen kalt", antwort_c:"Das Fenster ist offen", antwort_d:"Die Sonne scheint direkt drauf",
    richtig:"B",
    erklaerung:"Wenn warme, feuchte Luft auf eine kalte Scheibe trifft, beschlägt sie." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Der Hund bellt laut an der Tür. Was ist wohl die Ursache?",
    antwort_a:"Er hat Hunger", antwort_b:"Er ist müde", antwort_c:"Es hat geklingelt oder geklopft", antwort_d:"Es ist Nacht",
    richtig:"C",
    erklaerung:"Hunde bellen oft, wenn sie ein Geräusch an der Tür hören." },

  { stufe:"L7", text:"Überlege: Was ist die Ursache?",
    frage:"Die Pflanze auf der Fensterbank neigt sich zum Fenster. Was ist die Ursache?",
    antwort_a:"Sie ist krank", antwort_b:"Der Topf ist zu klein", antwort_c:"Es ist zu kalt", antwort_d:"Sie wächst zum Licht hin",
    richtig:"D",
    erklaerung:"Pflanzen wachsen zum Licht — das brauchen sie zum Wachsen." },

  // ── L8: Widersprüche erkennen ─────────────────────────────────────────────

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Schnee — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Schnee war weiß und kalt.", antwort_b:"Der Schnee war heiß und schmolz in der Sonne.", antwort_c:"Der Schnee fiel vom Himmel.", antwort_d:"Der Schnee bedeckte den Garten.",
    richtig:"B",
    erklaerung:"Schnee ist immer kalt, nie heiß — 'heißer Schnee' ist ein Widerspruch." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Tag und Nacht — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Die Sonne schien nachts hell am Himmel.", antwort_b:"Der Mond schien nachts hell am Himmel.", antwort_c:"Am Tag schien die Sonne.", antwort_d:"Nachts war der Himmel dunkel.",
    richtig:"A",
    erklaerung:"Nachts scheint der Mond, nicht die Sonne — das ist ein Widerspruch." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Fische — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Fisch schwamm im Wasser.", antwort_b:"Der Vogel flog durch die Luft.", antwort_c:"Der Fisch lief an Land spazieren.", antwort_d:"Der Hund lief im Garten.",
    richtig:"C",
    erklaerung:"Fische können nicht laufen, sie schwimmen im Wasser." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Feuer — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Das Feuer war eiskalt.", antwort_b:"Das Feuer war heiß.", antwort_c:"Das Eis war kalt.", antwort_d:"Das Wasser war lauwarm.",
    richtig:"A",
    erklaerung:"Feuer ist heiß, niemals eiskalt — das widerspricht sich." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Schwimmen — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Stein sank auf den Grund.", antwort_b:"Das Holz schwamm oben.", antwort_c:"Die Feder schwebte in der Luft.", antwort_d:"Der Stein schwamm oben auf dem Wasser wie eine Feder.",
    richtig:"D",
    erklaerung:"Ein schwerer Stein sinkt im Wasser, er schwimmt nicht wie eine leichte Feder." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Vögel — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Vogel flog hoch am Himmel.", antwort_b:"Der Vogel tauchte tief unter Wasser wie ein Fisch.", antwort_c:"Der Fisch schwamm im Meer.", antwort_d:"Der Adler saß auf einem Ast.",
    richtig:"B",
    erklaerung:"Die meisten Vögel können nicht tauchen wie Fische — Vögel fliegen." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um ein Baby — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Das Baby war schon 90 Jahre alt.", antwort_b:"Das Baby konnte noch nicht laufen.", antwort_c:"Der Opa war schon alt.", antwort_d:"Das Baby schlief viel.",
    richtig:"A",
    erklaerung:"Ein Baby ist gerade erst geboren — es kann nicht schon 90 Jahre alt sein." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um den Kühlschrank — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Kühlschrank hielt das Essen kalt.", antwort_b:"Der Ofen machte das Essen heiß.", antwort_c:"Der Kühlschrank machte das Essen heiß.", antwort_d:"Der Herd kochte die Suppe.",
    richtig:"C",
    erklaerung:"Ein Kühlschrank kühlt, er macht Essen nicht heiß — das wäre ein Widerspruch." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um eine Schildkröte — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Die Schildkröte lief langsam.", antwort_b:"Das Auto fuhr schnell.", antwort_c:"Der Hase rannte schnell.", antwort_d:"Die Schildkröte rannte schneller als das Auto.",
    richtig:"D",
    erklaerung:"Schildkröten sind sehr langsam, sie können nicht schneller als ein Auto rennen." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Geschmack — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Zucker schmeckte süß.", antwort_b:"Das Salz schmeckte süß wie Zucker.", antwort_c:"Das Salz schmeckte salzig.", antwort_d:"Die Zitrone schmeckte sauer.",
    richtig:"B",
    erklaerung:"Salz schmeckt salzig, nicht süß — süß ist der Zucker." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um Sommer und Winter — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Im Winter schneite es.", antwort_b:"Im Sommer war es heiß.", antwort_c:"Im Sommer schneite es dicke Flocken bei großer Hitze.", antwort_d:"Im Winter war es kalt.",
    richtig:"C",
    erklaerung:"Schnee braucht Kälte — bei großer Hitze im Sommer kann es nicht schneien." },

  { stufe:"L8", text:"Welcher Satz kann nicht stimmen?",
    frage:"Es geht um einen Fußball — welcher dieser vier Sätze stimmt nicht?",
    antwort_a:"Der Fußball war rund.", antwort_b:"Der Fußball war eckig wie ein Würfel.", antwort_c:"Der Würfel war eckig.", antwort_d:"Der Ball rollte über den Rasen.",
    richtig:"B",
    erklaerung:"Ein Fußball ist rund, nicht eckig wie ein Würfel." },

  // ── L9: Mengenvergleiche ──────────────────────────────────────────────────

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: 🍓🍓🍓🍓🍓🍓 und 🍓🍓🍓. Wo sind mehr Erdbeeren?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"A",
    erklaerung:"Die erste Gruppe hat 6 Erdbeeren, die zweite nur 3 — 6 ist mehr als 3." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Tom hat 4 Bonbons. Lina hat 9 Bonbons. Wer hat mehr?",
    antwort_a:"Tom", antwort_b:"Lina", antwort_c:"Beide gleich viel", antwort_d:"Keiner von beiden",
    richtig:"B",
    erklaerung:"9 ist mehr als 4 — Lina hat mehr Bonbons als Tom." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: ⭐⭐⭐⭐ und ⭐⭐⭐⭐. Wer hat mehr Sterne?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"C",
    erklaerung:"Beide Gruppen haben genau 4 Sterne — das ist gleich viel." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Ein Korb hat 2 Äpfel, ein anderer Korb hat 8 Äpfel. Welcher Korb hat weniger?",
    antwort_a:"Der erste Korb", antwort_b:"Der zweite Korb", antwort_c:"Beide gleich viel", antwort_d:"Keiner",
    richtig:"A",
    erklaerung:"2 ist weniger als 8 — der erste Korb hat weniger Äpfel." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: 🐟🐟🐟🐟🐟🐟🐟 und 🐟🐟. Wo sind weniger Fische?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"B",
    erklaerung:"Die zweite Gruppe hat nur 2 Fische, die erste 7 — 2 ist weniger." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Max sammelt 5 Muscheln, Ida sammelt 5 Muscheln. Wer hat mehr?",
    antwort_a:"Max", antwort_b:"Ida", antwort_c:"Beide gleich viel", antwort_d:"Keiner von beiden",
    richtig:"C",
    erklaerung:"5 und 5 sind gleich viel — beide haben genau gleich viele Muscheln gesammelt." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: 🎈🎈🎈 und 🎈🎈🎈🎈🎈🎈🎈🎈. Wo sind mehr Luftballons?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"B",
    erklaerung:"Die zweite Gruppe hat 8 Luftballons, die erste nur 3 — 8 ist mehr." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Eine Kiste wiegt mehr als die andere. In welcher Kiste sind wahrscheinlich mehr Sachen drin?",
    antwort_a:"In der schwereren Kiste", antwort_b:"In der leichteren Kiste", antwort_c:"In beiden gleich viel", antwort_d:"In keiner Kiste",
    richtig:"A",
    erklaerung:"Mehr Sachen bedeuten meistens mehr Gewicht — die schwerere Kiste hat wahrscheinlich mehr drin." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: 🍪🍪 und 🍪🍪🍪🍪🍪. Wer hat weniger Kekse?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"A",
    erklaerung:"Die erste Gruppe hat nur 2 Kekse, die zweite 5 — 2 ist weniger." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Ben trinkt ein halbes Glas Wasser. Ella trinkt ein volles Glas Wasser. Wer trinkt mehr?",
    antwort_a:"Ben", antwort_b:"Ella", antwort_c:"Beide gleich viel", antwort_d:"Keiner von beiden",
    richtig:"B",
    erklaerung:"Ein volles Glas ist mehr als ein halbes Glas — Ella trinkt mehr." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Vergleiche: 🦋🦋🦋🦋🦋 und 🦋🦋🦋🦋🦋. Wer hat mehr Schmetterlinge?",
    antwort_a:"Erste Gruppe", antwort_b:"Zweite Gruppe", antwort_c:"Gleich viele", antwort_d:"Keine von beiden",
    richtig:"C",
    erklaerung:"Beide Gruppen haben genau 5 Schmetterlinge — das ist gleich viel." },

  { stufe:"L9", text:"Vergleiche genau, bevor du antwortest.",
    frage:"Ein Eimer ist randvoll mit Sand, ein anderer nur zu einem kleinen Teil gefüllt. Welcher Eimer hat mehr Sand?",
    antwort_a:"Der randvolle Eimer", antwort_b:"Der wenig gefüllte Eimer", antwort_c:"Beide gleich viel", antwort_d:"Keiner",
    richtig:"A",
    erklaerung:"Ein randvoller Eimer enthält mehr Sand als ein nur teilweise gefüllter." }

];

var existing = D.get("logik") || [];
var neueStufen = ["L6","L7","L8","L9"];
var ohneAlteStufen = existing.filter(function(t){
  return neueStufen.indexOf((t.stufe || "").toUpperCase()) === -1;
});
D.set("logik", ohneAlteStufen.concat(aufgaben));

})();
