// logik_data_L5.js -- Laetitia Lernsystem
// L5-Aufgaben: Wenn-Dann (Kausales Denken)
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man sehr durstig ist, was tut man dann?",
    antwort_a:"Man isst einen Apfel",
    antwort_b:"Man trinkt etwas",
    antwort_c:"Man schläft",
    antwort_d:"Man singt ein Lied",
    richtig:"B",
    erklaerung:"Durst bedeutet, dass der Körper Wasser braucht. Man trinkt etwas, um den Durst zu stillen." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn draußen die Sonne scheint und es warm ist, was zieht man an?",
    antwort_a:"Eine dicke Winterjacke",
    antwort_b:"Einen Schal und Handschuhe",
    antwort_c:"Leichte, dünne Kleidung",
    antwort_d:"Einen Regenmantel",
    richtig:"C",
    erklaerung:"Wenn es warm und sonnig ist, braucht man keine dicke Kleidung — leichte Sachen sind richtig." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn eine Kerze brennt und man sie nicht löscht, was passiert dann?",
    antwort_a:"Sie wird größer",
    antwort_b:"Sie brennt weiter und wird kleiner",
    antwort_c:"Sie geht von selbst aus",
    antwort_d:"Sie wächst nach oben",
    richtig:"B",
    erklaerung:"Eine brennende Kerze verbrennt ihr Wachs — sie wird immer kleiner, bis nichts mehr übrig ist." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man vergisst, die Blumen zu gießen, was passiert dann?",
    antwort_a:"Sie wachsen schneller",
    antwort_b:"Sie blühen mehr",
    antwort_c:"Sie werden welk",
    antwort_d:"Nichts passiert",
    richtig:"C",
    erklaerung:"Pflanzen brauchen Wasser. Ohne Wasser werden sie welk — die Blätter hängen herunter." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man den ganzen Tag draußen in der Sonne ist, was sollte man tun?",
    antwort_a:"Gar nichts — die Sonne ist harmlos",
    antwort_b:"Sonnencreme auftragen und Wasser trinken",
    antwort_c:"Einen dicken Pullover anziehen",
    antwort_d:"Regen herbeiwünschen",
    richtig:"B",
    erklaerung:"Starke Sonne kann die Haut verbrennen und man schwitzt viel. Sonnencreme und Wasser trinken schützen." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn das Licht im Zimmer ausgeht und kein Strom mehr da ist, was tut man?",
    antwort_a:"Man schaut fern",
    antwort_b:"Man zündet eine Kerze oder Taschenlampe an",
    antwort_c:"Man öffnet das Fenster",
    antwort_d:"Man kocht Essen",
    richtig:"B",
    erklaerung:"Ohne Strom gibt es kein elektrisches Licht. Eine Kerze oder Taschenlampe bringt dann Licht." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man einen Brief schreiben und abschicken will, was braucht man zuletzt?",
    antwort_a:"Einen Bleistift",
    antwort_b:"Papier",
    antwort_c:"Eine Briefmarke",
    antwort_d:"Einen Umschlag",
    richtig:"C",
    erklaerung:"Zuerst schreibt man den Brief, steckt ihn in einen Umschlag — und zum Abschicken braucht man eine Briefmarke." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn ein Glas Milch auf dem Tisch umfällt, was passiert?",
    antwort_a:"Die Milch bleibt im Glas",
    antwort_b:"Die Milch läuft aus dem Glas heraus",
    antwort_c:"Das Glas zieht die Milch auf",
    antwort_d:"Die Milch wird mehr",
    richtig:"B",
    erklaerung:"Wenn ein Glas umfällt, läuft die Flüssigkeit darin aus — man braucht dann einen Lappen zum Aufwischen." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man sich beim Spielen das Knie aufschlägt und es blutet, was macht man?",
    antwort_a:"Man spielt einfach weiter",
    antwort_b:"Man wäscht die Wunde und klebt ein Pflaster drauf",
    antwort_c:"Man legt sich sofort schlafen",
    antwort_d:"Man gießt Wasser über den Boden",
    richtig:"B",
    erklaerung:"Bei einer blutenden Wunde reinigt man sie und deckt sie mit einem Pflaster ab, damit sie heilen kann." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man sehr lange keinen Schlaf bekommt, wie fühlt man sich dann?",
    antwort_a:"Voller Energie",
    antwort_b:"Müde und unkonzentriert",
    antwort_c:"Hungrig",
    antwort_d:"Kalt",
    richtig:"B",
    erklaerung:"Der Körper braucht Schlaf zum Erholen. Ohne Schlaf wird man müde und kann sich schlecht konzentrieren." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man einen Schneemann bauen will, was braucht man unbedingt?",
    antwort_a:"Regen und Sonne",
    antwort_b:"Sand und Wasser",
    antwort_c:"Schnee",
    antwort_d:"Farbe und Pinsel",
    richtig:"C",
    erklaerung:"Einen Schneemann kann man nur aus Schnee bauen. Ohne Schnee funktioniert es nicht." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn es sehr dunkel draußen ist und man spazieren gehen will, was nimmt man mit?",
    antwort_a:"Eine Sonnenbrille",
    antwort_b:"Eine Taschenlampe",
    antwort_c:"Ein Buch",
    antwort_d:"Einen Regenschirm",
    richtig:"B",
    erklaerung:"Im Dunkeln sieht man nicht gut. Eine Taschenlampe beleuchtet den Weg und macht es sicherer." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man Hunger hat und nach Hause kommt, was ist das Erste, was man tut?",
    antwort_a:"Man schläft sofort",
    antwort_b:"Man schaut Fernsehen",
    antwort_c:"Man sucht etwas zu essen",
    antwort_d:"Man räumt das Zimmer auf",
    richtig:"C",
    erklaerung:"Hunger zeigt, dass der Körper Nahrung braucht. Man sucht deshalb als Erstes etwas zu essen." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn das Eis in der Sonne liegt, was passiert damit?",
    antwort_a:"Es wird härter",
    antwort_b:"Es wächst",
    antwort_c:"Es bleibt gleich",
    antwort_d:"Es schmilzt",
    richtig:"D",
    erklaerung:"Wärme lässt Eis schmelzen — es verwandelt sich in Wasser, wenn es zu warm wird." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man morgen früh aufstehen muss, was sollte man abends tun?",
    antwort_a:"Sehr lange aufbleiben",
    antwort_b:"Rechtzeitig schlafen gehen",
    antwort_c:"Nichts Besonderes",
    antwort_d:"Viele Süßigkeiten essen",
    richtig:"B",
    erklaerung:"Wer früh aufstehen muss, braucht genug Schlaf. Deshalb geht man abends rechtzeitig ins Bett." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn ein Hund einen Ball ins Wasser wirft und hinterher springt, was passiert dann?",
    antwort_a:"Der Hund bleibt trocken",
    antwort_b:"Der Hund wird nass",
    antwort_c:"Der Ball verschwindet",
    antwort_d:"Das Wasser läuft weg",
    richtig:"B",
    erklaerung:"Wer ins Wasser springt, wird nass — das gilt auch für Hunde." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man einen Kuchen backen will und kein Mehl im Haus ist, was muss man zuerst tun?",
    antwort_a:"Den Ofen einschalten",
    antwort_b:"Mehl kaufen gehen",
    antwort_c:"Den Teig rühren",
    antwort_d:"Die Form einbuttern",
    richtig:"B",
    erklaerung:"Ohne Mehl kann man keinen Kuchenteig machen. Man muss zuerst Mehl besorgen, bevor man backen kann." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man auf Reisen geht und seine Zahnbürste vergisst, was fehlt einem?",
    antwort_a:"Frühstück",
    antwort_b:"Ein Bett",
    antwort_c:"Ein Zahnpflegemittel zum Zähneputzen",
    antwort_d:"Ein Koffer",
    richtig:"C",
    erklaerung:"Ohne Zahnbürste kann man die Zähne nicht richtig putzen — man braucht eine neue oder muss sie kaufen." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn es stark regnet und man kein Auto hat, wie kommt man trocken ans Ziel?",
    antwort_a:"Man rennt sehr schnell",
    antwort_b:"Man wartet bis es aufhört oder nimmt einen Schirm",
    antwort_c:"Man zieht sich warm an",
    antwort_d:"Man isst etwas",
    richtig:"B",
    erklaerung:"Ein Regenschirm schützt vor dem Regen. Alternativ wartet man, bis der Regen aufhört." },

  { stufe:"L5", text:"Wenn ... dann ... Überlege, was folgt.",
    frage:"Wenn man jemandem aus Versehen wehtut, was ist das Richtige?",
    antwort_a:"Schnell weglaufen",
    antwort_b:"So tun, als wäre nichts gewesen",
    antwort_c:"Entschuldigung sagen und fragen, ob alles gut ist",
    antwort_d:"Lachen",
    richtig:"C",
    erklaerung:"Wenn man jemandem aus Versehen wehtut, sagt man Entschuldigung und fragt, ob die Person in Ordnung ist." }

];

var existing = D.get("logik") || [];
var ohneAlteL5 = existing.filter(function(t){
  return (t.stufe || "").toUpperCase() !== "L5";
});
D.set("logik", ohneAlteL5.concat(aufgaben));

})();
