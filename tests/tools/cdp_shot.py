import asyncio, base64, json, time
import websockets, urllib.request

PAGE_ID = "0139495A9F71DB887096356B7B986732"
URL     = "file:///C:/Users/ThorstenLavinia/OneDrive/2026_05_12_Lernsystem/app/modules/quasselkiste/quasselkiste_training.html"
OUT     = r"C:\Users\ThorstenLavinia\lernplattform_laetitia\screenshot_aktuell.png"

async def main():
    uri = f"ws://localhost:9222/devtools/page/{PAGE_ID}"
    async with websockets.connect(uri) as ws:
        _id = 1

        async def send(method, **params):
            nonlocal _id
            msg = json.dumps({"id": _id, "method": method, "params": params})
            _id += 1
            await ws.send(msg)

        async def wait_for(method, timeout=10):
            deadline = time.time() + timeout
            while time.time() < deadline:
                raw = await asyncio.wait_for(ws.recv(), timeout=2)
                msg = json.loads(raw)
                if msg.get("method") == method:
                    return msg
            raise TimeoutError(f"No {method} within {timeout}s")

        await send("Page.enable")
        await send("Page.navigate", url=URL)
        await wait_for("Page.loadEventFired", timeout=12)
        await asyncio.sleep(0.8)

        # Stufe 1 klicken
        await send("Runtime.evaluate",
                   expression="document.getElementById('btnStufe1')?.click()")
        await asyncio.sleep(1.5)

        # Screenshot
        await send("Page.captureScreenshot", format="png", captureBeyondViewport=False)
        deadline = time.time() + 8
        while time.time() < deadline:
            raw = await asyncio.wait_for(ws.recv(), timeout=5)
            msg = json.loads(raw)
            if msg.get("result", {}).get("data"):
                with open(OUT, "wb") as f:
                    f.write(base64.b64decode(msg["result"]["data"]))
                print(f"Screenshot: {OUT}")
                return
        raise TimeoutError("No screenshot data")

asyncio.run(main())
