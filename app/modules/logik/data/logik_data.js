// logik_data.js -- Laetitia Lernsystem
// Logik-Aufgaben L1-L4 mit Erklaerungen (neue Version)
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── L1: Drei passen zusammen, eins nicht ─────────────────────────────────

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🍕  🍔  🌮  🚲",
    antwort_a:"🍕", antwort_b:"🍔", antwort_c:"🌮", antwort_d:"🚲", richtig:"D",
    erklaerung:"Pizza, Burger und Taco sind Speisen zum Essen. Ein Fahrrad ist kein Essen." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🌹  🌷  🌸  🐊",
    antwort_a:"🌹", antwort_b:"🌷", antwort_c:"🐊", antwort_d:"🌸", richtig:"C",
    erklaerung:"Rose, Tulpe und Kirschblüte sind Blumen. Ein Krokodil ist ein Tier, keine Blume." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🐶  🐱  🐰  🌵",
    antwort_a:"🌵", antwort_b:"🐶", antwort_c:"🐱", antwort_d:"🐰", richtig:"A",
    erklaerung:"Hund, Katze und Hase sind Tiere. Ein Kaktus ist eine Pflanze, kein Tier." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"✏️  🖊️  📏  🍦",
    antwort_a:"✏️", antwort_b:"🍦", antwort_c:"🖊️", antwort_d:"📏", richtig:"B",
    erklaerung:"Bleistift, Stift und Lineal sind Schulsachen. Eis ist ein Lebensmittel." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🚗  🚕  🚙  🌲",
    antwort_a:"🚗", antwort_b:"🌲", antwort_c:"🚕", antwort_d:"🚙", richtig:"B",
    erklaerung:"Auto, Taxi und Geländewagen sind Fahrzeuge. Ein Baum ist kein Fahrzeug." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🍇  🍓  🍑  🧲",
    antwort_a:"🍇", antwort_b:"🍓", antwort_c:"🍑", antwort_d:"🧲", richtig:"D",
    erklaerung:"Weintrauben, Erdbeere und Pfirsich sind Früchte. Ein Magnet ist kein Obst." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🎻  🎷  🥁  🛋️",
    antwort_a:"🎻", antwort_b:"🎷", antwort_c:"🛋️", antwort_d:"🥁", richtig:"C",
    erklaerung:"Geige, Saxofon und Schlagzeug sind Musikinstrumente. Ein Sofa ist ein Möbelstück." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🦁  🐯  🐻  🌙",
    antwort_a:"🦁", antwort_b:"🐯", antwort_c:"🌙", antwort_d:"🐻", richtig:"C",
    erklaerung:"Löwe, Tiger und Bär sind Tiere. Der Mond ist kein Tier — er leuchtet am Himmel." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🧢  👒  🎩  🥄",
    antwort_a:"🧢", antwort_b:"🥄", antwort_c:"👒", antwort_d:"🎩", richtig:"B",
    erklaerung:"Mütze, Sonnenhut und Zylinder sind Kopfbedeckungen. Ein Löffel trägt man nicht auf dem Kopf." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🌊  🏖️  🐠  🏔️",
    antwort_a:"🌊", antwort_b:"🐠", antwort_c:"🏔️", antwort_d:"🏖️", richtig:"C",
    erklaerung:"Wellen, Strand und Fisch gehören zum Meer. Ein Berg gehört zur Bergwelt, nicht zum Meer." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🥕  🧅  🥦  🎈",
    antwort_a:"🎈", antwort_b:"🥕", antwort_c:"🧅", antwort_d:"🥦", richtig:"A",
    erklaerung:"Karotte, Zwiebel und Brokkoli sind Gemüse. Ein Luftballon ist kein Gemüse." },

  { stufe:"L1", text:"Drei Dinge passen zusammen. Eins nicht.",
    frage:"🛁  🚿  🪥  🎸",
    antwort_a:"🛁", antwort_b:"🚿", antwort_c:"🎸", antwort_d:"🪥", richtig:"C",
    erklaerung:"Badewanne, Dusche und Zahnbürste gehören ins Badezimmer. Eine Gitarre spielt man Musik." },

  // ── L2: Muster erkennen ──────────────────────────────────────────────────

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🔴  🟡  🔴  🟡  🔴  ?",
    antwort_a:"🔴", antwort_b:"🟢", antwort_c:"🟡", antwort_d:"🔵", richtig:"C",
    erklaerung:"Das Muster wechselt ab: Rot, Gelb, Rot, Gelb. Nach Rot kommt wieder Gelb." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"3  6  9  12  ?",
    antwort_a:"13", antwort_b:"14", antwort_c:"16", antwort_d:"15", richtig:"D",
    erklaerung:"Es werden immer 3 dazugezählt: 3, 6, 9, 12. Nach 12 kommt 15." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🌞  🌛  🌞  🌛  🌞  ?",
    antwort_a:"🌞", antwort_b:"🌟", antwort_c:"🌛", antwort_d:"🌈", richtig:"C",
    erklaerung:"Das Muster wechselt ab: Sonne, Halbmond, Sonne, Halbmond. Nach der Sonne kommt der Halbmond." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"20  18  16  14  ?",
    antwort_a:"13", antwort_b:"11", antwort_c:"10", antwort_d:"12", richtig:"D",
    erklaerung:"Es wird immer 2 abgezogen: 20, 18, 16, 14. Nach 14 kommt 12." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🐟  🐟  🐬  🐟  🐟  ?",
    antwort_a:"🐟", antwort_b:"🦈", antwort_c:"🐙", antwort_d:"🐬", richtig:"D",
    erklaerung:"Das Muster ist: zwei Fische, dann ein Delfin. Nach zwei Fischen kommt wieder der Delfin." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"A  C  E  G  ?",
    antwort_a:"H", antwort_b:"I", antwort_c:"J", antwort_d:"K", richtig:"B",
    erklaerung:"Es werden immer Buchstaben übersprungen: A, C, E, G. Nach G kommt I — H wird übersprungen." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🌱  🌿  🌳  🌱  🌿  ?",
    antwort_a:"🌱", antwort_b:"🌳", antwort_c:"🍁", antwort_d:"🌻", richtig:"B",
    erklaerung:"Das Muster zeigt Wachsen: Sprössling, Busch, Baum. Nach Sprössling und Busch kommt der Baum." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"1  4  9  16  ?",
    antwort_a:"20", antwort_b:"25", antwort_c:"24", antwort_d:"18", richtig:"B",
    erklaerung:"Das sind Quadratzahlen: 1x1, 2x2, 3x3, 4x4. Die nächste ist 5x5 gleich 25." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"🍎  🍊  🍋  🍎  🍊  ?",
    antwort_a:"🍇", antwort_b:"🍎", antwort_c:"🍋", antwort_d:"🍐", richtig:"C",
    erklaerung:"Das Muster wiederholt sich: Apfel, Orange, Zitrone. Nach Apfel und Orange kommt wieder die Zitrone." },

  { stufe:"L2", text:"Erkenne das Muster. Was kommt als Nächstes?",
    frage:"⬆️  ⬆️  ➡️  ⬆️  ⬆️  ?",
    antwort_a:"⬆️", antwort_b:"⬇️", antwort_c:"⬅️", antwort_d:"➡️", richtig:"D",
    erklaerung:"Das Muster ist: zwei Mal hoch, einmal rechts. Nach zwei Mal hoch kommt wieder rechts." },

  // ── L3: Beziehung erkennen und ergaenzen ─────────────────────────────────

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Milch kommt von der Kuh. Ei kommt vom ...",
    antwort_a:"Schwein", antwort_b:"Huhn", antwort_c:"Schaf", antwort_d:"Pferd", richtig:"B",
    erklaerung:"Milch ist ein Produkt der Kuh. Das Ei ist ein Produkt des Huhns." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Brille trägt man auf der Nase. Hut trägt man auf dem ...",
    antwort_a:"Arm", antwort_b:"Rücken", antwort_c:"Kopf", antwort_d:"Bauch", richtig:"C",
    erklaerung:"Eine Brille trägt man auf der Nase. Einen Hut trägt man auf dem Kopf." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Löwe wohnt in der Savanne. Pinguin lebt am ...",
    antwort_a:"Meer", antwort_b:"Nordpol oder Südpol", antwort_c:"Dschungel", antwort_d:"Wüste", richtig:"B",
    erklaerung:"Der Löwe lebt in der warmen Savanne. Pinguine leben am kalten Südpol oder Nordpol." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Küche ist zum Kochen. Badezimmer ist zum ...",
    antwort_a:"Schlafen", antwort_b:"Essen", antwort_c:"Waschen", antwort_d:"Spielen", richtig:"C",
    erklaerung:"In der Küche kocht man. Im Badezimmer wäscht man sich." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Bäcker backt Brot. Maler ...",
    antwort_a:"verkauft Kleider", antwort_b:"malt Bilder oder Wände", antwort_c:"baut Häuser", antwort_d:"repariert Autos", richtig:"B",
    erklaerung:"Ein Bäcker backt Brot — das ist sein Beruf. Ein Maler malt Bilder oder Wände — das ist sein Beruf." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Tagsüber ist es hell. Nachts ist es ...",
    antwort_a:"warm", antwort_b:"laut", antwort_c:"dunkel", antwort_d:"bunt", richtig:"C",
    erklaerung:"Tag und Nacht sind Gegensätze. Am Tag ist es hell, in der Nacht ist es dunkel." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Schere schneidet Papier. Hammer ...",
    antwort_a:"malt Farbe", antwort_b:"sägt Holz", antwort_c:"schlägt Nägel ein", antwort_d:"klebt Dinge fest", richtig:"C",
    erklaerung:"Eine Schere ist ein Werkzeug zum Schneiden. Ein Hammer ist ein Werkzeug zum Einschlagen von Nägeln." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Frühling kommt nach Winter. Sommer kommt nach ...",
    antwort_a:"Winter", antwort_b:"Herbst", antwort_c:"Frühling", antwort_d:"September", richtig:"C",
    erklaerung:"Die Jahreszeiten folgen in dieser Reihenfolge: Winter, Frühling, Sommer, Herbst. Nach dem Frühling kommt der Sommer." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"🐣 ist das Jungtier von 🐔. 🐾 ist das Jungtier von ...",
    antwort_a:"🐱", antwort_b:"🐶", antwort_c:"🐰", antwort_d:"🦊", richtig:"B",
    erklaerung:"Das Küken ist das Jungtier des Huhns. Die Hundepfote steht für den Hund — ein junger Hund heißt Welpe." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Klein ist das Gegenteil von groß. Langsam ist das Gegenteil von ...",
    antwort_a:"leise", antwort_b:"weit", antwort_c:"schwer", antwort_d:"schnell", richtig:"D",
    erklaerung:"Klein und groß sind Gegensätze. Genauso sind langsam und schnell Gegensätze." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Füße stecken in Schuhen. Hände stecken in ...",
    antwort_a:"Mützen", antwort_b:"Handschuhen", antwort_c:"Socken", antwort_d:"Taschen", richtig:"B",
    erklaerung:"Für die Füße gibt es Schuhe. Für die Hände gibt es Handschuhe — deshalb heißen sie so." },

  { stufe:"L3", text:"Erkenne die Beziehung und ergänze.",
    frage:"Bücher stehen im Regal. Kleider hängen im ...",
    antwort_a:"Kühlschrank", antwort_b:"Schrank", antwort_c:"Keller", antwort_d:"Rucksack", richtig:"B",
    erklaerung:"Bücher haben ihren Platz im Bücherregal. Kleider hängen im Kleiderschrank." },

  // ── L4: Logisch denken ────────────────────────────────────────────────────

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Alle Fische leben im Wasser. Nemo ist ein Fisch. Lebt Nemo im Wasser?",
    antwort_a:"Nein", antwort_b:"Manchmal", antwort_c:"Ja", antwort_d:"Weiß nicht", richtig:"C",
    erklaerung:"Alle Fische leben im Wasser, und Nemo ist ein Fisch. Also lebt Nemo im Wasser — das ist sicher." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Eine Tomate ist ein Gemüse und wächst unter der Erde.",
    antwort_a:"Richtig", antwort_b:"Falsch", antwort_c:"Manchmal", antwort_d:"Vielleicht", richtig:"B",
    erklaerung:"Falsch: Tomaten wachsen oberirdisch an einer Pflanze, nicht unter der Erde. Kartoffeln wachsen unter der Erde." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Mia hat 6 Buntstifte. Sie gibt 2 ihrer Freundin. Wie viele hat sie noch?",
    antwort_a:"8", antwort_b:"3", antwort_c:"4", antwort_d:"2", richtig:"C",
    erklaerung:"Mia hatte 6 Stifte und hat 2 weggegeben. 6 minus 2 ist 4 — sie hat noch 4 Stifte." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Wenn es sehr heiß ist, kann Schnee auf dem Boden liegen.",
    antwort_a:"Richtig", antwort_b:"Falsch", antwort_c:"Manchmal", antwort_d:"Immer", richtig:"B",
    erklaerung:"Falsch: Schnee schmilzt bei Wärme. Er kann nur liegen bleiben, wenn es kalt genug ist." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Anna ist größer als Ben. Ben ist größer als Clara. Wer ist am kleinsten?",
    antwort_a:"Anna", antwort_b:"Ben", antwort_c:"Alle gleich", antwort_d:"Clara", richtig:"D",
    erklaerung:"Anna ist größer als Ben, Ben ist größer als Clara. Clara ist also von allen dreien am kleinsten." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Ein Vogel ist ein Tier und hat Federn.",
    antwort_a:"Falsch", antwort_b:"Richtig", antwort_c:"Manchmal", antwort_d:"Selten", richtig:"B",
    erklaerung:"Richtig: Vögel sind Tiere und die einzigen Lebewesen mit Federn." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Ein Laden öffnet um 9 Uhr. Es ist jetzt 8 Uhr. Wie lange muss man noch warten?",
    antwort_a:"Zwei Stunden", antwort_b:"Eine halbe Stunde", antwort_c:"Eine Stunde", antwort_d:"Zehn Minuten", richtig:"C",
    erklaerung:"Von 8 Uhr bis 9 Uhr ist es genau eine Stunde — so lange muss man noch warten." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Alle Pflanzen brauchen Wasser und Licht zum Wachsen.",
    antwort_a:"Falsch", antwort_b:"Manchmal", antwort_c:"Richtig", antwort_d:"Selten", richtig:"C",
    erklaerung:"Richtig: Fast alle Pflanzen brauchen Wasser und Sonnenlicht, um wachsen zu können." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Wenn heute Montag ist, welcher Tag war gestern?",
    antwort_a:"Dienstag", antwort_b:"Sonntag", antwort_c:"Samstag", antwort_d:"Mittwoch", richtig:"B",
    erklaerung:"Vor dem Montag kommt immer der Sonntag — also war gestern Sonntag." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Wenn man etwas fallen lässt, fällt es nach oben.",
    antwort_a:"Manchmal", antwort_b:"Richtig", antwort_c:"Falsch", antwort_d:"Immer", richtig:"C",
    erklaerung:"Falsch: Was man loslässt, fällt immer nach unten — das macht die Schwerkraft der Erde." },

  { stufe:"L4", text:"Denke nach und antworte.",
    frage:"Alle Hunde mögen Knochen. Alle Katzen mögen Fisch. Mag ein Hund Fisch?",
    antwort_a:"Ja, sicher", antwort_b:"Nein, nie", antwort_c:"Das steht nicht im Text", antwort_d:"Vielleicht nicht", richtig:"C",
    erklaerung:"Im Text steht nur, dass Hunde Knochen mögen. Ob Hunde auch Fisch mögen, steht nicht darin." },

  { stufe:"L4", text:"Stimmt das oder nicht?",
    frage:"Ein Dreieck hat drei Seiten und drei Ecken.",
    antwort_a:"Falsch", antwort_b:"Manchmal", antwort_c:"Selten", antwort_d:"Richtig", richtig:"D",
    erklaerung:"Richtig: Ein Dreieck hat immer genau drei Seiten und drei Ecken — das macht es zum Dreieck." }

];

D.set("logik", aufgaben);

})();
