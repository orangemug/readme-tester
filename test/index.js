var assert = require("assert");
var readtest = require("../");

describe("readtest", function() {
  it("success", function(done) {
    readtest(__dirname+"/examples/success/README.md", function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("success-multiple", function(done) {
    readtest(__dirname+"/examples/success-multiple/README.md", function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("should test a markdown file in a nested folder", function(done) {
    readtest(__dirname+"/examples/nested_dirs/docs/documentation.md", function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("fail", function(done) {
    readtest(__dirname+"/examples/fail/README.md", function(err) {
      assert(err);
      done();
    });
  });

  it("bash (experimental)", function(done) {
    readtest(__dirname+"/examples/bash/README.md", {bash: true}, function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("main readme", function(done) {
    readtest(__dirname+"/../README.md", function(err) {
      assert.ifError(err);
      done();
    });
  });
});
