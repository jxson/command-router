var cli = require('../lib/command-router')
;

cli.command('help', function(){
  console.log('')
  console.log('description: an example of a command-router app')
  console.log('')
});

cli.command('list :pile', function(){
  console.log('showing ', this.params['thing'])
})

cli.command(/show (\.*)/, function(){
  console.log('showing ', this.params['splat'])
})
