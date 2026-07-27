# listener.ps1 (v6 - Multi-Route + Audio-Umschaltung + Gemini-KI)
# Laetitia Lernsystem
#
# Routen:
#   /audio?geraet=jbl     -> Windows-Audio auf JBL Clip 5 umschalten
#   /audio?geraet=intern  -> Windows-Audio auf internen Lautsprecher zurueck
#   /audio?check=jbl      -> pruefen ob JBL als Wiedergabegeraet verfuegbar ("ok" | "fehler")
#   /zurueck              -> Edge beenden, NuVoice starten (bestehende Logik)
#   /chat                 -> POST: Nova-KI-Gespraech via Gemini API
#   /chat/abschliessen    -> POST: Gespraech speichern, Gedaechtnis + Eltern-Log aktualisieren

# ── Konfiguration ─────────────────────────────────────────────────────────────
$JBL_NAME    = "JBL Clip 5"
$NUVOICE_EXE = "C:\Program Files (x86)\Prentke Romich Company\NuVoice\NuVoice.exe"
$PORT        = 9999

# Gemini API-Key: kostenlos unter aistudio.google.com -> Get API Key -> Create API Key
$GEMINI_KEY  = "HIER_GEMINI_KEY_EINTRAGEN"
$GEMINI_URL  = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
$GEMINI_MODEL = "gemini-flash-lite-latest"

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

function LiesRequestBody($ctx) {
    try {
        $reader = New-Object System.IO.StreamReader($ctx.Request.InputStream, [System.Text.Encoding]::UTF8)
        return $reader.ReadToEnd()
    } catch { return "{}" }
}

function SchreibeJsonAntwort($ctx, $obj, $status = 200) {
    try {
        $json = $obj | ConvertTo-Json -Depth 10 -Compress
        $buf  = [System.Text.Encoding]::UTF8.GetBytes($json)
        $ctx.Response.StatusCode = $status
        $ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
        $ctx.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $ctx.Response.ContentType = "application/json; charset=utf-8"
        $ctx.Response.ContentLength64 = $buf.Length
        $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
        $ctx.Response.Close()
    } catch {}
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

# Invoke-RestMethod dekodiert UTF-8-Antworten unter PowerShell 5.1 fehlerhaft
# (Umlaute werden zu Mojibake, z.B. "ö" -> "Ã¶"). Deshalb HttpWebRequest direkt
# mit explizitem UTF-8-Stream-Reader fuer Request UND Response.
function RufeGemini($messages, $maxTokens, $temperature, $timeoutMs = 20000) {
    # reasoning_effort=low reduziert (schaltet aber nicht ab) den internen "Thinking"-
    # Tokenverbrauch von Gemini. max_tokens deshalb grosszuegig bemessen -- sonst wird
    # die sichtbare Antwort abgeschnitten, bevor sie geschrieben wird (finish_reason=length).
    $bodyJson = @{
        model            = $GEMINI_MODEL
        messages         = @($messages)
        max_tokens       = $maxTokens
        temperature      = $temperature
        reasoning_effort = "low"
    } | ConvertTo-Json -Depth 10 -Compress
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)

    $req = [System.Net.HttpWebRequest]::Create($GEMINI_URL)
    $req.Method = "POST"
    $req.ContentType = "application/json; charset=utf-8"
    $req.Timeout = $timeoutMs
    $req.Headers.Add("Authorization", "Bearer $GEMINI_KEY")
    $req.ContentLength = $bodyBytes.Length
    $reqStream = $req.GetRequestStream()
    $reqStream.Write($bodyBytes, 0, $bodyBytes.Length)
    $reqStream.Close()

    try {
        $response = $req.GetResponse()
    } catch [System.Net.WebException] {
        if ($_.Exception.Response) {
            $errReader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream(), [System.Text.Encoding]::UTF8)
            $errBody = $errReader.ReadToEnd()
            $errReader.Close()
            throw "Gemini HTTP-Fehler: $errBody"
        }
        throw
    }
    $respStream = $response.GetResponseStream()
    $reader    = New-Object System.IO.StreamReader($respStream, [System.Text.Encoding]::UTF8)
    $json      = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()

    return $json | ConvertFrom-Json
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
        try {
            $ctx.Response.StatusCode = 200
            $ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
            $ctx.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            $ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
            $ctx.Response.ContentLength64 = 0
            $ctx.Response.Close()
        } catch {}
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

    # ── Route: /chat ──────────────────────────────────────────────────────────
    if ($pfad -eq "/chat" -and $ctx.Request.HttpMethod -eq "POST") {
        try {
            $body = LiesRequestBody $ctx | ConvertFrom-Json

            $modPfad     = "$PSScriptRoot\modules\ki_gespraech"
            $persona     = Get-Content "$modPfad\persona.json"     -Raw -Encoding UTF8 | ConvertFrom-Json
            $gedaechtnis = Get-Content "$modPfad\gedaechtnis.json" -Raw -Encoding UTF8

            $eigenschaften = ($persona.charaktereigenschaften | ForEach-Object { "- $_" }) -join "`n"
            $grenzen       = ($persona.grenzen | ForEach-Object { "- $_" }) -join "`n"
            $stimmungen    = ($persona.stimmungen.PSObject.Properties | ForEach-Object { "- $($_.Name): $($_.Value)" }) -join "`n"
            $lebenskontext = ($persona.lebenskontext.PSObject.Properties | ForEach-Object { "- $($_.Name): $($_.Value)" }) -join "`n"
            $istErsteNachricht = (-not $body.verlauf -or $body.verlauf.Count -eq 0)
            $eroeffnungHinweis = ""
            if ($istErsteNachricht) {
                $eroeffnungHinweis = @"

Dies ist die ALLERERSTE Nachricht des heutigen Gespraechs. Beginne liebevoll mit ein bis
zwei kurzen Fragen aus diesem Bereich (nicht alle auf einmal, waehle passend zur Situation
bzw. zum Gedaechtnis): wie es ihr gerade geht, wie sie geschlafen hat, wie stark die Spastik
heute ist, allgemeine Gedanken, Plaene fuer den Tag. In DIESER ERSTEN Antwort NICHT von den
Lernmodulen anfangen -- das wirkt sonst wie eine versteckte Aufforderung. Das Thema
Lernmodule darf spaeter im Gespraech ganz natuerlich aufkommen, aber nie als Einstieg.
"@
            }
            $sysPrompt = @"
Du bist $($persona.name), Laetitias freundliche Gespraechspartnerin auf einer Lernplattform.
Charaktereigenschaften:
$eigenschaften
Gespraechsstil: $($persona.gespraechsstil.antwortlaenge). Sprachniveau: $($persona.gespraechsstil.sprachniveau).
Fragetechnik: $($persona.gespraechsstil.fragetechnik).

Wichtiger Lebenskontext (unbedingt beachten):
$lebenskontext

Wichtige Grenzen:
$grenzen

Verfuegbare Stimmungen (waehle pro Antwort GENAU EINE, passend zum Gespraechsverlauf):
$stimmungen
"ruhig" ist PFLICHT bei ernsten/traurigen Themen. Sonst gerne haeufig "schnippisch" oder
"aufgeregt", aber nicht in jeder einzelnen Antwort -- wirkt sonst aufgesetzt.

Laetitia kommuniziert per Augensteuerung. Das Tippen ist anstrengend.
Antworte daher: kurz (max. 3 Saetze), klar, in normalem Deutsch.
$eroeffnungHinweis
Heutiges Datum: $(Get-Date -Format "yyyy-MM-dd")

Gedaechtnis ueber Laetitia (JSON, inkl. datierter vergangener Gespraeche unter
"letzte_gespraeche", einer laufenden Routine unter "routine" und beobachteten
Vorlieben unter "beobachtete_praeferenzen"):
$gedaechtnis

Nutze dieses Gedaechtnis aktiv:
- Beziehe dich gelegentlich auf Themen aus "letzte_gespraeche" -- vergleiche das
  jeweilige Datum mit dem heutigen Datum (z.B. "gestern", "vor ein paar Tagen",
  "letzte Woche") und frage nach, ob sich etwas getan hat. Nicht in jeder Antwort,
  aber immer wieder, damit es wirkt als wuerdest du dich wirklich erinnern.
- Falls unter "routine" ein Ziel eingetragen ist: frag liebevoll nach dem Stand,
  ohne Druck. Falls noch keine Routine existiert und sich ein Gespraech dafuer
  eignet, schlage behutsam vor, gemeinsam eine kleine taegliche Routine zu finden.
- Lass "beobachtete_praeferenzen" deinen Ton und deine Themenwahl beeinflussen.

Wichtig: Haenge am Ende jeder Antwort EXAKT diesen einen Block an (eine Zeile, kein Markdown,
kein weiterer Tag davor oder danach -- die Stimmung gehoert NUR in dieses "stimmung"-Feld,
niemals als eigener [STIMMUNG]-Tag oder aehnliches im sichtbaren Antworttext):
[VORSCHLAEGE]{"v":["Antwort1","Antwort2","Antwort3","Antwort4"],"stimmung":"neutral"}[/VORSCHLAEGE]
Die Vorschlaege sollen kurze (2-5 Woerter), passende Antwortmoeglichkeiten fuer Laetitia sein.
Bei "stimmung" exakt einen der obigen Stimmungs-Namen eintragen.
"@

            $msgs = [System.Collections.ArrayList]::new()
            [void]$msgs.Add(@{ role = "system"; content = $sysPrompt })
            if ($body.verlauf) {
                foreach ($v in $body.verlauf) {
                    [void]$msgs.Add(@{ role = $v.rolle; content = $v.text })
                }
            }
            [void]$msgs.Add(@{ role = "user"; content = $body.nachricht })

            $geminiResp = RufeGemini $msgs 1000 0.7 20000

            $roh = $geminiResp.choices[0].message.content

            $vorschlaege = @("Ja", "Nein", "Erzaehl mehr", "Okay")
            $stimmung    = "neutral"
            if ($roh -match "(?s)\[VORSCHLAEGE\](.*?)\[/VORSCHLAEGE\]") {
                try {
                    $vJson = $Matches[1].Trim() | ConvertFrom-Json
                    if ($vJson.v -and $vJson.v.Count -gt 0) {
                        $vorschlaege = @($vJson.v | Select-Object -First 4)
                    }
                    if ($vJson.stimmung -and $persona.stimmungen.PSObject.Properties.Name -contains $vJson.stimmung) {
                        $stimmung = $vJson.stimmung
                    }
                } catch {}
            }
            $antwortText = ($roh -replace "(?s)\[VORSCHLAEGE\].*?\[/VORSCHLAEGE\]", "")
            # Verteidigung gegen gelegentlich von Gemini erfundene Extra-Tags (z.B. [STIMMUNG]...[/STIMMUNG])
            $antwortText = ($antwortText -replace "(?s)\[/?[A-Z]+\]", "").Trim()

            SchreibeJsonAntwort $ctx @{ antwort = $antwortText; vorschlaege = $vorschlaege; stimmung = $stimmung }
        } catch {
            SchreibeJsonAntwort $ctx @{ fehler = "Gemini-Fehler: $($_.Exception.Message)" } 503
        }
        continue
    }

    # ── Route: /chat/abschliessen ─────────────────────────────────────────────
    if ($pfad -eq "/chat/abschliessen" -and $ctx.Request.HttpMethod -eq "POST") {
        SchreibeJsonAntwort $ctx @{ ok = $true }   # Antwort sofort senden

        try {
            $body = LiesRequestBody $ctx | ConvertFrom-Json
            if (-not $body.verlauf -or $body.verlauf.Count -eq 0) { continue }

            $modPfad      = "$PSScriptRoot\modules\ki_gespraech"
            $gedPfad      = "$modPfad\gedaechtnis.json"
            $logPfad      = "$modPfad\eltern_zusammenfassung.log"
            $altesGed     = Get-Content $gedPfad -Raw -Encoding UTF8
            $verlaufText  = ($body.verlauf | ForEach-Object {
                $rolle = if($_.rolle -eq "user") { "Laetitia" } else { "Nova" }
                "${rolle}: $($_.text)"
            }) -join "`n"

            # Gedaechtnis aktualisieren
            $heute = Get-Date -Format "yyyy-MM-dd"
            $gedPrompt = @"
Altes Gedaechtnis (JSON) -- Schema: ueber_laetitia (Text), interessen (Liste), wiederkehrende_themen (Liste),
letzte_gespraeche (Liste von {"datum":"YYYY-MM-DD","zusammenfassung":"..."}), routine ({"ziel":"...","stand":"..."}),
beobachtete_praeferenzen (Liste kurzer Notizen, worauf Laetitia im Ton/Thema gut reagiert):
$altesGed

Neues Gespraech (heute, $heute):
$verlaufText

Aktualisiere das Gedaechtnis:
1. Fuege einen NEUEN Eintrag zu "letzte_gespraeche" hinzu: {"datum":"$heute","zusammenfassung":"1-2 Saetze Kernthema"}.
   Bestehende Eintraege beibehalten, aber Liste auf maximal die letzten 14 Eintraege kuerzen (aelteste zuerst entfernen).
2. "interessen" und "wiederkehrende_themen" ergaenzen falls neue erkennbar sind (keine Duplikate).
3. Falls im Gespraech eine taegliche Routine erwaehnt, vereinbart oder verfolgt wurde: "routine" (ziel + stand) aktualisieren.
4. Falls erkennbar ist, worauf Laetitia besonders gut reagiert hat (Humor-Art, Thema, Tonfall): kurze Notiz zu
   "beobachtete_praeferenzen" hinzufuegen (max. 8 Eintraege insgesamt, bei Bedarf aelteste entfernen).
5. "ueber_laetitia" nur anpassen, wenn sich wirklich etwas Grundlegendes geaendert hat.
Gib NUR das aktualisierte JSON zurueck (exakt dieses Schema), kein Markdown, keine Erklaerung.
"@
            $gedResp = RufeGemini @(@{ role = "user"; content = $gedPrompt }) 2000 0.2 20000
            $neuesGed = $gedResp.choices[0].message.content.Trim()
            # Nur speichern wenn gueltiges JSON zurueckkam
            $neuesGed | ConvertFrom-Json | Out-Null
            $neuesGed | Set-Content $gedPfad -Encoding UTF8

            # Eltern-Zusammenfassung
            $datum       = Get-Date -Format "yyyy-MM-dd"
            $elternPrompt = "Fasse dieses Gespraech in 2-3 Saetzen fuer Eltern zusammen. " +
                "Kein Wortlaut, nur Kernpunkte und Stimmung. Format: '$datum | Text. Stimmung: X.'`n`nGespraech:`n$verlaufText"
            $elternResp = RufeGemini @(@{ role = "user"; content = $elternPrompt }) 1200 0.2 15000
            $elternText = $elternResp.choices[0].message.content.Trim()
            Add-Content -Path $logPfad -Value $elternText -Encoding UTF8
        } catch {
            $fehlerPfad = "$PSScriptRoot\modules\ki_gespraech\listener_fehler.log"
            try {
                Add-Content -Path $fehlerPfad -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | $($_.Exception.Message)" -Encoding UTF8
            } catch {}
        }
        continue
    }

    # ── Unbekannte Route ──────────────────────────────────────────────────────
    SchreibeAntwort $ctx "nicht gefunden" 404
}
