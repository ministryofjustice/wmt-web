const express = require('express')
const helmet = require('helmet')
const crypto = require('crypto')

module.exports = function () {
  const router = express.Router()

  router.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString('base64')
    next()
  })
  router.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'", 'https://www.google-analytics.com', 'www.google-analytics.com'],
          // Hash allows inline script pulled in from https://github.com/alphagov/govuk-frontend/blob/master/src/govuk/template.njk
          scriptSrc: ["'self'", "'unsafe-eval'", 'code.jquery.com', "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='", "'sha256-YATCTgSEjGAEESeuVQ4gXWRpLuPCSw5qROQNMYKJZXg='", (req, res) => `'nonce-${res.locals.cspNonce}'`, 'www.google-analytics.com',
            'https://www.google-analytics.com',
            'https://www.googletagmanager.com'],
          styleSrc: ["'self'", 'code.jquery.com', "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='", "'sha256-7ynffF12wDROtneyCyZQeDPLI7U5bQGlCJO3PFWnaTg='"],
          imgSrc: ["'self'", 'https://www.google-analytics.com',
            'www.google-analytics.com'],
          connectSrc: ["'self'", 'www.googletagmanager.com', 'www.google-analytics.com', 'https://www.google-analytics.com'],
          fontSrc: ["'self'"]
        }
      }
    })
  )
  return router
}
