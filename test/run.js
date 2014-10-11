
module.exports = run

function run(cli, route) {
  var args = route.split(' ')

  args.unshift('/wherever/the/bin/is')
  args.unshift('node')

  cli.parse(args)
}
