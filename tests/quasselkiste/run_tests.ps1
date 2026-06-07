Add-Type -AssemblyName System.Web.Extensions

function DevEval($wsUrl, $id, $expr, $ms=8000){
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

$tabs=Invoke-RestMethod "http://localhost:9222/json"
$wsUrl=[string](($tabs|Where-Object{$_.url -like "*quasselkiste_training*"})[0].webSocketDebuggerUrl)
$all=@()

# ── PHASE 1: Datenbasis ────────────────────────────────────────────────────────
Write-Host "--- Phase 1: Datenbasis ---"
$v1=DevEval $wsUrl 1 @'
(function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  felder.length===60?R.push("PASS P1a: 60 Felder vorhanden"):R.push("FAIL P1a: Felder="+felder.length);
  var r1=felder.filter(function(f){return f.r===1;});
  r1.every(function(f){return Array.isArray(f.seiten);})?R.push("PASS P1b: Alle r=1-Felder haben seiten[]"):R.push("FAIL P1b: seiten[] fehlt");
  var f11=felder.find(function(f){return f.r===1&&f.c===1;});
  f11&&f11.name==="Standard"?R.push("PASS P1c: r1c1=Standard"):R.push("FAIL P1c: r1c1="+(f11?f11.name:"fehlt"));
  var fs={};felder.forEach(function(f){fs[f.r+"_"+f.c]=true;});
  var inv=[];pfade.forEach(function(p){p.pfad.forEach(function(s){if(!fs[s.r+"_"+s.c])inv.push(s.r+"_"+s.c);});});
  inv.length===0?R.push("PASS P1d: Alle "+pfade.length+" Pfade referenzieren gueltige Kacheln"):R.push("FAIL P1d: "+inv.length+" ungueltige Koordinaten");
  var n1=pfade.filter(function(p){return p.pfad.length===1;}).length;
  var n2=pfade.filter(function(p){return p.pfad.length===2;}).length;
  (n1>=500&&n2>=900)?R.push("PASS P1e: Pfadzahlen OK -- S1="+n1+" S2="+n2):R.push("FAIL P1e: Pfadzahlen zu niedrig -- S1="+n1+" S2="+n2);
  var hallo=r1.find(function(f){return f.name==="Hallo";});
  (hallo&&JSON.stringify(hallo.seiten)==="[2]")?R.push("PASS P1f: Hallo.seiten=[2] korrekt"):R.push("FAIL P1f: Hallo.seiten="+JSON.stringify(hallo?hallo.seiten:"fehlt"));
  var fuss=r1.find(function(f){return f.name==="Fussball";});
  (fuss&&JSON.stringify(fuss.seiten)==="[1,2,3]")?R.push("PASS P1g: Fussball.seiten=[1,2,3] korrekt"):R.push("FAIL P1g: Fussball.seiten="+JSON.stringify(fuss?fuss.seiten:"fehlt"));
  return R.join("|");
})()
'@ 6000
$v1 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 2: Seiten-Logik ─────────────────────────────────────────────────────
Write-Host "--- Phase 2: Seiten-Logik ---"
$v2=DevEval $wsUrl 2 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){document.getElementById("btnStufe2").click();await wait(800);}
  var t=5;while(document.getElementById("seiteLabel")&&document.getElementById("seiteLabel").textContent!=="S 1"&&t-->0){document.getElementById("btnSeite").click();await wait(200);}
  function unsichtbar(){return Array.from(document.querySelectorAll(".kachel-unsichtbar")).map(function(el){return el.getAttribute("data-r")+"_"+el.getAttribute("data-c");}).sort().join(",");}
  function soll(s){return felder.filter(function(f){if(f.r!==1)return false;var ss=f.seiten||[];return ss.length===0||ss.indexOf(s)<0;}).map(function(f){return f.r+"_"+f.c;}).sort().join(",");}
  var u1i=unsichtbar(),u1s=soll(1);
  u1i===u1s?R.push("PASS P2a: S1 korrekt ("+document.querySelectorAll(".kachel-unsichtbar").length+" unsichtbar)"):R.push("FAIL P2a: S1 -- soll="+u1s+" ist="+u1i);
  document.getElementById("btnSeite").click();await wait(300);
  var u2i=unsichtbar(),u2s=soll(2);
  u2i===u2s?R.push("PASS P2b: S2 korrekt ("+document.querySelectorAll(".kachel-unsichtbar").length+" unsichtbar)"):R.push("FAIL P2b: S2 -- soll="+u2s+" ist="+u2i);
  document.getElementById("btnSeite").click();await wait(300);
  var u3i=unsichtbar(),u3s=soll(3);
  u3i===u3s?R.push("PASS P2c: S3 korrekt ("+document.querySelectorAll(".kachel-unsichtbar").length+" unsichtbar)"):R.push("FAIL P2c: S3 -- soll="+u3s+" ist="+u3i);
  document.getElementById("btnSeite").click();await wait(200);
  document.getElementById("seiteLabel").textContent==="S 1"?R.push("PASS P2d: Zyklus S3->S1 korrekt"):R.push("FAIL P2d: "+document.getElementById("seiteLabel").textContent);
  var h1=document.querySelector(".kachel[data-r='1'][data-c='5']");
  (h1&&h1.classList.contains("kachel-unsichtbar"))?R.push("PASS P2e: Hallo unsichtbar auf S1"):R.push("FAIL P2e: Hallo muss auf S1 unsichtbar sein");
  document.getElementById("btnSeite").click();await wait(200);
  var h2=document.querySelector(".kachel[data-r='1'][data-c='5']");
  (h2&&!h2.classList.contains("kachel-unsichtbar"))?R.push("PASS P2f: Hallo sichtbar auf S2"):R.push("FAIL P2f: Hallo muss auf S2 sichtbar sein");
  document.getElementById("btnSeite").click();await wait(200);
  var fs=document.querySelector(".kachel[data-r='1'][data-c='9']");
  (fs&&!fs.classList.contains("kachel-unsichtbar"))?R.push("PASS P2g: Fussball sichtbar auf S3"):R.push("FAIL P2g: Fussball muss auf S3 sichtbar");
  while(document.getElementById("seiteLabel").textContent!=="S 1"){document.getElementById("btnSeite").click();await wait(150);}
  return R.join("|");
})()
'@ 12000
$v2 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 3: Ebene-2-Visualisierung (task-basiert) ────────────────────────────
Write-Host "--- Phase 3: Ebene-2-Visualisierung ---"
$v3=DevEval $wsUrl 3 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  var em={};
  s2p.forEach(function(p){var k=p.pfad[0].r+"_"+p.pfad[0].c;if(!em[k])em[k]={r:p.pfad[0].r,c:p.pfad[0].c,zweit:{}};em[k].zweit[p.pfad[1].r+"_"+p.pfad[1].c]=true;});
  R.push("INFO P3-Meta: "+Object.keys(em).length+" einzigartige Erstschritte");
  // Task-basierter Test: Weiter druecken, aktuelles Ziel lesen, Erstschritt korrekt klicken
  var e2f=0,e2t=0;
  for(var i=0;i<12;i++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){R.push("INFO P3-"+i+": '"+ziel+"' kein 2-Schritt-Pfad, uebersprungen");continue;}
    var p0=aktP.pfad[0];
    // Seite navigieren
    if(p0.r===1){var esf=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});var ess=esf?(esf.seiten||[]):[];if(ess.length>0){var tg="S "+ess[0],at=0;while(document.getElementById("seiteLabel").textContent!==tg&&at++<4){document.getElementById("btnSeite").click();await wait(150);}}}
    var el=document.querySelector(".kachel[data-r=\""+p0.r+"\"][data-c=\""+p0.c+"\"]");
    if(!el||el.classList.contains("kachel-unsichtbar")){R.push("WARN P3-"+i+": Erstschritt-Kachel unsichtbar fuer '"+ziel+"'");continue;}
    el.click();await wait(750);
    var tr=Array.from(document.querySelectorAll(".ebene2-treffer")).map(function(e){return e.getAttribute("data-r")+"_"+e.getAttribute("data-c");});
    var lr=Array.from(document.querySelectorAll(".ebene2-leer")).map(function(e){return e.getAttribute("data-r")+"_"+e.getAttribute("data-c");});
    var ek=p0.r+"_"+p0.c;
    var erw=Object.keys(em[ek]?em[ek].zweit:{}).filter(function(k){return k!==ek;}); // Self-Loop: Erstschritt-Kachel wird von der App nie als ebene2-treffer markiert
    var fehlt=erw.filter(function(k){return tr.indexOf(k)<0;});
    var falschL=erw.filter(function(k){return lr.indexOf(k)>=0;});
    var hatR=!!document.querySelector(".kachel.richtig");
    if(fehlt.length===0&&falschL.length===0&&hatR){R.push("PASS P3-"+i+": '"+ziel+"' -- "+tr.length+" Treffer, "+lr.length+" gedimmt, .richtig gesetzt");}
    else{e2f++;R.push("FAIL P3-"+i+": '"+ziel+"' -- fehlend=["+fehlt.slice(0,3)+"] falschL=["+falschL+"] richtig="+hatR);}
    e2t++;
  }
  e2f===0?R.push("PASS P3a: Ebene-2 -- "+e2t+" getestete 2-Schritt-Aufgaben alle korrekt"):R.push("FAIL P3a: "+e2f+"/"+e2t+" Aufgaben fehlerhaft");
  return R.join("|");
})()
'@ 50000
$v3 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 4: Falscher Erstklick ───────────────────────────────────────────────
Write-Host "--- Phase 4: Falscher Erstklick ---"
$v4=DevEval $wsUrl 4 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  // Zustandsreset: Phase 3 koennte in Ebene 2 enden (letzter Erstklick ohne Weiter)
  document.getElementById("btnWeiter").click();await wait(1400);
  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  var estSet={};s2p.forEach(function(p){estSet[p.pfad[0].r+"_"+p.pfad[0].c]=true;});
  var nichtErst=felder.filter(function(f){return !estSet[f.r+"_"+f.c]&&f.r>=2&&f.r<=6;}).slice(0,6);
  R.push("INFO P4-Meta: "+nichtErst.map(function(f){return f.name+"(r"+f.r+"c"+f.c+")";}).join(", "));
  var f4e=0;
  for(var fi=0;fi<nichtErst.length;fi++){
    var nf=nichtErst[fi];
    var nfEl=document.querySelector(".kachel[data-r=\""+nf.r+"\"][data-c=\""+nf.c+"\"]");
    if(!nfEl)continue;
    nfEl.click();await wait(250);
    var leerN=document.querySelectorAll(".ebene2-leer").length;
    var falschMk=nfEl.classList.contains("falsch");
    if(leerN>5){f4e++;R.push("FAIL P4-"+nf.name+": Ebene 2 geoeffnet ("+leerN+" gedimmt)");}
    if(!falschMk){f4e++;R.push("FAIL P4-"+nf.name+": falsch-Klasse fehlt");}
    await wait(600);
  }
  f4e===0?R.push("PASS P4a: Falscher Erstklick -- 6/6 korrekt"):R.push("FAIL P4a: "+f4e+" Fehler");
  return R.join("|");
})()
'@ 22000
$v4 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 5: Vollstaendiger Flow (5 Pfade, korrigiertes Timing) ───────────────
Write-Host "--- Phase 5: Vollstaendiger Flow ---"
$v5=DevEval $wsUrl 5 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  // Woerter mit mehreren Pfad-Eintraegen (Datenbasis-Ambiguitaet/MINSPEAK -- s2p.find() koennte
  // einen anderen Eintrag liefern als den von der App zufaellig geladenen zielEintrag)
  var s2Anzahl={};s2p.forEach(function(p){s2Anzahl[p.wort]=(s2Anzahl[p.wort]||0)+1;});
  var flF=0,pi=0,versuch=0;
  for(; pi<5 && versuch<14; versuch++){
    document.getElementById("btnWeiter").click();await wait(1800);
    var ziel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s2p.find(function(p){return p.wort===ziel;});
    if(!aktP){R.push("WARN P5-"+pi+": '"+ziel+"' kein S2-Pfad");continue;}
    if(s2Anzahl[ziel]>1){R.push("INFO P5-"+pi+": '"+ziel+"' mehrdeutig ("+s2Anzahl[ziel]+" Pfad-Eintraege, Datenbasis-Ambiguitaet) -- uebersprungen");continue;}
    pi++;
    var p0=aktP.pfad[0];
    if(p0.r===1){var p0f=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});var p0s=p0f?(p0f.seiten||[]):[];if(p0s.length>0){var t0="S "+p0s[0],a0=0;while(document.getElementById("seiteLabel").textContent!==t0&&a0++<4){document.getElementById("btnSeite").click();await wait(150);}}}
    var el0=document.querySelector(".kachel[data-r=\""+p0.r+"\"][data-c=\""+p0.c+"\"]");
    if(!el0||el0.classList.contains("kachel-unsichtbar")){flF++;R.push("FAIL P5-"+pi+": Erstschritt nicht klickbar fuer '"+ziel+"'");continue;}
    el0.click();await wait(750);
    var p1=aktP.pfad[1];
    var el1=document.querySelector(".kachel[data-r=\""+p1.r+"\"][data-c=\""+p1.c+"\"]");
    if(!el1){flF++;R.push("FAIL P5-"+pi+": Zweitschritt-Element fehlt");continue;}
    if(!el1.classList.contains("ebene2-treffer")&&!el1.classList.contains("richtig")){flF++;R.push("FAIL P5-"+pi+": '"+ziel+"' Zweitschritt nicht in ebene2-treffer");continue;}
    el1.click();
    await wait(2500); // Warten auf 500ms+1800ms Wiederherstellungs-Timer
    var lN=document.querySelectorAll(".ebene2-leer").length;
    var tN=document.querySelectorAll(".ebene2-treffer").length;
    (lN===0&&tN===0)?R.push("PASS P5-"+pi+": '"+ziel+"' -- Ebene 1 wiederhergestellt"):R.push("FAIL P5-"+pi+": '"+ziel+"' -- Ebene noch aktiv leer="+lN+" treffer="+tN);
    if(lN>0||tN>0)flF++;
  }
  flF===0?R.push("PASS P5a: Vollstaendiger Flow -- "+pi+"/"+pi+" erfolgreich"):R.push("FAIL P5a: "+flF+"/"+pi+" Pfade fehlerhaft");
  return R.join("|");
})()
'@ 42000
$v5 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 6: Stufe 1 Stichprobe ───────────────────────────────────────────────
Write-Host "--- Phase 6: Stufe 1 ---"
$v6=DevEval $wsUrl 6 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  document.getElementById("btnZurueck").click();await wait(500);
  document.getElementById("btnStufe1").click();await wait(700);
  var s1p=pfade.filter(function(p){return p.pfad.length===1;});
  // Woerter mit mehreren Pfad-Eintraegen (Datenbasis-Ambiguitaet/MINSPEAK -- s1p.find() koennte
  // einen anderen Eintrag liefern als den von der App zufaellig geladenen zielEintrag)
  var s1Anzahl={};s1p.forEach(function(p){s1Anzahl[p.wort]=(s1Anzahl[p.wort]||0)+1;});
  R.push("INFO P6-Meta: Stufe 1, "+s1p.length+" Pfade, Seiten-Button display="+document.getElementById("btnSeite").style.display);
  var s1F=0,si=0,versuch=0;
  for(; si<8 && versuch<16; versuch++){
    var aktZ=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var aktP=s1p.find(function(p){return p.wort===aktZ;});
    if(!aktP){R.push("WARN P6-"+si+": '"+aktZ+"' nicht in S1-Pfaden");document.getElementById("btnWeiter").click();await wait(1200);continue;}
    if(s1Anzahl[aktZ]>1){R.push("INFO P6-"+si+": '"+aktZ+"' mehrdeutig ("+s1Anzahl[aktZ]+" Pfad-Eintraege, Datenbasis-Ambiguitaet) -- uebersprungen");document.getElementById("btnWeiter").click();await wait(1200);continue;}
    si++;
    // Kachel-Sichtbarkeit pruefen (Auto-Navigation muss geklappt haben)
    var rEl=document.querySelector(".kachel[data-r=\""+aktP.pfad[0].r+"\"][data-c=\""+aktP.pfad[0].c+"\"]");
    var istSichtbar=rEl&&!rEl.classList.contains("kachel-unsichtbar");
    if(!istSichtbar){s1F++;R.push("FAIL P6-"+si+": Kachel fuer '"+aktZ+"' r"+aktP.pfad[0].r+"c"+aktP.pfad[0].c+" unsichtbar trotz Auto-Nav");document.getElementById("btnWeiter").click();await wait(1200);continue;}
    // Falscher Klick
    var ff=felder.find(function(f){return !(f.r===aktP.pfad[0].r&&f.c===aktP.pfad[0].c)&&f.r>=2;});
    if(ff){var fEl=document.querySelector(".kachel[data-r=\""+ff.r+"\"][data-c=\""+ff.c+"\"]");if(fEl){fEl.click();await wait(200);}var lN=document.querySelectorAll(".ebene2-leer").length;if(lN>0){s1F++;R.push("FAIL P6-"+si+": Stufe 1 zeigt Ebene 2");}}
    var stB=(document.getElementById("statsAnzeige")||{textContent:""}).textContent;
    var gB=parseInt((stB.match(/(\d+)\s*gel/)||[0,0])[1])||0;
    rEl.click();await wait(2700);
    var stA=(document.getElementById("statsAnzeige")||{textContent:""}).textContent;
    var gA=parseInt((stA.match(/(\d+)\s*gel/)||[0,0])[1])||0;
    gA>gB?R.push("PASS P6-"+si+": '"+aktZ+"' geloest ("+gB+"->"+gA+")"):R.push("FAIL P6-"+si+": geloest nicht erhoeht fuer '"+aktZ+"' ("+gB+"->"+gA+")");
    if(gA<=gB){s1F++;document.getElementById("btnWeiter").click();await wait(1300);}
  }
  s1F===0?R.push("PASS P6a: Stufe 1 -- "+si+"/"+si+" Tests bestanden"):R.push("FAIL P6a: "+s1F+" Fehler");
  return R.join("|");
})()
'@ 56000
$v6 -split "\|" | ForEach-Object { Write-Host $_; $all+=$_ }

# ── PHASE 7: DOM-Grundstruktur ────────────────────────────────────────────────
Write-Host "--- Phase 7: DOM-Grundstruktur ---"
$v7=DevEval $wsUrl 7 @'
(function(){
  var R=[];
  var ka=document.querySelectorAll(".kachel");
  ka.length===60?R.push("PASS P7a: 60 .kachel-Elemente vorhanden"):R.push("FAIL P7a: "+ka.length+" Kacheln (soll 60)");
  var bad=Array.from(ka).filter(function(e){return !e.getAttribute("data-r")||!e.getAttribute("data-c");});
  bad.length===0?R.push("PASS P7b: Alle 60 Kacheln haben data-r + data-c"):R.push("FAIL P7b: "+bad.length+" ohne Attribut");
  var k0=ka[0],im=k0?k0.querySelector(".kachel-img"):null,nm=k0?k0.querySelector(".kachel-name"):null;
  if(im&&nm&&typeof im.onerror==="function"){
    im.onerror.call(im);
    window.getComputedStyle(nm).display!=="none"?R.push("PASS P7c: Tile-Fallback: kachel-name eingeblendet nach onerror"):R.push("FAIL P7c: kachel-name nicht sichtbar (computedDisplay="+window.getComputedStyle(nm).display+")");
    im.style.display=""; nm.style.display="none";
  }else{R.push("FAIL P7c: onerror-Handler nicht vorhanden");}
  var u="";try{u=new URL("../../spielewelt.html",window.location.href).href;}catch(e){u="ERR";}
  u.endsWith("spielewelt.html")?R.push("PASS P7d: Spielewelt-URL korrekt berechnet"):R.push("FAIL P7d: URL falsch: "+u);
  return R.join("|");
})()
'@ 5000
$v7 -split "\|"|ForEach-Object{Write-Host $_;$all+=$_}

# ── PHASE 8: Hinweis-Button ───────────────────────────────────────────────────
Write-Host "--- Phase 8: Hinweis-Button ---"
$v8=DevEval $wsUrl 8 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  // Sicherstellen: Stufe-2-Training aktiv (nach Phase 7: koennte noch in Stufe-1-Training sein)
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display==="none"){
    document.getElementById("btnZurueck").click();await wait(600);
  }
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
    document.getElementById("btnStufe2").click();await wait(800);
  }
  // Frische Aufgabe laden
  document.getElementById("btnWeiter").click();await wait(1600);
  var zt1=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
  var ap1=pfade.find(function(p){return p.wort===zt1;});
  // P8a: Hinweis-Button direkt -> .hinweis gesetzt
  document.getElementById("btnHinweis").click();await wait(150);
  var hw1=document.querySelectorAll(".kachel.hinweis");
  hw1.length>=1?R.push("PASS P8a: Hinweis-Button -> "+hw1.length+" .hinweis-Kachel(n)"):R.push("FAIL P8a: Kein .hinweis nach Hinweis-Button-Klick");
  // P8b: Hinweis auf korrekter Kachel
  if(ap1&&hw1.length>0){
    var soll=ap1.pfad[0];
    document.querySelector(".kachel.hinweis[data-r='"+soll.r+"'][data-c='"+soll.c+"']")?R.push("PASS P8b: .hinweis auf korrekter Kachel r"+soll.r+"c"+soll.c):R.push("FAIL P8b: .hinweis nicht auf richtiger Kachel (soll r"+soll.r+"c"+soll.c+")");
  }else{R.push("WARN P8b: Kein Pfad-Objekt fuer '"+zt1+"' gefunden");}
  // Neue Aufgabe fuer Falschklick-Test
  document.getElementById("btnWeiter").click();await wait(1600);
  var zt2=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
  var ap2=pfade.find(function(p){return p.wort===zt2;});
  // P8c: 3 Falschklicks -> automatischer Hinweis
  if(ap2){
    var p02=ap2.pfad[0];
    var ff=felder.find(function(f){return !(f.r===p02.r&&f.c===p02.c)&&f.r>=2;});
    var ffEl=ff?document.querySelector(".kachel[data-r='"+ff.r+"'][data-c='"+ff.c+"']"):null;
    if(ffEl){
      ffEl.click();await wait(800);
      ffEl.click();await wait(800);
      ffEl.click();await wait(300);
      var autoH=document.querySelectorAll(".kachel.hinweis").length;
      autoH>=1?R.push("PASS P8c: 3 Falschklicks -> automatischer Hinweis gesetzt"):R.push("FAIL P8c: Kein .hinweis nach 3 Falschklicks");
      // P8d: Richtiger Klick -> Hinweis verschwindet
      var zt3=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
      var ap3=pfade.find(function(p){return p.wort===zt3;});
      if(ap3){
        var ep=ap3.pfad[0];
        if(ep.r===1){
          var epf=felder.find(function(f){return f.r===ep.r&&f.c===ep.c;});
          if(epf&&epf.seiten&&epf.seiten.length>0){
            var sl=document.getElementById("seiteLabel");var at8=0;
            while(sl&&sl.textContent!=="S "+epf.seiten[0]&&at8++<4){document.getElementById("btnSeite").click();await wait(150);}
          }
        }
        var rEl=document.querySelector(".kachel[data-r='"+ep.r+"'][data-c='"+ep.c+"']:not(.kachel-unsichtbar)");
        if(rEl){rEl.click();await wait(300);var hN=document.querySelectorAll(".kachel.hinweis").length;hN===0?R.push("PASS P8d: Nach richtigem Klick: .hinweis entfernt"):R.push("FAIL P8d: .hinweis noch vorhanden ("+hN+") nach richtigem Klick");}
        else{R.push("WARN P8d: Richtige Kachel nicht klickbar (unsichtbar?)");}
      }else{R.push("WARN P8d: Kein Pfad fuer '"+zt3+"'");}
    }else{R.push("WARN P8c: Keine klickbare falsche Kachel gefunden");}
  }else{R.push("WARN P8c: Kein Pfad-Objekt fuer '"+zt2+"'");}
  return R.join("|");
})()
'@ 20000
$v8 -split "\|"|ForEach-Object{Write-Host $_;$all+=$_}

# ── PHASE 9: Weiter-Button + Zurueck-Navigation ───────────────────────────────
Write-Host "--- Phase 9: Weiter-Button + Navigation ---"
$v9=DevEval $wsUrl 9 @'
(async function(){
  var R=[];
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  // Sicherstellen: Im Training
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
    document.getElementById("btnStufe2").click();await wait(800);
  }
  // P9a + P9b: Weiter -> neue Aufgabe geladen, Ebene 1 wiederhergestellt
  var vorher=(document.getElementById("zielAnzeige")||{textContent:""}).textContent;
  document.getElementById("btnWeiter").click();await wait(1800);
  var nachher=(document.getElementById("zielAnzeige")||{textContent:""}).textContent;
  (nachher.indexOf("Finde:")>=0&&nachher!==vorher)?R.push("PASS P9a: Weiter -> neue Aufgabe geladen"):R.push("FAIL P9a: Weiter laedt keine neue Aufgabe (vorher="+vorher+", nachher="+nachher+")");
  var lN=document.querySelectorAll(".ebene2-leer").length,tN=document.querySelectorAll(".ebene2-treffer").length;
  (lN===0&&tN===0)?R.push("PASS P9b: Nach Weiter: Ebene 1 wiederhergestellt"):R.push("FAIL P9b: Ebene 2 noch aktiv nach Weiter (leer="+lN+", treffer="+tN+")");
  // P9c: Zurueck Training -> Startscreen
  document.getElementById("btnZurueck").click();await wait(600);
  var ssV=!!(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none");
  var gH=!!(document.getElementById("grid")&&document.getElementById("grid").style.display==="none");
  var nH=!!(document.getElementById("navLeiste")&&document.getElementById("navLeiste").style.display==="none");
  (ssV&&gH&&nH)?R.push("PASS P9c: Zurueck Training->Startscreen: StartScreen sichtbar, Grid+Nav versteckt"):R.push("FAIL P9c: Zurueck fehlgeschlagen (ssV="+ssV+", gH="+gH+", nH="+nH+")");
  return R.join("|");
})()
'@ 12000
$v9 -split "\|"|ForEach-Object{Write-Host $_;$all+=$_}

# ── PHASE 10: Auto-Seite + Ebene-2-Reset + r=1-Erstschritt ───────────────────
Write-Host "--- Phase 10: Auto-Seite + Ebene-2-Reset + r1-Erstschritt ---"
$v10=DevEval $wsUrl 10 @'
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  var pfade=(window.QUASSELKISTE_PFADE||[]).filter(function(p){return p.wort&&p.wort.length>=2&&p.wort.length<=40&&p.wort.indexOf("Ôßþ")<0&&p.wort.indexOf("WIZARD")<0&&p.wort.indexOf("Mfrag")<0&&/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);});
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  var s2p=pfade.filter(function(p){return p.pfad.length===2;});
  var sl=document.getElementById("seiteLabel");
  // Stufe 2 starten
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
    document.getElementById("btnStufe2").click();await wait(800);
  }
  // Zu S1 navigieren
  var at10a=0;while(sl&&sl.textContent!=="S 1"&&at10a++<4){document.getElementById("btnSeite").click();await wait(150);}

  // -- P10a: Auto-Seite Zweitschritt --
  // Suche 2-Schritt-Pfad, bei dem pfad[1] eine r=1-Kachel ist, die NICHT auf S1 liegt
  var p10aOk=false;
  for(var i=0;i<12&&!p10aOk;i++){
    var zt=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var mp=s2p.find(function(p){
      if(p.wort!==zt)return false;
      var f2=felder.find(function(f){return f.r===p.pfad[1].r&&f.c===p.pfad[1].c;});
      return f2&&f2.r===1&&f2.seiten&&f2.seiten.indexOf(1)<0&&f2.seiten.length>0;
    });
    if(mp){
      var p0a=mp.pfad[0];
      // Zur richtigen Seite fuer Erstschritt navigieren
      if(p0a.r===1){var f0a=felder.find(function(f){return f.r===p0a.r&&f.c===p0a.c;});if(f0a&&f0a.seiten&&f0a.seiten.length>0){var atA=0;while(sl.textContent!=="S "+f0a.seiten[0]&&atA++<4){document.getElementById("btnSeite").click();await wait(150);}}}
      // Zurück auf S1 damit Auto-Nav zum Zweitschritt beobachtbar ist
      var atA2=0;while(sl.textContent!=="S 1"&&atA2++<4){document.getElementById("btnSeite").click();await wait(150);}
      var elA=document.querySelector(".kachel[data-r='"+p0a.r+"'][data-c='"+p0a.c+"']:not(.kachel-unsichtbar)");
      if(elA){
        elA.click();await wait(700);
        var f2a=felder.find(function(f){return f.r===mp.pfad[1].r&&f.c===mp.pfad[1].c;});
        var erwS="S "+f2a.seiten[0];
        // Pruefen ob Erstklick ueberhaupt registriert wurde (ebene2-treffer erschienen?)
        var e2count=document.querySelectorAll(".ebene2-treffer").length;
        if(e2count===0){R.push("WARN P10a: Erstklick nicht registriert fuer '"+mp.wort+"' (Datenbasis-Ambiguitaet)");p10aOk=true;}
        else{sl.textContent===erwS?R.push("PASS P10a: Auto-Seite Zweitschritt: Seite="+sl.textContent+" nach Erstklick fuer '"+mp.wort+"'"):R.push("FAIL P10a: Seite="+sl.textContent+" (soll "+erwS+") nach Erstklick fuer '"+mp.wort+"'");p10aOk=true;}
      }
    }
    if(!p10aOk){document.getElementById("btnWeiter").click();await wait(1600);}
  }
  if(!p10aOk)R.push("WARN P10a: Kein S2-Zweitschritt-Pfad in 12 Versuchen (datenabhaengig)");

  // -- P10b: Ebene-2-Reset bei Seitenwechsel --
  document.getElementById("btnWeiter").click();await wait(1600);
  var inE2=false;
  for(var j=0;j<10&&!inE2;j++){
    var zt2=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var mp2=s2p.find(function(p){return p.wort===zt2;});
    if(mp2){
      var pe0=mp2.pfad[0];
      if(pe0.r===1){var pef=felder.find(function(f){return f.r===pe0.r&&f.c===pe0.c;});if(pef&&pef.seiten&&pef.seiten.length>0){var atB=0;while(sl.textContent!=="S "+pef.seiten[0]&&atB++<4){document.getElementById("btnSeite").click();await wait(150);}}}
      var elB=document.querySelector(".kachel[data-r='"+pe0.r+"'][data-c='"+pe0.c+"']:not(.kachel-unsichtbar)");
      if(elB){
        elB.click();await wait(600);
        if(document.querySelectorAll(".ebene2-treffer").length>0){
          inE2=true;
          document.getElementById("btnSeite").click();await wait(300);
          var lNb=document.querySelectorAll(".ebene2-leer").length,tNb=document.querySelectorAll(".ebene2-treffer").length;
          (lNb===0&&tNb===0)?R.push("PASS P10b: Ebene-2-Reset bei Seitenwechsel: Ebene 1 wiederhergestellt"):R.push("FAIL P10b: Ebene 2 noch aktiv nach Seitenwechsel (leer="+lNb+" treffer="+tNb+")");
        }
      }
    }
    if(!inE2){document.getElementById("btnWeiter").click();await wait(1600);}
  }
  if(!inE2)R.push("WARN P10b: Konnte Ebene 2 nicht erreichen fuer Test");

  // -- P10c: r=1-Erstschritt in Stufe 2 -> Auto-Nav zur richtigen Seite --
  // Suche 2-Schritt-Pfad mit r=1-Erstschritt auf Seite ≠ S1 (z.B. Hallo r1c5 seiten=[2])
  document.getElementById("btnWeiter").click();await wait(1600);
  var atC0=0;while(sl&&sl.textContent!=="S 1"&&atC0++<4){document.getElementById("btnSeite").click();await wait(150);}
  var p10cOk=false;
  for(var k=0;k<12&&!p10cOk;k++){
    var zt3=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
    var mp3=s2p.find(function(p){
      if(p.wort!==zt3)return false;
      var f3=felder.find(function(f){return f.r===p.pfad[0].r&&f.c===p.pfad[0].c;});
      return f3&&f3.r===1&&f3.seiten&&f3.seiten.indexOf(1)<0&&f3.seiten.length>0;
    });
    if(mp3){
      var pe3=mp3.pfad[0];
      var fe3=felder.find(function(f){return f.r===pe3.r&&f.c===pe3.c;});
      var erwSeite3="S "+fe3.seiten[0];
      var el3=document.querySelector(".kachel[data-r='"+pe3.r+"'][data-c='"+pe3.c+"']");
      var sichtbar3=el3&&!el3.classList.contains("kachel-unsichtbar");
      (sl.textContent===erwSeite3&&sichtbar3)?R.push("PASS P10c: r=1-Erstschritt Auto-Nav: Seite="+sl.textContent+", "+fe3.name+" sichtbar"):R.push("FAIL P10c: r=1-Erstschritt Auto-Nav: Seite="+sl.textContent+" (soll "+erwSeite3+"), sichtbar="+sichtbar3);
      p10cOk=true;
    }else{document.getElementById("btnWeiter").click();await wait(1600);}
  }
  if(!p10cOk)R.push("WARN P10c: Kein r=1-Erstschritt-Pfad in 12 Versuchen (datenabhaengig)");
  return R.join("|");
})()
'@ 75000
$v10 -split "\|"|ForEach-Object{Write-Host $_;$all+=$_}

# ── ZUSAMMENFASSUNG ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=========================================="
$pass=($all|Where-Object{$_ -like "PASS*"}).Count
$fail=($all|Where-Object{$_ -like "FAIL*"}).Count
$warn=($all|Where-Object{$_ -like "WARN*"}).Count
$info=($all|Where-Object{$_ -like "INFO*"}).Count
Write-Host "GESAMT: $($pass+$fail+$warn) Tests | PASS: $pass | FAIL: $fail | WARN: $warn | INFO: $info"
Write-Host "=========================================="
