const bunyan = require('bunyan')
const bunyanFormat = require('bunyan-format')

const formatOut = bunyanFormat({ outputMode: 'short', color: true })

const logger = bunyan.createLogger({
  name: 'wmt-web',
  stream: formatOut,
  level: 'debug'
})

module.exports = logger
