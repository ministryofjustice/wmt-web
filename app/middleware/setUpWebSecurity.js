const express = require('express')
const helmet = require('helmet')

module.exports = function () {
  const router = express.Router()

  router.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Hash allows inline script pulled in from https://github.com/alphagov/govuk-frontend/blob/master/src/govuk/template.njk
          scriptSrc: ["'self'", 'code.jquery.com', "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='"],
          styleSrc: ["'self'", 'code.jquery.com'],
          fontSrc: ["'self'"]
        }
      }
    })
  )
  return router
}
