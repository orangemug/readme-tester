var exec   = require('child_process').exec;
var path   = require("path");
var crypto = require("crypto");
var fs     = require("fs");
var assign = require("lodash.assign");

var debugErr = require("../debug-err");
var genErr   = require("../gen-err");

var headJs = fs.readFileSync(__dirname+"/../head.js").toString();


module.exports = function(dirname, codeOrig, done) {
  codeOrig = headJs+codeOrig;

  fs.readFile(dirname+"/package.json", function(err, raw) {
    if(err) return done(err);

    var pkg = JSON.parse(raw.toString());
    var re = new RegExp("require\\([\"']"+pkg.name+"(\/?[^\"']*)[\"']\\)", "g");

    var code = codeOrig
      .replace(re, function() {
        return "require(\""+dirname+"/"+RegExp.$1+"\")";
      });

    // Added assertion globally
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var sha = crypto.createHash('sha1').update(current_date + random).digest('hex');

    var inputPath = path.join(dirname, '.tmp'+sha+'.js');

    fs.writeFile(inputPath, code, function(err) {
      if(err) return done(err);

      exec('node '+inputPath, function(err, stdout, stderr) {
        fs.unlink(inputPath, function() {
          if(err) {
            // Try to print a better stack trace.
            var m, lineErr, message;
            var stackRe = new RegExp(inputPath+":(\\d+)(?::(\\d+))?");
            var lineErr = err.stack.match(stackRe);

            var data = JSON.parse(
              stderr.replace(/===readme-tester:start===([\s\S]*)===readme-tester:end===/m, "$1")
            );

            if(lineErr) {
              message = debugErr(codeOrig, lineErr[1], lineErr[2], data.stack)
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
      });
    });
  })
}
