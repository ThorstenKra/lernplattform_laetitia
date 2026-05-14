// sinnesorgane_quiz_data.js -- Laetitia Lernsystem
// Quiz-Aufgaben Sinnesorgane S1 + S2
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── S1: Welches Sinnesorgan? ──────────────────────────────────────────────

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Mit welchem Sinnesorgan siehst du?",
    antwort_a:"Mit den Ohren",
    antwort_b:"Mit der Nase",
    antwort_c:"Mit den Augen",
    antwort_d:"Mit der Haut",
    richtig:"C",
    erklaerung:"Die Augen sind unser Sehorgan. Sie nehmen Licht, Farben und Formen wahr." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Womit hörst du Musik und Sprache?",
    antwort_a:"Mit den Augen",
    antwort_b:"Mit den Ohren",
    antwort_c:"Mit der Zunge",
    antwort_d:"Mit der Haut",
    richtig:"B",
    erklaerung:"Die Ohren sind unser Hörorgan. Sie nehmen Töne und Geräusche wahr." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Womit riechst du eine frische Blume?",
    antwort_a:"Mit der Zunge",
    antwort_b:"Mit den Ohren",
    antwort_c:"Mit der Nase",
    antwort_d:"Mit den Augen",
    richtig:"C",
    erklaerung:"Die Nase ist unser Riechorgan. Riechzellen in der Nase erkennen Düfte." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Womit schmeckst du, ob etwas süß oder sauer ist?",
    antwort_a:"Mit der Nase",
    antwort_b:"Mit den Augen",
    antwort_c:"Mit der Haut",
    antwort_d:"Mit der Zunge",
    richtig:"D",
    erklaerung:"Die Zunge ist unser Schmeckorgan. Geschmacksknospen auf der Zunge erkennen verschiedene Geschmäcker." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Mit welchem Sinnesorgan spürst du, ob etwas heiß oder kalt ist?",
    antwort_a:"Mit den Ohren",
    antwort_b:"Mit der Haut",
    antwort_c:"Mit der Nase",
    antwort_d:"Mit den Augen",
    richtig:"B",
    erklaerung:"Die Haut ist unser Tast- und Fühlorgan. Sie spürt Wärme, Kälte, Berührungen und Schmerz." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Du hörst einen lauten Knall. Welches Sinnesorgan hat das wahrgenommen?",
    antwort_a:"Die Augen",
    antwort_b:"Die Zunge",
    antwort_c:"Die Ohren",
    antwort_d:"Die Nase",
    richtig:"C",
    erklaerung:"Laute Geräusche werden von den Ohren wahrgenommen." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Du siehst einen bunten Regenbogen. Welches Sinnesorgan hilft dir dabei?",
    antwort_a:"Die Haut",
    antwort_b:"Die Ohren",
    antwort_c:"Die Zunge",
    antwort_d:"Die Augen",
    richtig:"D",
    erklaerung:"Farben und Formen werden von den Augen wahrgenommen." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Es riecht nach frisch gebackenem Kuchen. Welches Sinnesorgan nimmt das wahr?",
    antwort_a:"Die Ohren",
    antwort_b:"Die Haut",
    antwort_c:"Die Nase",
    antwort_d:"Die Augen",
    richtig:"C",
    erklaerung:"Gerüche werden von der Nase wahrgenommen." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Du greifst in Schnee und deine Hand wird kalt. Welches Sinnesorgan spürt das?",
    antwort_a:"Die Nase",
    antwort_b:"Die Ohren",
    antwort_c:"Die Augen",
    antwort_d:"Die Haut",
    richtig:"D",
    erklaerung:"Kälte und Berührung werden von der Haut wahrgenommen." },

  { stufe:"S1", text:"Unsere Sinnesorgane helfen uns, die Welt wahrzunehmen.",
    frage:"Du isst eine Zitrone und merkst, dass sie sauer ist. Welches Sinnesorgan erkennt das?",
    antwort_a:"Die Nase",
    antwort_b:"Die Zunge",
    antwort_c:"Die Ohren",
    antwort_d:"Die Haut",
    richtig:"B",
    erklaerung:"Den Geschmack sauer erkennen die Geschmacksknospen auf der Zunge." },

  { stufe:"S1", text:"Wir haben fünf Sinnesorgane — jedes nimmt etwas anderes wahr.",
    frage:"Welches Sinnesorgan bedeckt deinen ganzen Körper?",
    antwort_a:"Die Augen",
    antwort_b:"Die Ohren",
    antwort_c:"Die Haut",
    antwort_d:"Die Nase",
    richtig:"C",
    erklaerung:"Die Haut ist das größte Sinnesorgan und bedeckt den gesamten Körper." },

  { stufe:"S1", text:"Wir haben fünf Sinnesorgane — jedes nimmt etwas anderes wahr.",
    frage:"Welche zwei Sinnesorgane sitzen im Kopf, links und rechts?",
    antwort_a:"Nase und Zunge",
    antwort_b:"Augen und Ohren",
    antwort_c:"Haut und Nase",
    antwort_d:"Zunge und Ohren",
    richtig:"B",
    erklaerung:"Augen und Ohren sitzen paarweise links und rechts im Kopf." },

  // ── S2: Was kann es? ─────────────────────────────────────────────────────

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Was können die Augen wahrnehmen?",
    antwort_a:"Töne und Geräusche",
    antwort_b:"Düfte und Gerüche",
    antwort_c:"Farben, Formen und Bewegungen",
    antwort_d:"Wärme und Kälte",
    richtig:"C",
    erklaerung:"Die Augen nehmen Licht wahr und erkennen damit Farben, Formen und Bewegungen." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Was erkennt die Zunge?",
    antwort_a:"Farben und Formen",
    antwort_b:"Süß, sauer, salzig, bitter und herzhaft",
    antwort_c:"Töne und Lautstärke",
    antwort_d:"Berührungen und Druck",
    richtig:"B",
    erklaerung:"Die Zunge erkennt fünf Grundgeschmäcker: süß, sauer, salzig, bitter und umami (herzhaft)." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Welche zusätzliche Aufgabe haben die Ohren außer dem Hören?",
    antwort_a:"Sie helfen beim Riechen",
    antwort_b:"Sie helfen beim Schmecken",
    antwort_c:"Sie helfen beim Gleichgewicht",
    antwort_d:"Sie helfen beim Sehen",
    richtig:"C",
    erklaerung:"Im Innenohr befindet sich das Gleichgewichtsorgan — es hilft uns, aufrecht zu stehen und nicht zu stürzen." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Was kann die Haut alles wahrnehmen?",
    antwort_a:"Nur Wärme",
    antwort_b:"Nur Kälte",
    antwort_c:"Berührung, Druck, Wärme, Kälte und Schmerz",
    antwort_d:"Nur Geräusche",
    richtig:"C",
    erklaerung:"Die Haut ist sehr vielseitig — sie spürt Berührungen, Druck, Wärme, Kälte und Schmerz." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Wie hilft uns die Nase in Gefahr?",
    antwort_a:"Sie zeigt uns bunte Farben",
    antwort_b:"Sie erkennt Rauch- und Brandgeruch",
    antwort_c:"Sie hilft uns beim Laufen",
    antwort_d:"Sie macht uns wach",
    richtig:"B",
    erklaerung:"Die Nase kann Rauch und Brandgeruch erkennen — das ist wichtig, um Feuer rechtzeitig zu bemerken." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Wie viele Sinnesorgane hat der Mensch?",
    antwort_a:"Drei",
    antwort_b:"Vier",
    antwort_c:"Sechs",
    antwort_d:"Fünf",
    richtig:"D",
    erklaerung:"Der Mensch hat fünf Sinnesorgane: Augen, Ohren, Nase, Zunge und Haut." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Welches Sinnesorgan ist das größte?",
    antwort_a:"Die Augen",
    antwort_b:"Die Ohren",
    antwort_c:"Die Haut",
    antwort_d:"Die Zunge",
    richtig:"C",
    erklaerung:"Die Haut ist das größte Sinnesorgan des Menschen. Bei Erwachsenen bedeckt sie etwa 1,7 Quadratmeter." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Warum ist es wichtig, dass wir Schmerz fühlen können?",
    antwort_a:"Weil Schmerz schön klingt",
    antwort_b:"Weil er uns warnt, dass etwas mit dem Körper nicht stimmt",
    antwort_c:"Weil wir ihn mögen",
    antwort_d:"Weil er uns schläfrig macht",
    richtig:"B",
    erklaerung:"Schmerz ist ein Warnsignal des Körpers. Er zeigt uns, dass etwas verletzt ist und wir aufpassen sollen." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Was passiert, wenn du dir die Nase zuhältst und dann isst?",
    antwort_a:"Es schmeckt genauso gut wie immer",
    antwort_b:"Du kannst nichts sehen",
    antwort_c:"Das Essen schmeckt weniger intensiv",
    antwort_d:"Du hörst nichts mehr",
    richtig:"C",
    erklaerung:"Riechen und Schmecken sind eng verbunden. Ohne Geruch schmecken viele Speisen viel weniger intensiv." },

  { stufe:"S2", text:"Jedes Sinnesorgan hat eine besondere Aufgabe.",
    frage:"Welche Sinnesorgane senden Signale ans Gehirn?",
    antwort_a:"Nur die Augen",
    antwort_b:"Nur die Haut",
    antwort_c:"Nur die Zunge",
    antwort_d:"Alle fünf Sinnesorgane",
    richtig:"D",
    erklaerung:"Alle fünf Sinnesorgane senden Signale ans Gehirn. Das Gehirn verarbeitet diese Signale zu Wahrnehmungen." }

];

D.set("sinnesorgane", aufgaben);

})();
