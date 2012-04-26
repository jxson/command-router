var cli = require('../lib/command-router')
  , colors = require('colors')
;

cli.command('help', function(){
  console.log('')
  console.log('description: an example of a command-router app')
  console.log('')
});

cli.command('speak dog', function(){
  console.log('woof.')
})

cli.command('speak :language', function(){
  console.log(this.params['language'])
})

cli.command('star *', function(){
  console.log(this.params.splats)
})

cli.command(/search (.*)$/, function(){
  console.log(this.params.splats)
})

cli.parse(process.argv)
