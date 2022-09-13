const hmppsAuthClient = require('../data/hmppsAuthClient')
const { convertToTitleCase } = require('../utils/utils')

const getUser = async function (token) {
  const [user, userEmail] = await Promise.all([hmppsAuthClient.getUser(token), hmppsAuthClient.getUserEmail(token)])
  return { ...user, ...userEmail, displayName: convertToTitleCase(user.name) }
}

module.exports = {
  getUser
}
