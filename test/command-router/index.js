var assert = require('../assert')
  , cli = require('../../lib/command-router')
;

describe('cli', function(){
  it('should be a CLI instance', function(){
    assert.isObject(cli, 'cli is NOT an object');
    assert.isFunction(cli.command, 'cli.command() is NOT a method');
    assert.isFunction(cli.option, 'cli.option() is NOT a method');
    assert.isFunction(cli.parse, 'cli.parse() is NOT a method');
    assert.isFunction(cli.dispatch, 'cli.dispatch() is NOT a method');
  });
}); // describe('cli', ...