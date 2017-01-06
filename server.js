var path = require('path')
var Archiver = require('hypercore-archiver')
var archiverServer = require('archiver-server')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var debug = require('debug')('dat-tester')

module.exports = function (key, cb) {
  var tmpDir = path.join(__dirname, 'archivers', key)
  mkdirp.sync(tmpDir)

  var archives = Archiver(tmpDir)
  var datServer = archiverServer(archives, {swarm: true})
  var keysDone = 0

  archives.add(key, function (err) {
    if (err) done(err)
    debug('ADDED:', key)
  })
  archives.on('archived', function (key) {
    debug('DONE:', key.toString('hex'))
    keysDone++
    if (keysDone === 2) done()
  })

  datServer.swarm.on('listening', function () {
    debug('Listening for connections.')
  })

  function done (err) {
    datServer.swarm.close(function () {
      rimraf(tmpDir, function () {
        if(err) return cb(err)
        debug('Done')
        cb()
      })
    })
  }
}
