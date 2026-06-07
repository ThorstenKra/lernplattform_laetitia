// Pfad-Anzeige-Check Modus 0: Ebene2 zeigt "<Kachelname> ->" und wird nach Loeschen geleert
const WebSocket = require('ws');
const fs = require('fs');
const tabId = process.argv[2];
const port = process.argv[3] || '9333';
const outDir = 'C:\\Users\\ThorstenLavinia\\lernplattform_laetitia\\';

const ws = new WebSocket(`ws://localhost:${port}/devtools/page/${tabId}`);
let msgId = 0;
const pending = {};
function send(method, params){ const id=++msgId; pending[id]=method; ws.send(JSON.stringify({id, method, params: params||{}})); return id; }
function evalJs(expr){ return send('Runtime.evaluate', {expression: expr, returnByValue:true}); }
let shotName = '';
function shot(name){ shotName = name; send('Page.captureScreenshot', {format:'png'}); }

ws.on('open', () => {
  send('Page.enable');
  send('Page.reload');
  setTimeout(() => {
    evalJs(`(function(){ var b=document.getElementById('btnModus0'); if(b){ b.click(); return 'clicked modus0'; } return 'not found'; })()`);
  }, 2500);
  setTimeout(() => {
    console.log('step: click tile with 2-step path');
    evalJs(`(function(){
      var pfade = (window.QUASSELKISTE_PFADE||[]).filter(function(p){
        return p.wort && p.wort.length>=2 && p.wort.length<=60 &&
               p.wort.indexOf('Ôßþ')<0 && p.wort.indexOf('WIZARD')<0 && p.wort.indexOf('Mfrag')<0 &&
               /^[a-zA-ZäöüÄÖÜß\\s\\-!?,'.äöüÄÖÜß]+$/.test(p.wort);
      });
      var found = null;
      for(var i=0;i<pfade.length;i++){ if(pfade[i].pfad.length===2){ found = pfade[i].pfad[0]; break; } }
      if(!found) return 'no path found';
      var el = document.querySelector('.kachel[data-r="'+found.r+'"][data-c="'+found.c+'"]');
      if(!el) return 'tile missing';
      el.click();
      return 'clicked r'+found.r+'c'+found.c;
    })()`);
  }, 4000);
  setTimeout(() => {
    console.log('step: read pfadAnzeige + zielAnzeige in Ebene 2');
    evalJs(`(function(){
      var pa = document.getElementById('pfadAnzeige');
      var za = document.getElementById('zielAnzeige');
      return JSON.stringify({pfadAnzeige: pa?pa.textContent:null, zielAnzeige: za?za.textContent:null});
    })()`);
  }, 5000);
  setTimeout(() => { shot('ebene2_mit_pfad'); }, 5500);
  setTimeout(() => {
    console.log('step: click treffer to finish word and trigger auto-clear');
    evalJs(`(function(){ var el=document.querySelector('.kachel.ebene2-treffer'); if(el){ el.click(); return 'clicked treffer'; } return 'no treffer'; })()`);
  }, 6500);
  setTimeout(() => {
    console.log('step: check pfadAnzeige cleared after auto-loesche');
    evalJs(`(function(){
      var pa = document.getElementById('pfadAnzeige');
      var za = document.getElementById('zielAnzeige');
      return JSON.stringify({pfadAnzeige: pa?pa.textContent:null, zielAnzeige: za?za.textContent:null});
    })()`);
  }, 9500);
  setTimeout(() => { ws.close(); process.exit(0); }, 10500);
});

ws.on('message', (data) => {
  const j = JSON.parse(data.toString());
  if(j.id && pending[j.id] === 'Page.captureScreenshot' && j.result && j.result.data){
    const f = outDir + 'pashot_' + shotName + '.png';
    fs.writeFileSync(f, Buffer.from(j.result.data, 'base64'));
    console.log('Screenshot: ' + f);
  }
  if(j.result && j.result.result && j.result.result.value !== undefined){
    console.log('JS-Result: ' + JSON.stringify(j.result.result.value));
  }
});
ws.on('error', e => { console.error('ERR:' + e.message); process.exit(1); });
setTimeout(() => { console.error('TIMEOUT'); process.exit(1); }, 20000);
