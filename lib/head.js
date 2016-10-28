(function() {
  function errorHdl(err) {
    if(err._fromReadmeTester) {
      return;
    }

    var markerStart = "===readme-tester:start===";
    var markerEnd   = "===readme-tester:end===";

    console.error(
      markerStart,
      JSON.stringify({
        name: 'AssertionError',
        actual: err.actual,
        stack: err.stack.toString(),
        expected: err.expected,
        operator: err.operator,
        message: err.message,
        generatedMessage: err.generatedMessage
      }),
      markerEnd
    );
    process.exit(1);
  }

  process.on("uncaughtException",  errorHdl);
  process.on("unhandledRejection", errorHdl);
})()

var assert = require("assert");
