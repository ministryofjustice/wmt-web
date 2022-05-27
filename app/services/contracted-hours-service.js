const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const updateContractedHoursForWorkloadOwner = require('./data/update-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const createCourtReportsCalculationTask = require('./data/create-court-reports-calculation-task')
const getLatestIdsForWorkloadPointsRecalc = require('./data/get-latest-workload-staging-id-and-workload-report-id')
const getLatestIdsForCourtReportsCalc = require('./data/get-latest-court-reports-staging-id-and-workload-report-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const workloadTypes = require('../constants/workload-type')
const getOffenderManagerTeamLduRegion = require('./data/get-offender-manager-team-ldu-region')
const { auditContractedHoursEdited } = require('./audit-service')

module.exports.getContractedHours = function (id, organisationLevel, workloadType) {
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  return getBreadcrumbs(id, organisationLevel, workloadType).then(function (breadcrumbs) {
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

module.exports.updateContractedHours = function (id, hours, workloadType, who) {
  return getOffenderManagerTeamLduRegion(id).then(function (offenderManagerDetails) {
    return updateContractedHoursForWorkloadOwner(id, hours)
      .then(function () {
        return auditContractedHoursEdited(offenderManagerDetails, hours, who).then(function () {
          if (workloadType === workloadTypes.PROBATION) {
            return getLatestIdsForWorkloadPointsRecalc(id)
              .then(function (ids) {
                return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
              })
          } else {
            return getLatestIdsForCourtReportsCalc(id)
              .then(function (ids) {
                return createCourtReportsCalculationTask(ids.courtReportsStagingId, ids.workloadReportId, 1)
              })
          }
        })
      })
  })
}
