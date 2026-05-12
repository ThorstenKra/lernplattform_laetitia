(function(){
  "use strict";
  // return.js -- zentrales Return-URL Handling
  // WICHTIG: Speichert immer ABSOLUTE URLs (new URL(pfad, location.href).href)
  // Damit funktioniert der Ruecksprung aus beliebig tiefen Unterordnern korrekt.
  var KEY = "laetitia_return_url_v1";

  function toAbsolute(url){
    // Wandelt einen relativen Pfad in eine absolute URL um
    // (relativ zur aktuellen Seite, nicht zum Modul)
    try{
      return new URL(url, window.location.href).href;
    }catch(e){
      return url;
    }
  }

  function resolve(defaultUrl){
    defaultUrl = defaultUrl || "../../index.html";
    try{
      var u = new URL(window.location.href);
      var q = u.searchParams.get("return");
      if(q && typeof q === "string" && q.trim().length > 0){
        var abs = toAbsolute(q);
        localStorage.setItem(KEY, abs);
        return abs;
      }
    }catch(e){}
    try{
      var saved = localStorage.getItem(KEY);
      if(saved) return saved;
    }catch(e){}
    return toAbsolute(defaultUrl);
  }

  function applyToIds(url, ids){
    (ids||[]).forEach(function(id){
      var a = document.getElementById(id);
      if(a) a.setAttribute("href", url);
    });
  }

  // Hilfsfunktion: Kategorie-Seite als Return-URL setzen (von Kategorie-Seiten aufgerufen)
  function setReturnUrl(url){
    try{
      localStorage.setItem(KEY, toAbsolute(url));
    }catch(e){}
  }

  window.LaetitiaReturn = { resolve: resolve, applyToIds: applyToIds, setReturnUrl: setReturnUrl };
})();
