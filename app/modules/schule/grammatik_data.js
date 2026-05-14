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
  }

];
