# Laetitia Lernsystem — Projekt-Wissen
*Stand: 17. Mai 2026*

## System

Kind mit Behinderung. **Tobii Accent 1400**, Augensteuerung (Dwell-Selektion).
Browser: **Microsoft Edge**, `file://`, offline, Windows 11.
Pfad: `C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/`
Module: `app/modules/schule/`

---

## Kollaborations-Regel (Claude)

**Claude beschränkt sich in Antworten auf entscheidungsrelevante Informationen.**
Einzelschritte, interne Überlegungen und Verifikations-Logs werden nicht im Chat ausgegeben.
Ausgegeben werden: Ergebnisse, Fehler die eine Entscheidung erfordern, Rückfragen.

---

## 17 Goldstandard-Regeln (NIEMALS brechen)

1. `dwell.js` immer `<script src="...">`, nie `import()`
2. `localStorage["laetitia_input_mode"] = "tobii"` als Standard
3. Nur die genannte Datei ändern — keine anderen anfassen
4. Keine typografischen Anführungszeichen (`"` `"`) in JS — nur `"`
5. Nach Änderungen Edge komplett schließen
6. Kerndateien (`dwell.js`, `error_handler.js`, `geraete.js`) NIE aus Gedächtnis — immer hochladen lassen
7. Dwell via `LaetitiaAttachDwell(selector, opts)` aus dwell.js v10
8. Zurück-Button: `min-height:72px`, `font-size:20px`, `width:100%`, lila `#8b5cf6 / #ede9fe`, in eigenem `.zurueck-leiste` div (`padding:8px 12px`)
9. Lob-Feedback via `LOB_TEXTE` + `zufallsLob()`, TTS wartet auf `onend`-Callback
10. `error_handler.js` in jede Spielseite einbinden
11. **Stimme Goldstandard:** Microsoft Katja Online (Natural) — vollständiger Selektor siehe unten
12. Jede HTML-Datei: `<!-- depth:N — Pfade: ../×N zu app/ -->` direkt nach `<!doctype html>`
13. Inline-`<script>` max. 20 Zeilen — Logik in externe `.js`-Dateien auslagern
14. Mediendateien per `*_media_config.js` parametrisiert — nie löschen, nur `"id": false`
15. `stats.js` in jede Spielseite einbinden (`sessionStart`/`taskStart`/`taskAnswer`/`sessionEnd`)
16. Vor jedem `git push`: `validate.ps1` ausführen — alle 8 Prüfungen müssen grün sein
17. **Lesebereich/Aktionsbereich-Trennung:** Text/Frage oben passiv (`pointer-events:none`), Trennstreifen mit Label, Antwort-Buttons unten dwell-aktiv. Buttons nach Antwort vollständig ausblenden (`display:none`). Vollständiges Muster siehe unten.

---

## TTS-Goldstandard (copy-paste in jedes Modul)

Gilt für: Aufgabenstellung vorlesen, Erläuterungssätze, Lob-Feedback — überall dieselbe Funktion.

```javascript
function sprich(text, danach){
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.92;
    var voices = speechSynthesis.getVoices();
    var de = voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
          || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
          || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
          || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
          || voices.find(function(v){ return v.lang.startsWith("de"); });
    if(de) u.voice = de;
    if(window.LaetitiaSprich){
      window.LaetitiaSprich.wrap(u, danach);
    } else {
      setTimeout(function(){
        var fired = false; var watchdog = null;
        function naechster(){
          if(fired) return; fired = true;
          if(watchdog) clearTimeout(watchdog);
          if(danach) setTimeout(danach, 300);
        }
        u.onend = naechster; u.onerror = naechster;
        watchdog = setTimeout(naechster, Math.max(3000, text.length * 80));
        speechSynthesis.speak(u);
      }, 120);
    }
  }catch(e){ if(danach) setTimeout(danach, 400); }
}
```

**Seiten-Start:**
```javascript
if(speechSynthesis.getVoices().length > 0){
  starteSession();
} else {
  speechSynthesis.addEventListener("voiceschanged", function(){ starteSession(); }, {once:true});
  setTimeout(function(){ starteSession(); }, 800);
}
```

---

## Weiter-Button Goldstandard

Erscheint erst nach TTS `onend` — kein `setTimeout` für Aufgabenwechsel.

```javascript
sprich(text, function(){
  var weiter = document.getElementById("weiterBtn");
  if(weiter){ weiter.className = "weiter-btn sichtbar"; rebindDwell(); }
});
function naechsteAufgabe(){ index++; zeigeAufgabe(); }
```

---

## Überspringen-Button Goldstandard

Orange, gleiche Breite wie andere Nav-Buttons, immer in der Nav-Leiste unten.
Verschwindet nach Antwort-Auswahl (wenn Weiter erscheint).
Variablen-Namen müssen zum jeweiligen Modul passen — nie aus anderem Modul kopieren ohne Anpassung.

```javascript
function ueberspringen(){
  if(aktIndex >= aufgaben.length - 1){ zeigeFertig(); return; }
  aktIndex++;
  zeigeAufgabe();
}
```

---

## Zurück-Button Goldstandard (Einzelseiten ohne Multi-Nav)

Für alle Seiten mit **nur einem** Zurück-Button (Kategorie-Seiten, Übersichten, Spiele):

```html
<div class="zurueck-leiste">
  <a class="zurueckBtn" href="..." id="btnZurueck">
    ← Zurück
    <svg class="dwell-ring-svg" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" style="stroke:#8b5cf6"/></svg>
  </a>
</div>
```

CSS (copy-paste):
```css
.zurueck-leiste{ padding:8px 12px; flex-shrink:0; }
a.zurueckBtn{
  display:flex; align-items:center; justify-content:center;
  min-height:72px; font-size:20px; font-weight:1000;
  border-radius:16px; border:2px solid #8b5cf6;
  background:#ede9fe; color:#4c1d95;
  text-decoration:none; cursor:pointer; user-select:none;
  position:relative; transition:none; width:100%;
}
a.zurueckBtn:hover, a.zurueckBtn:focus{ background:#ddd6fe; outline:3px solid #8b5cf6; }
a.zurueckBtn.dwell-active{ transform:scale(1.02) !important; outline:3px solid #8b5cf6 !important; }
a.zurueckBtn .dwell-ring-svg circle{ stroke:#8b5cf6; }
```

Body-Layout für Seiten mit `.zurueck-leiste` als Footer:
```css
body{ height:100vh; overflow:hidden; display:flex; flex-direction:column; }
/* Hauptinhalt */ .app{ flex:1; min-height:0; ... }
/* .zurueck-leiste kommt nach .app, flex-shrink:0 hält es am Boden */
```

---

## Nav-Leiste Goldstandard (ALLE Module)

**Regel:** Steuerungs-Buttons (Zurück, Weiter, Überspringen) immer nebeneinander in einer Zeile — niemals vertikal gestapelt.

Container außerhalb von `.main`, immer am Seitenende:
```html
<div class="nav-leiste-unten" id="navLeiste">
  <a class="nav-btn nav-btn-zurueck" href="..." id="btnZurueck">← Zurück</a>
  <button class="nav-btn nav-btn-weiter" id="weiterBtn" onclick="naechsteAufgabe()">Weiter ✅</button>
  <button class="nav-btn nav-btn-ueberspringen" id="btnUeberspringen" onclick="ueberspringen()">→ Überspringen</button>
</div>
```

CSS (copy-paste in jedes Modul):
```css
.nav-leiste-unten{ display:flex; gap:8px; padding:8px 12px; flex-shrink:0; }
.nav-btn{
  flex:1; min-height:70px; border-radius:16px; font-size:17px; font-weight:1000;
  cursor:pointer; user-select:none; position:relative;
  display:flex; align-items:center; justify-content:center;
  gap:6px; transition:none; border:2px solid; text-decoration:none;
}
a.nav-btn{ color:inherit; }
.nav-btn-zurueck{ background:#ede9fe; border-color:#8b5cf6; color:#4c1d95; }
.nav-btn-zurueck:hover{ background:#ddd6fe; outline:3px solid #8b5cf6; }
.nav-btn-zurueck .dwell-ring-svg circle{ stroke:#8b5cf6; }
.nav-btn-weiter{ background:#dcfce7; border-color:#16a34a; color:#166534; display:none; }
.nav-btn-weiter.sichtbar{ display:flex; }
.nav-btn-weiter:hover{ background:#bbf7d0; outline:3px solid #16a34a; }
.nav-btn-weiter .dwell-ring-svg circle{ stroke:#16a34a; }
.nav-btn-ueberspringen{ background:#fff7ed; border-color:#f97316; color:#9a3412; }
.nav-btn-ueberspringen:hover{ background:#ffedd5; outline:3px solid #f97316; }
.nav-btn-ueberspringen .dwell-ring-svg circle{ stroke:#f97316; }
.nav-btn.dwell-active{ transform:scale(1.02) !important; outline:3px solid currentColor !important; transition:none !important; }
```

Weiter-Button einblenden (nach Antwort):
```javascript
weiter.className = "nav-btn nav-btn-weiter sichtbar";
```
Weiter-Button zurücksetzen (neue Frage):
```javascript
weiter.className = "nav-btn nav-btn-weiter";
```
Abschluss-Screen: `navLeiste` ausblenden via `document.getElementById("navLeiste").style.display="none"`.

---

## Antwort-Layout Goldstandard

Text links, Bestätigen-Button (✓) rechts — als `.antwortZeile` mit `.antwort-text` + `.antwortBtn`.
Nach Antwort: Zeile färbt sich grün (richtig) oder rot (falsch), Button zeigt ✓/✗.

---

## Lesebereich / Aktionsbereich — Trennung (Goldstandard 17)

**Goldene Regel für Augensteuerung:** Lesebereich und Interaktionsbereich sind visuell und technisch vollständig getrennt.

```
┌─────────────────────────────────────┐
│  LESEBEREICH (grau, pointer-events:none)         │
│  Frage + Satz — passiv, kein Dwell möglich       │
├─────────────────────────────────────┤
│  👆 DEINE ANTWORT  (Trennstreifen, lila-hellblau)│
├─────────────────────────────────────┤
│  AKTIONSBEREICH (weiß, dwell-aktiv)              │
│  Nur Buttons — nach Antwort vollständig weg      │
└─────────────────────────────────────┘
```

**HTML-Struktur (copy-paste):**
```html
<!-- Lesebereich PASSIV -->
<div class="lese-bereich">
  <div class="lese-frage">Frage hier…</div>
  <div class="lese-satz">Satz hier…</div>  <!-- optional -->
</div>
<!-- Trennstreifen PASSIV -->
<div class="trenn-streifen">
  <span class="trenn-label">👆 Deine Antwort</span>
</div>
<!-- Aktionsbereich AKTIV -->
<div class="aktions-bereich" id="aktionsBereich">
  <!-- Buttons per JS eingebaut -->
</div>
```

**CSS:**
```css
.lese-bereich{
  background:#f8fafc; border:2px solid #cbd5e1;
  border-radius:16px 16px 0 0; padding:16px 18px;
  flex-shrink:0; pointer-events:none; user-select:none;
}
.lese-frage{ font-size:24px; font-weight:1000; }
.lese-satz{
  margin-top:10px; font-size:26px; font-weight:800;
  color:#5b21b6; background:rgba(124,58,237,0.08);
  border:2px solid #7c3aed; border-radius:10px;
  padding:12px 16px; line-height:1.4;
}
.trenn-streifen{
  background:#f1f0ff; border-left:2px solid #c4b5fd;
  border-right:2px solid #c4b5fd;
  padding:6px 18px; display:flex; align-items:center;
  gap:6px; flex-shrink:0; pointer-events:none;
}
.trenn-label{ font-size:13px; font-weight:1000; color:#6d28d9;
  text-transform:uppercase; letter-spacing:.05em; }
.aktions-bereich{
  background:#fff; border:2px solid #c4b5fd; border-top:none;
  border-radius:0 0 16px 16px; padding:12px 14px;
  display:flex; flex-direction:column; gap:10px; flex-shrink:0;
}
```

**Nach Antwort — Buttons vollständig ausblenden:**
```javascript
function verbergeAntwortButtons(){
  [".antwort-zweier", ".antwort-dreier", ".wort-reihe"].forEach(function(sel){
    var el = document.querySelector(sel);
    if(el) el.style.display = "none";
  });
}
```

---

## Aufgaben-Reihenfolge Goldstandard

**Kein Zufallsmischen der Aufgaben** — immer chronologische Reihenfolge der Primärmaterialien.
**Antwort-Optionen** (A/B/C) werden weiterhin zufällig gemischt.

---

## Zentrales Geräte-Modul (geraete.js)

Ablage: `app/core/geraete.js` — Goldstandard-Regel 6: NIE aus Gedächtnis schreiben.

Bereitgestellt: `LaetitiaGeraete.initLautstaerke()`, `ladeVolumen()`, `audioUmschalten()`, `jblPruefen()`, `internZurueck()`

Zwei Lautstärke-Profile: `laetitia_lautstaerke_jbl` und `laetitia_lautstaerke_intern`.

Einbindung in Modul-HTML (Pfad je nach Modultiefe):
```html
<script src="../../core/geraete.js"></script>
```

---

## schule_jaein — Konzept

Ablauf pro Einheit:
1. **Bild-Screen** → Comic groß, TTS nach 1800ms, 3 Buttons: `← Zurück | 🔊 Vorlesen | Fragen →`
2. **Fragen-Screen** → alle Aussagen auf einmal, je Zeile: `✅ Ja | ❌ Nein | 🔊`
3. Feedback sofort pro Zeile (grün/rot + TTS mit 120ms Delay)
4. `Weiter ✅` erst aktiv wenn alle beantwortet

**BILD_CROP:**
```javascript
var BILD_CROP = {
  "bello_dino":     { width:"122.0%", ml:"-13.4%", mt:"-26.8%" },
  "fisch_comic":    { width:"117.6%", ml:"-11.8%", mt:"-8.8%"  },
  "weltraum_flummi":{ width:"119.0%", ml:"-13.1%", mt:"-27.0%" },
  "krake_lies":     { width:"175.4%", ml:"-36.8%", mt:"-76.9%" },
  "pizza_mia":      { width:"126.6%", ml:"-15.2%", mt:"-19.5%" },
  "taucher_lies":   { width:"122.0%", ml:"-13.4%", mt:"-26.8%" }  // Schätzwert → neu croppen!
};
```

---

## Bluetooth-Audio (🔴 offen)

**listener.ps1 v4** und **geraete.js** sind deployed. Einziger offener Schritt:
```powershell
Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
```
Danach: `lernwelt_starten.exe` neu starten → Audio-Dialog erscheint beim Start → JBL Clip 5 wählbar.

---

## Bekannte technische Eigenheiten (Edge file://)

| Problem | Lösung |
|---|---|
| `getVoices()` leer beim Start | `voiceschanged` Event + 800ms Fallback |
| Wortanfang nach `cancel()` verschluckt | 120ms Delay vor `speak()` |
| `fetch()` blockiert | XHR mit `status === 0` als Erfolg werten |
| iframe Cross-Origin blockiert | XHR + `<script>`-Tags |
| `import()` schlägt fehl | Immer `<script src="">` |
| Stimme klingt roboterhaft | Hedda ausschließen, Katja Online (Natural) priorisieren |
| XHR in test_suite blockiert | Edge mit `--allow-file-access-from-files --user-data-dir="C:\EdgeDwell"` |

---

## window.LaetitiaStats (stats.js)

`app/core/stats.js` — speichert Lernfortschritt in `localStorage["laetitia_stats_v1"]`, max. 200 Sessions.

**Session-Struktur:**
```javascript
{
  sessions: [{
    id: "1715689200000_deutsch", modul: "deutsch", stufe: "A2",
    ts: 1715689200000, abgeschlossen: true,
    aufgaben: [{
      id: "A2|1|Textanfang|Frage", richtig: true,
      gewaehlt: "A", hilfe: false, ms: 1500
    }]
  }]
}
```

**Pflicht-Aufruf-Reihenfolge in Spielseiten:**
```javascript
LaetitiaStats.sessionStart("deutsch", "A2");  // beim Seitenload
LaetitiaStats.taskStart();                    // vor Aufgabe anzeigen
LaetitiaStats.taskAnswer(id, richtig, gewaehlt, hilfe, null);  // nach Antwort
LaetitiaStats.markHilfe(taskId);             // wenn Hilfe genutzt
LaetitiaStats.sessionEnd(true/false);        // bei Verlassen
```

**Analyse (in statistik.html):**
```javascript
LaetitiaStats.schwacheAufgaben(modul)   // ≥30% Fehlerrate, ≥2 Versuche
LaetitiaStats.hilfeWortRanking(modul)   // Aufgaben mit hilfe=true, absteigend
LaetitiaStats.levelEmpfehlungen(modul)  // ≥3× allesRichtig → nächste Stufe
LaetitiaStats.musterWarnung(modul, 10)  // >70% dieselbe Option → Warnung
```

Derzeit eingebunden in: `lesen.html`, `deutsch.html`, `logik.html`, `mathe.html`, `mathe_test.html`, `sinnesorgane_quiz.html`, `statistik.html`.

---

## error_handler.js v3 — Features

`app/core/error_handler.js` — einbinden in jede Spielseite.

| # | Feature |
|---|---|
| 1 | Globale JS-Fehler (`window.onerror` + `unhandledrejection`) |
| 2 | TTS-Watchdog (12s Timeout → `LaetitiaSprich.wrap`) |
| 3 | Page-Alive-Monitor (60s DOM/localStorage-Check) |
| 4 | localStorage-Schutzfunktionen |
| 5 | Fehler-Log (letzte 10) |
| 6 | Diagnose-Panel (via `localStorage["laetitia_diag_mode"]="1"`) |
| 7 | Not-Overlay mit `← Zurück zur Startseite` + Dwell + TTS |
| 8 | **Link-Navigator-Guard:** XHR-Check vor Navigation; bei fehlender Datei Overlay statt Browser-404 |

Capture-Phase Click-Handler fängt alle `<a>`-Klicks ab, prüft per XHR ob die Zieldatei existiert (bei `file://` ist status=0 = Erfolg), navigiert dann weiter oder zeigt Fehler-Overlay.

---

## validate.ps1 — 8 Prüfungen

Ausführen vor jedem `git push`: `powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1`

| # | Prüfung |
|---|---|
| 1 | depth-Kommentare in allen HTML-Dateien |
| 2 | dwell.js nie als import() |
| 3 | Keine typografischen Anführungszeichen in JS |
| 4 | error_handler.js in Spielseiten eingebunden |
| 5 | stats.js in Spielseiten eingebunden |
| 6 | Inline-`<script>` > 20 Zeilen (WRN) |
| 7 | Kerndatei-Integrität |
| 8 | **NEU: href-Links — alle Zieldateien vorhanden** |

Prüfung 8 löst sofort beim Deployment-Check Fehler aus, bevor der Browser eine 404-Seite zeigt.

---

## Grammatik-Werkstatt Auto-Weiter (seit 17.05.2026)

Nach jeder Antwort läuft folgende Sequenz ab:

1. Buttons sofort ausblenden (`display:none`)
2. Feedback-Text + TTS-Lob starten
3. Nach TTS-Ende: 3 Sekunden warten
4. Weiter-Button einblenden (für sofortiges Vorwärts per Dwell)
5. Nach 3 Sekunden: automatisch nächste Aufgabe

```javascript
var autoTimer = null;
function starteAutoWeiter(fn){
  if(autoTimer){ clearTimeout(autoTimer); autoTimer = null; }
  autoTimer = setTimeout(function(){ autoTimer = null; fn(); }, 3000);
}
// Aufruf im TTS-danach-Callback:
sprich(lobText, function(){
  zeigWeiterBtn();
  starteAutoWeiter(naechsteAufgabe);
});
```

`stoppAutoWeiter()` aufrufen beim: Einheitsstart, Erklär-Screen, Aufgabenwechsel, Überspringen, Fertig-Screen.

---

## Grammatik-Werkstatt (seit: 2026-05-14)

Erreichbar: `schule.html` → Grammatik → `grammatik.html` → `grammatik_spiel.html?einheit=E-XX`

**Dateien:**
```
app/modules/schule/
  grammatik.html            — Einheiten-Übersicht (lila Akzent #7c3aed)
  grammatik_spiel.html      — Spielseite
  grammatik_data.js         — GRAMMATIK_EINHEITEN Array (alle Einheiten + Aufgaben)
  grammatik_mod.js          — window.GrammatikMod.starteEinheit(id)
  grammatik_uebersicht.js   — window.GrammatikUebersicht.baueUebersicht()
```

**5 Aufgabentypen (alle dwell-optimiert, max. 1 Klick pro Aufgabe):**

| Typ | Beschreibung | Buttons |
|---|---|---|
| `ja_nein` | Ja / Nein | 2 große Buttons |
| `ab_wahl` | A oder B | 2 Buttons |
| `abc_wahl` | A / B / C | 3 Buttons vertikal gestapelt |
| `wort_button` | Wort im Satz anklicken | max. 4 Wort-Buttons |
| `richtig_falsch` | Satz richtig oder falsch | 2 Buttons |

**Datenstruktur je Einheit:**
```javascript
{
  id: "E-03", titel: "...", emoji: "🏷️", stufe: 1,
  erklaerung_tts: "...",      // Katja spricht beim Erklär-Screen
  erklaerung_merksatz: "...", // großer Text auf dem Erklär-Screen
  aufgaben: [
    { typ: "ja_nein", frage: "...", tts: "...", richtig: "ja"|"nein", erklaerung: "..." },
    { typ: "ab_wahl", frage: "...", tts: "...", option_a: "...", option_b: "...", richtig: "a"|"b", erklaerung: "..." },
    { typ: "abc_wahl", ..., option_c: "...", richtig: "a"|"b"|"c", ... },
    { typ: "wort_button", frage: "...", tts: "...", woerter: ["Der","Hund","bellt."], richtig: 2, erklaerung: "..." },
    { typ: "richtig_falsch", frage: "...", satz: "...", tts: "...", richtig: "richtig"|"falsch", erklaerung: "..." }
  ]
}
```

**Freischalt- und Fortschritts-Logik:**
- Storage: `localStorage["laetitia_grammatik_v1"]`
- Freischaltung: Vorgänger-Einheit `abgeschlossen:true` → nächste frei
- Meisterung: ≥80% in einer Session → Gold-Stern ⭐
- Falsch beantwortete Aufgaben kommen am Ende nochmal (wiederholungsQueue)

**Implementierter Lernpfad:**

| Stufe | Einheiten | Thema | Aufgaben | Status |
|---|---|---|---|---|
| 0 | E-00–E-02 | Satz und Wort | 28 | ✅ |
| 1 | E-03–E-09 | Nomen, Verben, Adjektive | 70 | ✅ |
| 2 | E-10–E-14 | Artikel der/die/das | 50 | ✅ |
| 3 | E-15–E-20 | Sätze bauen (Subjekt/Prädikat/Objekt) | 60 | ✅ |
| 4 | E-21–E-26 | Konjugation Gegenwart | 60 | ✅ |
| 5 | E-27–E-30 | Singular & Plural | 40 | ✅ |
| 6 | E-31–E-34 | Groß-/Kleinschreibung | 40 | ✅ |
| 7–13 | E-35–E-61 | Kasus, Pronomen, Satzzeichen … | — | ⬜ offen |

---

## Deployment-Workflow (wichtig!)

Der OneDrive-Ordner (`C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/`) ist **kein Git-Repo**.
Nach jedem `git push` müssen geänderte Dateien manuell kopiert werden, z.B.:
```powershell
cp app/modules/schule/grammatik*.* "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/schule/"
```

**PFLICHT nach jedem `cp`: `attrib +P` ausführen.**
OneDrive "Dateien bei Bedarf" markiert neue Dateien als Online-Only. Der `error_handler.js`-XHR-Check
schlägt dann fehl → alle Module zeigen "Datei nicht gefunden". Fix:
```powershell
attrib +P "C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/*.*" /S /D
```
Dann Edge komplett neu starten.

---

## Offene Aufgaben

### 🔴 Dringend
- **Grammatik Stufe 6 implementieren:** E-31–E-34 (Groß-/Kleinschreibung — Nomen groß, Verben/Adjektive klein)
- **Bluetooth-Modul aktivieren:** `Install-Module AudioDeviceCmdlets` (einmalig als Admin)
- **taucher_lies** Crop-Werte korrigieren (aktuell Schätzwert)
- **Neues Lies-mal-3-Buch** → 6 Comic-Seiten (S. 2, 8, 14, 16, 22, 28) fotografieren → hochladen
- **Rule-13-Backlog:** 48 HTML-Dateien mit Inline-`<script>` > 20 Zeilen — schrittweise auslagern

### 🟡 Mittelfristig
- Mathe-Hefte (Mathe1/2/3.pdf) → Aufgaben digitalisieren → `schule_mathe_data.js`
- Sachkunde-Bilder für: `wiese`, `apfelbaum`, `gaensebluemchen`, `kirschbaum`, `hyazinthe`, `narzisse`, `krokus`
- `schule_lies` Zeichnungen (nach Buchkauf)
- stats.js in weitere Spielseiten einbinden (Regel 15 vollständig umsetzen)

### ⬜ Noch nicht angegangen
- TAGESPLAN, QUASSEL-ÜBERGANG, SONOS-Steuerung, AUFMERKSAMKEITS-SIGNAL (Fritz!Box)

---

## Wichtige Warnung

Claude darf **niemals** Kerndateien (`dwell.js`, `error_handler.js`, `geraete.js`) aus dem Gedächtnis rekonstruieren. Immer hochladen lassen.

---

## Changelog (Projekt-Wissen)

| Datum | Was |
|---|---|
| 2026-04-08 | Erstanlage — System, TTS, Goldstandards |
| 2026-04-23 | Schule-Architektur, schule_jaein-Konzept, BILD_CROP, Bluetooth |
| 2026-05-03 | Sachkunde (sinnesorgane), Lies-mal-3, Schach-Goldstandard |
| 2026-05-14 | stats.js API dokumentiert; Rule-12-Backlog erledigt |
| 2026-05-14 | Grammatik-Werkstatt (E-00–E-14, 148 Aufgaben); OneDrive-Pfad korrigiert; sinnesorgane_info_mod.js TTS auf Goldstandard; Deployment-Workflow dokumentiert |
| 2026-05-17 | 17 Goldstandards (Rules 12–17); error_handler.js v3 (Link-Navigator-Guard); validate.ps1 Prüfung 8 (href-Check); Grammatik Stufe 3 (E-15–E-20, 60 Aufgaben) + Stufe 4 (E-21–E-26, 60 Aufgaben); Lese/Aktions-Trennung als Goldstandard 17; Grammatik Auto-Weiter (3s nach TTS); grammatik_mod.js v3; index.html: Aussprache Lätitia + Katja-Stimme |
