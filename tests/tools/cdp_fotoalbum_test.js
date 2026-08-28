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
  const consoleErrors = [];
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
      await send('Page.navigate', { url: BASE + 'fotoalbum.html?t=' + Date.now() });
      await sleep(1500);

      await evalExpr('localStorage.setItem("laetitia_input_mode","tobii")');

      // Album buesum oeffnen (erste Kachel)
      const r1 = await evalExpr(`(function(){
        var a = document.querySelector("a.album-kachel");
        if(!a) return "KEINE_KACHEL";
        a.click();
        return document.getElementById("diaAlbumname").textContent;
      })()`);
      console.log('Album geoeffnet:', r1.result.value);
      await sleep(500);

      const r2 = await evalExpr(`(function(){
        var ov = document.getElementById("diaTextOverlay");
        return { sichtbar: ov.classList.contains("sichtbar"), text: ov.textContent, speaking: speechSynthesis.speaking };
      })()`);
      console.log('Foto 1 Overlay:', JSON.stringify(r2.result.value));

      // Weiter zu Foto 2 (per Klick auf btnNach)
      await evalExpr('document.getElementById("btnNach").click()');
      await sleep(400);
      const r3 = await evalExpr(`(function(){
        var ov = document.getElementById("diaTextOverlay");
        return { text: ov.textContent, counter: document.getElementById("diaCounter").textContent };
      })()`);
      console.log('Foto 2 nach Weiter:', JSON.stringify(r3.result.value));

      // Zurueck zu Foto 1, dann Vortragsmodus starten
      await evalExpr('document.getElementById("btnVor").click()');
      await sleep(300);
      await evalExpr('document.getElementById("btnVortragStart").click()');
      await sleep(300);
      const r4 = await evalExpr(`(function(){
        return {
          aktivClass: document.getElementById("screenDiashow").classList.contains("vortrag-aktiv"),
          stopSichtbar: getComputedStyle(document.getElementById("btnVortragStop")).display,
          navSichtbar: getComputedStyle(document.querySelector(".dia-btn-wrap")).display,
          counter: document.getElementById("diaCounter").textContent
        };
      })()`);
      console.log('Vortrag gestartet:', JSON.stringify(r4.result.value));

      // Warten bis TTS-Ende + 3s Pause + naechstes Foto (Foto1 kurzer Text, sollte nach ca 2-4s weiterschalten)
      await sleep(6000);
      const r5 = await evalExpr(`document.getElementById("diaCounter").textContent`);
      console.log('Counter nach 6s Vortrag (sollte >1/11 sein):', r5.result.value);

      // Vortrag beenden
      await evalExpr('document.getElementById("btnVortragStop").click()');
      await sleep(300);
      const r6 = await evalExpr(`(function(){
        return {
          aktivClass: document.getElementById("screenDiashow").classList.contains("vortrag-aktiv"),
          speaking: speechSynthesis.speaking
        };
      })()`);
      console.log('Vortrag beendet:', JSON.stringify(r6.result.value));

      // Zurueck zur Uebersicht
      await evalExpr('document.getElementById("btnZurUebersicht").click()');
      await sleep(300);

      // Editor-Seite testen
      await send('Page.navigate', { url: BASE + 'fotoalbum_editor.html?t=' + Date.now() });
      await sleep(1200);
      const r7 = await evalExpr(`(function(){
        var tas = document.querySelectorAll("textarea.textfeld");
        return { anzahl: tas.length, ersterText: tas[0] ? tas[0].value : null, titel: document.getElementById("albumTitel").textContent };
      })()`);
      console.log('Editor geladen:', JSON.stringify(r7.result.value));

      const r8 = await evalExpr(`(function(){
        document.getElementById("btnExport").click();
        var code = document.getElementById("exportCode").value;
        return { enthaeltText: code.indexOf("Krabben") >= 0, laenge: code.length };
      })()`);
      console.log('Export-Code:', JSON.stringify(r8.result.value));

      console.log('KONSOLENFEHLER:', consoleErrors.length ? JSON.stringify(consoleErrors) : 'keine');
      ws.close();
      process.exit(consoleErrors.length ? 1 : 0);
    } catch (e) {
      console.error('Testfehler:', e.message);
      process.exit(1);
    }
  });

  ws.on('error', e => { console.error(e.message); process.exit(1); });
  setTimeout(() => { console.error('Timeout'); process.exit(1); }, 30000);
}
