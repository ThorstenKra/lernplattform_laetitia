// schule_liesmal3_data.js
// Aufgaben aus "Lies mal 3 - Das Heft mit der Robbe" (Jandorf Verlag)
// REGEL 1: kein import(), kein type="module"
// REGEL 4: nur gerade Anfuehrungszeichen

(function(){
"use strict";

var aufgaben = [

  // ── Seite 3: Bello und der Dinoknochen ──────────────────────────────────────
  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Bello steht auf einem riesigen Erdbeerkuchen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Bello steht auf einem Dinoknochen, nicht auf einem Kuchen." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Bello knabbert schon seit Wochen an einem Ufo.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Bello knabbert an einem Dinoknochen, nicht an einem Ufo." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Bello trägt ein Halsband und wedelt mit dem Schwanz.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Im Bild sieht man Bellos Halsband." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Bello steht auf einem Dinoknochen und freut sich.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Ja, Bello knabbert freudig an dem großen Knochen." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Neben dem Knochen ist ein Ufo auf der Wiese gelandet.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Das Ufo fliegt noch in der Luft, es ist nicht gelandet." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Ein Dino steht unter einem Baum und ein Ufo fliegt.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Im Bild sieht man genau das: einen Dino unter einem Baum und ein fliegendes Ufo." },

  { heft:"liesmal3", seite:3, typ:"ja_nein", bild:"bello_dino", stufe:"SL_JAEIN",
    kontext:"Bello knabbert schon seit Wochen an einem großen Dinoknochen.",
    text:"Dinoknochen kann man in jedem Supermarkt kaufen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Dinoknochen sind Fossilien aus der Urzeit. Die gibt es nicht im Supermarkt!" },

  // ── Seite 5: Allgemeinwissen ────────────────────────────────────────────────
  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Lesen macht mir Spaß.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Ja! Und du liest schon sehr gut." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Hunde brauchen viel Bewegung.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig! Hunde müssen jeden Tag raus und laufen." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Autos ohne Räder können fahren.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, ohne Räder kann kein Auto fahren." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Im Kino liegt immer sehr viel Schnee.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, im Kino schaut man Filme. Schnee gibt es dort nicht." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Zucker ist süß und Zitronen sind sauer.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig! Zucker schmeckt süß, Zitronen schmecken sauer." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Hasen und Kaninchen haben vier Beine.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, alle diese Tiere haben vier Beine." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Spinnen malen gerne mit Wasserfarben.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Spinnen malen nicht. Sie bauen Netze und fangen Insekten." },

  { heft:"liesmal3", seite:5, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"In einem Badesee darf man schwimmen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, Badeseen sind extra dafür da." },

  // ── Seite 9: Der große Fisch ───────────────────────────────────────────────
  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Ein großer Fisch jagt einen kleinen Fisch. Dann liegt der große Fisch auf dem Mittagstisch.",
    text:"Der große Fisch jagt einen kleinen Frosch.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, der große Fisch jagt einen kleinen Fisch, keinen Frosch." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Ein großer Fisch jagt einen kleinen Fisch.",
    text:"Der große Fisch jagt einen kleinen Fisch.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, das sieht man im Comic." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Ein großer Fisch jagt einen kleinen Fisch.",
    text:"Im Wasser schwimmt ein Angelhaken mit Würmern.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Ja, im Comic sieht man einen Angelhaken mit Würmern im Wasser." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Der große Fisch liegt auf dem Mittagstisch.",
    text:"Der kleine Fisch liegt zum Essen auf einer großen Platte.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, im zweiten Bild sieht man den Fisch auf einer Platte." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Der große Fisch liegt auf dem Mittagstisch.",
    text:"Der große Fisch liegt zum Essen auf dem Mittagstisch.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, so endet die Geschichte." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Der große Fisch liegt auf dem Mittagstisch.",
    text:"Der große Fisch hat eine Banane in seinem Maul.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, eine Banane ist nicht dabei." },

  { heft:"liesmal3", seite:9, typ:"ja_nein", bild:"fisch_comic", stufe:"SL_JAEIN",
    kontext:"Der große Fisch liegt auf dem Mittagstisch.",
    text:"Der Tisch ist mit Tellern, Gläsern und Besteck gedeckt.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, das sieht man im Bild." },

  // ── Seite 11: Allgemeinwissen ───────────────────────────────────────────────
  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Weiße Kreide wird aus Joghurt hergestellt.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Kreide wird aus Kalk gemacht, nicht aus Joghurt." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Autos und Fahrräder sind aus Knetgummi.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Autos und Fahrräder sind aus Metall und anderen Materialien." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Telefone schmecken sehr lecker mit Senf.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Telefone isst man nicht!" },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Sonntags gehen alle Kinder in die Schule.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Sonntag ist schulfrei." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Milch besteht aus geschmolzenem Schnee.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Milch kommt von Kühen und anderen Tieren." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Ein Sonnenbrand ist gefährlich für die Haut.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, deshalb trägt man Sonnencreme." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Omas und Opas waren auch einmal Kinder.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig! Alle Menschen waren einmal Kinder." },

  { heft:"liesmal3", seite:11, typ:"ja_nein", stufe:"SL_JAEIN",
    kontext:"",
    text:"Ich konnte alle Sätze auf dieser Seite lesen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Super gemacht! Du liest toll." },

  // ── Seite 15: Der Flummiball ────────────────────────────────────────────────
  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Auf der Wiese kriecht ein Regenwurm aus der Erde.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Ja, das sieht man im ersten Bild." },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Auf der Wiese steht ein großer Apfelbaum.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, kein Apfelbaum zu sehen." },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Im Weltraum schweben nur Flummis.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, im Weltraum schweben auch andere Dinge: Planeten, Raketen, Astronauten." },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Der Fußball schwebt rechts neben dem Flummi.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, der Fußball ist links oben im Bild." },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Der Flummi schwebt zwischen dem Fußball und dem Kürbis.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, das sieht man im zweiten Bild." },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Die Uhr schwebt rechts neben der Erde.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig!" },

  { heft:"liesmal3", seite:15, typ:"ja_nein", bild:"weltraum_flummi", stufe:"SL_JAEIN",
    kontext:"Ein Flummiball springt vom Boden hoch bis ins All.",
    text:"Flummis können bis in den Weltraum springen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, das ist nur eine lustige Geschichte. Ein echter Flummi schafft das nicht." },

  // ── Seite 17: Allgemeinwissen (quer) ───────────────────────────────────────
  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Es gibt Schafe mit Flügeln und blaue Hunde.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, das gibt es nicht in der Wirklichkeit." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Tomaten darf man nur zum Frühstück essen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Tomaten kann man zu jeder Mahlzeit essen." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"In der Nacht scheint die Sonne nur im Keller.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, nachts scheint die Sonne auf der anderen Seite der Erde." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Schmuck ist häufig aus Silber oder aus Gold.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, Ringe und Ketten sind oft aus Gold oder Silber." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Viele Mäuse spielen Fußball in einem Verein.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Mäuse spielen keinen Fußball." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Gummibärchen leben in Amerika und im Zoo.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Gummibärchen sind Süßigkeiten, keine echten Tiere." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Braune Kühe geben Kaffee, Kakao oder Cola.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Kühe geben Milch, keine anderen Getränke." },

  { heft:"liesmal3", seite:17, typ:"ja_nein", bild:"krake_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Elefanten haben Stoßzähne und einen Rüssel.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, das sind typische Merkmale von Elefanten." },

  // ── Seite 23: Allgemeinwissen ───────────────────────────────────────────────
  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"Geigen und Trompeten sind Musikinstrumente.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig! Geige ist ein Streichinstrument, Trompete ein Blasinstrument." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"In einer Schule gibt es viele Tische und Stühle.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, in jedem Klassenzimmer gibt es Tische und Stühle." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"In einem Haus ohne Fenster ist es sehr dunkel.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, ohne Fenster kommt kein Tageslicht rein." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"Alle Kinder haben am gleichen Tag Geburtstag.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, jedes Kind hat seinen eigenen Geburtstag." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"Auf dem Mond gibt es viele schöne Spielplätze.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, auf dem Mond gibt es keine Spielplätze." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"In einem Wald stehen mehr Häuser als Bäume.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, in einem Wald stehen viele Bäume, kaum Häuser." },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"Auch Zahnärzte müssen sich die Zähne putzen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, alle Menschen müssen sich die Zähne putzen!" },

  { heft:"liesmal3", seite:23, typ:"ja_nein", bild:"pizza_mia", stufe:"SL_JAEIN",
    kontext:"",
    text:"Kinder trinken am liebsten Zitronentee mit Sand.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Sand ist kein Getränk!" },

  // ── Seite 29: Allgemeinwissen ───────────────────────────────────────────────
  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Kinder können sehr gut mit ihren Füßen hören.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, wir hören mit unseren Ohren." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Im Sommer fahren viele Familien in den Urlaub.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, Sommer ist die beliebteste Urlaubszeit." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Tischtennis wird mit einem kleinen Ball gespielt.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, der Tischtennisball ist sehr klein und leicht." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Diamanten sind besonders wertvolle Edelsteine.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, Diamanten sind die härtesten und wertvollsten Steine." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Einige Autos fahren auf der Straße viel zu schnell.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"A",
    erklaerung:"Richtig, deshalb gibt es Tempolimits und Kontrollen." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Hunde haben auf dem Rücken eine zweite Nase.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Hunde haben nur eine Nase, vorne am Kopf." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Ein Fußball mit Ecken kann besonders gut rollen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, ein Ball muss rund sein um gut rollen zu können." },

  { heft:"liesmal3", seite:29, typ:"ja_nein", bild:"taucher_lies", stufe:"SL_JAEIN",
    kontext:"",
    text:"Bleistifte und Schulranzen können schön singen.",
    frage:"Stimmt das?", antwort_a:"Ja", antwort_b:"Nein", richtig:"B",
    erklaerung:"Nein, Bleistifte und Ranzen sind Gegenstände. Die können nicht singen." }

];

// In Registry eintragen
(function(){
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    var existing = api.get("schule_liesmal3") || [];
    api.set("schule_liesmal3", existing.filter(function(t){
      return t.heft !== "liesmal3";
    }).concat(aufgaben));
  } else {
    window.LaetitiaSchuleLiesmal3Aufgaben = aufgaben;
  }
})();

})();
