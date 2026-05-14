// Parametertabelle Psalmen
// aktiv: false  → Album wird nicht angezeigt
(function(){
  "use strict";
  var config = {
    "reiner_unglaub": true
  };
  window.LaetitiaGlaubenLieder = (window.LaetitiaGlaubenLieder || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
