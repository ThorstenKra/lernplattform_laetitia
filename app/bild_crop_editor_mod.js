// bild_crop_editor_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen
// Hinweis: bewusst NICHT IIFE-gewrapt -- resetSlider()/kopieren()/exportieren()
// muessen global bleiben fuer onclick-Attribute im HTML.

var aktBild = null; // { name, src, img }
var alleBilder = {};

// ── Datei laden ────────────────────────────────────────────────────────────────
document.getElementById("fileInput").addEventListener("change", function(e){
  var file = e.target.files[0];
  if(!file) return;
  var name = file.name.toLowerCase();
  var reader = new FileReader();

  if(name.endsWith(".js") || name.endsWith(".html")){
    reader.onload = function(ev){ ladeJsDatei(ev.target.result); };
    reader.readAsText(file);
  } else {
    // Direkt als Bild
    reader.onload = function(ev){
      alleBilder = { "Bild": ev.target.result };
      zeigeAuswahl();
      waehleAktBild("Bild", ev.target.result);
    };
    reader.readAsDataURL(file);
  }
  e.target.value = "";
});

function ladeJsDatei(text){
  var gefunden = {};
  // Matche: "key": "data:image/..."
  var regex = /"([^"]+)":\s*"(data:image[^"]+)"/g;
  var m;
  while((m = regex.exec(text)) !== null){
    gefunden[m[1]] = m[2];
  }
  var anzahl = Object.keys(gefunden).length;
  if(anzahl === 0){
    alert("Keine Bilder in der Datei gefunden.\nErwartet: \"key\": \"data:image/...\"");
    return;
  }
  alleBilder = gefunden;
  zeigeAuswahl();
  // Erstes Bild automatisch wählen
  var erster = Object.keys(gefunden)[0];
  waehleAktBild(erster, gefunden[erster]);
}

function zeigeAuswahl(){
  var bereich = document.getElementById("bildAuswahlBereich");
  var container = document.getElementById("bildAuswahl");
  container.innerHTML = "";
  var keys = Object.keys(alleBilder);
  if(keys.length <= 1){ bereich.style.display = "none"; return; }
  bereich.style.display = "";
  keys.forEach(function(k){
    var chip = document.createElement("button");
    chip.className = "bild-chip";
    chip.textContent = k;
    chip.onclick = function(){ waehleAktBild(k, alleBilder[k]); };
    container.appendChild(chip);
  });
}

function waehleAktBild(name, src){
  // Chip-Highlighting
  document.querySelectorAll(".bild-chip").forEach(function(c){
    c.classList.toggle("aktiv", c.textContent === name);
  });

  var img = new Image();
  img.onload = function(){
    aktBild = { name: name, src: src, img: img };
    document.getElementById("placeholder").style.display = "none";
    resetSlider();
    aktualisiere();
  };
  img.src = src;
}

// ── Slider ─────────────────────────────────────────────────────────────────────
["slTop","slBot","slLeft","slRight"].forEach(function(id){
  document.getElementById(id).addEventListener("input", aktualisiere);
});

function resetSlider(){
  ["slTop","slBot","slLeft","slRight"].forEach(function(id){
    document.getElementById(id).value = 0;
  });
  aktualisiere();
}

function getWerte(){
  return {
    top:    parseInt(document.getElementById("slTop").value),
    bot:    parseInt(document.getElementById("slBot").value),
    left:   parseInt(document.getElementById("slLeft").value),
    right:  parseInt(document.getElementById("slRight").value)
  };
}

// ── Hauptvorschau aktualisieren ────────────────────────────────────────────────
function aktualisiere(){
  if(!aktBild) return;
  var w = getWerte();

  // Labels
  document.getElementById("valTop").textContent   = w.top   + "%";
  document.getElementById("valBot").textContent   = w.bot   + "%";
  document.getElementById("valLeft").textContent  = w.left  + "%";
  document.getElementById("valRight").textContent = w.right + "%";

  var img = aktBild.img;
  var iw = img.naturalWidth, ih = img.naturalHeight;

  // Crop in Pixeln
  var cl = Math.round(iw * w.left   / 100);
  var ct = Math.round(ih * w.top    / 100);
  var cr = Math.round(iw * w.right  / 100);
  var cb = Math.round(ih * w.bot    / 100);
  var cw = iw - cl - cr;
  var ch = ih - ct - cb;

  // ── Große Vorschau ────────────────────────────────────────────────────────
  var bereich = document.getElementById("bildBereich");
  var bw = bereich.clientWidth, bh = bereich.clientHeight;
  var scale = Math.min(bw / cw, bh / ch) * 0.92;

  var pw = Math.round(cw * scale), ph = Math.round(ch * scale);
  var px = Math.round((bw - pw) / 2), py = Math.round((bh - ph) / 2);

  var origImg = document.getElementById("originalImg");
  origImg.src = aktBild.src;
  origImg.style.display = "";

  var prev = document.getElementById("cropPreview");
  var prevImg = document.getElementById("cropImg");
  prev.style.display = "";
  prev.style.left   = px + "px";
  prev.style.top    = py + "px";
  prev.style.width  = pw + "px";
  prev.style.height = ph + "px";

  var totalScale = scale;
  prevImg.src = aktBild.src;
  prevImg.style.width  = Math.round(iw * totalScale) + "px";
  prevImg.style.height = Math.round(ih * totalScale) + "px";
  prevImg.style.left   = -Math.round(cl * totalScale) + "px";
  prevImg.style.top    = -Math.round(ct * totalScale) + "px";

  // ── Mini-Canvas ────────────────────────────────────────────────────────────
  var canvas = document.getElementById("miniCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, cl, ct, cw, ch, 0, 0, canvas.width, canvas.height);

  // ── Ergebnis-Code ──────────────────────────────────────────────────────────
  var code = "";
  if(w.top > 0 || w.bot > 0 || w.left > 0 || w.right > 0){
    // Als CSS margin-Trick (wie aktuell in schule_jaein)
    var scaleX = 100 / (100 - w.left - w.right);
    var scaleY = 100 / (100 - w.top  - w.bot);
    var mlPct  = -(w.left * scaleX).toFixed(1);
    var mtPct  = -(w.top  * scaleY).toFixed(1);
    code  = "/* CSS für img-Tag */\n";
    code += "width: " + scaleX.toFixed(1) + "%;\n";
    code += "margin-left: " + mlPct + "%;\n";
    code += "margin-top: " + mtPct + "%;\n\n";
    code += "/* Crop-Werte */\n";
    code += "Oben:   " + w.top   + "%\n";
    code += "Unten:  " + w.bot   + "%\n";
    code += "Links:  " + w.left  + "%\n";
    code += "Rechts: " + w.right + "%";
  } else {
    code = "Kein Zuschnitt — Originalbild";
  }
  document.getElementById("ergebnisCode").textContent = code;
}

// ── Kopieren ───────────────────────────────────────────────────────────────────
function kopieren(){
  var text = document.getElementById("ergebnisCode").textContent;
  navigator.clipboard.writeText(text).then(function(){
    var btn = document.querySelector(".btn-kopieren");
    btn.textContent = "✅ Kopiert!";
    setTimeout(function(){ btn.textContent = "📋 Kopieren"; }, 1500);
  });
}

// ── JPEG exportieren ───────────────────────────────────────────────────────────
function exportieren(){
  if(!aktBild) return;
  var w = getWerte();
  var img = aktBild.img;
  var iw = img.naturalWidth, ih = img.naturalHeight;
  var cl = Math.round(iw * w.left  / 100);
  var ct = Math.round(ih * w.top   / 100);
  var cw = Math.round(iw * (100 - w.left - w.right)  / 100);
  var ch = Math.round(ih * (100 - w.top  - w.bot)  / 100);

  var canvas = document.createElement("canvas");
  canvas.width = Math.min(cw, 640);
  canvas.height = Math.round(ch * (canvas.width / cw));
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, cl, ct, cw, ch, 0, 0, canvas.width, canvas.height);

  var link = document.createElement("a");
  link.download = aktBild.name + "_crop.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.82);
  link.click();
}

// Fenster-Größenänderung
window.addEventListener("resize", aktualisiere);
