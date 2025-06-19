const logger = require('../logger')
const allocationsClient = require('../data/allocationsClient')
const userPreferenceClient = require('../data/userPreferenceClient')

module.exports = function () {
  return async function (_, res, next) {
    try {
      if (res.locals.canAllocate && res.locals.user) {
        const { token, nameID: username } = res.locals.user
        const { team: teamCode } = await userPreferenceClient.getAllocationDemandSelection(token, username)
        if (teamCode) {
          const unallocatedCasesCountByTeams = await allocationsClient.getCaseCountByTeamCodes(token, [teamCode])
          res.locals.unallocatedCaseCount = unallocatedCasesCountByTeams
            .map(team => team.caseCount || 0)
            .reduce((sum, count) => sum + count, 0)
        }
      }
    } catch (error) {
      logger.error(error, 'Failed to retrieve unallocated cases')
      res.locals.unallocatedCaseCount = '+'
    }
    next()
  }
}
