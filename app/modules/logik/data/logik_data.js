// logik_data.js -- Laetitia Lernsystem
// Logik-Aufgaben L1-L4 mit Erklaerungen
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // L1
  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🍎  🍊  🍋  🚗",
    antwort_a:"🍎", antwort_b:"🍊", antwort_c:"🍋", antwort_d:"🚗", richtig:"D",
    erklaerung:"Das Auto passt nicht dazu, weil Apfel, Orange und Zitrone Früchte sind. Ein Auto ist kein Obst." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🐱  🐶  🐰  🌸",
    antwort_a:"🐱", antwort_b:"🐶", antwort_c:"🌸", antwort_d:"🐰", richtig:"C",
    erklaerung:"Die Blume passt nicht dazu, weil Katze, Hund und Hase Tiere sind. Eine Blume ist kein Tier." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🚗  🚌  ✈️  🍕",
    antwort_a:"🚗", antwort_b:"🍕", antwort_c:"🚌", antwort_d:"✈️", richtig:"B",
    erklaerung:"Die Pizza passt nicht dazu, weil Auto, Bus und Flugzeug Fahrzeuge sind. Eine Pizza ist kein Fahrzeug." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"👕  👖  👗  🎸",
    antwort_a:"👕", antwort_b:"👖", antwort_c:"👗", antwort_d:"🎸", richtig:"D",
    erklaerung:"Die Gitarre passt nicht dazu, weil T-Shirt, Hose und Kleid Kleidungsstücke sind. Eine Gitarre zieht man nicht an." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🎹  🎸  🎺  🌵",
    antwort_a:"🌵", antwort_b:"🎹", antwort_c:"🎸", antwort_d:"🎺", richtig:"A",
    erklaerung:"Der Kaktus passt nicht dazu, weil Klavier, Gitarre und Trompete Musikinstrumente sind. Ein Kaktus ist eine Pflanze." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🔴  🔵  🟡  🍔",
    antwort_a:"🔴", antwort_b:"🔵", antwort_c:"🍔", antwort_d:"🟡", richtig:"C",
    erklaerung:"Der Burger passt nicht dazu, weil Rot, Blau und Gelb Farben sind. Ein Burger ist ein Essen." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🐘  🦁  🦒  🚀",
    antwort_a:"🐘", antwort_b:"🦁", antwort_c:"🦒", antwort_d:"🚀", richtig:"D",
    erklaerung:"Die Rakete passt nicht dazu, weil Elefant, Löwe und Giraffe Tiere sind. Eine Rakete ist kein Tier." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"⚽  🏀  🎾  🍦",
    antwort_a:"⚽", antwort_b:"🍦", antwort_c:"🏀", antwort_d:"🎾", richtig:"B",
    erklaerung:"Das Eis passt nicht dazu, weil Fußball, Basketball und Tennis Sportbälle sind. Ein Eis ist kein Ball." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🌹  🌷  🌻  🐊",
    antwort_a:"🐊", antwort_b:"🌹", antwort_c:"🌷", antwort_d:"🌻", richtig:"A",
    erklaerung:"Das Krokodil passt nicht dazu, weil Rose, Tulpe und Sonnenblume Blumen sind. Ein Krokodil ist ein Tier." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🍞  🧀  🥚  🔑",
    antwort_a:"🍞", antwort_b:"🧀", antwort_c:"🥚", antwort_d:"🔑", richtig:"D",
    erklaerung:"Der Schlüssel passt nicht dazu, weil Brot, Käse und Ei Lebensmittel sind. Einen Schlüssel isst man nicht." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🌍  🌎  🌏  🍰",
    antwort_a:"🌍", antwort_b:"🌎", antwort_c:"🍰", antwort_d:"🌏", richtig:"C",
    erklaerung:"Der Kuchen passt nicht dazu, weil die drei Erdkugeln alle unsere Erde zeigen. Ein Kuchen ist etwas zum Essen." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🐟  🐬  🐙  🌴",
    antwort_a:"🐟", antwort_b:"🌴", antwort_c:"🐬", antwort_d:"🐙", richtig:"B",
    erklaerung:"Die Palme passt nicht dazu, weil Fisch, Delfin und Tintenfisch im Wasser leben. Eine Palme ist ein Baum." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"📚  📖  📝  🎠",
    antwort_a:"📚", antwort_b:"📖", antwort_c:"📝", antwort_d:"🎠", richtig:"D",
    erklaerung:"Das Karussell passt nicht dazu, weil Bücher, Buch und Stift zum Lernen gehören. Ein Karussell ist ein Spielgerät." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🍵  ☕  🧃  🔨",
    antwort_a:"🍵", antwort_b:"☕", antwort_c:"🧃", antwort_d:"🔨", richtig:"D",
    erklaerung:"Der Hammer passt nicht dazu, weil Tee, Kaffee und Saft Getränke sind. Einen Hammer trinkt man nicht." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🏠  🏡  🏢  🎂",
    antwort_a:"🏠", antwort_b:"🎂", antwort_c:"🏡", antwort_d:"🏢", richtig:"B",
    erklaerung:"Der Kuchen passt nicht dazu, weil Haus, Häuschen und Bürogebäude Gebäude sind. In einen Kuchen kann man nicht wohnen." },

  // L2
  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🌙  ⭐  🌙  ⭐  🌙  ?",
    antwort_a:"🌙", antwort_b:"⭐", antwort_c:"☀️", antwort_d:"🌈", richtig:"B",
    erklaerung:"Das Muster ist Mond, Stern, Mond, Stern. Es wechselt immer ab. Nach dem Mond kommt der Stern." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🔴  🔵  🔴  🔵  🔴  ?",
    antwort_a:"🟡", antwort_b:"🔴", antwort_c:"🔵", antwort_d:"🟢", richtig:"C",
    erklaerung:"Das Muster ist Rot, Blau, Rot, Blau. Es wechselt immer ab. Nach Rot kommt Blau." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"1  2  3  4  ?",
    antwort_a:"6", antwort_b:"3", antwort_c:"7", antwort_d:"5", richtig:"D",
    erklaerung:"Jede Zahl ist um eins größer als die davor. Nach der 4 kommt die 5." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"2  4  6  8  ?",
    antwort_a:"9", antwort_b:"11", antwort_c:"10", antwort_d:"7", richtig:"C",
    erklaerung:"Es sind immer gerade Zahlen. Jede Zahl ist um zwei größer. Nach der 8 kommt die 10." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🐱  🐱  🐶  🐱  🐱  ?",
    antwort_a:"🐱", antwort_b:"🐰", antwort_c:"🐶", antwort_d:"🐟", richtig:"C",
    erklaerung:"Das Muster ist zwei Katzen, dann ein Hund. Nach zwei Katzen kommt wieder der Hund." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"1  3  5  7  ?",
    antwort_a:"8", antwort_b:"10", antwort_c:"6", antwort_d:"9", richtig:"D",
    erklaerung:"Es sind ungerade Zahlen. Jede Zahl ist um zwei größer. Nach der 7 kommt die 9." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"⬆️  ➡️  ⬇️  ⬅️  ?",
    antwort_a:"➡️", antwort_b:"⬇️", antwort_c:"⬅️", antwort_d:"⬆️", richtig:"D",
    erklaerung:"Die Pfeile drehen sich im Kreis: oben, rechts, unten, links. Danach kommt wieder oben." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🍎  🍎  🍊  🍎  🍎  ?",
    antwort_a:"🍎", antwort_b:"🍊", antwort_c:"🍋", antwort_d:"🍇", richtig:"B",
    erklaerung:"Das Muster ist zwei Äpfel, dann eine Orange. Nach zwei Äpfeln kommt wieder die Orange." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"10  9  8  7  ?",
    antwort_a:"5", antwort_b:"8", antwort_c:"4", antwort_d:"6", richtig:"D",
    erklaerung:"Es wird immer kleiner, jede Zahl ist um eins kleiner. Nach der 7 kommt die 6." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"😀  😀  😢  😀  😀  ?",
    antwort_a:"😀", antwort_b:"😮", antwort_c:"😢", antwort_d:"😴", richtig:"C",
    erklaerung:"Das Muster ist zwei fröhliche Gesichter, dann ein trauriges. Nach zwei fröhlichen kommt wieder das traurige." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🌱  🌿  🌳  🌱  🌿  ?",
    antwort_a:"🌱", antwort_b:"🍁", antwort_c:"🌿", antwort_d:"🌳", richtig:"D",
    erklaerung:"Das Muster zeigt das Wachsen: kleiner Sprössling, Busch, großer Baum. Nach Sprössling und Busch kommt der Baum." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"5  10  15  20  ?",
    antwort_a:"22", antwort_b:"25", antwort_c:"30", antwort_d:"24", richtig:"B",
    erklaerung:"Es wird immer 5 dazugezählt. Nach der 20 kommt die 25." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🐣  🐥  🐔  🐣  🐥  ?",
    antwort_a:"🐣", antwort_b:"🐥", antwort_c:"🥚", antwort_d:"🐔", richtig:"D",
    erklaerung:"Das Muster zeigt das Wachsen: Küken, kleines Huhn, großes Huhn. Nach Küken und kleinem Huhn kommt das große Huhn." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"A  B  C  D  ?",
    antwort_a:"F", antwort_b:"D", antwort_c:"E", antwort_d:"G", richtig:"C",
    erklaerung:"Das sind die Buchstaben des Alphabets in der richtigen Reihenfolge. Nach D kommt E." },

  // L3
  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Hund ist ein Tier. Rose ist eine ...",
    antwort_a:"Farbe", antwort_b:"Pflanze", antwort_c:"Frucht", antwort_d:"Zahl", richtig:"B",
    erklaerung:"Ein Hund gehört zur Gruppe der Tiere. Eine Rose gehört zur Gruppe der Pflanzen." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Fisch schwimmt. Vogel ...",
    antwort_a:"schläft", antwort_b:"singt", antwort_c:"fliegt", antwort_d:"kriecht", richtig:"C",
    erklaerung:"Ein Fisch bewegt sich schwimmend durch das Wasser. Ein Vogel bewegt sich fliegend durch die Luft." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"🐱 sagt miau. 🐶 sagt ...",
    antwort_a:"muh", antwort_b:"quak", antwort_c:"wau", antwort_d:"miau", richtig:"C",
    erklaerung:"Jedes Tier hat seinen eigenen Laut. Die Katze sagt miau, der Hund sagt wau." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Tag ist hell. Nacht ist ...",
    antwort_a:"laut", antwort_b:"dunkel", antwort_c:"warm", antwort_d:"kalt", richtig:"B",
    erklaerung:"Tag und Nacht sind Gegensätze. Wenn der Tag hell ist, dann ist die Nacht dunkel." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Sommer ist warm. Winter ist ...",
    antwort_a:"nass", antwort_b:"bunt", antwort_c:"kalt", antwort_d:"lang", richtig:"C",
    erklaerung:"Sommer und Winter sind Gegensätze. Der Sommer ist warm, der Winter ist kalt." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Banane ist gelb. Tomate ist ...",
    antwort_a:"grün", antwort_b:"blau", antwort_c:"rot", antwort_d:"schwarz", richtig:"C",
    erklaerung:"Jedes Obst hat seine typische Farbe. Die Banane ist gelb, die Tomate ist rot." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Großmutter ist alt. Baby ist ...",
    antwort_a:"groß", antwort_b:"jung", antwort_c:"stark", antwort_d:"schnell", richtig:"B",
    erklaerung:"Alt und jung sind Gegensätze. Eine Großmutter ist alt, ein Baby ist jung." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Feuer ist heiß. Eis ist ...",
    antwort_a:"nass", antwort_b:"weich", antwort_c:"kalt", antwort_d:"hart", richtig:"C",
    erklaerung:"Feuer und Eis sind Gegensätze in der Temperatur. Feuer ist heiß, Eis ist kalt." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"🐘 ist groß. 🐭 ist ...",
    antwort_a:"schnell", antwort_b:"laut", antwort_c:"klein", antwort_d:"stark", richtig:"C",
    erklaerung:"Elefant und Maus sind Gegensätze in der Größe. Der Elefant ist groß, die Maus ist klein." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Apfel ist eine Frucht. Karotte ist ein ...",
    antwort_a:"Gemüse", antwort_b:"Tier", antwort_c:"Getränk", antwort_d:"Werkzeug", richtig:"A",
    erklaerung:"Ein Apfel gehört zur Gruppe Obst. Eine Karotte gehört zur Gruppe Gemüse." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Buch liest man. Musik ...",
    antwort_a:"sieht man", antwort_b:"riecht man", antwort_c:"hört man", antwort_d:"isst man", richtig:"C",
    erklaerung:"Ein Buch nimmt man mit den Augen auf, man liest es. Musik nimmt man mit den Ohren auf, man hört sie." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Pilot fliegt ein Flugzeug. Kapitän fährt ein ...",
    antwort_a:"Fahrrad", antwort_b:"Auto", antwort_c:"Schiff", antwort_d:"Zug", richtig:"C",
    erklaerung:"Ein Pilot steuert Flugzeuge in der Luft. Ein Kapitän steuert Schiffe auf dem Wasser." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Oben ist das Gegenteil von unten. Groß ist das Gegenteil von ...",
    antwort_a:"schwer", antwort_b:"weit", antwort_c:"laut", antwort_d:"klein", richtig:"D",
    erklaerung:"Groß und klein sind Gegensätze, genau wie oben und unten. Das Gegenteil von groß ist klein." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Schuhe trägt man an den Füßen. Handschuhe an den ...",
    antwort_a:"Füßen", antwort_b:"Händen", antwort_c:"Ohren", antwort_d:"Augen", richtig:"B",
    erklaerung:"Schuhe schützen die Füße. Handschuhe schützen die Hände, deshalb heißen sie auch Handschuhe." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Arzt arbeitet im Krankenhaus. Lehrer arbeitet in der ...",
    antwort_a:"Bäckerei", antwort_b:"Kirche", antwort_c:"Schule", antwort_d:"Küche", richtig:"C",
    erklaerung:"Jeder Beruf hat seinen eigenen Ort. Der Arzt arbeitet im Krankenhaus, der Lehrer arbeitet in der Schule." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"🌞 scheint am Tag. 🌙 scheint ...",
    antwort_a:"im Regen", antwort_b:"in der Nacht", antwort_c:"im Winter", antwort_d:"am Mittag", richtig:"B",
    erklaerung:"Die Sonne leuchtet am Tag. Der Mond leuchtet in der Nacht, das sind Gegensätze." },

  // L4
  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Alle Hunde haben 4 Beine. Bello ist ein Hund. Hat Bello 4 Beine?",
    antwort_a:"Ja", antwort_b:"Nein", antwort_c:"Manchmal", antwort_d:"Weiß nicht", richtig:"A",
    erklaerung:"Wenn alle Hunde 4 Beine haben und Bello ein Hund ist, dann hat Bello auch 4 Beine. Das ist logisch sicher." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Ein Elefant ist kleiner als eine Maus.",
    antwort_a:"Richtig", antwort_b:"Falsch", antwort_c:"Manchmal", antwort_d:"Vielleicht", richtig:"B",
    erklaerung:"Das stimmt nicht. Ein Elefant ist viel größer als eine Maus. Es ist genau andersherum." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Lisa hat 3 Äpfel. Sie isst einen. Wie viele hat sie noch?",
    antwort_a:"3", antwort_b:"1", antwort_c:"4", antwort_d:"2", richtig:"D",
    erklaerung:"Lisa hatte 3 Äpfel und hat einen gegessen. 3 minus 1 ist 2. Sie hat noch 2 Äpfel." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Fische können auf Bäume klettern.",
    antwort_a:"Richtig", antwort_b:"Falsch", antwort_c:"Manchmal", antwort_d:"Immer", richtig:"B",
    erklaerung:"Das stimmt nicht. Fische leben im Wasser und haben keine Beine. Sie können nicht klettern." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Es regnet. Soll man einen Regenschirm mitnehmen?",
    antwort_a:"Nein", antwort_b:"Ja", antwort_c:"Egal", antwort_d:"Weiß nicht", richtig:"B",
    erklaerung:"Ein Regenschirm schützt vor Regen. Wenn es regnet, ist es sinnvoll einen Schirm mitzunehmen, damit man nicht nass wird." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Wenn es schneit, ist es warm draußen.",
    antwort_a:"Richtig", antwort_b:"Falsch", antwort_c:"Immer", antwort_d:"Manchmal", richtig:"B",
    erklaerung:"Das stimmt nicht. Schnee entsteht nur wenn es sehr kalt ist. Es ist also kalt, nicht warm." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Tom ist größer als Anna. Anna ist größer als Leo. Wer ist am größten?",
    antwort_a:"Anna", antwort_b:"Leo", antwort_c:"Tom", antwort_d:"Alle gleich", richtig:"C",
    erklaerung:"Tom ist größer als Anna, und Anna ist schon größer als Leo. Also ist Tom von allen dreien am größten." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Vögel haben Federn und können fliegen.",
    antwort_a:"Falsch", antwort_b:"Richtig", antwort_c:"Manchmal", antwort_d:"Selten", richtig:"B",
    erklaerung:"Das stimmt. Vögel sind die einzigen Tiere mit Federn. Die meisten Vögel können damit fliegen." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Eine Kerze brennt. Ist sie heiß oder kalt?",
    antwort_a:"Kalt", antwort_b:"Heiß", antwort_c:"Beides", antwort_d:"Weder noch", richtig:"B",
    erklaerung:"Eine brennende Kerze hat eine Flamme. Feuer und Flammen sind heiß, man sollte sie nicht anfassen." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Man kann mit den Ohren sehen.",
    antwort_a:"Manchmal", antwort_b:"Richtig", antwort_c:"Falsch", antwort_d:"Immer", richtig:"C",
    erklaerung:"Das stimmt nicht. Mit den Ohren hört man. Sehen kann man nur mit den Augen." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Mia hat 5 Euro. Ein Eis kostet 2 Euro. Kann sie ein Eis kaufen?",
    antwort_a:"Nein, zu wenig", antwort_b:"Ja, sie hat genug", antwort_c:"Vielleicht", antwort_d:"Weiß nicht", richtig:"B",
    erklaerung:"Mia hat 5 Euro und das Eis kostet nur 2 Euro. 5 ist mehr als 2, also hat sie genug Geld." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Wenn man müde ist, sollte man schlafen.",
    antwort_a:"Falsch", antwort_b:"Manchmal", antwort_c:"Richtig", antwort_d:"Nie", richtig:"C",
    erklaerung:"Das stimmt. Müdigkeit ist ein Zeichen, dass der Körper Schlaf braucht. Schlafen ist die richtige Antwort darauf." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Alle Katzen sind Tiere. Minka ist eine Katze. Ist Minka ein Tier?",
    antwort_a:"Nein", antwort_b:"Vielleicht", antwort_c:"Weiß nicht", antwort_d:"Ja", richtig:"D",
    erklaerung:"Wenn alle Katzen Tiere sind und Minka eine Katze ist, dann ist Minka auch ein Tier. Das ist sicher." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Ein Quadrat hat 4 gleich lange Seiten.",
    antwort_a:"Falsch", antwort_b:"Manchmal", antwort_c:"Richtig", antwort_d:"Selten", richtig:"C",
    erklaerung:"Das stimmt. Ein Quadrat hat genau 4 Seiten und alle vier Seiten sind gleich lang." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Es ist dunkel draußen. Ist es eher Tag oder Nacht?",
    antwort_a:"Tag", antwort_b:"Mittag", antwort_c:"Nacht", antwort_d:"Abend", richtig:"C",
    erklaerung:"Am Tag ist es hell, weil die Sonne scheint. Wenn es draußen dunkel ist, dann ist es Nacht." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Wenn A größer als B ist, dann ist B kleiner als A.",
    antwort_a:"Falsch", antwort_b:"Richtig", antwort_c:"Manchmal", antwort_d:"Selten", richtig:"B",
    erklaerung:"Das stimmt immer. Größer und kleiner sind Gegensätze. Wenn A größer ist, muss B automatisch kleiner sein." }

];

D.set("logik", aufgaben);

})();
