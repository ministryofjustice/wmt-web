const manageUsersClient = require('../data/manageUsersClient')
const { convertToTitleCase } = require('../utils/utils')

const getUser = async function (token) {
  const [user, userEmail] = await Promise.all([manageUsersClient.getUser(token), manageUsersClient.getUserEmail(token)])
  return { ...user, ...userEmail, displayName: convertToTitleCase(user.name) }
}

module.exports = {
  getUser
}
