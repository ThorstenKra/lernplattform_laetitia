// englisch_data.js
// Englisch-Lernaufgaben fuer Laetitia
// REGEL 1: kein import(), kein type="module"
// REGEL 4: nur gerade Anfuehrungszeichen

(function(){
"use strict";

// ── Stufe E1: Hoeren und Wiedererkennen ───────────────────────────────────────
// Format: englischer Satz + Emoji-Paar (richtig / falsch)
// Kein Deutsch sichtbar — nur Klang und Bild

var aufgaben_E1 = [

  // Tiere
  { stufe:"E1", thema:"tiere",
    text:"a cat", tts_en:"a cat",
    emoji_richtig:"🐱", emoji_falsch:"🐶",
    label_richtig:"cat", label_falsch:"dog",
    erklaerung_de:"Eine Katze" },

  { stufe:"E1", thema:"tiere",
    text:"a dog", tts_en:"a dog",
    emoji_richtig:"🐶", emoji_falsch:"🐱",
    label_richtig:"dog", label_falsch:"cat",
    erklaerung_de:"Ein Hund" },

  { stufe:"E1", thema:"tiere",
    text:"a bird", tts_en:"a bird",
    emoji_richtig:"🐦", emoji_falsch:"🐠",
    label_richtig:"bird", label_falsch:"fish",
    erklaerung_de:"Ein Vogel" },

  { stufe:"E1", thema:"tiere",
    text:"a fish", tts_en:"a fish",
    emoji_richtig:"🐠", emoji_falsch:"🐸",
    label_richtig:"fish", label_falsch:"frog",
    erklaerung_de:"Ein Fisch" },

  { stufe:"E1", thema:"tiere",
    text:"a horse", tts_en:"a horse",
    emoji_richtig:"🐴", emoji_falsch:"🐄",
    label_richtig:"horse", label_falsch:"cow",
    erklaerung_de:"Ein Pferd" },

  { stufe:"E1", thema:"tiere",
    text:"a butterfly", tts_en:"a butterfly",
    emoji_richtig:"🦋", emoji_falsch:"🐝",
    label_richtig:"butterfly", label_falsch:"bee",
    erklaerung_de:"Ein Schmetterling" },

  { stufe:"E1", thema:"tiere",
    text:"a rabbit", tts_en:"a rabbit",
    emoji_richtig:"🐰", emoji_falsch:"🐭",
    label_richtig:"rabbit", label_falsch:"mouse",
    erklaerung_de:"Ein Hase" },

  { stufe:"E1", thema:"tiere",
    text:"an elephant", tts_en:"an elephant",
    emoji_richtig:"🐘", emoji_falsch:"🦒",
    label_richtig:"elephant", label_falsch:"giraffe",
    erklaerung_de:"Ein Elefant" },

  // Essen
  { stufe:"E1", thema:"essen",
    text:"an apple", tts_en:"an apple",
    emoji_richtig:"🍎", emoji_falsch:"🍌",
    label_richtig:"apple", label_falsch:"banana",
    erklaerung_de:"Ein Apfel" },

  { stufe:"E1", thema:"essen",
    text:"a banana", tts_en:"a banana",
    emoji_richtig:"🍌", emoji_falsch:"🍓",
    label_richtig:"banana", label_falsch:"strawberry",
    erklaerung_de:"Eine Banane" },

  { stufe:"E1", thema:"essen",
    text:"a strawberry", tts_en:"a strawberry",
    emoji_richtig:"🍓", emoji_falsch:"🍋",
    label_richtig:"strawberry", label_falsch:"lemon",
    erklaerung_de:"Eine Erdbeere" },

  { stufe:"E1", thema:"essen",
    text:"a pizza", tts_en:"a pizza",
    emoji_richtig:"🍕", emoji_falsch:"🍔",
    label_richtig:"pizza", label_falsch:"burger",
    erklaerung_de:"Eine Pizza" },

  { stufe:"E1", thema:"essen",
    text:"cake", tts_en:"cake",
    emoji_richtig:"🎂", emoji_falsch:"🍪",
    label_richtig:"cake", label_falsch:"cookie",
    erklaerung_de:"Kuchen" },

  { stufe:"E1", thema:"essen",
    text:"ice cream", tts_en:"ice cream",
    emoji_richtig:"🍦", emoji_falsch:"🍫",
    label_richtig:"ice cream", label_falsch:"chocolate",
    erklaerung_de:"Eis" },

  // Natur
  { stufe:"E1", thema:"natur",
    text:"the sun", tts_en:"the sun",
    emoji_richtig:"☀️", emoji_falsch:"🌙",
    label_richtig:"sun", label_falsch:"moon",
    erklaerung_de:"Die Sonne" },

  { stufe:"E1", thema:"natur",
    text:"rain", tts_en:"rain",
    emoji_richtig:"🌧️", emoji_falsch:"❄️",
    label_richtig:"rain", label_falsch:"snow",
    erklaerung_de:"Regen" },

  { stufe:"E1", thema:"natur",
    text:"a flower", tts_en:"a flower",
    emoji_richtig:"🌸", emoji_falsch:"🌿",
    label_richtig:"flower", label_falsch:"leaf",
    erklaerung_de:"Eine Blume" },

  { stufe:"E1", thema:"natur",
    text:"a tree", tts_en:"a tree",
    emoji_richtig:"🌳", emoji_falsch:"🏔️",
    label_richtig:"tree", label_falsch:"mountain",
    erklaerung_de:"Ein Baum" },

  // Gefuehle
  { stufe:"E1", thema:"gefuehle",
    text:"happy", tts_en:"happy",
    emoji_richtig:"😄", emoji_falsch:"😢",
    label_richtig:"happy", label_falsch:"sad",
    erklaerung_de:"Glücklich" },

  { stufe:"E1", thema:"gefuehle",
    text:"sad", tts_en:"sad",
    emoji_richtig:"😢", emoji_falsch:"😄",
    label_richtig:"sad", label_falsch:"happy",
    erklaerung_de:"Traurig" },

  { stufe:"E1", thema:"gefuehle",
    text:"tired", tts_en:"tired",
    emoji_richtig:"😴", emoji_falsch:"😃",
    label_richtig:"tired", label_falsch:"awake",
    erklaerung_de:"Müde" },

  { stufe:"E1", thema:"gefuehle",
    text:"surprised", tts_en:"surprised",
    emoji_richtig:"😲", emoji_falsch:"😌",
    label_richtig:"surprised", label_falsch:"calm",
    erklaerung_de:"Überrascht" },

  { stufe:"E1", thema:"gefuehle",
    text:"funny", tts_en:"funny",
    emoji_richtig:"🤣", emoji_falsch:"😐",
    label_richtig:"funny", label_falsch:"boring",
    erklaerung_de:"Lustig" }
];

// ── Stufe E2: Saetze erkennen ─────────────────────────────────────────────────
// Ganzer Satz als TTS → Emoji-Paar

var aufgaben_E2 = [

  { stufe:"E2", thema:"tiere",
    text:"The cat is sleeping.", tts_en:"The cat is sleeping.",
    emoji_richtig:"😴🐱", emoji_falsch:"🏃🐱",
    label_richtig:"sleeping", label_falsch:"running",
    erklaerung_de:"Die Katze schläft." },

  { stufe:"E2", thema:"tiere",
    text:"The dog is happy.", tts_en:"The dog is happy.",
    emoji_richtig:"😄🐶", emoji_falsch:"😢🐶",
    label_richtig:"happy", label_falsch:"sad",
    erklaerung_de:"Der Hund ist glücklich." },

  { stufe:"E2", thema:"tiere",
    text:"The bird is flying.", tts_en:"The bird is flying.",
    emoji_richtig:"🐦✈️", emoji_falsch:"🐦💤",
    label_richtig:"flying", label_falsch:"sleeping",
    erklaerung_de:"Der Vogel fliegt." },

  { stufe:"E2", thema:"alltag",
    text:"I am hungry.", tts_en:"I am hungry.",
    emoji_richtig:"😋🍽️", emoji_falsch:"😴🛏️",
    label_richtig:"hungry", label_falsch:"tired",
    erklaerung_de:"Ich bin hungrig." },

  { stufe:"E2", thema:"alltag",
    text:"It is raining.", tts_en:"It is raining.",
    emoji_richtig:"🌧️", emoji_falsch:"☀️",
    label_richtig:"raining", label_falsch:"sunny",
    erklaerung_de:"Es regnet." },

  { stufe:"E2", thema:"alltag",
    text:"The sun is shining.", tts_en:"The sun is shining.",
    emoji_richtig:"☀️😊", emoji_falsch:"🌧️😔",
    label_richtig:"shining", label_falsch:"raining",
    erklaerung_de:"Die Sonne scheint." },

  { stufe:"E2", thema:"alltag",
    text:"I love music.", tts_en:"I love music.",
    emoji_richtig:"🎵❤️", emoji_falsch:"🎵😤",
    label_richtig:"love", label_falsch:"hate",
    erklaerung_de:"Ich liebe Musik." },

  { stufe:"E2", thema:"alltag",
    text:"The cake is delicious.", tts_en:"The cake is delicious.",
    emoji_richtig:"🎂😋", emoji_falsch:"🎂🤢",
    label_richtig:"delicious", label_falsch:"yucky",
    erklaerung_de:"Der Kuchen ist lecker." },

  { stufe:"E2", thema:"alltag",
    text:"I am reading a book.", tts_en:"I am reading a book.",
    emoji_richtig:"📖😊", emoji_falsch:"📺😊",
    label_richtig:"reading", label_falsch:"watching",
    erklaerung_de:"Ich lese ein Buch." },

  { stufe:"E2", thema:"gefuehle",
    text:"She is laughing.", tts_en:"She is laughing.",
    emoji_richtig:"😂", emoji_falsch:"😭",
    label_richtig:"laughing", label_falsch:"crying",
    erklaerung_de:"Sie lacht." },

  { stufe:"E2", thema:"natur",
    text:"The butterfly is beautiful.", tts_en:"The butterfly is beautiful.",
    emoji_richtig:"🦋✨", emoji_falsch:"🦋💨",
    label_richtig:"beautiful", label_falsch:"gone",
    erklaerung_de:"Der Schmetterling ist wunderschön." },

  { stufe:"E2", thema:"natur",
    text:"The flowers are blooming.", tts_en:"The flowers are blooming.",
    emoji_richtig:"🌸🌸", emoji_falsch:"🍂🍂",
    label_richtig:"blooming", label_falsch:"falling",
    erklaerung_de:"Die Blumen blühen." }
];

// ── Stufe E3: Saetze bauen ────────────────────────────────────────────────────
// Laetitia waehlt das richtige Wort um den Satz zu vervollstaendigen

var aufgaben_E3 = [

  { stufe:"E3", thema:"tiere",
    text:"The cat says ___.", tts_en:"The cat says",
    antwort_a:"meow", antwort_b:"woof", antwort_c:"moo",
    richtig:"A",
    tts_komplett:"The cat says meow.",
    erklaerung_de:"Die Katze macht Miau." },

  { stufe:"E3", thema:"tiere",
    text:"The dog says ___.", tts_en:"The dog says",
    antwort_a:"meow", antwort_b:"woof", antwort_c:"oink",
    richtig:"B",
    tts_komplett:"The dog says woof.",
    erklaerung_de:"Der Hund macht Wau." },

  { stufe:"E3", thema:"farben",
    text:"The sun is ___.", tts_en:"The sun is",
    antwort_a:"blue", antwort_b:"yellow", antwort_c:"green",
    richtig:"B",
    tts_komplett:"The sun is yellow.",
    erklaerung_de:"Die Sonne ist gelb." },

  { stufe:"E3", thema:"farben",
    text:"The sky is ___.", tts_en:"The sky is",
    antwort_a:"red", antwort_b:"purple", antwort_c:"blue",
    richtig:"C",
    tts_komplett:"The sky is blue.",
    erklaerung_de:"Der Himmel ist blau." },

  { stufe:"E3", thema:"alltag",
    text:"I drink ___.", tts_en:"I drink",
    antwort_a:"a chair", antwort_b:"water", antwort_c:"a book",
    richtig:"B",
    tts_komplett:"I drink water.",
    erklaerung_de:"Ich trinke Wasser." },

  { stufe:"E3", thema:"alltag",
    text:"I sleep in my ___.", tts_en:"I sleep in my",
    antwort_a:"bed", antwort_b:"shoe", antwort_c:"garden",
    richtig:"A",
    tts_komplett:"I sleep in my bed.",
    erklaerung_de:"Ich schlafe in meinem Bett." },

  { stufe:"E3", thema:"gefuehle",
    text:"When I hear music, I feel ___.", tts_en:"When I hear music, I feel",
    antwort_a:"angry", antwort_b:"happy", antwort_c:"scared",
    richtig:"B",
    tts_komplett:"When I hear music, I feel happy.",
    erklaerung_de:"Wenn ich Musik höre, bin ich glücklich." },

  { stufe:"E3", thema:"natur",
    text:"A butterfly has beautiful ___.", tts_en:"A butterfly has beautiful",
    antwort_a:"wheels", antwort_b:"horns", antwort_c:"wings",
    richtig:"C",
    tts_komplett:"A butterfly has beautiful wings.",
    erklaerung_de:"Ein Schmetterling hat wunderschöne Flügel." },

  { stufe:"E3", thema:"natur",
    text:"Fish live in the ___.", tts_en:"Fish live in the",
    antwort_a:"sky", antwort_b:"water", antwort_c:"tree",
    richtig:"B",
    tts_komplett:"Fish live in the water.",
    erklaerung_de:"Fische leben im Wasser." },

  { stufe:"E3", thema:"witzig",
    text:"Why is the elephant so ___? Because she never forgets!", tts_en:"Why is the elephant so clever? Because she never forgets!",
    antwort_a:"clever", antwort_b:"tiny", antwort_c:"green",
    richtig:"A",
    tts_komplett:"Why is the elephant so clever? Because she never forgets!",
    erklaerung_de:"Warum ist der Elefant so klug? Weil er nie vergisst!" }
];

// ── In Registry eintragen ─────────────────────────────────────────────────────
(function(){
  var alle = aufgaben_E1.concat(aufgaben_E2).concat(aufgaben_E3);
  var api = window.LaetitiaDataRegistryApi;
  if(api && typeof api.get === "function"){
    api.set("englisch", alle);
  } else {
    window.LaetitiaEnglischAufgaben = alle;
  }
})();

})();
