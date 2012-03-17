var assert = require('../assert')
  , cli = require('../../lib/command-router')
  , path = require('path')
;

describe('cli.option(params)', function(){
  it('returns the cli instance ', function(){
    assert.equal(cli.option('foo')
    , cli
    , 'did NOT return the cli instance');
  });

  describe('without params', function(){
    beforeEach(function(){
      cli.option('verbose');
    });

    it('parses option as a boolean ', function(){
      cli.parse(['haiku', '--verbose']);

      assert.equal(cli.options.verbose, true, 'NOT boolean');
    });

    it('parses option with a default value of false', function(){
      cli.parse(['haiku']);

      assert.equal(cli.options.verbose, false, 'wrong default');
    });
  }); // describe('without params', ...

  describe('with valid params', function(){
    beforeEach(function(){
      cli.option('config', { alias: 'c'
      , default: '.haiku/config.js'
      , type: path
      });
    });

    it('applies the proper default', function(){
      var path_ = path.resolve('.haiku/config.js')
      ;

      cli.parse(['haiku']);

      assert.ok(cli.options.config, 'Missing option');
      assert.equal(cli.options.config, path_, 'Bad default');
    });

    it('accepts the alias', function(){
      var path_ = path.resolve('foo')
      ;

      cli.parse(['haiku', '-c', 'foo']);

      assert.ok(cli.options.config, 'Missing option');
      assert.equal(cli.options.config, path_, 'Bad default');
    });

    describe('with a name argument in the params', function(){
      beforeEach(function(){
        cli.option({ name: 'config'
        , alias: 'c'
        , default: '.haiku/config.js'
        , type: path
        });
      });

      it('adds the option', function(){
        cli.parse(['haiku']);

        assert.ok(cli.options.config);
      });

      it('applies the proper default', function(){
        var path_ = path.resolve('.haiku/config.js')
        ;

        cli.parse(['haiku']);

        assert.ok(cli.options.config, 'Missing option');
        assert.equal(cli.options.config, path_, 'Bad default');
      });

      it('accepts the alias', function(){
        var path_ = path.resolve('foo')
        ;

        cli.parse(['haiku', '-c', 'foo']);

        assert.ok(cli.options.config, 'Missing option');
        assert.equal(cli.options.config, path_, 'Bad default');
      });
    }); // describe('with a name argument in the params', ...
  }); // describe('with valid params', ...
}); // describe('.option(params)', ...
