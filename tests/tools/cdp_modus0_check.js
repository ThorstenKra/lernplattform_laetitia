// Modus 0 Funktionstest: Start-Screen -> Modus0 -> Klick Ebene1 -> Ebene2 -> Ergebnis
const WebSocket = require('ws');
const fs = require('fs');
const tabId = process.argv[2];
const outDir = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\';

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${tabId}`);
let msgId = 0;
const pending = {};
function send(method, params){
  const id = ++msgId;
  pending[id] = method;
  ws.send(JSON.stringify({id, method, params: params||{}}));
  return id;
}
function evalJs(expr){ return send('Runtime.evaluate', {expression: expr, awaitPromise:false, returnByValue:true}); }
function shot(name){
  send('Page.captureScreenshot', {format:'png'});
  shotName = name;
}
let shotName = '';
let step = 0;

ws.on('open', () => {
  console.log('connected, reload page');
  send('Page.enable');
  send('Page.reload');
  setTimeout(() => {
    console.log('step1: click Modus0 button');
    evalJs(`(function(){ var b=document.getElementById('btnModus0'); if(b){ b.click(); return 'clicked'; } return 'not found'; })()`);
  }, 2500);
  setTimeout(() => { shot('modus0_start'); }, 4000);
  setTimeout(() => {
    console.log('step2: find a tile with a 2-step path and click it');
    evalJs(`(function(){
      var pfade = (window.QUASSELKISTE_PFADE||[]).filter(function(p){
        return p.wort && p.wort.length>=2 && p.wort.length<=60 &&
               p.wort.indexOf('Ôßþ')<0 && p.wort.indexOf('WIZARD')<0 && p.wort.indexOf('Mfrag')<0 &&
               /^[a-zA-ZäöüÄÖÜß\\s\\-!?,'.äöüÄÖÜß]+$/.test(p.wort);
      });
      var found = null;
      for(var i=0;i<pfade.length;i++){
        var p = pfade[i];
        if(p.pfad.length===2){ found = p.pfad[0]; break; }
      }
      if(!found) return 'no 2-step path found';
      var el = document.querySelector('.kachel[data-r="'+found.r+'"][data-c="'+found.c+'"]');
      if(!el) return 'tile not in DOM: r'+found.r+'c'+found.c;
      el.click();
      return 'clicked r'+found.r+'c'+found.c+': '+ (el.querySelector('.kachel-name')||{}).textContent;
    })()`);
  }, 5000);
  setTimeout(() => { shot('modus0_ebene2'); }, 6500);
  setTimeout(() => {
    console.log('step3: read state');
    evalJs(`(function(){
      var za = document.getElementById('zielAnzeige');
      var treffer = document.querySelectorAll('.kachel.ebene2-treffer').length;
      var leer = document.querySelectorAll('.kachel.ebene2-leer').length;
      return JSON.stringify({ausgabe: za?za.textContent:null, treffer:treffer, leer:leer});
    })()`);
  }, 7000);
  setTimeout(() => {
    console.log('step4: click a treffer-tile to speak result');
    evalJs(`(function(){ var el=document.querySelector('.kachel.ebene2-treffer'); if(el){ var r=el.getAttribute('data-r'),c=el.getAttribute('data-c'),n=(el.querySelector('.kachel-name')||{}).textContent; el.click(); return 'clicked treffer r'+r+'c'+c+' = '+n; } return 'no treffer'; })()`);
  }, 8000);
  setTimeout(() => { shot('modus0_ergebnis'); }, 9000);
  setTimeout(() => {
    evalJs(`(function(){ var za = document.getElementById('zielAnzeige'); return za ? za.textContent : null; })()`);
  }, 9500);
  setTimeout(() => {
    console.log('step5: wait for auto-clear, check ebene1 restored');
    evalJs(`(function(){
      var za = document.getElementById('zielAnzeige');
      var ebene2 = document.querySelectorAll('.kachel.ebene2-treffer, .kachel.ebene2-leer').length;
      return JSON.stringify({ausgabe: za?za.textContent:null, ebene2Reste: ebene2});
    })()`);
  }, 12000);
  setTimeout(() => { ws.close(); process.exit(0); }, 13000);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if(j.id && pending[j.id] === 'Page.captureScreenshot' && j.result && j.result.data){
    const f = outDir + 'shot_' + shotName + '.png';
    fs.writeFileSync(f, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot: ' + f);
  }
  if(j.result && j.result.result && j.result.result.value !== undefined){
    console.log('JS-Result: ' + JSON.stringify(j.result.result.value));
  }
});

ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 20000);
