var exec   = require('child_process').exec;
var crypto = require("crypto");
var fs     = require("fs");
var path   = require("path");

module.exports = function(dirname, bin, code, done) {
  // Added assertion globally
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var sha = crypto.createHash('sha1').update(current_date + random).digest('hex');

  var inputPath = path.join(dirname, '.tmp'+sha+'.js');

  fs.writeFile(inputPath, code, function(err) {
    if(err) return done(err);

    exec(bin+" "+inputPath, function(err, stdout, stderr) {
      fs.unlink(inputPath);
      done(err, inputPath, stdout, stderr);
    });
  });
}
