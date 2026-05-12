(function(){ // VERSION: 2026-03-15-FINAL
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
  const DELAY_MS     = Cfg ? (Cfg.getInt(cfgNow,"delay",1) * 1000) : 1000;

  // Dwell-Zeit aus localStorage (konsistent mit index.html und moduleKit)
  const DWELL_MS    = parseInt(localStorage.getItem("laetitia_dwell_ms"))       || 600;
  const LEAVE_GRACE = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 100;

  // Storage keys bleiben für Deutsch wie gehabt (damit bestehende Daten weiter gelten)
  const STORE_WRONG  = "laetitia_wrong_v1";
  const STORE_UNLOCK = "laetitia_unlocked_v1";

  function loadWrongSet(){ return Store ? (Store.getJson(STORE_WRONG, [])||[]) : []; }
  function saveWrongSet(arr){ if(Store) Store.setJson(STORE_WRONG, arr); }
  function isUnlocked(){ return Store ? (Store.getString(STORE_UNLOCK,"") === "1") : false; }
  function setUnlocked(){ if(Store) Store.setString(STORE_UNLOCK,"1"); }

  const queue = AQ ? AQ.createQueue() : { clear(){}, play(){} };
  const speak = AQ ? AQ.speak : function(){};
  const stopSpeak = AQ ? AQ.stopSpeak : function(){};

  // ── Dwell-System ─────────────────────────────────────────────────────────
  // dwell.js wird als normales <script> geladen → window.LaetitiaAttachDwell
  // KEIN dynamisches import() — funktioniert nicht bei file:// in Edge
  let _attachDwell = null;
  let _dwellHandle = null;

  function loadDwell(){
    if(_attachDwell) return _attachDwell;
    if(typeof window.LaetitiaAttachDwell === "function"){
      _attachDwell = window.LaetitiaAttachDwell;
    } else {
      console.warn("[Deutsch] window.LaetitiaAttachDwell nicht gefunden — dwell.js geladen?");
      _attachDwell = function(){ return { cancelDwell: function(){} }; };
    }
    return _attachDwell;
  }

  function rebindDwell(){
    if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
      _dwellHandle.cancelDwell();
    } else {
      // Erster Aufruf: _dwellHandle noch null — Schutzzeit trotzdem setzen
      if(window._LDwellState && typeof window._LDwellState === "object"){
        window._LDwellState.protectUntil = Date.now() + 1200;
      }
    }
    var attach = loadDwell();
    var selector = [
      "a.uibtn", "button.uibtn",
      "a.levelBtn", "[data-level]", "[data-answer]",
      "#btnNext", "#btnHome", "#btnHelp", "#btnWrong",
      "#btnReturnFromMenu", "#btnReturnFromOverlay",
      "a[data-action='OVL_REPEAT']",
      "#btnSpeakText", "#btnSpeakStop"
    ].join(", ");

    _dwellHandle = attach(selector, {
      dwellMs:    DWELL_MS,
      leaveGrace: LEAVE_GRACE,
      onActivate: function(el){
        if(el.getAttribute("aria-disabled") === "true") return;
        if(el.getAttribute("data-disabled")  === "1")   return;
        try{ el.click(); }catch(e){}
      }
    });
  }
  const AUDIO={
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

  const LOB_TEXTE=[
    "Bravo!","Super!","Toll gemacht!","Wunderbar!",
    "Du überraschst mich!","Fantastisch!","Sehr gut!",
    "Klasse!","Weiter so!","Du bist großartig!"
  ];
  const ABSCHLUSS_TEXTE=[
    "Heute warst du toll!","Großartige Leistung!",
    "Du hast das super gemacht!","Ich bin sehr stolz auf dich!",
    "Wunderschön gemacht!"
  ];

  async function loadTasks(){
    // Registry (Datei-Protokoll-sicher, kein fetch nötig)
    if(DR){
      const v = DR.get("deutsch");
      if(Array.isArray(v) && v.length) return v;
    }
    // Wenn Registry leer: deutsch_data.js wurde nicht geladen
    throw new Error("deutsch_data.js nicht geladen – bitte Pfad prüfen");
  }

  function $(id){ return document.getElementById(id); }
  function setTopStatus(msg){
    const el=$("topStatus");
    if(el) el.innerHTML="<strong>Status:</strong> "+msg;
  }
  function norm(s){ return (s??"").toString().trim(); }
  function upper(s){ return norm(s).toUpperCase(); }
  function displayTextFlow(s){ return norm(s).replaceAll("\\n"," ").replace(/\s+/g," ").trim(); }
  function displayText(s){ return norm(s).replaceAll("\\n","\n"); }

  function hideAllScreens(){
    ["screenDeutsch","screenTask"].forEach(id => $(id)?.classList.add("hidden"));
  }
  function showDeutsch(){
    hideAllScreens();
    $("lernScreenTitel").textContent = "📖 Deutsch";
    $("lernScreenSub").textContent   = "Wähle eine Lektion";
    $("gridDeutsch").style.display   = "";
    $("gridLesen").style.display     = "none";
    $("screenDeutsch").classList.remove("hidden");
    VORLESE_MODUS = false;
    updateLevelButtons();
    updateSavedLine();
    rebindDwell();
  }
  function showLesen(){
    hideAllScreens();
    $("lernScreenTitel").textContent = "🔊 Leseverständnis";
    $("lernScreenSub").textContent   = "Wähle eine Lektion – Text wird vorgelesen";
    $("gridDeutsch").style.display   = "none";
    $("gridLesen").style.display     = "";
    $("screenDeutsch").classList.remove("hidden");
    VORLESE_MODUS = true;
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
      // Dwell neu binden – Antwort-Buttons sind jetzt aktiv
      rebindDwell();
      // Stats: Zeitmessung startet wenn Antworten aktiv werden
      try{ if(window.LaetitiaStats) window.LaetitiaStats.taskStart(); }catch{}
    },DELAY_MS);
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
  let VORLESE_MODUS=false;

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
    return upper(t.stufe)+"|"+norm(t.seite)+"|"+norm(t.text)+"|"+norm(t.frage);
  }

  function countByLevel(level){
    return tasks.filter(t=>upper(t.stufe)===upper(level)).length;
  }
  function updateLevelButtons(){
    ["A1","A2","A3","A4","A5","A6","A7","A8"].forEach(lv=>{
      const el=$("desc"+lv);
      if(!el) return;
      el.textContent = el.textContent.replace(/\s*\(\d+\)\s*$/,"") + " ("+countByLevel(lv)+")";
    });
  }

  function setProgressUI(done,total){
    const pct=total>0?Math.round((done/total)*100):0;
    $("barFill").style.width=pct+"%";
    $("progressLabel").textContent="Fortschritt: "+(total>0?(done+" / "+total):"–");
  }
  function setCorrectUI(correct,total){
    const pct=total>0?Math.round((correct/total)*100):0;
    $("correctFill").style.width=pct+"%";
    $("correctLabel").textContent="Richtig gesamt: "+(total>0?(correct+" / "+total):"–");
  }

  // Gemischte Antwort-Reihenfolge pro Aufgabe (wird in renderTask gesetzt,
  // von answer() und tryFlashCorrect() genutzt)
  let currentShuffleMap = {A:"A", B:"B", C:"C", D:"D"}; // slot → original

  function renderTask(){
    const t = current[index];
    if(!t){ showDeutsch(); return; }

    $("text").textContent = displayText(t.text);
    $("frage").textContent = displayTextFlow(t.frage);

    // ── Antworten mischen ──────────────────────────────────────────────────
    // Verhindert dass immer nur Button 1/2 die richtige Antwort zeigt.
    // slotOrder: welche Original-Antwort (A/B/C/D) in welchem Slot (1/2/3/4) landet.
    const origKeys = ["A","B","C","D"];
    const shuffled  = shuffleArr([...origKeys]);
    // Map: slot-Buchstabe → original-Buchstabe
    currentShuffleMap = {
      A: shuffled[0],
      B: shuffled[1],
      C: shuffled[2],
      D: shuffled[3]
    };
    const ansMap = {A: t.antwort_a, B: t.antwort_b, C: t.antwort_c, D: t.antwort_d};
    $("read1txt").textContent = displayTextFlow(ansMap[shuffled[0]]);
    $("read2txt").textContent = displayTextFlow(ansMap[shuffled[1]]);
    $("read3txt").textContent = displayTextFlow(ansMap[shuffled[2]]);
    $("read4txt").textContent = displayTextFlow(ansMap[shuffled[3]]);

    $("ttsOverlay").style.display = VORLESE_MODUS ? "" : "none";

    answered=false;
    setNextEnabled(false);
    scheduleEnableAnswers();

    setProgressUI(index, current.length);
    setCorrectUI(sessionCorrect, sessionTotal);

    if(VORLESE_MODUS){
      queue.play([{type:"tts", text: (displayTextFlow(t.text)+" … "+displayTextFlow(t.frage)).trim(), rate:0.98}]);
    } else {
      queue.clear();
    }
  }

  function start(level){
    const L = upper(level);
    let allForLevel = tasks.filter(t => upper(t.stufe)===L);

    if(currentMode==="wrong"){
      const wrongIds=new Set(loadWrongSet());
      allForLevel = allForLevel.filter(t => wrongIds.has(taskId(t)));
    }

    if(!allForLevel.length){
      setTopStatus("Keine Aufgaben gefunden für "+L+(currentMode==='wrong'?' (nur falsch)':'')+".");
      showDeutsch();
      return;
    }

    current = pickRandom(allForLevel, Math.min(SESSION_SIZE, allForLevel.length));
    index=0;
    sessionCorrect=0;
    sessionTotal=0;

    // Stats: neue Session
    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionStart("deutsch", L); }catch{}

    setTopStatus("Level "+L+" gestartet ("+current.length+" Aufgaben). Delay: "+Math.round(DELAY_MS/1000)+"s");
    showTask();
    renderTask();
  }

  function startWrongOnly(){
    currentMode="wrong";
    setTopStatus("Modus: Nur falsche Antworten. Wähle ein Level.");
    showDeutsch();
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
    b.textContent = txt;
    b.classList.add("show");
    setTimeout(()=>b.classList.remove("show"), 900);
  }

  function correctAnswerText(t){
    const map = {A: t.antwort_a, B: t.antwort_b, C: t.antwort_c, D: t.antwort_d};
    return displayTextFlow(map[upper(t.richtig)] || "");
  }

  function tryFlashCorrect(t){
    // Finde den Slot, in dem die richtige original-Antwort gelandet ist
    const orig = upper(t.richtig);
    const slotLetter = Object.keys(currentShuffleMap).find(
      slot => currentShuffleMap[slot] === orig
    );
    const map = {A:"pick1", B:"pick2", C:"pick3", D:"pick4"};
    const el = slotLetter ? $(map[slotLetter]) : null;
    if(!el) return;
    el.classList.add("correct-flash");
    setTimeout(()=>el.classList.remove("correct-flash"), 450);
  }

  // ── Antwort-Flash: richtige Antwort visuell in der Mitte zeigen ─────────────
  var _antwortFlashTimer = null;

  function zeigAntwortFlash(t, istRichtig){
    var overlay = document.getElementById("antwortFlash");
    var textEl  = document.getElementById("antwortFlashText");
    var erklEl  = document.getElementById("antwortFlashErkl");
    var labelEl = document.getElementById("antwortFlashLabel");
    if(!overlay || !textEl || !erklEl || !labelEl) return;

    // Inhalte setzen
    var antwortText = correctAnswerText(t);
    var erkl        = (t.erklaerung || "").trim();

    labelEl.textContent = istRichtig ? "✓ Richtig!" : "Die richtige Antwort:";
    labelEl.style.color = istRichtig ? "#1a5c00" : "#7a2200";
    textEl.textContent  = antwortText;
    erklEl.textContent  = erkl;
    erklEl.style.display = erkl ? "" : "none";

    // Hintergrundfarbe: grün bei richtig, gelb bei falsch
    var box = document.getElementById("antwortFlashBox");
    if(box){
      box.style.background    = istRichtig ? "#f0fff4" : "#fffbe6";
      box.style.borderColor   = istRichtig ? "#22c55e" : "#f5c800";
    }

    overlay.classList.add("show");

    // Vorherigen Timer löschen
    if(_antwortFlashTimer){ clearTimeout(_antwortFlashTimer); }

    // Nach 4 Sekunden automatisch schließen (genug Zeit für Erklärungstext)
    _antwortFlashTimer = setTimeout(function(){
      overlay.classList.remove("show");
      _antwortFlashTimer = null;
    }, 4000);
  }

  function schliesseAntwortFlash(){
    var overlay = document.getElementById("antwortFlash");
    if(overlay) overlay.classList.remove("show");
    if(_antwortFlashTimer){ clearTimeout(_antwortFlashTimer); _antwortFlashTimer = null; }
  }

  function answer(letter){
    if(answered) return;
    const t = current[index];
    if(!t) return;

    const originalLetter = currentShuffleMap[upper(letter)] || upper(letter);
    const correct = upper(t.richtig) === originalLetter;
    answered=true;
    sessionTotal++;

    // Stats: Antwort aufzeichnen
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
      queue.play([
        {type:"wav", file:AUDIO.lob[Math.floor(Math.random()*AUDIO.lob.length)], fallback:"Super!"},
        t.erklaerung ? {type:"tts", text:"Das ist richtig! " + displayTextFlow(t.erklaerung), rate:0.95} : null
      ].filter(Boolean));
      zeigAntwortFlash(t, true); // gleichzeitig mit Audio einblenden
    } else {
      markWrong(t);
      setTopStatus("Falsch.");
      var erkl = (t.erklaerung || "").trim();
      queue.play([
        {type:"wav", file:AUDIO.falsch,       fallback:"Das war falsch."},
        {type:"wav", file:AUDIO.richtigWaere,  fallback:"Richtig waere:"},
        {type:"tts", text: correctAnswerText(t) + (erkl ? ". " + erkl : ""), rate:0.98}
      ]);
      zeigAntwortFlash(t, false); // gleichzeitig mit Audio einblenden
    }

    setCorrectUI(sessionCorrect, sessionTotal);
    setNextEnabled(true);
    tryFlashCorrect(t);
  }

  function next(){
    if(!answered) return;
    schliesseAntwortFlash(); // Flash sofort schließen wenn Weiter gedrückt
    queue.clear();
    index++;
    if(index>=current.length){ finishSession(); return; }
    renderTask();
  }

  function finishSession(){
    const pct = sessionTotal>0 ? Math.round((sessionCorrect/sessionTotal)*100) : 0;
    $("overlayScore").textContent = "Richtig: "+sessionCorrect+" / "+sessionTotal+" ("+pct+"%)";

    const unlockEl=$("overlayUnlock");
    unlockEl.classList.remove("show");

    const ok = pct >= SCHWELLE;
    if(ok){
      $("overlayTitle").textContent="Toll gemacht!";
      $("overlayEmoji").textContent="🎉";

      queue.play([
        {type:"wav", file:AUDIO.geschafft, fallback:"Geschafft!"},
        {type:"wav", file:AUDIO.abschluss[Math.floor(Math.random()*AUDIO.abschluss.length)], fallback: ABSCHLUSS_TEXTE[0]}
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
      queue.play([{type:"wav", file:AUDIO.abschluss[Math.floor(Math.random()*AUDIO.abschluss.length)], fallback: ABSCHLUSS_TEXTE[0]}]);
    }

    $("overlayAbschluss").classList.add("show");
    // Stats: Session beenden
    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionEnd(false); }catch{}
    // Overlay-Buttons brauchen Dwell
    rebindDwell();
  }

  function home(){
    // Stats: Session als abgebrochen speichern
    try{ if(window.LaetitiaStats) window.LaetitiaStats.sessionEnd(true); }catch{}
    queue.clear();
    showDeutsch();
  }

  // ── Wörter für Hilfe-Seite extrahieren ─────────────────────────────────
  const STOP_HILFE = new Set([
    "der","die","das","und","oder","aber","den","dem","des","ein","eine","einer",
    "ist","sind","war","waren","hat","haben","wird","werden","kann","nicht","kein",
    "mit","ohne","auf","in","im","am","an","aus","bei","zu","zum","zur","von",
    "für","als","auch","noch","nur","sie","er","es","ich","du","wir","ihr","man",
    "dass","weil","wenn","dann","wo","was","wer","wie","welche","welcher","welches",
    "sich","nach","über","unter","vor","durch","gegen","ihn","ihm","ihnen","uns"
  ]);

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

    // btnModeDeutsch / btnModeLesen wurden aus dem HTML entfernt (2026-03-14)

    $("btnSpeakText")?.addEventListener("click",(ev)=>{
      ev.preventDefault();
      const tx=$("text")?.textContent||"";
      const q=$("frage")?.textContent||"";
      speak((tx+" … "+q).trim(), 0.98);
    });
    $("btnSpeakStop")?.addEventListener("click",(ev)=>{ ev.preventDefault(); stopSpeak(); });

    // ── Hilfe-Button → Hilfe-Seite ───────────────────────────────────────
    $("btnHelp")?.addEventListener("click",(ev)=>{
      ev.preventDefault();
      const t = current[index];
      if(!t) return;
      try{
        if(window.LaetitiaStats) window.LaetitiaStats.markHilfe(taskId(t));
      }catch{}
      const params = new URLSearchParams({
        text:  norm(t.text)  || "",
        frage: norm(t.frage) || ""
      });
      window.location.href = "./deutsch_hilfe.html?" + params.toString();
    });

    document.querySelectorAll("[data-action='OVL_REPEAT']").forEach(a=>{
      a.addEventListener("click",(ev)=>{
        ev.preventDefault();
        $("overlayAbschluss").classList.remove("show");
        const L=current.length>0 ? upper(current[0].stufe) : "";
        if(L) start(L); else home();
      });
    });
  }

  (async function init(){
    // Dwell vorladen (parallel, nicht abwarten)
    loadDwell();

    bindUI();

    try{
      tasks = await loadTasks();
      updateSavedLine();
      updateLevelButtons();
      setTopStatus("Tasks geladen: "+tasks.length+" | Delay: "+Math.round(DELAY_MS/1000)+"s | Dwell: "+DWELL_MS+"ms");
      showDeutsch(); // ruft rebindDwell() auf
      try{ speechSynthesis.getVoices(); }catch{}
    }catch(e){
      setTopStatus("Fehler: "+(e && e.message ? e.message : e));
      showDeutsch();
    }
  })();

})();