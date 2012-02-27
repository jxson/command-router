command-router option() -- Define options for your CLI
======================================================

## SYNOPSIS

    cli.option(name, params)

## Description

Provides an entry point to define options for the CLI instance which will get parsed on the `start` event.

The `name` argument **is required** and specifies a string that will map to a command line flag.

The `params` object is optional, use it to override defaults.

## `params` Argument

The `params` object allows additional information to be set about the option being defined. There are three properties:

* `params.alias`: Allows a shorthand to be defined, if you want your option '--config' to also map to '-c' this is where you set that up.
* `params.type`: Define the type for this flag, [nopt][nopt] is used for parsing the options internally and this type option will need to be one of the types defined in `nopt.typeDefs`
* `params.default`: The default value for the option being defined

### `params` Defaults

If a `params` object is not passed in the option will be defined as a `Boolean` value defaulting to false without an alias:

    cli.option('verbose')

Is the equivalent to:

    cli.option('verbose', { alias: 'v'
    , default: false
    , type: Boolean
    });

## Examples

To set an option for something like a `path` to a config file:

    cli.option('config', { alias: 'c'
    , default: '.haiku/config.js'
    , type: path
    });

[nopt]: https://github.com/isaacs/nopt