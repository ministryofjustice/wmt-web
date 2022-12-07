const getOffenderManagersForSearch = require('../services/data/get-offender-managers-for-search')
const getUsersForSearch = require('../services/data/get-users-for-search')
const getTeamsForSearch = require('../services/data/get-teams-for-search')
const getLdusForSearch = require('../services/data/get-ldus-for-search')

module.exports = function (get) {
  get('/archive-search-lists', function (req, res, next) {
    if (req.query.q) {
      return getOffenderManagersForSearch(req.query.q)
        .then(function (omResults) {
          return getTeamsForSearch(req.query.q)
            .then(function (teamResults) {
              return getLdusForSearch(req.query.q)
                .then(function (lduResults) {
                  return res.json({
                    items: omResults.concat(teamResults).concat(lduResults)
                  })
                })
            })
        })
    }
  })

  get('/reduction-search-lists', function (req, res, next) {
    if (req.query.q) {
      return getOffenderManagersForSearch(req.query.q)
        .then(function (omResults) {
          return getUsersForSearch(req.query.q)
            .then(function (userResults) {
              return res.json({
                items: omResults.concat(userResults)
              })
            })
        })
    }
  })
}
