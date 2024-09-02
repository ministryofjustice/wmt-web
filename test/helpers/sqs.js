const receiveSqsMessage = require('../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../app/services/aws/sqs/delete-sqs-message')

const deleteAllMessages = async function (sqsClient, queueURL) {
  const data = await receiveSqsMessage(sqsClient, queueURL)
  console.log('All Messages:', data)
  for (const message of data.Messages) {
    console.log('Message:', message)
    await deleteSqsMessage(sqsClient, queueURL, message.ReceiptHandle)
  }
  return Promise.resolve()
}

const pollCheckAndDelete = async function (sqsClient, queueURL) {
  const data = await receiveSqsMessage(sqsClient, queueURL)
  console.log('All Messages:', data)
  if (data.Messages) {
    await deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle)
    console.log('Message:', data.Messages[0])
    return data.Messages[0]
  }
  console.log('Do we ever reach here?')
  return pollCheckAndDelete(sqsClient, queueURL)
}

module.exports.deleteAllMessages = deleteAllMessages

module.exports.pollCheckAndDelete = pollCheckAndDelete
