var assert = require('assert')
  , cli = require('../')
  , noop = function(){}
  , run = function(route){
      var args = route.split(' ')
      args.unshift('/wherever/the/bin/is')
      args.unshift('node')
      cli.parse(args)
    }

describe('cli.command(route, fn)', function(){
  it('is chain-able', function(){
    assert.equal(cli.command('foo', noop), cli)
  })

  it('matches basic strings', function(done){
    cli.command('speak jawa', function(){
      assert.equal(typeof cli.params, 'object')
      assert.equal(Object.keys(cli.params), 0)
      done()
    })

    run('speak jawa')
  })

  it('matches named params', function(done){
    cli.command('speak :language', function(){
      assert.equal(typeof cli.params, 'object')
      assert.equal(cli.params.language, 'jabba')
      done()
    })

    run('speak jabba')
  })

  it('matches splats', function(done){
    cli.command('freeze *', function(){
      assert.ok(cli.params.splats)
      assert.equal(cli.params.splats[0], 'Han Solo')
      done()
    })

    run('freeze Han Solo')
  })
})
