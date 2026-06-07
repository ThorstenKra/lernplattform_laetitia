"""
cdp_test_phase2.py -- Phase 2 Seiten-Logik Test via Python CDP
Diagnoseskript: laeuft Phase 2 ohne PowerShell-CancellationToken-Problem
"""
import asyncio, json, time
import websockets, urllib.request

PAGE_PATTERN = "quasselkiste_training"

async def main():
    # Tab finden
    with urllib.request.urlopen("http://localhost:9222/json") as r:
        tabs = json.loads(r.read())
    tab = next(t for t in tabs if PAGE_PATTERN in t.get("url",""))
    ws_url = tab["webSocketDebuggerUrl"]
    print(f"Tab: {tab['url']}")

    async with websockets.connect(ws_url, max_size=10*1024*1024) as ws:
        _id = 1

        async def send_eval(expr, await_promise=True, timeout_ms=60000):
            nonlocal _id
            msg_id = _id; _id += 1
            payload = json.dumps({
                "id": msg_id,
                "method": "Runtime.evaluate",
                "params": {
                    "expression": expr,
                    "awaitPromise": await_promise,
                    "timeout": timeout_ms
                }
            })
            await ws.send(payload)
            while True:
                raw = await asyncio.wait_for(ws.recv(), timeout=timeout_ms/1000 + 5)
                msg = json.loads(raw)
                if msg.get("id") == msg_id:
                    return msg.get("result", {}).get("result", {}).get("value")

        # Zustandscheck
        state = await send_eval(
            '(function(){ var ss=document.getElementById("startScreen"); '
            'return "ss=" + (ss?ss.style.display:"NULL") + " grid=" + '
            '(document.getElementById("grid")? document.getElementById("grid").style.display:"NULL"); })()',
            await_promise=False, timeout_ms=5000
        )
        print(f"Zustand vor Test: {state}")

        # Zur Startseite navigieren (falls im Training)
        await send_eval(
            '(async function(){ '
            'function wait(ms){return new Promise(function(r){setTimeout(r,ms);})} '
            'if(document.getElementById("startScreen") && document.getElementById("startScreen").style.display==="none"){'
            '  document.getElementById("btnZurueck").click(); await wait(600); }'
            'return "startScreen.display=" + document.getElementById("startScreen").style.display; '
            '})()',
            timeout_ms=5000
        )

        # Phase 2 JS
        js_phase2 = r"""
(async function(){
  var R=[];
  var felder=window.QUASSELKISTE_FELDER||[];
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);})}
  if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
    document.getElementById("btnStufe2").click();await wait(800);
  }
  var t=5;while(document.getElementById("seiteLabel")&&document.getElementById("seiteLabel").textContent!=="S 1"&&t-->0){document.getElementById("btnSeite").click();await wait(200);}
  function unsichtbar(){return Array.from(document.querySelectorAll(".kachel-unsichtbar")).map(function(el){return el.getAttribute("data-r")+"_"+el.getAttribute("data-c");}).sort().join(",");}
  function soll(s){return felder.filter(function(f){if(f.r!==1)return false;var ss=f.seiten||[];return ss.length===0||ss.indexOf(s)<0;}).map(function(f){return f.r+"_"+f.c;}).sort().join(",");}
  var u1i=unsichtbar(),u1s=soll(1);
  u1i===u1s?R.push("PASS P2a: S1 korrekt ("+document.querySelectorAll(".kachel-unsichtbar").length+" unsichtbar)"):R.push("FAIL P2a: S1 -- soll="+u1s+" ist="+u1i);
  document.getElementById("btnSeite").click();await wait(300);
  var u2i=unsichtbar(),u2s=soll(2);
  u2i===u2s?R.push("PASS P2b: S2 korrekt"):R.push("FAIL P2b: S2 -- soll="+u2s+" ist="+u2i);
  document.getElementById("btnSeite").click();await wait(300);
  var u3i=unsichtbar(),u3s=soll(3);
  u3i===u3s?R.push("PASS P2c: S3 korrekt"):R.push("FAIL P2c: S3 -- soll="+u3s+" ist="+u3i);
  document.getElementById("btnSeite").click();await wait(200);
  document.getElementById("seiteLabel").textContent==="S 1"?R.push("PASS P2d: Zyklus S3->S1 korrekt"):R.push("FAIL P2d: "+document.getElementById("seiteLabel").textContent);
  var h1=document.querySelector(".kachel[data-r='1'][data-c='5']");
  (h1&&h1.classList.contains("kachel-unsichtbar"))?R.push("PASS P2e: Hallo unsichtbar auf S1"):R.push("FAIL P2e: Hallo muss auf S1 unsichtbar sein");
  document.getElementById("btnSeite").click();await wait(200);
  var h2=document.querySelector(".kachel[data-r='1'][data-c='5']");
  (h2&&!h2.classList.contains("kachel-unsichtbar"))?R.push("PASS P2f: Hallo sichtbar auf S2"):R.push("FAIL P2f: Hallo muss auf S2 sichtbar sein");
  document.getElementById("btnSeite").click();await wait(200);
  var fs=document.querySelector(".kachel[data-r='1'][data-c='9']");
  (fs&&!fs.classList.contains("kachel-unsichtbar"))?R.push("PASS P2g: Fussball sichtbar auf S3"):R.push("FAIL P2g: Fussball muss auf S3 sichtbar");
  while(document.getElementById("seiteLabel").textContent!=="S 1"){document.getElementById("btnSeite").click();await wait(150);}
  return R.join("|");
})()
"""
        print("Phase 2 laeuft...")
        t0 = time.time()
        result = await send_eval(js_phase2, timeout_ms=30000)
        elapsed = time.time() - t0
        print(f"Phase 2 abgeschlossen in {elapsed:.1f}s:")
        if result:
            for line in result.split("|"):
                print(f"  {line}")
        else:
            print(f"  result=None (Fehler oder Timeout)")

asyncio.run(main())
