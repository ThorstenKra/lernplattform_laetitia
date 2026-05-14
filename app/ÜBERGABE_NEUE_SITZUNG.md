# Laetitia Lernsystem — Übergabe für neue Sitzung
*Stand: 14. Mai 2026*

---

## System-Kontext

**Laetitia** ist ein Kind mit Behinderung. Tobii Accent 1400, Augensteuerung (Dwell).
Edge, `file://`, offline, Windows 11.
Pfad: `C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/`

---

## Kollaborations-Regel (Claude)

Claude beschränkt sich auf entscheidungsrelevante Ausgaben. Einzelschritte, Überlegungen und Verifikations-Logs erscheinen nicht im Chat. Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## 16 Goldstandard-Regeln

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
12. Jede HTML-Datei: `<!-- depth:N — Pfade: ../×N zu app/ -->` direkt nach `<!doctype html>` (depth 0 = in app/, 1 = modules/X/, 2 = modules/X/Y/, 3 = modules/X/Y/Z/)
13. Inline-`<script>` max. 20 Zeilen — nur Init/Config/dwell-Aufruf/localStorage-Einzeiler. Alle Logik gehört in externe `.js`-Dateien.
14. Mediendateien per `*_media_config.js` parametrisiert — nie löschen, nur `"id": false`. Neue Datei: Ordner + info.js + `<script>`-Tag + Eintrag in Config.
15. `stats.js` in jede Spielseite einbinden, die Antworten erfasst. Pflicht: `sessionStart()` beim Laden, `taskStart()` vor Aufgabe, `taskAnswer()` nach Antwort, `sessionEnd()` beim Verlassen.
16. Vor jedem `git push`: `validate.ps1` ausführen — alle 7 Prüfungen müssen grün sein.

---

## Goldstandards auf einen Blick

**Stimme:** Katja Online (Natural) → Katja → non-Hedda Microsoft → Fallback. Gilt für Aufgaben, Erläuterungen und Lob-Feedback — überall dieselbe `sprich()`-Funktion.

**Aufgaben-Reihenfolge:** Chronologisch, kein Mischen. Antwort-Optionen (A/B/C) werden zufällig gemischt.

**Überspringen-Button:** Orange, gleiche Größe wie andere Nav-Buttons, in Nav-Leiste unten. Variablen-Namen müssen zum Modul passen.

**Antwort-Layout:** Text links, Bestätigen-Button (✓) rechts als `.antwortZeile`.

**Nav-Leiste (alle Module):** `← Zurück | ✅ Weiter | → Überspringen` — immer nebeneinander in einer Zeile (`flex-direction:row`), nie gestapelt. Container: `.nav-leiste-unten#navLeiste`. CSS-Goldstandard in PROJEKT_WISSEN.md.

**Lautstärke:** Zentral über `geraete.js` (`LaetitiaGeraete.initLautstaerke()`). Zwei Profile: JBL und intern.

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

## Grammatik-Werkstatt — NEU (Sitzung 2026-05-14)

Erreichbar: `schule.html` → Grammatik-Button → `grammatik.html`

| Datei | Inhalt |
|---|---|
| `grammatik.html` | Einheiten-Übersicht, Fortschrittsanzeige, Freischalt-Logik |
| `grammatik_spiel.html` | Spielseite (URL-param `?einheit=E-00`) |
| `grammatik_data.js` | 15 Einheiten, 148 Aufgaben |
| `grammatik_mod.js` | Engine: `window.GrammatikMod.starteEinheit(id)` |
| `grammatik_uebersicht.js` | `window.GrammatikUebersicht.baueUebersicht()` |

**Lernpfad-Stand:**

| Stufe | Einheiten | Thema | Status |
|---|---|---|---|
| 0 | E-00–E-02 | Satz und Wort | ✅ 30 Aufgaben |
| 1 | E-03–E-09 | Nomen, Verben, Adjektive | ✅ 70 Aufgaben |
| 2 | E-10–E-14 | Artikel der/die/das | ✅ 50 Aufgaben |
| 3 | E-15–E-20 | Sätze bauen (Subjekt/Prädikat/Objekt) | ⬜ noch nicht implementiert |
| 4 | E-21–E-26 | Konjugation Gegenwart | ⬜ noch nicht implementiert |
| 5+ | E-27–E-61 | Plural, Groß-/Kleinschreibung, Kasus … | ⬜ noch nicht implementiert |

**5 dwell-optimierte Aufgabentypen:** `ja_nein` · `ab_wahl` · `abc_wahl` · `wort_button` · `richtig_falsch`
**Freischalt-Logik:** Vorgänger-Einheit abgeschlossen → nächste frei. ≥80% → Gold-Stern.
**Storage:** `localStorage["laetitia_grammatik_v1"]`

## Zentrale Dateien (app/core/)

| Datei | Status |
|---|---|
| `geraete.js` | ✅ Lautstärke + Bluetooth-Umschaltung |
| `dwell.js` | ✅ v10 |
| `error_handler.js` | ✅ v2 |
| `schulprofil.js` | ✅ |
| `stats.js` | ✅ window.LaetitiaStats, localStorage["laetitia_stats_v1"], 200 Sessions |

## Werkzeuge (Projektwurzel)

| Datei | Zweck |
|---|---|
| `validate.ps1` | 7 Konsistenzprüfungen: Script-Pfade, import()-Verbot, depth-Kommentar, stats.js-Referenzen, media_config-IDs. Ausführen: `powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1` |
| `app/pruefung.html` | Browser-Runtime-Check: LaetitiaAttachDwell, TTS-Stimme, localStorage, alle Core-APIs. Im Edge öffnen nach Deployment. |

## Hörbuch-Modul (app/modules/hoerbuch/)

| Datei | Status |
|---|---|
| `hoerbuch.html` | ✅ geraete.js eingebunden |
| `hoerbuch_mod.js` | ✅ auf geraete.js migriert |
| `musik.html` | ✅ geraete.js eingebunden |
| `musik_mod.js` | ✅ auf geraete.js migriert |
| `hoerbuch_glaube.html` | ✅ geraete.js eingebunden |
| `hoerbuch_glaube_mod.js` | ✅ auf geraete.js migriert |

**Eingetragene Bücher:** Das Fliegende Kamel (60 Tracks), Jaguar und NEINguar (54 Tracks), Schwänke vom Hodscha Nasredin (12 Tracks)

---

## 🔴 Offene Aufgaben — Hochpriorität

**Bluetooth-Umschaltung:**
Einziger offener Schritt — als Administrator ausführen:
```powershell
Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
```
Dann `lernwelt_starten.exe` neu starten → Audio-Dialog testen.

**Grammatik-Werkstatt: Stufe 3 implementieren (E-15–E-20)**
Nächster Block: Sätze bauen — Subjekt, Prädikat, Objekt, Satz-Reihenfolge.
Konzept vollständig in PROJEKT_WISSEN.md dokumentiert.

**Lies-mal-3 Bilder:**
- `taucher_lies`: Schätzwerte in BILD_CROP → exakt neu croppen
- Neues Buch: Seiten 2, 8, 14, 16, 22, 28 fotografieren → hochladen

**Rule-13-Backlog:** 48 HTML-Dateien mit Inline-`<script>` > 20 Zeilen. validate.ps1 meldet als WRN. Schrittweise abarbeiten.

---

## 🟡 Mittelfristig

- Mathe-Hefte digitalisieren (PDFs vorhanden) → `schule_mathe_data.js`
- Sachkunde-Bilder für 7 fehlende Themen ergänzen
- `stats.js` in weitere Spielseiten einbinden (Regel 15 vollständig umsetzen)

---

## ⬜ Noch nicht angegangen

TAGESPLAN · QUASSEL-ÜBERGANG · SONOS · AUFMERKSAMKEITS-SIGNAL (Fritz!Box)

---

## Start-Anleitung für neue Sitzung

Erste Nachricht an Claude:
> **"Lies ÜBERGABE_NEUE_SITZUNG.md und PROJEKT_WISSEN.md und fasse den Stand zusammen."**

Claude liest beide Dateien, bestätigt die 16 Goldstandard-Regeln und nennt offene Aufgaben.

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
```
Dann Edge komplett neu starten.

**Hinweis:** `.exe`, `.bat`, Mediendateien (MP3, JPG, PNG, …) stehen in `.gitignore` und bleiben lokal.
