
var test = require('tape')
var ComandRouter = require('../')
var EventEmitter = require('events').EventEmitter
var run = require('./run')

test('var cli = router()', function(t) {
  t.equal(typeof ComandRouter, 'function')
  t.ok(new ComandRouter() instanceof ComandRouter)
  t.ok(ComandRouter() instanceof ComandRouter)
  t.ok(ComandRouter() instanceof EventEmitter)
  t.end()
})

test('cli.command("route", callback)', function(t) {
  var cli = ComandRouter()

  t.equal(cli.command('route', noop), cli, 'should be chainable')
  t.end()
})

test('cli.command("basic string")', function(t) {
  var cli = ComandRouter()

  cli.command('speak jawa', function(params, options) {
    t.equal(this, cli)
    t.deepEqual(params, {})
    t.deepEqual(cli.params, {})
    t.end()
  })

  run(cli, 'speak jawa')
})

test('cli.command("named :param")', function(t) {
  var cli = ComandRouter()

  cli.command('speak :language', function(params, options) {
    t.equal(cli.params.language, 'jawa')
    t.end()
  })

  run(cli, 'speak jawa')
})

test('cli.command("splats *")', function(t) {
  var cli = ComandRouter()

  cli.command('freeze *', function(params, options) {
    t.deepEqual(cli.params.splats, [ 'Han Solo' ])
    t.end()
  })

  run(cli, 'freeze Han Solo')
})

function noop() {}
