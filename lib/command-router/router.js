
var Router
  , colors = require('colors')
;

Router = function(options){
  var options = options || {}
    , router = this
  ;

  router.routes = [];
};

Router.prototype.route = function(path, callback){
  var router = this
    , route = { callback: callback
      , keys: []
      }
  ;

  if (path.constructor === String) {
    var pattern = path.replace(/:\w+/g, '(.*?)')
      , matches = path.match(/:\w+/g) || []
    ;

    matches.forEach(function(match){
      route.keys.push(match.replace(':', ''))
    });

    route.regex = new RegExp('^' + pattern + '$');
  } else {
    route.keys.push('splat')
    route.regex = path;
  }

  router.routes.push(route);
};

module.exports = new Router();
