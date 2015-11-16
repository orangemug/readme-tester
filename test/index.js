var assert = require("assert");
var readtest = require("../");

describe("readtest", function() {
  it("success", function(done) {
    readtest(__dirname+"/examples/success", function(err) {
      assert(!err);
      done();
    });
  });

  it("fail", function(done) {
    readtest(__dirname+"/examples/fail", function(err) {
      assert(err);
      done();
    });
  });

  it("main readme", function(done) {
    readtest(__dirname+"/../", function(err) {
      assert(!err);
      done();
    });
  });
});
