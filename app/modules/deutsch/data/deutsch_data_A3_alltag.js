// deutsch_data_A3_alltag.js
// A3-Aufgaben: Alltagssituationen, 3-4 Saetze, etwas mehr Schlussfolgerung noetig
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

var D = window.LaetitiaDataRegistryApi;
if(!D) return;

var aufgaben = [

  // ── Zuhause ──────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"201",
    text:"Lena kommt von der Schule nach Hause.\nSie zieht die Schuhe aus und legt die Tasche ab.\nDann schaut sie in die Küche — der Herd ist an und es riecht nach Nudelsuppe.",
    frage:"Was erwartet Lena in der Küche?",
    antwort_a:"Einen kalten Tisch",
    antwort_b:"Warmes Essen",
    antwort_c:"Einen leeren Topf",
    antwort_d:"Ihre Hausaufgaben",
    richtig:"B",
    erklaerung:"Der Herd ist an und es riecht nach Nudelsuppe — das bedeutet, dass warmes Essen bereitsteht." },

  { stufe:"A3", seite:"202",
    text:"Papa kommt abends nach Hause.\nEr sieht, dass der Tisch gedeckt ist und frische Blumen in der Vase stehen.\nMama lächelt ihn an und sagt: Heute ist etwas Besonderes.",
    frage:"Was ist an diesem Abend besonders?",
    antwort_a:"Papa hat einen Fehler gemacht",
    antwort_b:"Es ist ein besonderer Anlass gefeiert",
    antwort_c:"Die Blumen sind verwelkt",
    antwort_d:"Der Tisch ist kaputt",
    richtig:"B",
    erklaerung:"Der gedeckte Tisch, die frischen Blumen und Mamas Lächeln deuten auf einen besonderen Anlass hin." },

  { stufe:"A3", seite:"203",
    text:"Tom findet in seinem Zimmer eine kleine Notiz auf dem Schreibtisch.\nDarauf steht: Dein Heft liegt im Flur.\nEr geht in den Flur und findet sein Heft auf der Bank.",
    frage:"Wer hat das Heft in den Flur gelegt?",
    antwort_a:"Tom selbst",
    antwort_b:"Jemand anderes und eine Notiz hinterlassen",
    antwort_c:"Der Hund",
    antwort_d:"Niemand — es war immer dort",
    richtig:"B",
    erklaerung:"Jemand hat das Heft gefunden, in den Flur gelegt und eine Notiz für Tom hinterlassen." },

  // ── Schule ───────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"204",
    text:"In der Klasse gibt es eine Überraschung.\nDie Lehrerin deckt etwas mit einem Tuch ab.\nSie sagt: Wir arbeiten heute anders — statt Bücher haben wir etwas Lebendiges mitgebracht.",
    frage:"Was hat die Lehrerin mitgebracht?",
    antwort_a:"Einen neuen Stuhl",
    antwort_b:"Ein lebendes Tier oder eine Pflanze",
    antwort_c:"Neue Schulbücher",
    antwort_d:"Einen Fernseher",
    richtig:"B",
    erklaerung:"Die Lehrerin sagt etwas Lebendiges — das deutet auf ein Tier oder eine Pflanze hin, nicht auf Bücher oder Möbel." },

  { stufe:"A3", seite:"205",
    text:"Max hat seine Hausaufgaben nicht gemacht.\nEr betritt das Klassenzimmer und schaut die Lehrerin nicht an.\nAls sie die Hefte einsammelt, wird sein Gesicht rot.",
    frage:"Wie fühlt sich Max wahrscheinlich?",
    antwort_a:"Fröhlich und entspannt",
    antwort_b:"Verlegen und unwohl",
    antwort_c:"Müde aber stolz",
    antwort_d:"Neugierig und aufgeregt",
    richtig:"B",
    erklaerung:"Max vermeidet den Blickkontakt und wird rot — das zeigt, dass er sich verlegen und unwohl fühlt." },

  { stufe:"A3", seite:"206",
    text:"Nach dem Sport ist Anna sehr durstig.\nSie öffnet ihre Tasche und sucht nach ihrer Flasche.\nSie findet eine leere Flasche — sie hat vergessen, sie am Morgen aufzufüllen.",
    frage:"Was muss Anna jetzt tun, um Wasser zu bekommen?",
    antwort_a:"Ihre Flasche einpacken",
    antwort_b:"Die Flasche irgendwo auffüllen",
    antwort_c:"Nach Hause fahren",
    antwort_d:"Auf den Bus warten",
    richtig:"B",
    erklaerung:"Die Flasche ist leer — Anna muss sie jetzt irgendwo in der Schule auffüllen, damit sie trinken kann." },

  // ── Unterwegs ────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"207",
    text:"Opa will mit dem Bus in die Stadt fahren.\nAm Bahnhof liest er die Anzeigetafel.\nDort steht: Bus 7 — heute wegen Baustelle ausgefallen.",
    frage:"Was muss Opa jetzt wahrscheinlich tun?",
    antwort_a:"Im Bus warten",
    antwort_b:"Eine andere Verbindung suchen",
    antwort_c:"Zum Bahnhof zurückfahren",
    antwort_d:"Den Busfahrer fragen",
    richtig:"B",
    erklaerung:"Bus 7 fällt aus — Opa muss deshalb eine andere Möglichkeit suchen, in die Stadt zu kommen." },

  { stufe:"A3", seite:"208",
    text:"Klara läuft mit Mama zur Bäckerei.\nAls sie ankommen, hängt ein Schild an der Tür: Heute wegen Urlaub geschlossen.\nMama seufzt und sagt: Dann müssen wir woanders Brot kaufen.",
    frage:"Warum ist die Bäckerei geschlossen?",
    antwort_a:"Es ist Sonntag",
    antwort_b:"Der Bäcker hat Urlaub",
    antwort_c:"Es gibt kein Mehl mehr",
    antwort_d:"Die Öfen sind kaputt",
    richtig:"B",
    erklaerung:"Auf dem Schild steht: wegen Urlaub geschlossen — der Bäcker macht Ferien." },

  // ── Natur ────────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"209",
    text:"Jonas geht durch den Wald und hört Geräusche über sich.\nEr schaut nach oben und sieht ein Eichhörnchen, das von Ast zu Ast springt.\nEs lässt dabei eine Nuss fallen, die genau vor Jonas landet.",
    frage:"Woher kommt die Nuss, die vor Jonas landet?",
    antwort_a:"Jemand hat sie geworfen",
    antwort_b:"Das Eichhörnchen hat sie fallen lassen",
    antwort_c:"Sie lag schon dort",
    antwort_d:"Sie fiel vom Wind geweht herunter",
    richtig:"B",
    erklaerung:"Jonas sieht das Eichhörnchen springen — es hat die Nuss beim Springen fallen lassen." },

  { stufe:"A3", seite:"210",
    text:"Nach dem langen Regen scheint endlich die Sonne.\nPfützen glänzen auf dem Gehweg.\nVögel singen laut und ein Regenbogen erscheint am Himmel.",
    frage:"Was bedeuten die Pfützen auf dem Gehweg?",
    antwort_a:"Jemand hat den Boden gewässert",
    antwort_b:"Es hat vorher geregnet",
    antwort_c:"Ein Brunnen ist übergelaufen",
    antwort_d:"Es wird gleich schneien",
    richtig:"B",
    erklaerung:"Pfützen entstehen durch Regen — sie zeigen, dass es vorher stark geregnet hat." },

  // ── Tiere ────────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"211",
    text:"Das Kätzchen sitzt am Fenster und schaut auf den Garten.\nSein Schwanz bewegt sich hin und her.\nDraußen hüpft ein Vogel über den Rasen.",
    frage:"Warum bewegt das Kätzchen seinen Schwanz?",
    antwort_a:"Es ist müde",
    antwort_b:"Es beobachtet den Vogel aufmerksam",
    antwort_c:"Es will nach draußen",
    antwort_d:"Es hat Hunger",
    richtig:"B",
    erklaerung:"Katzen bewegen ihren Schwanz, wenn sie etwas aufmerksam beobachten — hier ist es der Vogel." },

  { stufe:"A3", seite:"212",
    text:"Im Zoogehege läuft der Bär langsam im Kreis.\nErst geht er links, dann rechts, dann links.\nEin Kind fragt: Warum dreht er sich immer nur im Kreis?",
    frage:"Was macht der Bär im Gehege?",
    antwort_a:"Er sucht Futter",
    antwort_b:"Er läuft immer wieder im gleichen Muster im Kreis",
    antwort_c:"Er spielt mit dem Wärter",
    antwort_d:"Er bereitet sich auf den Schlaf vor",
    richtig:"B",
    erklaerung:"Der Bär geht links, rechts, links — er läuft immer wieder im gleichen Muster, also im Kreis." },

  // ── Familie ──────────────────────────────────────────────────────────────

  { stufe:"A3", seite:"213",
    text:"Am Wochenende möchte die Familie einen Ausflug machen.\nPapa schlägt den See vor, Mama möchte in den Wald.\nAm Ende entscheiden die Kinder: Sie gehen in den Zoo.",
    frage:"Wohin geht die Familie am Ende?",
    antwort_a:"Zum See",
    antwort_b:"In den Wald",
    antwort_c:"In den Zoo",
    antwort_d:"Zu Oma",
    richtig:"C",
    erklaerung:"Papa wollte zum See, Mama in den Wald — aber die Kinder entscheiden sich für den Zoo." },

  { stufe:"A3", seite:"214",
    text:"Oma schreibt einen Brief an ihre Freundin in einer anderen Stadt.\nSie erzählt von ihrer Reise und klebt eine Briefmarke auf den Umschlag.\nDann geht sie zur Post.",
    frage:"Was macht Oma mit dem Brief am Ende?",
    antwort_a:"Sie legt ihn in die Schublade",
    antwort_b:"Sie schickt ihn über die Post",
    antwort_c:"Sie gibt ihn der Nachbarin",
    antwort_d:"Sie liest ihn noch einmal",
    richtig:"B",
    erklaerung:"Oma klebt die Briefmarke auf und geht zur Post — dort schickt sie den Brief ab." },

  // ── Kochen und Feste ─────────────────────────────────────────────────────

  { stufe:"A3", seite:"215",
    text:"Mama backt einen Kuchen für den Besuch.\nNachdem er aus dem Ofen kommt, wartet sie eine Stunde, bevor sie ihn anschneidet.\nSie erklärt: Ein heißer Kuchen bricht beim Schneiden.",
    frage:"Warum wartet Mama mit dem Anschneiden?",
    antwort_a:"Weil der Kuchen noch dekoriert werden muss",
    antwort_b:"Weil ein heißer Kuchen beim Schneiden bricht",
    antwort_c:"Weil der Besuch noch nicht da ist",
    antwort_d:"Weil der Ofen noch an ist",
    richtig:"B",
    erklaerung:"Mama erklärt es selbst: Ein heißer Kuchen bricht beim Schneiden — deshalb wartet sie." },

  { stufe:"A3", seite:"216",
    text:"Beim Geburtstagsfest spielt die Familie Verstecken.\nPapa zählt bis zwanzig, während alle sich verstecken.\nAls er fertig ist, ruft er laut: Ich komme!",
    frage:"Was passiert als nächstes, nachdem Papa gerufen hat?",
    antwort_a:"Papa setzt sich hin",
    antwort_b:"Papa sucht die Versteckten",
    antwort_c:"Alle kommen raus",
    antwort_d:"Das Spiel ist vorbei",
    richtig:"B",
    erklaerung:"Beim Verstecken ruft man Ich komme! — dann beginnt das Suchen." },

  // ── Krank und Gesundheit ──────────────────────────────────────────────────

  { stufe:"A3", seite:"217",
    text:"Leon fühlt sich am Morgen nicht gut.\nEr hat Halsschmerzen und Fieber.\nMama legt ihm ein nasses Tuch auf die Stirn und sagt: Heute bleibst du zu Hause.",
    frage:"Warum bleibt Leon zu Hause?",
    antwort_a:"Weil kein Unterricht ist",
    antwort_b:"Weil er krank ist",
    antwort_c:"Weil er seine Hausaufgaben nicht gemacht hat",
    antwort_d:"Weil das Wetter schlecht ist",
    richtig:"B",
    erklaerung:"Leon hat Halsschmerzen und Fieber — er ist krank und bleibt deshalb zu Hause." },

  { stufe:"A3", seite:"218",
    text:"Nina hat sich beim Spielen das Knie aufgeschlagen.\nSie läuft zu Mama, die eine Wunde sauber macht und ein Pflaster draufklebt.\nNina hört auf zu weinen und schaut gespannt zu.",
    frage:"Was macht Mama mit Ninas Knie?",
    antwort_a:"Sie verbindet es mit einem Verband",
    antwort_b:"Sie macht die Wunde sauber und klebt ein Pflaster drauf",
    antwort_c:"Sie kühlt es mit Eis",
    antwort_d:"Sie bringt Nina sofort zum Arzt",
    richtig:"B",
    erklaerung:"Mama macht die Wunde am Knie sauber und klebt dann ein Pflaster darauf." },

  // ── Jahreszeiten ──────────────────────────────────────────────────────────

  { stufe:"A3", seite:"219",
    text:"Im Herbst hilft Emma im Garten.\nSie harkt die bunten Blätter zu einem großen Haufen.\nDann springt der Hund hinein und alles fliegt wieder auseinander.",
    frage:"Was passiert mit Emmas Blätterhaufen?",
    antwort_a:"Er wird immer größer",
    antwort_b:"Der Hund springt rein und alles fliegt auseinander",
    antwort_c:"Emma verbrennt ihn",
    antwort_d:"Der Wind weht ihn weg",
    richtig:"B",
    erklaerung:"Emma harkt die Blätter zusammen — aber dann springt der Hund rein und alles fliegt auseinander!" },

  { stufe:"A3", seite:"220",
    text:"Im Winter zieht Klara morgens viele Schichten an.\nSie trägt ein Unterhemd, einen Pullover und eine Jacke.\nDraußen hält sie sich warm und freut sich über den gefrorenen Teich im Park.",
    frage:"Warum zieht Klara so viele Schichten an?",
    antwort_a:"Weil es ein besonderer Tag ist",
    antwort_b:"Weil es draußen sehr kalt ist",
    antwort_c:"Weil sie Sport machen will",
    antwort_d:"Weil die Heizung kaputt ist",
    richtig:"B",
    erklaerung:"Klara zieht Unterhemd, Pullover und Jacke an und draußen ist der Teich gefroren — es ist sehr kalt." }

];

var existing = D.get("deutsch") || [];
var ohneAlteA3 = existing.filter(function(t){
  return (t.stufe || "").toUpperCase() !== "A3";
});
D.set("deutsch", ohneAlteA3.concat(aufgaben));

})();
