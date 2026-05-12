(function(){
  "use strict";
  // csv.js — minimal CSV/DSV parser (default delimiter ';')
  function parse(text, delimiter){
    delimiter = delimiter || ";";
    const rows = [];
    const lines = String(text||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");
    if(!lines.length) return rows;

    function splitLine(line){
      // Simple split (no quoted delimiter handling needed for our task files)
      return line.split(delimiter).map(x=>x.trim());
    }

    const header = splitLine(lines[0]);
    for(let i=1;i<lines.length;i++){
      const line = lines[i];
      if(!line || !line.trim()) continue;
      const cells = splitLine(line);
      const obj = {};
      for(let c=0;c<header.length;c++){
        obj[header[c]] = (cells[c] ?? "");
      }
      rows.push(obj);
    }
    return rows;
  }

  window.LaetitiaCSV = { parse };
})();