const userSearch = require('../services/data/search-for-user')

module.exports = function (router) {
  router.get('/user-search', function (req, res, next) {
    return userSearch(req.query.name).then(function (results) {
      res.send(results)
    }).catch(function (error) {
      next(error)
    })
  })
}
