
module.exports = function (username, role) {
  return function (req, res, next) {
    req.user = {
      username,
      user_role: role
    }
    next()
  }
}
