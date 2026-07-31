(function(){
  "use strict";
  // audioQueue.js — Audio/TTS Queue (stabil für Eye-Trigger)
  function pickGermanVoice(){
    var voices = (window.speechSynthesis && speechSynthesis.getVoices) ? speechSynthesis.getVoices() : [];
    if(!voices || !voices.length) return null;
    return voices.find(function(v){ return v.name === "Microsoft Katja Online (Natural) - German (Germany)"; })
        || voices.find(function(v){ return v.name === "Microsoft Katja - German (Germany)"; })
        || voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
        || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de") && v.name.indexOf("Hedda") < 0; })
        || voices.find(function(v){ return v.name.indexOf("Microsoft") >= 0 && v.lang.startsWith("de"); })
        || voices.find(function(v){ return v.lang.startsWith("de"); })
        || null;
  }

  function stopSpeak(){ try{ speechSynthesis.cancel(); }catch{} }

  // callback (optional, Regel 18): wird nach TTS-Ende aufgerufen -- damit
  // koennen Aufrufer Auswahlfelder erst nach vollstaendigem Vorlesen freigeben.
  function speak(text, rate, callback){
    try{
      stopSpeak();
      setTimeout(function(){
        try{
          var u = new SpeechSynthesisUtterance(String(text||""));
          var v = pickGermanVoice();
          if(v) u.voice = v;
          u.lang = "de-DE";
          u.rate = rate || 1.0;
          u.pitch = 1.0;
          u.volume = 1.0;
          if(typeof callback === "function"){
            u.onend = callback;
            u.onerror = callback;
          }
          speechSynthesis.speak(u);
        }catch{ if(typeof callback === "function") callback(); }
      }, 120);
    }catch{ if(typeof callback === "function") callback(); }
  }

  function createQueue(){
    let q = [];
    let busy = false;
    let _onDone = null;
    let _watchdog = null;
    const TIMEOUT_MS = 15000;

    function clearWatchdog(){ if(_watchdog){ clearTimeout(_watchdog); _watchdog=null; } }
    function done(){ clearWatchdog(); busy=false; next(); }

    function clear(){ q=[]; clearWatchdog(); busy=false; stopSpeak(); _onDone=null; }
    function play(items, onDone){
      clearWatchdog();
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
        _watchdog = setTimeout(function(){
          console.error("[AudioQueue] TTS-Timeout nach "+TIMEOUT_MS+"ms, ueberspringe.");
          done();
        }, TIMEOUT_MS);
        setTimeout(function(){
          try{
            var u = new SpeechSynthesisUtterance(String(item.text||""));
            var v = pickGermanVoice();
            if(v) u.voice=v;
            u.lang="de-DE";
            u.rate=item.rate||1.0;
            u.pitch=1.0;
            u.volume=1.0;
            u.onend=function(){ done(); };
            u.onerror=function(){ done(); };
            speechSynthesis.speak(u);
          }catch{ done(); }
        }, 120);
        return;
      }

      if(item.type==="wav"){
        _watchdog = setTimeout(()=>{
          console.error("[AudioQueue] WAV-Timeout nach "+TIMEOUT_MS+"ms, ueberspringe:", item.file);
          done();
        }, TIMEOUT_MS);
        try{
          const a = new Audio(item.file);
          a.volume = 1.0;
          a.onended=()=>done();
          a.onerror=()=>done();
          a.play().catch(()=>{
            clearWatchdog();
            if(item.fallback) speak(item.fallback, item.rate||1.0);
            busy=false; next();
          });
        }catch{ done(); }
        return;
      }

      busy=false; next();
    }

    return { clear, play };
  }

  window.LaetitiaAudioQueue = { createQueue, speak, stopSpeak, pickGermanVoice };
})();