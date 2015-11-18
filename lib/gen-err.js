module.exports = function(data) {
  var err = new Error;
  err.name = 'AssertionError';
  err.actual   = data.actual;
  err.expected = data.expected;
  err.operator = data.operator;
  err.message  = data.message;
  err.stack    = data.stack;
  return err;
}
