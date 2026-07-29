// registry.js -- Laetitia Lernsystem
// Multi-Agenten-System: zentrale Liste aller KI-Charaktere.
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anführungszeichen
//
// Noch NICHT in eine UI eingebunden -- dient als Vorbereitung für
// spätere Gruppengespräche (mehrere Agenten gemeinsam im Gespräch).
// Jeder neue Agent wird hier mit seinen Eckdaten ergänzt, sobald er
// existiert. Nova lebt technisch weiter in app/modules/ki_gespraech/
// (nicht umgezogen, um ein funktionierendes Modul nicht zu riskieren),
// wird hier aber mitgelistet, damit die Liste vollständig ist.

window.KI_AGENTEN = [
  {
    id: "nova",
    name: "Nova",
    rolle: "Beste Freundin -- allgemeine Gespräche",
    emoji: "✨",
    farbe: "#8b5cf6",
    pfad: "../ki_gespraech/ki_gespraech.html",
    personaPfad: "../ki_gespraech/persona.json"
  },
  {
    id: "fabu",
    name: "Fabu",
    rolle: "Geschichtenerzähler",
    emoji: "🦊",
    farbe: "#d97706",
    pfad: "./fabu/fabu.html",
    personaPfad: "./fabu/persona.json"
  },
  {
    id: "milo",
    name: "Milo",
    rolle: "Lernbegleiter",
    emoji: "🦉",
    farbe: "#0d9488",
    pfad: "./milo/milo.html",
    personaPfad: "./milo/persona.json"
  }
];
