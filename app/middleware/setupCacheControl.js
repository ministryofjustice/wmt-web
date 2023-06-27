module.exports = function () {
  return function (req, res, next) {
    res.set('Cache-control', 'no-store')
    res.set('Pragma', 'no-cache')
    next()
  }
}
