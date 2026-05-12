# Laetitia Lernsystem — Kollaborations-Regeln
*Stand: 12. Mai 2026*

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

## 11 Goldstandard-Regeln (NIEMALS brechen)

Vollständige Dokumentation mit Code-Beispielen: `app/PROJEKT_WISSEN.md`

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

---

## GitHub-Workflow

Repository: wird nach Anlage auf GitHub hier eingetragen.

Nach jeder Arbeitssitzung:
```
git add .
git commit -m "Kurze Beschreibung der Änderungen"
git push origin main
```

`.exe` und `.bat` Dateien sind in `.gitignore` — sie bleiben nur lokal.
