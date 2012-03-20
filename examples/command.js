var cli = require('../lib/command-router')
  , colors = require('colors')
;

cli.command('help', function(){
  console.log('')
  console.log('description: an example of a command-router app')
  console.log('')
});

cli.command('list :pile', function(){
  console.log('showing'.green, this.params['thing'])
})

cli.command(/show (.*)$/, function(){
  console.log('showing'.green, this.params['splat'])
})

cli.command(/show (.*) stuff$/, function(){
  console.log('showing'.green, this.params['splat'])
})

cli.parse(process.argv)
