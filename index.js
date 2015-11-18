var crypto = require("crypto");
var exec   = require('child_process').exec;
var fs     = require("fs");
var marked = require("marked");
var path   = require("path");
var assert = require("assert");
var assign = require("lodash.assign");

var debugErr = require("./lib/debug-err");
var genErr   = require("./lib/gen-err");

var headJs = fs.readFileSync(__dirname+"/lib/head.js").toString()


var tempFiles = {};

module.exports = function(dirname, done) {
  var pkg = JSON.parse(
    fs.readFileSync(dirname+"/package.json").toString()
  );

  var md = fs.readFileSync(dirname+"/README.md").toString();

  var tokens = marked.lexer(md, {gfm: true});

  var re = new RegExp("require\\([\"']"+pkg.name+"(\/?[^\"']*)[\"']\\)", "g");

  var codeOrig = tokens
    .map(function(token) {
      if(token.type === "code" && token.lang === "js") {
        return token.text;
      } else {
        return "";
      }
    })
    .join("");


  codeOrig = headJs+codeOrig;

  var code = codeOrig
    .replace(re, function() {
      return "require(\""+dirname+"/"+RegExp.$1+"\")";
    });

  // Added assertion globally

  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var sha = crypto.createHash('sha1').update(current_date + random).digest('hex');

  var inputPath = path.join(dirname, '.tmp'+sha+'.js');
  tempFiles[inputPath] = true;

  fs.writeFile(inputPath, code, function(err) {
    if(err) return done(err);

    exec('node '+inputPath, function(err, stdout, stderr) {
      fs.unlink(inputPath, function() {
        if(err) {
          // Try to print a better stack trace.
          var m, lineErr, message;
          var stackRe = new RegExp(inputPath+":(\\d+)(?::(\\d+))?");
          var lineErr = err.stack.match(stackRe);

          var data = JSON.parse(stderr);

          if(lineErr) {
            message = debugErr(codeOrig, lineErr[1], lineErr[2], data.message)
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
}
