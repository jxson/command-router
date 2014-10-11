
var test = require('tape')
var ComandRouter = require('../')
var path = require('path')
var run = require('./run')

test('cli.option(name)', function(t) {
  var cli = ComandRouter()
  .option('verbose')

  t.test('defaults', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.verbose, false)
      t.end()
    })

    run(cli, 'bam')
  })

  t.test('--option', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.verbose, true)
      t.end()
    })

    run(cli, '--verbose bam')
  })
})

test('cli.option(name, opts)', function(t) {
  var cli = ComandRouter()
  .option('config', {
    alias: 'c',
    default: '.haiku/config',
    type: path
  })

  t.test('defaults', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.config, path.resolve('.haiku/config'))
      t.end()
    })

    run(cli, 'bam')
  })

  t.test('--option', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.config, path.resolve('some/crazy/place'))
      t.end()
    })

    run(cli, '--config some/crazy/place bam')
  })

  t.test('alias', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.config, path.resolve('some/crazy/place'))
      t.end()
    })

    run(cli, '-c some/crazy/place bam')
  })
})

test('cli.option(opts)', function(t) {
  var cli = ComandRouter()
  .option({
    name: 'foo',
    alias: 'f',
    default: 'bar',
    type: String
  })

  t.test('defaults', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.foo, 'bar')
      t.end()
    })

    run(cli, 'bam')
  })

  t.test('--option', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.foo, 'bizzle')
      t.end()
    })

    run(cli, 'bam --foo bizzle')
  })

  t.test('alias', function(t) {
    cli.command('bam', function(params, options) {
      t.equal(options.foo, 'baz')
      t.end()
    })

    run(cli, '-f baz bam')
  })
})
