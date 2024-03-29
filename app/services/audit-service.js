const { audit } = require('../../config')
const crypto = require('crypto')

const getSqsClient = require('./aws/sqs/get-sqs-client')
const sendSqsMessage = require('./aws/sqs/send-sqs-message')
const { ARCHIVED, DELETED } = require('../constants/reduction-status-type')

const reductionStatusToAuditAction = {
  [DELETED]: 'REDUCTION_DELETED',
  [ARCHIVED]: 'REDUCTION_ARCHIVED'
}

const sqsClient = getSqsClient({ region: audit.region, endpoint: audit.endpoint })

module.exports.auditReductionCreated = function (offenderManagerDetails, reduction, loggedInUserEmail) {
  return sendSqsMessage(sqsClient, audit.queueUrl, messageFrom('REDUCTION_CREATED', getDetailsForReduction(offenderManagerDetails, reduction, reduction), loggedInUserEmail))
}

module.exports.auditReductionEdited = function (offenderManagerDetails, reduction, oldReduction, loggedInUserEmail) {
  return sendSqsMessage(sqsClient, audit.queueUrl, messageFrom('REDUCTION_EDITED', getDetailsForReduction(offenderManagerDetails, reduction, oldReduction), loggedInUserEmail))
}

module.exports.auditReductionStatusChange = function (offenderManagerDetails, reduction, oldReduction, loggedInUserEmail) {
  return sendSqsMessage(sqsClient, audit.queueUrl, messageFrom(reductionStatusToAuditAction[reduction.status], getDetailsForReduction(offenderManagerDetails, reduction, oldReduction), loggedInUserEmail))
}

module.exports.auditContractedHoursEdited = function (offenderManagerDetails, newHours, loggedInUserEmail) {
  return sendSqsMessage(sqsClient, audit.queueUrl, messageFrom('CONTRACTED_HOURS_EDITED', getDetailsForContractedHours(offenderManagerDetails, newHours), loggedInUserEmail))
}

function getDetailsForContractedHours (offenderManagerDetails, newContractedHours) {
  return {
    offenderManagerName: `${offenderManagerDetails.forename} ${offenderManagerDetails.surname}`,
    team: `${offenderManagerDetails.teamCode} - ${offenderManagerDetails.teamDescription}`,
    pdu: `${offenderManagerDetails.lduCode} - ${offenderManagerDetails.lduDescription}`,
    region: `${offenderManagerDetails.regionCode} - ${offenderManagerDetails.regionDescription}`,
    previousContractedHours: offenderManagerDetails.contractedHours,
    newContractedHours
  }
}

function getDetailsForReduction (offenderManagerDetails, reduction, oldReduction) {
  return {
    previousReason: oldReduction.reason,
    newReason: reduction.reason,
    previousHours: oldReduction.hours,
    newHours: reduction.hours,
    previousAdditionalNotes: oldReduction.notes,
    newAdditionalNotes: reduction.notes,
    previousEffectiveFrom: oldReduction.reductionStartDate,
    newEffectiveFrom: reduction.reductionStartDate,
    previousEffectiveTo: oldReduction.reductionEndDate,
    newEffectiveTo: reduction.reductionEndDate,
    previousStatus: oldReduction.status,
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
