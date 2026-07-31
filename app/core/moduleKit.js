(function(){
  "use strict";

  // ─────────────────────────────────────────────────────────────────────────────
  // HILFSFUNKTIONEN
  // ─────────────────────────────────────────────────────────────────────────────
  function norm(s){ return (s??"").toString().trim(); }
  function upper(s){ return norm(s).toUpperCase(); }
  function displayTextFlow(s){ return norm(s).replaceAll("\\n"," ").replace(/\s+/g," ").trim(); }
  function displayText(s){ return norm(s).replaceAll("\\n","\n"); }
  function $(id){ return document.getElementById(id); }

  // ─────────────────────────────────────────────────────────────────────────────
  // WORT-ANALYSE FÜR HILFE-OVERLAY
  // ─────────────────────────────────────────────────────────────────────────────
  function tokenizeWords(text){
    const s = (text||"").toString().toLowerCase()
      .replace(/[""„"‚'''´`]/g,"")
      .replace(/[^\p{L}\p{N}\s-]/gu," ")
      .replace(/-/g," ");
    return s.split(/\s+/).map(w=>w.trim()).filter(Boolean);
  }

  const STOPWORDS = new Set([
    "der","die","das","und","oder","aber","den","dem","des","ein","eine","einer","eines","einem","einen",
    "ist","sind","war","waren","sein","hat","haben","wird","werden","kann","können","nicht","kein","keine",
    "mit","ohne","auf","in","im","am","an","aus","bei","zu","zum","zur","von","für","als","auch","noch","nur",
    "sie","er","es","ich","du","wir","ihr","ihnen","mich","dich","uns","euch","man","dass","weil","wenn","dann",
    "wo","was","wer","wie","warum","welche","welcher","welches"
  ]);

  function pickHighlightWords(t, limit=8){
    const txt = [t?.text, t?.frage].filter(Boolean).join(" ");
    const words = tokenizeWords(txt).filter(w => w.length>=5 && !STOPWORDS.has(w));
    const freq = new Map();
    for(const w of words) freq.set(w, (freq.get(w)||0)+1);
    const ranked = Array.from(freq.entries())
      .sort((a,b)=> b[1]-a[1] || a[0].localeCompare(b[0], "de"))
      .map(x=>x[0]);
    return ranked.slice(0, limit);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // HILFE-OVERLAYS (werden einmalig ins DOM eingefügt)
  // ─────────────────────────────────────────────────────────────────────────────
  function ensureHelpOverlays(){
    if(document.getElementById("overlayHelp")) return;

    const ov = document.createElement("div");
    ov.id = "overlayHelp";
    ov.className = "overlay";
    ov.innerHTML = `
      <div class="overlayCard">
        <div class="overlayTitle"><span>🧩</span><div>Hilfe</div></div>
        <div class="overlaySub">Welches Wort hast du nicht verstanden?</div>
        <div id="helpList" style="margin-top:12px; display:grid; gap:10px;"></div>
        <div class="overlayBtns">
          <a class="uibtn navBtn secondary" href="#" id="btnHelpClose">Zurück</a>
        </div>
      </div>
    `;
    document.body.appendChild(ov);

    const ex = document.createElement("div");
    ex.id = "overlayExplain";
    ex.className = "overlay";
    ex.innerHTML = `
      <div class="overlayCard">
        <div class="overlayTitle"><span>📖</span><div id="exWord">Erklärung</div></div>
        <div class="overlaySub" id="exText">–</div>
        <div class="overlayBtns">
          <a class="uibtn navBtn secondary" href="#" id="btnExplainBack">Zurück</a>
        </div>
      </div>
    `;
    document.body.appendChild(ex);

    document.getElementById("btnHelpClose")?.addEventListener("click", (ev)=>{
      ev.preventDefault(); ov.classList.remove("show");
    });
    document.getElementById("btnExplainBack")?.addEventListener("click", (ev)=>{
      ev.preventDefault(); ex.classList.remove("show"); ov.classList.add("show");
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DATEN LADEN (Registry → direkt → dataUrl)
  // ─────────────────────────────────────────────────────────────────────────────
  async function loadTasksFlexible(opts){
    if(Array.isArray(opts.tasks)) return opts.tasks;

    if(opts.dataKey){
      const api = window.LaetitiaDataRegistryApi;
      const v = api ? api.get(opts.dataKey) : null;
      if(Array.isArray(v)) return v;
      throw new Error("Daten nicht gefunden in Registry: " + opts.dataKey);
    }

    if(opts.dataUrl){
      const DL = window.LaetitiaDataLoader;
      if(!DL || !DL.loadTasks) throw new Error("LaetitiaDataLoader fehlt.");
      return await DL.loadTasks(opts.dataUrl);
    }

    throw new Error("Keine Datenquelle angegeben (tasks | dataKey | dataUrl).");
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // HAUPTFUNKTION: createFourChoiceModule
  // ─────────────────────────────────────────────────────────────────────────────
  function createFourChoiceModule(opts){
    const moduleId   = opts.moduleId;
    const moduleName = opts.moduleName || "Modul";
    const levelOrder = opts.levelOrder || null;
    const levelLabel = opts.levelLabel || (lv => lv);
    const allowUnlock  = !!opts.allowUnlock;
    const unlockText   = opts.unlockText || "🎮 Freigeschaltet!";
    const icon         = opts.icon || "📘";
    const readAloud    = !!opts.readAloud;
    const onHelpCb        = typeof opts.onHelp        === "function" ? opts.onHelp        : null;
    const onWrongAnswerCb   = typeof opts.onWrongAnswer    === "function" ? opts.onWrongAnswer    : null;
    const onCorrectAnswerCb = typeof opts.onCorrectAnswer  === "function" ? opts.onCorrectAnswer  : null;
    const onSpeakTaskCb   = typeof opts.onSpeakTask    === "function" ? opts.onSpeakTask    : null;
    const onNewTaskCb     = typeof opts.onNewTask       === "function" ? opts.onNewTask       : null;
    const finishTextGut    = opts.finishTextGut    || "Du bist fantastisch!";
    const finishTextWeiter = opts.finishTextWeiter || "Du bist sehr fleissig. Gib nicht auf!";

    if(!moduleId) throw new Error("moduleId fehlt");

    // Return URL
    const Ret = window.LaetitiaReturn;
    const returnUrl = Ret ? Ret.resolve("../../index.html") : "../../index.html";
    if(Ret) Ret.applyToIds(returnUrl, ["btnReturnFromMenu","btnReturnFromOverlay"]);

    // Config
    const Cfg = window.LaetitiaConfig;
    const cfgNow = Cfg ? Cfg.load() : {};
    const SESSION_SIZE = Cfg ? Cfg.getInt(cfgNow,"fragen",15) : 15;
    const SCHWELLE     = Cfg ? Cfg.getInt(cfgNow,"schwelle",50) : 50;
    const DELAY_MS     = Cfg ? (Cfg.getInt(cfgNow,"delay",3)*1000) : 4000;

    // Dwell-Zeit aus localStorage (konsistent mit index.html)
    const DWELL_MS = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 900;

    // Storage
    const Store = window.LaetitiaStorage;
    const WRONG_KEY  = "laetitia_wrong_"+moduleId+"_v1";
    const UNLOCK_KEY = "laetitia_unlocked_"+moduleId+"_v1";

    function loadWrong(){ return Store ? (Store.getJson(WRONG_KEY, [])||[]) : []; }
    function saveWrong(arr){ if(Store) Store.setJson(WRONG_KEY, arr); }
    function isUnlocked(){ return Store ? (Store.getString(UNLOCK_KEY,"") === "1") : false; }
    function setUnlocked(){ if(Store) Store.setString(UNLOCK_KEY,"1"); }

    // Audio
    const AQ = window.LaetitiaAudioQueue;
    const queue = AQ ? AQ.createQueue() : { clear(){}, play(){} };
    const AUDIO = opts.audio || {};
    function wavOrTTS(file, fallback){
      if(file){ return {type:"wav", file, fallback}; }
      return {type:"tts", text: fallback || ""};
    }

    // ── Web Audio Töne (kein WAV nötig, funktioniert immer) ─────────────────────
    var _audioCtx = null;
    function getAudioCtx(){
      if(!_audioCtx){
        try{ _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }catch{}
      }
      return _audioCtx;
    }

    function playToneSeq(notes, onDone){
      // notes: Array von { freq, dur, type } — type: "sine"|"triangle"|"square"
      var ctx = getAudioCtx();
      if(!ctx){ if(onDone) onDone(); return; }
      var t = ctx.currentTime + 0.02;
      notes.forEach(function(n){
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = n.type || "sine";
        osc.frequency.setValueAtTime(n.freq, t);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.dur);
        osc.start(t);
        osc.stop(t + n.dur);
        t += n.dur * 0.85;
      });
      var totalDur = notes.reduce(function(s, n){ return s + n.dur * 0.85; }, 0.02);
      setTimeout(function(){ if(onDone) onDone(); }, (totalDur + 0.15) * 1000);
    }

    function playToneRichtig(onDone){
      // Froehliche Fanfare: C-E-G-C (Dur-Dreiklang aufwaerts)
      playToneSeq([
        { freq:523, dur:0.12, type:"sine" },
        { freq:659, dur:0.12, type:"sine" },
        { freq:784, dur:0.12, type:"sine" },
        { freq:1047, dur:0.28, type:"sine" }
      ], onDone);
    }

    function playToneFalsch(onDone){
      // Dumpfer Ton: tiefer absteigender Ton
      playToneSeq([
        { freq:330, dur:0.18, type:"triangle" },
        { freq:247, dur:0.28, type:"triangle" }
      ], onDone);
    }

    // Lob-Texte (wie Deutsch-Modul)
    var LOB_TEXTE = [
      "Wunderbar!", "Fantastisch!", "Super!", "Toll gemacht!",
      "Du überraschst mich!", "Klasse!", "Sehr gut!", "Bravo!",
      "Weiter so!", "Du bist großartig!"
    ];

    // State
    let tasks=[];
    let levels=[];
    let currentLevel=null;
    let currentMode="normal";
    let current=[];
    let index=0;
    let answered=false;
    let sessionCorrect=0;
    let sessionTotal=0;
    // Gemischte Antwort-Reihenfolge pro Aufgabe (slot A/B/C/D → original A/B/C/D)
    let currentShuffleMap = {A:"A", B:"B", C:"C", D:"D"};

    // ── Dwell ───────────────────────────────────────────────────────────────────
    // REGEL 1: dwell.js IMMER als <script src>, NIE per import() (file:// blockiert)
    // window.LaetitiaAttachDwell wird von dwell.js gesetzt bevor dieses Script laeuft.
    let _attachDwell = null;
    let _dwellHandle = null;

    function loadDwell(){
      if(_attachDwell) return _attachDwell;
      if(typeof window.LaetitiaAttachDwell === "function"){
        _attachDwell = window.LaetitiaAttachDwell;
      } else {
        _attachDwell = function(){ return { cancelDwell: function(){} }; };
      }
      return _attachDwell;
    }

    // rebindDwell: Goldstandard — LaetitiaAttachDwell aus dwell.js v10 (Regel 7)
    function rebindDwell(){
      if(_dwellHandle && typeof _dwellHandle.cancelDwell === "function"){
        _dwellHandle.cancelDwell();
        _dwellHandle = null;
      }
      var attach = loadDwell();
      var leaveGrace = parseInt(localStorage.getItem("laetitia_leave_grace_ms")) || 150;
      var selector = [
        "a.uibtn", "button.uibtn", "[data-answer]",
        "a[data-action='OVL_REPEAT']", "#btnHelpClose", "#btnExplainBack"
      ].join(", ");
      _dwellHandle = attach(selector, {
        dwellMs:    DWELL_MS,
        leaveGrace: leaveGrace,
        onActivate: function(el){
          if(el.getAttribute("aria-disabled") === "true") return;
          if(el.getAttribute("data-disabled") === "1") return;
          try{ el.click(); }catch(e){}
        }
      });
    }

    // ── UI-Hilfsfunktionen ───────────────────────────────────────────────────────
    function setTopStatus(msg){
      const el=$("topStatus");
      if(el) el.innerHTML="<strong>Status:</strong> "+msg;
    }

    function hideAll(){
      ["screenMenu","screenTask"].forEach(id => $(id)?.classList.add("hidden"));
    }

    function showMenu(){
      try{
        hideAll();
        var sm = $("screenMenu");
        if(sm) sm.classList.remove("hidden");
        var mt = $("moduleTitle"); if(mt) mt.textContent = icon + " " + moduleName;
        var ms = $("moduleSub");   if(ms) ms.textContent = "Wähle eine Lektion";
        updateSavedLine();
        rebindDwell();
      }catch(e){
        setTopStatus("showMenu Fehler: " + (e && e.message ? e.message : String(e)));
      }
    }

    function showTask(){
      hideAll();
      $("screenTask")?.classList.remove("hidden");
      rebindDwell();
    }

    // ── Aufgaben-Logik ───────────────────────────────────────────────────────────
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

    function updateSavedLine(){
      const el=$("savedLine");
      if(el) el.textContent = "Gespeicherte falsche Antworten: " + loadWrong().length;
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
        // Dwell nach Delay-Ende neu binden, da Antwort-Buttons jetzt aktiv sind
        rebindDwell();
      }, DELAY_MS);
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

    // ── Feedback-Zeile (infoLine) ────────────────────────────────────────────
    function setFeedback(msg, art){
      var el=$("infoLine");
      if(!el) return;
      el.className = "infoLine" + (art ? " "+art : "");
      el.textContent = msg || "";
      if(!msg){ el.style.display="none"; } else { el.style.display=""; }
    }

    function clearFeedback(){
      var el=$("infoLine");
      if(!el) return;
      el.className = "infoLine";
      el.textContent = "";
      el.style.display = "none";
    }

    // Prüft ob ein Text nur aus Emoji/Sonderzeichen besteht (kein sprechbarer Text)
    // Wichtig: Ziffern (0-9) und ASCII-Zeichen gelten NICHT als Emoji,
    // auch wenn Unicode \p{Emoji} sie einschließt.
    function istNurEmoji(text){
      var s = (text||"").trim();
      if(!s) return false;
      // ASCII-Zeichen (inkl. Ziffern, Buchstaben, +, -, =) → kein Emoji-Text
      if(/[0-9a-zA-Z\+\-\=\.\,]/.test(s)) return false;
      // Entferne echte Emojis (ab U+2600), Whitespace und Variation Selectors
      var ohneEmoji = s.replace(/[\u2600-\uFFFF\s]/g, "").replace(/[\uD800-\uDFFF]/g, "");
      return ohneEmoji.length === 0;
    }

    // Zeigt Symbol 1,5s groß auf, dann Callback
    function flashSymbol(symbol, callback){
      var el = $("symbolFlash");
      var emoji = $("symbolFlashEmoji");
      if(!el || !emoji){ if(callback) callback(); return; }
      emoji.textContent = symbol;
      el.classList.add("show");
      setTimeout(function(){
        el.classList.remove("show");
        setTimeout(function(){ if(callback) callback(); }, 200);
      }, 1500);
    }

    function renderTask(){
      const t=current[index];
      if(!t){ showMenu(); return; }

      // Modul-spezifischer Hook: z.B. laufende Animationen abbrechen
      if(onNewTaskCb) onNewTaskCb();

      clearFeedback();
      $("text").textContent  = displayText(t.text);
      $("frage").textContent = displayText(t.frage);

      // ── Antworten mischen ──────────────────────────────────────────────
      // Verhindert dass immer dieselbe Button-Position die richtige Antwort zeigt.
      const origKeys = ["A","B","C","D"];
      const shuffled  = shuffleArr([...origKeys]);
      currentShuffleMap = {
        A: shuffled[0], B: shuffled[1], C: shuffled[2], D: shuffled[3]
      };
      const ansMap = {
        A: t.antwort_a, B: t.antwort_b, C: t.antwort_c, D: t.antwort_d
      };
      $("read1txt").textContent = displayTextFlow(ansMap[shuffled[0]]);
      $("read2txt").textContent = displayTextFlow(ansMap[shuffled[1]]);
      $("read3txt").textContent = displayTextFlow(ansMap[shuffled[2]]);
      $("read4txt").textContent = displayTextFlow(ansMap[shuffled[3]]);

      // Hellgelber Hintergrund für Text und Frage
      try{
        const textEl  = $("text");
        const frageEl = $("frage");
        if(textEl?.parentElement)  textEl.parentElement.style.background  = "#fff7d6";
        if(frageEl?.parentElement) frageEl.parentElement.style.background = "#fff7d6";
      }catch{}

      // Antwort-Texte: Schriftgröße und Gewicht angleichen
      try{
        const fs = $("text") ? getComputedStyle($("text")).fontSize : null;
        ["read1txt","read2txt","read3txt","read4txt"].forEach(id=>{
          const el=$(id); if(!el) return;
          if(fs) el.style.fontSize = fs;
          el.style.fontWeight = "900";
        });
        ["pick1","pick2","pick3","pick4"].forEach(id=>{
          const a=$(id); if(!a) return;
          a.style.padding   = "14px 16px";
          a.style.minHeight = "56px";
          a.style.width     = "100%";
        });
      }catch{}

      answered=false;
      setNextEnabled(false);
      setProgressUI(index, current.length);
      setCorrectUI(sessionCorrect, sessionTotal);

      // ── TTS: Text + Frage vorlesen ────────────────────────────────────
      // onSpeakTask: modul-spezifischer Callback (z.B. Mathe M0 mit Symbol-Namen)
      // readAloud:   allgemeiner Fallback für andere Module
      // Regel 18: Antwort-Buttons erst NACH TTS-Ende freigeben (statt nach festem
      // Timer). Module ohne automatische Vorlese-TTS (kein onSpeakTask/readAloud,
      // z.B. Logik, Sinnesorgane-Quiz) behalten den bisherigen Timer bei.
      if(onSpeakTaskCb){
        setPickDisabled(true);
        setTimeout(()=>{
          onSpeakTaskCb(t, function(){ setPickDisabled(false); rebindDwell(); });
        }, 300);
      } else if(readAloud){
        const AQ = window.LaetitiaAudioQueue;
        if(AQ && typeof AQ.speak === "function"){
          setPickDisabled(true);
          setTimeout(()=>{
            const sprechText = [
              displayTextFlow(t.text),
              displayTextFlow(t.frage)
            ].filter(Boolean).join(" … ");
            AQ.speak(sprechText, 0.92, function(){ setPickDisabled(false); rebindDwell(); });
          }, 300);
        } else {
          scheduleEnableAnswers();
        }
      } else {
        scheduleEnableAnswers();
      }
    }

    function startLevel(level){
      currentLevel = level;
      const L = upper(level);

      let allForLevel = tasks.filter(t => upper(t.stufe)===L);

      if(currentMode==="wrong"){
        const wrongIds=new Set(loadWrong());
        allForLevel = allForLevel.filter(t => wrongIds.has(taskId(t)));
      }

      if(!allForLevel.length){
        setTopStatus("Keine Aufgaben für "+levelLabel(level)+(currentMode==="wrong"?" (nur falsch)":"")+".");
        showMenu();
        return;
      }

      current = pickRandom(allForLevel, Math.min(SESSION_SIZE, allForLevel.length));
      index=0;
      sessionCorrect=0;
      sessionTotal=0;

      setTopStatus(levelLabel(level)+" gestartet ("+current.length+" Aufgaben). Delay: "+Math.round(DELAY_MS/1000)+"s");
      showTask();
      renderTask();
    }

    function markWrong(t){
      const id=taskId(t);
      const arr=loadWrong();
      if(!arr.includes(id)){ arr.push(id); saveWrong(arr); }
      updateSavedLine();
    }
    function unmarkWrong(t){
      const id=taskId(t);
      const arr=loadWrong().filter(x=>x!==id);
      saveWrong(arr);
      updateSavedLine();
    }

    function correctAnswerText(t){
      const map = {A: t.antwort_a, B: t.antwort_b, C: t.antwort_c, D: t.antwort_d};
      return displayTextFlow(map[upper(t.richtig)] || "");
    }

    function tryFlashCorrect(t){
      // Finde den Slot in dem die richtige original-Antwort nach dem Shuffle liegt
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

    function answer(letter){
      if(answered) return;
      const t=current[index];
      if(!t) return;

      const originalLetter = currentShuffleMap[upper(letter)] || upper(letter);
      const correct = upper(t.richtig) === originalLetter;
      answered=true;
      sessionTotal++;

      if(correct){
        sessionCorrect++;
        unmarkWrong(t);
        setTopStatus("Richtig." + (t.erklaerung ? " " + displayTextFlow(t.erklaerung) : ""));
        setFeedback(t.erklaerung ? "✓ Richtig! " + displayTextFlow(t.erklaerung) : "✓ Richtig!", "richtig");

        const lobFiles = AUDIO.lob || [];
        var correctItems = [];
        if(t.erklaerung){
          // Lob-WAV + Erklärung als TTS
          var lobItem = wavOrTTS(
            lobFiles.length ? lobFiles[Math.floor(Math.random()*lobFiles.length)] : null,
            null
          );
          if(lobItem.type === "wav"){
            correctItems.push(lobItem);
            correctItems.push({type:"tts", text:"Das ist richtig! " + displayTextFlow(t.erklaerung), rate:0.95});
          } else {
            correctItems.push({type:"tts", text:"Das ist richtig! " + displayTextFlow(t.erklaerung), rate:0.95});
          }
        } else {
          correctItems.push(wavOrTTS(
            lobFiles.length ? lobFiles[Math.floor(Math.random()*lobFiles.length)] : null,
            LOB_TEXTE[Math.floor(Math.random()*LOB_TEXTE.length)]
          ));
        }
        queue.play(correctItems, onCorrectAnswerCb ? function(){ onCorrectAnswerCb(t); } : null);

      } else {
        markWrong(t);
        var richtigText = correctAnswerText(t);
        var erkl = t.erklaerung ? displayTextFlow(t.erklaerung) : "";
        setTopStatus("Falsch. Richtig wäre: " + richtigText + (erkl ? " – " + erkl : ""));
        setFeedback("✗ Falsch. Richtig wäre: " + richtigText + (erkl ? " — " + erkl : ""), "falsch");

        if(istNurEmoji(richtigText)){
          // Emoji-Antwort: kurze Rückmeldung, dann Flash-Overlay
          var vorFlash = [
            {type:"tts", text:"Das ist leider falsch.", rate:0.95}
          ];
          var nachFlash = erkl ? [{type:"tts", text:erkl, rate:0.95}] : [];
          queue.play(vorFlash);
          setTimeout(function(){
            flashSymbol(richtigText, function(){
              if(nachFlash.length) queue.play(nachFlash);
              if(onWrongAnswerCb) onWrongAnswerCb(t);
            });
          }, 1400);
        } else {
          // Text-Antwort: alles in einer TTS-Äußerung
          var wrongItems = [
            {type:"tts", text:"Das ist leider falsch. Richtig wäre: " + richtigText + (erkl ? ". " + erkl : ""), rate:0.95}
          ];
          queue.play(wrongItems, onWrongAnswerCb ? function(){ onWrongAnswerCb(t); } : null);
        }
      }

      setCorrectUI(sessionCorrect, sessionTotal);
      setNextEnabled(true);
      tryFlashCorrect(t);
      rebindDwell();
    }

    function next(){
      if(!answered) return;
      // Laufende Audio-Ausgabe sofort stoppen (Erläuterungstext abbrechen)
      queue.clear();
      index++;
      if(index>=current.length){ finishSession(); return; }
      renderTask();
    }

    function finishSession(){
      const pct = sessionTotal>0 ? Math.round((sessionCorrect/sessionTotal)*100) : 0;
      $("overlayScore").textContent = "Richtig: "+sessionCorrect+" / "+sessionTotal+" ("+pct+"%)";

      const unlockEl=$("overlayUnlock");
      if(unlockEl){
        unlockEl.classList.remove("show");
        unlockEl.textContent = unlockText;
      }

      const abFiles = AUDIO.abschluss || [];
      const abFile  = abFiles.length ? abFiles[Math.floor(Math.random()*abFiles.length)] : null;

      if(pct >= SCHWELLE){
        if($("overlayTitle")) $("overlayTitle").textContent = finishTextGut;
        if($("overlayEmoji")) $("overlayEmoji").textContent = "🎉";
        queue.play([
          wavOrTTS(AUDIO.geschafft, finishTextGut),
          wavOrTTS(abFile, "")
        ]);
        if(allowUnlock && !isUnlocked()){
          setUnlocked();
          unlockEl?.classList.add("show");
          queue.play([wavOrTTS(AUDIO.freischalten, "Freigeschaltet!")]);
        }
      } else {
        if($("overlayTitle")) $("overlayTitle").textContent = finishTextWeiter;
        if($("overlayEmoji")) $("overlayEmoji").textContent = "💪";
        queue.play([wavOrTTS(abFile, finishTextWeiter)]);
      }

      $("overlayAbschluss")?.classList.add("show");
      rebindDwell();
    }

    function home(){
      queue.clear();
      showMenu();
    }

    // ── Level-Buttons bauen ──────────────────────────────────────────────────────
    function countByLevel(level){
      return tasks.filter(t=>upper(t.stufe)===upper(level)).length;
    }

    function buildLevelButtons(){
      const grid = $("gridLevels");
      if(!grid) return;
      grid.innerHTML = "";
      levels.forEach(lv=>{
        const a = document.createElement("a");
        a.href="#";
        a.className="uibtn levelBtn";
        a.setAttribute("data-level", lv);
        a.innerHTML = '<div><div class="lvl">'+levelLabel(lv)+'</div><div class="desc">('+countByLevel(lv)+')</div></div>';
        a.addEventListener("click",(ev)=>{ ev.preventDefault(); currentMode="normal"; startLevel(lv); });
        grid.appendChild(a);
      });
      // Hinweis: rebindDwell() wird von showMenu() nach buildLevelButtons() aufgerufen
    }

    // ── Event-Binding (einmalig beim Init) ───────────────────────────────────────
    function bindUI(){
      // Antwort-Buttons
      document.querySelectorAll("[data-answer]").forEach(a=>{
        a.addEventListener("click",(ev)=>{ ev.preventDefault(); answer(a.getAttribute("data-answer")); });
      });

      // Navigation
      $("btnNext")?.addEventListener("click",(ev)=>{ ev.preventDefault(); next(); });
      $("btnHome")?.addEventListener("click",(ev)=>{ ev.preventDefault(); home(); });
      $("btnWrong")?.addEventListener("click",(ev)=>{
        ev.preventDefault();
        currentMode="wrong";
        setTopStatus("Modus: Nur falsche Antworten. Wähle ein Level.");
        showMenu();
      });

      // Overlay: Wiederholen
      document.querySelectorAll("[data-action='OVL_REPEAT']").forEach(a=>{
        a.addEventListener("click",(ev)=>{
          ev.preventDefault();
          $("overlayAbschluss")?.classList.remove("show");
          if(currentLevel) startLevel(currentLevel); else showMenu();
        });
      });

      // Hilfe-Button: falls nicht im HTML → dynamisch einfügen
      let btnHelp = $("btnHelp");
      if(!btnHelp){
        const btnNext = $("btnNext");
        const btnHome = $("btnHome");
        const parent  = btnNext?.parentElement;
        if(parent && btnNext && btnHome){
          btnHelp = document.createElement("a");
          btnHelp.id = "btnHelp";
          btnHelp.href = "#";
          btnHelp.className = "uibtn navBtn";
          btnHelp.textContent = "Hilfe";
          btnHelp.style.cssText = "background:#ffb86b; box-shadow:0 8px 20px rgba(255,184,107,.25); flex:1;";
          parent.insertBefore(btnHelp, btnHome);
          // Layout-Fix: alle Nav-Buttons gleich breit
          parent.style.display = "flex";
          parent.style.gap = "12px";
          if(btnNext) btnNext.style.flex = "1";
          if(btnHome) btnHome.style.flex = "1";
        }
      }

      // Hilfe-Button Klick:
      // Wenn onHelp-Callback vorhanden (z.B. Lesen → eigene Hilfe-Seite),
      // diesen aufrufen. Sonst Standard-Wort-Overlay zeigen.
      if(btnHelp){
        btnHelp.addEventListener("click",(ev)=>{
          ev.preventDefault();
          const t = current[index];
          if(onHelpCb){
            // Modul-spezifischer Hilfe-Handler (z.B. Lesen → lesen_hilfe.html)
            onHelpCb(t);
            return;
          }
          // Standard: Wort-Overlay
          ensureHelpOverlays();
          const list = document.getElementById("helpList");
          const ov   = document.getElementById("overlayHelp");
          const ex   = document.getElementById("overlayExplain");
          if(!list || !ov || !ex) return;

          list.innerHTML = "";
          const words = t ? pickHighlightWords(t, 8) : [];

          if(words.length===0){
            const div = document.createElement("div");
            div.className = "overlaySub";
            div.textContent = "Ich finde gerade keine auffälligen Wörter.";
            list.appendChild(div);
          } else {
            words.forEach(w=>{
              const row = document.createElement("div");
              row.style.cssText = "display:grid; grid-template-columns:1fr 180px; gap:10px; align-items:center;";

              const left = document.createElement("div");
              left.textContent = w;
              left.style.cssText = "font-weight:1000; font-size:16px;";

              const btn = document.createElement("a");
              btn.href = "#";
              btn.className = "uibtn navBtn";
              btn.textContent = "Erklären";
              btn.style.cssText = "background:#ffb86b; box-shadow:0 8px 20px rgba(255,184,107,.25);";
              btn.addEventListener("click",(ev2)=>{
                ev2.preventDefault();
                const dict    = opts.glossary || {};
                const key     = w.toLowerCase();
                const explain = (dict[key] || dict[w] || dict[w.toUpperCase()]) || "Noch keine Erklärung hinterlegt.";
                document.getElementById("exWord").textContent = w;
                document.getElementById("exText").textContent = explain;
                ov.classList.remove("show");
                ex.classList.add("show");
                rebindDwell(); // Overlay-Buttons brauchen Dwell
              });

              row.appendChild(left);
              row.appendChild(btn);
              list.appendChild(row);
            });
          }

          ov.classList.add("show");
          rebindDwell(); // Wort-Liste hat neue Buttons
        });
      }
    }

    // ── INIT (async) ─────────────────────────────────────────────────────────────
    async function init(){
      try{
        loadDwell();
      }catch{}

      bindUI();

      try{
        tasks = await loadTasksFlexible(opts);
      }catch(e){
        setTopStatus("Fehler beim Laden: "+(e?.message||e));
        showMenu();
        return;
      }

      try{
        // Level-Liste aus den geladenen Tasks ableiten
        const set = new Set(tasks.map(t => upper(t.stufe)).filter(Boolean));
        levels = levelOrder
          ? levelOrder.filter(x => set.has(upper(x)))
          : Array.from(set).sort();

        buildLevelButtons();
        updateSavedLine();
        setTopStatus("Tasks geladen: "+tasks.length+" | Delay: "+Math.round(DELAY_MS/1000)+"s | Dwell: "+DWELL_MS+"ms");
        showMenu();
      }catch(e){
        setTopStatus("init Fehler: " + (e && e.message ? e.message : String(e)));
      }
    }

    return { init };
  }

  // Öffentliche API
  window.LaetitiaModuleKit = { createFourChoiceModule };

})();
