var extend = require('xtend')
var inherits = require('util').inherits
var EE = require('events').EventEmitter
var Router = require('routes')
var nopt = require('nopt')
var path = require('path')

module.exports = CommandRouter

function CommandRouter(options) {
  if (!(this instanceof CommandRouter)) return new CommandRouter(options)

  var cli = this

  cli.router = new Router()
  cli.knownOptions = {}
  cli.shortHands = {}
  cli.defaults = {}

  EE.call(cli)
}

inherits(CommandRouter, EE)

CommandRouter.prototype.command = function(route, callback) {
  var cli = this
  var route = route || '/'

  cli.router.addRoute(route, callback)

  return cli
}

CommandRouter.prototype.parse = function(argv) {
  var cli = this

  cli.options = nopt(cli.knownOptions, cli.shortHands, argv, 2)

  Object.keys(cli.defaults).forEach(function(name){
    if (cli.options[name] === false) return
    if (! cli.options[name]) cli.options[name] = cli.defaults[name]
  });

  cli.path = cli.options.argv.remain.join(' ')


  cli.dispatch(cli.path)
}

CommandRouter.prototype.dispatch = function(path) {
  var cli = this
  var path = path || '/'
  var action = (path === '/') ? '' : path
  var route = cli.router.match(path)

  if (! route) {
    if (cli.listeners('notfound').length === 0) {
      throw new Error('No CLI action defined for: "' + action + '"')
    } else return cli.emit('notfound', action)
  }

  cli.params = route.params

  if (route.splats.length) cli.params.splats = route.splats

  route.fn.call(cli, cli.params, cli.options)
}

CommandRouter.prototype.option = function(name, opts) {
  var cli = this
  var opts = typeof(name) === 'object' ? name : opts || {}

  if (!opts.name) opts.name = name

  if (! opts.type) opts.type = Boolean
  if (! opts.default) opts.default = false

  cli.knownOptions[opts.name] = opts.type

  if (opts.alias) cli.shortHands[opts.alias] = '--' + opts.name

  if (typeof opts.default !== undefined) {
    if (opts.type === path && opts.default) {
      cli.defaults[opts.name] = path.resolve(opts.default)
    } else {
      cli.defaults[opts.name] = opts.default
    }
  }

  return cli
}
