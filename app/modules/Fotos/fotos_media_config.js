// Parametertabelle Fotoalben
// aktiv: false  → Album wird nicht angezeigt
// Neues Album: Ordner + info.js anlegen, <script>-Tag in fotoalbum.html eintragen, hier ergänzen.
(function(){
  "use strict";
  var config = {
    "buesum":             true,
    "daenemark":          true,
    "sankt_peter_ording": true,
    "sankt_peter_ording_2":true,
    "sauerland":          true
  };
  window.LaetitiaFotos = (window.LaetitiaFotos || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
