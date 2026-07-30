# listener.ps1 (v7 - Multi-Route + Audio-Umschaltung + Multi-Agenten-Gemini-KI)
# Laetitia Lernsystem
#
# Routen:
#   /audio?geraet=jbl     -> Windows-Audio auf JBL Clip 5 umschalten
#   /audio?geraet=intern  -> Windows-Audio auf internen Lautsprecher zurueck
#   /audio?check=jbl      -> pruefen ob JBL als Wiedergabegeraet verfuegbar ("ok" | "fehler")
#   /zurueck              -> Edge beenden, NuVoice starten (bestehende Logik)
#   /chat                 -> POST: KI-Gespraech via Gemini API. body.agent waehlt den
#                             Modulordner unter modules\ (Standard "ki_gespraech" = Nova,
#                             z.B. "ki_agenten/milo" fuer weitere Agenten). Jeder Agent
#                             bringt seine eigene persona.json mit (Charakter, Eroeffnung,
#                             Grenzen). Zusaetzlich lesen ALLE Agenten IMMER
#                             modules\ki_agenten\lebenskontext_gemeinsam.json (sicherheits-
#                             relevante Fakten ueber Laetitia, z.B. Mobilitaet/Soziales --
#                             30.07.2026 aus Novas persona.json ausgelagert, damit jeder
#                             Agent diese Grundlagen kennt). body.kontext (optional) liefert
#                             zusaetzliche strukturierte Fakten fuer genau diese eine Antwort
#                             (z.B. Milos Lernfortschritt, Fabus aktuelle Geschichten-Szene).
#   /chat/abschliessen    -> POST: Gespraech speichern, GEMEINSAMES Gedaechtnis
#                             (modules\ki_agenten\gemeinsames_gedaechtnis.json) aktualisieren.
#                             Alle Agenten teilen sich dieses eine Gedaechtnis -- so "lernt"
#                             jeder Agent auch aus Gespraechen, die andere Agenten gefuehrt
#                             haben. Keine Eltern-Zusammenfassung mehr (entfernt 29.07.2026).

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

            $agent       = if ($body.agent) { [string]$body.agent -replace '/', '\' } else { "ki_gespraech" }
            $modPfad     = "$PSScriptRoot\modules\$agent"
            $gedPfad     = "$PSScriptRoot\modules\ki_agenten\gemeinsames_gedaechtnis.json"
            $persona     = Get-Content "$modPfad\persona.json" -Raw -Encoding UTF8 | ConvertFrom-Json
            $gedaechtnis = Get-Content $gedPfad -Raw -Encoding UTF8

            $eigenschaften = ($persona.charaktereigenschaften | ForEach-Object { "- $_" }) -join "`n"
            $grenzen       = ($persona.grenzen | ForEach-Object { "- $_" }) -join "`n"
            $stimmungen    = ($persona.stimmungen.PSObject.Properties | ForEach-Object { "- $($_.Name): $($_.Value)" }) -join "`n"
            $rolle         = if ($persona.rolle) { $persona.rolle } else { "Gespraechspartnerin" }

            # Gemeinsamer Lebenskontext (sicherheitsrelevante Fakten ueber Laetitia,
            # gilt fuer ALLE Agenten) + optionaler agent-eigener Zusatzkontext (z.B.
            # Novas Anekdoten-Material aus ihrem persoenlichen persona.json-Feld).
            $lebenskontextBlock = ""
            $gemeinsamerLebenskontextPfad = "$PSScriptRoot\modules\ki_agenten\lebenskontext_gemeinsam.json"
            if (Test-Path $gemeinsamerLebenskontextPfad) {
                $gemeinsamerLebenskontext = Get-Content $gemeinsamerLebenskontextPfad -Raw -Encoding UTF8 | ConvertFrom-Json
                $lebenskontextZeilen = ($gemeinsamerLebenskontext.PSObject.Properties | ForEach-Object { "- $($_.Name): $($_.Value)" }) -join "`n"
                $lebenskontextBlock += "`nWichtiger Lebenskontext ueber Laetitia (gilt fuer ALLE Charaktere, unbedingt beachten):`n$lebenskontextZeilen`n"
            }
            if ($persona.lebenskontext) {
                $eigenerLebenskontext = ($persona.lebenskontext.PSObject.Properties | ForEach-Object { "- $($_.Name): $($_.Value)" }) -join "`n"
                $lebenskontextBlock += "`nZusaetzlicher eigener Kontext:`n$eigenerLebenskontext`n"
            }

            $istErsteNachricht = (-not $body.verlauf -or $body.verlauf.Count -eq 0)
            $eroeffnungHinweis = ""
            if ($istErsteNachricht -and $persona.eroeffnung) {
                # persona.eroeffnung ist entweder ein einzelner Text, oder ein Objekt
                # {a:"...", b:"..."} fuer tagesabhaengige Abwechslung. Deterministischer
                # Tageswechsel statt Modell-Zufall: das Modell waehlt bei freier Wahl in
                # Tests fast immer Variante A, auch bei hoher Temperature.
                $eroeffnungText = $persona.eroeffnung
                if ($persona.eroeffnung.a -and $persona.eroeffnung.b) {
                    $eroeffnungText = if ((Get-Date).DayOfYear % 2 -eq 0) { $persona.eroeffnung.b } else { $persona.eroeffnung.a }
                }
                $eroeffnungHinweis = "`n`nDies ist die ALLERERSTE Nachricht des heutigen Gespraechs.`n$eroeffnungText`n"
            }

            $kontextBlock = ""
            if ($body.kontext) {
                $kontextBlock = "`n`nZusaetzlicher Kontext von der App fuer genau diese Antwort:`n$($body.kontext)`nNutze das aktiv und konkret, nenne wenn passend echte Details daraus.`n"
            }

            $sysPrompt = @"
Du bist $($persona.name), Laetitias $rolle auf einer Lernplattform.
Charaktereigenschaften:
$eigenschaften
Gespraechsstil: $($persona.gespraechsstil.antwortlaenge). Sprachniveau: $($persona.gespraechsstil.sprachniveau).
$lebenskontextBlock
Wichtige Grenzen:
$grenzen

Verfuegbare Stimmungen (waehle pro Antwort GENAU EINE, passend zum Gespraechsverlauf):
$stimmungen
"ruhig" ist PFLICHT bei ernsten/traurigen Themen. Sonst gerne haeufig andere Stimmungen,
aber nicht in jeder einzelnen Antwort -- wirkt sonst aufgesetzt.

Laetitia kommuniziert per Augensteuerung. Das Tippen ist anstrengend.
Antworte daher: kurz (max. 3 Saetze), klar, in normalem Deutsch.
$eroeffnungHinweis$kontextBlock
Heutiges Datum: $(Get-Date -Format "yyyy-MM-dd")

Gemeinsames Gedaechtnis ueber Laetitia (JSON, wird von ALLEN KI-Charakteren auf dieser
Plattform geteilt). Zwei Teile: "profil" sind dauerhafte, selten sich aendernde Fakten
(ueber_laetitia, interessen, wiederkehrende_themen, eine laufende Routine unter
"routine", beobachtete Vorlieben unter "beobachtete_praeferenzen"). "letzte_gespraeche"
ist ein rollierendes Kurzzeit-Log der letzten Gespraeche (max. 20, aeltestes faellt raus)
mit Angabe welcher Charakter jeweils dabei war:
$gedaechtnis

Nutze dieses Gedaechtnis aktiv:
- Beziehe dich gelegentlich auf Themen aus "letzte_gespraeche" -- auch auf Gespraeche mit
  ANDEREN Charakteren, nicht nur mit dir selbst (z.B. "Fabu hat mir erzaehlt, dass..."). Vergleiche
  das jeweilige Datum mit dem heutigen Datum (z.B. "gestern", "vor ein paar Tagen", "letzte
  Woche") und frage nach, ob sich etwas getan hat. Nicht in jeder Antwort, aber immer wieder,
  damit es wirkt als wuerdest du dich wirklich erinnern.
- Falls unter "routine" ein Ziel eingetragen ist: frag liebevoll nach dem Stand,
  ohne Druck. Falls noch keine Routine existiert und sich ein Gespraech dafuer
  eignet, schlage behutsam vor, gemeinsam eine kleine taegliche Routine zu finden.
- Lass "beobachtete_praeferenzen" deinen Ton und deine Themenwahl beeinflussen.
- Falls unter "profil.lernfortschritt" echte Angaben stehen: beziehe dich gelegentlich
  beilaeufig darauf (z.B. "wie laeuft's mit dem Kasus-Ueben?"), nie wie eine Pruefung oder
  Ermahnung -- eher wie ehrliches, freundliches Interesse. Nicht in jeder Antwort.

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
    # Aktualisiert NUR das gemeinsame Gedaechtnis (kein Eltern-Log mehr, entfernt
    # 29.07.2026 -- reduziert auf einen Gemini-Aufruf statt zwei).
    if ($pfad -eq "/chat/abschliessen" -and $ctx.Request.HttpMethod -eq "POST") {
        # WICHTIG: Body MUSS vor SchreibeJsonAntwort gelesen werden -- das Schliessen
        # der Response reisst sonst den Request-Stream mit runter, LiesRequestBody
        # liefert danach nur noch einen leeren Body (--> $body.verlauf.Count immer 0).
        $bodyRoh = LiesRequestBody $ctx
        SchreibeJsonAntwort $ctx @{ ok = $true }   # Antwort sofort senden

        try {
            $body = $bodyRoh | ConvertFrom-Json
            if (-not $body.verlauf -or $body.verlauf.Count -eq 0) { continue }

            $agent   = if ($body.agent) { [string]$body.agent -replace '/', '\' } else { "ki_gespraech" }
            $modPfad = "$PSScriptRoot\modules\$agent"
            $persona = Get-Content "$modPfad\persona.json" -Raw -Encoding UTF8 | ConvertFrom-Json
            $gedPfad     = "$PSScriptRoot\modules\ki_agenten\gemeinsames_gedaechtnis.json"
            $gedaechtnis = Get-Content $gedPfad -Raw -Encoding UTF8 | ConvertFrom-Json
            $verlaufText = ($body.verlauf | ForEach-Object {
                $rolle = if($_.rolle -eq "user") { "Laetitia" } else { $persona.name }
                "${rolle}: $($_.text)"
            }) -join "`n"

            $heute = Get-Date -Format "yyyy-MM-dd"
            # Nur das PROFIL (dauerhafte Fakten) geht an Gemini zur Aktualisierung --
            # "letzte_gespraeche" wird unten rein mechanisch angehaengt/gekuerzt, nicht vom
            # Modell neu geschrieben. Kleinerer JSON-Umfang = zuverlaessiger, und ein Fehler
            # beim Parsen kann nie das rollierende Gespraechs-Log beschaedigen (30.07.2026,
            # Langzeit/Kurzzeit-Trennung).
            $profilJson = $gedaechtnis.profil | ConvertTo-Json -Depth 6 -Compress
            $gedPrompt = @"
Bisheriges PROFIL von Laetitia (dauerhafte Fakten, aendert sich selten -- JSON):
$profilJson

Neues Gespraech (heute, $heute, mit $($persona.name)):
$verlaufText

Aufgabe:
1. Schreibe eine kurze Zusammenfassung (1-2 Saetze) des Kernthemas dieses Gespraechs.
2. Aktualisiere das PROFIL NUR wenn im Gespraech wirklich etwas Neues/Wichtiges erkennbar
   war -- nicht bei jedem Gespraech automatisch etwas ergaenzen, das Profil soll stabil
   bleiben. Lieber ein Feld unveraendert lassen als unsicher raten:
   - "interessen": neue erkennbare Interessen ergaenzen, keine Duplikate
   - "wiederkehrende_themen": nur Themen die ueber mehrere Gespraeche immer wieder auftauchen
   - "routine": nur aendern falls im Gespraech eine taegliche Routine erwaehnt, vereinbart
     oder verfolgt wurde (ziel + stand)
   - "beobachtete_praeferenzen": nur ergaenzen bei einer klar erkennbaren neuen Beobachtung
     zu Ton/Thema/Humor, worauf Laetitia gut reagiert
   - "ueber_laetitia": NUR aendern wenn sich wirklich etwas Grundlegendes geaendert hat
Antworte NUR mit diesem JSON, kein Markdown, keine Erklaerung:
{"zusammenfassung":"...","profil":{"ueber_laetitia":"...","interessen":[],"wiederkehrende_themen":[],"routine":{"ziel":"...","stand":"..."},"beobachtete_praeferenzen":[]}}
"@
            $gedResp = RufeGemini @(@{ role = "user"; content = $gedPrompt }) 1500 0.2 20000
            $antwort = $gedResp.choices[0].message.content.Trim() | ConvertFrom-Json

            # Rollierendes Log mechanisch pflegen (kein LLM-Risiko fuer diesen Teil)
            $neuerEintrag = [PSCustomObject]@{ datum = $heute; agent = $persona.name; zusammenfassung = $antwort.zusammenfassung }
            $alleGespraeche = @($gedaechtnis.letzte_gespraeche) + @($neuerEintrag)
            if ($alleGespraeche.Count -gt 20) { $alleGespraeche = $alleGespraeche[($alleGespraeche.Count - 20)..($alleGespraeche.Count - 1)] }

            # Hartes Kappen als Sicherheitsnetz, unabhaengig davon ob Gemini sich an die im
            # Prompt genannten Grenzen haelt
            $neuesProfil = $antwort.profil
            if ($neuesProfil.interessen -and $neuesProfil.interessen.Count -gt 15) {
                $neuesProfil.interessen = $neuesProfil.interessen[($neuesProfil.interessen.Count - 15)..($neuesProfil.interessen.Count - 1)]
            }
            if ($neuesProfil.wiederkehrende_themen -and $neuesProfil.wiederkehrende_themen.Count -gt 10) {
                $neuesProfil.wiederkehrende_themen = $neuesProfil.wiederkehrende_themen[($neuesProfil.wiederkehrende_themen.Count - 10)..($neuesProfil.wiederkehrende_themen.Count - 1)]
            }
            if ($neuesProfil.beobachtete_praeferenzen -and $neuesProfil.beobachtete_praeferenzen.Count -gt 8) {
                $neuesProfil.beobachtete_praeferenzen = $neuesProfil.beobachtete_praeferenzen[($neuesProfil.beobachtete_praeferenzen.Count - 8)..($neuesProfil.beobachtete_praeferenzen.Count - 1)]
            }

            # Lernfortschritt (aus window.LaetitiaStats, vom Client mitgeschickt) wird NICHT
            # von Gemini umformuliert -- echte Fortschrittsdaten sollen nicht driften. Mechanisch
            # gesetzt: frischer Wert wenn mitgeschickt, sonst bisherigen Wert beibehalten
            # (30.07.2026, Lernfortschritt dauerhaft im Profil statt nur situativ bei Milo).
            if ($body.lernfortschritt) {
                $neuesProfil | Add-Member -NotePropertyName lernfortschritt -NotePropertyValue ([string]$body.lernfortschritt) -Force
            } elseif ($gedaechtnis.profil.lernfortschritt) {
                $neuesProfil | Add-Member -NotePropertyName lernfortschritt -NotePropertyValue $gedaechtnis.profil.lernfortschritt -Force
            }

            $neuesGedaechtnis = [PSCustomObject]@{ profil = $neuesProfil; letzte_gespraeche = $alleGespraeche }
            ($neuesGedaechtnis | ConvertTo-Json -Depth 10) | Set-Content $gedPfad -Encoding UTF8
        } catch {
            $fehlerPfad = "$PSScriptRoot\modules\ki_agenten\listener_fehler.log"
            try {
                Add-Content -Path $fehlerPfad -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | $($_.Exception.Message)" -Encoding UTF8
            } catch {}
        }
        continue
    }

    # ── Unbekannte Route ──────────────────────────────────────────────────────
    SchreibeAntwort $ctx "nicht gefunden" 404
}
