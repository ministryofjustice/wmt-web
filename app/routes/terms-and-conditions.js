module.exports = function (get) {
  get('/terms-and-conditions', function (req, res) {
    return res.render('terms-and-conditions')
  })
}
