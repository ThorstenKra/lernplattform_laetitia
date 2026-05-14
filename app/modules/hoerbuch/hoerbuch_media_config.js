// Parametertabelle Hörbücher
// aktiv: false  → Buch wird nicht angezeigt
// Neues Buch: Ordner + info.js anlegen, <script>-Tag in hoerbuch.html eintragen, hier ergänzen.
(function(){
  "use strict";
  var config = {
    "dschungelbuch":              true,
    "kleinerprinz_dornen":        true,
    "taetowierter_hund":          true,
    "hans_im_glueck":             true,
    "das_doppelte_lottchen":      true,
    "der_kleine_prinz_2":         true,
    "puenktchen_und_anton":       true,
    "ritter_rost_babysitter":     true,
    "das-fliegende-kamel":        true,
    "jaguar-und-neinguar":        true,
    "schwaenke-hodscha-nasreddin":true
  };
  window.LaetitiaHoerspiele = (window.LaetitiaHoerspiele || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
