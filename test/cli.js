var cli = require("../lib/cli.js");
var assert = require("assert");
var Runner = cli.test.Runner;
 
var mockRequire = function(name) {
  mockRequire.result = name;
  return mockRequire.module;
}

var mockProcess = {
  exit: function(code) {
    mockProcess.result = code;
  }
}


describe("exports", function() {

  it("should have a run method", function() {
    assert.ok(cli.run);
  });

});

describe("Runner", function() {
  it("should parse commands nicely", function() {
    var runner = new Runner();
    assert.equal(runner.getCommand([]), 'default');
    assert.equal(runner.getCommand(['sync']), 'sync');
    assert.equal(runner.getCommand(['more', 'than', 'one']), 'more');
  });

  it("should turn commands to paths", function() {
    var runner = new Runner();
    assert.equal(runner.commandAsPath('default'), './hub/default');
  });

  it("should attempt loading a command module", function() {
    var runner = new Runner({
      _: [ 'go' ]
    }, mockRequire, mockProcess);
    mockProcess.result = 0;
    mockRequire.result = null;
    runner.run();
    assert.equal(mockRequire.result, "./hub/go");
  });

  it("should attempt running a run method", function() {
    var argsPassed = null;
    mockRequire.module = {
      run: function(args) {
        argsPassed = args;
      }
    };
    var argv = { _: [ 'go' ] };
    var runner = new Runner(argv, mockRequire, mockProcess);
    mockProcess.result = 0;
    mockRequire.result = null;
    runner.run();
    assert.deepEqual(argsPassed, argv);
  });

});