const getUtilisationTable = require('../services/get-utilisation-table')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')

module.exports = function (router) {
  router.get(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {
    return res.render('utilisation', {
      utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.id, req.query.date)
    })
  })

  router.post(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:userId/:year/`, function (req, res, next) {
    date = req.body.date
    splitDate = date.split('-', 3)
    return res.render('utilisation', {
      utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.userId, splitDate[0])
    })
  })
}
