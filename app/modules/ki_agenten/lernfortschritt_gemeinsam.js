// lernfortschritt_gemeinsam.js -- Laetitia Lernsystem
// Kurze, modulübergreifende Lernfortschritts-Zusammenfassung fuer ALLE Agenten
// (nicht nur Milo). Wird bei jedem Gespraechsende (/chat/abschliessen) mitgeschickt
// und landet dauerhaft im gemeinsamen Gedaechtnis unter profil.lernfortschritt --
// damit koennen auch Nova und Fabu beilaeufig auf echten Lernerfolg eingehen, nicht
// nur Milo situativ ueber sein ausfuehrlicheres sammleLernkontext().
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen

(function(){

var MODUL_NAMEN = { grammatik: "Grammatik-Werkstatt", mathe: "Mathe", lesen: "Lesen" };

function kurzZusammenfassung(){
  if(!window.LaetitiaStats) return null;
  var teile = [];
  Object.keys(MODUL_NAMEN).forEach(function(modul){
    try{
      var schwach = window.LaetitiaStats.schwacheAufgaben(modul);
      var level   = window.LaetitiaStats.levelEmpfehlungen(modul);
      if(!schwach.length && !level.length) return;
      var stueck = [];
      if(level.length)  stueck.push(level.length + " Thema(en) mehrfach fehlerfrei gemeistert");
      if(schwach.length) stueck.push(schwach.length + " Thema(en) noch mit haeufigeren Fehlern");
      teile.push(MODUL_NAMEN[modul] + ": " + stueck.join(", "));
    }catch(e){}
  });
  if(!teile.length) return null;
  return teile.join(". ");
}

window.LaetitiaLernfortschritt = { kurzZusammenfassung: kurzZusammenfassung };

})();
