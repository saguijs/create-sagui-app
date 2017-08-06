// TODO: extract as shared dependency
const chalk = require('chalk')

const errorStyle = chalk.bold.red
const warningStyle = chalk.yellow

function logError (entry) {
  console.log(sagui(), errorStyle(entry))
}

function logWarning (entry) {
  console.log(sagui(), warningStyle(entry))
}

function log (entry) {
  console.log(sagui(), entry)
}

function logContent (entry) {
  console.log(entry.split('\n').map(line => `${sagui()} ${line}`).join('\n'))
}

function sagui () {
  return process.platform === 'win32'
    ? 'Sagui -'
    : chalk.dim('🐵  Sagui')
}

module.exports.logError = logError
module.exports.logWarning = logWarning
module.exports.log = log
module.exports.logContent = logContent
