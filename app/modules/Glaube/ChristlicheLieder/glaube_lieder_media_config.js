// Parametertabelle Christliche Lieder
// aktiv: false  → Album wird nicht angezeigt
(function(){
  "use strict";
  var config = {
    "siegfried_fietz":    true,
    "manchmal_brauchst_du":true
  };
  window.LaetitiaChristlicheLieder = (window.LaetitiaChristlicheLieder || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
