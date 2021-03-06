var fs     = require("fs");
var marked = require("marked");
var path   = require("path");

var debug   = require("./lib/debug");
var runners = require("./lib/runners");

/**
 * Readme tester runner
 * @param  {String} filepath        path to the markdown file to be tested
 * @param  {Object} opts            run options
 * @property {Boolean} opts.bash    whether to include bash parsing
 * @param  {Function} done          callback when test is complete. Node callback signature
 * @return {Void}                   no return value
 */
module.exports = function(filepath, opts, done) {
  if(done === undefined) {
    done = opts;
  }
  opts = opts || {};
  var code = {};

  var availLangs = ["js"]
  if(opts.bash) {
    availLangs.push("bash");
  }

  var dirname = path.dirname(filepath);

  var md = fs.readFile(filepath, function(err, raw) {
    if(err) return done(err);

    var md = raw.toString();
    var tokens = marked.lexer(md, {gfm: true});

    tokens
      .forEach(function(token) {
        var lang = token.lang;
        if(lang && availLangs.indexOf(lang) > -1 && token.type === "code") {
          code[lang] = code[lang] || "";
          code[lang] = code[lang] + token.text + "\n";
          return "";
        }
      });

    var toRun = [];
    var toRun = Object.keys(code)
      .map(function(lang) {
        var runner = runners[lang];
        if(!runner) {
          debug("no runner for lang: %s", lang);
        }
        return function(done) {
          runner(dirname, code[lang], done);
        };
      });

    toRun.shift()(function fn(err) {
      if(err) {
        done(err);
      }
      else if(toRun.length > 0) {
        toRun.shift()(fn)
      }
      else {
        done();
      }
    });
  })
}
