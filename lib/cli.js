var optimist = require("optimist");
var path = require("path");

function Runner(argv, require, process) {
  this.argv = argv;
  this.require = require;
  this.process = process;
}

Runner.prototype = {
  getCommand: function(args) {
    return args.shift() || "default"; 
  },
  commandAsPath: function(command) {
    return path.join(this.process.cwd(), "/hub/", command);
  },
  run: function() {
    var command = this.getCommand(this.argv._);
    var path = this.commandAsPath(command);
    try {
      var module = this.require(path);
      if (module && module.run) {
        module.run(this.argv);
      } else {
        console.error("The module '" + path + "' needs to export a 'run' method");
        this.process.exit(-1);
      }
    } catch(e) {
      console.log(e);
      console.error("Unable to run command '" + command + "'. " +
        "It needs '" + path + ".js'.");
      this.process.exit(e.code);
    }
  }
}

exports.test = {
  Runner: Runner
}

var runner = new Runner(optimist.argv, require, process);

exports.run = runner.run.bind(runner);