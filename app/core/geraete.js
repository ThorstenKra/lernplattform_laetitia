// geraete.js (v1)
// Laetitia Lernsystem -- Zentrales Geraete- und Audio-Modul
// Ablage: app/core/geraete.js
// Einbindung: <script src="../../core/geraete.js"></script>  (Pfad je Modultiefe anpassen)
//
// GOLDSTANDARD-REGEL: Diese Datei nie aus dem Gedaechtnis schreiben.
// Immer die aktuelle Version hochladen lassen.
//
// Bereitgestellte Funktionen (window.LaetitiaGeraete):
//   .initLautstaerke(opts)        -- Lautstaerkeregler einrichten
//   .ladeVolumen()                -- aktuellen Lautstaerkewert lesen
//   .setzeVolumen(v)              -- Lautstaerke setzen + speichern
//   .audioGeraet()                -- "jbl" oder "intern" (aus localStorage)
//   .audioUmschalten(geraet, cb)  -- JBL oder intern umschalten via listener.ps1
//   .jblPruefen(cb)               -- JBL-Verfuegbarkeit pruefen via listener.ps1
//   .internZurueck()              -- Intern-Umschaltung ohne Callback (fuer Quassel-Button)

(function(w){
  "use strict";

  // ── Konstanten ─────────────────────────────────────────────────────────────
  var VOL_MIN      = 0.1;
  var VOL_MAX      = 0.8;   // 80% Obergrenze (Lautsprecherschutz)
  var VOL_STEP     = 0.1;
  var VOL_KEY_JBL  = "laetitia_lautstaerke_jbl";
  var VOL_KEY_INT  = "laetitia_lautstaerke_intern";
  var GERAET_KEY   = "laetitia_audio_geraet";   // "jbl" | "intern"
  var LISTENER_URL = "http://localhost:9999";
  var TIMEOUT_MS   = 4000;

  // ── Internes Hilfsmittel: fetch mit Timeout ────────────────────────────────
  function fetchMitTimeout(url, ms) {
    var controller = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var timer;
    var p = new Promise(function(resolve, reject) {
      timer = setTimeout(function() {
        if (controller) controller.abort();
        reject(new Error("timeout"));
      }, ms);
      fetch(url, {
        mode: "cors",
        signal: controller ? controller.signal : undefined
      }).then(function(r) {
        clearTimeout(timer);
        resolve(r);
      }).catch(function(e) {
        clearTimeout(timer);
        reject(e);
      });
    });
    return p;
  }

  // ── Lautstaerke-Hilfsfunktionen ────────────────────────────────────────────
  function aktuellerVolKey() {
    var g = ladeGeraet();
    return (g === "jbl") ? VOL_KEY_JBL : VOL_KEY_INT;
  }

  function ladeGeraet() {
    var g = localStorage.getItem(GERAET_KEY);
    return (g === "jbl") ? "jbl" : "intern";
  }

  function ladeVolumen() {
    var key = aktuellerVolKey();
    var def = (ladeGeraet() === "jbl") ? 0.6 : 0.7;
    var v = parseFloat(localStorage.getItem(key));
    if (isNaN(v) || v < VOL_MIN || v > VOL_MAX) v = def;
    return v;
  }

  function speichereVolumen(v) {
    localStorage.setItem(aktuellerVolKey(), String(v));
  }

  function setzeVolumen(v, onAendern) {
    if (v < VOL_MIN) v = VOL_MIN;
    if (v > VOL_MAX) v = VOL_MAX;
    speichereVolumen(v);
    if (typeof onAendern === "function") onAendern(v);
    return v;
  }

  // ── Lautstaerke-Anzeige aktualisieren ──────────────────────────────────────
  function aktualisiereAnzeige(anzeigeId, v) {
    var el = document.getElementById(anzeigeId);
    if (!el) return;
    el.textContent = Math.round(v * 100) + "%";
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  var LaetitiaGeraete = {

    // Lautstaerke initialisieren und Buttons verdrahten
    // opts = {
    //   btnPlus:   "btnVolPlus",   -- ID des Plus-Buttons
    //   btnMinus:  "btnVolMinus",  -- ID des Minus-Buttons
    //   anzeige:   "volAnzeige",   -- ID des Anzeige-Elements (optional)
    //   onAendern: function(v){}   -- Callback wenn Lautstaerke sich aendert
    // }
    initLautstaerke: function(opts) {
      opts = opts || {};
      var anzeige  = opts.anzeige  || "volAnzeige";
      var onAend   = opts.onAendern || function(){};

      // Initiale Anzeige
      var v0 = ladeVolumen();
      aktualisiereAnzeige(anzeige, v0);
      onAend(v0);

      // Plus-Button
      var btnPlus = document.getElementById(opts.btnPlus || "btnVolPlus");
      if (btnPlus) {
        btnPlus.addEventListener("click", function() {
          var neu = setzeVolumen(ladeVolumen() + VOL_STEP, onAend);
          aktualisiereAnzeige(anzeige, neu);
        });
      }

      // Minus-Button
      var btnMinus = document.getElementById(opts.btnMinus || "btnVolMinus");
      if (btnMinus) {
        btnMinus.addEventListener("click", function() {
          var neu = setzeVolumen(ladeVolumen() - VOL_STEP, onAend);
          aktualisiereAnzeige(anzeige, neu);
        });
      }
    },

    // Aktuellen Lautstaerkewert lesen (fuer audio.volume beim Start)
    ladeVolumen: ladeVolumen,

    // Lautstaerke direkt setzen (z.B. beim Laden eines neuen Tracks)
    setzeVolumen: function(v, onAendern) {
      return setzeVolumen(v, onAendern);
    },

    // Aktives Geraet abfragen
    audioGeraet: ladeGeraet,

    // Audio auf JBL oder intern umschalten
    // geraet: "jbl" | "intern"
    // cb: function(erfolg, fehlerText)
    audioUmschalten: function(geraet, cb) {
      cb = cb || function(){};
      if (geraet === "intern") {
        // Intern: localStorage sofort setzen, Callback sofort, Listener optional
        localStorage.setItem(GERAET_KEY, "intern");
        cb(true, null);
        try {
          fetch(LISTENER_URL + "/audio?geraet=intern", { mode: "no-cors" })
            .catch(function(){});
        } catch(e) {}
        return;
      }
      var url = LISTENER_URL + "/audio?geraet=" + geraet;
      fetchMitTimeout(url, TIMEOUT_MS)
        .then(function(r) {
          if (r.ok || r.status === 0) {
            localStorage.setItem(GERAET_KEY, geraet);
            cb(true, null);
          } else {
            cb(false, "HTTP " + r.status);
          }
        })
        .catch(function(e) {
          cb(false, e.message || "Verbindungsfehler");
        });
    },

    // Listener-Erreichbarkeit pruefen (kurzer Timeout)
    // cb: function(erreichbar) -- true wenn listener.ps1 laeuft
    listenerPruefen: function(cb, ms) {
      cb = cb || function(){};
      fetchMitTimeout(LISTENER_URL + "/audio?check=jbl", ms || 500)
        .then(function() { cb(true); })
        .catch(function() { cb(false); });
    },

    // JBL-Verfuegbarkeit pruefen
    // cb: function(verfuegbar)
    jblPruefen: function(cb) {
      cb = cb || function(){};
      var url = LISTENER_URL + "/audio?check=jbl";
      fetchMitTimeout(url, TIMEOUT_MS)
        .then(function(r) { return r.text(); })
        .then(function(t) { cb(t.trim() === "ok"); })
        .catch(function() { cb(false); });
    },

    // Intern zurueckschalten ohne Callback (feuern und vergessen)
    // Wird vom Quassel-Button in index.html genutzt
    internZurueck: function() {
      localStorage.setItem(GERAET_KEY, "intern");
      try {
        fetch(LISTENER_URL + "/audio?geraet=intern", { mode: "no-cors" })
          .catch(function(){});
      } catch(e) {}
    }

  };

  w.LaetitiaGeraete = LaetitiaGeraete;

})(window);
