// Regressionstest fuer Bugfix "Sonne erscheint sofort beim Aufruf von Modus 0":
// Cursor/Blick bleibt nach dem Klick auf #btnModus0 exakt an derselben Stelle
// stehen -- dort liegt zufaellig die "Sonne"-Kachel im neuen Grid. Der
// Hover-Recheck in dwell.js darf dies NICHT als bewusstes Hinsehen werten und
// die Kachel automatisch aktivieren (skipHoverRecheck in rebindDwell()).
const WebSocket = require('ws');
const fs = require('fs');
const tabId = process.argv[2];
const port = process.argv[3] || '9666';
const outDir = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\';

const ws = new WebSocket(`ws://localhost:${port}/devtools/page/${tabId}`);
let msgId = 0;
const pending = {};
function send(method, params){ const id=++msgId; pending[id]=method; ws.send(JSON.stringify({id, method, params: params||{}})); return id; }
function evalJs(expr){ return send('Runtime.evaluate', {expression: expr, returnByValue:true}); }

function moveGradually(toX, toY, fromX, fromY, steps, stepDelay, cb){
  let i = 0;
  const iv = setInterval(() => {
    i++;
    const x = fromX + (toX-fromX)*i/steps;
    const y = fromY + (toY-fromY)*i/steps;
    send('Input.dispatchMouseEvent', {type:'mouseMoved', x:x, y:y, pointerType:'mouse'});
    if(i >= steps){ clearInterval(iv); if(cb) cb(); }
  }, stepDelay);
}

ws.on('open', () => {
  send('Page.enable');
  send('Page.bringToFront');
  send('Page.reload');

  setTimeout(() => {
    console.log('step1: Position von #btnModus0 ermitteln');
    evalJs(`(function(){
      var b = document.getElementById('btnModus0');
      var rb = b.getBoundingClientRect();
      window.__cx = rb.x + rb.width/2; window.__cy = rb.y + rb.height/2;
      return JSON.stringify({x:window.__cx, y:window.__cy});
    })()`);
  }, 2500);

  setTimeout(() => {
    evalJs(`(function(){ return JSON.stringify({x:window.__cx, y:window.__cy}); })()`);
  }, 2700);
});

let coords = null;
ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if(j.result && j.result.result && j.result.result.value !== undefined){
    const val = j.result.result.value;
    console.log('JS-Result: ' + val);
    if(!coords){
      try{
        const v = JSON.parse(val);
        if(v && typeof v.x === 'number'){ coords = v; runSeq(); }
      }catch(e){}
    }
  }
});

function runSeq(){
  console.log('Koordinaten: x=' + coords.x + ' y=' + coords.y);
  console.log('step2: Cursor schrittweise zu #btnModus0 bewegen (echtes Hover/dwell-active wie Tobii-Blick)');
  moveGradually(coords.x, coords.y, 100, 100, 12, 60, () => {

    setTimeout(() => {
      console.log('step3: Klick (Cursor bleibt stehen) -> Wechsel zu Modus 0');
      send('Input.dispatchMouseEvent', {type:'mousePressed', x: coords.x, y: coords.y, button:'left', clickCount:1, pointerType:'mouse'});
      send('Input.dispatchMouseEvent', {type:'mouseReleased', x: coords.x, y: coords.y, button:'left', clickCount:1, pointerType:'mouse'});
    }, 200);

    setTimeout(() => {
      console.log('step4: Element an dieser Stelle nach Wechsel ermitteln (sollte "Sonne" sein)');
      evalJs(`(function(){
        var el = document.elementFromPoint(window.__cx, window.__cy);
        var k = el ? el.closest('.kachel') : null;
        return JSON.stringify({kachelName: k ? (k.querySelector('.kachel-name')||{}).textContent : null, hover: k ? k.matches(':hover') : null});
      })()`);
    }, 700);

    // Hover-Recheck wuerde bei T0+1300 pruefen -- direkt danach kontrollieren
    setTimeout(() => {
      console.log('step5: bei ~1.5s nach Wechsel -- Dwell auf "Sonne" gestartet? (FIX: sollte NEIN sein)');
      evalJs(`(function(){
        var act = document.querySelector('.kachel.dwell-active');
        var name = act ? (act.querySelector('.kachel-name')||{}).textContent : null;
        return JSON.stringify({dwellActiveKachel: name});
      })()`);
    }, 1700);

    // Bei ~2.2s waere die Kachel ohne Fix bereits angeklickt+gesprochen worden
    setTimeout(() => {
      console.log('step6: bei ~3s -- automatisch aktiviert/gesprochen? (FIX: sollte NEIN sein, zielAnzeige = "–")');
      evalJs(`(function(){
        var za = document.getElementById('zielAnzeige');
        var pa = document.getElementById('pfadAnzeige');
        var treffer = document.querySelectorAll('.kachel.ebene2-treffer').length;
        return JSON.stringify({zielAnzeige: za?za.textContent:null, pfadAnzeige: pa?pa.textContent:null, ebene2Treffer:treffer});
      })()`);
    }, 3200);

    setTimeout(() => { send('Page.captureScreenshot', {format:'png'}); }, 3400);
    setTimeout(() => { ws.close(); process.exit(0); }, 4200);
  });
}

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if(j.id && pending[j.id] === 'Page.captureScreenshot' && j.result && j.result.data){
    const f = outDir + 'notrigger_endzustand.png';
    fs.writeFileSync(f, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot: ' + f);
  }
});

ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 30000);
