var assert = require('../assert')
  , cli = require('../../lib/command-router')
;

describe('cli', function(){
  it('should be a CLI instance', function(){
    assert.isObject(cli, 'cli is NOT an object');
    assert.isFunction(cli.command, 'command is NOT a method');
    assert.isFunction(cli.option, 'option is NOT a method');
    assert.isFunction(cli.parse, 'parse is NOT a method');
    assert.isFunction(cli.dispatch, 'dispatch is NOT a method');
  });

  it('should have a CLI class constructor', function(){
    var instance
    ;

    assert.equal(typeof cli.CLI, 'function');

    instance = new cli.CLI();

    assert.isFunction(instance.command, 'command is NOT a method');
    assert.isFunction(instance.option, 'option is NOT a method');
    assert.isFunction(instance.parse, 'parse is NOT a method');
    assert.isFunction(instance.dispatch, 'dispatch is NOT a method');
  });
}); // describe('cli', ...