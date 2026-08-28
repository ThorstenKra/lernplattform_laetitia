// fotoalbum_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  /* ── Daten ── */
  var alben = window.LaetitiaFotos || [];

  /* ── Zustand ── */
  var screen     = "alben";   // "alben" | "diashow"
  var aktAlbum   = null;
  var aktIndex   = 0;

  /* ── DOM ── */
  var elAlben         = document.getElementById("screenAlben");
  var elDia            = document.getElementById("screenDiashow");
  var elGrid          = document.getElementById("albenGrid");
  var elAnzahl        = document.getElementById("albenAnzahl");
  var elDiaName       = document.getElementById("diaAlbumname");
  var elCounter       = document.getElementById("diaCounter");
  var elBild          = document.getElementById("diaBild");
  var elTextOverlay   = document.getElementById("diaTextOverlay");
  var btnVor          = document.getElementById("btnVor");
  var btnNach         = document.getElementById("btnNach");
  var btnReturn       = document.getElementById("btnReturn");
  var btnZurUebersicht= document.getElementById("btnZurUebersicht");
  var btnVortragStart = document.getElementById("btnVortragStart");
  var btnVortragStop  = document.getElementById("btnVortragStop");
  var elZurueckLeiste = document.getElementById("zurueckLeiste");

  /* ── TTS-Goldstandard (Katja Online (Natural), Kaskaden-Fallback) ── */
  function sprich(text, danach){
    if(!text){ if(danach) danach(); return; }
    try{
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE"; u.rate = 1.104;
      var voices = speechSynthesis.getVoices();
      var de = voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
            || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
            || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
            || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.indexOf("de") === 0 && v.name.indexOf("Hedda") < 0; })
            || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.indexOf("de") === 0; })
            || voices.find(function(v){ return v.lang.indexOf("de") === 0; });
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

  /* ── Return-URL ── */
  var returnEnt = new URL("../../entertainment.html", window.location.href).href;
  try{ localStorage.setItem("laetitia_return_url_v1", new URL("./fotoalbum.html", window.location.href).href); }catch(e){}
  function renderAlbenGrid(){
    elGrid.innerHTML = "";
    elAnzahl.textContent = alben.length + " " + (alben.length === 1 ? "Album" : "Alben");
    alben.forEach(function(alb, idx){
      var a = document.createElement("a");
      a.className = "album-kachel";
      a.href = "#";
      a.dataset.albIdx = idx;
      var coverFoto = alb.fotos && alb.fotos.length ? alb.fotos[0] : null;
      var coverSrc = coverFoto ? (coverFoto.src || coverFoto) : "";
      a.innerHTML =
        '<img src="' + coverSrc + '" alt="' + alb.name + '" onerror="this.style.background=\'#ccc\';this.src=\'\';">' +
        '<div class="album-kachel-info">' +
          '<div class="album-kachel-name">' + alb.name + '</div>' +
          '<div class="album-kachel-anzahl">' + (alb.fotos ? alb.fotos.length : 0) + ' Fotos</div>' +
        '</div>';
      elGrid.appendChild(a);
    });
  }

  /* ── Diashow öffnen ── */
  function oeffneDiashow(alb, startIdx){
    aktAlbum = alb;
    aktIndex = startIdx || 0;
    screen   = "diashow";
    elAlben.classList.add("hidden");
    elDia.classList.remove("hidden");
    elZurueckLeiste.classList.add("hidden");
    elDiaName.textContent = alb.name;
    zeigeAktFoto();
    rebindDwell();
  }

  /* ── Aktuelles Foto darstellen (Bild + Textoverlay, ohne TTS) ── */
  function darstelleAktFoto(){
    var fotos = aktAlbum.fotos;
    if(aktIndex < 0) aktIndex = fotos.length - 1;
    if(aktIndex >= fotos.length) aktIndex = 0;
    var foto = fotos[aktIndex];
    var src  = (foto && foto.src) || foto || "";
    var text = (foto && foto.text) || "";
    elBild.src = src;
    elCounter.textContent = (aktIndex + 1) + " / " + fotos.length;
    if(text){
      elTextOverlay.textContent = text;
      elTextOverlay.classList.add("sichtbar");
    } else {
      elTextOverlay.textContent = "";
      elTextOverlay.classList.remove("sichtbar");
    }
    return text;
  }

  /* ── Aktuelles Foto anzeigen (manuelle Navigation: + einmalig vorlesen) ── */
  function zeigeAktFoto(){
    if(!aktAlbum) return;
    var text = darstelleAktFoto();
    speechSynthesis.cancel();
    if(text) sprich(text);
  }

  /* ── Zurück zur Alben-Übersicht ── */
  function zeigeAlben(){
    stoppeVortrag();
    screen   = "alben";
    aktAlbum = null;
    elDia.classList.add("hidden");
    elAlben.classList.remove("hidden");
    elZurueckLeiste.classList.remove("hidden");
    rebindDwell();
  }

  /* ── Vortragsmodus: automatische Diashow ohne Klicks/Dwell ── */
  var vortragTimer  = null;
  var vortragLaeuft = false;

  function starteVortrag(){
    vortragLaeuft = true;
    elDia.classList.add("vortrag-aktiv");
    speechSynthesis.cancel();
    zeigeVortragFoto();
    rebindDwell();
  }

  function stoppeVortrag(){
    if(vortragTimer){ clearTimeout(vortragTimer); vortragTimer = null; }
    if(!vortragLaeuft) return;
    vortragLaeuft = false;
    speechSynthesis.cancel();
    elDia.classList.remove("vortrag-aktiv");
    rebindDwell();
  }

  function zeigeVortragFoto(){
    if(!vortragLaeuft) return;
    var text  = darstelleAktFoto();
    var fotos = aktAlbum.fotos;
    if(vortragTimer){ clearTimeout(vortragTimer); vortragTimer = null; }
    function weiter(){
      if(!vortragLaeuft) return;
      vortragTimer = setTimeout(function(){
        if(!vortragLaeuft) return;
        aktIndex++;
        if(aktIndex >= fotos.length) aktIndex = 0;
        zeigeVortragFoto();
      }, 3000);
    }
    if(text){
      sprich(text, weiter);
    } else {
      vortragTimer = setTimeout(weiter, 4000);
    }
  }

  /* ── Return-Button Logik ── */
  function handleReturn(e){
    e.preventDefault();
    if(screen === "diashow"){
      zeigeAlben();
    } else {
      window.location.href = returnEnt;
    }
  }

  /* ── Klick-Handler ── */
  elGrid.addEventListener("click", function(e){
    var a = e.target.closest(".album-kachel");
    if(!a) return;
    e.preventDefault();
    var idx = parseInt(a.dataset.albIdx, 10);
    if(alben[idx]) oeffneDiashow(alben[idx], 0);
  });

  btnVor.addEventListener("click", function(e){
    e.preventDefault();
    aktIndex--;
    zeigeAktFoto();
  });
  btnNach.addEventListener("click", function(e){
    e.preventDefault();
    aktIndex++;
    zeigeAktFoto();
  });
  btnZurUebersicht.addEventListener("click", function(e){
    e.preventDefault();
    zeigeAlben();
  });
  btnReturn.addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = returnEnt;
  });
  btnVortragStart.addEventListener("click", function(e){
    e.preventDefault();
    starteVortrag();
  });
  btnVortragStop.addEventListener("click", function(e){
    e.preventDefault();
    stoppeVortrag();
    darstelleAktFoto();
  });

  /* ── Dwell ── */
  var attachDwell = window.LaetitiaAttachDwell || function(){ return {cancelDwell:function(){}}; };
  var dwellMs    = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;
  var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
  var _dwellHandle = null;

  /* Direktes pointerenter/pointerleave — Goldstandard für Tobii */
  function bindNavBtn(el){
    if(!el || el.dataset.pdwell) return;
    el.dataset.pdwell = "1";
    var timer = null;
    function start(){
      if(timer) return;
      el.classList.add("dwell-active");
      timer = setTimeout(function(){
        timer = null;
        el.classList.remove("dwell-active");
        try{ el.click(); }catch(ex){}
      }, dwellMs);
    }
    function stop(){
      if(timer){ clearTimeout(timer); timer = null; }
      el.classList.remove("dwell-active");
    }
    el.addEventListener("pointerenter", start);
    el.addEventListener("pointerleave", stop);
    el.addEventListener("mouseenter", start);
    el.addEventListener("mouseleave", stop);
    el.addEventListener("click", stop);
  }

  function rebindDwell(){
    if(screen === "alben"){
      /* Album-Kacheln: attachDwell (a-Tags, funktioniert auf Tobii) */
      var sel = "a.album-kachel, #btnReturn";
      if(_dwellHandle === null){
        _dwellHandle = attachDwell(sel, {
          dwellMs: dwellMs, leaveGrace: leaveGrace,
          onActivate: function(el){ try{ el.click(); }catch(ex){} }
        });
      } else {
        if(_dwellHandle.rebind) _dwellHandle.rebind(sel);
      }
      /* data-pdwell entfernen damit Buttons beim nächsten Diashow-Öffnen neu gebunden werden */
      [btnVor, btnNach, btnZurUebersicht, btnVortragStart, btnVortragStop].forEach(function(b){ if(b) delete b.dataset.pdwell; });
    } else {
      /* Diashow-Buttons ◀ ▶, Übersicht, Vortrag: direktes pointerenter */
      bindNavBtn(btnVor);
      bindNavBtn(btnNach);
      bindNavBtn(btnZurUebersicht);
      bindNavBtn(btnVortragStart);
      bindNavBtn(btnVortragStop);
    }
  }

  /* ── Init ── */
  renderAlbenGrid();
  rebindDwell();

})();
