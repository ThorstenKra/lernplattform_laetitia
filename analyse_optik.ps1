# analyse_optik.ps1 -- Quasselkiste: Visuelle Optik-Analyse
#
# Geprueft werden (automatisch, je Kachel):
#   A. PNG-Ebene     -- Dimension, Hintergrundfarbe, Icon-Praesenz
#   B. Browser-Ebene -- Reihenverhaeltnis, Spaltenbreiten, Bild-Ladestatus,
#                       Hintergrundfarbe (computed), Beschriftungstext, Seiten-Sichtbarkeit
#   C. Ebene-2       -- Treffer-Kacheln, gedimmte Kacheln, Labels
#
# Ausgabe: sectionweise Uebersichten + Abweichungstabelle (alle Abweichungen sortiert)

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Web.Extensions

$root     = $PSScriptRoot
$tileDir  = Join-Path $root "app\modules\quasselkiste\tiles"
$dataJs   = Join-Path $root "app\modules\quasselkiste\data\quasselkiste_data.js"
$trainRel = "app\modules\quasselkiste\quasselkiste_training.html"
$trainUrl = "file:///" + (Join-Path $root $trainRel).Replace("\", "/")

# -- Erwartete Tile-Hoehen aus Originalvermessung (189 px Breite immer) ----------
$EXP_H = @{}
for($rr=1;$rr-le 6;$rr++){
  for($cc=1;$cc-le 10;$cc++){
    if     ($rr-eq 1 -and $cc-le 8){ $h=214 }
    elseif (($rr-eq 2 -or $rr-eq 4) -and $cc-le 8){ $h=116 }
    elseif ($rr-eq 5 -and $cc-le 8){ $h=79 }
    else   { $h=121 }
    $EXP_H["${rr}_${cc}"] = $h
  }
}
$EXP_W     = 189
$BG_TOL    = 40       # Max Farbabweichung (0-255 pro Kanal)
$ICON_THR  = 0.04     # Min Anteil Nicht-BG-Pixel fuer "Icon erkennbar"
$RATIO_SOLL = [double](214.0 / 121.0)  # 1.769 -- Reihe-1-zu-Inhalt-Verhaeltnis
$RATIO_TOL  = 0.08    # +/- 8% Toleranz

# ── Hilfsfunktionen ────────────────────────────────────────────────────────────
function HexToRgb([string]$h){
  $h=$h.TrimStart("#")
  [int[]]@([Convert]::ToInt32($h.Substring(0,2),16),[Convert]::ToInt32($h.Substring(2,2),16),[Convert]::ToInt32($h.Substring(4,2),16))
}
function RgbToHex([int[]]$a){ if(!$a){"?"}else{"#{0:X2}{1:X2}{2:X2}"-f$a[0],$a[1],$a[2]} }
function CssToRgb([string]$css){
  if($css -match "rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)"){
    [int[]]@([int]$Matches[1],[int]$Matches[2],[int]$Matches[3])
  }else{$null}
}
function MaxDiff($a,$b){
  if(!$a -or !$b){return 999}
  [Math]::Max([Math]::Abs($a[0]-$b[0]),[Math]::Max([Math]::Abs($a[1]-$b[1]),[Math]::Abs($a[2]-$b[2])))
}

function PngBg([string]$path){
  try{
    $bytes=[System.IO.File]::ReadAllBytes($path)
    $ms=New-Object System.IO.MemoryStream(,$bytes)
    $bmp=New-Object System.Drawing.Bitmap($ms)
    $w=$bmp.Width;$h=$bmp.Height
    $mg=[Math]::Max(2,[int]([Math]::Min($w,$h)/6))
    $x1=$mg;$y1=$mg;$x2=$w-1-$mg;$y2=$h-1-$mg
    $rS=0;$gS=0;$bS=0;$n=0
    try{$px=$bmp.GetPixel($x1,$y1);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x2,$y1);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x1,$y2);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x2,$y2);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    $bmp.Dispose();$ms.Dispose()
    if($n-gt 0){[int[]]@([int]($rS/$n),[int]($gS/$n),[int]($bS/$n))}else{$null}
  }catch{$null}
}

function IconPct([string]$path,[int]$tileR){
  # Anteil Nicht-BG-Pixel im Icon-Bereich (subsampeld step=3), gibt -1.0 bei Fehler
  try{
    $bytes=[System.IO.File]::ReadAllBytes($path)
    $ms=New-Object System.IO.MemoryStream(,$bytes)
    $bmp=New-Object System.Drawing.Bitmap($ms)
    $w=$bmp.Width;$h=$bmp.Height
    $mg=[Math]::Max(2,[int]([Math]::Min($w,$h)/6))
    $x1=$mg;$y1=$mg;$x2=$w-1-$mg;$y2=$h-1-$mg
    $rS=0;$gS=0;$bS=0;$n=0
    try{$px=$bmp.GetPixel($x1,$y1);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x2,$y1);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x1,$y2);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    try{$px=$bmp.GetPixel($x2,$y2);if($px.A-gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$n++}}catch{}
    if($n-eq 0){$bmp.Dispose();$ms.Dispose();return 0.0}
    $bgR=[int]($rS/$n);$bgG=[int]($gS/$n);$bgB=[int]($bS/$n)
    # Icon-Bereich: Mitte des Tiles (Zeilen 12-78%, Spalten 18-82%)
    # Bei r1: nur untere Haelfte (Screenshot oben)
    $yS=if($tileR-eq 1){[int]($h*0.52)}else{[int]($h*0.12)}
    $yE=[int]($h*0.78)
    $xS=[int]($w*0.18);$xE=[int]($w*0.82)
    $tot=0;$nonBg=0;$step=3
    for($y=$yS;$y-lt $yE;$y+=$step){
      for($x=$xS;$x-lt $xE;$x+=$step){
        $tot++
        try{
          $px=$bmp.GetPixel($x,$y)
          if($px.A-gt 100){
            $diff=[Math]::Max([Math]::Abs($px.R-$bgR),[Math]::Max([Math]::Abs($px.G-$bgG),[Math]::Abs($px.B-$bgB)))
            if($diff-gt 35){$nonBg++}
          }
        }catch{}
      }
    }
    $bmp.Dispose();$ms.Dispose()
    if($tot-eq 0){0.0}else{[double]$nonBg/$tot}
  }catch{-1.0}
}

function DevEval([string]$wsUrl,[int]$id,[string]$expr,[int]$ms=8000){
  $ws=[System.Net.WebSockets.ClientWebSocket]::new()
  $cts=[System.Threading.CancellationTokenSource]::new($ms+4000)
  $ws.ConnectAsync([uri]$wsUrl,$cts.Token).Wait()
  $ser=[System.Web.Script.Serialization.JavaScriptSerializer]::new()
  $ser.MaxJsonLength=5242880   # 5 MB
  $payload=[System.Text.Encoding]::UTF8.GetBytes('{"id":'+$id+',"method":"Runtime.evaluate","params":{"expression":'+$ser.Serialize($expr)+',"awaitPromise":true,"timeout":'+$ms+'}}')
  $ws.SendAsync([ArraySegment[byte]]$payload,[System.Net.WebSockets.WebSocketMessageType]::Text,$true,$cts.Token).Wait()
  $all=[System.Collections.Generic.List[byte]]::new()
  $buf=New-Object byte[] 131072
  do{
    $res=$ws.ReceiveAsync([ArraySegment[byte]]$buf,$cts.Token).GetAwaiter().GetResult()
    for($i=0;$i-lt$res.Count;$i++){$all.Add($buf[$i])}
  }while(!$res.EndOfMessage)
  $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure,"",$cts.Token).Wait()
  $json=[System.Text.Encoding]::UTF8.GetString($all.ToArray())|ConvertFrom-Json
  return $json.result.result.value
}

# ── 1. DATA.JS PARSEN ──────────────────────────────────────────────────────────
$raw = Get-Content $dataJs -Raw -Encoding UTF8
$pat = '\{r:(\d+),\s*c:\s*(\d+),\s*name:"([^"]*)",\s*bg:"([^"]+)"(?:[^}]*seiten:\[([^\]]*)\])?'
$dataMatches = [regex]::Matches($raw, $pat)
$tileData = @{}
foreach($m in $dataMatches){
  $r=[int]$m.Groups[1].Value;$c=[int]$m.Groups[2].Value
  $seiten = @()
  if($m.Groups[5].Value.Trim()){
    $seiten = ($m.Groups[5].Value.Trim() -split ",") | ForEach-Object{ [int]$_.Trim() }
  }
  $tileData["${r}_${c}"] = [PSCustomObject]@{
    R=$r; C=$c; Name=$m.Groups[3].Value; Bg=$m.Groups[4].Value; Seiten=$seiten
  }
}
if($tileData.Count -ne 60){ Write-Host "WARNUNG: $($tileData.Count) Felder in data.js (soll 60)" }

# ── 2. PNG-ANALYSE ─────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================================"
Write-Host "  QUASSELKISTE -- VISUELLE OPTIK-ANALYSE"
Write-Host "================================================================"
Write-Host ""
Write-Host "TEIL A: PNG-ANALYSE (60 Tile-Bilder)"
Write-Host "──────────────────────────────────────"
Write-Host ""

$pngData = @{}
$deviations = [System.Collections.Generic.List[object]]::new()

foreach($key in $tileData.Keys){
  $td=$tileData[$key];$r=$td.R;$c=$td.C
  $path = Join-Path $tileDir "tile_r${r}c${c}.png"
  $expH = $EXP_H["${r}_${c}"]
  $expW = $EXP_W

  if(-not (Test-Path $path)){
    $pngData[$key]=[PSCustomObject]@{R=$r;C=$c;W=0;H=0;BgRgb=$null;IconPct=-1;Status="FEHLT"}
    $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="PNG-Datei";Ist="FEHLT";Soll="vorhanden";Diff="--";Quelle="PNG";Schwere="ERR"})
    continue
  }
  $fs=(Get-Item $path).Length
  if($fs -lt 100){
    $pngData[$key]=[PSCustomObject]@{R=$r;C=$c;W=0;H=0;BgRgb=$null;IconPct=-1;Status="LEER"}
    $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="PNG-Datei";Ist="<100 Byte";Soll="normal";Diff="--";Quelle="PNG";Schwere="ERR"})
    continue
  }

  # PNG laden
  try{
    $bytes=[System.IO.File]::ReadAllBytes($path)
    $ms=New-Object System.IO.MemoryStream(,$bytes)
    $bmp=New-Object System.Drawing.Bitmap($ms)
    $W=$bmp.Width;$H=$bmp.Height
    $bmp.Dispose();$ms.Dispose()
  }catch{
    $pngData[$key]=[PSCustomObject]@{R=$r;C=$c;W=0;H=0;BgRgb=$null;IconPct=-1;Status="LADEFEHLER"}
    continue
  }

  # BG-Farbe
  $bgRgb = PngBg $path
  $bgHex = RgbToHex $bgRgb
  $dataRgb = HexToRgb $td.Bg
  $bgDiff = MaxDiff $bgRgb $dataRgb

  # Icon-Praesenz
  $iconPct = IconPct $path $r

  # Abmessungen pruefen
  $wOk = [Math]::Abs($W - $expW) -le 2
  $hOk = [Math]::Abs($H - $expH) -le 5
  if(-not $wOk){
    $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="PNG Breite";Ist="${W}px";Soll="${expW}px";Diff="$([Math]::Abs($W-$expW))px";Quelle="PNG";Schwere=if([Math]::Abs($W-$expW)-gt 10){"ERR"}else{"WRN"}})
  }
  if(-not $hOk){
    $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="PNG Hoehe";Ist="${H}px";Soll="${expH}px";Diff="$([Math]::Abs($H-$expH))px";Quelle="PNG";Schwere=if([Math]::Abs($H-$expH)-gt 20){"ERR"}else{"WRN"}})
  }

  # BG-Farbe pruefen
  if($bgDiff -gt $BG_TOL){
    $sv = if($bgDiff-gt 100){"ERR"}else{"WRN"}
    $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="PNG Hintergrundfarbe";Ist=$bgHex;Soll=$td.Bg;Diff="d${bgDiff}";Quelle="PNG";Schwere=$sv})
  }

  # Icon-Praesenz pruefen
  if($iconPct -ge 0 -and $iconPct -lt $ICON_THR){
    # r1c10 ist bekannt leer -- kein Icon erwartet
    if(-not ($r-eq 1 -and $c-eq 10)){
      $pct = [int]($iconPct*100)
      $deviations.Add([PSCustomObject]@{Pos="r${r}c${c}";Name=$td.Name;Kriterium="Icon-Praesenz";Ist="${pct}%";Soll=">4%";Diff="-";Quelle="PNG";Schwere="WRN"})
    }
  }

  $pngData[$key]=[PSCustomObject]@{
    R=$r;C=$c;W=$W;H=$H;ExpH=$expH;BgRgb=$bgRgb;BgHex=$bgHex
    BgDiff=$bgDiff;IconPct=$iconPct;Status="OK"
  }
}

# A1: Dimensionen-Uebersicht
Write-Host "A1. Tile-Dimensionen (Soll: r1c1-c8=214h, r2c1-c8/r4c1-c8=116h, r5c1-c8=79h, sonst 121h, alle 189w)"
Write-Host ""
$dimHeader = "     "; 1..10 | ForEach-Object{ $dimHeader += ("c$_").PadRight(7) }
Write-Host $dimHeader
for($rr=1;$rr-le 6;$rr++){
  $line = "r$rr   "
  for($cc=1;$cc-le 10;$cc++){
    $p = $pngData["${rr}_${cc}"]
    if($p -and $p.Status -eq "OK"){
      $hOk = [Math]::Abs($p.H - $p.ExpH) -le 5
      $sym = if($hOk){"$($p.W)x$($p.H)"}else{"!$($p.W)x$($p.H)"}
      $line += $sym.PadRight(7)
    }else{
      $st=if($p){$p.Status}else{"??"}; $line += $st.PadRight(7)
    }
  }
  Write-Host $line
}

Write-Host ""
Write-Host "A2. Hintergrundfarbe PNG (BG-Abweichung > d$BG_TOL = Markierung)"
Write-Host ""
$bgHeader = "     "; 1..10 | ForEach-Object{ $bgHeader += ("c$_").PadRight(7) }
Write-Host $bgHeader
for($rr=1;$rr-le 6;$rr++){
  $line = "r$rr   "
  for($cc=1;$cc-le 10;$cc++){
    $p=$pngData["${rr}_${cc}"]
    if($p -and $p.Status -eq "OK"){
      $sym = if($p.BgDiff -le $BG_TOL){"[OK]"}else{"!BG!"}
      $line += $sym.PadRight(7)
    }else{ $line += "FHLT   " }
  }
  Write-Host $line
}

Write-Host ""
Write-Host "A3. Icon-Praesenz (>4% Nicht-BG-Pixel im Kernbereich)"
Write-Host ""
$icHeader = "     "; 1..10 | ForEach-Object{ $icHeader += ("c$_").PadRight(7) }
Write-Host $icHeader
for($rr=1;$rr-le 6;$rr++){
  $line = "r$rr   "
  for($cc=1;$cc-le 10;$cc++){
    $p=$pngData["${rr}_${cc}"]
    if($p -and $p.Status -eq "OK"){
      $pct=[int]($p.IconPct*100)
      $sym = if($p.IconPct -lt 0){"ERR"}elseif($p.IconPct -ge $ICON_THR){"${pct}%"}else{"!${pct}%!"}
      $line += $sym.PadRight(7)
    }else{ $line += "----   " }
  }
  Write-Host $line
}

# ── 3. EDGE/CDP STARTEN ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "TEIL B: BROWSER-RENDERING (Edge CDP)"
Write-Host "──────────────────────────────────────"
Write-Host ""

$tabs = $null
try{ $tabs = Invoke-RestMethod "http://localhost:9222/json" -TimeoutSec 3 -ErrorAction Stop }catch{}

if(-not $tabs){
  Write-Host "Edge nicht auf Port 9222 -- starte Edge..."
  $edgeExe = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
  if(-not (Test-Path $edgeExe)){ $edgeExe = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
  Start-Process $edgeExe -ArgumentList "--remote-debugging-port=9222","--new-window","`"$trainUrl`""
  Write-Host "Warte 5 Sekunden..."
  Start-Sleep -Seconds 5
  try{ $tabs = Invoke-RestMethod "http://localhost:9222/json" -TimeoutSec 5 -ErrorAction Stop }catch{
    Write-Host "FEHLER: CDP nicht erreichbar. Browser-Analyse uebersprungen."
    $tabs = $null
  }
}

$wsUrl = $null
if($tabs){
  $trainTab = $tabs | Where-Object{ $_.url -like "*quasselkiste_training*" } | Select-Object -First 1
  if(-not $trainTab){
    Write-Host "Training-Seite nicht offen -- navigiere..."
    $anyTab = $tabs | Where-Object{ $_.type -eq "page" } | Select-Object -First 1
    if($anyTab){
      $wsUrl = $anyTab.webSocketDebuggerUrl
      DevEval $wsUrl 0 "window.location.href='$trainUrl'" 5000 | Out-Null
      Start-Sleep -Seconds 3
      try{ $tabs2 = Invoke-RestMethod "http://localhost:9222/json" -ErrorAction Stop
           $trainTab = $tabs2 | Where-Object{ $_.url -like "*quasselkiste_training*" } | Select-Object -First 1 }catch{}
    }
  }
  if($trainTab){ $wsUrl = $trainTab.webSocketDebuggerUrl }
}

if(-not $wsUrl){
  Write-Host "FEHLER: Konnte Training-Seite nicht erreichen. Browser-Analyse uebersprungen."
} else {

  # ── B. DOM-Analyse ─────────────────────────────────────────────────────────
  Write-Host "Hole Tile-Daten via CDP..."
  $domJson = DevEval $wsUrl 10 @'
(async function(){
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  // Stufe 1 starten falls noch auf Startscreen
  var ss=document.getElementById("startScreen");
  if(ss && ss.style.display!=="none"){
    document.getElementById("btnStufe1").click();
    await wait(900);
  }
  // Sicherstellen: Seite 1
  var sl=document.getElementById("seiteLabel");
  var att=0;
  while(sl && sl.textContent!=="S 1" && att++<4){
    document.getElementById("btnSeite").click();
    await wait(200);
  }
  // Alle 60 Kacheln auslesen
  var tiles=Array.from(document.querySelectorAll(".kachel"));
  var result=tiles.map(function(el){
    var r=parseInt(el.getAttribute("data-r"));
    var c=parseInt(el.getAttribute("data-c"));
    var rect=el.getBoundingClientRect();
    var cs=window.getComputedStyle(el);
    var img=el.querySelector(".kachel-img");
    var nameEl=el.querySelector(".kachel-name");
    var unsichtbar=el.classList.contains("kachel-unsichtbar");
    var ubg=unsichtbar?window.getComputedStyle(el).backgroundColor:"";
    return {
      r:r, c:c,
      w:Math.round(rect.width*10)/10,
      h:Math.round(rect.height*10)/10,
      bgComputed:cs.backgroundColor,
      bgInline:el.style.background,
      fontSize:cs.fontSize,
      imgSrc:img?(img.src.split("/").pop()):"",
      imgLoaded:img?(img.naturalWidth>0):false,
      imgNatW:img?img.naturalWidth:0,
      imgNatH:img?img.naturalHeight:0,
      label:nameEl?nameEl.textContent.trim():"",
      labelVisible:nameEl?(window.getComputedStyle(nameEl).display!=="none"):false,
      unsichtbar:unsichtbar,
      unsichtbarBg:ubg
    };
  });
  // Grid-Dimensionen
  var grid=document.getElementById("grid");
  var gridRect=grid?grid.getBoundingClientRect():{width:0,height:0};
  return JSON.stringify({tiles:result, gridW:Math.round(gridRect.width), gridH:Math.round(gridRect.height)});
})()
'@ 12000

  if(-not $domJson){
    Write-Host "FEHLER: Keine DOM-Daten erhalten."
  } else {
    $domRaw = $domJson | ConvertFrom-Json
    $domTiles = @{}
    foreach($dt in $domRaw.tiles){ $domTiles["$($dt.r)_$($dt.c)"] = $dt }

    Write-Host "Grid: $($domRaw.gridW) x $($domRaw.gridH) px | $($domRaw.tiles.Count) Kacheln"
    Write-Host ""

    # B1: Reihen-Proportionen
    Write-Host "B1. Reihen-Proportionen (Soll: r1 ~1.769x hoeher als r2-r6)"
    $r1Heights = @(); $r2to6Heights = @()
    foreach($dt in $domRaw.tiles){
      if($dt.r-eq 1){ $r1Heights += $dt.h }
      else{ $r2to6Heights += $dt.h }
    }
    $avgR1 = ($r1Heights | Measure-Object -Average).Average
    $avgR2to6 = ($r2to6Heights | Measure-Object -Average).Average
    $actualRatio = if($avgR2to6 -gt 0){[Math]::Round($avgR1/$avgR2to6,3)}else{0}
    $ratioDiff = [Math]::Abs($actualRatio - $RATIO_SOLL)
    $ratioOk = $ratioDiff -le $RATIO_TOL
    Write-Host ("  r1 avg H:     {0:F1} px" -f $avgR1)
    Write-Host ("  r2-r6 avg H:  {0:F1} px" -f $avgR2to6)
    Write-Host ("  Verhaeltnis:  {0:F3}  (Soll: {1:F3} +/-{2})" -f $actualRatio, $RATIO_SOLL, $RATIO_TOL)
    $ratioStatus=if($ratioOk){"OK"}else{"ABWEICHUNG"}; Write-Host "  Status:       $ratioStatus"
    if(-not $ratioOk){
      $deviations.Add([PSCustomObject]@{Pos="GRID";Name="(alle)";Kriterium="Reihen-Verhaeltnis r1:r2-6";Ist=("{0:F3}"-f $actualRatio);Soll=("{0:F3}"-f$RATIO_SOLL);Diff=("{0:F3}"-f$ratioDiff);Quelle="Browser";Schwere="WRN"})
    }

    # Einzelne Reihen-Hoehen
    Write-Host ""
    Write-Host ("  Einzelne Reihenhoehen (r1-r6, gemessen an c1):")
    for($rr=1;$rr-le 6;$rr++){
      $dt=$domTiles["${rr}_1"]
      if($dt){ Write-Host ("    r{0}: {1:F1} px" -f $rr,$dt.h) }
    }

    # B2: Spaltenbreiten
    Write-Host ""
    Write-Host "B2. Spalten-Einheitlichkeit (alle 10 Spalten sollen gleich breit sein)"
    $colWidths = @()
    for($cc=1;$cc-le 10;$cc++){
      $dt=$domTiles["2_${cc}"]
      if($dt){ $colWidths += $dt.w }
    }
    if($colWidths.Count-gt 0){
      $minW=($colWidths|Measure-Object -Minimum).Minimum
      $maxW=($colWidths|Measure-Object -Maximum).Maximum
      $avgW=($colWidths|Measure-Object -Average).Average
      $spreadW=[Math]::Round($maxW-$minW,1)
      Write-Host ("  Breiten: min={0:F1} max={1:F1} avg={2:F1} Streuung={3:F1}px" -f $minW,$maxW,$avgW,$spreadW)
      if($spreadW -gt 3){
        $deviations.Add([PSCustomObject]@{Pos="GRID";Name="(alle)";Kriterium="Spaltenbreite-Einheitlichkeit";Ist="${spreadW}px Streuung";Soll="<=3px";Diff="${spreadW}px";Quelle="Browser";Schwere="WRN"})
      }else{ Write-Host "  Status: OK" }
    }

    # B3: Bild-Ladestatus
    Write-Host ""
    Write-Host "B3. Bild-Ladestatus (naturalWidth > 0 = geladen)"
    $imgOk=0;$imgFail=0;$imgFailList=@()
    foreach($dt in $domRaw.tiles){
      if($dt.imgLoaded){$imgOk++}else{
        $imgFail++
        $imgFailList += "r$($dt.r)c$($dt.c)"
        $td=$tileData["$($dt.r)_$($dt.c)"]
        $n=if($td){$td.Name}else{"?"}
        $sv = if($dt.r-eq 1 -and $dt.c-eq 10){"HIN"}else{"ERR"}  # r1c10 leer = erwartet
        $deviations.Add([PSCustomObject]@{Pos="r$($dt.r)c$($dt.c)";Name=$n;Kriterium="Bild nicht geladen";Ist="naturalWidth=0";Soll=">0";Diff="--";Quelle="Browser";Schwere=$sv})
      }
    }
    Write-Host ("  Geladen: $imgOk/60  |  Fehler: $imgFail")
    if($imgFail-gt 0){ Write-Host ("  Nicht geladen: " + ($imgFailList -join ", ")) }

    # B3b: naturalWidth/naturalHeight vs PNG-Dimensionen
    Write-Host ""
    Write-Host "B3b. Bild-Dimensionen (naturalWidth x naturalHeight vs. PNG-Dimensionen)"
    $dimMismatch=0
    foreach($dt in $domRaw.tiles){
      if(-not $dt.imgLoaded){ continue }
      $p=$pngData["$($dt.r)_$($dt.c)"]
      if(-not $p -or $p.Status-ne "OK"){ continue }
      $wDiff=[Math]::Abs($dt.imgNatW - $p.W)
      $hDiff=[Math]::Abs($dt.imgNatH - $p.H)
      if($wDiff -gt 2 -or $hDiff -gt 2){
        $dimMismatch++
        $td=$tileData["$($dt.r)_$($dt.c)"]
        $n=if($td){$td.Name}else{"?"}
        $deviations.Add([PSCustomObject]@{
          Pos="r$($dt.r)c$($dt.c)";Name=$n;Kriterium="Bild-Dimension"
          Ist="$($dt.imgNatW)x$($dt.imgNatH)";Soll="$($p.W)x$($p.H)";Diff="dW=$wDiff dH=$hDiff"
          Quelle="Browser";Schwere="WRN"
        })
      }
    }
    if($dimMismatch-eq 0){ Write-Host "  Alle geladenen Bilder: naturalSize stimmt mit PNG-Groesse ueberein. OK" }
    else{ Write-Host "  $dimMismatch Abweichungen (siehe Abweichungstabelle)" }

    # B4: Hintergrundfarben (computed vs data.js)
    Write-Host ""
    Write-Host "B4. Hintergrundfarbe Browser (computed) vs. data.js (Toleranz d<=$BG_TOL)"
    $bgOk=0;$bgFail=0
    foreach($dt in $domRaw.tiles){
      $td=$tileData["$($dt.r)_$($dt.c)"]
      if(-not $td){ continue }
      $dataRgb=HexToRgb $td.Bg
      $cssRgb=CssToRgb $dt.bgComputed
      $diff=MaxDiff $dataRgb $cssRgb
      if($diff -le $BG_TOL){ $bgOk++ }else{
        $bgFail++
        $cssHex=RgbToHex $cssRgb
        $sv=if($diff-gt 100){"ERR"}else{"WRN"}
        $deviations.Add([PSCustomObject]@{
          Pos="r$($dt.r)c$($dt.c)";Name=$td.Name;Kriterium="Browser BG-Farbe"
          Ist=$cssHex;Soll=$td.Bg;Diff="d$diff"
          Quelle="Browser";Schwere=$sv
        })
      }
    }
    Write-Host "  Korrekt: $bgOk/60  |  Abweichung: $bgFail/60"

    # B5: Beschriftungstext (kachel-name) -- im Normalzustand Ebene 1 versteckt?
    Write-Host ""
    Write-Host "B5. Beschriftungen (Ebene 1: kachel-name soll versteckt sein)"
    $lblHidden=0;$lblVisible=0
    foreach($dt in $domRaw.tiles){
      if($dt.labelVisible){
        $lblVisible++
        $td=$tileData["$($dt.r)_$($dt.c)"]
        $n=if($td){$td.Name}else{"?"}
        $deviations.Add([PSCustomObject]@{Pos="r$($dt.r)c$($dt.c)";Name=$n;Kriterium="Label sichtbar (Ebene 1)";Ist="sichtbar";Soll="versteckt";Diff="--";Quelle="Browser";Schwere="WRN"})
      }else{$lblHidden++}
    }
    Write-Host "  Versteckt: $lblHidden/60  |  Unerwartet sichtbar: $lblVisible/60"

    # B6: Schriftgroesse
    Write-Host ""
    Write-Host "B6. Schriftgroesse (kachel-name, CSS clamp(9px,1.1vw,14px))"
    $fontSizes = $domRaw.tiles | ForEach-Object{ $_.fontSize } | Sort-Object -Unique
    Write-Host "  Vorkommende Schriftgroessen: $($fontSizes -join ', ')"

    # B7: kachel-unsichtbar Background-Check (soll weiss sein, nicht dunkel)
    Write-Host ""
    Write-Host "B7. Versteckte Kacheln (kachel-unsichtbar): Hintergrund soll weiss sein"
    $uOk=0;$uFail=0
    foreach($dt in $domRaw.tiles){
      if(-not $dt.unsichtbar){ continue }
      $cssRgb=CssToRgb $dt.unsichtbarBg
      if($cssRgb){
        $brightness=($cssRgb[0]+$cssRgb[1]+$cssRgb[2])/3
        if($brightness -lt 200){
          $uFail++
          $td=$tileData["$($dt.r)_$($dt.c)"]
          $n=if($td){$td.Name}else{"?"}
          $deviations.Add([PSCustomObject]@{Pos="r$($dt.r)c$($dt.c)";Name=$n;Kriterium="Versteckte Kachel dunkel";Ist=$dt.unsichtbarBg;Soll="weiss (~#ffffff)";Diff="Helligkeit=$([int]$brightness)";Quelle="Browser";Schwere="WRN"})
        }else{$uOk++}
      }
    }
    $uTotal=$uOk+$uFail
    if($uTotal-eq 0){ Write-Host "  Keine versteckten Kacheln auf Seite 1 gefunden." }
    else{ Write-Host "  Weiss: $uOk/$uTotal  |  Dunkel: $uFail/$uTotal" }

    # ── C. SEITEN-SICHTBARKEIT ──────────────────────────────────────────────
    Write-Host ""
    Write-Host "TEIL C: SEITEN-SICHTBARKEIT (r1-Kacheln auf S1/S2/S3)"
    Write-Host "──────────────────────────────────────────────────────"
    Write-Host ""

    $seitenJson = DevEval $wsUrl 20 @'
(async function(){
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  var sl=document.getElementById("seiteLabel");
  var felder=window.QUASSELKISTE_FELDER||[];
  var r1=felder.filter(function(f){return f.r===1;});
  function sichtbarkeit(){
    return r1.map(function(f){
      var el=document.querySelector(".kachel[data-r='1'][data-c='"+f.c+"']");
      return {c:f.c,name:f.name,vis:el?!el.classList.contains("kachel-unsichtbar"):false};
    });
  }
  // Zu S1
  var att=0;while(sl&&sl.textContent!=="S 1"&&att++<4){document.getElementById("btnSeite").click();await wait(200);}
  var s1=sichtbarkeit();
  // S2
  document.getElementById("btnSeite").click();await wait(350);
  var s2=sichtbarkeit();
  // S3
  document.getElementById("btnSeite").click();await wait(350);
  var s3=sichtbarkeit();
  // Zurueck zu S1
  document.getElementById("btnSeite").click();await wait(200);
  return JSON.stringify({s1:s1,s2:s2,s3:s3});
})()
'@ 10000

    if($seitenJson){
      $seitenData=$seitenJson|ConvertFrom-Json
      foreach($seite in @("s1","s2","s3")){
        $sNr=if($seite-eq "s1"){1}elseif($seite-eq "s2"){2}else{3}
        $sdata=$seitenData.$seite
        $vis=($sdata|Where-Object{$_.vis}|ForEach-Object{"$($_.name)(c$($_.c))"}) -join ", "
        $hid=($sdata|Where-Object{-not $_.vis}|ForEach-Object{"$($_.name)(c$($_.c))"}) -join ", "
        Write-Host "  S${sNr} sichtbar: $vis"
        Write-Host "  S${sNr} versteckt: $hid"
        Write-Host ""
        # Soll-Ist-Vergleich
        foreach($item in $sdata){
          $td=$tileData["1_$($item.c)"]
          if(-not $td){ continue }
          $sollVis = if($td.Seiten.Count-eq 0){$false}else{$td.Seiten -contains $sNr}
          if($item.vis -ne $sollVis){
            $deviations.Add([PSCustomObject]@{
              Pos="r1c$($item.c)";Name=$item.name;Kriterium="Seiten-Sichtbarkeit S${sNr}"
              Ist=if($item.vis){"sichtbar"}else{"versteckt"};Soll=if($sollVis){"sichtbar"}else{"versteckt"}
              Diff="--";Quelle="Browser";Schwere="ERR"
            })
          }
        }
      }
    }else{ Write-Host "  FEHLER: Seiten-Daten nicht abrufbar." }

    # ── D. EBENE-2-SPOT-CHECK ───────────────────────────────────────────────
    Write-Host "TEIL D: EBENE-2-SPOT-CHECK"
    Write-Host "───────────────────────────"
    Write-Host ""

    $e2Json = DevEval $wsUrl 30 @'
(async function(){
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  // 1. Stufe 2 starten (Ebene-2 nur in Stufe 2 aktiv)
  var ss=document.getElementById("startScreen");
  if(ss && ss.style.display!=="none"){
    document.getElementById("btnStufe2").click(); await wait(900);
  } else {
    document.getElementById("btnZurueck").click(); await wait(500);
    document.getElementById("btnStufe2").click(); await wait(900);
  }
  // 2. Aufgabe suchen deren Erstschritt in r2-r6 liegt (immer sichtbar, keine Seite noetig)
  var testErst=null; var testWort=null;
  for(var attempt=0; attempt<30&&!testErst; attempt++){
    var raw=((document.getElementById("zielAnzeige")||{}).textContent||"").trim();
    var wort=raw.replace(/^Finde:\s*/,"");
    var pfad=(window.QUASSELKISTE_PFADE||[]).find(function(p){
      return p.wort===wort&&p.pfad.length===2&&p.pfad[0].r>=2;
    });
    if(pfad){ testErst=pfad.pfad[0]; testWort=wort; }
    else { document.getElementById("btnWeiter").click(); await wait(450); }
  }
  if(!testErst){return JSON.stringify({err:"Kein passender Erstschritt gefunden (30 Versuche)"});}
  // 3. Erstschritt klicken
  var el=document.querySelector(".kachel[data-r='"+testErst.r+"'][data-c='"+testErst.c+"']");
  if(!el){return JSON.stringify({err:"Element nicht gefunden: r"+testErst.r+"c"+testErst.c});}
  el.click(); await wait(700);
  // 4. Ebene-2-Zustand pruefen
  var treffer=Array.from(document.querySelectorAll(".kachel.ebene2-treffer")).map(function(e){
    return {r:parseInt(e.getAttribute("data-r")),c:parseInt(e.getAttribute("data-c")),
            label:e.querySelector(".kachel-name")?e.querySelector(".kachel-name").textContent:"",
            labelVis:e.querySelector(".kachel-name")?window.getComputedStyle(e.querySelector(".kachel-name")).display!=="none":false};
  });
  var leer=document.querySelectorAll(".kachel.ebene2-leer").length;
  var richtig=document.querySelectorAll(".kachel.richtig").length;
  // Soll-Treffer: alle 2-Schritt-Pfade mit demselben Erstschritt
  var sollTreffer={};
  (window.QUASSELKISTE_PFADE||[]).forEach(function(p){
    if(p.pfad.length===2&&p.pfad[0].r===testErst.r&&p.pfad[0].c===testErst.c){
      sollTreffer[p.pfad[1].r+"_"+p.pfad[1].c]=true;
    }
  });
  // Zuruecksetzen
  document.getElementById("btnWeiter").click(); await wait(400);
  return JSON.stringify({
    wort:testWort,erstschritt:"r"+testErst.r+"c"+testErst.c,
    trifferAnzahl:treffer.length,leerAnzahl:leer,richtig:richtig,
    sollTrefferAnzahl:Object.keys(sollTreffer).length,treffer:treffer
  });
})()
'@ 14000

    if($e2Json){
      $e2=$e2Json|ConvertFrom-Json
      if($e2.err){
        Write-Host "  WARN: $($e2.err)"
      }else{
        Write-Host "  Wort:                     $($e2.wort)"
        Write-Host "  Erstschritt: $($e2.erstschritt)"
        Write-Host "  Treffer (ebene2-treffer): $($e2.trifferAnzahl) (Soll: $($e2.sollTrefferAnzahl))"
        Write-Host "  Gedimmt (ebene2-leer):    $($e2.leerAnzahl)"
        Write-Host "  .richtig-Kacheln:         $($e2.richtig)"
        # Treffer-Labels pruefen
        $labelsOk=($e2.treffer|Where-Object{$_.labelVis}).Count
        Write-Host "  Labels sichtbar:          $labelsOk/$($e2.trifferAnzahl)"
        if($e2.trifferAnzahl -ne $e2.sollTrefferAnzahl){
          $deviations.Add([PSCustomObject]@{Pos=$e2.erstschritt;Name="(Ebene-2)";Kriterium="Treffer-Anzahl Ebene 2";Ist=$e2.trifferAnzahl;Soll=$e2.sollTrefferAnzahl;Diff="$([Math]::Abs($e2.trifferAnzahl-$e2.sollTrefferAnzahl))";Quelle="Browser";Schwere="ERR"})
        }
        $missingLabels=$e2.trifferAnzahl-$labelsOk
        if($missingLabels-gt 0){
          $deviations.Add([PSCustomObject]@{Pos=$e2.erstschritt;Name="(Ebene-2)";Kriterium="Treffer-Labels fehlen";Ist="$labelsOk/$($e2.trifferAnzahl) sichtbar";Soll="alle sichtbar";Diff="$missingLabels";Quelle="Browser";Schwere="WRN"})
        }
      }
    }else{ Write-Host "  FEHLER: Ebene-2-Daten nicht abrufbar." }
  } # end if $wsUrl
}  # end if $tabs

# ── ABWEICHUNGSTABELLE ─────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================================"
Write-Host "  ABWEICHUNGSTABELLE"
Write-Host "================================================================"

if($deviations.Count -eq 0){
  Write-Host ""
  Write-Host "  Keine Abweichungen gefunden. Alle Kriterien erfuellt."
}else{
  $sortiert = $deviations | Sort-Object { switch($_.Schwere){"ERR"{0}"WRN"{1}default{2}} },Pos
  Write-Host ("{0,-8} {1,-13} {2,-28} {3,-14} {4,-14} {5,-7} {6,-8} {7}" -f "Pos","Name","Kriterium","Ist","Soll","Diff","Quelle","Schwere")
  Write-Host ("-"*108)
  foreach($d in $sortiert){
    $nameD=if($d.Name.Length-gt 13){$d.Name.Substring(0,12)+"."}else{$d.Name}
    $kr=if($d.Kriterium.Length-gt 28){$d.Kriterium.Substring(0,27)+"."}else{$d.Kriterium}
    Write-Host ("{0,-8} {1,-13} {2,-28} {3,-14} {4,-14} {5,-7} {6,-8} {7}" -f $d.Pos,$nameD,$kr,$d.Ist,$d.Soll,$d.Diff,$d.Quelle,$d.Schwere)
  }
}

Write-Host ""
$err=($deviations|Where-Object{$_.Schwere-eq "ERR"}).Count
$wrn=($deviations|Where-Object{$_.Schwere-eq "WRN"}).Count
$hin=($deviations|Where-Object{$_.Schwere-eq "HIN"}).Count
Write-Host ("  Gesamt: $($deviations.Count) Abweichungen  |  ERR: $err  WRN: $wrn  HIN: $hin")
Write-Host "================================================================"

# Temp-Datei aufraumen
$tmp=Join-Path $root "_dim_check.ps1"
if(Test-Path $tmp){ Remove-Item $tmp }
