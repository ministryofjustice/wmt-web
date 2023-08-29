const { SQSClient } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  return new SQSClient()
}
