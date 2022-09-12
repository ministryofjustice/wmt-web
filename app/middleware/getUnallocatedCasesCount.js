const logger = require('../logger')
const allocationsClient = require('../data/allocationsClient')
const userPreferenceClient = require('../data/userPreferenceClient')

module.exports = function () {
  return async function (req, res, next) {
    try {
      if (res.locals.canAllocate && res.locals.user) {
        const { token, username } = res.locals.user
        const { items: teamSelection } = await userPreferenceClient.getTeamsUserPreference(token, username)
        if (teamSelection.length) {
          const unallocatedCasesCountByTeams = await allocationsClient.getCaseCountByTeamCodes(token, teamSelection)
          res.locals.unallocatedCaseCount = unallocatedCasesCountByTeams
            .map(teamCount => teamCount.caseCount)
            .reduce((first, second) => first + second, 0)
        }
      }
      next()
    } catch (error) {
      logger.error(error, 'Failed to retrieve unallocated cases')
      next(error)
    }
  }
}
