const passport = require('passport')
const { Strategy } = require('passport-oauth2')

const config = require('../../config')
const generateOauthClientToken = require('./clientCredentials')
const verifyToken = require('../data/tokenVerification')
const userRoleService = require('../services/user-role-service')

passport.serializeUser(function (user, done) {
  const username = user.username
  const displayName = user.username
  const nameID = user.username
  const nameIDFormat = user.username

  return userRoleService.getUserByUsername(username).then(function (result) {
    const dbUser = {
      id: 0 // assume its a Staff user
    }
    if (result) {
      dbUser.id = result.id // actual user exists
    }
    return userRoleService.getRoleByUsername(username).then(function (role) {
      done(null, Object.assign(user, {
        userId: dbUser.id,
        name: displayName,
        username: username,
        user_role: role.role,
        nameID: nameID,
        nameIDFormat: nameIDFormat
      }))
    })
  })
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

function authenticationMiddleware () {
  return async function (req, res, next) {
    if (req.isAuthenticated() && (await verifyToken(req))) {
      return next()
    }
    if (req.url === '/refresh') {
      return next()
    }
    req.session.returnTo = req.originalUrl
    return res.redirect('/login')
  }
}

function init () {
  const strategy = new Strategy(
    {
      authorizationURL: `${config.apis.hmppsAuth.externalUrl}/oauth/authorize`,
      tokenURL: `${config.apis.hmppsAuth.url}/oauth/token`,
      clientID: config.apis.hmppsAuth.apiClientId,
      clientSecret: config.apis.hmppsAuth.apiClientSecret,
      callbackURL: `${config.domain}/login/callback`,
      state: true,
      customHeaders: { Authorization: generateOauthClientToken(config.apis.hmppsAuth.apiClientId, config.apis.hmppsAuth.apiClientSecret) }
    },
    function (token, refreshToken, params, profile, done) {
      return done(null, { token, username: params.user_name, authSource: params.auth_source })
    }
  )

  passport.use(strategy)
}

module.exports = {
  init,
  authenticationMiddleware
}