const superagent = require('superagent')
const logger = require('../logger')
const config = require('../../config')
const sanitiseError = require('../sanitisedError')

const get = async function ({ path = null, query = '', headers = {}, responseType = '', raw = false, token }) {
  logger.info(`Get using user credentials: calling: ${path} ${query}`)
  try {
    const result = await superagent
      .get(`${config.apis.hmppsAuth.url}${path}`)
      .agent(this.agent)
      .retry(2, function (err, res) {
        if (err) logger.info(`Retry handler found API error with ${err.code} ${err.message}`)
        return undefined // retry handler only for logging retries, not to influence retry logic
      })
      .query(query)
      .auth(token, { type: 'bearer' })
      .set(headers)
      .responseType(responseType)

    return raw ? result : result.body
  } catch (error) {
    const sanitisedError = sanitiseError(error)
    logger.error({ ...sanitisedError, query }, `Error calling, path: '${path}', verb: 'GET'`)
    throw sanitisedError
  }
}

module.exports = {
  get
}
