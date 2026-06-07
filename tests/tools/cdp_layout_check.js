// Layout-Check: Kopfleiste entfernt, Icon-Reihen gleich hoch, Funktionen erhalten
const WebSocket = require('ws');
const fs = require('fs');
const tabId = process.argv[2];
const outDir = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\';

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${tabId}`);
let msgId = 0;
const pending = {};
function send(method, params){ const id=++msgId; pending[id]=method; ws.send(JSON.stringify({id, method, params: params||{}})); return id; }
function evalJs(expr){ return send('Runtime.evaluate', {expression: expr, returnByValue:true}); }
let shotName = '';
function shot(name){ shotName = name; send('Page.captureScreenshot', {format:'png'}); }

ws.on('open', () => {
  send('Page.enable');
  send('Page.reload');
  setTimeout(() => { shot('start'); }, 2500);
  setTimeout(() => {
    evalJs(`(function(){ var b=document.getElementById('btnStufe1'); b.click(); return 'clicked stufe1'; })()`);
  }, 3500);
  setTimeout(() => { shot('stufe1'); }, 5000);
  setTimeout(() => {
    evalJs(`(function(){
      var rows = getComputedStyle(document.getElementById('grid')).gridTemplateRows.split(' ').map(parseFloat);
      var hdr = document.getElementById('header');
      var zl = document.getElementById('zielLeiste');
      var sb = document.getElementById('btnSeite');
      return JSON.stringify({
        headerExists: !!hdr,
        zielLeisteHeight: zl ? zl.getBoundingClientRect().height : null,
        rowHeights: rows,
        btnSeiteParent: sb ? sb.parentElement.id : null,
        btnSeiteVisible: sb ? getComputedStyle(sb).display : null
      });
    })()`);
  }, 5500);
  setTimeout(() => {
    console.log('switching to Modus 0');
    evalJs(`(function(){ document.getElementById('btnZurueck').click(); return 'back'; })()`);
  }, 6500);
  setTimeout(() => {
    evalJs(`(function(){ document.getElementById('btnModus0').click(); return 'modus0'; })()`);
  }, 7500);
  setTimeout(() => { shot('modus0'); }, 9000);
  setTimeout(() => {
    evalJs(`(function(){
      var bl = document.getElementById('btnLoesche'), bs = document.getElementById('btnSpreche');
      var sb = document.getElementById('btnSeite');
      return JSON.stringify({loescheVisible: bl?getComputedStyle(bl).display:null, sprechenVisible: bs?getComputedStyle(bs).display:null, seiteVisible: sb?getComputedStyle(sb).display:null});
    })()`);
  }, 9500);
  setTimeout(() => { ws.close(); process.exit(0); }, 11000);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if(j.id && pending[j.id] === 'Page.captureScreenshot' && j.result && j.result.data){
    const f = outDir + 'lshot_' + shotName + '.png';
    fs.writeFileSync(f, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot: ' + f);
  }
  if(j.result && j.result.result && j.result.result.value !== undefined){
    console.log('JS-Result: ' + JSON.stringify(j.result.result.value));
  }
});
ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 20000);
