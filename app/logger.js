const { defaultClient: appInsightsClient } = require('applicationinsights')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')

// Add logging
const prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

const logger = bunyan.createLogger({
  name: 'wmt-web',
  streams: [],
  serializers: {
    error: errorSerializer
  }
})

logger.addStream({
  level: 'DEBUG',
  stream: prettyStream
})

function errorSerializer (error) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack
  }
}

module.exports = {
  info: logger.info.bind(logger),
  error: function (e) {
    appInsightsClient.trackException({ exception: e })
  }

}
