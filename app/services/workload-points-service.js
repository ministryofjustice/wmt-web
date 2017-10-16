const getWorkloadPoints = require('./data/get-workload-points')
const updatePreviousWorkloadPointsEffectiveTo = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
const getWorkloadIdsForWpRecalc = require('./data/get-ids-for-workload-points-recalc')
const createCalculateWorkloadPointsTask = require('./data/create-calculate-workload-points-task')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')
const userRoleService = require('../services/user-role-service')

module.exports.getWorkloadPoints = function (isT2a) {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]
  return getWorkloadPoints(isT2a).then(function (workloadPoints) {
    var userId = null
    if (workloadPoints !== undefined) {
      var formattedUpdateDate = dateFormatter.formatDate(workloadPoints.effectiveFrom, 'DD/MM/YYYY')
      workloadPoints.effectiveFrom = formattedUpdateDate
      userId = workloadPoints.updatedByUserId
    }
    return userRoleService.getUserById(userId)
    .then(function (user) {
      var updatedBy = userId // Default to the user id
      var title = (isT2a) ? breadcrumbs[0].title + ' (Transition to Adulthood)' : breadcrumbs[0].title
      if (user) {
        // If there is a valid use that
        updatedBy = (user.name) ? user.name : user.username
      }
      result.title = title
      result.subTitle = breadcrumbs[1].title
      result.workloadPoints = workloadPoints
      result.updatedBy = updatedBy
      result.breadcrumbs = breadcrumbs
      return result
    })
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints) {
  return updatePreviousWorkloadPointsEffectiveTo(workloadPoints.previousWpId).then(function (updateResults) {
    return insertNewWorkloadPoints(workloadPoints).then(function (insertResults) {
      return getWorkloadIdsForWpRecalc(workloadPoints.previousWpId).then(function (ids) {
        return createCalculateWorkloadPointsTask(ids.minWorkloadStagingId, ids.workloadReportId, (ids.maxWorkloadStagingId - ids.minWorkloadStagingId + 1))
        .then(function (taskResults) {
          return taskResults
        })
      })
    })
  })
}
