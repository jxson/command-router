var assert = require('assert')
;

assert.isObject = function(obj, message){
  if (typeof(obj) !== 'object') {
    assert.fail(obj, 'object', message, '=== typeof', assert.isObject);
  }
}

assert.isFunction = function(fn, message){
  if (typeof(fn) !== 'function') {
    assert.fail(typeof(fn), 'function', message, 'typeof', assert.isFunction);
  }
}

module.exports = assert;
