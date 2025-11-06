const { FliptClient } = require('@flipt-io/flipt-client-js')
const config = require('../../config')

const createClient = async () => {
  const client = await FliptClient.init({
    namespace: config.fliptClient.namespace,
    url: config.fliptClient.url,
    authentication: {
      clientToken: config.fliptClient.apiClientSecret
    }
  })
  return client
}

module.exports = { createClient }
