# Laetitia Lernsystem — Übergabe
**Stand: 2026-04-18 (Sitzung 2)** | Einzige aktuelle Wahrheitsquelle

---

## ⚠️ KRITISCHE REGELN — vor jeder Sitzung bestätigen

```
☐ REGEL 1:  dwell.js IMMER als <script src="...">, NIE per import() oder type="module"
☐ REGEL 2:  localStorage["laetitia_input_mode"] = "tobii" (default) oder "mouse" (Test)
☐ REGEL 3:  Modularität — Änderungen betreffen NUR die genannte Datei
☐ REGEL 4:  Keine typografischen Anführungszeichen „..." in JS → Syntaxfehler
☐ REGEL 5:  Nach Änderungen Edge komplett schließen (kein Firefox!)
☐ REGEL 6:  Kerndateien NIE aus dem Snapshot nehmen — IMMER vom Nutzer hochladen lassen!
☐ REGEL 7:  Augensteuerung IMMER via LaetitiaAttachDwell (dwell.js v10) — KEINE eigene bindDwellEinzel!
☐ REGEL 8:  Zurück-Button IMMER unten als großer lila Button — NIE in der Topbar!
☐ REGEL 9:  Feedback IMMER mit LOB_TEXTE + zufallsLob() — TTS wartet auf onend vor nächster Aufgabe!
☐ REGEL 10: error_handler.js in JEDE neue Spielseite — nach dwell.js, vor Modul-Scripts!
```

**Neue Sitzung:** Claude liest diese Datei → bestätigt **10 Regeln** → wartet auf Aufgabe.

---

## ⚠️ Snapshot-Limitation — KRITISCH

`/mnt/project/` enthält einen **veralteten Snapshot** — niemals als Basis für Kerndateien verwenden.
Claude fragt IMMER nach, bevor er eine Datei als fehlend deklariert.

**Kerndateien — IMMER vom Nutzer hochladen lassen:**

| Datei | Aktueller Stand |
|---|---|
| `core/moduleKit.js` | v3: pointerenter-Dwell, 900ms, onCorrectAnswerCb, erklaerung, setFeedback, flashSymbol, istNurEmoji(Ziffern-Fix) |
| `core/audioQueue.js` | v2: play(items, onDone) — onDone-Callback nach Queue-Ende |
| `core/dwell.js` | v10: mouseenter+pointerenter dedupliziert (30ms), pointerLeaveGrace=300ms |
| `core/error_handler.js` | v2: onerror+promise+TTS-Watchdog(12s)+Alive-Monitor(60s)+Diagnose-Panel |
| `core/schulprofil.js` | v1: Schulmodus-Logik, SCHULMODUS_GESPERRT-Liste |
| `modules/mathe/mathe_module.js` | v3: Zähl-Animation, abbrechenZaehlAnimation, Emoji-Namen-TTS |
| `index.html` | v2026-04-17: 8 Buttons (4×2), Schule-Button, Schulmodus-Logik |
| `lernen.html` | v2026-04-18: mit Englisch-Button, ohne Schule-Button, ohne Schulmodus-Code |

---

## Projektkontext

- **Nutzer:** Laetitia, Kind mit motorischer Beeinträchtigung (Grundschulalter)
- **Steuerung:** Tobii Accent 1400 / NuVoice (Blicksteuerung)
- **Kommunikation:** Großer aktiver + passiver Wortschatz, grammatikalisch richtige Sätze, subtile Situationsbewertung und Gefühlsäußerungen. Sprache durch Imitation erlernt (nicht durch bewusste Grammatikreflexion).
- **Stärken:** Humor, Freude an Sprache und Reimen, Neugier, intrinsische Motivation
- **Laufumgebung:** `file://` in Microsoft Edge — kein Server, kein Internet
- **Technologie:** Reines HTML/CSS/JS, offline. Kein React, kein webpack.
- **Pfad:** `C:/Users/ThorstenLavinia/OneDrive/2026_04_13_Laetitia_Lernsystem/app/`
- **Zwei Geräte:** Asus Expert Book (Entwicklung) + Tobii Accent (Betrieb) → OneDrive-Sync
- **Rollstuhl:** Manuell — kein eigenständiger Positionswechsel im Haus

---

## ⭐ Quasselkiste-Integration — VOLLSTÄNDIG ✅

**Status: Fertig und getestet (2026-04-13)**

**Funktionierender Ablauf:**
```
NuVoice → lernwelt_starten.exe
  → Edge öffnet sich im Kiosk-Vollbild
  → listener.ps1 startet unsichtbar (powershell.exe)

Laetitia drückt 💬 Quasselkiste-Button
  → fetch("http://localhost:9999/zurueck")
  → listener.ps1 empfängt Signal
  → taskkill msedge
  → NuVoice.exe startet → bringt sich selbst vorne
```

**Dateien in `app/`:**

| Datei | Beschreibung |
|---|---|
| `lernwelt_starten.bat` → `.exe` | Startet Edge + listener.ps1 |
| `listener.ps1` | HTTP-Listener — wartet auf Signal, beendet Edge, startet NuVoice |
| `index.html` | 💬 Quasselkiste-Button mit fetch localhost:9999 |

**listener.ps1 — Inhalt:**
```powershell
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:9999/')
$listener.Start()
$ctx = $listener.GetContext()
$ctx.Response.Headers.Add('Access-Control-Allow-Origin', '*')
$buf = [System.Text.Encoding]::UTF8.GetBytes('ok')
$ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
$ctx.Response.Close()
$listener.Stop()
Start-Sleep -Milliseconds 300
Stop-Process -Name msedge -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 800
Start-Process 'C:\Program Files (x86)\Prentke Romich Company\NuVoice\NuVoice.exe'
```

**Wichtige Details:**
- NuVoice-Pfad: `C:\Program Files (x86)\Prentke Romich Company\NuVoice\NuVoice.exe`
- Beim ersten Start: Windows Firewall fragt → einmal "Erlauben"
- Langer PS-Befehl in BAT → immer in `.ps1` auslagern
- `quasselkiste_starten.exe` wird nicht mehr benötigt

**PENDING:** listener.ps1 v3 mit schwarzem Übergangsbildschirm (verhindert ungewollte Blick-Auslösung) noch nicht getestet.

---

## ⭐ Schulmodus-System — VOLLSTÄNDIG ✅

**Status: Fertig (2026-04-17)**

```
SCHULMODUS_GESPERRT = ["lernen", "spiele", "entertain", "kreativ", "glaube"]
Frei bleiben immer: "schule" + "quassel"
Zeitfenster: 08:30–15:30
```

Schultage eintragen: `einstellungen.html` → Schultage-Kalender (3-Monats-Ansicht)

---

## ⭐ Schule-Modul — VOLLSTÄNDIG ✅ (Stand 2026-04-23)

**Status: Erweitert und umgebaut (2026-04-23)**
**Pfad:** `app/modules/schule/`

### Neue 3-Ebenen-Navigation

```
schule.html                    ← Ebene 1: 4 Fächer (2×2, kein Scrollen)
├── schule_deutsch.html        ← Ebene 2: Lies mal 3, Lies mal 1+2 (reserviert)
│   ├── schule_jaein.html      ← Ja/Nein (60 Aufgaben)
│   ├── schule_raetsel.html    ← Was bin ich? (12 Aufgaben)
│   ├── schule_buchstaben.html ← Buchstabenrätsel
│   └── schule_lies.html       ← Lies und leuchte (6 Texte)
├── schule_mathe_uebersicht.html ← Ebene 2: SMA1–SMA6 + Alle
│   └── schule_mathe.html      ← Spielseite (unverändert)
├── schule_sachkunde.html      ← Ebene 2: Frühling Texte + Kärtchen
│   └── schule_lesen.html      ← Spielseite: Text lesen/hören + Fragen
└── schule_chronologie.html    ← unverändert
```

### Neue Dateien (2026-04-23)

| Datei | Beschreibung |
|---|---|
| `schule_deutsch.html` | NEU — Zwischenebene Deutsch |
| `schule_mathe_uebersicht.html` | NEU — Zwischenebene Mathe |
| `schule_lesen.html` | NEU — Sachkunde-Spielseite |
| `schule_lesen_data.js` | NEU — 28 Aufgaben (20 Texte + 8 Kärtchen) |
| `schule_lesen_bilder.js` | NEU — 10 Fotos Base64 aus PDF-Scans, 121KB |

### Sachkunde-Aufgaben

| Heft-Kürzel | Themen | Aufgaben |
|---|---|---|
| `sachkunde_fruehling` | Kleidung, Frühblüher, Tulpe, Erdbeere, Ostern, Marienkäfer, Frühlingszeit, Baum, Himbeereis, Igel | 20 (10×2) |
| `sachkunde_lesekarten` | Wiese, Apfelbaum, Gänseblümchen, Kirschbaum, Hyazinthe, Narzisse, Krokus, Tulpe | 8 |

**Bilder:** Direkt aus Schulmaterial-PDFs extrahiert (Base64, offline, kein externer Server)

### Geänderte Dateien (2026-04-23)

Alle folgenden Dateien haben **nur** ihre Zurück-Links geändert (`schule.html` → `schule_deutsch.html`):
`schule_jaein.html`, `schule_raetsel.html`, `schule_buchstaben.html`, `schule_lies.html`, `schule_mathe.html`

Zusätzlich in `schule_jaein.html` gefixt:
- `bindDwellButtons` war undefiniert → als Alias auf `rebindDwell()` ergänzt
- TTS-Watchdog eingebaut (onend-Bug in Edge)
- Schriftgrößen harmonisiert
- Zeilennummer aus Zurück-Button-Text entfernt (sed-Werkzeugfehler)

---

## ⭐ Englisch-Modul — VOLLSTÄNDIG ✅

**Status: Fertig (2026-04-18)**
**Pfad:** `app/modules/englisch/`

```
modules/englisch/
├── englisch.html       ← Spielseite mit 3 Stufen
└── englisch_data.js    ← 45 Aufgaben (E1: 23, E2: 12, E3: 10)
```

**Leitprinzip:** Kein Grammatikunterricht. Englisch durch Imitation und Klang — wie Laetitia Deutsch gelernt hat. Comprehensible Input nach Krashen.

**3 Stufen:**

| Stufe | Methode | Aufgaben |
|---|---|---|
| E1 — Wörter hören | TTS spricht Wort → Emoji-Paar wählen | 23 (Tiere, Essen, Natur, Gefühle) |
| E2 — Sätze verstehen | TTS spricht Satz → Emoji-Situation wählen | 12 |
| E3 — Sätze bauen | Satz mit Lücke → richtiges englisches Wort wählen | 10 |

**Technische Besonderheiten:**
- TTS mit `lang:"en-GB"` — englische Stimme für Englisch
- 🔊 "Nochmal hören"-Button auf jeder Aufgabe
- Bei falscher Antwort: richtiger Button blinkt grün + TTS spricht Lösung auf Englisch + kurz Deutsch
- Emoji-Positionen zufällig getauscht (links/rechts)
- `lernen.html` → neuer 🇬🇧 Englisch-Button

**Dateiformat E1/E2:**
```javascript
{ stufe:"E1", thema:"tiere",
  text:"a cat", tts_en:"a cat",
  emoji_richtig:"🐱", emoji_falsch:"🐶",
  label_richtig:"cat", label_falsch:"dog",
  erklaerung_de:"Eine Katze" }
```

**Dateiformat E3:**
```javascript
{ stufe:"E3", thema:"alltag",
  text:"I sleep in my ___.", tts_en:"I sleep in my",
  antwort_a:"bed", antwort_b:"shoe", antwort_c:"garden",
  richtig:"A", tts_komplett:"I sleep in my bed.",
  erklaerung_de:"Ich schlafe in meinem Bett." }
```

---

## ⭐ Navigations-Architektur

```
index.html  (8 Buttons, 4×2 Grid)
├── 🎓 Lernen      → deutsch / lesen / mathe / logik / sachkunde / 🇬🇧 englisch (NEU)
├── 🎮 Spielewelt  → memory / puzzle / schach / eierjagd / labyrinth
├── 🎭 Entertainment → hoerbuch / musik / fotoalbum
├── 🎨 Kreativität → malen / musik_machen
├── ✝️ Glaube      → psalmen / chr.lieder / hoerbuecker
├── 🏫 Schule      → schule.html (IMMER verfügbar, auch im Schulmodus)
├── 💬 Quassel     → listener.ps1 → NuVoice
└── ⚙️ Einstellungen (Statusbar)

Schulmodus sperrt: Lernen / Spielewelt / Entertainment / Kreativität / Glaube
```

---

## ⭐ Vollständige Verzeichnisstruktur (Stand 2026-04-18)

```
app/
├── index.html               ← 8 Buttons, Schulmodus, Quasselkiste
├── lernen.html              ← + Englisch-Button
├── spielewelt.html
├── entertainment.html
├── glaube.html
├── kreativitaet.html
├── einstellungen.html       ← Schultage-Kalender
├── glossar.html
├── ÜBERGABE.md
├── KOLLABORATION.md
├── NEUE_SITZUNG_ANLEITUNG.md
├── lernwelt_starten.bat → .exe
├── listener.ps1
│
├── core/
│   ├── dwell.js v10
│   ├── moduleKit.js v3
│   ├── audioQueue.js v2
│   ├── schulprofil.js
│   └── return.js / dataRegistry.js / config.js / storage.js
│
└── modules/
    ├── deutsch/             ← A1(30) · A2(30) · A3(100 Johannes+Matthäus)
    ├── mathe/               ← M0a→M4, mathe_module.js v3
    ├── lesen/
    ├── logik/
    ├── hoerbuch/
    ├── musik/
    ├── memory/
    ├── puzzle/
    ├── malen/
    ├── Fotos/
    ├── Glaube/
    ├── schach/              ← alle 6 Figuren, 89 Level BFS-verifiziert ✅
    ├── labyrinth/           ← 5 Level ✅
    ├── musik_machen/        ← loop_baukasten, xylophon, melodie_maler ✅
    ├── englisch/            ← NEU ✅ (E1/E2/E3, 45 Aufgaben)
    └── schule/              ← NEU ✅ (Lies mal 3 + Nase vorn! + Chronologie)
```

---

## ⭐ Feedback-Muster (Standard für alle Spielseiten)

```
Richtig:
  → gewählter Button: correct-flash (grün blinken, 450ms)
  → infoLine: "✓ Richtig! [Erklärung]" (grüner Hintergrund)
  → TTS: "Das ist richtig! [Erklärung]"

Falsch:
  → gewählter Button: falsch-gewaehlt (rot)
  → RICHTIGER Button: correct-flash (grün blinken) ← immer!
  → infoLine: "✗ Falsch. Richtig wäre: X — [Erklärung]" (roter Hintergrund)
  → TTS: "Das ist leider falsch. Richtig wäre: X. [Erklärung]"
```

---

## ⭐ Schach — alle 6 Figuren

| Figur | Storage | Level |
|---|---|---|
| König ♔ | `koenig_v2` | 14 |
| Turm ♖ | `turm_v1` | 15 |
| Läufer ♗ | `laeufer_v1` | 15 |
| Springer ♘ | `springer_v1` | 15 |
| Dame ♕ | `dame_v1` | 15 |
| Bauer ♙ | `bauer_v1` | 15 |

---

## ⭐ Dwell-Zeiten

| Bereich | Zeit |
|---|---|
| Alle Übersichtsseiten, Spielseiten | 900ms (direktes pointerenter) |
| Hörbuch / Musik-Player | 1600ms (attachDwell) |
| Malen-Module | ~700ms (attachDwell) |

---

## Häufige Fallstricke

| # | Problem | Lösung |
|---|---|---|
| 1 | `import()` bei `file://` | Nie verwenden, immer `<script src>` |
| 2 | Typografische Anführungszeichen in JS | `"..."` statt `„..."` |
| 3 | Edge-Cache | Komplett schließen nach Änderung |
| 4 | `attachDwell` auf Tobii | → direktes pointerenter |
| 5 | Mehrere `attachDwell()`-Aufrufe | Singleton — nur EIN Aufruf |
| 6 | Relative Pfade in localStorage | `new URL().href` verwenden |
| 7 | `kap.name` statt `kap.titel` | `kap.titel` Pflicht im Hörbuch |
| 8 | Zurück-Button oben | `.topbar` NACH boardWrap im HTML |
| 9 | `audio.volume` vor `loadedmetadata` | Erst im Event setzen |
| 10 | Stufennamen gemischt | Deutsch=A1-A3, Mathe=M0a-M4, Schule=SL_*/SMA*, Englisch=E1-E3 |
| 11 | Umlaute in Ordnernamen | ae/oe/ue/ss + Unterstrich |
| 12 | `loesung:` statt `richtig:` | moduleKit liest `t.richtig` |
| 13 | `erklaerung` + Zahl als Antwort | `istNurEmoji()` — Ziffern sind NICHT Emoji |
| 14 | `symbolFlash`-Div fehlt | Aus logik.html kopieren |
| 15 | Return-URL falsch | Übersichtsseite setzt sich selbst als Return-URL |
| 16 | PowerShell + Umlaut-Pfade | Erst im Explorer umbenennen |
| 17 | data-pdwell bleibt nach render() | Bei Screen-Wechsel alle data-pdwell entfernen |
| 18 | Labyrinth nicht lösbar | IMMER BFS-Prüfung vor Einbau neuer Level! |
| 19 | Deutsch A1/A2 nicht ersetzt | Ladereihenfolge: basis → A2 → A1 |
| 20 | spielewelt → direkt König | Link muss auf schach.html zeigen |
| 21 | Bauer-Schlag falsch | Schlag NUR wenn Ziel exakt auf [r-1, c±1] |
| 22 | Kiosk + window.close() | Blockiert → HTTP-Listener + listener.ps1 |
| 23 | Bat-to-Exe + langer PS-Befehl | PS-Code in separate .ps1 auslagern |
| 24 | NuVoice-Fenster nicht vorne | NuVoice neu starten |
| 25 | Schule-Seitenzahlen gemischt | IMMER `heft`-Feld setzen |
| 26 | Schulmodus sperrt falsch | SCHULMODUS_GESPERRT in `core/schulprofil.js` prüfen |
| 27 | Englisch-TTS deutsch klingend | `u.lang = "en-GB"` + passende Stimme suchen |
| 28 | Eigene Dwell-Funktion statt dwell.js | IMMER `LaetitiaAttachDwell` — nie `bindDwellEinzel` selbst schreiben |
| 29 | Zurück-Button oben in Topbar | IMMER unten als großer lila Button (`min-height:70px`, lila) |
| 30 | Falscher Pfad im Zurück-Button | Spielseite→`./[uebersicht].html`, Übersicht→`../../lernen.html` |
| 31 | Fixer setTimeout für nächste Aufgabe | IMMER `sprich(text, danach)` + onend — nie `setTimeout(fn, 3000)` |
| 32 | Flaches Lob ("Richtig!") | IMMER `LOB_TEXTE` + `zufallsLob()` |
| 33 | Übersichtsseite scrollt aus Bildschirm | `overflow:hidden` + `flex-column` + `scroll-bereich flex:1 overflow-y:auto` |
| 34 | Fehler → Laetitia steckt fest | `error_handler.js` in jede Seite → Not-Overlay + Zurück-Button |
| 35 | TTS-Ordinalzahl (Dritter statt 3) | `ttsAntwort(s)`: reine Zahl → "die Zahl X" |
| 36 | TTS hängt, onend feuert nie | `LaetitiaSprich.wrap(u, danach)` — Watchdog nach 12s |
| 37 | Umlaute als ae/oe/ue in sichtbaren Texten | Immer echte Umlaute ä/ö/ü/ß in Strings und HTML |

---

## Abgeschlossene Arbeitspakete

### 2026-04-11
DWELL-v10 · KOENIG-DWELL2 · TURM-NEU · SCHACH-RETURN · MODULEKIT-v3 · DEUTSCH-A2 · DEUTSCH-FLASH · MUSIK-MACHEN · UEBERSICHTEN

### 2026-04-12
MUSIK-XYLO · MUSIK-MALER · LABYRINTH · DEUTSCH-A1 · MATHE-M0F · SCHACH-LAEUFER · SCHACH-SPRINGER · SCHACH-DAME · SCHACH-BAUER · FOTO-DWELL-FIX · QUASSELKISTE-VORBEREITUNG

### 2026-04-13
KIOSK-TEST ✅ · QUASSELKISTE-INTEGRATION ✅

### 2026-04-17
SCHULMODUS ✅ · SCHULE-MODUL ✅ · INDEX-8-BUTTONS ✅ · CHRONOLOGIE ✅

### 2026-04-18
ENGLISCH-MODUL ✅ · STRATEGIE-KONZEPT (Autonomie-Erweiterung) ✅
REIM-MODUL ✅ (4 Modi, 47 Aufgaben, in lernen.html eingebunden) ·
DWELL-FIX ✅ (alle Module: LaetitiaAttachDwell, Regel 7) ·
ZURUECK-FIX ✅ (alle Module: Button unten, Regel 8) ·
TTS-TIMING-FIX ✅ (onend statt fixer setTimeout, Regel 9) ·
FEEDBACK-LOB ✅ (LOB_TEXTE + zufallsLob() in allen Spielseiten) ·
UMLAUT-FIX ✅ (alle sichtbaren Texte in Schul-/Reim-Modulen) ·
SCHULE-LAYOUT ✅ (schule.html: kompakt, scrollbar, Zurück immer sichtbar) ·
ERROR-HANDLER ✅ (error_handler.js v2, alle 37+8 HTML-Dateien abgesichert) ·
TTS-WATCHDOG ✅ (LaetitiaSprich.wrap in allen neuen Spielseiten)

---

## Offene Arbeitspakete

### 🔴 Hoch
| AP | Beschreibung |
|---|---|
| TAGESPLAN | Wochentag + aktuelle Aktivität + Bildsymbole, localStorage |
| QUASSEL-ÜBERGANG | listener.ps1 v3 mit schwarzem Bildschirm testen |
| SONOS-STEUERUNG | Play/Pause/Lautstärke per Blick — Sonos lokal vorhanden, IP aus Fritz!Box |
| AUFMERKSAMKEITS-SIGNAL | Fritz!Box-API: Familien-Handy anrufen ODER Licht blinken lassen |

### 🟡 Mittel
| AP | Beschreibung |
|---|---|
| SCHULE-BILDER-JAEIN | Bilder aus Lies-mal-3-Seiten zu schule_jaein-Aufgaben hinzufügen |
| ENGLISCH-E4 | Stufe 4: Interaktive Geschichten auf Englisch |
| ENGLISCH-ERWEITERUNG | Mehr Aufgaben, neue Themen, Reime auf Englisch |
| BEFINDLICHKEITS-CHECK | Täglich: "Wie geht es dir?" + Körper-Schema + Tagesrückblick |
| INTERAKTIVE-GESCHICHTEN | Verzweigte Geschichten mit echten Entscheidungen |
| MOTORIK-TRAINING | Bewegungsübungen mit Rhythmusgeber + Selbstauskunft |
| SACHKUNDE-ERWEITERUNG | Tiere, Jahreszeiten, Berufe, Körper (weitere Themen) |
| MATHE-M5 | Einmaleins (×2, ×5) mit Emoji-Gruppen |
| FORTSCHRITT | Zentrale Übersicht mit Sternen + Abzeichen |
| EINFACH-MODUS | 2 statt 4 Antwortoptionen |
| SCHULE-LIESMAL1-2 | Lies mal 1 + 2 einpflegen (PDFs vorhanden) |

### 🟢 Niedrig
| AP | Beschreibung |
|---|---|
| FRITZ-STECKDOSEN | Fritz!DECT 200/210 per Blick schalten |
| FAMILIEN-MODUL | Geteilte Erfahrungen, Nachrichten hinterlassen |
| SCHACH-SPIEL | Freies Spiel König+Turm vs. König |
| LABYRINTH-GENERATOR | Zufallsgenerator für neue Level |
| ABZEICHEN-SYSTEM | Dauerhafte Abzeichen auf Startseite |
| TAGESZEIT-MODUS | Morgens hell, abends warm+dunkel |
| HÖRSPIELE | Kurze Hörspiele mit mehreren Stimmen |
| AP-31 | Memory auf Tobii testen |

---

## Konzeptionelle Strategie: Autonomie-Erweiterung

**Erarbeitet 2026-04-18** — Greenfield-Perspektive aus technischer, pädagogischer, medizinischer und sozialer Sicht.

### Priorisierte Roadmap (realistisch + wirkungsstark)

| Priorität | Bereich | Begründung |
|---|---|---|
| 1 ✅ | Englisch-Lernen | Eigener Wunsch Laetitias. Comprehensible Input, keine Grammatik. Umgesetzt. |
| 2 | Reim + Humor | Laetitias Stärke: Sprachfreude, Reime, Witz. Sofort umsetzbar. Sozialer Ausdruckswert. |
| 3 | Befindlichkeits-Check-in | Klein, täglich, therapeutisch wertvoll. Stärkt Selbstwahrnehmung + Kommunikation darüber. |
| 4 | Interaktive Geschichten | Lesen + Entscheiden + Sprachfreude verbinden. Verzweigte Erzählungen. |
| 5 | Motorik-Training | Übungen mit Rhythmusgeber. Selbstauskunft per Blick. Kamera-Erkennung mittelfristig. |
| 6 | Aufmerksamkeits-Signal | "Ich brauche Hilfe / Gesellschaft" — größter Alltagseffekt ohne Rollstuhl-Steuerung. |

### Wichtige Erkenntnisse aus der Analyse

**Englisch:** Laetitia übersetzt wörtlich, versteht Satzstruktur noch nicht. Lösung: kein Grammatikunterricht, stattdessen massiver Klang-Input (Comprehensible Input nach Krashen). TTS-Aussprache auf Englisch ist Pflicht.

**Motorik:** Kamera-Erkennung (MediaPipe/TensorFlow.js, lokal im Browser) ist technisch heute möglich für Handbewegungserkennung. Einstieg realistisch mit Selbstauskunft + Rhythmusgeber. Kein Cloud-Service nötig.

**Kommunikation:** Laetitia kommuniziert bereits kompetent — AAC-Übungsmodul wäre Ergänzung, nicht Basis. Priorität ist Ausdruck stärken (Reime, Witze, Geschichten), nicht Grundkommunikation.

**Umgebungssteuerung:** Nicht über Fernseher/Rollstuhl (manuell), aber sinnvoll als "Aufmerksamkeits-Signal" an Familie (Klingel, Nachricht). Technisch: lokale HTTP-API wie Quasselkiste.

---

## Changelog

| Datum | Was |
|---|---|
| 2026-03-21 | Basismodule stabil, dwell.js v8 |
| 2026-03-27 | Deutsch 300 Aufgaben, Mathe komplett |
| 2026-03-28 | Hörbuch, Musik, Malen, Navigation |
| 2026-03-29 | Zurück-Fixes, Dwell-Fix |
| 2026-03-30 | Musik-Alben, Lautstärke, Glaube, Fotos |
| 2026-04-07 | Schach-Layout, König, Mathe M0a–M0e, Logik |
| 2026-04-08 | Deutsch Johannes+Matthäus, Mathe M1N/M1R, König hell |
| 2026-04-10 | dwell.js v10, Kerndatei-Schutz, Regel 6 |
| 2026-04-11 | Dwell-Goldstandard 900ms, König+Turm, Deutsch A2+Flash, Musik-machen |
| 2026-04-12 | Xylophon, Melodie-Maler, Labyrinth, alle 6 Schachfiguren, Mathe M0f, Deutsch A1 |
| 2026-04-13 | Quasselkiste-Integration ✅ (HTTP-Listener, listener.ps1) |
| 2026-04-17 | Schulmodus ✅, Schule-Modul ✅, Chronologie ✅, index.html 8 Buttons |
| 2026-04-18 | Englisch-Modul ✅, Autonomie-Strategie erarbeitet und dokumentiert |
| 2026-04-18 | Reim-Modul ✅ (4 Modi, 47 Aufgaben), in lernen.html eingebunden |
| 2026-04-18 | Regel 7–10 eingeführt: Dwell, Zurück, Feedback+TTS, error_handler |
| 2026-04-18 | error_handler.js v2 ✅ — systemweiter Schutz, alle 45 HTML-Dateien |
| 2026-04-18 | TTS-Watchdog ✅ (LaetitiaSprich.wrap in allen neuen Spielseiten) |
| 2026-04-18 | Schule-Module: Umlaute, Layout, Feedback, TTS-Timing vollständig überarbeitet |
| 2026-04-23 | Schule-Navigation: 3-Ebenen-Architektur ✅ (schule → fach → modul, kein Scrollen) |
| 2026-04-23 | schule_deutsch.html + schule_mathe_uebersicht.html ✅ — neue Zwischenebenen |
| 2026-04-23 | Sachkunde-Modul ✅ — schule_lesen.html, 28 Aufgaben, Bilder aus PDFs (Base64, 121KB) |
| 2026-04-23 | schule_jaein.html: TTS-Watchdog, Schriftgrößen, Zurück-Text-Fix, bindDwellButtons-Fix |
| 2026-04-23 | KOLLABORATION.md: TTS-Pflichtvorlage mit Watchdog (Abschnitt 5), dynamische Buttons (5b) |
| 2026-04-23 | KOMM-TAFEL AP gestrichen — NuVoice macht das besser |
| 2026-04-23 | Umgebungssteuerung-APs ergänzt: Sonos + Fritz!Box (Sonos + Fritz!Box vorhanden) |
