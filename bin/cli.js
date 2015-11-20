var assert       = require("assert");
var path         = require("path");
var readmeTester = require("../");
var yargs        = require("yargs");

var argv = yargs
  .usage("Test a README.\n\nUsage: $0 <path>")
  .help("help")
  .alias("h", "help")
  .argv;

var dirpath = path.resolve(
  argv._[0] || "."
);

readmeTester(dirpath, function(err) {
  if(err) {
    console.error(err.message);
    console.error("Stack trace:\n"+err.stack.replace(/^.*\n/, ""));
    process.exit(1);
  } else {
    process.exit(0);
  }
});

