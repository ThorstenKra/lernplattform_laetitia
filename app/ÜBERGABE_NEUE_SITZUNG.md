# Laetitia Lernsystem — Übergabe für neue Sitzung
*Stand: 23. Mai 2026*

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

## Grammatik-Werkstatt — Stand 23. Mai 2026

Erreichbar: `schule.html` → Grammatik-Button → `grammatik.html`

| Datei | Inhalt | Version |
|---|---|---|
| `grammatik.html` | Einheiten-Übersicht, Fortschrittsanzeige, Freischalt-Logik | ✅ |
| `grammatik_spiel.html` | Spielseite (URL-param `?einheit=E-00`) — Lese/Aktions-Layout | v2 ✅ |
| `grammatik_data.js` | 35 Einheiten, 348 Aufgaben | ✅ |
| `grammatik_mod.js` | Engine: `window.GrammatikMod.starteEinheit(id)` — Auto-Weiter | v3 ✅ |
| `grammatik_uebersicht.js` | `window.GrammatikUebersicht.baueUebersicht()` | ✅ |

**Lernpfad-Stand:**

| Stufe | Einheiten | Thema | Aufgaben | Status |
|---|---|---|---|---|
| 0 | E-00–E-02 | Satz und Wort | 28 | ✅ |
| 1 | E-03–E-09 | Nomen, Verben, Adjektive | 70 | ✅ |
| 2 | E-10–E-14 | Artikel der/die/das | 50 | ✅ |
| 3 | E-15–E-20 | Sätze bauen (Subjekt/Prädikat/Objekt) | 60 | ✅ |
| 4 | E-21–E-26 | Konjugation Gegenwart | 60 | ✅ |
| 5 | E-27–E-30 | Singular & Plural | 40 | ✅ |
| 6 | E-31–E-34 | Groß-/Kleinschreibung | 40 | ✅ getestet |
| **7** | **E-35–E-38** | **Kasus (Wer-/Wen-Fall)** | — | ⬜ nächster Block |
| 8–13 | E-39–E-61 | Pronomen, Satzzeichen … | — | ⬜ |

**Grammatik-Werkstatt Features:**
- Lesebereich (grau, `pointer-events:none`) oben — Frage + Satz sind PASSIV
- Trennstreifen „👆 Deine Antwort" als sichtbare Grenze
- Aktionsbereich (weiß, dwell-aktiv) unten — nur Buttons
- Nach Antwort: Buttons vollständig ausgeblendet (`display:none`)
- 3 Sekunden nach TTS-Ende: Auto-Weiter zur nächsten Aufgabe
- Weiter-Button bleibt für sofortiges Vorwärts

## Quasselkiste / NuVoice-Emulation — Stand 23. Mai 2026

Erreichbar: `spielewelt.html` → 🗣️ Quasselkiste 60 / 🎯 Pfad-Training

| Datei | Inhalt | Status |
|---|---|---|
| `quasselkiste.html` + `quasselkiste_mod.js` | 6×10 Raster, Pfad-Aufbau, TTS | ✅ getestet |
| `quasselkiste_training.html` + `quasselkiste_training_mod.js` | Zielwort → Pfad suchen, Hinweis, Score | ✅ getestet |
| `data/quasselkiste_data.js` | 60 Kacheln + 1.862 Pfade (bereinigt) | ✅ |

**Bekannte Einschränkung:** 311 mehrdeutige Pfade (MINSPEAK-Eigenheit) — Emulation zeigt ersten Treffer.

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

## Werkzeuge (Projektwurzel)

| Datei | Zweck |
|---|---|
| `validate.ps1` | **8 Prüfungen** (NEU: Prüfung 8 — alle href-Links auf vorhandene Zieldateien). Ausführen: `powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1` |
| `app/pruefung.html` | Browser-Runtime-Check: LaetitiaAttachDwell, TTS-Stimme, localStorage. Im Edge öffnen nach Deployment. |

## Hörbuch-Modul (app/modules/hoerbuch/)

Alle Dateien: ✅ auf geraete.js migriert.
Eingetragene Bücher: Das Fliegende Kamel (60 Tracks), Jaguar und NEINguar (54 Tracks), Schwänke vom Hodscha Nasredin (12 Tracks)

---

## 🔴 Offene Aufgaben — Hochpriorität

**Grammatik-Werkstatt: Stufe 7 (E-35–E-38) — nächster Block**
Thema: Kasus (Wer-Fall / Wen-Fall Grundlagen)

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
- Grammatik Stufe 7 (E-35–E-38): Kasus

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

## GitHub-Workflow (etabliert seit Mai 2026)

GitHub: `https://github.com/ThorstenKra/lernplattform_laetitia`

Nach jeder Arbeitssitzung:
```powershell
powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1   # erst prüfen
git add app/pfad/zur/datei.js                                 # gezielt stagen
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

## Sitzungsprotokoll 23. Mai 2026

| Was | Ergebnis |
|---|---|
| OneDrive Online-Only-Bug | ✅ `attrib +P /S /D` — alle Dateien gepinnt, "Datei nicht gefunden" behoben |
| Deployment-Anleitung | ✅ `attrib +P` als Pflichtschritt nach jedem `cp` dokumentiert |
| Grammatik Stufe 6 (E-31–E-34) | ✅ 40 Aufgaben: Groß-/Kleinschreibung — implementiert + getestet |
| Quasselkiste 60 | ✅ getestet — funktioniert |
| Pfad-Training | ✅ getestet — funktioniert |
| Quasselkiste: 11 korrupte Einträge | ✅ in beiden Modulen herausgefiltert (1.862 von 1.880 aktiv) |
| OneDrive-Deployment Quasselkiste | ✅ korrigiert (falsche Verschachtelung + kleine data.js ersetzt) |

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
