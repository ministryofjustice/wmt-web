const sanitiseError = require('../sanitisedError')
const Agent = require('agentkeepalive')
const HttpsAgent = require('agentkeepalive').HttpsAgent
const axios = require('axios')
const axiosRetry = require('axios-retry')

class RestClient {
  agent

  axiosClient

  constructor (config) {
    this.agent = config.url.startsWith('https') ? new HttpsAgent(config.agent) : new Agent(config.agent)
    this.axiosClient = axios.create({
      baseURL: config.url,
      timeout: config.timeout.response,
      httpsAgent: this.agent,
      httpAgent: this.agent
    })
    axiosRetry(this.axiosClient, {
      retries: config.retries,
      retryCondition: error => {
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.config.method !== 'post' && error.code === 'ECONNABORTED')
        )
      },
      shouldResetTimeout: true
    })
  }

  get (path, token) {
    return this.axiosClient.get(path, {
      headers: { 'Accept-Encoding': 'application/json', Authorization: `Bearer ${token}` }
    }).then(function (result) {
      return result.data
    }).catch(function (error) {
      const sanitisedError = sanitiseError(error)
      throw sanitisedError
    })
  }
}

module.exports = RestClient
