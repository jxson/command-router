var CLI
  , nopt = require('nopt')
  , path = require('path')
;

CLI = function(options){
  var cli = this
    , options = options || {}
  ;

  cli.slice = options.slice || 1
  cli.knownOptions = {}
  cli.shortHands = {}
  cli.defaults = {}
};

CLI.prototype.command = function(route, callback){
};


CLI.prototype.option = function(name, params) {
  var cli = this
    , params = typeof(name) === 'object' ? name : params || {}
  ;

  if (!params.name) params.name = name;

  if (! params.type) params.type = Boolean;
  if (! params.default) params.default = false;

  cli.knownOptions[params.name] = params.type;

  if (params.alias) cli.shortHands[params.alias] = '--' + params.name;

  if (typeof(params.default) !== 'undefined') {
    if (params.type === path) {
      cli.defaults[params.name] = path.resolve(params.default)
    } else {
      cli.defaults[params.name] = params.default
    }
  }

  return cli;
};

// defaults to process.argv
CLI.prototype.parse = function(argv) {
  var cli = this
    , options = {}
    , shorthands = {}
    , parsed
  ;

  cli.options = nopt(cli.knownOptions, cli.shortHands, argv, cli.slice);

  // apply defaults
  Object.keys(cli.defaults).forEach(function(name){
    if (! cli.options[name]) cli.options[name] = cli.defaults[name]
  });
};

CLI.prototype.dispatch = function(route) {
};

module.exports = new CLI();
module.exports.CLI = CLI;
