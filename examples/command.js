var cli = require('../lib/command-router')
;

cli.command('help', function(){
  console.log('')
  console.log('   description: an example of a command-router app')
  console.log('')
});

cli.command('speak jawa', function(){
  console.log('   wootini!')
})

cli.command('speak :language', function(){
  console.log('   language: ', this.params.language);
})

cli.command('destroy *', function(){
  console.log('   ', this.params.splats)
})

cli.command(/attack (.*)$/, function(){
  console.log('   ', this.params.splats)
})

cli.parse(process.argv)

console.log(process.argv);
