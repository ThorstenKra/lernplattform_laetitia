// lesen_hilfe_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

"use strict";

// ── Glossar ────────────────────────────────────────────────────────────────
// Kindgerechte Erklärungen häufiger schwieriger Wörter.
// Erweiterbar: einfach neue Einträge hinzufügen.
// Format: { wort: { erkl: "Erklärung", beispiel: "Beispielsatz" } }
const GLOSSAR = {
  // Natur & Tiere
  "nachtaktiv":    { erkl:"Nachtaktiv bedeutet: das Tier schläft tagsüber und ist nachts wach.", beispiel:"Die Eule ist nachtaktiv – sie jagt in der Nacht." },
  "schläft":       { erkl:"Schlafen heißt: die Augen zumachen und ausruhen.", beispiel:"Die Katze schläft in der Sonne." },
  "frisst":        { erkl:"Fressen heißt: Essen. Tiere fressen, Menschen essen.", beispiel:"Der Hund frisst seinen Napf leer." },
  "knospe":        { erkl:"Eine Knospe ist ein kleines, noch geschlossenes Blatt oder eine Blüte am Baum.", beispiel:"Im Frühling öffnen sich die Knospen." },
  "ausdehnt":      { erkl:"Ausdehnen bedeutet: größer werden. Wenn Metall warm wird, wird es ein bisschen größer.", beispiel:"Die Schiene dehnt sich in der Sonne aus." },
  "küken":         { erkl:"Küken sind Baby-Vögel, die gerade aus dem Ei geschlüpft sind.", beispiel:"Die Küken folgen ihrer Mutter, der Ente." },
  // Menschen & Alltag
  "verantwortungsbewusst": { erkl:"Verantwortungsbewusst bedeutet: man kümmert sich gut um Dinge und Menschen und denkt nach bevor man handelt.", beispiel:"Ein verantwortungsbewusstes Kind räumt sein Zimmer auf." },
  "selbst-scan":   { erkl:"Eine Selbst-Scan-Kasse ist eine Kasse im Supermarkt, wo du alles selber einscannst, ohne Kassierer.", beispiel:"An der Selbst-Scan-Kasse geht es oft schneller." },
  "umgehungsstraße": { erkl:"Eine Umgehungsstraße ist eine Straße, die um eine Stadt herumführt, damit weniger Autos durch den Ort fahren.", beispiel:"Die neue Umgehungsstraße macht den Ortskern ruhiger." },
  "bademeister":   { erkl:"Ein Bademeister passt im Schwimmbad auf alle auf und sorgt dafür, dass die Regeln eingehalten werden.", beispiel:"Der Bademeister pfeift, wenn jemand rennt." },
  "portemonnaie":  { erkl:"Ein Portemonnaie ist eine kleine Tasche für Geld und Karten. Auch Geldbeutel oder Geldbörse genannt.", beispiel:"Nico schaut in sein Portemonnaie, ob er genug Geld hat." },
  "bibliothek":    { erkl:"Eine Bibliothek ist ein großer Raum mit vielen Büchern, die man ausleihen darf.", beispiel:"In der Bibliothek kann man Bücher kostenlos ausleihen." },
  "vorlesestunde": { erkl:"Eine Vorlesestunde ist eine Veranstaltung, bei der jemand laut aus einem Buch vorliest.", beispiel:"Die Vorlesestunde für Kinder beginnt um 10 Uhr." },
  // Wissenschaft & Natur
  "meeresspiegel": { erkl:"Der Meeresspiegel ist die Höhe des Wassers in den Ozeanen. Wenn er steigt, gibt es mehr Wasser.", beispiel:"Durch das schmelzende Eis steigt der Meeresspiegel." },
  "klimawandel":   { erkl:"Der Klimawandel bedeutet, dass sich das Wetter auf der ganzen Erde langsam verändert und wärmer wird.", beispiel:"Wegen des Klimawandels werden die Sommer heißer." },
  "bakterien":     { erkl:"Bakterien sind winzig kleine Lebewesen, die man nur mit einem Mikroskop sehen kann. Manche sind nützlich, manche können krank machen.", beispiel:"Bakterien können sich sehr schnell vermehren." },
  "reflexe":       { erkl:"Ein Reflex ist eine sehr schnelle Bewegung, die dein Körper automatisch macht, ohne dass du nachdenken musst.", beispiel:"Wenn es hell blinkt, zwinkern wir – das ist ein Reflex." },
  "nachhaltig":    { erkl:"Nachhaltig bedeutet: so handeln, dass die Erde und die Natur auch in Zukunft noch gut sind.", beispiel:"Nachhaltige Produkte schonen die Umwelt." },
  "demokratie":    { erkl:"In einer Demokratie dürfen alle Bürger mitbestimmen, wer das Land regiert – durch Wahlen.", beispiel:"In der Demokratie wählen die Menschen ihre Vertreter." },
  "kopernikus":    { erkl:"Nikolaus Kopernikus war ein Wissenschaftler, der vor 500 Jahren herausfand, dass die Erde um die Sonne kreist.", beispiel:"Kopernikus zeigte, dass nicht die Erde, sondern die Sonne im Mittelpunkt steht." },
  "recycling":     { erkl:"Recycling bedeutet: alte Dinge werden wiederverwertet und zu neuen Dingen gemacht.", beispiel:"Glas kann fast unbegrenzt recycelt werden." },
  // Zeitangaben & Mengen
  "umfang":        { erkl:"Der Umfang ist die Länge des Randes einer Figur. Bei einem Rechteck addiert man alle vier Seiten.", beispiel:"Der Umfang des Rechtecks ist 22 cm." },
  "flächeninhalt": { erkl:"Der Flächeninhalt zeigt, wie groß eine Fläche ist. Bei einem Quadrat mit 5 cm Seite ist er 25 cm².", beispiel:"Der Flächeninhalt des Quadrats beträgt 25 Quadratzentimeter." },
  "ausdauernd":    { erkl:"Ausdauernd bedeutet: man gibt nicht auf und macht weiter, auch wenn es schwierig ist.", beispiel:"Kim ist ausdauernd – sie übt jeden Tag Gitarre." },
};

// ── URL-Parameter lesen ────────────────────────────────────────────────────
const params  = new URLSearchParams(window.location.search);
const TEXT    = params.get("text")  || "";
const FRAGE   = params.get("frage") || "";
const RETURN_URL = document.referrer || "./lesen.html";

// ── TTS ────────────────────────────────────────────────────────────────────
function speak(text, rate){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text||""));
    const voices = speechSynthesis.getVoices();
    const de = voices.find(v=>(v.lang||"").toLowerCase().startsWith("de"));
    if(de) u.voice = de;
    u.rate = rate || 0.92;
    speechSynthesis.speak(u);
  }catch(e){}
}
try{ speechSynthesis.getVoices(); }catch(e){}

// ── Dwell ──────────────────────────────────────────────────────────────────
const DWELL_MS = parseInt(localStorage.getItem("laetitia_dwell_ms")) || 800;
let _dt = null, _de = null;

function cancelDwell(){
  if(_dt){ clearTimeout(_dt); _dt=null; }
  if(_de){ _de.classList.remove("dwell-active"); _de.querySelectorAll(".dwell-ring-svg").forEach(s=>s.remove()); _de=null; }
}
function startDwell(el, fn){
  if(!el || el===_de) return;
  cancelDwell();
  _de = el;
  el.classList.add("dwell-active");
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","dwell-ring-svg"); svg.setAttribute("viewBox","0 0 64 64");
  const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx","32"); c.setAttribute("cy","32"); c.setAttribute("r","27");
  svg.appendChild(c); svg.style.setProperty("--dwell-duration",(DWELL_MS/1000)+"s");
  el.appendChild(svg);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ c.classList.add("animating"); }));
  _dt = setTimeout(()=>{ try{ fn(el); }finally{ cancelDwell(); } }, DWELL_MS);
}
function dwellBind(el, fn){
  if(!el) return;
  el.addEventListener("mouseenter",()=>startDwell(el,fn));
  el.addEventListener("mouseleave", cancelDwell);
  el.addEventListener("focus",()=>startDwell(el,fn));
  el.addEventListener("blur", cancelDwell);
}

// ── Wörter extrahieren ─────────────────────────────────────────────────────
const STOP = new Set(["der","die","das","und","oder","aber","den","dem","des",
  "ein","eine","einer","ist","sind","war","waren","hat","haben","wird","werden",
  "kann","nicht","kein","keine","mit","ohne","auf","in","im","am","an","aus",
  "bei","zu","zum","zur","von","für","als","auch","noch","nur","sie","er","es",
  "ich","du","wir","ihr","man","dass","weil","wenn","dann","wo","was","wer",
  "wie","welche","welcher","welches","sich","ihn","ihm","ihnen","uns","euch",
  "nach","über","unter","vor","hinter","neben","zwischen","durch","gegen","ohne"]);

function extractWords(text, frage){
  const combined = (text+" "+frage).toLowerCase()
    .replace(/[""„"‚'''´`]/g,"")
    .replace(/[^\p{L}\p{N}\s-]/gu," ")
    .replace(/-/g," ");
  const words = combined.split(/\s+/).map(w=>w.trim()).filter(w=>w.length>=5 && !STOP.has(w));
  // Häufigkeit + Länge als Relevanz-Score
  const freq = new Map();
  for(const w of words) freq.set(w,(freq.get(w)||0)+1);
  const scored = Array.from(freq.entries())
    .map(([w,f])=>({ w, score: f * Math.log(w.length+1) }))
    .sort((a,b)=>b.score-a.score)
    .map(x=>x.w);
  // Glossar-Treffer bevorzugen
  const inGlossar = scored.filter(w=>GLOSSAR[w]);
  const rest      = scored.filter(w=>!GLOSSAR[w]);
  return [...inGlossar, ...rest].slice(0,8);
}

// ── UI aufbauen ────────────────────────────────────────────────────────────
const textPreview    = document.getElementById("textPreview");
const wortGrid       = document.getElementById("wortGrid");
const screenWahl     = document.getElementById("screenWahl");
const screenErkl     = document.getElementById("screenErklaerung");
const erklWort       = document.getElementById("erklWort");
const erklText       = document.getElementById("erklText");
const erklBeispiel   = document.getElementById("erklBeispiel");
const footerWahl     = document.getElementById("footerWahl");
const footerErkl     = document.getElementById("footerErkl");

// Textvorschau füllen
textPreview.textContent = TEXT + (FRAGE ? " — " + FRAGE : "");

// Wörter extrahieren und Buttons bauen
const words = extractWords(TEXT, FRAGE);

if(words.length === 0){
  wortGrid.innerHTML = '<div style="grid-column:1/-1;font-size:18px;font-weight:900;color:var(--muted);padding:20px 0;">Keine schwierigen Wörter gefunden.</div>';
} else {
  words.forEach(w => {
    const btn = document.createElement("a");
    btn.href="#";
    btn.className="wortBtn";
    btn.textContent = w;
    // Click
    btn.onclick = (ev) => { ev.preventDefault(); zeigeErklaerung(w); };
    // Dwell
    dwellBind(btn, () => zeigeErklaerung(w));
    wortGrid.appendChild(btn);
  });
}

function zeigeErklaerung(wort){
  const eintrag = GLOSSAR[wort.toLowerCase()] || GLOSSAR[wort];
  const erkl    = eintrag?.erkl    || "Dieses Wort ist noch nicht im Glossar. Frag jemanden!";
  const bsp     = eintrag?.beispiel || "";

  erklWort.textContent     = wort;
  erklText.textContent     = erkl;
  erklBeispiel.textContent = bsp ? "Beispiel: " + bsp : "";

  screenWahl.classList.add("hidden");
  screenErkl.classList.remove("hidden");
  footerWahl.classList.add("hidden");
  footerErkl.classList.remove("hidden");

  // Sofort vorlesen
  const sprechText = erkl + (bsp ? " … Beispiel: " + bsp : "");
  speak(sprechText, 0.90);

  // Dwell für Erklärungsscreen binden
  setTimeout(bindFooterErkl, 50);
}

function zurueckWahl(){
  screenErkl.classList.add("hidden");
  screenWahl.classList.remove("hidden");
  footerErkl.classList.add("hidden");
  footerWahl.classList.remove("hidden");
  speak("Wähle ein Wort.");
  setTimeout(bindFooterWahl, 50);
}

// ── Footer binden ──────────────────────────────────────────────────────────
function bindFooterWahl(){
  const btnSprechen    = document.getElementById("btnSprechenWahl");
  const btnZurueck     = document.getElementById("btnZurueckLesen");
  btnSprechen.onclick  = (ev)=>{ ev.preventDefault();
    speak(TEXT + " … " + FRAGE, 0.90); };
  btnZurueck.onclick   = (ev)=>{ ev.preventDefault();
    history.back(); };
  dwellBind(btnSprechen, ()=> speak(TEXT+" … "+FRAGE, 0.90));
  dwellBind(btnZurueck,  ()=> history.back());
}

function bindFooterErkl(){
  const btnSprechen  = document.getElementById("btnSprechenErkl");
  const btnWahl      = document.getElementById("btnZurueckWahl");
  const btnFertig    = document.getElementById("btnZurueckLesen2");
  btnSprechen.onclick = (ev)=>{ ev.preventDefault();
    speak(erklText.textContent+" "+erklBeispiel.textContent, 0.90); };
  btnWahl.onclick     = (ev)=>{ ev.preventDefault(); zurueckWahl(); };
  btnFertig.onclick   = (ev)=>{ ev.preventDefault(); history.back(); };
  dwellBind(btnSprechen, ()=> speak(erklText.textContent+" "+erklBeispiel.textContent, 0.90));
  dwellBind(btnWahl,     ()=> zurueckWahl());
  dwellBind(btnFertig,   ()=> history.back());
}

// ── Init ───────────────────────────────────────────────────────────────────
bindFooterWahl();
// Frage direkt vorlesen wenn Seite öffnet
if(TEXT) setTimeout(()=> speak("Welches Wort möchtest du verstehen?", 0.95), 400);
