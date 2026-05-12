// app/modules/memory/memory_mod.js  v7
// Memory-Spiel — robuste Event-Bindung, Flip-Animation, Bestzeiten, TTS-Lob
// NEU v6: Web Audio API Töne für alle Spielmomente (kein WAV nötig, funktioniert bei file://)
// NEU v7: Hintergrundmusik via audio_bg.js — Loop, Ducking bei TTS, Mute-Button
//
// 🎵 MUSIK-DATEI:
//   Ablegen unter: app/modules/memory/audio/musik_memory.m4a
//   Format: M4A (AAC) oder MP3 — beides wird von Edge/Chrome bei file:// unterstützt
//   Stimmung: verspielt, fröhlich, kindgerecht

(function(){ "use strict";

// ══════════════════════════════════════════════════════════════════════════════
// SYMBOL-SETS
// ══════════════════════════════════════════════════════════════════════════════
const SYMBOL_SETS = {
  tiere:   { id:"tiere",   label:"Tiere",   emoji:["🐶","🐱","🐰","🦊","🐻","🐼","🐨","🐯","🐸","🐧","🦋","🐬"] },
  essen:   { id:"essen",   label:"Essen",   emoji:["🍕","🍔","🍦","🍩","🍪","🎂","🍓","🍉","🍌","🍎","🥕","🌽"] },
  objekte: { id:"objekte", label:"Objekte", emoji:["⭐","🌈","🚀","🎈","🎁","🔑","💎","🏆","🎯","🎸","🚗","🔮"] }
};

const STUFEN = [
  { id:"S1", label:"Stufe 1", paare:3,  cols:3, rows:2, beschreibung:"6 Karten · sehr einfach"  },
  { id:"S2", label:"Stufe 2", paare:6,  cols:4, rows:3, beschreibung:"12 Karten · einfach"      },
  { id:"S3", label:"Stufe 3", paare:8,  cols:4, rows:4, beschreibung:"16 Karten · mittel"        },
  { id:"S4", label:"Stufe 4", paare:10, cols:5, rows:4, beschreibung:"20 Karten · schwer"        },
  { id:"S5", label:"Stufe 5", paare:12, cols:6, rows:4, beschreibung:"24 Karten · sehr schwer"   }
];

// ══════════════════════════════════════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════════════════════════════════════
const STORE_KEY = "laetitia_memory_v2";
function loadStore(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)||"{}"); }catch{ return {}; } }
function saveStore(o){ try{ localStorage.setItem(STORE_KEY,JSON.stringify(o)); }catch{} }

function getBestzeit(setId, stufeId){
  return loadStore().bestzeit?.[setId]?.[stufeId] ?? null;
}
function saveBestzeit(setId, stufeId, ms){
  const s = loadStore();
  if(!s.bestzeit) s.bestzeit = {};
  if(!s.bestzeit[setId]) s.bestzeit[setId] = {};
  const prev = s.bestzeit[setId][stufeId] ?? Infinity;
  if(ms < prev){ s.bestzeit[setId][stufeId] = ms; saveStore(s); return true; }
  return false;
}

// ══════════════════════════════════════════════════════════════════════════════
// KONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════
const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 600;
const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;
const MISMATCH_DELAY  = 1200;
const LOCK_AFTER_FLIP = 600;

// ══════════════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════════════
let activeSet    = SYMBOL_SETS.tiere;
let activeStufe  = null;
let cards        = [];
let firstCard    = null;
let locked       = false;
let moves        = 0;
let matchedPairs = 0;
let startTime    = null;
let timerInterval = null;

// ══════════════════════════════════════════════════════════════════════════════
// HINTERGRUNDMUSIK
// ══════════════════════════════════════════════════════════════════════════════
// 🎵 Pfad zur Musik-Datei — M4A/MP3/OGG werden unterstützt:
const MUSIK_SRC = "audio/musik_memory.m4a";

// Kurzreferenz auf audio_bg.js API (null-safe falls Script nicht geladen)
const BG = window.LaetitiaAudioBg || null;

function bgPlay(){
  if(BG) BG.play(MUSIK_SRC);
}
function bgStop(){
  if(BG) BG.stop();
}
// Ducking ein: Musik auf ~6% während TTS spricht
function bgDuckOn(){
  if(BG) BG.duck(true);
}
// Ducking aus: Musik kehrt zur normalen Lautstärke zurück
function bgDuckOff(){
  if(BG) BG.duck(false);
}
// Mute-Button-Zustand aktualisieren
function updateMuteBtn(){
  const btn = document.getElementById("btnMute");
  if(!btn) return;
  const muted = BG ? BG.isMuted() : false;
  btn.textContent = muted ? "🔇" : "🔊";
  btn.classList.toggle("muted", muted);
  btn.title = muted ? "Musik einschalten" : "Musik stumm schalten";
}


let _attachDwell = null;
let _dwellHandle = null;

function loadDwell(){
  if(_attachDwell) return _attachDwell;
  if(typeof window.LaetitiaAttachDwell === "function"){
    _attachDwell = window.LaetitiaAttachDwell;
  } else {
    console.warn("[Memory] LaetitiaAttachDwell fehlt");
    _attachDwell = () => ({ cancelDwell(){} });
  }
  return _attachDwell;
}

function rebindDwell(){
  if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
    _dwellHandle.cancelDwell();
  }
  const attach = loadDwell();
  const selector = [
    ".cardWrapper:not([data-disabled='1'])",
    ".stufeBtn", ".setBtn",
    "#btnRetry", "#btnMenu", "#btnReturnFromMenu", "#btnMute",
    "button[data-action='RETRY']", "button[data-action='MENU']"
  ].join(", ");

  _dwellHandle = attach(selector, {
    dwellMs:    DWELL_MS,
    leaveGrace: LEAVE_GRACE,
    onActivate: (el) => {
      if(el.getAttribute("aria-disabled") === "true") return;
      if(el.getAttribute("data-disabled")  === "1")   return;
      const btn = el.closest(".stufeBtn, .setBtn, .cardWrapper, #btnRetry, #btnMenu, #btnReturnFromMenu, #btnMute, [data-action]") || el;
      if(btn.classList.contains("stufeBtn")){
        const stufe = STUFEN.find(s => s.id === btn.dataset.stufeId);
        if(stufe) startGame(stufe);
      } else if(btn.classList.contains("setBtn")){
        const setId = btn.dataset.setId;
        if(SYMBOL_SETS[setId]){
          activeSet = SYMBOL_SETS[setId];
          renderSetButtons(); renderStufeButtons();
          setTimeout(rebindDwell, 50);
        }
      } else if(btn.classList.contains("cardWrapper")){
        onCardClick(parseInt(btn.dataset.idx));
      } else if(btn.id === "btnRetry"){ if(activeStufe) startGame(activeStufe);
      } else if(btn.id === "btnMenu"){ showMenu();
      } else if(btn.id === "btnMute"){ if(BG){ BG.toggleMute(); updateMuteBtn(); }
      } else if(btn.id === "btnReturnFromMenu"){ window.location.href = btn.href;
      } else if(btn.dataset.action === "RETRY"){ if(activeStufe) startGame(activeStufe);
      } else if(btn.dataset.action === "MENU"){ showMenu();
      }
    }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ══════════════════════════════════════════════════════════════════════════════
function $(id){ return document.getElementById(id); }

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function formatTime(ms){
  const s=Math.floor(ms/1000);
  const m=Math.floor(s/60);
  return m>0 ? `${m}:${String(s%60).padStart(2,"0")} min` : `${s} s`;
}

function setStatus(msg){ const el=$("memStatus"); if(el) el.textContent=msg; }
function setTop(msg){ const el=$("topStatus"); if(el) el.innerHTML="<strong>Memory</strong> — "+msg; }

// ══════════════════════════════════════════════════════════════════════════════
// WEB AUDIO API — Töne (kein WAV nötig, funktioniert bei file://)
// ══════════════════════════════════════════════════════════════════════════════
let _audioCtx = null;

function getAudioCtx(){
  if(!_audioCtx){
    try{
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }catch(e){
      console.warn("[Memory] Web Audio API nicht verfügbar:", e);
      return null;
    }
  }
  // AudioContext nach User-Interaktion ggf. fortsetzen
  if(_audioCtx.state === "suspended"){
    _audioCtx.resume().catch(()=>{});
  }
  return _audioCtx;
}

// Einfachen Ton spielen: freq in Hz, dauer in s, typ = "sine"/"triangle"/"square"
// attack/release für sanftes Ein-/Ausblenden (kein Knacken)
function playTone(freq, dauer, typ, lautstaerke, attack, release){
  const ctx = getAudioCtx(); if(!ctx) return;
  typ        = typ        || "sine";
  lautstaerke= lautstaerke|| 0.4;
  attack     = attack     || 0.01;
  release    = release    || 0.1;
  const now  = ctx.currentTime;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type      = typ;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(lautstaerke, now + attack);
  gain.gain.setValueAtTime(lautstaerke, now + dauer - release);
  gain.gain.linearRampToValueAtTime(0, now + dauer);
  osc.start(now);
  osc.stop(now + dauer);
}

// Sequenz von Tönen: [{freq, dauer, pause, typ, vol}]
// pause = Stille nach dem Ton (vor dem nächsten)
function playSequenz(toene){
  const ctx = getAudioCtx(); if(!ctx) return;
  let t = ctx.currentTime + 0.01;
  toene.forEach(function(ton){
    const freq  = ton.freq;
    const dauer = ton.dauer || 0.15;
    const pause = ton.pause || 0;
    const typ   = ton.typ   || "sine";
    const vol   = ton.vol   || 0.4;
    const atk   = ton.atk   || 0.01;
    const rel   = ton.rel   || 0.08;
    const osc   = ctx.createOscillator();
    const gain  = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = typ;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + atk);
    gain.gain.setValueAtTime(vol, t + dauer - rel);
    gain.gain.linearRampToValueAtTime(0, t + dauer);
    osc.start(t);
    osc.stop(t + dauer);
    t += dauer + pause;
  });
}

// ── SOUND-BIBLIOTHEK ──────────────────────────────────────────────────────────
//
// 🎙️ PROFISTIMME-MARKER — ZUKÜNFTIGE ERWEITERUNG
// ══════════════════════════════════════════════════════════════════════════════
// Alle Sound-Funktionen unten sind mit Web Audio API synthetisiert (Töne) oder
// per Web Speech API gesprochen (TTS). Sie sind als PLATZHALTER konzipiert.
//
// ZUM GEGEBENEN ZEITPUNKT ersetzen durch:
//
//   soundMatch()    → kurze MP3/WAV-Datei: Glockenklang (professionell produziert)
//                     Empfehlung: heller Chime, ca. 0.3–0.5s
//                     Dateipfad-Platzhalter: "audio/sound_match.mp3"
//
//   soundMismatch() → kurze MP3/WAV-Datei: sanfter tiefer Ton, kein Fehler-Buzzer
//                     Empfehlung: weicher Bass-Chime, ca. 0.2s
//                     Dateipfad-Platzhalter: "audio/sound_mismatch.mp3"
//
//   soundFanfare()  → MP3/WAV-Datei: kleine Siegesmelodie (4–6 Töne), ca. 1s
//                     Dateipfad-Platzhalter: "audio/sound_fanfare.mp3"
//
//   soundRekord()   → MP3/WAV-Datei: besonderer Extraklang für Bestzeit
//                     Dateipfad-Platzhalter: "audio/sound_rekord.mp3"
//
//   soundStart()    → MP3/WAV-Datei: kurzer Startton/Jingle, ca. 0.4s
//                     Dateipfad-Platzhalter: "audio/sound_start.mp3"
//
//   speakMatchLob() → Profistimme-Aufnahmen für alle Ausrufe:
//                     "Bravo!"    → "audio/lob_bravo.mp3"
//                     "Super!"    → "audio/lob_super.mp3"
//                     "Toll!"     → "audio/lob_toll.mp3"
//                     "Ja!"       → "audio/lob_ja.mp3"
//                     "Klasse!"   → "audio/lob_klasse.mp3"
//                     "Sehr gut!" → "audio/lob_sehr_gut.mp3"
//                     "Wunderbar!"→ "audio/lob_wunderbar.mp3"
//
//   speak() in showEnd()  → Profistimme für Abschluss-Lob-Texte
//                           Varianten aufnehmen, dann wie AUDIO.lob[] in deutsch_mod.js
//
//   speak() in startGame() → "Stufe X, los geht's!" als Profistimme
//                            Varianten: "audio/start_stufe_1.mp3" bis "audio/start_stufe_5.mp3"
//
// UMSETZUNGS-PLAN (wenn bereit):
//   1. Alle MP3/WAV-Dateien in app/modules/memory/audio/ ablegen
//   2. soundMatch() etc. auf new Audio("audio/xxx.mp3").play() umstellen
//   3. speakMatchLob() auf zufälligen MP3-Pick aus Array umstellen
//   4. speak()-Aufrufe auf AudioQueue (wie in deutsch_mod.js) umstellen
//   5. Web Speech API speak() als Fallback behalten falls MP3 fehlt
// ══════════════════════════════════════════════════════════════════════════════

// Paar gefunden: zwei aufsteigende Glockentöne (hell, freudig)
// 🎙️ MARKER: ersetzen durch → new Audio("audio/sound_match.mp3").play()
function soundMatch(){
  playSequenz([
    { freq:523, dauer:0.12, pause:0.04, typ:"sine",     vol:0.35, rel:0.06 }, // C5
    { freq:784, dauer:0.22, pause:0,    typ:"sine",     vol:0.40, rel:0.12 }  // G5
  ]);
}

// Kein Paar: kurzer tiefer Ton (neutral, kein Frust-Signal)
// 🎙️ MARKER: ersetzen durch → new Audio("audio/sound_mismatch.mp3").play()
function soundMismatch(){
  playTone(220, 0.18, "triangle", 0.18, 0.01, 0.10);
}

// Fanfare: aufsteigende Melodie C4→E4→G4→C5 (Sieg!)
// 🎙️ MARKER: ersetzen durch → new Audio("audio/sound_fanfare.mp3").play()
function soundFanfare(){
  playSequenz([
    { freq:262, dauer:0.14, pause:0.04, typ:"triangle", vol:0.35, atk:0.01, rel:0.06 }, // C4
    { freq:330, dauer:0.14, pause:0.04, typ:"triangle", vol:0.38, atk:0.01, rel:0.06 }, // E4
    { freq:392, dauer:0.14, pause:0.04, typ:"triangle", vol:0.40, atk:0.01, rel:0.06 }, // G4
    { freq:523, dauer:0.36, pause:0,    typ:"sine",     vol:0.45, atk:0.02, rel:0.18 }  // C5 (lang)
  ]);
}

// Rekord-Extra: zusätzlicher hoher Glockenton nach der Fanfare
// 🎙️ MARKER: ersetzen durch → new Audio("audio/sound_rekord.mp3").play()
function soundRekord(){
  setTimeout(function(){
    playSequenz([
      { freq:784, dauer:0.12, pause:0.05, typ:"sine", vol:0.35, rel:0.08 }, // G5
      { freq:1047,dauer:0.28, pause:0,    typ:"sine", vol:0.38, rel:0.16 }  // C6
    ]);
  }, 900);
}

// Spielstart: kurzer freundlicher Startton
// 🎙️ MARKER: ersetzen durch → new Audio("audio/sound_start.mp3").play()
function soundStart(){
  playSequenz([
    { freq:392, dauer:0.10, pause:0.03, typ:"sine", vol:0.28, rel:0.05 }, // G4
    { freq:523, dauer:0.16, pause:0,    typ:"sine", vol:0.32, rel:0.08 }  // C5
  ]);
}

// ══════════════════════════════════════════════════════════════════════════════
// TTS
// ══════════════════════════════════════════════════════════════════════════════
let _deVoice = null;
function loadVoice(cb){
  if(_deVoice){ cb(_deVoice); return; }
  const voices = window.speechSynthesis?.getVoices() || [];
  const de = voices.find(v=>(v.lang||"").toLowerCase().startsWith("de"));
  if(de){ _deVoice=de; cb(de); return; }
  if(window.speechSynthesis){
    window.speechSynthesis.onvoiceschanged = function(){
      const v2 = window.speechSynthesis.getVoices();
      _deVoice = v2.find(v=>(v.lang||"").toLowerCase().startsWith("de")) || null;
      cb(_deVoice);
      window.speechSynthesis.onvoiceschanged = null;
    };
    setTimeout(()=>{
      if(_deVoice) return;
      _deVoice = window.speechSynthesis.getVoices().find(v=>(v.lang||"").toLowerCase().startsWith("de")) || null;
      cb(_deVoice);
    }, 800);
  }
}
function speak(text, delay){
  delay = delay || 0;
  setTimeout(function(){
    try{
      if(!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      loadVoice(function(voice){
        const u = new SpeechSynthesisUtterance(text);
        if(voice) u.voice = voice;
        u.lang="de-DE"; u.rate=0.90; u.pitch=1.05;
        // Ducking: Musik leiser wenn TTS startet, danach wieder hoch
        bgDuckOn();
        u.onend   = function(){ bgDuckOff(); };
        u.onerror = function(){ bgDuckOff(); };
        window.speechSynthesis.speak(u);
      });
    }catch(e){ bgDuckOff(); }
  }, delay);
}

// Zufälligen Kurzausruf beim Paar-Finden sprechen
// 🎙️ MARKER: Kurzausrufe — ersetzen durch Profistimme-MP3-Array
// Dateipfade: audio/lob_bravo.mp3, audio/lob_super.mp3, audio/lob_toll.mp3 ...
// Umsetzung: const f = LOB_FILES[Math.floor(Math.random()*LOB_FILES.length)]; new Audio(f).play();
const MATCH_AUSRUFE = ["Bravo!", "Super!", "Toll!", "Ja!", "Klasse!", "Sehr gut!", "Wunderbar!"];
function speakMatchLob(){
  const text = MATCH_AUSRUFE[Math.floor(Math.random() * MATCH_AUSRUFE.length)];
  speak(text, 150); // kurze Verzögerung damit der Ton zuerst kommt
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════════════════════
function hideAll(){
  const ids = ["screenMenu","screenGame","screenEnd"];
  ids.forEach(id=>{
    const el = $(id);
    if(el) el.style.display = "none";
  });
}

function showMenu(){
  stopTimer();
  bgStop();   // Musik stoppen wenn im Menü (startet neu beim nächsten Spielstart)
  hideAll();
  const el = $("screenMenu");
  if(el) el.style.display = "flex";
  renderSetButtons();
  renderStufeButtons();
  setTimeout(rebindDwell, 50);
}

function showGame(){
  hideAll();
  const el = $("screenGame");
  if(el) el.style.display = "flex";
}

function showEnd(elapsed){
  stopTimer();
  hideAll();
  const isNewRecord = saveBestzeit(activeSet.id, activeStufe.id, elapsed);
  const best = getBestzeit(activeSet.id, activeStufe.id);

  $("endEmoji").textContent = isNewRecord ? "🏆" : "🎉";
  $("endTitle").textContent = isNewRecord ? "Neuer Rekord!" : "Super gemacht!";
  $("endStufe").textContent = activeStufe.label;
  $("endMoves").textContent = `${moves} Züge`;
  $("endTime").textContent  = `Zeit: ${formatTime(elapsed)}`;

  const bestEl = $("endBest");
  if(bestEl){
    bestEl.textContent = isNewRecord ? "Neue Bestzeit!" : `Bestzeit: ${formatTime(best)}`;
    bestEl.style.color = isNewRecord ? "var(--gold)" : "var(--muted)";
  }
  const nextEl = $("endNext");
  if(nextEl) nextEl.style.display = "none";

  const endEl = $("screenEnd");
  if(endEl) endEl.style.display = "flex";
  setTimeout(rebindDwell, 50);

  // Ton zuerst, dann TTS mit Verzögerung
  // 🎙️ MARKER (Rekord-Lob): speak() → Profistimme-MP3
  //   Varianten aufnehmen, z.B. "audio/lob_rekord_01.mp3" bis "audio/lob_rekord_04.mp3"
  //   Züge + Zeit dynamisch → TTS bleibt sinnvoll; MP3 nur für Einleitung ("Unglaublich! Neuer Rekord!")
  if(isNewRecord){
    soundFanfare();
    soundRekord();
    const lobTexte = ["Unglaublich!","Fantastisch!","Sensationell!","Einfach toll!"];
    const lob = lobTexte[Math.floor(Math.random()*lobTexte.length)];
    speak(`${lob} Neuer Rekord! Du hast ${moves} Züge gebraucht und ${Math.floor(elapsed/1000)} Sekunden.`, 1400);
  } else {
    soundFanfare();
    // 🎙️ MARKER (Abschluss-Lob): speak() → Profistimme-MP3 für Einleitung
    //   z.B. "audio/lob_abschluss_01.mp3" bis "audio/lob_abschluss_05.mp3"
    //   (analog zu AUDIO.abschluss[] in deutsch_mod.js)
    const lobTexte = ["Toll gemacht!","Wunderbar!","Super!","Fantastisch!","Klasse!"];
    const lob = lobTexte[Math.floor(Math.random()*lobTexte.length)];
    speak(`${lob} Du hast ${moves} Züge gebraucht und ${Math.floor(elapsed/1000)} Sekunden.`, 900);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// MENÜ AUFBAUEN
// ══════════════════════════════════════════════════════════════════════════════
function renderSetButtons(){
  const container = $("setGrid");
  if(!container) return;
  container.innerHTML = "";
  Object.values(SYMBOL_SETS).forEach(set=>{
    const btn = document.createElement("button");
    btn.className = "setBtn" + (set.id===activeSet.id ? " setBtn--active" : "");
    btn.dataset.setId = set.id;
    btn.innerHTML = `<span class="setEmoji">${set.emoji[0]}${set.emoji[1]}${set.emoji[2]}</span><span class="setLabel">${set.label}</span>`;
    container.appendChild(btn);
  });
}

function renderStufeButtons(){
  const container = $("stufeGrid");
  if(!container) return;
  container.innerHTML = "";
  STUFEN.forEach(stufe=>{
    const best = getBestzeit(activeSet.id, stufe.id);
    const btn = document.createElement("button");
    btn.className = "stufeBtn";
    btn.dataset.stufeId = stufe.id;
    const previewEmojis = activeSet.emoji.slice(0,Math.min(3,stufe.paare)).join(" ");
    const bestStr = best !== null
      ? `<div class="stufeBest">⏱ ${formatTime(best)}</div>`
      : `<div class="stufeBest" style="opacity:0.4">noch nicht gespielt</div>`;
    btn.innerHTML = `
      <div class="stufeName">${stufe.label}</div>
      <div class="stufeDesc">${stufe.beschreibung}</div>
      <div class="stufePreview">${previewEmojis}</div>
      ${bestStr}`;
    container.appendChild(btn);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SPIEL STARTEN
// ══════════════════════════════════════════════════════════════════════════════
function startGame(stufe){
  activeStufe  = stufe;
  firstCard    = null;
  locked       = false;
  moves        = 0;
  matchedPairs = 0;
  startTime    = Date.now();

  const emojis   = activeSet.emoji.slice(0, stufe.paare);
  const shuffled = shuffle([...emojis, ...emojis]);
  cards = shuffled.map((emoji,i)=>({ id:i, emoji, matched:false, flipped:false }));

  showGame();
  updateStats();
  renderBoard(stufe);
  startTimer();
  setTop(`${stufe.label} · ${activeSet.label}`);
  bgPlay();   // Hintergrundmusik starten (oder fortsetzen falls bereits geladen)

  // Startton + TTS Einleitung
  // 🎙️ MARKER (Spielstart): speak() → Profistimme-MP3
  //   5 Dateien: "audio/start_stufe_1.mp3" bis "audio/start_stufe_5.mp3"
  //   Inhalt z.B.: "Stufe 1 — Los geht's!" mit motivierender Stimme
  soundStart();
  speak(`${stufe.label}, los geht's!`, 300);

  setTimeout(rebindDwell, 50);
}

// ══════════════════════════════════════════════════════════════════════════════
// SPIELFELD
// ══════════════════════════════════════════════════════════════════════════════
function renderBoard(stufe){
  const board = $("memBoard");
  if(!board) return;
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${stufe.cols}, 1fr)`;
  board.style.gridTemplateRows    = `repeat(${stufe.rows}, 1fr)`;
  cards.forEach((card,i)=>{
    const wrapper = document.createElement("div");
    wrapper.className = "cardWrapper";
    wrapper.dataset.idx = String(i);
    const inner = document.createElement("div");
    inner.className = "cardInner";
    const back  = document.createElement("div");
    back.className = "cardFace cardBack";
    back.innerHTML = `<span class="cardSymbol">❓</span>`;
    const front = document.createElement("div");
    front.className = "cardFace cardFront";
    front.innerHTML = `<span class="cardSymbol">${card.emoji}</span>`;
    inner.appendChild(back);
    inner.appendChild(front);
    wrapper.appendChild(inner);
    wrapper.addEventListener("click", ()=> onCardClick(i));
    board.appendChild(wrapper);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// KARTE KLICK
// ══════════════════════════════════════════════════════════════════════════════
function onCardClick(idx){
  if(locked) return;
  const card = cards[idx];
  if(!card || card.matched || card.flipped) return;
  card.flipped = true;
  flipCardEl(idx, true);
  disableCard(idx);
  if(firstCard === null){
    firstCard = idx;
    setStatus("Zweite Karte wählen…");
    return;
  }
  locked = true;
  moves++;
  updateStats();
  const first = cards[firstCard];
  if(first.emoji === card.emoji){
    // ✅ PAAR GEFUNDEN
    first.matched = true; card.matched = true; matchedPairs++;
    const i1 = firstCard; firstCard = null;
    setStatus("✅ Paar gefunden!");
    soundMatch();          // Glockenklang sofort
    speakMatchLob();       // Kurzausruf mit 150ms Verzögerung
    setTimeout(()=>{
      markMatchedEl(i1); markMatchedEl(idx);
      locked = false;
      setTimeout(rebindDwell, 50);
      if(matchedPairs === activeStufe.paare){
        setTimeout(()=> showEnd(Date.now()-startTime), 500);
      } else {
        setStatus("Weiter — nächste Karte wählen");
      }
    }, LOCK_AFTER_FLIP);
  } else {
    // ❌ KEIN PAAR
    const i1=firstCard, i2=idx; firstCard=null;
    setStatus("❌ Kein Paar — Karten drehen sich zurück");
    soundMismatch();       // tiefer Ton sofort
    setTimeout(()=>{
      cards[i1].flipped=false; cards[i2].flipped=false;
      flipCardEl(i1,false); flipCardEl(i2,false);
      enableCard(i1); enableCard(i2);
      locked=false;
      setTimeout(rebindDwell, 50);
      setStatus("Nächste Karte wählen");
    }, MISMATCH_DELAY);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// KARTEN-ANIMATION
// ══════════════════════════════════════════════════════════════════════════════
function getWrapper(idx){ return document.querySelector(`.cardWrapper[data-idx="${idx}"]`); }
function flipCardEl(idx, show){
  const w=getWrapper(idx); if(!w) return;
  const inner=w.querySelector(".cardInner"); if(!inner) return;
  inner.classList.toggle("flipped", show);
}
function markMatchedEl(idx){
  const w=getWrapper(idx); if(!w) return;
  w.classList.add("cardWrapper--matched");
  w.dataset.disabled="1"; w.setAttribute("aria-disabled","true");
}
function disableCard(idx){ const el=getWrapper(idx); if(el){ el.dataset.disabled="1"; el.setAttribute("aria-disabled","true"); } }
function enableCard(idx){ const el=getWrapper(idx); if(el){ delete el.dataset.disabled; el.removeAttribute("aria-disabled"); } }

// ══════════════════════════════════════════════════════════════════════════════
// STATS & TIMER
// ══════════════════════════════════════════════════════════════════════════════
function updateStats(){
  const el=$("memStats"); if(!el) return;
  el.textContent=`Züge: ${moves}  |  Paare: ${matchedPairs} / ${activeStufe?.paare||0}`;
}
function startTimer(){
  stopTimer();
  timerInterval=setInterval(()=>{
    const el=$("memTimer"); if(el&&startTime) el.textContent=formatTime(Date.now()-startTime);
  },1000);
}
function stopTimer(){ if(timerInterval){ clearInterval(timerInterval); timerInterval=null; } }

// ══════════════════════════════════════════════════════════════════════════════
// EVENT-BINDING
// ══════════════════════════════════════════════════════════════════════════════
function bindUI(){
  $("stufeGrid")?.addEventListener("click", ev=>{
    const btn = ev.target.closest(".stufeBtn");
    if(!btn) return;
    const stufe = STUFEN.find(s=> s.id === btn.dataset.stufeId);
    if(stufe) startGame(stufe);
  });

  $("setGrid")?.addEventListener("click", ev=>{
    const btn = ev.target.closest(".setBtn");
    if(!btn) return;
    if(SYMBOL_SETS[btn.dataset.setId]){
      activeSet = SYMBOL_SETS[btn.dataset.setId];
      renderSetButtons();
      renderStufeButtons();
      setTimeout(rebindDwell, 50);
    }
  });

  $("btnRetry")?.addEventListener("click", ()=>{ if(activeStufe) startGame(activeStufe); });
  $("btnMenu")?.addEventListener("click",  ()=> showMenu());

  // Mute-Button
  $("btnMute")?.addEventListener("click", ()=>{
    if(BG){ BG.toggleMute(); updateMuteBtn(); }
  });

  $("screenEnd")?.addEventListener("click", ev=>{
    const btn = ev.target.closest("button[data-action]");
    if(!btn) return;
    if(btn.dataset.action==="RETRY" && activeStufe) startGame(activeStufe);
    if(btn.dataset.action==="MENU") showMenu();
  });

  // AudioContext bei erster User-Interaktion initialisieren (Browser-Pflicht)
  document.addEventListener("click",    function initAudio(){ getAudioCtx(); document.removeEventListener("click",    initAudio); }, { once:true });
  document.addEventListener("mousedown",function initAudio(){ getAudioCtx(); document.removeEventListener("mousedown",initAudio); }, { once:true });
}

// ══════════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════════
(function init(){
  loadDwell();
  bindUI();
  showMenu();
  try{ window.speechSynthesis?.getVoices(); }catch{}
  loadVoice(()=>{});
  // Mute-Button-Zustand aus localStorage wiederherstellen
  updateMuteBtn();
  // Musik stoppen wenn Seite verlassen wird (Zurück-Button, Navigation)
  window.addEventListener("pagehide", function(){ bgStop(); });
  window.addEventListener("beforeunload", function(){ bgStop(); });
})();

})();
