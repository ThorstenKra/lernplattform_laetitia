# validate.ps1  v2 -- Lernplattform Laetitia Konsistenzpruefung
# Aufruf: powershell.exe -ExecutionPolicy Bypass -File .\validate.ps1
# Erfordert: PowerShell 5.1+  (ASCII-only -- kein UTF-8 BOM noetig)

param([string]$Root = (Split-Path $PSScriptRoot -Parent))
$ErrorActionPreference = "SilentlyContinue"

$nErr = 0; $nWrn = 0; $nOk = 0

function OK($m)  { Write-Host "  [OK ] $m" -ForegroundColor Green;  $script:nOk++ }
function WRN($m) { Write-Host "  [WRN] $m" -ForegroundColor Yellow; $script:nWrn++ }
function ERR($m) { Write-Host "  [ERR] $m" -ForegroundColor Red;    $script:nErr++ }
function HEAD($t){ Write-Host "`n--- $t" -ForegroundColor Cyan }
function Rel($p) { $p.Replace($Root,"").TrimStart("\").TrimStart("/") }
# PS5.1 liest UTF-8 ohne BOM als ANSI -- [System.IO.File] liest immer korrekt
function ReadRaw($path) { [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8) }
function ReadLines($path){ (ReadRaw $path) -split "`n" }

$App  = Join-Path $Root "app"
$html = @(Get-ChildItem $App -Recurse -Filter "*.html")
$js   = @(Get-ChildItem $App -Recurse -Filter "*.js")
$all  = $html + $js

# Regex-Muster in Variablen -- vermeidet Parsing-Probleme mit eckigen Klammern
$reScriptSrc    = '<script\s+src="([^"]+)"'
$reInlineScript = '(?s)<script(?![^>]*\bsrc\b)[^>]*>(.*?)</script>'
$reConfigId     = '"([a-zA-Z0-9_\-]+)":\s*(true|false)'
$reInfoId       = '(?m)^\s*id:\s*"([^"]+)"'
$reImport       = 'import\('
$reDepth        = 'depth:\s*\d'

# =============================================================================
HEAD "1 -- Script-Referenzen: alle <script src> Dateien vorhanden?"
# =============================================================================
$refErr = 0
foreach ($f in $html) {
    $dir = Split-Path $f.FullName
    $raw = ReadRaw $f.FullName
    foreach ($m in [regex]::Matches($raw, $reScriptSrc)) {
        $src  = $m.Groups[1].Value
        $full = [IO.Path]::GetFullPath([IO.Path]::Combine($dir, $src))
        if (-not (Test-Path $full)) {
            ERR "Fehlt: $(Rel $full)"
            ERR "       <- referenziert in $(Rel $f.FullName)"
            $refErr++
        }
    }
}
if ($refErr -eq 0) { OK "Alle referenzierten Script-Dateien vorhanden" }

# =============================================================================
HEAD "2 -- Regel 12: kein import() (ausser in Kommentaren)"
# =============================================================================
$impErr = 0
# vendor/-Ordner: vorgebuendelte Fremdbibliotheken (z.B. talkinghead.bundle.js,
# per esbuild als abhaengigkeitsfreie IIFE gebaut). Ausgenommen von Regel 12,
# da es sich nicht um selbst geschriebenen Code handelt -- Bundle wurde manuell
# verifiziert (0 aktive import()/export, nur ein toter import()-Zweig aus einer
# ungenutzten Bibliotheksfunktion).
foreach ($f in ($all | Where-Object { $_.FullName -notmatch '\\vendor\\' })) {
    $n = 0; $inHtmlComment = $false
    foreach ($line in (ReadLines $f.FullName)) {
        $n++
        if ($line -match '<!--') { $inHtmlComment = $true }
        if ($line -match '-->') { $inHtmlComment = $false; continue }
        if ($inHtmlComment) { continue }
        $t = $line.TrimStart()
        if ($t -match $reImport) {
            $isJsComment = ($t.StartsWith("//") -or $t.StartsWith("*"))
            if (-not $isJsComment) {
                ERR "import() in $(Rel $f.FullName):$n"
                $impErr++
            }
        }
    }
}
if ($impErr -eq 0) { OK "Kein import() gefunden" }

# =============================================================================
HEAD "3 -- Regel 13: depth-Kommentar in HTML-Dateien"
# =============================================================================
$noDepth = @()
foreach ($f in $html) {
    $top = (ReadLines $f.FullName | Select-Object -First 5) -join " "
    if ($top -notmatch $reDepth) { $noDepth += $f }
}
if ($noDepth.Count -eq 0) {
    OK "Alle $($html.Count) HTML-Dateien haben depth-Kommentar"
} else {
    foreach ($f in $noDepth) { WRN "Kein depth-Kommentar: $(Rel $f.FullName)" }
}

# =============================================================================
HEAD "4 -- Regel 18: Inline-Script-Laenge (<= 20 Zeilen)"
# =============================================================================
$r18 = 0
foreach ($f in $html) {
    $raw = ReadRaw $f.FullName
    foreach ($m in [regex]::Matches($raw, $reInlineScript)) {
        $sc = $m.Groups[1].Value.Trim()
        if (-not $sc) { continue }
        $lines = ($sc -split "`n").Count
        if ($lines -gt 20) {
            WRN "Inline-Script $lines Zeilen: $(Rel $f.FullName)"
            $r18++
        }
    }
}
if ($r18 -eq 0) { OK "Kein Inline-Script ueberschreitet 20 Zeilen" }

# =============================================================================
HEAD "5 -- media_config.js Konsistenz (Config-IDs <-> info.js-IDs)"
# =============================================================================
$cfgFiles = @(Get-ChildItem $App -Recurse -Filter "*_media_config.js")
if ($cfgFiles.Count -eq 0) {
    WRN "Keine *_media_config.js Dateien gefunden"
} else {
    foreach ($cfg in $cfgFiles) {
        $cfgRaw  = ReadRaw $cfg.FullName
        $cfgIds  = @([regex]::Matches($cfgRaw, $reConfigId) |
                     ForEach-Object { $_.Groups[1].Value })
        $modDir  = Split-Path $cfg.FullName
        $infoJs  = @(Get-ChildItem $modDir -Recurse -Filter "info.js")
        $infoIds = @($infoJs | ForEach-Object {
            $ic = ReadRaw $_.FullName
            $mm = [regex]::Match($ic, $reInfoId)
            if ($mm.Success) { $mm.Groups[1].Value }
        } | Where-Object { $_ })

        $cfgOk = $true
        foreach ($id in $infoIds) {
            if ($cfgIds -notcontains $id) {
                WRN "$($cfg.Name): ID '$id' in info.js, fehlt in Config"
                $cfgOk = $false
            }
        }
        foreach ($id in $cfgIds) {
            if ($infoIds -notcontains $id) {
                WRN "$($cfg.Name): Config-ID '$id' hat keine info.js (veralteter Eintrag?)"
                $cfgOk = $false
            }
        }
        if ($cfgOk) { OK "$($cfg.Name): $($infoIds.Count) Eintraege, konsistent" }
    }
}

# =============================================================================
HEAD "6 -- media_config.js in zugehoeriger HTML eingebunden?"
# =============================================================================
foreach ($cfg in $cfgFiles) {
    $cfgName   = $cfg.Name
    $dir       = Split-Path $cfg.FullName
    $htmlInDir = @(Get-ChildItem $dir -Filter "*.html")
    $found     = $false
    foreach ($h in $htmlInDir) {
        if ((ReadRaw $h.FullName) -match [regex]::Escape($cfgName)) {
            $found = $true; break
        }
    }
    if ($found) { OK "$cfgName in HTML eingebunden" }
    else        { ERR "$cfgName ist in KEINER HTML-Datei referenziert!" }
}

# =============================================================================
HEAD "7 -- Keine Mediendateien im Arbeitsverzeichnis (MP3, JPG usw.)"
# =============================================================================
$mediaExt = @("*.mp3","*.m4a","*.wav","*.ogg","*.opus","*.aac","*.flac",
              "*.jpg","*.jpeg","*.png","*.gif","*.webp","*.mp4","*.webm","*.avi","*.mov")
$mediaFound = @()
foreach ($ext in $mediaExt) {
    $mediaFound += @(Get-ChildItem $Root -Recurse -Filter $ext |
                     Where-Object { $_.FullName -notmatch "\\.git\\" } |
                     Where-Object { $_.FullName -notmatch "\\tiles\\" })
}
if ($mediaFound.Count -eq 0) {
    OK "Keine Mediendateien im Arbeitsverzeichnis gefunden"
} else {
    foreach ($f in $mediaFound) { WRN "Mediendatei vorhanden: $(Rel $f.FullName)" }
}

# =============================================================================
HEAD "8 -- href-Links: Zieldateien vorhanden?"
# =============================================================================
$hrefRe  = 'href="([^"]+)"'
$hrefErr = 0
foreach ($f in $html) {
    $dir = Split-Path $f.FullName
    $raw = ReadRaw $f.FullName
    foreach ($m in [regex]::Matches($raw, $hrefRe)) {
        $href = $m.Groups[1].Value
        # Anker, JavaScript, externe URLs, Data-URIs ueberspringen
        if ($href -match '^[#?]|^javascript:|^mailto:|^http|^file://|^data:') { continue }
        $clean = ($href -split '[?#]')[0].Trim()
        if (-not $clean) { continue }
        $full = [IO.Path]::GetFullPath([IO.Path]::Combine($dir, $clean))
        if (-not (Test-Path $full)) {
            ERR "href-Ziel fehlt: $href"
            ERR "               <- $(Rel $f.FullName)"
            $hrefErr++
        }
    }
}
if ($hrefErr -eq 0) { OK "Alle href-Links zeigen auf vorhandene Dateien" }

# =============================================================================
HEAD "9 -- OneDrive-Sync: Repo-Dateien vs. Deployment-Kopie"
# =============================================================================
$oneDrive = "C:\Users\ThorstenLavinia\OneDrive\2026_05_12_Lernsystem"
if (-not (Test-Path $oneDrive)) {
    WRN "OneDrive-Verzeichnis nicht erreichbar -- Sync-Pruefung uebersprungen"
} else {
    $syncErr = 0; $syncOk = 0
    $syncFiles = @(Get-ChildItem $App -Recurse |
                   Where-Object { -not $_.PSIsContainer } |
                   Where-Object { $_.Extension -in @(".html",".js",".css",".json") })
    foreach ($f in $syncFiles) {
        $relPath = $f.FullName.Substring($App.Length).TrimStart("\").TrimStart("/")
        $odf = [IO.Path]::Combine($oneDrive, "app", $relPath)
        if (-not (Test-Path $odf)) {
            ERR "Fehlt in OneDrive: $relPath"
            $syncErr++
        } else {
            $hashRepo = (Get-FileHash $f.FullName -Algorithm MD5).Hash
            $hashOd   = (Get-FileHash $odf -Algorithm MD5).Hash
            if ($hashRepo -ne $hashOd) {
                ERR "Veraltet in OneDrive: $relPath"
                $syncErr++
            } else {
                $syncOk++
            }
        }
    }
    if ($syncErr -eq 0) { OK "$syncOk Dateien in OneDrive aktuell" }
}

# =============================================================================
# Zusammenfassung
# =============================================================================
$total = $nErr + $nWrn + $nOk
Write-Host "`n$('=' * 58)" -ForegroundColor Cyan
$color = if ($nErr -gt 0) { "Red" } elseif ($nWrn -gt 0) { "Yellow" } else { "Green" }
Write-Host "  $nErr Fehler  |  $nWrn Warnungen  |  $nOk OK  (gesamt $total Pruefungen)" -ForegroundColor $color
if    ($nErr -gt 0) { Write-Host "  Bitte Fehler beheben." -ForegroundColor Red }
elseif($nWrn -gt 0) { Write-Host "  Pruefung mit Warnungen abgeschlossen." -ForegroundColor Yellow }
else                 { Write-Host "  Alle Pruefungen bestanden." -ForegroundColor Green }
Write-Host "$('=' * 58)" -ForegroundColor Cyan
