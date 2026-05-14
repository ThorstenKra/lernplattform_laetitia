# Laetitia Lernsystem — Kollaborations-Regeln
*Stand: 14. Mai 2026*

---

## Kollaborations-Regel (Claude)

**Claude beschränkt sich auf entscheidungsrelevante Informationen.**
Einzelschritte, interne Überlegungen und Verifikations-Logs erscheinen nicht im Chat.
Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## Arbeitsweise

- **Code lebt lokal und auf GitHub** — nicht im Chat.
- Dateien werden über **Claude Code** (CLI) bearbeitet, nicht per Copy-Paste in den Chat.
- **Screenshots** (visuelle Probleme, UI-Prüfung) → über **claude.ai** zeigen.
- **Dateiarbeit** (Lesen, Schreiben, Ändern) → über **Claude Code**.

---

## Sitzungsstart

Erste Nachricht jeder neuen Sitzung:

> **"Lies ÜBERGABE_NEUE_SITZUNG.md und PROJEKT_WISSEN.md und fasse Stand zusammen."**

Claude liest beide Dateien, bestätigt die 11 Goldstandard-Regeln und nennt offene Aufgaben.

---

## 16 Goldstandard-Regeln (NIEMALS brechen)

Vollständige Dokumentation mit Code-Beispielen: `app/KOLLABORATION.md` (Abschnitt 13)

1. `dwell.js` immer `<script src="...">`, nie `import()`
2. `localStorage["laetitia_input_mode"] = "tobii"` als Standard
3. Pro Anfrage nur die genannte Datei ändern — keine anderen anfassen
4. Keine typografischen Anführungszeichen (`"` `"`) in JS — nur `"`
5. Nach Änderungen Edge komplett schließen und neu öffnen
6. Kerndateien (`dwell.js`, `error_handler.js`, `geraete.js`) NIE aus Gedächtnis — immer hochladen lassen
7. Dwell via `LaetitiaAttachDwell(selector, opts)` aus `dwell.js` v10
8. Zurück-Button: `min-height:72px`, `font-size:20px`, `width:100%`, lila `#8b5cf6 / #ede9fe`, in eigenem `.zurueck-leiste` div
9. Lob-Feedback via `LOB_TEXTE` + `zufallsLob()`, TTS wartet auf `onend`-Callback
10. `error_handler.js` in jede Spielseite einbinden
11. **Stimme Goldstandard:** Microsoft Katja Online (Natural) — vollständiger Selektor in `app/PROJEKT_WISSEN.md`
12. Jede HTML-Datei: `<!-- depth:N — Pfade: ../×N zu app/ -->` direkt nach `<!doctype html>`
13. Inline-`<script>` max. 20 Zeilen — nur Init/Config/dwell-Aufruf/localStorage. Logik → externe `.js`
14. Mediendateien per `*_media_config.js` parametrisiert — nie löschen, nur `"id": false`
15. `stats.js` in jede Spielseite einbinden, die Antworten erfasst
16. Vor `git push`: `validate.ps1` ausführen — alle 7 Prüfungen grün

---

## GitHub-Workflow

Repository: `https://github.com/ThorstenKra/lernplattform_laetitia`

Nach jeder Arbeitssitzung:
```
powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1
git add -p
git commit -m "Kurze Beschreibung der Änderungen"
git push
```

Auf dem Accent-Gerät (OneDrive-Sync-Ordner): `git pull`, dann Edge neu starten.

`.exe`, `.bat` und Mediendateien (MP3, JPG, PNG, …) sind in `.gitignore` — bleiben nur lokal.
