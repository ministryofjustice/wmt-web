
const USERS = {
  DataAdmin: { username: 'WMT_SUPER_USER', roleId: 3 },
  SystemAdmin: { username: 'WMT_SYSTEM_ADMIN', roleId: 2 },
  Manager: { username: 'WMT_MANAGER', roleId: 1 },
  Staff: { username: 'WMT_STAFF' },
  unautheticatedUser: { username: 'UNAUTHN_USER' }
}

const login = async function ({ username }) {
  const password = 'password123456'

  await browser.url('/')

  const usernameInput = await $('#username')
  await usernameInput.setValue(username)
  const passwordInput = await $('#password')
  const submit = await $('#submit')
  await passwordInput.setValue(password)
  await submit.click()
}

const logout = async function () {
  const link = await $('[href="/logout"')
  link.click()
  await $('#username')
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
