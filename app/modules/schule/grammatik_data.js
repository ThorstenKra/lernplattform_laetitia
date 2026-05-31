// grammatik_data.js — Grammatik-Werkstatt Aufgaben
// Einheiten E-03+ (Stufen 1–7: Nomen bis Kasus)
// Typen: ja_nein | ab_wahl | abc_wahl | wort_button | richtig_falsch

var GRAMMATIK_EINHEITEN = [


  // ══════════════════════════════════════════════════════════════════
  // E-03 — Nomen: Dinge haben Namen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-03",
    titel: "Nomen: Dinge haben Namen",
    emoji: "🏷️",
    stufe: 1,
    erklaerung_tts: "Alle Dinge haben einen Namen. Diese Namen heißen Nomen. Hund, Haus, Ball, Schule — das sind alles Nomen. Nomen schreibt man immer mit einem großen Buchstaben am Anfang.",
    erklaerung_merksatz: "Nomen = Name eines Dings → immer GROSS",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'Hund' ein Nomen?",
        tts: "Ist Hund ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Hund ist ein Nomen — ein Name für ein Tier."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'laufen' ein Nomen?",
        tts: "Ist laufen ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Laufen ist eine Tätigkeit — kein Name für ein Ding."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Haus' ein Nomen?",
        tts: "Ist Haus ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Haus ist ein Nomen — ein Name für ein Gebäude."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'schön' ein Nomen?",
        tts: "Ist schön ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Schön beschreibt etwas — das ist kein Name für ein Ding."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Ball' ein Nomen?",
        tts: "Ist Ball ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Ball ist ein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'rennen' ein Nomen?",
        tts: "Ist rennen ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Rennen ist eine Tätigkeit — kein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Schule' ein Nomen?",
        tts: "Ist Schule ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Schule ist ein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'groß' ein Nomen?",
        tts: "Ist groß ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Groß beschreibt eine Eigenschaft — das ist kein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Baum' ein Nomen?",
        tts: "Ist Baum ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Baum ist ein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'spielen' ein Nomen?",
        tts: "Ist spielen ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Spielen ist eine Tätigkeit — kein Nomen."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-04 — Nomen erkennen (A/B Wahl)
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-04",
    titel: "Nomen erkennen",
    emoji: "🎯",
    stufe: 1,
    erklaerung_tts: "Jetzt suchen wir Nomen! Ich zeige dir immer zwei Wörter. Du wählst das Nomen — das Wort, das ein Ding, ein Tier, eine Person oder einen Ort benennt.",
    erklaerung_merksatz: "Nomen benennt ein Ding, Tier, Person oder Ort.",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — Hund oder laufen?",
        option_a: "Hund",
        option_b: "laufen",
        richtig: "a",
        erklaerung: "Hund ist das Nomen — es benennt ein Tier."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — schön oder Haus?",
        option_a: "schön",
        option_b: "Haus",
        richtig: "b",
        erklaerung: "Haus ist das Nomen — es benennt ein Gebäude."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — rennen oder Ball?",
        option_a: "rennen",
        option_b: "Ball",
        richtig: "b",
        erklaerung: "Ball ist das Nomen — es benennt einen Gegenstand."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — Katze oder klein?",
        option_a: "Katze",
        option_b: "klein",
        richtig: "a",
        erklaerung: "Katze ist das Nomen — es benennt ein Tier."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — spielen oder Garten?",
        option_a: "spielen",
        option_b: "Garten",
        richtig: "b",
        erklaerung: "Garten ist das Nomen — es benennt einen Ort."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — Baum oder grün?",
        option_a: "Baum",
        option_b: "grün",
        richtig: "a",
        erklaerung: "Baum ist das Nomen."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — lernen oder Schule?",
        option_a: "lernen",
        option_b: "Schule",
        richtig: "b",
        erklaerung: "Schule ist das Nomen — es benennt einen Ort."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — Vogel oder fliegen?",
        option_a: "Vogel",
        option_b: "fliegen",
        richtig: "a",
        erklaerung: "Vogel ist das Nomen."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — groß oder Tisch?",
        option_a: "groß",
        option_b: "Tisch",
        richtig: "b",
        erklaerung: "Tisch ist das Nomen — es benennt einen Gegenstand."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist das Nomen?",
        tts: "Welches ist das Nomen? — Buch oder lesen?",
        option_a: "Buch",
        option_b: "lesen",
        richtig: "a",
        erklaerung: "Buch ist das Nomen."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-05 — Nomen werden groß geschrieben
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-05",
    titel: "Nomen schreibt man groß",
    emoji: "🔠",
    stufe: 1,
    erklaerung_tts: "Nomen schreibt man im Deutschen immer mit einem großen Buchstaben am Anfang. Das gilt nur für Nomen — alle anderen Wörter schreibt man klein, außer am Satzanfang.",
    erklaerung_merksatz: "Nomen → immer GROSS. Andere Wörter → klein.",
    aufgaben: [
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der Hund bellt.",
        tts: "Stimmt die Schreibweise? — Der Hund bellt.",
        richtig: "richtig",
        erklaerung: "Ja! Hund ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der hund bellt.",
        tts: "Stimmt die Schreibweise? — Der hund bellt.",
        richtig: "falsch",
        erklaerung: "Nein! Hund ist ein Nomen — es muss groß geschrieben werden: Der Hund bellt."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die Katze schläft.",
        tts: "Stimmt die Schreibweise? — Die Katze schläft.",
        richtig: "richtig",
        erklaerung: "Ja! Katze ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die katze schläft.",
        tts: "Stimmt die Schreibweise? — Die katze schläft.",
        richtig: "falsch",
        erklaerung: "Nein! Katze ist ein Nomen — es muss groß geschrieben werden."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Kind spielt.",
        tts: "Stimmt die Schreibweise? — Das Kind spielt.",
        richtig: "richtig",
        erklaerung: "Ja! Kind ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das kind spielt.",
        tts: "Stimmt die Schreibweise? — Das kind spielt.",
        richtig: "falsch",
        erklaerung: "Nein! Kind ist ein Nomen — es muss groß geschrieben werden."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der Ball rollt.",
        tts: "Stimmt die Schreibweise? — Der Ball rollt.",
        richtig: "richtig",
        erklaerung: "Ja! Ball ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der ball rollt.",
        tts: "Stimmt die Schreibweise? — Der ball rollt.",
        richtig: "falsch",
        erklaerung: "Nein! Ball ist ein Nomen — es muss groß geschrieben werden."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Haus ist groß.",
        tts: "Stimmt die Schreibweise? — Das Haus ist groß.",
        richtig: "richtig",
        erklaerung: "Ja! Haus ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das haus ist groß.",
        tts: "Stimmt die Schreibweise? — Das haus ist groß.",
        richtig: "falsch",
        erklaerung: "Nein! Haus ist ein Nomen — es muss groß geschrieben werden: Das Haus ist groß."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-06 — Verben: Was passiert hier?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-06",
    titel: "Verben: Tun-Wörter",
    emoji: "🏃",
    stufe: 1,
    erklaerung_tts: "Verben sind Tun-Wörter. Sie sagen, was jemand tut oder was passiert. Laufen, schlafen, essen, spielen — das sind alles Verben. Verben schreibt man klein.",
    erklaerung_merksatz: "Verb = Tun-Wort. Was passiert? Was tut jemand?",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'laufen' ein Verb?",
        tts: "Ist laufen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Laufen ist ein Verb — es sagt, was jemand tut."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Hund' ein Verb?",
        tts: "Ist Hund ein Verb?",
        richtig: "nein",
        erklaerung: "Nein. Hund ist ein Nomen — ein Name für ein Tier."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'schlafen' ein Verb?",
        tts: "Ist schlafen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Schlafen ist ein Verb."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'groß' ein Verb?",
        tts: "Ist groß ein Verb?",
        richtig: "nein",
        erklaerung: "Nein. Groß sagt, wie etwas ist — das ist kein Verb."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'spielen' ein Verb?",
        tts: "Ist spielen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Spielen ist ein Verb."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Schule' ein Verb?",
        tts: "Ist Schule ein Verb?",
        richtig: "nein",
        erklaerung: "Nein. Schule ist ein Nomen — ein Name für einen Ort."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'essen' ein Verb?",
        tts: "Ist essen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Essen ist ein Verb — es sagt, was jemand tut."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'schön' ein Verb?",
        tts: "Ist schön ein Verb?",
        richtig: "nein",
        erklaerung: "Nein. Schön sagt, wie etwas ist — das ist kein Verb."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'rennen' ein Verb?",
        tts: "Ist rennen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Rennen ist ein Verb."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Ball' ein Verb?",
        tts: "Ist Ball ein Verb?",
        richtig: "nein",
        erklaerung: "Nein. Ball ist ein Nomen — ein Name für einen Gegenstand."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-07 — Verb erkennen im Satz
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-07",
    titel: "Verb im Satz finden",
    emoji: "🔎",
    stufe: 1,
    erklaerung_tts: "Jetzt suchen wir das Verb im Satz! Das Verb sagt, was im Satz passiert. Ich zeige dir einen kurzen Satz — tippe auf das Tun-Wort!",
    erklaerung_merksatz: "Was passiert im Satz? Das ist das Verb!",
    aufgaben: [
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Der Hund bellt.",
        woerter: ["Der", "Hund", "bellt."],
        richtig: 2,
        erklaerung: "Bellt ist das Verb — es sagt, was der Hund tut."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Das Kind läuft.",
        woerter: ["Das", "Kind", "läuft."],
        richtig: 2,
        erklaerung: "Läuft ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Die Katze schläft.",
        woerter: ["Die", "Katze", "schläft."],
        richtig: 2,
        erklaerung: "Schläft ist das Verb — es sagt, was die Katze tut."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Peter singt laut.",
        woerter: ["Peter", "singt", "laut."],
        richtig: 1,
        erklaerung: "Singt ist das Verb — es sagt, was Peter tut."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Der Ball rollt.",
        woerter: ["Der", "Ball", "rollt."],
        richtig: 2,
        erklaerung: "Rollt ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Das Baby weint.",
        woerter: ["Das", "Baby", "weint."],
        richtig: 2,
        erklaerung: "Weint ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Wir spielen Fußball.",
        woerter: ["Wir", "spielen", "Fußball."],
        richtig: 1,
        erklaerung: "Spielen ist das Verb — es sagt, was wir tun."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Die Sonne scheint.",
        woerter: ["Die", "Sonne", "scheint."],
        richtig: 2,
        erklaerung: "Scheint ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Das Mädchen tanzt.",
        woerter: ["Das", "Mädchen", "tanzt."],
        richtig: 2,
        erklaerung: "Tanzt ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Maria liest laut.",
        woerter: ["Maria", "liest", "laut."],
        richtig: 1,
        erklaerung: "Liest ist das Verb — es sagt, was Maria tut."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-08 — Adjektive: Wie ist es?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-08",
    titel: "Adjektive: Wie-Wörter",
    emoji: "🎨",
    stufe: 1,
    erklaerung_tts: "Adjektive sind Wie-Wörter. Sie sagen, wie etwas ist. Groß, klein, schön, rot, schnell — das sind alles Adjektive. Adjektive schreibt man klein.",
    erklaerung_merksatz: "Adjektiv = Wie-Wort. Wie ist es? Wie sieht es aus?",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'groß' ein Adjektiv?",
        tts: "Ist groß ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Groß ist ein Adjektiv — es sagt, wie etwas ist."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Hund' ein Adjektiv?",
        tts: "Ist Hund ein Adjektiv?",
        richtig: "nein",
        erklaerung: "Nein. Hund ist ein Nomen — ein Name für ein Tier."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'schön' ein Adjektiv?",
        tts: "Ist schön ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Schön ist ein Adjektiv."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'laufen' ein Adjektiv?",
        tts: "Ist laufen ein Adjektiv?",
        richtig: "nein",
        erklaerung: "Nein. Laufen ist ein Verb — ein Tun-Wort."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'rot' ein Adjektiv?",
        tts: "Ist rot ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Rot ist ein Adjektiv — es sagt, welche Farbe etwas hat."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Haus' ein Adjektiv?",
        tts: "Ist Haus ein Adjektiv?",
        richtig: "nein",
        erklaerung: "Nein. Haus ist ein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'klein' ein Adjektiv?",
        tts: "Ist klein ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Klein ist ein Adjektiv."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'spielen' ein Adjektiv?",
        tts: "Ist spielen ein Adjektiv?",
        richtig: "nein",
        erklaerung: "Nein. Spielen ist ein Verb — ein Tun-Wort."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'schnell' ein Adjektiv?",
        tts: "Ist schnell ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Schnell ist ein Adjektiv — es sagt, wie etwas passiert."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Ball' ein Adjektiv?",
        tts: "Ist Ball ein Adjektiv?",
        richtig: "nein",
        erklaerung: "Nein. Ball ist ein Nomen."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-09 — Adjektiv erkennen im Satz
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-09",
    titel: "Adjektiv im Satz finden",
    emoji: "✨",
    stufe: 1,
    erklaerung_tts: "Jetzt suchen wir das Adjektiv im Satz! Das Adjektiv sagt, wie etwas ist. Tippe auf das Wie-Wort!",
    erklaerung_merksatz: "Wie ist es im Satz? Das ist das Adjektiv!",
    aufgaben: [
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Der Hund ist groß.",
        woerter: ["Der", "Hund", "ist", "groß."],
        richtig: 3,
        erklaerung: "Groß ist das Adjektiv — es sagt, wie der Hund ist."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Die Rose ist rot.",
        woerter: ["Die", "Rose", "ist", "rot."],
        richtig: 3,
        erklaerung: "Rot ist das Adjektiv — es sagt, welche Farbe die Rose hat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Das Kind ist klein.",
        woerter: ["Das", "Kind", "ist", "klein."],
        richtig: 3,
        erklaerung: "Klein ist das Adjektiv."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Der rote Ball rollt.",
        woerter: ["Der", "rote", "Ball", "rollt."],
        richtig: 1,
        erklaerung: "Rote ist das Adjektiv — es sagt, wie der Ball aussieht."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Die Sonne ist hell.",
        woerter: ["Die", "Sonne", "ist", "hell."],
        richtig: 3,
        erklaerung: "Hell ist das Adjektiv."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Das große Haus steht.",
        woerter: ["Das", "große", "Haus", "steht."],
        richtig: 1,
        erklaerung: "Große ist das Adjektiv — es sagt, wie das Haus ist."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Der Hund ist schnell.",
        woerter: ["Der", "Hund", "ist", "schnell."],
        richtig: 3,
        erklaerung: "Schnell ist das Adjektiv."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Das kalte Wasser fließt.",
        woerter: ["Das", "kalte", "Wasser", "fließt."],
        richtig: 1,
        erklaerung: "Kalte ist das Adjektiv — es sagt, wie das Wasser ist."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Die Nacht ist dunkel.",
        woerter: ["Die", "Nacht", "ist", "dunkel."],
        richtig: 3,
        erklaerung: "Dunkel ist das Adjektiv."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Der süße Apfel schmeckt.",
        woerter: ["Der", "süße", "Apfel", "schmeckt."],
        richtig: 1,
        erklaerung: "Süße ist das Adjektiv — es sagt, wie der Apfel schmeckt."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-10 — Was ist ein Artikel?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-10",
    titel: "Was ist ein Artikel?",
    emoji: "🏷️",
    stufe: 2,
    erklaerung_tts: "Vor fast jedem Nomen steht ein Artikel. Die deutschen Artikel heißen: der, die, das. Der Artikel zeigt an, welches Geschlecht das Nomen hat. Das musst du für jedes Wort lernen.",
    erklaerung_merksatz: "Artikel = der / die / das — steht vor dem Nomen",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welches ist ein Artikel?",
        tts: "Welches ist ein Artikel? — der oder groß?",
        option_a: "der",
        option_b: "groß",
        richtig: "a",
        erklaerung: "Der ist ein Artikel. Er steht vor einem Nomen."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein Artikel?",
        tts: "Welches ist ein Artikel? — schön oder die?",
        option_a: "schön",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die ist ein Artikel."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein Artikel?",
        tts: "Welches ist ein Artikel? — das oder Hund?",
        option_a: "das",
        option_b: "Hund",
        richtig: "a",
        erklaerung: "Das ist ein Artikel. Hund ist ein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'der' ein Artikel?",
        tts: "Ist der ein Artikel?",
        richtig: "ja",
        erklaerung: "Ja! Der ist ein Artikel."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Haus' ein Artikel?",
        tts: "Ist Haus ein Artikel?",
        richtig: "nein",
        erklaerung: "Nein. Haus ist ein Nomen — kein Artikel."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'die' ein Artikel?",
        tts: "Ist die ein Artikel?",
        richtig: "ja",
        erklaerung: "Ja! Die ist ein Artikel."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'laufen' ein Artikel?",
        tts: "Ist laufen ein Artikel?",
        richtig: "nein",
        erklaerung: "Nein. Laufen ist ein Verb — kein Artikel."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'das' ein Artikel?",
        tts: "Ist das ein Artikel?",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Artikel."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein Artikel?",
        tts: "Welches ist ein Artikel? — laufen oder die?",
        option_a: "laufen",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die ist ein Artikel. Laufen ist ein Verb."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein Artikel?",
        tts: "Welches ist ein Artikel? — der oder Katze?",
        option_a: "der",
        option_b: "Katze",
        richtig: "a",
        erklaerung: "Der ist ein Artikel. Katze ist ein Nomen."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-11 — der / die / das — vertraute Nomen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-11",
    titel: "der / die / das üben",
    emoji: "🔵🔴🟡",
    stufe: 2,
    erklaerung_tts: "Jetzt üben wir! Welcher Artikel passt zu diesem Nomen? Der, die oder das? Das musst du für jedes Wort lernen. Ich helfe dir dabei.",
    erklaerung_merksatz: "der Hund — die Katze — das Kind",
    aufgaben: [
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Hund",
        tts: "Welcher Artikel passt? — Hund",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Hund — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Katze",
        tts: "Welcher Artikel passt? — Katze",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Katze — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Kind",
        tts: "Welcher Artikel passt? — Kind",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Kind — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Schule",
        tts: "Welcher Artikel passt? — Schule",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Schule — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Ball",
        tts: "Welcher Artikel passt? — Ball",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Ball — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Haus",
        tts: "Welcher Artikel passt? — Haus",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Haus — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Sonne",
        tts: "Welcher Artikel passt? — Sonne",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Sonne — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Tisch",
        tts: "Welcher Artikel passt? — Tisch",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Tisch — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Buch",
        tts: "Welcher Artikel passt? — Buch",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Buch — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Mädchen",
        tts: "Welcher Artikel passt? — Mädchen",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Mädchen — das ist richtig. Mädchen ist sächlich."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-12 — Plural: immer "die"
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-12",
    titel: "Plural: immer 'die'",
    emoji: "🔢",
    stufe: 2,
    erklaerung_tts: "Im Plural — also wenn es mehrere gibt — heißt der Artikel immer die. Egal ob es vorher der, die oder das hieß: im Plural ist es immer die Hunde, die Katzen, die Kinder.",
    erklaerung_merksatz: "Plural = immer 'die' — egal was vorher stand!",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Hunde",
        tts: "Welcher Artikel passt bei Mehrzahl? — Hunde",
        option_a: "der",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die Hunde — im Plural immer die."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Katzen",
        tts: "Welcher Artikel passt bei Mehrzahl? — Katzen",
        option_a: "das",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die Katzen — im Plural immer die."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Bücher",
        tts: "Welcher Artikel passt bei Mehrzahl? — Bücher",
        option_a: "die",
        option_b: "das",
        richtig: "a",
        erklaerung: "Die Bücher — im Plural immer die."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Kinder",
        tts: "Welcher Artikel passt bei Mehrzahl? — Kinder",
        option_a: "der",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die Kinder — im Plural immer die."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt der Artikel?",
        satz: "Die Hunde bellen laut.",
        tts: "Stimmt der Artikel? — Die Hunde bellen laut.",
        richtig: "richtig",
        erklaerung: "Ja! Hunde ist Plural — also die Hunde."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt der Artikel?",
        satz: "Der Hunde bellen laut.",
        tts: "Stimmt der Artikel? — Der Hunde bellen laut.",
        richtig: "falsch",
        erklaerung: "Nein! Hunde ist Plural — es muss die Hunde heißen."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt der Artikel?",
        satz: "Die Kinder spielen.",
        tts: "Stimmt der Artikel? — Die Kinder spielen.",
        richtig: "richtig",
        erklaerung: "Ja! Kinder ist Plural — also die Kinder."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt der Artikel?",
        satz: "Das Kinder spielen.",
        tts: "Stimmt der Artikel? — Das Kinder spielen.",
        richtig: "falsch",
        erklaerung: "Nein! Kinder ist Plural — es muss die Kinder heißen."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Bäume",
        tts: "Welcher Artikel passt bei Mehrzahl? — Bäume",
        option_a: "der",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die Bäume — im Plural immer die."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Häuser",
        tts: "Welcher Artikel passt bei Mehrzahl? — Häuser",
        option_a: "die",
        option_b: "das",
        richtig: "a",
        erklaerung: "Die Häuser — im Plural immer die."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-13 — der/die/das — neue Nomen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-13",
    titel: "der / die / das — neue Wörter",
    emoji: "🆕",
    stufe: 2,
    erklaerung_tts: "Jetzt üben wir mit neuen Nomen! Welcher Artikel passt? Der, die oder das? Überlege gut — und vergiss nicht: Manche Endungen verraten den Artikel. Wörter auf -ung, -heit, -keit sind fast immer die.",
    erklaerung_merksatz: "Tipp: -ung, -heit, -keit → meistens 'die'",
    aufgaben: [
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Mond",
        tts: "Welcher Artikel passt? — Mond",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Mond — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Blume",
        tts: "Welcher Artikel passt? — Blume",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Blume — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Tier",
        tts: "Welcher Artikel passt? — Tier",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Tier — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Hand",
        tts: "Welcher Artikel passt? — Hand",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Hand — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Stuhl",
        tts: "Welcher Artikel passt? — Stuhl",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Stuhl — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Wasser",
        tts: "Welcher Artikel passt? — Wasser",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Wasser — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Nacht",
        tts: "Welcher Artikel passt? — Nacht",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Nacht — die ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Apfel",
        tts: "Welcher Artikel passt? — Apfel",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "a",
        erklaerung: "Der Apfel — der ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Herz",
        tts: "Welcher Artikel passt? — Herz",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Herz — das ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Zeitung",
        tts: "Welcher Artikel passt? — Zeitung",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Zeitung — die ist richtig. Wörter auf -ung sind fast immer die."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-14 — Wiederholung & Mix (Stufe 1+2)
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-14",
    titel: "Wiederholung: Wortarten & Artikel",
    emoji: "🔁",
    stufe: 2,
    erklaerung_tts: "Jetzt wiederholen wir alles zusammen! Nomen, Verb, Adjektiv und Artikel — du kennst sie alle. Ich stelle Fragen aus allen Themen.",
    erklaerung_merksatz: "Nomen = Name | Verb = Tun | Adjektiv = Wie | Artikel = der/die/das",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist 'Hund'?",
        tts: "Was ist Hund? Ein Nomen oder ein Verb?",
        option_a: "ein Nomen",
        option_b: "ein Verb",
        richtig: "a",
        erklaerung: "Hund ist ein Nomen — ein Name für ein Tier."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'laufen'?",
        tts: "Was ist laufen? Ein Adjektiv oder ein Verb?",
        option_a: "ein Adjektiv",
        option_b: "ein Verb",
        richtig: "b",
        erklaerung: "Laufen ist ein Verb — ein Tun-Wort."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'schön'?",
        tts: "Was ist schön? Ein Adjektiv oder ein Nomen?",
        option_a: "ein Adjektiv",
        option_b: "ein Nomen",
        richtig: "a",
        erklaerung: "Schön ist ein Adjektiv — ein Wie-Wort."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Sonne",
        tts: "Welcher Artikel passt? — Sonne",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "b",
        erklaerung: "Die Sonne."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Artikel passt?",
        satz: "___ Auto",
        tts: "Welcher Artikel passt? — Auto",
        option_a: "der",
        option_b: "die",
        option_c: "das",
        richtig: "c",
        erklaerung: "Das Auto — das ist richtig."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Verb?",
        tts: "Welches Wort ist das Verb? — Die Katze schläft.",
        woerter: ["Die", "Katze", "schläft."],
        richtig: 2,
        erklaerung: "Schläft ist das Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Adjektiv?",
        tts: "Welches Wort ist das Adjektiv? — Der Himmel ist blau.",
        woerter: ["Der", "Himmel", "ist", "blau."],
        richtig: 3,
        erklaerung: "Blau ist das Adjektiv — es sagt, wie der Himmel ist."
      },
      {
        typ: "ab_wahl",
        frage: "Welcher Artikel passt? (Mehrzahl!)",
        satz: "___ Äpfel",
        tts: "Welcher Artikel passt bei Mehrzahl? — Äpfel",
        option_a: "der",
        option_b: "die",
        richtig: "b",
        erklaerung: "Die Äpfel — im Plural immer die."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der schnelle Hund läuft.",
        tts: "Stimmt die Schreibweise? — Der schnelle Hund läuft.",
        richtig: "richtig",
        erklaerung: "Ja! Hund ist ein Nomen und wird groß geschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die Katzen schlafen tief.",
        tts: "Stimmt die Schreibweise? — Die Katzen schlafen tief.",
        richtig: "richtig",
        erklaerung: "Ja! Katzen ist Plural — also die Katzen. Alles richtig."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // STUFE 3 — Sätze bauen: Subjekt, Prädikat, Objekt
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // E-15 — Was ist das Subjekt?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-15",
    titel: "Was ist das Subjekt?",
    emoji: "🙋",
    stufe: 3,
    erklaerung_tts: "Jeder Satz hat ein Subjekt. Das Subjekt ist die Person oder Sache, die etwas tut. Frage: Wer oder was macht etwas? Die Antwort ist das Subjekt.",
    erklaerung_merksatz: "Subjekt = Wer oder was macht etwas?",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'Der Hund' das Subjekt?",
        satz: "Der Hund bellt laut.",
        tts: "Ist der Hund das Subjekt? — Der Hund bellt laut.",
        richtig: "ja",
        erklaerung: "Ja! Der Hund bellt — der Hund ist das Subjekt."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'laut' das Subjekt?",
        satz: "Der Hund bellt laut.",
        tts: "Ist laut das Subjekt? — Der Hund bellt laut.",
        richtig: "nein",
        erklaerung: "Nein. Laut sagt wie der Hund bellt — es ist kein Subjekt."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Subjekt? (Wer macht etwas?)",
        tts: "Welches Wort ist das Subjekt? — Die Katze schläft.",
        woerter: ["Die", "Katze", "schläft."],
        richtig: 1,
        erklaerung: "Die Katze schläft — Katze ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt im Satz?",
        satz: "Die Sonne scheint heute sehr hell.",
        tts: "Was ist das Subjekt? — Die Sonne scheint heute sehr hell.",
        option_a: "Die Sonne",
        option_b: "sehr hell",
        richtig: "a",
        erklaerung: "Die Sonne scheint — Sonne ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt im Satz?",
        satz: "Der kleine Hund bellt sehr laut.",
        tts: "Was ist das Subjekt? — Der kleine Hund bellt sehr laut.",
        option_a: "bellt sehr laut",
        option_b: "Der kleine Hund",
        richtig: "b",
        erklaerung: "Der kleine Hund bellt — der kleine Hund ist das Subjekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Das rote Auto fährt sehr schnell.",
        tts: "Was ist das Subjekt? — Das rote Auto fährt sehr schnell.",
        option_a: "sehr schnell",
        option_b: "fährt",
        option_c: "Das rote Auto",
        richtig: "c",
        erklaerung: "Das rote Auto fährt — das rote Auto ist das Subjekt."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'schläft' das Subjekt im Satz?",
        satz: "Die Maus schläft im warmen Nest.",
        tts: "Ist schläft das Subjekt? — Die Maus schläft im warmen Nest.",
        richtig: "falsch",
        erklaerung: "Nein. Schläft ist das Verb. Das Subjekt ist die Maus."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Die alte Frau geht in den Laden.",
        tts: "Was ist das Subjekt? — Die alte Frau geht in den Laden.",
        option_a: "Die alte Frau",
        option_b: "in den Laden",
        richtig: "a",
        erklaerung: "Die alte Frau geht — die alte Frau ist das Subjekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Das kleine Mädchen singt ein schönes Lied.",
        tts: "Was ist das Subjekt? — Das kleine Mädchen singt ein schönes Lied.",
        option_a: "singt",
        option_b: "ein schönes Lied",
        option_c: "Das kleine Mädchen",
        richtig: "c",
        erklaerung: "Das kleine Mädchen singt — das kleine Mädchen ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Der große Bruder spielt mit dem Ball.",
        tts: "Was ist das Subjekt? — Der große Bruder spielt mit dem Ball.",
        option_a: "mit dem Ball",
        option_b: "Der große Bruder",
        richtig: "b",
        erklaerung: "Der große Bruder spielt — der große Bruder ist das Subjekt."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-16 — Was ist das Prädikat?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-16",
    titel: "Was ist das Prädikat?",
    emoji: "⚡",
    stufe: 3,
    erklaerung_tts: "Das Prädikat ist das wichtigste Wort im Satz. Es sagt, was passiert — was jemand tut oder ist. Das Prädikat ist immer ein Verb. Frage: Was passiert im Satz?",
    erklaerung_merksatz: "Prädikat = Was passiert? Das ist immer ein Verb!",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'läuft' das Prädikat?",
        satz: "Der Hund läuft schnell.",
        tts: "Ist läuft das Prädikat? — Der Hund läuft schnell.",
        richtig: "ja",
        erklaerung: "Ja! Läuft sagt, was der Hund tut — das ist das Prädikat."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Hund' das Prädikat?",
        satz: "Der Hund läuft schnell.",
        tts: "Ist Hund das Prädikat? — Der Hund läuft schnell.",
        richtig: "nein",
        erklaerung: "Nein. Hund ist das Subjekt. Das Prädikat ist läuft."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Die Katze schläft.",
        woerter: ["Die", "Katze", "schläft."],
        richtig: 2,
        erklaerung: "Schläft sagt, was die Katze tut — das ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Peter spielt Ball.",
        woerter: ["Peter", "spielt", "Ball."],
        richtig: 1,
        erklaerung: "Spielt sagt, was Peter tut — das ist das Prädikat."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Die Sonne scheint hell.",
        tts: "Was ist das Prädikat? — Die Sonne scheint hell.",
        option_a: "scheint",
        option_b: "Die Sonne",
        richtig: "a",
        erklaerung: "Scheint sagt, was die Sonne tut — das ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Anna singt ein Lied.",
        woerter: ["Anna", "singt", "Lied."],
        richtig: 1,
        erklaerung: "Singt ist das Prädikat — es sagt, was Anna tut."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'Vogel' das Prädikat im Satz?",
        satz: "Der Vogel fliegt hoch.",
        tts: "Ist Vogel das Prädikat? — Der Vogel fliegt hoch.",
        richtig: "falsch",
        erklaerung: "Nein. Vogel ist das Subjekt. Das Prädikat ist fliegt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Das Kind lacht laut.",
        tts: "Was ist das Prädikat? — Das Kind lacht laut.",
        option_a: "Das Kind",
        option_b: "lacht",
        richtig: "b",
        erklaerung: "Lacht sagt, was das Kind tut — das ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Der Ball rollt.",
        woerter: ["Der", "Ball", "rollt."],
        richtig: 2,
        erklaerung: "Rollt ist das Prädikat."
      },
      {
        typ: "abc_wahl",
        frage: "Welches Wort ist das Prädikat?",
        satz: "Die Mutter kocht Suppe.",
        tts: "Welches Wort ist das Prädikat? — Die Mutter kocht Suppe.",
        option_a: "Die Mutter",
        option_b: "kocht",
        option_c: "Suppe",
        richtig: "b",
        erklaerung: "Kocht sagt, was die Mutter tut — das ist das Prädikat."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-17 — Subjekt und Prädikat gemeinsam finden
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-17",
    titel: "Subjekt und Prädikat",
    emoji: "🔎",
    stufe: 3,
    erklaerung_tts: "Jetzt üben wir Subjekt und Prädikat zusammen! Das Subjekt fragt: Wer oder was? Das Prädikat fragt: Was passiert? Beide zusammen bilden den Kern des Satzes.",
    erklaerung_merksatz: "Subjekt + Prädikat = Kern des Satzes",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Der Fisch schwimmt im Teich.",
        tts: "Was ist das Subjekt? — Der Fisch schwimmt im Teich.",
        option_a: "Der Fisch",
        option_b: "schwimmt",
        richtig: "a",
        erklaerung: "Der Fisch schwimmt — Fisch ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Der Fisch schwimmt im Teich.",
        tts: "Was ist das Prädikat? — Der Fisch schwimmt im Teich.",
        option_a: "Der Fisch",
        option_b: "schwimmt",
        richtig: "b",
        erklaerung: "Schwimmt sagt, was der Fisch tut — das ist das Prädikat."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Die Lehrerin erklärt die Aufgabe.",
        tts: "Was ist das Subjekt? — Die Lehrerin erklärt die Aufgabe.",
        option_a: "erklärt",
        option_b: "Die Lehrerin",
        richtig: "b",
        erklaerung: "Die Lehrerin erklärt — Lehrerin ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Die Lehrerin erklärt die Aufgabe.",
        tts: "Was ist das Prädikat? — Die Lehrerin erklärt die Aufgabe.",
        option_a: "erklärt",
        option_b: "Die Aufgabe",
        richtig: "a",
        erklaerung: "Erklärt sagt, was die Lehrerin tut — das ist das Prädikat."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist das Subjekt 'spielt' und das Prädikat 'der Junge'?",
        satz: "Der Junge spielt Fußball.",
        tts: "Ist das Subjekt spielt und das Prädikat der Junge? — Der Junge spielt Fußball.",
        richtig: "falsch",
        erklaerung: "Nein! Der Junge ist das Subjekt, spielt ist das Prädikat."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'Die Blume' das Subjekt und 'wächst' das Prädikat?",
        satz: "Die Blume wächst schnell.",
        tts: "Ist die Blume das Subjekt und wächst das Prädikat? — Die Blume wächst schnell.",
        richtig: "richtig",
        erklaerung: "Ja! Die Blume ist das Subjekt, wächst ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Das Baby weint.",
        woerter: ["Das", "Baby", "weint."],
        richtig: 2,
        erklaerung: "Weint ist das Prädikat — es sagt, was das Baby tut."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Subjekt?",
        tts: "Welches Wort ist das Subjekt? — Der Zug fährt schnell.",
        woerter: ["Zug", "fährt", "schnell."],
        richtig: 0,
        erklaerung: "Zug ist das Subjekt — er ist es, der fährt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Das Pferd galoppiert über die Wiese.",
        tts: "Was ist das Subjekt? — Das Pferd galoppiert über die Wiese.",
        option_a: "galoppiert",
        option_b: "die Wiese",
        option_c: "Das Pferd",
        richtig: "c",
        erklaerung: "Das Pferd galoppiert — Pferd ist das Subjekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Das Pferd galoppiert über die Wiese.",
        tts: "Was ist das Prädikat? — Das Pferd galoppiert über die Wiese.",
        option_a: "galoppiert",
        option_b: "die Wiese",
        option_c: "Das Pferd",
        richtig: "a",
        erklaerung: "Galoppiert sagt, was das Pferd tut — das ist das Prädikat."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-18 — Was ist das Objekt?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-18",
    titel: "Was ist das Objekt?",
    emoji: "🎯",
    stufe: 3,
    erklaerung_tts: "Viele Sätze haben noch ein drittes Wort: das Objekt. Das Objekt sagt, wen oder was die Aktion betrifft. Frage: Wen oder was? Die Antwort ist das Objekt.",
    erklaerung_merksatz: "Objekt = Wen oder was betrifft die Aktion?",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'den Ball' das Objekt?",
        satz: "Peter wirft den Ball.",
        tts: "Ist den Ball das Objekt? — Peter wirft den Ball.",
        richtig: "ja",
        erklaerung: "Ja! Peter wirft den Ball — den Ball ist das Objekt."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Peter' das Objekt?",
        satz: "Peter wirft den Ball.",
        tts: "Ist Peter das Objekt? — Peter wirft den Ball.",
        richtig: "nein",
        erklaerung: "Nein. Peter ist das Subjekt — er tut etwas."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Objekt?",
        satz: "Anna liest ein Buch.",
        tts: "Was ist das Objekt? — Anna liest ein Buch.",
        option_a: "Anna",
        option_b: "ein Buch",
        richtig: "b",
        erklaerung: "Ein Buch ist das Objekt — Anna liest es."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Objekt?",
        satz: "Der Hund frisst die Wurst.",
        tts: "Was ist das Objekt? — Der Hund frisst die Wurst.",
        option_a: "Der Hund",
        option_b: "die Wurst",
        richtig: "b",
        erklaerung: "Die Wurst ist das Objekt — der Hund frisst sie."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Objekt? (Wen oder was?)",
        tts: "Welches Wort ist das Objekt? — Die Mutter kauft Brot.",
        woerter: ["Mutter", "kauft", "Brot."],
        richtig: 2,
        erklaerung: "Brot ist das Objekt — die Mutter kauft es."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Objekt?",
        tts: "Welches Wort ist das Objekt? — Der Vater liest die Zeitung.",
        woerter: ["Vater", "liest", "Zeitung."],
        richtig: 2,
        erklaerung: "Zeitung ist das Objekt — der Vater liest sie."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'malt' das Objekt im Satz?",
        satz: "Das Kind malt ein Bild.",
        tts: "Ist malt das Objekt? — Das Kind malt ein Bild.",
        richtig: "falsch",
        erklaerung: "Nein. Malt ist das Prädikat. Das Objekt ist ein Bild."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Objekt?",
        satz: "Lisa füttert den Hund.",
        tts: "Was ist das Objekt? — Lisa füttert den Hund.",
        option_a: "Lisa",
        option_b: "füttert",
        option_c: "den Hund",
        richtig: "c",
        erklaerung: "Den Hund ist das Objekt — Lisa füttert ihn."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Objekt?",
        satz: "Der Koch kocht die Suppe.",
        tts: "Was ist das Objekt? — Der Koch kocht die Suppe.",
        option_a: "Der Koch",
        option_b: "kocht",
        option_c: "die Suppe",
        richtig: "c",
        erklaerung: "Die Suppe ist das Objekt — der Koch kocht sie."
      },
      {
        typ: "richtig_falsch",
        frage: "Hat dieser Satz ein Objekt?",
        satz: "Der Vogel singt.",
        tts: "Hat dieser Satz ein Objekt? — Der Vogel singt.",
        richtig: "falsch",
        erklaerung: "Nein. Der Vogel singt — aber es gibt kein Objekt. Nur Subjekt und Prädikat."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-19 — Subjekt, Prädikat, Objekt erkennen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-19",
    titel: "Subjekt, Prädikat, Objekt",
    emoji: "🧩",
    stufe: 3,
    erklaerung_tts: "Jetzt üben wir alle drei zusammen! Subjekt — wer oder was? Prädikat — was passiert? Objekt — wen oder was betrifft es? Ich zeige dir Sätze und du erkennst die Teile.",
    erklaerung_merksatz: "Subjekt → Prädikat → Objekt — das sind die Teile des Satzes!",
    aufgaben: [
      {
        typ: "abc_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Der Junge isst den Apfel.",
        tts: "Was ist das Subjekt? — Der Junge isst den Apfel.",
        option_a: "Der Junge",
        option_b: "isst",
        option_c: "den Apfel",
        richtig: "a",
        erklaerung: "Der Junge isst — Junge ist das Subjekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Der Junge isst den Apfel.",
        tts: "Was ist das Prädikat? — Der Junge isst den Apfel.",
        option_a: "Der Junge",
        option_b: "isst",
        option_c: "den Apfel",
        richtig: "b",
        erklaerung: "Isst sagt, was der Junge tut — das ist das Prädikat."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Objekt?",
        satz: "Der Junge isst den Apfel.",
        tts: "Was ist das Objekt? — Der Junge isst den Apfel.",
        option_a: "Der Junge",
        option_b: "isst",
        option_c: "den Apfel",
        richtig: "c",
        erklaerung: "Den Apfel ist das Objekt — der Junge isst ihn."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'die Katze' das Subjekt?",
        satz: "Die Katze jagt die Maus.",
        tts: "Ist die Katze das Subjekt? — Die Katze jagt die Maus.",
        richtig: "richtig",
        erklaerung: "Ja! Die Katze jagt — Katze ist das Subjekt."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'die Maus' das Prädikat?",
        satz: "Die Katze jagt die Maus.",
        tts: "Ist die Maus das Prädikat? — Die Katze jagt die Maus.",
        richtig: "falsch",
        erklaerung: "Nein. Die Maus ist das Objekt. Das Prädikat ist jagt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Objekt?",
        satz: "Der Schüler schreibt einen Brief.",
        tts: "Was ist das Objekt? — Der Schüler schreibt einen Brief.",
        option_a: "Der Schüler",
        option_b: "schreibt",
        option_c: "einen Brief",
        richtig: "c",
        erklaerung: "Einen Brief ist das Objekt — der Schüler schreibt ihn."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Das Mädchen singt ein Lied.",
        tts: "Was ist das Subjekt? — Das Mädchen singt ein Lied.",
        option_a: "Das Mädchen",
        option_b: "ein Lied",
        richtig: "a",
        erklaerung: "Das Mädchen singt — Mädchen ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Objekt?",
        satz: "Das Mädchen singt ein Lied.",
        tts: "Was ist das Objekt? — Das Mädchen singt ein Lied.",
        option_a: "Das Mädchen",
        option_b: "ein Lied",
        richtig: "b",
        erklaerung: "Ein Lied ist das Objekt — das Mädchen singt es."
      },
      {
        typ: "richtig_falsch",
        frage: "Hat dieser Satz: Subjekt = Der Arzt, Prädikat = heilt, Objekt = den Patienten?",
        satz: "Der Arzt heilt den Patienten.",
        tts: "Stimmt: Subjekt gleich Der Arzt, Prädikat gleich heilt, Objekt gleich den Patienten? — Der Arzt heilt den Patienten.",
        richtig: "richtig",
        erklaerung: "Genau! Der Arzt ist Subjekt, heilt ist Prädikat, den Patienten ist Objekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was fehlt im Satz? Subjekt, Prädikat oder Objekt?",
        satz: "___ trinkt Wasser.",
        tts: "Was fehlt im Satz? — Leerstelle trinkt Wasser.",
        option_a: "Das Objekt",
        option_b: "Das Prädikat",
        option_c: "Das Subjekt",
        richtig: "c",
        erklaerung: "Das Subjekt fehlt — wer trinkt das Wasser? Das wissen wir nicht."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-20 — Satz selbst bauen (Wiederholung Stufe 3)
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-20",
    titel: "Sätze bauen — Wiederholung",
    emoji: "🏗️",
    stufe: 3,
    erklaerung_tts: "Jetzt wiederholen wir alles aus Stufe 3! Subjekt, Prädikat und Objekt. Du hast das super gelernt. Ich stelle dir gemischte Fragen — du weißt die Antworten!",
    erklaerung_merksatz: "Subjekt + Prädikat + Objekt = ein vollständiger Satz!",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Der Hund frisst den Knochen.",
        tts: "Was ist das Subjekt? — Der Hund frisst den Knochen.",
        option_a: "Der Hund",
        option_b: "den Knochen",
        richtig: "a",
        erklaerung: "Der Hund frisst — Hund ist das Subjekt."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist das Prädikat?",
        satz: "Der Hund frisst den Knochen.",
        tts: "Was ist das Prädikat? — Der Hund frisst den Knochen.",
        option_a: "den Knochen",
        option_b: "frisst",
        richtig: "b",
        erklaerung: "Frisst sagt, was der Hund tut — das ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Subjekt?",
        tts: "Welches Wort ist das Subjekt? — Maria kauft ein Eis.",
        woerter: ["Maria", "kauft", "Eis."],
        richtig: 0,
        erklaerung: "Maria kauft — Maria ist das Subjekt."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Prädikat?",
        tts: "Welches Wort ist das Prädikat? — Maria kauft ein Eis.",
        woerter: ["Maria", "kauft", "Eis."],
        richtig: 1,
        erklaerung: "Kauft sagt, was Maria tut — das ist das Prädikat."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist das Objekt?",
        tts: "Welches Wort ist das Objekt? — Maria kauft ein Eis.",
        woerter: ["Maria", "kauft", "Eis."],
        richtig: 2,
        erklaerung: "Eis ist das Objekt — Maria kauft es."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Reihenfolge: Subjekt — Prädikat — Objekt?",
        satz: "Das Kind malt ein Bild.",
        tts: "Stimmt die Reihenfolge: Subjekt, Prädikat, Objekt? — Das Kind malt ein Bild.",
        richtig: "richtig",
        erklaerung: "Ja! Das Kind (Subjekt) malt (Prädikat) ein Bild (Objekt). Perfekt!"
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Subjekt?",
        satz: "Der Vater baut ein Haus.",
        tts: "Was ist das Subjekt? — Der Vater baut ein Haus.",
        option_a: "ein Haus",
        option_b: "baut",
        option_c: "Der Vater",
        richtig: "c",
        erklaerung: "Der Vater baut — Vater ist das Subjekt."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist das Objekt?",
        satz: "Der Vater baut ein Haus.",
        tts: "Was ist das Objekt? — Der Vater baut ein Haus.",
        option_a: "ein Haus",
        option_b: "baut",
        option_c: "Der Vater",
        richtig: "a",
        erklaerung: "Ein Haus ist das Objekt — der Vater baut es."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'trinkt' das Prädikat?",
        satz: "Der Bär trinkt Wasser.",
        tts: "Ist trinkt das Prädikat? — Der Bär trinkt Wasser.",
        richtig: "richtig",
        erklaerung: "Ja! Trinkt sagt, was der Bär tut — das ist das Prädikat."
      },
      {
        typ: "abc_wahl",
        frage: "Welcher Satzteil fehlt hier?",
        satz: "Die Katze ___ die Maus.",
        tts: "Welcher Satzteil fehlt? — Die Katze, Leerstelle, die Maus.",
        option_a: "das Subjekt",
        option_b: "das Prädikat",
        option_c: "das Objekt",
        richtig: "b",
        erklaerung: "Das Prädikat fehlt — was macht die Katze mit der Maus? Das Verb fehlt!"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // STUFE 4 — Konjugation Gegenwart
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // E-21 — Was ist Konjugation?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-21",
    titel: "Was ist Konjugation?",
    emoji: "🔄",
    stufe: 4,
    erklaerung_tts: "Verben verändern ihre Form — je nachdem, wer etwas tut. Das nennt man Konjugation. Ich laufe — du läufst — er läuft. Dasselbe Verb, aber jedes Mal ein bisschen anders.",
    erklaerung_merksatz: "Konjugation = das Verb ändert sich je nach Person",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Verändert sich das Verb je nach Person?",
        satz: "ich laufe — du läufst — er läuft",
        tts: "Verändert sich das Verb je nach Person? — ich laufe, du läufst, er läuft.",
        richtig: "ja",
        erklaerung: "Ja! Das Verb ändert seine Form — das ist Konjugation."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt zu 'ich'?",
        tts: "Welche Form passt zu ich? — ich laufe oder ich läufst?",
        option_a: "ich laufe",
        option_b: "ich läufst",
        richtig: "a",
        erklaerung: "Ich laufe ist richtig. Die Form für ich endet oft auf -e."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt zu 'du'?",
        tts: "Welche Form passt zu du? — du laufe oder du läufst?",
        option_a: "du laufe",
        option_b: "du läufst",
        richtig: "b",
        erklaerung: "Du läufst ist richtig. Die Form für du endet auf -st."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "er laufe",
        tts: "Ist diese Form richtig? — er laufe.",
        richtig: "falsch",
        erklaerung: "Nein. Richtig ist: er läuft. Die Form für er endet auf -t."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "ich spiele",
        tts: "Ist diese Form richtig? — ich spiele.",
        richtig: "richtig",
        erklaerung: "Ja! Ich spiele ist richtig. Die Form für ich endet auf -e."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt zu 'er'?",
        tts: "Welche Form passt zu er? — er lerne, er lernst, oder er lernt?",
        option_a: "er lerne",
        option_b: "er lernst",
        option_c: "er lernt",
        richtig: "c",
        erklaerung: "Er lernt ist richtig. Die Form für er/sie/es endet auf -t."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt zu 'wir'?",
        tts: "Welche Form passt zu wir? — wir spielt, wir spielen, oder wir spielst?",
        option_a: "wir spielt",
        option_b: "wir spielen",
        option_c: "wir spielst",
        richtig: "b",
        erklaerung: "Wir spielen ist richtig. Die Form für wir endet auf -en."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form ist falsch konjugiert?",
        tts: "Welche Form ist falsch? — du lernst oder du lernen?",
        option_a: "du lernst",
        option_b: "du lernen",
        richtig: "b",
        erklaerung: "Du lernen ist falsch. Richtig ist: du lernst."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "sie malt",
        tts: "Ist diese Form richtig? — sie malt.",
        richtig: "richtig",
        erklaerung: "Ja! Sie malt ist richtig. Die Form für sie endet auf -t."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt zu 'ihr'?",
        tts: "Welche Form passt zu ihr? — ihr spielen oder ihr spielt?",
        option_a: "ihr spielen",
        option_b: "ihr spielt",
        richtig: "b",
        erklaerung: "Ihr spielt ist richtig. Die Form für ihr endet auf -t."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-22 — Personalformen: ich / du / er / wir / ihr / sie
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-22",
    titel: "ich — du — er / sie / es",
    emoji: "👤",
    stufe: 4,
    erklaerung_tts: "Es gibt sechs Personen: ich, du, er, sie, es, wir, ihr, sie. Für jede Person gibt es eine eigene Verbform. Heute lernst du die drei wichtigsten: ich, du, und er oder sie oder es.",
    erklaerung_merksatz: "ich — du — er/sie/es — wir — ihr — sie",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Wer ist gemeint mit 'ich'?",
        tts: "Wer ist gemeint mit ich?",
        option_a: "Die Person, die spricht",
        option_b: "Die Person, die zuhört",
        richtig: "a",
        erklaerung: "Ich bin die Person, die spricht. Du bist die Person, die zuhört."
      },
      {
        typ: "ab_wahl",
        frage: "Wer ist gemeint mit 'du'?",
        tts: "Wer ist gemeint mit du?",
        option_a: "Die Person, die spricht",
        option_b: "Die Person, mit der man spricht",
        richtig: "b",
        erklaerung: "Du ist die Person, mit der man spricht."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Person passt? — 'Der Hund bellt.'",
        tts: "Welche Person passt? — Der Hund bellt.",
        option_a: "ich",
        option_b: "du",
        option_c: "er",
        richtig: "c",
        erklaerung: "Der Hund — er bellt. Ein Tier oder eine Sache ist er, sie oder es."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Person passt? — 'Die Katze schläft.'",
        tts: "Welche Person passt? — Die Katze schläft.",
        option_a: "er",
        option_b: "sie",
        option_c: "es",
        richtig: "b",
        erklaerung: "Die Katze — sie schläft. Die Katze ist weiblich, also sie."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Person passt? — 'Das Kind lacht.'",
        tts: "Welche Person passt? — Das Kind lacht.",
        option_a: "er",
        option_b: "es",
        richtig: "b",
        erklaerung: "Das Kind — es lacht. Das Kind ist sächlich, also es."
      },
      {
        typ: "richtig_falsch",
        frage: "Passt hier 'wir'? — 'Peter und ich spielen.'",
        satz: "Peter und ich spielen. → wir spielen",
        tts: "Passt hier wir? — Peter und ich spielen, also wir spielen.",
        richtig: "richtig",
        erklaerung: "Ja! Peter und ich zusammen — das ist wir."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Person passt? — 'Du und Max lernt.'",
        tts: "Welche Person passt? — Du und Max.",
        option_a: "wir",
        option_b: "ihr",
        richtig: "b",
        erklaerung: "Du und Max zusammen — das ist ihr. Ihr lernt."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Verbform passt zu 'ich'?",
        tts: "Welche Verbform passt zu ich? — malen",
        option_a: "ich malst",
        option_b: "ich male",
        option_c: "ich malt",
        richtig: "b",
        erklaerung: "Ich male ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Verbform passt zu 'du'?",
        tts: "Welche Verbform passt zu du? — lernen",
        option_a: "du lernen",
        option_b: "du lerne",
        option_c: "du lernst",
        richtig: "c",
        erklaerung: "Du lernst ist richtig. Die du-Form endet auf -st."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'sie malen' richtig? (für: Anna und Lisa malen.)",
        satz: "Anna und Lisa malen. → sie malen",
        tts: "Ist sie malen richtig? — Anna und Lisa malen, also sie malen.",
        richtig: "richtig",
        erklaerung: "Ja! Mehrere Personen zusammen — das ist sie. Sie malen ist richtig."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-23 — Das Verb "sein" konjugieren
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-23",
    titel: "Das Verb \"sein\"",
    emoji: "🌟",
    stufe: 4,
    erklaerung_tts: "Das Verb sein ist sehr wichtig und sehr besonders. Es heißt: ich bin, du bist, er oder sie ist, wir sind, ihr seid, sie sind. Diese Formen musst du auswendig lernen!",
    erklaerung_merksatz: "ich bin — du bist — er/sie/es ist — wir sind — ihr seid — sie sind",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Ich ___ müde.",
        tts: "Welche Form passt? — Ich bin oder ich bist?",
        option_a: "bin",
        option_b: "bist",
        richtig: "a",
        erklaerung: "Ich bin müde. Die Form für ich heißt bin."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Du ___ stark.",
        tts: "Welche Form passt? — Du bist oder du bin?",
        option_a: "bist",
        option_b: "bin",
        richtig: "a",
        erklaerung: "Du bist stark. Die Form für du heißt bist."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Der Hund ___ groß.",
        tts: "Welche Form passt? — Der Hund ist, bin, oder bist?",
        option_a: "bin",
        option_b: "bist",
        option_c: "ist",
        richtig: "c",
        erklaerung: "Der Hund ist groß. Die Form für er/sie/es heißt ist."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Wir ___ Freunde.",
        tts: "Welche Form passt? — Wir sind, wir seid, oder wir ist?",
        option_a: "sind",
        option_b: "seid",
        option_c: "ist",
        richtig: "a",
        erklaerung: "Wir sind Freunde. Die Form für wir heißt sind."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Ihr ___ lustig.",
        tts: "Welche Form passt? — Ihr seid oder ihr sind?",
        option_a: "seid",
        option_b: "sind",
        richtig: "a",
        erklaerung: "Ihr seid lustig. Die Form für ihr heißt seid."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Die Kinder ___ glücklich.",
        tts: "Welche Form passt? — Die Kinder sind oder die Kinder seid?",
        option_a: "sind",
        option_b: "seid",
        richtig: "a",
        erklaerung: "Die Kinder sind glücklich. Für mehrere Personen heißt es sind."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Du bist müde.",
        tts: "Ist diese Form richtig? — Du bist müde.",
        richtig: "richtig",
        erklaerung: "Ja! Du bist müde ist richtig."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Ich ist glücklich.",
        tts: "Ist diese Form richtig? — Ich ist glücklich.",
        richtig: "falsch",
        erklaerung: "Nein. Richtig ist: Ich bin glücklich."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Wir sind zu Hause.",
        tts: "Ist diese Form richtig? — Wir sind zu Hause.",
        richtig: "richtig",
        erklaerung: "Ja! Wir sind zu Hause ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Die Sonne ___ warm.",
        tts: "Welche Form passt? — Die Sonne ist, bin oder sind?",
        option_a: "bin",
        option_b: "ist",
        option_c: "sind",
        richtig: "b",
        erklaerung: "Die Sonne ist warm. Die Sonne ist weiblich — sie ist."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-24 — Das Verb "haben" konjugieren
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-24",
    titel: "Das Verb \"haben\"",
    emoji: "🎁",
    stufe: 4,
    erklaerung_tts: "Das Verb haben ist auch sehr wichtig. Es heißt: ich habe, du hast, er oder sie hat, wir haben, ihr habt, sie haben. Lerne diese Formen gut — du brauchst sie sehr oft!",
    erklaerung_merksatz: "ich habe — du hast — er/sie/es hat — wir haben — ihr habt — sie haben",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Ich ___ einen Hund.",
        tts: "Welche Form passt? — Ich habe oder ich hast?",
        option_a: "habe",
        option_b: "hast",
        richtig: "a",
        erklaerung: "Ich habe einen Hund. Die Form für ich heißt habe."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Du ___ viele Freunde.",
        tts: "Welche Form passt? — Du hast oder du habe?",
        option_a: "hast",
        option_b: "habe",
        richtig: "a",
        erklaerung: "Du hast viele Freunde. Die Form für du heißt hast."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Er ___ ein Fahrrad.",
        tts: "Welche Form passt? — Er hat, er habe, oder er hast?",
        option_a: "hat",
        option_b: "habe",
        option_c: "hast",
        richtig: "a",
        erklaerung: "Er hat ein Fahrrad. Die Form für er/sie/es heißt hat."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Wir ___ Hunger.",
        tts: "Welche Form passt? — Wir haben, wir habt, oder wir hat?",
        option_a: "habt",
        option_b: "hat",
        option_c: "haben",
        richtig: "c",
        erklaerung: "Wir haben Hunger. Die Form für wir heißt haben."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Ihr ___ Zeit.",
        tts: "Welche Form passt? — Ihr habt oder ihr haben?",
        option_a: "habt",
        option_b: "haben",
        richtig: "a",
        erklaerung: "Ihr habt Zeit. Die Form für ihr heißt habt."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Die Schüler ___ Bücher.",
        tts: "Welche Form passt? — Die Schüler haben oder die Schüler habt?",
        option_a: "haben",
        option_b: "habt",
        richtig: "a",
        erklaerung: "Die Schüler haben Bücher. Für mehrere Personen: haben."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Sie hat ein schönes Kleid.",
        tts: "Ist diese Form richtig? — Sie hat ein schönes Kleid.",
        richtig: "richtig",
        erklaerung: "Ja! Sie hat ist richtig. Die Form für sie heißt hat."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Du habe ein Eis.",
        tts: "Ist diese Form richtig? — Du habe ein Eis.",
        richtig: "falsch",
        erklaerung: "Nein. Richtig ist: Du hast ein Eis."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Wir haben ein neues Auto.",
        tts: "Ist diese Form richtig? — Wir haben ein neues Auto.",
        richtig: "richtig",
        erklaerung: "Ja! Wir haben ist richtig."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Das Baby ___ Hunger.",
        tts: "Welche Form passt? — Das Baby hat, habe oder habt?",
        option_a: "habe",
        option_b: "habt",
        option_c: "hat",
        richtig: "c",
        erklaerung: "Das Baby hat Hunger. Das Baby ist sächlich — es hat."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-25 — Regelmäßige Verben konjugieren
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-25",
    titel: "Verben konjugieren",
    emoji: "✏️",
    stufe: 4,
    erklaerung_tts: "Jetzt üben wir regelmäßige Verben! Das sind Verben wie spielen, malen, lernen und kaufen. Bei diesen Verben gibt es immer dieselben Endungen: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.",
    erklaerung_merksatz: "ich -e · du -st · er/sie/es -t · wir -en · ihr -t · sie -en",
    aufgaben: [
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (spielen)",
        satz: "Ich ___ Fußball.",
        tts: "Welche Form passt? — Ich spiele, spielst, oder spielt?",
        option_a: "spiele",
        option_b: "spielst",
        option_c: "spielt",
        richtig: "a",
        erklaerung: "Ich spiele Fußball. Die ich-Form endet auf -e."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (spielen)",
        satz: "Du ___ gut.",
        tts: "Welche Form passt? — Du spiele, spielst, oder spielen?",
        option_a: "spiele",
        option_b: "spielst",
        option_c: "spielen",
        richtig: "b",
        erklaerung: "Du spielst gut. Die du-Form endet auf -st."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (malen)",
        satz: "Er ___ ein Bild.",
        tts: "Welche Form passt? — Er male, malst, oder malt?",
        option_a: "male",
        option_b: "malst",
        option_c: "malt",
        richtig: "c",
        erklaerung: "Er malt ein Bild. Die er-Form endet auf -t."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (lernen)",
        satz: "Wir ___ Deutsch.",
        tts: "Welche Form passt? — Wir lerne, lernst, oder lernen?",
        option_a: "lerne",
        option_b: "lernst",
        option_c: "lernen",
        richtig: "c",
        erklaerung: "Wir lernen Deutsch. Die wir-Form endet auf -en."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt? (kaufen)",
        satz: "Ihr ___ Brot.",
        tts: "Welche Form passt? — Ihr kauft oder ihr kaufen?",
        option_a: "kauft",
        option_b: "kaufen",
        richtig: "a",
        erklaerung: "Ihr kauft Brot. Die ihr-Form endet auf -t."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt? (singen)",
        satz: "Sie ___ ein Lied.",
        tts: "Welche Form passt für sie, also mehrere Personen? — singen oder singt?",
        option_a: "singen",
        option_b: "singt",
        richtig: "a",
        erklaerung: "Sie singen ein Lied. Die sie-Form für viele endet auf -en."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Das Kind malt ein Bild.",
        tts: "Ist diese Form richtig? — Das Kind malt ein Bild.",
        richtig: "richtig",
        erklaerung: "Ja! Das Kind malt — es-Form endet auf -t. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Du singest laut.",
        tts: "Ist diese Form richtig? — Du singest laut.",
        richtig: "falsch",
        erklaerung: "Nein. Richtig ist: Du singst laut. Die du-Form endet auf -st."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Wir lachen viel.",
        tts: "Ist diese Form richtig? — Wir lachen viel.",
        richtig: "richtig",
        erklaerung: "Ja! Wir lachen — die wir-Form endet auf -en. Richtig!"
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (tanzen)",
        satz: "Sie ___ schön. (eine Person)",
        tts: "Welche Form passt für sie, also eine Person? — sie tanzt, sie tanze, oder sie tanzen?",
        option_a: "tanzt",
        option_b: "tanze",
        option_c: "tanzen",
        richtig: "a",
        erklaerung: "Sie tanzt schön. Für eine weibliche Person endet die Form auf -t."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-26 — Wiederholung: Konjugation
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-26",
    titel: "Konjugation — Wiederholung",
    emoji: "🏆",
    stufe: 4,
    erklaerung_tts: "Jetzt wiederholen wir alles aus Stufe 4! Du kennst sein, haben und viele andere Verben. Ich stelle dir gemischte Fragen. Du schaffst das!",
    erklaerung_merksatz: "sein: bin/bist/ist/sind/seid · haben: habe/hast/hat/haben/habt",
    aufgaben: [
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Ich ___ acht Jahre alt.",
        tts: "Welche Form von sein passt? — Ich bin, bist oder ist?",
        option_a: "bin",
        option_b: "bist",
        option_c: "ist",
        richtig: "a",
        erklaerung: "Ich bin acht Jahre alt. Die ich-Form von sein ist bin."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form von 'haben' passt?",
        satz: "Er ___ Geburtstag.",
        tts: "Welche Form von haben passt? — Er hat, habe oder hast?",
        option_a: "habe",
        option_b: "hast",
        option_c: "hat",
        richtig: "c",
        erklaerung: "Er hat Geburtstag. Die er-Form von haben ist hat."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form passt? (rennen)",
        satz: "Du ___ schnell.",
        tts: "Welche Form passt? — Du rennst oder du rennen?",
        option_a: "rennst",
        option_b: "rennen",
        richtig: "a",
        erklaerung: "Du rennst schnell. Die du-Form endet auf -st."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Ihr habt viele Aufgaben.",
        tts: "Ist diese Form richtig? — Ihr habt viele Aufgaben.",
        richtig: "richtig",
        erklaerung: "Ja! Ihr habt ist richtig. Die ihr-Form von haben ist habt."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Wir ist müde.",
        tts: "Ist diese Form richtig? — Wir ist müde.",
        richtig: "falsch",
        erklaerung: "Nein. Richtig ist: Wir sind müde. Die wir-Form von sein ist sind."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (schlafen)",
        satz: "Die Kinder ___ schon.",
        tts: "Welche Form passt? — Die Kinder schläft, schlafen oder schlafst?",
        option_a: "schläft",
        option_b: "schlafen",
        option_c: "schlafst",
        richtig: "b",
        erklaerung: "Die Kinder schlafen schon. Für mehrere Personen endet die Form auf -en."
      },
      {
        typ: "ab_wahl",
        frage: "Welche Form von 'sein' passt?",
        satz: "Ihr ___ sehr fleißig.",
        tts: "Welche Form von sein passt? — Ihr seid oder ihr sind?",
        option_a: "seid",
        option_b: "sind",
        richtig: "a",
        erklaerung: "Ihr seid sehr fleißig. Die ihr-Form von sein ist seid."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Sie hat lange Haare.",
        tts: "Ist diese Form richtig? — Sie hat lange Haare.",
        richtig: "richtig",
        erklaerung: "Ja! Sie hat ist richtig. Die sie-Form von haben ist hat."
      },
      {
        typ: "abc_wahl",
        frage: "Welche Form passt? (lesen)",
        satz: "Ich ___ ein Buch.",
        tts: "Welche Form passt? — Ich lese, liest oder lesen?",
        option_a: "lese",
        option_b: "liest",
        option_c: "lesen",
        richtig: "a",
        erklaerung: "Ich lese ein Buch. Die ich-Form endet auf -e."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist diese Form richtig?",
        satz: "Du bist mein Freund.",
        tts: "Ist diese Form richtig? — Du bist mein Freund.",
        richtig: "richtig",
        erklaerung: "Ja! Du bist ist richtig. Die du-Form von sein ist bist."
      }
    ]
  },

  // ── Stufe 5: Singular & Plural ────────────────────────────────────────────

  {
    id: "E-27", titel: "Einzahl und Mehrzahl", emoji: "1️⃣",
    stufe: 5,
    erklaerung_tts: "Heute lernen wir Einzahl und Mehrzahl. Ein Hund — das ist Einzahl. Zwei Hunde — das ist Mehrzahl.",
    erklaerung_merksatz: "Einzahl = ein Ding. Mehrzahl = mehrere Dinge.",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "der Hund",
        tts: "Einzahl oder Mehrzahl? — der Hund",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "a",
        erklaerung: "Der Hund — das ist Einzahl. Es ist nur ein Hund."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "die Hunde",
        tts: "Einzahl oder Mehrzahl? — die Hunde",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Hunde — das ist Mehrzahl. Es sind mehrere Hunde."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "das Kind",
        tts: "Einzahl oder Mehrzahl? — das Kind",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "a",
        erklaerung: "Das Kind — das ist Einzahl. Es ist nur ein Kind."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "die Kinder",
        tts: "Einzahl oder Mehrzahl? — die Kinder",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Kinder — das ist Mehrzahl. Es sind mehrere Kinder."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt das?",
        satz: "\"die Katze\" ist Mehrzahl.",
        tts: "Stimmt das? — die Katze ist Mehrzahl.",
        richtig: "falsch",
        erklaerung: "Nein. Die Katze ist Einzahl. Die Mehrzahl wäre: die Katzen."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt das?",
        satz: "\"die Bücher\" ist Mehrzahl.",
        tts: "Stimmt das? — die Bücher ist Mehrzahl.",
        richtig: "richtig",
        erklaerung: "Ja! Die Bücher ist Mehrzahl. Einzahl wäre: das Buch."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "die Autos",
        tts: "Einzahl oder Mehrzahl? — die Autos",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Autos — das ist Mehrzahl. Einzahl wäre: das Auto."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "der Ball",
        tts: "Einzahl oder Mehrzahl? — der Ball",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "a",
        erklaerung: "Der Ball ist Einzahl. Die Mehrzahl wäre: die Bälle."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt das?",
        satz: "\"die Blumen\" ist Einzahl.",
        tts: "Stimmt das? — die Blumen ist Einzahl.",
        richtig: "falsch",
        erklaerung: "Nein. Die Blumen ist Mehrzahl. Einzahl wäre: die Blume."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl?",
        satz: "die Häuser",
        tts: "Einzahl oder Mehrzahl? — die Häuser",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Häuser ist Mehrzahl. Einzahl wäre: das Haus."
      }
    ]
  },

  {
    id: "E-28", titel: "Mehrzahl bilden (1)", emoji: "🐾",
    stufe: 5,
    erklaerung_tts: "Wie macht man Mehrzahl? Meistens hängt man Buchstaben ans Wort. Hund wird Hunde. Katze wird Katzen. Kind wird Kinder.",
    erklaerung_merksatz: "Hund → Hunde · Katze → Katzen · Kind → Kinder",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Hund'?",
        satz: "der Hund → die ___",
        tts: "Was ist die Mehrzahl von Hund? — die Hunde oder die Hunden?",
        option_a: "Hunde",
        option_b: "Hunden",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Hund ist Hunde."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Katze'?",
        satz: "die Katze → die ___",
        tts: "Was ist die Mehrzahl von Katze? — die Katzen oder die Katzes?",
        option_a: "Katzen",
        option_b: "Katzes",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Katze ist Katzen. Wörter auf -e bekommen meistens -n."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist die Mehrzahl von 'Kind'?",
        satz: "das Kind → die ___",
        tts: "Was ist die Mehrzahl von Kind? — die Kinder, die Kinds oder die Kinde?",
        option_a: "Kinder",
        option_b: "Kinds",
        option_c: "Kinde",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Kind ist Kinder."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Baum'?",
        satz: "der Baum → die ___",
        tts: "Was ist die Mehrzahl von Baum? — die Bäume oder die Baumen?",
        option_a: "Bäume",
        option_b: "Baumen",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Baum ist Bäume. Der Umlaut (ä) kommt dazu."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist die Mehrzahl von 'Buch'?",
        satz: "das Buch → die ___",
        tts: "Was ist die Mehrzahl von Buch? — die Bücher, die Buche oder die Buchs?",
        option_a: "Bücher",
        option_b: "Buche",
        option_c: "Buchs",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Buch ist Bücher."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Stuhl → Stühle",
        tts: "Ist die Mehrzahl richtig? — Stuhl wird Stühle.",
        richtig: "richtig",
        erklaerung: "Ja! Die Mehrzahl von Stuhl ist Stühle."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Blume → Blumen",
        tts: "Ist die Mehrzahl richtig? — Blume wird Blumen.",
        richtig: "richtig",
        erklaerung: "Ja! Die Mehrzahl von Blume ist Blumen."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Auto → Autoen",
        tts: "Ist die Mehrzahl richtig? — Auto wird Autoen.",
        richtig: "falsch",
        erklaerung: "Nein. Die Mehrzahl von Auto ist Autos, nicht Autoen."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Tisch'?",
        satz: "der Tisch → die ___",
        tts: "Was ist die Mehrzahl von Tisch? — die Tische oder die Tischen?",
        option_a: "Tische",
        option_b: "Tischen",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Tisch ist Tische."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist die Mehrzahl von 'Maus'?",
        satz: "die Maus → die ___",
        tts: "Was ist die Mehrzahl von Maus? — die Mäuse, die Mause oder die Mäusen?",
        option_a: "Mäuse",
        option_b: "Mause",
        option_c: "Mäusen",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Maus ist Mäuse. Das au wird zu äu."
      }
    ]
  },

  {
    id: "E-29", titel: "Mehrzahl bilden (2)", emoji: "🌸",
    stufe: 5,
    erklaerung_tts: "Wir üben weiter Mehrzahl. Manche Wörter verändern sich gar nicht. Manche bekommen einen Umlaut. Und manche Wörter enden auf s.",
    erklaerung_merksatz: "Lehrer → Lehrer (gleich) · Ball → Bälle (Umlaut) · Auto → Autos (-s)",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Lehrer'?",
        satz: "der Lehrer → die ___",
        tts: "Was ist die Mehrzahl von Lehrer? — die Lehrer oder die Lehrers?",
        option_a: "Lehrer",
        option_b: "Lehrers",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Lehrer ist Lehrer. Das Wort bleibt gleich."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Fenster'?",
        satz: "das Fenster → die ___",
        tts: "Was ist die Mehrzahl von Fenster? — die Fenster oder die Fensters?",
        option_a: "Fenster",
        option_b: "Fensters",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Fenster ist Fenster. Das Wort bleibt gleich."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist die Mehrzahl von 'Auto'?",
        satz: "das Auto → die ___",
        tts: "Was ist die Mehrzahl von Auto? — die Autos, die Auto oder die Autoen?",
        option_a: "Autos",
        option_b: "Auto",
        option_c: "Autoen",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Auto ist Autos. Fremdwörter bekommen oft -s."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Vögel → Vogel",
        tts: "Ist die Mehrzahl richtig? — Vögel ist die Mehrzahl von Vogel.",
        richtig: "falsch",
        erklaerung: "Nein. Vögel ist die Mehrzahl, nicht Vogel. Vogel ist Einzahl."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Vogel'?",
        satz: "der Vogel → die ___",
        tts: "Was ist die Mehrzahl von Vogel? — die Vögel oder die Vogels?",
        option_a: "Vögel",
        option_b: "Vogels",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Vogel ist Vögel. Das o wird zu ö."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Wörter → Wort",
        tts: "Ist die Mehrzahl richtig? — Wörter ist die Mehrzahl von Wort.",
        richtig: "falsch",
        erklaerung: "Nein. Wort ist Einzahl, Wörter ist die Mehrzahl."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist die Mehrzahl von 'Haus'?",
        satz: "das Haus → die ___",
        tts: "Was ist die Mehrzahl von Haus? — die Häuser, die Hause oder die Hauses?",
        option_a: "Häuser",
        option_b: "Hause",
        option_c: "Hauses",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Haus ist Häuser. Das au wird zu äu."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Schule'?",
        satz: "die Schule → die ___",
        tts: "Was ist die Mehrzahl von Schule? — die Schulen oder die Schules?",
        option_a: "Schulen",
        option_b: "Schules",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Schule ist Schulen. Wörter auf -e bekommen -n."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist die Mehrzahl richtig?",
        satz: "Städte → Stadt",
        tts: "Ist die Mehrzahl richtig? — Städte ist die Mehrzahl von Stadt.",
        richtig: "falsch",
        erklaerung: "Nein. Stadt ist Einzahl, Städte ist Mehrzahl. Hier ist es andersherum."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist die Mehrzahl von 'Hand'?",
        satz: "die Hand → die ___",
        tts: "Was ist die Mehrzahl von Hand? — die Hände oder die Handen?",
        option_a: "Hände",
        option_b: "Handen",
        richtig: "a",
        erklaerung: "Die Mehrzahl von Hand ist Hände. Das a wird zu ä."
      }
    ]
  },

  {
    id: "E-30", titel: "Einzahl und Mehrzahl im Satz", emoji: "📖",
    stufe: 5,
    erklaerung_tts: "Jetzt üben wir Einzahl und Mehrzahl in ganzen Sätzen. Ist das Nomen im Satz Einzahl oder Mehrzahl?",
    erklaerung_merksatz: "Im Satz auf Artikel achten: der/die/das = Einzahl · die (vor Mehrzahl) = Mehrzahl",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl im Satz?",
        satz: "Die Hunde bellen laut.",
        tts: "Einzahl oder Mehrzahl im Satz? — Die Hunde bellen laut.",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Hunde — das ist Mehrzahl. Es sind mehrere Hunde."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl im Satz?",
        satz: "Die Katze schläft auf dem Sofa.",
        tts: "Einzahl oder Mehrzahl im Satz? — Die Katze schläft auf dem Sofa.",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "a",
        erklaerung: "Die Katze — das ist Einzahl. Es ist eine Katze."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist der Satz richtig?",
        satz: "Die Kinder spielen im Garten.",
        tts: "Ist der Satz richtig? — Die Kinder spielen im Garten.",
        richtig: "richtig",
        erklaerung: "Ja! Kinder ist Mehrzahl, und spielen passt zur Mehrzahl."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist der Satz richtig?",
        satz: "Das Bücher liegt auf dem Tisch.",
        tts: "Ist der Satz richtig? — Das Bücher liegt auf dem Tisch.",
        richtig: "falsch",
        erklaerung: "Nein. Bücher ist Mehrzahl — richtig wäre: Die Bücher liegen auf dem Tisch."
      },
      {
        typ: "abc_wahl",
        frage: "Was passt in die Lücke?",
        satz: "Die ___ fliegen durch die Luft.",
        tts: "Was passt in die Lücke? — Die Vogel, die Vögel oder die Vögels fliegen durch die Luft?",
        option_a: "Vogel",
        option_b: "Vögel",
        option_c: "Vögels",
        richtig: "b",
        erklaerung: "Die Vögel fliegen. Vögel ist die Mehrzahl von Vogel."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl im Satz?",
        satz: "Der Baum wächst im Garten.",
        tts: "Einzahl oder Mehrzahl im Satz? — Der Baum wächst im Garten.",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "a",
        erklaerung: "Der Baum — Einzahl. Artikel der zeigt: es ist ein Baum."
      },
      {
        typ: "ab_wahl",
        frage: "Einzahl oder Mehrzahl im Satz?",
        satz: "Die Bäume sind sehr groß.",
        tts: "Einzahl oder Mehrzahl im Satz? — Die Bäume sind sehr groß.",
        option_a: "Einzahl",
        option_b: "Mehrzahl",
        richtig: "b",
        erklaerung: "Die Bäume — Mehrzahl. Es sind mehrere Bäume."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist der Satz richtig?",
        satz: "Die Blumen blühen im Frühling.",
        tts: "Ist der Satz richtig? — Die Blumen blühen im Frühling.",
        richtig: "richtig",
        erklaerung: "Ja! Blumen ist Mehrzahl, und blühen passt zur Mehrzahl."
      },
      {
        typ: "abc_wahl",
        frage: "Was passt in die Lücke?",
        satz: "Das ___ liegt auf dem Boden.",
        tts: "Was passt in die Lücke? — Das Bücher, das Buches oder das Buch liegt auf dem Boden?",
        option_a: "Bücher",
        option_b: "Buches",
        option_c: "Buch",
        richtig: "c",
        erklaerung: "Das Buch liegt auf dem Boden. Nach Artikel das kommt Einzahl."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist der Satz richtig?",
        satz: "Die Kinder spielen gerne Fußball.",
        tts: "Ist der Satz richtig? — Die Kinder spielen gerne Fußball.",
        richtig: "richtig",
        erklaerung: "Ja! Kinder ist Mehrzahl, spielen gerne passt perfekt."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // STUFE 6 — Groß- und Kleinschreibung
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // E-31 — Nomen großschreiben
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-31",
    titel: "Nomen groß",
    emoji: "🔠",
    stufe: 6,
    erklaerung_tts: "Nomen sind Wörter für Dinge, Tiere, Menschen und Orte. Sie fangen immer mit einem großen Buchstaben an! Hund, Tisch, Anna — alle groß.",
    erklaerung_merksatz: "Nomen = GROSSBUCHSTABE\n\n🐕 Hund · 🪑 Tisch · 👧 Anna",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'Hund' ein Nomen?",
        tts: "Ist das Wort Hund ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Hund ist ein Tier — ein Nomen. Nomen werden großgeschrieben."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'laufen' ein Nomen?",
        tts: "Ist das Wort laufen ein Nomen?",
        richtig: "nein",
        erklaerung: "Nein. Laufen ist ein Tuewort (Verb), kein Nomen."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Schule' ein Nomen?",
        tts: "Ist das Wort Schule ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Schule ist ein Ort — ein Nomen. Großgeschrieben."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der hund bellt.",
        woerter: ["Der", "hund", "bellt."],
        richtig: 1,
        erklaerung: "Hund ist ein Nomen: Der Hund bellt."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Mädchen spielt im Garten.",
        tts: "Stimmt die Schreibweise? — Das Mädchen spielt im Garten.",
        richtig: "richtig",
        erklaerung: "Mädchen ist ein Nomen — großgeschrieben. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die katze schläft auf dem sofa.",
        tts: "Stimmt die Schreibweise? — Die katze schläft auf dem sofa.",
        richtig: "falsch",
        erklaerung: "Katze und Sofa sind Nomen — sie müssen großgeschrieben werden."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Ein vogel fliegt.",
        woerter: ["Ein", "vogel", "fliegt."],
        richtig: 1,
        erklaerung: "Vogel ist ein Nomen: Ein Vogel fliegt."
      },
      {
        typ: "ab_wahl",
        frage: "Wie schreibt man Nomen?",
        tts: "Wie schreibt man Nomen — groß oder klein?",
        option_a: "Groß",
        option_b: "Klein",
        richtig: "a",
        erklaerung: "Nomen schreibt man immer groß!"
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Ball' ein Nomen?",
        tts: "Ist das Wort Ball ein Nomen?",
        richtig: "ja",
        erklaerung: "Ja! Ball ist ein Ding — ein Nomen. Großgeschrieben."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der tisch ist braun.",
        woerter: ["Der", "tisch", "ist", "braun."],
        richtig: 1,
        erklaerung: "Tisch ist ein Nomen: Der Tisch ist braun."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-32 — Verben kleinschreiben
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-32",
    titel: "Verben klein",
    emoji: "🏃",
    stufe: 6,
    erklaerung_tts: "Verben sind Tuewörter. Sie sagen uns, was jemand tut. laufen, essen, spielen — Verben schreibt man klein!",
    erklaerung_merksatz: "Verben = kleingeschrieben\n\n🏃 laufen · 🍴 essen · ⚽ spielen · 😴 schlafen",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'spielen' ein Verb?",
        tts: "Ist das Wort spielen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Spielen sagt, was jemand tut — ein Tuewort."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die Katze schläft auf dem Sofa.",
        tts: "Stimmt die Schreibweise? — Die Katze schläft auf dem Sofa.",
        richtig: "richtig",
        erklaerung: "Schläft ist das Verb — kleingeschrieben. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Kind Spielt im Garten.",
        tts: "Stimmt die Schreibweise? — Das Kind Spielt im Garten.",
        richtig: "falsch",
        erklaerung: "Spielt ist ein Verb und wird kleingeschrieben: spielt."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der Hund Bellt laut.",
        woerter: ["Der", "Hund", "Bellt", "laut."],
        richtig: 2,
        erklaerung: "Bellt ist ein Verb: Der Hund bellt laut."
      },
      {
        typ: "ab_wahl",
        frage: "Wie schreibt man Verben?",
        tts: "Wie schreibt man Verben — groß oder klein?",
        option_a: "Groß",
        option_b: "Klein",
        richtig: "b",
        erklaerung: "Verben (Tuewörter) schreibt man immer klein!"
      },
      {
        typ: "ja_nein",
        frage: "Ist 'rennen' ein Verb?",
        tts: "Ist das Wort rennen ein Verb?",
        richtig: "ja",
        erklaerung: "Ja! Rennen ist ein Tuewort — ein Verb."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Anna Singt ein Lied.",
        woerter: ["Anna", "Singt", "ein", "Lied."],
        richtig: 1,
        erklaerung: "Singt ist ein Verb: Anna singt ein Lied."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Papa liest ein Buch.",
        tts: "Stimmt die Schreibweise? — Papa liest ein Buch.",
        richtig: "richtig",
        erklaerung: "Liest ist das Verb — kleingeschrieben. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Mama Kocht das Mittagessen.",
        tts: "Stimmt die Schreibweise? — Mama Kocht das Mittagessen.",
        richtig: "falsch",
        erklaerung: "Kocht ist ein Verb und wird kleingeschrieben: kocht."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Das Baby Schläft fest.",
        woerter: ["Das", "Baby", "Schläft", "fest."],
        richtig: 2,
        erklaerung: "Schläft ist ein Verb: Das Baby schläft fest."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-33 — Adjektive kleinschreiben
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-33",
    titel: "Adjektive klein",
    emoji: "🎨",
    stufe: 6,
    erklaerung_tts: "Adjektive sind Wiewörter. Sie beschreiben, wie etwas ist. groß, schön, schnell — Adjektive schreibt man klein!",
    erklaerung_merksatz: "Adjektive = kleingeschrieben\n\n🌸 schön · 🐢 langsam · 🍬 lecker · 🌟 toll",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist 'schön' ein Adjektiv?",
        tts: "Ist das Wort schön ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Schön beschreibt, wie etwas ist — ein Wiewort."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Essen ist lecker.",
        tts: "Stimmt die Schreibweise? — Das Essen ist lecker.",
        richtig: "richtig",
        erklaerung: "Lecker ist das Adjektiv — kleingeschrieben. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die Blume ist Schön.",
        tts: "Stimmt die Schreibweise? — Die Blume ist Schön.",
        richtig: "falsch",
        erklaerung: "Schön ist ein Adjektiv und wird kleingeschrieben: schön."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der Hund ist Klein.",
        woerter: ["Der", "Hund", "ist", "Klein."],
        richtig: 3,
        erklaerung: "Klein ist ein Adjektiv: Der Hund ist klein."
      },
      {
        typ: "ab_wahl",
        frage: "Wie schreibt man Adjektive?",
        tts: "Wie schreibt man Adjektive — groß oder klein?",
        option_a: "Groß",
        option_b: "Klein",
        richtig: "b",
        erklaerung: "Adjektive (Wiewörter) schreibt man immer klein!"
      },
      {
        typ: "ja_nein",
        frage: "Ist 'lustig' ein Adjektiv?",
        tts: "Ist das Wort lustig ein Adjektiv?",
        richtig: "ja",
        erklaerung: "Ja! Lustig beschreibt, wie jemand ist — ein Wiewort."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Die Sonne scheint Hell.",
        woerter: ["Die", "Sonne", "scheint", "Hell."],
        richtig: 3,
        erklaerung: "Hell ist ein Adjektiv: Die Sonne scheint hell."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der Ball ist rund und bunt.",
        tts: "Stimmt die Schreibweise? — Der Ball ist rund und bunt.",
        richtig: "richtig",
        erklaerung: "Rund und bunt sind Adjektive — kleingeschrieben. Richtig!"
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Baby ist Niedlich.",
        tts: "Stimmt die Schreibweise? — Das Baby ist Niedlich.",
        richtig: "falsch",
        erklaerung: "Niedlich ist ein Adjektiv und wird kleingeschrieben: niedlich."
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der Apfel schmeckt Süß.",
        woerter: ["Der", "Apfel", "schmeckt", "Süß."],
        richtig: 3,
        erklaerung: "Süß ist ein Adjektiv: Der Apfel schmeckt süß."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-34 — Groß oder Klein? — Alles zusammen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-34",
    titel: "Groß oder Klein?",
    emoji: "📝",
    stufe: 6,
    erklaerung_tts: "Jetzt üben wir alles zusammen! Nomen schreibt man groß. Verben und Adjektive schreibt man klein. Schau genau hin!",
    erklaerung_merksatz: "🔠 Nomen = GROSS\n✏️ Verben = klein\n🎨 Adjektive = klein\n\nDer Hund läuft schnell.",
    aufgaben: [
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Der Hund bellt laut.",
        tts: "Stimmt die Schreibweise? — Der Hund bellt laut.",
        richtig: "richtig",
        erklaerung: "Hund = Nomen (groß), bellt = Verb (klein). Alles richtig!"
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Ein vogel singt.",
        woerter: ["Ein", "vogel", "singt."],
        richtig: 1,
        erklaerung: "Vogel ist ein Nomen: Ein Vogel singt."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Das Kind Läuft schnell.",
        tts: "Stimmt die Schreibweise? — Das Kind Läuft schnell.",
        richtig: "falsch",
        erklaerung: "Läuft ist ein Verb und wird kleingeschrieben: läuft."
      },
      {
        typ: "abc_wahl",
        frage: "Was muss großgeschrieben werden?",
        tts: "Was muss großgeschrieben werden — laufen, Tisch oder schön?",
        option_a: "laufen",
        option_b: "Tisch",
        option_c: "schön",
        richtig: "b",
        erklaerung: "Tisch ist ein Nomen — es wird großgeschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Mein Bruder ist sehr lustig.",
        tts: "Stimmt die Schreibweise? — Mein Bruder ist sehr lustig.",
        richtig: "richtig",
        erklaerung: "Bruder = Nomen (groß), lustig = Adjektiv (klein). Richtig!"
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der Ball ist Rund.",
        woerter: ["Der", "Ball", "ist", "Rund."],
        richtig: 3,
        erklaerung: "Rund ist ein Adjektiv: Der Ball ist rund."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Die Sonne Scheint hell.",
        tts: "Stimmt die Schreibweise? — Die Sonne Scheint hell.",
        richtig: "falsch",
        erklaerung: "Scheint ist ein Verb und wird kleingeschrieben: scheint."
      },
      {
        typ: "abc_wahl",
        frage: "Welches Wort ist ein Nomen?",
        tts: "Welches Wort ist ein Nomen — laufen, schön oder Schule?",
        option_a: "laufen",
        option_b: "schön",
        option_c: "Schule",
        richtig: "c",
        erklaerung: "Schule ist ein Ort — ein Nomen. Nomen werden großgeschrieben."
      },
      {
        typ: "richtig_falsch",
        frage: "Stimmt die Schreibweise?",
        satz: "Anna spielt gerne Fußball.",
        tts: "Stimmt die Schreibweise? — Anna spielt gerne Fußball.",
        richtig: "richtig",
        erklaerung: "Anna und Fußball = Nomen (groß), spielt = Verb (klein). Richtig!"
      },
      {
        typ: "wort_button",
        frage: "Welches Wort ist falsch geschrieben?",
        tts: "Welches Wort ist falsch geschrieben? — Der tisch ist braun.",
        woerter: ["Der", "tisch", "ist", "braun."],
        richtig: 1,
        erklaerung: "Tisch ist ein Nomen: Der Tisch ist braun."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // STUFE 7 — Kasus (Wer-Fall und Wen-Fall)
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // E-35 — Der Wer-Fall
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-35", titel: "Der Wer-Fall", emoji: "❓", stufe: 7,
    erklaerung_tts: "In jedem Satz tut jemand etwas. Dieser jemand ist der Wer-Fall. Wir fragen: WER tut das? Zum Beispiel: Der Hund bellt. WER bellt? Der Hund! Das ist der Wer-Fall.",
    erklaerung_merksatz: "WER tut das?\n\n❓ Der Hund bellt.\nWER bellt? → Der Hund!\n\nDas ist der Wer-Fall.",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Fragen wir nach dem Wer-Fall mit dem Wort 'Wer?'",
        tts: "Fragen wir nach dem Wer-Fall mit dem Wort: Wer?",
        richtig: "ja",
        erklaerung: "Ja! Der Wer-Fall antwortet auf die Frage: WER?"
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Die Katze' die Antwort auf WER schläft?",
        satz: "Die Katze schläft.",
        tts: "Ist Die Katze die Antwort auf WER schläft? — Die Katze schläft.",
        richtig: "ja",
        erklaerung: "Ja! Die Katze ist der Wer-Fall. WER schläft? Die Katze!"
      },
      {
        typ: "ab_wahl",
        frage: "Wer bellt?",
        satz: "Der Hund bellt laut.",
        tts: "Wer bellt? — Der Hund bellt laut.",
        option_a: "Der Hund",
        option_b: "laut",
        richtig: "a",
        erklaerung: "Der Hund ist die Antwort auf WER bellt — das ist der Wer-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Wer spielt?",
        satz: "Das Kind spielt im Garten.",
        tts: "Wer spielt? — Das Kind spielt im Garten.",
        option_a: "im Garten",
        option_b: "Das Kind",
        richtig: "b",
        erklaerung: "Das Kind ist die Antwort auf WER spielt — das ist der Wer-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wer-Fall!",
        tts: "Klick auf das Nomen im Wer-Fall! — Die Katze schläft.",
        woerter: ["Die", "Katze", "schläft."],
        richtig: 1,
        erklaerung: "Katze ist das Nomen im Wer-Fall! WER schläft? Die Katze."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wer-Fall!",
        tts: "Klick auf das Nomen im Wer-Fall! — Der Vogel singt.",
        woerter: ["Der", "Vogel", "singt."],
        richtig: 1,
        erklaerung: "Vogel ist das Nomen im Wer-Fall! WER singt? Der Vogel."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'Mama' hier der Wer-Fall?",
        satz: "Mama liest ein Buch.",
        tts: "Ist Mama hier der Wer-Fall? — Mama liest ein Buch.",
        richtig: "richtig",
        erklaerung: "Ja! WER liest? Mama. Mama ist der Wer-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'ein Buch' hier der Wer-Fall?",
        satz: "Mama liest ein Buch.",
        tts: "Ist ein Buch hier der Wer-Fall? — Mama liest ein Buch.",
        richtig: "falsch",
        erklaerung: "Nein! WER liest? Mama. Das Buch ist nicht der Wer-Fall."
      },
      {
        typ: "abc_wahl",
        frage: "Wer rennt?",
        satz: "Der Hund rennt schnell.",
        tts: "Wer rennt? — Der Hund rennt schnell.",
        option_a: "Der Hund",
        option_b: "schnell",
        option_c: "rennt",
        richtig: "a",
        erklaerung: "Der Hund ist die Antwort auf WER rennt — das ist der Wer-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wer-Fall!",
        tts: "Klick auf das Nomen im Wer-Fall! — Papa lacht laut.",
        woerter: ["Papa", "lacht", "laut."],
        richtig: 0,
        erklaerung: "Papa ist das Nomen im Wer-Fall! WER lacht? Papa."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-36 — Der Wen-Fall
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-36", titel: "Der Wen-Fall", emoji: "🎯", stufe: 7,
    erklaerung_tts: "Im Satz gibt es oft etwas oder jemanden, der eine Aktion bekommt. Das ist der Wen-Fall. Wir fragen: WEN? oder WAS? Zum Beispiel: Das Kind sieht den Hund. WEN sieht das Kind? Den Hund! Das ist der Wen-Fall.",
    erklaerung_merksatz: "WEN oder WAS?\n\n🎯 Das Kind sieht den Hund.\nWEN sieht es? → den Hund!\n\nDas ist der Wen-Fall.",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Fragen wir nach dem Wen-Fall mit 'Wen?' oder 'Was?'",
        tts: "Fragen wir nach dem Wen-Fall mit Wen oder Was?",
        richtig: "ja",
        erklaerung: "Ja! Der Wen-Fall antwortet auf die Frage: WEN? oder WAS?"
      },
      {
        typ: "ja_nein",
        frage: "Ist 'den Ball' die Antwort auf WAS tritt der Hund?",
        satz: "Der Hund tritt den Ball.",
        tts: "Ist den Ball die Antwort auf WAS tritt der Hund? — Der Hund tritt den Ball.",
        richtig: "ja",
        erklaerung: "Ja! Den Ball ist der Wen-Fall. WAS tritt der Hund? Den Ball!"
      },
      {
        typ: "ab_wahl",
        frage: "Was sieht das Kind?",
        satz: "Das Kind sieht den Hund.",
        tts: "Was sieht das Kind? — Das Kind sieht den Hund.",
        option_a: "Das Kind",
        option_b: "den Hund",
        richtig: "b",
        erklaerung: "Den Hund ist die Antwort auf WAS sieht das Kind — das ist der Wen-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Was trinkt Mama?",
        satz: "Mama trinkt den Tee.",
        tts: "Was trinkt Mama? — Mama trinkt den Tee.",
        option_a: "den Tee",
        option_b: "Mama",
        richtig: "a",
        erklaerung: "Den Tee ist die Antwort auf WAS trinkt Mama — das ist der Wen-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wen-Fall!",
        tts: "Klick auf das Nomen im Wen-Fall! — Er trägt den Koffer.",
        woerter: ["Er", "trägt", "den", "Koffer."],
        richtig: 3,
        erklaerung: "Koffer ist das Nomen im Wen-Fall! WAS trägt er? Den Koffer."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wen-Fall!",
        tts: "Klick auf das Nomen im Wen-Fall! — Papa liest das Buch.",
        woerter: ["Papa", "liest", "das", "Buch."],
        richtig: 3,
        erklaerung: "Buch ist das Nomen im Wen-Fall! WAS liest Papa? Das Buch."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'den Ball' hier der Wen-Fall?",
        satz: "Anna wirft den Ball.",
        tts: "Ist den Ball hier der Wen-Fall? — Anna wirft den Ball.",
        richtig: "richtig",
        erklaerung: "Ja! WAS wirft Anna? Den Ball. Das ist der Wen-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'Anna' hier der Wen-Fall?",
        satz: "Anna wirft den Ball.",
        tts: "Ist Anna hier der Wen-Fall? — Anna wirft den Ball.",
        richtig: "falsch",
        erklaerung: "Nein! Anna ist der Wer-Fall. WER wirft? Anna. Den Ball ist der Wen-Fall."
      },
      {
        typ: "abc_wahl",
        frage: "Was kauft Mama?",
        satz: "Mama kauft die Blume.",
        tts: "Was kauft Mama? — Mama kauft die Blume.",
        option_a: "Mama",
        option_b: "kauft",
        option_c: "die Blume",
        richtig: "c",
        erklaerung: "Die Blume ist die Antwort auf WAS kauft Mama — das ist der Wen-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wen-Fall!",
        tts: "Klick auf das Nomen im Wen-Fall! — Sie malt ein Bild.",
        woerter: ["Sie", "malt", "ein", "Bild."],
        richtig: 3,
        erklaerung: "Bild ist das Nomen im Wen-Fall! WAS malt sie? Ein Bild."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-37 — Wer oder Wen?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-37", titel: "Wer oder Wen?", emoji: "🔍", stufe: 7,
    erklaerung_tts: "Jetzt üben wir beide Fälle zusammen! Der Wer-Fall fragt WER. Der Wen-Fall fragt WEN oder WAS. In jedem Satz gibt es oft beides!",
    erklaerung_merksatz: "❓ WER tut es? → Wer-Fall\n🎯 WEN oder WAS? → Wen-Fall\n\nDer Hund sieht die Katze.\nWER? Der Hund  —  WEN? die Katze",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was ist 'der Hund' in diesem Satz?",
        satz: "Der Hund sieht die Katze.",
        tts: "Was ist der Hund in diesem Satz? — Der Hund sieht die Katze.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "a",
        erklaerung: "WER sieht? Der Hund. Das ist der Wer-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'die Katze' in diesem Satz?",
        satz: "Der Hund sieht die Katze.",
        tts: "Was ist die Katze in diesem Satz? — Der Hund sieht die Katze.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "b",
        erklaerung: "WEN sieht der Hund? Die Katze. Das ist der Wen-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'Papa' in diesem Satz?",
        satz: "Papa kauft den Apfel.",
        tts: "Was ist Papa in diesem Satz? — Papa kauft den Apfel.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "a",
        erklaerung: "WER kauft? Papa. Das ist der Wer-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'den Apfel' in diesem Satz?",
        satz: "Papa kauft den Apfel.",
        tts: "Was ist den Apfel in diesem Satz? — Papa kauft den Apfel.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "b",
        erklaerung: "WAS kauft Papa? Den Apfel. Das ist der Wen-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'das Kind' hier der Wer-Fall?",
        satz: "Das Kind trägt den Rucksack.",
        tts: "Ist das Kind hier der Wer-Fall? — Das Kind trägt den Rucksack.",
        richtig: "richtig",
        erklaerung: "Ja! WER trägt? Das Kind. Das ist der Wer-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'den Rucksack' hier der Wer-Fall?",
        satz: "Das Kind trägt den Rucksack.",
        tts: "Ist den Rucksack hier der Wer-Fall? — Das Kind trägt den Rucksack.",
        richtig: "falsch",
        erklaerung: "Nein! WAS trägt das Kind? Den Rucksack. Das ist der Wen-Fall."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist 'Mama' in diesem Satz?",
        satz: "Mama liest das Buch.",
        tts: "Was ist Mama in diesem Satz? — Mama liest das Buch.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        option_c: "weder noch",
        richtig: "a",
        erklaerung: "WER liest? Mama. Das ist der Wer-Fall."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist 'das Buch' in diesem Satz?",
        satz: "Mama liest das Buch.",
        tts: "Was ist das Buch in diesem Satz? — Mama liest das Buch.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        option_c: "weder noch",
        richtig: "b",
        erklaerung: "WAS liest Mama? Das Buch. Das ist der Wen-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wer-Fall!",
        tts: "Klick auf das Nomen im Wer-Fall! — Anna singt das Lied.",
        woerter: ["Anna", "singt", "das", "Lied."],
        richtig: 0,
        erklaerung: "Anna ist der Wer-Fall. WER singt? Anna!"
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wen-Fall!",
        tts: "Klick auf das Nomen im Wen-Fall! — Anna singt das Lied.",
        woerter: ["Anna", "singt", "das", "Lied."],
        richtig: 3,
        erklaerung: "Lied ist der Wen-Fall. WAS singt Anna? Das Lied!"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-38 — Kasus — Alles zusammen
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-38", titel: "Kasus — zusammen", emoji: "🏆", stufe: 7,
    erklaerung_tts: "Jetzt üben wir alles nochmal! WER tut etwas — Wer-Fall. WEN oder WAS — Wen-Fall. Du schaffst das!",
    erklaerung_merksatz: "❓ WER → Wer-Fall\n🎯 WEN / WAS → Wen-Fall\n\nDer Junge sieht den Hund.\nWER? → Der Junge\nWEN? → den Hund",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Was fragt der Wer-Fall?",
        tts: "Was fragt der Wer-Fall?",
        option_a: "WER?",
        option_b: "WEN oder WAS?",
        richtig: "a",
        erklaerung: "Der Wer-Fall fragt immer: WER tut etwas?"
      },
      {
        typ: "ab_wahl",
        frage: "Was fragt der Wen-Fall?",
        tts: "Was fragt der Wen-Fall?",
        option_a: "WER?",
        option_b: "WEN oder WAS?",
        richtig: "b",
        erklaerung: "Der Wen-Fall fragt immer: WEN oder WAS?"
      },
      {
        typ: "abc_wahl",
        frage: "Was ist 'der Junge' in diesem Satz?",
        satz: "Der Junge tritt den Ball.",
        tts: "Was ist der Junge in diesem Satz? — Der Junge tritt den Ball.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        option_c: "keins von beiden",
        richtig: "a",
        erklaerung: "WER tritt? Der Junge. Das ist der Wer-Fall."
      },
      {
        typ: "abc_wahl",
        frage: "Was ist 'den Ball' in diesem Satz?",
        satz: "Der Junge tritt den Ball.",
        tts: "Was ist den Ball in diesem Satz? — Der Junge tritt den Ball.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        option_c: "keins von beiden",
        richtig: "b",
        erklaerung: "WAS tritt der Junge? Den Ball. Das ist der Wen-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'Die Lehrerin' hier der Wer-Fall?",
        satz: "Die Lehrerin erklärt die Aufgabe.",
        tts: "Ist Die Lehrerin hier der Wer-Fall? — Die Lehrerin erklärt die Aufgabe.",
        richtig: "richtig",
        erklaerung: "Ja! WER erklärt? Die Lehrerin. Das ist der Wer-Fall."
      },
      {
        typ: "richtig_falsch",
        frage: "Ist 'die Aufgabe' hier der Wer-Fall?",
        satz: "Die Lehrerin erklärt die Aufgabe.",
        tts: "Ist die Aufgabe hier der Wer-Fall? — Die Lehrerin erklärt die Aufgabe.",
        richtig: "falsch",
        erklaerung: "Nein! WAS erklärt sie? Die Aufgabe. Das ist der Wen-Fall."
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wer-Fall!",
        tts: "Klick auf das Nomen im Wer-Fall! — Papa sieht den Hund.",
        woerter: ["Papa", "sieht", "den", "Hund."],
        richtig: 0,
        erklaerung: "Papa ist der Wer-Fall. WER sieht? Papa!"
      },
      {
        typ: "wort_button",
        frage: "Klick auf das Nomen im Wen-Fall!",
        tts: "Klick auf das Nomen im Wen-Fall! — Papa sieht den Hund.",
        woerter: ["Papa", "sieht", "den", "Hund."],
        richtig: 3,
        erklaerung: "Hund ist der Wen-Fall. WEN sieht Papa? Den Hund!"
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'das Kind' in diesem Satz?",
        satz: "Das Kind malt ein Bild.",
        tts: "Was ist das Kind in diesem Satz? — Das Kind malt ein Bild.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "a",
        erklaerung: "WER malt? Das Kind. Das ist der Wer-Fall."
      },
      {
        typ: "ab_wahl",
        frage: "Was ist 'ein Bild' in diesem Satz?",
        satz: "Das Kind malt ein Bild.",
        tts: "Was ist ein Bild in diesem Satz? — Das Kind malt ein Bild.",
        option_a: "Wer-Fall",
        option_b: "Wen-Fall",
        richtig: "b",
        erklaerung: "WAS malt das Kind? Ein Bild. Das ist der Wen-Fall."
      }
    ]
  }

];
