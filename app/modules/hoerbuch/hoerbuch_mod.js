// hoerbuch_mod.js -- Laetitia Lernsystem
// Hörspiel-Modul: Bücherliste + Player mit Lesezeichen
// Stand: 2026-03-28
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  // ── Hilfsfunktionen ─────────────────────────────────────────────────────────
  function $(id){ return document.getElementById(id); }

  function setStatus(msg){
    var el = $("topStatus");
    if(el) el.innerHTML = "<strong>Status:</strong> " + msg;
  }

  // ── Dwell (Regel 1: nur window.LaetitiaAttachDwell) ─────────────────────────
  var _attachDwell = null;
  var _dwellHandle = null;

  function loadDwell(){
    if(_attachDwell) return _attachDwell;
    if(typeof window.LaetitiaAttachDwell === "function"){
      _attachDwell = window.LaetitiaAttachDwell;
    } else {
      _attachDwell = function(){ return { cancelDwell: function(){} }; };
    }
    return _attachDwell;
  }

  // Audio-Kontext entsperren beim ersten echten Pointer-Event
  var _audioUnlocked = false;
  function unlockAudio(){
    if(_audioUnlocked) return;
    _audioUnlocked = true;
    try{
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume().then(function(){ ctx.close(); });
    }catch(e){}
  }
  document.addEventListener("pointerdown", unlockAudio, { once: false, capture: true });
  document.addEventListener("mousedown",   unlockAudio, { once: false, capture: true });

  function rebindDwell(){
    if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
      _dwellHandle.cancelDwell();
    }
    var attach = loadDwell();
    var LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
    _dwellHandle = attach(
      "a.uibtn, button.uibtn, a.buchBtn, a.kapitelBtn, a.playerBtn, " +
      "a.pagerBtn, a.kapitelNr, " +
      "#btnReturnMain, #btnReturnBuecher, #btnResumeContinue, #btnVolMinus, #btnVolPlus, " +
      "#btnResumeBegin, #btnResumeChoose, #btnResumeClose",
      {
        dwellMs:    HOERBUCH_DWELL_MS,
        leaveGrace: LEAVE_GRACE,
        onActivate: function(el){
          if(el.getAttribute("aria-disabled") === "true") return;
          try{ el.click(); }catch(e){}
        }
      }
    );
  }


  // ── Lautstärke ──────────────────────────────────────────────────────────────
  var VOL_MIN  = 0.1;
  var VOL_MAX  = 0.8;   // 80% Obergrenze (Lautsprecherschutz)
  var VOL_STEP = 0.1;
  var VOL_KEY  = "laetitia_lautstaerke";

  function ladeVolumen(){
    var v = parseFloat(localStorage.getItem(VOL_KEY));
    if(isNaN(v) || v < VOL_MIN || v > VOL_MAX) v = 0.6;
    return v;
  }
  function speichereVolumen(v){
    localStorage.setItem(VOL_KEY, String(v));
  }
  function aktualisiereVolAnzeige(v){
    var el = document.getElementById("volAnzeige");
    if(el) el.textContent = "🔊 " + Math.round(v * 100) + "%";
  }
  function setzeVolumen(v){
    v = Math.round(v * 10) / 10;
    if(v < VOL_MIN) v = VOL_MIN;
    if(v > VOL_MAX) v = VOL_MAX;
    speichereVolumen(v);
    aktualisiereVolAnzeige(v);
    if(state.audio) state.audio.volume = v;
  }
  function bindVolButtons(){
    var btnMinus = document.getElementById("btnVolMinus");
    var btnPlus  = document.getElementById("btnVolPlus");
    if(btnMinus) btnMinus.addEventListener("click", function(ev){
      ev.preventDefault();
      setzeVolumen(ladeVolumen() - VOL_STEP);
    });
    if(btnPlus) btnPlus.addEventListener("click", function(ev){
      ev.preventDefault();
      setzeVolumen(ladeVolumen() + VOL_STEP);
    });
    aktualisiereVolAnzeige(ladeVolumen());
  }

  // ── Lesezeichen ──────────────────────────────────────────────────────────────
  function speicherzeichen(buchId, kapitelIndex, sekunden){
    try{
      localStorage.setItem(
        "laetitia_hoerbuch_" + buchId,
        JSON.stringify({
          kapitelIndex: kapitelIndex,
          zeitSekunden: Math.floor(sekunden),
          datum: new Date().toISOString().slice(0,10)
        })
      );
    }catch(e){}
  }

  function ladezeichen(buchId){
    try{
      var s = localStorage.getItem("laetitia_hoerbuch_" + buchId);
      return s ? JSON.parse(s) : null;
    }catch(e){ return null; }
  }

  function formatZeit(sek){
    sek = Math.floor(sek || 0);
    var m = Math.floor(sek / 60);
    var s = sek % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  // ── Alle Buecher laden ───────────────────────────────────────────────────────
  // Liest aus window.LaetitiaHoerspiele (Array von Buch-Objekten).
  // Jede info.js schreibt per: window.LaetitiaHoerspiele.push({...})
  function ladeBuecher(){
    var liste = window.LaetitiaHoerspiele;
    if(!Array.isArray(liste)) return [];
    return liste.filter(function(b){
      return b && b.id && Array.isArray(b.kapitel) && b.kapitel.length > 0;
    });
  }

  // ── State ───────────────────────────────────────────────────────────────────
  var state = {
    screen:        "buecher",   // "buecher" | "resume" | "player"
    buecher:       [],
    aktivBuch:     null,        // Buch-Objekt
    kapitelIndex:  0,
    kapitelSeite:  0,           // aktuelle Seite in der Kapitel-Liste
    audio:         null,        // HTMLAudioElement
    autoNext:      false,       // Auto-Weiterblättern laeuft
    geschwindigkeit: 1.0
  };

  // ── Screens ─────────────────────────────────────────────────────────────────
  function hideAll(){
    ["screenBuecher","screenResume","screenPlayer"].forEach(function(id){
      var el = $(id);
      if(el) el.classList.add("hidden");
    });
  }

  function zeigeScreenBuecher(){
    state.screen = "buecher";
    stopAudio();
    hideAll();
    var el = $("screenBuecher");
    if(el) el.classList.remove("hidden");
    baueBuecherliste();
    rebindDwell();
  }

  function zeigeScreenResume(buch){
    state.screen = "resume";
    state.aktivBuch = buch;
    hideAll();
    var el = $("screenResume");
    if(el) el.classList.remove("hidden");

    var zeichen = ladezeichen(buch.id);
    var titel = $("resumeTitel");
    var info  = $("resumeInfo");
    if(titel) titel.textContent = buch.titel;
    if(info && zeichen){
      var kap = buch.kapitel[zeichen.kapitelIndex];
      info.textContent = "Zuletzt: " + (kap ? kap.titel : "Kapitel " + (zeichen.kapitelIndex+1)) +
                         " — " + formatZeit(zeichen.zeitSekunden) + " Minuten";
    } else if(info){
      info.textContent = "Noch nicht angehört.";
    }
    rebindDwell();
  }

  function zeigeScreenPlayer(kapitelIndex, startSek){
    state.screen = "player";
    var buch = state.aktivBuch;
    if(!buch) return;
    state.kapitelIndex = kapitelIndex || 0;
    state.kapitelSeite = Math.floor(state.kapitelIndex / KAPITEL_PRO_SEITE);
    hideAll();
    var el = $("screenPlayer");
    if(el) el.classList.remove("hidden");

    // Cover
    var img = $("playerCover");
    if(img){
      img.src = buch.cover || "";
      img.style.display = buch.cover ? "block" : "none";
    }

    // Titel
    var t = $("playerTitel");
    if(t) t.textContent = buch.titel;

    // Kapitel-Liste aufbauen
    bauKapitelListe();

    // Audio starten
    ladeKapitel(state.kapitelIndex, startSek || 0);

    rebindDwell();
  }

  // ── Bücherliste aufbauen ─────────────────────────────────────────────────────
  function baueBuecherliste(){
    var grid = $("buchGrid");
    if(!grid) return;
    grid.innerHTML = "";

    if(state.buecher.length === 0){
      grid.innerHTML = '<div style="color:var(--muted);font-weight:900;padding:20px;">Noch keine Hörspiele gefunden.<br>info.js im buecher/-Ordner prüfen.</div>';
      return;
    }

    state.buecher.forEach(function(buch){
      var zeichen = ladezeichen(buch.id);
      var fortschritt = 0;
      if(zeichen && buch.kapitel.length > 0){
        fortschritt = Math.round((zeichen.kapitelIndex / buch.kapitel.length) * 100);
      }

      var a = document.createElement("a");
      a.href = "#";
      a.className = "buchBtn uibtn";
      a.innerHTML =
        '<img class="buchCover" src="' + (buch.cover||"") + '" alt="" ' +
        'onerror="this.style.display=\'none\'">' +
        '<div class="buchInfo">' +
          '<div class="buchTitel">' + buch.titel + '</div>' +
          (buch.untertitel ? '<div class="buchUntertitel">' + buch.untertitel + '</div>' : '') +
          '<div class="buchMeta">' + buch.kapitel.length + ' ' +
            (buch.kapitel.length === 1 ? 'Kapitel' : 'Kapitel') + '</div>' +
          '<div class="fortschrittShell">' +
            '<div class="fortschrittFill" style="width:' + fortschritt + '%"></div>' +
          '</div>' +
          (zeichen ? '<div class="buchMeta">Zuletzt: ' +
            (buch.kapitel[zeichen.kapitelIndex] ?
              buch.kapitel[zeichen.kapitelIndex].titel : '') +
            ' (' + formatZeit(zeichen.zeitSekunden) + ')</div>' : '') +
        '</div>';

      a.addEventListener("click", function(ev){
        ev.preventDefault();
        var zeichen2 = ladezeichen(buch.id);
        if(zeichen2){
          zeigeScreenResume(buch);
        } else {
          state.aktivBuch = buch;
          zeigeScreenPlayer(0, 0);
        }
      });

      grid.appendChild(a);
    });
  }

  // ── Kapitel-Liste im Player (paginiert) ─────────────────────────────────────
  var KAPITEL_PRO_SEITE = 10;
  // WICHTIG: dwell.js v8 hat globalen Singleton-State.
  // Jeder attachDwell()-Aufruf ueberschreibt S.dwellMs fuer ALLE Buttons.
  // Loesung: ein einziger Aufruf mit einheitlicher Zeit fuer alle Buttons.
  var HOERBUCH_DWELL_MS = 1600; // einheitlich fuer alle Buttons im Hörspiel-Modul


  function bauKapitelListe(){
    var liste = $("kapitelListe");
    if(!liste || !state.aktivBuch) return;
    liste.innerHTML = "";

    var alle = state.aktivBuch.kapitel;
    var seiten = Math.ceil(alle.length / KAPITEL_PRO_SEITE);
    if(state.kapitelSeite >= seiten) state.kapitelSeite = seiten - 1;
    if(state.kapitelSeite < 0) state.kapitelSeite = 0;

    var von = state.kapitelSeite * KAPITEL_PRO_SEITE;
    var bis = Math.min(von + KAPITEL_PRO_SEITE, alle.length);

    for(var idx = von; idx < bis; idx++){
      var kap = alle[idx];
      var aktiv = idx === state.kapitelIndex;

      // Zeile: [Nummer-Button] [Titeltext passiv]
      var zeile = document.createElement("div");
      zeile.className = "kapitelZeile";

      // Nummer-Button: loest Kapitel aus, eigene Dwell-Zeit
      var btnNr = document.createElement("a");
      btnNr.href = "#";
      btnNr.className = "kapitelNr" + (aktiv ? " kapitelAktiv" : "");
      btnNr.setAttribute("data-idx", idx);
      btnNr.setAttribute("data-kapitel-dwell", "1");
      btnNr.textContent = String(idx + 1);
      (function(i){ btnNr.addEventListener("click", function(ev){
        ev.preventDefault();
        ladeKapitel(i, 0);
      }); })(idx);

      // Titeltext: nur Anzeige, kein Dwell, kein Klick
      var titelDiv = document.createElement("div");
      titelDiv.className = "kapitelTitelText" + (aktiv ? " kapitelAktiv" : "");
      titelDiv.textContent = kap.titel || ("Kapitel " + kap.nr);

      zeile.appendChild(btnNr);
      zeile.appendChild(titelDiv);
      liste.appendChild(zeile);
    }

    // Seitenanzeige
    var anzeige = $("kapitelSeiteAnzeige");
    if(anzeige && seiten > 1){
      anzeige.textContent = "Seite " + (state.kapitelSeite + 1) + " / " + seiten;
    } else if(anzeige){
      anzeige.textContent = alle.length + " Kapitel";
    }

    // Pager-Buttons beschriften und en/deaktivieren
    var btnZ = $("btnKapitelZurueck");
    var btnW = $("btnKapitelWeiter");
    if(btnZ){
      btnZ.setAttribute("aria-disabled", state.kapitelSeite === 0 ? "true" : "false");
      btnZ.textContent = "◄  " + (state.kapitelSeite) + "/" + seiten;
    }
    if(btnW){
      btnW.setAttribute("aria-disabled", state.kapitelSeite >= seiten - 1 ? "true" : "false");
      btnW.textContent = (state.kapitelSeite + 2) + "/" + seiten + "  ►";
    }

    // Kapitel-Nummern mit laengerer Dwell-Zeit binden
    bindeKapitelDwell();
    bindePagerDwell();
    rebindDwell();
  }

  // bindeKapitelDwell: kein separater Aufruf noetig (dwell.js Singleton)
  function bindeKapitelDwell(){ /* no-op */ }

  // bindePagerDwell: kein separater Aufruf noetig (dwell.js Singleton)
  function bindePagerDwell(){ /* no-op */ }

  function aktualisiereKapitelMarkierung(){
    var neueSeite = Math.floor(state.kapitelIndex / KAPITEL_PRO_SEITE);
    if(neueSeite !== state.kapitelSeite){
      state.kapitelSeite = neueSeite;
      bauKapitelListe();
      return;
    }
    var liste = $("kapitelListe");
    if(!liste) return;
    var von = state.kapitelSeite * KAPITEL_PRO_SEITE;
    liste.querySelectorAll(".kapitelNr").forEach(function(btn){
      var idx = parseInt(btn.getAttribute("data-idx"));
      btn.classList.toggle("kapitelAktiv", idx === state.kapitelIndex);
    });
    liste.querySelectorAll(".kapitelTitelText").forEach(function(div, i){
      div.classList.toggle("kapitelAktiv", (von + i) === state.kapitelIndex);
    });
  }


  // ── Audio ────────────────────────────────────────────────────────────────────
  function stopAudio(){
    if(state.audio){
      try{
        // Lesezeichen speichern bevor gestoppt wird
        if(state.aktivBuch && !isNaN(state.audio.currentTime)){
          speicherzeichen(state.aktivBuch.id, state.kapitelIndex, state.audio.currentTime);
        }
        state.audio.pause();
        state.audio.src = "";
      }catch(e){}
      state.audio = null;
    }
    if(state.autoNext){
      clearTimeout(state.autoNext);
      state.autoNext = null;
    }
    aktualisierePlayerUI(false);
  }

  function ladeKapitel(idx, startSek){
    var buch = state.aktivBuch;
    if(!buch || idx < 0 || idx >= buch.kapitel.length) return;

    stopAudio();
    state.kapitelIndex = idx;

    var kap = buch.kapitel[idx];
    var audio = new Audio();
    audio.src = kap.datei;
    audio.playbackRate = state.geschwindigkeit;
    state.audio = audio;

    // Aktuelles Kapitel anzeigen
    var el = $("playerKapitelName");
    if(el) el.textContent = kap.titel || ("Kapitel " + kap.nr);
    aktualisiereKapitelMarkierung();

    // Events
    audio.addEventListener("loadedmetadata", function(){
      audio.volume = ladeVolumen();
      if(startSek && startSek > 0 && startSek < audio.duration - 2){
        audio.currentTime = startSek;
      }
      audio.play().then(function(){
        aktualisierePlayerUI(true);
      }).catch(function(e){
        setTimeout(function(){
          audio.play().then(function(){
            aktualisierePlayerUI(true);
          }).catch(function(){
            aktualisierePlayerUI(false);
          });
        }, 300);
      });
      aktualisiereBalken();
    });

    audio.addEventListener("timeupdate", function(){
      aktualisiereBalken();
      // Lesezeichen alle 10s automatisch speichern
      if(Math.round(audio.currentTime) % 10 === 0){
        speicherzeichen(buch.id, idx, audio.currentTime);
      }
    });

    audio.addEventListener("ended", function(){
      aktualisierePlayerUI(false);
      // Naechstes Kapitel nach 2s automatisch
      if(idx + 1 < buch.kapitel.length){
        state.autoNext = setTimeout(function(){
          ladeKapitel(idx + 1, 0);
        }, 2000);
        setStatus("Naechstes Kapitel in 2 Sekunden...");
      } else {
        setStatus("Hoerspiel beendet!");
        speicherzeichen(buch.id, 0, 0); // Lesezeichen zuruecksetzen
      }
    });

    audio.addEventListener("error", function(){
      setStatus("Fehler: Datei nicht gefunden — " + kap.datei);
    });

    setStatus(buch.titel + " — " + (kap.titel || "Kapitel " + kap.nr));
  }

  function aktualisiereBalken(){
    var audio = state.audio;
    if(!audio) return;
    var pct = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
    var fill = $("audioFortschrittFill");
    if(fill) fill.style.width = pct + "%";
    var zeitEl = $("audioZeit");
    if(zeitEl) zeitEl.textContent = formatZeit(audio.currentTime) + " / " + formatZeit(audio.duration);
  }

  function aktualisierePlayerUI(spielt){
    var btn = $("btnPlayPause");
    if(btn) btn.textContent = spielt ? "⏸" : "▶";
  }

  // ── Player-Button-Events ─────────────────────────────────────────────────────
  function bindPlayerButtons(){
    var btnPlay = $("btnPlayPause");
    if(btnPlay) btnPlay.addEventListener("click", function(ev){
      ev.preventDefault();
      var audio = state.audio;
      if(!audio) return;
      if(audio.paused){ audio.play(); aktualisierePlayerUI(true); }
      else { audio.pause(); aktualisierePlayerUI(false); }
    });

    var btnVor = $("btnVor30");
    if(btnVor) btnVor.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.audio) state.audio.currentTime = Math.min(
        state.audio.duration - 1,
        state.audio.currentTime + 30
      );
    });

    var btnZurueck = $("btnZurueck30");
    if(btnZurueck) btnZurueck.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.audio) state.audio.currentTime = Math.max(0, state.audio.currentTime - 30);
    });

    var btnAnfang = $("btnAnfang");
    if(btnAnfang) btnAnfang.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.audio){ state.audio.currentTime = 0; }
    });

    var btnWeiter = $("btnWeiterKapitel");
    if(btnWeiter) btnWeiter.addEventListener("click", function(ev){
      ev.preventDefault();
      var naechster = state.kapitelIndex + 1;
      if(state.aktivBuch && naechster < state.aktivBuch.kapitel.length){
        ladeKapitel(naechster, 0);
      }
    });

    var btnZurueckKap = $("btnZurueckKapitel");
    if(btnZurueckKap) btnZurueckKap.addEventListener("click", function(ev){
      ev.preventDefault();
      var vorheriger = state.kapitelIndex - 1;
      if(vorheriger >= 0){
        ladeKapitel(vorheriger, 0);
      } else if(state.audio){
        state.audio.currentTime = 0;
      }
    });

    // Geschwindigkeits-Buttons
    [0.8, 1.0, 1.2].forEach(function(speed){
      var key = Math.round(speed * 10); // 0.8→8, 1.0→10, 1.2→12 (sicher ohne Fließkomma-Fehler)
      var btn = $("btnSpeed" + key);
      if(btn) btn.addEventListener("click", function(ev){
        ev.preventDefault();
        state.geschwindigkeit = speed;
        if(state.audio) state.audio.playbackRate = speed;
        // Aktiven Speed-Button markieren
        [8, 10, 12].forEach(function(s){
          var b = $("btnSpeed" + s);
          if(b) b.classList.toggle("speedAktiv", s === key);
        });
      });
    });

    // Klick auf Fortschrittsbalken = Sprung
    var balken = $("audioFortschrittShell");
    if(balken) balken.addEventListener("click", function(ev){
      ev.preventDefault();
      if(!state.audio || !state.audio.duration) return;
      var rect = balken.getBoundingClientRect();
      var pct = (ev.clientX - rect.left) / rect.width;
      state.audio.currentTime = pct * state.audio.duration;
    });

    // Kapitel-Pager: Seite blättern
    var btnPagerZ = $("btnKapitelZurueck");
    if(btnPagerZ) btnPagerZ.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.kapitelSeite > 0){
        state.kapitelSeite--;
        bauKapitelListe();
      }
    });

    var btnPagerW = $("btnKapitelWeiter");
    if(btnPagerW) btnPagerW.addEventListener("click", function(ev){
      ev.preventDefault();
      var seiten = Math.ceil((state.aktivBuch ? state.aktivBuch.kapitel.length : 0) / KAPITEL_PRO_SEITE);
      if(state.kapitelSeite < seiten - 1){
        state.kapitelSeite++;
        bauKapitelListe();
      }
    });
  }

  // ── Resume-Dialog ────────────────────────────────────────────────────────────
  function bindResumeButtons(){
    var btnWeiter = $("btnResumeContinue");
    if(btnWeiter) btnWeiter.addEventListener("click", function(ev){
      ev.preventDefault();
      var zeichen = ladezeichen(state.aktivBuch.id);
      zeigeScreenPlayer(zeichen.kapitelIndex, zeichen.zeitSekunden);
    });

    var btnVorne = $("btnResumeBegin");
    if(btnVorne) btnVorne.addEventListener("click", function(ev){
      ev.preventDefault();
      zeigeScreenPlayer(0, 0);
    });

    var btnWaehlen = $("btnResumeChoose");
    if(btnWaehlen) btnWaehlen.addEventListener("click", function(ev){
      ev.preventDefault();
      // Direkt zum Player ohne Startposition → Kapitel-Liste sichtbar
      zeigeScreenPlayer(0, 0);
    });
  }

  // ── Zurueck-Buttons ──────────────────────────────────────────────────────────
  function bindReturnButtons(){
    var btnMain = $("btnReturnMain");
    if(btnMain) btnMain.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.screen === "player"){
        // Im Player: zurueck zur Buecher-Uebersicht
        stopAudio();
        state.screen = "buecher";
        zeigeScreenBuecher();
      } else {
        // In Buecher-Uebersicht oder Resume: zurueck zur Entertainment-Seite
        stopAudio();
        window.location.href = "../../entertainment.html";
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  (function init(){
    loadDwell();
    bindPlayerButtons();
    bindResumeButtons();
    bindReturnButtons();
    bindVolButtons();

    state.buecher = ladeBuecher();
    setStatus(state.buecher.length + " Hörspiel" + (state.buecher.length !== 1 ? "e" : "") + " gefunden.");
    zeigeScreenBuecher();

    // Audio stoppen wenn Seite verlassen wird (Browser-Zurueck, Link, Tab-Wechsel)
    window.addEventListener("pagehide", function(){ stopAudio(); });
    window.addEventListener("beforeunload", function(){ stopAudio(); });
    document.addEventListener("visibilitychange", function(){
      if(document.hidden){ stopAudio(); }
    });
  })();

})();
