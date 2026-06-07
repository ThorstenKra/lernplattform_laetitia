const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const PAGE_ID = 'B51F61D7CF7ABB641B29A35B0B88E4DF';
const URL = 'file:///C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/quasselkiste_training.html';
const OUT  = 'C:/Users/ThorstenLavinia/lernplattform_laetitia/screenshot_aktuell.png';

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${PAGE_ID}`);
let id = 1;

function send(method, params={}) {
  ws.send(JSON.stringify({ id: id++, method, params }));
}

ws.on('open', () => {
  send('Page.enable');
  send('Page.navigate', { url: URL });
});

let navigated = false;
ws.on('message', raw => {
  const msg = JSON.parse(raw);
  // Warten auf loadEventFired nach navigate
  if (msg.method === 'Page.loadEventFired' && !navigated) {
    navigated = true;
    setTimeout(() => {
      // Stufe 1 klicken
      send('Runtime.evaluate', { expression: `document.getElementById('btnStufe1').click()` });
      setTimeout(() => {
        send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      }, 1200);
    }, 800);
  }
  if (msg.result && msg.result.data) {
    fs.writeFileSync(OUT, Buffer.from(msg.result.data, 'base64'));
    console.log('Screenshot gespeichert:', OUT);
    ws.close();
    process.exit(0);
  }
});
ws.on('error', e => { console.error(e.message); process.exit(1); });
setTimeout(() => { console.error('Timeout'); process.exit(1); }, 15000);
