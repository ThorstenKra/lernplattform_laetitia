// Parametertabelle Musik-Alben
// aktiv: false  → Album wird nicht angezeigt (Mediendateien müssen nicht vorhanden sein)
// aktiv: true   → kann weggelassen werden (Standard)
// Neues Album hinzufügen: Ordner + info.js anlegen, <script>-Tag in musik.html eintragen,
//                         hier einen Eintrag ergänzen.
(function(){
  "use strict";
  var config = {
    "sonido_cosmico":             true,
    "abba_definitive":            true,
    "nena_alles_gute_cd1":        true,
    "regenballade":               true,
    "angelo_branduardi":          true,
    "fetenhits_deutsche1":        true,
    "cassandra_steen_spiegelbild":true,
    "udo_juergens_willkommen":    true
  };
  window.LaetitiaMusik = (window.LaetitiaMusik || []).filter(function(a){
    return config[a.id] !== false;
  });
})();
