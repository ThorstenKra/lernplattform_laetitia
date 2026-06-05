(async function runAllTests() {
  var R = { pass:0, fail:0, warn:0, log:[] };
  function ok(n,d)  { R.pass++; R.log.push("PASS: " + n + (d?" ("+d+")":"")); }
  function fail(n,d){ R.fail++; R.log.push("FAIL: " + n + (d?" -- "+d:"")); }
  function warn(n,d){ R.warn++; R.log.push("WARN: " + n + (d?" -- "+d:"")); }
  function wait(ms) { return new Promise(function(r){ setTimeout(r,ms); }); }

  var felder = window.QUASSELKISTE_FELDER || [];
  var pfade  = (window.QUASSELKISTE_PFADE || []).filter(function(p){
    return p.wort && p.wort.length>=2 && p.wort.length<=40 &&
           p.wort.indexOf("Ôßþ")<0 && p.wort.indexOf("WIZARD")<0 &&
           p.wort.indexOf("Mfrag")<0 && /^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(p.wort);
  });

  // ── P1: DATENBASIS ─────────────────────────────────────────────────────────
  try {
    felder.length===60 ? ok("P1a: 60 Felder vorhanden") : fail("P1a: Felderanzahl","erwartet 60, ist "+felder.length);

    var r1=felder.filter(function(f){return f.r===1;});
    var r1s=r1.filter(function(f){return Array.isArray(f.seiten);});
    r1s.length===r1.length ? ok("P1b: Alle "+r1.length+" r=1-Felder haben seiten[]") : fail("P1b: "+(r1.length-r1s.length)+" r=1 ohne seiten[]");

    var f11=felder.find(function(f){return f.r===1&&f.c===1;});
    f11&&f11.name==="Standard" ? ok("P1c: r1c1 = \"Standard\"") : fail("P1c: r1c1","\""+(f11?f11.name:"fehlt")+"\"");

    var fs={}; felder.forEach(function(f){fs[f.r+"_"+f.c]=true;});
    var inv=[]; pfade.forEach(function(p){p.pfad.forEach(function(s){if(!fs[s.r+"_"+s.c])inv.push(p.wort+":r"+s.r+"c"+s.c);});});
    inv.length===0 ? ok("P1d: Alle "+pfade.length+" Pfade referenzieren gültige Kacheln") : fail("P1d: "+inv.length+" ungültige Koordinaten",inv.slice(0,3).join(", "));

    var n1=pfade.filter(function(p){return p.pfad.length===1;}).length;
    var n2=pfade.filter(function(p){return p.pfad.length===2;}).length;
    (n1>=600&&n2>=1200) ? ok("P1e: Pfadzahlen plausibel","S1:"+n1+" S2:"+n2) : fail("P1e: Pfadzahlen niedrig","S1:"+n1+" S2:"+n2);

    var feld11Seiten = f11 ? JSON.stringify(f11.seiten) : "?";
    ok("P1f: Seitenverteilung r=1",r1.map(function(f){return f.name+"="+JSON.stringify(f.seiten);}).join(" | "));
  } catch(e){fail("P1-Exception",e.message);}

  // ── P2: SEITEN-LOGIK ───────────────────────────────────────────────────────
  try {
    if(document.getElementById("startScreen")&&document.getElementById("startScreen").style.display!=="none"){
      document.getElementById("btnStufe2").click(); await wait(700);
    }
    var tries=4;
    while(document.getElementById("seiteLabel")&&document.getElementById("seiteLabel").textContent!=="S 1"&&tries-->0){
      document.getElementById("btnSeite").click(); await wait(200);
    }

    function unsichtbar(){ return Array.from(document.querySelectorAll(".kachel-unsichtbar")).map(function(el){return el.getAttribute("data-r")+"_"+el.getAttribute("data-c");}).sort().join(","); }
    function sollUnsichtbar(s){ return felder.filter(function(f){if(f.r!==1)return false;var ss=f.seiten||[];return ss.length===0||ss.indexOf(s)<0;}).map(function(f){return f.r+"_"+f.c;}).sort().join(","); }

    var u1i=unsichtbar(),u1s=sollUnsichtbar(1);
    u1i===u1s ? ok("P2a: S1 korrekt",""+document.querySelectorAll(".kachel-unsichtbar").length+" Kacheln unsichtbar") : fail("P2a: S1","soll:"+u1s+" ist:"+u1i);

    document.getElementById("btnSeite").click(); await wait(300);
    var u2i=unsichtbar(),u2s=sollUnsichtbar(2);
    u2i===u2s ? ok("P2b: S2 korrekt",""+document.querySelectorAll(".kachel-unsichtbar").length+" Kacheln unsichtbar") : fail("P2b: S2","soll:"+u2s+" ist:"+u2i);

    document.getElementById("btnSeite").click(); await wait(300);
    var u3i=unsichtbar(),u3s=sollUnsichtbar(3);
    u3i===u3s ? ok("P2c: S3 korrekt",""+document.querySelectorAll(".kachel-unsichtbar").length+" Kacheln unsichtbar") : fail("P2c: S3","soll:"+u3s+" ist:"+u3i);

    document.getElementById("btnSeite").click(); await wait(200);
    document.getElementById("seiteLabel").textContent==="S 1" ? ok("P2d: Zyklus S3→S1 korrekt") : fail("P2d: Zyklus","nach S3-Klick: "+document.getElementById("seiteLabel").textContent);

    var halloS1=document.querySelector(".kachel[data-r='1'][data-c='5']");
    var abcS1=document.querySelector(".kachel[data-r='1'][data-c='2']");
    (halloS1&&halloS1.classList.contains("kachel-unsichtbar")) ? ok("P2e: Hallo auf S1 korrekt unsichtbar") : fail("P2e: Hallo auf S1 sollte unsichtbar sein");
    (abcS1&&!abcS1.classList.contains("kachel-unsichtbar")) ? ok("P2f: ABC auf S1 korrekt sichtbar") : fail("P2f: ABC auf S1 sollte sichtbar sein");

    document.getElementById("btnSeite").click(); await wait(200);
    var halloS2=document.querySelector(".kachel[data-r='1'][data-c='5']");
    var abcS2=document.querySelector(".kachel[data-r='1'][data-c='2']");
    (halloS2&&!halloS2.classList.contains("kachel-unsichtbar")) ? ok("P2g: Hallo auf S2 korrekt sichtbar") : fail("P2g: Hallo auf S2 sollte sichtbar sein");
    (abcS2&&abcS2.classList.contains("kachel-unsichtbar")) ? ok("P2h: ABC auf S2 korrekt unsichtbar") : fail("P2h: ABC auf S2 sollte unsichtbar sein");

    document.getElementById("btnSeite").click(); await wait(200);
    var fussS3=document.querySelector(".kachel[data-r='1'][data-c='9']");
    (fussS3&&!fussS3.classList.contains("kachel-unsichtbar")) ? ok("P2i: Fussball auf S3 sichtbar (auf allen Seiten)") : fail("P2i: Fussball sollte auf S3 sichtbar sein");
    while(document.getElementById("seiteLabel").textContent!=="S 1"){document.getElementById("btnSeite").click();await wait(150);}
  } catch(e){fail("P2-Exception",e.message);}

  // ── P3: EBENE-2-VISUALISIERUNG (12 Erstschritte) ──────────────────────────
  try {
    var s2p=pfade.filter(function(p){return p.pfad.length===2;});
    var em={};
    s2p.forEach(function(p){
      var k=p.pfad[0].r+"_"+p.pfad[0].c;
      if(!em[k])em[k]={r:p.pfad[0].r,c:p.pfad[0].c,zweit:{}};
      em[k].zweit[p.pfad[1].r+"_"+p.pfad[1].c]=true;
    });
    var eks=Object.keys(em);
    ok("P3-Info: "+eks.length+" einzigartige Erstschritte");

    var r1keys=eks.filter(function(k){return em[k].r===1;}).slice(0,3);
    var r2keys=eks.filter(function(k){return em[k].r!==1;}).slice(0,9);
    var testkeys=r1keys.concat(r2keys);

    var e2fail=0,e2tot=0;
    for(var i=0;i<testkeys.length;i++){
      var es=em[testkeys[i]];
      if(es.r===1){
        var esf=felder.find(function(f){return f.r===es.r&&f.c===es.c;});
        var ess=esf?(esf.seiten||[]):[];
        if(ess.length>0){
          var tgt="S "+ess[0],att=0;
          while(document.getElementById("seiteLabel").textContent!==tgt&&att++<4){document.getElementById("btnSeite").click();await wait(150);}
        }
      }
      var el=document.querySelector(".kachel[data-r=\""+es.r+"\"][data-c=\""+es.c+"\"]");
      if(!el||el.classList.contains("kachel-unsichtbar"))continue;
      el.click(); await wait(750);

      var tr=Array.from(document.querySelectorAll(".ebene2-treffer")).map(function(e){return e.getAttribute("data-r")+"_"+e.getAttribute("data-c");});
      var lr=Array.from(document.querySelectorAll(".ebene2-leer")).map(function(e){return e.getAttribute("data-r")+"_"+e.getAttribute("data-c");});
      var erw=Object.keys(es.zweit);
      var fehlt=erw.filter(function(k){return tr.indexOf(k)<0;});
      var falschLr=erw.filter(function(k){return lr.indexOf(k)>=0;});
      var richtigEl2=document.querySelector(".kachel.richtig");

      if(fehlt.length>0||falschLr.length>0){
        e2fail++;
        fail("P3-"+testkeys[i],"fehlend:["+fehlt.join(",")+"] falschLeer:["+falschLr.join(",")+"]");
      }
      if(!richtigEl2){e2fail++;fail("P3-"+testkeys[i]+"-richtig","kein .richtig auf geklickter Kachel");}
      e2tot++;

      document.getElementById("btnWeiter").click(); await wait(1700);
    }
    e2fail===0 ? ok("P3a: Ebene-2-Visualisierung",""+e2tot+"/"+e2tot+" Erstschritte korrekt") : fail("P3a: Ebene-2",""+e2fail+"/"+e2tot+" Fehler");
  } catch(e){fail("P3-Exception",e.message);}

  // ── P4: FALSCHER ERSTKLICK ─────────────────────────────────────────────────
  try {
    var s2p4=pfade.filter(function(p){return p.pfad.length===2;});
    var estSet={};
    s2p4.forEach(function(p){estSet[p.pfad[0].r+"_"+p.pfad[0].c]=true;});
    var nichtErst=felder.filter(function(f){return !estSet[f.r+"_"+f.c]&&f.r>=2&&f.r<=6;}).slice(0,6);

    ok("P4-Info: "+nichtErst.length+" Kacheln getestet die nie Erstschritt sind","z.B. "+nichtErst.slice(0,3).map(function(f){return f.name+"(r"+f.r+"c"+f.c+")";}).join(", "));

    var f4err=0;
    for(var fi=0;fi<nichtErst.length;fi++){
      var nf=nichtErst[fi];
      var nfEl=document.querySelector(".kachel[data-r=\""+nf.r+"\"][data-c=\""+nf.c+"\"]");
      if(!nfEl)continue;
      nfEl.click(); await wait(200);
      var leerN=document.querySelectorAll(".ebene2-leer").length;
      var falschMk=nfEl.classList.contains("falsch");
      if(leerN>5){f4err++;fail("P4-"+nf.name,"Ebene 2 geöffnet ("+leerN+" gedimmt) — sollte nicht");}
      if(!falschMk){f4err++;fail("P4-"+nf.name,"falsch-Klasse fehlt");}
      await wait(600);
    }
    f4err===0 ? ok("P4a: Falscher Erstklick","6/6 korrekt — kein Ebene-2, falsch-Markierung gesetzt") : fail("P4a: "+f4err+" Fehler");
  } catch(e){fail("P4-Exception",e.message);}

  // ── P5: VOLLSTÄNDIGER FLOW (5 Pfade) ──────────────────────────────────────
  try {
    var s2p5=pfade.filter(function(p){return p.pfad.length===2;});
    var flowFail=0;
    for(var pi=0;pi<5;pi++){
      document.getElementById("btnWeiter").click(); await wait(1800);
      var aktZiel=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
      var aktP=s2p5.find(function(p){return p.wort===aktZiel;});
      if(!aktP){warn("P5-"+pi,"Zielwort '"+aktZiel+"' nicht in Stufe-2-Pfaden"); continue;}

      var p0=aktP.pfad[0];
      if(p0.r===1){
        var p0f=felder.find(function(f){return f.r===p0.r&&f.c===p0.c;});
        var p0s=p0f?(p0f.seiten||[]):[];
        if(p0s.length>0){var t0="S "+p0s[0],a0=0;while(document.getElementById("seiteLabel").textContent!==t0&&a0++<4){document.getElementById("btnSeite").click();await wait(150);}}
      }
      var el0=document.querySelector(".kachel[data-r=\""+p0.r+"\"][data-c=\""+p0.c+"\"]");
      if(!el0||el0.classList.contains("kachel-unsichtbar")){flowFail++;fail("P5-"+pi,"Erstschritt-Kachel nicht klickbar für '"+aktZiel+"'");continue;}
      el0.click(); await wait(750);

      var p1=aktP.pfad[1];
      var el1=document.querySelector(".kachel[data-r=\""+p1.r+"\"][data-c=\""+p1.c+"\"]");
      if(!el1){flowFail++;fail("P5-"+pi,"Zweitschritt-Kachel fehlt");continue;}
      if(!el1.classList.contains("ebene2-treffer")&&!el1.classList.contains("richtig")){
        flowFail++;fail("P5-"+pi,"Zweitschritt '"+aktZiel+"' r"+p1.r+"c"+p1.c+" nicht in ebene2-treffer");continue;
      }
      el1.click(); await wait(500);

      var leerN5=document.querySelectorAll(".ebene2-leer").length;
      var trN5=document.querySelectorAll(".ebene2-treffer").length;
      if(leerN5>0||trN5>0){flowFail++;fail("P5-"+pi,"Ebene 1 nicht korrekt wiederhergestellt nach '"+aktZiel+"' (leer:"+leerN5+" treffer:"+trN5+")");}
      else ok("P5-"+pi+": '"+aktZiel+"' vollständig durchgeklickt");
      await wait(2000);
    }
    flowFail===0 ? ok("P5a: Vollständiger Flow — 5/5 Pfade erfolgreich") : fail("P5a: "+flowFail+"/5 Pfade fehlerhaft");
  } catch(e){fail("P5-Exception",e.message);}

  // ── P6: STUFE 1 STICHPROBE ────────────────────────────────────────────────
  try {
    document.getElementById("btnZurueck").click(); await wait(500);
    document.getElementById("btnStufe1").click(); await wait(700);

    var s1p6=pfade.filter(function(p){return p.pfad.length===1;});
    var s1Fail=0;
    for(var si=0;si<8;si++){
      var aktZ1=(document.getElementById("zielAnzeige")||{textContent:""}).textContent.replace("Finde: ","").trim();
      var aktP1=s1p6.find(function(p){return p.wort===aktZ1;});
      if(!aktP1){document.getElementById("btnWeiter").click();await wait(1200);s1Fail++;continue;}

      var falscheF=felder.find(function(f){return !(f.r===aktP1.pfad[0].r&&f.c===aktP1.pfad[0].c)&&f.r>=2;});
      if(falscheF){
        var fEl=document.querySelector(".kachel[data-r=\""+falscheF.r+"\"][data-c=\""+falscheF.c+"\"]");
        if(fEl){fEl.click();await wait(200);}
        var lN=document.querySelectorAll(".ebene2-leer").length;
        if(lN>0){s1Fail++;fail("P6-"+si,"Stufe 1 zeigt Ebene 2 nach falschem Klick");}
      }

      var rEl=document.querySelector(".kachel[data-r=\""+aktP1.pfad[0].r+"\"][data-c=\""+aktP1.pfad[0].c+"\"]");
      if(!rEl){s1Fail++;document.getElementById("btnWeiter").click();await wait(1200);continue;}
      var statB=(document.getElementById("statsAnzeige")||{textContent:""}).textContent;
      var gelB=parseInt((statB.match(/(\d+)\s*gelöst/)||[0,0])[1])||0;
      rEl.click(); await wait(2600);
      var statA=(document.getElementById("statsAnzeige")||{textContent:""}).textContent;
      var gelA=parseInt((statA.match(/(\d+)\s*gelöst/)||[0,0])[1])||0;
      if(gelA<=gelB){s1Fail++;fail("P6-"+si,"gelöst-Zähler nicht erhöht nach richtigem Klick auf '"+aktZ1+"'");}
      else ok("P6-"+si+": '"+aktZ1+"' Stufe 1 korrekt");
    }
    s1Fail===0 ? ok("P6a: Stufe 1 — 8/8 Tests bestanden") : fail("P6a: Stufe 1 — "+s1Fail+" Fehler");
  } catch(e){fail("P6-Exception",e.message);}

  return JSON.stringify({bestanden:R.pass,fehlgeschlagen:R.fail,warnungen:R.warn,log:R.log},null,2);
})()
