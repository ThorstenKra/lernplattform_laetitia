# Laetitia Lernsystem — Übergabe für neue Sitzung
*Stand: 27. April 2026*

---

## System-Kontext

**Laetitia** ist ein Kind mit Behinderung. Tobii Accent 1400, Augensteuerung (Dwell).
Edge, `file://`, offline, Windows 11.
Pfad: `C:/Users/ThorstenLavinia/OneDrive/2026_04_23_Laetitia_Lernsystem/`

---

## Kollaborations-Regel (Claude)

Claude beschränkt sich auf entscheidungsrelevante Ausgaben. Einzelschritte, Überlegungen und Verifikations-Logs erscheinen nicht im Chat. Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## 11 Goldstandard-Regeln

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

## Zentrale Dateien (app/core/)

| Datei | Status |
|---|---|
| `geraete.js` | ✅ neu — Lautstärke + Bluetooth-Umschaltung |
| `dwell.js` | ✅ v10 |
| `error_handler.js` | ✅ |
| `schulprofil.js` | ✅ |

## Hörbuch-Modul (app/modules/hoerbuch/)

| Datei | Status |
|---|---|
| `hoerbuch.html` | ✅ geraete.js eingebunden |
| `hoerbuch_mod.js` | ✅ auf geraete.js migriert |
| `musik.html` | ✅ geraete.js eingebunden |
| `musik_mod.js` | ✅ auf geraete.js migriert |
| `hoerbuch_glaube.html` | ✅ geraete.js eingebunden |
| `hoerbuch_glaube_mod.js` | ✅ auf geraete.js migriert |

**Neue Bücher heute eingetragen:** Das Fliegende Kamel (60 Tracks), JAguar und NEINguar (54 Tracks), Schwaenke Und Anekdoten Vom Hodscha Nasredin (12 Tracks)

---

## 🔴 Offene Aufgabe — Bluetooth (HOCHPRIORITÄT)

Alle Dateien deployed. Einziger offener Schritt:
```powershell
Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
```
Als Administrator ausführen → `lernwelt_starten.exe` neu starten → Audio-Dialog testen.

---

## 🔴 Offene Aufgabe — Lies-mal-3 Bilder

- `taucher_lies` hat noch Schätzwerte im BILD_CROP → neu croppen
- Neues Buch kaufen → Seiten 2, 8, 14, 16, 22, 28 fotografieren → hochladen

---

## 🟡 Mittelfristig

- Mathe-Hefte digitalisieren (PDFs vorhanden)
- Sachkunde-Bilder für 7 fehlende Themen ergänzen

---

## ⬜ Noch nicht angegangen

TAGESPLAN · QUASSEL-ÜBERGANG · SONOS · AUFMERKSAMKEITS-SIGNAL (Fritz!Box)

---

## Start-Anleitung für neue Sitzung

1. `ÜBERGABE.md` und `PROJEKT_WISSEN.md` hochladen → Claude liest und bestätigt
2. Zu bearbeitende Dateien hochladen (nie aus Gedächtnis arbeiten)
3. Aufgabe nennen

**Wichtig:** Claude arbeitet nie aus dem Gedächtnis an Kerndateien. Immer erst hochladen.

---

## GitHub-Workflow

Nach jeder Arbeitssitzung Änderungen sichern:

```powershell
git add .
git commit -m "Kurze Beschreibung der Änderungen"
```

Remote einrichten (einmalig, nach Anlage des Repos auf GitHub):
```powershell
git remote add origin [GitHub-URL]
git push -u origin main
```

Danach bei jedem Push:
```powershell
git push origin main
```

**Hinweis:** `.exe` und `.bat` Dateien stehen in `.gitignore` und bleiben lokal. Das Remote-Repo enthält nur den Quellcode.
