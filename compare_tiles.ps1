# compare_tiles.ps1 -- Quasselkiste Kacheln: Abgleich data.js vs. tile-Bilder
Add-Type -AssemblyName System.Drawing

$tileDir  = Join-Path $PSScriptRoot "app\modules\quasselkiste\tiles"
$dataFile = Join-Path $PSScriptRoot "app\modules\quasselkiste\data\quasselkiste_data.js"

$raw = Get-Content $dataFile -Raw -Encoding UTF8
$pattern = '\{r:(\d+),\s*c:\s*(\d+),\s*name:"([^"]*)",\s*bg:"([^"]+)"(?:[^}]*seiten:\[([^\]]*)\])?'
$felderMatches = [regex]::Matches($raw, $pattern)

if($felderMatches.Count -ne 60){
  Write-Host "WARNUNG: $($felderMatches.Count) Felder in data.js gefunden (erwartet 60)"
}

function HexToRgb($hex){
  $h = $hex.TrimStart("#")
  return @([Convert]::ToInt32($h.Substring(0,2),16),
           [Convert]::ToInt32($h.Substring(2,2),16),
           [Convert]::ToInt32($h.Substring(4,2),16))
}

$results = [System.Collections.Generic.List[object]]::new()

foreach($m in $felderMatches){
  $r    = [int]$m.Groups[1].Value
  $c    = [int]$m.Groups[2].Value
  $name = $m.Groups[3].Value
  $bg   = $m.Groups[4].Value
  $seiten = $m.Groups[5].Value

  $tilePath = Join-Path $tileDir "tile_r${r}c${c}.png"
  $status  = "OK"
  $dimStr  = "---"
  $bgImg   = "---"
  $diffStr = "---"
  $info    = ""

  if(-not (Test-Path $tilePath)){
    $status = "FEHLT"
  } else {
    $fileSize = (Get-Item $tilePath).Length
    if($fileSize -lt 100){
      $status = "LEER"
    } else {
      try {
        # Via MemoryStream laden — umgeht Datei-Sperre und Pixel-Format-Probleme
        $bytes = [System.IO.File]::ReadAllBytes($tilePath)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $bmp = New-Object System.Drawing.Bitmap($ms)
        $w = $bmp.Width; $h = $bmp.Height
        $dimStr = ($w.ToString() + "x" + $h.ToString())

        $margin = [Math]::Max(2, [int]([Math]::Min($w,$h) / 6))
        $x1 = $margin
        $y1 = $margin
        $x2 = $w - 1 - $margin
        $y2 = $h - 1 - $margin
        $rS=0; $gS=0; $bS=0; $cnt=0
        try{ $px=$bmp.GetPixel($x1,$y1); if($px.A -gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$cnt++} }catch{}
        try{ $px=$bmp.GetPixel($x2,$y1); if($px.A -gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$cnt++} }catch{}
        try{ $px=$bmp.GetPixel($x1,$y2); if($px.A -gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$cnt++} }catch{}
        try{ $px=$bmp.GetPixel($x2,$y2); if($px.A -gt 200){$rS+=$px.R;$gS+=$px.G;$bS+=$px.B;$cnt++} }catch{}

        if($cnt -gt 0){
          $avgR=[int]($rS/$cnt); $avgG=[int]($gS/$cnt); $avgB=[int]($bS/$cnt)
          $bgImg = "#" + ("{0:X2}{1:X2}{2:X2}" -f $avgR,$avgG,$avgB)

          $dataRgb = HexToRgb $bg
          $dR=[Math]::Abs($avgR-$dataRgb[0])
          $dG=[Math]::Abs($avgG-$dataRgb[1])
          $dB=[Math]::Abs($avgB-$dataRgb[2])
          $maxDiff = [Math]::Max($dR,[Math]::Max($dG,$dB))
          $diffStr = "d" + $maxDiff.ToString()

          if($maxDiff -gt 40){ $status = "BG-ABWEICHUNG" }
        } else {
          $bgImg = "transparent"; $status = "TRANSPARENT"
        }

        if($w -lt 20 -or $h -lt 20){ $status = "ZU-KLEIN" }
        $bmp.Dispose()
        $ms.Dispose()
      } catch {
        $status = "LADEFEHLER"
        $info = $_.Exception.Message
        if($info.Length -gt 50){ $info = $info.Substring(0,50) }
      }
    }
  }

  $results.Add([PSCustomObject]@{
    Pos=$("r${r}c${c}"); R=$r; C=$c; Name=$name
    BgData=$bg; BgImg=$bgImg; Diff=$diffStr; Dim=$dimStr
    Seiten=$seiten; Status=$status; Info=$info
  })
}

Write-Host ""
Write-Host "================================================================"
Write-Host "  QUASSELKISTE KACHELN -- ABGLEICH data.js vs. tile-Bilder"
Write-Host "================================================================"
Write-Host ""

# Grid-Uebersicht
Write-Host "-- Grid-Uebersicht --"
$header = "     "
1..10 | ForEach-Object { $header += (" c" + $_.ToString().PadRight(4)) }
Write-Host $header
for($row=1; $row -le 6; $row++){
  $line = "r" + $row + "   "
  for($col=1; $col -le 10; $col++){
    $e = $results | Where-Object { $_.R -eq $row -and $_.C -eq $col }
    if($e){
      $sym = switch($e.Status){
        "OK"            { " [OK] " }
        "FEHLT"         { " FHLT " }
        "LEER"          { " LEER " }
        "TRANSPARENT"   { " TRSP " }
        "BG-ABWEICHUNG" { " ~BG~ " }
        "LADEFEHLER"    { " ERR! " }
        default         { " ??   " }
      }
      $line += $sym
    } else { $line += " ---  " }
  }
  Write-Host $line
}
Write-Host ""

# Detailtabelle
Write-Host "-- Detailtabelle --"
Write-Host ("{0,-8} {1,-13} {2,-9} {3,-9} {4,-6} {5,-9} {6}" -f "Pos","Name","Data-BG","Tile-BG","Diff","Dim","Status")
Write-Host ("-" * 75)
foreach($e in ($results | Sort-Object R,C)){
  $nameDisp = if($e.Name -eq "") {"(leer)"} else {$e.Name}
  Write-Host ("{0,-8} {1,-13} {2,-9} {3,-9} {4,-6} {5,-9} {6}" -f `
    $e.Pos, $nameDisp, $e.BgData, $e.BgImg, $e.Diff, $e.Dim, $e.Status)
  if($e.Info){ Write-Host ("         -> " + $e.Info) }
}

Write-Host ""

# Dimensionen
$dims = $results | Where-Object { $_.Dim -ne "---" } | Group-Object Dim | Sort-Object Count -Descending
Write-Host ("Bild-Dimensionen: " + (($dims | ForEach-Object { $_.Name + " (" + $_.Count + "x)" }) -join ", "))
Write-Host ""

$okCount  = ($results | Where-Object { $_.Status -eq "OK" }).Count
$bgAbw    = ($results | Where-Object { $_.Status -eq "BG-ABWEICHUNG" }).Count
$transp   = ($results | Where-Object { $_.Status -eq "TRANSPARENT" }).Count
$fehltCnt = ($results | Where-Object { $_.Status -eq "FEHLT" }).Count

Write-Host ("OK              : " + $okCount)
Write-Host ("BG-Abweichung   : " + $bgAbw + "  (Toleranz d>40)")
Write-Host ("Transparent     : " + $transp)
Write-Host ("Fehlt           : " + $fehltCnt)
Write-Host ""

if($bgAbw -gt 0){
  Write-Host "-- BG-Abweichungen im Detail --"
  foreach($e in ($results | Where-Object { $_.Status -eq "BG-ABWEICHUNG" } | Sort-Object R,C)){
    Write-Host ("  " + $e.Pos + " '" + $e.Name + "': data=" + $e.BgData + "  tile=" + $e.BgImg + "  " + $e.Diff)
  }
  Write-Host ""
}
if($transp -gt 0){
  Write-Host "-- Transparente Eckpixel --"
  foreach($e in ($results | Where-Object { $_.Status -eq "TRANSPARENT" } | Sort-Object R,C)){
    Write-Host ("  " + $e.Pos + " '" + $e.Name + "': " + $e.Dim)
  }
  Write-Host ""
}

$gesamtStatus = if($fehltCnt -gt 0){ "ERR -- " + $fehltCnt + " Tiles fehlen" } `
  elseif($bgAbw -gt 0 -or $transp -gt 0){ "WRN -- Abweichungen gefunden" } `
  else { "OK -- Alle 60 Tiles korrekt" }
Write-Host "================================================================"
Write-Host ("  Gesamt: " + $gesamtStatus)
Write-Host "================================================================"
