# listener.ps1 (v4 - Multi-Route + Audio-Umschaltung)
# Laetitia Lernsystem
#
# Routen:
#   /audio?geraet=jbl     -> Windows-Audio auf JBL Clip 5 umschalten
#   /audio?geraet=intern  -> Windows-Audio auf internen Lautsprecher zurueck
#   /audio?check=jbl      -> pruefen ob JBL als Wiedergabegeraet verfuegbar ("ok" | "fehler")
#   /zurueck              -> Edge beenden, NuVoice starten (bestehende Logik)

# ── Konfiguration ─────────────────────────────────────────────────────────────
$JBL_NAME    = "JBL Clip 5"
$NUVOICE_EXE = "C:\Program Files (x86)\Prentke Romich Company\NuVoice\NuVoice.exe"
$PORT        = 9999

# ── Alte listener-Instanzen beenden (ausser sich selbst) ─────────────────────
$self = $PID
Get-Process powershell -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne $self } | ForEach-Object {
    $cmdline = (Get-CimInstance Win32_Process -Filter "ProcessId=$($_.Id)" -ErrorAction SilentlyContinue).CommandLine
    if ($cmdline -like '*listener.ps1*') {
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
}

# ── AudioDeviceCmdlets laden ──────────────────────────────────────────────────
# Einmalige Installation (als Admin, einmalig auf dem Rechner ausfuehren):
#   Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser
$audioModulOk = $false
try {
    Import-Module AudioDeviceCmdlets -ErrorAction Stop
    $audioModulOk = $true
} catch {
    # Modul fehlt -- Audio-Umschaltung nicht moeglich, Lernwelt laeuft trotzdem
}

# ── Internen Lautsprecher beim Start merken ───────────────────────────────────
$internGeraetId = $null
if ($audioModulOk) {
    try {
        $akt = Get-AudioDevice -Playback
        if ($akt -and ($akt.Name -notlike "*$JBL_NAME*")) {
            $internGeraetId = $akt.ID
        }
    } catch {}
}

# ── Hilfsfunktionen ───────────────────────────────────────────────────────────
function SetzeAudioGeraet($name) {
    if (-not $audioModulOk) { return $false }
    try {
        $geraete = Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" }
        $ziel = $geraete | Where-Object { $_.Name -like "*$name*" } | Select-Object -First 1
        if ($null -eq $ziel) { return $false }
        Set-AudioDevice -ID $ziel.ID | Out-Null
        return $true
    } catch { return $false }
}

function SetzeAudioGeraetPerId($id) {
    if (-not $audioModulOk -or -not $id) { return $false }
    try {
        Set-AudioDevice -ID $id | Out-Null
        return $true
    } catch { return $false }
}

function PruefeJbl() {
    if (-not $audioModulOk) { return $false }
    try {
        $geraete = Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" }
        $jbl = $geraete | Where-Object { $_.Name -like "*$JBL_NAME*" } | Select-Object -First 1
        return ($null -ne $jbl)
    } catch { return $false }
}

function SchreibeAntwort($ctx, $text, $status) {
    try {
        $ctx.Response.StatusCode = $status
        $ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
        $ctx.Response.Headers.Add("Access-Control-Allow-Methods", "GET, OPTIONS")
        $ctx.Response.ContentType = "text/plain; charset=utf-8"
        $buf = [System.Text.Encoding]::UTF8.GetBytes($text)
        $ctx.Response.ContentLength64 = $buf.Length
        $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
        $ctx.Response.Close()
    } catch {}
}

# ── HTTP-Listener starten ─────────────────────────────────────────────────────
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$PORT/")
try {
    $listener.Start()
} catch {
    Start-Sleep -Seconds 1
    try { $listener.Start() } catch {
        exit 1
    }
}

# ── Haupt-Schleife: dauerhaft Anfragen entgegennehmen ────────────────────────
while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
    } catch {
        break  # Listener wurde gestoppt
    }

    $url   = $ctx.Request.Url
    $pfad  = $url.AbsolutePath      # z.B. "/audio"
    $query = $url.Query             # z.B. "?geraet=jbl"

    # OPTIONS (CORS-Preflight) sofort beantworten
    if ($ctx.Request.HttpMethod -eq "OPTIONS") {
        SchreibeAntwort $ctx "ok" 200
        continue
    }

    # ── Route: /audio ─────────────────────────────────────────────────────────
    if ($pfad -eq "/audio") {

        # ?check=jbl
        if ($query -like "*check=jbl*") {
            if (PruefeJbl) {
                SchreibeAntwort $ctx "ok" 200
            } else {
                SchreibeAntwort $ctx "fehler" 200
            }
            continue
        }

        # ?geraet=jbl
        if ($query -like "*geraet=jbl*") {
            $ok = SetzeAudioGeraet $JBL_NAME
            if ($ok) {
                SchreibeAntwort $ctx "ok" 200
            } else {
                SchreibeAntwort $ctx "fehler" 503
            }
            continue
        }

        # ?geraet=intern
        if ($query -like "*geraet=intern*") {
            $ok = $false
            if ($internGeraetId) {
                $ok = SetzeAudioGeraetPerId $internGeraetId
            }
            if (-not $ok) {
                # Fallback: nach Namen suchen (Realtek, Speakers, etc.)
                $ok = SetzeAudioGeraet "Realtek"
                if (-not $ok) { $ok = SetzeAudioGeraet "Speakers" }
                if (-not $ok) { $ok = SetzeAudioGeraet "Lautsprecher" }
            }
            if ($ok) {
                SchreibeAntwort $ctx "ok" 200
            } else {
                SchreibeAntwort $ctx "fehler" 503
            }
            continue
        }

        SchreibeAntwort $ctx "unbekannt" 400
        continue
    }

    # ── Route: /zurueck ───────────────────────────────────────────────────────
    if ($pfad -eq "/zurueck") {
        SchreibeAntwort $ctx "ok" 200

        # Audio zurueck auf intern schalten bevor Edge beendet wird
        if ($internGeraetId) {
            SetzeAudioGeraetPerId $internGeraetId | Out-Null
        } else {
            SetzeAudioGeraet "Realtek" | Out-Null
        }

        $listener.Stop()

        # Schwarzer Uebergangsbildschirm
        Add-Type -AssemblyName System.Windows.Forms
        $form = New-Object System.Windows.Forms.Form
        $form.BackColor = [System.Drawing.Color]::Black
        $form.FormBorderStyle = "None"
        $form.WindowState = "Maximized"
        $form.TopMost = $true
        $form.Show()
        [System.Windows.Forms.Application]::DoEvents()

        Start-Sleep -Milliseconds 200
        Stop-Process -Name msedge -Force -ErrorAction SilentlyContinue
        Start-Sleep -Milliseconds 600
        Start-Process $NUVOICE_EXE
        Start-Sleep -Milliseconds 1200
        $form.Close()

        break
    }

    # ── Unbekannte Route ──────────────────────────────────────────────────────
    SchreibeAntwort $ctx "nicht gefunden" 404
}
