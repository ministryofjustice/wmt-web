
module.exports = function (username, role) {
  return function (req, res, next) {
    req.user = {
      username,
      user_role: role
    }
    res.locals.user = { email: 'some.email@justice.gov.uk' }
    next()
  }
}
