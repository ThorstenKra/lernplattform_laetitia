(function(){
  "use strict";
  // config.js — zentrale Config (aus localStorage)
  // Erwartet: localStorage["laetitia_config_v1"] = JSON
  function loadConfig(){
    try{ return JSON.parse(localStorage.getItem("laetitia_config_v1")||"{}"); }catch{ return {}; }
  }
  function getInt(cfg, key, fallback){
    const v = parseInt(cfg && cfg[key]);
    return Number.isFinite(v) ? v : fallback;
  }

  const cfg = loadConfig();

  window.LaetitiaConfig = {
    load: loadConfig,
    getInt: getInt,
    // häufige Werte (Sekunden → ms)
    sessionSize: getInt(cfg,"fragen",15),
    threshold:   getInt(cfg,"schwelle",50),
    delayMs:     getInt(cfg,"delay",4) * 1000
  };
})();