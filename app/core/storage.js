(function(){
  "use strict";
  // storage.js — kleine Storage-Helper (kompatibel zu bestehenden Keys)
  function getJson(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(raw==null) return fallback;
      return JSON.parse(raw);
    }catch{ return fallback; }
  }
  function setJson(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
  }
  function getString(key, fallback){
    try{
      const v = localStorage.getItem(key);
      return v==null ? fallback : String(v);
    }catch{ return fallback; }
  }
  function setString(key, value){
    try{ localStorage.setItem(key, String(value)); }catch{}
  }

  window.LaetitiaStorage = { getJson, setJson, getString, setString };
})();