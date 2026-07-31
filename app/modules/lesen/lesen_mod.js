(function(){ // VERSION: 2026-03-15-LESEN
  "use strict";

  const Cfg   = window.LaetitiaConfig;
  const Store = window.LaetitiaStorage;
  const Ret   = window.LaetitiaReturn;
  const AQ    = window.LaetitiaAudioQueue;
  const DR    = window.LaetitiaDataRegistryApi;

  const RETURN_URL = Ret ? Ret.resolve("../../index.html") : "../../index.html";
  if(Ret) Ret.applyToIds(RETURN_URL, ["btnReturnFromMenu","btnReturnFromOverlay"]);

  const cfgNow = Cfg ? Cfg.load() : {};
  const SESSION_SIZE = Cfg ? Cfg.getInt(cfgNow,"fragen",15) : 15;
  const SCHWELLE     = Cfg ? Cfg.getInt(cfgNow,"schwelle",50) : 50;
  const DELAY_MS     = Cfg ? (Cfg.getInt(cfgNow,"delay",4) * 1000) : 4000;

  const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 600;
  const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;

  const STORE_WRONG  = "laetitia_lesen_wrong_v1";
  const STORE_UNLOCK = "laetitia_lesen_unlocked_v1";

  function loadWrongSet(){ return Store ? (Store.getJson(STORE_WRONG, [])||[]) : []; }
  function saveWrongSet(arr){ if(Store) Store.setJson(STORE_WRONG, arr); }
  function isUnlocked(){ return Store ? (Store.getString(STORE_UNLOCK,"") === "1") : false; }
  function setUnlocked(){ if(Store) Store.setString(STORE_UNLOCK,"1"); }

  const queue = AQ ? AQ.createQueue() : { clear(){}, play(){} };
  const speak = AQ ? AQ.speak : function(){};
  const stopSpeak = AQ ? AQ.stopSpeak : function(){};

  // ── Dwell-System (analog deutsch_mod.js) ────────────────────────────────
  let _attachDwell = null;
  let _dwellHandle = null;

  function loadDwell(){
    if(_attachDwell) return _attachDwell;
    if(typeof window.LaetitiaAttachDwell === "function"){
      _attachDwell = window.LaetitiaAttachDwell;
    } else {
      console.warn("[Lesen] window.LaetitiaAttachDwell fehlt — dwell.js geladen?");
      _attachDwell = function(){ return { cancelDwell: function(){} }; };
    }
    return _attachDwell;
  }

  function rebindDwell(){
    if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
      _dwellHandle.cancelDwell();
    }
    var attach = loadDwell();
    const selector = [
      "a.uibtn", "button.uibtn",
      "a.levelBtn", "[data-level]", "[data-answer]",
      "#btnNext", "#btnHome", "#btnHelp",
      "#btnReturnFromMenu", "#btnReturnFromOverlay",
      "a[data-action='OVL_REPEAT']",
      "#btnSpeakText", "#btnSpeakStop",
      "#btnWrong"
    ].join(", ");

    _dwellHandle = attach(selector, {
      dwellMs:    DWELL_MS,
      leaveGrace: LEAVE_GRACE,
      onActivate: (el) => {
        if(el.getAttribute("aria-disabled") === "true") return;
        if(el.getAttribute("data-disabled")  === "1")   return;
        try{ el.click(); }catch(e){}
      }
    });
  }

  const AUDIO = {
    lob:[
      "audio/lob_01.wav","audio/lob_02.wav","audio/lob_03.wav",
      "audio/lob_04.wav","audio/lob_05.wav","audio/lob_06.wav",
      "audio/lob_07.wav","audio/lob_08.wav","audio/lob_09.wav",
      "audio/lob_10.wav"
    ],
    abschluss:[
      "audio/abschluss_01.wav","audio/abschluss_02.wav","audio/abschluss_03.wav",
      "audio/abschluss_04.wav","audio/abschluss_05.wav"
    ],
    freischalten: "audio/system_freischalten.wav",
    falsch:       "audio/system_falsch.wav",
    richtigWaere: "audio/system_richtig_waere.wav",
    geschafft:    "audio/system_geschafft.wav"
  };

  const LOB_TEXTE = [
    "Bravo!","Super!","Toll gemacht!","Wunderbar!",
    "Du überraschst mich!","Fantastisch!","Sehr gut!",
    "Klasse!","Weiter so!","Du bist großartig!"
  ];
  const ABSCHLUSS_TEXTE = [
    "Heute warst du toll!","Großartige Leistung!",
    "Du hast das super gemacht!","Ich bin sehr stolz auf dich!",
    "Wunderschön gemacht!"
  ];

  async function loadTasks(){
    if(DR){
      const v = DR.get("lesen");
      if(Array.isArray(v) && v.length) return v;
    }
    throw new Error("lesen_data.js nicht geladen – bitte Pfad pruefen");
  }

  function $(id){ return document.getElementById(id); }
  function setTopStatus(msg){
    const el=$("topStatus");
    if(el) el.innerHTML="<strong>Status:</strong> "+msg;
  }
  function norm(s){ return (s??"").toString().trim(); }
  function upper(s){ return norm(s).toUpperCase(); }
  function displayTextFlow(s){ return norm(s).replaceAll("\\n"," ").replace(/\s+/g," ").trim(); }

  function hideAllScreens(){
    ["screenMenu","screenTask"].forEach(id => $(id)?.classList.add("hidden"));
  }

  function showMenu(){
    hideAllScreens();
    $("moduleTitle").textContent = "🔊 Lesen";
    $("moduleSub").textContent   = "Wähle eine Lektion";
    $("screenMenu").classList.remove("hidden");
    updateLevelButtons();
    updateSavedLine();
    rebindDwell();
  }

  function showTask(){
    hideAllScreens();
    $("screenTask").classList.remove("hidden");
    rebindDwell();
  }

  function setPickDisabled(disabled){
    ["pick1","pick2","pick3","pick4"].forEach(id=>{
      const a=$(id);
      if(!a) return;
      if(disabled) a.setAttribute("aria-disabled","true");
      else a.removeAttribute("aria-disabled");
    });
  }

  function setNextEnabled(enabled){
    const btn=$("btnNext");
    if(!btn) return;
    if(enabled){
      btn.setAttribute("aria-disabled","false");
      btn.style.pointerEvents="auto";
      btn.style.opacity="1";
    } else {
      btn.setAttribute("aria-disabled","true");
      btn.style.pointerEvents="none";
      btn.style.opacity="0.45";
    }
  }

  let enableTimer=null;
  function scheduleEnableAnswers(){
    if(enableTimer){clearTimeout(enableTimer);enableTimer=null;}
    setPickDisabled(true);
    enableTimer=setTimeout(()=>{
      setPickDisabled(false);
      enableTimer=null;
      rebindDwell();
      try{ if(window.LaetitiaStats) window.LaetitiaStats.taskStart(); }catch{}
    }, DELAY_MS);
  }

  function updateSavedLine(){
    $("savedLine").textContent = "Gespeicherte falsche Antworten: "+loadWrongSet().length;
  }

  let tasks=[];
  let current=[];
  let index=0;
  let answered=false;
  let sessionCorrect=0;
  let sessionTotal=0;
  let currentMode="normal";
  let currentShuffleMap={};

  function shuffleArr(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function pickRandom(arr,n){ return shuffleArr(arr).slice(0,n); }

  function taskId(t){
    return upper(t.stufe)+"|"+norm(t.seite)+"|"+norm(t.text).slice(0,40)+"|"+norm(t.frage).slice(0,30);
  }

  function countByLevel(level){
    return tasks.filter(t=>upper(t.stufe)===upper(level)).length;
  }
  function updateLevelButtons(){
    ["L1","L2","L3","L4","L5","L6","L7","L8"].forEach(lv=>{
      const el=$("desc"+lv);
      if(!el) return;
      const base = el.textContent.replace(/\s*\(\d+\)\s*$/,"");
      el.textContent = base + " ("+countByLevel(lv)+")";
    });
  }

  function setProgressUI(done,total){
    const pct=total>0?Math.round((done/total)*100):0;
    $("progressLabel").textContent="Aufgabe "+(done+1)+" von "+total;
    $("barFill").style.width=pct+"%";
  }
  function setCorrectUI(correct,total){
    const pct=total>0?Math.round((correct/total)*100):0;
    $("correctLabel").textContent="Richtig: "+correct+" / "+total+" ("+pct+"%)";
    $("correctFill").style.width=pct+"%";
  }

  function renderTask(){
    const t=current[index];
    if(!t){ finishSession(); return; }

    answered=false;
    setNextEnabled(false);

    // Text mit Zeilenumbrüchen rendern
    const textEl=$("text");
    if(textEl){
      textEl.textContent="";
      const lines = norm(t.text).split("\\n");
      lines.forEach((line,i)=>{
        if(i>0){ textEl.appendChild(document.createElement("br")); }
        textEl.appendChild(document.createTextNode(line));
      });
    }

    $("frage").textContent = norm(t.frage);

    // Antworten mischen
    const slots=["A","B","C","D"];
    const originals=[
      {letter:"A", text:norm(t.antwort_a)},
      {letter:"B", text:norm(t.antwort_b)},
      {letter:"C", text:norm(t.antwort_c)},
      {letter:"D", text:norm(t.antwort_d)}
    ];
    const shuffled=shuffleArr(originals);
    currentShuffleMap={};
    const slotEls=["read1txt","read2txt","read3txt","read4txt"];
    shuffled.forEach((orig,i)=>{
      const slotLetter=slots[i];
      currentShuffleMap[slotLetter]=orig.letter;
      const txtEl=$(slotEls[i]);
      if(txtEl) txtEl.textContent=orig.text;
    });

    setProgressUI(index, current.length);
    setCorrectUI(sessionCorrect, sessionTotal);

    // Text automatisch vorlesen -- Regel 18: Antwort-Buttons erst NACH TTS-Ende
    // freigeben (statt nach festem Timer). Faellt auf den alten Timer zurueck,
    // falls AQ/speak fehlt (sonst wuerden die Buttons nie wieder freigegeben).
    if(AQ && typeof AQ.speak === "function"){
      setPickDisabled(true);
      try{
        const fullText = norm(t.text).replaceAll("\\n"," ") + " … " + norm(t.frage);
        speak(fullText, 0.92, function(){
          setPickDisabled(false);
          rebindDwell();
          try{ if(window.LaetitiaStats) window.LaetitiaStats.taskStart(); }catch{}
        });
      }catch(e){ scheduleEnableAnswers(); }
    } else {
      scheduleEnableAnswers();
    }
  }

  function start(L){
    const levelTasks = tasks.filter(t=>upper(t.stufe)===upper(L));
    if(!levelTasks.length){
      setTopStatus("Keine Aufgaben für Level "+L);
      return;
    }

    if(currentMode==="wrong"){
      const wrongSet=loadWrongSet();
      const filtered=levelTasks.filter(t=>wrongSet.includes(taskId(t)));
      current = filtered.length ? pickRandom(filtered, Math.min(SESSION_SIZE, filtered.length)) : pickRandom(levelTasks, SESSION_SIZE);
    } else {
      current = pickRandom(levelTasks, Math.min(SESSION_SIZE, levelTasks.length));
    }

    index=0;
    answered=false;
    sessionCorrect=0;
    sessionTotal=0;

    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionStart("lesen", L); }catch{}

    setTopStatus("Level "+L+" gestartet ("+current.length+" Aufgaben). Delay: "+Math.round(DELAY_MS/1000)+"s");
    showTask();
    renderTask();
  }

  function startWrongOnly(){
    currentMode="wrong";
    setTopStatus("Modus: Nur falsche Antworten. Wähle ein Level.");
    showMenu();
  }

  function markWrong(t){
    const id=taskId(t);
    const arr=loadWrongSet();
    if(!arr.includes(id)){ arr.push(id); saveWrongSet(arr); }
    updateSavedLine();
  }
  function unmarkWrong(t){
    const id=taskId(t);
    const arr=loadWrongSet().filter(x=>x!==id);
    saveWrongSet(arr);
    updateSavedLine();
  }

  function showLobBanner(txt){
    const b=$("lobBanner");
    if(!b) return;
    b.textContent=txt;
    b.classList.add("show");
    setTimeout(()=>b.classList.remove("show"),900);
  }

  function correctAnswerText(t){
    const map={A:t.antwort_a, B:t.antwort_b, C:t.antwort_c, D:t.antwort_d};
    return displayTextFlow(map[upper(t.richtig)]||"");
  }

  function tryFlashCorrect(t){
    const orig=upper(t.richtig);
    const slotLetter=Object.keys(currentShuffleMap).find(
      slot=>currentShuffleMap[slot]===orig
    );
    const map={A:"pick1",B:"pick2",C:"pick3",D:"pick4"};
    const el=slotLetter?$(map[slotLetter]):null;
    if(!el) return;
    el.classList.add("correct-flash");
    setTimeout(()=>el.classList.remove("correct-flash"),450);
  }

  function answer(letter){
    if(answered) return;
    const t=current[index];
    if(!t) return;

    const originalLetter=currentShuffleMap[upper(letter)]||upper(letter);
    const correct=upper(t.richtig)===originalLetter;
    answered=true;
    sessionTotal++;

    try{
      if(window.LaetitiaStats){
        window.LaetitiaStats.taskAnswer(taskId(t), correct, upper(letter), false, null);
      }
    }catch{}

    if(correct){
      sessionCorrect++;
      unmarkWrong(t);
      setTopStatus("Richtig.");
      showLobBanner(LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]);
      queue.play([{type:"wav", file:AUDIO.lob[Math.floor(Math.random()*AUDIO.lob.length)], fallback:"Super!"}]);
    } else {
      markWrong(t);
      setTopStatus("Falsch.");
      queue.play([
        {type:"wav", file:AUDIO.falsch,      fallback:"Das war falsch."},
        {type:"wav", file:AUDIO.richtigWaere, fallback:"Richtig wäre:"},
        {type:"tts", text: correctAnswerText(t), rate:0.98}
      ]);
    }

    setCorrectUI(sessionCorrect, sessionTotal);
    setNextEnabled(true);
    tryFlashCorrect(t);
  }

  function next(){
    if(!answered) return;
    index++;
    if(index>=current.length){ finishSession(); return; }
    renderTask();
  }

  function finishSession(){
    const pct=sessionTotal>0?Math.round((sessionCorrect/sessionTotal)*100):0;
    $("overlayScore").textContent="Richtig: "+sessionCorrect+" / "+sessionTotal+" ("+pct+"%)";

    const unlockEl=$("overlayUnlock");
    unlockEl.classList.remove("show");

    const ok=pct>=SCHWELLE;
    if(ok){
      $("overlayTitle").textContent="Toll gemacht!";
      $("overlayEmoji").textContent="🎉";
      queue.play([
        {type:"wav", file:AUDIO.geschafft, fallback:"Geschafft!"},
        {type:"wav", file:AUDIO.abschluss[Math.floor(Math.random()*AUDIO.abschluss.length)], fallback:ABSCHLUSS_TEXTE[0]}
      ]);
      if(!isUnlocked()){
        setUnlocked();
        unlockEl.classList.add("show");
        queue.play([
          {type:"wav", file:AUDIO.geschafft, fallback:"Geschafft!"},
          {type:"wav", file:AUDIO.freischalten, fallback:"Freigeschaltet!"}
        ]);
      }
    } else {
      $("overlayTitle").textContent="Fast!";
      $("overlayEmoji").textContent="🙂";
      queue.play([{type:"wav", file:AUDIO.abschluss[Math.floor(Math.random()*AUDIO.abschluss.length)], fallback:ABSCHLUSS_TEXTE[0]}]);
    }

    $("overlayAbschluss").classList.add("show");
    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionEnd(false); }catch{}
    rebindDwell();
  }

  function home(){
    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionEnd(true); }catch{}
    queue.clear();
    stopSpeak();
    showMenu();
  }

  function bindUI(){
    document.querySelectorAll("[data-level]").forEach(a=>{
      a.addEventListener("click",(ev)=>{ ev.preventDefault(); currentMode="normal"; start(a.getAttribute("data-level")); });
    });

    document.querySelectorAll("[data-answer]").forEach(a=>{
      a.addEventListener("click",(ev)=>{ ev.preventDefault(); answer(a.getAttribute("data-answer")); });
    });

    $("btnNext").addEventListener("click",(ev)=>{ ev.preventDefault(); next(); });
    $("btnHome").addEventListener("click",(ev)=>{ ev.preventDefault(); home(); });
    $("btnWrong").addEventListener("click",(ev)=>{ ev.preventDefault(); startWrongOnly(); });

    $("btnSpeakText")?.addEventListener("click",(ev)=>{
      ev.preventDefault();
      const t=current[index];
      if(!t) return;
      const fullText=norm(t.text).replaceAll("\\n"," ")+" … "+norm(t.frage);
      speak(fullText, 0.92);
    });
    $("btnSpeakStop")?.addEventListener("click",(ev)=>{ ev.preventDefault(); stopSpeak(); });

    $("btnHelp")?.addEventListener("click",(ev)=>{
      ev.preventDefault();
      const t=current[index];
      if(!t) return;
      try{
        if(window.LaetitiaStats) window.LaetitiaStats.markHilfe(taskId(t));
      }catch{}
      const params=new URLSearchParams({
        text:  norm(t.text)  ||"",
        frage: norm(t.frage) ||"",
        stufe: norm(t.stufe) ||""
      });
      window.location.href="./lesen_hilfe.html?"+params.toString();
    });

    document.querySelectorAll("[data-action='OVL_REPEAT']").forEach(a=>{
      a.addEventListener("click",(ev)=>{
        ev.preventDefault();
        $("overlayAbschluss").classList.remove("show");
        const L=current.length>0?upper(current[0].stufe):"";
        if(L) start(L); else home();
      });
    });
  }

  (async function init(){
    loadDwell();
    bindUI();

    try{
      tasks = await loadTasks();
      updateSavedLine();
      updateLevelButtons();
      setTopStatus("Tasks geladen: "+tasks.length+" | Delay: "+Math.round(DELAY_MS/1000)+"s | Dwell: "+DWELL_MS+"ms");
      showMenu();
      try{ speechSynthesis.getVoices(); }catch{}
    }catch(e){
      setTopStatus("Fehler: "+(e&&e.message?e.message:e));
      showMenu();
    }
  })();

})();
