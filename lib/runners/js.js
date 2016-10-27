var fs     = require("fs");
var assign = require("lodash.assign");
var readPkgUp = require("read-pkg-up");
var path = require("path");

var debugErr = require("../debug-err");
var genErr   = require("../gen-err");
var runCode  = require("./shared/run-code");

var headJs = fs.readFileSync(__dirname+"/../head.js").toString();

module.exports = function(dirname, codeOrig, done) {
  codeOrig = headJs+codeOrig;

  readPkgUp({cwd: dirname}).then(function (result) {

    var pkg = result.pkg;
    var srcPath = path.dirname(result.path);

    var re = new RegExp("require\\([\"']"+pkg.name+"(\/[^\"']*)?[\"']\\)", "g");

    var code = codeOrig
      .replace(re, function() {
        return "require(\""+srcPath+"/"+(RegExp.$1 || "")+"\")";
      });

    runCode(srcPath, "node", code, function(err, inputPath, stdout, stderr) {
      if(err) {
        // Try to print a better stack trace.
        var m, lineErr, message;
        var stackRe = new RegExp(inputPath+":(\\d+)(?::(\\d+))?");
        var lineErr = err.stack.match(stackRe);

        var data = JSON.parse(
          stderr.replace(/===readme-tester:start===([\s\S]*)===readme-tester:end===/m, "$1")
        );

        if(lineErr) {
          message = debugErr(codeOrig, lineErr[1], lineErr[2], data.stack);
        } else {
          message = data.message;
        }

        var errData = assign(
          data,
          {message: message}
        );

        done(genErr(errData));
      } else {
        done();
      }
    });
  })
  .catch(done);
}
