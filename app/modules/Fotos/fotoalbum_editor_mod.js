// fotoalbum_editor_mod.js -- Werkzeug fuer Thorsten (Maus), NICHT Teil der Laetitia-Oberflaeche
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
  "use strict";

  var alben = window.LaetitiaFotos || [];
  var aktAlbumIdx = -1;
  var speicherTimer = null;

  var elAlbumListe   = document.getElementById("albumListe");
  var elAlbumTitel   = document.getElementById("albumTitel");
  var elFotoListe    = document.getElementById("fotoListe");
  var elStatus       = document.getElementById("statusText");
  var btnLeeren      = document.getElementById("btnLeeren");
  var btnExport      = document.getElementById("btnExport");
  var elExportBox    = document.getElementById("exportBox");
  var elExportCode   = document.getElementById("exportCode");
  var elExportDatei  = document.getElementById("exportDateiname");
  var btnDownload    = document.getElementById("btnDownload");
  var btnSchliessen  = document.getElementById("btnSchliessen");

  function draftKey(alb){ return "laetitia_foto_editor_draft_v1_" + alb.id; }

  function ladeDraft(alb){
    try{
      var raw = localStorage.getItem(draftKey(alb));
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  function speichereDraft(alb, texte){
    try{ localStorage.setItem(draftKey(alb), JSON.stringify(texte)); }catch(e){}
  }

  function loescheDraft(alb){
    try{ localStorage.removeItem(draftKey(alb)); }catch(e){}
  }

  function aktuelleTexte(alb){
    var draft = ladeDraft(alb);
    return alb.fotos.map(function(f, i){
      if(draft && typeof draft[i] === "string") return draft[i];
      return (f && f.text) || "";
    });
  }

  /* ── Sidebar ── */
  function renderAlbumListe(){
    elAlbumListe.innerHTML = "";
    alben.forEach(function(alb, idx){
      var b = document.createElement("button");
      b.className = "albumBtn" + (idx === aktAlbumIdx ? " aktiv" : "");
      var anzTexte = aktuelleTexte(alb).filter(function(t){ return t; }).length;
      b.innerHTML = alb.name + '<span class="anz">' + alb.fotos.length + ' Fotos · ' + anzTexte + ' mit Text</span>';
      b.addEventListener("click", function(){ waehleAlbum(idx); });
      elAlbumListe.appendChild(b);
    });
  }

  function waehleAlbum(idx){
    aktAlbumIdx = idx;
    elExportBox.classList.remove("sichtbar");
    renderAlbumListe();
    renderFotoListe();
  }

  /* ── Fotoliste ── */
  function renderFotoListe(){
    elFotoListe.innerHTML = "";
    if(aktAlbumIdx < 0){ elAlbumTitel.textContent = "Album wählen"; return; }
    var alb = alben[aktAlbumIdx];
    elAlbumTitel.textContent = alb.name;
    var texte = aktuelleTexte(alb);

    alb.fotos.forEach(function(foto, i){
      var src = (foto && foto.src) || foto || "";
      var karte = document.createElement("div");
      karte.className = "karte";
      karte.innerHTML =
        '<img src="' + src + '" alt="" onerror="this.style.background=\'#e5e7eb\';this.src=\'\';">' +
        '<div class="karte-inhalt">' +
          '<div class="karte-nr">Foto ' + (i + 1) + ' / ' + alb.fotos.length + '</div>' +
          '<div class="karte-datei">' + src + '</div>' +
          '<textarea class="textfeld" placeholder="Kein Text (wird nicht eingeblendet/vorgelesen)" data-idx="' + i + '"></textarea>' +
          '<div class="karte-fusszeile">' +
            '<button class="vorlesen" data-idx="' + i + '" type="button">🔊 Vorlesen testen</button>' +
            '<span class="zaehler" data-idx="' + i + '"></span>' +
          '</div>' +
        '</div>';
      elFotoListe.appendChild(karte);
      var ta = karte.querySelector("textarea");
      ta.value = texte[i] || "";
      aktualisiereZaehler(karte, ta.value.length);
      ta.addEventListener("input", function(){
        aktualisiereZaehler(karte, ta.value.length);
        planeSpeichern(alb);
      });
    });

    elFotoListe.querySelectorAll(".vorlesen").forEach(function(btn){
      btn.addEventListener("click", function(){
        var idx = parseInt(btn.dataset.idx, 10);
        var ta = elFotoListe.querySelector('textarea[data-idx="' + idx + '"]');
        vorlesenTest(ta ? ta.value : "");
      });
    });
  }

  function aktualisiereZaehler(karte, len){
    var z = karte.querySelector(".zaehler");
    if(z) z.textContent = len + " Zeichen";
  }

  function planeSpeichern(alb){
    elStatus.textContent = "Speichere …";
    if(speicherTimer) clearTimeout(speicherTimer);
    speicherTimer = setTimeout(function(){
      var texte = [];
      elFotoListe.querySelectorAll("textarea.textfeld").forEach(function(ta){
        texte[parseInt(ta.dataset.idx, 10)] = ta.value;
      });
      speichereDraft(alb, texte);
      elStatus.textContent = "Entwurf gespeichert " + new Date().toLocaleTimeString("de-DE");
      renderAlbumListe();
    }, 400);
  }

  /* ── TTS-Vorschau (einfach, kein Goldstandard-Fallback noetig -- reines Testwerkzeug) ── */
  function vorlesenTest(text){
    if(!text){ return; }
    try{
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE"; u.rate = 1.104;
      var voices = speechSynthesis.getVoices();
      var de = voices.find(function(v){ return v.name.indexOf("Katja") >= 0; })
            || voices.find(function(v){ return v.lang.indexOf("de") === 0; });
      if(de) u.voice = de;
      speechSynthesis.speak(u);
    }catch(e){}
  }

  /* ── Entwurf zuruecksetzen ── */
  btnLeeren.addEventListener("click", function(){
    if(aktAlbumIdx < 0) return;
    var alb = alben[aktAlbumIdx];
    if(!window.confirm('Entwurf für "' + alb.name + '" verwerfen und auf den zuletzt erzeugten/gespeicherten Stand zurücksetzen?')) return;
    loescheDraft(alb);
    renderAlbumListe();
    renderFotoListe();
    elStatus.textContent = "Entwurf zurückgesetzt";
  });

  /* ── Code erzeugen ── */
  function baueInfoJs(alb, texte){
    var zeilen = alb.fotos.map(function(foto, i){
      var src = (foto && foto.src) || foto || "";
      return "    {src:" + JSON.stringify(src) + ", text:" + JSON.stringify(texte[i] || "") + "}";
    });
    return "// Pfade IMMER relativ zu fotoalbum.html\n" +
      "window.LaetitiaFotos = window.LaetitiaFotos || [];\n" +
      "window.LaetitiaFotos.push({\n" +
      "  id:    " + JSON.stringify(alb.id) + ",\n" +
      "  name:  " + JSON.stringify(alb.name) + ",\n" +
      "  fotos: [\n" +
      zeilen.join(",\n") + "\n" +
      "  ]\n" +
      "});\n";
  }

  btnExport.addEventListener("click", function(){
    if(aktAlbumIdx < 0) return;
    var alb = alben[aktAlbumIdx];
    var texte = [];
    elFotoListe.querySelectorAll("textarea.textfeld").forEach(function(ta){
      texte[parseInt(ta.dataset.idx, 10)] = ta.value;
    });
    var code = baueInfoJs(alb, texte);
    elExportCode.value = code;
    elExportDatei.textContent = "alben/" + alb.id + "/info.js";
    elExportBox.classList.add("sichtbar");
    elExportCode.dataset.dateiname = "info.js";
  });

  btnDownload.addEventListener("click", function(){
    var code = elExportCode.value;
    if(!code) return;
    var blob = new Blob([code], {type:"text/javascript"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "info.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
  });

  btnSchliessen.addEventListener("click", function(){
    elExportBox.classList.remove("sichtbar");
  });

  /* ── Init ── */
  renderAlbumListe();
  if(alben.length) waehleAlbum(0);

})();
