var path = require('path')
var debug = require('debug')('dat-tester')

var client = require('./client')
var server = require('./server')

var dir = path.resolve(path.join(__dirname, 'data'))

module.exports = runTest

function runTest (dir, cb) {
  var begin = process.hrtime()
  client(dir, function (err, key) {
    if (err) return onerror(err)
    debug('Starting share for', key)
    client.share(dir)

    debug('Adding key to archiver')
    server(key, function (err) {
      if (err) return onerror(err)
      client.stop()
      cb(null, process.hrtime(begin))
    })
  })

  function onerror(err) {
    // Other cleanup?
    client.stop()
    cb(err)
  }
}
