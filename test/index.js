
var test = require('tape')
var ComandRouter = require('../')
var EventEmitter = require('events').EventEmitter

test('var cli = router()', function(t) {
  t.equal(typeof ComandRouter, 'function')
  t.ok(new ComandRouter() instanceof ComandRouter)
  t.ok(ComandRouter() instanceof ComandRouter)
  t.ok(ComandRouter() instanceof EventEmitter)
  t.end()
})

require('fs')
.readdirSync(__dirname)
.forEach(function f(file) {
  if (file.match('test-')) require('./' + file)
})
