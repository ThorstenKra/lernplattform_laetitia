// Reload + zur Stufe-1-Ansicht + Screenshot
const WebSocket = require('ws');
const fs = require('fs');
const tabId = '676C16B9E833FD1CB9A459AC6A030795';
const outFile = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\screenshot_r5fix.png';

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${tabId}`);
let msgId = 0;
function send(method, params) {
  ws.send(JSON.stringify({id: ++msgId, method, params: params||{}}));
}

ws.on('open', () => {
  send('Page.reload', {ignoreCache: true});
  setTimeout(() => {
    // Klick auf Stufe 1
    send('Runtime.evaluate', {expression: `
      (function() {
        var all = document.querySelectorAll('button, .btn, [onclick]');
        for (var i=0; i<all.length; i++) {
          if (all[i].textContent.indexOf('Stufe 1') >= 0 || all[i].textContent.indexOf('Ein Klick') >= 0) {
            all[i].click(); return 'ok';
          }
        }
        return 'not found';
      })()
    `});
    setTimeout(() => {
      send('Page.captureScreenshot', {format: 'png'});
    }, 1500);
  }, 2500);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if (j.result && j.result.data) {
    fs.writeFileSync(outFile, Buffer.from(j.result.data, 'base64'));
    console.log('OK');
    ws.close(); process.exit(0);
  }
});
ws.on('error', e => { console.error(e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 10000);
