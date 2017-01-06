#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var bench = require('nanobench')
var minimist = require('minimist')
var tester = require('.')

var argv = minimist(process.argv.slice(2))

var baseDir = argv._[0]
var testDirs = getDirs(baseDir)
console.log('Running tests on ', testDirs)
testDirs.forEach(function (dir) {
  dir = path.join(baseDir, dir)
  bench('testing dir: ' + dir, function (b) {
    b.start()

    tester(dir, function (err, time) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      b.end()
      // console.log('time' + prettyHrtime(time))
    })
  })
})

function getDirs(src) {
  return fs.readdirSync(src).filter(function(file) {
    return fs.statSync(path.join(src, file)).isDirectory()
  })
}
