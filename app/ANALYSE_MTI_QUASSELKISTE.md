# MTI-Analyse: KG-30-05-2026.mti
*Analysiert: 31. Mai 2026*

---

## Was ist die Datei?

**Datei:** `C:\Users\ThorstenLavinia\OneDrive\2026_05_12_Lernsystem\KG-30-05-2026.mti`
**Größe:** 426 MB (komprimiert)
**Format:** NuVoice v500 — Komplett-Backup des Tobii Accent 1400
**Inhalt:** Zlib-komprimiertes XML/INI + eingebettete PNG-Bilder (aller Icons)
**Identifiziertes Vokabular:** EQK60neu.119 (Enkelbogen Quasselkiste 60, Version 1.3, Datum: 2020-05-26)

---

## Technischer Aufbau

```
Byte 0–13:  "v500 6 NUVOICE"   (ASCII-Header)
Byte 14–15: 0D 0A              (CRLF)
Byte 16–19: 14 DD 92 1C        (Prüfsumme/Größe)
Byte 20–21: 0D 0A              (CRLF)
Byte 22–23: 78 01              (zlib-Header, Deflate low compression)
Byte 24+:   Deflate-Stream     (XML + INI + PNG-Binärdaten)
```

Dekomprimierung: `DeflateStream` ab Byte 24 (zlib-Header überspringen), Textteil als UTF-16 lesen.

---

## Enthaltene Vokabular-Varianten

| Name | Beschreibung |
|---|---|
| `Quasselkiste 60 Plus neu` | Erweiterte Plus-Version der EQK60 |
| `Quasselkiste 60 Metacom` | Metacom-Symbol-Version |
| `Quasselkiste 60 einfach` | Vereinfachte Version |
| `Quasselkiste 60 einfach (ohne Grammatik)` | Vereinfacht, ohne Grammatikseiten |
| `Quasselkiste 45 V2.0` | **Anderes Raster — 45 Kacheln** (nicht analysiert) |
| `CHOICETRAINER - Lernpaket für EQK60` | Externer Launcher (s.u.) |

### Zwei Startseiten-Varianten der EQK60

| Interne ID | Angezeigter Name | Vollständiger Name |
|---|---|---|
| `m > CS` | Startseite Quasselkiste 60 | Startseite der Quasselkiste 60 mit Ikonennamen |
| `m - CQ` | Startseite mit Kategorien | Startseite der Quasselkiste 60 mit Kategorien |

→ **Beide Varianten nutzen dieselben 60 Kacheln** — nur optisch unterschiedlich (Text-Labels vs. Farb-Kategorien).

---

## Was wurde bereits extrahiert (✅ vollständig)

- **60/60 Tile-Bilder** — Icons der Standard-EQK60
- **1.880 Pfade** — komplettes Vokabular (1- und 2-Schritt-Pfade)
- **Keine versteckten Overlay-Seiten** — EQK60 hat nur ein einziges 6×10-Raster für die Kommunikation

---

## ChoiceTrainer

**Was es ist:** Externe Windows-Anwendung von LifeTool Solutions (kein eingebetteter Inhalt in der MTI)

**Pfad auf dem Tobii Accent:**
```
%ProgramFiles%\LifeTool\ChoiceTrainer AAC\DE_DE\bin\ChoiceTrainer.exe
```

**Status auf dem Entwicklungsrechner:** NICHT installiert.

**Zugang:** Nur über den NuVoice-Button auf dem Tobii Accent selbst startbar.
Infos: `www.prentke-romich.de/willkommen`

---

## „Präpositionen lernen mit Willi" (ZZ!W60_PA-System)

**Was es ist:** Ein in NuVoice eingebettetes Grammatik-Lernsystem — KEIN Pfad-Navigations-Training.

**Charakter:** „Willi" (Junge-Icon) führt durch Satz-Aufgaben mit Präpositionen.

**Seitenstruktur je Aufgabe:**
```
[START/Neustart]  [Willi → ZZ!W60_PA (Wortauswahl)]  [Lernen → ZZ!L60_[wort]1]  [weiter → ZZ!W60_[wort]2]
```

**Identifizierte Präpositionen (je 3 Übungsseiten):**

| Präposition | Übungsseiten | Lernseite |
|---|---|---|
| ab | ZZ!W60_ab1/2/3 | ZZ!L60_ab1 |
| an | ZZ!W60_an1/2/3 | ZZ!L60_an1 |
| auf | ZZ!W60_auf1/2/3 | ZZ!L60_auf1 |
| aus | ZZ!W60_aus1/2/3 | ZZ!L60_aus1 |
| außer | ZZ!W60_ausser1/.. | ZZ!L60_ausser1 |
| bei | ZZ!W60_bei1/2/3 | ZZ!L60_bei1 |
| bis | ZZ!W60_bis1/2/3 | ZZ!L60_bis1 |
| durch | ZZ!W60_durch1/2/3 | ZZ!L60_durch1 |
| für | ZZ!W60_für1/2/3 | ZZ!L60_für1 |
| gegen | ZZ!W60_gegen1/2/3 | ZZ!L60_gegen1 |
| hinter | ZZ!W60_hinter1/2/3 | ZZ!L60_hinter1 |
| in | ZZ!W60_in1/2/3 | ZZ!L60_in1 |
| mit | ZZ!W60_mit1/2/3 | ZZ!L60_mit1 |
| nach | ZZ!W60_nach1/2/3 | ZZ!L60_nach1 |
| neben | ZZ!W60_neben1/2/3 | ZZ!L60_neben1 |
| ohne | ZZ!W60_ohne1/2/3 | ZZ!L60_ohne1 |
| seit | ZZ!W60_seit1/2/3 | ZZ!L60_seit1 |
| statt | ZZ!W60_statt1/2/3 | ZZ!L60_statt1 |
| trotz | ZZ!W60_trotz1/2/3 | ZZ!L60_trotz1 |
| über | ZZ!W60_über1/2/3 | ZZ!L60_über1 |
| um | ZZ!W60_um1/2/3 | ZZ!L60_um1 |
| unter | ZZ!W60_unter1/2/3 | ZZ!L60_unter1 |
| von | ZZ!W60_von1/2/3 | ZZ!L60_von1 |
| vor | ZZ!W60_vor1/2/3 | ZZ!L60_vor1 |
| zwischen | ZZ!W60_zwi1/2/3 | ZZ!L60_zwi1 |
| zu | ZZ!W60_zu1/2/3 | ZZ!L60_zu1 |

**→ Für das Pfad-Training nicht direkt nutzbar** — es handelt sich um Satzgrammatik, nicht um Grid-Navigation.

---

## Weitere ZZ!-Seiten (interne NuVoice-Seiten)

| Seite | Bedeutung |
|---|---|
| ZZ!JONAS-LEA | Personalisierter Wortschatz (Familienmitglieder?) |
| ZZ!KALENDER | Kalender-Modul |
| ZZ!SCHRIFT | Schreib-/Buchstabierfunktion |
| ZZ!SCHULHEFTE | Schulheft-Dialeiste |
| ZZ!STICKER | Computer-Funktion-Sticker |
| ZZ!UHR | Uhrzeitmodul |

---

## Fazit: Was können wir für das Pfad-Training nutzen?

| Quelle | Nutzbar? | Anmerkung |
|---|---|---|
| 60 Tile-Bilder | ✅ bereits implementiert | Vollständig |
| 1.880 Pfade | ✅ bereits implementiert | Vollständig |
| ChoiceTrainer | ❌ | Externe App, nur auf Tobii Accent |
| W60_PA Präpositionen | ⚠️ indirekt | Zeigt welche Wörter wichtig sind |
| Quasselkiste 45 | ⬜ nicht extrahiert | Anderes Raster, eigene Analyse nötig |

**Empfehlung für nächste Sitzung:**
Das Pfad-Training auf Basis der 1.880 Pfade selbst aufbauen:
1. **Stufe 1:** Nur 1-Schritt-Pfade (direkt eine Kachel drücken)
2. **Stufe 2:** 2-Schritt-Pfade mit häufig genutzten Wörtern
3. **Kategorien-Filter:** Nach Themenbereich üben (Verben, Pronomen, Alltagswörter)

Die Präpositionen-Liste aus W60_PA liefert Hinweise auf pädagogisch wichtige Zielwörter.

---

## Offene Analyse-Fragen

- [ ] W60/L60-Seiten vollständig extrahieren (Hintergrundprozess lief noch)
- [ ] Quasselkiste 45 analysieren (eigenes 45-Kacheln-Raster)
- [ ] „Wortspiele-Sammlung" analysieren (möglicherweise spielerische Pfad-Aufgaben)
- [ ] ChoiceTrainer auf dem Tobii Accent direkt inspizieren
