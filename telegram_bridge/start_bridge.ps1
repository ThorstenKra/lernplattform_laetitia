# Laetitia Telegram-Bridge starten
# Ausfuehren: powershell.exe -ExecutionPolicy Bypass -File .\telegram_bridge\start_bridge.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

if(-not (Test-Path "config.json")){
  Write-Host "FEHLER: config.json nicht gefunden." -ForegroundColor Red
  Write-Host "Kopiere config.example.json nach config.json und trage Token + Chat-ID ein." -ForegroundColor Yellow
  Read-Host "Druecke Enter zum Beenden"
  exit 1
}

if(-not (Test-Path "node_modules")){
  Write-Host "Installiere Abhaengigkeiten (einmalig)..." -ForegroundColor Cyan
  npm install
  if($LASTEXITCODE -ne 0){
    Write-Host "npm install fehlgeschlagen." -ForegroundColor Red
    Read-Host "Druecke Enter zum Beenden"
    exit 1
  }
}

Write-Host "Starte Telegram-Bridge..." -ForegroundColor Green
node bridge.js
