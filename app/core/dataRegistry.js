(function(){
  "use strict";
  // dataRegistry.js — Dateiprotokoll-sicherer Datentransport
  // Module können per <script src="data/xyz.data.js"></script> Daten registrieren.
  window.LaetitiaDataRegistry = window.LaetitiaDataRegistry || Object.create(null);

  function set(key, tasks){
    window.LaetitiaDataRegistry[String(key)] = Array.isArray(tasks) ? tasks : [];
  }
  function get(key){
    return window.LaetitiaDataRegistry[String(key)] || null;
  }

  window.LaetitiaDataRegistryApi = { set, get };
})();