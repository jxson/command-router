var CLI
  , nopt = require('nopt')
  , path = require('path')
  , colors = require('colors')
;

CLI = function(options){
  var cli = this
    , options = options || {}
  ;

  cli.slice = options.slice || 2
  cli.knownOptions = {}
  cli.shortHands = {}
  cli.defaults = {}
  cli.routes = []
};

CLI.prototype.command = function(path, callback){
  // TODO: require the callback and path
  var cli = this
    , pathIsString = path.constructor === String
    , params = []
  ;

  if (pathIsString) {
    // console.log('path is String');
  } else {
    console.log('path is regex');

    cli.routes.push({ path: path
    , callback: callback
    , params: []
    })
  }
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
    , route
  ;

  cli.options = nopt(cli.knownOptions, cli.shortHands, argv, cli.slice);

  // apply defaults
  Object.keys(cli.defaults).forEach(function(name){
    if (! cli.options[name]) cli.options[name] = cli.defaults[name]
  });

  if (cli.options.argv.remain) {
    cli.path = cli.options.argv.remain.join(' ')
  } else {
    cli.path = ''
  }


  // console.log(cli.options);

  console.log('cli.route'.magenta, cli.route);

  cli.dispatch(cli.path);
};

CLI.prototype.dispatch = function(path) {
  console.log('cli', this);

  console.log('dispatching'.yellow, path);
  console.log('routes'.inverse.red, this.routes);

  var cli = this
  ;

  cli.params = {}

  cli.splat = []

  for (var i in cli.routes) {
    console.log('route', cli.routes[i].path);

    var match = path.match(cli.routes[i].path)

    console.log('match'.magenta, match);

    if (match && match[0] && match[0] === path) {
      cli.routes[i].callback.call(cli);
      break;
    }
  }
};

module.exports = new CLI();
module.exports.CLI = CLI;
