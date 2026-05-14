# Laetitia Lernsystem — Kollaborations-Handbuch
**Stand: 2026-05-14**

---

## 0. Sitzungseffizienz — Kontextfenster schonen

Diese Regeln verhindern, dass das Sitzungslimit zu früh erreicht wird.

### Claude-Pflichten
- **Niemals Dateien anfordern die bereits im Kontext sind** — PDFs, HTML-Dateien und Bilder die in dieser Sitzung bereits hochgeladen oder gezeigt wurden, stehen weiter zur Verfügung. Claude prüft den Kontext bevor es Upload anfordert.
- **Vor jedem Upload-Request prüfen:** Ist der Inhalt bereits als Dokument, als `<document>`-Block oder als früherer Tool-Output sichtbar? Wenn ja → kein Upload anfordern.
- **Dateien nur einmal mit `view` lesen** — nicht mehrfach in einer Sitzung
- **Kein `view` auf selbst erstellte Dateien** — Claude hat den Inhalt gerade erst geschrieben
- **Bei Unklarheit über Dateiinhalt:** Gezielt fragen "Hast du X bereits hochgeladen?" statt blind anzufordern

### Sitzungsstruktur-Regeln
```
SITZUNGSREGEL (gilt für Claude UND Nutzer):
1. Max. 2 APs pro Sitzung — bei mehr: neue Sitzung
2. PDFs / Bilder nur einmal hochladen — Claude merkt sich den Inhalt
3. Screenshots nur bei echten visuellen Problemen — kein "zur Bestätigung"
4. Nach jedem getesteten und funktionierenden AP:
   kurze Pause + ggf. neue Sitzung starten
5. Neue Sitzung beginnt IMMER mit:
   ÜBERGABE.md lesen + 10 Regeln bestätigen
```

### Warum das Kontextfenster voll wird
Die häufigsten Ursachen in absteigender Wirkung:
1. **Gleiche PDFs mehrfach hochgeladen** — größter Faktor
2. **Viele kleine Iterationen** (Screenshot → Fix → Screenshot → Fix)
3. **Lange Dateiinhalte** die mehrfach gelesen werden
4. **Zu viele APs in einer Sitzung** ohne Neustart

---

## 1. Verbindliche Arbeitsweise

### Sitzungsstart
1. Claude liest `ÜBERGABE.md` vollständig
2. Claude bestätigt die **10 kritischen Regeln**
3. Du nennst die Aufgabe(n) im AP-Format
4. Claude arbeitet ab und meldet Ergebnis
5. Du testest in Edge (`file://`)
6. Claude aktualisiert ÜBERGABE.md + KOLLABORATION.md

### Kerndatei-Schutz

| Datei | Warum kritisch |
|---|---|
| `core/moduleKit.js` | v3: pointerenter, 900ms, erklaerung, onCorrectAnswerCb, istNurEmoji-Fix |
| `core/audioQueue.js` | v2: onDone-Callback |
| `core/dwell.js` | v10: Deduplizierung, pointerLeaveGrace=300ms |
| `core/schulprofil.js` | Schulmodus-Logik, SCHULMODUS_GESPERRT |
| `modules/mathe/mathe_module.js` | v3: Zähl-Animation, Emoji-TTS |
| `index.html` | 8 Buttons (4×2), Schulmodus, Quasselkiste |
| `lernen.html` | + Englisch-Button, ohne Schule/Schulmodus |

```
Vor jeder Kerndatei-Änderung:
1. STOP — Snapshot NICHT verwenden
2. "Bitte lade [Dateiname] hoch"
3. Erst nach Upload ändern
4. Pflicht-Funktionen aus ÜBERGABE.md abgleichen
```

### Maximale Aufgabengröße
Max. 2–3 APs pro Sitzung. Kein neues AP beginnen solange das letzte nicht getestet wurde.

---

## 2. Aufgaben-Format

```
AP-XX: [Titel]
Datei(en): [vollständige Pfade]
Ziel: [Was soll danach anders sein?]
Test: [Konkrete Prüfschritte]
Nicht anfassen: [geschützte Dateien]
```

---

## 3. Dwell-Goldstandard

Tobii sendet `pointerenter`, nicht `mouseenter`.

```javascript
var dwellMs = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

function bindDwellEinzel(el){
  if(!el || el.dataset.pdwell) return;
  el.dataset.pdwell = "1";
  var timer = null;
  function start(){
    if(timer) return;
    el.classList.add("dwell-active");
    var svg = el.querySelector(".dwell-ring-svg");
    if(svg){
      var c = svg.querySelector("circle");
      c.classList.remove("animating");
      svg.style.setProperty("--dwell-duration", (dwellMs/1000)+"s");
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){ c.classList.add("animating"); });
      });
    }
    timer = setTimeout(function(){
      timer=null; try{ el.click(); }catch(e){}
    }, dwellMs);
  }
  function stop(){
    if(timer){ clearTimeout(timer); timer=null; }
    el.classList.remove("dwell-active");
    var svg = el.querySelector(".dwell-ring-svg");
    if(svg) svg.querySelector("circle").classList.remove("animating");
  }
  el.addEventListener("pointerenter", start);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("click", stop);
  el.addEventListener("mouseenter", start);
  el.addEventListener("mouseleave", stop);
}
```

**Vor erneutem Binden immer:**
```javascript
delete el.dataset.pdwell;
bindDwellEinzel(el);
```

---

## 4. Feedback-Muster (Standard)

Alle Spielseiten — moduleKit, Schule, Englisch — nutzen dieses Muster:

```javascript
// Richtig:
gewaehlt.classList.add("correct-flash");
setInfoLine("✓ Richtig! " + erklaerung, "richtig");
sprich("Das ist richtig! " + erklaerung);

// Falsch:
gewaehlt.classList.add("falsch-gewaehlt");
richtigerButton.classList.add("correct-flash"); // ← immer!
setInfoLine("✗ Falsch. Richtig wäre: X — " + erklaerung, "falsch");
sprich("Das ist leider falsch. Richtig wäre: X. " + erklaerung);
```

```css
@keyframes correctFlash{
  0%  { background:rgba(22,163,74,.60); border-color:#16a34a; }
  50% { background:rgba(22,163,74,.15); }
  100%{ background:rgba(22,163,74,.60); border-color:#16a34a; }
}
.correct-flash    { animation:correctFlash .45s ease forwards !important; }
.falsch-gewaehlt  { background:rgba(220,38,38,.25) !important; border-color:#dc2626 !important; }
```

---

## 5. TTS-Muster

⚠️ **PFLICHT-IMPLEMENTIERUNG — immer diese exakte Vorlage kopieren, nie vereinfachen!**

**Warum:** Edge feuert `onend` manchmal nicht (bekannter Browser-Bug). Ohne Watchdog friert die Seite ein und Laetitia steckt fest.

**Deutsch (Standard — mit Watchdog):**
```javascript
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.90;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      var fired = false;
      var watchdog = null;
      function naechster(){
        if(fired) return; fired = true;
        if(watchdog) clearTimeout(watchdog);
        if(danach) setTimeout(danach, 300);
      }
      u.onend  = naechster;
      u.onerror = naechster;
      watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}
```

**Englisch (Englisch-Modul — mit Watchdog):**
```javascript
function sprichEN(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB"; u.rate = 0.85;
    var voices = speechSynthesis.getVoices();
    var en = voices.find(function(v){ return v.lang.startsWith("en"); });
    if(en) u.voice = en;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      var fired = false;
      var watchdog = null;
      function naechster(){
        if(fired) return; fired = true;
        if(watchdog) clearTimeout(watchdog);
        if(danach) setTimeout(danach, 300);
      }
      u.onend  = naechster;
      u.onerror = naechster;
      watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
      speechSynthesis.speak(u);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}
```

**Kritische Regel:** `naechsteAufgabe()` darf KEIN `speechSynthesis.cancel()` enthalten — der Weiter-Button erscheint erst nach `onend`, daher läuft kein TTS mehr wenn er gedrückt wird.

---

## 5b. Dwell auf dynamisch erzeugten Buttons

Wenn Buttons per `innerHTML` oder `createElement` neu erzeugt werden (z.B. Antwort-Buttons die bei jeder Aufgabe neu gebaut werden), muss `data-pdwell` vor dem Neuaufbau explizit gelöscht werden:

```javascript
// Vor dem Einfügen ins DOM:
delete btn.dataset.pdwell;

// Nach dem Aufbau aller Buttons: bindeDwell() aufrufen
bindeDwell();
```

Hintergrund: dwell.js setzt `data-pdwell="1"` als Schutz gegen doppeltes Binden. Neu erzeugte Elemente haben es nicht — aber `innerHTML = ""` gefolgt von neuem `createElement` kann in manchen Edge-Versionen gecachte Referenzen hinterlassen.

---

## 6. Quasselkiste — Architektur ✅

```
NuVoice → lernwelt_starten.exe → Edge Kiosk + listener.ps1
💬-Button → fetch("http://localhost:9999/zurueck")
→ taskkill msedge → NuVoice.exe neu starten
```
Port 9999 — in listener.ps1 UND index.html ändern falls nötig.
Beim ersten Start: Windows Firewall → "Erlauben".

---

## 7. Schule-Modul — Architektur

### Schulmodus
```
SCHULMODUS_GESPERRT = ["lernen", "spiele", "entertain", "kreativ", "glaube"]
Frei immer: "schule" + "quassel"
Zeitfenster: 08:30–15:30
Schultage: einstellungen.html → Kalender
```

### Seiten-Filter (URL-Parameter)
```
schule_jaein.html?seite=5&heft=liesmal3   → nur Seite 5 aus Lies mal 3
schule_mathe.html?stufe=SMA1              → nur SMA1
schule_mathe.html?seite=7&heft=nasevorn   → nur Seite 7 aus Nase vorn!
```

### Heft-Erweiterung
1. Neue Datendatei mit `heft:"neuesHeft"` und `seite:[Nr]`
2. `<script src>` in `schule_chronologie.html` + Spielseiten
3. Eintrag in `HEFT_META` in `schule_chronologie.html`
4. Button in `schule.html`

---

## 8. Englisch-Modul — Architektur

### Leitprinzip
Kein Grammatikunterricht. Comprehensible Input — Sprache durch Klang und Kontext, wie Laetitia Deutsch gelernt hat.

### Stufensystem
```
E1: Einzelnes Wort hören → richtiges Emoji wählen (2 Optionen)
E2: Ganzen Satz hören → passende Situation wählen (2 Emoji-Paare)
E3: Satz mit Lücke → richtiges Wort einsetzen (3 Optionen)
[E4 geplant]: Interaktive Geschichte auf Englisch
```

### Erweiterung
Neue Aufgaben: `englisch_data.js` → Array ergänzen, `stufe:"E1"/"E2"/"E3"`.
Neues Thema: `thema:"neuesThema"` setzen (für spätere Filterung).

---

## 9. Konzeptionelle Strategie: Autonomie

**Erarbeitet 2026-04-18 — Greenfield-Ansatz aus tech./päd./med./sozialer Perspektive**

### Kernprinzipien
- Autonomie = Fähigkeit, mehr Dinge selbst initiieren und steuern zu können
- Laetitias Stärken nutzen: Sprachkompetenz, Humor, Freude an Sprache
- Intrinsische Motivation hat höchste Priorität (Englisch: eigener Wunsch)
- Kein Cloud-Zwang — alles lokal machbar

### Prioritäten-Tabelle

| Prio | Bereich | Status | Kernidee |
|---|---|---|---|
| 1 | Englisch | ✅ | Comprehensible Input, TTS en-GB, 3 Stufen |
| 2 | Reim + Humor | offen | Reimpaare, Witz-Bausteine, TTS als Ausdruck |
| 3 | Befindlichkeits-Check-in | offen | Täglich, differenziert, therapeutisch nutzbar |
| 4 | Interaktive Geschichten | offen | Verzweigt, Laetitia entscheidet den Verlauf |
| 5 | Motorik-Training | offen | Rhythmusgeber + Selbstauskunft, später Kamera |
| 6 | Aufmerksamkeits-Signal | offen | "Ich brauche Hilfe" → Familie, HTTP wie Quasselkiste |

### Motorik-Tracking — Technische Optionen
1. **Selbstauskunft** (sofort): Laetitia bewertet selbst per Blick → Lob an Selbsteinschätzung gekoppelt
2. **Einfacher Sensor** (Makey Makey, ~30€): USB-Druckknopf als Bewegungszähler
3. **Kamera-Erkennung** (mittelfristig): MediaPipe/TensorFlow.js, lokal im Browser, kalibrierbar

---

## 10. Checklisten

### Neues Schach-Modul
```
☐ legalMoves()-Funktion korrekt
☐ Springer springt ÜBER Blöcke
☐ Bauer: Schlag nur auf [r-1,c±1]
☐ BFS-Prüfung ALLER Level
☐ boardWrap VOR Topbar im HTML
☐ STORAGE_KEY = "[figur]_v1"
```

### Neues Lernmodul (moduleKit)
```
☐ t.richtig (NICHT t.loesung)
☐ erklaerung-Feld
☐ lernen.html: Button ergänzen
```

### Neue Datendatei (allgemein)
```
☐ Nur gerade Anführungszeichen
☐ Feldnamen: richtig, erklaerung, frage, antwort_a/b/c/d, stufe, seite, text
☐ Registry-Logik: existing.filter() + concat()
☐ Ladereihenfolge prüfen
```

### Neue Schul-Datendatei
```
☐ heft:"liesmal3" / "nasevorn" / neues Kürzel
☐ seite: [Nummer] — immer!
☐ typ + stufe + erklaerung
☐ <script src> in Spielseite + schule_chronologie.html
☐ HEFT_META-Eintrag in schule_chronologie.html
```

### Neue Englisch-Aufgaben
```
☐ stufe: "E1" / "E2" / "E3"
☐ thema: "tiere" / "essen" / "natur" / "gefuehle" / "alltag" / "witzig"
☐ tts_en: englischer Text für TTS
☐ erklaerung_de: kurze deutsche Übersetzung
☐ E1/E2: emoji_richtig, emoji_falsch, label_richtig, label_falsch
☐ E3: antwort_a/b/c, richtig, tts_komplett
```

### Neue Übersichtsseite
```
☐ Return-URL setzen
☐ Zurück-Button (min-height 56px)
☐ Direktes pointerenter, 900ms
☐ Header kompakt (padding 10px, emoji 32px)
```

---

## 11. Tobii Accent 1400 — Eigenheiten

- Sendet `pointerenter` — nicht `mouseenter`
- Kurze Blick-Aussetzer → pointerleave-Grace 150–300ms
- `attachDwell` nur für `<a>`-Tags zuverlässig
- min-height 68px für zuverlässiges Anvisieren
- Augenermüdung begrenzt Sitzungslänge → Sessions max. 8–10 Aufgaben

---

## 12. Fehler-Handler — PFLICHT (Regel 10)

### ⚠️ error_handler.js in jede neue Spielseite einbinden

Ohne Fehler-Handler friert die Seite bei einem JS-Fehler stumm ein — Laetitia steckt fest und braucht Hilfe. Mit dem Handler erscheint automatisch ein großer Not-Zurück-Button.

### Einbindung (Reihenfolge wichtig!)

```html
<script src="../../core/dwell.js"></script>
<script src="../../core/error_handler.js"></script>  ← NEU nach dwell.js
<script src="./mein_modul_data.js"></script>
<script>
  // Modul-Code ...
</script>
```

### Was der Handler tut

| Fehlerklasse | Auslöser | Reaktion |
|---|---|---|
| JS-Laufzeitfehler | `window.onerror` | Not-Overlay + TTS + Log |
| Unbehandelte Promises | `unhandledrejection` | Not-Overlay + TTS + Log |
| Manuell | `window.LaetitiaFehler.zeige("Msg")` | Not-Overlay + TTS + Log |

### Not-Overlay

- Großer lila Zurück-Button (90px hoch, Tobii-sicher)
- TTS: "Ups! Da ist etwas schiefgelaufen. Tippe oder schau auf den Pfeil, um zurückzugehen."
- Dwell wird automatisch auf den Zurück-Button gebunden
- Laufende Dwell-Timer werden sofort gestoppt (kein unbeabsichtigtes Auslösen)
- Fehler-Detail klein und lesbar (für Diagnose)

### Fehler-Log (für Diagnose)

```javascript
// Letzte 10 Fehler ansehen:
window.LaetitiaFehler.logs();
// → [{ts, typ, msg, url, line}, ...]

// Log löschen:
window.LaetitiaFehler.clear();

// Manuell einen Fehler-Screen zeigen (z.B. wenn Daten fehlen):
if(alleAufgaben.length === 0){
  window.LaetitiaFehler.zeige("Keine Aufgaben geladen — Datendatei prüfen.");
  return;
}
```

### Manueller Einsatz bei leeren Daten

Statt stilles Einfrieren bei `alleAufgaben.length === 0` lieber:
```javascript
if(!alleAufgaben || alleAufgaben.length === 0){
  if(window.LaetitiaFehler) window.LaetitiaFehler.zeige("Keine Aufgaben gefunden.");
  return;
}
```

---

## 13. Neue Goldstandard-Regeln (ab 2026-05-14)

### Regel 12 — Depth-Kommentar

Jede HTML-Datei beginnt mit einem Pfadkommentar direkt nach `<!doctype html>`:

```html
<!doctype html>
<!-- depth:2 — Pfade: ../../core/, ../../modules/ -->
<html lang="de">
```

| depth | Lage der Datei | Pfad zu core/ |
|---|---|---|
| 0 | `app/` | `./core/` |
| 1 | `app/modules/X/` | `../core/` |
| 2 | `app/modules/X/Y/` | `../../core/` |
| 3 | `app/modules/X/Y/Z/` | `../../../core/` |

`validate.ps1` prüft, ob jede HTML-Datei diesen Kommentar enthält (Prüfung 4).

---

### Regel 13 — Inline-Script-Limit (≤20 Zeilen)

Inline-`<script>` in HTML darf maximal **20 Zeilen** enthalten und nur folgende Inhalte haben:
- Variable Zuweisung (Config, Konstanten)
- `dwell.js`-Aufruf (`window.LaetitiaAttachDwell(...)`)
- localStorage-Einzeiler
- Aufruf einer Funktion aus einer externen Datei (`zeigeStartseite()` o.ä.)

**Alle Logik (Funktionen, Event-Handler, Render-Loops, Datenverarbeitung)** gehört in externe `.js`-Dateien.

Struktur:
```html
<script src="./data/modul_data.js"></script>
<script src="./modul_mod.js"></script>       <!-- ← Logik hier -->
<script>
  var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  attachDwell("a.btn, #btnZurueck", { dwellMs: 900, leaveGrace: 100,
    onActivate: function(el){ try{ el.click(); }catch(e){} }
  });
  try{ localStorage.setItem("laetitia_return_url_v1",
    new URL("./uebersicht.html", window.location.href).href); }catch(e){}
</script>
```

---

### Regel 14 — Media-Config-Muster

Jedes Medienmodul (Musik, Hörbuch, Fotos, …) hat eine `*_media_config.js` Parametertabelle.

**Dateistruktur:**
```javascript
(function(){
  "use strict";
  var config = {
    "album_id_1": true,
    "album_id_2": false   // deaktiviert, bleibt im Repo
  };
  window.LaetitiaMusik = (window.LaetitiaMusik || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
```

**Ladereihenfolge in HTML:** alle `info.js`-Tags → `*_media_config.js` → Modul-JS.

**Neues Medium einbinden:**
1. Ordner anlegen, `info.js` schreiben (Pfade relativ zum HTML)
2. `<script src="./alben/NeuAlbum/info.js"></script>` in HTML
3. `"neue_id": true` in `*_media_config.js`

**Medium deaktivieren:** `"id": false` — nie die Datei löschen.

---

### Regel 15 — Lernfortschritt-Erfassung (stats.js)

`app/core/stats.js` → `window.LaetitiaStats`, speichert in `localStorage["laetitia_stats_v1"]`.

Einbindung in Spielseiten (nach `error_handler.js`, vor Modul-JS):
```html
<script src="../../core/stats.js"></script>
```

Pflicht-Aufrufe:
```javascript
window.LaetitiaStats.sessionStart("modul", stufe);   // beim Laden
window.LaetitiaStats.taskStart();                     // vor jeder Aufgabe
window.LaetitiaStats.taskAnswer(id, richtig, gewaehlt, hilfe, null);  // nach Antwort
window.LaetitiaStats.markHilfe(id);                  // wenn Hilfe-Button genutzt
window.LaetitiaStats.sessionEnd(true);               // bei sauberem Abschluss
window.LaetitiaStats.sessionEnd(false);              // bei Abbruch/Zurück
```

Analyse-API (für statistik.html):
```javascript
LaetitiaStats.schwacheAufgaben(modul)   // → [{id, fehlerRate, gesamt, avgMs}]
LaetitiaStats.hilfeWortRanking(modul)   // → [{wort, anzahl}]
LaetitiaStats.levelEmpfehlungen(modul)  // → [{modul, stufe, allesRichtig, sessions}]
LaetitiaStats.musterWarnung(modul, 10)  // → {warnung, gesamt} | null
```

---

### Regel 16 — validate.ps1 vor jedem Push

`validate.ps1` in der Projektwurzel — führt 7 statische Konsistenzprüfungen durch:

| # | Prüfung |
|---|---|
| 1 | Script-src-Pfade — jede referenzierte `.js`-Datei muss existieren |
| 2 | `import()` verboten — kein `import()` in Script-Blöcken |
| 3 | Inline-Script-Länge — max. 20 Zeilen pro `<script>` ohne `src` |
| 4 | Depth-Kommentar — jede HTML-Datei braucht `<!-- depth:N -->` |
| 5 | stats.js-Referenzen — jede HTML die `LaetitiaStats` nutzt, muss `stats.js` laden |
| 6 | media_config-IDs — alle IDs in `*_media_config.js` müssen in info.js vorkommen |
| 7 | info.js-IDs — alle IDs in info.js müssen in der passenden `*_media_config.js` stehen |

Ausführen:
```powershell
powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1
```

Alle Prüfungen müssen **grün** (0 Fehler) sein vor `git push`.

---

## 14. Changelog

| Datum | Was |
|---|---|
| 2026-04-08 | Kerndatei-Schutz, Snapshot-Limitation, Regel 6 |
| 2026-04-11 | Dwell-Goldstandard, Tobii-Eigenheiten, Checklisten |
| 2026-04-12 | Alle neuen Module, Bauer-Checkliste, Roadmap |
| 2026-04-13 | Quasselkiste-Integration ✅ |
| 2026-04-17 | Schulmodus ✅, Schule-Modul ✅, Chronologie ✅, Feedback-Muster |
| 2026-04-18 | Englisch-Modul ✅, TTS-Muster, Autonomie-Strategie |
| 2026-04-18 | Regel 7–9 (Dwell, Zurück, Feedback+TTS), Schule-Module vollständig überarbeitet |
| 2026-04-18 | error_handler.js v1 ✅ — Regel 10, Not-Overlay, Fehler-Log, globaler Schutz |
| 2026-04-23 | Schule-Navigation umgebaut: 3-Ebenen-Architektur (schule → fach → modul) |
| 2026-04-23 | Sachkunde-Modul ✅ — schule_lesen.html + schule_lesen_data.js + Bilder aus PDFs |
| 2026-04-23 | TTS-Pflichtimplementierung mit Watchdog in Abschnitt 5 dokumentiert ✅ |
| 2026-04-23 | Dwell auf dynamischen Buttons: Abschnitt 5b ergänzt |
| 2026-05-14 | Regel 12–16 eingeführt: depth-Kommentar, Inline-Script-Limit, Media-Config, stats.js, validate.ps1 |
| 2026-05-14 | validate.ps1 ✅ — 7 automatische Konsistenzprüfungen (Pfade, import(), depth, stats, config-IDs) |
| 2026-05-14 | pruefung.html ✅ — Browser-Runtime-Health-Check (Accent-Gerät) |
| 2026-05-14 | media_config.js Pattern ✅ — Musik, Hörbuch, Fotos, Glaube-Lieder, Glaube-Hörbücher, Psalmen |
| 2026-05-14 | stats.js ✅ — window.LaetitiaStats, Lernfortschritt-Erfassung, 6 Analyse-Funktionen |
| 2026-05-14 | Pfadfehler-Fixes: 9 HTML-Dateien (glossar, platzhalter, schach/6 Figuren, hoerbuch_glaube) |
| 2026-05-14 | Regel 13-Extraktion (Rule 18): sinnesorgane_info.html, sinnesorgane.html, lernen.html |
