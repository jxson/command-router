var cli = require('../')

cli.command('help', function(){
  console.log('   description: an example of a command-router app')
});

cli.command('new', function(){
  console.log('   try typing: new foo')
})

cli.command('new :thing', function(params){
  console.log('   creating:', params.thing);
})

cli.command('config *', function(params){
  console.log('   splats:', params.splats)
})

cli.command('config *.*', function(params){
  console.log('   splats:', params.splats)
})


cli.command(/regex (.*)$/, function(params){
  console.log('   regex:', params.splats)
})

cli.on('notfound', function(action){
  console.error('Missing CLI action: ' + action)
  process.exit(1)
})

cli.parse(process.argv)
