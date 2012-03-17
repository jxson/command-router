command-router option() -- Define options for your CLI
======================================================

## SYNOPSIS

    cli.option(params)

## Description

Provides an entry point to define options for the `CLI` instance.

* `params`

    declares specific attributes of the option.

### params

* `name`: The name of the option that will map to a command line
* `alias`: Allows a shorthand to be defined.
* `type`: Define the type for this flag. **Defaults to `Boolean`**
* `default`: The default value for the option being defined. **Defaults to `false`**

#### Types

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

## Defaults

If the `params` object is missing keys for `type` and `default` the option will be defined as a `Boolean` type defaulting to `false` without an alias:

    cli.option({ name: 'verbose' })

    // Is the equivalent to:

    cli.option({ name: 'verbose'
    , type: Boolean
    , default: false
    })

    // And can be simplifed to

    cli.option('verbose')

## Examples

To set an option for something like a `path` to a config file:

    var path = require('path')
    ;

    cli.option({ name: 'config'
    , alias: 'c'
    , default: '.haiku/config.js'
    , type: path
    });

More complex examples for defining options can be found in the [examples directory][examples]

## See Also

* [Examples of defining options][examples]
* [nopt][nopt]

[nopt]: https://github.com/isaacs/nopt
[examples]: #