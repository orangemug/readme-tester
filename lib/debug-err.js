module.exports = function(code, lineNo, charNo, linesAround) {
  linesAround = linesAround || 3;

  var padding = "    ";
  var lines = code.split("\n");
  var whitespace = lines[lineNo-1].match(/^\s*/)[0];

  charNo = charNo || whitespace.length+1;

  out = "";
  for(var i=0; i<charNo-1; i++) {
    out += "=";
  }
  lines[lineNo-1]+="\n"+padding+(out + "^");

  var s = Math.max(0, lineNo-linesAround);
  var e = Math.min(lineNo-1+linesAround, lines.length);

  return "Error:\n\n"+lines
    .slice(s, e)
    .map(function(line) {
      return padding+line
    })
    .join("\n")+"\n";
}


