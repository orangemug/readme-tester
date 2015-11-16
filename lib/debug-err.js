module.exports = function(code, lineNo, charNo, around) {
  around = around || 3;

  var lines = code.split("\n");
  var whitespace = lines[lineNo-1].match(/^\s*/)[0];

  charNo = charNo || whitespace.length+1;

  out = "";
  for(var i=0; i<charNo-1; i++) {
    out += "=";
  }
  lines[lineNo-1]+="\n    "+(out + "^");

  var s = Math.max(0, lineNo-around);
  var e = Math.min(lineNo-1+around, lines.length);

  return "Error:\n\n"+lines
    .slice(s, e)
    .map(function(line) {
      return "    "+line
    })
    .join("\n")+"\n";
}


