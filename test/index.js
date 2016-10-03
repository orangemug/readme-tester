var assert = require("assert");
var readtest = require("../");

describe("readtest", function() {
  it("success", function(done) {
    readtest(__dirname+"/examples/success", function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("success-multiple", function(done) {
    readtest(__dirname+"/examples/success-multiple", function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("fail", function(done) {
    readtest(__dirname+"/examples/fail", function(err) {
      assert(err);
      done();
    });
  });

  it("bash (experimental)", function(done) {
    readtest(__dirname+"/examples/bash", {bash: true}, function(err) {
      assert.ifError(err);
      done();
    });
  });

  it("main readme", function(done) {
    readtest(__dirname+"/../", function(err) {
      assert.ifError(err);
      done();
    });
  });
});
