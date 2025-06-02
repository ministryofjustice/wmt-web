const config = require('../../../config')
const axios = require('axios')

const USERS = {
  SuperUser: { username: 'WMT_SUPER_USER', roleId: 3 },
  ApplicationSupport: { username: 'WMT_APPLICATION_SUPPORT', roleId: 2 },
  Manager: { username: 'WMT_MANAGER', roleId: 1 },
  Staff: { username: 'WMT_STAFF' },
  unautheticatedUser: { username: 'UNAUTHN_USER' },
  onlyWmtUser: { username: 'ONLY_WMT_USER' }
}

const login = async function ({ username }) {
  const { data } = await axios.get(`${config.apis.manageUsersService.url}/__admin/mappings`)
  const { mappings } = data
  const { id } = mappings.find(m => m.request.urlPattern === '/users/me/email')

  await axios.put(`${config.apis.manageUsersService.url}/__admin/mappings/${id}`,
    {
      request: {
        method: 'GET',
        urlPattern: '/users/me/email'
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        jsonBody: {
          staffId: 231232,
          username: 'USER1',
          active: true,
          name: 'john smith',
          email: `${username.toLowerCase()}@digital.justice.gov.uk`
        }
      }
    }
  )

  await browser.url('/')
}

const logout = async function () {
  const link = await $('[href="/sign-out"]')
  await link.click()
  await axios.post(`${config.apis.manageUsersService.url}/__admin/mappings/reset`)
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
