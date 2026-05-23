// quasselkiste_data.js -- Laetitia Lernsystem
// Quasselkiste 60: Raster + Vokabular-Pfade
// Automatisch generiert aus Keys.ini + Minspeak.prv
// REGEL 4: Nur gerade Anfuehrungszeichen

window.QUASSELKISTE_FELDER = [
  {r:1, c: 1, name:"Start", bg:"#FFFFFF"},
  {r:1, c: 2, name:"ABC", bg:"#FFFFFF"},
  {r:1, c: 3, name:"Ja", bg:"#FFFFFF"},
  {r:1, c: 4, name:"Nein", bg:"#FFFFFF"},
  {r:1, c: 5, name:"Hallo", bg:"#FFFFFF"},
  {r:1, c: 6, name:"Cool", bg:"#FFFFFF"},
  {r:1, c: 7, name:"Bilder", bg:"#FFFFFF"},
  {r:1, c: 8, name:"Wort", bg:"#FFFFFF"},
  {r:1, c: 9, name:"Fussball", bg:"#FFFFFF"},
  {r:1, c:10, name:"", bg:"#FFFFFF"},
  {r:2, c: 1, name:"ich", bg:"#FFF87F"},
  {r:2, c: 2, name:"du", bg:"#FFF87F"},
  {r:2, c: 3, name:"er", bg:"#FFF87F"},
  {r:2, c: 4, name:"sie", bg:"#FFF87F"},
  {r:2, c: 5, name:"es", bg:"#FFF980"},
  {r:2, c: 6, name:"Dino", bg:"#60F079"},
  {r:2, c: 7, name:"Einzahl", bg:"#FF9866"},
  {r:2, c: 8, name:"wir", bg:"#FFF87F"},
  {r:2, c: 9, name:"ihr", bg:"#FFF87F"},
  {r:2, c:10, name:"Sie", bg:"#FFF87F"},
  {r:3, c: 1, name:"Zauberer", bg:"#FFF57D"},
  {r:3, c: 2, name:"Haus", bg:"#FFFFFF"},
  {r:3, c: 3, name:"Hammer", bg:"#FFFFFF"},
  {r:3, c: 4, name:"Minus", bg:"#FFFFFF"},
  {r:3, c: 5, name:"Plus", bg:"#FFFFFF"},
  {r:3, c: 6, name:"Turm", bg:"#60F079"},
  {r:3, c: 7, name:"Ampel", bg:"#99CCFF"},
  {r:3, c: 8, name:"Schluessel", bg:"#F8A9D8"},
  {r:3, c: 9, name:"Talker", bg:"#FFFFFF"},
  {r:3, c:10, name:"Lupe", bg:"#66FF66"},
  {r:4, c: 1, name:"Blume", bg:"#FFFFFF"},
  {r:4, c: 2, name:"Leute", bg:"#FFFFFF"},
  {r:4, c: 3, name:"Lego", bg:"#FFFFFF"},
  {r:4, c: 4, name:"Farbe", bg:"#FFFFFF"},
  {r:4, c: 5, name:"Schule", bg:"#FFFFFF"},
  {r:4, c: 6, name:"Herz", bg:"#FFFFFF"},
  {r:4, c: 7, name:"Buch", bg:"#FFFFFF"},
  {r:4, c: 8, name:"Ball", bg:"#FFFFFF"},
  {r:4, c: 9, name:"der", bg:"#65FF65"},
  {r:4, c:10, name:"des", bg:"#65FF65"},
  {r:5, c: 1, name:"Apfel", bg:"#FFFFFF"},
  {r:5, c: 2, name:"Saft", bg:"#FFFFFF"},
  {r:5, c: 3, name:"Taxi", bg:"#FFFFFF"},
  {r:5, c: 4, name:"Elefant", bg:"#FFFFFF"},
  {r:5, c: 5, name:"Sonne", bg:"#FFFFFF"},
  {r:5, c: 6, name:"Geld", bg:"#FFFFFF"},
  {r:5, c: 7, name:"Wuerfel", bg:"#FFFFFF"},
  {r:5, c: 8, name:"Bad", bg:"#FFFFFF"},
  {r:5, c: 9, name:"die", bg:"#63FF63"},
  {r:5, c:10, name:"dem", bg:"#65FF65"},
  {r:6, c: 1, name:"Maus", bg:"#FFFFFF"},
  {r:6, c: 2, name:"Baby", bg:"#FFFFFF"},
  {r:6, c: 3, name:"Bett", bg:"#FFFFFF"},
  {r:6, c: 4, name:"TV", bg:"#FFFFFF"},
  {r:6, c: 5, name:"Freibad", bg:"#FFFFFF"},
  {r:6, c: 6, name:"Dieb", bg:"#FFFFFF"},
  {r:6, c: 7, name:"Idee", bg:"#FFFFFF"},
  {r:6, c: 8, name:"wandern", bg:"#FFFFFF"},
  {r:6, c: 9, name:"das", bg:"#61FF61"},
  {r:6, c:10, name:"den", bg:"#65FF65"}
];

// Wort-Pfade: { wort, tts, pfad:[{r,c},...] }
// Gesamt: 1880 Eintraege
window.QUASSELKISTE_PFADE = [
  {wort:"bau", tts:"bau", pfad:[{r:3,c:2},{r:1,c:5}]}, // Haus-Zauberer
  {wort:"gebaut", tts:"gebaut", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"bauen", tts:"bauen", pfad:[{r:3,c:2},{r:2,c:10}]}, // Haus-Sie
  {wort:"Gebäude", tts:"Gebäude", pfad:[{r:3,c:2},{r:2,c:7}]}, // Haus-Einzahl
  {wort:"baut", tts:"baut", pfad:[{r:3,c:2},{r:2,c:9}]}, // Haus-ihr
  {wort:"baue", tts:"baue", pfad:[{r:3,c:2},{r:2,c:1}]}, // Haus-ich
  {wort:"baust", tts:"baust", pfad:[{r:3,c:2},{r:2,c:2}]}, // Haus-du
  {wort:"baut", tts:"baut", pfad:[{r:3,c:2},{r:2,c:3}]}, // Haus-er
  {wort:"baut", tts:"baut", pfad:[{r:3,c:2},{r:2,c:4}]}, // Haus-sie
  {wort:"baut", tts:"baut", pfad:[{r:3,c:2},{r:2,c:5}]}, // Haus-es
  {wort:"bauen", tts:"bauen", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"Keller", tts:"Keller", pfad:[{r:3,c:4}]}, // Minus
  {wort:"wohn", tts:"wohn", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"Garten", tts:"Garten", pfad:[{r:4,c:1}]}, // Blume
  {wort:"Adresse", tts:"Adresse", pfad:[{r:4,c:7}]}, // Buch
  {wort:"Kinderzimmer", tts:"Kinderzimmer", pfad:[{r:4,c:3}]}, // Lego
  {wort:"gewohnt", tts:"gewohnt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Küche", tts:"Küche", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"Garage", tts:"Garage", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"wohnen", tts:"wohnen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Zuhause", tts:"Zuhause", pfad:[{r:6,c:2}]}, // Baby
  {wort:"Wohnzimmer", tts:"Wohnzimmer", pfad:[{r:6,c:4}]}, // TV
  {wort:"Schlafzimmer", tts:"Schlafzimmer", pfad:[{r:6,c:3}]}, // Bett
  {wort:"Zimmer", tts:"Zimmer", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"Wohnung", tts:"Wohnung", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"Badezimmer", tts:"Badezimmer", pfad:[{r:5,c:8}]}, // Bad
  {wort:"wohnt", tts:"wohnt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"wohne", tts:"wohne", pfad:[{r:2,c:1}]}, // ich
  {wort:"wohnst", tts:"wohnst", pfad:[{r:2,c:2}]}, // du
  {wort:"wohnt", tts:"wohnt", pfad:[{r:2,c:3}]}, // er
  {wort:"wohnt", tts:"wohnt", pfad:[{r:2,c:4}]}, // sie
  {wort:"wohnt", tts:"wohnt", pfad:[{r:2,c:5}]}, // es
  {wort:"kaputtf", tts:"kaputtf", pfad:[{r:3,c:3},{r:1,c:2}]}, // Hammer-Hammer
  {wort:"arbeite", tts:"arbeite", pfad:[{r:3,c:3},{r:1,c:5}]}, // Hammer-Zauberer
  {wort:"gearbeitet", tts:"gearbeitet", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"kaputtf", tts:"kaputtf", pfad:[{r:3,c:3},{r:3,c:10}]}, // Hammer-Lupe
  {wort:"arbeiten", tts:"arbeiten", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"Arbeit", tts:"Arbeit", pfad:[{r:3,c:3},{r:2,c:7}]}, // Hammer-Einzahl
  {wort:"arbeitet", tts:"arbeitet", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"arbeite", tts:"arbeite", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"arbeitest", tts:"arbeitest", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"arbeitet", tts:"arbeitet", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"arbeitet", tts:"arbeitet", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"arbeitet", tts:"arbeitet", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"arbeiten", tts:"arbeiten", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"faulf", tts:"faulf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"faulf", tts:"faulf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"fleißigf", tts:"fleißigf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"fleißigf", tts:"fleißigf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"mach", tts:"mach", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"schneide", tts:"schneide", pfad:[{r:3,c:8},{r:1,c:5}]}, // Schluessel-Zauberer
  {wort:"geschnitten", tts:"geschnitten", pfad:[{r:3,c:8},{r:2,c:6}]}, // Schluessel-Dino
  {wort:"schneiden", tts:"schneiden", pfad:[{r:3,c:8},{r:2,c:10}]}, // Schluessel-Sie
  {wort:"schneidet", tts:"schneidet", pfad:[{r:3,c:8},{r:2,c:9}]}, // Schluessel-ihr
  {wort:"schneide", tts:"schneide", pfad:[{r:3,c:8},{r:2,c:1}]}, // Schluessel-ich
  {wort:"schneidest", tts:"schneidest", pfad:[{r:3,c:8},{r:2,c:2}]}, // Schluessel-du
  {wort:"schneidet", tts:"schneidet", pfad:[{r:3,c:8},{r:2,c:3}]}, // Schluessel-er
  {wort:"schneidet", tts:"schneidet", pfad:[{r:3,c:8},{r:2,c:4}]}, // Schluessel-sie
  {wort:"schneidet", tts:"schneidet", pfad:[{r:3,c:8},{r:2,c:5}]}, // Schluessel-es
  {wort:"schneiden", tts:"schneiden", pfad:[{r:3,c:8},{r:2,c:8}]}, // Schluessel-wir
  {wort:"tu", tts:"tu", pfad:[{r:4,c:4},{r:1,c:5}]}, // Farbe-Zauberer
  {wort:"getan", tts:"getan", pfad:[{r:4,c:4},{r:2,c:6}]}, // Farbe-Dino
  {wort:"tun", tts:"tun", pfad:[{r:4,c:4},{r:2,c:10}]}, // Farbe-Sie
  {wort:"tut", tts:"tut", pfad:[{r:4,c:4},{r:2,c:9}]}, // Farbe-ihr
  {wort:"tue", tts:"tue", pfad:[{r:4,c:4},{r:2,c:1}]}, // Farbe-ich
  {wort:"tust", tts:"tust", pfad:[{r:4,c:4},{r:2,c:2}]}, // Farbe-du
  {wort:"tut", tts:"tut", pfad:[{r:4,c:4},{r:2,c:3}]}, // Farbe-er
  {wort:"tut", tts:"tut", pfad:[{r:4,c:4},{r:2,c:4}]}, // Farbe-sie
  {wort:"tut", tts:"tut", pfad:[{r:4,c:4},{r:2,c:5}]}, // Farbe-es
  {wort:"tun", tts:"tun", pfad:[{r:4,c:4},{r:2,c:8}]}, // Farbe-wir
  {wort:"gemacht", tts:"gemacht", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schaff", tts:"schaff", pfad:[{r:6,c:8},{r:1,c:5}]}, // wandern-Zauberer
  {wort:"geschafft", tts:"geschafft", pfad:[{r:6,c:8},{r:2,c:6}]}, // wandern-Dino
  {wort:"fertigf", tts:"fertigf", pfad:[{r:6,c:8},{r:6,c:8}]}, // wandern-wandern
  {wort:"fertigf", tts:"fertigf", pfad:[{r:6,c:8},{r:3,c:10}]}, // wandern-Lupe
  {wort:"schaffen", tts:"schaffen", pfad:[{r:6,c:8},{r:2,c:10}]}, // wandern-Sie
  {wort:"schafft", tts:"schafft", pfad:[{r:6,c:8},{r:2,c:9}]}, // wandern-ihr
  {wort:"schaffe", tts:"schaffe", pfad:[{r:6,c:8},{r:2,c:1}]}, // wandern-ich
  {wort:"schaffst", tts:"schaffst", pfad:[{r:6,c:8},{r:2,c:2}]}, // wandern-du
  {wort:"schafft", tts:"schafft", pfad:[{r:6,c:8},{r:2,c:3}]}, // wandern-er
  {wort:"schafft", tts:"schafft", pfad:[{r:6,c:8},{r:2,c:4}]}, // wandern-sie
  {wort:"schafft", tts:"schafft", pfad:[{r:6,c:8},{r:2,c:5}]}, // wandern-es
  {wort:"schaffen", tts:"schaffen", pfad:[{r:6,c:8},{r:2,c:8}]}, // wandern-wir
  {wort:"hartf", tts:"hartf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"machen", tts:"machen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"heb", tts:"heb", pfad:[{r:6,c:2},{r:1,c:5}]}, // Baby-Zauberer
  {wort:"gehoben", tts:"gehoben", pfad:[{r:6,c:2},{r:2,c:6}]}, // Baby-Dino
  {wort:"heben", tts:"heben", pfad:[{r:6,c:2},{r:2,c:10}]}, // Baby-Sie
  {wort:"hebt", tts:"hebt", pfad:[{r:6,c:2},{r:2,c:9}]}, // Baby-ihr
  {wort:"hebe", tts:"hebe", pfad:[{r:6,c:2},{r:2,c:1}]}, // Baby-ich
  {wort:"hebst", tts:"hebst", pfad:[{r:6,c:2},{r:2,c:2}]}, // Baby-du
  {wort:"hebt", tts:"hebt", pfad:[{r:6,c:2},{r:2,c:3}]}, // Baby-er
  {wort:"hebt", tts:"hebt", pfad:[{r:6,c:2},{r:2,c:4}]}, // Baby-sie
  {wort:"hebt", tts:"hebt", pfad:[{r:6,c:2},{r:2,c:5}]}, // Baby-es
  {wort:"heben", tts:"heben", pfad:[{r:6,c:2},{r:2,c:8}]}, // Baby-wir
  {wort:"Werkzeug", tts:"Werkzeug", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"macht", tts:"macht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"mache", tts:"mache", pfad:[{r:2,c:1}]}, // ich
  {wort:"machst", tts:"machst", pfad:[{r:2,c:2}]}, // du
  {wort:"macht", tts:"macht", pfad:[{r:2,c:3}]}, // er
  {wort:"macht", tts:"macht", pfad:[{r:2,c:4}]}, // sie
  {wort:"macht", tts:"macht", pfad:[{r:2,c:5}]}, // es
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:1,c:5}]}, // Hammer-Zauberer
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"verletzen", tts:"verletzen", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"verletze", tts:"verletze", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"verletzt", tts:"verletzt", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"verletzen", tts:"verletzen", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"krankf", tts:"krankf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"krankf", tts:"krankf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"gesundf", tts:"gesundf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"gesundf", tts:"gesundf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"behindertf", tts:"behindertf", pfad:[{r:3,c:9},{r:1,c:8}]}, // Talker-Talker
  {wort:"behindertf", tts:"behindertf", pfad:[{r:3,c:9},{r:3,c:10}]}, // Talker-Lupe
  {wort:"Therapie", tts:"Therapie", pfad:[{r:3,c:9},{r:2,c:7}]}, // Talker-Einzahl
  {wort:"hilf", tts:"hilf", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"geholfen", tts:"geholfen", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"helfen", tts:"helfen", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"Hilfe", tts:"Hilfe", pfad:[{r:4,c:6},{r:2,c:7}]}, // Herz-Einzahl
  {wort:"helft", tts:"helft", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"helfe", tts:"helfe", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"hilfst", tts:"hilfst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"hilft", tts:"hilft", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"hilft", tts:"hilft", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"hilft", tts:"hilft", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"helfen", tts:"helfen", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gelassen", tts:"gelassen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Fieber", tts:"Fieber", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"schlechtf", tts:"schlechtf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"lassen", tts:"lassen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Erkältung", tts:"Erkältung", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"Schmerzen", tts:"Schmerzen", pfad:[{r:6,c:7}]}, // Idee
  {wort:"Medizin", tts:"Medizin", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"Durchfall", tts:"Durchfall", pfad:[{r:5,c:8}]}, // Bad
  {wort:"lasst", tts:"lasst", pfad:[{r:2,c:9}]}, // ihr
  {wort:"lasse", tts:"lasse", pfad:[{r:2,c:1}]}, // ich
  {wort:"lässt", tts:"lässt", pfad:[{r:2,c:2}]}, // du
  {wort:"lässt", tts:"lässt", pfad:[{r:2,c:3}]}, // er
  {wort:"lässt", tts:"lässt", pfad:[{r:2,c:4}]}, // sie
  {wort:"lässt", tts:"lässt", pfad:[{r:2,c:5}]}, // es
  {wort:"besserf", tts:"besserf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"gepasst", tts:"gepasst", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"besserf", tts:"besserf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"passen", tts:"passen", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"passt", tts:"passt", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"passe", tts:"passe", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"passt", tts:"passt", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"passt", tts:"passt", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"passt", tts:"passt", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"passt", tts:"passt", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"passen", tts:"passen", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"angezogen", tts:"angezogen", pfad:[{r:4,c:5},{r:2,c:6}]}, // Schule-Dino
  {wort:"anziehen", tts:"anziehen", pfad:[{r:4,c:5},{r:2,c:8}]}, // Schule-wir
  {wort:"gebraucht", tts:"gebraucht", pfad:[{r:2,c:6}]}, // Dino
  {wort:"weitf", tts:"weitf", pfad:[{r:5,c:4},{r:5,c:4}]}, // Elefant-Elefant
  {wort:"weitf", tts:"weitf", pfad:[{r:5,c:4},{r:3,c:10}]}, // Elefant-Lupe
  {wort:"bestf", tts:"bestf", pfad:[{r:5,c:6},{r:5,c:6}]}, // Geld-Geld
  {wort:"bestf", tts:"bestf", pfad:[{r:5,c:6},{r:3,c:10}]}, // Geld-Lupe
  {wort:"Schmuck", tts:"Schmuck", pfad:[{r:5,c:6},{r:2,c:7}]}, // Geld-Einzahl
  {wort:"gutf", tts:"gutf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"brauchen", tts:"brauchen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"engf", tts:"engf", pfad:[{r:6,c:5},{r:3,c:10}]}, // Freibad-Lupe
  {wort:"engf", tts:"engf", pfad:[{r:6,c:5},{r:6,c:5}]}, // Freibad-Freibad
  {wort:"Wäsche", tts:"Wäsche", pfad:[{r:6,c:5},{r:2,c:7}]}, // Freibad-Einzahl
  {wort:"getragen", tts:"getragen", pfad:[{r:6,c:2},{r:2,c:6}]}, // Baby-Dino
  {wort:"bequemf", tts:"bequemf", pfad:[{r:6,c:2},{r:3,c:10}]}, // Baby-Lupe
  {wort:"tragen", tts:"tragen", pfad:[{r:6,c:2},{r:2,c:10}]}, // Baby-Sie
  {wort:"bequemf", tts:"bequemf", pfad:[{r:6,c:2},{r:6,c:2}]}, // Baby-Baby
  {wort:"tragt", tts:"tragt", pfad:[{r:6,c:2},{r:2,c:9}]}, // Baby-ihr
  {wort:"trage", tts:"trage", pfad:[{r:6,c:2},{r:2,c:1}]}, // Baby-ich
  {wort:"trägst", tts:"trägst", pfad:[{r:6,c:2},{r:2,c:2}]}, // Baby-du
  {wort:"trägt", tts:"trägt", pfad:[{r:6,c:2},{r:2,c:3}]}, // Baby-er
  {wort:"trägt", tts:"trägt", pfad:[{r:6,c:2},{r:2,c:4}]}, // Baby-sie
  {wort:"trägt", tts:"trägt", pfad:[{r:6,c:2},{r:2,c:5}]}, // Baby-es
  {wort:"tragen", tts:"tragen", pfad:[{r:6,c:2},{r:2,c:8}]}, // Baby-wir
  {wort:"unbequemf", tts:"unbequemf", pfad:[{r:6,c:6},{r:3,c:10}]}, // Dieb-Lupe
  {wort:"unbequemf", tts:"unbequemf", pfad:[{r:6,c:6},{r:6,c:6}]}, // Dieb-Dieb
  {wort:"Kleidung", tts:"Kleidung", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"braucht", tts:"braucht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"brauche", tts:"brauche", pfad:[{r:2,c:1}]}, // ich
  {wort:"brauchst", tts:"brauchst", pfad:[{r:2,c:2}]}, // du
  {wort:"braucht", tts:"braucht", pfad:[{r:2,c:3}]}, // er
  {wort:"braucht", tts:"braucht", pfad:[{r:2,c:4}]}, // sie
  {wort:"braucht", tts:"braucht", pfad:[{r:2,c:5}]}, // es
  {wort:"gesollt", tts:"gesollt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"sollen", tts:"sollen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"sollt", tts:"sollt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"soll", tts:"soll", pfad:[{r:2,c:1}]}, // ich
  {wort:"sollst", tts:"sollst", pfad:[{r:2,c:2}]}, // du
  {wort:"soll", tts:"soll", pfad:[{r:2,c:3}]}, // er
  {wort:"soll", tts:"soll", pfad:[{r:2,c:4}]}, // sie
  {wort:"soll", tts:"soll", pfad:[{r:2,c:5}]}, // es
  {wort:"bleib", tts:"bleib", pfad:[{r:3,c:2},{r:1,c:5}]}, // Haus-Zauberer
  {wort:"geblieben", tts:"geblieben", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"bleiben", tts:"bleiben", pfad:[{r:3,c:2},{r:2,c:10}]}, // Haus-Sie
  {wort:"bleibt", tts:"bleibt", pfad:[{r:3,c:2},{r:2,c:9}]}, // Haus-ihr
  {wort:"bleibe", tts:"bleibe", pfad:[{r:3,c:2},{r:2,c:1}]}, // Haus-ich
  {wort:"bleibst", tts:"bleibst", pfad:[{r:3,c:2},{r:2,c:2}]}, // Haus-du
  {wort:"bleibt", tts:"bleibt", pfad:[{r:3,c:2},{r:2,c:3}]}, // Haus-er
  {wort:"bleibt", tts:"bleibt", pfad:[{r:3,c:2},{r:2,c:4}]}, // Haus-sie
  {wort:"bleibt", tts:"bleibt", pfad:[{r:3,c:2},{r:2,c:5}]}, // Haus-es
  {wort:"bleiben", tts:"bleiben", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"werd", tts:"werd", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"Nachmittag", tts:"Nachmittag", pfad:[{r:3,c:6},{r:1,c:9}]}, // Turm-Ball
  {wort:"Vormittag", tts:"Vormittag", pfad:[{r:3,c:6},{r:4,c:5}]}, // Turm-Schule
  {wort:"worden", tts:"worden", pfad:[{r:3,c:6},{r:2,c:6}]}, // Turm-Dino
  {wort:"Mittag", tts:"Mittag", pfad:[{r:3,c:6},{r:5,c:1}]}, // Turm-Apfel
  {wort:"Wochenende", tts:"Wochenende", pfad:[{r:3,c:6},{r:5,c:4}]}, // Turm-Elefant
  {wort:"Tag", tts:"Tag", pfad:[{r:3,c:6},{r:5,c:5}]}, // Turm-Sonne
  {wort:"würden", tts:"würden", pfad:[{r:3,c:6},{r:2,c:10}]}, // Turm-Sie
  {wort:"Abend", tts:"Abend", pfad:[{r:3,c:6},{r:6,c:4}]}, // Turm-TV
  {wort:"Nacht", tts:"Nacht", pfad:[{r:3,c:6},{r:6,c:3}]}, // Turm-Bett
  {wort:"würdet", tts:"würdet", pfad:[{r:3,c:6},{r:2,c:9}]}, // Turm-ihr
  {wort:"würde", tts:"würde", pfad:[{r:3,c:6},{r:2,c:1}]}, // Turm-ich
  {wort:"würdest", tts:"würdest", pfad:[{r:3,c:6},{r:2,c:2}]}, // Turm-du
  {wort:"würde", tts:"würde", pfad:[{r:3,c:6},{r:2,c:3}]}, // Turm-er
  {wort:"würde", tts:"würde", pfad:[{r:3,c:6},{r:2,c:4}]}, // Turm-sie
  {wort:"würde", tts:"würde", pfad:[{r:3,c:6},{r:2,c:5}]}, // Turm-es
  {wort:"würden", tts:"würden", pfad:[{r:3,c:6},{r:2,c:8}]}, // Turm-wir
  {wort:"Frühling", tts:"Frühling", pfad:[{r:4,c:1},{r:4,c:1}]}, // Blume-Blume
  {wort:"Herbst", tts:"Herbst", pfad:[{r:4,c:1},{r:5,c:1}]}, // Blume-Apfel
  {wort:"Winter", tts:"Winter", pfad:[{r:4,c:1},{r:5,c:3}]}, // Blume-Taxi
  {wort:"Sommer", tts:"Sommer", pfad:[{r:4,c:1},{r:5,c:5}]}, // Blume-Sonne
  {wort:"feier", tts:"feier", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"gefeiert", tts:"gefeiert", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"feiern", tts:"feiern", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"Feier", tts:"Feier", pfad:[{r:4,c:6},{r:2,c:7}]}, // Herz-Einzahl
  {wort:"feiert", tts:"feiert", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"feiere", tts:"feiere", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"feierst", tts:"feierst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"feiert", tts:"feiert", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"feiert", tts:"feiert", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"feiert", tts:"feiert", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"feiern", tts:"feiern", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"geworden", tts:"geworden", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Stunde", tts:"Stunde", pfad:[{r:5,c:7},{r:1,c:2}]}, // Wuerfel-Hammer
  {wort:"Minute", tts:"Minute", pfad:[{r:5,c:7},{r:3,c:7}]}, // Wuerfel-Ampel
  {wort:"Woche", tts:"Woche", pfad:[{r:5,c:7},{r:4,c:5}]}, // Wuerfel-Schule
  {wort:"Tag", tts:"Tag", pfad:[{r:5,c:7},{r:5,c:5}]}, // Wuerfel-Sonne
  {wort:"Monat", tts:"Monat", pfad:[{r:5,c:7},{r:6,c:2}]}, // Wuerfel-Baby
  {wort:"Jahr", tts:"Jahr", pfad:[{r:5,c:7},{r:6,c:6}]}, // Wuerfel-Dieb
  {wort:"werden", tts:"werden", pfad:[{r:2,c:10}]}, // Sie
  {wort:"warte", tts:"warte", pfad:[{r:6,c:6},{r:1,c:5}]}, // Dieb-Zauberer
  {wort:"gewartet", tts:"gewartet", pfad:[{r:6,c:6},{r:2,c:6}]}, // Dieb-Dino
  {wort:"warten", tts:"warten", pfad:[{r:6,c:6},{r:2,c:10}]}, // Dieb-Sie
  {wort:"wartet", tts:"wartet", pfad:[{r:6,c:6},{r:2,c:9}]}, // Dieb-ihr
  {wort:"warte", tts:"warte", pfad:[{r:6,c:6},{r:2,c:1}]}, // Dieb-ich
  {wort:"wartest", tts:"wartest", pfad:[{r:6,c:6},{r:2,c:2}]}, // Dieb-du
  {wort:"wartet", tts:"wartet", pfad:[{r:6,c:6},{r:2,c:3}]}, // Dieb-er
  {wort:"wartet", tts:"wartet", pfad:[{r:6,c:6},{r:2,c:4}]}, // Dieb-sie
  {wort:"wartet", tts:"wartet", pfad:[{r:6,c:6},{r:2,c:5}]}, // Dieb-es
  {wort:"warten", tts:"warten", pfad:[{r:6,c:6},{r:2,c:8}]}, // Dieb-wir
  {wort:"Zeit", tts:"Zeit", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"werdet", tts:"werdet", pfad:[{r:2,c:9}]}, // ihr
  {wort:"werde", tts:"werde", pfad:[{r:2,c:1}]}, // ich
  {wort:"wirst", tts:"wirst", pfad:[{r:2,c:2}]}, // du
  {wort:"wird", tts:"wird", pfad:[{r:2,c:3}]}, // er
  {wort:"wird", tts:"wird", pfad:[{r:2,c:4}]}, // sie
  {wort:"wird", tts:"wird", pfad:[{r:2,c:5}]}, // es
  {wort:"genommen", tts:"genommen", pfad:[{r:3,c:8},{r:2,c:6}]}, // Schluessel-Dino
  {wort:"nehmen", tts:"nehmen", pfad:[{r:3,c:8},{r:2,c:10}]}, // Schluessel-Sie
  {wort:"nehmt", tts:"nehmt", pfad:[{r:3,c:8},{r:2,c:9}]}, // Schluessel-ihr
  {wort:"nehme", tts:"nehme", pfad:[{r:3,c:8},{r:2,c:1}]}, // Schluessel-ich
  {wort:"nimmst", tts:"nimmst", pfad:[{r:3,c:8},{r:2,c:2}]}, // Schluessel-du
  {wort:"nimmt", tts:"nimmt", pfad:[{r:3,c:8},{r:2,c:3}]}, // Schluessel-er
  {wort:"nimmt", tts:"nimmt", pfad:[{r:3,c:8},{r:2,c:4}]}, // Schluessel-sie
  {wort:"nimmt", tts:"nimmt", pfad:[{r:3,c:8},{r:2,c:5}]}, // Schluessel-es
  {wort:"nehmen", tts:"nehmen", pfad:[{r:3,c:8},{r:2,c:8}]}, // Schluessel-wir
  {wort:"gewollt", tts:"gewollt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"wollen", tts:"wollen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Haushalt", tts:"Haushalt", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"wollt", tts:"wollt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"will", tts:"will", pfad:[{r:2,c:1}]}, // ich
  {wort:"willst", tts:"willst", pfad:[{r:2,c:2}]}, // du
  {wort:"will", tts:"will", pfad:[{r:2,c:3}]}, // er
  {wort:"will", tts:"will", pfad:[{r:2,c:4}]}, // sie
  {wort:"will", tts:"will", pfad:[{r:2,c:5}]}, // es
  {wort:"dooff", tts:"dooff", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"dooff", tts:"dooff", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"tollf", tts:"tollf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"tollf", tts:"tollf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"sag", tts:"sag", pfad:[{r:3,c:9},{r:1,c:5}]}, // Talker-Zauberer
  {wort:"gesagt", tts:"gesagt", pfad:[{r:3,c:9},{r:2,c:6}]}, // Talker-Dino
  {wort:"sagen", tts:"sagen", pfad:[{r:3,c:9},{r:2,c:10}]}, // Talker-Sie
  {wort:"sagt", tts:"sagt", pfad:[{r:3,c:9},{r:2,c:9}]}, // Talker-ihr
  {wort:"sage", tts:"sage", pfad:[{r:3,c:9},{r:2,c:1}]}, // Talker-ich
  {wort:"sagst", tts:"sagst", pfad:[{r:3,c:9},{r:2,c:2}]}, // Talker-du
  {wort:"sagt", tts:"sagt", pfad:[{r:3,c:9},{r:2,c:3}]}, // Talker-er
  {wort:"sagt", tts:"sagt", pfad:[{r:3,c:9},{r:2,c:4}]}, // Talker-sie
  {wort:"sagt", tts:"sagt", pfad:[{r:3,c:9},{r:2,c:5}]}, // Talker-es
  {wort:"sagen", tts:"sagen", pfad:[{r:3,c:9},{r:2,c:8}]}, // Talker-wir
  {wort:"Wort", tts:"Wort", pfad:[{r:4,c:2},{r:4,c:5}]}, // Leute-Schule
  {wort:"gesprochen", tts:"gesprochen", pfad:[{r:4,c:2},{r:2,c:6}]}, // Leute-Dino
  {wort:"sprechen", tts:"sprechen", pfad:[{r:4,c:2},{r:2,c:10}]}, // Leute-Sie
  {wort:"Sprache", tts:"Sprache", pfad:[{r:4,c:2},{r:2,c:7}]}, // Leute-Einzahl
  {wort:"sprecht", tts:"sprecht", pfad:[{r:4,c:2},{r:2,c:9}]}, // Leute-ihr
  {wort:"spreche", tts:"spreche", pfad:[{r:4,c:2},{r:2,c:1}]}, // Leute-ich
  {wort:"sprichst", tts:"sprichst", pfad:[{r:4,c:2},{r:2,c:2}]}, // Leute-du
  {wort:"spricht", tts:"spricht", pfad:[{r:4,c:2},{r:2,c:3}]}, // Leute-er
  {wort:"spricht", tts:"spricht", pfad:[{r:4,c:2},{r:2,c:4}]}, // Leute-sie
  {wort:"spricht", tts:"spricht", pfad:[{r:4,c:2},{r:2,c:5}]}, // Leute-es
  {wort:"sprechen", tts:"sprechen", pfad:[{r:4,c:2},{r:2,c:8}]}, // Leute-wir
  {wort:"rede", tts:"rede", pfad:[{r:4,c:4},{r:1,c:5}]}, // Farbe-Zauberer
  {wort:"geredet", tts:"geredet", pfad:[{r:4,c:4},{r:2,c:6}]}, // Farbe-Dino
  {wort:"reden", tts:"reden", pfad:[{r:4,c:4},{r:2,c:10}]}, // Farbe-Sie
  {wort:"redet", tts:"redet", pfad:[{r:4,c:4},{r:2,c:9}]}, // Farbe-ihr
  {wort:"rede", tts:"rede", pfad:[{r:4,c:4},{r:2,c:1}]}, // Farbe-ich
  {wort:"redest", tts:"redest", pfad:[{r:4,c:4},{r:2,c:2}]}, // Farbe-du
  {wort:"redet", tts:"redet", pfad:[{r:4,c:4},{r:2,c:3}]}, // Farbe-er
  {wort:"redet", tts:"redet", pfad:[{r:4,c:4},{r:2,c:4}]}, // Farbe-sie
  {wort:"redet", tts:"redet", pfad:[{r:4,c:4},{r:2,c:5}]}, // Farbe-es
  {wort:"reden", tts:"reden", pfad:[{r:4,c:4},{r:2,c:8}]}, // Farbe-wir
  {wort:"sing", tts:"sing", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"gesungen", tts:"gesungen", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"singen", tts:"singen", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"Lied", tts:"Lied", pfad:[{r:4,c:6},{r:2,c:7}]}, // Herz-Einzahl
  {wort:"singt", tts:"singt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"singe", tts:"singe", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"singst", tts:"singst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"singt", tts:"singt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"singt", tts:"singt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"singt", tts:"singt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"singen", tts:"singen", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"erzähl", tts:"erzähl", pfad:[{r:4,c:7},{r:1,c:5}]}, // Buch-Zauberer
  {wort:"erzählt", tts:"erzählt", pfad:[{r:4,c:7},{r:2,c:6}]}, // Buch-Dino
  {wort:"erzählen", tts:"erzählen", pfad:[{r:4,c:7},{r:2,c:10}]}, // Buch-Sie
  {wort:"Geschichte", tts:"Geschichte", pfad:[{r:4,c:7},{r:2,c:7}]}, // Buch-Einzahl
  {wort:"erzählt", tts:"erzählt", pfad:[{r:4,c:7},{r:2,c:9}]}, // Buch-ihr
  {wort:"erzähle", tts:"erzähle", pfad:[{r:4,c:7},{r:2,c:1}]}, // Buch-ich
  {wort:"erzählst", tts:"erzählst", pfad:[{r:4,c:7},{r:2,c:2}]}, // Buch-du
  {wort:"erzählt", tts:"erzählt", pfad:[{r:4,c:7},{r:2,c:3}]}, // Buch-er
  {wort:"erzählt", tts:"erzählt", pfad:[{r:4,c:7},{r:2,c:4}]}, // Buch-sie
  {wort:"erzählt", tts:"erzählt", pfad:[{r:4,c:7},{r:2,c:5}]}, // Buch-es
  {wort:"erzählen", tts:"erzählen", pfad:[{r:4,c:7},{r:2,c:8}]}, // Buch-wir
  {wort:"witzigeme", tts:"witzigeme", pfad:[{r:4,c:3},{r:1,c:10}]}, // Lego-dem
  {wort:"witzigec", tts:"witzigec", pfad:[{r:4,c:3},{r:5,c:9}]}, // Lego-die
  {wort:"witzigf", tts:"witzigf", pfad:[{r:4,c:3},{r:4,c:3}]}, // Lego-Lego
  {wort:"witzigf", tts:"witzigf", pfad:[{r:4,c:3},{r:3,c:10}]}, // Lego-Lupe
  {wort:"Witz", tts:"Witz", pfad:[{r:4,c:3},{r:2,c:7}]}, // Lego-Einzahl
  {wort:"witzigene", tts:"witzigene", pfad:[{r:4,c:3},{r:6,c:10}]}, // Lego-den
  {wort:"witzigese", tts:"witzigese", pfad:[{r:4,c:3},{r:4,c:10}]}, // Lego-des
  {wort:"witzigere", tts:"witzigere", pfad:[{r:4,c:3},{r:4,c:9}]}, // Lego-der
  {wort:"gehört", tts:"gehört", pfad:[{r:2,c:6}]}, // Dino
  {wort:"gerufen", tts:"gerufen", pfad:[{r:5,c:3},{r:2,c:6}]}, // Taxi-Dino
  {wort:"rufen", tts:"rufen", pfad:[{r:5,c:3},{r:2,c:10}]}, // Taxi-Sie
  {wort:"ruft", tts:"ruft", pfad:[{r:5,c:3},{r:2,c:9}]}, // Taxi-ihr
  {wort:"rufe", tts:"rufe", pfad:[{r:5,c:3},{r:2,c:1}]}, // Taxi-ich
  {wort:"rufst", tts:"rufst", pfad:[{r:5,c:3},{r:2,c:2}]}, // Taxi-du
  {wort:"ruft", tts:"ruft", pfad:[{r:5,c:3},{r:2,c:3}]}, // Taxi-er
  {wort:"ruft", tts:"ruft", pfad:[{r:5,c:3},{r:2,c:4}]}, // Taxi-sie
  {wort:"ruft", tts:"ruft", pfad:[{r:5,c:3},{r:2,c:5}]}, // Taxi-es
  {wort:"rufen", tts:"rufen", pfad:[{r:5,c:3},{r:2,c:8}]}, // Taxi-wir
  {wort:"coolf", tts:"coolf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"hören", tts:"hören", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Kommunikation", tts:"Kommunikation", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"hört", tts:"hört", pfad:[{r:2,c:9}]}, // ihr
  {wort:"höre", tts:"höre", pfad:[{r:2,c:1}]}, // ich
  {wort:"hörst", tts:"hörst", pfad:[{r:2,c:2}]}, // du
  {wort:"hört", tts:"hört", pfad:[{r:2,c:3}]}, // er
  {wort:"hört", tts:"hört", pfad:[{r:2,c:4}]}, // sie
  {wort:"hört", tts:"hört", pfad:[{r:2,c:5}]}, // es
  {wort:"tritt", tts:"tritt", pfad:[{r:4,c:8},{r:1,c:5}]}, // Ball-Zauberer
  {wort:"Tor", tts:"Tor", pfad:[{r:4,c:8},{r:1,c:9}]}, // Ball-Ball
  {wort:"getreten", tts:"getreten", pfad:[{r:4,c:8},{r:2,c:6}]}, // Ball-Dino
  {wort:"treten", tts:"treten", pfad:[{r:4,c:8},{r:2,c:10}]}, // Ball-Sie
  {wort:"tretet", tts:"tretet", pfad:[{r:4,c:8},{r:2,c:9}]}, // Ball-ihr
  {wort:"trete", tts:"trete", pfad:[{r:4,c:8},{r:2,c:1}]}, // Ball-ich
  {wort:"trittst", tts:"trittst", pfad:[{r:4,c:8},{r:2,c:2}]}, // Ball-du
  {wort:"tritt", tts:"tritt", pfad:[{r:4,c:8},{r:2,c:3}]}, // Ball-er
  {wort:"tritt", tts:"tritt", pfad:[{r:4,c:8},{r:2,c:4}]}, // Ball-sie
  {wort:"tritt", tts:"tritt", pfad:[{r:4,c:8},{r:2,c:5}]}, // Ball-es
  {wort:"treten", tts:"treten", pfad:[{r:4,c:8},{r:2,c:8}]}, // Ball-wir
  {wort:"turn", tts:"turn", pfad:[{r:4,c:2},{r:1,c:5}]}, // Leute-Zauberer
  {wort:"geturnt", tts:"geturnt", pfad:[{r:4,c:2},{r:2,c:6}]}, // Leute-Dino
  {wort:"turnen", tts:"turnen", pfad:[{r:4,c:2},{r:2,c:10}]}, // Leute-Sie
  {wort:"turnt", tts:"turnt", pfad:[{r:4,c:2},{r:2,c:9}]}, // Leute-ihr
  {wort:"turne", tts:"turne", pfad:[{r:4,c:2},{r:2,c:1}]}, // Leute-ich
  {wort:"turnst", tts:"turnst", pfad:[{r:4,c:2},{r:2,c:2}]}, // Leute-du
  {wort:"turnt", tts:"turnt", pfad:[{r:4,c:2},{r:2,c:3}]}, // Leute-er
  {wort:"turnt", tts:"turnt", pfad:[{r:4,c:2},{r:2,c:4}]}, // Leute-sie
  {wort:"turnt", tts:"turnt", pfad:[{r:4,c:2},{r:2,c:5}]}, // Leute-es
  {wort:"turnen", tts:"turnen", pfad:[{r:4,c:2},{r:2,c:8}]}, // Leute-wir
  {wort:"gegeben", tts:"gegeben", pfad:[{r:2,c:6}]}, // Dino
  {wort:"reit", tts:"reit", pfad:[{r:5,c:4},{r:1,c:5}]}, // Elefant-Zauberer
  {wort:"geritten", tts:"geritten", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"reiten", tts:"reiten", pfad:[{r:5,c:4},{r:2,c:10}]}, // Elefant-Sie
  {wort:"reitet", tts:"reitet", pfad:[{r:5,c:4},{r:2,c:9}]}, // Elefant-ihr
  {wort:"reite", tts:"reite", pfad:[{r:5,c:4},{r:2,c:1}]}, // Elefant-ich
  {wort:"reitest", tts:"reitest", pfad:[{r:5,c:4},{r:2,c:2}]}, // Elefant-du
  {wort:"reitet", tts:"reitet", pfad:[{r:5,c:4},{r:2,c:3}]}, // Elefant-er
  {wort:"reitet", tts:"reitet", pfad:[{r:5,c:4},{r:2,c:4}]}, // Elefant-sie
  {wort:"reitet", tts:"reitet", pfad:[{r:5,c:4},{r:2,c:5}]}, // Elefant-es
  {wort:"reiten", tts:"reiten", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"geworfen", tts:"geworfen", pfad:[{r:5,c:7},{r:2,c:6}]}, // Wuerfel-Dino
  {wort:"werfen", tts:"werfen", pfad:[{r:5,c:7},{r:2,c:10}]}, // Wuerfel-Sie
  {wort:"werft", tts:"werft", pfad:[{r:5,c:7},{r:2,c:9}]}, // Wuerfel-ihr
  {wort:"werfe", tts:"werfe", pfad:[{r:5,c:7},{r:2,c:1}]}, // Wuerfel-ich
  {wort:"wirfst", tts:"wirfst", pfad:[{r:5,c:7},{r:2,c:2}]}, // Wuerfel-du
  {wort:"wirft", tts:"wirft", pfad:[{r:5,c:7},{r:2,c:3}]}, // Wuerfel-er
  {wort:"wirft", tts:"wirft", pfad:[{r:5,c:7},{r:2,c:4}]}, // Wuerfel-sie
  {wort:"wirft", tts:"wirft", pfad:[{r:5,c:7},{r:2,c:5}]}, // Wuerfel-es
  {wort:"werfen", tts:"werfen", pfad:[{r:5,c:7},{r:2,c:8}]}, // Wuerfel-wir
  {wort:"geben", tts:"geben", pfad:[{r:2,c:10}]}, // Sie
  {wort:"geschwommen", tts:"geschwommen", pfad:[{r:6,c:5},{r:2,c:6}]}, // Freibad-Dino
  {wort:"schwimmen", tts:"schwimmen", pfad:[{r:6,c:5},{r:2,c:10}]}, // Freibad-Sie
  {wort:"schwimmt", tts:"schwimmt", pfad:[{r:6,c:5},{r:2,c:9}]}, // Freibad-ihr
  {wort:"schwimme", tts:"schwimme", pfad:[{r:6,c:5},{r:2,c:1}]}, // Freibad-ich
  {wort:"schwimmst", tts:"schwimmst", pfad:[{r:6,c:5},{r:2,c:2}]}, // Freibad-du
  {wort:"schwimmt", tts:"schwimmt", pfad:[{r:6,c:5},{r:2,c:3}]}, // Freibad-er
  {wort:"schwimmt", tts:"schwimmt", pfad:[{r:6,c:5},{r:2,c:4}]}, // Freibad-sie
  {wort:"schwimmt", tts:"schwimmt", pfad:[{r:6,c:5},{r:2,c:5}]}, // Freibad-es
  {wort:"schwimmen", tts:"schwimmen", pfad:[{r:6,c:5},{r:2,c:8}]}, // Freibad-wir
  {wort:"Sport", tts:"Sport", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"gebt", tts:"gebt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"gebe", tts:"gebe", pfad:[{r:2,c:1}]}, // ich
  {wort:"gibst", tts:"gibst", pfad:[{r:2,c:2}]}, // du
  {wort:"gibt", tts:"gibt", pfad:[{r:2,c:3}]}, // er
  {wort:"gibt", tts:"gibt", pfad:[{r:2,c:4}]}, // sie
  {wort:"gibt", tts:"gibt", pfad:[{r:2,c:5}]}, // es
  {wort:"hässlichf", tts:"hässlichf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"hässlichf", tts:"hässlichf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"hübschf", tts:"hübschf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"hübschf", tts:"hübschf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"schenk", tts:"schenk", pfad:[{r:4,c:1},{r:1,c:5}]}, // Blume-Zauberer
  {wort:"geschenkt", tts:"geschenkt", pfad:[{r:4,c:1},{r:2,c:6}]}, // Blume-Dino
  {wort:"schenken", tts:"schenken", pfad:[{r:4,c:1},{r:2,c:10}]}, // Blume-Sie
  {wort:"Geschenk", tts:"Geschenk", pfad:[{r:4,c:1},{r:2,c:7}]}, // Blume-Einzahl
  {wort:"schenkt", tts:"schenkt", pfad:[{r:4,c:1},{r:2,c:9}]}, // Blume-ihr
  {wort:"schenke", tts:"schenke", pfad:[{r:4,c:1},{r:2,c:1}]}, // Blume-ich
  {wort:"schenkst", tts:"schenkst", pfad:[{r:4,c:1},{r:2,c:2}]}, // Blume-du
  {wort:"schenkt", tts:"schenkt", pfad:[{r:4,c:1},{r:2,c:3}]}, // Blume-er
  {wort:"schenkt", tts:"schenkt", pfad:[{r:4,c:1},{r:2,c:4}]}, // Blume-sie
  {wort:"schenkt", tts:"schenkt", pfad:[{r:4,c:1},{r:2,c:5}]}, // Blume-es
  {wort:"schenken", tts:"schenken", pfad:[{r:4,c:1},{r:2,c:8}]}, // Blume-wir
  {wort:"gerochen", tts:"gerochen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schönf", tts:"schönf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"riechen", tts:"riechen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Natur", tts:"Natur", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"riecht", tts:"riecht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"rieche", tts:"rieche", pfad:[{r:2,c:1}]}, // ich
  {wort:"riechst", tts:"riechst", pfad:[{r:2,c:2}]}, // du
  {wort:"riecht", tts:"riecht", pfad:[{r:2,c:3}]}, // er
  {wort:"riecht", tts:"riecht", pfad:[{r:2,c:4}]}, // sie
  {wort:"riecht", tts:"riecht", pfad:[{r:2,c:5}]}, // es
  {wort:"besuch", tts:"besuch", pfad:[{r:3,c:2},{r:1,c:5}]}, // Haus-Zauberer
  {wort:"besucht", tts:"besucht", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"besuchen", tts:"besuchen", pfad:[{r:3,c:2},{r:2,c:10}]}, // Haus-Sie
  {wort:"Besuch", tts:"Besuch", pfad:[{r:3,c:2},{r:2,c:7}]}, // Haus-Einzahl
  {wort:"besucht", tts:"besucht", pfad:[{r:3,c:2},{r:2,c:9}]}, // Haus-ihr
  {wort:"besuche", tts:"besuche", pfad:[{r:3,c:2},{r:2,c:1}]}, // Haus-ich
  {wort:"besuchst", tts:"besuchst", pfad:[{r:3,c:2},{r:2,c:2}]}, // Haus-du
  {wort:"besucht", tts:"besucht", pfad:[{r:3,c:2},{r:2,c:3}]}, // Haus-er
  {wort:"besucht", tts:"besucht", pfad:[{r:3,c:2},{r:2,c:4}]}, // Haus-sie
  {wort:"besucht", tts:"besucht", pfad:[{r:3,c:2},{r:2,c:5}]}, // Haus-es
  {wort:"besuchen", tts:"besuchen", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"altf", tts:"altf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"altf", tts:"altf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"jungf", tts:"jungf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"jungf", tts:"jungf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"getroffen", tts:"getroffen", pfad:[{r:4,c:2},{r:2,c:6}]}, // Leute-Dino
  {wort:"treffen", tts:"treffen", pfad:[{r:4,c:2},{r:2,c:10}]}, // Leute-Sie
  {wort:"Gruppe", tts:"Gruppe", pfad:[{r:4,c:2},{r:2,c:7}]}, // Leute-Einzahl
  {wort:"trefft", tts:"trefft", pfad:[{r:4,c:2},{r:2,c:9}]}, // Leute-ihr
  {wort:"treffe", tts:"treffe", pfad:[{r:4,c:2},{r:2,c:1}]}, // Leute-ich
  {wort:"triffst", tts:"triffst", pfad:[{r:4,c:2},{r:2,c:2}]}, // Leute-du
  {wort:"trifft", tts:"trifft", pfad:[{r:4,c:2},{r:2,c:3}]}, // Leute-er
  {wort:"trifft", tts:"trifft", pfad:[{r:4,c:2},{r:2,c:4}]}, // Leute-sie
  {wort:"trifft", tts:"trifft", pfad:[{r:4,c:2},{r:2,c:5}]}, // Leute-es
  {wort:"treffen", tts:"treffen", pfad:[{r:4,c:2},{r:2,c:8}]}, // Leute-wir
  {wort:"geheißen", tts:"geheißen", pfad:[{r:4,c:5},{r:2,c:6}]}, // Schule-Dino
  {wort:"heißen", tts:"heißen", pfad:[{r:4,c:5},{r:2,c:10}]}, // Schule-Sie
  {wort:"Name", tts:"Name", pfad:[{r:4,c:5},{r:2,c:7}]}, // Schule-Einzahl
  {wort:"heißt", tts:"heißt", pfad:[{r:4,c:5},{r:2,c:9}]}, // Schule-ihr
  {wort:"heiße", tts:"heiße", pfad:[{r:4,c:5},{r:2,c:1}]}, // Schule-ich
  {wort:"heißt", tts:"heißt", pfad:[{r:4,c:5},{r:2,c:2}]}, // Schule-du
  {wort:"heißt", tts:"heißt", pfad:[{r:4,c:5},{r:2,c:3}]}, // Schule-er
  {wort:"heißt", tts:"heißt", pfad:[{r:4,c:5},{r:2,c:4}]}, // Schule-sie
  {wort:"heißt", tts:"heißt", pfad:[{r:4,c:5},{r:2,c:5}]}, // Schule-es
  {wort:"heißen", tts:"heißen", pfad:[{r:4,c:5},{r:2,c:8}]}, // Schule-wir
  {wort:"leb", tts:"leb", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"gelebt", tts:"gelebt", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"leben", tts:"leben", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"lebt", tts:"lebt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"lebe", tts:"lebe", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"lebst", tts:"lebst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"lebt", tts:"lebt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"lebt", tts:"lebt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"lebt", tts:"lebt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"leben", tts:"leben", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gekommen", tts:"gekommen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Freundin", tts:"Freundin", pfad:[{r:6,c:8}]}, // wandern
  {wort:"freundlichf", tts:"freundlichf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"kommen", tts:"kommen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Freund", tts:"Freund", pfad:[{r:6,c:7}]}, // Idee
  {wort:"Leute", tts:"Leute", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"kommt", tts:"kommt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"komme", tts:"komme", pfad:[{r:2,c:1}]}, // ich
  {wort:"kommst", tts:"kommst", pfad:[{r:2,c:2}]}, // du
  {wort:"kommt", tts:"kommt", pfad:[{r:2,c:3}]}, // er
  {wort:"kommt", tts:"kommt", pfad:[{r:2,c:4}]}, // sie
  {wort:"kommt", tts:"kommt", pfad:[{r:2,c:5}]}, // es
  {wort:"versteck", tts:"versteck", pfad:[{r:3,c:2},{r:1,c:5}]}, // Haus-Zauberer
  {wort:"versteckt", tts:"versteckt", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"verstecken", tts:"verstecken", pfad:[{r:3,c:2},{r:2,c:10}]}, // Haus-Sie
  {wort:"versteckt", tts:"versteckt", pfad:[{r:3,c:2},{r:2,c:9}]}, // Haus-ihr
  {wort:"verstecke", tts:"verstecke", pfad:[{r:3,c:2},{r:2,c:1}]}, // Haus-ich
  {wort:"versteckst", tts:"versteckst", pfad:[{r:3,c:2},{r:2,c:2}]}, // Haus-du
  {wort:"versteckt", tts:"versteckt", pfad:[{r:3,c:2},{r:2,c:3}]}, // Haus-er
  {wort:"versteckt", tts:"versteckt", pfad:[{r:3,c:2},{r:2,c:4}]}, // Haus-sie
  {wort:"versteckt", tts:"versteckt", pfad:[{r:3,c:2},{r:2,c:5}]}, // Haus-es
  {wort:"verstecken", tts:"verstecken", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"such", tts:"such", pfad:[{r:3,c:4},{r:1,c:5}]}, // Minus-Zauberer
  {wort:"gesucht", tts:"gesucht", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"suchen", tts:"suchen", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"sucht", tts:"sucht", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"suche", tts:"suche", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"suchst", tts:"suchst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"sucht", tts:"sucht", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"sucht", tts:"sucht", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"sucht", tts:"sucht", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"suchen", tts:"suchen", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"finde", tts:"finde", pfad:[{r:3,c:5},{r:1,c:5}]}, // Plus-Zauberer
  {wort:"gefunden", tts:"gefunden", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"finden", tts:"finden", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"findet", tts:"findet", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"finde", tts:"finde", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"findest", tts:"findest", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"findet", tts:"findet", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"findet", tts:"findet", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"findet", tts:"findet", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"finden", tts:"finden", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"gedurft", tts:"gedurft", pfad:[{r:2,c:6}]}, // Dino
  {wort:"dürfen", tts:"dürfen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Geschäft", tts:"Geschäft", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"dürft", tts:"dürft", pfad:[{r:2,c:9}]}, // ihr
  {wort:"darf", tts:"darf", pfad:[{r:2,c:1}]}, // ich
  {wort:"darfst", tts:"darfst", pfad:[{r:2,c:2}]}, // du
  {wort:"darf", tts:"darf", pfad:[{r:2,c:3}]}, // er
  {wort:"darf", tts:"darf", pfad:[{r:2,c:4}]}, // sie
  {wort:"darf", tts:"darf", pfad:[{r:2,c:5}]}, // es
  {wort:"gebastelt", tts:"gebastelt", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"basteln", tts:"basteln", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"bastelt", tts:"bastelt", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"bastele", tts:"bastele", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"bastelst", tts:"bastelst", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"bastelt", tts:"bastelt", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"bastelt", tts:"bastelt", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"bastelt", tts:"bastelt", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"basteln", tts:"basteln", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"nassf", tts:"nassf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"nassf", tts:"nassf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"trockenf", tts:"trockenf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"trockenf", tts:"trockenf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"mal", tts:"mal", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"rosa", tts:"rosa", pfad:[{r:3,c:8},{r:1,c:7}]}, // Schluessel-Schluessel
  {wort:"rosaf", tts:"rosaf", pfad:[{r:3,c:8},{r:3,c:10}]}, // Schluessel-Lupe
  {wort:"schwarzf", tts:"schwarzf", pfad:[{r:4,c:8},{r:1,c:9}]}, // Ball-Ball
  {wort:"schwarzf", tts:"schwarzf", pfad:[{r:4,c:8},{r:3,c:10}]}, // Ball-Lupe
  {wort:"pink", tts:"pink", pfad:[{r:4,c:5},{r:4,c:5}]}, // Schule-Schule
  {wort:"pinkf", tts:"pinkf", pfad:[{r:4,c:5},{r:3,c:10}]}, // Schule-Lupe
  {wort:"rot", tts:"rot", pfad:[{r:4,c:6},{r:4,c:6}]}, // Herz-Herz
  {wort:"rotf", tts:"rotf", pfad:[{r:4,c:6},{r:3,c:10}]}, // Herz-Lupe
  {wort:"blau", tts:"blau", pfad:[{r:4,c:3},{r:4,c:3}]}, // Lego-Lego
  {wort:"blauf", tts:"blauf", pfad:[{r:4,c:3},{r:3,c:10}]}, // Lego-Lupe
  {wort:"gemalt", tts:"gemalt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"grün", tts:"grün", pfad:[{r:5,c:1},{r:5,c:1}]}, // Apfel-Apfel
  {wort:"grünf", tts:"grünf", pfad:[{r:5,c:1},{r:3,c:10}]}, // Apfel-Lupe
  {wort:"orange", tts:"orange", pfad:[{r:5,c:2},{r:5,c:2}]}, // Saft-Saft
  {wort:"orangef", tts:"orangef", pfad:[{r:5,c:2},{r:3,c:10}]}, // Saft-Lupe
  {wort:"grau", tts:"grau", pfad:[{r:5,c:4},{r:5,c:4}]}, // Elefant-Elefant
  {wort:"grauf", tts:"grauf", pfad:[{r:5,c:4},{r:3,c:10}]}, // Elefant-Lupe
  {wort:"gelb", tts:"gelb", pfad:[{r:5,c:5},{r:5,c:5}]}, // Sonne-Sonne
  {wort:"gelbf", tts:"gelbf", pfad:[{r:5,c:5},{r:3,c:10}]}, // Sonne-Lupe
  {wort:"weiß", tts:"weiß", pfad:[{r:5,c:7},{r:5,c:7}]}, // Wuerfel-Wuerfel
  {wort:"weißf", tts:"weißf", pfad:[{r:5,c:7},{r:3,c:10}]}, // Wuerfel-Lupe
  {wort:"buntf", tts:"buntf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"malen", tts:"malen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"braunf", tts:"braunf", pfad:[{r:6,c:5},{r:3,c:10}]}, // Freibad-Lupe
  {wort:"braun", tts:"braun", pfad:[{r:6,c:5},{r:6,c:5}]}, // Freibad-Freibad
  {wort:"lilaf", tts:"lilaf", pfad:[{r:6,c:2},{r:3,c:10}]}, // Baby-Lupe
  {wort:"lila", tts:"lila", pfad:[{r:6,c:2},{r:6,c:2}]}, // Baby-Baby
  {wort:"Farbe", tts:"Farbe", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"malt", tts:"malt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"male", tts:"male", pfad:[{r:2,c:1}]}, // ich
  {wort:"malst", tts:"malst", pfad:[{r:2,c:2}]}, // du
  {wort:"malt", tts:"malt", pfad:[{r:2,c:3}]}, // er
  {wort:"malt", tts:"malt", pfad:[{r:2,c:4}]}, // sie
  {wort:"malt", tts:"malt", pfad:[{r:2,c:5}]}, // es
  {wort:"Werkraum", tts:"Werkraum", pfad:[{r:3,c:2},{r:1,c:2}]}, // Haus-Hammer
  {wort:"Sporthalle", tts:"Sporthalle", pfad:[{r:3,c:2},{r:1,c:9}]}, // Haus-Ball
  {wort:"Sekretariat", tts:"Sekretariat", pfad:[{r:3,c:2},{r:4,c:7}]}, // Haus-Buch
  {wort:"Computerraum", tts:"Computerraum", pfad:[{r:3,c:2},{r:6,c:1}]}, // Haus-Maus
  {wort:"Klasse", tts:"Klasse", pfad:[{r:3,c:2},{r:2,c:7}]}, // Haus-Einzahl
  {wort:"falschf", tts:"falschf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"falschf", tts:"falschf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"richtigf", tts:"richtigf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"richtigf", tts:"richtigf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"lern", tts:"lern", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"üb", tts:"üb", pfad:[{r:4,c:8},{r:1,c:5}]}, // Ball-Zauberer
  {wort:"geübt", tts:"geübt", pfad:[{r:4,c:8},{r:2,c:6}]}, // Ball-Dino
  {wort:"üben", tts:"üben", pfad:[{r:4,c:8},{r:2,c:10}]}, // Ball-Sie
  {wort:"übt", tts:"übt", pfad:[{r:4,c:8},{r:2,c:9}]}, // Ball-ihr
  {wort:"übe", tts:"übe", pfad:[{r:4,c:8},{r:2,c:1}]}, // Ball-ich
  {wort:"übst", tts:"übst", pfad:[{r:4,c:8},{r:2,c:2}]}, // Ball-du
  {wort:"übt", tts:"übt", pfad:[{r:4,c:8},{r:2,c:3}]}, // Ball-er
  {wort:"übt", tts:"übt", pfad:[{r:4,c:8},{r:2,c:4}]}, // Ball-sie
  {wort:"übt", tts:"übt", pfad:[{r:4,c:8},{r:2,c:5}]}, // Ball-es
  {wort:"üben", tts:"üben", pfad:[{r:4,c:8},{r:2,c:8}]}, // Ball-wir
  {wort:"Deutsch", tts:"Deutsch", pfad:[{r:4,c:5},{r:1,c:8}]}, // Schule-Talker
  {wort:"Pause", tts:"Pause", pfad:[{r:4,c:5},{r:4,c:3}]}, // Schule-Lego
  {wort:"Morgenkreis", tts:"Morgenkreis", pfad:[{r:4,c:5},{r:5,c:5}]}, // Schule-Sonne
  {wort:"Mathe", tts:"Mathe", pfad:[{r:4,c:5},{r:5,c:7}]}, // Schule-Wuerfel
  {wort:"Aufgabe", tts:"Aufgabe", pfad:[{r:4,c:5},{r:6,c:1}]}, // Schule-Maus
  {wort:"Unterricht", tts:"Unterricht", pfad:[{r:4,c:5},{r:2,c:7}]}, // Schule-Einzahl
  {wort:"gelernt", tts:"gelernt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"lernen", tts:"lernen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"probier", tts:"probier", pfad:[{r:6,c:1},{r:1,c:5}]}, // Maus-Zauberer
  {wort:"probiert", tts:"probiert", pfad:[{r:6,c:1},{r:2,c:6}]}, // Maus-Dino
  {wort:"probieren", tts:"probieren", pfad:[{r:6,c:1},{r:2,c:10}]}, // Maus-Sie
  {wort:"probiert", tts:"probiert", pfad:[{r:6,c:1},{r:2,c:9}]}, // Maus-ihr
  {wort:"probiere", tts:"probiere", pfad:[{r:6,c:1},{r:2,c:1}]}, // Maus-ich
  {wort:"probierst", tts:"probierst", pfad:[{r:6,c:1},{r:2,c:2}]}, // Maus-du
  {wort:"probiert", tts:"probiert", pfad:[{r:6,c:1},{r:2,c:3}]}, // Maus-er
  {wort:"probiert", tts:"probiert", pfad:[{r:6,c:1},{r:2,c:4}]}, // Maus-sie
  {wort:"probiert", tts:"probiert", pfad:[{r:6,c:1},{r:2,c:5}]}, // Maus-es
  {wort:"probieren", tts:"probieren", pfad:[{r:6,c:1},{r:2,c:8}]}, // Maus-wir
  {wort:"Schule", tts:"Schule", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"lernt", tts:"lernt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"lerne", tts:"lerne", pfad:[{r:2,c:1}]}, // ich
  {wort:"lernst", tts:"lernst", pfad:[{r:2,c:2}]}, // du
  {wort:"lernt", tts:"lernt", pfad:[{r:2,c:3}]}, // er
  {wort:"lernt", tts:"lernt", pfad:[{r:2,c:4}]}, // sie
  {wort:"lernt", tts:"lernt", pfad:[{r:2,c:5}]}, // es
  {wort:"wütendf", tts:"wütendf", pfad:[{r:3,c:3},{r:1,c:2}]}, // Hammer-Hammer
  {wort:"geärgert", tts:"geärgert", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"wütendf", tts:"wütendf", pfad:[{r:3,c:3},{r:3,c:10}]}, // Hammer-Lupe
  {wort:"ärgern", tts:"ärgern", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"ärgert", tts:"ärgert", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"ärgere", tts:"ärgere", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"ärgerst", tts:"ärgerst", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"ärgert", tts:"ärgert", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"ärgert", tts:"ärgert", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"ärgert", tts:"ärgert", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"ärgern", tts:"ärgern", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"traurigf", tts:"traurigf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"geweint", tts:"geweint", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"traurigf", tts:"traurigf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"weinen", tts:"weinen", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"weint", tts:"weint", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"weine", tts:"weine", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"weinst", tts:"weinst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"weint", tts:"weint", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"weint", tts:"weint", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"weint", tts:"weint", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"weinen", tts:"weinen", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"glücklichf", tts:"glücklichf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"lach", tts:"lach", pfad:[{r:3,c:5},{r:1,c:5}]}, // Plus-Zauberer
  {wort:"gelacht", tts:"gelacht", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"glücklichf", tts:"glücklichf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"lachen", tts:"lachen", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"Spaß", tts:"Spaß", pfad:[{r:3,c:5},{r:2,c:7}]}, // Plus-Einzahl
  {wort:"lacht", tts:"lacht", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"lache", tts:"lache", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"lachst", tts:"lachst", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"lacht", tts:"lacht", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"lacht", tts:"lacht", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"lacht", tts:"lacht", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"lachen", tts:"lachen", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"wünsch", tts:"wünsch", pfad:[{r:3,c:8},{r:1,c:5}]}, // Schluessel-Zauberer
  {wort:"gewünscht", tts:"gewünscht", pfad:[{r:3,c:8},{r:2,c:6}]}, // Schluessel-Dino
  {wort:"wünschen", tts:"wünschen", pfad:[{r:3,c:8},{r:2,c:10}]}, // Schluessel-Sie
  {wort:"wünscht", tts:"wünscht", pfad:[{r:3,c:8},{r:2,c:9}]}, // Schluessel-ihr
  {wort:"wünsche", tts:"wünsche", pfad:[{r:3,c:8},{r:2,c:1}]}, // Schluessel-ich
  {wort:"wünschst", tts:"wünschst", pfad:[{r:3,c:8},{r:2,c:2}]}, // Schluessel-du
  {wort:"wünscht", tts:"wünscht", pfad:[{r:3,c:8},{r:2,c:3}]}, // Schluessel-er
  {wort:"wünscht", tts:"wünscht", pfad:[{r:3,c:8},{r:2,c:4}]}, // Schluessel-sie
  {wort:"wünscht", tts:"wünscht", pfad:[{r:3,c:8},{r:2,c:5}]}, // Schluessel-es
  {wort:"wünschen", tts:"wünschen", pfad:[{r:3,c:8},{r:2,c:8}]}, // Schluessel-wir
  {wort:"gefühlt", tts:"gefühlt", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"fühlen", tts:"fühlen", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"fühlt", tts:"fühlt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"fühle", tts:"fühle", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"fühlst", tts:"fühlst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"fühlt", tts:"fühlt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"fühlt", tts:"fühlt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"fühlt", tts:"fühlt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"fühlen", tts:"fühlen", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gemocht", tts:"gemocht", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Hunger", tts:"Hunger", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"Durst", tts:"Durst", pfad:[{r:5,c:2}]}, // Saft
  {wort:"Angst", tts:"Angst", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"gefreut", tts:"gefreut", pfad:[{r:5,c:5},{r:2,c:6}]}, // Sonne-Dino
  {wort:"freuen", tts:"freuen", pfad:[{r:5,c:5},{r:2,c:10}]}, // Sonne-Sie
  {wort:"Freude", tts:"Freude", pfad:[{r:5,c:5},{r:2,c:7}]}, // Sonne-Einzahl
  {wort:"freut", tts:"freut", pfad:[{r:5,c:5},{r:2,c:9}]}, // Sonne-ihr
  {wort:"freue", tts:"freue", pfad:[{r:5,c:5},{r:2,c:1}]}, // Sonne-ich
  {wort:"freust", tts:"freust", pfad:[{r:5,c:5},{r:2,c:2}]}, // Sonne-du
  {wort:"freut", tts:"freut", pfad:[{r:5,c:5},{r:2,c:3}]}, // Sonne-er
  {wort:"freut", tts:"freut", pfad:[{r:5,c:5},{r:2,c:4}]}, // Sonne-sie
  {wort:"freut", tts:"freut", pfad:[{r:5,c:5},{r:2,c:5}]}, // Sonne-es
  {wort:"freuen", tts:"freuen", pfad:[{r:5,c:5},{r:2,c:8}]}, // Sonne-wir
  {wort:"nettf", tts:"nettf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"möchten", tts:"möchten", pfad:[{r:2,c:10}]}, // Sie
  {wort:"geliebt", tts:"geliebt", pfad:[{r:6,c:2},{r:2,c:6}]}, // Baby-Dino
  {wort:"liebf", tts:"liebf", pfad:[{r:6,c:2},{r:3,c:10}]}, // Baby-Lupe
  {wort:"lieben", tts:"lieben", pfad:[{r:6,c:2},{r:2,c:10}]}, // Baby-Sie
  {wort:"liebf", tts:"liebf", pfad:[{r:6,c:2},{r:6,c:2}]}, // Baby-Baby
  {wort:"Liebe", tts:"Liebe", pfad:[{r:6,c:2},{r:2,c:7}]}, // Baby-Einzahl
  {wort:"liebt", tts:"liebt", pfad:[{r:6,c:2},{r:2,c:9}]}, // Baby-ihr
  {wort:"liebe", tts:"liebe", pfad:[{r:6,c:2},{r:2,c:1}]}, // Baby-ich
  {wort:"liebst", tts:"liebst", pfad:[{r:6,c:2},{r:2,c:2}]}, // Baby-du
  {wort:"liebt", tts:"liebt", pfad:[{r:6,c:2},{r:2,c:3}]}, // Baby-er
  {wort:"liebt", tts:"liebt", pfad:[{r:6,c:2},{r:2,c:4}]}, // Baby-sie
  {wort:"liebt", tts:"liebt", pfad:[{r:6,c:2},{r:2,c:5}]}, // Baby-es
  {wort:"lieben", tts:"lieben", pfad:[{r:6,c:2},{r:2,c:8}]}, // Baby-wir
  {wort:"müdef", tts:"müdef", pfad:[{r:6,c:3},{r:3,c:10}]}, // Bett-Lupe
  {wort:"müdef", tts:"müdef", pfad:[{r:6,c:3},{r:6,c:3}]}, // Bett-Bett
  {wort:"möchtet", tts:"möchtet", pfad:[{r:2,c:9}]}, // ihr
  {wort:"möchte", tts:"möchte", pfad:[{r:2,c:1}]}, // ich
  {wort:"möchtest", tts:"möchtest", pfad:[{r:2,c:2}]}, // du
  {wort:"möchte", tts:"möchte", pfad:[{r:2,c:3}]}, // er
  {wort:"möchte", tts:"möchte", pfad:[{r:2,c:4}]}, // sie
  {wort:"möchte", tts:"möchte", pfad:[{r:2,c:5}]}, // es
  {wort:"wessenÔßþgenugmehrMliesWIZARD3", tts:"wessenÔßþgenugmehrMliesWIZARD3", pfad:[{r:3,c:2}]}, // Haus
  {wort:"wieÔßþMwelchem", tts:"wieÔßþMwelchem", pfad:[{r:3,c:9}]}, // Talker
  {wort:"warumÔßþWas machst du?MfragWIZARD3", tts:"warumÔßþWas machst du?MfragWIZARD3", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"wahrf", tts:"wahrf", pfad:[{r:4,c:7},{r:4,c:7}]}, // Buch-Buch
  {wort:"gefragt", tts:"gefragt", pfad:[{r:4,c:7},{r:2,c:6}]}, // Buch-Dino
  {wort:"wahrf", tts:"wahrf", pfad:[{r:4,c:7},{r:3,c:10}]}, // Buch-Lupe
  {wort:"fragen", tts:"fragen", pfad:[{r:4,c:7},{r:2,c:10}]}, // Buch-Sie
  {wort:"Frage", tts:"Frage", pfad:[{r:4,c:7},{r:2,c:7}]}, // Buch-Einzahl
  {wort:"fragt", tts:"fragt", pfad:[{r:4,c:7},{r:2,c:9}]}, // Buch-ihr
  {wort:"frage", tts:"frage", pfad:[{r:4,c:7},{r:2,c:1}]}, // Buch-ich
  {wort:"fragst", tts:"fragst", pfad:[{r:4,c:7},{r:2,c:2}]}, // Buch-du
  {wort:"fragt", tts:"fragt", pfad:[{r:4,c:7},{r:2,c:3}]}, // Buch-er
  {wort:"fragt", tts:"fragt", pfad:[{r:4,c:7},{r:2,c:4}]}, // Buch-sie
  {wort:"fragt", tts:"fragt", pfad:[{r:4,c:7},{r:2,c:5}]}, // Buch-es
  {wort:"fragen", tts:"fragen", pfad:[{r:4,c:7},{r:2,c:8}]}, // Buch-wir
  {wort:"wasÔßþEgelesen", tts:"wasÔßþEgelesen", pfad:[{r:4,c:3}]}, // Lego
  {wort:"gelesen", tts:"gelesen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"wohinÔßþE&wie vielÔßþE(welchf", tts:"wohinÔßþE&wie vielÔßþE(welchf", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"wie vielÔßþE(welchf", tts:"wie vielÔßþE(welchf", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"welchf", tts:"welchf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"lesen", tts:"lesen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"wenÔßþE6wemÔßþE9lest", tts:"wenÔßþE6wemÔßþE9lest", pfad:[{r:6,c:7}]}, // Idee
  {wort:"wemÔßþE9lest", tts:"wemÔßþE9lest", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"lest", tts:"lest", pfad:[{r:2,c:9}]}, // ihr
  {wort:"lese", tts:"lese", pfad:[{r:2,c:1}]}, // ich
  {wort:"liest", tts:"liest", pfad:[{r:2,c:2}]}, // du
  {wort:"liest", tts:"liest", pfad:[{r:2,c:3}]}, // er
  {wort:"liest", tts:"liest", pfad:[{r:2,c:4}]}, // sie
  {wort:"liest", tts:"liest", pfad:[{r:2,c:5}]}, // es
  {wort:"aufgeräumt", tts:"aufgeräumt", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"aufräumen", tts:"aufräumen", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"schwerf", tts:"schwerf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"verloren", tts:"verloren", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"schwerf", tts:"schwerf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"verlieren", tts:"verlieren", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"verliert", tts:"verliert", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"verliere", tts:"verliere", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"verlierst", tts:"verlierst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"verliert", tts:"verliert", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"verliert", tts:"verliert", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"verliert", tts:"verliert", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"verlieren", tts:"verlieren", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"leichtf", tts:"leichtf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"gewonnen", tts:"gewonnen", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"leichtf", tts:"leichtf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"gewinnen", tts:"gewinnen", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"gewinnt", tts:"gewinnt", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"gewinne", tts:"gewinne", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"gewinnst", tts:"gewinnst", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"gewinnt", tts:"gewinnt", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"gewinnt", tts:"gewinnt", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"gewinnt", tts:"gewinnt", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"gewinnen", tts:"gewinnen", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"sammel", tts:"sammel", pfad:[{r:3,c:8},{r:1,c:5}]}, // Schluessel-Zauberer
  {wort:"gesammelt", tts:"gesammelt", pfad:[{r:3,c:8},{r:2,c:6}]}, // Schluessel-Dino
  {wort:"sammeln", tts:"sammeln", pfad:[{r:3,c:8},{r:2,c:10}]}, // Schluessel-Sie
  {wort:"sammelt", tts:"sammelt", pfad:[{r:3,c:8},{r:2,c:9}]}, // Schluessel-ihr
  {wort:"sammele", tts:"sammele", pfad:[{r:3,c:8},{r:2,c:1}]}, // Schluessel-ich
  {wort:"sammelst", tts:"sammelst", pfad:[{r:3,c:8},{r:2,c:2}]}, // Schluessel-du
  {wort:"sammelt", tts:"sammelt", pfad:[{r:3,c:8},{r:2,c:3}]}, // Schluessel-er
  {wort:"sammelt", tts:"sammelt", pfad:[{r:3,c:8},{r:2,c:4}]}, // Schluessel-sie
  {wort:"sammelt", tts:"sammelt", pfad:[{r:3,c:8},{r:2,c:5}]}, // Schluessel-es
  {wort:"sammeln", tts:"sammeln", pfad:[{r:3,c:8},{r:2,c:8}]}, // Schluessel-wir
  {wort:"geändert", tts:"geändert", pfad:[{r:4,c:3},{r:2,c:6}]}, // Lego-Dino
  {wort:"ändern", tts:"ändern", pfad:[{r:4,c:3},{r:2,c:10}]}, // Lego-Sie
  {wort:"ändert", tts:"ändert", pfad:[{r:4,c:3},{r:2,c:9}]}, // Lego-ihr
  {wort:"ändere", tts:"ändere", pfad:[{r:4,c:3},{r:2,c:1}]}, // Lego-ich
  {wort:"änderst", tts:"änderst", pfad:[{r:4,c:3},{r:2,c:2}]}, // Lego-du
  {wort:"ändert", tts:"ändert", pfad:[{r:4,c:3},{r:2,c:3}]}, // Lego-er
  {wort:"ändert", tts:"ändert", pfad:[{r:4,c:3},{r:2,c:4}]}, // Lego-sie
  {wort:"ändert", tts:"ändert", pfad:[{r:4,c:3},{r:2,c:5}]}, // Lego-es
  {wort:"ändern", tts:"ändern", pfad:[{r:4,c:3},{r:2,c:8}]}, // Lego-wir
  {wort:"gespielt", tts:"gespielt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"angefangen", tts:"angefangen", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"Anfang", tts:"Anfang", pfad:[{r:5,c:4},{r:2,c:7}]}, // Elefant-Einzahl
  {wort:"anfangen", tts:"anfangen", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"spielen", tts:"spielen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"mogel", tts:"mogel", pfad:[{r:6,c:6},{r:1,c:5}]}, // Dieb-Zauberer
  {wort:"gemogelt", tts:"gemogelt", pfad:[{r:6,c:6},{r:2,c:6}]}, // Dieb-Dino
  {wort:"mogeln", tts:"mogeln", pfad:[{r:6,c:6},{r:2,c:10}]}, // Dieb-Sie
  {wort:"mogelt", tts:"mogelt", pfad:[{r:6,c:6},{r:2,c:9}]}, // Dieb-ihr
  {wort:"mogele", tts:"mogele", pfad:[{r:6,c:6},{r:2,c:1}]}, // Dieb-ich
  {wort:"mogelst", tts:"mogelst", pfad:[{r:6,c:6},{r:2,c:2}]}, // Dieb-du
  {wort:"mogelt", tts:"mogelt", pfad:[{r:6,c:6},{r:2,c:3}]}, // Dieb-er
  {wort:"mogelt", tts:"mogelt", pfad:[{r:6,c:6},{r:2,c:4}]}, // Dieb-sie
  {wort:"mogelt", tts:"mogelt", pfad:[{r:6,c:6},{r:2,c:5}]}, // Dieb-es
  {wort:"mogeln", tts:"mogeln", pfad:[{r:6,c:6},{r:2,c:8}]}, // Dieb-wir
  {wort:"Spielzeug", tts:"Spielzeug", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"spielt", tts:"spielt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"spiele", tts:"spiele", pfad:[{r:2,c:1}]}, // ich
  {wort:"spielst", tts:"spielst", pfad:[{r:2,c:2}]}, // du
  {wort:"spielt", tts:"spielt", pfad:[{r:2,c:3}]}, // er
  {wort:"spielt", tts:"spielt", pfad:[{r:2,c:4}]}, // sie
  {wort:"spielt", tts:"spielt", pfad:[{r:2,c:5}]}, // es
  {wort:"gewesen", tts:"gewesen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"waren", tts:"waren", pfad:[{r:2,c:10}]}, // Sie
  {wort:"wart", tts:"wart", pfad:[{r:2,c:9}]}, // ihr
  {wort:"war", tts:"war", pfad:[{r:2,c:1}]}, // ich
  {wort:"warst", tts:"warst", pfad:[{r:2,c:2}]}, // du
  {wort:"war", tts:"war", pfad:[{r:2,c:3}]}, // er
  {wort:"war", tts:"war", pfad:[{r:2,c:4}]}, // sie
  {wort:"war", tts:"war", pfad:[{r:2,c:5}]}, // es
  {wort:"koch", tts:"koch", pfad:[{r:3,c:2},{r:1,c:5}]}, // Haus-Zauberer
  {wort:"gekocht", tts:"gekocht", pfad:[{r:3,c:2},{r:2,c:6}]}, // Haus-Dino
  {wort:"kochen", tts:"kochen", pfad:[{r:3,c:2},{r:2,c:10}]}, // Haus-Sie
  {wort:"kocht", tts:"kocht", pfad:[{r:3,c:2},{r:2,c:9}]}, // Haus-ihr
  {wort:"koche", tts:"koche", pfad:[{r:3,c:2},{r:2,c:1}]}, // Haus-ich
  {wort:"kochst", tts:"kochst", pfad:[{r:3,c:2},{r:2,c:2}]}, // Haus-du
  {wort:"kocht", tts:"kocht", pfad:[{r:3,c:2},{r:2,c:3}]}, // Haus-er
  {wort:"kocht", tts:"kocht", pfad:[{r:3,c:2},{r:2,c:4}]}, // Haus-sie
  {wort:"kocht", tts:"kocht", pfad:[{r:3,c:2},{r:2,c:5}]}, // Haus-es
  {wort:"kochen", tts:"kochen", pfad:[{r:3,c:2},{r:2,c:8}]}, // Haus-wir
  {wort:"ekligf", tts:"ekligf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"ekligsõsM@ekligen", tts:"ekligsõsM@ekligen", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"leckerf", tts:"leckerf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"leckerf", tts:"leckerf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"Frühstück", tts:"Frühstück", pfad:[{r:3,c:6},{r:5,c:2}]}, // Turm-Saft
  {wort:"schäl", tts:"schäl", pfad:[{r:4,c:1},{r:1,c:5}]}, // Blume-Zauberer
  {wort:"geschält", tts:"geschält", pfad:[{r:4,c:1},{r:2,c:6}]}, // Blume-Dino
  {wort:"schälen", tts:"schälen", pfad:[{r:4,c:1},{r:2,c:10}]}, // Blume-Sie
  {wort:"schält", tts:"schält", pfad:[{r:4,c:1},{r:2,c:9}]}, // Blume-ihr
  {wort:"schäle", tts:"schäle", pfad:[{r:4,c:1},{r:2,c:1}]}, // Blume-ich
  {wort:"schälst", tts:"schälst", pfad:[{r:4,c:1},{r:2,c:2}]}, // Blume-du
  {wort:"schält", tts:"schält", pfad:[{r:4,c:1},{r:2,c:3}]}, // Blume-er
  {wort:"schält", tts:"schält", pfad:[{r:4,c:1},{r:2,c:4}]}, // Blume-sie
  {wort:"schält", tts:"schält", pfad:[{r:4,c:1},{r:2,c:5}]}, // Blume-es
  {wort:"schälen", tts:"schälen", pfad:[{r:4,c:1},{r:2,c:8}]}, // Blume-wir
  {wort:"grill", tts:"grill", pfad:[{r:4,c:2},{r:1,c:5}]}, // Leute-Zauberer
  {wort:"gegrillt", tts:"gegrillt", pfad:[{r:4,c:2},{r:2,c:6}]}, // Leute-Dino
  {wort:"grillen", tts:"grillen", pfad:[{r:4,c:2},{r:2,c:10}]}, // Leute-Sie
  {wort:"grillt", tts:"grillt", pfad:[{r:4,c:2},{r:2,c:9}]}, // Leute-ihr
  {wort:"grille", tts:"grille", pfad:[{r:4,c:2},{r:2,c:1}]}, // Leute-ich
  {wort:"grillst", tts:"grillst", pfad:[{r:4,c:2},{r:2,c:2}]}, // Leute-du
  {wort:"grillt", tts:"grillt", pfad:[{r:4,c:2},{r:2,c:3}]}, // Leute-er
  {wort:"grillt", tts:"grillt", pfad:[{r:4,c:2},{r:2,c:4}]}, // Leute-sie
  {wort:"grillt", tts:"grillt", pfad:[{r:4,c:2},{r:2,c:5}]}, // Leute-es
  {wort:"grillen", tts:"grillen", pfad:[{r:4,c:2},{r:2,c:8}]}, // Leute-wir
  {wort:"gegessen", tts:"gegessen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schmeck", tts:"schmeck", pfad:[{r:5,c:1},{r:1,c:5}]}, // Apfel-Zauberer
  {wort:"geschmeckt", tts:"geschmeckt", pfad:[{r:5,c:1},{r:2,c:6}]}, // Apfel-Dino
  {wort:"schmecken", tts:"schmecken", pfad:[{r:5,c:1},{r:2,c:10}]}, // Apfel-Sie
  {wort:"schmeckt", tts:"schmeckt", pfad:[{r:5,c:1},{r:2,c:9}]}, // Apfel-ihr
  {wort:"schmecke", tts:"schmecke", pfad:[{r:5,c:1},{r:2,c:1}]}, // Apfel-ich
  {wort:"schmeckst", tts:"schmeckst", pfad:[{r:5,c:1},{r:2,c:2}]}, // Apfel-du
  {wort:"schmeckt", tts:"schmeckt", pfad:[{r:5,c:1},{r:2,c:3}]}, // Apfel-er
  {wort:"schmeckt", tts:"schmeckt", pfad:[{r:5,c:1},{r:2,c:4}]}, // Apfel-sie
  {wort:"schmeckt", tts:"schmeckt", pfad:[{r:5,c:1},{r:2,c:5}]}, // Apfel-es
  {wort:"schmecken", tts:"schmecken", pfad:[{r:5,c:1},{r:2,c:8}]}, // Apfel-wir
  {wort:"frühstück", tts:"frühstück", pfad:[{r:5,c:2},{r:1,c:5}]}, // Saft-Zauberer
  {wort:"gefrühstückt", tts:"gefrühstückt", pfad:[{r:5,c:2},{r:2,c:6}]}, // Saft-Dino
  {wort:"frühstücken", tts:"frühstücken", pfad:[{r:5,c:2},{r:2,c:10}]}, // Saft-Sie
  {wort:"frühstückt", tts:"frühstückt", pfad:[{r:5,c:2},{r:2,c:9}]}, // Saft-ihr
  {wort:"frühstücke", tts:"frühstücke", pfad:[{r:5,c:2},{r:2,c:1}]}, // Saft-ich
  {wort:"frühstückst", tts:"frühstückst", pfad:[{r:5,c:2},{r:2,c:2}]}, // Saft-du
  {wort:"frühstückt", tts:"frühstückt", pfad:[{r:5,c:2},{r:2,c:3}]}, // Saft-er
  {wort:"frühstückt", tts:"frühstückt", pfad:[{r:5,c:2},{r:2,c:4}]}, // Saft-sie
  {wort:"frühstückt", tts:"frühstückt", pfad:[{r:5,c:2},{r:2,c:5}]}, // Saft-es
  {wort:"frühstücken", tts:"frühstücken", pfad:[{r:5,c:2},{r:2,c:8}]}, // Saft-wir
  {wort:"brate", tts:"brate", pfad:[{r:5,c:4},{r:1,c:5}]}, // Elefant-Zauberer
  {wort:"gebraten", tts:"gebraten", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"braten", tts:"braten", pfad:[{r:5,c:4},{r:2,c:10}]}, // Elefant-Sie
  {wort:"bratet", tts:"bratet", pfad:[{r:5,c:4},{r:2,c:9}]}, // Elefant-ihr
  {wort:"brate", tts:"brate", pfad:[{r:5,c:4},{r:2,c:1}]}, // Elefant-ich
  {wort:"bräst", tts:"bräst", pfad:[{r:5,c:4},{r:2,c:2}]}, // Elefant-du
  {wort:"brät", tts:"brät", pfad:[{r:5,c:4},{r:2,c:3}]}, // Elefant-er
  {wort:"brät", tts:"brät", pfad:[{r:5,c:4},{r:2,c:4}]}, // Elefant-sie
  {wort:"brät", tts:"brät", pfad:[{r:5,c:4},{r:2,c:5}]}, // Elefant-es
  {wort:"braten", tts:"braten", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"back", tts:"back", pfad:[{r:5,c:5},{r:1,c:5}]}, // Sonne-Zauberer
  {wort:"gebacken", tts:"gebacken", pfad:[{r:5,c:5},{r:2,c:6}]}, // Sonne-Dino
  {wort:"backen", tts:"backen", pfad:[{r:5,c:5},{r:2,c:10}]}, // Sonne-Sie
  {wort:"Gebäck", tts:"Gebäck", pfad:[{r:5,c:5},{r:2,c:7}]}, // Sonne-Einzahl
  {wort:"backt", tts:"backt", pfad:[{r:5,c:5},{r:2,c:9}]}, // Sonne-ihr
  {wort:"backe", tts:"backe", pfad:[{r:5,c:5},{r:2,c:1}]}, // Sonne-ich
  {wort:"backst", tts:"backst", pfad:[{r:5,c:5},{r:2,c:2}]}, // Sonne-du
  {wort:"backt", tts:"backt", pfad:[{r:5,c:5},{r:2,c:3}]}, // Sonne-er
  {wort:"backt", tts:"backt", pfad:[{r:5,c:5},{r:2,c:4}]}, // Sonne-sie
  {wort:"backt", tts:"backt", pfad:[{r:5,c:5},{r:2,c:5}]}, // Sonne-es
  {wort:"backen", tts:"backen", pfad:[{r:5,c:5},{r:2,c:8}]}, // Sonne-wir
  {wort:"sauerf", tts:"sauerf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"essen", tts:"essen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"süßf", tts:"süßf", pfad:[{r:6,c:2},{r:3,c:10}]}, // Baby-Lupe
  {wort:"süßf", tts:"süßf", pfad:[{r:6,c:2},{r:6,c:2}]}, // Baby-Baby
  {wort:"bitterf", tts:"bitterf", pfad:[{r:6,c:6},{r:3,c:10}]}, // Dieb-Lupe
  {wort:"bitterf", tts:"bitterf", pfad:[{r:6,c:6},{r:6,c:6}]}, // Dieb-Dieb
  {wort:"Lebensmittel", tts:"Lebensmittel", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"esst", tts:"esst", pfad:[{r:2,c:9}]}, // ihr
  {wort:"esse", tts:"esse", pfad:[{r:2,c:1}]}, // ich
  {wort:"isst", tts:"isst", pfad:[{r:2,c:2}]}, // du
  {wort:"isst", tts:"isst", pfad:[{r:2,c:3}]}, // er
  {wort:"isst", tts:"isst", pfad:[{r:2,c:4}]}, // sie
  {wort:"isst", tts:"isst", pfad:[{r:2,c:5}]}, // es
  {wort:"leerf", tts:"leerf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"leerf", tts:"leerf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"vollf", tts:"vollf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"vollf", tts:"vollf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"getrunken", tts:"getrunken", pfad:[{r:2,c:6}]}, // Dino
  {wort:"ganzf", tts:"ganzf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"trinken", tts:"trinken", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Getränk", tts:"Getränk", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"trinkt", tts:"trinkt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"trinke", tts:"trinke", pfad:[{r:2,c:1}]}, // ich
  {wort:"trinkst", tts:"trinkst", pfad:[{r:2,c:2}]}, // du
  {wort:"trinkt", tts:"trinkt", pfad:[{r:2,c:3}]}, // er
  {wort:"trinkt", tts:"trinkt", pfad:[{r:2,c:4}]}, // sie
  {wort:"trinkt", tts:"trinkt", pfad:[{r:2,c:5}]}, // es
  {wort:"langsamf", tts:"langsamf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"langsamf", tts:"langsamf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"schnellf", tts:"schnellf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"flieg", tts:"flieg", pfad:[{r:3,c:5},{r:1,c:5}]}, // Plus-Zauberer
  {wort:"geflogen", tts:"geflogen", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"schnellf", tts:"schnellf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"fliegen", tts:"fliegen", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"fliegt", tts:"fliegt", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"fliege", tts:"fliege", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"fliegst", tts:"fliegst", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"fliegt", tts:"fliegt", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"fliegt", tts:"fliegt", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"fliegt", tts:"fliegt", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"fliegen", tts:"fliegen", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"gebracht", tts:"gebracht", pfad:[{r:4,c:2},{r:2,c:6}]}, // Leute-Dino
  {wort:"bringen", tts:"bringen", pfad:[{r:4,c:2},{r:2,c:10}]}, // Leute-Sie
  {wort:"bringt", tts:"bringt", pfad:[{r:4,c:2},{r:2,c:9}]}, // Leute-ihr
  {wort:"bringe", tts:"bringe", pfad:[{r:4,c:2},{r:2,c:1}]}, // Leute-ich
  {wort:"bringst", tts:"bringst", pfad:[{r:4,c:2},{r:2,c:2}]}, // Leute-du
  {wort:"bringt", tts:"bringt", pfad:[{r:4,c:2},{r:2,c:3}]}, // Leute-er
  {wort:"bringt", tts:"bringt", pfad:[{r:4,c:2},{r:2,c:4}]}, // Leute-sie
  {wort:"bringt", tts:"bringt", pfad:[{r:4,c:2},{r:2,c:5}]}, // Leute-es
  {wort:"bringen", tts:"bringen", pfad:[{r:4,c:2},{r:2,c:8}]}, // Leute-wir
  {wort:"gebremst", tts:"gebremst", pfad:[{r:3,c:7},{r:2,c:6}]}, // Ampel-Dino
  {wort:"bremsen", tts:"bremsen", pfad:[{r:3,c:7},{r:2,c:10}]}, // Ampel-Sie
  {wort:"Unfall", tts:"Unfall", pfad:[{r:3,c:7},{r:6,c:6}]}, // Ampel-Dieb
  {wort:"bremst", tts:"bremst", pfad:[{r:3,c:7},{r:2,c:9}]}, // Ampel-ihr
  {wort:"bremse", tts:"bremse", pfad:[{r:3,c:7},{r:2,c:1}]}, // Ampel-ich
  {wort:"bremst", tts:"bremst", pfad:[{r:3,c:7},{r:2,c:2}]}, // Ampel-du
  {wort:"bremst", tts:"bremst", pfad:[{r:3,c:7},{r:2,c:3}]}, // Ampel-er
  {wort:"bremst", tts:"bremst", pfad:[{r:3,c:7},{r:2,c:4}]}, // Ampel-sie
  {wort:"bremst", tts:"bremst", pfad:[{r:3,c:7},{r:2,c:5}]}, // Ampel-es
  {wort:"bremsen", tts:"bremsen", pfad:[{r:3,c:7},{r:2,c:8}]}, // Ampel-wir
  {wort:"gefahren", tts:"gefahren", pfad:[{r:2,c:6}]}, // Dino
  {wort:"getankt", tts:"getankt", pfad:[{r:5,c:2},{r:2,c:6}]}, // Saft-Dino
  {wort:"tanken", tts:"tanken", pfad:[{r:5,c:2},{r:2,c:10}]}, // Saft-Sie
  {wort:"tankt", tts:"tankt", pfad:[{r:5,c:2},{r:2,c:9}]}, // Saft-ihr
  {wort:"tanke", tts:"tanke", pfad:[{r:5,c:2},{r:2,c:1}]}, // Saft-ich
  {wort:"tankst", tts:"tankst", pfad:[{r:5,c:2},{r:2,c:2}]}, // Saft-du
  {wort:"tankt", tts:"tankt", pfad:[{r:5,c:2},{r:2,c:3}]}, // Saft-er
  {wort:"tankt", tts:"tankt", pfad:[{r:5,c:2},{r:2,c:4}]}, // Saft-sie
  {wort:"tankt", tts:"tankt", pfad:[{r:5,c:2},{r:2,c:5}]}, // Saft-es
  {wort:"tanken", tts:"tanken", pfad:[{r:5,c:2},{r:2,c:8}]}, // Saft-wir
  {wort:"geholt", tts:"geholt", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"holen", tts:"holen", pfad:[{r:5,c:4},{r:2,c:10}]}, // Elefant-Sie
  {wort:"holt", tts:"holt", pfad:[{r:5,c:4},{r:2,c:9}]}, // Elefant-ihr
  {wort:"hole", tts:"hole", pfad:[{r:5,c:4},{r:2,c:1}]}, // Elefant-ich
  {wort:"holst", tts:"holst", pfad:[{r:5,c:4},{r:2,c:2}]}, // Elefant-du
  {wort:"holt", tts:"holt", pfad:[{r:5,c:4},{r:2,c:3}]}, // Elefant-er
  {wort:"holt", tts:"holt", pfad:[{r:5,c:4},{r:2,c:4}]}, // Elefant-sie
  {wort:"holt", tts:"holt", pfad:[{r:5,c:4},{r:2,c:5}]}, // Elefant-es
  {wort:"holen", tts:"holen", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"fahren", tts:"fahren", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Fahrzeug", tts:"Fahrzeug", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"fahrt", tts:"fahrt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"fahre", tts:"fahre", pfad:[{r:2,c:1}]}, // ich
  {wort:"fährst", tts:"fährst", pfad:[{r:2,c:2}]}, // du
  {wort:"fährt", tts:"fährt", pfad:[{r:2,c:3}]}, // er
  {wort:"fährt", tts:"fährt", pfad:[{r:2,c:4}]}, // sie
  {wort:"fährt", tts:"fährt", pfad:[{r:2,c:5}]}, // es
  {wort:"schwachf", tts:"schwachf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"schwachf", tts:"schwachf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"starkf", tts:"starkf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"starkf", tts:"starkf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"zieh", tts:"zieh", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"streichel", tts:"streichel", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"gestreichelt", tts:"gestreichelt", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"streicheln", tts:"streicheln", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"streichelt", tts:"streichelt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"streichele", tts:"streichele", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"streichelst", tts:"streichelst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"streichelt", tts:"streichelt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"streichelt", tts:"streichelt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"streichelt", tts:"streichelt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"streicheln", tts:"streicheln", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gezogen", tts:"gezogen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"fütter", tts:"fütter", pfad:[{r:5,c:1},{r:1,c:5}]}, // Apfel-Zauberer
  {wort:"gefüttert", tts:"gefüttert", pfad:[{r:5,c:1},{r:2,c:6}]}, // Apfel-Dino
  {wort:"füttern", tts:"füttern", pfad:[{r:5,c:1},{r:2,c:10}]}, // Apfel-Sie
  {wort:"Futter", tts:"Futter", pfad:[{r:5,c:1},{r:2,c:7}]}, // Apfel-Einzahl
  {wort:"füttert", tts:"füttert", pfad:[{r:5,c:1},{r:2,c:9}]}, // Apfel-ihr
  {wort:"füttere", tts:"füttere", pfad:[{r:5,c:1},{r:2,c:1}]}, // Apfel-ich
  {wort:"fütterst", tts:"fütterst", pfad:[{r:5,c:1},{r:2,c:2}]}, // Apfel-du
  {wort:"füttert", tts:"füttert", pfad:[{r:5,c:1},{r:2,c:3}]}, // Apfel-er
  {wort:"füttert", tts:"füttert", pfad:[{r:5,c:1},{r:2,c:4}]}, // Apfel-sie
  {wort:"füttert", tts:"füttert", pfad:[{r:5,c:1},{r:2,c:5}]}, // Apfel-es
  {wort:"füttern", tts:"füttern", pfad:[{r:5,c:1},{r:2,c:8}]}, // Apfel-wir
  {wort:"gefangen", tts:"gefangen", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"fangen", tts:"fangen", pfad:[{r:5,c:4},{r:2,c:10}]}, // Elefant-Sie
  {wort:"fangt", tts:"fangt", pfad:[{r:5,c:4},{r:2,c:9}]}, // Elefant-ihr
  {wort:"fange", tts:"fange", pfad:[{r:5,c:4},{r:2,c:1}]}, // Elefant-ich
  {wort:"fängst", tts:"fängst", pfad:[{r:5,c:4},{r:2,c:2}]}, // Elefant-du
  {wort:"fängt", tts:"fängt", pfad:[{r:5,c:4},{r:2,c:3}]}, // Elefant-er
  {wort:"fängt", tts:"fängt", pfad:[{r:5,c:4},{r:2,c:4}]}, // Elefant-sie
  {wort:"fängt", tts:"fängt", pfad:[{r:5,c:4},{r:2,c:5}]}, // Elefant-es
  {wort:"fangen", tts:"fangen", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"ziehen", tts:"ziehen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Tier", tts:"Tier", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"zieht", tts:"zieht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"ziehe", tts:"ziehe", pfad:[{r:2,c:1}]}, // ich
  {wort:"ziehst", tts:"ziehst", pfad:[{r:2,c:2}]}, // du
  {wort:"zieht", tts:"zieht", pfad:[{r:2,c:3}]}, // er
  {wort:"zieht", tts:"zieht", pfad:[{r:2,c:4}]}, // sie
  {wort:"zieht", tts:"zieht", pfad:[{r:2,c:5}]}, // es
  {wort:"dunkelf", tts:"dunkelf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"dunkelf", tts:"dunkelf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"hellf", tts:"hellf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"hellf", tts:"hellf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"schein", tts:"schein", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"regne", tts:"regne", pfad:[{r:4,c:4},{r:1,c:5}]}, // Farbe-Zauberer
  {wort:"geregnet", tts:"geregnet", pfad:[{r:4,c:4},{r:2,c:6}]}, // Farbe-Dino
  {wort:"regnen", tts:"regnen", pfad:[{r:4,c:4},{r:2,c:10}]}, // Farbe-Sie
  {wort:"regnet", tts:"regnet", pfad:[{r:4,c:4},{r:2,c:9}]}, // Farbe-ihr
  {wort:"regne", tts:"regne", pfad:[{r:4,c:4},{r:2,c:1}]}, // Farbe-ich
  {wort:"regnest", tts:"regnest", pfad:[{r:4,c:4},{r:2,c:2}]}, // Farbe-du
  {wort:"regnet", tts:"regnet", pfad:[{r:4,c:4},{r:2,c:3}]}, // Farbe-er
  {wort:"regnet", tts:"regnet", pfad:[{r:4,c:4},{r:2,c:4}]}, // Farbe-sie
  {wort:"regnet", tts:"regnet", pfad:[{r:4,c:4},{r:2,c:5}]}, // Farbe-es
  {wort:"regnen", tts:"regnen", pfad:[{r:4,c:4},{r:2,c:8}]}, // Farbe-wir
  {wort:"geschienen", tts:"geschienen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"scheinen", tts:"scheinen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Wetter", tts:"Wetter", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"scheint", tts:"scheint", pfad:[{r:2,c:9}]}, // ihr
  {wort:"scheine", tts:"scheine", pfad:[{r:2,c:1}]}, // ich
  {wort:"scheinst", tts:"scheinst", pfad:[{r:2,c:2}]}, // du
  {wort:"scheint", tts:"scheint", pfad:[{r:2,c:3}]}, // er
  {wort:"scheint", tts:"scheint", pfad:[{r:2,c:4}]}, // sie
  {wort:"scheint", tts:"scheint", pfad:[{r:2,c:5}]}, // es
  {wort:"kauf", tts:"kauf", pfad:[{r:3,c:3},{r:1,c:5}]}, // Hammer-Zauberer
  {wort:"gekauft", tts:"gekauft", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"kaufen", tts:"kaufen", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"kauft", tts:"kauft", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"kaufe", tts:"kaufe", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"kaufst", tts:"kaufst", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"kauft", tts:"kauft", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"kauft", tts:"kauft", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"kauft", tts:"kauft", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"kaufen", tts:"kaufen", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"billigf", tts:"billigf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"billigf", tts:"billigf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"teuerf", tts:"teuerf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"koste", tts:"koste", pfad:[{r:3,c:5},{r:1,c:5}]}, // Plus-Zauberer
  {wort:"gekostet", tts:"gekostet", pfad:[{r:3,c:5},{r:2,c:6}]}, // Plus-Dino
  {wort:"teuerf", tts:"teuerf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"kosten", tts:"kosten", pfad:[{r:3,c:5},{r:2,c:10}]}, // Plus-Sie
  {wort:"kostet", tts:"kostet", pfad:[{r:3,c:5},{r:2,c:9}]}, // Plus-ihr
  {wort:"koste", tts:"koste", pfad:[{r:3,c:5},{r:2,c:1}]}, // Plus-ich
  {wort:"kostest", tts:"kostest", pfad:[{r:3,c:5},{r:2,c:2}]}, // Plus-du
  {wort:"kostet", tts:"kostet", pfad:[{r:3,c:5},{r:2,c:3}]}, // Plus-er
  {wort:"kostet", tts:"kostet", pfad:[{r:3,c:5},{r:2,c:4}]}, // Plus-sie
  {wort:"kostet", tts:"kostet", pfad:[{r:3,c:5},{r:2,c:5}]}, // Plus-es
  {wort:"kosten", tts:"kosten", pfad:[{r:3,c:5},{r:2,c:8}]}, // Plus-wir
  {wort:"hab", tts:"hab", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"hatten", tts:"hatten", pfad:[{r:3,c:6},{r:2,c:10}]}, // Turm-Sie
  {wort:"hattet", tts:"hattet", pfad:[{r:3,c:6},{r:2,c:9}]}, // Turm-ihr
  {wort:"hatte", tts:"hatte", pfad:[{r:3,c:6},{r:2,c:1}]}, // Turm-ich
  {wort:"hattest", tts:"hattest", pfad:[{r:3,c:6},{r:2,c:2}]}, // Turm-du
  {wort:"hatte", tts:"hatte", pfad:[{r:3,c:6},{r:2,c:3}]}, // Turm-er
  {wort:"hatte", tts:"hatte", pfad:[{r:3,c:6},{r:2,c:4}]}, // Turm-sie
  {wort:"hatte", tts:"hatte", pfad:[{r:3,c:6},{r:2,c:5}]}, // Turm-es
  {wort:"hatten", tts:"hatten", pfad:[{r:3,c:6},{r:2,c:8}]}, // Turm-wir
  {wort:"gehör", tts:"gehör", pfad:[{r:3,c:9},{r:1,c:5}]}, // Talker-Zauberer
  {wort:"gehört", tts:"gehört", pfad:[{r:3,c:9},{r:2,c:6}]}, // Talker-Dino
  {wort:"gehören", tts:"gehören", pfad:[{r:3,c:9},{r:2,c:10}]}, // Talker-Sie
  {wort:"gehört", tts:"gehört", pfad:[{r:3,c:9},{r:2,c:9}]}, // Talker-ihr
  {wort:"gehöre", tts:"gehöre", pfad:[{r:3,c:9},{r:2,c:1}]}, // Talker-ich
  {wort:"gehörst", tts:"gehörst", pfad:[{r:3,c:9},{r:2,c:2}]}, // Talker-du
  {wort:"gehört", tts:"gehört", pfad:[{r:3,c:9},{r:2,c:3}]}, // Talker-er
  {wort:"gehört", tts:"gehört", pfad:[{r:3,c:9},{r:2,c:4}]}, // Talker-sie
  {wort:"gehört", tts:"gehört", pfad:[{r:3,c:9},{r:2,c:5}]}, // Talker-es
  {wort:"gehören", tts:"gehören", pfad:[{r:3,c:9},{r:2,c:8}]}, // Talker-wir
  {wort:"bezahl", tts:"bezahl", pfad:[{r:4,c:7},{r:1,c:5}]}, // Buch-Zauberer
  {wort:"bezahlt", tts:"bezahlt", pfad:[{r:4,c:7},{r:2,c:6}]}, // Buch-Dino
  {wort:"bezahlen", tts:"bezahlen", pfad:[{r:4,c:7},{r:2,c:10}]}, // Buch-Sie
  {wort:"Preis", tts:"Preis", pfad:[{r:4,c:7},{r:2,c:7}]}, // Buch-Einzahl
  {wort:"bezahlt", tts:"bezahlt", pfad:[{r:4,c:7},{r:2,c:9}]}, // Buch-ihr
  {wort:"bezahle", tts:"bezahle", pfad:[{r:4,c:7},{r:2,c:1}]}, // Buch-ich
  {wort:"bezahlst", tts:"bezahlst", pfad:[{r:4,c:7},{r:2,c:2}]}, // Buch-du
  {wort:"bezahlt", tts:"bezahlt", pfad:[{r:4,c:7},{r:2,c:3}]}, // Buch-er
  {wort:"bezahlt", tts:"bezahlt", pfad:[{r:4,c:7},{r:2,c:4}]}, // Buch-sie
  {wort:"bezahlt", tts:"bezahlt", pfad:[{r:4,c:7},{r:2,c:5}]}, // Buch-es
  {wort:"bezahlen", tts:"bezahlen", pfad:[{r:4,c:7},{r:2,c:8}]}, // Buch-wir
  {wort:"gehabt", tts:"gehabt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"eingekauft", tts:"eingekauft", pfad:[{r:5,c:1},{r:2,c:6}]}, // Apfel-Dino
  {wort:"einkaufen", tts:"einkaufen", pfad:[{r:5,c:1},{r:2,c:8}]}, // Apfel-wir
  {wort:"bekommen", tts:"bekommen", pfad:[{r:5,c:6},{r:2,c:6}]}, // Geld-Dino
  {wort:"bekommen", tts:"bekommen", pfad:[{r:5,c:6},{r:2,c:10}]}, // Geld-Sie
  {wort:"bekommt", tts:"bekommt", pfad:[{r:5,c:6},{r:2,c:9}]}, // Geld-ihr
  {wort:"bekomme", tts:"bekomme", pfad:[{r:5,c:6},{r:2,c:1}]}, // Geld-ich
  {wort:"bekommst", tts:"bekommst", pfad:[{r:5,c:6},{r:2,c:2}]}, // Geld-du
  {wort:"bekommt", tts:"bekommt", pfad:[{r:5,c:6},{r:2,c:3}]}, // Geld-er
  {wort:"bekommt", tts:"bekommt", pfad:[{r:5,c:6},{r:2,c:4}]}, // Geld-sie
  {wort:"bekommt", tts:"bekommt", pfad:[{r:5,c:6},{r:2,c:5}]}, // Geld-es
  {wort:"bekommen", tts:"bekommen", pfad:[{r:5,c:6},{r:2,c:8}]}, // Geld-wir
  {wort:"echtf", tts:"echtf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"haben", tts:"haben", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Taschengeld", tts:"Taschengeld", pfad:[{r:6,c:2}]}, // Baby
  {wort:"Geld", tts:"Geld", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"habt", tts:"habt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"habe", tts:"habe", pfad:[{r:2,c:1}]}, // ich
  {wort:"hast", tts:"hast", pfad:[{r:2,c:2}]}, // du
  {wort:"hat", tts:"hat", pfad:[{r:2,c:3}]}, // er
  {wort:"hat", tts:"hat", pfad:[{r:2,c:4}]}, // sie
  {wort:"hat", tts:"hat", pfad:[{r:2,c:5}]}, // es
  {wort:"eckigf", tts:"eckigf", pfad:[{r:3,c:2},{r:1,c:1}]}, // Haus-Haus
  {wort:"eckigf", tts:"eckigf", pfad:[{r:3,c:2},{r:3,c:10}]}, // Haus-Lupe
  {wort:"spitzf", tts:"spitzf", pfad:[{r:3,c:3},{r:1,c:2}]}, // Hammer-Hammer
  {wort:"spitzf", tts:"spitzf", pfad:[{r:3,c:3},{r:3,c:10}]}, // Hammer-Lupe
  {wort:"wenigf", tts:"wenigf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"wenigf", tts:"wenigf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"vielf", tts:"vielf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"vielf", tts:"vielf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"zähl", tts:"zähl", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"hochf", tts:"hochf", pfad:[{r:3,c:6},{r:3,c:10}]}, // Turm-Lupe
  {wort:"rundf", tts:"rundf", pfad:[{r:4,c:8},{r:1,c:9}]}, // Ball-Ball
  {wort:"rundf", tts:"rundf", pfad:[{r:4,c:8},{r:3,c:10}]}, // Ball-Lupe
  {wort:"flachf", tts:"flachf", pfad:[{r:4,c:7},{r:4,c:7}]}, // Buch-Buch
  {wort:"flachf", tts:"flachf", pfad:[{r:4,c:7},{r:3,c:10}]}, // Buch-Lupe
  {wort:"gezählt", tts:"gezählt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"miss", tts:"miss", pfad:[{r:5,c:7},{r:1,c:5}]}, // Wuerfel-Zauberer
  {wort:"Teil", tts:"Teil", pfad:[{r:5,c:7},{r:4,c:3}]}, // Wuerfel-Lego
  {wort:"gemessen", tts:"gemessen", pfad:[{r:5,c:7},{r:2,c:6}]}, // Wuerfel-Dino
  {wort:"messen", tts:"messen", pfad:[{r:5,c:7},{r:2,c:10}]}, // Wuerfel-Sie
  {wort:"Form", tts:"Form", pfad:[{r:5,c:7},{r:2,c:7}]}, // Wuerfel-Einzahl
  {wort:"messt", tts:"messt", pfad:[{r:5,c:7},{r:2,c:9}]}, // Wuerfel-ihr
  {wort:"messe", tts:"messe", pfad:[{r:5,c:7},{r:2,c:1}]}, // Wuerfel-ich
  {wort:"misst", tts:"misst", pfad:[{r:5,c:7},{r:2,c:2}]}, // Wuerfel-du
  {wort:"misst", tts:"misst", pfad:[{r:5,c:7},{r:2,c:3}]}, // Wuerfel-er
  {wort:"misst", tts:"misst", pfad:[{r:5,c:7},{r:2,c:4}]}, // Wuerfel-sie
  {wort:"misst", tts:"misst", pfad:[{r:5,c:7},{r:2,c:5}]}, // Wuerfel-es
  {wort:"messen", tts:"messen", pfad:[{r:5,c:7},{r:2,c:8}]}, // Wuerfel-wir
  {wort:"zählen", tts:"zählen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"tieff", tts:"tieff", pfad:[{r:6,c:5},{r:3,c:10}]}, // Freibad-Lupe
  {wort:"tieff", tts:"tieff", pfad:[{r:6,c:5},{r:6,c:5}]}, // Freibad-Freibad
  {wort:"Zahl", tts:"Zahl", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"zählt", tts:"zählt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"zähle", tts:"zähle", pfad:[{r:2,c:1}]}, // ich
  {wort:"zählst", tts:"zählst", pfad:[{r:2,c:2}]}, // du
  {wort:"zählt", tts:"zählt", pfad:[{r:2,c:3}]}, // er
  {wort:"zählt", tts:"zählt", pfad:[{r:2,c:4}]}, // sie
  {wort:"zählt", tts:"zählt", pfad:[{r:2,c:5}]}, // es
  {wort:"kurzf", tts:"kurzf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"fall", tts:"fall", pfad:[{r:3,c:4},{r:1,c:5}]}, // Minus-Zauberer
  {wort:"gefallen", tts:"gefallen", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"kurzf", tts:"kurzf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"fallen", tts:"fallen", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"fallt", tts:"fallt", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"falle", tts:"falle", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"fällst", tts:"fällst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"fällt", tts:"fällt", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"fällt", tts:"fällt", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"fällt", tts:"fällt", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"fallen", tts:"fallen", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"langf", tts:"langf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"langf", tts:"langf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"spring", tts:"spring", pfad:[{r:4,c:8},{r:1,c:5}]}, // Ball-Zauberer
  {wort:"gesprungen", tts:"gesprungen", pfad:[{r:4,c:8},{r:2,c:6}]}, // Ball-Dino
  {wort:"springen", tts:"springen", pfad:[{r:4,c:8},{r:2,c:10}]}, // Ball-Sie
  {wort:"springt", tts:"springt", pfad:[{r:4,c:8},{r:2,c:9}]}, // Ball-ihr
  {wort:"springe", tts:"springe", pfad:[{r:4,c:8},{r:2,c:1}]}, // Ball-ich
  {wort:"springst", tts:"springst", pfad:[{r:4,c:8},{r:2,c:2}]}, // Ball-du
  {wort:"springt", tts:"springt", pfad:[{r:4,c:8},{r:2,c:3}]}, // Ball-er
  {wort:"springt", tts:"springt", pfad:[{r:4,c:8},{r:2,c:4}]}, // Ball-sie
  {wort:"springt", tts:"springt", pfad:[{r:4,c:8},{r:2,c:5}]}, // Ball-es
  {wort:"springen", tts:"springen", pfad:[{r:4,c:8},{r:2,c:8}]}, // Ball-wir
  {wort:"tanz", tts:"tanz", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"getanzt", tts:"getanzt", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"tanzen", tts:"tanzen", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"tanzt", tts:"tanzt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"tanze", tts:"tanze", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"tanzt", tts:"tanzt", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"tanzt", tts:"tanzt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"tanzt", tts:"tanzt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"tanzt", tts:"tanzt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"tanzen", tts:"tanzen", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gegangen", tts:"gegangen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"gelaufen", tts:"gelaufen", pfad:[{r:6,c:8},{r:2,c:6}]}, // wandern-Dino
  {wort:"laufen", tts:"laufen", pfad:[{r:6,c:8},{r:2,c:10}]}, // wandern-Sie
  {wort:"lauft", tts:"lauft", pfad:[{r:6,c:8},{r:2,c:9}]}, // wandern-ihr
  {wort:"laufe", tts:"laufe", pfad:[{r:6,c:8},{r:2,c:1}]}, // wandern-ich
  {wort:"läufst", tts:"läufst", pfad:[{r:6,c:8},{r:2,c:2}]}, // wandern-du
  {wort:"läuft", tts:"läuft", pfad:[{r:6,c:8},{r:2,c:3}]}, // wandern-er
  {wort:"läuft", tts:"läuft", pfad:[{r:6,c:8},{r:2,c:4}]}, // wandern-sie
  {wort:"läuft", tts:"läuft", pfad:[{r:6,c:8},{r:2,c:5}]}, // wandern-es
  {wort:"laufen", tts:"laufen", pfad:[{r:6,c:8},{r:2,c:8}]}, // wandern-wir
  {wort:"gehen", tts:"gehen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"renn", tts:"renn", pfad:[{r:6,c:6},{r:1,c:5}]}, // Dieb-Zauberer
  {wort:"gerannt", tts:"gerannt", pfad:[{r:6,c:6},{r:2,c:6}]}, // Dieb-Dino
  {wort:"rennen", tts:"rennen", pfad:[{r:6,c:6},{r:2,c:10}]}, // Dieb-Sie
  {wort:"rennt", tts:"rennt", pfad:[{r:6,c:6},{r:2,c:9}]}, // Dieb-ihr
  {wort:"renne", tts:"renne", pfad:[{r:6,c:6},{r:2,c:1}]}, // Dieb-ich
  {wort:"rennst", tts:"rennst", pfad:[{r:6,c:6},{r:2,c:2}]}, // Dieb-du
  {wort:"rennt", tts:"rennt", pfad:[{r:6,c:6},{r:2,c:3}]}, // Dieb-er
  {wort:"rennt", tts:"rennt", pfad:[{r:6,c:6},{r:2,c:4}]}, // Dieb-sie
  {wort:"rennt", tts:"rennt", pfad:[{r:6,c:6},{r:2,c:5}]}, // Dieb-es
  {wort:"rennen", tts:"rennen", pfad:[{r:6,c:6},{r:2,c:8}]}, // Dieb-wir
  {wort:"geht", tts:"geht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"gehe", tts:"gehe", pfad:[{r:2,c:1}]}, // ich
  {wort:"gehst", tts:"gehst", pfad:[{r:2,c:2}]}, // du
  {wort:"geht", tts:"geht", pfad:[{r:2,c:3}]}, // er
  {wort:"geht", tts:"geht", pfad:[{r:2,c:4}]}, // sie
  {wort:"geht", tts:"geht", pfad:[{r:2,c:5}]}, // es
  {wort:"sechstf", tts:"sechstf", pfad:[{r:2,c:6},{r:3,c:10}]}, // Dino-Lupe
  {wort:"einf", tts:"einf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"zweitf", tts:"zweitf", pfad:[{r:2,c:2},{r:3,c:10}]}, // du-Lupe
  {wort:"viertf", tts:"viertf", pfad:[{r:2,c:4},{r:3,c:10}]}, // sie-Lupe
  {wort:"fünftf", tts:"fünftf", pfad:[{r:2,c:5},{r:3,c:10}]}, // es-Lupe
  {wort:"achtf", tts:"achtf", pfad:[{r:2,c:8},{r:3,c:10}]}, // wir-Lupe
  {wort:"Sie wohnen", tts:"Sie wohnen", pfad:[{r:3,c:2}]}, // Haus
  {wort:"Sie machen", tts:"Sie machen", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"Sie lassen", tts:"Sie lassen", pfad:[{r:3,c:4}]}, // Minus
  {wort:"Sie brauchen", tts:"Sie brauchen", pfad:[{r:3,c:5}]}, // Plus
  {wort:"Sie sollen", tts:"Sie sollen", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"Sie wollen", tts:"Sie wollen", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"Sie hören", tts:"Sie hören", pfad:[{r:3,c:9}]}, // Talker
  {wort:"Sie geben", tts:"Sie geben", pfad:[{r:4,c:8}]}, // Ball
  {wort:"Sie riechen", tts:"Sie riechen", pfad:[{r:4,c:1}]}, // Blume
  {wort:"Sie kommen", tts:"Sie kommen", pfad:[{r:4,c:2}]}, // Leute
  {wort:"Sie dürfen", tts:"Sie dürfen", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"Sie malen", tts:"Sie malen", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"Sie lernen", tts:"Sie lernen", pfad:[{r:4,c:5}]}, // Schule
  {wort:"Sie möchten", tts:"Sie möchten", pfad:[{r:4,c:6}]}, // Herz
  {wort:"Sie lesen", tts:"Sie lesen", pfad:[{r:4,c:7}]}, // Buch
  {wort:"Sie spielen", tts:"Sie spielen", pfad:[{r:4,c:3}]}, // Lego
  {wort:"Sie waren", tts:"Sie waren", pfad:[{r:2,c:6}]}, // Dino
  {wort:"Sie essen", tts:"Sie essen", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"Sie trinken", tts:"Sie trinken", pfad:[{r:5,c:2}]}, // Saft
  {wort:"Sie fahren", tts:"Sie fahren", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"Sie ziehen", tts:"Sie ziehen", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"Sie scheinen", tts:"Sie scheinen", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"Sie haben", tts:"Sie haben", pfad:[{r:5,c:6}]}, // Geld
  {wort:"Sie zählen", tts:"Sie zählen", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"Sie gehen", tts:"Sie gehen", pfad:[{r:6,c:8}]}, // wandern
  {wort:"Ihrf", tts:"Ihrf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"SieÈýE0Sie schreiben", tts:"SieÈýE0Sie schreiben", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Sie schreiben", tts:"Sie schreiben", pfad:[{r:6,c:1}]}, // Maus
  {wort:"Sie können", tts:"Sie können", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"Sie mögen", tts:"Sie mögen", pfad:[{r:6,c:2}]}, // Baby
  {wort:"Sie sehen", tts:"Sie sehen", pfad:[{r:6,c:4}]}, // TV
  {wort:"Sie schlafen", tts:"Sie schlafen", pfad:[{r:6,c:3}]}, // Bett
  {wort:"Sie zeigen", tts:"Sie zeigen", pfad:[{r:6,c:7}]}, // Idee
  {wort:"Sie stehen", tts:"Sie stehen", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"sie sind", tts:"sie sind", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"Sie müssen", tts:"Sie müssen", pfad:[{r:5,c:8}]}, // Bad
  {wort:"gedrückt", tts:"gedrückt", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"drücken", tts:"drücken", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"drückt", tts:"drückt", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"drücke", tts:"drücke", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"drückst", tts:"drückst", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"drückt", tts:"drückt", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"drückt", tts:"drückt", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"drückt", tts:"drückt", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"drücken", tts:"drücken", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"neuf", tts:"neuf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"neuf", tts:"neuf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"schreib", tts:"schreib", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"Internet", tts:"Internet", pfad:[{r:3,c:9}]}, // Talker
  {wort:"druck", tts:"druck", pfad:[{r:4,c:7},{r:1,c:5}]}, // Buch-Zauberer
  {wort:"gedruckt", tts:"gedruckt", pfad:[{r:4,c:7},{r:2,c:6}]}, // Buch-Dino
  {wort:"drucken", tts:"drucken", pfad:[{r:4,c:7},{r:2,c:10}]}, // Buch-Sie
  {wort:"druckt", tts:"druckt", pfad:[{r:4,c:7},{r:2,c:9}]}, // Buch-ihr
  {wort:"drucke", tts:"drucke", pfad:[{r:4,c:7},{r:2,c:1}]}, // Buch-ich
  {wort:"druckst", tts:"druckst", pfad:[{r:4,c:7},{r:2,c:2}]}, // Buch-du
  {wort:"druckt", tts:"druckt", pfad:[{r:4,c:7},{r:2,c:3}]}, // Buch-er
  {wort:"druckt", tts:"druckt", pfad:[{r:4,c:7},{r:2,c:4}]}, // Buch-sie
  {wort:"druckt", tts:"druckt", pfad:[{r:4,c:7},{r:2,c:5}]}, // Buch-es
  {wort:"drucken", tts:"drucken", pfad:[{r:4,c:7},{r:2,c:8}]}, // Buch-wir
  {wort:"Computerspiel", tts:"Computerspiel", pfad:[{r:4,c:3}]}, // Lego
  {wort:"geschrieben", tts:"geschrieben", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schreiben", tts:"schreiben", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Programm", tts:"Programm", pfad:[{r:6,c:4}]}, // TV
  {wort:"Technik", tts:"Technik", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"schreibt", tts:"schreibt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"schreibe", tts:"schreibe", pfad:[{r:2,c:1}]}, // ich
  {wort:"schreibst", tts:"schreibst", pfad:[{r:2,c:2}]}, // du
  {wort:"schreibt", tts:"schreibt", pfad:[{r:2,c:3}]}, // er
  {wort:"schreibt", tts:"schreibt", pfad:[{r:2,c:4}]}, // sie
  {wort:"schreibt", tts:"schreibt", pfad:[{r:2,c:5}]}, // es
  {wort:"dünnf", tts:"dünnf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"frier", tts:"frier", pfad:[{r:3,c:4},{r:1,c:5}]}, // Minus-Zauberer
  {wort:"gefroren", tts:"gefroren", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"dünnf", tts:"dünnf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"frieren", tts:"frieren", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"friert", tts:"friert", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"friere", tts:"friere", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"frierst", tts:"frierst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"friert", tts:"friert", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"friert", tts:"friert", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"friert", tts:"friert", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"frieren", tts:"frieren", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"dickf", tts:"dickf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"dickf", tts:"dickf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"gekonnt", tts:"gekonnt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schwitz", tts:"schwitz", pfad:[{r:5,c:5},{r:1,c:5}]}, // Sonne-Zauberer
  {wort:"geschwitzt", tts:"geschwitzt", pfad:[{r:5,c:5},{r:2,c:6}]}, // Sonne-Dino
  {wort:"schwitzen", tts:"schwitzen", pfad:[{r:5,c:5},{r:2,c:10}]}, // Sonne-Sie
  {wort:"schwitzt", tts:"schwitzt", pfad:[{r:5,c:5},{r:2,c:9}]}, // Sonne-ihr
  {wort:"schwitze", tts:"schwitze", pfad:[{r:5,c:5},{r:2,c:1}]}, // Sonne-ich
  {wort:"schwitzt", tts:"schwitzt", pfad:[{r:5,c:5},{r:2,c:2}]}, // Sonne-du
  {wort:"schwitzt", tts:"schwitzt", pfad:[{r:5,c:5},{r:2,c:3}]}, // Sonne-er
  {wort:"schwitzt", tts:"schwitzt", pfad:[{r:5,c:5},{r:2,c:4}]}, // Sonne-sie
  {wort:"schwitzt", tts:"schwitzt", pfad:[{r:5,c:5},{r:2,c:5}]}, // Sonne-es
  {wort:"schwitzen", tts:"schwitzen", pfad:[{r:5,c:5},{r:2,c:8}]}, // Sonne-wir
  {wort:"freif", tts:"freif", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"können", tts:"können", pfad:[{r:2,c:10}]}, // Sie
  {wort:"Körper", tts:"Körper", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"könnt", tts:"könnt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"kann", tts:"kann", pfad:[{r:2,c:1}]}, // ich
  {wort:"kannst", tts:"kannst", pfad:[{r:2,c:2}]}, // du
  {wort:"kann", tts:"kann", pfad:[{r:2,c:3}]}, // er
  {wort:"kann", tts:"kann", pfad:[{r:2,c:4}]}, // sie
  {wort:"kann", tts:"kann", pfad:[{r:2,c:5}]}, // es
  {wort:"gehalten", tts:"gehalten", pfad:[{r:3,c:3},{r:2,c:6}]}, // Hammer-Dino
  {wort:"halten", tts:"halten", pfad:[{r:3,c:3},{r:2,c:10}]}, // Hammer-Sie
  {wort:"haltet", tts:"haltet", pfad:[{r:3,c:3},{r:2,c:9}]}, // Hammer-ihr
  {wort:"halte", tts:"halte", pfad:[{r:3,c:3},{r:2,c:1}]}, // Hammer-ich
  {wort:"hältst", tts:"hältst", pfad:[{r:3,c:3},{r:2,c:2}]}, // Hammer-du
  {wort:"hält", tts:"hält", pfad:[{r:3,c:3},{r:2,c:3}]}, // Hammer-er
  {wort:"hält", tts:"hält", pfad:[{r:3,c:3},{r:2,c:4}]}, // Hammer-sie
  {wort:"hält", tts:"hält", pfad:[{r:3,c:3},{r:2,c:5}]}, // Hammer-es
  {wort:"halten", tts:"halten", pfad:[{r:3,c:3},{r:2,c:8}]}, // Hammer-wir
  {wort:"kleinf", tts:"kleinf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"kleinf", tts:"kleinf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"großf", tts:"großf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"großf", tts:"großf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"küss", tts:"küss", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"geküsst", tts:"geküsst", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"küssen", tts:"küssen", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"Kuss", tts:"Kuss", pfad:[{r:4,c:6},{r:2,c:7}]}, // Herz-Einzahl
  {wort:"küsst", tts:"küsst", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"küsse", tts:"küsse", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"küsst", tts:"küsst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"küsst", tts:"küsst", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"küsst", tts:"küsst", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"küsst", tts:"küsst", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"küssen", tts:"küssen", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"Mutter", tts:"Mutter", pfad:[{r:6,c:8},{r:1,c:1}]}, // wandern-Haus
  {wort:"Tante", tts:"Tante", pfad:[{r:6,c:8},{r:5,c:4}]}, // wandern-Elefant
  {wort:"Schwester", tts:"Schwester", pfad:[{r:6,c:8},{r:6,c:8}]}, // wandern-wandern
  {wort:"weichf", tts:"weichf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"mögen", tts:"mögen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"kuschel", tts:"kuschel", pfad:[{r:6,c:2},{r:1,c:5}]}, // Baby-Zauberer
  {wort:"gekuschelt", tts:"gekuschelt", pfad:[{r:6,c:2},{r:2,c:6}]}, // Baby-Dino
  {wort:"kuscheln", tts:"kuscheln", pfad:[{r:6,c:2},{r:2,c:10}]}, // Baby-Sie
  {wort:"kuschelt", tts:"kuschelt", pfad:[{r:6,c:2},{r:2,c:9}]}, // Baby-ihr
  {wort:"kuschele", tts:"kuschele", pfad:[{r:6,c:2},{r:2,c:1}]}, // Baby-ich
  {wort:"kuschelst", tts:"kuschelst", pfad:[{r:6,c:2},{r:2,c:2}]}, // Baby-du
  {wort:"kuschelt", tts:"kuschelt", pfad:[{r:6,c:2},{r:2,c:3}]}, // Baby-er
  {wort:"kuschelt", tts:"kuschelt", pfad:[{r:6,c:2},{r:2,c:4}]}, // Baby-sie
  {wort:"kuschelt", tts:"kuschelt", pfad:[{r:6,c:2},{r:2,c:5}]}, // Baby-es
  {wort:"kuscheln", tts:"kuscheln", pfad:[{r:6,c:2},{r:2,c:8}]}, // Baby-wir
  {wort:"gelegt", tts:"gelegt", pfad:[{r:6,c:3},{r:2,c:6}]}, // Bett-Dino
  {wort:"legen", tts:"legen", pfad:[{r:6,c:3},{r:2,c:10}]}, // Bett-Sie
  {wort:"legt", tts:"legt", pfad:[{r:6,c:3},{r:2,c:9}]}, // Bett-ihr
  {wort:"lege", tts:"lege", pfad:[{r:6,c:3},{r:2,c:1}]}, // Bett-ich
  {wort:"legst", tts:"legst", pfad:[{r:6,c:3},{r:2,c:2}]}, // Bett-du
  {wort:"legt", tts:"legt", pfad:[{r:6,c:3},{r:2,c:3}]}, // Bett-er
  {wort:"legt", tts:"legt", pfad:[{r:6,c:3},{r:2,c:4}]}, // Bett-sie
  {wort:"legt", tts:"legt", pfad:[{r:6,c:3},{r:2,c:5}]}, // Bett-es
  {wort:"legen", tts:"legen", pfad:[{r:6,c:3},{r:2,c:8}]}, // Bett-wir
  {wort:"Vater", tts:"Vater", pfad:[{r:6,c:7},{r:1,c:1}]}, // Idee-Haus
  {wort:"Onkel", tts:"Onkel", pfad:[{r:6,c:7},{r:5,c:4}]}, // Idee-Elefant
  {wort:"Bruder", tts:"Bruder", pfad:[{r:6,c:7},{r:6,c:7}]}, // Idee-Idee
  {wort:"Familie", tts:"Familie", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"mögt", tts:"mögt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"mag", tts:"mag", pfad:[{r:2,c:1}]}, // ich
  {wort:"magst", tts:"magst", pfad:[{r:2,c:2}]}, // du
  {wort:"mag", tts:"mag", pfad:[{r:2,c:3}]}, // er
  {wort:"mag", tts:"mag", pfad:[{r:2,c:4}]}, // sie
  {wort:"mag", tts:"mag", pfad:[{r:2,c:5}]}, // es
  {wort:"leisef", tts:"leisef", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"leisef", tts:"leisef", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"lautf", tts:"lautf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"lautf", tts:"lautf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"Musik", tts:"Musik", pfad:[{r:4,c:6}]}, // Herz
  {wort:"gesehen", tts:"gesehen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"sehen", tts:"sehen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"guck", tts:"guck", pfad:[{r:6,c:4},{r:1,c:5}]}, // TV-Zauberer
  {wort:"geguckt", tts:"geguckt", pfad:[{r:6,c:4},{r:2,c:6}]}, // TV-Dino
  {wort:"gucken", tts:"gucken", pfad:[{r:6,c:4},{r:2,c:10}]}, // TV-Sie
  {wort:"guckt", tts:"guckt", pfad:[{r:6,c:4},{r:2,c:9}]}, // TV-ihr
  {wort:"gucke", tts:"gucke", pfad:[{r:6,c:4},{r:2,c:1}]}, // TV-ich
  {wort:"guckst", tts:"guckst", pfad:[{r:6,c:4},{r:2,c:2}]}, // TV-du
  {wort:"guckt", tts:"guckt", pfad:[{r:6,c:4},{r:2,c:3}]}, // TV-er
  {wort:"guckt", tts:"guckt", pfad:[{r:6,c:4},{r:2,c:4}]}, // TV-sie
  {wort:"guckt", tts:"guckt", pfad:[{r:6,c:4},{r:2,c:5}]}, // TV-es
  {wort:"gucken", tts:"gucken", pfad:[{r:6,c:4},{r:2,c:8}]}, // TV-wir
  {wort:"ruhigf", tts:"ruhigf", pfad:[{r:6,c:3},{r:3,c:10}]}, // Bett-Lupe
  {wort:"ruhigf", tts:"ruhigf", pfad:[{r:6,c:3},{r:6,c:3}]}, // Bett-Bett
  {wort:"fernsehen", tts:"fernsehen", pfad:[{r:6,c:6},{r:2,c:10}]}, // Dieb-Sie
  {wort:"fernsehen", tts:"fernsehen", pfad:[{r:6,c:6},{r:2,c:8}]}, // Dieb-wir
  {wort:"seht", tts:"seht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"sehe", tts:"sehe", pfad:[{r:2,c:1}]}, // ich
  {wort:"siehst", tts:"siehst", pfad:[{r:2,c:2}]}, // du
  {wort:"sieht", tts:"sieht", pfad:[{r:2,c:3}]}, // er
  {wort:"sieht", tts:"sieht", pfad:[{r:2,c:4}]}, // sie
  {wort:"sieht", tts:"sieht", pfad:[{r:2,c:5}]}, // es
  {wort:"spätf", tts:"spätf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"spätf", tts:"spätf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"frühf", tts:"frühf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"frühf", tts:"frühf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"geschlafen", tts:"geschlafen", pfad:[{r:2,c:6}]}, // Dino
  {wort:"schlafen", tts:"schlafen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"lieg", tts:"lieg", pfad:[{r:6,c:3},{r:1,c:5}]}, // Bett-Zauberer
  {wort:"gelegen", tts:"gelegen", pfad:[{r:6,c:3},{r:2,c:6}]}, // Bett-Dino
  {wort:"liegen", tts:"liegen", pfad:[{r:6,c:3},{r:2,c:10}]}, // Bett-Sie
  {wort:"liegt", tts:"liegt", pfad:[{r:6,c:3},{r:2,c:9}]}, // Bett-ihr
  {wort:"liege", tts:"liege", pfad:[{r:6,c:3},{r:2,c:1}]}, // Bett-ich
  {wort:"liegst", tts:"liegst", pfad:[{r:6,c:3},{r:2,c:2}]}, // Bett-du
  {wort:"liegt", tts:"liegt", pfad:[{r:6,c:3},{r:2,c:3}]}, // Bett-er
  {wort:"liegt", tts:"liegt", pfad:[{r:6,c:3},{r:2,c:4}]}, // Bett-sie
  {wort:"liegt", tts:"liegt", pfad:[{r:6,c:3},{r:2,c:5}]}, // Bett-es
  {wort:"liegen", tts:"liegen", pfad:[{r:6,c:3},{r:2,c:8}]}, // Bett-wir
  {wort:"Möbel", tts:"Möbel", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"schlaft", tts:"schlaft", pfad:[{r:2,c:9}]}, // ihr
  {wort:"schlafe", tts:"schlafe", pfad:[{r:2,c:1}]}, // ich
  {wort:"schläfst", tts:"schläfst", pfad:[{r:2,c:2}]}, // du
  {wort:"schläft", tts:"schläft", pfad:[{r:2,c:3}]}, // er
  {wort:"schläft", tts:"schläft", pfad:[{r:2,c:4}]}, // sie
  {wort:"schläft", tts:"schläft", pfad:[{r:2,c:5}]}, // es
  {wort:"vergiss", tts:"vergiss", pfad:[{r:3,c:4},{r:1,c:5}]}, // Minus-Zauberer
  {wort:"vergessen", tts:"vergessen", pfad:[{r:3,c:4},{r:2,c:6}]}, // Minus-Dino
  {wort:"vergessen", tts:"vergessen", pfad:[{r:3,c:4},{r:2,c:10}]}, // Minus-Sie
  {wort:"vergesst", tts:"vergesst", pfad:[{r:3,c:4},{r:2,c:9}]}, // Minus-ihr
  {wort:"vergesse", tts:"vergesse", pfad:[{r:3,c:4},{r:2,c:1}]}, // Minus-ich
  {wort:"vergisst", tts:"vergisst", pfad:[{r:3,c:4},{r:2,c:2}]}, // Minus-du
  {wort:"vergisst", tts:"vergisst", pfad:[{r:3,c:4},{r:2,c:3}]}, // Minus-er
  {wort:"vergisst", tts:"vergisst", pfad:[{r:3,c:4},{r:2,c:4}]}, // Minus-sie
  {wort:"vergisst", tts:"vergisst", pfad:[{r:3,c:4},{r:2,c:5}]}, // Minus-es
  {wort:"vergessen", tts:"vergessen", pfad:[{r:3,c:4},{r:2,c:8}]}, // Minus-wir
  {wort:"zeig", tts:"zeig", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"versteh", tts:"versteh", pfad:[{r:4,c:5},{r:1,c:5}]}, // Schule-Zauberer
  {wort:"verstanden", tts:"verstanden", pfad:[{r:4,c:5},{r:2,c:6}]}, // Schule-Dino
  {wort:"verstehen", tts:"verstehen", pfad:[{r:4,c:5},{r:2,c:10}]}, // Schule-Sie
  {wort:"Problem", tts:"Problem", pfad:[{r:4,c:5},{r:5,c:8}]}, // Schule-Bad
  {wort:"versteht", tts:"versteht", pfad:[{r:4,c:5},{r:2,c:9}]}, // Schule-ihr
  {wort:"verstehe", tts:"verstehe", pfad:[{r:4,c:5},{r:2,c:1}]}, // Schule-ich
  {wort:"verstehst", tts:"verstehst", pfad:[{r:4,c:5},{r:2,c:2}]}, // Schule-du
  {wort:"versteht", tts:"versteht", pfad:[{r:4,c:5},{r:2,c:3}]}, // Schule-er
  {wort:"versteht", tts:"versteht", pfad:[{r:4,c:5},{r:2,c:4}]}, // Schule-sie
  {wort:"versteht", tts:"versteht", pfad:[{r:4,c:5},{r:2,c:5}]}, // Schule-es
  {wort:"verstehen", tts:"verstehen", pfad:[{r:4,c:5},{r:2,c:8}]}, // Schule-wir
  {wort:"glaub", tts:"glaub", pfad:[{r:4,c:6},{r:1,c:5}]}, // Herz-Zauberer
  {wort:"geglaubt", tts:"geglaubt", pfad:[{r:4,c:6},{r:2,c:6}]}, // Herz-Dino
  {wort:"glauben", tts:"glauben", pfad:[{r:4,c:6},{r:2,c:10}]}, // Herz-Sie
  {wort:"glaubt", tts:"glaubt", pfad:[{r:4,c:6},{r:2,c:9}]}, // Herz-ihr
  {wort:"glaube", tts:"glaube", pfad:[{r:4,c:6},{r:2,c:1}]}, // Herz-ich
  {wort:"glaubst", tts:"glaubst", pfad:[{r:4,c:6},{r:2,c:2}]}, // Herz-du
  {wort:"glaubt", tts:"glaubt", pfad:[{r:4,c:6},{r:2,c:3}]}, // Herz-er
  {wort:"glaubt", tts:"glaubt", pfad:[{r:4,c:6},{r:2,c:4}]}, // Herz-sie
  {wort:"glaubt", tts:"glaubt", pfad:[{r:4,c:6},{r:2,c:5}]}, // Herz-es
  {wort:"glauben", tts:"glauben", pfad:[{r:4,c:6},{r:2,c:8}]}, // Herz-wir
  {wort:"gewusst", tts:"gewusst", pfad:[{r:4,c:7},{r:2,c:6}]}, // Buch-Dino
  {wort:"wissen", tts:"wissen", pfad:[{r:4,c:7},{r:2,c:10}]}, // Buch-Sie
  {wort:"wisst", tts:"wisst", pfad:[{r:4,c:7},{r:2,c:9}]}, // Buch-ihr
  {wort:"weiß", tts:"weiß", pfad:[{r:4,c:7},{r:2,c:1}]}, // Buch-ich
  {wort:"weißt", tts:"weißt", pfad:[{r:4,c:7},{r:2,c:2}]}, // Buch-du
  {wort:"weiß", tts:"weiß", pfad:[{r:4,c:7},{r:2,c:3}]}, // Buch-er
  {wort:"weiß", tts:"weiß", pfad:[{r:4,c:7},{r:2,c:4}]}, // Buch-sie
  {wort:"weiß", tts:"weiß", pfad:[{r:4,c:7},{r:2,c:5}]}, // Buch-es
  {wort:"wissen", tts:"wissen", pfad:[{r:4,c:7},{r:2,c:8}]}, // Buch-wir
  {wort:"gezeigt", tts:"gezeigt", pfad:[{r:2,c:6}]}, // Dino
  {wort:"klugf", tts:"klugf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"zeigen", tts:"zeigen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"interessantf", tts:"interessantf", pfad:[{r:6,c:4},{r:3,c:10}]}, // TV-Lupe
  {wort:"interessantf", tts:"interessantf", pfad:[{r:6,c:4},{r:6,c:4}]}, // TV-TV
  {wort:"langweiligf", tts:"langweiligf", pfad:[{r:6,c:3},{r:3,c:10}]}, // Bett-Lupe
  {wort:"langweiligf", tts:"langweiligf", pfad:[{r:6,c:3},{r:6,c:3}]}, // Bett-Bett
  {wort:"gedacht", tts:"gedacht", pfad:[{r:6,c:7},{r:2,c:6}]}, // Idee-Dino
  {wort:"denken", tts:"denken", pfad:[{r:6,c:7},{r:2,c:10}]}, // Idee-Sie
  {wort:"Gedanke", tts:"Gedanke", pfad:[{r:6,c:7},{r:2,c:7}]}, // Idee-Einzahl
  {wort:"denkt", tts:"denkt", pfad:[{r:6,c:7},{r:2,c:9}]}, // Idee-ihr
  {wort:"denke", tts:"denke", pfad:[{r:6,c:7},{r:2,c:1}]}, // Idee-ich
  {wort:"denkst", tts:"denkst", pfad:[{r:6,c:7},{r:2,c:2}]}, // Idee-du
  {wort:"denkt", tts:"denkt", pfad:[{r:6,c:7},{r:2,c:3}]}, // Idee-er
  {wort:"denkt", tts:"denkt", pfad:[{r:6,c:7},{r:2,c:4}]}, // Idee-sie
  {wort:"denkt", tts:"denkt", pfad:[{r:6,c:7},{r:2,c:5}]}, // Idee-es
  {wort:"denken", tts:"denken", pfad:[{r:6,c:7},{r:2,c:8}]}, // Idee-wir
  {wort:"Idee", tts:"Idee", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"zeigt", tts:"zeigt", pfad:[{r:2,c:9}]}, // ihr
  {wort:"zeige", tts:"zeige", pfad:[{r:2,c:1}]}, // ich
  {wort:"zeigst", tts:"zeigst", pfad:[{r:2,c:2}]}, // du
  {wort:"zeigt", tts:"zeigt", pfad:[{r:2,c:3}]}, // er
  {wort:"zeigt", tts:"zeigt", pfad:[{r:2,c:4}]}, // sie
  {wort:"zeigt", tts:"zeigt", pfad:[{r:2,c:5}]}, // es
  {wort:"schlimmf", tts:"schlimmf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"schlimmf", tts:"schlimmf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"gestanden", tts:"gestanden", pfad:[{r:2,c:6}]}, // Dino
  {wort:"gefährlichf", tts:"gefährlichf", pfad:[{r:5,c:3},{r:5,c:3}]}, // Taxi-Taxi
  {wort:"gefährlichf", tts:"gefährlichf", pfad:[{r:5,c:3},{r:3,c:10}]}, // Taxi-Lupe
  {wort:"Gefahr", tts:"Gefahr", pfad:[{r:5,c:3},{r:2,c:7}]}, // Taxi-Einzahl
  {wort:"jag", tts:"jag", pfad:[{r:5,c:4},{r:1,c:5}]}, // Elefant-Zauberer
  {wort:"gejagt", tts:"gejagt", pfad:[{r:5,c:4},{r:2,c:6}]}, // Elefant-Dino
  {wort:"jagen", tts:"jagen", pfad:[{r:5,c:4},{r:2,c:10}]}, // Elefant-Sie
  {wort:"Jagd", tts:"Jagd", pfad:[{r:5,c:4},{r:2,c:7}]}, // Elefant-Einzahl
  {wort:"jagt", tts:"jagt", pfad:[{r:5,c:4},{r:2,c:9}]}, // Elefant-ihr
  {wort:"jage", tts:"jage", pfad:[{r:5,c:4},{r:2,c:1}]}, // Elefant-ich
  {wort:"jagst", tts:"jagst", pfad:[{r:5,c:4},{r:2,c:2}]}, // Elefant-du
  {wort:"jagt", tts:"jagt", pfad:[{r:5,c:4},{r:2,c:3}]}, // Elefant-er
  {wort:"jagt", tts:"jagt", pfad:[{r:5,c:4},{r:2,c:4}]}, // Elefant-sie
  {wort:"jagt", tts:"jagt", pfad:[{r:5,c:4},{r:2,c:5}]}, // Elefant-es
  {wort:"jagen", tts:"jagen", pfad:[{r:5,c:4},{r:2,c:8}]}, // Elefant-wir
  {wort:"bösef", tts:"bösef", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"stehen", tts:"stehen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"sitz", tts:"sitz", pfad:[{r:6,c:2},{r:1,c:5}]}, // Baby-Zauberer
  {wort:"gesessen", tts:"gesessen", pfad:[{r:6,c:2},{r:2,c:6}]}, // Baby-Dino
  {wort:"sitzen", tts:"sitzen", pfad:[{r:6,c:2},{r:2,c:10}]}, // Baby-Sie
  {wort:"sitzt", tts:"sitzt", pfad:[{r:6,c:2},{r:2,c:9}]}, // Baby-ihr
  {wort:"sitze", tts:"sitze", pfad:[{r:6,c:2},{r:2,c:1}]}, // Baby-ich
  {wort:"sitzt", tts:"sitzt", pfad:[{r:6,c:2},{r:2,c:2}]}, // Baby-du
  {wort:"sitzt", tts:"sitzt", pfad:[{r:6,c:2},{r:2,c:3}]}, // Baby-er
  {wort:"sitzt", tts:"sitzt", pfad:[{r:6,c:2},{r:2,c:4}]}, // Baby-sie
  {wort:"sitzt", tts:"sitzt", pfad:[{r:6,c:2},{r:2,c:5}]}, // Baby-es
  {wort:"sitzen", tts:"sitzen", pfad:[{r:6,c:2},{r:2,c:8}]}, // Baby-wir
  {wort:"schieb", tts:"schieb", pfad:[{r:6,c:6},{r:1,c:5}]}, // Dieb-Zauberer
  {wort:"geschoben", tts:"geschoben", pfad:[{r:6,c:6},{r:2,c:6}]}, // Dieb-Dino
  {wort:"gemeinf", tts:"gemeinf", pfad:[{r:6,c:6},{r:3,c:10}]}, // Dieb-Lupe
  {wort:"schieben", tts:"schieben", pfad:[{r:6,c:6},{r:2,c:10}]}, // Dieb-Sie
  {wort:"gemeinf", tts:"gemeinf", pfad:[{r:6,c:6},{r:6,c:6}]}, // Dieb-Dieb
  {wort:"schiebt", tts:"schiebt", pfad:[{r:6,c:6},{r:2,c:9}]}, // Dieb-ihr
  {wort:"schiebe", tts:"schiebe", pfad:[{r:6,c:6},{r:2,c:1}]}, // Dieb-ich
  {wort:"schiebst", tts:"schiebst", pfad:[{r:6,c:6},{r:2,c:2}]}, // Dieb-du
  {wort:"schiebt", tts:"schiebt", pfad:[{r:6,c:6},{r:2,c:3}]}, // Dieb-er
  {wort:"schiebt", tts:"schiebt", pfad:[{r:6,c:6},{r:2,c:4}]}, // Dieb-sie
  {wort:"schiebt", tts:"schiebt", pfad:[{r:6,c:6},{r:2,c:5}]}, // Dieb-es
  {wort:"schieben", tts:"schieben", pfad:[{r:6,c:6},{r:2,c:8}]}, // Dieb-wir
  {wort:"steht", tts:"steht", pfad:[{r:2,c:9}]}, // ihr
  {wort:"stehe", tts:"stehe", pfad:[{r:2,c:1}]}, // ich
  {wort:"stehst", tts:"stehst", pfad:[{r:2,c:2}]}, // du
  {wort:"steht", tts:"steht", pfad:[{r:2,c:3}]}, // er
  {wort:"steht", tts:"steht", pfad:[{r:2,c:4}]}, // sie
  {wort:"steht", tts:"steht", pfad:[{r:2,c:5}]}, // es
  {wort:"sei", tts:"sei", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"letztf", tts:"letztf", pfad:[{r:3,c:6},{r:3,c:10}]}, // Turm-Lupe
  {wort:"nichtsÈýMallem", tts:"nichtsÈýMallem", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"allf", tts:"allf", pfad:[{r:3,c:9},{r:3,c:10}]}, // Talker-Lupe
  {wort:"einigf", tts:"einigf", pfad:[{r:4,c:8},{r:3,c:10}]}, // Ball-Lupe
  {wort:"jedf", tts:"jedf", pfad:[{r:3,c:7},{r:3,c:10}]}, // Ampel-Lupe
  {wort:"selbstÈýEirgendÈýMdiese", tts:"selbstÈýEirgendÈýMdiese", pfad:[{r:4,c:5}]}, // Schule
  {wort:"irgendÈýMdiese", tts:"irgendÈýMdiese", pfad:[{r:4,c:7}]}, // Buch
  {wort:"etwasÈýE&ein paarÈýM'keinem", tts:"etwasÈýE&ein paarÈýM'keinem", pfad:[{r:5,c:2}]}, // Saft
  {wort:"ein paarÈýM'keinem", tts:"ein paarÈýM'keinem", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"keinf", tts:"keinf", pfad:[{r:6,c:8},{r:6,c:8}]}, // wandern-wandern
  {wort:"keinf", tts:"keinf", pfad:[{r:6,c:8},{r:3,c:10}]}, // wandern-Lupe
  {wort:"diesf", tts:"diesf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"sind", tts:"sind", pfad:[{r:2,c:10}]}, // Sie
  {wort:"sichÈýE5manÈýE6Ding", tts:"sichÈýE5manÈýE6Ding", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"manÈýE6Ding", tts:"manÈýE6Ding", pfad:[{r:6,c:7}]}, // Idee
  {wort:"Ding", tts:"Ding", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"sein", tts:"sein", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"seid", tts:"seid", pfad:[{r:2,c:9}]}, // ihr
  {wort:"bin", tts:"bin", pfad:[{r:2,c:1}]}, // ich
  {wort:"bist", tts:"bist", pfad:[{r:2,c:2}]}, // du
  {wort:"ist", tts:"ist", pfad:[{r:2,c:3}]}, // er
  {wort:"ist", tts:"ist", pfad:[{r:2,c:4}]}, // sie
  {wort:"ist", tts:"ist", pfad:[{r:2,c:5}]}, // es
  {wort:"schmutzigf", tts:"schmutzigf", pfad:[{r:3,c:4},{r:1,c:3}]}, // Minus-Minus
  {wort:"schmutzigf", tts:"schmutzigf", pfad:[{r:3,c:4},{r:3,c:10}]}, // Minus-Lupe
  {wort:"sauberf", tts:"sauberf", pfad:[{r:3,c:5},{r:1,c:4}]}, // Plus-Plus
  {wort:"sauberf", tts:"sauberf", pfad:[{r:3,c:5},{r:3,c:10}]}, // Plus-Lupe
  {wort:"dusch", tts:"dusch", pfad:[{r:4,c:4},{r:1,c:5}]}, // Farbe-Zauberer
  {wort:"geduscht", tts:"geduscht", pfad:[{r:4,c:4},{r:2,c:6}]}, // Farbe-Dino
  {wort:"duschen", tts:"duschen", pfad:[{r:4,c:4},{r:2,c:10}]}, // Farbe-Sie
  {wort:"duscht", tts:"duscht", pfad:[{r:4,c:4},{r:2,c:9}]}, // Farbe-ihr
  {wort:"dusche", tts:"dusche", pfad:[{r:4,c:4},{r:2,c:1}]}, // Farbe-ich
  {wort:"duschst", tts:"duschst", pfad:[{r:4,c:4},{r:2,c:2}]}, // Farbe-du
  {wort:"duscht", tts:"duscht", pfad:[{r:4,c:4},{r:2,c:3}]}, // Farbe-er
  {wort:"duscht", tts:"duscht", pfad:[{r:4,c:4},{r:2,c:4}]}, // Farbe-sie
  {wort:"duscht", tts:"duscht", pfad:[{r:4,c:4},{r:2,c:5}]}, // Farbe-es
  {wort:"duschen", tts:"duschen", pfad:[{r:4,c:4},{r:2,c:8}]}, // Farbe-wir
  {wort:"gemusst", tts:"gemusst", pfad:[{r:2,c:6}]}, // Dino
  {wort:"kaltf", tts:"kaltf", pfad:[{r:5,c:2},{r:5,c:2}]}, // Saft-Saft
  {wort:"kaltf", tts:"kaltf", pfad:[{r:5,c:2},{r:3,c:10}]}, // Saft-Lupe
  {wort:"heißf", tts:"heißf", pfad:[{r:5,c:5},{r:5,c:5}]}, // Sonne-Sonne
  {wort:"heißf", tts:"heißf", pfad:[{r:5,c:5},{r:3,c:10}]}, // Sonne-Lupe
  {wort:"müssen", tts:"müssen", pfad:[{r:2,c:10}]}, // Sie
  {wort:"bade", tts:"bade", pfad:[{r:6,c:5},{r:1,c:5}]}, // Freibad-Zauberer
  {wort:"gebadet", tts:"gebadet", pfad:[{r:6,c:5},{r:2,c:6}]}, // Freibad-Dino
  {wort:"warmf", tts:"warmf", pfad:[{r:6,c:5},{r:3,c:10}]}, // Freibad-Lupe
  {wort:"baden", tts:"baden", pfad:[{r:6,c:5},{r:2,c:10}]}, // Freibad-Sie
  {wort:"warmf", tts:"warmf", pfad:[{r:6,c:5},{r:6,c:5}]}, // Freibad-Freibad
  {wort:"badet", tts:"badet", pfad:[{r:6,c:5},{r:2,c:9}]}, // Freibad-ihr
  {wort:"bade", tts:"bade", pfad:[{r:6,c:5},{r:2,c:1}]}, // Freibad-ich
  {wort:"badest", tts:"badest", pfad:[{r:6,c:5},{r:2,c:2}]}, // Freibad-du
  {wort:"badet", tts:"badet", pfad:[{r:6,c:5},{r:2,c:3}]}, // Freibad-er
  {wort:"badet", tts:"badet", pfad:[{r:6,c:5},{r:2,c:4}]}, // Freibad-sie
  {wort:"badet", tts:"badet", pfad:[{r:6,c:5},{r:2,c:5}]}, // Freibad-es
  {wort:"baden", tts:"baden", pfad:[{r:6,c:5},{r:2,c:8}]}, // Freibad-wir
  {wort:"Pflege", tts:"Pflege", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"gewaschen", tts:"gewaschen", pfad:[{r:5,c:8},{r:2,c:6}]}, // Bad-Dino
  {wort:"waschen", tts:"waschen", pfad:[{r:5,c:8},{r:2,c:10}]}, // Bad-Sie
  {wort:"wascht", tts:"wascht", pfad:[{r:5,c:8},{r:2,c:9}]}, // Bad-ihr
  {wort:"wasche", tts:"wasche", pfad:[{r:5,c:8},{r:2,c:1}]}, // Bad-ich
  {wort:"wäschst", tts:"wäschst", pfad:[{r:5,c:8},{r:2,c:2}]}, // Bad-du
  {wort:"wäscht", tts:"wäscht", pfad:[{r:5,c:8},{r:2,c:3}]}, // Bad-er
  {wort:"wäscht", tts:"wäscht", pfad:[{r:5,c:8},{r:2,c:4}]}, // Bad-sie
  {wort:"wäscht", tts:"wäscht", pfad:[{r:5,c:8},{r:2,c:5}]}, // Bad-es
  {wort:"waschen", tts:"waschen", pfad:[{r:5,c:8},{r:2,c:8}]}, // Bad-wir
  {wort:"müsst", tts:"müsst", pfad:[{r:2,c:9}]}, // ihr
  {wort:"muss", tts:"muss", pfad:[{r:2,c:1}]}, // ich
  {wort:"musst", tts:"musst", pfad:[{r:2,c:2}]}, // du
  {wort:"muss", tts:"muss", pfad:[{r:2,c:3}]}, // er
  {wort:"muss", tts:"muss", pfad:[{r:2,c:4}]}, // sie
  {wort:"muss", tts:"muss", pfad:[{r:2,c:5}]}, // es
  {wort:"ihr wohnt", tts:"ihr wohnt", pfad:[{r:3,c:2}]}, // Haus
  {wort:"ihr macht", tts:"ihr macht", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"ihr braucht", tts:"ihr braucht", pfad:[{r:3,c:5}]}, // Plus
  {wort:"ihr sollt", tts:"ihr sollt", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"ihr wollt", tts:"ihr wollt", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"ihr hört", tts:"ihr hört", pfad:[{r:3,c:9}]}, // Talker
  {wort:"ihr gebt", tts:"ihr gebt", pfad:[{r:4,c:8}]}, // Ball
  {wort:"ihr riecht", tts:"ihr riecht", pfad:[{r:4,c:1}]}, // Blume
  {wort:"ihr kommt", tts:"ihr kommt", pfad:[{r:4,c:2}]}, // Leute
  {wort:"ihr dürft", tts:"ihr dürft", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"ihr malt", tts:"ihr malt", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"ihr lernt", tts:"ihr lernt", pfad:[{r:4,c:5}]}, // Schule
  {wort:"ihr möchtet", tts:"ihr möchtet", pfad:[{r:4,c:6}]}, // Herz
  {wort:"ihr lest", tts:"ihr lest", pfad:[{r:4,c:7}]}, // Buch
  {wort:"ihr spielt", tts:"ihr spielt", pfad:[{r:4,c:3}]}, // Lego
  {wort:"ihr wart", tts:"ihr wart", pfad:[{r:2,c:6}]}, // Dino
  {wort:"ihr esst", tts:"ihr esst", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"ihr trinkt", tts:"ihr trinkt", pfad:[{r:5,c:2}]}, // Saft
  {wort:"ihr fahrt", tts:"ihr fahrt", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"ihr zieht", tts:"ihr zieht", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"ihr scheint", tts:"ihr scheint", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"ihr habt", tts:"ihr habt", pfad:[{r:5,c:6}]}, // Geld
  {wort:"ihr zählt", tts:"ihr zählt", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"ihr geht", tts:"ihr geht", pfad:[{r:6,c:8}]}, // wandern
  {wort:"euerf", tts:"euerf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"ihr schreibt", tts:"ihr schreibt", pfad:[{r:6,c:1}]}, // Maus
  {wort:"ihr könnt", tts:"ihr könnt", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"ihr mögt", tts:"ihr mögt", pfad:[{r:6,c:2}]}, // Baby
  {wort:"ihr seht", tts:"ihr seht", pfad:[{r:6,c:4}]}, // TV
  {wort:"ihr schlaft", tts:"ihr schlaft", pfad:[{r:6,c:3}]}, // Bett
  {wort:"ihr zeigt", tts:"ihr zeigt", pfad:[{r:6,c:7}]}, // Idee
  {wort:"ihr steht", tts:"ihr steht", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"ihr seid", tts:"ihr seid", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"ihr müsst", tts:"ihr müsst", pfad:[{r:5,c:8}]}, // Bad
  {wort:"ihrÈýM@euren", tts:"ihrÈýM@euren", pfad:[{r:2,c:9}]}, // ihr
  {wort:"ich wohne", tts:"ich wohne", pfad:[{r:3,c:2}]}, // Haus
  {wort:"ich mache", tts:"ich mache", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"ich lasse", tts:"ich lasse", pfad:[{r:3,c:4}]}, // Minus
  {wort:"ich brauche", tts:"ich brauche", pfad:[{r:3,c:5}]}, // Plus
  {wort:"ich soll", tts:"ich soll", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"ich will", tts:"ich will", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"ich höre", tts:"ich höre", pfad:[{r:3,c:9}]}, // Talker
  {wort:"ich gebe", tts:"ich gebe", pfad:[{r:4,c:8}]}, // Ball
  {wort:"ich rieche", tts:"ich rieche", pfad:[{r:4,c:1}]}, // Blume
  {wort:"ich komme", tts:"ich komme", pfad:[{r:4,c:2}]}, // Leute
  {wort:"ich darf", tts:"ich darf", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"ich male", tts:"ich male", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"ich lerne", tts:"ich lerne", pfad:[{r:4,c:5}]}, // Schule
  {wort:"ich möchte", tts:"ich möchte", pfad:[{r:4,c:6}]}, // Herz
  {wort:"ich lese", tts:"ich lese", pfad:[{r:4,c:7}]}, // Buch
  {wort:"ich spiele", tts:"ich spiele", pfad:[{r:4,c:3}]}, // Lego
  {wort:"ich war", tts:"ich war", pfad:[{r:2,c:6}]}, // Dino
  {wort:"ich esse", tts:"ich esse", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"ich trinke", tts:"ich trinke", pfad:[{r:5,c:2}]}, // Saft
  {wort:"ich fahre", tts:"ich fahre", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"ich ziehe", tts:"ich ziehe", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"ich scheine", tts:"ich scheine", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"ich habe", tts:"ich habe", pfad:[{r:5,c:6}]}, // Geld
  {wort:"ich zähle", tts:"ich zähle", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"ich gehe", tts:"ich gehe", pfad:[{r:6,c:8}]}, // wandern
  {wort:"meinf", tts:"meinf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"ich schreibe", tts:"ich schreibe", pfad:[{r:6,c:1}]}, // Maus
  {wort:"ich kann", tts:"ich kann", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"ich mag", tts:"ich mag", pfad:[{r:6,c:2}]}, // Baby
  {wort:"ich sehe", tts:"ich sehe", pfad:[{r:6,c:4}]}, // TV
  {wort:"ich schlafe", tts:"ich schlafe", pfad:[{r:6,c:3}]}, // Bett
  {wort:"ich zeige", tts:"ich zeige", pfad:[{r:6,c:7}]}, // Idee
  {wort:"ich stehe", tts:"ich stehe", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"ich bin", tts:"ich bin", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"ich muss", tts:"ich muss", pfad:[{r:5,c:8}]}, // Bad
  {wort:"du wohnst", tts:"du wohnst", pfad:[{r:3,c:2}]}, // Haus
  {wort:"du machst", tts:"du machst", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"du lässt", tts:"du lässt", pfad:[{r:3,c:4}]}, // Minus
  {wort:"du brauchst", tts:"du brauchst", pfad:[{r:3,c:5}]}, // Plus
  {wort:"du sollst", tts:"du sollst", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"du willst", tts:"du willst", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"du hörst", tts:"du hörst", pfad:[{r:3,c:9}]}, // Talker
  {wort:"du gibst", tts:"du gibst", pfad:[{r:4,c:8}]}, // Ball
  {wort:"du riechst", tts:"du riechst", pfad:[{r:4,c:1}]}, // Blume
  {wort:"du kommst", tts:"du kommst", pfad:[{r:4,c:2}]}, // Leute
  {wort:"du darfst", tts:"du darfst", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"du malst", tts:"du malst", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"du lernst", tts:"du lernst", pfad:[{r:4,c:5}]}, // Schule
  {wort:"du möchtest", tts:"du möchtest", pfad:[{r:4,c:6}]}, // Herz
  {wort:"du liest", tts:"du liest", pfad:[{r:4,c:7}]}, // Buch
  {wort:"du spielst", tts:"du spielst", pfad:[{r:4,c:3}]}, // Lego
  {wort:"du warst", tts:"du warst", pfad:[{r:2,c:6}]}, // Dino
  {wort:"du isst", tts:"du isst", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"du trinkst", tts:"du trinkst", pfad:[{r:5,c:2}]}, // Saft
  {wort:"du fährst", tts:"du fährst", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"du ziehst", tts:"du ziehst", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"du scheinst", tts:"du scheinst", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"du hast", tts:"du hast", pfad:[{r:5,c:6}]}, // Geld
  {wort:"du zählst", tts:"du zählst", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"du gehst", tts:"du gehst", pfad:[{r:6,c:8}]}, // wandern
  {wort:"deinf", tts:"deinf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"du schreibst", tts:"du schreibst", pfad:[{r:6,c:1}]}, // Maus
  {wort:"du kannst", tts:"du kannst", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"du magst", tts:"du magst", pfad:[{r:6,c:2}]}, // Baby
  {wort:"du siehst", tts:"du siehst", pfad:[{r:6,c:4}]}, // TV
  {wort:"du schläfst", tts:"du schläfst", pfad:[{r:6,c:3}]}, // Bett
  {wort:"du zeigst", tts:"du zeigst", pfad:[{r:6,c:7}]}, // Idee
  {wort:"du stehst", tts:"du stehst", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"du bist", tts:"du bist", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"du musst", tts:"du musst", pfad:[{r:5,c:8}]}, // Bad
  {wort:"er wohnt", tts:"er wohnt", pfad:[{r:3,c:2}]}, // Haus
  {wort:"er macht", tts:"er macht", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"er lässt", tts:"er lässt", pfad:[{r:3,c:4}]}, // Minus
  {wort:"er braucht", tts:"er braucht", pfad:[{r:3,c:5}]}, // Plus
  {wort:"er soll", tts:"er soll", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"er will", tts:"er will", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"er hört", tts:"er hört", pfad:[{r:3,c:9}]}, // Talker
  {wort:"er gibt", tts:"er gibt", pfad:[{r:4,c:8}]}, // Ball
  {wort:"er riecht", tts:"er riecht", pfad:[{r:4,c:1}]}, // Blume
  {wort:"er kommt", tts:"er kommt", pfad:[{r:4,c:2}]}, // Leute
  {wort:"er darf", tts:"er darf", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"er malt", tts:"er malt", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"er lernt", tts:"er lernt", pfad:[{r:4,c:5}]}, // Schule
  {wort:"er möchte", tts:"er möchte", pfad:[{r:4,c:6}]}, // Herz
  {wort:"er liest", tts:"er liest", pfad:[{r:4,c:7}]}, // Buch
  {wort:"er spielt", tts:"er spielt", pfad:[{r:4,c:3}]}, // Lego
  {wort:"er war", tts:"er war", pfad:[{r:2,c:6}]}, // Dino
  {wort:"er isst", tts:"er isst", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"er trinkt", tts:"er trinkt", pfad:[{r:5,c:2}]}, // Saft
  {wort:"er fährt", tts:"er fährt", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"er zieht", tts:"er zieht", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"er scheint", tts:"er scheint", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"er hat", tts:"er hat", pfad:[{r:5,c:6}]}, // Geld
  {wort:"er zählt", tts:"er zählt", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"er geht", tts:"er geht", pfad:[{r:6,c:8}]}, // wandern
  {wort:"seinf", tts:"seinf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"er schreibt", tts:"er schreibt", pfad:[{r:6,c:1}]}, // Maus
  {wort:"er kann", tts:"er kann", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"er mag", tts:"er mag", pfad:[{r:6,c:2}]}, // Baby
  {wort:"er sieht", tts:"er sieht", pfad:[{r:6,c:4}]}, // TV
  {wort:"er schläft", tts:"er schläft", pfad:[{r:6,c:3}]}, // Bett
  {wort:"er zeigt", tts:"er zeigt", pfad:[{r:6,c:7}]}, // Idee
  {wort:"er steht", tts:"er steht", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"er ist", tts:"er ist", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"er muss", tts:"er muss", pfad:[{r:5,c:8}]}, // Bad
  {wort:"sie wohnt", tts:"sie wohnt", pfad:[{r:3,c:2}]}, // Haus
  {wort:"sie macht", tts:"sie macht", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"sie lässt", tts:"sie lässt", pfad:[{r:3,c:4}]}, // Minus
  {wort:"sie braucht", tts:"sie braucht", pfad:[{r:3,c:5}]}, // Plus
  {wort:"sie soll", tts:"sie soll", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"sie will", tts:"sie will", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"sie hört", tts:"sie hört", pfad:[{r:3,c:9}]}, // Talker
  {wort:"sie gibt", tts:"sie gibt", pfad:[{r:4,c:8}]}, // Ball
  {wort:"sie riecht", tts:"sie riecht", pfad:[{r:4,c:1}]}, // Blume
  {wort:"sie kommt", tts:"sie kommt", pfad:[{r:4,c:2}]}, // Leute
  {wort:"sie darf", tts:"sie darf", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"sie malt", tts:"sie malt", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"sie lernt", tts:"sie lernt", pfad:[{r:4,c:5}]}, // Schule
  {wort:"sie möchte", tts:"sie möchte", pfad:[{r:4,c:6}]}, // Herz
  {wort:"sie liest", tts:"sie liest", pfad:[{r:4,c:7}]}, // Buch
  {wort:"sie spielt", tts:"sie spielt", pfad:[{r:4,c:3}]}, // Lego
  {wort:"sie war", tts:"sie war", pfad:[{r:2,c:6}]}, // Dino
  {wort:"sie isst", tts:"sie isst", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"sie trinkt", tts:"sie trinkt", pfad:[{r:5,c:2}]}, // Saft
  {wort:"sie fährt", tts:"sie fährt", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"sie zieht", tts:"sie zieht", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"sie scheint", tts:"sie scheint", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"sie hat", tts:"sie hat", pfad:[{r:5,c:6}]}, // Geld
  {wort:"sie zählt", tts:"sie zählt", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"sie geht", tts:"sie geht", pfad:[{r:6,c:8}]}, // wandern
  {wort:"sie schreibt", tts:"sie schreibt", pfad:[{r:6,c:1}]}, // Maus
  {wort:"sie kann", tts:"sie kann", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"sie mag", tts:"sie mag", pfad:[{r:6,c:2}]}, // Baby
  {wort:"sie sieht", tts:"sie sieht", pfad:[{r:6,c:4}]}, // TV
  {wort:"sie schläft", tts:"sie schläft", pfad:[{r:6,c:3}]}, // Bett
  {wort:"sie zeigt", tts:"sie zeigt", pfad:[{r:6,c:7}]}, // Idee
  {wort:"sie steht", tts:"sie steht", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"sie ist", tts:"sie ist", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"sie muss", tts:"sie muss", pfad:[{r:5,c:8}]}, // Bad
  {wort:"es wohnt", tts:"es wohnt", pfad:[{r:3,c:2}]}, // Haus
  {wort:"es macht", tts:"es macht", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"es lässt", tts:"es lässt", pfad:[{r:3,c:4}]}, // Minus
  {wort:"es braucht", tts:"es braucht", pfad:[{r:3,c:5}]}, // Plus
  {wort:"es soll", tts:"es soll", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"es will", tts:"es will", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"es hört", tts:"es hört", pfad:[{r:3,c:9}]}, // Talker
  {wort:"es gibt", tts:"es gibt", pfad:[{r:4,c:8}]}, // Ball
  {wort:"es riecht", tts:"es riecht", pfad:[{r:4,c:1}]}, // Blume
  {wort:"es kommt", tts:"es kommt", pfad:[{r:4,c:2}]}, // Leute
  {wort:"es darf", tts:"es darf", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"es malt", tts:"es malt", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"es lernt", tts:"es lernt", pfad:[{r:4,c:5}]}, // Schule
  {wort:"es möchte", tts:"es möchte", pfad:[{r:4,c:6}]}, // Herz
  {wort:"es liest", tts:"es liest", pfad:[{r:4,c:7}]}, // Buch
  {wort:"es spielt", tts:"es spielt", pfad:[{r:4,c:3}]}, // Lego
  {wort:"es war", tts:"es war", pfad:[{r:2,c:6}]}, // Dino
  {wort:"es isst", tts:"es isst", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"es trinkt", tts:"es trinkt", pfad:[{r:5,c:2}]}, // Saft
  {wort:"es fährt", tts:"es fährt", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"es zieht", tts:"es zieht", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"es scheint", tts:"es scheint", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"es hat", tts:"es hat", pfad:[{r:5,c:6}]}, // Geld
  {wort:"es zählt", tts:"es zählt", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"es geht", tts:"es geht", pfad:[{r:6,c:8}]}, // wandern
  {wort:"es schreibt", tts:"es schreibt", pfad:[{r:6,c:1}]}, // Maus
  {wort:"es kann", tts:"es kann", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"es mag", tts:"es mag", pfad:[{r:6,c:2}]}, // Baby
  {wort:"es sieht", tts:"es sieht", pfad:[{r:6,c:4}]}, // TV
  {wort:"es schläft", tts:"es schläft", pfad:[{r:6,c:3}]}, // Bett
  {wort:"es zeigt", tts:"es zeigt", pfad:[{r:6,c:7}]}, // Idee
  {wort:"es steht", tts:"es steht", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"es ist", tts:"es ist", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"es muss", tts:"es muss", pfad:[{r:5,c:8}]}, // Bad
  {wort:"wir wohnen", tts:"wir wohnen", pfad:[{r:3,c:2}]}, // Haus
  {wort:"wir machen", tts:"wir machen", pfad:[{r:3,c:3}]}, // Hammer
  {wort:"wir lassen", tts:"wir lassen", pfad:[{r:3,c:4}]}, // Minus
  {wort:"wir brauchen", tts:"wir brauchen", pfad:[{r:3,c:5}]}, // Plus
  {wort:"wir sollen", tts:"wir sollen", pfad:[{r:3,c:1}]}, // Zauberer
  {wort:"wir wollen", tts:"wir wollen", pfad:[{r:3,c:8}]}, // Schluessel
  {wort:"wir hören", tts:"wir hören", pfad:[{r:3,c:9}]}, // Talker
  {wort:"wir geben", tts:"wir geben", pfad:[{r:4,c:8}]}, // Ball
  {wort:"wir riechen", tts:"wir riechen", pfad:[{r:4,c:1}]}, // Blume
  {wort:"wir kommen", tts:"wir kommen", pfad:[{r:4,c:2}]}, // Leute
  {wort:"wir dürfen", tts:"wir dürfen", pfad:[{r:3,c:7}]}, // Ampel
  {wort:"wir malen", tts:"wir malen", pfad:[{r:4,c:4}]}, // Farbe
  {wort:"wir lernen", tts:"wir lernen", pfad:[{r:4,c:5}]}, // Schule
  {wort:"wir möchten", tts:"wir möchten", pfad:[{r:4,c:6}]}, // Herz
  {wort:"wir lesen", tts:"wir lesen", pfad:[{r:4,c:7}]}, // Buch
  {wort:"wir spielen", tts:"wir spielen", pfad:[{r:4,c:3}]}, // Lego
  {wort:"wir waren", tts:"wir waren", pfad:[{r:2,c:6}]}, // Dino
  {wort:"wir essen", tts:"wir essen", pfad:[{r:5,c:1}]}, // Apfel
  {wort:"wir trinken", tts:"wir trinken", pfad:[{r:5,c:2}]}, // Saft
  {wort:"wir fahren", tts:"wir fahren", pfad:[{r:5,c:3}]}, // Taxi
  {wort:"wir ziehen", tts:"wir ziehen", pfad:[{r:5,c:4}]}, // Elefant
  {wort:"wir scheinen", tts:"wir scheinen", pfad:[{r:5,c:5}]}, // Sonne
  {wort:"wir haben", tts:"wir haben", pfad:[{r:5,c:6}]}, // Geld
  {wort:"wir zählen", tts:"wir zählen", pfad:[{r:5,c:7}]}, // Wuerfel
  {wort:"wir gehen", tts:"wir gehen", pfad:[{r:6,c:8}]}, // wandern
  {wort:"unserf", tts:"unserf", pfad:[{r:3,c:10}]}, // Lupe
  {wort:"wir schreiben", tts:"wir schreiben", pfad:[{r:6,c:1}]}, // Maus
  {wort:"wir können", tts:"wir können", pfad:[{r:6,c:5}]}, // Freibad
  {wort:"wir mögen", tts:"wir mögen", pfad:[{r:6,c:2}]}, // Baby
  {wort:"wir sehen", tts:"wir sehen", pfad:[{r:6,c:4}]}, // TV
  {wort:"wir schlafen", tts:"wir schlafen", pfad:[{r:6,c:3}]}, // Bett
  {wort:"wir zeigen", tts:"wir zeigen", pfad:[{r:6,c:7}]}, // Idee
  {wort:"wir stehen", tts:"wir stehen", pfad:[{r:6,c:6}]}, // Dieb
  {wort:"wir sind", tts:"wir sind", pfad:[{r:2,c:7}]}, // Einzahl
  {wort:"wir müssen", tts:"wir müssen", pfad:[{r:5,c:8}]}, // Bad
];
