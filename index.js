const path = require('path')
const { spawn } = require('child_process')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const { log, logError } = require('./util/log')

function runProcess (command, args, options) {
  return new Promise(function (resolve, reject) {
    const npmProcess = spawn(command, args, options)

    npmProcess.stdout.on('data', function (data) {
      console.log(data.toString())
    })

    npmProcess.stderr.on('data', function (data) {
      console.log('error', data.toString())
    })

    npmProcess.on('close', function (code) {
      if (code === 0) {
        process.nextTick(resolve)
      } else {
        reject()
      }
    })
  })
}

function setupPackageJson (targetFolder) {
  log('Setting up ' + chalk.bold('package.json'))
  return runProcess('npm', ['init', '-y'], {
    cwd: targetFolder
  }).catch(function (error) {
    if (error) {
      logError(error.stack)
    } else {
      logError('Command failed, exiting')
    }
  })
}

function installSagui (targetFolder) {
  log('Installing...')
  return runProcess('yarn', ['add', 'sagui', '--dev'], {
    cwd: targetFolder
  }).catch(function (error) {
    if (error) {
      logError(error.stack)
    } else {
      logError('Command failed, exiting')
    }
  })
}

module.exports = {
  cli: function (args) {
    const targetFolder = args[2]
      ? path.resolve(process.cwd(), args[2])
      : process.cwd()

    if (targetFolder !== process.cwd()) {
      log('In folder ' + chalk.bold(targetFolder))
      mkdirp.sync(targetFolder)
    }

    setupPackageJson(targetFolder)
      .then(installSagui(targetFolder))
      .then(function () {})
  }
}
