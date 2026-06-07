# test_luecken.ps1 -- Pfad-Training Lueckentests (S11, 2026-06-06)
# Testet: Falscher Zweitschritt, Weiter waehrend Ebene 2, Hinweis in Ebene 2,
#         fehlerCount-Reset nach Erstschritt, kachel-name-Text in Ebene 2
# Voraussetzung: Edge --remote-debugging-port=9222, Training-Tab offen

Add-Type -AssemblyName System.Web.Extensions

function DevEval($wsUrl, $id, $expr, $ms=15000){
    $ws  = [System.Net.WebSockets.ClientWebSocket]::new()
    $tok = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync([uri]$wsUrl, $tok).Wait()
    $ser = [System.Web.Script.Serialization.JavaScriptSerializer]::new()
    $req = '{"id":' + $id + ',"method":"Runtime.evaluate","params":{"expression":' `
         + $ser.Serialize($expr) + ',"awaitPromise":true,"timeout":' + $ms + '}}'
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($req)
    $ws.SendAsync([ArraySegment[byte]]$bytes, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $tok).Wait()
    $buf  = New-Object byte[] 131072
    $done = $false
    $found = $null
    while (!$done) {
        $all = [System.Collections.Generic.List[byte]]::new()
        do {
            $res = $ws.ReceiveAsync([ArraySegment[byte]]$buf, $tok).GetAwaiter().GetResult()
            for ($i = 0; $i -lt $res.Count; $i++) { $all.Add($buf[$i]) }
        } while (!$res.EndOfMessage)
        if ($res.MessageType -eq [System.Net.WebSockets.WebSocketMessageType]::Close) { $done = $true; break }
        $msg = [System.Text.Encoding]::UTF8.GetString($all.ToArray()) | ConvertFrom-Json
        if ($msg.id -eq $id) { $found = $msg.result.result.value; $done = $true }
    }
    try { $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "", $tok).Wait() } catch {}
    return $found
}

$tabs = $null
try { $tabs = Invoke-RestMethod "http://localhost:9222/json" -TimeoutSec 5 } catch {}
if (!$tabs) { Write-Host "FEHLER: Edge nicht erreichbar (Port 9222)."; exit 1 }
$tab = ($tabs | Where-Object { $_.url -like "*quasselkiste_training*" })
if (!$tab) { Write-Host "FEHLER: Training-Tab nicht gefunden."; exit 1 }
$wsUrl = [string]($tab[0].webSocketDebuggerUrl)
$all = @()

Write-Host "================================================================"
Write-Host "  LUECKENTESTS PFAD-TRAINING (S11)"
Write-Host "================================================================"
Write-Host ""

# ── L1: Falscher Zweitschritt in Ebene 2 ────────────────────────────────────
Write-Host "--- L1: Falscher Zweitschritt in Ebene 2 ---"
$vL1 = DevEval $wsUrl 11 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.wort&&p.wort.length>=2&&p.wort.length<=40&&
           p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  // Sicherstellen: Stufe 2 Training aktiv
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
    document.getElementById("btnStufe2").click();await wait(900);
  }

  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  var l1F=0,l1T=0;

  for(var i=0;i<5;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){R.push("INFO L1-"+i+": '"+ziel+"' kein S2-Pfad, uebersprungen");continue;}

    // Korrekten Erstschritt klicken
    var p0=aktP.pfad[0];
    if(p0.r===1){
      var f0=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
      if(f0&&f0.seiten&&f0.seiten.length>0){
        var sl=document.getElementById("seiteLabel");var at=0;
        while(sl&&sl.textContent!=="S "+f0.seiten[0]&&at++<4){document.getElementById("btnSeite").click();await wait(150);}
      }
    }
    var el0=document.querySelector(".kachel[data-r='"+p0.r+"'][data-c='"+p0.c+"']:not(.kachel-unsichtbar)");
    if(!el0){R.push("WARN L1-"+i+": Erstschritt nicht klickbar");continue;}
    el0.click();await wait(800);

    // Pruefen ob Ebene 2 aktiv
    var e2aktiv=document.querySelectorAll(".ebene2-treffer").length>0;
    if(!e2aktiv){R.push("WARN L1-"+i+": Ebene 2 nicht geoeffnet nach Erstklick (Datenbasis-Ambiguitaet)");continue;}

    // Falschen Zweitschritt suchen: kachel die weder ebene2-treffer noch ebene2-leer ist,
    // und NICHT der richtige Zweitschritt ist
    var p1=aktP.pfad[1];
    var falscheZweit=null;
    document.querySelectorAll(".kachel:not(.ebene2-leer):not(.kachel-unsichtbar)").forEach(function(el){
      if(!falscheZweit&&!(el.getAttribute("data-r")==String(p1.r)&&el.getAttribute("data-c")==String(p1.c))
         &&!(el.getAttribute("data-r")==String(p0.r)&&el.getAttribute("data-c")==String(p0.c))
         &&!el.classList.contains("ebene2-treffer")){
        falscheZweit=el;
      }
    });

    if(!falscheZweit){
      // Alternativ: eine ebene2-treffer-Kachel klicken die NICHT der Zielpfad ist
      // (gibt es nur wenn mehrere gueltige Zweitschritte fuer diesen Erstschritt existieren)
      // Dann falschen Klick auf eine ebene2-leer Kachel
      var leerEl=document.querySelector(".kachel.ebene2-leer");
      if(leerEl){falscheZweit=leerEl;}
    }

    if(!falscheZweit){R.push("WARN L1-"+i+": Keine falschen Kacheln in Ebene 2 gefunden");continue;}

    var vorE2T=document.querySelectorAll(".ebene2-treffer").length;
    falscheZweit.click();await wait(400);
    var nachE2T=document.querySelectorAll(".ebene2-treffer").length;
    var falschGesetzt=falscheZweit.classList.contains("falsch");

    l1T++;
    // Erwartung: .falsch gesetzt auf Kachel (kurz), Ebene 2 bleibt aktiv
    if(nachE2T>0&&!falscheZweit.classList.contains("ebene2-treffer")){
      // ebene2-treffer noch vorhanden = Ebene 2 aktiv
      // .falsch war kurz gesetzt (700ms timeout), koennte schon weg sein
      R.push("PASS L1-"+i+": Falscher Zweitschritt -- Ebene 2 bleibt aktiv ("+nachE2T+" treffer), kein Navigation");
    } else if(nachE2T===0){
      l1F++;
      R.push("FAIL L1-"+i+": Falscher Zweitschritt -- Ebene 2 geschlossen (0 treffer) -- Bug!");
    } else {
      R.push("PASS L1-"+i+": Falscher Zweitschritt -- Ebene 2 aktiv ("+nachE2T+" treffer nach Klick)");
    }
  }
  l1F===0?R.push("PASS L1a: Falscher Zweitschritt -- "+l1T+"/"+l1T+" getestet, Ebene 2 bleibt aktiv"):
           R.push("FAIL L1a: Falscher Zweitschritt -- "+l1F+"/"+l1T+" Fehler");
  return R.join("|");
})()
'@ 60000
$vL1 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── L2: Weiter-Button waehrend Ebene 2 aktiv ────────────────────────────────
Write-Host "--- L2: Weiter waehrend Ebene 2 ---"
$vL2 = DevEval $wsUrl 12 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.wort&&p.wort.length>=2&&p.wort.length<=40&&
           p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  var l2F=0;

  for(var i=0;i<5;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){R.push("INFO L2-"+i+": '"+ziel+"' kein S2-Pfad, uebersprungen");continue;}

    // Erstschritt korrekt klicken -> Ebene 2 oeffnen
    var p0=aktP.pfad[0];
    if(p0.r===1){
      var f0=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
      if(f0&&f0.seiten&&f0.seiten.length>0){
        var sl=document.getElementById("seiteLabel");var at=0;
        while(sl&&sl.textContent!=="S "+f0.seiten[0]&&at++<4){document.getElementById("btnSeite").click();await wait(150);}
      }
    }
    var el0=document.querySelector(".kachel[data-r='"+p0.r+"'][data-c='"+p0.c+"']:not(.kachel-unsichtbar)");
    if(!el0){R.push("WARN L2-"+i+": Erstschritt nicht klickbar");continue;}
    el0.click();await wait(800);

    var e2vor=document.querySelectorAll(".ebene2-treffer").length;
    if(e2vor===0){R.push("WARN L2-"+i+": Ebene 2 nicht geoeffnet (Datenbasis-Ambiguitaet)");continue;}

    // Weiter druecken WAEHREND Ebene 2 aktiv
    var zielVor=(document.getElementById("zielAnzeige")||{textContent:""}).textContent;
    document.getElementById("btnWeiter").click();
    await wait(1500); // Weiter hat 1200ms Timer vor neuesWort

    var e2nach=document.querySelectorAll(".ebene2-treffer").length+document.querySelectorAll(".ebene2-leer").length;
    var zielNach=(document.getElementById("zielAnzeige")||{textContent:""}).textContent;
    var neuesZiel=zielNach!==zielVor&&zielNach.indexOf("Finde:")>=0;

    if(e2nach===0&&neuesZiel){
      R.push("PASS L2-"+i+": Weiter waehrend Ebene 2 -- Ebene 1 wiederhergestellt + neue Aufgabe geladen");
    } else {
      l2F++;
      var detail="e2nach="+e2nach+" neuesZiel="+neuesZiel;
      R.push("FAIL L2-"+i+": Weiter waehrend Ebene 2 -- "+detail+" -- Bug!");
    }
    // Kein break, naechste Iteration laedt automatisch neue Aufgabe via btnWeiter am Anfang
    i=99; // nur 1 Test reicht als Beweis
  }
  l2F===0?R.push("PASS L2a: Weiter waehrend Ebene 2 funktioniert korrekt"):
           R.push("FAIL L2a: Weiter waehrend Ebene 2 fehlerhaft ("+l2F+" Fehler)");
  return R.join("|");
})()
'@ 60000
$vL2 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── L3: Hinweis-Button in Ebene 2 ───────────────────────────────────────────
Write-Host "--- L3: Hinweis in Ebene 2 ---"
$vL3 = DevEval $wsUrl 13 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.wort&&p.wort.length>=2&&p.wort.length<=40&&
           p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  var s2p=pfade.filter(function(p){return p.pfad.length===2;});

  for(var i=0;i<8;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var zielTreffer=s2p.filter(function(p){return p.wort===ziel;});
    if(zielTreffer.length===0){continue;}
    if(zielTreffer.length>1){continue;} // Datenbasis-Ambiguitaet: s2p.find() koennte anderen Pfad-Eintrag liefern als der App-zufaellige zielEintrag
    var aktP=zielTreffer[0];

    var p0=aktP.pfad[0];
    if(p0.r===1){
      var f0=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
      if(f0&&f0.seiten&&f0.seiten.length>0){
        var sl=document.getElementById("seiteLabel");var at=0;
        while(sl&&sl.textContent!=="S "+f0.seiten[0]&&at++<4){document.getElementById("btnSeite").click();await wait(150);}
      }
    }
    var el0=document.querySelector(".kachel[data-r='"+p0.r+"'][data-c='"+p0.c+"']:not(.kachel-unsichtbar)");
    if(!el0){continue;}
    el0.click();await wait(800);

    var e2=document.querySelectorAll(".ebene2-treffer").length;
    if(e2===0){continue;} // Datenbasis-Ambiguitaet

    // Hinweis-Button in Ebene 2 klicken
    document.getElementById("btnHinweis").click();await wait(150);

    var p1=aktP.pfad[1];
    var hinweisAufZweit=document.querySelector(
      ".kachel.hinweis[data-r='"+p1.r+"'][data-c='"+p1.c+"']");
    if(hinweisAufZweit){
      R.push("PASS L3a: Hinweis in Ebene 2 zeigt korrekten Zweitschritt (r"+p1.r+"c"+p1.c+" = '"+ziel+"')");
    } else {
      // Pruefen ob ueberhaupt ein Hinweis gesetzt ist
      var anyHinweis=document.querySelectorAll(".kachel.hinweis").length;
      if(anyHinweis>0){
        var hEl=document.querySelector(".kachel.hinweis");
        R.push("FAIL L3a: Hinweis in Ebene 2 falsche Kachel: r"+hEl.getAttribute("data-r")+"c"+hEl.getAttribute("data-c")+" (soll r"+p1.r+"c"+p1.c+")");
      } else {
        R.push("FAIL L3a: Hinweis in Ebene 2: kein .hinweis gesetzt nach btnHinweis.click()");
      }
    }
    i=99; // 1 Test reicht
  }
  if(R.length===0) R.push("WARN L3a: Kein S2-Pfad in 8 Versuchen gefunden");
  return R.join("|");
})()
'@ 60000
$vL3 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── L4: fehlerCount-Reset nach Erstschritt + 3 Falschklicks Zweitschritt ─────
Write-Host "--- L4: fehlerCount-Reset nach Erstschritt ---"
$vL4 = DevEval $wsUrl 14 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.wort&&p.wort.length>=2&&p.wort.length<=40&&
           p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  var s2p=pfade.filter(function(p){return p.pfad.length===2;});

  for(var i=0;i<8;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){continue;}

    // Korrekten Erstschritt klicken
    var p0=aktP.pfad[0];
    if(p0.r===1){
      var f0=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
      if(f0&&f0.seiten&&f0.seiten.length>0){
        var sl=document.getElementById("seiteLabel");var at=0;
        while(sl&&sl.textContent!=="S "+f0.seiten[0]&&at++<4){document.getElementById("btnSeite").click();await wait(150);}
      }
    }
    var el0=document.querySelector(".kachel[data-r='"+p0.r+"'][data-c='"+p0.c+"']:not(.kachel-unsichtbar)");
    if(!el0){continue;}

    // Vorher 2 Falschklicks auf Erstschritt-Ebene (fehlerCount = 2)
    var ff=document.querySelector(".kachel[data-r='2'][data-c='1']");
    if(ff){ff.click();await wait(300);ff.click();await wait(300);}

    // Jetzt korrekten Erstschritt -- fehlerCount soll danach 0 sein
    el0.click();await wait(800);

    var e2=document.querySelectorAll(".ebene2-treffer").length;
    if(e2===0){continue;} // Datenbasis-Ambiguitaet

    // 2 Falschklicks im Zweitschritt -- darf NOCH KEINEN Hinweis ausloesen (braucht 3)
    var p1=aktP.pfad[1];
    var leerEl=document.querySelector(".kachel.ebene2-leer");
    if(leerEl){
      leerEl.click();await wait(400);
      leerEl.click();await wait(400);
      var hinweisNach2=document.querySelectorAll(".kachel.hinweis").length;
      if(hinweisNach2>0){
        R.push("FAIL L4a: Nach 2 Falschklicks im Zweitschritt schon Hinweis -- fehlerCount wurde nicht resettet!");
      } else {
        R.push("PASS L4a: Nach 2 Falschklicks im Zweitschritt kein Hinweis -- fehlerCount korrekt resettet nach Erstschritt");
      }
      // 3. Falschklick -- jetzt Hinweis erwartet
      leerEl.click();await wait(400);
      var hinweisNach3=document.querySelectorAll(".kachel.hinweis").length;
      hinweisNach3>0?R.push("PASS L4b: Nach 3. Falschklick Zweitschritt: Hinweis korrekt gesetzt"):
                     R.push("FAIL L4b: Nach 3. Falschklick Zweitschritt: kein Hinweis -- fehlerCount-Reset-Bug?");
    } else {
      R.push("WARN L4: Keine ebene2-leer Kachel fuer Falschklick gefunden");
    }
    i=99; // 1 Test reicht
  }
  if(R.length===0) R.push("WARN L4: Kein S2-Pfad in 8 Versuchen gefunden");
  return R.join("|");
})()
'@ 60000
$vL4 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── L5: kachel-name-Text in Ebene 2 ─────────────────────────────────────────
Write-Host "--- L5: kachel-name-Text in Ebene 2 ---"
$vL5 = DevEval $wsUrl 15 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.wort&&p.wort.length>=2&&p.wort.length<=40&&
           p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  var l5F=0,l5T=0;

  for(var i=0;i<8;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){continue;}

    var p0=aktP.pfad[0];
    if(p0.r===1){
      var f0=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
      if(f0&&f0.seiten&&f0.seiten.length>0){
        var sl=document.getElementById("seiteLabel");var at=0;
        while(sl&&sl.textContent!=="S "+f0.seiten[0]&&at++<4){document.getElementById("btnSeite").click();await wait(150);}
      }
    }
    var el0=document.querySelector(".kachel[data-r='"+p0.r+"'][data-c='"+p0.c+"']:not(.kachel-unsichtbar)");
    if(!el0){continue;}
    el0.click();await wait(800);

    var e2els=document.querySelectorAll(".kachel.ebene2-treffer");
    if(e2els.length===0){continue;} // Datenbasis-Ambiguitaet

    // Alle ebene2-treffer pruefen: haben sie sichtbares kachel-name mit nicht-leerem Text?
    var fehler=[];
    e2els.forEach(function(el){
      var nm=el.querySelector(".kachel-name");
      if(!nm){fehler.push("r"+el.getAttribute("data-r")+"c"+el.getAttribute("data-c")+" kein .kachel-name");return;}
      if(nm.style.display==="none"){fehler.push("r"+el.getAttribute("data-r")+"c"+el.getAttribute("data-c")+" .kachel-name display=none");return;}
      if(!nm.textContent.trim()){fehler.push("r"+el.getAttribute("data-r")+"c"+el.getAttribute("data-c")+" .kachel-name leer");}
    });

    l5T++;
    if(fehler.length===0){
      R.push("PASS L5-"+i+": kachel-name in Ebene 2 korrekt ("+e2els.length+" Treffer, alle mit Text)");
    } else {
      l5F++;
      R.push("FAIL L5-"+i+": kachel-name Probleme: "+fehler.slice(0,3).join("; "));
    }
    if(l5T>=3) break; // 3 Tests reichen
  }
  if(l5T===0) R.push("WARN L5: Kein S2-Pfad in 8 Versuchen gefunden");
  l5F===0?R.push("PASS L5a: kachel-name-Text in Ebene 2 -- "+l5T+" getestet, alle korrekt"):
           R.push("FAIL L5a: kachel-name-Text Fehler in "+l5F+"/"+l5T+" Tests");
  return R.join("|");
})()
'@ 60000
$vL5 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── ZUSAMMENFASSUNG ──────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=========================================="
$pass=($all|Where-Object{$_ -like "PASS*"}).Count
$fail=($all|Where-Object{$_ -like "FAIL*"}).Count
$warn=($all|Where-Object{$_ -like "WARN*"}).Count
$info=($all|Where-Object{$_ -like "INFO*"}).Count
Write-Host "GESAMT: $($pass+$fail+$warn) Tests | PASS: $pass | FAIL: $fail | WARN: $warn | INFO: $info"
Write-Host "=========================================="
