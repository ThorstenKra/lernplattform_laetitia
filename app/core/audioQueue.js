(function(){
  "use strict";
  // audioQueue.js — Audio/TTS Queue (stabil für Eye-Trigger)
  function pickGermanVoice(){
    const voices = (window.speechSynthesis && speechSynthesis.getVoices) ? speechSynthesis.getVoices() : [];
    if(!voices || !voices.length) return null;
    let v = voices.find(x => (x.lang||"").toLowerCase().startsWith("de"));
    if(!v) v = voices[0];
    return v || null;
  }

  function stopSpeak(){ try{ speechSynthesis.cancel(); }catch{} }

  function speak(text, rate){
    try{
      stopSpeak();
      const u = new SpeechSynthesisUtterance(String(text||""));
      const v = pickGermanVoice();
      if(v) u.voice = v;
      u.rate = rate || 1.0;
      u.pitch = 1.0;
      u.volume = 1.0;
      speechSynthesis.speak(u);
    }catch{}
  }

  function createQueue(){
    let q = [];
    let busy = false;
    let _onDone = null;

    function clear(){ q=[]; busy=false; stopSpeak(); _onDone=null; }
    function play(items, onDone){
      stopSpeak();
      q = (items||[]).slice();
      busy = false;
      _onDone = (typeof onDone === "function") ? onDone : null;
      next();
    }
    function next(){
      if(busy) return;
      if(q.length===0){
        busy=false;
        if(_onDone){ var cb=_onDone; _onDone=null; cb(); }
        return;
      }
      busy=true;
      const item = q.shift();

      if(item.type==="tts"){
        try{
          const u = new SpeechSynthesisUtterance(String(item.text||""));
          const v = pickGermanVoice();
          if(v) u.voice=v;
          u.rate=item.rate||1.0;
          u.pitch=1.0;
          u.volume=1.0;
          u.onend=()=>{ busy=false; next(); };
          u.onerror=()=>{ busy=false; next(); };
          speechSynthesis.speak(u);
        }catch{ busy=false; next(); }
        return;
      }

      if(item.type==="wav"){
        try{
          const a = new Audio(item.file);
          a.volume = 1.0;
          a.onended=()=>{ busy=false; next(); };
          a.onerror=()=>{ busy=false; next(); };
          a.play().catch(()=>{
            if(item.fallback) speak(item.fallback, item.rate||1.0);
            busy=false; next();
          });
        }catch{ busy=false; next(); }
        return;
      }

      busy=false; next();
    }

    return { clear, play };
  }

  window.LaetitiaAudioQueue = { createQueue, speak, stopSpeak, pickGermanVoice };
})();