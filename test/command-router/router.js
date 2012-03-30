var assert = require('../assert')
  , router = require('../../lib/command-router/router')
;

describe('router', function(){
  it('is a Router instance', function(){
    assert.ok(router, '`router` is not defined');
    assert.ok(router.route, '.route() is missing');
  });

  describe('.route(path, callback)', function(){
    var path
      , callback
    ;

    afterEach(function(){
      router.routes = []; // reset the routing table
    });

    describe('when `path` is a RegExp', function(){
      beforeEach(function(){
        path = /foo (.*)/;
        callback = function(){};

        router.route(path, callback);
      });

      it('appends a new route to `router.routes`', function(){
        assert.equal(router.routes.length, 1, 'Missing route');

        var route = router.routes[0]
        ;

        assert.equal(route.regex, path, '`regex` does NOT match `path`');
        assert.ok(route.keys, 'Bad `keys`');
        assert.equal(route.keys.length, 1, '`keys` should only have 1 entry');
        assert.equal(route.keys[0], 'splat', '`keys[0]` should === "splat"');
      });
    }); // describe('when `path` is a RegExp', ...

    describe('when `path` is a string', function(){
      beforeEach(function(){
        path = 'string';
        callback = function(){};

        router.route(path, callback);
      });

      it('appends a new route to `router.routes`', function(){
        assert.equal(router.routes.length, 1, 'Missing route');

        var route = router.routes[0]
        ;

        assert.ok(path.match(route.regex), 'Bad `regex`');
        assert.ok(route.keys, 'Bad `keys`');
        assert.equal(route.keys.length, 0, '`keys` should have 0 entries');
      });
    }); // describe('when `path` is a string', ...

    describe('when `path` is a string with a named param', function(){
      beforeEach(function(){
        path = 'make :bread';
        callback = function(){};

        router.route(path, callback);
      });

      it('appends a new route to `router.routes`', function(){
        assert.equal(router.routes.length, 1, 'Missing route');

        var route = router.routes[0]
        ;

        assert.ok('make rye'.match(route.regex), 'Bad `regex`');
        assert.ok(route.keys, 'Bad `keys`');
        assert.equal(route.keys.length, 1, '`keys` should have 1 entries');
        assert.equal(route.keys[0], 'bread', '`keys[0]` should === "bread"');
      });
    }); // describe('when `path` is a string ', ...
  }); // describe('.route(path, callback)', ...
}); // describe('router', ...

/*

the router needs:

* A way to dispatch paths (trigger the callbacks)

# string routes

* access to the named params

# regex routes

* access to splat params (the regex matches)
* trigger more than one route based on the matching

https://github.com/aaronblohowiak/routes.js

*/
