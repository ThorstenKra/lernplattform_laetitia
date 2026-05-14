// Parametertabelle Glaube-Hörbücher
// aktiv: false  → Buch wird nicht angezeigt
(function(){
  "use strict";
  var config = {
    "johannes_evangelium": true,
    "matthaeus-evangelium":true
  };
  window.LaetitiaHoerspiele = (window.LaetitiaHoerspiele || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
