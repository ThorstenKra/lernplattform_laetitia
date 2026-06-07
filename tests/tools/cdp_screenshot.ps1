# CDP Screenshot via Node.js (umgeht PowerShell WebSocket-Problem)
param([string]$tabId = "676C16B9E833FD1CB9A459AC6A030795",
      [string]$outFile = "C:\Users\ThorstenLavinia\lernplattform_laetitia\screenshot_r5fix.png")

$js = @"
const WebSocket = require('ws');
const fs = require('fs');
const ws = new WebSocket('ws://localhost:9222/devtools/page/$tabId');
ws.on('open', () => {
  ws.send(JSON.stringify({id:1, method:'Page.captureScreenshot', params:{format:'png'}}));
});
let buf = '';
ws.on('message', (data) => {
  buf += data;
  try {
    const j = JSON.parse(buf);
    if (j.id === 1 && j.result && j.result.data) {
      fs.writeFileSync('$($outFile.Replace('\','\\'))', Buffer.from(j.result.data, 'base64'));
      console.log('OK:' + '$($outFile.Replace('\','\\'))');
      ws.close(); process.exit(0);
    }
  } catch(e) {}
});
ws.on('error', e => { console.error('ERR:'+e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 8000);
"@

$tmpJs = "$env:TEMP\cdp_shot.js"
$js | Out-File -FilePath $tmpJs -Encoding utf8
node $tmpJs
