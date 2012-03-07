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
    it('parses option as a boolean ', function(){
      cli.option('verbose').parse(['haiku', '--verbose']);

      assert.equal(cli.options.verbose, true, 'NOT boolean');
    });

    it('parses option with a default value of false', function(){
      cli.option('verbose').parse(['haiku']);

      assert.equal(cli.options.verbose, false, 'wrong default');
    });
  }); // describe('without params', ...

  // describe('with valid params', function(){
  //   it('adds a new option with the correct properties', function(){
  //     cli.option('config', { alias: 'c'
  //     , default: '.haiku/config.js'
  //     , type: path
  //     });
  //
  //     var option = cli.options_[0]
  //     ;
  //
  //     console.log('option', option);
  //
  //     assert.equal(option.name, 'config', 'option.name is NOT boolean');
  //   });
  //
  //   describe('with a name argument in the params', function(){
  //
  //   }); // describe('with a name argument in the params', ...
  // }); // describe('with valid params', ...
}); // describe('.option(params)', ...

