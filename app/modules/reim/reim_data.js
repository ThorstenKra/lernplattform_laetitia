// reim_data.js -- Laetitia Lernsystem
// Reimverstaendnis-Aufgaben, aus echten Gedichten kuratiert: window.REIM_EINHEITEN
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
//
// Jede Einheit (G-01..G-05) gehoert zu einem Gedicht aus gedichte_data.js
// (Verweis ueber "gedicht_ref"). Alle Reimpaare und Luecken-Zeilen stammen
// wortwoertlich aus dem jeweiligen Gedicht -- nichts wird erfunden.
//
// Drei Aufgabentypen:
// - reim_wahl:    4 Antworten, welches Wort reimt sich auf "wort"?
// - luecke_wahl:  echte Gedichtzeile mit fehlendem Reimwort am Ende, 4 Antworten
// - reim_janein:  zwei echte Woerter aus dem Gedicht, reimt sich das? (ja/nein)

var REIM_EINHEITEN = [

  // ══════════════════════════════════════════════════════════════════
  { id: "G-01", titel: "Heidenröslein", autor: "Johann Wolfgang von Goethe", emoji: "🌹",
    gedicht_ref: "heidenroeslein",
    erklaerung_tts: "Dieses Gedicht heißt Heidenröslein und wurde vor über zweihundert Jahren von Johann Wolfgang von Goethe geschrieben. Es erzählt von einem Jungen, der ein kleines Röslein auf der Wiese entdeckt. Hör gut hin, welche Wörter sich reimen!",
    erklaerung_merksatz: "Heidenröslein von Goethe -- ein Junge findet ein Röslein",
    aufgaben: [
      { typ: "reim_wahl", wort: "Heiden", tts: "Heiden",
        antwort_a: "Freuden", antwort_b: "Garten", antwort_c: "Wiese", antwort_d: "Blume",
        richtig: "A", erklaerung: "Heiden und Freuden -- das reimt sich! So steht es im Gedicht." },
      { typ: "reim_wahl", wort: "stehn", tts: "stehn",
        antwort_a: "Baum", antwort_b: "sehn", antwort_c: "rot", antwort_d: "Wiese",
        richtig: "B", erklaerung: "stehn und sehn -- das reimt sich!" },
      { typ: "reim_wahl", wort: "dich", tts: "dich",
        antwort_a: "Hand", antwort_b: "Tag", antwort_c: "mich", antwort_d: "Baum",
        richtig: "C", erklaerung: "dich und mich -- das reimt sich!" },
      { typ: "reim_wahl", wort: "brach", tts: "brach",
        antwort_a: "stach", antwort_b: "gut", antwort_c: "Wind", antwort_d: "schön",
        richtig: "A", erklaerung: "brach und stach -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Und der wilde Knabe brach", zeile_luecke: "'s Röslein auf der Heiden; Röslein wehrte sich und",
        tts_bekannt: "Und der wilde Knabe brach", tts_luecke: "'s Röslein auf der Heiden. Röslein wehrte sich und...",
        antwort_a: "sang", antwort_b: "stach", antwort_c: "lief", antwort_d: "rot",
        richtig: "B", erklaerung: "brach und stach -- genau wie im Gedicht!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Sah ein Knab' ein Röslein stehn,", zeile_luecke: "Lief er schnell es nah zu",
        tts_bekannt: "Sah ein Knab ein Röslein stehn,", tts_luecke: "Lief er schnell es nah zu...",
        antwort_a: "Baum", antwort_b: "fassen", antwort_c: "sehn", antwort_d: "Garten",
        richtig: "C", erklaerung: "stehn und sehn -- das reimt sich!" },
      { typ: "reim_janein", wort1: "Heiden", wort2: "leiden", tts: "Heiden — leiden",
        reimt: true, erklaerung: "Ja! Heiden und leiden reimen sich -- genau wie im Gedicht." },
      { typ: "reim_janein", wort1: "stehn", wort2: "Blume", tts: "stehn — Blume",
        reimt: false, erklaerung: "Nein, stehn und Blume reimen sich nicht." },
      { typ: "reim_janein", wort1: "brach", wort2: "Ach", tts: "brach — Ach",
        reimt: true, erklaerung: "Ja! brach und Ach reimen sich." }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "G-02", titel: "Das Veilchen", autor: "Johann Wolfgang von Goethe", emoji: "🌷",
    gedicht_ref: "veilchen",
    erklaerung_tts: "Dieses Gedicht heißt Das Veilchen, von Johann Wolfgang von Goethe. Es erzählt von einem kleinen Veilchen auf der Wiese, das sich wünscht, von einer Schäferin entdeckt zu werden. Hör gut hin, welche Wörter sich reimen!",
    erklaerung_merksatz: "Das Veilchen von Goethe -- eine kleine Blume auf der Wiese",
    aufgaben: [
      { typ: "reim_wahl", wort: "kam", tts: "kam",
        antwort_a: "Wiese", antwort_b: "nahm", antwort_c: "schön", antwort_d: "Blume",
        richtig: "B", erklaerung: "kam und nahm -- das reimt sich!" },
      { typ: "reim_wahl", wort: "noch", tts: "noch",
        antwort_a: "Baum", antwort_b: "Blume", antwort_c: "Wind", antwort_d: "doch",
        richtig: "D", erklaerung: "noch und doch -- das reimt sich!" },
      { typ: "reim_wahl", wort: "nur", tts: "nur",
        antwort_a: "Natur", antwort_b: "Wiese", antwort_c: "schön", antwort_d: "Garten",
        richtig: "A", erklaerung: "nur und Natur -- das reimt sich!" },
      { typ: "reim_wahl", wort: "gedrückt", tts: "gedrückt",
        antwort_a: "Blume", antwort_b: "Wiese", antwort_c: "abgepflückt", antwort_d: "schön",
        richtig: "C", erklaerung: "gedrückt und abgepflückt -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Ach! aber ach! das Mädchen kam", zeile_luecke: "Und nicht in Acht das Veilchen",
        tts_bekannt: "Ach, aber ach! Das Mädchen kam", tts_luecke: "Und nicht in Acht das Veilchen...",
        antwort_a: "sah", antwort_b: "fand", antwort_c: "hielt", antwort_d: "nahm",
        richtig: "D", erklaerung: "kam und nahm -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Es sank und starb und freut' sich noch:", zeile_luecke: "Und sterb' ich denn, so sterb' ich",
        tts_bekannt: "Es sank und starb und freut sich noch:", tts_luecke: "Und sterb ich denn, so sterb ich...",
        antwort_a: "dann", antwort_b: "hier", antwort_c: "doch", antwort_d: "weg",
        richtig: "C", erklaerung: "noch und doch -- das reimt sich!" },
      { typ: "reim_janein", wort1: "kam", wort2: "nahm", tts: "kam — nahm",
        reimt: true, erklaerung: "Ja! kam und nahm reimen sich." },
      { typ: "reim_janein", wort1: "nur", wort2: "Blume", tts: "nur — Blume",
        reimt: false, erklaerung: "Nein, nur und Blume reimen sich nicht." },
      { typ: "reim_janein", wort1: "noch", wort2: "doch", tts: "noch — doch",
        reimt: true, erklaerung: "Ja! noch und doch reimen sich." }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "G-03", titel: "Der Fischer", autor: "Johann Wolfgang von Goethe", emoji: "🎣",
    gedicht_ref: "fischer",
    erklaerung_tts: "Dieses Gedicht heißt Der Fischer, von Johann Wolfgang von Goethe. Es erzählt von einem Fischer und einer geheimnisvollen Frau, die aus dem Wasser auftaucht. Hör gut hin, welche Wörter sich reimen!",
    erklaerung_merksatz: "Der Fischer von Goethe -- eine geheimnisvolle Frau aus dem Wasser",
    aufgaben: [
      { typ: "reim_wahl", wort: "Meer", tts: "Meer",
        antwort_a: "Wind", antwort_b: "her", antwort_c: "Baum", antwort_d: "Sonne",
        richtig: "B", erklaerung: "Meer und her -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Blau", tts: "Blau",
        antwort_a: "Wasser", antwort_b: "Fisch", antwort_c: "Tau", antwort_d: "Angel",
        richtig: "C", erklaerung: "Blau und Tau -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Fuß", tts: "Fuß",
        antwort_a: "Hand", antwort_b: "Kopf", antwort_c: "Arm", antwort_d: "Gruß",
        richtig: "D", erklaerung: "Fuß und Gruß -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Grund", tts: "Grund",
        antwort_a: "Meer", antwort_b: "gesund", antwort_c: "Fisch", antwort_d: "tief",
        richtig: "B", erklaerung: "Grund und gesund -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Labt sich die liebe Sonne nicht,", zeile_luecke: "Der Mond sich nicht im",
        tts_bekannt: "Labt sich die liebe Sonne nicht,", tts_luecke: "Der Mond sich nicht im...",
        antwort_a: "Wald", antwort_b: "Himmel", antwort_c: "Meer", antwort_d: "Fluss",
        richtig: "C", erklaerung: "nicht und Meer klingen im Gedicht zusammen -- so steht es dort!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Lockt dich der tiefe Himmel nicht,", zeile_luecke: "Das feuchtverklärte",
        tts_bekannt: "Lockt dich der tiefe Himmel nicht,", tts_luecke: "Das feuchtverklärte...",
        antwort_a: "Grün", antwort_b: "Gelb", antwort_c: "Rot", antwort_d: "Blau",
        richtig: "D", erklaerung: "Genau, das feuchtverklärte Blau -- so steht es im Gedicht!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Das Wasser rauscht', das Wasser schwoll,", zeile_luecke: "Netzt' ihm den nackten",
        tts_bekannt: "Das Wasser rauschte, das Wasser schwoll,", tts_luecke: "Netzte ihm den nackten...",
        antwort_a: "Arm", antwort_b: "Fuß", antwort_c: "Kopf", antwort_d: "Rücken",
        richtig: "B", erklaerung: "Genau, den nackten Fuß -- so steht es im Gedicht!" },
      { typ: "reim_janein", wort1: "Meer", wort2: "her", tts: "Meer — her",
        reimt: true, erklaerung: "Ja! Meer und her reimen sich." },
      { typ: "reim_janein", wort1: "Blau", wort2: "Angel", tts: "Blau — Angel",
        reimt: false, erklaerung: "Nein, Blau und Angel reimen sich nicht." },
      { typ: "reim_janein", wort1: "Fuß", wort2: "Gruß", tts: "Fuß — Gruß",
        reimt: true, erklaerung: "Ja! Fuß und Gruß reimen sich." }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "G-04", titel: "Der König in Thule", autor: "Johann Wolfgang von Goethe", emoji: "👑",
    gedicht_ref: "koenig_in_thule",
    erklaerung_tts: "Dieses Gedicht heißt Der König in Thule, von Johann Wolfgang von Goethe. Es erzählt von einem alten König, der einen besonderen goldenen Becher besitzt. Hör gut hin, welche Wörter sich reimen!",
    erklaerung_merksatz: "Der König in Thule von Goethe -- ein König und sein goldener Becher",
    aufgaben: [
      { typ: "reim_wahl", wort: "Grab", tts: "Grab",
        antwort_a: "gab", antwort_b: "Meer", antwort_c: "gut", antwort_d: "Wind",
        richtig: "A", erklaerung: "Grab und gab -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Schmaus", tts: "Schmaus",
        antwort_a: "Wasser", antwort_b: "Blume", antwort_c: "daraus", antwort_d: "Baum",
        richtig: "C", erklaerung: "Schmaus und daraus -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Becher", tts: "Becher",
        antwort_a: "Krone", antwort_b: "Zecher", antwort_c: "König", antwort_d: "Ritter",
        richtig: "B", erklaerung: "Becher und Zecher -- das reimt sich!" },
      { typ: "reim_wahl", wort: "trinken", tts: "trinken",
        antwort_a: "lachen", antwort_b: "singen", antwort_c: "sinken", antwort_d: "tanzen",
        richtig: "C", erklaerung: "trinken und sinken -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Dem sterbend seine Buhle", zeile_luecke: "Einen goldnen Becher",
        tts_bekannt: "Dem sterbend seine Buhle", tts_luecke: "Einen goldnen Becher...",
        antwort_a: "nahm", antwort_b: "fand", antwort_c: "sah", antwort_d: "gab",
        richtig: "D", erklaerung: "Grab und gab -- das reimt sich, genau wie im Gedicht!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Und warf den heil'gen Becher", zeile_luecke: "Hinunter in die",
        tts_bekannt: "Und warf den heiligen Becher", tts_luecke: "Hinunter in die...",
        antwort_a: "Erde", antwort_b: "Nacht", antwort_c: "Flut", antwort_d: "Höhle",
        richtig: "C", erklaerung: "Genau, hinunter in die Flut -- so steht es im Gedicht!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Er sah ihn stürzen, trinken", zeile_luecke: "Und",
        tts_bekannt: "Er sah ihn stürzen, trinken", tts_luecke: "Und...",
        antwort_a: "laufen", antwort_b: "fliegen", antwort_c: "springen", antwort_d: "sinken",
        richtig: "D", erklaerung: "trinken und sinken -- das reimt sich!" },
      { typ: "reim_janein", wort1: "Reich", wort2: "zugleich", tts: "Reich — zugleich",
        reimt: true, erklaerung: "Ja! Reich und zugleich reimen sich." },
      { typ: "reim_janein", wort1: "Meer", wort2: "mehr", tts: "Meer — mehr",
        reimt: true, erklaerung: "Ja! Meer und mehr reimen sich." },
      { typ: "reim_janein", wort1: "Becher", wort2: "König", tts: "Becher — König",
        reimt: false, erklaerung: "Nein, Becher und König reimen sich nicht." }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "G-05", titel: "Erlkönig", autor: "Johann Wolfgang von Goethe", emoji: "🌫️",
    gedicht_ref: "erlkoenig",
    erklaerung_tts: "Dieses Gedicht heißt Erlkönig, von Johann Wolfgang von Goethe. Es ist eine ganz alte, ein bisschen gruselige Geschichte in Versen, über einen Vater und seinen Sohn, die nachts durch den Wald reiten. Hör gut hin, welche Wörter sich reimen!",
    erklaerung_merksatz: "Erlkönig von Goethe -- eine alte, gruselige Ballade",
    aufgaben: [
      { typ: "reim_wahl", wort: "Wind", tts: "Wind",
        antwort_a: "Baum", antwort_b: "Kind", antwort_c: "Nacht", antwort_d: "Mond",
        richtig: "B", erklaerung: "Wind und Kind -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Arm", tts: "Arm",
        antwort_a: "kalt", antwort_b: "stark", antwort_c: "warm", antwort_d: "müde",
        richtig: "C", erklaerung: "Arm und warm -- das reimt sich!" },
      { typ: "reim_wahl", wort: "mir", tts: "mir",
        antwort_a: "ihm", antwort_b: "dir", antwort_c: "uns", antwort_d: "euch",
        richtig: "B", erklaerung: "mir und dir -- das reimt sich!" },
      { typ: "reim_wahl", wort: "dort", tts: "dort",
        antwort_a: "hier", antwort_b: "weit", antwort_c: "Ort", antwort_d: "nah",
        richtig: "C", erklaerung: "dort und Ort -- das reimt sich!" },
      { typ: "reim_wahl", wort: "Gestalt", tts: "Gestalt",
        antwort_a: "schön", antwort_b: "Gewalt", antwort_c: "stark", antwort_d: "groß",
        richtig: "B", erklaerung: "Gestalt und Gewalt -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Er hat den Knaben wohl in dem Arm,", zeile_luecke: "Er faßt ihn sicher, er hält ihn",
        tts_bekannt: "Er hat den Knaben wohl in dem Arm,", tts_luecke: "Er fasst ihn sicher, er hält ihn...",
        antwort_a: "fest", antwort_b: "gut", antwort_c: "warm", antwort_d: "lieb",
        richtig: "C", erklaerung: "Arm und warm -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Wer reitet so spät durch Nacht und Wind?", zeile_luecke: "Es ist der Vater mit seinem",
        tts_bekannt: "Wer reitet so spät durch Nacht und Wind?", tts_luecke: "Es ist der Vater mit seinem...",
        antwort_a: "Pferd", antwort_b: "Hund", antwort_c: "Freund", antwort_d: "Kind",
        richtig: "D", erklaerung: "Wind und Kind -- das reimt sich!" },
      { typ: "luecke_wahl",
        zeile_bekannt: "Mein Sohn, mein Sohn, ich seh' es genau:", zeile_luecke: "Es scheinen die alten Weiden so",
        tts_bekannt: "Mein Sohn, mein Sohn, ich seh es genau:", tts_luecke: "Es scheinen die alten Weiden so...",
        antwort_a: "grün", antwort_b: "hoch", antwort_c: "grau", antwort_d: "alt",
        richtig: "C", erklaerung: "genau und grau -- das reimt sich!" },
      { typ: "reim_janein", wort1: "Wind", wort2: "Kind", tts: "Wind — Kind",
        reimt: true, erklaerung: "Ja! Wind und Kind reimen sich." },
      { typ: "reim_janein", wort1: "Arm", wort2: "Baum", tts: "Arm — Baum",
        reimt: false, erklaerung: "Nein, Arm und Baum reimen sich nicht." },
      { typ: "reim_janein", wort1: "Not", wort2: "tot", tts: "Not — tot",
        reimt: true, erklaerung: "Ja! Not und tot reimen sich." }
    ]
  }

];

window.REIM_EINHEITEN = REIM_EINHEITEN;
