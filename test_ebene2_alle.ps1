# test_ebene2_alle.ps1 -- Ebene-2-Test fuer alle Erstschritte (Stufe 2)
# Voraussetzung: Chrome mit --remote-debugging-port=9222
#                Quasselkiste-Training-Tab offen

Add-Type -AssemblyName System.Web.Extensions

function DevEval($wsUrl, $id, $expr, $ms=8000){
    $ws  = [System.Net.WebSockets.ClientWebSocket]::new()
    $tok = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync([uri]$wsUrl, $tok).Wait()
    $ser = [System.Web.Script.Serialization.JavaScriptSerializer]::new()
    $req = '{"id":' + $id + ',"method":"Runtime.evaluate","params":{"expression":' `
         + $ser.Serialize($expr) + ',"awaitPromise":true,"timeout":' + $ms + '}}'
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($req)
    $ws.SendAsync([ArraySegment[byte]]$bytes,
        [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $tok).Wait()
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
if (!$tabs) { Write-Host "FEHLER: Chrome nicht erreichbar (Port 9222)."; exit 1 }
$tab = ($tabs | Where-Object { $_.url -like "*quasselkiste_training*" })
if (!$tab) { Write-Host "FEHLER: Quasselkiste-Training-Tab nicht gefunden."; exit 1 }
$wsUrl = [string]($tab[0].webSocketDebuggerUrl)

Write-Host "================================================================"
Write-Host "  EBENE-2-TEST: ALLE ERSTSCHRITTE"
Write-Host "================================================================"
Write-Host ""
Write-Host "Tab: $($tab[0].url)"
Write-Host "Laeuft -- max. 800 Iterationen, ca. 2-3 Minuten ..."
Write-Host ""

$js = @'
(async function(){
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}

  // 1. Stufe 2 starten
  var ss=document.getElementById("startScreen");
  if(ss&&ss.style.display!=="none"){
    document.getElementById("btnStufe2").click(); await wait(900);
  } else {
    document.getElementById("btnZurueck").click(); await wait(500);
    document.getElementById("btnStufe2").click(); await wait(900);
  }

  // 2. Erstschritt-Map aufbauen -- exakt derselbe Filter wie Training-Modul
  function wortOk(w){
    return w&&w.length>=2&&w.length<=40&&
           w.indexOf("WIZARD")<0&&w.indexOf("Mfrag")<0&&
           /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(w);
  }
  var allP2=(window.QUASSELKISTE_PFADE||[]).filter(function(p){
    return p.pfad&&p.pfad.length===2&&wortOk(p.wort);
  });
  // erstMap: "r_c" -> {r,c,soll:{},n}
  var erstMap={};
  allP2.forEach(function(p){
    var k=p.pfad[0].r+"_"+p.pfad[0].c;
    if(!erstMap[k]){erstMap[k]={r:p.pfad[0].r,c:p.pfad[0].c,soll:{},n:0};}
    erstMap[k].soll[p.pfad[1].r+"_"+p.pfad[1].c]=true;
    erstMap[k].n++;
  });
  // wortMap: wort -> Liste moeglicher Erstschritt-Keys
  var wortMap={};
  allP2.forEach(function(p){
    if(!wortMap[p.wort])wortMap[p.wort]=[];
    var k=p.pfad[0].r+"_"+p.pfad[0].c;
    if(wortMap[p.wort].indexOf(k)<0)wortMap[p.wort].push(k);
  });
  var totalErst=Object.keys(erstMap).length;

  // 3. Hauptschleife
  // Strategie: klicke den ersten ungetesteten Erstschritt fuer das aktuelle Wort.
  // Wenn Ebene-2 nicht oeffnet (falscher Klick), Iteration verwerfen + weiter.
  // So werden schrittweise alle Erstschritte gefunden ohne btnHinweis.
  var tested={};
  var results=[];
  var MAX=800;
  var iter=0;

  for(; iter<MAX && Object.keys(tested).length<totalErst; iter++){
    var raw2=((document.getElementById("zielAnzeige")||{}).textContent||"").trim();
    var wort=raw2.replace(/^Finde:\s*/,"");

    var keys=wortMap[wort];
    if(!keys||keys.length===0){
      document.getElementById("btnWeiter").click(); await wait(110); continue;
    }
    // Alle Erstschritte dieses Worts schon getestet?
    if(keys.every(function(k){return !!tested[k];})){
      document.getElementById("btnWeiter").click(); await wait(110); continue;
    }

    // Ersten ungetesteten Erstschritt suchen
    var ek=null;
    for(var ki=0;ki<keys.length;ki++){
      if(!tested[keys[ki]]){ek=keys[ki];break;}
    }
    if(!ek){ document.getElementById("btnWeiter").click(); await wait(110); continue; }

    var parts=ek.split("_");
    var eR=parseInt(parts[0]); var eC=parseInt(parts[1]);
    var el=document.querySelector(".kachel[data-r='"+eR+"'][data-c='"+eC+"']");
    if(!el||el.classList.contains("kachel-unsichtbar")){
      // Kachel nicht sichtbar (falsche Seite) -- uebernaechstes Mal wieder versuchen
      document.getElementById("btnWeiter").click(); await wait(110); continue;
    }

    el.click(); await wait(700);

    var treffer=document.querySelectorAll(".kachel.ebene2-treffer").length;
    var leer=document.querySelectorAll(".kachel.ebene2-leer").length;

    if(treffer===0&&leer===0){
      // Klick war falsch (Training hatte anderen Erstschritt erwartet) -- nicht markieren
      document.getElementById("btnWeiter").click(); await wait(400); continue;
    }

    // Ebene-2 hat geoeffnet -- Ergebnis aufzeichnen
    var labVis=Array.from(document.querySelectorAll(".kachel.ebene2-treffer .kachel-name"))
      .filter(function(n){return window.getComputedStyle(n).display!=="none";}).length;
    var soll=erstMap[ek]?Object.keys(erstMap[ek].soll).length:0;

    tested[ek]=true;
    results.push({
      r:eR,c:eC,wort:wort,treffer:treffer,soll:soll,
      leer:leer,labVis:labVis,n:erstMap[ek]?erstMap[ek].n:0,
      ok:(treffer===soll&&labVis===treffer)
    });

    document.getElementById("btnWeiter").click(); await wait(400);
  }

  var untested=Object.keys(erstMap)
    .filter(function(k){return !tested[k];})
    .map(function(k){return {r:erstMap[k].r,c:erstMap[k].c,n:erstMap[k].n};});

  return JSON.stringify({
    totalErst:totalErst,
    testedCount:Object.keys(tested).length,
    iterations:iter,
    results:results,
    untested:untested
  });
})()
'@

$raw = DevEval $wsUrl 21 $js 300000

if (!$raw) { Write-Host "FEHLER: Keine Antwort vom Browser."; exit 1 }

$data = $raw | ConvertFrom-Json

Write-Host "Iterationen:   $($data.iterations)"
Write-Host "Erstschritte:  $($data.testedCount) / $($data.totalErst) getestet"
Write-Host ""

$sorted = $data.results | Sort-Object { if (!$_.ok) { 0 } else { 1 } }, r, c
$hdr = ("Pos".PadRight(7)) + ("Wort".PadRight(20)) +
       ("Tref".PadRight(6)) + ("Soll".PadRight(6)) +
       ("Leer".PadRight(6)) + ("Lab".PadRight(7)) +
       ("Pfade".PadRight(7)) + "Status"
Write-Host $hdr
Write-Host ("-" * 70)
$okCount = 0; $failCount = 0

foreach ($row in $sorted) {
    $pos = ("r" + $row.r + "c" + $row.c).PadRight(7)
    $w   = [string]$row.wort; if ($w.Length -gt 19) { $w = $w.Substring(0,19) }
    $lab = "$($row.labVis)/$($row.treffer)"
    if ($row.ok) { $status = "OK"; $okCount++ } else { $status = "ABWEICHUNG"; $failCount++ }
    $line = $pos + $w.PadRight(20) +
            ([string]$row.treffer).PadRight(6) + ([string]$row.soll).PadRight(6) +
            ([string]$row.leer).PadRight(6) + $lab.PadRight(7) +
            ([string]$row.n).PadRight(7) + $status
    Write-Host $line
}
Write-Host ("-" * 70)
Write-Host "OK: $okCount   ABWEICHUNG: $failCount"

if ($data.untested.Count -gt 0) {
    Write-Host ""
    Write-Host "Nicht getestet ($($data.untested.Count)) -- nicht in $($data.iterations) Iterationen erschienen:"
    foreach ($u in $data.untested | Sort-Object r, c) {
        Write-Host ("  r" + $u.r + "c" + $u.c + "  (" + $u.n + " Pfade)")
    }
}
Write-Host ""
Write-Host "Fertig."
