const { audit } = require('../../config')
const crypto = require('crypto')

const getSqsClient = require('./aws/sqs/get-sqs-client')
const sendSqsMessage = require('./aws/sqs/send-sqs-message')

const sqsClient = getSqsClient({ region: audit.region, accessKeyId: audit.accessKeyId, secretAccessKey: audit.secretAccessKey, endpoint: audit.endpoint })

module.exports.auditReductionCreation = function (offenderManagerDetails, reduction, loggedInUserEmail) {
  return sendSqsMessage(sqsClient, audit.queueUrl, messageFrom('REDUCTION_CREATED', getDetailsForReduction(offenderManagerDetails, reduction), loggedInUserEmail))
}

function getDetailsForReduction (offenderManagerDetails, reduction) {
  return {
    previousReason: reduction.reason,
    newReason: reduction.reason,
    previousHours: reduction.hours,
    newHours: reduction.hours,
    previousAdditionalNotes: reduction.notes,
    newAdditionalNotes: reduction.notes,
    previousEffectiveFrom: reduction.reductionStartDate,
    newEffectiveFrom: reduction.reductionStartDate,
    previousEffectiveTo: reduction.reductionEndDate,
    newEffectiveTo: reduction.reductionEndDate,
    previousStatus: reduction.status,
    newStatus: reduction.status,
    offenderManagerName: `${offenderManagerDetails.forename} ${offenderManagerDetails.surname}`,
    team: `${offenderManagerDetails.teamCode} - ${offenderManagerDetails.teamDescription}`,
    pdu: `${offenderManagerDetails.lduCode} - ${offenderManagerDetails.lduDescription}`,
    region: `${offenderManagerDetails.regionCode} - ${offenderManagerDetails.regionDescription}`
  }
}

function messageFrom (what, details, loggedInUserEmail) {
  return JSON.stringify({
    what,
    when: new Date(),
    operationId: crypto.randomUUID(),
    who: loggedInUserEmail,
    service: 'wmt',
    details: JSON.stringify(details)
  })
}
