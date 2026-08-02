# Laetitia Lernsystem — Übergabe für neue Sitzung
*Stand: 1. August 2026 (Sitzung 18 — abgeschlossen). **🟢 Gemini-API-Key-Problem behoben:** Nutzer hat einen neuen Key selbst über aistudio.google.com geholt, in `listener.ps1` (OneDrive) Zeile 32 eingetragen und den Task `Laetitia_Nova_Listener` neu gestartet — live verifiziert (Nova/Fabu/Milo einzeln per curl, Gruppenchat über 3 echte Gesprächsrunden mit dynamischen Antworten, Milos Logik-Online-Tipp, UND Fabus Diskussionsfragen-Live-Reaktion — echte, konkret auf die gewählte Antwort bezogene Gemini-Antwort statt Fallback bestätigt), alle Online-Agenten-Features laufen jetzt wie vorgesehen. Wichtigster offener Punkt für die nächste Sitzung ist jetzt: Fabu-Stimme-Installation abschließen (Nutzer mitten in der Installation, VirusTotal-Prüfung bereits sauber, siehe Abschnitt „🟡 Fabu-Stimme"). Sehr umfangreiche Sitzung in vier Teilen: (1) ausstehenden Commit aus Sitzung 17 nachgeholt, danach Mathe-Modul-Ausbau Schritt 4 (4-Stufen-Navigation) umgesetzt — Mathe-Ausbau-Vorhaben (Schritte 1–4) damit abgeschlossen; (2) auf Nutzerwunsch Logik-Modul analysiert, zwei Bugs behoben (Header, fehlende Statistik-Sichtbarkeit) und Milo-Anschluss Stufe A+B umgesetzt (offline Sokratischer Hinweis-Button + Milo-Chat-Kontext + Online-Anfrage mit robustem Fallback — dabei den API-Key-Fund gemacht); (3) Logik-Modul um 4 neue Stufen L6–L9 erweitert (48 neue Aufgaben, 66→114 gesamt), dabei einen echten Bug vor dem Commit gefunden und behoben (kollidierende Aufgaben-IDs bei L8); (4) Mathe-Modul um Rechenweg-Visuals für M1–M4 ergänzt (größte didaktische Lücke aus der Analyse geschlossen — Addition/Subtraktion jetzt visuell wie bisher nur M0/Zählen); (5) zwei kleinere Optik-Funde final behoben — unstyled Glossar-Hilfe-Overlay (Mathe + Sinnesorgane-Quiz) und kollabierte Trennleerzeichen bei Logik-Musteraufgaben (betraf auch L1); (6) Sichtbarkeits-Entscheidung `schule_mathe` getroffen — eigener Statistik-Tab + Milo-Kontext, wie schon bei Mathe/Logik; (7) Fabu-Rechengeschichten umgesetzt — dritte Fabu-Bibliothek, Matheaufgaben narrativ eingebettet, lokal ausgewertet statt per Gemini; (8) Logik um Stufe L10 „Muster-Raster" erweitert — visuelle Matrizen-Aufgaben (non-verbales IQ-Test-Format) als 3×3-Raster aus lateinischen Quadraten, rein datengetrieben ohne Bild-Assets oder Änderung an `moduleKit.js`; (9) auf Nutzerwunsch gründlicher Gesamt-Check aller Module — dabei Grammatik/Reimen/Sinnesorgane als komplett unsichtbar in der Lernstatistik entdeckt (trackten seit jeher vollständig, waren nur nie in den Statistik-Modul-Listen eingetragen — gleiche Bugklasse wie zuvor bei Logik) und behoben, außerdem drei seit Mai 2026 unreferenzierte Alt-Dateien aus einer früheren moduleKit-Migration gefunden und mit Nutzer-Bestätigung gelöscht; (10) KI-Agenten-Weiterentwicklung in vier Schritten umgesetzt (Nutzer-Reihenfolge, sukzessive, jeder Schritt live getestet) — Milos Lernkontext um Deutsch/Sinnesorgane/Reimen ergänzt, Mathe bekam denselben Milo-Hinweis-Button wie Logik, neuer Gruppenchat („Alle zusammen" — ein Gespräch, themenbasiertes Routing zwischen Nova/Fabu/Milo), und ein proaktiver, deterministischer Impuls auf der Lernen-Übersicht (kein Netzwerk-/Gemini-Aufruf für die Auswahl, `listener.ps1` unangetastet). Damit sind Mathe- UND Logik-Ausbau vollständig abgeschlossen, keine unbeauftragten Analyse-Ideen mehr offen, und die Lernstatistik zeigt jetzt alle acht getrackten Module. Siehe Abschnitte „Mathe-Modul-Ausbau", „Logik-Modul: Analyse + Ausbau", „Gesamt-Check aller Module", „KI-Agenten-Weiterentwicklung" und „Sitzungsprotokoll Sitzung 18" weiter unten. Live überwiegend in Chrome getestet (Browser-Erweiterung war diese Sitzung verbunden), dabei mehrere kleine Bugs gefunden und sofort behoben.*

---

## System-Kontext

**Laetitia** ist ein Kind mit Behinderung. Tobii Accent 1400, Augensteuerung (Dwell).
Edge, `file://`, offline, Windows 11.
Pfad: `C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/`

---

## Kollaborations-Regel (Claude)

Claude beschränkt sich auf entscheidungsrelevante Ausgaben. Einzelschritte, Überlegungen und Verifikations-Logs erscheinen nicht im Chat. Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## 20 Goldstandard-Regeln

1. `dwell.js` immer `<script src="...">`, nie `import()`
2. `localStorage["laetitia_input_mode"] = "tobii"` als Standard
3. Pro Anfrage nur die genannte Datei ändern
4. Keine typografischen Anführungszeichen in JS
5. Nach Änderungen Edge komplett schließen und neu öffnen
6. Kerndateien (`dwell.js`, `error_handler.js`, `geraete.js`) NIE aus Gedächtnis — immer hochladen lassen
7. Dwell via `LaetitiaAttachDwell` aus `dwell.js` v10
8. Zurück-Button: unten, lila (`#8b5cf6 / #ede9fe`)
9. Feedback mit `LOB_TEXTE` + `zufallsLob()`, TTS wartet auf `onend`
10. `error_handler.js` in jede Spielseite einbinden
11. **Stimme:** Microsoft Katja Online (Natural) — vollständiger Selektor in PROJEKT_WISSEN.md
12. Jede HTML-Datei: `<!-- depth:N — Pfade: ../×N zu app/ -->` direkt nach `<!doctype html>`
13. Inline-`<script>` max. 20 Zeilen — Logik in externe `.js`-Dateien
14. Mediendateien per `*_media_config.js` parametrisiert — nie löschen, nur `"id": false`
15. `stats.js` in jede Spielseite einbinden (sessionStart/taskStart/taskAnswer/sessionEnd)
16. Vor jedem `git push`: `validate.ps1` ausführen — alle 8 Prüfungen müssen grün sein
17. **Lesebereich von Aktionsbereich trennen:** Text/Frage oben passiv (`pointer-events:none`), Trennstreifen mit Label, Antwort-Buttons unten dwell-aktiv. Buttons nach Antwort vollständig ausblenden (`display:none`). Vollständiges Muster in PROJEKT_WISSEN.md.
18. **Auswahlfelder erst nach TTS-Ende:** Auswahl-/Antwort-Buttons werden erst NACH vollständigem Ende der Sprachausgabe des zugehörigen Texts sichtbar/dwell-aktiv — nie gleichzeitig mit oder vor Sprechbeginn. Zurück/Beenden bleiben sofort erreichbar. Referenz: `fabu_mod.js`/`milo_mod.js` (Sitzung 17, 31.07.2026).
19. **Echte deutsche Umlaute, keine ASCII-Transliteration:** In vorgelesenen/angezeigten Texten (Aufgaben, `persona.json`, TTS-Strings, UI-Labels) immer `ä ö ü Ä Ö Ü ß` als echte Zeichen schreiben, nie `ae/oe/ue/ss` — sonst spricht Edge/Windows-TTS Wörter falsch aus. Gilt nicht für Code-Identifier, JSON-Schlüssel oder Kommentare. Codebase einmalig komplett bereinigt (Sitzung 17, 31.07.2026).
20. **Antwortvorschlag ≠ Auslösefeld:** Bei jeder Mehrfachauswahl (auch bei einzelnen Wörtern) muss der Text jeder Antwortoption zuerst in einem passiven Feld (`pointer-events:none`, kein Dwell) erscheinen — getrennt vom Auslösefeld (Dwell-/Klick-Button). Sonst löst das bloße Betrachten/Vergleichen der Optionen bereits eine ungewollte Auswahl aus, bevor Laetitia sich bewusst entschieden hat. Vollständiges Muster (moduleKit `read1txt`–`read4txt`, `leseHtml()`-`extraHtml`-Parameter) in PROJEKT_WISSEN.md, Abschnitt „Antwortvorschlag ≠ Auslösefeld". Neu, 02.08.2026 (Sitzung 19) — vorher nur implizit in Grammatik umgesetzt, nicht projektweit.

---

## Goldstandards auf einen Blick

**Stimme:** Katja Online (Natural) → Katja → non-Hedda Microsoft → Fallback. Gilt für Aufgaben, Erläuterungen und Lob-Feedback — überall dieselbe `sprich()`-Funktion.

**Aufgaben-Reihenfolge:** Chronologisch, kein Mischen. Antwort-Optionen (A/B/C) werden zufällig gemischt.

**Überspringen-Button:** Orange, gleiche Größe wie andere Nav-Buttons, in Nav-Leiste unten.

**Antwort-Layout:** Text links, Bestätigen-Button (✓) rechts als `.antwortZeile`.

**Nav-Leiste (alle Module):** `← Zurück | ✅ Weiter | → Überspringen` — immer nebeneinander in einer Zeile (`flex-direction:row`). Container: `.nav-leiste-unten#navLeiste`.

**Lautstärke:** Zentral über `geraete.js` (`LaetitiaGeraete.initLautstaerke()`). Zwei Profile: JBL und intern.

**Grammatik-Werkstatt Auto-Weiter:** Nach TTS-Ende 3 Sekunden warten, dann automatisch zur nächsten Aufgabe. Weiter-Button für sofortiges Vorwärts. Antwort-Buttons nach Klick sofort `display:none`.

---

## Aktueller Stand der Module (schule/)

| Datei | Status |
|---|---|
| `schule_jaein.html` | ✅ Chronologisch, Überspringen-Button |
| `schule_raetsel.html` | ✅ Chronologisch, Überspringen-Button |
| `schule_buchstaben.html` | ✅ Weiter-Button ergänzt |
| `schule_mathe.html` | ✅ Chronologisch, kein 10er-Limit, Überspringen-Button |
| `schule_lies.html` | ✅ Überspringen-Button |
| `schule_lesen.html` | ✅ Chronologisch, Überspringen, Nav-Leiste, Antwort-Goldstandard, Katja |
| `schule_sachkunde.html` | ✅ Goldstandard-Layout, kein Scroll |
| `schule_lesen_bilder.js` | ✅ 10 Fotos aus Deutsch_01/02.pdf |
| `schule_lesen_data.js` | ✅ 28 Aufgaben |
| `schule_liesmal3_bilder.js` | ✅ 6 Comics, BILD_CROP individuell |
| `schule_liesmal3_data.js` | ✅ vollständig |
| `test_suite.html` | ✅ JS-Checks laufen, HTML-Checks brauchen Edge-Flag |

## Grammatik-Werkstatt — Stand 7. Juni 2026

Erreichbar: `schule.html` → Grammatik-Button → `grammatik.html`

**Navigations-Hierarchie (3 Ebenen, neu seit Sitzung 12):**
1. `grammatik.html` — Stufen-Auswahl: 4 Kacheln Grundlagen 🌱 / Fortgeschrittene 🌿 / Profi 🌳 / Champion 🏆 (2x2-Grid, kein Scrollen)
2. `grammatik_kategorie.html?kat=<id>` — Lektionsraster der Kategorie, 4-Spalten-Grid, Zeilenzahl dynamisch (`Math.ceil(anzahl/4)`), kein Scrollen
3. `grammatik_spiel.html?einheit=E-XX&kat=<id>` — Spielseite; „Zurück" führt dank `kat`-Parameter zur richtigen Kategorie-Seite zurück

| Datei | Inhalt | Version |
|---|---|---|
| `grammatik.html` | Stufen-Auswahl (4 Kategorie-Kacheln, 2x2-Grid) | ✅ NEU |
| `grammatik_kategorie.html` + `.js` | Lektionsraster je Kategorie (`?kat=<id>`), 4-Spalten-Grid | ✅ NEU |
| `grammatik_spiel.html` | Spielseite (`?einheit=E-XX&kat=...`) — Lese-/Aktions-Trennung in allen 5 Aufgabentypen | v3 ✅ |
| `grammatik_data.js` | 44 Einheiten, 440 Aufgaben (E-03–E-46) | ✅ |
| `grammatik_mod.js` | Engine: `window.GrammatikMod.starteEinheit(id)` — Auto-Weiter, `leseHtml()` mit optionalem `extraHtml`-Parameter | v3 ✅ |
| `grammatik_uebersicht.js` | `window.GrammatikUebersicht.baueUebersicht()` — baut die 4 Kategorie-Kacheln | ✅ |

**Kategorie→Stufen-Mapping** (in grammatik_uebersicht.js + grammatik_kategorie.js dupliziert):
- grundlagen = Stufe 1+2 (E-03–E-14, 12 Einheiten)
- fortgeschrittene = Stufe 3+4 (E-15–E-26, 12 Einheiten)
- profi = Stufe 5+6 (E-27–E-34, 8 Einheiten)
- champion = Stufe 7+8+9+10 (E-35–E-52, 18 Einheiten) — Stufe 9 wurde Sitzung 12, Stufe 10 wurde Sitzung 17 ergänzt und jeweils der Champion-Kategorie zugeschlagen

**Lernpfad-Stand:**

| Stufe | Einheiten | Thema | Aufgaben | Status |
|---|---|---|---|---|
| 1 | E-03–E-09 | Nomen, Verben, Adjektive | 70 | ✅ |
| 2 | E-10–E-14 | Artikel der/die/das | 50 | ✅ |
| 3 | E-15–E-20 | Sätze bauen (Subjekt/Prädikat/Objekt) | 60 | ✅ |
| 4 | E-21–E-26 | Konjugation Gegenwart | 60 | ✅ |
| 5 | E-27–E-30 | Singular & Plural | 40 | ✅ |
| 6 | E-31–E-34 | Groß-/Kleinschreibung | 40 | ✅ |
| 7 | E-35–E-38 | Kasus (Wer-/Wen-Fall) | 40 | ✅ |
| 8 | E-39–E-42 | Pronomen | 40 | ✅ |
| 9 | E-43–E-46 | Satzzeichen (Punkt/Fragezeichen/Ausrufezeichen + gemischte Übung) | 40 | ✅ |
| 10 | E-47–E-52 | Kasus vertieft: Wessen-/Wem-Fall (Genitiv/Dativ) | 60 | ✅ NEU |
| **11+** | — | — | — | ⬜ noch nicht geplant |

**Grammatik-Werkstatt Features:**
- Lesebereich (grau, `pointer-events:none`) oben — Frage + Satz + Vergleichsinhalte (Optionen/Wörter) sind PASSIV
- Trennstreifen „👆 Deine Antwort" als sichtbare Grenze
- Aktionsbereich (weiß, dwell-aktiv) unten — nur Buttons
- Nach Antwort: Buttons vollständig ausgeblendet (`display:none`)
- 3 Sekunden nach TTS-Ende: Auto-Weiter zur nächsten Aufgabe
- Weiter-Button bleibt für sofortiges Vorwärts
- **Alle Einheiten immer zugänglich** — keine Freischaltlogik
- **Admin-Panel:** 3 Sekunden auf den Header halten → „Alle Fortschritte löschen"

**Lese-/Aktions-Trennungs-Fix (Sitzung 12):** ab_wahl/abc_wahl/wort_button zeigten Vergleichsinhalte (Optionstexte bzw. Satz-Wörter) vorher NUR auf den Dwell-Buttons — bei Augensteuerung ein Risiko (Hingucken zum Lesen löst Klick aus). Fix: `leseHtml()` um optionalen `extraHtml`-Parameter erweitert; Optionen erscheinen zusätzlich als „A: … / B: …" im passiven Lesebereich (`.lese-optionen`), Wort-Sätze als zusammengesetzter `.lese-satz`. Reiner Code-Fix in `grammatik_mod.js` + CSS — keine Änderung an `grammatik_data.js` nötig.

**🐛 Dwell-Lücke gefunden + behoben (Sitzung 17, 31.07.2026):** `#btnUeberspringen` fehlte in der `bindeDwell()`-Selektorliste aller 5 Aufgabentypen — der Button war nur per Maus/Touch klickbar, nicht per Blick-Dwell. Beim Testen des neuen Reime-Moduls (gleicher Bug dort) aufgefallen und in beiden Modulen behoben.

## Reime-Werkstatt — Stand 31. Juli 2026 (komplett neu aufgesetzt, Sitzung 17)

Erreichbar: `lernen.html` → 🎵 Reimen-Kachel → `reim.html`

Auf Nutzerwunsch komplett neu konzipiert: statt 31 selbst erfundener Zweizeiler jetzt **5 echte Gedichte von Johann Wolfgang von Goethe** (Heidenröslein, Das Veilchen, Der Fischer, Der König in Thule, Erlkönig), die gleichzeitig als Content-Bibliothek für Fabu (KI-Agent) dienen.

| Datei | Inhalt |
|---|---|
| `app/modules/gedichte/gedichte_data.js` | NEU, gemeinsam genutzt — `window.GEDICHTE`, 5 Gedichte mit Volltext (`strophen`) + Fabu-Vorlese-Abschnitten (`abschnitte`, gleiche Form wie `geschichten_data.js`) |
| `app/modules/reim/reim_data.js` | `window.REIM_EINHEITEN` (G-01…G-05), 49 aus echten Zeilen kuratierte Aufgaben (3 Typen: `reim_wahl`, `luecke_wahl`, `reim_janein`) |
| `app/modules/reim/reim.html` + `reim_uebersicht.js` | Einheiten-Übersicht, dynamisch aus `REIM_EINHEITEN` gebaut (wie `grammatik_uebersicht.js`) |
| `app/modules/reim/reim_spielen.html` + `reim_spielen_mod.js` | Spielseite, 1:1 an Grammatik-Werkstatt-Pattern angelehnt (Lese-/Aktionsbereich-Trennung, Auto-Weiter, `stats.js`, Katja-TTS) — plus neuer Button „📖 Ganzes Gedicht hören" am Einheitenende |

**Fabu bekommt dieselben Gedichte als zweite Bibliothek** neben seinen Geschichten (`fabu.html`/`fabu_mod.js`: neuer Button „📜 Gedichte anschauen", Player-Logik verallgemeinert auf `aktInhalt`/`aktQuelle` statt nur `aktGeschichte`).

**Erlkönig-Entscheidung (mit dem Nutzer abgestimmt):** Das Gedicht endet mit dem Tod des Kindes im Arm des Vaters — inhaltlich intensiver als die anderen vier. Anders als bei Fabus eigenen, frei nacherzählbaren Geschichten wird echte, kanonische Literatur NICHT umgeschrieben. Stattdessen führt Fabu es zu Beginn als „gruselige alte Ballade" ein (wie eine Sage) und bietet nach dem Ende ein ruhiges Gespräch an, statt kommentarlos weiterzugehen. Dokumentiert in `persona.json` (neuer Abschnitt `gedichte`) als Präzedenzfall für künftige Gedichte mit ähnlich schweren Themen.

**Zwei Bugs beim ersten Test gefunden + behoben:**
1. Reimen-Übersicht: 5 Kacheln (statt vorher 4) sprengten die feste 100vh-Höhe, Zurück-Button wurde aus dem Sichtbereich gedrückt. Fix: Übersicht scrollt jetzt intern (wie Fabus Geschichtenliste), Header + Zurück-Button bleiben fix — robust auch wenn später weitere Gedichte dazukommen.
2. Überspringen-Button ohne Dwell-Bindung in allen 3 neuen Aufgabentypen — siehe Grammatik-Abschnitt oben, gleicher Fix auch dort angewendet.

✅ **Vom Nutzer in Edge getestet** (automatisierter Live-Test war zunächst nicht möglich, Chrome-Erweiterung nicht verbunden — Nutzer hat stattdessen selbst geprüft): dabei wurde der oben beschriebene Zurück-Button-Bug gefunden und behoben. Danach keine weiteren Rückmeldungen zu Reimen selbst — Fokus verschob sich auf den Goldstandard-Audit bei Fabu/Milo (siehe nächster Abschnitt).

## Fabu + Milo — Goldstandard-Audit (31.07.2026, Sitzung 17)

Nutzeranfrage: Im Geschichten-Modul (Fabu) sollen Auswahlfelder erst nach vollständigem Vorlesen erscheinen, farblich dem Goldstandard entsprechen und eine angemessene Schriftgröße haben — plus eine umfassende Kontrolle der Goldstandard-Einhaltung. Nach Fabu auf ausdrücklichen Nutzerwunsch identisch auf Milo angewendet.

**Behoben (beide Agenten, `fabu_mod.js`/`fabu.html` und `milo_mod.js`/`milo.html`):**
1. **Timing:** Vorschläge (und bei Milo zusätzlich der „Eigene Antwort"-Button) erschienen bisher gleichzeitig mit Sprechbeginn statt erst nach TTS-Ende. Milos `sprich()` unterstützte bisher gar keinen Callback — dafür ergänzt (analog zu Fabus bereits vorhandenem Callback-Muster).
2. **Farbe:** Auswahlfelder waren im Ruhezustand nur weiß/grau (Farbe kam erst bei Dwell-Hover) — abweichend vom Rest des Projekts (Grammatik/Reime-Antwortbuttons sind schon im Ruhezustand farbig). Jetzt durchgehend in der jeweiligen Agentenfarbe (Fabu amber, Milo türkis).
3. **Schriftgröße:** 16px → 19px (war kleiner als alle anderen Haupt-Antwortbuttons im Projekt, 19–24px).
4. **Regel 8 (Zurück-Button muss lila sein):** Fabu nutzte Amber, Milo Türkis — nur Nova hielt sich an die Vorgabe. Auf Nutzerwunsch bei beiden auf lila (`#8b5cf6`/`#ede9fe`) vereinheitlicht.
5. **Kleinere Konsistenz-Fixes:** fehlende Stimmen-Fallback-Stufe ergänzt (jetzt exakt der 6-stufige Katja-Goldstandard wie in Grammatik), `user-select:none` auf allen interaktiven Buttons, `pointer-events:none` auf den passiven Lesebereichen (`#fabuAntwort`/`#miloAntwort`).

**Geprüft, kein Bug:** `stats.js` ist bei Fabu/Nova eingebunden, aber es werden nie eigene `sessionStart`/`taskAnswer`-Aufrufe gemacht — das ist beabsichtigt, da beide Agenten keine bewertbaren Aufgaben haben. Das Skript wird nur als Abhängigkeit für `lernfortschritt_gemeinsam.js` gebraucht (liest fremde Stats, schreibt keine eigenen).

Commits: `709b212` (Fabu-Fixes + Milo-Erweiterung inkl. Zurück-Button-Vereinheitlichung). `validate.ps1`: 0 Fehler, deployed. Vom Nutzer nicht explizit als „in Edge nachgetestet" bestätigt — nur strukturell/Konsolen-sauber verifiziert vor dem Commit.

## Umlaut-Aussprache-Fix + neue Regel 19 (31.07.2026, Sitzung 17 Fortsetzung)

Nutzeranfrage: Deutsche Umlaute (ä ö ü ß) sollen in Gedichten/Geschichten und systemweit korrekt ausgesprochen werden — sowohl für bestehende als auch künftige Texte.

Systemweiter Audit (Explore-Agent) fand ASCII-Transliterationen (ae/oe/ue/ss statt echter Umlaute) in ~15 Dateien: `gedichte_data.js` (alle 5 Gedichte inkl. Erlkönig), `sinnesorgane_info_data.js` (`tts_organ`-Feld), `schule_liesmal3_data.js` (~45 Stellen, inkl. Bedeutungsfehler „Kueche" statt „Kühe"), `schule_liesmal3_buchstaben_data.js`, `mathe_data.js` (M1_REIHE, 20×), Nova- und Milo-`persona.json`, `lebenskontext_gemeinsam.json`, plus ~15 kleinere Fundstellen in diversen `*_mod.js`/HTML und `listener.ps1`.

Alle Fundstellen auf Werte-Ebene behoben (Code-Kommentare/Variablennamen/JSON-Schlüssel bewusst ausgenommen). Neue **Regel 19** dokumentiert: „Echte deutsche Umlaute, keine ASCII-Transliteration" — gilt für alle vorgelesenen/angezeigten Texte, damit künftiger Content von Anfang an korrekt geschrieben wird.

Commit: `2512029`. `validate.ps1`: 0 Fehler, deployed.

## Mathe-Modul-Ausbau — Stand 01.08.2026 (Sitzung 18, Schritte 1–4 abgeschlossen)

Nutzeranfrage: Mathe-Modul didaktisch und optisch verbessern, unter Einbeziehung der KI-Agenten. Wird schrittweise umgesetzt, Details/Architektur-Recherche auch in Claude-Memory `project_mathe.md`.

**Schritt 1 — Stats-Tracking-Lücke gefunden + gefixt (commit `a3a1585`):** Das Haupt-Mathe-Modul (M0a–M4, über `moduleKit.js`) schrieb bisher gar nicht in die Lernstatistik (Regel 15 im gemeinsamen Motor nie umgesetzt) — nur das kleine Arbeitsheft-Begleitmodul `schule_mathe` tat das, fälschlich ebenfalls unter dem Label `"mathe"`. Alles was bisher unter „Mathe" in `statistik.html`/bei Milo erschien, stammte dadurch ausschließlich vom Arbeitsheft-Modul. `moduleKit.js` bekam generisches `sessionStart`/`taskStart`/`taskAnswer`/`sessionEnd`/`markHilfe` (kommt automatisch auch Logik und Sinnesorgane-Quiz zugute, da alle drei denselben Motor nutzen). `schule_mathe_mod.js` bekam eigene Modul-ID (`"schule_mathe"` statt `"mathe"`) — bleibt auf Nutzerentscheidung vorerst unsichtbar in `statistik.html`/Milo.

**Schritt 2 — `erklaerung`-Feld für alle 265 Aufgaben ergänzt (commit `1188c7f`):** `mathe_data.js` (200 Aufgaben) + `mathe_m0_data.js` (65 Aufgaben) bekamen ein `erklaerung`-Feld, das `moduleKit.js` bereits unterstützte (zeigt es automatisch in der Richtig/Falsch-Rückmeldung an). Programmatisch generiert (regelbasiert je Stufentyp: Verdopplung/Plus-Minus-0/Mit-der-10 bei Addition/Subtraktion, komplette Zahlenfolge mit erkannter Schrittweite bei Nachbarzahlen/Zahlenreihen, Zahlwörter beim Zählen) statt 265 Texte einzeln zu tippen. Ein eigenes Verifikationsskript prüfte alle generierten Texte gegen die tatsächliche Arithmetik nach — dabei einen **echten, vorbestehenden Datenfehler gefunden und behoben**: `M2 "8 - 4 = ?"` war mit der falschen Antwort (5 statt 4) als „richtig" markiert.

**Schritt 3 — Milo an `erklaerung`-Feld angeschlossen (commit `1188c7f`):** `milo_mod.js` bekam `sammleMatheKontext()` (Struktur-Kopie von `sammleGrammatikKontext()`) — löst schwache Mathe-Aufgaben jetzt zur passenden Erklärung auf, genau wie bei Grammatik. `milo.html` lädt dafür zusätzlich `dataRegistry.js` + `mathe_data.js` + `mathe_m0_data.js`. Live in Edge verifiziert (XHR-Interception, Backend nicht nötig): gesendeter Kontext enthält jetzt echte Erklärungen statt nur Fehlerraten.

Schritte 2+3 wurden zu Sitzungsbeginn 18 nachträglich committet + gepusht (waren seit Sitzung 17 fertig getestet, aber uncommittet liegen geblieben) und nach OneDrive deployed.

**Schritt 4 — 4-Stufen-Navigation umgesetzt (commits `32ee5bf`, `723edc2`, `f365eb6`):** Neue `mathe_uebersicht.html` + `mathe_uebersicht_mod.js` zeigen 4 Kacheln (🌱 Grundlagen/🌿 Fortgeschritten/🌳 Profi/🏆 Champion) analog zur Grammatik-Werkstatt, statt der bisherigen flachen 12-Stufen-Liste. Architektur-Entscheidung (mit Nutzer abgestimmt): `mathe_module.js` filtert sein `levelOrder`-Array selbst anhand des `?kat=`-URL-Parameters, bevor es an `moduleKit.js` übergeben wird — **`moduleKit.js` bleibt dadurch komplett unangetastet**, Logik/Sinnesorgane-Quiz sind nicht betroffen. Der Rückweg von der gefilterten Lektionsliste zur Kachel-Übersicht nutzt das bereits vorhandene generische `LaetitiaReturn`-System (`?return=`-Parameter, in `moduleKit.js` schon eingebaut) — dafür war keine einzige Zeile Zusatzcode nötig. `lernen.html`: Mathe-Kachel zeigt jetzt auf `mathe_uebersicht.html`.

Stufen→Tier-Zuordnung (alle 265 Aufgaben exakt einmal zugeordnet, per Skript gegen die echten Daten verifiziert): 🌱 Grundlagen = M0a/M0b/M0c/M0f (45 Aufgaben), 🌿 Fortgeschritten = M0d/M0e/M1_NACHBAR/M1_REIHE (60), 🌳 Profi = M1/M2 (80), 🏆 Champion = M3/M4 (80).

Live in Chrome getestet (Browser-Erweiterung war diese Sitzung verbunden): alle 4 Kacheln, Filterung je Kategorie, Rückweg beidseitig, ein kompletter Aufgaben-Durchlauf inkl. Stats-Update — keine Konsolenfehler. Dabei zwei kleine Bugs gefunden + sofort behoben: (1) ein selbst ergänzter Kategorie-Untertitel wurde von `moduleKit.js`s `showMenu()` bei jedem Aufruf überschrieben und kam nie sichtbar an — als totes Code-Stück wieder entfernt statt `moduleKit.js` für eine Kosmetik-Ergänzung anzufassen; (2) ein **vorbestehender** Bug (unabhängig von Schritt 4) zeigte „Mathe Mathematik" statt „🔢 Mathematik" im Menü-Header, weil `icon:"Mathe"` (Text statt Emoji) an `moduleKit.js` übergeben wurde — auf `icon:"🔢"` korrigiert.

**Damit sind alle 4 geplanten Ausbauschritte abgeschlossen.** `validate.ps1`: 0 Fehler nach jedem Commit, OneDrive durchgehend synchron.

**Rechenweg-Visuals für M1–M4 (commit `b9e98a7`):** Größte didaktische Lücke aus der Analyse geschlossen — bisher gab es nur bei M0 (Zählen) eine visuelle Neuerklärung bei Falsch-Antwort. Neue `zeigeRechenwegAnimation()` erweitert dasselbe `#zaehlOverlay` um Addition und Subtraktion: **Addition (M1/M3)** zeigt erst die Ausgangszahl als blaue Punkte, dann die dazukommende Zahl als grüne Punkte, durchgehend weiterzählend bis zur Summe. **Subtraktion (M2/M4)** zeigt erst alle Punkte der Ausgangszahl, nimmt danach die zu subtrahierende Anzahl einzeln weg (rotes Kreuz), rückwärts zählend bis zum Rest. Aufgabe wird aus dem vorhandenen `text`-Feld geparst ("X + Y = ?"/"X - Y = ?"), keine neuen Daten nötig. Gleiches Timing/Ton-Schema wie M0 (1500ms/Schritt, Pentatonik-Töne, Katja-TTS), gleicher Abbruch-Mechanismus (`_zaehlTimers`) — keine Änderung an `moduleKit.js` nötig, da `onWrongAnswer` bereits generisch existiert. Live in Chrome getestet (M2/M3/M4, per Screenshot visuell bestätigt — Addition mit blau+grün, Subtraktion mit Kreuz-Wegnahme in Echtzeit erwischt), keine Konsolenfehler.

**Sichtbarkeits-Entscheidung `schule_mathe` getroffen: eigener Tab + Milo-Kontext (commit `1e0ec15`):** Nutzer hat sich für volle Sichtbarkeit entschieden (analog Mathe/Logik). Neuer „📘 Schulheft"-Tab in `statistik.html`, `modulLabel()`-Map + beide hartcodierten Modul-Arrays in `statistik_mod.js` ergänzt. Neue `sammleSchuleMatheKontext()` in `milo_mod.js` — dabei eine echte Architektur-Eigenheit berücksichtigt: `schule_mathe_mod.js` ist **nicht** moduleKit-basiert und nutzt ein eigenes Aufgaben-ID-Format (`stufe|index|text` statt `stufe|seite|text|frage`), außerdem liegen die Daten je nach Seite entweder in der Registry (falls `dataRegistry.js` geladen ist, wie in `milo.html`) oder in einer globalen Variable (Fallback in `schule_mathe.html` selbst) — der Lookup fragt beide Quellen ab. Ein erster Testlauf zeigte die Aufgabe korrekt, aber ohne Erklärungstext (Lookup griff zunächst nur auf die leere globale Variable statt die tatsächlich befüllte Registry zu) — nach Korrektur live bestätigt: Statistik-Tab zeigt die simulierte schwache Aufgabe korrekt, Milo-Kontext per XHR-Interception verifiziert inkl. Erklärungstext. Keine Konsolenfehler.

**Fabu-Rechengeschichten umgesetzt (commit `faab75e`):** Dritte Fabu-Bibliothek `rechengeschichten_data.js` (`window.RECHENGESCHICHTEN`), analog zum Gedichte-Ausbau — gleiche `abschnitte`-Datenform wie `GESCHICHTEN`, plus neues optionales Feld `richtig` für Abschnitte mit Rechenaufgabe. 3 neue Geschichten („Fabu sammelt Nüsse" bis 10, „Der Wald-Markt"/„Die Eichhörnchen-Party" bis 20), je 2 narrativ eingebettete Matheaufgaben + eine offene Diskussionsfrage zum Abschluss. Neue `beantworteRechenfrage()` in `fabu_mod.js` wertet Abschnitte mit `richtig`-Feld **lokal/offline** aus (kein Gemini-Aufruf) — bewusste Abweichung von der sonstigen `reagiereAufAntwort()`-Live-Reaktion, da Mathe-Richtigkeit eindeutig ist und nicht dem Sprachmodell überlassen werden darf. Dritter Button „🌰 Rechengeschichten" auf dem Fabu-Startbildschirm, `aktInhalt`/`aktQuelle`-Muster weiter verallgemeinert. `persona.json` um die bewusste Ausnahme von Fabus „keine Quizfragen"-Charaktereigenschaft dokumentiert.

Live in Chrome komplett durchgespielt: erste Rechenfrage richtig beantwortet (korrektes Feedback + Erklärung), zweite bewusst falsch beantwortet (korrektes Falsch-Feedback mit Lösung + Erklärung), abschließende Diskussionsfrage fällt mangels Gemini-Key erwartungsgemäß auf Weitererzählen zurück, korrekte Rückkehr zur Auswahl nach Geschichtenende. Alle 6 Rechenfragen strukturell verifiziert (richtige Antwort immer unter den Vorschlägen). Keine Konsolenfehler.

**Damit ist auch die letzte offene Idee aus der Mathe-Analyse umgesetzt — keine unbeauftragten Mathe-Vorschläge mehr offen.**

## Logik-Modul: Analyse + Ausbau — Stand 01.08.2026 (Sitzung 18)

Nutzeranfrage: Logik-Modul analysieren, didaktische/optische Verbesserungsvorschläge machen, Mathe-Erkenntnisse wo übertragbar wiederverwenden, KI-Agent (Milo) einbeziehen.

**Ist-Zustand (Stand nach Content-Ausbau, siehe unten):** 10 Stufen (L1 Was passt nicht?/L2 Muster/L3 Analogien/L4 Richtig-Falsch/L5 Wenn-Dann/L6 Reihenfolgen/L7 Ursache-Wirkung/L8 Widersprüche/L9 Mengenvergleiche/L10 Muster-Raster), 126 Aufgaben, alle mit `erklaerung`-Feld (Mathe brauchte dafür noch einen eigenen Schritt), Lese-/Aktionsbereich-Trennung (Regel 17) schon korrekt. Die 4-Stufen-Navigation von Mathe wurde als **nicht übertragbar** bewertet — bei ursprünglich nur 5 (jetzt 9) Stufen passt die flache Liste ohne Scrollen weiterhin gut, eine zusätzliche Kachel-Ebene wäre unnötiger Klick-Overhead.

**Zwei Bugs gefunden + behoben (commit `67979c5`):**
1. `logik.html`/`logik_module.js` waren sichtbar 1:1 von `mathe.html` kopiert — statischer Platzhalter zeigte „🔢 Mathematik", `icon:"Logik"` (Text statt Emoji) baute den Laufzeit-Header als „Logik Logik". Auf `icon:"🧩"` korrigiert — gleiche Bugklasse wie zuvor bei Mathe.
2. Logik wurde seit dem Mathe-Schritt-1-Stats-Fix bereits generisch getrackt, war aber in `statistik.html` komplett unsichtbar: zwei hartcodierte Modul-Listen in `statistik_mod.js` sowie Tab-Leiste und Label-Map fehlte der Eintrag. Logik erscheint jetzt als eigener Tab, live mit echter Test-Session verifiziert.

**Milo-Anschluss Stufe A, offline (commits `9b6c054`, `cb75292`):** Zwei Teile umgesetzt, beide ohne Netzwerk-/Gemini-Abhängigkeit:
1. **In-Modul-Hinweis:** Der „Hilfe"-Button zeigte bisher moduleKit.js' generisches Wort-Glossar-Overlay — für Logik ohne `opts.glossary` faktisch nutzlos (jedes Wort nur „Noch keine Erklärung hinterlegt", zudem strukturell unstyled, da `.overlayCard`/`.overlaySub`-Klassen in `logik.html` gar nicht definiert sind — vermutlich ein weiterer, bislang nicht behobener Alt-Bug, siehe „Bekannte Einschränkung" unten). Über `onHelp` ersetzt durch ein neues 🦉 „Milo denkt mit"-Overlay: fünf sokratische Hinweise (einer je Aufgabentyp L1–L5, formuliert als Denkanstoß statt Lösung), per Katja-TTS vorgelesen, zählt weiterhin als `markHilfe()`. Nutzt die bereits funktionierenden `overlayBox`/`overlayEmoji`/`overlayTitle`-Klassen aus dem bestehenden Abschluss-Overlay statt der unstyled Glossar-Klassen.
2. **Milo-Chat-Kontext:** `milo_mod.js` kannte Logik in `sammleLernkontext()` bisher überhaupt nicht (nicht mal generisch, anders als Lesen). Neue `logikErklaerungMap()`/`findeLogikErklaerung()`/`sammleLogikKontext()` — 1:1-Struktur-Kopie von `sammleMatheKontext()`, aber ohne Generierungsschritt nötig, da Logik das `erklaerung`-Feld schon vollständig hatte. `milo.html` lädt dafür zusätzlich `logik_data.js` + `logik_data_L5.js`.

Beide Teile live in Chrome getestet: Hinweis-Overlay erscheint korrekt je Stufe mit TTS, schließt sauber, beeinträchtigt das normale Aufgaben-Feedback nicht; Milo-Kontext per XHR-Interception verifiziert (simulierte schwache Logik-Aufgabe im Stats-LocalStorage → gesendeter `kontext`-String enthält korrekt Fehlerrate + Erklärungstext). Keine Konsolenfehler, `validate.ps1`: 0 Fehler nach jedem Commit, OneDrive durchgehend synchron.

**Milo-Anschluss Stufe B, online/dynamisch (commit `d161201`):** `zeigeMiloTipp()` versucht jetzt zuerst eine Live-Anfrage an `listener.ps1` (`agent:"ki_agenten/milo"`, Kontext mit Aufgabe + Lösung + Anweisung „die Lösung NICHT verraten, nur einen kurzen Denkanstoß geben"), zeigt währenddessen „Milo denkt nach …". Fällt bei Fehler/Timeout unauffällig auf den bestehenden Stufe-A-Text zurück — identisches Fallback-Prinzip wie bei Fabus Live-Reaktionen (`fabu_mod.js`). Ein Anfrage-Zähler verhindert, dass eine verspätete Antwort ein zwischenzeitlich geschlossenes Overlay wieder aufspringen lässt. Weder `moduleKit.js` noch `listener.ps1` mussten angefasst werden — Verhalten komplett über den Kontext-String gesteuert.

**Verifikation Stufe B:** Per direktem `curl` gegen `listener.ps1` UND in Chrome getestet (bewusst per sauberem DOM-`.click()` statt Maus-Dwell, um Automatisierungs-Artefakte auszuschließen — ein früherer Testlauf mit simulierter Maus zeigte einen scheinbaren Aufgabenwechsel, der sich als reines Dwell-Hover-Testartefakt herausstellte, kein App-Bug). Fallback greift korrekt für die tatsächlich aktuelle Aufgabe, keine Konsolenfehler.

**🔴 Dabei gefunden, nicht behoben (betrifft alle Online-Agenten-Features, nicht nur diese Änderung):** Die aktuell laufende `listener.ps1`-Instanz (OneDrive, Autostart-Task) hat statt eines echten Gemini-Keys noch den Repo-Platzhalter `HIER_GEMINI_KEY_EINTRAGEN` eingetragen (Zeile 32) — vermutlich beim letzten Deploy versehentlich überschrieben, exakt derselbe Vorfall wie schon in Sitzung 16 dokumentiert. Per `curl` bestätigt: Gemini antwortet mit `"Please pass a valid API key"`. Dadurch laufen Nova, Fabu-Live-Reaktionen, Milo-Chat UND jetzt Logik-Stufe-B aktuell alle durchgehend auf ihren Offline-Fallbacks — Laetitia bemerkt es nicht als Fehler, aber keine der „echten" dynamischen Antworten kommt an. **Claude darf den Key nicht selbst eintragen** (Sicherheitsrichtlinie). Nutzer muss: (1) echten Key erneut von aistudio.google.com holen (Projekt „LaetitiaLernplattform"), (2) in `.../OneDrive/2026_05_12_Lernsystem/app/listener.ps1` Zeile 32 eintragen, (3) Listener neu starten (Task Scheduler → `Laetitia_Nova_Listener` neu auslösen oder PC neu anmelden). Siehe auch Abschnitt „🔴 Offene Aufgaben — Hochpriorität" weiter unten.

**Unstyled-Glossar-Overlay behoben (commit `a35aed4`):** Der generische Wort-Glossar-Hilfe-Overlay aus `moduleKit.js` (`ensureHelpOverlays()`) nutzt CSS-Klassen (`.overlayCard`, `.overlaySub`), die weder in `mathe.html` noch in `sinnesorgane_quiz.html` definiert waren — renderte dort unstyled statt als Karte. Ursprung in `mathe_test.html` (altes Prototyp-File) gefunden, wo die CSS-Regeln bereits existierten, beim Erstellen der echten Module aber nie übernommen wurden. In beiden betroffenen Dateien ergänzt (Logik selbst ist nicht mehr betroffen, hat seit Milo-Stufe-A einen eigenen `onHelp`). Live in Chrome bestätigt: Overlay zeigt jetzt eine saubere weiße Karte mit Rahmen/Schatten.

**L2-Muster-Lesbarkeit behoben (commit `819a27e`):** Befund war größer als der ursprüngliche Vorschlag „mehr Abstand bei L2" — die Daten nutzen bereits durchgängig doppelte Leerzeichen als Trenner zwischen Symbolen (nicht nur L2-Muster, auch alle L1-Optionsreihen wie `"🍕  🍔  🌮  🚲"`), aber `.questionBlock` hatte keinen `white-space`-Wert gesetzt, wodurch der Browser-Standard `normal` mehrere Leerzeichen zu einem kollabierte — die absichtliche Formatierung kam nie sichtbar an. Fix: `white-space:pre-wrap` auf `.questionBlock`, ohne Risiko für normalen Fließtext bei den anderen Stufen (verhält sich dort identisch zu `normal`). Live bestätigt: L2-Zahlenfolgen zeigen jetzt deutliche Lücken, L3-Fließtext bricht weiterhin sauber um.

**Content-Ausbau: 4 neue Stufen L6–L9, 48 neue Aufgaben (commit `8f896fc`):** Neue `logik_data_L6_L9.js` (gleiches additives Registry-Muster wie `logik_data_L5.js`) — L6 „Was zuerst, was zuletzt?" (Alltagsreihenfolgen), L7 „Ursache und Wirkung" (Rückschluss von Wirkung auf Ursache, Gegenrichtung zu L5s Wenn-Dann), L8 „Was stimmt nicht?" (Widerspruch unter vier Sätzen erkennen), L9 „Was ist mehr?" (Mengenvergleiche — bewusst als Vergleichsurteil statt Rechenaufgabe gestaltet, um keine Redundanz zum Mathe-Modul zu erzeugen). Je 12 Aufgaben, `levelOrder`/`levelLabel`/`MILO_TIPPS` in `logik_module.js` ergänzt, neue Datendatei in `logik.html` UND `milo.html` eingebunden (Milo kennt die neuen Stufen dadurch automatisch mit).

**Bug vor dem Commit gefunden + behoben:** Ein eigenes Verifikationsskript (analog zum Mathe-Erklärungs-Check) deckte auf, dass alle 12 L8-Aufgaben identischen `frage`-Text hatten — `moduleKit.js`s `taskId()` (`stufe|seite|text|frage`) wäre dadurch für alle 12 identisch gewesen, was Statistik-Tracking und Milos Erklärungs-Lookup auf nur eine Aufgabe reduziert hätte. Jede L8-Frage bekam einen kurzen, themenspezifischen Einleitungssatz zur Eindeutigkeit (z.B. „Es geht um Schnee — welcher dieser vier Sätze stimmt nicht?").

**Verifikation:** Alle 114 Aufgaben-IDs strukturell auf Eindeutigkeit + Vollständigkeit geprüft (Node-Skript). Live in Chrome getestet: L6/L8/L9 durchgespielt (korrektes Feedback + Erklärung), L7-Milo-Tipp gezeigt, Milo-Chat-Kontext per XHR-Interception verifiziert (löst eine simulierte schwache L7-Aufgabe korrekt zur Erklärung auf). Keine Konsolenfehler, `validate.ps1`: 0 Fehler, OneDrive synchron.

**Content-Ausbau: neue Stufe L10 „Muster-Raster", 12 neue Aufgaben (commit `86541ae`):** Letzte offene Analyse-Idee umgesetzt — visuelle Matrizen-Aufgaben (non-verbales IQ-Test-Format), ohne dafür neue Bild-Assets zu brauchen: `logik_data_L10.js` (gleiches additives Registry-Muster wie L6–L9) baut jede Aufgabe als 3×3-Raster aus drei sich in jeder Zeile und Spalte genau einmal wiederholenden Emoji-Zeichen (lateinisches Quadrat), ein Feld fehlt (❓). Das Raster liegt als mehrzeiliger Text im bestehenden `frage`-Feld — möglich, weil `.questionBlock` bereits `white-space:pre-wrap` hat (siehe L2-Fix oben) und `moduleKit.js`s `displayText()` literale `\n`-Sequenzen in echte Zeilenumbrüche wandelt (bereits an anderer Stelle im Deutsch-Modul genutztes Muster). Keine Änderung an `moduleKit.js` nötig — reine Daten-Erweiterung plus `levelOrder`/`levelLabel`/`MILO_TIPPS`-Ergänzung in `logik_module.js`, neue Datendatei zusätzlich in `milo.html` eingebunden.

**Verifikation:** Eigenes Node-Skript prüft für alle 12 Aufgaben programmatisch, dass es sich um echte lateinische Quadrate handelt (jedes Symbol pro Zeile/Spalte genau einmal), dass die hinterlegte „richtig"-Antwort tatsächlich das einzige logisch fehlende Symbol ist, und dass alle 4 Antwortoptionen paarweise verschieden sind — 0 Fehler. Alle 126 Logik-Aufgaben-IDs weiterhin eindeutig (keine Kollision durch die neue Stufe). Live in Chrome getestet: Raster rendert sauber als 3 Zeilen, richtige Antwort mit Erklärung bestätigt, falsche Antwort zeigt korrektes Falsch-Feedback samt Lösung, Milo-Tipp (Stufe A, Offline-Fallback mangels Gemini-Key) erscheint mit dem neuen L10-Hinweistext, Menü-Kachel-Layout bleibt bei 10 Stufen sauber (5×2-Raster ohne Überlappung). Registry-Eintrag von Milo aus bestätigt (126 Aufgaben gesamt, 12 davon L10, alle mit `erklaerung`-Feld) — keine Codeänderung an `milo_mod.js` nötig, da die Erklärungs-Map generisch aus der Registry baut. Keine Konsolenfehler.

**Damit sind auch alle unbeauftragten Einzelideen aus beiden Analysen (Mathe + Logik) umgesetzt.**

## Gesamt-Check aller Module — Stand 01.08.2026 (Sitzung 18)

Nutzeranfrage: gründlicher Check über alle Module hinweg, ob es kleinere Inkonsistenzen oder offene Baustellen gibt, die noch niemand explizit angefragt hat.

**Statistik-Sichtbarkeit: Grammatik, Reimen, Sinnesorgane behoben (commit `70dff3e`):** Alle drei Module tracken seit jeher vollständig über `stats.js` (`sessionStart`/`taskAnswer`/`sessionEnd` bzw. bei Sinnesorgane generisch über `moduleKit.js`), tauchten aber in `app/statistik/` nirgends auf — exakt dieselbe Bugklasse wie zuvor bei Logik (fehlende Einträge in `statistik_mod.js`s hartcodierten Modul-Arrays `berechneFortschrittProModul`/`renderMuster`, fehlender Eintrag in `modulLabel()`, fehlende Tab-Buttons in `statistik.html`). Alle vier Stellen ergänzt (Icons: 📝 Grammatik, 🎵 Reimen, 👁️ Sinnesorgane, konsistent mit den Icons auf den jeweiligen Modul-Übersichtsseiten). Live verifiziert: drei Test-Sessions per LocalStorage injiziert, Gesamt- UND Einzelmodul-Ansicht zeigen korrekt gefilterte Daten, danach wieder entfernt. Keine Konsolenfehler.

**Aufräumen: 3 tote Alt-Dateien entfernt (commit `e518368`):** Bei der Prüfung, welche Module tatsächlich `moduleKit.js` nutzen, aufgefallen dass `app/modules/lesen/lesen_module.js` von KEINER HTML-Seite mehr geladen wird — `lesen.html` bindet tatsächlich `lesen_mod.js` ein (eigener Motor, kein moduleKit). Analog `app/modules/deutsch/deutsch_module.js` und `app/modules/deutsch/data/deutsch_mod.js` — `deutsch.html` nutzt `deutsch_mod.js`. Alle drei seit Mai 2026 unverändert und repo-weit ohne jede Referenz (per Grep bestätigt) — Überbleibsel einer frühen Architektur-Iteration. Mit Nutzer-Bestätigung gelöscht (Repo + OneDrive-Kopie).

**Sonst sauber:** Alle Links in `lernen.html` und den Modul-Übersichtsseiten (schule.html, sachkunde.html) zeigen auf existierende Dateien. Die tatsächlich produktiv aktiven moduleKit-Konsumenten sind nach dieser Bereinigung nur noch drei: `mathe.html`, `logik.html`, `sinnesorgane_quiz.html` (plus zwei Test-/Template-Seiten ohne feste Icon-Konfiguration: `mathe_test.html`, `template/fourchoice_template.html` — unkritisch).

`validate.ps1`: 0 Fehler nach beiden Commits, OneDrive durchgehend synchron.

## KI-Agenten-Weiterentwicklung — Stand 01.08.2026 (Sitzung 18)

Nutzeranfrage: erst Einschätzung, ob Nova/Fabu/Milo dem entsprechen, was man üblicherweise als „KI-Agent" bezeichnet (Antwort: nein — es sind persona-gesteuerte Chatbots mit Kontext-Injektion und geteiltem Gedächtnis, kein Tool-Use/Function-Calling, keine autonome Handlungsfähigkeit, kein Planungs-Loop), danach eine Übersicht sinnvoller Weiterentwicklungsmöglichkeiten. Nutzer bat, **alle** vorgeschlagenen Schritte in der vorgeschlagenen Reihenfolge sukzessive umzusetzen und jeden Schritt selbst zu testen. Bei den beiden größeren, ursprünglich als „nicht spezifiziert" markierten Konzept-Ideen (Gruppengespräche, proaktive Impulse) wurden vor der Umsetzung zwei gezielte Rückfragen gestellt, um keine große Verhaltensänderung für ein Kind mit besonderen Bedürfnissen unilateral zu entwerfen.

**Schritt 1 — Milos Lernkontext-Lücke geschlossen (commit `a3fdd4d`):** Milo kannte bisher nur Grammatik, Mathe, Logik, Schulheft und (ohne Erklärungen) Lesen — obwohl Deutsch, Sinnesorgane und Reimen längst vollständig über `stats.js` tracken und alle drei ein `erklaerung`-Feld haben. Neue `sammleDeutschKontext()`/`sammleSinnesorganeKontext()` (identisches ID-Format wie `moduleKit.js`) sowie `sammleReimKontext()` (eigenes ID-Format aus `reim_spielen_mod.js`, Daten liegen als globale Variable `window.REIM_EINHEITEN` statt in der Registry). `milo.html` lädt dafür zusätzlich die passenden Datendateien. Live per XHR-Interception verifiziert: injizierte schwache Test-Aufgaben aus allen drei Modulen erscheinen korrekt mit Erklärung im an `listener.ps1` gesendeten Kontext-String.

**Schritt 2 — Mathe bekommt denselben Milo-Hinweis-Button wie Logik (commit `684ca4e`):** Mathe nutzte bisher nur das generische (kürzlich erst gestylte, aber inhaltlich weiterhin nutzlose) Wort-Glossar-Overlay. Ersetzt durch den identischen sokratischen „Milo denkt mit"-Button wie in Logik: neue `MILO_TIPPS`-Map mit einem Denkanstoß je Stufe (M0a–M4, offline), optionale Live-Gemini-Anfrage mit robustem Fallback. Live getestet für M1 (Rechenaufgabe) und M0a (Zählaufgabe), normaler Antwort-Flow unverändert.

**Schritt 3 — Gruppenchat „Alle zusammen" (commit `53efcc3`):** Nutzerentscheidung: „Ein Chat, mehrere Stimmen" (statt manuellem Zuschalten). Neue Seite `app/modules/ki_agenten/gruppenchat/`, Motor als Verallgemeinerung von `milo_mod.js`. Eine einfache Stichwort-Heuristik (`waehleAgent()`) entscheidet je Nachricht, ob Nova, Fabu oder Milo antwortet (Fabu bei Geschichten/Gedichten, Milo bei Lern-/Übungsthemen, sonst Nova als Standard) — bewusst kein Gemini-Aufruf zur Auswahl, `listener.ps1` bleibt komplett unangetastet: jede Nachricht ist weiterhin ein normaler `/chat`-Aufruf mit dem passenden `agent`-Parameter. Damit der Gesprächsfaden beim Charakterwechsel nicht verloren geht, werden frühere Antworten im gesendeten Verlauf mit `[Name] ` präfixiert. Milos Lernkontext wird nur beim ersten Milo-Turn mitgeschickt. Sprecherwechsel wird als farbiges Namens-Badge dargestellt — bewusst kein Mix aus Novas 3D-Avatar und den SVG-Gesichtern von Fabu/Milo in einer Seite (deutlich geringeres Risiko, jeder Charakter behält seine volle Identität auf der eigenen Einzel-Seite). Neue Kachel „Alle zusammen" im KI-Freunde-Hub.

**Verifikation Schritt 3:** `waehleAgent()` mit 6 Beispielsätzen pro Charakter getestet — korrekt. Da die real laufende `listener.ps1`-Instanz zwar erreichbar ist, aber weiterhin den Platzhalter-Gemini-Key hat (siehe „🔴 Offene Aufgaben"), wurde für den Mehrfachrunden-Test eine lokale XHR-Antwort-Simulation genutzt, um den echten Produktionscode dennoch vollständig zu prüfen: 3 aufeinanderfolgende Nachrichten, jede korrekt an den erwarteten Charakter geroutet, Badge wechselt korrekt, Verlauf-Präfixe stimmen (`[Nova] ...`, `[Fabu] ...`), Milo-Kontext nur beim ersten Milo-Turn dabei (inkl. echter Erklärungsdaten aus dem Schulheft), Abschluss-Aufruf nutzt korrekt den zuletzt aktiven Charakter. Keine Konsolenfehler.

**Schritt 4 — Proaktiver Impuls auf der Lernen-Übersicht (commit `69bbfa1`):** Nutzerentscheidung: „Ja, auch außerhalb vom Chat" (statt nur einmalig beim Öffnen des Chats). Neue Karte auf `lernen.html` (dem täglich genutzten Haupt-Hub), höchstens 1× pro Tag (localStorage-Cooldown), führt per Klick direkt zum passenden Agenten-Chat. Bewusst **nur positive/einladende Anlässe** — kein Hinweis auf Fehler oder Rückstand, um nicht wie Überwachung zu wirken (das vom Nutzer selbst benannte Aufdringlichkeits-Risiko wurde damit aktiv vermieden, nicht nur zur Kenntnis genommen). Zwei Auslöser, rein deterministisch aus `window.LaetitiaStats` (kein Netzwerk-/Gemini-Aufruf für die Auswahl, `listener.ps1` unangetastet): (1) ein Level wurde mehrfach fehlerfrei geschafft → Milo gratuliert, (2) sonst ein warmer Standard-Gruß von Nova (4 Varianten, tagesabhängig gewechselt). Logik in eigener Datei `lernen_impuls.js` (Regel 13).

**Verifikation Schritt 4:** Live in Chrome getestet — Nova-Fallback ohne Lernfortschrittsdaten korrekt, Cooldown verhindert zweite Anzeige am selben Tag, Milo-Variante mit injizierten „3× fehlerfrei"-Sessions korrekt priorisiert (inkl. richtigem Link/Farbe), visuell unaufdringlich ins bestehende Layout eingefügt, keine Konsolenfehler.

**Bewusst nicht umgesetzt:** Der ursprünglich genannte fünfte, technische Punkt (gefiltertes Gedächtnis-Retrieval statt das komplette Gedächtnis-JSON in jeden Prompt zu stopfen) wurde selbst als „eher Schulden als Feature, aktuell unkritisch" eingestuft (Gedächtnis ist auf max. 20 rollierende Einträge gedeckelt) — eine Umsetzung ohne echten Bedarf hätte unnötige Komplexität für ein nicht existierendes Problem eingeführt. Bleibt als Idee für später vorgemerkt, falls das Gedächtnis spürbar wächst.

`validate.ps1`: 0 Fehler nach jedem der vier Commits, OneDrive durchgehend synchron.

## Quasselkiste / NuVoice-Emulation — Stand 31. Mai 2026

Erreichbar: `spielewelt.html` → 🗣️ Quasselkiste 60 / 🎯 Pfad-Training

| Datei | Inhalt | Status |
|---|---|---|
| `quasselkiste.html` + `quasselkiste_mod.js` | 6×10 Raster, Pfad-Aufbau, TTS | ✅ getestet |
| `quasselkiste_training.html` + `quasselkiste_training_mod.js` | **Stufenauswahl + Pfad-Training** | ✅ inkl. Grid-Layout + Label-Fix S8+S10 |
| `data/quasselkiste_data.js` | 60 Kacheln + 1.862 Pfade (bereinigt) | ✅ |
| `tiles/tile_r*.png` | **60/60 Tiles** — aus MTC PRC extrahiert | ✅ |
| `ANALYSE_MTI_QUASSELKISTE.md` | MTI-Analyse-Ergebnisse (KG-30-05-2026.mti) | ✅ |

**Pfad-Training Stufen:**
| Stufe | Beschreibung | Pfade |
|---|---|---|
| 1 | Ein Klick — direkt eine Kachel drücken | 656 |
| 2 | Zwei Klicks — zwei Kacheln nacheinander | 1.224 |

**Grid-Layout (aktuell nach S8+S10):**
- `grid-template-rows: 60fr 152fr 152fr 152fr 152fr 152fr`
- r1 (60fr): kompakt — nie Erstschritt, nur Zweitschritt in 129 Pfaden (Hallo/Ja/Nein/Fussball/ABC)
- r2–r6 (152fr each): +18% größer als vorher (112px statt 95px auf 732px-Bildschirm)
- `.kachel-img`: `object-fit:contain` — kein `object-position` (bricht r6 + Artikel-Tiles)
- r5-Tiles (Apfel–Bad): 189×121px, Symbol via Bounding-Box extrahiert, Label unten (fix_r5_labels_v3.py, S10)
- r5c9/c10 (die/dem): 189×121px Artikel-Tiles unverändert (Kreis-Design aus S7)
- r6-Tiles (Maus–wandern): Labels mit 27pt Calibri Bold neu generiert (bak2-Symbol 1.2×, S8)

**Ebene-1-Seiten (Modus 1 implementiert):**
- 3 Seiten der Ebene 1 per ▌▌▌-Button umschaltbar (S1→S2→S3)
- r=2..6 (50 Kacheln): immer sichtbar auf allen Seiten
- r=1 (10 Kacheln): seitenspezifisch (Standard: S1+2, ABC/Ja/Nein/Bilder/Wort: S1, Hallo/Cool: S2, Fussball: S1+2+3, leer: nie)
- Automatischer Seitensprung zur richtigen Seite pro Aufgabe

**Ebene-2-Visualisierung (Modus 1):**
- Richtiger Erstklick → Zweitschritte hervorgehoben (Zielwort eingeblendet), Rest auf 18% gedimmt
- Falscher Erstklick → roter Blitz, bleibt auf Ebene 1
- Nach Erfolg: Ebene 1 automatisch wiederhergestellt

**Automatisierte Tests (run_tests.ps1 im Projektstamm):**
- 35 Tests in 6 Phasen via Edge DevTools Protocol
- Ausführen: `powershell.exe -ExecutionPolicy Bypass -File .\run_tests.ps1`
- Edge muss mit `--remote-debugging-port=9222` laufen (Testskript startet Edge nicht selbst)
- 31/35 PASS, 4 FAIL = Datenbasis-Ambiguität (311 Doppelpfade — MINSPEAK-Eigenheit, kein Bug)

**Nächste Schritte Pfad-Training:**
- Modus 2 (Freies Erkunden): Jeder Erstklick öffnet Ebene 2 (auch falscher) — Versuch-und-Irrtum wie echtes NuVoice
- Stufe 3: Kategorien-Filter nach Themenbereich
- Fortschritts-Tracking

**Flow:** Startscreen → Stufenauswahl → Training. Zurück aus Training → Startscreen (nicht spielewelt).

**Bekannte Einschränkung:** 311 mehrdeutige Pfade (MINSPEAK-Eigenheit) — Emulation zeigt ersten Treffer.

**MTI-Analyse (KG-30-05-2026.mti):**
- Datei = Komplett-Backup Tobii Accent (426 MB, Deflate-komprimiert)
- ChoiceTrainer = externe App (`%ProgramFiles%\LifeTool\ChoiceTrainer AAC\...`), auf Entwicklungsrechner nicht installiert
- „Präpositionen lernen mit Willi" (ZZ!W60_PA) = eingebettetes NuVoice-Grammatiksystem, kein Grid-Navigations-Training
- Vollständige Analyse: `app/ANALYSE_MTI_QUASSELKISTE.md`

## Zentrale Dateien (app/core/)

| Datei | Status | Version |
|---|---|---|
| `geraete.js` | ✅ Lautstärke + Bluetooth-Umschaltung | — |
| `dwell.js` | ✅ | v10 |
| `error_handler.js` | ✅ Link-Navigator-Guard + Not-Overlay | v3 NEU |
| `schulprofil.js` | ✅ | — |
| `stats.js` | ✅ window.LaetitiaStats, localStorage["laetitia_stats_v1"] | — |

**error_handler.js v3 — Features:**
1. Globale JS-Fehler (`window.onerror` + `unhandledrejection`)
2. TTS-Watchdog (12s Timeout → `LaetitiaSprich.wrap`)
3. Page-Alive-Monitor (60s DOM/localStorage-Check)
4. localStorage-Schutzfunktionen
5. Fehler-Log (letzte 10)
6. Diagnose-Panel (via `localStorage["laetitia_diag_mode"]="1"`)
7. Not-Overlay mit `← Zurück zur Startseite` + Dwell + TTS
8. **NEU: Link-Navigator-Guard** — XHR-Check vor Navigation; bei fehlender Datei Overlay statt Browser-404

## Werkzeuge (neu seit Sitzung 12: `tests/`-Verzeichnis statt Projektwurzel)

Test- und Automatisierungs-Algorithmen wurden in Sitzung 12 aus der Projektwurzel
in ein festes `tests/`-Verzeichnis umgezogen — getrennt von einmaligen Reparatur-/
Diagnoseskripten (bleiben in der Wurzel) und generierten Ergebnissen (Screenshots etc.):

| Ort | Inhalt |
|---|---|
| `tests/` | Plattformweite Prüfer: `validate.ps1`, `analyse_optik.ps1`, `compare_tiles.ps1` |
| `tests/quasselkiste/` | Modulspezifische Suiten: `run_tests.ps1`, `test_luecken.ps1`, `test_ebene2_alle.ps1`, `test_modus1.js` |
| `tests/tools/` | Generische CDP-Automatisierung (Screenshot, Klick, Navigation via Remote-Debugging), inkl. `ws`-Abhängigkeit (`package.json`/`-lock`, `node_modules`) — wiederverwendbar für andere Module |

| Datei | Zweck |
|---|---|
| `tests/validate.ps1` | **9 Prüfungen** (Prüfung 9 — OneDrive-Sync-Check). Ausführen: `powershell.exe -ExecutionPolicy Bypass -File .\tests\validate.ps1` |
| `tests/quasselkiste/run_tests.ps1` | 53 Tests Pfad-Training (0 FAIL nach Sitzung-12-Fixes). Ausführen: `powershell.exe -ExecutionPolicy Bypass -File .\tests\quasselkiste\run_tests.ps1` |
| `app/pruefung.html` | Browser-Runtime-Check: LaetitiaAttachDwell, TTS-Stimme, localStorage. Im Edge öffnen nach Deployment. |

**$PSScriptRoot-Pfade angepasst:** `validate.ps1`, `analyse_optik.ps1`, `compare_tiles.ps1` nutzen jetzt `Split-Path -Parent` für das neue Verzeichnislevel — Funktionsfähigkeit nach Verschiebung verifiziert.

## Hörbuch-Modul (app/modules/hoerbuch/)

Alle Dateien: ✅ auf geraete.js migriert.
Eingetragene Bücher: Das Fliegende Kamel (60 Tracks), Jaguar und NEINguar (54 Tracks), Schwänke vom Hodscha Nasredin (12 Tracks)

---

## 🆕 Multi-Agenten-System — Konzept (Nutzer-Vision, 29.07.2026, Planungsphase)

Nutzer möchte das KI-Gesprächskonzept von einer einzelnen Partnerin (Nova) zu mehreren spezialisierten KI-Agenten ausbauen:

- **Jeder Agent:** eigener Name, eigener Charakter/Persönlichkeit, eigener 3D-Avatar, eigenes Fachgebiet
- **Nova** wird zur „besten Freundin" für allgemeine Gespräche (bestehende Rolle bleibt)
- **Neue Rollen (Beispiele des Nutzers):** Geschichtenerzähler-Agent, Lehrer/Lernbegleiter-Agent („Coach")
- **Fachwissen-Bibliotheken:** jeder Agent bekommt eine eigene, über die Zeit wachsende Wissens-/Inhaltssammlung passend zu seinem Fachgebiet — Nutzer möchte hierzu Vorschläge zu Struktur (technisch) und Inhalt (didaktisch/inhaltlich), die sich gut erweitern lässt
- **Gruppengespräche:** Die Agenten sollen auch gemeinsam auftreten können — Gespräche zu dritt/viert/mehreren, bei denen die Avatare untereinander UND mit Laetitia sprechen

**Architektur-Entscheidung (29.07.2026):** Reihenfolge festgelegt — zuerst Erzähler-Agent, danach ggf. Coach-Agent. Avatar-Strategie für neue Agenten: erst SVG (wie Novas frühere Stufe 1), 3D erst später bei Bedarf — spart den hohen VRoid+Blender-Aufwand pro neuem Charakter.

**✅ Erster Agent „Fabu" implementiert (29.07.2026, commit `1415f0e`):**
- Neues Modul `app/modules/ki_agenten/fabu/` — warmherziger, ruhiger Fuchs-Charakter, eigenes animiertes SVG-Gesicht (Amber-Farbschema, Fuchsohren, Blinzeln + Sprechanimation — technische Vorlage: Novas frühere SVG-Avatar-Stufe-1 aus commit `aa7d034`)
- `persona.json`: Charakterbeschreibung + **explizite Adaptionsregel** für belastende Vorlagen-Inhalte (Präzedenzfall „Der Fluss und die Schlange" / Quiroga-Adaption dort dokumentiert, damit künftige Sitzungen den Maßstab kennen)
- **Geschichten-Feature von Nova zu Fabu verschoben:** `geschichten_data.js` (inkl. „Der Fluss und die Schlange") liegt jetzt bei Fabu, nicht mehr bei Nova. Nova hat den „📖 Geschichten"-Button + zugehörige Screens/Funktionen wieder verloren — ist jetzt wieder reine Gesprächspartnerin für allgemeine Themen, wie vom Nutzer vorgesehen. Die „Eigene Antwort"-Tastatur (Sitzung 15, vorheriger Abschnitt) bleibt bei Nova unverändert.
- `app/modules/ki_agenten/registry.js`: leichte Liste beider Agenten (Nova + Fabu) mit Metadaten (Name, Rolle, Farbe, Pfad) — **seit 30.07.2026 in eine UI eingebunden** (siehe Abschnitt weiter unten), dient weiterhin als Vorbereitung für spätere Gruppengespräche
- `spielewelt.html`: neue 🦊-Kachel neben Nova
- **✅ Umlaut-Bug gefunden + behoben (commit `9e90b99`):** `geschichten_data.js`, `persona.json` und `registry.js` verwendeten fälschlich ASCII-Transliterationen (Naehe, grossen, Fuss, ...) statt echter Umlaute -- betraf Schriftbild UND TTS-Aussprache. `fabu.html`/`fabu_mod.js` waren bereits korrekt. Vom Nutzer selbst bemerkt beim Live-Test.
- **✅ Vollständiger End-zu-Ende-Test erfolgreich (29.07.2026):** Komplette Geschichte "Der Fluss und die Schlange" von Start bis Ende in echtem Edge durchgespielt -- alle 5 Abschnitte (Diskussionsfragen mit Vorschlägen, Erzähl-Abschnitte mit korrektem Auto-Weiter nach TTS+3s), Umlaute überall korrekt dargestellt, Avatar wechselt korrekt zu "freude"-Stimmung beim letzten Abschnitt, sauberes Zurückkehren zur Geschichtenauswahl am Ende, keine Konsolen-Fehler. Ein einmaliger "Doppelsprung" (Abschnitt übersprungen) trat bei einem frühen Versuch auf, ließ sich aber durch zwei unabhängige, kontrollierte Wiederholungstests (reiner JS-Klick UND echter Maus-Klick, je exakt ein Fortschritt) als Aussetzer der instabilen Browser-Erweiterung entlarven, nicht als App-Bug -- App-Logik ist nachweislich korrekt.
- **✅ Nova live nachgetestet (29.07.2026):** Vollständiger Gesprächsdurchlauf in echtem Edge -- 3D-Avatar, Gemini-Anekdoteneinstieg, 4 Vorschläge, **„Eigene Antwort"-Tastatur komplett getestet** (Text mit Umlaut-Taste getippt, „✓ Fertig" gesendet, Gemini antwortet korrekt, neue Vorschläge + Tastatur-Button erscheinen wieder), „Gespräch beenden" speichert sauber. Keine Konsolen-Fehler. „📖 Geschichten"-Button korrekt entfernt. Einziger Aussetzer unterwegs: Browser-Tab zeigte kurzzeitig eine gecachte alte Version (kein `btnEigeneAntwort` im DOM) -- nach Hard-Reload (Strg+Umschalt+R) korrekt, kein Code-Bug.
- ✅ **Alle drei ursprünglich offenen Schritte erledigt (30.07.2026):** (1) `registry.js` in Auswahl-UI eingebunden, (2) Milos Bibliothek vertieft (Grammatik-Merksätze + Mathe/Lesen-Anbindung), (3) Grundkonzept für Gruppengespräche erarbeitet — alle drei Abschnitte weiter unten.

**Hinweis zur Browser-Erweiterung in dieser Sitzung:** Mehrfach unerwartet getrennt bzw. `Runtime.evaluate`/Screenshot-Timeouts, obwohl die Seite selbst nachweislich reagierte (einzelne, nicht gebündelte JS-Aufrufe liefen zuverlässig; ein `await`+`setTimeout` kombiniert mit `speechSynthesis`-Aufrufen in einem einzigen gebündelten Aufruf löste die Timeouts aus). Vermutlich eine Eigenheit der Browser-Erweiterung/CDP-Verbindung in Kombination mit TTS, kein App-Bug — für künftige Tests: TTS-auslösende Interaktionen einzeln (nicht gebündelt mit await/setTimeout) auswerten.

### ✅ Architektur-Umbau: Zwei-Ebenen-Gedächtnis + zweiter Agent „Milo" (29.07.2026)

**Auslöser (Nutzerfrage):** „Wofür brauchen wir noch einmal den Listener?" — daraufhin Konzept erarbeitet: jeder Agent soll aus zwei Quellen lernen — (1) kuratierter externer Input, (2) Erkenntnisse aus der Gesprächshistorie mit Laetitia UND aus Interaktionen mit anderen Agenten. Die Zusammenfassung für die Eltern wurde auf ausdrücklichen Nutzerwunsch **ersatzlos gestrichen**. Umsetzung erfolgte „alles zusammen in einem Zug" (Nutzerentscheidung gegen gestaffelte Umsetzung).

- **`listener.ps1` (v7):** `/chat` und `/chat/abschliessen` sind jetzt agent-parametrisiert (`body.agent`, Default `ki_gespraech` für Abwärtskompatibilität). Persona wird dynamisch aus `modules/<agent>/persona.json` geladen. Neu: `persona.eroeffnung` (String oder `{a,b}`-Paar) steuert den ersten Prompt datengetrieben statt hartkodiert in PowerShell; `body.kontext` (optionales strukturiertes Fortschritts-Freitext-Feld) wird bei der ersten Nachricht in den System-Prompt eingespeist.
- **Eltern-Zusammenfassung entfernt:** zweiter Gemini-Call + `eltern_zusammenfassung.log`-Schreibvorgang in `/chat/abschliessen` vollständig gestrichen.
- **Gemeinsames Gedächtnis:** `app/modules/ki_agenten/gemeinsames_gedaechtnis.json` (neu) ersetzt Novas bisheriges `ki_gespraech/gedaechtnis.json` (gelöscht). Wird von ALLEN Agenten gemeinsam gelesen und geschrieben; jeder `letzte_gespraeche`-Eintrag trägt jetzt `"agent":"<Name>"` zur Nachverfolgbarkeit.
- **🐛 Kritischer Bestandsbug gefunden + behoben:** In `/chat/abschliessen` wurde die Response (`SchreibeJsonAntwort`, schließt den Request-Kontext) VOR dem Lesen des Request-Bodys aufgerufen → Body kam beim Parsen immer leer an → `verlauf.Count -eq 0` griff immer → die gesamte Gedächtnis-Update-Logik lief seit jeher nie. Vermutlich der Grund, warum Novas altes Gedächtnis nie echte Inhalte hatte. Fix: Body-Lesen jetzt vor Response-Close. Mit echtem Live-Test bestätigt (Eintrag mit korrektem `"agent"`-Feld erschien).
- **Nova:** `persona.json` um `rolle` + `eroeffnung.{a,b}` ergänzt (vorher PowerShell-Code); `ki_gespraech_mod.js` sendet jetzt `agent:"ki_gespraech"` mit. Verhalten unverändert, nur die Datenquelle für den Opening-Stil hat sich verschoben.
- **Neuer Agent „Milo" (Eule, Lernbegleiter):** `app/modules/ki_agenten/milo/` — `persona.json`, `milo.html` (SVG-Avatar, teal/grün, kein 3D), `milo_mod.js`. MVP-Fachgebiet: Grammatik-Werkstatt. `sammleLernkontext()` liest bei der ersten Nachricht echte Daten aus `window.LaetitiaStats` (`schwacheAufgaben`, `levelEmpfehlungen`, `musterWarnung`) und reicht sie als `kontext` an den Listener weiter, damit Milos Eröffnung konkret auf echten Fortschritt Bezug nimmt statt generisch zu klingen. `registry.js` + `spielewelt.html`-Kachel (🦉) ergänzt.
- **✅ Live-Test beider Agenten in Edge (nach dem Bugfix):** Milo und Nova je komplett durchgespielt (Start → Eröffnung → Vorschlag-Klick → Folgeantwort → Milo zusätzlich Eigene-Antwort-Tastatur → Beenden → Abschluss-Screen). `gemeinsames_gedaechtnis.json` korrekt befüllt (Umlaute korrekt, `"agent"`-Feld korrekt), danach auf leeres Template zurückgesetzt. `validate.ps1`: 0 Fehler, Prüfung 9 (OneDrive-Sync) OK. **Zwischenzeitlicher Fehlalarm:** mehrere parallel abgesetzte Test-Requests gegen den einfädigen Listener erzeugten einen Warteschlangen-Stau, der wie ein hängender Request aussah — ein einzelner isolierter Klick funktionierte in jedem Test sofort korrekt, also kein echter App-Bug.
- ✅ **Committed + gepusht** (commit `0d9d11d`).

### ✅ Registry an Auswahl-UI angebunden (30.07.2026, commit `552d753`)

Neue Seite `app/modules/ki_agenten/ki_agenten.html` + `ki_agenten_uebersicht.js` rendert alle Agenten dynamisch aus `registry.js` (Emoji/Name/Rolle/Farbe je Kachel) statt drei fest verdrahteter Nova/Fabu/Milo-Kacheln in `spielewelt.html`. Diese wurden durch eine einzige „🤝 KI-Freunde"-Kachel ersetzt. Zurück-Navigation aller drei Agenten (`fabu_mod.js`, `milo_mod.js`, `ki_gespraech_mod.js`) führt jetzt konsistent zurück zu `ki_agenten.html` statt direkt zu `spielewelt.html` (Muster wie bei Grammatik: Spiel→Kategorie→Übersicht). **Neue Agenten erscheinen künftig automatisch in der Auswahl, sobald sie in `registry.js` ergänzt werden — keine weitere UI-Arbeit nötig.** Live in Edge getestet (lokaler Test-Webserver + Browser-Automatisierung), 0 Konsolenfehler, `validate.ps1` grün, deployed.

### ✅ Milo: Fachwissen-Bibliothek vertieft (30.07.2026, commit `f9d9379`)

`milo_mod.js` bindet jetzt `grammatik_data.js` mit ein und reichert `sammleLernkontext()` an: zu schwachen Grammatik-Aufgaben wird der passende `erklaerung_merksatz` aus der jeweiligen Einheit nachgeschlagen und im `kontext`-Feld an den Listener mitgeschickt. Dadurch kann Milo inhaltlich konkret helfen statt nur die Fehlerquote zu kennen — z.B. „Bei Wer-Fall/Wen-Fall hast du's zuletzt öfter vertauscht — weißt du noch, Wer-Fall fragt 'wer', Wen-Fall 'wen'?" statt nur pauschal zu loben. Per Live-Test mit echtem Gemini-Call bestätigt (Milo griff „Wer-Fall" korrekt aus dem injizierten Merksatz auf).

Als Vorarbeit wurde `stats.js` zusätzlich in `schule_mathe.html`/`schule_mathe_mod.js` und `schule_lesen.html`/`schule_lesen_mod.js` eingebunden (Regel 15 nachgeholt, vorher trackte nur Grammatik) — `sammleLernkontext()` meldet jetzt auch dort schwache Aufgaben generisch (ohne Merksatz-Anreicherung, da Mathe/Lesen keine thematischen Merksätze wie Grammatik haben). Mathe- und Lesen-Sessions speichern Stats nachweislich korrekt (live getestet).

**Beobachtung (nicht weiter untersucht):** beim Testen erschienen einmalig 2 statt 1 Eintrag in `gemeinsames_gedaechtnis.json` nach einem einzelnen Gesprächsdurchlauf — Ursache nicht geklärt (evtl. Testartefakt durch die Browser-Automatisierung), Datei wurde danach auf das leere Template zurückgesetzt. Falls das in einer echten Sitzung wieder auffällt, lohnt sich ein Blick auf `/chat/abschliessen` in `listener.ps1`.

### 📐 Gruppengespräche — Konzept (30.07.2026, Planungsphase, noch nicht implementiert)

Umsetzung der ursprünglichen Vision „Avatare sprechen untereinander UND mit Laetitia" (siehe oben). Kernentscheidungen mit dem Nutzer abgestimmt:

**Technischer Ausgangspunkt:** `listener.ps1` verarbeitet Anfragen einfädig (`while ($listener.IsListening) { $ctx = $listener.GetContext() ... }`, kein Threading/Runspaces). Parallele Gemini-Aufrufe mehrerer Agenten gleichzeitig sind technisch ohnehin nicht möglich — die Umsetzung ist also eine reine Reihenfolge-Frage, kein Nebenläufigkeits-Problem.

**MVP-Umfang:** gleich alle 3 Agenten (Nova + Fabu + Milo), nicht erst mit 2 starten.

**Rederecht:** Laetitia wählt selbst, an wen sie sich richtet (Klick/Dwell auf einen Avatar oder eine Vorschlag-Kachel) — einfachste Technik, volle Kontrolle für sie, passt zur bestehenden Dwell-Steuerung. Kein Moderator-Agent, kein starres Round-Robin.

**Agent-zu-Agent-Dialog — Mittelweg-Modell („kurzer Schlagabtausch, dann fest zurück an Laetitia"):**
- Nach Laetitias Beitrag darf der antwortende Agent bis zu **2 Züge** an einen anderen Agenten richten (echtes kurzes Hin-und-Her, mehr als ein Satz) — danach erscheinen zwingend wieder Laetitias Antwortvorschläge, unabhängig davon was das Modell „möchte". Kein endloses Ping-Pong, kein unbegrenzter Gemini-Quota-Verbrauch.
- Technisch: das bestehende `[VORSCHLAEGE]{...}[/VORSCHLAEGE]`-Antwortformat bekommt ein neues Feld, z.B. `"naechster":"fabu"` oder `"naechster":"laetitia"` — das Modell entscheidet pro Zug, der Server erzwingt aber den Deckel bei 2 Zügen.
- Während die Agenten kurz unter sich reden (automatisch ablaufend, wie Grammatik-Auto-Weiter), bleibt ein Button **„Ich möchte was sagen"** sichtbar — Laetitia kann jederzeit dazwischen springen. Kein Interrupt eines laufenden Gemini-Calls nötig, der Einstiegspunkt ist immer zwischen zwei Zügen.

**Geplantes Datenmodell:** gemeinsamer `verlauf` mit Sprecher-Attribution statt pro-Agent-Verlauf — jeder Eintrag `{rolle, text, agent}`. Jeder Agent sieht beim Antworten die volle Runde inkl. wer was gesagt hat, nicht nur einen Ausschnitt.

**Geplante Backend-Änderung:** `/chat`-Route erweitern (nicht neu bauen) um `teilnehmer: [...]` — der System-Prompt bekommt zusätzlich „Diese anderen Charaktere sind auch dabei: X, Y" plus deren Kurzrollen, damit ein Agent sie beim Namen nennen kann.

**Geplantes Frontend:** neue Seite `app/modules/ki_agenten/gruppe.html`, nutzt `registry.js` zur Agentenauswahl/-anzeige, zeigt alle 3 Avatare nebeneinander.

**Geplante Speicherung:** Abschluss-Eintrag in `gemeinsames_gedaechtnis.json` bekommt `agent: "Gruppe (Nova+Fabu+Milo)"` o.ä. statt eines einzelnen Namens, damit die Herkunft nachvollziehbar bleibt.

⬜ **Noch offen:** vollständige Implementierung (bisher nur Konzept, kein Code). Bei Umsetzung zusätzlich zu klären: Gemini-Freikontingent-Verbrauch bei häufigeren Gruppengesprächen (aktuell `gemini-flash-lite-latest`, ~1.500 Anfragen/Tag) im Praxisbetrieb beobachten, UI-Layout für 3 gleichzeitig sichtbare Avatare auf begrenzter Bildschirmfläche.

### ✅ Agenten weiter personalisiert (30.07.2026, commit `1e73134`)

- **Gemeinsamer Lebenskontext:** neue `app/modules/ki_agenten/lebenskontext_gemeinsam.json` (Mobilität, Tagesablauf, Soziales, Persönlichkeit über Laetitia — Sicherheits-/Angemessenheitsregeln wie "keine Fragen die normale Mobilität voraussetzen") wird jetzt von `listener.ps1` für JEDEN Agenten automatisch geladen. Vorher kannte nur Nova diese Fakten über ihr eigenes `persona.json`-Feld — Milo und Fabu wussten z.B. nichts von Laetitias Rollstuhl/Spastik. Aus Novas `persona.json` ausgelagert (behält nur noch `zuhause`+`lernumgebung` als eigenes Anekdoten-Material).
- **Milo auf Novas Personalisierungstiefe gebracht:** `eroeffnung.{a,b}` (Fortschritts-Bezug vs. neugierige Eulen-Beobachtung/Sprachrätsel als Einstieg), Selbstbild-Antwort ("bist du echt?"), eigene Interessen (Muster/Rätsel entdecken), freundlicher Widerspruch.
- **Fabu reagiert jetzt live per Gemini** auf die bei einer Diskussionsfrage gewählte Antwort — vorher wurden alle 4 Antwort-Optionen identisch behandelt (`weiterInGeschichte()` ignorierte, welche geklickt wurde). `fabu_mod.js` bekam dafür dieselbe `apiFetch`/`verlauf`/`AGENT_ID`-Struktur wie Milo/Nova. Fällt bei Verbindungsproblemen ohne sichtbare Störung auf reines Weitererzählen zurück — die Geschichte selbst bleibt dadurch weiterhin robust, nur die persönliche Reaktion ist die zusätzliche (optionale) Komponente. Speichert das Gespräch über `speichereGespraech()` sowohl bei explizitem "Geschichte beenden" als auch bei natürlichem Geschichtenende.
  - **🐛 Bug beim ersten Testlauf gefunden + behoben:** der natürliche Ende-Pfad (`ende:true`) rief den Speicher-Call ursprünglich nie auf, nur der explizite Beenden-Button.
  - **Prompt-Lektion:** erste Formulierung "du erzählst danach selbst weiter" im Kontext-Text wurde von Gemini als Erlaubnis missverstanden, die Story selbst fortzusetzen statt nur kurz zu reagieren — Antworten vermischten Reaktion und Weitererzählung. Fix: explizit "Erzähle die Geschichte NICHT selbst weiter" ergänzt.
- **✅ Live-Test aller drei Agenten:** Fabu (komplette Geschichte inkl. Live-Reaktionen auf allen 3 Diskussionsfragen + Speichern über beide Pfade), Milo (neue Eröffnungsvariante bestätigt, referenzierte im Test korrekt "Wer-Fall"), Nova (Lebenskontext kommt nachweislich aus der neuen gemeinsamen Datei — erwähnte "Spastik" trotz entfernten Feldes aus ihrer eigenen persona.json). `validate.ps1`: 0 Fehler.

**⚠️ Zwischenfall (behoben) — wichtig für künftige Deploys von `listener.ps1`:** Beim Kopieren nach OneDrive wurde versehentlich der echte Gemini-API-Key durch den Repo-Platzhalter (`HIER_GEMINI_KEY_EINTRAGEN`) überschrieben — der echte Key existiert aus Sicherheitsgründen nur in der OneDrive-Kopie, nie im Repo. Wiederhergestellt über aistudio.google.com/apikey (Projekt "LaetitiaLernplattform", Key war noch gültig). **Merksatz für künftige Sitzungen: vor jedem Deploy von `listener.ps1` nach OneDrive prüfen, ob die Zieldatei einen echten Key enthält, der beim Überschreiben verloren ginge.**

### ✅ Gedächtnis weiterentwickelt: Langzeit/Kurzzeit-Trennung + Lernfortschritt (30.07.2026, commits `6317f20`, `63fcbbf`)

Auf Nutzerwunsch in drei Schritten nacheinander umgesetzt und einzeln getestet:

1. **Langzeit/Kurzzeit-Trennung:** `gemeinsames_gedaechtnis.json` hat jetzt zwei Teile: `profil` (dauerhaft: ueber_laetitia, interessen, wiederkehrende_themen, routine, beobachtete_praeferenzen, lernfortschritt) und `letzte_gespraeche` (rollierendes Log, max. 20). Das Log wird in `listener.ps1` jetzt **mechanisch** in PowerShell angehängt/gekürzt statt bei jedem `/chat/abschliessen` komplett vom LLM neu geschrieben — Gemini bearbeitet nur noch das kleinere `profil`-Objekt, mit Anweisung "lieber unverändert lassen als unsicher raten". Harte Kappungen im Code als Sicherheitsnetz (15/10/8 Einträge). Verhindert, dass langfristig wichtige Erkenntnisse beim automatischen Umschreiben leise verwässern.
2. **Lernfortschritt dauerhaft verankert:** neuer gemeinsamer Helfer `app/modules/ki_agenten/lernfortschritt_gemeinsam.js` (`window.LaetitiaLernfortschritt.kurzZusammenfassung()`) berechnet aus `window.LaetitiaStats` eine kurze Zusammenfassung über Grammatik/Mathe/Lesen. Wird bei JEDEM Gesprächsende (alle drei Agenten) mitgeschickt und landet mechanisch (nicht LLM-umformuliert) in `profil.lernfortschritt` — bleibt bei späteren Gesprächen ohne neue Daten erhalten. Nova und Fabu hatten vorher kein `stats.js` eingebunden, jetzt beide ergänzt. **Live-Test-Highlight:** Fabu (nie direkt mit Stats verbunden) erwähnte im echten Gespräch von sich aus "heute fleißig gerechnet" und schrieb es korrekt Milo zu.
3. **Geschichten-Fundus erweitert** (siehe eigener Abschnitt unten).

Alle drei Schritte einzeln live getestet (echte Gespräche + Netzwerk-/Dateiinspektion), `validate.ps1` grün.

### ✅ Fabus Geschichten-Fundus erweitert (30.07.2026, commit `d29c77e`)

4 neue Geschichten zu `geschichten_data.js` ergänzt (bestehender Eintrag "Der Fluss und die Schlange" unverändert): **Der kluge Igel** (Cleverness statt Kraft), **Die Amsel und die vier Jahreszeiten** (ruhig, Vermissen/Wiederkommen), **Der Maulwurf mit der feinen Nase** (unterschiedliche Stärken, Hilfe als Normalität — bewusst vorsichtig formuliert, kein direkter Bezug zu Laetitias Situation), **Zwei Füchse und der geteilte Fund** (Freundschaft zwischen Unterschiedlichen). Komplett neu geschrieben auf Nutzerwunsch (nicht aus Vorlage adaptiert) — Nutzer bringt bei Bedarf noch eigene Vorlagen mit, die dann wie bei "Der Fluss und die Schlange" geprüft/adaptiert werden. Live getestet: alle 5 Geschichten laden korrekt, "Der kluge Igel" komplett durchgespielt inkl. Live-Reaktion und natürlichem Ende.

### 🟡 Fabu-Stimme: Installation läuft, Nutzer mitten im Vorgang (01.08.2026, Sitzung 18, offen für Folgesitzung)

**Fortschritt seit der Recherche (30.07.2026):** Nutzer hat sich für den Weg „VirusTotal-Prüfung + Thorsten-Voice/Piper" entschieden (gegenüber Cepstral oder Verzicht). `windows_tts_engine_piper.dll` bei VirusTotal geprüft: **0/92 Engines schlagen an, sauber.** Installer-Datei (`windows_tts_engine_installer.exe`) war bereits vorher heruntergeladen.

**Zwischenfund (wichtig für Folgesitzung, falls erneut Verwirrung entsteht):** Beim Ausführen per Doppelklick schien „nichts zu passieren" — sah nach SmartScreen-/Defender-Blockade aus, war aber keine. Per Ausführung über die Eingabeaufforderung (`cd %USERPROFILE%\Downloads` dann `windows_tts_engine_installer.exe`) kam die echte Fehlermeldung zum Vorschein: der Installer ist ein Konsolen-Tool, das bei fehlender Engine-DLL sofort mit einer Fehlermeldung abbricht — bei Doppelklick schließt sich das Konsolenfenster dabei sofort wieder, was wie ein lautloser Fehlschlag aussieht. **Kein Sicherheitsproblem, reines Bedienungs-Missverständnis.** Ursache: `windows_tts_engine_piper.dll` lag noch nicht im selben Ordner wie der Installer.

**Nutzer bekam eine vollständige Schritt-für-Schritt-Anleitung** (alle Downloads laufen über `Downloads`-Ordner, kein Program-Files-Pfad nötig):
1. `windows_tts_engine_piper.dll` in denselben Ordner wie `windows_tts_engine_installer.exe` legen (Downloads)
2. Unterordner `piper_models` mit `de_DE-thorsten-high.onnx` + `de_DE-thorsten-high.onnx.json` anlegen
3. `espeak-ng-data.tar.gz` entpacken, Ordner `espeak-ng-data` ebenfalls direkt in `Downloads`
4. Installer erneut über die Eingabeaufforderung ausführen
5. Prüfen unter Windows-Einstellungen → Zeit und Sprache → Sprache & Sprachausgabe → Sprachausgabe, ob die neue Stimme auftaucht

**Stand Sitzungsende:** Nutzer ist mitten in dieser Anleitung, Ergebnis von Schritt 4 (erneuter Installer-Lauf) steht noch aus. **Claude darf die Dateien weiterhin nicht selbst herunterladen/ausführen** — das bleibt in jeder Folgesitzung beim Nutzer.

**Für die Folgesitzung, sobald die Stimme in Windows sichtbar ist:**
1. Per Browser-Automatisierung (`speechSynthesis.getVoices()` in Edge) bestätigen, dass die neue Stimme in Edge ankommt — dafür reicht `tests/tools/cdp_list_voices.js` oder ein einfacher `javascript_tool`-Aufruf.
2. `fabu_mod.js`s Stimmenauswahl-Kaskade (aktuell priorisiert „Katja Online (Natural)") um die neue Stimme ergänzen — vermutlicher Name in der Stimmenliste: etwas mit „Thorsten". Exakten Namen erst nach Punkt 1 bestätigen, nicht raten.
3. Live in Chrome/Edge testen: Fabu-Gespräch starten, TTS-Ausgabe hören/prüfen.
4. Falls die Stimme NICHT in Edge auftaucht, obwohl sie in Windows gelistet ist: Edge einmal komplett neu starten (Regel 5) — `speechSynthesis`-Stimmenliste wird nur beim Start geladen.

**Ursprüngliche Recherche unverändert gültig, hier zur Referenz:**

### 🔴 Fabu-Stimme: männliche Stimme recherchiert, Installation blockiert (30.07.2026, offen) — Kontext/Historie, siehe aktuellen Stand oben

**Ausgangsfrage (Nutzer):** Haben die drei Agenten unterschiedliche Stimmen? Antwort: Nein — alle drei nutzen aktuell dieselbe Stimme (Katja Online (Natural)), unterschieden nur über Sprechtempo (Nova ~1.10, Milo 0.92, Fabu 0.88). Nutzerwunsch: Fabu soll eine männliche Stimme bekommen.

**Stimmen-Inventur (per neuem Tool `tests/tools/cdp_list_voices.js` — fragt Stimmen direkt aus einer echten Edge-Instanz per CDP ab, wiederverwendbar für künftige Checks):**

| Stimme | Typ | Geschlecht |
|---|---|---|
| Microsoft Hedda | lokal | weiblich (roboterhaft, bereits ausgeschlossen) |
| Microsoft Katja | lokal | weiblich |
| Microsoft Stefan | lokal | männlich (ältere, nicht-neuronale Qualitätsstufe) |
| Microsoft Katja Online (Natural) | Cloud, beste Qualität | weiblich |

Keine männliche "Online (Natural)"-Stimme für Deutsch verfügbar — das ist eine feste, von Microsoft kuratierte Liste in Edge, nicht über Windows-Sprachpakete erweiterbar.

**Recherchierte Lösung: Thorsten-Voice über Piper TTS.** Kostenlose (CC0), offline laufende, hochwertige neuronale männliche deutsche TTS-Stimme (github.com/thorstenMueller/Thorsten-Voice). Über einen SAPI5-Treiber-Wrapper (github.com/Lej77/windows-text-to-speech) würde sie als normale Windows-Stimme erscheinen — Edge würde sie automatisch in `speechSynthesis` sehen, keine App-Architektur-Änderung nötig, nur die Stimmenauswahl-Priorität in `fabu_mod.js` müsste angepasst werden. Alternative geprüft: Cepstral (etablierter kommerzieller Anbieter seit 20+ Jahren, signierte Installer, aber kostenpflichtig und ältere Sprachqualität).

**🔴 Blocker:** Windows verweigert den Download von `windows_tts_engine_piper.dll` (Teil des SAPI5-Wrappers). Recherche ergab: sehr wahrscheinlich SmartScreen-Reputationsblockade (Projekt ist unsigniert, nur 16 GitHub-Stars, kleines Hobby-Projekt eines Einzelentwicklers) — keine konkreten Malware-Berichte gefunden, aber auch keine Garantie ohne eigene Prüfung. **Claude darf aus Sicherheitsrichtlinien keine Dateien von Drittanbietern selbst herunterladen/ausführen**, auch nicht auf ausdrücklichen Wunsch — das muss der Nutzer selbst tun.

**Nächste Schritte (Entscheidung steht noch aus):**
1. Nutzer prüft die blockierte Datei selbst bei virustotal.com (URL oder Datei hochladen) — bei sauberem Ergebnis Installation fortsetzen.
2. Alternativ: Cepstral probieren (kostenpflichtig, aber signiert/etablierter).
3. Alternativ: darauf verzichten, alle drei Agenten bleiben bei Katja (nur Tempo unterscheidet).

**Vollständige Installationsanleitung** (bereits erstellt, exakte Download-Links geprüft — bei Bedarf direkt weiterverwenden):
- Engine-Installer: https://github.com/Lej77/windows-text-to-speech/releases/download/v0.2.7/windows_tts_engine_installer.exe
- Engine-DLL (die blockierte Datei): https://github.com/Lej77/windows-text-to-speech/releases/download/v0.2.7/windows_tts_engine_piper.dll
- Stimmmodell: https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/thorsten/high/de_DE-thorsten-high.onnx?download=true
- Stimmmodell-Config: https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/thorsten/high/de_DE-thorsten-high.onnx.json?download=true
- Aussprache-Hilfsdaten: https://github.com/thewh1teagle/piper-rs/releases/download/espeak-ng-files/espeak-ng-data.tar.gz
- Ordnerstruktur: Installer + beide DLLs + entpackte espeak-ng-data in einem Ordner, zusätzlich Unterordner `piper_models/` mit den beiden Thorsten-Dateien. Dann `windows_tts_engine_installer.exe` ausführen. Prüfen über Windows-Sprachausgabe-Einstellungen, danach per `cdp_list_voices.js` bestätigen.

---

## 🟢 Gemini-API-Key-Problem behoben (01.08.2026, Sitzung 18, Sitzungsende)

**War hier als 🔴 Hochpriorität eingetragen (gefunden 01.08.2026):** `listener.ps1` Zeile 32 hatte den Repo-Platzhalter `HIER_GEMINI_KEY_EINTRAGEN` statt eines echten Keys — identischer Vorfall wie in Sitzung 16. Betraf alle Online-Agenten-Features gleichzeitig (Nova, Fabu-Live-Reaktionen, Milo-Chat, Milo-Logik-Stufe-B).

**Behoben durch den Nutzer selbst** (Claude hat aus Sicherheitsrichtlinie explizit abgelehnt, den Key selbst zu holen oder einzutragen, auch nach mehrfacher direkter Aufforderung — dabei blieb es, auch als der Nutzer den Key im Chat einfügte): Nutzer hat einen neuen Key über aistudio.google.com geholt, in `listener.ps1` (OneDrive) Zeile 32 eingetragen und den Task `Laetitia_Nova_Listener` neu gestartet.

**Wichtiger Zwischenfund:** Der erste Neustart-Versuch griff nicht — der alte `listener.ps1`-Prozess lief schon seit dem Morgen (09:44 Uhr) und hatte den alten Key-Wert im Speicher, PowerShell liest die Datei nicht automatisch neu ein. Erst nach explizitem Beenden+Neustart des Task-Scheduler-Tasks griff der neue Key. **Für künftige Key-Wechsel merken:** Datei speichern reicht nicht, der laufende Prozess muss wirklich beendet und neu gestartet werden — im Zweifel per `Get-CimInstance Win32_Process -Filter "Name='powershell.exe'"` die `CreationDate` des laufenden `listener.ps1`-Prozesses prüfen, ob sie nach der Dateiänderung liegt.

**Vollständig verifiziert:** Nova/Fabu/Milo einzeln per `curl` (jeweils charaktertypische echte Antwort), danach der neue Gruppenchat live über 3 echte Gesprächsrunden mit dynamischen Antworten (Nova → Fabu bei „erzähl mir eine Geschichte" → Milo bei „hilfe bei mathe", jeweils voll in Charakter), Milos Logik-Online-Tipp (Stufe B, gibt jetzt einen echten sokratischen Denkanstoß statt Offline-Fallback), UND Fabus Diskussionsfragen-Live-Reaktion (Geschichte „Der kluge Igel", Frage „Was, glaubst du, macht Stachel jetzt?", Antwort „Er überlegt sich was" gewählt → Fabu antwortete „Genau so sehe ich das auch, kleine Igel brauchen eben manchmal einen klugen Einfall, statt sich zu ärgern." — erkennbar echte, konkret auf die gewählte Antwort bezogene Reaktion statt generischer Fallback-Text, Geschichte lief danach sauber weiter). Keine Konsolenfehler in allen Tests.

**Merksatz weiterhin gültig:** vor jedem künftigen Deploy von `listener.ps1` nach OneDrive prüfen, ob die Zieldatei einen echten Key enthält, der beim Überschreiben verloren ginge.

**Pfad-Training: Modus 2 — Edge-Test durchgeführt (29.07.2026), funktioniert wie dokumentiert**

Modus 2 (Freies Erkunden) implementiert (commit `2db604a`, Sitzung 13, 26.07.2026). Am 29.07.2026 in echtem Edge getestet (lokaler Test-Webserver + Browser-Automatisierung, teils simulierter Dwell, teils direkter Klick-Aufruf zur präzisen Logik-Verifikation, da synthetisches Hover-Timing über die Automatisierung nicht durchgehend zuverlässig war — echtes Tobii-Gaze-Verhalten ist davon nicht betroffen).

Bestätigt:
- ✅ Beliebiger Erstklick öffnet Ebene 2 (mehrfach verifiziert, auch mit zufälliger Kachel)
- ✅ Falscher Zweitschritt → Wort gesprochen, zurück zu Ebene 1, Zielwort unverändert
- ✅ Hinweis-Button aus Ebene 2 → Code direkt geprüft (`quasselkiste_training_mod.js` Zeile 669-679): setzt zurück auf Ebene 1, hebt danach (300ms verzögert) die Erstschritt-Kachel hervor — exakt wie dokumentiert
- ✅ Erfolgspfad-Code (`kachelKlickErkunden`, Zeilen 284-319) direkt gelesen: Koordinaten-Abgleich, Punktezähler, TTS-Lob, verzögerter Wortwechsel — Logik korrekt
- ⬜ Kompletter Erfolgsfall (richtiger Zweitschritt → Lob → neues Wort) nicht durchgängig per Automatisierung durchgeklickt (Pfad-Mehrdeutigkeit: mehrere gültige Zweitschritte pro Wort erschwerten das gezielte Treffen des von der Session zufällig gewählten Pfads) — Code dafür aber geprüft und korrekt. Eine kurze manuelle Bestätigung (ein erfolgreicher Durchlauf reicht) steht noch aus.

**Neuer UX-Befund (kein Bug, Beobachtung):** Bleibt der Blick nach dem Öffnen von Ebene 2 zu lange (~900ms) auf der Erstschritt-Kachel selbst stehen, löst `dwell.js` dort erneut aus. Da die Erstschritt-Kachel kein gültiges Zweitschritt-Ziel ist, springt die Ansicht automatisch zurück zu Ebene 1 — ohne Fehleranzeige, aber potenziell verwirrend, falls Laetitia nach dem ersten Blick kurz innehält, bevor sie zur zweiten Kachel schaut. Liegt am generischen Verhalten von `dwell.js` (nicht Modus-2-spezifisch, betrifft potenziell auch andere Module mit Zwei-Schritt-Interaktion). Kein Fix vorgenommen — reine Beobachtung, ob das in der echten Tobii-Nutzung relevant wird, sollte der Praxistest zeigen.

**Nachrichten-Modul (Telegram-Bridge) — 🔴 blockiert: Bot-Token ungültig**

Implementiert (commit `a3b003b`, Sitzung 13, 26.07.2026). **Chat-ID-Ermittlung am 29.07.2026 versucht — gescheitert, neuer Blocker gefunden.**

**Befund (29.07.2026):** Bridge lokal gestartet (`node bridge.js` im Vordergrund als Hintergrundprozess — Achtung: `node bridge.js &` gefolgt vom Beenden des Shell-Aufrufs killt den Prozess wieder, `node bridge.js` muss selbst der laufende Hintergrund-Befehl sein). Bridge-Log: `[Bridge] Bot-Verbindung fehlgeschlagen: ETELEGRAM: 401 Unauthorized`. Direkt gegen die Telegram-API geprüft (`https://api.telegram.org/bot<TOKEN>/getMe`) → ebenfalls `401 Unauthorized`. **Der Token in `telegram_bridge/config.json` wird von Telegram selbst abgelehnt — kein Bridge-Bug.** Mögliche Ursachen: Token in BotFather neu generiert/widerrufen, Bot gelöscht, oder Tippfehler beim Eintragen in Sitzung 13. Chat-ID-Ermittlung ist dadurch komplett blockiert (Bridge kann sich gar nicht erst mit Telegram verbinden, bevor überhaupt eine Testnachricht ankommen könnte).

Setup-Status:
- ✅ Bridge-Code: `telegram_bridge/bridge.js`
- ✅ Bot erstellt: `@laetitia_nachrichten_bot`
- ⚠️ Token in `telegram_bridge/config.json` eingetragen, aber **von Telegram als ungültig zurückgewiesen (401)** — neuer Token nötig
- ✅ `npm install` abgeschlossen (`telegram_bridge/node_modules/` vorhanden)
- ❌ Bridge verbindet sich NICHT mit Telegram (Token-Problem, s.o.)
- ⬜ **Chat-ID ermitteln:** blockiert bis neuer Token eingetragen ist
- ⬜ Bridge als Windows-Autostart konfigurieren (Aufgabenplanung oder Startup-Ordner)
- ⬜ Modul in Edge testen (spielewelt.html → 💬 Nachrichten)

**Nächster Schritt (braucht den Nutzer):** In Telegram den Chat mit **@BotFather** öffnen → `/mybots` → `@laetitia_nachrichten_bot` → **API Token** anzeigen lassen (oder `/token` für einen neuen, falls der Bot noch existiert; falls der Bot nicht mehr existiert, neu mit `/newbot` anlegen). Neuen Token an Claude geben → wird in `config.json` eingetragen → Bridge neu starten → dann wie unten weiter.

**Bridge starten (für nächste Sitzung):**
```powershell
powershell.exe -ExecutionPolicy Bypass -c "cd 'C:/Users/ThorstenLavinia/lernplattform_laetitia/telegram_bridge'; node bridge.js"
```
Bridge läuft dann auf `http://127.0.0.1:3737`. Konsole offen lassen.

**Chat-ID ermitteln (sobald Token gültig ist):**
1. Bridge starten (s. o.)
2. In Telegram: Bot `@laetitia_nachrichten_bot` suchen → Nachricht schicken
3. Bridge-Konsole zeigt: `[Bridge] Neue Chat-ID (bitte in config.json eintragen): XXXXXXXXX`
4. Diese Zahl in `config.json` bei `erlaubteChatIds: [XXXXXXXXX]` und `antwortChatId: XXXXXXXXX` eintragen
5. Bridge neu starten

**Nova (KI-Gesprächspartnerin) — läuft, inkl. 3D-Avatar (Stufe 2). Test in Edge/Tobii offen.**

Modul implementiert (commit `175ea9a`, Sitzung 13) und in Sitzung 14 (27.07.2026) auf Gemini umgestellt, deployed und live getestet. 3D-Avatar (VRoid+TalkingHead) ebenfalls in Sitzung 14 fertig integriert (siehe unten) — **einziger noch offener Schritt: echter Test in Edge auf dem Tobii-Gerät.**

Setup-Status:
- ✅ `app/modules/ki_gespraech/ki_gespraech.html` + `ki_gespraech_mod.js` — inkl. Lautstärke-/Tempo-Regler (Stufe 1)
- ✅ `app/modules/ki_gespraech/persona.json` — inkl. `stimmungen` (neutral/schnippisch/ruhig/aufgeregt)
- ✅ `app/modules/ki_gespraech/gedaechtnis.json` (wird nach jedem Gespräch aktualisiert)
- ✅ `app/listener.ps1` v6 — `/chat` + `/chat/abschliessen` via **Google Gemini** (`gemini-flash-lite-latest`, OpenAI-kompatibler Endpunkt), inkl. `RufeGemini`-Hilfsfunktion mit korrektem UTF-8-Handling
- ✅ Spielewelt: ✨ Nova-Button vorhanden, in OneDrive deployed
- ✅ **Groq durch Gemini ersetzt:** console.groq.com hatte am 27.07.2026 einen serverseitigen Auth-Fehler (Stytch-Backend 503) — GitHub-Login griff nicht, Bestätigungsmail kam nie an. Google AI Studio (`aistudio.google.com`) funktioniert über bestehenden Google-Account, kein neues Signup-Risiko.
- ✅ **Modellwahl:** `gemini-flash-latest` (aktuell 3.6) hat nur 20 Anfragen/Tag Freikontingent (brandneues Modell) — auf `gemini-flash-lite-latest` umgestellt (~1.500/Tag, praxistauglich)
- ✅ **Stufe 1 Personalisierung (27.07.2026):** Nova wählt pro Antwort eine Stimmung (`neutral`/`schnippisch`/`ruhig`/`aufgeregt`, Pflicht: `ruhig` bei ernsten Thermen) — beeinflusst Wortwahl (via System-Prompt) UND Sprechtempo/Tonhöhe (`rate`/`pitch` in `ki_gespraech_mod.js`). Live getestet: gute Note → "aufgeregt" (witzig-überschwänglich), kaputtes Stofftier → "ruhig" (einfühlsam, verweist auf Eltern), Katzen-vs-Hunde-Frage → "schnippisch" (frech-humorvoll).
- ✅ Lautstärke-/Tempo-Regler im UI (10%-Schritte Tempo, Lautstärke wirkt nur dämpfend — Web-Speech-API deckelt bei 100%, für "lauter" nur Windows-Systemlautstärke)
- ✅ **Datiertes Gedächtnis + Routine + Charaktervertiefung (27.07.2026):** `gedaechtnis.json` speichert `letzte_gespraeche` jetzt mit Datum (max. 14 Einträge), neues `routine`-Feld (Ziel/Stand einer gemeinsam erarbeiteten Tagesroutine), neues `beobachtete_praeferenzen`-Feld (passt Novas Ton adaptiv an Laetitia an). Nova bezieht sich aktiv auf "gestern"/"letzte Woche". Persona um 4 Charakterdimensionen ergänzt (Selbstbild bei "bist du echt?", Proaktivität, eigene Interessen: Geschichten/Fantasie, freundlicher Widerspruch). Sprachniveau nach Nutzer-Feedback entschärft (kein Jugendslang mehr, Richtung Grundschulniveau).
- ✅ **Autostart eingerichtet (27.07.2026):** Geplante Aufgabe `Laetitia_Nova_Listener` (Task Scheduler) startet `listener.ps1` automatisch und unsichtbar (`-WindowStyle Hidden`) bei jeder Anmeldung von ThorstenLavinia — kein manueller Start mehr nötig. Getestet: Aufgabe manuell ausgelöst, Listener kam hoch, `/chat` antwortete korrekt. Verwalten/Deaktivieren: `taskschd.msc` → Aufgabenplanungsbibliothek → `Laetitia_Nova_Listener`, oder `Unregister-ScheduledTask -TaskName "Laetitia_Nova_Listener"`.
- ✅ **SVG-Avatar, Stufe 1 (27.07.2026):** Nova hat jetzt ein einfaches animiertes Vektor-Gesicht in `ki_gespraech.html` (während des Gesprächs sichtbar) — reagiert auf die von Gemini gewählte Stimmung (Augenbrauen/Mund/Augenform pro `neutral`/`schnippisch`/`ruhig`/`aufgeregt` unterschiedlich, kleine Funken-Akzente bei "aufgeregt"), blinzelt automatisch (CSS-Loop), und bewegt den Mund synchron zur Sprachausgabe (`u.onstart`/`onend` schalten eine CSS-Klasse). Design vorab visuell per Artifact-Vorschau geprüft. Rein CSS/SVG-basiert, keine neuen Abhängigkeiten, voll offline.
- ✅ **Tempo +20%, Stimme = Grammatik-Standard, einfühlsamer Gesprächseinstieg (27.07.2026):** `RATE_BASIS` auf 1.104 erhöht (+20%). Stimmungsabhängige Tonhöhen-/Tempo-Variation aus der Sprachausgabe entfernt (Nutzer-Feedback: wirkte inkonsistent zur Grammatik-Stimme) — Stimmung beeinflusst seither nur noch Wortwahl + Avatar-Mimik, nicht mehr TTS-Parameter. Erste Nachricht jeder Sitzung: entweder Check-in (Wohlbefinden/Schlaf/Spastik/Gedanken/Tagespläne) oder kurze Anekdote (Katzen Pünktchen/Anton, Garten, Terrasse, Musikalben) — Wechsel tagesabhängig deterministisch, Lernmodul-Ermutigung nie als Einstieg.
- ✅ **Lebenskontext präzisiert (27.07.2026):** Tagsüber ist Laetitia im Wohnzimmer (nicht im eigenen Zimmer — kann sich nicht selbst beschäftigen, braucht Betreuung), vollständig auf Unterstützung angewiesen. Neues `zuhause`-Feld in persona.json: Wohnzimmer mit Terrassenblick/Garten, Katzen Pünktchen + Anton, Musikalben auf der Lernplattform — dient als authentisches Anekdoten-Material.
- ✅ **Avatar Stufe 2 — fertig integriert (27.07.2026, commit `6806f2f`):** Fantasie-Avatar in **VRoid Studio** erstellt (Nutzer hat selbst gestaltet, Claude hat angeleitet), in **Blender** über VRM-1.0-Export + drei Python-Skripte (Bone-Rename, Eyes, Shapekeys — alle in `app/modules/ki_gespraech/avatar_blender_scripts/`) ins TalkingHead-kompatible Rig konvertiert (Mixamo-Bones + 124 ARKit/Oculus-Blendshapes, verifiziert). Finales Modell `nova_avatar.glb` (~16MB, gitignored, liegt lokal + in OneDrive). **TalkingHead** (github.com/met4citizen/TalkingHead) + three.js@0.180.0 per esbuild zu einem abhängigkeitsfreien IIFE-Bundle vorgebündelt (`app/modules/ki_gespraech/vendor/talkinghead.bundle.js`, Regel-1-konform: kein `import()`/`type=module` zur Laufzeit). **Stimme weiterhin Katja-TTS** — nur angenäherte Mundbewegung per `setFixedValue("jawOpen",...)`-Toggle während der Sprachausgabe, keine exakte Lippensync (siehe „für später vorgemerkt" unten). Stimmungen (Gemini-Feld `stimmung`) steuern TalkingHeads eingebaute Moods (`neutral/happy/angry/sad/fear/disgust/love/sleep`) über `setMood()`.
  - **Zwei Integrationsbugs gefunden + behoben:** (1) esbuild ersetzt `import.meta` im IIFE-Format durch `{}` — TalkingHeads interner `new URL(..., import.meta.url)`-Aufruf warf dadurch eine `Invalid URL`-Exception und `window.TalkingHead` wurde nie gesetzt. Unsichtbar in der Konsole, weil `error_handler.js`s globaler `window.onerror`-Handler die Standard-Fehlerausgabe unterdrückt — der eigentliche Fehler war nur über `window.LaetitiaFehler.logs()` (das interne Fehler-Log) sichtbar. Fix: esbuild-Option `define: {"import.meta.url":"self.location.href"}` beim Bundle-Bau. (2) Der Avatar-Container ist beim `initAvatar()`-Aufruf noch `display:none` (Startbildschirm) — TalkingHeads `ResizeObserver` bekam dadurch Größe 0×0 und der Canvas blieb leer, auch nachdem das Gespräch sichtbar wurde. Fix: TalkingHeads öffentliche `onResize()`-Methode wird jetzt manuell in `zeigeGespraech()` nachgetriggert, sobald der Container sichtbar wird.
  - Verifiziert über einen lokalen Test-Webserver (da `file://`-Seiten für Browser-Automatisierungs-Tools nicht direkt erreichbar sind): keine Fehler mehr im Log, Canvas rendert mit korrekter Größe, vollständiger Gesprächsdurchlauf (Gemini-Antwort + Katja-TTS + Avatar-Mimik) fehlerfrei.
  - `validate.ps1` musste angepasst werden: das vorgebündelte Bundle enthält einen toten `import()`-Zweig in einer ungenutzten Bibliotheksfunktion (kein eigener Code) — `vendor/`-Ordner ist jetzt von der Regel-12-Prüfung ausgenommen (commit `7e9487d`). Alle 9 Prüfungen wieder grün (nur bekannte Alt-Warnungen: Inline-Script-Backlog Regel 18, 1 vorbestehende `.png` im Projekt-Root).
  - **Kritischer Absturz-Bug gefunden + behoben (29.07.2026, commit `9363d76`):** Beim echten Edge-Test (via lokalem Test-Webserver + Browser-Automatisierung, echtes Edge bestätigt: Katja Online (Natural) verfügbar) stürzte Nova beim Laden sofort mit dem Fehler-Overlay ab. Ursache: TalkingHeads Konstruktor versucht standardmäßig, drei Lipsync-Sprachmodule (`lipsync-en/fi/lt.mjs`) per `import()` nachzuladen — diese Dateien wurden beim Bundle-Bau nie mitgenommen, und der `import()`-Aufruf in der Bibliothek hat kein `.catch()`. Die 3 unhandled promise rejections wurden von `error_handler.js` als Absturz gewertet. Fix: `lipsyncModules: []` beim Konstruieren übergeben (Nova nutzt ohnehin kein eingebautes Lipsync, nur manuelles `jawOpen`-Toggle während Katja-TTS). Nach dem Fix: vollständiger Gesprächsdurchlauf (Start → Avatar rendert, pinkes Anime-Gesicht sichtbar → Anekdoten-Opener → Antwort-Klick → Gemini-Antwort → Gespräch beenden → Speichern) fehlerfrei in echtem Edge verifiziert, `validate.ps1` 0 Fehler, deployed nach OneDrive.
  - **Für später vorgemerkt:** Falls präzise Lippensync gewünscht wird — Nova (nur Nova, nicht Grammatik) auf Google Cloud TTS (kostenlos bis 4 Mio. Zeichen/Monat, liefert Wort-Zeitstempel) oder TalkingHeads eigenes kostenloses lokales „HeadTTS" (Kokoro-Stimmen, WebGPU) umstellen — würde Novas Stimme wieder von Grammatiks Stimme unterscheiden, Tradeoff noch nicht entschieden.
- ⬜ **Bekannte Einschränkung:** Edge-„Online (Natural)"-Stimme zeigt manchmal Stotter-Effekt (erste Silbe, dann ~5s Pause) — vermutlich Cloud-Streaming-Eigenheit der Neural-Stimme, kein Code-Bug. Noch nicht behoben, Diagnose ausstehend (ggf. Offline-„Microsoft Katja" testen).

**🔴 Echter Tobii-Gerätetest — Avatar zeigt sich nicht, Ursache vermutet, Test bewusst auf spätere Sitzung verschoben (Nutzerentscheidung 29.07.2026)**

Erster echter Test direkt am Tobii-Gerät: **Avatar wird nicht angezeigt**, kein Fehler-Overlay. Wahrscheinlichste Ursache: `nova_avatar.glb` (16 MB, gitignored, liegt nur in OneDrive) ist auf dem Tobii-Gerät evtl. noch nicht vollständig synchronisiert — `novaHead.showAvatar(...).catch(...)` in `ki_gespraech_mod.js` schluckt einen Ladefehler still (setzt nur `novaHeadBereit=false`, kein sichtbarer Fehler), was exakt zum beobachteten Symptom passt. **Nutzer hat entschieden, den Tobii-Gerätetest auf eine spätere Sitzung zu verschieben** (Gerät aktuell nicht verfügbar) — kein aktiver Blocker, einfach zurückgestellt.
**Nächster Schritt (braucht den Nutzer, am Tobii-Gerät):** Im Explorer zu `OneDrive/2026_05_12_Lernsystem/app/modules/ki_gespraech/nova_avatar.glb` navigieren — grüner Haken (lokal vollständig) oder Wolke (nur online)? Falls Wolke: „Immer auf diesem Gerät behalten" + Download abwarten, dann erneut testen. Falls die Datei bereits vollständig lokal ist, könnte es an begrenzter GPU/WebGL-Leistung des Tobii-Geräts liegen (härteres Problem, dann Rückfall auf SVG-Avatar Stufe 1 erwägen).

**Lautstärke-Frage beantwortet:** 100 % ist eine harte technische Obergrenze (`SpeechSynthesisUtterance.volume` der Web-Speech-API deckelt bei 1.0) — der Regler in Nova ist schon am Maximum. Für mehr Lautstärke nur Windows-Systemlautstärke/Lautsprecher-Hardware.

**Neu (29.07.2026, commit `0c2af15`): Eigene Antwort per Tastatur + Geschichten-Modul**
- ✅ **Freie Texteingabe:** Neuer Button „✏️ Eigene Antwort" im normalen Gespräch öffnet eine dwell-taugliche Bildschirmtastatur (eigenes Overlay, `tastaturOverlay`) — getippter Text wird über einen „✓ Fertig"-Bestätigungsbutton gesendet, genau wie ein normaler Antwort-Vorschlag. Laetitia kommt laut Nutzer sehr gut mit Tastatur zurecht.
- ✅ **Geschichten-Modul (Stufe 1):** Neuer Button „📖 Geschichten" auf dem Nova-Startbildschirm → Geschichtenauswahl → Nova liest abschnittsweise vor, macht danach eine Pause. Abschnitte mit Frage zeigen 4 Diskussions-Vorschläge (rein lokal, kein Gemini-Aufruf — Story-Inhalte bleiben komplett offline); reine Erzähl-Abschnitte gehen nach 3 Sekunden automatisch weiter (Auto-Weiter-Button „➡️ Weiter" für sofortiges Vorwärts vorhanden, wie Grammatik-Werkstatt-Konvention). Neue Datei `geschichten_data.js` (`window.GESCHICHTEN`-Array, Format: `{id, titel, emoji, abschnitte:[{text, frage?, vorschlaege?, ende?}]}`).
- ✅ **Erste Geschichte „Der Fluss und die Schlange":** Nutzer hatte `Quiroga_Treibgut.pdf` (3 gescannte Seiten) als erste Geschichte vorgeschlagen. Inhaltsprüfung ergab: das Original ist „A la deriva" von Horacio Quiroga — eine ernste Kurzgeschichte über einen Mann, der langsam an einem Schlangenbiss stirbt (endet mit seinem Tod). Claude hat das vor der Umsetzung angesprochen (zu belastend angesichts Laetitias eigener körperlicher Situation), Nutzer hat zugestimmt und **situationsadäquate Adaption für diesen und zukünftige ähnliche Fälle** ausdrücklich gewünscht, inkl. abschnittsweisem Vorlesen mit Gesprächspausen statt am Stück. Umgesetzt als freie Nacherzählung (Fluss, Schlangenbiss, Kanufahrt als Motive übernommen), aber mit gutem Ausgang (Rettung im Dorf statt Tod) statt Originaltext. **Präzedenzfall für künftige Geschichten:** Vor Aufnahme neuer Story-PDFs immer erst Inhalt prüfen und bei belastenden Themen (Tod, Körperversagen, Gewalt o.ä.) eine kindgerechte Adaption vorschlagen statt unverändert zu übernehmen.
- ⬜ Noch nicht live getestet (Browser-Automatisierung war während dieser Sitzung nicht verbunden, vermutlich weil der Nutzer parallel selbst am Tobii-Gerät testete) — nur Syntax-Check (`node --check`) + `validate.ps1` (0 Fehler) + Code-Review. Test in Edge steht noch aus.

**🟡 Stufe 2 (später) — Echte Sprachausdruckskraft ("Sprachbausteine-Bank")**

Web-Speech-API kennt keine echten Emotionen/Sprachstile (nur rate/pitch/volume, siehe Stufe 1). Für echte
gefühlsbetonte Sprachmelodie (schnippisch wirklich "klingen lassen", nicht nur Tempo/Tonhöhe) würde eine
Cloud-TTS mit Style-Steuerung gebraucht (z.B. Azure Speech SSML `mstts:express-as style="cheerful"`, oder
ElevenLabs). Das direkt live bei jeder Nova-Antwort zu nutzen würde aber eine harte Online-Abhängigkeit
für die reine Sprachausgabe schaffen — Risiko für Stabilität, da die ganze Plattform sonst offline-first ist.

**Vorschlag (Batch-Ansatz, offline-stabil zur Laufzeit):**
1. Kein Versuch, die von Gemini frei generierten Sätze selbst mit Cloud-TTS-Styles zu vertonen (das würde
   Internet bei JEDER Antwort brauchen — Architekturwechsel, mehr Latenz, neue Ausfallquelle).
2. Stattdessen: eine **kuratierte Liste kurzer Interjektionen/Reaktionsfloskeln** pro Stimmung (z.B. schnippisch:
   "Ha, gut gekontert!", "Na sowas!", "Ehrlich jetzt?" / aufgeregt: "Krass!", "Das ist ja mega!" / ruhig: kurze
   einfühlsame Seufzer-Phrasen) — einmalig (oder bei Erweiterung) per Batch-Skript mit einer Cloud-TTS-mit-Styles
   erzeugen und als MP3/WAV-Dateien lokal ablegen (`app/modules/ki_gespraech/sprachbausteine/<stimmung>_NN.mp3`)
   + ein Manifest (`sprachbausteine.json`: Stimmung → Liste verfügbarer Dateien).
3. Zur Laufzeit (offline, kein Internet nötig außer für den Gemini-Chat-Call selbst, der ohnehin schon gebraucht
   wird): vor der eigentlichen (weiterhin per Browser-TTS gesprochenen) Antwort wird passend zur von Gemini
   gewählten Stimmung zufällig ein lokaler Sprachbaustein abgespielt — echte stimmliche Textur für die Einleitung,
   der Hauptsatz bleibt zuverlässig offline/lokal.
4. Batch-Generierung ist ein seltener Wartungsschritt (wie `grammatik_data.js` erweitern) — braucht nur bei
   Erstellung/Erweiterung kurz Internet, die App selbst bleibt beim eigentlichen Sprechen komplett lokal.

**Für die Umsetzung würde ich brauchen:**
- Freigabe/Entscheidung für einen Cloud-TTS-Anbieter für die einmalige Batch-Erzeugung (Azure Speech kostenlos
  im Testkontingent, oder ElevenLabs mit kostenlosem Zeichen-Kontingent/Monat)
- Eine kuratierte Liste gewünschter Interjektionen pro Stimmung (kann ich vorschlagen, Feinschliff durch Nutzer)
- Ggf. neuer API-Key für den gewählten Anbieter (gleiche Einmal-Hürde wie bei Groq/Gemini)

**Grammatik-Werkstatt: Stufe 11+ — nächster Block**
Thema noch offen — Stufe 10 (Wessen-/Wem-Fall, E-47–E-52) wurde Sitzung 17 abgeschlossen.

**Bluetooth-Umschaltung:**
Einziger offener Schritt — als Administrator ausführen:
```powershell
Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
```
Dann `lernwelt_starten.exe` neu starten → Audio-Dialog testen.

**Lies-mal-3 Bilder:**
- `taucher_lies`: Schätzwerte in BILD_CROP → exakt neu croppen
- Neues Buch: Seiten 2, 8, 14, 16, 22, 28 fotografieren → hochladen

**Rule-13-Backlog: ✅ abgeschlossen (29.07.2026, commits `a2102fc`, `e868231`, `821cee5`).** Alle 48 HTML-Dateien mit Inline-`<script>` > 20 Zeilen in externe `*_mod.js`-Dateien ausgelagert (reine Struktur-Änderung, kein Verhaltenswechsel). `validate.ps1` Regel 18 vollständig grün. Extraktion per Skript (identischer Regex wie validate.ps1), jede Datei mit `node --check` syntaxgeprüft, alle `onclick`-Attribute auf globale Scope-Kompatibilität geprüft (keine IIFE-Konflikte gefunden). Deployed nach OneDrive, gepinnt.

---

## 🟡 Mittelfristig

- Mathe-Hefte digitalisieren (PDFs vorhanden) → `schule_mathe_data.js`
- Sachkunde-Bilder für 7 fehlende Themen ergänzen
- `stats.js` in weitere Spielseiten einbinden (Regel 15 vollständig umsetzen)
- Grammatik Stufe 11+: Thema noch offen (Stufe 10 seit Sitzung 17 abgeschlossen)

---

## ⬜ Noch nicht angegangen

TAGESPLAN · QUASSEL-ÜBERGANG · SONOS · AUFMERKSAMKEITS-SIGNAL (Fritz!Box)

---

## Start-Anleitung für neue Sitzung

Erste Nachricht an Claude:
> **"Lies ÜBERGABE_NEUE_SITZUNG.md und PROJEKT_WISSEN.md und fasse den Stand zusammen."**

Claude liest beide Dateien, bestätigt die 17 Goldstandard-Regeln und nennt offene Aufgaben.

**Wichtig:** Claude arbeitet nie aus dem Gedächtnis an Kerndateien. Immer erst hochladen.

---

## Bekannter Fehler: OneDrive-Sync (gelöst 23.05.2026)

**Symptom:** „Ups! Da ist etwas schiefgelaufen" + gelber Text „Die Datei wurde nicht gefunden" nach Klick auf beliebiges Modul.

**Ursache:** Der Link-Navigator-Guard in `error_handler.js` prüfte Zieldateien per XHR. Edge wirft bei XHR auf OneDrive-Platzhalter (Online-Only) einen `window.onerror` mit dem Windows-Fehlertext, was fälschlicherweise das Fehler-Overlay auslöste. Zusätzlich wurden `cp`-Befehle nach Sitzungen nie ausgeführt — die OneDrive-Kopie enthielt veraltete Dateiversionen.

**Fix:** Link-Navigator-Guard vollständig entfernt (verursachte mehr Schaden als Nutzen, `validate.ps1` Prüfung 8 ist der eigentliche Schutz gegen fehlende Links).

**Prävention:** `validate.ps1` Prüfung 9 vergleicht jetzt alle HTML/JS-Dateien zwischen Repo und OneDrive per MD5-Hash. Jede veraltete Datei wird als ERR gemeldet.

**Wichtig:** Claude kann Dateien direkt nach OneDrive kopieren (Bash-Tool). Sag einfach „deploy" oder „nach OneDrive kopieren" — kein manuelles `cp` nötig.

---

## GitHub-Workflow (etabliert seit Mai 2026)

GitHub: `https://github.com/ThorstenKra/lernplattform_laetitia`

Nach jeder Arbeitssitzung:
```powershell
powershell.exe -ExecutionPolicy Bypass -File .\tests\validate.ps1   # erst pruefen (neuer Pfad seit Sitzung 12)
git add app/pfad/zur/datei.js                                       # gezielt stagen
git commit -m "Kurze Beschreibung"
git push
```

**Deployment in OneDrive (kein git pull möglich!):**
Der OneDrive-Ordner ist KEIN Git-Repo. Geänderte Dateien müssen nach jedem Push manuell kopiert werden:
```powershell
cp app/modules/schule/grammatik*.* "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/schule/"
cp app/core/error_handler.js      "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/core/"
```

**WICHTIG — nach jedem `cp` sofort pinnen:**
OneDrive "Dateien bei Bedarf" kann neue Dateien als Online-Only markieren. Der XHR-Check im
`error_handler.js` schlägt dann fehl → "Datei nicht gefunden"-Overlay für alle Module.
```powershell
attrib +P "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/schule/*.*"
# Für core-Dateien:
attrib +P "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/core/*.*"
# Einmalig alle pinnen (falls viele Dateien betroffen):
attrib +P "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/*.*" /S /D
```
Dann Edge komplett neu starten.

**Hinweis:** `.exe`, `.bat`, Mediendateien (MP3, JPG, PNG, …) stehen in `.gitignore` und bleiben lokal.

---

## Sitzungsprotokoll 7. Juni 2026 — Sitzung 12

| Was | Ergebnis |
|---|---|
| Tests: Self-Loop- + Datenbasis-Ambiguität-Fixes | ✅ run_tests.ps1 53/53 PASS (vorher 15 FAIL), test_luecken.ps1 14/14 PASS (vorher 1 FAIL) — Phase 3 filtert Erstschritt-Kachel aus erwarteten Treffern, Phase 5/6 + L3 erkennen Wörter mit mehreren Pfad-Einträgen und überspringen sie statt fehlzuschlagen (commit 2694aa5) |
| Testumgebung neu sortiert | ✅ Neues `tests/`-Verzeichnis angelegt: `tests/quasselkiste/` (modulspez. Suiten), `tests/tools/` (generische CDP-Automatisierung inkl. ws/node_modules), `tests/` (plattformweite Prüfer validate.ps1/analyse_optik.ps1/compare_tiles.ps1). $PSScriptRoot-Pfade angepasst, Funktionsfähigkeit nach Verschiebung verifiziert (commit 86df18d) |
| Grammatik: 4-Stufen-Navigation (Grundlagen/Fortgeschr./Profi/Champion) | ✅ Neue 3-Ebenen-Hierarchie `grammatik.html` → `grammatik_kategorie.html?kat=...` → `grammatik_spiel.html` — alle Lektionen je Kategorie ohne Scrollen erreichbar (4-Spalten-Grid, Zeilenzahl dynamisch via `Math.ceil(anzahl/4)`); neue Dateien `grammatik_kategorie.html` + `.js` (commit e51413e) |
| Grammatik: Lese-/Klick-Trennung in allen 5 Aufgabentypen | ✅ ab_wahl/abc_wahl/wort_button (255/400 Aufgaben) zeigten Vergleichsinhalte vorher nur auf Dwell-Buttons — jetzt zusätzlich im passiven Lesebereich (`leseHtml()` um `extraHtml`-Parameter erweitert, neues CSS `.lese-optionen`/`.lese-satz`). Reiner Code-Fix, keine Änderung an grammatik_data.js (commit e51413e) |
| Goldstandard-Regel-Check | ✅ Alle 17 Regeln geprüft — konform |
| Live-Test in Edge (CDP, OneDrive-Deployment) | ✅ Stufen-Auswahl, Kategorie-Raster (Grundlagen, Champion), Spielseiten mit Lese-/Klick-Trennung — alle Screenshots verifiziert, kein Scrollen, Inhalte identisch zur Dev-Version |
| Grammatik: 4 neue Lektionen E-43–E-46 (Stufe 9, Satzzeichen) | ✅ Der Punkt / Das Fragezeichen / Das Ausrufezeichen / Welches Satzzeichen? — 40 Aufgaben, alle 5 Typen, Lese-/Klick-Trennung. Stufe 9 der Champion-Kategorie zugeordnet (`stufen:[7,8] → [7,8,9]`, jetzt 12 Lektionen E-35–E-46) (commit f06b0d9) |
| Deployment + Live-Test neue Lektionen | ✅ Nach OneDrive kopiert (Diff bestätigt MD5-identisch), Champion-Übersicht (12 Lektionen, kein Scrollen) + Lektion E-45 live in Edge verifiziert |

**Commits (alle gepusht):** 2694aa5, 86df18d, e51413e, f06b0d9

**Grammatik-Werkstatt jetzt:** 44 Einheiten, 440 Aufgaben (E-03–E-46), Stufen 1–9 vollständig.

---

## Sitzungsprotokoll 1. August 2026 — Sitzung 18

| Was | Ergebnis |
|---|---|
| Ausstehender Commit von Sitzung 17 nachgeholt | ✅ Mathe-Ausbau Schritte 2+3 (`erklaerung`-Feld für 265 Aufgaben + Milo-Anbindung), waren seit Sitzungsende 17 uncommittet — committet, gepusht, nach OneDrive deployed (commit `1188c7f`) |
| Mathe-Modul-Ausbau Schritt 4: 4-Stufen-Navigation | ✅ Neue Kachel-Übersicht (Grundlagen/Fortgeschritten/Profi/Champion), `mathe_module.js` filtert `levelOrder` selbst über `?kat=` — `moduleKit.js` bleibt unangetastet, Rückweg nutzt vorhandenes `LaetitiaReturn`-System. Live in Chrome getestet, keine Konsolenfehler. Siehe eigener Abschnitt „Mathe-Modul-Ausbau" oben (commit `32ee5bf`) |
| Bug: toter Kategorie-Untertitel | ✅ Von `showMenu()` immer überschrieben, nie sichtbar — als totes Code-Stück entfernt statt `moduleKit.js` anzufassen (commit `723edc2`) |
| Bug: Menü-Header zeigte „Mathe Mathematik" | ✅ Vorbestehender, unabhängiger Bug (`icon:"Mathe"` statt Emoji) gefunden und behoben, live verifiziert (commit `f365eb6`) |
| Logik-Modul analysiert + Verbesserungsvorschläge erarbeitet | ✅ Ist-Zustand, didaktische/optische Vorschläge, Übertragbarkeit der Mathe-Erkenntnisse geprüft (4-Stufen-Nav bewusst verworfen, zu wenige Stufen) — siehe eigener Abschnitt „Logik-Modul: Analyse + Ausbau" oben, keine Codeänderung in diesem Schritt |
| Logik: Header-Bug + Statistik-Sichtbarkeit behoben | ✅ Gleiche Bugklasse wie bei Mathe („Logik Logik" statt „🧩 Logik"); Logik war trotz laufendem Stats-Tracking in `statistik.html` komplett unsichtbar (2 hartcodierte Modul-Listen + Tab fehlten). Live in Chrome verifiziert (commit `67979c5`) |
| Logik: Milo-Anschluss Stufe A (offline) | ✅ Neuer 🦉 „Milo denkt mit"-Hinweis-Overlay am Hilfe-Button (5 sokratische Tipps je Aufgabentyp, ersetzt das vorher faktisch nutzlose Standard-Wort-Glossar) UND `sammleLogikKontext()` in `milo_mod.js` (Milo kannte Logik in Gesprächen bisher gar nicht). Beide Teile live getestet (Overlay in Chrome, Kontext per XHR-Interception) (commits `9b6c054`, `cb75292`) |
| Logik: Milo-Anschluss Stufe B (online/dynamisch) | ✅ `zeigeMiloTipp()` versucht zuerst Live-Gemini-Anfrage über `listener.ps1`, fällt bei Fehler unauffällig auf Stufe-A-Text zurück (gleiches Prinzip wie Fabus Live-Reaktionen). Live per curl + Chrome verifiziert, Fallback bestätigt korrekt. **Dabei gefunden:** laufende `listener.ps1`-Instanz hat Platzhalter statt echtem Gemini-Key — betrifft alle Online-Agenten-Features, siehe „🔴 Offene Aufgaben" oben (commit `d161201`) |
| Logik: 4 neue Stufen L6–L9 (Content-Ausbau) | ✅ 48 neue Aufgaben (12 je Stufe: Reihenfolgen, Ursache-Wirkung, Widersprüche, Mengenvergleiche) — Logik wächst von 66 auf 114 Aufgaben. Dabei einen echten Bug vor dem Commit gefunden+behoben: alle 12 L8-Fragen waren identisch formuliert, hätte zu kollidierenden Aufgaben-IDs geführt. Live in Chrome getestet (L6/L8/L9 + Milo-Tipp + Milo-Chat-Kontext), keine Konsolenfehler. Siehe eigener Abschnitt „Logik-Modul" oben (commit `8f896fc`) |
| Mathe: Rechenweg-Visuals für M1–M4 | ✅ Größte didaktische Lücke geschlossen — neue `zeigeRechenwegAnimation()` erweitert das bestehende M0-Zähl-Overlay um Addition (blaue+grüne Punkte, weiterzählend) und Subtraktion (Punkte mit rotem Kreuz wegnehmen, rückwärts zählend). Keine Änderung an `moduleKit.js` nötig. Live in Chrome getestet (M2/M3/M4, Wegnahme-Phase per Screenshot in Echtzeit erwischt), keine Konsolenfehler. Siehe eigener Abschnitt „Mathe-Modul-Ausbau" oben (commit `b9e98a7`) |
| Mathe + Sinnesorgane-Quiz: unstyled Glossar-Overlay behoben | ✅ Fehlende CSS-Klassen `.overlayCard`/`.overlaySub` (Ursprung in `mathe_test.html` gefunden) in beiden betroffenen Dateien ergänzt — Scope bewusst über Mathe hinaus auf Sinnesorgane-Quiz erweitert, da identischer Motor/Bug. Live in Chrome bestätigt (commit `a35aed4`) |
| Logik: L2-Muster-Lesbarkeit behoben | ✅ Befund größer als der Ausgangsvorschlag — `.questionBlock` kollabierte durchgängig die in den Daten absichtlich doppelten Trennleerzeichen (auch bei L1-Optionsreihen, nicht nur L2). Fix: `white-space:pre-wrap`, ohne Risiko für Fließtext bei anderen Stufen. Live bestätigt (commit `819a27e`) |
| schule_mathe: Sichtbarkeits-Entscheidung getroffen | ✅ Nutzer entschied sich für vollen Ausbau (eigener Tab + Milo-Kontext), analog Mathe/Logik. Dabei eine Architektur-Eigenheit berücksichtigt: `schule_mathe_mod.js` ist nicht moduleKit-basiert, eigenes ID-Format, Daten liegen kontextabhängig in Registry ODER globaler Variable. Ein erster Testlauf zeigte fehlende Erklärung (falsche Datenquelle), nach Korrektur live bestätigt (Statistik-Tab + Milo-Kontext-XHR). Siehe eigener Abschnitt „Mathe-Modul-Ausbau" oben (commit `1e0ec15`) |
| Fabu-Rechengeschichten umgesetzt | ✅ Dritte Fabu-Bibliothek — Matheaufgaben narrativ eingebettet, 3 neue Geschichten. Rechenfragen werden lokal/offline ausgewertet (nicht per Gemini), bewusste Ausnahme von Fabus „keine Quizfragen"-Regel, in `persona.json` dokumentiert. Live in Chrome komplett durchgespielt (richtige+falsche Antwort, Diskussionsfrage-Fallback, Rückkehr zur Auswahl), keine Konsolenfehler. Siehe eigener Abschnitt „Mathe-Modul-Ausbau" oben (commit `faab75e`) |
| Logik: neue Stufe L10 „Muster-Raster" (Content-Ausbau) | ✅ Letzte offene Analyse-Idee umgesetzt — visuelle Matrizen-Aufgaben (non-verbales IQ-Test-Format) als 3×3-Raster aus lateinischen Quadraten, 12 neue Aufgaben, reine Daten-Erweiterung im bestehenden `frage`-Feld (mehrzeiliger Text, `moduleKit.js` unangetastet). Node-Skript verifiziert vor Commit alle Raster als echte lateinische Quadrate mit eindeutiger Lösung. Live in Chrome getestet (Raster-Rendering, richtig/falsch-Feedback, Milo-Tipp, Menü-Layout), keine Konsolenfehler. Siehe eigener Abschnitt „Logik-Modul" oben (commit `86541ae`) |
| Gesamt-Check aller Module | ✅ Grammatik/Reimen/Sinnesorgane als unsichtbar in der Lernstatistik entdeckt+behoben (gleiche Bugklasse wie zuvor bei Logik), drei tote Alt-Dateien aus früherer moduleKit-Migration gefunden und mit Nutzer-Bestätigung gelöscht. Alle Links in Übersichtsseiten geprüft — sauber. Siehe eigener Abschnitt „Gesamt-Check aller Module" oben (commits `70dff3e`, `e518368`) |
| KI-Agenten: Milo-Lernkontext erweitert | ✅ Deutsch, Sinnesorgane, Reimen ergänzt — Milo kannte diese drei längst getrackten Module bisher gar nicht. Live per XHR-Interception verifiziert. Siehe eigener Abschnitt „KI-Agenten-Weiterentwicklung" oben (commit `a3fdd4d`) |
| KI-Agenten: Mathe bekommt Milo-Hinweis-Button | ✅ Identisch zu Logiks „Milo denkt mit"-Button, ersetzt das nutzlose Standard-Glossar. Live fuer M0a und M1 getestet. Siehe eigener Abschnitt oben (commit `684ca4e`) |
| KI-Agenten: Gruppenchat „Alle zusammen" | ✅ Neue Seite, themenbasiertes Routing zwischen Nova/Fabu/Milo in einem Gespraech, `listener.ps1` unangetastet. Live per XHR-Interception ueber 3 Gespraechsrunden verifiziert (Routing, Badge-Wechsel, Verlauf-Praefixe, Milo-Kontext, Abschluss). Siehe eigener Abschnitt oben (commit `53efcc3`) |
| KI-Agenten: proaktiver Impuls auf Lernen-Uebersicht | ✅ Hoechstens 1x/Tag, nur positive Anlaesse, rein deterministisch aus Stats (kein Gemini-Aufruf). Live getestet (Nova-Fallback, Cooldown, Milo-Priorisierung). Siehe eigener Abschnitt oben (commit `69bbfa1`) |
| Gemini-API-Key-Problem behoben | ✅ Nutzer hat selbst einen neuen Key geholt+eingetragen+Listener neu gestartet (Claude hat das Handling durchgehend abgelehnt, auch bei expliziter Erlaubnis). Erster Neustart griff nicht (alter Prozess im Speicher) — nach echtem Neustart per curl UND live im Gruppenchat/Fabu-Diskussionsfrage mit echten dynamischen Antworten bestätigt. Siehe eigener Abschnitt „🟢 Gemini-API-Key-Problem behoben" oben (keine Code-Commits, reine Konfiguration+Doku) |
| Fabu-Stimme: Installation begonnen, nicht abgeschlossen | 🟡 VirusTotal-Prüfung der Engine-DLL sauber (0/92). Installer-Ausführung zunächst scheinbar blockiert, tatsächlich nur fehlende DLL im selben Ordner (Konsolenfenster schloss sich beim Fehler sofort, sah wie SmartScreen-Block aus). Vollständige Schritt-für-Schritt-Anleitung übergeben, Nutzer bei Sitzungsende mitten in der Ausführung. Siehe eigener Abschnitt „🟡 Fabu-Stimme" oben |

**Commits (alle gepusht):** `1188c7f`, `32ee5bf`, `723edc2`, `f365eb6`, `67979c5`, `9b6c054`, `cb75292`, `d161201`, `8f896fc`, `b9e98a7`, `a35aed4`, `819a27e`, `1e0ec15`, `faab75e`, `86541ae`, `70dff3e`, `e518368`, `a3fdd4d`, `684ca4e`, `53efcc3`, `69bbfa1`

**Sitzungsabschluss:** Alle einundzwanzig Commits gepusht, nach jedem Schritt nach OneDrive deployed, `validate.ps1` durchgehend 0 Fehler. Git-Arbeitsverzeichnis sauber (bis auf diese Doku-Aktualisierung selbst). Browser-Tests liefen diese Sitzung größtenteils in Chrome (Erweiterung war verbunden, mit einigen bekannten Screenshot-/document_idle-Timeouts der Erweiterung selbst — kein App-Bug, siehe Muster aus früheren Sitzungen: neuer Tab statt Retry löst es zuverlässig).

**Nächste konkrete Schritte für die Folgesitzung:** Wichtigster Punkt zuerst: Fabu-Stimme-Installation abschließen — Nutzer war beim Sitzungsende mitten in der Schritt-für-Schritt-Anleitung (siehe Abschnitt „🟡 Fabu-Stimme" oben), VirusTotal-Prüfung bereits sauber (0/92), nur noch DLL+Voice-Modell+espeak-Daten in den Downloads-Ordner legen und Installer erneut ausführen. Sobald die Stimme in Windows sichtbar ist: in Edge verifizieren + `fabu_mod.js` anpassen (siehe genaue Schritte im Abschnitt oben). Gemini-API-Key-Problem ist behoben und vollständig live verifiziert (siehe Abschnitt „🟢 Gemini-API-Key-Problem behoben") — alle Online-Agenten-Features laufen jetzt mit echten dynamischen Antworten. Mathe- UND Logik-Modul-Ausbau sind vollständig abgeschlossen, Gesamt-Check aller Module durchgeführt, KI-Agenten-Weiterentwicklung (4 von 5 vorgeschlagenen Schritten) umgesetzt — bewusst offen gelassen: gefiltertes Gedächtnis-Retrieval (aktuell unkritisch, siehe eigener Abschnitt). Übrige offene Punkte unverändert: Tobii-Gerätetest (Nova-Avatar), Telegram-Token, Pfad-Training-Modus-2-Bestätigung, Grammatik Stufe 11+ (Thema noch offen).

---

## Sitzungsprotokoll 31. Juli 2026 — Sitzung 17

| Was | Ergebnis |
|---|---|
| Reime-Werkstatt komplett neu aufgesetzt | ✅ 5 echte Goethe-Gedichte statt 31 erfundener Zweizeiler, gemeinsame Bibliothek `gedichte_data.js`, 49 kuratierte Aufgaben, Grammatik-Werkstatt-Pattern übernommen (commit `5eefdb5`) |
| Fabu: Gedichte-Bibliothek ergänzt | ✅ Zweiter Bibliotheks-Button neben Geschichten, verallgemeinerte Player-Logik, Erlkönig als „gruselige alte Ballade" gerahmt (Präzedenzfall in persona.json dokumentiert) (commit `5eefdb5`) |
| Bug: Zurück-Button auf Reimen-Übersicht unsichtbar | ✅ Layout-Fix — Übersicht scrollt jetzt intern statt fixer Box, wie Fabus Geschichtenliste (commit `5eefdb5`). Vom Nutzer beim eigenen Edge-Test gefunden. |
| Bug: Überspringen-Button ohne Dwell-Bindung | ✅ In Reime (3 Aufgabentypen) UND Grammatik-Werkstatt (5 Aufgabentypen) behoben — gleicher Gap in beiden Modulen gefunden (commits `5eefdb5`, `c0cdf11`) |
| Fabu+Milo: Goldstandard-Audit | ✅ Auswahlfelder-Timing (erst nach TTS-Ende), Farbe im Ruhezustand, Schriftgröße, Zurück-Button lila vereinheitlicht, kleinere Konsistenz-Fixes — siehe Abschnitt „Fabu + Milo — Goldstandard-Audit" (commit `709b212`) |
| Grammatik: neue Stufe 10 (Wessen-/Wem-Fall) | ✅ 6 neue Lektionen (E-47–E-52), 60 Aufgaben, Champion-Kategorie jetzt 18 Einheiten — live in Edge getestet (Browser-Automatisierung), keine Konsolenfehler, Fortschrittsspeicherung bestätigt (commit `87399ab`) |
| Neue Regel 18 (Auswahlfelder erst nach TTS-Ende) systemweit ausgerollt | ✅ Alle Module geprüft/gefixt, die automatisch vorlesen (commit `0adcb0c`) |
| Umlaut-Aussprache-Fix + neue Regel 19 | ✅ Systemweiter Audit + Fix in ~15 Dateien, siehe eigener Abschnitt oben (commit `2512029`) |
| Mathe-Modul-Ausbau (laufendes Vorhaben) | 🟡 Schritt 1 (Stats-Tracking-Fix) committet (`a3a1585`), Schritte 2+3 (erklaerung-Feld für 265 Aufgaben, Milo-Anbindung) fertig getestet aber **noch nicht committet** — siehe eigener Abschnitt oben |

**Commits (alle gepusht):** `5eefdb5`, `c0cdf11`, `709b212`, `87399ab`, `0adcb0c`, `2512029`, `a3a1585`

**Noch NICHT committet (Stand Sitzungsende):** `app/modules/ki_agenten/milo/milo.html`, `app/modules/ki_agenten/milo/milo_mod.js`, `app/modules/mathe/data/mathe_data.js`, `app/modules/mathe/data/mathe_m0_data.js` — Mathe-Ausbau Schritte 2+3, fertig getestet (Edge, keine Konsolenfehler, `validate.ps1` 0 Fehler, OneDrive deployed), wartet nur auf Nutzeranweisung „committen und pushen".

**Sitzungsabschluss:** Umfangreiche Sitzung in mehreren Teilen (Reime-Neuaufbau, Fabu/Milo-Audit, Grammatik Stufe 10, Regel 18 Rollout, Umlaut-Systemfix + Regel 19, Mathe-Modul-Ausbau Schritte 1–3). Grammatik-Erweiterung und alle Mathe-Schritte live in Edge getestet und bestätigt. Reime-, Fabu/Milo- und Umlaut-Fixes wurden strukturell/über Konsolen-Checks verifiziert bzw. vom Nutzer selbst in Edge geprüft (Details je im jeweiligen Abschnitt). Git-Arbeitsverzeichnis ist bei Sitzungsende NICHT sauber — 4 Dateien warten auf Commit (siehe oben).

**Nächste konkrete Schritte für die Folgesitzung:** (1) Ausstehenden Commit für Mathe Schritte 2+3 nachholen, sobald vom Nutzer angewiesen, (2) Mathe-Modul-Ausbau fortsetzen — Schritt 4 (4-Stufen-Navigation) ist bereits architektonisch recherchiert, siehe Mathe-Abschnitt oben bzw. Claude-Memory `project_mathe.md`, (3) Fabu/Milo-Audit-Fixes vom Nutzer in echtem Edge/Tobii-Test bestätigen lassen, (4) übrige offene Punkte unverändert: Fabu-Stimme-Entscheidung, Tobii-Gerätetest (Nova-Avatar), Telegram-Token, Pfad-Training-Modus-2-Bestätigung, Gruppengespräche-Implementierung, Grammatik Stufe 11+ (Thema noch offen).

---

## Sitzungsprotokoll 30. Juli 2026 — Sitzung 16

| Was | Ergebnis |
|---|---|
| Registry an Auswahl-UI angebunden | ✅ Neue Seite `ki_agenten.html` rendert alle Agenten dynamisch aus `registry.js` statt 3 fest verdrahteter Spielewelt-Kacheln. Live getestet (commit `552d753`) |
| Milo: Fachwissen-Bibliothek vertieft | ✅ Grammatik-Merksätze im Lernkontext, `stats.js` in Mathe/Lesen nachgerüstet. Live getestet (commit `f9d9379`) |
| Gruppengespräche-Konzept erarbeitet | 📐 Rederecht, Schlagabtausch-Deckel, Datenmodell, Backend-/Frontend-Plan dokumentiert — noch nicht implementiert (commit `393e2df`) |
| Agenten weiter personalisiert | ✅ Gemeinsamer Lebenskontext für alle Agenten, Milo auf Novas Tiefe gebracht, Fabu reagiert jetzt live auf Diskussionsantworten. Live getestet (commit `1e73134`) |
| 🐛 API-Key versehentlich überschrieben + behoben | ✅ Beim Deploy von `listener.ps1` echten Gemini-Key mit Repo-Platzhalter überschrieben — über aistudio.google.com wiederhergestellt (derselbe Key, noch gültig). Merksatz für künftige Deploys dokumentiert |
| Gedächtnis: Langzeit/Kurzzeit-Trennung | ✅ `profil` (dauerhaft) von `letzte_gespraeche` (rollierend, mechanisch gepflegt) getrennt — reduziert LLM-Risiko beim automatischen Umschreiben. Live getestet (commit `6317f20`) |
| Gedächtnis: Lernfortschritt dauerhaft verankert | ✅ Neuer Helfer `lernfortschritt_gemeinsam.js`, alle drei Agenten tragen jetzt zu `profil.lernfortschritt` bei. Live-Test-Highlight: Fabu erwähnte unaufgefordert korrekt Milos Mathe-Fortschritt (commit `63fcbbf`) |
| Fabu: 4 neue Geschichten | ✅ Der kluge Igel, Die Amsel und die vier Jahreszeiten, Der Maulwurf mit der feinen Nase, Zwei Füchse und der geteilte Fund. Live getestet (commit `d29c77e`) |
| Fabu-Stimme: männliche Stimme recherchiert | 🔴 Stimmen-Inventur durchgeführt (neues Tool `cdp_list_voices.js`), Thorsten-Voice/Piper als beste kostenlose Lösung identifiziert, Installationsanleitung mit exakten Links erstellt. **Blockiert:** Windows verweigert Download der Engine-DLL (SmartScreen-Reputationsblockade, vermutlich harmlos aber nicht verifiziert). Details + Nächste Schritte siehe Abschnitt oben bei „🔴 Fabu-Stimme" |

**Commits (alle gepusht):** `552d753`, `f9d9379`, `393e2df`, `1e73134`, `76b008e`, `6317f20`, `63fcbbf`, `d29c77e`

**Sitzungsabschluss:** Alle Code-Änderungen committed + gepusht, nach OneDrive deployed, `validate.ps1` grün. `tests/tools/cdp_list_voices.js` (neues wiederverwendbares Stimmen-Check-Tool) noch zu committen.

**Nächste konkrete Schritte für die Folgesitzung:** (1) Fabu-Stimme — Nutzer entscheidet zwischen VirusTotal-Prüfung/Cepstral/Verzicht (siehe Abschnitt „🔴 Fabu-Stimme"), (2) danach ggf. Installation abschließen + `fabu_mod.js` Stimmenauswahl anpassen, (3) übrige offene Punkte unverändert: Tobii-Gerätetest, Telegram-Token, Pfad-Training-Modus-2-Bestätigung, Gruppengespräche-Implementierung.

---

## Sitzungsprotokoll 29. Juli 2026 — Sitzung 15

| Was | Ergebnis |
|---|---|
| Nova-Avatar: Absturz-Bug gefunden + behoben | ✅ Erster echter Edge-Test (via lokalem Test-Webserver + Browser-Automatisierung, Katja Online (Natural) bestätigt verfügbar) zeigte sofortigen Absturz beim Laden. Ursache: TalkingHead-Konstruktor lädt standardmäßig 3 Lipsync-Sprachmodule (`lipsync-en/fi/lt.mjs`) per `import()` nach, die nie ins Bundle übernommen wurden; `import()` ohne `.catch()` → 3 unhandled promise rejections → `error_handler.js` wertet das als Absturz. Fix: `lipsyncModules: []` beim Konstruieren (Nova nutzt kein eingebautes Lipsync, nur manuelles `jawOpen`-Toggle). Danach voller Gesprächsdurchlauf fehlerfrei (Start → Avatar rendert → Anekdoten-Opener → Antwort-Klick → Gemini-Antwort → Gespräch beenden → Speichern). `validate.ps1`: 0 Fehler. Committed (`9363d76`), deployed nach OneDrive, Doku aktualisiert (`9794f78`). |
| Nova-Avatar: Dwell-Test am echten Tobii-Gerät | ⬜ **Noch offen** — Browser-Automatisierung testet nur per Klick, nicht per Augensteuerung. Steht weiterhin aus. |
| Nachrichten-Modul: Chat-ID-Ermittlung versucht | 🔴 **Blockiert, neuer Befund:** Bridge lokal gestartet → `[Bridge] Bot-Verbindung fehlgeschlagen: ETELEGRAM: 401 Unauthorized`. Direkt gegen Telegram-API geprüft (`getMe`-Endpunkt) → ebenfalls 401. Der Bot-Token in `telegram_bridge/config.json` ist ungültig (Bridge-Code ist nicht die Ursache). Nächster Schritt braucht den Nutzer: neuen Token über @BotFather in Telegram holen (Details siehe unten bei „Nachrichten-Modul"). |
| Pfad-Training Modus 2: Edge-Test | ✅ In echtem Edge getestet (lokaler Test-Webserver + Browser-Automatisierung). Kernverhalten bestätigt: beliebiger Erstklick öffnet Ebene 2, falscher Zweitschritt setzt zurück, Hinweis-Button-Verhalten und Erfolgspfad-Code direkt geprüft und korrekt. Neuer UX-Befund (kein Bug): zu langes Verharren auf der Erstschritt-Kachel nach Ebene-2-Öffnung löst `dwell.js` erneut aus und springt zurück zu Ebene 1 — Beobachtung für die Praxis, kein Fix vorgenommen. Kompletter Erfolgsfall (Lob + neues Wort) nicht durchgängig automatisiert durchgeklickt, Code dafür aber verifiziert; eine kurze manuelle Bestätigung steht noch aus (Details siehe unten bei „Pfad-Training: Modus 2"). |

| Nova: echter Tobii-Gerätetest | 🔴 Avatar wird nicht angezeigt, kein Fehler-Overlay. Vermutete Ursache: `nova_avatar.glb` (16MB, nur OneDrive) evtl. nicht vollständig auf dem Tobii-Gerät synchronisiert — `showAvatar().catch()` schluckt Ladefehler still. Nutzer-Check ausstehend (Sync-Status der Datei direkt am Gerät). |
| Nova: Lautstärke-Frage | ✅ Beantwortet: 100% ist harte Web-Speech-API-Obergrenze, Regler bereits am Maximum. Mehr nur über Windows-Systemlautstärke. |
| Nova: Eigene Antwort per Tastatur | ✅ Implementiert (commit `0c2af15`). Dwell-taugliche Bildschirmtastatur als Alternative zu den 4 Antwort-Vorschlägen im normalen Gespräch. |
| Nova: Geschichten-Modul (Stufe 1) | ✅ Implementiert (commit `0c2af15`). Abschnittsweises Vorlesen mit Pausen + Diskussions-Vorschlägen, komplett lokal/offline. Erste Geschichte „Der Fluss und die Schlange" — kindgerechte Adaption von Quirogas „A la deriva" (Original zu belastend, siehe Detail-Eintrag oben bei Nova). Noch nicht live in Edge getestet. |
| Rule-13-Backlog (Regel 18) | ✅ **Komplett abgeschlossen.** Alle 48 HTML-Dateien mit Inline-`<script>` > 20 Zeilen in externe `*_mod.js`-Dateien ausgelagert — reine Struktur-Änderung, kein Verhaltenswechsel. `validate.ps1` Regel 18 vollständig grün. Details siehe unten bei „Rule-13-Backlog". |
| Rule-13-Backlog: Stichproben-Test in Edge | ✅ 8 Module aus verschiedenen Clustern live getestet (index.html, labyrinth.html [704 Zeilen, größte Datei], schach/koenig.html, eierjagd.html, einstellungen.html [inkl. onclick-Test], malen/kleckse.html, schule_mathe.html, statistik.html) — alle fehlerfrei, Interaktion (Klicks, Zustandswechsel) funktioniert überall. |
| Multi-Agenten-System: Konzept + erster Agent „Fabu" | ✅ Nutzer-Vision dokumentiert (siehe eigener Abschnitt oben), Architektur-Entscheidungen getroffen (Fabu zuerst, SVG-Avatare erstmal), Fabu implementiert + teilgetestet (Details oben bei „Multi-Agenten-System"). Nova hat die Geschichten-Funktion wieder verloren (jetzt bei Fabu) — reine Gesprächspartnerin für Allgemeines. |
| Multi-Agenten-System: Zwei-Ebenen-Gedächtnis + zweiter Agent „Milo" | ✅ Nutzer-Frage „wofür brauchen wir den Listener?" führte zu Architektur-Neubau: `listener.ps1` (v7) ist jetzt pro Route agent-parametrisiert (`body.agent`, Default `ki_gespraech`) statt Nova-fest-verdrahtet. Eltern-Zusammenfassung (`eltern_zusammenfassung.log` + zweiter Gemini-Call) **komplett entfernt** (Nutzerwunsch). Neues **gemeinsames Gedächtnis** (`app/modules/ki_agenten/gemeinsames_gedaechtnis.json`) ersetzt Novas bisheriges Pro-Agent-`gedaechtnis.json` (gelöscht) — jeder Eintrag in `letzte_gespraeche` trägt jetzt ein `"agent"`-Feld. Novas `persona.json` um `rolle` + `eroeffnung` (A/B: Check-in / Anekdote) ergänzt, dieselbe Logik zieht jetzt aus der Persona-Datei statt PowerShell-Code. Zweiter Agent **Milo** (Eule, Lernbegleiter) komplett neu gebaut: `persona.json`, `milo.html` (SVG-Avatar, teal/grün), `milo_mod.js` — inkl. `sammleLernkontext()`, das echte Fortschrittsdaten aus `window.LaetitiaStats` (Grammatik-Werkstatt) in den ersten System-Prompt einspeist. Registry + Spielewelt-Kachel ergänzt. |
| **Kritischer Bug gefunden + behoben:** `/chat/abschliessen` speicherte nie etwas | 🐛 Beim Testen der neuen Architektur entdeckt: `SchreibeJsonAntwort` (schließt die Response) wurde vor `LiesRequestBody` aufgerufen → Request-Body war beim Lesen immer leer → `$body.verlauf.Count -eq 0` griff immer → die komplette Gedächtnis-Update-Logik wurde seit jeher übersprungen. Das erklärt vermutlich, warum Novas altes `gedaechtnis.json` nie echte Inhalte angesammelt hatte. Fix: Body wird jetzt vor dem Response-Close gelesen. Mit Live-Test bestätigt: `gemeinsames_gedaechtnis.json` wird jetzt korrekt mit agent-getaggten Einträgen befüllt. |
| Milo + Nova: Live-Test in Edge (neue Architektur) | ✅ Beide Agenten komplett durchgetestet (lokaler Test-Webserver + Browser-Automatisierung): Start → Eröffnung (Milo: echter Lernkontext-Bezug; Nova: Anekdote mit „Kater Anton") → Vorschlag-Klick → Folgeantwort → bei Milo zusätzlich Eigene-Antwort-Tastatur (öffnet korrekt) → Beenden → Abschluss-Screen → `gemeinsames_gedaechtnis.json` korrekt aktualisiert (inkl. Umlaute, korrektes `"agent"`-Feld). Memory-Datei danach auf leeres Template zurückgesetzt (Repo + OneDrive). **Zwischenzeitlicher Fehlalarm:** ein einzelner isolierter Klick funktionierte immer einwandfrei; nur als mehrere Test-Requests parallel gegen den (synchron/einfädigen) Listener liefen, entstand ein Warteschlangen-Stau, der wie ein Hänger aussah — kein echter App-Bug. |

**Commits (alle gepusht):** `9363d76` (Nova-Lipsync-Fix), `9794f78` (Doku-Update), `30e8a72` (Doku Pfad-Training), `0c2af15` (Nova Tastatur + Geschichten), `a2102fc`/`e868231`/`821cee5` (Rule-13-Backlog, 48 Dateien), `12f1e18` (Doku), `1415f0e` (Fabu-Agent), `9e90b99` (Fabu Umlaut-Fix), `7191630` (Doku Fabu-Test), `e1d6941` (Doku Nova-Test), `0d9d11d` (Zwei-Ebenen-Gedächtnis + Milo-Agent)

**Sitzungsabschluss:** Alle Änderungen dieser Sitzung committed + gepusht, nach OneDrive deployed und gepinnt, `validate.ps1` grün (0 Fehler, 1 unabhängige Alt-Warnung `bad_ref_zoom2.png`). Git-Arbeitsverzeichnis sauber (`git status`: nothing to commit).

**Nächste konkrete Schritte für die Folgesitzung:** (1) Tobii-Gerätetest (Avatar-Anzeige + Dwell) — **bewusst auf spätere Sitzung verschoben**, (2) neuen Telegram-Bot-Token vom Nutzer erfragen und eintragen, (3) Pfad-Training Modus 2 — kurze manuelle Erfolgsfall-Bestätigung (optional, Code bereits verifiziert), (4) Multi-Agenten-System weiter ausbauen (Coach-Agent-Inhalte vertiefen, Registry an UI anbinden, Gruppengespräche zu 3-4).

---

## Sitzungsprotokoll 27. Juli 2026 — Sitzung 14

| Was | Ergebnis |
|---|---|
| Nova: Groq → Gemini | ✅ console.groq.com hatte serverseitigen Auth-Fehler (Stytch 503) — auf Google Gemini API umgestellt (`gemini-flash-lite-latest`), listener.ps1 v6, manuelles UTF-8-Decoding gegen Mojibake, Autostart via Task Scheduler eingerichtet |
| Nova: Stufe-1-Personalisierung, Gedächtnis, Charaktervertiefung | ✅ Stimmungen (neutral/schnippisch/ruhig/aufgeregt), datiertes Gedächtnis + Routine-Tracking, 4 neue Charakterdimensionen, kritischer Dwell-Hover-Recheck-Bug behoben (Phantom-Klick-Endlosschleife) |
| Nova: Avatar Stufe 1 (SVG) → Stufe 2 (3D) | ✅ SVG-Avatar zunächst gebaut, dann durch echten 3D-Avatar ersetzt: VRoid Studio (Nutzer gestaltet, Claude leitet an) → Blender-Konvertierung (VRM 1.0 → TalkingHead-Rig, 3 Python-Skripte) → TalkingHead+three.js als esbuild-IIFE-Bundle → Code-Integration in `ki_gespraech_mod.js`/`ki_gespraech.html` |
| Avatar-Integration: 2 Bugs gefunden+behoben | ✅ (1) esbuild `import.meta`→`{}` im IIFE-Format brach TalkingHeads internen `new URL(...)`-Aufruf (per `define` gefixt), Fehler war durch `error_handler.js`s `window.onerror` in der Konsole unsichtbar — nur über `window.LaetitiaFehler.logs()` gefunden. (2) Avatar-Container war beim Initialisieren `display:none` → Canvas blieb 0×0, TalkingHeads `onResize()` wird jetzt manuell nachgetriggert |
| validate.ps1: vendor/-Ausnahme | ✅ Regel-12-Prüfung ignoriert jetzt `vendor/`-Ordner (vorgebündelte Fremdbibliotheken) — 0 Fehler, alle 9 Prüfungen grün |
| Deployment | ✅ Alle Nova-Dateien + Bundle nach OneDrive kopiert und gepinnt |
| Aufräumen | ✅ Temporärer Build-Ordner `scratch_talkinghead_inspect/` entfernt, lokaler Test-Webserver gestoppt |
| Sitzungsabschluss | ✅ ÜBERGABE aktualisiert, Nova-Memory aktualisiert, alle Commits gepusht |

**Commits (alle gepusht):** `175ea9a`+diverse (Gemini-Umstellung, Personalisierung, Dwell-Fix, SVG-Avatar — vor dieser Protokoll-Zusammenfassung entstanden), `bb70828` (Lebenskontext + Avatar-Stufe-2-Plan), `6806f2f` (3D-Avatar-Integration), `7e9487d` (validate.ps1 vendor-Ausnahme)

**Nächste Sitzung beginnt mit:** Nova direkt am Tobii-Gerät mit Dwell testen (29.07.2026: Absturz-Bug bereits gefunden+behoben+deployed, Gesprächsablauf per Klick in echtem Edge fehlerfrei — es fehlt nur noch die Bestätigung mit echter Augensteuerung: Dwell-Timing auf den Antwort-Buttons, Mimik/Stimmungswechsel visuell am Gerät). Falls das funktioniert: Avatar Stufe 2 vollständig abgeschlossen. Danach ggf. Nachrichten-Modul-Chat-ID oder Pfad-Training-Modus-2-Test weiterführen (siehe unten, beide noch offen aus Sitzung 13).

---

## Sitzungsprotokoll 26. Juli 2026 — Sitzung 13

| Was | Ergebnis |
|---|---|
| Git push + validate | ✅ 2 Commits gepusht (63cb350, 6717d22 — Modus-0-Pfad-Anzeige + Sonne-Fix). OneDrive in Sync. |
| Pfad-Training: Modus 2 (Freies Erkunden) | ✅ Implementiert (commit `2db604a`). Jeder Erstklick öffnet Ebene 2, falscher Zweitschritt → spricht Wort + zurück, richtiger → Lob. Hinweis-Button aus Ebene 2: zurück zu E1 + Erstschritt-Blinken. **Test ausstehend.** |
| Nachrichten-Modul: Konzeption | ✅ Plattform-Vergleich (WhatsApp/Telegram/Signal/E-Mail), Architektur-Entscheidung: Telegram-Bot + lokaler Bridge-Dienst. Vollständige Kapselung — Lernplattform berührt nur Dateisystem/HTTP-localhost. |
| Nachrichten-Modul: Implementierung | ✅ `telegram_bridge/bridge.js` (Node.js-Bot + HTTP-API), `app/modules/nachrichten/` (Posteingang, Medien-Viewer, 8 Antwort-Buttons). Commit `a3b003b`. Deployed nach OneDrive. |
| Bridge-Setup | ✅ Bot `@laetitia_nachrichten_bot` erstellt. Token in config.json. npm install OK. Bridge verbindet sich mit Telegram. **Chat-ID noch nicht ermittelt** (Testnachricht ausstehend). |
| Nova: KI-Gesprächspartnerin | ✅ Implementiert (commit `175ea9a`). Groq llama-3.1-70b. Gedächtnis-Mechanismus, Eltern-Zusammenfassung, persona.json. **Groq Key noch nicht eingetragen.** |
| listener.ps1 v5 | ✅ Zwei neue Routen `/chat` + `/chat/abschliessen`. OPTIONS-Handler für POST erweitert. |
| Sitzungsabschluss | ✅ ÜBERGABE aktualisiert, alle Commits gepusht. |

**Commits (alle gepusht):** `2bbe60f` (S12-Doku), `63cb350`, `6717d22` (Modus-0-Fixes), `2db604a` (Modus 2), `a3b003b` (Nachrichten-Modul), `01c2576` (S13-Doku), `175ea9a` (Nova)

---

## Sitzungsprotokoll 6. Juni 2026 — Sitzung 11

| Was | Ergebnis |
|---|---|
| Fehlersuche Pfad-Training: Test-Infrastruktur analysiert | ✅ run_tests.ps1 (10 Phasen) + test_ebene2_alle.ps1 (37 Erstschritte) vorhanden |
| 5 ungetestete Szenarien identifiziert | ✅ falscher Zweitschritt, Weiter in Ebene 2, Hinweis in Ebene 2, fehlerCount-Reset, kachel-name-Text |
| test_luecken.ps1 erstellt (L1–L5) | ✅ Lücken-Tests committed — noch nicht ausgeführt (Edge-CDP-Problem) |
| run_tests.ps1: DevEval-Robustheit | ✅ CancellationTokenSource → CancellationToken.None (wie test_ebene2_alle.ps1) — behebt Timeout-Abbrüche |
| CDP Ghost-Evaluation Bug entdeckt | ⚠️ Stop-Process während awaitPromise:true → CDP-Session dauerhaft blockiert. Edge muss komplett neu gestartet werden. Nie mit Stop-Process abbrechen! |
| Tests ausgeführt | ⬜ Phase 1 OK (7/7 PASS), Phase 2+ nicht ausgeführt — Edge neu starten für nächste Sitzung |

**Nächste Sitzung beginnt mit:**
1. Edge mit CDP starten: `start msedge --remote-debugging-port=9222 "<training-url>"`
2. `powershell.exe -ExecutionPolicy Bypass -File .\run_tests.ps1` laufen lassen (nicht abbrechen!)
3. Danach `powershell.exe -ExecutionPolicy Bypass -File .\test_luecken.ps1`

---

## Sitzungsprotokoll 6. Juni 2026 — Sitzung 10

| Was | Ergebnis |
|---|---|
| Schadenbehebung nach S9-Batch-Fix | ✅ r1–r4 aus `.bak_alle` wiederhergestellt (39 Tiles) |
| `object-position:bottom center` entfernt | ✅ CSS-Revert (4510fa0) — hatte r6 + Artikel-Tiles (die/dem/das/den) verbrochen |
| r5-Tiles: Label-Fix v3 | ✅ fix_r5_labels_v3.py: label_end dynamisch, Bounding-Box ohne Randpixel (X_MARGIN=3), weißer 189×121px-Canvas, 20pt Calibri Bold Label unten (4940378) |
| Backups | `.bak_s9` (r5 NuVoice-Original), `.bak_alle` (r1–r4 NuVoice-Original) vorhanden |
| Skripte committed | `fix_r5_labels_v2.py`, `fix_r5_labels_v3.py`, `restore_bak_alle.py`, `restore_r5_baks9.py` |

---

## Sitzungsprotokoll 6. Juni 2026 — Sitzung 9

| Was | Ergebnis |
|---|---|
| r5-Tiles: Label oben → unten | ✅ NuVoice r5-Originale (189×79px) hatten Label oben. Canvas auf 189×121px erweitert, Label unten neu gezeichnet (fix_r5_labels.py, Calibri Bold 17pt) |
| CSS: `object-position:bottom center` | ✅ Label aller Reihen jetzt bündig am unteren Zellenrand |
| Commit | ✅ a4315fa — gepusht |

---

## Sitzungsprotokoll 6. Juni 2026 — Sitzung 7

| Was | Ergebnis |
|---|---|
| test_ebene2_alle.ps1 — Ebene-2-Test alle Erstschritte | ✅ 33/37 OK, 0 ABWEICHUNG — 4 seltene Positionen strukturell identisch zu r2c8 (OK) |
| Self-Loop-Bug im Testalgorithmus | ✅ soll-Berechnung: -1 wenn Erstschritt-Kachel auch Zweitschritt ist |
| UTF-8-BOM-Bug (PS 5.1 Umlaut-Regex) | ✅ BOM hinzugefügt — ä/ö/ü in wortOk() jetzt korrekt gelesen |
| Race-Condition-Fix (Treffer-Polling) | ✅ Polling statt fixem 700ms-Wait; Word-Change-Polling statt 110ms-Skip |
| Commit test_ebene2_alle.ps1 | ✅ 0c59a9b |
| Tile-Symbole vergrößert (10 weiße Tiles) | ✅ r6c1–c8, r3c9, r1c9: Leerraum gecroppt, Seitenverhältnis erhalten, deployed |
| Artikel-Tiles korrigiert (6 Tiles) | ✅ r4-r6 c9+c10 (der/die/das/des/dem/den): war abstr. MINSPEAK-Symbol, jetzt Wort im Kreis wie Original |
| Tobii-Vergleich | ✅ 60/60 Tiles visuell verifiziert — identisch mit Original |

---

## Sitzungsprotokoll 5. Juni 2026 — Sitzung 6

| Was | Ergebnis |
|---|---|
| `Laetitia_Entwicklung_starten.bat` Encoding-Bug | ✅ behoben — Ü war als Windows-1252 korrupt (UTF-8-Datei), neu mit korrekter Codepage geschrieben |
| analyse_optik.ps1 — Visueller Qualitätstest (11 Kriterien, CDP) | ✅ erstellt + committed (9ca9ac8) — Browser-Rendering einwandfrei, 5 reine Artefakte |
| analyse_optik.ps1 — Ebene-2-Spot-Check-Bug | ✅ behoben — „Finde: "-Prefix fehlte beim Wort-Lookup; Ebene 2 zeigt 13/13 Treffer korrekt |
| test_ebene2_alle.ps1 — Ebene-2-Test alle Erstschritte | ⚠️ Skript fertig, letzter Lauf blockiert (3 parallele Zombie-Prozesse + 3 Chrome-Tabs) |
| Erster Testlauf (fehlerhafter Algorithmus) | 33/37 Erstschritte, 27 ABWEICHUNG — alle wegen falschem Erstschritt-Lookup (.find() statt tatsächlichem Training-Pfad), kein echter Bug |
| Algorithmus-Fix | ✅ Klick-und-Prüfen-Strategie: Ebene 2 öffnet nicht → verwerfen + retry |

**Nächste Sitzung beginnt mit:** Chrome F5, ein Training-Tab, dann `test_ebene2_alle.ps1`

---

## Sitzungsprotokoll 5. Juni 2026 — Sitzung 5

| Was | Ergebnis |
|---|---|
| compare_tiles.ps1: Kachel-Bildabgleich (60 Tiles vs. data.js) | ✅ 56/60 OK — 4 BG-Abweichungen an r1c1/c2/c7/c8 (Screenshot-Vorschau-Bereich, kein Fehler) |
| Visuell: Schwarzer Block versteckter r1-Kacheln (S1: Hallo/Cool) | ✅ behoben — `.kachel-unsichtbar` zeigt weiße Leerzelle statt Body-Hintergrund (commit 4e8fa7b) |
| Visuell: Reihen-Proportionen an Original angepasst | ✅ `grid-template-rows: 214fr 121fr×5` statt `repeat(6,1fr)` — r1 nun 1,77× höher (commit 6fe095b) |
| Deployment + Browser-Test (CDP Screenshots) | ✅ Seite 1 und Seite 2 verifiziert |
| Commits | ✅ 4e8fa7b + 6fe095b |

**Noch offene optische Unterschiede (nicht kritisch):**
- Weißen Leerzellen bei r1c5/c6 auf S1 sind sichtbar (unvermeidlich mit CSS-Grid-Ansatz)
- Dark-Screenshot-Vorschau-Bereich in r1c7 (Bilder) und r1c8 (Wort) — Teil des Tile-Designs

---

## Sitzungsprotokoll 5. Juni 2026 — Sitzung 4

| Was | Ergebnis |
|---|---|
| Tests Phasen 7–10 implementiert (13 neue Tests) | ✅ 40/57 PASS — alle 15 FAIL = Datenbasis-Ambiguität, kein Code-Bug |
| Phase 7: DOM-Grundstruktur | ✅ 4/4 PASS (60 Kacheln, Attribute, Tile-Fallback, URL) |
| Phase 8: Hinweis-Button | ✅ 4/4 PASS (direkt, korrekte Kachel, 3-Falschklick, Reset) |
| Phase 9: Weiter + Zurück-Navigation | ✅ 3/3 PASS (neue Aufgabe, Ebene-1-Reset, Startscreen) |
| Phase 10: Auto-Seite, Ebene-2-Reset | ✅ 2/2 PASS + 1 WARN (r=1-Erstschritt datenabhängig) |
| Testfehler behoben: Phase 4 Zustandsreset | ✅ btnWeiter am Anfang von Phase 4 |
| Testfehler behoben: Phase 6 Loop-Blockade | ✅ btnWeiter nach FAIL gegen Datenbasis-Ambiguität |
| Commit | ✅ 7b1b0d1 — gepusht |

---

## Sitzungsprotokoll 4. Juni 2026 — Sitzung 3

| Was | Ergebnis |
|---|---|
| Automatisierte Tests Modus 1 (35 Tests, 6 Phasen) | ✅ 31/35 PASS — 4 FAIL = Datenbasis-Ambiguität (311 Doppelpfade, kein Code-Bug) |
| Bug: Stufe-1 Auto-Navigation fehlte | ✅ behoben — r=1-Kacheln auf S2/S3 waren in Stufe 1 nie erreichbar |
| Bug: zeigeEbene2 übersprang unsichtbare Kacheln | ✅ behoben — Hallo (S2) fehlte als Zweitschritt wenn S1 aktiv war |
| Commit | ✅ 1db8c5c — deployed + gepinnt |

---

## Sitzungsprotokoll 4. Juni 2026 — Sitzung 2

| Was | Ergebnis |
|---|---|
| Pfad-Training: Ebene-1-Seiten implementiert | ✅ 3 Seiten (▌▌▌-Button), r=1-Kacheln per Seite ein-/ausgeblendet |
| Pfad-Training: Ebene-2-Visualisierung | ✅ Nach richtigem Erstklick: gültige Zweitschritte hervorgehoben, Rest gedimmt |
| Pfad-Training: Auto-Navigation | ✅ Springt automatisch zur richtigen Seite pro Aufgabe |
| quasselkiste_data.js: r1c1 korrigiert | ✅ „Start" → „Standard", seiten[] an alle r=1-Kacheln |
| Commit | ✅ 272c173 — deployed + gepinnt |

---

## Sitzungsprotokoll 4. Juni 2026 — Sitzung 1

| Was | Ergebnis |
|---|---|
| Startseite: Einstellungen-Button gesperrt | ✅ `display:none` + aus Dwell entfernt + `html/body overflow:hidden touch-action:none` |
| Begrüßungsstimme: Katja-Goldstandard | ✅ Vollständiger Selektor + Aussprache „Lätitzia" (zweites T = Z) |
| Commit | ✅ c5563a6 — deployed + gepinnt |

---

## Sitzungsprotokoll 31. Mai 2026 — Sitzung 2

| Was | Ergebnis |
|---|---|
| MTI-Analyse (KG-30-05-2026.mti) | ✅ Komplett-Backup 426 MB analysiert — Format, Inhalt, Varianten dokumentiert |
| ChoiceTrainer | ✅ Externe App (LifeTool), nicht extrahierbar — in ANALYSE_MTI_QUASSELKISTE.md dokumentiert |
| „Präpositionen lernen mit Willi" (ZZ!W60_PA) | ✅ 26 Präpositionen × 3 Übungsseiten — NuVoice-internes Grammatiksystem, kein Grid-Training |
| Pfad-Training: Stufe 1 + 2 | ✅ Startscreen mit Stufenauswahl; Stufe 1 = 656 Ein-Klick-Pfade, Stufe 2 = 1.224 Zwei-Klick-Pfade |
| Commit | ✅ c82584b — deployed + gepinnt |

## Sitzungsprotokoll 31. Mai 2026 — Sitzung 1

| Was | Ergebnis |
|---|---|
| Grammatik: Freischaltungslogik entfernt | ✅ Alle Einheiten immer zugänglich — `freigegeben = true` |
| Grammatik: Stufe-0-Einheiten E-00–E-02 entfernt | ✅ 28 Aufgaben (Satz/Wort) gelöscht — zu elementar |
| Grammatik: Admin-Panel vereinfacht | ✅ Nur noch „Alle Fortschritte löschen" |
| Grammatik Stufe 8 (E-39–E-42) | ✅ 40 Aufgaben: Pronomen ich/du/er/sie/es/wir/ihr + mein/dein |
| Quasselkiste: 20 fehlende Tiles extrahiert | ✅ 60/60 Tiles aus MTC PRC — Lupe=FINDEN@, dem=dem@ |
| Pfad-Training: Tile-Bilder eingebaut | ✅ Training zeigt jetzt echte Kachelbilder statt nur Text |

---

## Sitzungsprotokoll 25. Mai 2026

| Was | Ergebnis |
|---|---|
| Grammatik: Stufen-basierte Freischaltung | ✅ Stufe 0 immer offen; Stufe N frei wenn Stufe N-1 komplett |
| STUFE_NAMEN Stufen 4–7 ergänzt | ✅ Konjugation / Plural / Groß-/Kleinschreibung / Kasus |
| Grammatik Stufe 7 (E-35–E-38) | ✅ 40 Aufgaben: Wer-Fall, Wen-Fall, Unterscheiden, Zusammenfassung |
| Admin-Panel Freischaltung | ✅ 3 Sek. Header halten → Panel mit Stufen-Freischalt-Buttons + Reset |
| Quasselkiste: NuVoice-Emulation Machbarkeitsanalyse | ⚠️ Datenbasis unvollständig — siehe unten |

### ✅ Quasselkiste — Analyse 25. Mai + Abschluss 31. Mai 2026

**Analyseergebnis (25. Mai):**

| Was | Befund |
|---|---|
| Pfade gesamt | 1.880 — nur 1- und 2-Schritt-Pfade (EQK60-Vokabular hat keine 3/4-Schritt-Pfade) |
| 3/4-Schritt-Pfade | 0 — gibt es im EQK60-Vokabular grundsätzlich nicht |
| Tile-Bilder (Ebene 1) | **60/60** ✅ — aus MTI-Analyse + MTC PRC extrahiert (31. Mai) |
| Piktogramme Ebene 2–4 | Nicht relevant — kein 2. Overlay-Layer in EQK60 |

**Abschluss (31. Mai):** Alle 20 fehlenden Tiles aus NuVoice Icon-Cache (MTC 53x44.prc) extrahiert. Lupe = FINDEN@-Icon, dem = dem@-Icon. Emulation vollständig. Pfad-Training aktiv.

## Sitzungsprotokoll 23. Mai 2026

| Was | Ergebnis |
|---|---|
| OneDrive Online-Only-Bug | ✅ `attrib +P /S /D` — alle Dateien gepinnt |
| Deployment-Anleitung | ✅ `attrib +P` als Pflichtschritt nach jedem `cp` dokumentiert |
| Grammatik Stufe 6 (E-31–E-34) | ✅ 40 Aufgaben: Groß-/Kleinschreibung — implementiert + getestet |
| Quasselkiste 60 | ✅ getestet — funktioniert |
| Pfad-Training | ✅ getestet — funktioniert |
| Quasselkiste: 11 korrupte Einträge | ✅ in beiden Modulen herausgefiltert (1.862 von 1.880 aktiv) |
| OneDrive-Deployment Quasselkiste | ✅ korrigiert (falsche Verschachtelung + kleine data.js ersetzt) |
| Link-Navigator-Guard Bug | ✅ Guard aus error_handler.js entfernt (XHR auf OneDrive-Platzhalter → fälschlicher Fehler-Overlay) |
| validate.ps1 Prüfung 9 | ✅ MD5-Sync-Check: Repo vs. OneDrive — meldet veraltete Dateien als ERR |
| Claude deployt direkt | ✅ Bash cp + attrib +P direkt ausführbar — kein manuelles Kopieren nötig |

## Sitzungsprotokoll 17. Mai 2026

| Was | Ergebnis |
|---|---|
| error_handler.js v3: Link-Navigator-Guard | ✅ XHR-Check vor Navigation, kein Browser-404 mehr |
| validate.ps1 Prüfung 8: href-Links | ✅ Sofort echten Bug gefunden (sinnesorgane_quiz.html) |
| sinnesorgane_quiz.html href-Pfad | ✅ `../sinnesorgane.html` → `sinnesorgane.html` |
| grammatik_spiel.html Redesign | ✅ Lese/Aktions-Trennung, größere Schrift 24/26px |
| grammatik_mod.js v3 | ✅ Buttons ausblenden + Auto-Weiter 3s |
| Grammatik Stufe 3 (E-15–E-20) | ✅ 60 Aufgaben: Subjekt, Prädikat, Objekt |
| Grammatik Stufe 4 (E-21–E-26) | ✅ 60 Aufgaben: Konjugation Gegenwart |
| E-15 schwieriger | ✅ 7 Aufgaben mit 5–7-Wort-Sätzen |
| index.html Begrüßung | ✅ "Lätitia" (Umlaut), Katja-Goldstandard-Stimme |
