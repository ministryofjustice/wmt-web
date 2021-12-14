const receiveSqsMessage = require('../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../app/services/aws/sqs/delete-sqs-message')

const deleteAllMessages = async function (sqsClient, queueURL) {
  const data = await receiveSqsMessage(sqsClient, queueURL)
  if (data.Messages) {
    await deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle)
    return deleteAllMessages(sqsClient, queueURL)
  }
  return Promise.resolve()
}

const pollCheckAndDelete = async function (sqsClient, queueURL) {
  const data = await receiveSqsMessage(sqsClient, queueURL)
  if (data.Messages) {
    await deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle)
    return data.Messages[0]
  }
  return pollCheckAndDelete(sqsClient, queueURL)
}

module.exports.deleteAllMessages = deleteAllMessages

module.exports.pollCheckAndDelete = pollCheckAndDelete
