
# command-router [![Build Status](https://travis-ci.org/jxson/command-router.png?branch=master)](https://travis-ci.org/jxson/command-router)

Writing simple, composable modules makes it easy to have your applications functionality available in multiple contexts. `command-router` aims to help you expose that functionality by providing a simple way to define a CLI with multiple actions (like `git`).

`command-router` provides:

* A simple way to declare routing definitions using normal functions.
* A clean way to define options, their aliases, and default values
* Coming Soon: Tab completion

If your app only has one command (like `curl` for instance) you should use a [different module]][optimist] instead of this one.

# Install

With [npm][npm] do:

    npm install command-router

# Example

In your bin or JS file:

    var cli = require('command-router')

    // Options are optional, and basic boolean options that default to
    // false can be simply defined
    cli.option('verbose')

    // Define the --port option with an alias of -p and set an
    // intelligent default
    cli.option({ name: 'port'
    , alias: 'p'
    , default: process.env.PORT || 8080
    , type: Number
    })

    cli.command('help', function(){
      console.log('commands: server')
    })

    cli.command('server', function(){
      if (cli.options.help) {
        return console.log('Help for server the command')
      }

      // code for running server here...
    })

    // Set the whole thing in motion...
    cli.parse(process.argv)

By default, if a route is not found `command-router` will throw unless you add add a listener for the `notfound` event (I couldn't think of a better way to handle this, if you have a better idea [let me know][issues]). This is important for instances when scripting your CLI and you need proper exit codes when piping to other utilities.

    cli.on('notfound', function(action){
      console.error('I don\'t know how to: ' + action)

      // you could even get smart and display some info about what
      // should happen next

      process.exit(1)
    })


# Methods

    var cli = require('command-router')

## cli.command(route, fn)

Define route matchers for your application using a string or regex for `route`, the `fn` function will be triggered if the `route` is matched when `cli.parse()` is called. The `fn` is called with `params` and `options` arguments which are also available directly on the cli object.

This routing style is heavily influenced by [sinatra][sinatra] and relies on the wonderful [routes][routes] module, for more details on how to define routes check it's [documentation][routes].

### Examples

    // simple stringed route
    cli.command('speak dog', function(){
      console.log('woof.')
    })

    // name params
    cli.command('speak :animal', function(){
      console.log(cli.params.animal)
    })

    // splats!
    cli.command('speak *', function(){
      console.log(cli.params.splat)
    })

    // regex, don't cut your self...
    cli.command(/speak (.*)$/, function(){
      console.log(cli.params.splat)
    })

## cli.option(params)

Define available options, their aliases, and default values.

### params

* `name`: The name of the option that will map to a command line
* `alias`: Allows a shorthand to be defined.
* `type`: Define the type for this flag. **Defaults to `Boolean`**
* `default`: The default value for the option being defined. **Defaults to `false`**

#### params.type

[nopt][nopt] is used for parsing the options internally. `params.type` will need to be one of the types defined in `nopt.typeDefs`:

* String: A normal string.  No parsing is done.
* path: A file system path.  Gets resolved against cwd if not absolute.
* url: A url.  If it doesn't parse, it isn't accepted.
* Number: Must be numeric.
* Date: Must parse as a date. If it does, and `Date` is one of the options,
  then it will return a Date object, not a string.
* Boolean: Must be either `true` or `false`.  If an option is a boolean,
  then it does not need a value, and its presence will imply `true` as
  the value.  To negate boolean flags, do `--no-whatever` or `--whatever
  false`
* NaN: Means that the option is strictly not allowed.  Any value will
  fail.
* Stream: An object matching the "Stream" class in node.  Valuable
  for use when validating programmatically.  (npm uses this to let you
  supply any WriteStream on the `outfd` and `logfd` config options.)
* Array: If `Array` is specified as one of the types, then the value
  will be parsed as a list of options.  This means that multiple values
  can be specified, and that the value will always be an array.

See the [nopt][nopt] documentation for more details.

### Examples

If the `params` object is missing keys for `type` and `default` the option will be defined as a `Boolean` type defaulting to `false` without an alias:

    cli.option({ name: 'verbose' })

    // Is the equivalent to:

    cli.option({ name: 'verbose'
    , type: Boolean
    , default: false
    })

    // And can be simplifed to

    cli.option('verbose')

To set an option for something like a `path` to a config file:

    var path = require('path')

    cli.option({ name: 'config'
    , alias: 'c'
    , default: '.haiku/config.js'
    , type: path
    })

## cli.parse(argv)

Parses the `argv` array and triggers the appropriate route.

# Built on the backs of better developers

This project is really just a simple API which wraps several other excellent libraries:

* [nopt][nopt]
* [routes][routes]

# License

MIT

[npm]: http://npmjs.org
[optimist]: https://npmjs.org/package/optimist
[issues]: https://github.com/jxson/command-router/issues
[routes]: https://npmjs.org/package/routes
[sinatra]: http://www.sinatrarb.com
[nopt]: https://npmjs.org/package/nopt
