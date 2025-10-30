const express = require('express')
const passport = require('passport')
const flash = require('connect-flash')
const config = require('../../config')
const auth = require('../authentication/auth')
const pdsComponents = require('@ministryofjustice/hmpps-probation-frontend-components')

const router = express.Router()
module.exports = function () {
  auth.init()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(flash())

  router.get('/autherror', pdsComponents.getPageComponents({ pdsUrl: config.apis.probationApi.url }), (req, res) => {
    res.status(401)
    return res.render('autherror')
  })

  router.get('/login', passport.authenticate('oauth2'))

  const retryMiddleware = (req, res, next) => {
    const maxRetries = 3
    const attempts = req.session.authAttempts || 0

    if (attempts < maxRetries) {
      req.session.authAttempts = attempts + 1
      next()
    } else {
      req.session.authAttempts = 0
      res.redirect('/autherror')
    }
  }

  router.get('/login/callback', retryMiddleware, function (req, res, next) {
    passport.authenticate('oauth2',
      {
        successReturnToOrRedirect: req.session.returnTo || '/',
        failureRedirect: '/autherror'
      }
    )(req, res, next)
  }
  )

  const authUrl = config.apis.hmppsAuth.externalUrl
  const authSignOutUrl = `${config.apis.hmppsAuth.externalUrl}/sign-out?client_id=${config.apis.hmppsAuth.apiClientId}&redirect_uri=${config.domain}`

  router.use('/sign-out', (req, res, next) => {
    if (req.user) {
      req.logout(err => {
        if (err) return next(err)
        return req.session.destroy(() => res.redirect(authSignOutUrl))
      })
    } else res.redirect(authSignOutUrl)
  })

  router.use('/account-details', (req, res) => {
    res.redirect(`${authUrl}/account-details`)
  })

  router.use(function (req, res, next) {
    res.locals.user = req.user
    next()
  })

  return router
}
