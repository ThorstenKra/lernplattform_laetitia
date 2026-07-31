// gedichte_data.js -- Laetitia Lernsystem
// Gemeinsame Gedicht-Bibliothek: window.GEDICHTE
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
//
// Wird von zwei Modulen genutzt:
// 1) app/modules/reim/ -- Reimverstaendnis-Aufgaben (reim_data.js verweist
//    per gedicht_ref auf die "id" hier und liest "strophen" fuer die
//    Vorlese-Funktion "Ganzes Gedicht hoeren").
// 2) app/modules/ki_agenten/fabu/ -- Fabu liest die Gedichte abschnittsweise
//    vor und bespricht sie, genau wie seine Geschichten (gleiche
//    "abschnitte"-Form: text, optional frage+vorschlaege, ende:true am
//    letzten Abschnitt).
//
// Alle 5 Gedichte sind echte, unveraenderte Texte von Johann Wolfgang von
// Goethe (kein Nacherzaehlen wie bei Fabus "fluss_schlange" -- kanonische
// Literatur wird nicht umgeschrieben).
//
// Praezedenzfall "Erlkoenig": Das Gedicht endet mit dem Tod des Kindes im
// Arm des Vaters -- inhaltlich intensiver als die anderen vier Gedichte.
// Abgestimmt mit dem Nutzer (31.07.2026): Text bleibt unveraendert, Fabu
// fuehrt es als "gruselige alte Ballade" ein (wie eine Sage, nicht wie eine
// Todesnachricht) und bietet nach dem Ende ausdruecklich ein Gespraech an,
// statt kommentarlos weiterzugehen. "inhaltshinweis" markiert das fuer
// kuenftige Sitzungen. Vorbild: Fabus bestehende "adaptionsregel" in
// persona.json fuer belastende Vorlagen -- hier zusaetzlicher Fall, bei dem
// NICHT adaptiert wird, weil der Originaltext literarisch erhalten bleiben
// soll, sondern nur behutsam gerahmt wird.

window.GEDICHTE = [

  // ══════════════════════════════════════════════════════════════════
  { id: "heidenroeslein", titel: "Heidenröslein", autor: "Johann Wolfgang von Goethe",
    emoji: "🌹", inhaltshinweis: null,
    strophen: [
      ["Sah ein Knab' ein Röslein stehn,", "Röslein auf der Heiden,", "War so jung und morgenschön,", "Lief er schnell es nah zu sehn,", "Sah's mit vielen Freuden.", "Röslein, Röslein, Röslein rot,", "Röslein auf der Heiden."],
      ["Knabe sprach: ich breche dich,", "Röslein auf der Heiden!", "Röslein sprach: ich steche dich,", "Daß du ewig denkst an mich,", "Und ich will's nicht leiden.", "Röslein, Röslein, Röslein rot,", "Röslein auf der Heiden."],
      ["Und der wilde Knabe brach", "'s Röslein auf der Heiden;", "Röslein wehrte sich und stach,", "Half ihm doch kein Weh und Ach,", "Mußt es eben leiden.", "Röslein, Röslein, Röslein rot,", "Röslein auf der Heiden."]
    ],
    abschnitte: [
      { text: "Sah ein Knab ein Röslein stehn, Röslein auf der Heiden, war so jung und morgenschön, lief er schnell es nah zu sehn, sah's mit vielen Freuden. Röslein, Röslein, Röslein rot, Röslein auf der Heiden.",
        frage: "Ein Junge hat ein hübsches Röslein entdeckt. Was, glaubst du, macht er als Nächstes?",
        vorschlaege: ["Er pflückt es", "Er lässt es stehen", "Er riecht nur daran", "Weiß ich nicht"] },
      { text: "Knabe sprach: ich breche dich, Röslein auf der Heiden! Röslein sprach: ich steche dich, dass du ewig denkst an mich, und ich will's nicht leiden. Röslein, Röslein, Röslein rot, Röslein auf der Heiden." },
      { text: "Und der wilde Knabe brach 's Röslein auf der Heiden; Röslein wehrte sich und stach, half ihm doch kein Weh und Ach, musste es eben leiden. Röslein, Röslein, Röslein rot, Röslein auf der Heiden.",
        frage: "Das Röslein wollte nicht gepflückt werden, aber der Knabe hat es trotzdem getan. Was hättest du an seiner Stelle gemacht?",
        vorschlaege: ["Ich hätte es stehen lassen", "Ich hätte auch gepflückt", "Ich hätte gefragt", "Weiß ich nicht"],
        ende: true }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "veilchen", titel: "Das Veilchen", autor: "Johann Wolfgang von Goethe",
    emoji: "🌷", inhaltshinweis: null,
    strophen: [
      ["Ein Veilchen auf der Wiese stand,", "Gebückt in sich und unbekannt;", "Es war ein herzig's Veilchen.", "Da kam eine junge Schäferin", "Mit leichtem Schritt und munterm Sinn", "Daher, daher,", "Die Wiese her, und sang."],
      ["Ach! denkt das Veilchen; wär' ich nur", "Die schönste Blume der Natur,", "Ach nur ein kleines Weilchen,", "Bis mich das Liebchen abgepflückt,", "Und an dem Busen matt gedrückt!", "Ach nur, ach nur", "Ein Viertelstündchen lang!"],
      ["Ach! aber ach! das Mädchen kam", "Und nicht in Acht das Veilchen nahm,", "Ertrat das arme Veilchen.", "Es sank und starb und freut' sich noch:", "Und sterb' ich denn, so sterb' ich doch", "Durch sie, durch sie,", "Zu ihren Füßen doch."]
    ],
    abschnitte: [
      { text: "Ein Veilchen auf der Wiese stand, gebückt in sich und unbekannt; es war ein herziges Veilchen. Da kam eine junge Schäferin mit leichtem Schritt und munterm Sinn daher, daher, die Wiese her, und sang.",
        frage: "Was, glaubst du, wünscht sich das kleine Veilchen?",
        vorschlaege: ["Dass sie es bemerkt", "Dass sie vorbeigeht", "Dass es regnet", "Weiß ich nicht"] },
      { text: "Ach, denkt das Veilchen, wär ich nur die schönste Blume der Natur, ach nur ein kleines Weilchen, bis mich das Liebchen abgepflückt und an dem Busen matt gedrückt! Ach nur, ach nur, ein Viertelstündchen lang!" },
      { text: "Ach, aber ach! Das Mädchen kam und nicht in Acht das Veilchen nahm, ertrat das arme Veilchen. Es sank und starb und freute sich noch: Und sterb ich denn, so sterb ich doch durch sie, durch sie, zu ihren Füßen doch.",
        frage: "Das Veilchen wurde aus Versehen zertreten, aber es war am Ende trotzdem froh, weil es der Schäferin so nah sein durfte. Das ist ein bisschen traurig und schön zugleich. Kennst du so ein Gefühl?",
        vorschlaege: ["Ja, das kenne ich", "Nein, noch nicht", "Das fand ich traurig", "Erzähl mir mehr davon"],
        ende: true }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "fischer", titel: "Der Fischer", autor: "Johann Wolfgang von Goethe",
    emoji: "🎣", inhaltshinweis: null,
    strophen: [
      ["Das Wasser rauscht', das Wasser schwoll,", "Ein Fischer saß daran,", "Sah nach dem Angel ruhevoll,", "Kühl bis ans Herz hinan.", "Und wie er sitzt und wie er lauscht,", "Teilt sich die Flut empor;", "Aus dem bewegten Wasser rauscht", "Ein feuchtes Weib hervor."],
      ["Sie sang zu ihm, sie sprach zu ihm:", "Was lockst du meine Brut", "Mit Menschenwitz und Menschenlist", "Hinauf in Todesglut?", "Ach! wüßtest du, wie's Fischlein ist", "So wohlig auf dem Grund,", "Du stiegst herunter, wie du bist,", "Und würdest erst gesund!"],
      ["Labt sich die liebe Sonne nicht,", "Der Mond sich nicht im Meer?", "Kehrt wellenatmend ihr Gesicht", "Nicht doppelt schöner her?", "Lockt dich der tiefe Himmel nicht,", "Das feuchtverklärte Blau?", "Lockt dich dein eigen Angesicht", "Nicht her in ew'gen Tau?"],
      ["Das Wasser rauscht', das Wasser schwoll,", "Netzt' ihm den nackten Fuß;", "Sein Herz wuchs ihm so sehnsuchtsvoll,", "Wie bei der Liebsten Gruß.", "Sie sprach zu ihm, sie sang zu ihm;", "Da war's um ihn geschehn:", "Halb zog sie ihn, halb sank er hin,", "Und ward nicht mehr gesehn."]
    ],
    abschnitte: [
      { text: "Das Wasser rauschte, das Wasser schwoll, ein Fischer saß daran, sah nach dem Angel ruhevoll, kühl bis ans Herz hinan. Und wie er sitzt und wie er lauscht, teilt sich die Flut empor; aus dem bewegten Wasser rauscht ein feuchtes Weib hervor.",
        frage: "Aus dem Wasser taucht plötzlich eine geheimnisvolle Frau auf. Was, glaubst du, will sie von dem Fischer?",
        vorschlaege: ["Sie will ihn warnen", "Sie will ihn locken", "Sie will nur spielen", "Weiß ich nicht"] },
      { text: "Sie sang zu ihm, sie sprach zu ihm: Was lockst du meine Brut mit Menschenwitz und Menschenlist hinauf in Todesglut? Ach, wüsstest du, wie's Fischlein ist, so wohlig auf dem Grund, du stiegst herunter, wie du bist, und würdest erst gesund!" },
      { text: "Labt sich die liebe Sonne nicht, der Mond sich nicht im Meer? Kehrt wellenatmend ihr Gesicht nicht doppelt schöner her? Lockt dich der tiefe Himmel nicht, das feuchtverklärte Blau? Lockt dich dein eigen Angesicht nicht her in ew'gen Tau?" },
      { text: "Das Wasser rauschte, das Wasser schwoll, netzte ihm den nackten Fuß; sein Herz wuchs ihm so sehnsuchtsvoll, wie bei der Liebsten Gruß. Sie sprach zu ihm, sie sang zu ihm; da war's um ihn geschehn: Halb zog sie ihn, halb sank er hin, und ward nicht mehr gesehn.",
        frage: "Das ist eine alte, geheimnisvolle Sage über eine Wasserfrau, die einen Menschen ins Wasser lockt -- so wie ein Fabelwesen aus einem Märchen. Fandest du das eher spannend oder ein bisschen unheimlich?",
        vorschlaege: ["Spannend", "Ein bisschen unheimlich", "Beides", "Erzähl mir eine andere Geschichte"],
        ende: true }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  { id: "koenig_in_thule", titel: "Der König in Thule", autor: "Johann Wolfgang von Goethe",
    emoji: "👑", inhaltshinweis: null,
    strophen: [
      ["Es war ein König in Thule", "Gar treu bis an das Grab,", "Dem sterbend seine Buhle", "Einen goldnen Becher gab."],
      ["Es ging ihm nichts darüber,", "Er leert ihn jeden Schmaus;", "Die Augen gingen ihm über,", "Sooft er trank daraus."],
      ["Und als er kam zu sterben,", "Zählt' er seine Städt' im Reich,", "Gönnt' alles seinen Erben,", "Den Becher nicht zugleich."],
      ["Er saß beim Königsmahle,", "Die Ritter um ihn her,", "Auf hohem Vätersaale,", "Dort auf dem Schloß am Meer."],
      ["Dort stand der alte Zecher,", "Trank letzte Lebensglut,", "Und warf den heil'gen Becher", "Hinunter in die Flut."],
      ["Er sah ihn stürzen, trinken", "Und sinken tief ins Meer.", "Die Augen täten ihm sinken;", "Trank nie einen Tropfen mehr."]
    ],
    abschnitte: [
      { text: "Es war ein König in Thule, gar treu bis an das Grab, dem sterbend seine Buhle einen goldnen Becher gab. Es ging ihm nichts darüber, er leert ihn jeden Schmaus; die Augen gingen ihm über, sooft er trank daraus.",
        frage: "Der König hat einen besonderen Becher von seiner Liebsten bekommen und passt ganz besonders gut darauf auf. Hast du auch ein Lieblingsding, das dir sehr viel bedeutet?",
        vorschlaege: ["Ja, das kenne ich", "Nein, nicht so", "Erzähl weiter", "Was passiert dann?"] },
      { text: "Und als er kam zu sterben, zählte er seine Städte im Reich, gönnte alles seinen Erben, den Becher nicht zugleich. Er saß beim Königsmahle, die Ritter um ihn her, auf hohem Vätersaale, dort auf dem Schloss am Meer." },
      { text: "Dort stand der alte Zecher, trank letzte Lebensglut, und warf den heiligen Becher hinunter in die Flut. Er sah ihn stürzen, trinken und sinken tief ins Meer. Die Augen täten ihm sinken; trank nie einen Tropfen mehr.",
        frage: "Der alte König wollte nicht, dass jemand anders seinen besonderen Becher bekommt -- er hat ihn lieber ins Meer geworfen. Das ist eine alte, ein bisschen wehmütige Geschichte über große Treue. Magst du darüber reden?",
        vorschlaege: ["Ja, lass uns reden", "Das fand ich schön", "Das fand ich traurig", "Erzähl mir eine andere Geschichte"],
        ende: true }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  // Erlkoenig: siehe Kopfkommentar -- Fabu fuehrt es behutsam als
  // gruselige alte Ballade ein, Text bleibt original/unveraendert.
  { id: "erlkoenig", titel: "Erlkönig", autor: "Johann Wolfgang von Goethe",
    emoji: "🌫️", inhaltshinweis: "gruselige_ballade",
    strophen: [
      ["Wer reitet so spät durch Nacht und Wind?", "Es ist der Vater mit seinem Kind;", "Er hat den Knaben wohl in dem Arm,", "Er faßt ihn sicher, er hält ihn warm."],
      ["Mein Sohn, was birgst du so bang dein Gesicht? --", "Siehst, Vater, du den Erlkönig nicht?", "Den Erlenkönig mit Kron und Schweif? --", "Mein Sohn, es ist ein Nebelstreif. --"],
      ["\"Du liebes Kind, komm, geh mit mir!", "Gar schöne Spiele spiel ich mit dir;", "Manch bunte Blumen sind an dem Strand;", "Meine Mutter hat manch' gülden Gewand.\""],
      ["Mein Vater, mein Vater, und hörest du nicht,", "Was Erlenkönig mir leise verspricht? --", "Sei ruhig, bleibe ruhig, mein Kind;", "In dürren Blättern säuselt der Wind. --"],
      ["\"Willst, feiner Knabe, du mit mir gehn?", "Meine Töchter sollen dich warten schön;", "Meine Töchter führen den nächtlichen Reihn,", "Und wiegen und tanzen und singen dich ein.\""],
      ["Mein Vater, mein Vater, und siehst du nicht dort", "Erlkönigs Töchter am düstern Ort? --", "Mein Sohn, mein Sohn, ich seh' es genau:", "Es scheinen die alten Weiden so grau. --"],
      ["\"Ich liebe dich, mich reizt deine schöne Gestalt;", "Und bist du nicht willig, so brauch ich Gewalt.\" --", "Mein Vater, mein Vater, jetzt faßt er mich an!", "Erlkönig hat mir ein Leids getan! --"],
      ["Dem Vater grauset's, er reitet geschwind,", "Er hält in Armen das ächzende Kind,", "Erreicht den Hof mit Mühe und Not;", "In seinen Armen das Kind war tot."]
    ],
    abschnitte: [
      { text: "Jetzt kommt eine ganz alte, berühmte Geschichte in Versen. Sie heißt Erlkönig und ist ein kleines bisschen gruselig -- so wie eine alte Sage von einem unheimlichen Wesen in der Nacht. Ein berühmter Dichter namens Goethe hat sie vor über zweihundert Jahren geschrieben." },
      { text: "Wer reitet so spät durch Nacht und Wind? Es ist der Vater mit seinem Kind; er hat den Knaben wohl in dem Arm, er fasst ihn sicher, er hält ihn warm." },
      { text: "Mein Sohn, was birgst du so bang dein Gesicht? Siehst, Vater, du den Erlkönig nicht? Den Erlenkönig mit Kron und Schweif? Mein Sohn, es ist ein Nebelstreif.",
        frage: "Der Junge hat Angst, aber sein Vater sagt, es ist nur Nebel. Was denkst du -- hat der Vater recht?",
        vorschlaege: ["Ja, nur Nebel", "Nein, da ist was", "Ich weiß nicht", "Erzähl weiter"] },
      { text: "Du liebes Kind, komm, geh mit mir! Gar schöne Spiele spiel ich mit dir; manch bunte Blumen sind an dem Strand; meine Mutter hat manch gülden Gewand. Mein Vater, mein Vater, und hörest du nicht, was Erlenkönig mir leise verspricht? Sei ruhig, bleibe ruhig, mein Kind; in dürren Blättern säuselt der Wind." },
      { text: "Willst, feiner Knabe, du mit mir gehn? Meine Töchter sollen dich warten schön; meine Töchter führen den nächtlichen Reihn, und wiegen und tanzen und singen dich ein. Mein Vater, mein Vater, und siehst du nicht dort Erlkönigs Töchter am düstern Ort? Mein Sohn, mein Sohn, ich seh es genau: Es scheinen die alten Weiden so grau." },
      { text: "Ich liebe dich, mich reizt deine schöne Gestalt; und bist du nicht willig, so brauch ich Gewalt. Mein Vater, mein Vater, jetzt fasst er mich an! Erlkönig hat mir ein Leids getan! Dem Vater grauset's, er reitet geschwind, er hält in Armen das ächzende Kind, erreicht den Hof mit Mühe und Not; in seinen Armen das Kind war tot.",
        frage: "Das ist ein trauriges und auch ein bisschen gruseliges Ende -- der Junge stirbt am Ende der alten Sage. Viele ganz alte Geschichten sind manchmal düster. Magst du darüber reden, wie du dich dabei fühlst?",
        vorschlaege: ["Ja, lass uns reden", "Es hat mich gegruselt", "Es hat mich traurig gemacht", "Ich möchte eine andere Geschichte hören"],
        ende: true }
    ]
  }

];
