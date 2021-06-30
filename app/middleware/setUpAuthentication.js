const express = require('express')
const passport = require('passport')
const flash = require('connect-flash')
const config = require('../../config')
const auth = require('../authentication/auth')

const router = express.Router()
module.exports = function () {
  auth.init()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(flash())

  router.get('/autherror', function (req, res) {
    res.status(401)
    return res.render('autherror')
  })

  router.get('/login', passport.authenticate('oauth2'))

  router.get('/login/callback', function (req, res, next) {
    passport.authenticate('oauth2',
      {
        successReturnToOrRedirect: req.session.returnTo || '/',
        failureRedirect: '/autherror'
      }
    )(req, res, next)
  }
  )

  const authLogoutUrl = `${config.apis.hmppsAuth.externalUrl}/logout?client_id=${config.apis.hmppsAuth.apiClientId}&redirect_uri=${config.domain}`

  router.use('/logout', function (req, res) {
    if (req.user) {
      req.logout()
      req.session.destroy(function () {
        res.redirect(authLogoutUrl)
      })
    }
    res.redirect(authLogoutUrl)
  })

  router.use(function (req, res, next) {
    res.locals.user = req.user
    next()
  })

  return router
}
