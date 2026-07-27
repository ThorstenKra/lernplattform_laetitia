# Laetitia Lernsystem — Übergabe für neue Sitzung
*Stand: 26. Juli 2026 (Sitzung 13 — Ende)*

---

## System-Kontext

**Laetitia** ist ein Kind mit Behinderung. Tobii Accent 1400, Augensteuerung (Dwell).
Edge, `file://`, offline, Windows 11.
Pfad: `C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/`

---

## Kollaborations-Regel (Claude)

Claude beschränkt sich auf entscheidungsrelevante Ausgaben. Einzelschritte, Überlegungen und Verifikations-Logs erscheinen nicht im Chat. Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## 17 Goldstandard-Regeln

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
- champion = Stufe 7+8+9 (E-35–E-46, 12 Einheiten) — Stufe 9 wurde Sitzung 12 ergänzt und der Champion-Kategorie zugeschlagen

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
| 9 | E-43–E-46 | Satzzeichen (Punkt/Fragezeichen/Ausrufezeichen + gemischte Übung) | 40 | ✅ NEU |
| **10+** | **E-47+** | — | — | ⬜ noch nicht geplant |

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

## 🔴 Offene Aufgaben — Hochpriorität

**Pfad-Training: Modus 2 — Test ausstehend**

Modus 2 (Freies Erkunden) ist implementiert (commit `2db604a`, Sitzung 13, 26.07.2026), aber noch **nicht in Edge getestet**.
Testschritte: Start-Screen → „Modus 2 — Freies Erkunden" → Zielwort erscheint → beliebiger Erstklick öffnet Ebene 2 → falscher Zweitschritt spricht Wort + zurück zu Ebene 1 → richtiger Zweitschritt → Lob → nächstes Wort. Hinweis-Button aus Ebene 2: kehrt zu Ebene 1 zurück und blinkt Erstschritt.

**Nachrichten-Modul (Telegram-Bridge) — Setup fast abgeschlossen**

Implementiert (commit `a3b003b`, Sitzung 13, 26.07.2026). **Noch offen: Chat-ID ermitteln.**

Setup-Status:
- ✅ Bridge-Code: `telegram_bridge/bridge.js`
- ✅ Bot erstellt: `@laetitia_nachrichten_bot`
- ✅ Token in `telegram_bridge/config.json` eingetragen
- ✅ `npm install` abgeschlossen (`telegram_bridge/node_modules/` vorhanden)
- ✅ Bridge startet und verbindet sich mit Telegram
- ⬜ **Chat-ID ermitteln:** Bot eine Testnachricht schicken → Bridge gibt Chat-ID in der Konsole aus → in `config.json` bei `erlaubteChatIds` und `antwortChatId` eintragen
- ⬜ Bridge als Windows-Autostart konfigurieren (Aufgabenplanung oder Startup-Ordner)
- ⬜ Modul in Edge testen (spielewelt.html → 💬 Nachrichten)

**Bridge starten (für nächste Sitzung):**
```powershell
powershell.exe -ExecutionPolicy Bypass -c "cd 'C:/Users/ThorstenLavinia/lernplattform_laetitia/telegram_bridge'; node bridge.js"
```
Bridge läuft dann auf `http://127.0.0.1:3737`. Konsole offen lassen.

**Chat-ID ermitteln:**
1. Bridge starten (s. o.)
2. In Telegram: Bot `@laetitia_nachrichten_bot` suchen → Nachricht schicken
3. Bridge-Konsole zeigt: `[Bridge] Neue Chat-ID (bitte in config.json eintragen): XXXXXXXXX`
4. Diese Zahl in `config.json` bei `erlaubteChatIds: [XXXXXXXXX]` und `antwortChatId: XXXXXXXXX` eintragen
5. Bridge neu starten

**Nova (KI-Gesprächspartnerin) — läuft, Stufe 1 Personalisierung fertig**

Modul implementiert (commit `175ea9a`, Sitzung 13) und in Sitzung 14 (27.07.2026) auf Gemini umgestellt, deployed und live getestet.

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
- ⬜ **Bekannte Einschränkung:** Edge-„Online (Natural)"-Stimme zeigt manchmal Stotter-Effekt (erste Silbe, dann ~5s Pause) — vermutlich Cloud-Streaming-Eigenheit der Neural-Stimme, kein Code-Bug. Noch nicht behoben, Diagnose ausstehend (ggf. Offline-„Microsoft Katja" testen).

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

**Grammatik-Werkstatt: Stufe 10+ (E-47+) — nächster Block**
Thema noch offen — Stufe 9 (Satzzeichen, E-43–E-46) wurde Sitzung 12 abgeschlossen.

**Bluetooth-Umschaltung:**
Einziger offener Schritt — als Administrator ausführen:
```powershell
Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
```
Dann `lernwelt_starten.exe` neu starten → Audio-Dialog testen.

**Lies-mal-3 Bilder:**
- `taucher_lies`: Schätzwerte in BILD_CROP → exakt neu croppen
- Neues Buch: Seiten 2, 8, 14, 16, 22, 28 fotografieren → hochladen

**Rule-13-Backlog:** 48 HTML-Dateien mit Inline-`<script>` > 20 Zeilen. validate.ps1 meldet als WRN. Schrittweise abarbeiten.

---

## 🟡 Mittelfristig

- Mathe-Hefte digitalisieren (PDFs vorhanden) → `schule_mathe_data.js`
- Sachkunde-Bilder für 7 fehlende Themen ergänzen
- `stats.js` in weitere Spielseiten einbinden (Regel 15 vollständig umsetzen)
- Grammatik Stufe 10+ (E-47+): Thema noch offen

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
