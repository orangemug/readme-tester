module.exports = function(code, lineNo, charNo, stack, linesArround) {
  linesArround = linesArround || 3;

  var padding = "        ";
  var lines = code.split("\n");
  var whitespace = lines[lineNo-1].match(/^\s*/)[0];

  charNo = charNo || whitespace.length+1;

  out = "";
  for(var i=0; i<charNo-1; i++) {
    out += "=";
  }
  lines[lineNo-1]+="\n"+padding+(out + "^");

  var s = Math.max(0, lineNo-linesArround);
  var e = Math.min(lineNo-1+linesArround, lines.length);

  function padFn(line) {
    return padding+line
  }

  return stack.split("\n")[0]+"\n\n" +
		lines.slice(s, e)
    .map(padFn)
    .join("\n")+"\n"
}


