// mathe_module.js -- Laetitia Lernsystem
// Stand: 2026-04-09

(function(){
  "use strict";

  var kit = window.LaetitiaModuleKit;
  if(!kit || typeof kit.createFourChoiceModule !== "function"){
    var st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: moduleKit fehlt.";
    return;
  }

  // ── Zähl-Animation bei falscher Antwort (nur M0-Stufen) ──────────────────────

  function istZaehlAufgabe(t){
    return t && typeof t.stufe === "string" &&
           t.stufe.toUpperCase().indexOf("M0") === 0 &&
           typeof t.frage === "string";
  }

  function symboleAusFrage(frageText){
    // Emojis zeichenweise extrahieren (funktioniert auf Edge ohne Unicode-Property-Escapes)
    var ergebnis = [];
    var zeichen = Array.from(frageText); // korrekte Graphem-Trennung für BMP
    for(var i = 0; i < zeichen.length; i++){
      var cp = zeichen[i].codePointAt(0);
      // Alles ab U+2600 (Symbole, Emojis) mitnehmen, Ziffern/Leerzeichen weglassen
      if(cp >= 0x2600){
        // ZWJ-Sequenzen zusammenführen (200D = Zero Width Joiner)
        var sym = zeichen[i];
        while(i + 1 < zeichen.length){
          var next = zeichen[i + 1];
          var ncp  = next.codePointAt(0);
          // Variation Selector \uFE0F, ZWJ \u200D, Hautton-Modifier
          if(ncp === 0xFE0F || ncp === 0x200D ||
             (ncp >= 0x1F3FB && ncp <= 0x1F3FF) ||
             ncp === 0x20E3){
            sym += next;
            i++;
          } else {
            break;
          }
        }
        ergebnis.push(sym);
      }
    }
    return ergebnis;
  }

  function spielTon(freq){
    try{
      var ctx  = new (window.AudioContext || window.webkitAudioContext)();
      var osc  = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.42, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.30);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.30);
      // Context nach dem Ton schließen (Edge: kein Memory-Leak)
      setTimeout(function(){ try{ ctx.close(); }catch(e){} }, 600);
    }catch(e){}
  }

  function sprich(text){
    try{
      // Kein cancel() hier — würde den gleichzeitigen Ton abschneiden.
      // SpeechSynthesis arbeitet parallel zum Web Audio API.
      var u = new SpeechSynthesisUtterance(String(text));
      var voices = window.speechSynthesis.getVoices();
      var de = voices.find(function(v){
        return (v.lang || "").toLowerCase().startsWith("de");
      });
      if(de) u.voice = de;
      u.rate   = 0.80;
      u.pitch  = 1.10;
      u.volume = 1.0;
      window.speechSynthesis.speak(u);
    }catch(e){}
  }

  // Aufsteigende Pentatonik-Töne C-Dur (für bis zu 10 Symbole)
  var ZAEHLTOENE = [262, 294, 330, 392, 440, 523, 587, 659, 784, 880];

  // Alle laufenden Zähl-Timers — damit sie beim Weiter-Drücken abbrechbar sind
  var _zaehlTimers = [];

  function abbrechenZaehlAnimation(){
    // Alle laufenden Timeouts stoppen
    _zaehlTimers.forEach(function(id){ clearTimeout(id); });
    _zaehlTimers = [];
    // TTS sofort stoppen
    try{ window.speechSynthesis.cancel(); }catch(e){}
    // Overlay verstecken und aufräumen
    var overlay   = document.getElementById("zaehlOverlay");
    var symbolBox = document.getElementById("zaehlSymbole");
    var zahlBox   = document.getElementById("zaehlZahl");
    if(overlay)   overlay.classList.remove("show");
    if(symbolBox) symbolBox.innerHTML = "";
    if(zahlBox)   zahlBox.textContent = "";
  }

  function zeigeZaehlAnimation(t){
    var overlay = document.getElementById("zaehlOverlay");
    if(!overlay) return;

    var symbole = symboleAusFrage(t.frage || "");
    if(symbole.length < 1) return;

    // Vorherige Animation sicher abbrechen
    abbrechenZaehlAnimation();

    // Overlay aufräumen und anzeigen
    var symbolBox = document.getElementById("zaehlSymbole");
    var zahlBox   = document.getElementById("zaehlZahl");
    var labelBox  = document.getElementById("zaehlLabel");
    if(!symbolBox || !zahlBox) return;

    symbolBox.innerHTML = "";
    zahlBox.textContent = "";
    zahlBox.className   = "zaehlZahl";
    if(labelBox) labelBox.textContent = "Lass uns zusammen zählen!";
    overlay.classList.add("show");

    var schrittMs = 1500;

    // Zeilen-Container vorerstellen: je 5 Symbole eine Zeile
    var anzahlZeilen = Math.ceil(symbole.length / 5);
    var zeilenEls = [];
    for(var z = 0; z < anzahlZeilen; z++){
      var zeile = document.createElement("div");
      zeile.className = "zaehlZeile";
      symbolBox.appendChild(zeile);
      zeilenEls.push(zeile);
    }

    symbole.forEach(function(sym, i){
      var tid = setTimeout(function(){
        // Symbol in die richtige Zeile einblenden
        var zeilennr = Math.floor(i / 5);
        var el = document.createElement("span");
        el.className   = "zaehlSym";
        el.textContent = sym;
        zeilenEls[zeilennr].appendChild(el);

        // Zahl aktualisieren + Blink-Animation neu starten
        zahlBox.textContent = String(i + 1);
        zahlBox.classList.remove("zahlBlink");
        void zahlBox.offsetWidth;
        zahlBox.classList.add("zahlBlink");

        // Ton + TTS gleichzeitig
        spielTon(ZAEHLTOENE[Math.min(i, ZAEHLTOENE.length - 1)]);
        sprich(String(i + 1));

        // Nach dem letzten Symbol: stehen lassen, dann schließen
        if(i === symbole.length - 1){
          var tidEnd = setTimeout(function(){
            overlay.classList.remove("show");
            symbolBox.innerHTML = "";
            zahlBox.textContent = "";
          }, 1800);
          _zaehlTimers.push(tidEnd);
        }
      }, i * schrittMs);
      _zaehlTimers.push(tid);
    });
  }

  // ── Rechenweg-Animation bei falscher Antwort (nur M1-M4) ──────────────────────
  // Nutzt dasselbe Zaehl-Overlay wie M0, aber mit Punkten statt Frage-Emojis:
  // Addition zeigt erst die Ausgangszahl (blau), dann die dazukommende Zahl
  // (gruen), weiterzaehlend. Subtraktion zeigt erst alle Punkte, nimmt danach
  // welche weg (rotes Kreuz), rueckwaerts zaehlend.

  function istRechenAufgabe(t){
    return t && (t.stufe === "M1" || t.stufe === "M2" || t.stufe === "M3" || t.stufe === "M4");
  }

  function parseRechenaufgabe(text){
    var m = /^\s*(\d+)\s*([+\-])\s*(\d+)\s*=/.exec(text || "");
    if(!m) return null;
    return { a: parseInt(m[1], 10), op: m[2], b: parseInt(m[3], 10) };
  }

  function zeigeRechenwegAnimation(t){
    var overlay = document.getElementById("zaehlOverlay");
    if(!overlay) return;

    var aufgabe = parseRechenaufgabe(t.text || "");
    if(!aufgabe) return;

    // Vorherige Animation sicher abbrechen
    abbrechenZaehlAnimation();

    var symbolBox = document.getElementById("zaehlSymbole");
    var zahlBox   = document.getElementById("zaehlZahl");
    var labelBox  = document.getElementById("zaehlLabel");
    if(!symbolBox || !zahlBox) return;

    symbolBox.innerHTML = "";
    zahlBox.textContent = "";
    zahlBox.className   = "zaehlZahl";
    if(labelBox) labelBox.textContent = aufgabe.op === "+" ? "Lass uns zusammen rechnen!" : "Lass uns zusammen wegnehmen!";
    overlay.classList.add("show");

    var schrittMs   = 1500;
    var anzahlPunkte = aufgabe.op === "+" ? (aufgabe.a + aufgabe.b) : aufgabe.a;
    var anzahlZeilen = Math.ceil(Math.max(anzahlPunkte, 1) / 5);
    var zeilenEls = [];
    for(var z = 0; z < anzahlZeilen; z++){
      var zeile = document.createElement("div");
      zeile.className = "zaehlZeile";
      symbolBox.appendChild(zeile);
      zeilenEls.push(zeile);
    }

    function zeigeSchluss(){
      var tidEnd = setTimeout(function(){
        overlay.classList.remove("show");
        symbolBox.innerHTML = "";
        zahlBox.textContent = "";
      }, 1800);
      _zaehlTimers.push(tidEnd);
    }

    function aktualisiereZahl(wert){
      zahlBox.textContent = String(wert);
      zahlBox.classList.remove("zahlBlink");
      void zahlBox.offsetWidth;
      zahlBox.classList.add("zahlBlink");
    }

    if(aufgabe.op === "+"){
      for(var i = 0; i < anzahlPunkte; i++){
        (function(i){
          var farbe = i < aufgabe.a ? "🔵" : "🟢";
          var tid = setTimeout(function(){
            var zeilennr = Math.floor(i / 5);
            var el = document.createElement("span");
            el.className   = "zaehlSym";
            el.textContent = farbe;
            zeilenEls[zeilennr].appendChild(el);

            aktualisiereZahl(i + 1);
            spielTon(ZAEHLTOENE[Math.min(i, ZAEHLTOENE.length - 1)]);
            sprich(String(i + 1));

            if(i === anzahlPunkte - 1) zeigeSchluss();
          }, i * schrittMs);
          _zaehlTimers.push(tid);
        })(i);
      }
    } else {
      // Subtraktion: erst alle a Punkte zeigen ...
      for(var k = 0; k < aufgabe.a; k++){
        (function(k){
          var tid = setTimeout(function(){
            var zeilennr = Math.floor(k / 5);
            var el = document.createElement("span");
            el.className   = "zaehlSym";
            el.textContent = "🔵";
            zeilenEls[zeilennr].appendChild(el);

            aktualisiereZahl(k + 1);
            spielTon(ZAEHLTOENE[Math.min(k, ZAEHLTOENE.length - 1)]);
          }, k * schrittMs);
          _zaehlTimers.push(tid);
        })(k);
      }
      // ... danach b Punkte der Reihe nach wegnehmen (rueckwaerts zaehlen)
      var wegnahmeStart = aufgabe.a * schrittMs + 400;
      for(var j = 0; j < aufgabe.b; j++){
        (function(j){
          var tid = setTimeout(function(){
            var uebrig = symbolBox.querySelectorAll(".zaehlSym:not(.zaehlWeg)");
            var letztes = uebrig[uebrig.length - 1];
            if(letztes){
              letztes.classList.add("zaehlWeg");
              letztes.textContent = "❌";
            }
            var verbleibend = aufgabe.a - j - 1;
            aktualisiereZahl(verbleibend);
            spielTon(ZAEHLTOENE[Math.min(Math.max(verbleibend, 0), ZAEHLTOENE.length - 1)]);
            sprich(String(verbleibend));

            if(j === aufgabe.b - 1) zeigeSchluss();
          }, wegnahmeStart + j * schrittMs);
          _zaehlTimers.push(tid);
        })(j);
      }
    }
  }

  // ── Emoji → deutscher Name ────────────────────────────────────────────────────
  var EMOJI_NAMEN = {
    "🍎": "Äpfel",      "🐱": "Katzen",     "⭐": "Sterne",
    "🐣": "Küken",      "🌸": "Blüten",     "🍭": "Lutscher",
    "🐠": "Fische",     "🌈": "Regenbögen", "🦋": "Schmetterlinge",
    "🍓": "Erdbeeren",  "🐸": "Frösche",    "🌻": "Sonnenblumen",
    "🍊": "Orangen",    "🐧": "Pinguine",   "🎈": "Luftballons",
    "🌙": "Monde",      "🍀": "Kleeblätter","🐝": "Bienen",
    "🎵": "Noten",      "🌺": "Blumen",     "⭐": "Sterne",
    "🌟": "Sterne",     "🍒": "Kirschen",   "🐟": "Fische",
    "🌟": "Funkel-Sterne", "🍇": "Trauben", "🐛": "Raupen",
    "🎪": "Zelte",      "🦆": "Enten",      "🍄": "Pilze"
  };

  // Erstes Emoji aus dem Fragetext lesen und deutschen Namen nachschlagen
  function emojiNameAusFrage(frageText){
    var symbole = symboleAusFrage(frageText || "");
    if(!symbole.length) return "";
    var sym = symbole[0];
    return EMOJI_NAMEN[sym] || "";
  }

  // Aufgabentext für TTS zusammenbauen: "Wie viele Sterne siehst du?"
  function sprechAufgabe(t, fertig){
    if(!t){ if(fertig) fertig(); return; }
    var AQ = window.LaetitiaAudioQueue;
    if(!AQ || typeof AQ.speak !== "function"){ if(fertig) fertig(); return; }

    var text = (t.text || "").trim();

    // Nur für M0-Stufen: Symbol-Namen einsetzen
    if(istZaehlAufgabe(t)){
      var name = emojiNameAusFrage(t.frage || "");
      if(name){
        // "Wie viele siehst du?" → "Wie viele Sterne siehst du?"
        // Einfügung vor "siehst" oder am Ende des Textes
        if(text.indexOf("siehst du") !== -1){
        // M0a–M0c: "Wie viele siehst du?" → "Wie viele Sterne siehst du?"
        text = text.replace("siehst du", name + " siehst du");
      } else if(text.indexOf("wie viele jetzt") !== -1){
        // M0d/M0e: "wie viele jetzt?" → "wie viele Sterne jetzt?"
        text = text.replace("wie viele jetzt", "wie viele " + name + " jetzt");
      } else if(text.indexOf("?") !== -1){
        text = text.replace("?", " " + name + "?");
      } else {
        text = text + " " + name;
      }
      }
    }

    AQ.speak(text, 0.90, fertig);
  }



  // ── 4-Stufen-Navigation: ?kat=<id> filtert die Level-Liste ──────────────────
  var VOLLE_LEVEL_REIHENFOLGE = ["M0a","M0b","M0c","M0f","M0d","M0e","M1_NACHBAR","M1_REIHE","M1","M2","M3","M4"];
  var MATHE_KATEGORIEN = {
    grundlagen:      ["M0a","M0b","M0c","M0f"],
    fortgeschritten: ["M0d","M0e","M1_NACHBAR","M1_REIHE"],
    profi:           ["M1","M2"],
    champion:        ["M3","M4"]
  };
  var matheKat = new URLSearchParams(window.location.search).get("kat");
  var gefilterteReihenfolge = MATHE_KATEGORIEN[matheKat] || VOLLE_LEVEL_REIHENFOLGE;

  var mod = kit.createFourChoiceModule({
    moduleId:   "mathe",
    moduleName: "Mathematik",
    icon:       "🔢",
    dataKey:    "mathe",

    levelOrder: gefilterteReihenfolge,

    levelLabel: function(lv){
      var namen = {
        M0a:       "M0a - Zahlen bis 3",
        M0b:       "M0b - Zahlen bis 5",
        M0c:       "M0c - Zahlen bis 10",
        M0f:       "M0f - Zahlen bis 20",
        M0d:       "M0d - Eins dazulegen",
        M0e:       "M0e - Zwei dazulegen",
        M1_NACHBAR:"M1N - Nachbarzahlen",
        M1_REIHE:  "M1R - Zahlenreihen",
        M1:        "M1 - Addition bis 10",
        M2:        "M2 - Subtraktion bis 10",
        M3:        "M3 - Addition bis 20",
        M4:        "M4 - Subtraktion bis 20"
      };
      return namen[lv] || lv;
    },

    allowUnlock: false,

    finishTextGut:    "Du bist fantastisch!",
    finishTextWeiter: "Du bist sehr fleissig. Gib nicht auf!",

    // Neue Aufgabe: laufende Zähl-Animation sofort abbrechen
    onNewTask: function(){
      abbrechenZaehlAnimation();
    },

    // Aufgabentext vorlesen mit Symbol-Namen (M0) oder normalem Text
    onSpeakTask: function(t, fertig){
      sprechAufgabe(t, fertig);
    },

    // Zähl-Animation (M0) bzw. Rechenweg-Animation (M1-M4) bei falscher Antwort
    onWrongAnswer: function(t){
      // Wird erst aufgerufen wenn die Falsch-Audio-Sequenz komplett abgespielt ist
      if(istZaehlAufgabe(t)){
        zeigeZaehlAnimation(t);
      } else if(istRechenAufgabe(t)){
        zeigeRechenwegAnimation(t);
      }
    },

    audio: {
      lob: [
        "audio/lob_01.wav","audio/lob_02.wav","audio/lob_03.wav",
        "audio/lob_04.wav","audio/lob_05.wav","audio/lob_06.wav",
        "audio/lob_07.wav","audio/lob_08.wav","audio/lob_09.wav",
        "audio/lob_10.wav"
      ],
      abschluss: [
        "audio/abschluss_01.wav","audio/abschluss_02.wav","audio/abschluss_03.wav",
        "audio/abschluss_04.wav","audio/abschluss_05.wav"
      ],
      falsch:       "audio/system_falsch.wav",
      richtigWaere: "audio/system_richtig_waere.wav",
      geschafft:    "audio/system_geschafft.wav",
      freischalten: "audio/system_freischalten.wav"
    }
  });

  mod.init().then(function(){
    // Erfolgreich
  }).catch(function(err){
    var st = document.getElementById("topStatus");
    if(st) st.innerHTML = "<strong>Status:</strong> Fehler: " + String(err && err.message ? err.message : err);
  });

})();
