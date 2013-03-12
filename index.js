
var nopt = require('nopt')
  , path = require('path')
  , Router = require('routes').Router
  , props = { defaults: { value: {} }
    , __router: { value: undefined }
    , knownOptions: { value: {} }
    , shortHands: { value: {} }
    , router: { get: getRouter }
  }

module.exports = Object.create({ command: command
, option: option
, parse: parse
, dispatch: dispatch
}, props)

function command(route, fn){
  var cli = this
    , route = route || '/'

  cli.router.addRoute(route, fn)

  return cli
}

function option(name, opts){
  var cli = this
    , opts = typeof(name) === 'object' ? name : opts || {}

  if (!opts.name) opts.name = name

  if (! opts.type) opts.type = Boolean
  if (! opts.default) opts.default = false

  cli.knownOptions[opts.name] = opts.type

  if (opts.alias) cli.shortHands[opts.alias] = '--' + opts.name

  if (typeof opts.default !== undefined) {
    if (opts.type === path) {
      cli.defaults[opts.name] = path.resolve(opts.default)
    } else {
      cli.defaults[opts.name] = opts.default
    }
  }

  return cli
}

function parse(argv) {
  var cli = this
    , options = {}
    , shorthands = {}
    , parsed
    , route

  cli.options = nopt(cli.knownOptions, cli.shortHands, argv, 2)

  Object.keys(cli.defaults).forEach(function(name){
    if (cli.options[name] === false) return
    if (! cli.options[name]) cli.options[name] = cli.defaults[name]
  });

  if (cli.options.argv.remain) {
    cli.path = cli.options.argv.remain.join(' ')
  } else {
    cli.path = ''
  }

  cli.dispatch(cli.path)
}

function dispatch(path) {
  var cli = this
    , path = path || '/'
    , route = cli.router.match(path)

  if (! route) return

  cli.params = route.params
  if (route.splats.length) cli.params['splats'] = route.splats

  route.fn.call(cli)
}

// utility for getting the router
function getRouter(){
  return this.__router || (this.__router = new Router())
}
