# NEUE SITZUNG — Schnellstart für Claude
**Stand: 2026-04-18**

**Zuerst lesen, dann bestätigen, dann arbeiten.**

---

## Schritt 1 — Lies ÜBERGABE.md vollständig

Wichtigste Abschnitte:
- ⚠️ Kritische Regeln (6 Stück)
- ⚠️ Snapshot-Limitation
- Kerndateien-Tabelle (welche Version?)
- Offene APs

---

## Schritt 2 — Bestätige die 6 Regeln

```
"Ich habe ÜBERGABE.md gelesen. Bestätige alle 6 Regeln:
1. dwell.js immer <script src>, NIE import()
2. localStorage laetitia_input_mode = tobii
3. Modularität — nur genannte Datei ändern
4. Keine typografischen Anführungszeichen in JS
5. Nach Änderung Edge komplett schließen
6. Kerndateien NIE aus Snapshot — immer hochladen lassen
Bereit für Aufgabe."
```

---

## Schritt 3 — Aufgabe annehmen

```
AP-XX: [Titel]
Datei(en): [Pfad]
Ziel: [Was danach anders ist]
Test: [Prüfschritte]
Nicht anfassen: [geschützte Dateien]
```

---

## Kerndaten auf einen Blick

| Was | Wert |
|---|---|
| Pfad | `C:/Users/ThorstenLavinia/OneDrive/2026_04_13_Laetitia_Lernsystem/app/` |
| Browser | Microsoft Edge, `file://`, Kiosk-Modus |
| Steuerung | Tobii Accent 1400 — sendet `pointerenter` |
| Dwell-Zeit | 900ms (localStorage `laetitia_dwell_ms`) |
| Session-Länge | max. 8–10 Aufgaben (Augenermüdung!) |
| dwell.js | v10 — pointerenter + mouseenter, Grace 300ms |
| moduleKit.js | v3 — erklaerung, onCorrectAnswerCb, istNurEmoji-Fix |
| Feedback | correct-flash + infoLine + TTS (Standard für alle Spielseiten) |

---

## Modul-Übersicht (Stand 2026-04-18)

| Modul | Pfad | Status |
|---|---|---|
| Deutsch | modules/deutsch/ | ✅ A1+A2+A3 |
| Lesen | modules/lesen/ | ✅ |
| Mathe | modules/mathe/ | ✅ M0a–M4 |
| Logik | modules/logik/ | ✅ |
| Schach | modules/schach/ | ✅ 6 Figuren, 89 Level |
| Labyrinth | modules/labyrinth/ | ✅ 5 Level |
| Musik-machen | modules/musik_machen/ | ✅ 3 Instrumente |
| 🆕 Englisch | modules/englisch/ | ✅ E1/E2/E3, 45 Aufgaben |
| 🆕 Schule | modules/schule/ | ✅ Lies mal 3 + Nase vorn! + Chronologie |
| Sachkunde | — | 🔜 |

---

## Schule-Modul Schnellreferenz

| Spielseite | URL-Parameter | Funktion |
|---|---|---|
| `schule_jaein.html` | `?seite=5&heft=liesmal3` | Nur Seite 5 |
| `schule_raetsel.html` | `?seite=6&heft=liesmal3` | Nur Seite 6 |
| `schule_buchstaben.html` | `?seite=7&heft=liesmal3` | Nur Seite 7 |
| `schule_mathe.html` | `?stufe=SMA1` | Stufe SMA1 |
| `schule_mathe.html` | `?seite=7&heft=nasevorn` | Seite 7 Mathe |

**heft-Schlüssel:** `liesmal3` · `nasevorn`

---

## Englisch-Modul Schnellreferenz

| Stufe | Methode | Aufgaben |
|---|---|---|
| E1 | Wort hören → Emoji wählen | 23 |
| E2 | Satz hören → Situation wählen | 12 |
| E3 | Lücke → Wort einsetzen | 10 |

TTS: `u.lang = "en-GB"` für Englisch, `"de-DE"` für Deutsch-Feedback.

---

## Nächste offene APs (Priorität)

| # | AP | Kurzbeschreibung |
|---|---|---|
| 1 | REIM-MODUL | Reimpaare, Gedichte, Witz-Bausteine — Laetitias Sprachstärke nutzen |
| 2 | TAGESPLAN | Wochentag + Aktivitäten + Bildsymbole |
| 3 | KOMM-TAFEL | Satzkommunikation nach Kategorien + TTS |
| 4 | QUASSEL-ÜBERGANG | listener.ps1 v3 mit schwarzem Bildschirm testen |
| 5 | BEFINDLICHKEITS-CHECK | Täglich: Wie geht es dir? + Körper-Schema |

---

## Sofort-Diagnose häufiger Fehler

| Symptom | Ursache | Fix |
|---|---|---|
| Dwell reagiert nicht | `attachDwell` statt pointerenter | `bindDwellEinzel()` verwenden |
| "Cannot load module" | `import()` oder `type=module` | `<script src>` |
| Falsches Feedback | `t.loesung` statt `t.richtig` | Feldname korrigieren |
| Seiten-Mix im Schule-Modul | `heft`-Feld fehlt | `heft:"liesmal3"` setzen |
| Englisch klingt deutsch | `u.lang` fehlt | `u.lang = "en-GB"` |
| Schulmodus sperrt falsch | SCHULMODUS_GESPERRT | `core/schulprofil.js` prüfen |
| Quasselkiste reagiert nicht | listener.ps1 läuft nicht | Via lernwelt_starten.exe neu starten |

---

*Bei Abweichungen gilt ÜBERGABE.md — diese Datei ist nur Schnellstart.*
