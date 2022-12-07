module.exports = function (get) {
  get('/cookies', function (req, res) {
    return res.render('cookies')
  })
}
