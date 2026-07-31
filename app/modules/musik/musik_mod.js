// musik_mod.js -- Laetitia Lernsystem
// Musik-Modul: Alben, Titel A-Z, Favoriten, Player mit Shuffle
// Stand: 2026-03-28
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  // ── Hilfsfunktionen ─────────────────────────────────────────────────────────
  function $(id){ return document.getElementById(id); }

  function setStatus(msg){
    // Statuszeile entfernt — kein topStatus-Element mehr im DOM
  }


  // ── Lautstärke ──────────────────────────────────────────────────────────────
  var VOL_MIN  = 0.1;   // 10%
  var VOL_MAX  = 0.8;   // 80% Obergrenze (Lautsprecherschutz)
  var VOL_STEP = 0.1;   // 10% pro Schritt
  var VOL_KEY  = "laetitia_lautstaerke";

  function ladeVolumen(){
    var v = parseFloat(localStorage.getItem(VOL_KEY));
    if(isNaN(v) || v < VOL_MIN || v > VOL_MAX) v = 0.6; // Default 60%
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
    v = Math.round(v * 10) / 10; // Fließkomma-Sicherheit
    if(v < VOL_MIN) v = VOL_MIN;
    if(v > VOL_MAX) v = VOL_MAX;
    speichereVolumen(v);
    aktualisiereVolAnzeige(v);
    // Auf aktives Audio anwenden
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
    // Initiale Anzeige
    aktualisiereVolAnzeige(ladeVolumen());
  }

  // ── Dwell (Singleton — nur EIN attachDwell-Aufruf!) ──────────────────────────
  var _attachDwell = null;
  var _dwellHandle = null;
  var MUSIK_DWELL_MS = 1000;

  // Audio-Kontext entsperren: beim ersten echten Pointer-Event
  // Loest die Autoplay-Blockade bei programmatischen el.click()-Aufrufen
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

  function loadDwell(){
    if(_attachDwell) return _attachDwell;
    _attachDwell = typeof window.LaetitiaAttachDwell === "function"
      ? window.LaetitiaAttachDwell
      : function(){ return { cancelDwell: function(){} }; };
    return _attachDwell;
  }

  function rebindDwell(){
    if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
      _dwellHandle.cancelDwell();
    }
    var attach = loadDwell();
    var LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
    // EIN einziger Aufruf fuer alle Buttons (dwell.js Singleton-Constraint)
    _dwellHandle = attach(
      "a.uibtn, a.albumBtn, a.titelNr, a.sternBtn, a.pagerBtn, a.playerBtn, a.speedBtn, a.tabBtn, a.navBtn, " +
      "#btnReturnMain, #btnReturnAlben, #btnReturnTitel, #btnVolMinus, #btnVolPlus",
      {
        dwellMs:    MUSIK_DWELL_MS,
        leaveGrace: LEAVE_GRACE,
        onActivate: function(el){
          if(el.getAttribute("aria-disabled") === "true") return;
          try{ el.click(); }catch(e){}
        }
      }
    );
  }

  // ── Favoriten (localStorage) ─────────────────────────────────────────────────
  var FAV_KEY = "laetitia_musik_favoriten";

  function ladeFavoriten(){
    try{
      var s = localStorage.getItem(FAV_KEY);
      return s ? JSON.parse(s) : {};
    }catch(e){ return {}; }
  }

  function speicherFavoriten(favs){
    try{ localStorage.setItem(FAV_KEY, JSON.stringify(favs)); }catch(e){}
  }

  function istFavorit(albumId, titelIdx){
    var favs = ladeFavoriten();
    return !!(favs[albumId + "_" + titelIdx]);
  }

  function toggleFavorit(albumId, titelIdx){
    var favs = ladeFavoriten();
    var key = albumId + "_" + titelIdx;
    if(favs[key]){ delete favs[key]; }
    else { favs[key] = true; }
    speicherFavoriten(favs);
    return !!(favs[key]);
  }

  // ── Alle Alben laden ─────────────────────────────────────────────────────────
  function ladeAlben(){
    var liste = window.LaetitiaMusik;
    if(!Array.isArray(liste)) return [];
    return liste.filter(function(a){
      return a && a.id && Array.isArray(a.titel) && a.titel.length > 0;
    });
  }

  // ── Alle Titel A-Z (ueber alle Alben) ────────────────────────────────────────
  function alleTitelSortiert(alben){
    var alle = [];
    alben.forEach(function(album){
      album.titel.forEach(function(t, idx){
        alle.push({ titel: t, album: album, idx: idx });
      });
    });
    alle.sort(function(a, b){
      return (a.titel.name || "").localeCompare(b.titel.name || "", "de");
    });
    return alle;
  }

  // ── Favoriten-Liste ──────────────────────────────────────────────────────────
  function favoritenListe(alben){
    var favs = ladeFavoriten();
    var liste = [];
    alben.forEach(function(album){
      album.titel.forEach(function(t, idx){
        if(favs[album.id + "_" + idx]){
          liste.push({ titel: t, album: album, idx: idx });
        }
      });
    });
    return liste;
  }

  // ── Lesezeichen ──────────────────────────────────────────────────────────────
  function speicherLesezeichen(albumId, titelIdx, sekunden){
    try{
      localStorage.setItem(
        "laetitia_musik_" + albumId,
        JSON.stringify({ titelIdx: titelIdx, zeitSekunden: Math.floor(sekunden) })
      );
    }catch(e){}
  }

  function ladeLesezeichen(albumId){
    try{
      var s = localStorage.getItem("laetitia_musik_" + albumId);
      return s ? JSON.parse(s) : null;
    }catch(e){ return null; }
  }

  function formatZeit(sek){
    sek = Math.floor(sek || 0);
    var m = Math.floor(sek / 60);
    var s = sek % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  // ── State ────────────────────────────────────────────────────────────────────
  var state = {
    alben:         [],
    screen:        "alben",     // "alben" | "titel" | "player"
    tab:           "alben",     // "alben" | "az" | "favoriten"
    // Aktuelle Ansichts-Liste (Album-Titel, A-Z oder Favoriten)
    ansichtTitel:  [],          // Array von {titel, album, idx}
    ansichtName:   "",          // Anzeige-Name der aktuellen Liste
    titelSeite:    0,
    // Player
    spielTitel:    [],          // Array von {titel, album, idx} — aktuelle Wiedergabeliste
    spielIdx:      0,           // Position in spielTitel
    shuffle:       false,
    nutzerHatInteragiert: false,  // Verhindert Autoplay-Blockade beim ersten Laden
    shuffleOrder:  [],          // zufaellige Reihenfolge der Indices
    audio:         null,
    geschwindigkeit: 1.0,
    playerSeite:   0
  };

  var TITEL_PRO_SEITE = 8;

  // ── Screens ──────────────────────────────────────────────────────────────────
  function hideAll(){
    ["screenAlben","screenTitel","screenPlayer"].forEach(function(id){
      var el = $(id); if(el) el.classList.add("hidden");
    });
  }

  function zeigeScreenAlben(){
    stopAudio();
    hideAll();
    var el = $("screenAlben"); if(el) el.classList.remove("hidden");
    baueAlbenGrid();
    rebindDwell();
  }

  function zeigeScreenTitel(ansichtTitel, name){
    hideAll();
    state.ansichtTitel = ansichtTitel;
    state.ansichtName  = name;
    state.titelSeite   = 0;
    var el = $("screenTitel"); if(el) el.classList.remove("hidden");
    var t = $("titelScreenTitel"); if(t) t.textContent = name;
    var u = $("titelScreenUnter");
    if(u) u.textContent = ansichtTitel.length + " Titel";
    baueTitelListe();
    rebindDwell();
  }

  function zeigeScreenPlayer(spielTitel, startIdx){
    hideAll();
    state.spielTitel  = spielTitel;
    state.spielIdx    = startIdx || 0;
    state.playerSeite = Math.floor(state.spielIdx / TITEL_PRO_SEITE);
    if(state.shuffle) erzeugeShuffleOrder();
    var el = $("screenPlayer"); if(el) el.classList.remove("hidden");
    bauePlayerTitelListe();
    ladeTitel(state.spielIdx, 0);
    rebindDwell();
  }

  // ── Album-Grid ───────────────────────────────────────────────────────────────
  function baueAlbenGrid(){
    var grid = $("albumGrid");
    if(!grid) return;
    grid.innerHTML = "";

    // Tab-Markierung
    ["tabAlben","tabAZ","tabFavoriten"].forEach(function(id){
      var btn = $(id); if(btn) btn.classList.remove("tabAktiv");
    });
    var aktTab = $("tab" + state.tab.charAt(0).toUpperCase() + state.tab.slice(1));
    if(aktTab) aktTab.classList.add("tabAktiv");

    if(state.tab === "alben"){
      // Favoriten-Kachel wenn vorhanden
      var favs = favoritenListe(state.alben);
      if(favs.length > 0){
        grid.appendChild(baueAlbumKachel(
          null, "⭐ Favoriten", "", favs.length + " Titel", null, function(){
            state.nutzerHatInteragiert = true;
            zeigeScreenPlayer(favs, 0);
          }
        ));
      }
      state.alben.forEach(function(album){
        grid.appendChild(baueAlbumKachel(
          album.cover, album.name, album.kuenstler || "",
          album.titel.length + " Titel", null,
          function(){
            var liste = album.titel.map(function(t, i){ return {titel:t, album:album, idx:i}; });
            state.nutzerHatInteragiert = true;
            zeigeScreenPlayer(liste, 0);
          }
        ));
      });
    } else if(state.tab === "az"){
      // Eine einzige "Alle Titel A-Z" Kachel
      var alle = alleTitelSortiert(state.alben);
      grid.appendChild(baueAlbumKachel(
        null, "🔤 Alle Titel A – Z", "", alle.length + " Titel", null, function(){
          state.nutzerHatInteragiert = true;
          zeigeScreenPlayer(alle, 0);
        }
      ));
    } else if(state.tab === "favoriten"){
      var favListe = favoritenListe(state.alben);
      if(favListe.length === 0){
        grid.innerHTML = '<div style="color:var(--muted);font-weight:900;padding:20px;">Noch keine Favoriten. ⭐ bei einem Titel antippen.</div>';
      } else {
        grid.appendChild(baueAlbumKachel(
          null, "⭐ Favoriten", "", favListe.length + " Titel", null, function(){
            state.nutzerHatInteragiert = true;
            zeigeScreenPlayer(favListe, 0);
          }
        ));
      }
    }

    if(grid.children.length === 0){
      grid.innerHTML = '<div style="color:var(--muted);font-weight:900;padding:20px;">Keine Alben gefunden. info.js im alben/-Ordner prüfen.</div>';
    }
  }

  function baueAlbumKachel(coverSrc, name, kuenstler, meta, lesezeichen, onClick){
    var a = document.createElement("a");
    a.href = "#";
    a.className = "albumBtn uibtn";

    // Cover oder Placeholder
    if(coverSrc){
      var img = document.createElement("img");
      img.className = "albumCover";
      img.src = coverSrc;
      img.alt = "";
      img.onerror = function(){ this.style.display="none"; };
      a.appendChild(img);
    } else {
      var ph = document.createElement("div");
      ph.className = "albumCoverPlaceholder";
      ph.textContent = "🎵";
      a.appendChild(ph);
    }

    var info = document.createElement("div");
    info.className = "albumInfo";
    info.innerHTML =
      '<div class="albumTitel">' + name + '</div>' +
      (kuenstler ? '<div class="albumKuenstler">' + kuenstler + '</div>' : '') +
      '<div class="albumMeta">' + meta + '</div>';
    a.appendChild(info);

    a.addEventListener("click", function(ev){ ev.preventDefault(); onClick(); });
    return a;
  }

  // ── Titel-Liste (Screen 2) ────────────────────────────────────────────────────
  function baueTitelListe(){
    var liste = $("titelListe");
    if(!liste) return;
    liste.innerHTML = "";

    var alle = state.ansichtTitel;
    var seiten = Math.ceil(alle.length / TITEL_PRO_SEITE);
    if(state.titelSeite >= seiten) state.titelSeite = Math.max(0, seiten - 1);

    var von = state.titelSeite * TITEL_PRO_SEITE;
    var bis = Math.min(von + TITEL_PRO_SEITE, alle.length);

    for(var i = von; i < bis; i++){
      var eintrag = alle[i];
      var aktiv = (state.screen === "player" &&
                   state.spielTitel.length > 0 &&
                   state.spielTitel[state.spielIdx] === eintrag);

      liste.appendChild(baueTitelZeile(eintrag, i - von + 1, aktiv, i, alle));
    }

    // Seitenanzeige
    var anzeige = $("titelSeiteAnzeige");
    if(anzeige) anzeige.textContent = seiten > 1
      ? "Seite " + (state.titelSeite + 1) + " / " + seiten
      : alle.length + " Titel";

    // Pager
    aktualisierePager("btnTitelZurueck", "btnTitelWeiter", state.titelSeite, seiten,
      function(){ state.titelSeite--; baueTitelListe(); rebindDwell(); },
      function(){ state.titelSeite++; baueTitelListe(); rebindDwell(); }
    );

    rebindDwell();
  }

  function baueTitelZeile(eintrag, nr, aktiv, gesamtIdx, quellliste){
    var zeile = document.createElement("div");
    zeile.className = "titelZeile";

    // Nummer-Button
    var btnNr = document.createElement("a");
    btnNr.href = "#";
    btnNr.className = "titelNr" + (aktiv ? " titelAktiv" : "");
    btnNr.setAttribute("data-musik-dwell", "1");
    btnNr.textContent = String(nr);
    (function(e, ql){ btnNr.addEventListener("click", function(ev){
      ev.preventDefault();
      zeigeScreenPlayer(ql, ql.indexOf(e));
    }); })(eintrag, quellliste);

    // Titelinfo (passiv)
    var titelDiv = document.createElement("div");
    titelDiv.className = "titelInfo" + (aktiv ? " titelAktiv" : "");
    var nameSpan = document.createElement("span");
    nameSpan.className = "titelName";
    nameSpan.textContent = eintrag.titel.name || ("Titel " + (eintrag.idx + 1));
    titelDiv.appendChild(nameSpan);
    // Album-Name bei A-Z und Favoriten anzeigen
    if(state.tab !== "alben" || state.ansichtName === "⭐ Favoriten"){
      var albSpan = document.createElement("span");
      albSpan.className = "titelAlbum";
      albSpan.textContent = eintrag.album.name || "";
      titelDiv.appendChild(albSpan);
    }

    // Stern-Button
    var btnStern = document.createElement("a");
    btnStern.href = "#";
    btnStern.className = "sternBtn" + (istFavorit(eintrag.album.id, eintrag.idx) ? " sternAktiv" : "");
    btnStern.textContent = istFavorit(eintrag.album.id, eintrag.idx) ? "⭐" : "☆";
    (function(e, btn){ btnStern.addEventListener("click", function(ev){
      ev.preventDefault();
      var aktivJetzt = toggleFavorit(e.album.id, e.idx);
      btn.classList.toggle("sternAktiv", aktivJetzt);
      btn.textContent = aktivJetzt ? "⭐" : "☆";
      // Stern im Player aktualisieren falls gleicher Titel
      aktualisiereSternPlayer();
    }); })(eintrag, btnStern);

    zeile.appendChild(btnNr);
    zeile.appendChild(titelDiv);
    zeile.appendChild(btnStern);
    return zeile;
  }

  // ── Player-Titel-Liste (rechte Spalte im Player) ─────────────────────────────
  function bauePlayerTitelListe(){
    var liste = $("playerTitelListe");
    if(!liste) return;
    liste.innerHTML = "";

    var alle = state.spielTitel;
    var seiten = Math.ceil(alle.length / TITEL_PRO_SEITE);
    if(state.playerSeite >= seiten) state.playerSeite = Math.max(0, seiten - 1);

    var von = state.playerSeite * TITEL_PRO_SEITE;
    var bis = Math.min(von + TITEL_PRO_SEITE, alle.length);

    for(var i = von; i < bis; i++){
      var eintrag = alle[i];
      var aktiv = i === state.spielIdx;

      var zeile = document.createElement("div");
      zeile.className = "titelZeile";

      var btnNr = document.createElement("a");
      btnNr.href = "#";
      btnNr.className = "titelNr" + (aktiv ? " titelAktiv" : "");
      btnNr.setAttribute("data-spielidx", i);
      btnNr.textContent = String(i + 1);
      (function(idx){ btnNr.addEventListener("click", function(ev){
        ev.preventDefault();
        state.nutzerHatInteragiert = true;
        state.spielIdx = idx;
        state.playerSeite = Math.floor(idx / TITEL_PRO_SEITE);
        ladeTitel(idx, 0);
      }); })(i);

      var titelDiv = document.createElement("div");
      titelDiv.className = "titelInfo" + (aktiv ? " titelAktiv" : "");
      var nameSpan = document.createElement("span");
      nameSpan.className = "titelName";
      nameSpan.textContent = eintrag.titel.name || ("Titel " + (eintrag.idx + 1));
      titelDiv.appendChild(nameSpan);

      zeile.appendChild(btnNr);
      zeile.appendChild(titelDiv);
      liste.appendChild(zeile);
    }

    // Seitenanzeige
    var anzeige = $("playerSeiteAnzeige");
    if(anzeige) anzeige.textContent = seiten > 1
      ? "Seite " + (state.playerSeite + 1) + " / " + seiten : "";

    // Pager
    aktualisierePager("btnPlayerZurueck", "btnPlayerWeiter", state.playerSeite, seiten,
      function(){ state.playerSeite--; bauePlayerTitelListe(); rebindDwell(); },
      function(){ state.playerSeite++; bauePlayerTitelListe(); rebindDwell(); }
    );

    var label = $("playerTitelLabel");
    if(label) label.textContent = alle.length + " Titel";
  }

  function aktualisierePlayerMarkierung(){
    var neueSeite = Math.floor(state.spielIdx / TITEL_PRO_SEITE);
    if(neueSeite !== state.playerSeite){
      state.playerSeite = neueSeite;
      bauePlayerTitelListe();
      return;
    }
    var liste = $("playerTitelListe");
    if(!liste) return;
    liste.querySelectorAll(".titelNr").forEach(function(btn){
      var idx = parseInt(btn.getAttribute("data-spielidx"));
      btn.classList.toggle("titelAktiv", idx === state.spielIdx);
    });
    liste.querySelectorAll(".titelInfo").forEach(function(div, i){
      div.classList.toggle("titelAktiv", (state.playerSeite * TITEL_PRO_SEITE + i) === state.spielIdx);
    });
  }

  // ── Pager-Hilfsfunktion ──────────────────────────────────────────────────────
  function aktualisierePager(idZ, idW, seite, seiten, onZ, onW){
    var btnZ = $(idZ);
    var btnW = $(idW);
    if(btnZ){
      btnZ.setAttribute("aria-disabled", seite === 0 ? "true" : "false");
      btnZ.textContent = "\u25c4  " + seite + "/" + seiten;
      btnZ.onclick = function(ev){ ev.preventDefault(); if(seite > 0) onZ(); };
    }
    if(btnW){
      btnW.setAttribute("aria-disabled", seite >= seiten - 1 ? "true" : "false");
      btnW.textContent = (seite + 2) + "/" + seiten + "  \u25ba";
      btnW.onclick = function(ev){ ev.preventDefault(); if(seite < seiten - 1) onW(); };
    }
  }

  // ── Audio ────────────────────────────────────────────────────────────────────
  function stopAudio(){
    if(state.audio){
      try{
        var e = state.spielTitel[state.spielIdx];
        if(e && !isNaN(state.audio.currentTime)){
          speicherLesezeichen(e.album.id, state.spielIdx, state.audio.currentTime);
        }
        state.audio.pause();
        state.audio.src = "";
      }catch(err){}
      state.audio = null;
    }
    aktualisierePlayerUI(false);
  }

  function ladeTitel(idx, startSek){
    if(idx < 0 || idx >= state.spielTitel.length) return;
    stopAudio();
    state.spielIdx = idx;

    var eintrag = state.spielTitel[idx];
    var audio = new Audio();
    audio.src = eintrag.titel.datei;
    audio.playbackRate = state.geschwindigkeit;
    state.audio = audio;

    // Header aktualisieren
    var t = $("playerTitelText");
    if(t) t.textContent = eintrag.titel.name || ("Titel " + (eintrag.idx + 1));
    var u = $("playerUntertitel");
    if(u) u.textContent = eintrag.album.name + (eintrag.album.kuenstler ? " — " + eintrag.album.kuenstler : "");

    // Cover
    var img = $("playerCover");
    var ph  = $("playerCoverPlaceholder");
    if(eintrag.album.cover){
      if(img){ img.src = eintrag.album.cover; img.style.display = "block"; }
      if(ph)  ph.style.display = "none";
    } else {
      if(img) img.style.display = "none";
      if(ph)  ph.style.display = "flex";
    }

    aktualisierePlayerMarkierung();
    aktualisiereSternPlayer();

    audio.addEventListener("loadedmetadata", function(){
      audio.volume = ladeVolumen();
      if(startSek && startSek > 0 && startSek < audio.duration - 2){
        audio.currentTime = startSek;
      }
      // Nur abspielen wenn durch Nutzer-Interaktion ausgeloest (vermeidet Autoplay-Blockade)
      if(state.nutzerHatInteragiert){
        audio.play().then(function(){
          aktualisierePlayerUI(true);
        }).catch(function(e){
          // Autoplay blockiert - kurz warten und nochmal versuchen
          setTimeout(function(){
            audio.play().then(function(){
              aktualisierePlayerUI(true);
            }).catch(function(){
              aktualisierePlayerUI(false);
            });
          }, 300);
        });
        aktualisierePlayerUI(true);
      } else {
        aktualisierePlayerUI(false);
      }
      aktualisiereBalken();
    });

    audio.addEventListener("timeupdate", function(){
      aktualisiereBalken();
      if(Math.round(audio.currentTime) % 10 === 0){
        speicherLesezeichen(eintrag.album.id, idx, audio.currentTime);
      }
    });

    audio.addEventListener("ended", function(){
      aktualisierePlayerUI(false);
      // Naechster Titel (Shuffle beachten)
      var naechster = naechsterIdx();
      if(naechster !== null){
        setTimeout(function(){ ladeTitel(naechster, 0); }, 1500);
        setStatus("Nächster Titel...");
      } else {
        setStatus("Ende der Wiedergabeliste.");
      }
    });

    audio.addEventListener("error", function(){
      setStatus("Fehler: Datei nicht gefunden — " + eintrag.titel.datei);
    });

    setStatus(eintrag.album.name + " — " + (eintrag.titel.name || "Titel " + (eintrag.idx + 1)));
  }

  function naechsterIdx(){
    if(state.shuffle && state.shuffleOrder.length > 0){
      var pos = state.shuffleOrder.indexOf(state.spielIdx);
      if(pos < state.shuffleOrder.length - 1) return state.shuffleOrder[pos + 1];
      return null;
    }
    if(state.spielIdx < state.spielTitel.length - 1) return state.spielIdx + 1;
    return null;
  }

  function vorherigerIdx(){
    if(state.shuffle && state.shuffleOrder.length > 0){
      var pos = state.shuffleOrder.indexOf(state.spielIdx);
      if(pos > 0) return state.shuffleOrder[pos - 1];
      return null;
    }
    if(state.spielIdx > 0) return state.spielIdx - 1;
    return null;
  }

  function erzeugeShuffleOrder(){
    var arr = [];
    for(var i = 0; i < state.spielTitel.length; i++) arr.push(i);
    // Fisher-Yates
    for(var j = arr.length - 1; j > 0; j--){
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = arr[j]; arr[j] = arr[k]; arr[k] = tmp;
    }
    state.shuffleOrder = arr;
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

  function aktualisiereSternPlayer(){
    var e = state.spielTitel[state.spielIdx];
    if(!e) return;
    var btn = $("btnSternPlayer");
    if(!btn) return;
    var aktiv = istFavorit(e.album.id, e.idx);
    btn.classList.toggle("sternAktiv", aktiv);
    btn.textContent = aktiv ? "⭐" : "☆";
  }

  // ── Button-Events binden ─────────────────────────────────────────────────────
  function bindButtons(){

    // Tabs
    var tabAlben = $("tabAlben");
    if(tabAlben) tabAlben.addEventListener("click", function(ev){
      ev.preventDefault(); state.tab = "alben"; baueAlbenGrid(); rebindDwell();
    });
    var tabAZ = $("tabAZ");
    if(tabAZ) tabAZ.addEventListener("click", function(ev){
      ev.preventDefault(); state.tab = "az"; baueAlbenGrid(); rebindDwell();
    });
    var tabFav = $("tabFavoriten");
    if(tabFav) tabFav.addEventListener("click", function(ev){
      ev.preventDefault(); state.tab = "favoriten"; baueAlbenGrid(); rebindDwell();
    });

    // Zurueck-Buttons
    var btnMain = $("btnReturnMain");
    if(btnMain) btnMain.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.screen === "player"){
        // Im Player: zurueck zur Alben-Uebersicht
        stopAudio(); state.screen = "alben"; zeigeScreenAlben();
      } else {
        // Auf Alben-Uebersicht: zurueck zur Entertainment-Seite
        stopAudio(); window.location.href = "../../entertainment.html";
      }
    });
    var btnAlben = $("btnReturnAlben");
    if(btnAlben) btnAlben.addEventListener("click", function(ev){
      ev.preventDefault(); state.screen = "alben"; zeigeScreenAlben();
    });
    var btnTitel = $("btnReturnTitel");
    if(btnTitel) btnTitel.addEventListener("click", function(ev){
      ev.preventDefault();
      state.screen = "alben";
      zeigeScreenAlben();
    });

    // Play/Pause
    var btnPlay = $("btnPlayPause");
    if(btnPlay) btnPlay.addEventListener("click", function(ev){
      ev.preventDefault();
      state.nutzerHatInteragiert = true;
      if(!state.audio) return;
      if(state.audio.paused){ state.audio.play(); aktualisierePlayerUI(true); }
      else { state.audio.pause(); aktualisierePlayerUI(false); }
    });

    // Vor/Zurueck 10s
    var btnVor = $("btnVor10");
    if(btnVor) btnVor.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.audio) state.audio.currentTime = Math.min(state.audio.duration - 1, state.audio.currentTime + 10);
    });
    var btnZurueck = $("btnZurueck10");
    if(btnZurueck) btnZurueck.addEventListener("click", function(ev){
      ev.preventDefault();
      if(state.audio) state.audio.currentTime = Math.max(0, state.audio.currentTime - 10);
    });

    // Naechster / Vorheriger Titel
    var btnWeiter = $("btnWeiterTitel");
    if(btnWeiter) btnWeiter.addEventListener("click", function(ev){
      ev.preventDefault();
      var n = naechsterIdx();
      if(n !== null) ladeTitel(n, 0);
    });
    var btnZurueckTitel = $("btnZurueckTitel");
    if(btnZurueckTitel) btnZurueckTitel.addEventListener("click", function(ev){
      ev.preventDefault();
      var v = vorherigerIdx();
      if(v !== null) ladeTitel(v, 0);
      else if(state.audio) state.audio.currentTime = 0;
    });

    // Shuffle
    var btnShuffle = $("btnShuffle");
    if(btnShuffle) btnShuffle.addEventListener("click", function(ev){
      ev.preventDefault();
      state.shuffle = !state.shuffle;
      btnShuffle.classList.toggle("shuffleAktiv", state.shuffle);
      if(state.shuffle) erzeugeShuffleOrder();
      setStatus(state.shuffle ? "Shuffle: AN" : "Shuffle: AUS");
    });

    // Stern im Player
    var btnSternPlayer = $("btnSternPlayer");
    // Stern-Button ist fest im HTML — nur Event binden
    var sternEl = $("btnSternPlayer");
    if(sternEl){
      sternEl.addEventListener("click", function(ev){
        ev.preventDefault();
        var e = state.spielTitel[state.spielIdx];
        if(!e) return;
        var aktiv = toggleFavorit(e.album.id, e.idx);
        sternEl.classList.toggle("sternAktiv", aktiv);
        sternEl.textContent = aktiv ? "⭐" : "☆";
        baueTitelListe();
      });
    }

    // Geschwindigkeit
    [0.8, 1.0, 1.2].forEach(function(speed){
      var key = Math.round(speed * 10);
      var btn = $("btnSpeed" + key);
      if(btn) btn.addEventListener("click", function(ev){
        ev.preventDefault();
        state.geschwindigkeit = speed;
        if(state.audio) state.audio.playbackRate = speed;
        [8, 10, 12].forEach(function(s){
          var b = $("btnSpeed" + s);
          if(b) b.classList.toggle("speedAktiv", s === key);
        });
      });
    });

    // Fortschrittsbalken
    var balken = $("audioFortschrittShell");
    if(balken) balken.addEventListener("click", function(ev){
      ev.preventDefault();
      if(!state.audio || !state.audio.duration) return;
      var rect = balken.getBoundingClientRect();
      var pct = (ev.clientX - rect.left) / rect.width;
      state.audio.currentTime = pct * state.audio.duration;
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  (function init(){
    loadDwell();
    bindButtons();
    bindVolButtons();
    state.alben = ladeAlben();
    setStatus(state.alben.length + " Album" + (state.alben.length !== 1 ? "en" : "") + " gefunden.");
    state.screen = "alben";
    zeigeScreenAlben();

    // Musik stoppen wenn Seite verlassen wird (Browser-Zurueck, Link, Tab-Wechsel)
    window.addEventListener("pagehide", function(){ stopAudio(); });
    window.addEventListener("beforeunload", function(){ stopAudio(); });
    document.addEventListener("visibilitychange", function(){
      if(document.hidden){ stopAudio(); }
    });
  })();

})();
