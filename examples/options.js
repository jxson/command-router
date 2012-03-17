var path = require('path')
  , cli = require('../lib/command-router')
;

// A basic Boolean option that defaults to false
cli.option('verbose');

// Define an option for something like a path to a config file
cli.option({ name: 'config'
, alias: 'c'
, default: '.haiku/config.js'
, type: path
});

console.log('process.argv', process.argv);

cli.parse(process.argv);

console.log('cli.options', cli.options);
