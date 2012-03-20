command-router command() -- Define routes for your CLI's commands
=================================================================

## SYNOPSIS

    cli.command(route, callback)

## DESCRIPTION

`cli.command()` allows you to define [Sinatra][sinatra] style routes for your command line application.

* `route`

    The string or regex you want to match on

* `callback`

    The function that will get called on the `parse` event if the route matches, `this` is the CLI instance.

## USAGE

### Using a string

    cli.command('speak dog', function(){
    })

### Using a string with a named param

    cli.command('speak :animal', function(){
    })

### Using a Regex

    cli.command(/speak (\.*)/, function(){
    })

## SEE AlSO

[sinatra]: http://www.sinatrarb.com/
