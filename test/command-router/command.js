var assert = require('assert')
  , cli = require('../../lib/command-router')
;

describe('cli.command(route, callback)', function(){
  it('exists', function(){
    assert.ok(cli.command, 'cli.command does NOT exit')
  })

  it('does NOT throw', function(){
    assert.doesNotThrow(function(){
      cli.command('foo', function(){})
    }, Error)
  })

  it('is chain-able', function(){
    assert.equal(cli.command('foo', function(){})
    , cli
    , 'does NOT return the cli instance')
  })

  describe('stringed routes', function(){
    describe('without params', function(){
      var called
      ;

      beforeEach(function(){
        called = false

        cli.command('speak jawa', function(){ called = true })
        cli.parse([ 'program', 'speak', 'jawa' ])
      })

      it('triggers the callback', function(){
        assert.ok(called, 'route was NOT triggered')
      })

      it('has no params', function(){
        assert.equal(Object.keys(cli.params), 0, 'cli.params should be empty')
      });
    }); // describe('without params', ...

    describe('with named params', function(){
      var called
      ;

      beforeEach(function(){
        called = false

        cli.command('speak :language', function(){ called = true })
        cli.parse([ 'program', 'speak', 'jabba' ])
      })

      it('triggers the callback', function(){
        assert.ok(called, 'route was NOT triggered')
      })

      it('has proper params', function(){
        assert.ok(cli.params)
        assert.equal(cli.params.language, 'jabba', 'Missing named param')
      })
    }); // describe('with named params', ...

    describe('with splats', function(){
      var called
      ;

      beforeEach(function(){
        called = false

        cli.command('target *', function(){ called = true })
        cli.parse([ 'program', 'target', 'Alderaan' ])
      })

      it('triggers the callback', function(){
        assert.ok(called, 'route was NOT triggered')
      })

      it('has a splats param', function(){
        assert.ok(cli.params)
        assert.ok(cli.params.splats)
        assert.equal(cli.params.splats[0], 'Alderaan', 'Bad splats')
      })
    }); // describe('with splats', ...
  })

  describe('Regex', function(){
      var called
      ;

      beforeEach(function(){
        called = false

        cli.command(/destroy (.*)$/, function(){ called = true })
        cli.parse([ 'program', 'destroy', 'Tatooine' ])
      })

      it('triggers the callback', function(){
        assert.ok(called, 'route was NOT triggered')
      })

      it('has a splats param', function(){
        assert.ok(cli.params)
        assert.ok(cli.params.splats)
        assert.equal(cli.params.splats[0], 'Tatooine', 'Bad splats')
      })
  }); // describe('description', ...
})
