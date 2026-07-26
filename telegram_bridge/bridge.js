// bridge.js -- Laetitia Telegram-Bridge
// Empfaengt Nachrichten via Telegram-Bot und stellt sie per lokalem
// HTTP-Server (127.0.0.1:PORT) fuer das Nachrichten-Modul bereit.
// Laetitias Antworten werden zurueck an Telegram gesendet.
"use strict";

var fs   = require("fs");
var path = require("path");
var http = require("http");
var https = require("https");

// ── Config ───────────────────────────────────────────────────────────────────
var configPfad = path.join(__dirname, "config.json");
if(!fs.existsSync(configPfad)){
  console.error("FEHLER: config.json nicht gefunden.");
  console.error("Kopiere config.example.json nach config.json und fuege Token + Chat-ID ein.");
  process.exit(1);
}
var config = JSON.parse(fs.readFileSync(configPfad, "utf8"));

var PORT          = config.port || 3737;
var NACHR_DIR     = path.resolve(config.nachrichtenOrdner || path.join(__dirname, "nachrichten"));
var INBOX_DIR     = path.join(NACHR_DIR, "inbox");
var MEDIA_DIR     = path.join(NACHR_DIR, "media");
var ANTWORTOPTIONEN = config.antwortOptionen || [];

[INBOX_DIR, MEDIA_DIR].forEach(function(d){
  if(!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ── Telegram-Bot (Polling) ───────────────────────────────────────────────────
var TelegramBot = require("node-telegram-bot-api");
var bot = new TelegramBot(config.token, { polling: true });

bot.getMe().then(function(me){
  console.log("[Bridge] Bot verbunden: @" + me.username);
  console.log("[Bridge] Nachrichten-Ordner:", NACHR_DIR);
  console.log("[Bridge] HTTP-API: http://127.0.0.1:" + PORT);
}).catch(function(e){
  console.error("[Bridge] Bot-Verbindung fehlgeschlagen:", e.message);
  process.exit(1);
});

function erlaubt(chatId){
  if(!config.erlaubteChatIds || config.erlaubteChatIds.length === 0){
    console.log("[Bridge] Neue Chat-ID (bitte in config.json eintragen):", chatId);
    return true;
  }
  return config.erlaubteChatIds.indexOf(chatId) >= 0;
}

function dateiStem(msgId){ return "msg_" + msgId; }

function ladeMediaHerunter(fileId, zielPfad, danach){
  bot.getFileLink(fileId).then(function(url){
    var ziel = fs.createWriteStream(zielPfad);
    https.get(url, function(resp){
      resp.pipe(ziel);
      ziel.on("finish", function(){ ziel.close(); if(danach) danach(); });
    }).on("error", function(e){
      console.error("[Bridge] Download-Fehler:", e.message);
      if(danach) danach();
    });
  }).catch(function(e){
    console.error("[Bridge] FileLink-Fehler:", e.message);
    if(danach) danach();
  });
}

function speichereNachricht(eintrag, mediaFileId, mediaExt){
  var jsonPfad = path.join(INBOX_DIR, dateiStem(eintrag.id) + ".json");
  if(mediaFileId){
    var mediaPfad = path.join(MEDIA_DIR, dateiStem(eintrag.id) + mediaExt);
    eintrag.mediaPfad = "media/" + dateiStem(eintrag.id) + mediaExt;
    ladeMediaHerunter(mediaFileId, mediaPfad, function(){
      fs.writeFileSync(jsonPfad, JSON.stringify(eintrag, null, 2));
      console.log("[Bridge] Nachricht gespeichert:", eintrag.typ, "von", eintrag.von);
    });
  } else {
    fs.writeFileSync(jsonPfad, JSON.stringify(eintrag, null, 2));
    console.log("[Bridge] Nachricht gespeichert:", eintrag.typ, "von", eintrag.von);
  }
}

bot.on("message", function(msg){
  if(!erlaubt(msg.chat.id)) return;
  if(msg.from && msg.from.is_bot) return;

  var von = msg.from
    ? (msg.from.first_name + (msg.from.last_name ? " " + msg.from.last_name : ""))
    : "Unbekannt";

  var eintrag = {
    id:      msg.message_id,
    chatId:  msg.chat.id,
    von:     von,
    ts:      msg.date * 1000,
    text:    "",
    typ:     "text",
    gelesen: false
  };

  if(msg.text){
    eintrag.text = msg.text;
    eintrag.typ  = "text";
    speichereNachricht(eintrag, null, null);
  } else if(msg.photo){
    eintrag.text = msg.caption || "";
    eintrag.typ  = "foto";
    speichereNachricht(eintrag, msg.photo[msg.photo.length - 1].file_id, ".jpg");
  } else if(msg.voice){
    eintrag.text = msg.caption || "";
    eintrag.typ  = "voice";
    speichereNachricht(eintrag, msg.voice.file_id, ".ogg");
  } else if(msg.video){
    eintrag.text = msg.caption || "";
    eintrag.typ  = "video";
    speichereNachricht(eintrag, msg.video.file_id, ".mp4");
  } else if(msg.sticker){
    eintrag.text = msg.sticker.emoji || "(Sticker)";
    eintrag.typ  = "text";
    speichereNachricht(eintrag, null, null);
  }
});

bot.on("polling_error", function(e){
  console.error("[Bridge] Polling-Fehler:", e.message);
});

// ── HTTP-API fuer die Lernplattform ──────────────────────────────────────────
// Antwortet auf Anfragen von file:// mit Private-Network-Access-Header,
// damit Edge die Verbindung zu 127.0.0.1 erlaubt.

function setCors(res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Request-Private-Network");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

function serveMedia(req, res, urlPfad){
  var datei = path.basename(urlPfad);
  var full  = path.join(MEDIA_DIR, datei);
  if(!fs.existsSync(full)){ res.writeHead(404); res.end("not found"); return; }
  var ext = path.extname(datei).toLowerCase();
  var mime = { ".jpg":"image/jpeg", ".jpeg":"image/jpeg",
               ".png":"image/png",  ".gif":"image/gif",
               ".mp4":"video/mp4",  ".ogg":"audio/ogg",
               ".webm":"video/webm" };
  res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  fs.createReadStream(full).pipe(res);
}

var server = http.createServer(function(req, res){
  var url = req.url.split("?")[0];

  // Preflight
  if(req.method === "OPTIONS"){
    setCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // Media-Dateien
  if(url.startsWith("/media/")){
    serveMedia(req, res, url.slice(7));
    return;
  }

  setCors(res);

  // GET /status
  if(req.method === "GET" && url === "/status"){
    res.writeHead(200);
    res.end(JSON.stringify({ ok: true, port: PORT }));
    return;
  }

  // GET /inbox
  if(req.method === "GET" && url === "/inbox"){
    try{
      var dateien = fs.readdirSync(INBOX_DIR).filter(function(f){ return f.endsWith(".json"); });
      var liste = dateien.map(function(f){
        try{ return JSON.parse(fs.readFileSync(path.join(INBOX_DIR, f), "utf8")); }
        catch(e){ return null; }
      }).filter(Boolean);
      liste.sort(function(a, b){ return b.ts - a.ts; });
      res.writeHead(200);
      res.end(JSON.stringify(liste));
    }catch(e){
      res.writeHead(500);
      res.end(JSON.stringify({ fehler: e.message }));
    }
    return;
  }

  // GET /optionen
  if(req.method === "GET" && url === "/optionen"){
    res.writeHead(200);
    res.end(JSON.stringify(ANTWORTOPTIONEN));
    return;
  }

  // POST /gelesen/:id
  if(req.method === "POST" && url.startsWith("/gelesen/")){
    var msgId = url.slice(9);
    var jsonPfad = path.join(INBOX_DIR, "msg_" + msgId + ".json");
    if(!fs.existsSync(jsonPfad)){ res.writeHead(404); res.end("{}"); return; }
    var e = JSON.parse(fs.readFileSync(jsonPfad, "utf8"));
    e.gelesen = true;
    fs.writeFileSync(jsonPfad, JSON.stringify(e, null, 2));
    res.writeHead(200);
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // POST /antwort  { text, replyToId, chatId }
  if(req.method === "POST" && url === "/antwort"){
    var body = "";
    req.on("data", function(chunk){ body += chunk; });
    req.on("end", function(){
      try{
        var daten = JSON.parse(body);
        var text  = daten.text;
        if(!text){ res.writeHead(400); res.end(JSON.stringify({ fehler: "Kein Text" })); return; }
        var chatId = daten.chatId || config.antwortChatId ||
                     (config.erlaubteChatIds && config.erlaubteChatIds[0]);
        if(!chatId){ res.writeHead(500); res.end(JSON.stringify({ fehler: "Kein antwortChatId in config.json" })); return; }
        var opts = {};
        if(daten.replyToId) opts.reply_to_message_id = daten.replyToId;
        bot.sendMessage(chatId, "Laetitia: " + text, opts).then(function(){
          console.log("[Bridge] Antwort gesendet:", text);
          res.writeHead(200);
          res.end(JSON.stringify({ ok: true }));
        }).catch(function(e){
          console.error("[Bridge] Sende-Fehler:", e.message);
          res.writeHead(500);
          res.end(JSON.stringify({ fehler: e.message }));
        });
      }catch(e){
        res.writeHead(400);
        res.end(JSON.stringify({ fehler: "Ungueltige JSON-Anfrage" }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("{}");
});

server.listen(PORT, "127.0.0.1", function(){
  console.log("[Bridge] HTTP-API bereit auf http://127.0.0.1:" + PORT);
});
