const getOffenderManagersForSearch = require('./get-offender-managers-for-search')
const getTeamsForSearch = require('./get-teams-for-search')
const getLdusForSearch = require('./get-ldus-for-search')

module.exports = function () {
  const searchLists = {}
  return getOffenderManagersForSearch()
    .then(function (offenderManagers) {
      searchLists.offenderManagers = offenderManagers
      return getTeamsForSearch()
        .then(function (teams) {
          searchLists.teams = teams
          return getLdusForSearch()
            .then(function (ldus) {
              searchLists.ldus = ldus
              return searchLists
            })
        })
    })
}
