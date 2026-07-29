// animation_mod.js -- Laetitia Lernsystem
// REGEL 1: Kein import(), kein type="module"
// REGEL 4: Nur gerade Anfuehrungszeichen

(function(){
"use strict";

// Szenen-Definitionen
var SZENEN=[
  {id:"sterne", name:"Sternenhimmel", audio:"./audio/sterne.mp3"},
  {id:"regen",  name:"Regen",         audio:"./audio/regen.mp3"},
  {id:"feuer",  name:"Feuer",         audio:"./audio/feuer.mp3"},
  {id:"ozean",  name:"Ozean",         audio:"./audio/ozean.mp3"},
  {id:"schmett",name:"Schmetterlinge",audio:"./audio/schmetterlinge.mp3"},
  {id:"schnee", name:"Schneefall",    audio:"./audio/schnee.mp3"}
];

var state={aktiv:0, animFrame:null, audio:null, spielt:false};
var partikel=[];

// ── Animationen ───────────────────────────────────────────────────────────────
function bauePartikel(svg,typ,w,h){
  partikel=[];
  svg.innerHTML="";
  var bg=document.createElementNS("http://www.w3.org/2000/svg","rect");
  bg.setAttribute("width",w); bg.setAttribute("height",h);

  if(typ==="sterne"){
    bg.setAttribute("fill","#0f172a"); svg.appendChild(bg);
    for(var i=0;i<80;i++){
      var c=document.createElementNS("http://www.w3.org/2000/svg","circle");
      var x=Math.random()*w; var y=Math.random()*h; var r=Math.random()*2+0.5;
      c.setAttribute("cx",x); c.setAttribute("cy",y); c.setAttribute("r",r);
      c.setAttribute("fill","#fff");
      partikel.push({el:c,x:x,y:y,r:r,speed:Math.random()*0.5+0.2,phase:Math.random()*Math.PI*2});
      svg.appendChild(c);
    }
    // Mond
    var mond=document.createElementNS("http://www.w3.org/2000/svg","circle");
    mond.setAttribute("cx",w*0.8); mond.setAttribute("cy",h*0.15); mond.setAttribute("r","35");
    mond.setAttribute("fill","#fde68a"); svg.appendChild(mond);
    var mondSchatten=document.createElementNS("http://www.w3.org/2000/svg","circle");
    mondSchatten.setAttribute("cx",w*0.8+15); mondSchatten.setAttribute("cy",h*0.15-8); mondSchatten.setAttribute("r","30");
    mondSchatten.setAttribute("fill","#0f172a"); svg.appendChild(mondSchatten);
  } else if(typ==="regen"){
    bg.setAttribute("fill","#1e3a5f"); svg.appendChild(bg);
    // Wolken
    [[w*0.2,h*0.1,"#4b5563"],[w*0.6,h*0.08,"#374151"],[w*0.4,h*0.06,"#6b7280"]].forEach(function(c){
      var el=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      el.setAttribute("cx",c[0]); el.setAttribute("cy",c[1]); el.setAttribute("rx","70"); el.setAttribute("ry","30");
      el.setAttribute("fill",c[2]); svg.appendChild(el);
    });
    for(var i2=0;i2<60;i2++){
      var l=document.createElementNS("http://www.w3.org/2000/svg","line");
      var x2=Math.random()*w; var y2=Math.random()*h;
      l.setAttribute("x1",x2); l.setAttribute("y1",y2); l.setAttribute("x2",x2+3); l.setAttribute("y2",y2+15);
      l.setAttribute("stroke","#93c5fd"); l.setAttribute("stroke-width","1.5"); l.setAttribute("opacity","0.7");
      partikel.push({el:l,x:x2,y:y2,speed:Math.random()*5+3,w:w,h:h});
      svg.appendChild(l);
    }
  } else if(typ==="feuer"){
    bg.setAttribute("fill","#0c0a00"); svg.appendChild(bg);
    for(var i3=0;i3<40;i3++){
      var c2=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      var x3=Math.random()*w; var y3=h*0.8+Math.random()*h*0.2;
      var rx=Math.random()*20+8; var ry=Math.random()*40+20;
      c2.setAttribute("cx",x3); c2.setAttribute("cy",y3); c2.setAttribute("rx",rx); c2.setAttribute("ry",ry);
      var farben2=["#ef4444","#f97316","#fbbf24","#ef4444"];
      c2.setAttribute("fill",farben2[Math.floor(Math.random()*farben2.length)]); c2.setAttribute("opacity","0.7");
      partikel.push({el:c2,x:x3,y:y3,rx:rx,ry:ry,speed:Math.random()*3+1,phase:Math.random()*Math.PI*2,w:w,h:h});
      svg.appendChild(c2);
    }
  } else if(typ==="ozean"){
    bg.setAttribute("fill","#0c4a6e"); svg.appendChild(bg);
    // Himmel
    var him=document.createElementNS("http://www.w3.org/2000/svg","rect");
    him.setAttribute("x",0); him.setAttribute("y",0); him.setAttribute("width",w); him.setAttribute("height",h*0.4);
    him.setAttribute("fill","#0ea5e9"); svg.appendChild(him);
    for(var i4=0;i4<8;i4++){
      var wave=document.createElementNS("http://www.w3.org/2000/svg","path");
      partikel.push({el:wave,row:i4,speed:Math.random()*2+1,phase:Math.random()*Math.PI*2,w:w,h:h});
      wave.setAttribute("fill","none"); wave.setAttribute("stroke","#7dd3fc"); wave.setAttribute("stroke-width","2"); wave.setAttribute("opacity","0.5");
      svg.appendChild(wave);
    }
  } else if(typ==="schmett"){
    bg.setAttribute("fill","#fdf4ff"); svg.appendChild(bg);
    // Blumenwiese
    var wiese=document.createElementNS("http://www.w3.org/2000/svg","rect");
    wiese.setAttribute("x",0); wiese.setAttribute("y",h*0.8); wiese.setAttribute("width",w); wiese.setAttribute("height",h*0.2);
    wiese.setAttribute("fill","#86efac"); svg.appendChild(wiese);
    var farben3=["#ec4899","#8b5cf6","#3b82f6","#f97316","#22c55e"];
    for(var i5=0;i5<6;i5++){
      var g=document.createElementNS("http://www.w3.org/2000/svg","g");
      var x4=Math.random()*w*0.8+w*0.1; var y4=Math.random()*h*0.6+h*0.1;
      var f=farben3[Math.floor(Math.random()*farben3.length)];
      // Flügel links
      var fl=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      fl.setAttribute("cx",x4-18); fl.setAttribute("cy",y4); fl.setAttribute("rx","18"); fl.setAttribute("ry","12");
      fl.setAttribute("fill",f); fl.setAttribute("opacity","0.85"); g.appendChild(fl);
      // Flügel rechts
      var fr=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      fr.setAttribute("cx",x4+18); fr.setAttribute("cy",y4); fr.setAttribute("rx","18"); fr.setAttribute("ry","12");
      fr.setAttribute("fill",f); fr.setAttribute("opacity","0.85"); g.appendChild(fr);
      // Körper
      var ko=document.createElementNS("http://www.w3.org/2000/svg","ellipse");
      ko.setAttribute("cx",x4); ko.setAttribute("cy",y4); ko.setAttribute("rx","4"); ko.setAttribute("ry","10");
      ko.setAttribute("fill","#1a1a2e"); g.appendChild(ko);
      partikel.push({el:g,x:x4,y:y4,vx:(Math.random()-0.5)*2,vy:(Math.random()-0.5)*1.5,flap:0,flapSpeed:Math.random()*0.2+0.1,w:w,h:h});
      svg.appendChild(g);
    }
  } else if(typ==="schnee"){
    bg.setAttribute("fill","#e0f2fe"); svg.appendChild(bg);
    // Boden
    var boden=document.createElementNS("http://www.w3.org/2000/svg","rect");
    boden.setAttribute("x",0); boden.setAttribute("y",h*0.85); boden.setAttribute("width",w); boden.setAttribute("height",h*0.15);
    boden.setAttribute("fill","#fff"); svg.appendChild(boden);
    for(var i6=0;i6<60;i6++){
      var c3=document.createElementNS("http://www.w3.org/2000/svg","circle");
      var x5=Math.random()*w; var y5=Math.random()*h;
      var r2=Math.random()*4+2;
      c3.setAttribute("cx",x5); c3.setAttribute("cy",y5); c3.setAttribute("r",r2);
      c3.setAttribute("fill","#fff"); c3.setAttribute("opacity","0.9");
      partikel.push({el:c3,x:x5,y:y5,speed:Math.random()*2+0.5,drift:Math.random()*1-0.5,r:r2,w:w,h:h});
      svg.appendChild(c3);
    }
  }
}

var tick=0;
function animationsSchritt(){
  tick++;
  var id=SZENEN[state.aktiv].id;
  partikel.forEach(function(p){
    if(id==="sterne"){
      var op=0.4+0.6*Math.abs(Math.sin(tick*p.speed*0.05+p.phase));
      p.el.setAttribute("opacity",op.toFixed(2));
    } else if(id==="regen"){
      p.y+=p.speed;
      if(p.y>p.h){ p.y=-15; p.x=Math.random()*p.w; }
      p.el.setAttribute("y1",p.y); p.el.setAttribute("x1",p.x);
      p.el.setAttribute("y2",p.y+15); p.el.setAttribute("x2",p.x+3);
    } else if(id==="feuer"){
      p.y-=p.speed;
      if(p.y<p.h*0.3){ p.y=p.h+Math.random()*50; p.x=Math.random()*p.w; }
      var wavex=Math.sin(tick*0.05+p.phase)*8;
      p.el.setAttribute("cx",p.x+wavex); p.el.setAttribute("cy",p.y);
      var op2=Math.max(0,Math.min(1,(p.h-p.y)/p.h));
      p.el.setAttribute("opacity",(op2*0.8).toFixed(2));
    } else if(id==="ozean"){
      var pts=[];
      for(var x6=0;x6<=p.w;x6+=20){
        var y6=p.h*0.4+p.h*0.08*p.row+20*Math.sin(x6*0.02+tick*p.speed*0.03+p.phase);
        pts.push(x6+","+y6.toFixed(1));
      }
      p.el.setAttribute("d","M"+pts[0]+" Q"+pts.slice(1).join(" "));
    } else if(id==="schmett"){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<30||p.x>p.w-30) p.vx*=-1;
      if(p.y<30||p.y>p.h*0.8) p.vy*=-1;
      p.flap+=p.flapSpeed;
      var scaleX=Math.abs(Math.sin(p.flap));
      p.el.setAttribute("transform","translate("+p.x.toFixed(1)+","+p.y.toFixed(1)+") scale("+scaleX.toFixed(2)+",1) translate("+(-(p.x)).toFixed(1)+","+(-(p.y)).toFixed(1)+")");
    } else if(id==="schnee"){
      p.y+=p.speed; p.x+=p.drift*Math.sin(tick*0.03);
      if(p.y>p.h*0.85){ p.y=-p.r*2; p.x=Math.random()*p.w; }
      p.el.setAttribute("cx",p.x.toFixed(1)); p.el.setAttribute("cy",p.y.toFixed(1));
    }
  });
  if(state.spielt) state.animFrame=requestAnimationFrame(animationsSchritt);
}

function ladeSzene(idx){
  state.aktiv=idx;
  var szene=SZENEN[idx];
  var buehne=document.getElementById("buehne");
  var svg=document.getElementById("buehnenSvg");
  var w=buehne.clientWidth-16; var h=buehne.clientHeight-80;
  svg.setAttribute("width",w); svg.setAttribute("height",h);
  svg.setAttribute("viewBox","0 0 "+w+" "+h);

  bauePartikel(svg,szene.id,w,h);
  document.querySelectorAll(".animBtn").forEach(function(b,i){b.classList.toggle("aktiv",i===idx);});

  // Audio laden
  if(state.audio){state.audio.pause();state.audio.src="";}
  state.audio=new Audio();
  state.audio.src=szene.audio;
  state.audio.loop=true;
  state.audio.addEventListener("canplay",function(){
    document.getElementById("audioStatus").textContent="🔊 "+szene.name;
  });
  state.audio.addEventListener("error",function(){
    document.getElementById("audioStatus").textContent="🔇 Kein Audio ("+szene.name+".mp3 ablegen)";
  });
  state.audio.load();

  if(state.spielt)startAnimation();
  rebindDwell();
}

function startAnimation(){
  state.spielt=true;
  if(state.audio)state.audio.play().catch(function(){});
  document.getElementById("btnPlay").textContent="⏸";
  animationsSchritt();
}
function stopAnimation(){
  state.spielt=false;
  if(state.audio)state.audio.pause();
  if(state.animFrame)cancelAnimationFrame(state.animFrame);
  document.getElementById("btnPlay").textContent="▶";
}

var _dh=null;
function rebindDwell(){
  var att=window.LaetitiaAttachDwell||function(){return{cancelDwell:function(){}};};
  if(_dh)_dh.cancelDwell();
  var ms=Math.min(parseInt(localStorage.getItem("laetitia_dwell_ms")) || 800, 1000);
  var lg=parseInt(localStorage.getItem("laetitia_leave_grace_ms"))||100;
  _dh=att("a.animBtn, a.steuerBtn, a.topBtn, #btnZurueck",{
    dwellMs:ms, leaveGrace:lg, onActivate:function(el){try{el.click();}catch(e){}}
  });
}

document.querySelectorAll(".animBtn").forEach(function(btn,i){
  btn.addEventListener("click",function(ev){ev.preventDefault();ladeSzene(i);});
});
document.getElementById("btnPlay").addEventListener("click",function(ev){
  ev.preventDefault(); if(state.spielt)stopAnimation(); else startAnimation();
});
document.getElementById("btnVorig").addEventListener("click",function(ev){
  ev.preventDefault(); ladeSzene((state.aktiv-1+SZENEN.length)%SZENEN.length);
});
document.getElementById("btnWeiter").addEventListener("click",function(ev){
  ev.preventDefault(); ladeSzene((state.aktiv+1)%SZENEN.length);
});

ladeSzene(0);
})();
