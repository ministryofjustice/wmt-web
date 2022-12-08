module.exports = function (get) {
  get('/accessibility-statement', function (req, res) {
    return res.render('accessibility-statement')
  })
}
