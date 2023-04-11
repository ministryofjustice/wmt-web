const knex = require('knex')(require('../knexfile').web)

module.exports = {
  integrationTests: knex
}
