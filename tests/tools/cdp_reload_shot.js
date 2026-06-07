// Reload Tab + Screenshot nach 2s
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
  // Reload
  send('Page.reload', {ignoreCache: true});
  // Nach 3s Screenshot
  setTimeout(() => {
    send('Page.captureScreenshot', {format: 'png'});
  }, 3000);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if (j.result && j.result.data) {
    fs.writeFileSync(outFile, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot gespeichert: ' + outFile);
    ws.close();
    process.exit(0);
  }
});

ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 10000);
