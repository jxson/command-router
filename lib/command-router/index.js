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
  cli.router = new Router()
};

CLI.prototype.command = function(path, callback){
  var cli = this
  ;


  cli.router.addRoute(path, callback)

  return cli
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

  // console.log('cli.route'.magenta, cli.route);

  cli.dispatch(cli.path);
};

CLI.prototype.dispatch = function(path) {
  var cli = this
    , route = cli.router.match(path)
  ;

  if (! route) return

  cli.params = route.params
  if (route.splats.length) cli.params['splats'] = route.splats

  route.fn.call(cli)
};

module.exports = new CLI();
module.exports.CLI = CLI;
