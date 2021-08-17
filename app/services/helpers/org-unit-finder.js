const orgUnit = require('../../constants/organisation-unit')

module.exports = function (property, value) {
  const newObj = Object.entries(orgUnit).find(function ([, v]) {
    return v[property] === value
  })

  return newObj ? newObj[1] : undefined
}
