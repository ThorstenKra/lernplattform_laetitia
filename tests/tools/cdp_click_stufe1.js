// Klick auf Stufe 1 + Screenshot
const WebSocket = require('ws');
const fs = require('fs');
const tabId = '676C16B9E833FD1CB9A459AC6A030795';
const outFile = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\screenshot_r5fix.png';

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${tabId}`);
let msgId = 0;
function send(method, params) {
  const id = ++msgId;
  ws.send(JSON.stringify({id, method, params: params||{}}));
  return id;
}

ws.on('open', () => {
  // Klick auf Stufe-1-Button via JS
  send('Runtime.evaluate', {
    expression: `
      const btns = document.querySelectorAll('.stufe-btn, button, [data-stufe]');
      let clicked = false;
      for (const b of btns) {
        if (b.textContent.includes('Stufe 1') || b.textContent.includes('Ein Klick')) {
          b.click(); clicked = true; break;
        }
      }
      clicked ? 'clicked' : 'not found'
    `
  });
  // Nach 2s Screenshot
  setTimeout(() => {
    send('Page.captureScreenshot', {format: 'png'});
  }, 2000);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if (j.result && j.result.data) {
    fs.writeFileSync(outFile, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot: ' + outFile);
    ws.close(); process.exit(0);
  }
  if (j.result && j.result.result) {
    console.log('JS: ' + JSON.stringify(j.result.result));
  }
});

ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 8000);
