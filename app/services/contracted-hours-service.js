const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const updateContractedHoursForWorkloadOwner = require('./data/update-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const getLatestIdsForWorkloadPointsRecalc = require('./data/get-latest-workload-staging-id-and-workload-report-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getOffenderManagerTeamLduRegion = require('./data/get-offender-manager-team-ldu-region')
const { auditContractedHoursEdited } = require('./audit-service')

module.exports.getContractedHours = function (id, organisationLevel) {
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
    return getContractedHoursForWorkloadOwner(id)
      .then(function (result) {
        return {
          breadcrumbs,
          title: breadcrumbs[0].title,
          subTitle: organisationalUnitType.displayText,
          contractedHours: result
        }
      })
  })
}

module.exports.updateContractedHours = function (id, hours, who) {
  return getOffenderManagerTeamLduRegion(id).then(function (offenderManagerDetails) {
    return updateContractedHoursForWorkloadOwner(id, hours)
      .then(function () {
        return auditContractedHoursEdited(offenderManagerDetails, hours, who).then(function () {
          return getLatestIdsForWorkloadPointsRecalc(id)
            .then(function (ids) {
              return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
            })
        })
      })
  })
}
