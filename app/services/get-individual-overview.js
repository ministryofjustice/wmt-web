const getBreadcrumbs = require('./get-breadcrumbs')
const getIndividualOverview = require('./data/get-individual-overview')
const workloadTypes = require('../constants/workload-type')
const { calculatePercentage } = require('./helpers/percentage-calculator')
const { OFFENDER_MANAGER } = require('../constants/organisation-unit')

module.exports = function (id, workloadType = workloadTypes.PROBATION) {
  const result = {}

  return getBreadcrumbs(id, OFFENDER_MANAGER.name, workloadType).then(function (breadcrumbs) {
    result.breadcrumbs = breadcrumbs
    return getIndividualOverview(id).then(function (results) {
      result.overviewDetails = results
      result.overviewDetails.capacity = calculatePercentage(results.totalPoints, results.availablePoints)
      result.title = result.breadcrumbs[0].title
      return result
    })
  })
}
