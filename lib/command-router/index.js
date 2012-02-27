var CLI
;

CLI = function(options){

};

CLI.prototype.command = function(route, callback){
};

CLI.prototype.option = function(name, options) {
  var cli = this
  ;

  return cli;
};

// defaults to process.argv
CLI.prototype.parse = function(argv) {
};

CLI.prototype.dispatch = function(route) {
};

module.exports = new CLI();
module.exports.CLI = CLI;
