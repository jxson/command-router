
var assert = require('assert')
  , cli = require('../')
  , path = require('path')
  , noop = function(){}
  , run = function(route){
      var args = route.split(' ')
      args.unshift('/wherever/the/bin/is')
      args.unshift('node')
      cli.parse(args)
    }

describe('cli.option(name, [opts])', function(){
  before(function(){
    cli.on('notfound', noop)
  })

  it('is chain-able', function(){
    assert.equal(cli.option('foo'), cli)
  })

  describe('when name is a string', function(){
    it('defaults to false', function(){
      cli.option('verbose')
      run('')
      assert.equal(cli.options.verbose, false)
    })

    it('creates a boolean option', function(){
      cli.option('verbose')
      run('--verbose')
      assert.equal(cli.options.verbose, true)
    })
  })

  describe('with name and opts', function(){
    before(function(){
      cli.option('config', { alias: 'c'
      , default: '.haiku/config'
      , type: path
      })
    })

    it('adds the option', function(){
      run('--config some/crazy/place')

      assert.equal(cli.options.config, path.resolve('some/crazy/place'))
    })

    it('applies the default', function(){
      run('')

      assert.equal(cli.options.config, path.resolve('.haiku/config'))
    })

    it('accepts the alias', function(){
      run('-c foo')

      assert.equal(cli.options.config, path.resolve('foo'))
    })
  })

  describe('with straight opts', function(){
    before(function(){
      cli.option({ name: 'foo'
      , alias: 'f'
      , default: 'bar'
      , type: String
      })
    })

    it('adds the option', function(){
      run('--foo bizzle')

      assert.equal(cli.options.foo, 'bizzle')
    })

    it('uses the default', function(){
      run('')

      assert.equal(cli.options.foo, 'bar')
    })

    it('accepts the alias', function(){
      run('-f baz')

      assert.equal(cli.options.foo, 'baz')
    })
  })
})
