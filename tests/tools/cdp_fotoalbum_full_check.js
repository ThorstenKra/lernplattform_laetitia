const WebSocket = require('ws');
const http = require('http');
const BASE = 'file:///C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/Fotos/';

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
  let consoleErrors = [];
  function send(method, params = {}) {
    return new Promise(resolve => {
      const m = id++;
      pending[m] = resolve;
      ws.send(JSON.stringify({ id: m, method, params }));
    });
  }
  function evalExpr(expr, awaitPromise) {
    return send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: !!awaitPromise });
  }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  ws.on('message', raw => {
    const msg = JSON.parse(raw);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(JSON.stringify(msg.params.exceptionDetails.exception));
    }
    if (msg.id && pending[msg.id]) {
      const cb = pending[msg.id];
      delete pending[msg.id];
      cb(msg.result);
    }
  });

  ws.on('open', async () => {
    try {
      await send('Page.enable');
      await send('Runtime.enable');

      // ── Alben-Uebersicht: alle Kacheln, Bildanzahl je Album ──
      await send('Page.navigate', { url: BASE + 'fotoalbum.html?t=' + Date.now() });
      await sleep(1200);
      const grid = await evalExpr(`(function(){
        var a = document.querySelectorAll("a.album-kachel");
        return Array.prototype.map.call(a, function(el,i){
          return { idx:i, name: el.querySelector(".album-kachel-name").textContent, anzahl: el.querySelector(".album-kachel-anzahl").textContent };
        });
      })()`);
      console.log('=== Alben-Uebersicht ===');
      console.log(JSON.stringify(grid.result.value, null, 0));

      // ── Jedes Album einzeln oeffnen, durchklicken, auf Fehler + kaputte Bilder pruefen ──
      const albumCount = grid.result.value.length;
      for (let i = 0; i < albumCount; i++) {
        consoleErrors = [];
        await send('Page.navigate', { url: BASE + 'fotoalbum.html?t=' + Date.now() });
        await sleep(1000);
        const open = await evalExpr(`(function(){
          var kacheln = document.querySelectorAll("a.album-kachel");
          var a = kacheln[${i}];
          a.click();
          return document.getElementById("diaAlbumname").textContent;
        })()`);
        await sleep(400);
        // Durch alle Fotos des Albums klicken (per Weiter), Bildladefehler pruefen
        const durchlauf = await evalExpr(`(async function(){
          var counter = document.getElementById("diaCounter");
          var img = document.getElementById("diaBild");
          var parts = counter.textContent.split(" / ");
          var total = parseInt(parts[1], 10);
          var kaputte = [];
          var texteGefunden = 0;
          for (var n = 0; n < total; n++) {
            await new Promise(function(r){ setTimeout(r, 60); });
            if (!img.complete || img.naturalWidth === 0) kaputte.push(n+1);
            var ov = document.getElementById("diaTextOverlay");
            if (ov.classList.contains("sichtbar") && ov.textContent.trim().length > 0) texteGefunden++;
            document.getElementById("btnNach").click();
          }
          return { total: total, kaputteBilder: kaputte, fotosMitText: texteGefunden };
        })()`, true);
        console.log('--- Album', i, JSON.stringify(open.result.value), '---');
        console.log('Durchlauf:', JSON.stringify(durchlauf.result ? durchlauf.result.value : durchlauf));
        console.log('Konsolenfehler:', consoleErrors.length ? JSON.stringify(consoleErrors) : 'keine');
      }

      // ── Idstein 2026 gezielt: Text + TTS-Trigger auf Foto 1 ──
      await send('Page.navigate', { url: BASE + 'fotoalbum.html?t=' + Date.now() });
      await sleep(1000);
      const idstein = await evalExpr(`(function(){
        var kacheln = document.querySelectorAll("a.album-kachel");
        var ziel = null;
        kacheln.forEach(function(k){ if(k.querySelector(".album-kachel-name").textContent.indexOf("Idstein") >= 0) ziel = k; });
        if(!ziel) return "NICHT_GEFUNDEN";
        ziel.click();
        return document.getElementById("diaAlbumname").textContent;
      })()`);
      await sleep(600);
      const idsteinCheck = await evalExpr(`(function(){
        var ov = document.getElementById("diaTextOverlay");
        return { text: ov.textContent, sichtbar: ov.classList.contains("sichtbar"), speaking: speechSynthesis.speaking };
      })()`);
      console.log('=== Idstein 2026 Foto 1 ===', JSON.stringify(idstein.result.value), JSON.stringify(idsteinCheck.result.value));

      // ── Sankt Peter Ording: SP3-Fix pruefen (21 statt 22 Fotos, keine Luecke) ──
      await send('Page.navigate', { url: BASE + 'fotoalbum.html?t=' + Date.now() });
      await sleep(1000);
      const spo = await evalExpr(`(function(){
        var kacheln = document.querySelectorAll("a.album-kachel");
        var ziel = null;
        kacheln.forEach(function(k){ if(k.querySelector(".album-kachel-name").textContent === "Sankt Peter Ording") ziel = k; });
        if(!ziel) return "NICHT_GEFUNDEN";
        var anzahl = ziel.querySelector(".album-kachel-anzahl").textContent;
        ziel.click();
        return { anzahl: anzahl, albumname: document.getElementById("diaAlbumname").textContent };
      })()`);
      console.log('=== Sankt Peter Ording Kachel ===', JSON.stringify(spo.result.value));

      ws.close();
      process.exit(0);
    } catch (e) {
      console.error('Testfehler:', e.message);
      process.exit(1);
    }
  });

  ws.on('error', e => { console.error(e.message); process.exit(1); });
  setTimeout(() => { console.error('Timeout'); process.exit(1); }, 60000);
}
