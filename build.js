var fs = require('fs')
var UglifyJS = require('uglify-js')
var gzipSize = require('gzip-size')
// be cool and use anylogger to print the logging in the build of anylogger-debug :)
var log = require('anylogger')('anylogger-debug')

var [ processName, script, command, ...args ] = process.argv
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var data = fs.readFileSync(pkg.iife, 'utf8')

  if (!command || command == 'minify') {
    data = UglifyJS.minify(data);
    if (data.error) {
      return log('error', data)
    }
    data = data.code;
    fs.writeFileSync(pkg.min, data, 'utf8')
  }
  else {
    data = fs.readFileSync(pkg.min, 'utf8')
  }

  var min = data.length
  var gzip = gzipSize.sync(data)

  if (!command || command == 'minify') {
    log('info', 'created ' + pkg.min + ' (' + min + 'B, gzipped ~' + gzip + 'B)')
  }

  var av = pkg.dependencies.anylogger.substring(1)
  var dv = pkg.dependencies.debug.substring(1)

  if (!command || command == 'docs') {
    var readme = fs.readFileSync('README.md', 'utf-8')
    readme = readme.replace(/minified \d\d\d bytes/g, 'minified ' + min + ' bytes')
    readme = readme.replace(/\[\d\d\d\]\(#gzip-size\)/g, '[' + gzip + '](#gzip-size)')
    readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
    readme = readme.replace(/\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `@${v}/`)
    readme = readme.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger@${av}/`)
    readme = readme.replace(/\>\=\d(\d)?\.\d(\d)?\.\d(\d)?/g, `>=${v}`)
    fs.writeFileSync('README.md', readme, 'utf8')
    log.info('updated readme')
    var html = fs.readFileSync('test.html', 'utf-8')
    html = html.replace(/anylogger-debug \d(\d)?\.\d(\d)?\.\d(\d)?/g, `anylogger-debug ${v}`)
    html = html.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger@${av}/`)
    html = html.replace(/debug-\d(\d)?\.\d(\d)?\.\d(\d)?/g, `debug-${dv}`)
    fs.writeFileSync('test.html', html, 'utf8')
    log.info('updated test.html')
  }
})()