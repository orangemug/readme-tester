var fs     = require("fs");
var marked = require("marked");

var debug   = require("./lib/debug");
var runners = require("./lib/runners");


module.exports = function(dirname, opts, done) {
  if(done === undefined) {
    done = opts;
  }
  opts = opts || {};
  var code = {};

  var availLangs = ["js"]
  if(opts.bash) {
    availLangs.push("bash");
  }

  var md = fs.readFile(dirname+"/README.md", function(err, raw) {
    if(err) return done(err);

    var md = raw.toString();
    var tokens = marked.lexer(md, {gfm: true});

    tokens
      .forEach(function(token) {
        var lang = token.lang;
        if(lang && availLangs.indexOf(lang) > -1 && token.type === "code") {
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
