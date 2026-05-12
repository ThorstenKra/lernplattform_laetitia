// app/core/audio_bg.js
// Hintergrundmusik-Engine für alle Module
// Einbinden: <script src="../../core/audio_bg.js"></script>  (VOR dem Modul-Script)
//
// API: window.LaetitiaAudioBg
//   .play(src)      — Musik laden und als Loop starten
//   .stop()         — Musik stoppen und entladen
//   .mute(bool)     — Stummschalten (wird in localStorage gespeichert)
//   .isMuted()      — aktueller Mute-Zustand (true/false)
//   .duck(bool)     — Ducking: Lautstärke temporär auf ~15% (true) oder zurück (false)
//   .setVolume(v)   — Basis-Lautstärke setzen (0.0–1.0, default 0.25)
//
// 🎙️ MARKER — Zukünftige Erweiterung:
//   Musik-Dateien pro Modul in app/modules/MODUL/audio/ ablegen.
//   Empfohlenes Format: MP3, ~2–4 MB, nahtlos loopbar.
//   Lautstärke-Default 0.25 (25%) — Töne und TTS bleiben immer hörbar.

(function(){
"use strict";

const STORE_KEY    = "laetitia_music_muted";
const VOL_NORMAL   = 0.25;   // Basis-Lautstärke (25%)
const VOL_DUCK     = 0.06;   // Lautstärke während TTS (6%)
const DUCK_FADE_MS = 300;    // Überblendzeit beim Ducken in ms
const UNDUCK_MS    = 500;    // Überblendzeit beim Zurückblenden in ms

let _audio       = null;   // HTMLAudioElement
let _baseVolume  = VOL_NORMAL;
let _muted       = false;
let _ducked      = false;
let _fadeTimer   = null;

// Mute-Zustand aus localStorage laden
try{
  _muted = localStorage.getItem(STORE_KEY) === "1";
}catch(e){}

// ── Interne Helfer ────────────────────────────────────────────────────────────

// Sanftes Überblenden der Lautstärke (keine abrupten Sprünge)
function fadeTo(targetVol, durationMs){
  if(!_audio) return;
  if(_fadeTimer) clearInterval(_fadeTimer);
  const start    = _audio.volume;
  const diff     = targetVol - start;
  const steps    = Math.max(1, Math.round(durationMs / 16)); // ~60fps
  let   step     = 0;
  _fadeTimer = setInterval(function(){
    step++;
    const t = step / steps;
    // Ease-in-out für natürlicheres Gefühl
    const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    _audio.volume = Math.min(1, Math.max(0, start + diff * ease));
    if(step >= steps){
      _audio.volume = targetVol;
      clearInterval(_fadeTimer);
      _fadeTimer = null;
    }
  }, 16);
}

function _effectiveVolume(){
  if(_muted)  return 0;
  if(_ducked) return VOL_DUCK;
  return _baseVolume;
}

function _applyVolume(fade){
  const target = _effectiveVolume();
  if(!_audio) return;
  if(fade){
    fadeTo(target, _ducked ? DUCK_FADE_MS : UNDUCK_MS);
  } else {
    if(_fadeTimer) clearInterval(_fadeTimer);
    _audio.volume = target;
  }
}

// ── Öffentliche API ───────────────────────────────────────────────────────────

const api = {

  // Musik starten (src = relativer Pfad zur Audiodatei)
  play: function(src){
    try{
      // Falls bereits dieselbe Datei läuft: nichts tun
      if(_audio && !_audio.paused && _audio.getAttribute("data-src") === src) return;

      // Alte Instanz sauber aufräumen
      if(_audio){
        _audio.pause();
        _audio.src = "";
        _audio = null;
      }

      _audio = new Audio();
      _audio.setAttribute("data-src", src);  // custom property vermeiden
      _audio.loop    = true;
      _audio.preload = "auto";               // Datei vorladen bevor play() kommt
      _audio.volume  = _effectiveVolume();

      _audio.addEventListener("error", function(e){
        console.warn("[AudioBg] Fehler beim Laden:", src, e);
        _audio = null;
      });

      // src NACH addEventListener setzen — löst Laden aus
      _audio.src = src;

      // play() direkt aufrufen — src ist gesetzt, Browser hat User-Kontext
      // (wird hier nach einer echten User-Geste aufgerufen via startGame())
      const tryPlay = function(){
        if(!_audio) return;
        const p = _audio.play();
        if(p !== undefined){
          p.catch(function(err){
            console.warn("[AudioBg] Autoplay blockiert:", err);
            // Fallback: beim nächsten Klick/mousedown starten
            function resumeOnInteraction(){
              if(_audio) _audio.play().catch(function(){});
            }
            document.addEventListener("click",     resumeOnInteraction, { once:true });
            document.addEventListener("mousedown",  resumeOnInteraction, { once:true });
            document.addEventListener("touchstart", resumeOnInteraction, { once:true, passive:true });
          });
        }
      };

      // Warten bis genug Daten geladen sind (robuster als sofortiges play())
      if(_audio.readyState >= 3){
        // Bereits ausreichend gepuffert
        tryPlay();
      } else {
        _audio.addEventListener("canplay", function onCanPlay(){
          _audio.removeEventListener("canplay", onCanPlay);
          tryPlay();
        });
        // Sicherheitsnetz: nach 2s trotzdem versuchen
        setTimeout(function(){ if(_audio && _audio.paused) tryPlay(); }, 2000);
      }

    }catch(e){
      console.warn("[AudioBg] play() fehlgeschlagen:", e);
    }
  },

  // Musik stoppen und Ressource freigeben
  stop: function(){
    try{
      if(_fadeTimer){ clearInterval(_fadeTimer); _fadeTimer = null; }
      if(_audio){
        _audio.pause();
        _audio.src = "";
        _audio = null;
      }
    }catch(e){}
  },

  // Stummschalten (true = stumm, false = aktiv)
  mute: function(bool){
    _muted = !!bool;
    try{ localStorage.setItem(STORE_KEY, _muted ? "1" : "0"); }catch(e){}
    _applyVolume(true);
  },

  // Mute-Zustand toggeln (für Mute-Button)
  toggleMute: function(){
    api.mute(!_muted);
    return _muted;
  },

  // Aktueller Mute-Zustand
  isMuted: function(){
    return _muted;
  },

  // Ducking: true = leise (während TTS), false = normale Lautstärke
  duck: function(bool){
    _ducked = !!bool;
    _applyVolume(true);
  },

  // Basis-Lautstärke ändern (0.0–1.0)
  setVolume: function(v){
    _baseVolume = Math.min(1, Math.max(0, v));
    if(!_ducked) _applyVolume(true);
  }

};

window.LaetitiaAudioBg = api;

})();
