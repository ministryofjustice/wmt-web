const addReduction = require('./data/insert-reduction')
const updateReduction = require('./data/update-reduction')
const updateReductionStatus = require('./data/update-reduction-status')
const getReductions = require('./data/get-reductions')
const getReductionReasons = require('./data/get-reduction-reasons')
const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const getLatestIdsForWorkloadPointsRecalc = require('./data/get-latest-workload-staging-id-and-workload-report-id')
const reductionsCalculator = require('./helpers/reduction-hours-calculator')
const getReductionById = require('./data/get-reduction-by-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const reductionHelper = require('./helpers/reduction-helper')
const getOldReductionForHistory = require('./data/get-old-reduction-for-history')
const insertOldReductionToHistory = require('./data/insert-old-reduction-to-history')
const getOffenderManagerTeamLduRegion = require('./data/get-offender-manager-team-ldu-region')
const { auditReductionCreated, auditReductionEdited, auditReductionStatusChange } = require('./audit-service')
const navTitleConstants = require('./nav-title')

module.exports.getReductions = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
    result.breadcrumbs = breadcrumbs
    result.title = result.breadcrumbs[0].title
    if (organisationalUnitType.name === 'hmpps') {
      result.title = organisationalUnitType.displayText
    }
    result.subTitle = navTitleConstants.OFFENDER_MANAGER.displayText

    return getReductions(id).then(function (results) {
      const reductionsByStatus = reductionHelper.getReductionsByStatus(results)
      result.activeReductions = reductionsByStatus.activeReductions
      result.scheduledReductions = reductionsByStatus.scheduledReductions
      result.archivedReductions = reductionsByStatus.archivedReductions
      return result
    })
  })
}

module.exports.getAddReductionsRefData = function (id, organisationLevel) {
  const result = {}
  const getReductionReasonsPromise = getReductionReasons()
  const getContractedHoursPromise = getContractedHoursForWorkloadOwner(id)
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
    result.breadcrumbs = breadcrumbs
    result.title = result.breadcrumbs[0].title
    if (organisationalUnitType.name === 'hmpps') {
      result.title = organisationalUnitType.displayText
    }
    result.subTitle = navTitleConstants.OFFENDER_MANAGER.displayText

    return getContractedHoursPromise.then(function (hours) {
      return getReductionReasonsPromise.then(function (results) {
        result.contractedHours = hours
        result.referenceData = reductionsCalculator(results, hours)
        return result
      })
    })
  })
}

module.exports.addReduction = function (id, reduction, loggedInUserEmail) {
  return addReduction(id, reduction)

    .then(function () {
      return getOffenderManagerTeamLduRegion(id).then(function (offenderManagerDetails) {
        return auditReductionCreated(offenderManagerDetails, reduction, loggedInUserEmail).then(function () {
          return getLatestIdsForWorkloadPointsRecalc(id)
            .then(function (ids) {
              return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
            })
        })
      })
    })
}

module.exports.updateReduction = function (id, reductionId, reduction, oldReduction, loggedInUserEmail) {
  return updateReduction(reductionId, id, reduction)
    .then(function () {
      return getOffenderManagerTeamLduRegion(id).then(function (offenderManagerDetails) {
        return auditReductionEdited(offenderManagerDetails, reduction, oldReduction, loggedInUserEmail).then(function () {
          return getLatestIdsForWorkloadPointsRecalc(id)
            .then(function (ids) {
              return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
            })
        })
      })
    })
}

module.exports.updateReductionStatus = function (id, reductionId, reductionStatus, oldReduction, loggedInUserEmail) {
  const reduction = { ...oldReduction, ...{ status: reductionStatus } }
  return updateReductionStatus(reductionId, reductionStatus)
    .then(function () {
      return getOffenderManagerTeamLduRegion(id).then(function (offenderManagerDetails) {
        return auditReductionStatusChange(offenderManagerDetails, reduction, oldReduction, loggedInUserEmail).then(function () {
          return getLatestIdsForWorkloadPointsRecalc(id)
            .then(function (ids) {
              return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
            })
        })
      })
    })
}

module.exports.getReductionByReductionId = function (reductionId) {
  let reduction = Promise.resolve(undefined)
  if (reductionId) {
    reduction = getReductionById(reductionId)
  }
  return reduction
}

module.exports.getOldReductionForHistory = function (reductionId) {
  return getOldReductionForHistory(reductionId)
}

module.exports.addOldReductionToHistory = function (reduction) {
  return insertOldReductionToHistory(reduction)
}
