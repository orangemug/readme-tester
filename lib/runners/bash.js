var fs = require("fs");
var path = require("path");
var resolvePkg = require('resolve-pkg');
var shellescape = require('shell-escape');


var genErr   = require("../gen-err");
var runCode  = require("./shared/run-code");


module.exports = function(dirname, codeOrig, done) {

  fs.readFile(dirname+"/package.json", function(err, raw) {
    if(err) return done(err);
    var code = codeOrig;

    var headSh = "set -e;\nsource "+path.resolve(
      resolvePkg("bash-assert")+"/assert.sh"
    );

    var reS = /^## >>(\/tmp\/.*)$/
    var reM = /^## (.*)$/
    var reE = /^## <</

    var currentFile;
    var files = {};

    newCode = "";

    var lines = code.split("\n")
    lines.forEach(function(line, idx) {
      if(line.match(reS)) {
        currentFile = RegExp.$1;
        files[currentFile] = "";
      } else if(line.match(reE)) {
        var expected = shellescape([
          files[currentFile]
            .replace(/^\s+/, "")
            .replace(/\s+$/, "")
        ]);

        newCode += "assert \"$(cat "+currentFile+")\" == "+expected+"; rm "+currentFile
        currentFile = null;
      } else if(currentFile && line.match(reM)) {
        files[currentFile] += RegExp.$1 + "\n";
      } else {
        newCode += "\n"+line+"\n";
      }
    });

    headSh = headSh + '\nbasedir="$(dirname "$0")"\n'

    var pkg = JSON.parse(raw.toString());
    for(bin in pkg.bin) {
      headSh = headSh + "\n"+bin+"() {\n$basedir/"+pkg.bin[bin]+" \"$@\" \n}"
    }

    code = headSh+"\n"+newCode;

    runCode(dirname, "bash", code, function(err, inputPath, stdout, stderr) {
      if(err) {
        var message, m = err.message.match(/^(Assertion failed:\s+(".*")\s(.*)\s(".*"))$/m)
        if(m) {
          done(
            genErr({
              message: m[1],
              operator: m[3],
              stack: err.stack,
              actual: m[2],
              expected: m[4]
            })
          );
        } else {
          done(err);
        }

      } else {
        done();
      }
    });
  });
}
