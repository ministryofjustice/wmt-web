const hmppsAuthClient = require('../data/hmppsAuthClient')

const getUser = async function (token) {
  const user = await hmppsAuthClient.getUser(token)
  return { ...user, displayName: user.name }
}

module.exports = {
  getUser
}
