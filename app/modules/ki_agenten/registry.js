// registry.js -- Laetitia Lernsystem
// Multi-Agenten-System: zentrale Liste aller KI-Charaktere.
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
//
// Noch NICHT in eine UI eingebunden -- dient als Vorbereitung fuer
// spaetere Gruppengespraeche (mehrere Agenten gemeinsam im Gespraech).
// Jeder neue Agent wird hier mit seinen Eckdaten ergaenzt, sobald er
// existiert. Nova lebt technisch weiter in app/modules/ki_gespraech/
// (nicht umgezogen, um ein funktionierendes Modul nicht zu riskieren),
// wird hier aber mitgelistet, damit die Liste vollstaendig ist.

window.KI_AGENTEN = [
  {
    id: "nova",
    name: "Nova",
    rolle: "Beste Freundin -- allgemeine Gespraeche",
    emoji: "✨",
    farbe: "#8b5cf6",
    pfad: "../ki_gespraech/ki_gespraech.html",
    personaPfad: "../ki_gespraech/persona.json"
  },
  {
    id: "fabu",
    name: "Fabu",
    rolle: "Geschichtenerzaehler",
    emoji: "🦊",
    farbe: "#d97706",
    pfad: "./fabu/fabu.html",
    personaPfad: "./fabu/persona.json"
  }
];
