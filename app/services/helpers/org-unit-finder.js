const orgUnit = require('../../constants/organisation-unit')

module.exports = function (property, value) {
  return Object.values(orgUnit).find(function (v) {
    return v[property] === value
  })
}
