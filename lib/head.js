process.on("uncaughtException", function(err) {
  console.error(
    JSON.stringify({
      name: 'AssertionError',
      actual: err.actual,
      stack: err.stack.toString(),
      expected: err.expected,
      operator: err.operator,
      message: err.message,
      generatedMessage: err.generatedMessage
    })
  );
  process.exit(1);
});

var assert = require("assert");
