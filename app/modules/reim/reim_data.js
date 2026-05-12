// reim_data.js
// Reimaufgaben fuer Laetitia
// REGEL 1: kein import(), kein type="module"
// REGEL 4: nur gerade Anfuehrungszeichen

(function(){
"use strict";

// ── Modus R1: Reimpaar finden ──────────────────────────────────────────────────
// TTS spricht Wort, 4 Buttons: welches reimt sich?
// Felder: wort, tts, richtig (Buchstabe A/B/C/D), antwort_a/b/c/d, erklaerung

var aufgaben_R1 = [

  { modus:"R1", thema:"alltag",
    wort:"Haus", tts:"Haus",
    antwort_a:"Maus", antwort_b:"Buch", antwort_c:"Tisch", antwort_d:"Blume",
    richtig:"A", erklaerung:"Haus und Maus — das reimt sich!" },

  { modus:"R1", thema:"alltag",
    wort:"Katze", tts:"Katze",
    antwort_a:"Hund", antwort_b:"Vogel", antwort_c:"Matze", antwort_d:"Fenster",
    richtig:"C", erklaerung:"Katze und Matze — das reimt sich!" },

  { modus:"R1", thema:"alltag",
    wort:"Stern", tts:"Stern",
    antwort_a:"Mond", antwort_b:"Sonne", antwort_c:"Wolke", antwort_d:"Kern",
    richtig:"D", erklaerung:"Stern und Kern — das reimt sich!" },

  { modus:"R1", thema:"alltag",
    wort:"Brot", tts:"Brot",
    antwort_a:"Butter", antwort_b:"Milch", antwort_c:"Not", antwort_d:"Apfel",
    richtig:"C", erklaerung:"Brot und Not — das reimt sich!" },

  { modus:"R1", thema:"tiere",
    wort:"Hase", tts:"Hase",
    antwort_a:"Igel", antwort_b:"Nase", antwort_c:"Fuchs", antwort_d:"Baum",
    richtig:"B", erklaerung:"Hase und Nase — das reimt sich!" },

  { modus:"R1", thema:"tiere",
    wort:"Fisch", tts:"Fisch",
    antwort_a:"Ente", antwort_b:"Frosch", antwort_c:"Tisch", antwort_d:"Bein",
    richtig:"C", erklaerung:"Fisch und Tisch — das reimt sich!" },

  { modus:"R1", thema:"tiere",
    wort:"Maus", tts:"Maus",
    antwort_a:"Katze", antwort_b:"Haus", antwort_c:"Hund", antwort_d:"Vogel",
    richtig:"B", erklaerung:"Maus und Haus — das reimt sich!" },

  { modus:"R1", thema:"tiere",
    wort:"Biene", tts:"Biene",
    antwort_a:"Wespe", antwort_b:"Blume", antwort_c:"Knie", antwort_d:"Wiese",
    richtig:"C", erklaerung:"Biene und Knie — das reimt sich!" },

  { modus:"R1", thema:"spass",
    wort:"Klo", tts:"Klo",
    antwort_a:"Bauch", antwort_b:"Nase", antwort_c:"Floh", antwort_d:"Ohr",
    richtig:"C", erklaerung:"Klo und Floh — das reimt sich! Hihi!" },

  { modus:"R1", thema:"spass",
    wort:"Witz", tts:"Witz",
    antwort_a:"Lacher", antwort_b:"Spaß", antwort_c:"Blitz", antwort_d:"Lustig",
    richtig:"C", erklaerung:"Witz und Blitz — das reimt sich!" },

  { modus:"R1", thema:"spass",
    wort:"Popel", tts:"Popel",
    antwort_a:"Nase", antwort_b:"Schnupfen", antwort_c:"Taschentuch", antwort_d:"Stoppel",
    richtig:"D", erklaerung:"Popel und Stoppel — das reimt sich! Ha!" },

  { modus:"R1", thema:"natur",
    wort:"Regen", tts:"Regen",
    antwort_a:"Sonne", antwort_b:"Donner", antwort_c:"Wolke", antwort_d:"Wegen",
    richtig:"D", erklaerung:"Regen und Wegen — das reimt sich!" },

  { modus:"R1", thema:"natur",
    wort:"Blume", tts:"Blume",
    antwort_a:"Gras", antwort_b:"Rume", antwort_c:"Baum", antwort_d:"Strauch",
    richtig:"B", erklaerung:"Blume und Rume — das reimt sich!" },

  { modus:"R1", thema:"koerper",
    wort:"Bauch", tts:"Bauch",
    antwort_a:"Bein", antwort_b:"Arm", antwort_c:"Rauch", antwort_d:"Hand",
    richtig:"C", erklaerung:"Bauch und Rauch — das reimt sich!" },

  { modus:"R1", thema:"koerper",
    wort:"Nase", tts:"Nase",
    antwort_a:"Mund", antwort_b:"Hase", antwort_c:"Ohr", antwort_d:"Auge",
    richtig:"B", erklaerung:"Nase und Hase — das reimt sich!" }

];

// ── Modus R2: Gedicht vervollstaendigen ─────────────────────────────────────────
// Zeile 1 vollstaendig, Zeile 2 mit Luecke am Ende
// Felder: zeile1, zeile2_anfang, tts_zeile1, tts_zeile2_anfang,
//         antwort_a/b/c/d, richtig, erklaerung

var aufgaben_R2 = [

  { modus:"R2", thema:"alltag",
    zeile1:"Die Katze sitzt auf dem Dach,",
    zeile2_anfang:"und schaut auf den kleinen ...",
    tts_zeile1:"Die Katze sitzt auf dem Dach,",
    tts_zeile2_anfang:"und schaut auf den kleinen ...",
    antwort_a:"Bach", antwort_b:"Hund", antwort_c:"Garten", antwort_d:"Tisch",
    richtig:"A",
    erklaerung:"Bach reimt sich auf Dach — super!" },

  { modus:"R2", thema:"tiere",
    zeile1:"Der Hase lauft uber die Wiese,",
    zeile2_anfang:"er tragt seine lange ...",
    tts_zeile1:"Der Hase laeuft ueber die Wiese,",
    tts_zeile2_anfang:"er trägt seine lange ...",
    antwort_a:"Nase", antwort_b:"Ohren", antwort_c:"Pfoten", antwort_d:"Blume",
    richtig:"A",
    erklaerung:"Wiese und Nase — das reimt sich!" },

  { modus:"R2", thema:"spass",
    zeile1:"Ich sitze auf dem Klo,",
    zeile2_anfang:"und singe tralleri ...",
    tts_zeile1:"Ich sitze auf dem Klo,",
    tts_zeile2_anfang:"und singe tralleri ...",
    antwort_a:"trallero", antwort_b:"lalala", antwort_c:"trallo", antwort_d:"brumm",
    richtig:"C",
    erklaerung:"Klo und trallo — das reimt sich! Hihi!" },

  { modus:"R2", thema:"natur",
    zeile1:"Die Sonne scheint so hell und klar,",
    zeile2_anfang:"das Wetter ist so wunderbar, ...",
    tts_zeile1:"Die Sonne scheint so hell und klar,",
    tts_zeile2_anfang:"das Wetter ist so wunderbar ...",
    antwort_a:"schoen", antwort_b:"hurra", antwort_c:"warm", antwort_d:"toll",
    richtig:"B",
    erklaerung:"klar, wunderbar und hurra — alle reimen sich!" },

  { modus:"R2", thema:"alltag",
    zeile1:"Im Topf kocht heisse Suppe gut,",
    zeile2_anfang:"sie warms mir den ...",
    tts_zeile1:"Im Topf kocht heisse Suppe gut,",
    tts_zeile2_anfang:"sie waermt mir den ...",
    antwort_a:"Bauch", antwort_b:"Arm", antwort_c:"Mut", antwort_d:"Mund",
    richtig:"C",
    erklaerung:"gut und Mut — das reimt sich!" },

  { modus:"R2", thema:"tiere",
    zeile1:"Die Maus lauft durch das grosse Haus,",
    zeile2_anfang:"sie schaut zum Fenster ...",
    tts_zeile1:"Die Maus laeuft durch das grosse Haus,",
    tts_zeile2_anfang:"sie schaut zum Fenster ...",
    antwort_a:"hinein", antwort_b:"hinaus", antwort_c:"rauf", antwort_d:"runter",
    richtig:"B",
    erklaerung:"Haus und hinaus — das reimt sich!" },

  { modus:"R2", thema:"koerper",
    zeile1:"Mein Bauch ist rund und voll und dick,",
    zeile2_anfang:"das kommt von jedem Kuchenstueck, vom ... ",
    tts_zeile1:"Mein Bauch ist rund und voll und dick,",
    tts_zeile2_anfang:"das kommt von jedem Kuchenstueck, vom ...",
    antwort_a:"Naschen", antwort_b:"Essen", antwort_c:"Glueck", antwort_d:"Hunger",
    richtig:"C",
    erklaerung:"Dick, Stueck und Glueck — das reimt sich!" },

  { modus:"R2", thema:"spass",
    zeile1:"Ein Wurm kroch aus dem Apfel raus,",
    zeile2_anfang:"er winkte und rief: Huhu, wie ...",
    tts_zeile1:"Ein Wurm kroch aus dem Apfel raus,",
    tts_zeile2_anfang:"er winkte und rief: Huhu, wie ...",
    antwort_a:"nett", antwort_b:"geht's", antwort_c:"schoen", antwort_d:"maus",
    richtig:"D",
    erklaerung:"raus und maus — das reimt sich! Der Wurm redet wie eine Maus!" },

  { modus:"R2", thema:"natur",
    zeile1:"Es regnet und es stuermt so sehr,",
    zeile2_anfang:"der Wind pfeift hin und ...",
    tts_zeile1:"Es regnet und es stuermt so sehr,",
    tts_zeile2_anfang:"der Wind pfeift hin und ...",
    antwort_a:"her", antwort_b:"drauf", antwort_c:"laut", antwort_d:"stark",
    richtig:"A",
    erklaerung:"sehr und her — das reimt sich!" }

];

// ── Modus R3: Reim oder kein Reim? ─────────────────────────────────────────────
// 2 Woerter, Laetitia sagt Ja oder Nein
// Felder: wort1, wort2, tts, reimt (true/false), erklaerung

var aufgaben_R3 = [

  { modus:"R3",
    wort1:"Maus", wort2:"Haus",
    tts:"Maus — Haus",
    reimt:true,
    erklaerung:"Ja! Maus und Haus reimen sich." },

  { modus:"R3",
    wort1:"Katze", wort2:"Hund",
    tts:"Katze — Hund",
    reimt:false,
    erklaerung:"Nein, Katze und Hund reimen sich nicht." },

  { modus:"R3",
    wort1:"Stern", wort2:"Kern",
    tts:"Stern — Kern",
    reimt:true,
    erklaerung:"Ja! Stern und Kern reimen sich." },

  { modus:"R3",
    wort1:"Brot", wort2:"Milch",
    tts:"Brot — Milch",
    reimt:false,
    erklaerung:"Nein, Brot und Milch reimen sich nicht." },

  { modus:"R3",
    wort1:"Fisch", wort2:"Tisch",
    tts:"Fisch — Tisch",
    reimt:true,
    erklaerung:"Ja! Fisch und Tisch reimen sich." },

  { modus:"R3",
    wort1:"Blume", wort2:"Baum",
    tts:"Blume — Baum",
    reimt:false,
    erklaerung:"Nein, Blume und Baum reimen sich nicht." },

  { modus:"R3",
    wort1:"Hase", wort2:"Nase",
    tts:"Hase — Nase",
    reimt:true,
    erklaerung:"Ja! Hase und Nase reimen sich." },

  { modus:"R3",
    wort1:"Regen", wort2:"Sonne",
    tts:"Regen — Sonne",
    reimt:false,
    erklaerung:"Nein, Regen und Sonne reimen sich nicht." },

  { modus:"R3",
    wort1:"Klo", wort2:"Floh",
    tts:"Klo — Floh",
    reimt:true,
    erklaerung:"Ja! Klo und Floh reimen sich. Hihi!" },

  { modus:"R3",
    wort1:"Hand", wort2:"Fuss",
    tts:"Hand — Fuss",
    reimt:false,
    erklaerung:"Nein, Hand und Fuss reimen sich nicht." },

  { modus:"R3",
    wort1:"Licht", wort2:"Gedicht",
    tts:"Licht — Gedicht",
    reimt:true,
    erklaerung:"Ja! Licht und Gedicht reimen sich." },

  { modus:"R3",
    wort1:"Bauch", wort2:"Bein",
    tts:"Bauch — Bein",
    reimt:false,
    erklaerung:"Nein, Bauch und Bein reimen sich nicht." },

  { modus:"R3",
    wort1:"Nacht", wort2:"Acht",
    tts:"Nacht — Acht",
    reimt:true,
    erklaerung:"Ja! Nacht und Acht reimen sich." },

  { modus:"R3",
    wort1:"Vogel", wort2:"Flugel",
    tts:"Vogel — Fluegel",
    reimt:false,
    erklaerung:"Nein, Vogel und Fluegel reimen sich nicht — auch wenn sie zusammengehoeren!" },

  { modus:"R3",
    wort1:"Witz", wort2:"Blitz",
    tts:"Witz — Blitz",
    reimt:true,
    erklaerung:"Ja! Witz und Blitz reimen sich." },

  { modus:"R3",
    wort1:"Stuhl", wort2:"Tisch",
    tts:"Stuhl — Tisch",
    reimt:false,
    erklaerung:"Nein, Stuhl und Tisch reimen sich nicht." }

];

// ── Modus R4: Eigenen Reim bauen ───────────────────────────────────────────────
// Zeile 1 vorgegeben, Laetitia waehlt das Reimwort fuer Zeile 2
// TTS spricht danach das komplette Gedicht!
// Felder: zeile1, zeile2_anfang, tts_zeile1,
//         antwort_a/b/c/d, tts_a/b/c/d (kompletter Satz mit Reimwort), richtig,
//         erklaerung

var aufgaben_R4 = [

  { modus:"R4", thema:"tiere",
    zeile1:"Die kleine Maus macht: Piep piep piep!",
    zeile2_anfang:"Hat alle Kaese richtig ...",
    tts_zeile1:"Die kleine Maus macht: Piep piep piep!",
    antwort_a:"lieb", antwort_b:"kalt", antwort_c:"satt", antwort_d:"weg",
    tts_a:"Die kleine Maus macht: Piep piep piep! Hat alle Kaese richtig lieb!",
    tts_b:"Die kleine Maus macht: Piep piep piep! Hat alle Kaese richtig kalt. — Das reimt sich nicht.",
    tts_c:"Die kleine Maus macht: Piep piep piep! Hat alle Kaese richtig satt. — Das reimt sich nicht.",
    tts_d:"Die kleine Maus macht: Piep piep piep! Hat alle Kaese richtig weg. — Das reimt sich nicht.",
    richtig:"A",
    erklaerung:"piep und lieb — das klingt so schoen zusammen!" },

  { modus:"R4", thema:"natur",
    zeile1:"Die Sonne scheint so golden hell,",
    zeile2_anfang:"der Bach fliesst ...",
    tts_zeile1:"Die Sonne scheint so golden hell,",
    antwort_a:"schnell", antwort_b:"kalt", antwort_c:"tief", antwort_d:"weit",
    tts_a:"Die Sonne scheint so golden hell, der Bach fliesst schnell!",
    tts_b:"Die Sonne scheint so golden hell, der Bach fliesst kalt. — Das reimt sich nicht.",
    tts_c:"Die Sonne scheint so golden hell, der Bach fliesst tief. — Das reimt sich nicht.",
    tts_d:"Die Sonne scheint so golden hell, der Bach fliesst weit. — Das reimt sich nicht.",
    richtig:"A",
    erklaerung:"hell und schnell — das klingt toll zusammen!" },

  { modus:"R4", thema:"spass",
    zeile1:"Ich esse gerne Schokolade,",
    zeile2_anfang:"am liebsten auf der ...",
    tts_zeile1:"Ich esse gerne Schokolade,",
    antwort_a:"Straße", antwort_b:"Couch", antwort_c:"Wiese", antwort_d:"Promenade",
    tts_a:"Ich esse gerne Schokolade, am liebsten auf der Straße. — Das reimt sich nicht ganz.",
    tts_b:"Ich esse gerne Schokolade, am liebsten auf der Couch. — Das reimt sich nicht.",
    tts_c:"Ich esse gerne Schokolade, am liebsten auf der Wiese. — Das reimt sich nicht.",
    tts_d:"Ich esse gerne Schokolade, am liebsten auf der Promenade!",
    richtig:"D",
    erklaerung:"Schokolade und Promenade — was fuer ein grosses Wort! Super!" },

  { modus:"R4", thema:"alltag",
    zeile1:"Laetitia lacht und lacht so sehr,",
    zeile2_anfang:"ihr Lachen klingt ...",
    tts_zeile1:"Laetitia lacht und lacht so sehr,",
    antwort_a:"leer", antwort_b:"schoen", antwort_c:"laut", antwort_d:"wie Meer",
    tts_a:"Laetitia lacht und lacht so sehr, ihr Lachen klingt leer. — Das reimt sich, aber klingt nicht nett.",
    tts_b:"Laetitia lacht und lacht so sehr, ihr Lachen klingt schoen. — Das reimt sich nicht.",
    tts_c:"Laetitia lacht und lacht so sehr, ihr Lachen klingt laut. — Das reimt sich nicht.",
    tts_d:"Laetitia lacht und lacht so sehr, ihr Lachen klingt wie Meer!",
    richtig:"D",
    erklaerung:"sehr und Meer — das klingt wunderschoen!" },

  { modus:"R4", thema:"tiere",
    zeile1:"Ein Frosch sitzt auf dem Baumstamm dick,",
    zeile2_anfang:"er schaut mit grunem ...",
    tts_zeile1:"Ein Frosch sitzt auf dem Baumstamm dick,",
    antwort_a:"Blick", antwort_b:"Auge", antwort_c:"Gesicht", antwort_d:"Blatt",
    tts_a:"Ein Frosch sitzt auf dem Baumstamm dick, er schaut mit grunem Blick!",
    tts_b:"Ein Frosch sitzt auf dem Baumstamm dick, er schaut mit grunem Auge. — Das reimt sich nicht.",
    tts_c:"Ein Frosch sitzt auf dem Baumstamm dick, er schaut mit grunem Gesicht. — Das reimt sich nicht.",
    tts_d:"Ein Frosch sitzt auf dem Baumstamm dick, er schaut mit grunem Blatt. — Das reimt sich nicht.",
    richtig:"A",
    erklaerung:"dick und Blick — das reimt sich perfekt!" },

  { modus:"R4", thema:"nacht",
    zeile1:"Der Mond leuchtet in der Nacht,",
    zeile2_anfang:"er hat viele Sterne ...",
    tts_zeile1:"Der Mond leuchtet in der Nacht,",
    antwort_a:"gesehen", antwort_b:"gemacht", antwort_c:"gern", antwort_d:"hell",
    tts_a:"Der Mond leuchtet in der Nacht, er hat viele Sterne gesehen. — Das reimt sich nicht.",
    tts_b:"Der Mond leuchtet in der Nacht, er hat viele Sterne gemacht!",
    tts_c:"Der Mond leuchtet in der Nacht, er hat viele Sterne gern. — Das reimt sich nicht.",
    tts_d:"Der Mond leuchtet in der Nacht, er hat viele Sterne hell. — Das reimt sich nicht.",
    richtig:"B",
    erklaerung:"Nacht und gemacht — das reimt sich toll!" },

  { modus:"R4", thema:"spass",
    zeile1:"Mein Bauch macht: Grummel grummel grum,",
    zeile2_anfang:"ich glaube, er will ...",
    tts_zeile1:"Mein Bauch macht: Grummel grummel grum,",
    antwort_a:"schlafen", antwort_b:"tanzen", antwort_c:"Kuchen", antwort_d:"Yum!",
    tts_a:"Mein Bauch macht: Grummel grummel grum, ich glaube, er will schlafen. — Das reimt sich nicht.",
    tts_b:"Mein Bauch macht: Grummel grummel grum, ich glaube, er will tanzen. — Das reimt sich nicht.",
    tts_c:"Mein Bauch macht: Grummel grummel grum, ich glaube, er will Kuchen. — Das reimt sich nicht.",
    tts_d:"Mein Bauch macht: Grummel grummel grum, ich glaube, er will Yum!",
    richtig:"D",
    erklaerung:"grum und Yum — mein Bauch hat Hunger! Hihi!" }

];

// ── Registry ───────────────────────────────────────────────────────────────────
if(!window.REIM_DATEN){ window.REIM_DATEN = {}; }
window.REIM_DATEN.R1 = aufgaben_R1;
window.REIM_DATEN.R2 = aufgaben_R2;
window.REIM_DATEN.R3 = aufgaben_R3;
window.REIM_DATEN.R4 = aufgaben_R4;

})();
