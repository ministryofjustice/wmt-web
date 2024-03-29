const USERS = {
  SuperUser: { username: 'WMT_SUPER_USER', roleId: 3 },
  ApplicationSupport: { username: 'WMT_APPLICATION_SUPPORT', roleId: 2 },
  Manager: { username: 'WMT_MANAGER', roleId: 1 },
  Staff: { username: 'WMT_STAFF' },
  unautheticatedUser: { username: 'UNAUTHN_USER' },
  onlyWmtUser: { username: 'ONLY_WMT_USER' }
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
  const link = await $('[href="/sign-out"]')
  await link.click()
  await $('#username')
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
