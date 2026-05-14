// app/core/stats.js  v1
// Lernfortschritt-Erfassung: Sessions, Antworten, Schwaechen, Muster
// Oeffentliche API: window.LaetitiaStats
// Datenspeicherung: localStorage["laetitia_stats_v1"]

(function(){
  "use strict";

  var KEY         = "laetitia_stats_v1";
  var MAX_SESSIONS = 200;  // aelteste werden abgeschnitten

  // ── Persistenz ───────────────────────────────────────────────────────────────

  function load(){
    try{
      var raw = localStorage.getItem(KEY);
      if(!raw) return {sessions:[]};
      var d = JSON.parse(raw);
      if(!d || !Array.isArray(d.sessions)) return {sessions:[]};
      return d;
    }catch(e){ return {sessions:[]}; }
  }

  function save(data){
    try{
      if(data.sessions.length > MAX_SESSIONS){
        data.sessions = data.sessions.slice(-MAX_SESSIONS);
      }
      localStorage.setItem(KEY, JSON.stringify(data));
    }catch(e){
      try{
        if(window.LaetitiaFehler) window.LaetitiaFehler.zeige("Statistik konnte nicht gespeichert werden.", "storage");
      }catch(e2){}
    }
  }

  // ── Laufende Session ─────────────────────────────────────────────────────────

  var _cur    = null;  // aktuelle Session
  var _taskTs = 0;     // Zeitstempel aus taskStart()

  function sessionStart(modul, stufe){
    if(_cur) sessionEnd(false);  // vorherige Session sichern
    _cur = {
      id:            Date.now() + "_" + (modul||""),
      modul:         String(modul || "?"),
      stufe:         String(stufe != null ? stufe : ""),
      ts:            Date.now(),
      abgeschlossen: false,
      aufgaben:      []
    };
  }

  function taskStart(){
    _taskTs = Date.now();
  }

  // id       = Aufgaben-ID (z.B. "A2|1|Textanfang|Frage")
  // richtig  = true | false
  // gewaehlt = gewaehlte Option (z.B. "A", "B", "C", "D")
  // hilfe    = true wenn Hilfe vor der Antwort genutzt wurde
  // ms       = Antwortzeit in ms (null → wird aus taskStart() berechnet)
  function taskAnswer(id, richtig, gewaehlt, hilfe, ms){
    if(!_cur) return;
    var elapsed = (ms != null) ? ms : (_taskTs ? Date.now() - _taskTs : null);
    _cur.aufgaben.push({
      id:       String(id || ""),
      richtig:  richtig === true ? true : richtig === false ? false : null,
      gewaehlt: gewaehlt != null ? String(gewaehlt) : null,
      hilfe:    hilfe === true,
      ms:       elapsed
    });
    _taskTs = 0;
  }

  // Nachtraegliches Hilfe-Flag fuer eine laufende Aufgabe setzen
  function markHilfe(taskId){
    if(!_cur) return;
    for(var i = _cur.aufgaben.length - 1; i >= 0; i--){
      if(_cur.aufgaben[i].id === String(taskId)){
        _cur.aufgaben[i].hilfe = true;
        return;
      }
    }
    // Aufgabe noch nicht beantwortet — Platzhalter eintragen
    _cur.aufgaben.push({id:String(taskId), richtig:null, gewaehlt:null, hilfe:true, ms:null});
  }

  function sessionEnd(abgeschlossen){
    if(!_cur) return;
    _cur.abgeschlossen = abgeschlossen === true;
    var data = load();
    data.sessions.push(_cur);
    save(data);
    _cur    = null;
    _taskTs = 0;
  }

  // ── Lese-API ─────────────────────────────────────────────────────────────────

  function getStats(){ return load(); }

  function clearStats(){
    try{ localStorage.removeItem(KEY); }catch(e){}
    _cur    = null;
    _taskTs = 0;
  }

  // ── Analysen ─────────────────────────────────────────────────────────────────

  // Aufgaben mit >= 30% Fehlerrate (mind. 2 Versuche), absteigend sortiert
  // Rueckgabe: [{id, fehlerRate, gesamt, avgMs}]
  function schwacheAufgaben(modul){
    var data = load();
    var sessions = modul
      ? data.sessions.filter(function(s){ return s.modul === modul; })
      : data.sessions;

    var map = {};
    sessions.forEach(function(s){
      s.aufgaben.forEach(function(a){
        if(a.richtig === null) return;
        if(!map[a.id]) map[a.id] = {gesamt:0, falsch:0, msSum:0, msN:0};
        map[a.id].gesamt++;
        if(!a.richtig) map[a.id].falsch++;
        if(a.ms != null){ map[a.id].msSum += a.ms; map[a.id].msN++; }
      });
    });

    var result = [];
    Object.keys(map).forEach(function(id){
      var e = map[id];
      if(e.gesamt < 2) return;
      var rate = Math.round((e.falsch / e.gesamt) * 100);
      if(rate < 30) return;
      result.push({
        id:         id,
        fehlerRate: rate,
        gesamt:     e.gesamt,
        avgMs:      e.msN > 0 ? Math.round(e.msSum / e.msN) : null
      });
    });
    result.sort(function(a, b){ return b.fehlerRate - a.fehlerRate; });
    return result;
  }

  // Aufgaben bei denen Hilfe genutzt wurde, als Wort-Ranking
  // Rueckgabe: [{wort, anzahl}] absteigend
  function hilfeWortRanking(modul){
    var data = load();
    var sessions = modul
      ? data.sessions.filter(function(s){ return s.modul === modul; })
      : data.sessions;

    var map = {};
    sessions.forEach(function(s){
      s.aufgaben.forEach(function(a){
        if(!a.hilfe) return;
        // ID-Format "Stufe|Seite|Text|Frage" → Frage oder Text als "Wort"
        var parts = (a.id || "").split("|");
        var wort  = (parts[3] || parts[2] || a.id || "").slice(0, 60).trim();
        if(!wort) return;
        map[wort] = (map[wort] || 0) + 1;
      });
    });

    var result = Object.keys(map).map(function(w){ return {wort:w, anzahl:map[w]}; });
    result.sort(function(a, b){ return b.anzahl - a.anzahl; });
    return result;
  }

  // Level-Empfehlungen: Level das 3x fehlerfrei abgeschlossen wurde
  // Rueckgabe: [{modul, stufe, allesRichtig, sessions}]
  function levelEmpfehlungen(modul){
    var data = load();
    var sessions = modul
      ? data.sessions.filter(function(s){ return s.modul === modul; })
      : data.sessions;

    var map = {};
    sessions.forEach(function(s){
      var key = s.modul + "|" + s.stufe;
      if(!map[key]) map[key] = {modul:s.modul, stufe:s.stufe, sessions:0, allesRichtig:0};
      map[key].sessions++;
      var beantwortet = s.aufgaben.filter(function(a){ return a.richtig !== null; });
      if(beantwortet.length > 0 && beantwortet.every(function(a){ return a.richtig; })){
        map[key].allesRichtig++;
      }
    });

    var result = [];
    Object.keys(map).forEach(function(k){
      if(map[k].allesRichtig >= 3) result.push(map[k]);
    });
    result.sort(function(a, b){ return b.allesRichtig - a.allesRichtig; });
    return result;
  }

  // Muster-Warnung: wird eine Antwort-Option unverhältnismäßig oft gewählt?
  // minGesamt = Mindestanzahl Antworten fuer die Auswertung
  // Rueckgabe: {warnung, gesamt} oder null
  function musterWarnung(modul, minGesamt){
    var data = load();
    var sessions = modul
      ? data.sessions.filter(function(s){ return s.modul === modul; })
      : data.sessions;

    var counts = {}, gesamt = 0;
    sessions.forEach(function(s){
      s.aufgaben.forEach(function(a){
        if(a.richtig === null || !a.gewaehlt) return;
        var k = String(a.gewaehlt);
        counts[k] = (counts[k] || 0) + 1;
        gesamt++;
      });
    });

    if(gesamt < (minGesamt || 10)) return null;

    var keys = Object.keys(counts);
    for(var i = 0; i < keys.length; i++){
      var pct = Math.round((counts[keys[i]] / gesamt) * 100);
      if(pct > 70){
        return {
          warnung: 'Antwort "' + keys[i] + '" wurde in ' + pct + '% der Faelle gewaehlt.',
          gesamt:  gesamt
        };
      }
    }
    return null;
  }

  // ── Public API ────────────────────────────────────────────────────────────────

  window.LaetitiaStats = {
    sessionStart:      sessionStart,
    taskStart:         taskStart,
    taskAnswer:        taskAnswer,
    sessionEnd:        sessionEnd,
    markHilfe:         markHilfe,
    getStats:          getStats,
    clearStats:        clearStats,
    schwacheAufgaben:  schwacheAufgaben,
    hilfeWortRanking:  hilfeWortRanking,
    levelEmpfehlungen: levelEmpfehlungen,
    musterWarnung:     musterWarnung
  };

})();
