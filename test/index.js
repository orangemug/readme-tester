var assert = require("assert");
var readtest = require("../");

describe("readme-tester", function() {
  var tests = [
    {
      desc: "success",
      filepath: __dirname+"/examples/success/README.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "success_inner",
      filepath: __dirname+"/examples/success_inner/README.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "success-multiple",
      filepath: __dirname+"/examples/success-multiple/README.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "success-promise",
      filepath: __dirname+"/examples/success-promise/README.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "should test a markdown file in a nested folder",
      filepath: __dirname+"/examples/nested_dirs/docs/documentation.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "fail",
      filepath: __dirname+"/examples/fail/README.md",
      assertion: function(err) {
        assert(err);
      }
    },
    {
      desc: "fail-promise",
      filepath: __dirname+"/examples/fail-promise/README.md",
      assertion: function(err) {
        assert(err);
      }
    },
    {
      desc: "bash (experimental)",
      filepath: __dirname+"/examples/bash/README.md",
      opts: {
        bash: true
      },
      assertion: function(err) {
        assert.ifError(err);
      }
    },
    {
      desc: "main readme",
      filepath: __dirname+"/../README.md",
      assertion: function(err) {
        assert.ifError(err);
      }
    },

  ];


  describe("callback", function() {
    tests.forEach(function(test) {
      it(test.desc, function(done) {
        readtest(test.filepath, test.opts, function(err) {
          test.assertion(err);
          done();
        });
      });
    });
  });

  describe("promise", function() {
    tests.forEach(function(test) {
      it(test.desc, function() {
        return readtest(test.filepath, test.opts)
          .then(function() {
            test.assertion();
          })
          .catch(function(err) {
            test.assertion(err);
          })
      });
    });
  });
});
