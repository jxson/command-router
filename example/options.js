var path = require('path')
  , cli = require('../')

// A basic Boolean option that defaults to false
cli.option('verbose');

// Define an option for something like a path to a config file
cli.option({ name: 'config'
, alias: 'c'
, default: '.haiku/config.js'
, type: path
})

cli.command('', function(params, options){
  console.log('params:', params)
  console.log('options:', options)
})

cli.parse(process.argv);
