const WebSocket = require('ws');
const http = require('http');
const URL = 'file:///C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/index.html?vcheck=' + Date.now();

http.get('http://localhost:9222/json', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const targets = JSON.parse(data);
    const page = targets.find(t => t.type === 'page') || targets[0];
    run(page.webSocketDebuggerUrl);
  });
});

function run(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = {};
  function send(method, params = {}) { const m = id++; ws.send(JSON.stringify({ id: m, method, params })); return m; }
  function evalExpr(expr, cb) {
    const m = send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: false });
    pending[m] = cb;
  }
  ws.on('open', () => { send('Page.enable'); send('Page.navigate', { url: URL }); });
  let navigated = false;
  let attempts = 0;
  ws.on('message', raw => {
    const msg = JSON.parse(raw);
    if (msg.method === 'Page.loadEventFired' && !navigated) {
      navigated = true;
      poll();
    }
    if (msg.id && pending[msg.id]) {
      const cb = pending[msg.id];
      delete pending[msg.id];
      cb(msg.result ? msg.result.result : null);
    }
  });
  function poll() {
    attempts++;
    evalExpr(`JSON.stringify(speechSynthesis.getVoices().map(v => v.name + " (" + v.lang + ")"))`, (result) => {
      const val = result && result.value;
      const arr = val ? JSON.parse(val) : [];
      if (arr.length > 0 || attempts > 8) {
        console.log(JSON.stringify(arr));
        ws.close();
        process.exit(0);
      } else {
        setTimeout(poll, 800);
      }
    });
  }
  ws.on('error', e => { console.error(e.message); process.exit(1); });
  setTimeout(() => { console.error('Timeout ohne Ergebnis'); process.exit(1); }, 25000);
}
