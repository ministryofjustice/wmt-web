const config = require('../../../config')

const USERS = {
  DataAdmin: {username: 'AUTH_RO_USER_TEST3', roleId:3},
  SystemAdmin: {username: 'AUTH_RO_USER_TEST2', roleId:2},
  Manager: {username: 'AUTH_RO_USER_TEST', roleId:1},
  Staff: {username: 'AUTH_USER'}
}

const login = async function (username) {
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
