var path = require('path')
;

// A basic Boolean option that defaults to false
cli.option('verbose');

cli.on('end', function(){
  console.log('cli.options', this.options);
});

// Define an option for something like a path to a config file
cli.option({ name: 'config'
, alias: 'c'
, default: '.haiku/config.js'
, type: path
});

cli.parse(process.argv);
