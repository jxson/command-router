var CLI
;

CLI = function(options){

};

CLI.prototype.command = function(route, callback){
};

// cli.option('config', { alias: 'c'
//   , default: '.haiku/config.js'
//   , type: path
// });
CLI.prototype.option = function(name, options) {
};

// defaults to process.argv
CLI.prototype.parse = function(argv) {
};

CLI.prototype.dispatch = function(route) {
};

module.exports = new CLI();
module.exports.CLI = CLI;
