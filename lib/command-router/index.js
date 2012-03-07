var CLI
  , nopt = require('nopt')
;

CLI = function(options){
  var cli = this
    , options = options || {}
  ;

  cli.slice = options.slice || 1
  cli.options_ = [];
};

CLI.prototype.command = function(route, callback){
};


CLI.prototype.option = function(name, params) {
  var cli = this
    , params = params || {}
  ;

  // make sure the name exists
  // make sure the type exists

  params.name = name;

  if (! params.type) params.type = Boolean;
  if (! params.default) params.default = false;

  cli.options_.push(params);

  return cli;
};

// defaults to process.argv
CLI.prototype.parse = function(argv) {
  var cli = this
    , options = {}
    , shorthands = {}
    , parsed
  ;

  cli.options_.forEach(function(option){
    options[option.name] = option.type;

    if (option.alias) shorthands[option.alias] = ['--' + option.name]
  });

  cli.options = nopt(options, shorthands, argv, cli.slice);

  // apply defaults
  cli.options_.forEach(function(option){
    if (! cli.options[option.name] && option.default !== undefined) {
      cli.options[option.name] = option.default;
    }
  });

  // console.log('cli.options', cli.options);
};

CLI.prototype.dispatch = function(route) {
};

module.exports = new CLI();
module.exports.CLI = CLI;
