process.on("uncaughtException", function(err) {
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
});

var assert = require("assert");
