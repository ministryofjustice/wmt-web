const passport = require('passport')
const { Strategy } = require('passport-oauth2')

const config = require('../../config')
const generateOauthClientToken = require('./clientCredentials')
const verifyToken = require('../data/tokenVerification')

passport.serializeUser(function (user, done) {
  // Not used but required for Passport
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  // Not used but required for Passport
  done(null, user)
})

function authenticationMiddleware () {
  return async function (req, res, next) {
    if (req.isAuthenticated() && (await verifyToken(req))) {
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
      customHeaders: { Authorization: generateOauthClientToken() }
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
