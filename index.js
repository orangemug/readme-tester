var fs     = require("fs");
var marked = require("marked");

var debug   = require("./lib/debug");
var runners = require("./lib/runners");


module.exports = function(dirname, done) {
  var code = {};

  var md = fs.readFile(dirname+"/README.md", function(err, raw) {
    if(err) return done(err);

    var md = raw.toString();
    var tokens = marked.lexer(md, {gfm: true});

    tokens
      .forEach(function(token) {
        var lang = token.lang;
        if(lang && token.type === "code") {
          code[lang] = code[lang] || "";
          code[lang] = code[lang] + token.text;
          return "";
        }
      });

    for(var lang in code) {
      var runner = runners[lang];
      if(runner) {
        runner(dirname, code[lang], done);
      } else {
        debug("no runner for lang: %s", lang);
      }
    }
  })
}
