module.exports = function (router) {
  router.get('/accessibility-statement', function (req, res) {
    return res.render('accessibility-statement')
  })
}
