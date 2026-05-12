// deutsch_data_A1_alltag.js
// Neue A1-Aufgaben: Alltagssituationen mit einem Schuss Humor
// Stufe A1 = erste Schwierigkeitsstufe (kurze, einfache Texte)
// Seiten ab 401 (keine Kollision mit bestehenden Seiten)
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── Morgens ──────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"401",
    text:"Der Wecker klingelt um sieben Uhr.\nTim zieht sich die Decke über den Kopf.",
    frage:"Was macht Tim, als der Wecker klingelt?",
    antwort_a:"Er steht sofort auf",
    antwort_b:"Er zieht sich die Decke über den Kopf",
    antwort_c:"Er macht das Licht an",
    antwort_d:"Er singt ein Lied",
    richtig:"B",
    erklaerung:"Tim zieht sich die Decke über den Kopf — aufstehen ist manchmal schwer!" },

  { stufe:"A1", seite:"402",
    text:"Mama macht Frühstück.\nSie verbrennt den Toast — wieder.",
    frage:"Was passiert mit dem Toast?",
    antwort_a:"Er fällt runter",
    antwort_b:"Er ist perfekt",
    antwort_c:"Er verbrennt",
    antwort_d:"Er verschwindet",
    richtig:"C",
    erklaerung:"Der Toast verbrennt — das passiert Mama anscheinend öfter!" },

  { stufe:"A1", seite:"403",
    text:"Papa gähnt laut beim Frühstück.\nEr trinkt schnell seinen Kaffee.",
    frage:"Was trinkt Papa beim Frühstück?",
    antwort_a:"Tee",
    antwort_b:"Saft",
    antwort_c:"Milch",
    antwort_d:"Kaffee",
    richtig:"D",
    erklaerung:"Papa trinkt Kaffee — ohne Kaffee geht es morgens manchmal nicht!" },

  { stufe:"A1", seite:"404",
    text:"Lena sucht ihre linke Socke.\nSie findet sie auf dem Kühlschrank.",
    frage:"Wo findet Lena ihre Socke?",
    antwort_a:"Unter dem Bett",
    antwort_b:"Im Schrank",
    antwort_c:"Auf dem Kühlschrank",
    antwort_d:"In der Schultasche",
    richtig:"C",
    erklaerung:"Die Socke liegt auf dem Kühlschrank — wie sie dort hinkommt, bleibt ein Rätsel!" },

  { stufe:"A1", seite:"405",
    text:"Ben putzt morgens die Zähne.\nEr summt dabei ein Lied.",
    frage:"Was macht Ben beim Zähneputzen?",
    antwort_a:"Er schläft fast",
    antwort_b:"Er lacht",
    antwort_c:"Er summt ein Lied",
    antwort_d:"Er liest ein Buch",
    richtig:"C",
    erklaerung:"Ben summt beim Zähneputzen — so vergeht die Zeit schneller!" },

  // ── Unterwegs ─────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"406",
    text:"Es regnet und Jonas hat keinen Schirm.\nEr rennt zur Schule.",
    frage:"Was macht Jonas im Regen?",
    antwort_a:"Er wartet auf den Bus",
    antwort_b:"Er rennt zur Schule",
    antwort_c:"Er geht zurück nach Hause",
    antwort_d:"Er macht Fotos",
    richtig:"B",
    erklaerung:"Jonas rennt zur Schule, weil er keinen Schirm hat — nass wird er trotzdem!" },

  { stufe:"A1", seite:"407",
    text:"Der Bus ist voll.\nEin Mann schläft im Stehen und schnarcht leise.",
    frage:"Was macht der Mann im Bus?",
    antwort_a:"Er liest die Zeitung",
    antwort_b:"Er schläft im Stehen",
    antwort_c:"Er telefoniert",
    antwort_d:"Er isst ein Brötchen",
    richtig:"B",
    erklaerung:"Der Mann schläft im Stehen und schnarcht — das kann man nur im Bus!" },

  { stufe:"A1", seite:"408",
    text:"Anna wartet an der roten Ampel.\nEin Hund sitzt neben ihr und wartet auch.",
    frage:"Wer wartet noch an der Ampel?",
    antwort_a:"Ein Kind",
    antwort_b:"Eine Katze",
    antwort_c:"Ein Hund",
    antwort_d:"Ein Vogel",
    richtig:"C",
    erklaerung:"Ein Hund wartet neben Anna an der Ampel — Hunde kennen die Regeln!" },

  { stufe:"A1", seite:"409",
    text:"Felix fährt mit dem Fahrrad.\nEr fährt durch eine Pfütze und wird nass.",
    frage:"Wodurch fährt Felix?",
    antwort_a:"Durch ein Blumenbeet",
    antwort_b:"Durch eine Pfütze",
    antwort_c:"Durch den Park",
    antwort_d:"Durch ein Tor",
    richtig:"B",
    erklaerung:"Felix fährt durch eine Pfütze — das macht nass, aber macht auch Spaß!" },

  { stufe:"A1", seite:"410",
    text:"Oma geht langsam spazieren.\nSie grüßt jeden, den sie trifft.",
    frage:"Was macht Oma beim Spazieren?",
    antwort_a:"Sie läuft schnell",
    antwort_b:"Sie grüßt jeden",
    antwort_c:"Sie singt laut",
    antwort_d:"Sie liest Schilder",
    richtig:"B",
    erklaerung:"Oma grüßt jeden — sie kennt im ganzen Ort alle Menschen!" },

  // ── Zuhause ───────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"411",
    text:"Die Katze sitzt auf der Fernbedienung.\nDer Fernseher schaltet alleine um.",
    frage:"Warum schaltet der Fernseher um?",
    antwort_a:"Weil er kaputt ist",
    antwort_b:"Weil Papa den Knopf drückt",
    antwort_c:"Weil die Katze auf der Fernbedienung sitzt",
    antwort_d:"Weil der Strom weg ist",
    richtig:"C",
    erklaerung:"Die Katze sitzt auf der Fernbedienung und schaltet den Fernseher um — Katzen tun was sie wollen!" },

  { stufe:"A1", seite:"412",
    text:"Paul räumt sein Zimmer auf.\nUnter dem Bett findet er ein Brot von letzter Woche.",
    frage:"Was findet Paul unter dem Bett?",
    antwort_a:"Einen Schuh",
    antwort_b:"Ein Spielzeug",
    antwort_c:"Ein Brot von letzter Woche",
    antwort_d:"Ein Buch",
    richtig:"C",
    erklaerung:"Paul findet altes Brot unter dem Bett — Zeit, öfter aufzuräumen!" },

  { stufe:"A1", seite:"413",
    text:"Mama ruft zum Mittagessen.\nAlle kommen sofort — außer der Hund kommt zuerst.",
    frage:"Wer kommt als erstes zum Essen?",
    antwort_a:"Papa",
    antwort_b:"Die Kinder",
    antwort_c:"Oma",
    antwort_d:"Der Hund",
    richtig:"D",
    erklaerung:"Der Hund kommt zuerst — er hört das Wort Essen immer als erstes!" },

  { stufe:"A1", seite:"414",
    text:"Sara trinkt Kakao.\nSie bekommt einen Kakaobart.",
    frage:"Was bekommt Sara?",
    antwort_a:"Einen Schnurrbart",
    antwort_b:"Einen Kakaobart",
    antwort_c:"Einen Fleck auf der Jacke",
    antwort_d:"Bauchschmerzen",
    richtig:"B",
    erklaerung:"Sara trinkt Kakao und bekommt dabei einen Kakaobart — das passiert schnell!" },

  { stufe:"A1", seite:"415",
    text:"Papa kocht Spaghetti.\nEr wirft eine Nudel an die Wand — sie klebt.",
    frage:"Was macht Papa mit der Nudel?",
    antwort_a:"Er isst sie",
    antwort_b:"Er wirft sie an die Wand",
    antwort_c:"Er schneidet sie klein",
    antwort_d:"Er lässt sie fallen",
    richtig:"B",
    erklaerung:"Papa wirft die Nudel an die Wand — wenn sie klebt, ist die Spaghetti fertig!" },

  // ── Nachmittag ────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"416",
    text:"Die Kinder spielen draußen.\nSie bauen eine Höhle aus Decken.",
    frage:"Was bauen die Kinder?",
    antwort_a:"Ein Haus aus Holz",
    antwort_b:"Eine Sandburg",
    antwort_c:"Eine Höhle aus Decken",
    antwort_d:"Einen Schneemann",
    richtig:"C",
    erklaerung:"Die Kinder bauen eine Höhle aus Decken — die beste Art, den Nachmittag zu verbringen!" },

  { stufe:"A1", seite:"417",
    text:"Nico spielt Fußball im Garten.\nEr schießt den Ball gegen das Gartentor.",
    frage:"Wohin schießt Nico den Ball?",
    antwort_a:"Ins Blumenbeet",
    antwort_b:"Auf das Dach",
    antwort_c:"In den Teich",
    antwort_d:"Gegen das Gartentor",
    richtig:"D",
    erklaerung:"Nico schießt den Ball gegen das Gartentor — Tooor!" },

  { stufe:"A1", seite:"418",
    text:"Mia liest ein Buch.\nSie lacht laut — das Buch ist lustig.",
    frage:"Wie ist das Buch?",
    antwort_a:"Traurig",
    antwort_b:"Langweilig",
    antwort_c:"Lustig",
    antwort_d:"Gruselig",
    richtig:"C",
    erklaerung:"Das Buch ist lustig — deshalb lacht Mia so laut!" },

  { stufe:"A1", seite:"419",
    text:"Der Hund bringt den Ball zurück.\nEr legt ihn in Papas Schuh.",
    frage:"Wohin legt der Hund den Ball?",
    antwort_a:"In seinen Napf",
    antwort_b:"Auf das Sofa",
    antwort_c:"In Papas Schuh",
    antwort_d:"Unter den Tisch",
    richtig:"C",
    erklaerung:"Der Hund legt den Ball in Papas Schuh — ein besonderes Geschenk!" },

  { stufe:"A1", seite:"420",
    text:"Emma malt ein Bild von der Familie.\nDen Hund malt sie am größten.",
    frage:"Wen malt Emma am größten?",
    antwort_a:"Mama",
    antwort_b:"Papa",
    antwort_c:"Sich selbst",
    antwort_d:"Den Hund",
    richtig:"D",
    erklaerung:"Emma malt den Hund am größten — er ist eben der wichtigste in der Familie!" },

  // ── Einkaufen ─────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"421",
    text:"Mama geht einkaufen.\nSie vergisst die Einkaufsliste zu Hause.",
    frage:"Was vergisst Mama?",
    antwort_a:"Ihr Portemonnaie",
    antwort_b:"Den Einkaufskorb",
    antwort_c:"Die Einkaufsliste",
    antwort_d:"Ihre Schuhe",
    richtig:"C",
    erklaerung:"Mama vergisst die Einkaufsliste — jetzt kauft sie alles, was ihr einfällt!" },

  { stufe:"A1", seite:"422",
    text:"Im Supermarkt probiert Papa ein Stück Käse.\nEr nimmt dann gleich zwei Packungen.",
    frage:"Was nimmt Papa mit?",
    antwort_a:"Drei Packungen Käse",
    antwort_b:"Gar keinen Käse",
    antwort_c:"Zwei Packungen Käse",
    antwort_d:"Eine Packung Käse",
    richtig:"C",
    erklaerung:"Papa probiert den Käse und nimmt gleich zwei Packungen — er schmeckt wohl sehr gut!" },

  { stufe:"A1", seite:"423",
    text:"An der Kasse liegt eine Zeitschrift.\nDarauf ist ein süßes Kätzchen.",
    frage:"Was ist auf der Zeitschrift?",
    antwort_a:"Ein Hund",
    antwort_b:"Ein süßes Kätzchen",
    antwort_c:"Ein Fußballspieler",
    antwort_d:"Eine Blume",
    richtig:"B",
    erklaerung:"Auf der Zeitschrift ist ein süßes Kätzchen abgebildet." },

  { stufe:"A1", seite:"424",
    text:"Oma kauft zu viel ein.\nSie kann die Tüten kaum tragen.",
    frage:"Was ist das Problem mit Omas Einkauf?",
    antwort_a:"Sie hat zu wenig eingekauft",
    antwort_b:"Sie hat das Falsche gekauft",
    antwort_c:"Sie kann die Tüten kaum tragen",
    antwort_d:"Sie hat kein Geld dabei",
    richtig:"C",
    erklaerung:"Oma hat zu viel eingekauft und kann die schweren Tüten kaum tragen." },

  // ── Abends ────────────────────────────────────────────────────────────────

  { stufe:"A1", seite:"425",
    text:"Nach dem Abendessen spielt die Familie ein Spiel.\nPapa verliert und schmollt ein bisschen.",
    frage:"Wie reagiert Papa auf das Verlieren?",
    antwort_a:"Er lacht",
    antwort_b:"Er schmollt ein bisschen",
    antwort_c:"Er geht ins Bett",
    antwort_d:"Er freut sich",
    richtig:"B",
    erklaerung:"Papa verliert beim Spielen und schmollt — verlieren macht manchmal keinen Spaß!" },

  { stufe:"A1", seite:"426",
    text:"Tom schaut einen Tierfilm im Fernsehen.\nEr fällt beim Schauen ein.",
    frage:"Was passiert Tom beim Fernsehen?",
    antwort_a:"Er lacht laut",
    antwort_b:"Er ändert den Kanal",
    antwort_c:"Er fällt ein",
    antwort_d:"Er holt Popcorn",
    richtig:"C",
    erklaerung:"Tom fällt beim Fernsehen ein — der Film war wohl doch nicht so spannend!" },

  { stufe:"A1", seite:"427",
    text:"Klara badet und singt ein Lied.\nMama hört es durch die Tür.",
    frage:"Was macht Klara in der Badewanne?",
    antwort_a:"Sie schläft",
    antwort_b:"Sie liest",
    antwort_c:"Sie singt ein Lied",
    antwort_d:"Sie spielt mit Bausteinen",
    richtig:"C",
    erklaerung:"Klara singt in der Badewanne — dort klingt alles besonders gut!" },

  { stufe:"A1", seite:"428",
    text:"Vor dem Schlafen möchte Leo noch ein Glas Wasser.\nDann noch eines. Und noch eines.",
    frage:"Wie viele Gläser Wasser möchte Leo?",
    antwort_a:"Genau ein Glas",
    antwort_b:"Kein Glas",
    antwort_c:"Zwei Gläser",
    antwort_d:"Mehrere Gläser",
    richtig:"D",
    erklaerung:"Leo möchte immer noch ein Glas Wasser — manchmal ist das eine Strategie um länger wach zu bleiben!" },

  { stufe:"A1", seite:"429",
    text:"Mama liest eine Geschichte vor.\nSie gähnt selbst am meisten.",
    frage:"Wer gähnt beim Vorlesen am meisten?",
    antwort_a:"Die Kinder",
    antwort_b:"Der Hund",
    antwort_c:"Mama",
    antwort_d:"Papa",
    richtig:"C",
    erklaerung:"Mama liest vor und gähnt selbst am meisten — sie ist auch müde!" },

  { stufe:"A1", seite:"430",
    text:"Ben schläft schon, als Papa ins Zimmer schaut.\nEr schnarcht leise wie ein kleines Schweinchen.",
    frage:"Wie schnarcht Ben?",
    antwort_a:"Sehr laut",
    antwort_b:"Gar nicht",
    antwort_c:"Leise wie ein kleines Schweinchen",
    antwort_d:"Wie ein Bär",
    richtig:"C",
    erklaerung:"Ben schnarcht leise wie ein kleines Schweinchen — das klingt bestimmt sehr süß!" }

];

// Alle bestehenden A1-Aufgaben ersetzen — diese Datei ist die neue A1-Quelle
var existing = D.get("deutsch") || [];
var ohneAlteA1 = existing.filter(function(t){
  return (t.stufe || "").toUpperCase() !== "A1";
});
D.set("deutsch", ohneAlteA1.concat(aufgaben));

})();
