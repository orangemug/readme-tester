var crypto = require("crypto");
var exec   = require('child_process').exec;
var fs     = require("fs");
var marked = require("marked");
var path   = require("path");


var tempFiles = {};

module.exports = function(dirname, done) {
  var pkg = JSON.parse(
    fs.readFileSync(dirname+"/package.json").toString()
  );

  var md = fs.readFileSync(dirname+"/README.md").toString();

  var tokens = marked.lexer(md, {gfm: true});

  var re = new RegExp("require\\([\"']"+pkg.name+"(\/?[^\"']*)[\"']\\)");

  var code = tokens
    .map(function(token) {
      if(token.type === "code" && token.lang === "js") {
        return token.text;
      } else {
        return "";
      }
    })
    .join("")
    .replace(re, function() {
      return "require(\""+dirname+"/"+RegExp.$1+"\")";
    });

  // Added assertion globally
  code = "var assert = require('assert');\n"+code;

  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var sha = crypto.createHash('sha1').update(current_date + random).digest('hex');

  var inputPath = path.join(dirname, '.tmp'+sha+'.js');
  tempFiles[inputPath] = true;

  fs.writeFile(inputPath, code, function(err) {
    if(err) return done(err);

    exec('node '+inputPath, function(err, stdout, stderr) {
      fs.unlink(inputPath, function() {
        done(err);
      });
    });
  });
}
