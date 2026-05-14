// grammatik_data.js — Grammatik-Werkstatt Aufgaben
// Einheiten E-00 bis E-05 (Stufe 0: Satz/Wort, Stufe 1: Nomen)
// Typen: ja_nein | ab_wahl | abc_wahl | wort_button | richtig_falsch

var GRAMMATIK_EINHEITEN = [

  // ══════════════════════════════════════════════════════════════════
  // E-00 — Was ist ein Satz?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-00",
    titel: "Was ist ein Satz?",
    emoji: "💬",
    stufe: 0,
    erklaerung_tts: "Ein Satz ist eine Aussage, die einen Sinn ergibt. Ein Satz beginnt immer mit einem großen Buchstaben und endet mit einem Punkt.",
    erklaerung_merksatz: "Ein Satz ergibt einen Sinn.",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Der Hund bellt.",
        tts: "Ist das ein Satz? — Der Hund bellt.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz. Er ergibt einen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "bellt Hund der",
        tts: "Ist das ein Satz? — bellt Hund der",
        richtig: "nein",
        erklaerung: "Nein. Die Wörter sind durcheinander — das ergibt keinen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Die Katze schläft.",
        tts: "Ist das ein Satz? — Die Katze schläft.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "schläft Katze die",
        tts: "Ist das ein Satz? — schläft Katze die",
        richtig: "nein",
        erklaerung: "Nein. Das ergibt keinen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Das Kind spielt im Garten.",
        tts: "Ist das ein Satz? — Das Kind spielt im Garten.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Kind Garten spielt",
        tts: "Ist das ein Satz? — Kind Garten spielt",
        richtig: "nein",
        erklaerung: "Nein. Die Wörter ergeben so keinen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Die Sonne scheint.",
        tts: "Ist das ein Satz? — Die Sonne scheint.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "scheint Sonne",
        tts: "Ist das ein Satz? — scheint Sonne",
        richtig: "nein",
        erklaerung: "Nein. Ein Satz braucht die richtige Reihenfolge."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Peter lacht laut.",
        tts: "Ist das ein Satz? — Peter lacht laut.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "lacht laut Peter",
        tts: "Ist das ein Satz? — lacht laut Peter",
        richtig: "nein",
        erklaerung: "Nein. Die Wörter sind durcheinander."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-01 — Was ist ein Wort?
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-01",
    titel: "Was ist ein Wort?",
    emoji: "🔤",
    stufe: 0,
    erklaerung_tts: "Sätze bestehen aus Wörtern. Jedes Wort hat eine Bedeutung. Wörter werden durch Leerzeichen getrennt. Manche Wörter kennen wir — andere nicht.",
    erklaerung_merksatz: "Wörter sind die Bausteine des Satzes.",
    aufgaben: [
      {
        typ: "ab_wahl",
        frage: "Welches ist ein echtes deutsches Wort?",
        tts: "Welches ist ein echtes deutsches Wort?",
        option_a: "Hund",
        option_b: "Blorf",
        richtig: "a",
        erklaerung: "Hund ist ein echtes deutsches Wort. Blorf gibt es nicht."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein echtes deutsches Wort?",
        tts: "Welches ist ein echtes deutsches Wort?",
        option_a: "Zrpf",
        option_b: "Haus",
        richtig: "b",
        erklaerung: "Haus ist ein echtes deutsches Wort."
      },
      {
        typ: "ab_wahl",
        frage: "Welches ist ein echtes deutsches Wort?",
        tts: "Welches ist ein echtes deutsches Wort?",
        option_a: "Katze",
        option_b: "Fnrk",
        richtig: "a",
        erklaerung: "Katze ist ein echtes deutsches Wort."
      },
      {
        typ: "ab_wahl",
        frage: "Wie viele Wörter hat der Satz?",
        tts: "Wie viele Wörter hat der Satz? — Der Hund bellt.",
        satz: "Der Hund bellt.",
        option_a: "3 Wörter",
        option_b: "2 Wörter",
        richtig: "a",
        erklaerung: "Der — Hund — bellt. Das sind 3 Wörter."
      },
      {
        typ: "ab_wahl",
        frage: "Wie viele Wörter hat der Satz?",
        tts: "Wie viele Wörter hat der Satz? — Die Katze schläft.",
        satz: "Die Katze schläft.",
        option_a: "2 Wörter",
        option_b: "3 Wörter",
        richtig: "b",
        erklaerung: "Die — Katze — schläft. Das sind 3 Wörter."
      },
      {
        typ: "ab_wahl",
        frage: "Wie viele Wörter hat der Satz?",
        tts: "Wie viele Wörter hat der Satz? — Der Ball rollt.",
        satz: "Der Ball rollt.",
        option_a: "3 Wörter",
        option_b: "4 Wörter",
        richtig: "a",
        erklaerung: "Der — Ball — rollt. Das sind 3 Wörter."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Schule' ein Wort?",
        tts: "Ist Schule ein Wort?",
        richtig: "ja",
        erklaerung: "Ja! Schule ist ein echtes deutsches Wort."
      },
      {
        typ: "ja_nein",
        frage: "Ist 'Xqwrz' ein Wort?",
        tts: "Ist X-Q-W-R-Z ein Wort?",
        richtig: "nein",
        erklaerung: "Nein. Das ist kein deutsches Wort — es ergibt keinen Sinn."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // E-02 — Satz oder kein Satz? (Übung)
  // ══════════════════════════════════════════════════════════════════
  {
    id: "E-02",
    titel: "Satz oder kein Satz?",
    emoji: "🔍",
    stufe: 0,
    erklaerung_tts: "Jetzt üben wir! Ein Satz ergibt immer einen Sinn. Die Wörter stehen in der richtigen Reihenfolge. Ich zeige dir verschiedene Beispiele — du entscheidest: Satz oder kein Satz?",
    erklaerung_merksatz: "Satz = richtige Reihenfolge + ergibt Sinn",
    aufgaben: [
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Der Vogel singt.",
        tts: "Ist das ein Satz? — Der Vogel singt.",
        richtig: "ja",
        erklaerung: "Ja! Der Vogel singt. Das ergibt einen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "singt Vogel der",
        tts: "Ist das ein Satz? — singt Vogel der",
        richtig: "nein",
        erklaerung: "Nein. Die Wörter sind durcheinander."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Maria liest ein Buch.",
        tts: "Ist das ein Satz? — Maria liest ein Buch.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Buch liest Maria ein",
        tts: "Ist das ein Satz? — Buch liest Maria ein",
        richtig: "nein",
        erklaerung: "Nein. Die Reihenfolge stimmt nicht."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Das Essen schmeckt gut.",
        tts: "Ist das ein Satz? — Das Essen schmeckt gut.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "schmeckt gut Essen",
        tts: "Ist das ein Satz? — schmeckt gut Essen",
        richtig: "nein",
        erklaerung: "Nein. Das ergibt keinen Sinn."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Wir gehen in die Schule.",
        tts: "Ist das ein Satz? — Wir gehen in die Schule.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein vollständiger Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Schule gehen wir in die",
        tts: "Ist das ein Satz? — Schule gehen wir in die",
        richtig: "nein",
        erklaerung: "Nein. Die Reihenfolge ist falsch."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "Es regnet heute.",
        tts: "Ist das ein Satz? — Es regnet heute.",
        richtig: "ja",
        erklaerung: "Ja! Das ist ein Satz."
      },
      {
        typ: "ja_nein",
        frage: "Ist das ein Satz?",
        satz: "heute regnet es",
        tts: "Ist das ein Satz? — heute regnet es",
        richtig: "nein",
        erklaerung: "Nein. Der Satzanfang muss groß geschrieben sein — und die Reihenfolge stimmt nicht."
      }
    ]
  },

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
  }

];
