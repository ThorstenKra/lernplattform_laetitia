// psalmen_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  var DWELL_MS   = 1600;
  var VOL_MIN    = 0.1, VOL_MAX = 0.8, VOL_STEP = 0.1, VOL_KEY = "laetitia_lautstaerke";
  var alben      = window.LaetitiaGlaubenLieder || [];
  var screen     = "alben";
  var aktAlbum   = null;
  var aktIdx     = 0;
  var audio      = null;
  var _playing   = false;

  var returnGlaube = new URL("../../../glaube.html", window.location.href).href;

  /* DOM */
  function $(id){ return document.getElementById(id); }
  var elAlben      = $("screenAlben");
  var elListe      = $("screenListe");
  var elPlayer     = $("screenPlayer");
  var elAlbenGrid  = $("albenGrid");
  var elAlbenAnzahl= $("albenAnzahl");
  var elListeCover = $("listeCover");
  var elListeName  = $("listeAlbumname");
  var elListeAnzahl= $("listeAnzahl");
  var elPsalmListe = $("psalmListe");
  var elPlayerCover= $("playerCover");
  var elPlayerAlb  = $("playerAlbumname");
  var elPlayerPsalm= $("playerPsalmname");
  var elProgress   = $("progressBar");
  var elZeitAkt    = $("zeitAkt");
  var elZeitGes    = $("zeitGes");
  var btnPlay      = $("btnPlayPause");
  var btnVorig     = $("btnVorig");
  var btnNaechst   = $("btnNaechst");
  var btnVolMinus  = $("btnVolMinus");
  var btnVolPlus   = $("btnVolPlus");
  var btnReturn    = $("btnReturn");

  /* Lautstärke */
  function getLautstaerke(){
    var v = parseFloat(localStorage.getItem(VOL_KEY));
    if(isNaN(v) || v < VOL_MIN || v > VOL_MAX) v = 0.6;
    return v;
  }

  /* Zeit formatieren */
  function fmtZeit(s){
    if(!isFinite(s)) return "0:00";
    var m = Math.floor(s/60), sec = Math.floor(s%60);
    return m + ":" + (sec<10?"0":"") + sec;
  }

  /* Audio-Unlock */
  var _unlocked = false;
  function unlockAudio(){
    if(_unlocked) return; _unlocked = true;
    try{ var c=new(window.AudioContext||window.webkitAudioContext)(); c.resume().then(function(){c.close();}); }catch(e){}
  }
  document.addEventListener("pointerdown", unlockAudio, {capture:true});
  document.addEventListener("mousedown",   unlockAudio, {capture:true});

  /* ── Alben-Grid ── */
  function renderAlben(){
    elAlbenGrid.innerHTML = "";
    elAlbenAnzahl.textContent = alben.length + (alben.length===1?" Sammlung":" Sammlungen");
    alben.forEach(function(alb, i){
      var a = document.createElement("a");
      a.className = "album-kachel";
      a.href = "#";
      a.dataset.idx = i;
      a.innerHTML =
        '<img src="' + (alb.cover||"") + '" alt="' + alb.name + '" onerror="this.style.background=\'#ddd6fe\';this.src=\'\';">' +
        '<div class="album-kachel-info">' +
          '<div class="album-kachel-name">' + alb.name + '</div>' +
          '<div class="album-kachel-anzahl">' + (alb.psalmen?alb.psalmen.length:0) + ' Psalmen</div>' +
        '</div>';
      elAlbenGrid.appendChild(a);
    });
  }

  /* ── Psalm-Liste zeigen ── */
  function zeigeAlbum(alb){
    aktAlbum = alb;
    screen = "liste";
    elAlben.classList.add("hidden");
    elPlayer.classList.add("hidden");
    elListe.classList.remove("hidden");
    elListeCover.src = alb.cover || "";
    elListeName.textContent = alb.name;
    elListeAnzahl.textContent = alb.psalmen.length + " Psalmen";
    elPsalmListe.innerHTML = "";
    alb.psalmen.forEach(function(ps, i){
      var a = document.createElement("a");
      a.className = "psalmBtn";
      a.href = "#";
      a.dataset.idx = i;
      a.innerHTML =
        '<span class="psalm-nr">' + (i+1) + '</span>' +
        '<span class="psalm-name">' + ps.titel + '</span>' +
        '<span class="psalm-play-icon">▶</span>';
      elPsalmListe.appendChild(a);
    });
    btnReturn.textContent = "← Zurück zur Übersicht";
    rebindDwell();
  }

  /* ── Player starten ── */
  function spielePsalm(idx){
    if(!aktAlbum) return;
    aktIdx = idx;
    var ps = aktAlbum.psalmen[idx];
    if(!ps) return;

    if(audio){
      audio.pause();
      audio.src = "";
    }
    audio = new Audio();
    audio.addEventListener("loadedmetadata", function(){
      audio.volume = getLautstaerke();
      elZeitGes.textContent = fmtZeit(audio.duration);
      audio.play().catch(function(){
        setTimeout(function(){ audio.play().catch(function(){}); }, 300);
      });
      _playing = true;
      btnPlay.textContent = "⏸";
    });
    audio.addEventListener("timeupdate", function(){
      if(!audio.duration) return;
      var pct = (audio.currentTime / audio.duration) * 100;
      elProgress.style.width = pct + "%";
      elZeitAkt.textContent = fmtZeit(audio.currentTime);
    });
    audio.addEventListener("ended", function(){
      if(aktIdx < aktAlbum.psalmen.length - 1){
        spielePsalm(aktIdx + 1);
      } else {
        _playing = false;
        btnPlay.textContent = "▶";
        elProgress.style.width = "0%";
      }
    });
    audio.src = ps.datei;

    /* Player-UI */
    screen = "player";
    elAlben.classList.add("hidden");
    elListe.classList.add("hidden");
    elPlayer.classList.remove("hidden");
    elPlayerCover.src = aktAlbum.cover || "";
    elPlayerAlb.textContent = aktAlbum.name;
    elPlayerPsalm.textContent = ps.titel;
    elProgress.style.width = "0%";
    elZeitAkt.textContent = "0:00";
    elZeitGes.textContent = "0:00";
    btnPlay.textContent = "⏸";
    btnVorig.setAttribute("aria-disabled",   idx===0 ? "true" : "false");
    btnNaechst.setAttribute("aria-disabled", idx===aktAlbum.psalmen.length-1 ? "true" : "false");
    btnReturn.textContent = "← Zurück zur Liste";
    rebindDwell();
  }

  /* ── Klick-Handler ── */
  elAlbenGrid.addEventListener("click", function(e){
    var a = e.target.closest(".album-kachel");
    if(!a) return;
    e.preventDefault();
    zeigeAlbum(alben[parseInt(a.dataset.idx,10)]);
  });

  elPsalmListe.addEventListener("click", function(e){
    var a = e.target.closest(".psalmBtn");
    if(!a) return;
    e.preventDefault();
    spielePsalm(parseInt(a.dataset.idx,10));
  });

  btnPlay.addEventListener("click", function(e){
    e.preventDefault();
    if(!audio) return;
    if(_playing){ audio.pause(); _playing=false; btnPlay.textContent="▶"; }
    else { audio.play(); _playing=true; btnPlay.textContent="⏸"; }
  });
  btnVorig.addEventListener("click", function(e){
    e.preventDefault();
    if(aktIdx>0) spielePsalm(aktIdx-1);
  });
  btnNaechst.addEventListener("click", function(e){
    e.preventDefault();
    if(aktAlbum && aktIdx<aktAlbum.psalmen.length-1) spielePsalm(aktIdx+1);
  });
  btnVolMinus.addEventListener("click", function(e){
    e.preventDefault();
    var v = Math.max(VOL_MIN, Math.round((getLautstaerke()-VOL_STEP)*10)/10);
    localStorage.setItem(VOL_KEY, String(v));
    if(audio) audio.volume = v;
  });
  btnVolPlus.addEventListener("click", function(e){
    e.preventDefault();
    var v = Math.min(VOL_MAX, Math.round((getLautstaerke()+VOL_STEP)*10)/10);
    localStorage.setItem(VOL_KEY, String(v));
    if(audio) audio.volume = v;
  });

  btnReturn.addEventListener("click", function(e){
    e.preventDefault();
    if(screen==="player"){
      if(audio){ audio.pause(); audio.src=""; audio=null; _playing=false; }
      zeigeAlbum(aktAlbum);
    } else if(screen==="liste"){
      screen="alben";
      elListe.classList.add("hidden");
      elAlben.classList.remove("hidden");
      btnReturn.textContent = "← Zurück";
      rebindDwell();
    } else {
      window.location.href = returnGlaube;
    }
  });

  /* ── Dwell ── */
  var _attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var _dwellHandle = null;
  function rebindDwell(){
    var sel;
    if(screen==="alben")       sel = "a.album-kachel, #btnReturn";
    else if(screen==="liste")  sel = "a.psalmBtn, #btnReturn";
    else                       sel = "#btnPlayPause, #btnVorig, #btnNaechst, #btnVolMinus, #btnVolPlus, #btnReturn";
    if(_dwellHandle===null){
      _dwellHandle = _attachDwell(sel, {
        dwellMs: DWELL_MS, leaveGrace: 150,
        onActivate: function(el){ try{ el.click(); }catch(ex){} }
      });
      if(_dwellHandle && typeof _LDwellState !== "undefined"){
        _LDwellState.protectUntil = Date.now() + 1200;
      }
    } else {
      if(_dwellHandle.rebind) _dwellHandle.rebind(sel);
    }
  }

  /* ── Init ── */
  renderAlben();
  rebindDwell();

})();
