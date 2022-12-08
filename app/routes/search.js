const offenderSearch = require('../services/data/search-for-offender')

const tabTitle = {
  third: 'Search for an Offender Manager'
}

module.exports = function (get, post) {
  get('/officer-search', function (req, res, next) {
    return res.render('search-for-officer', {
      tabTitle,
      onOfficerSearch: true
    })
  })

  post('/officer-search', function (req, res, next) {
    return offenderSearch(req.body.surnameBox).then(function (result) {
      res.render('search-for-officer', {
        tabTitle,
        results: result,
        surname: req.body.surnameBox,
        onOfficerSearch: true
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
