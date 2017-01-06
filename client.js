var path = require('path')
var exec = require('child_process').exec
var spawn = require('child_process').spawn
var encoding = require('dat-encoding')
var rimraf = require('rimraf')
var debug = require('debug')('dat-tester')

var dat = path.resolve(path.join(__dirname, 'node_modules', 'dat-next', 'bin', 'cli.js'))
var sharer = null

module.exports = createDat
module.exports.share = shareDat
module.exports.stop = function () {
  if (sharer) {
    sharer.stdin.pause()
    sharer.kill()
  }
}

function createDat (dir, cb) {
  debug('Starting create')
  rimraf.sync(path.join(dir, '.dat')) // clear old tests
  exec('DEBUG=dat ' + dat + ' create', {cwd: dir}, function (err, stdout, stderr) {
    if (err) return cb(err)
    var match = stderr.match(/[A-Za-z0-9]{64}/)
    if (!match) return cb('No key found in output')
    try {
      var key = encoding.toStr(match[0].trim())
      cb(null, key)
    } catch (e) {
      return cb(e)
    }
  })
}

function shareDat (dir) {
  sharer = spawn(dat, ['sync', '--quiet'], {cwd: dir})

  sharer.stdout.on('data', (data) => {
    // console.log(`sync: ${data}`)
  })

  sharer.stderr.on('data', (data) => {
    console.error(`sync error: ${data}`)
  })
}
