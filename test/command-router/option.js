var assert = require('../assert')
  , cli = require('../../lib/command-router')
;

describe('.option(params)', function(){
  it('returns the cli instance ', function(){
    assert.equal(cli.option({ flag: 'foo' })
    , cli
    , 'did NOT return the cli instance');
  });

  describe('without params', function(){
  }); // describe('without params', ...

  describe('with valid params', function(){
  }); // describe('with valid params', ...
}); // describe('.option(params)', ...

