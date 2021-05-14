const config = require('./knexfile').web
const legacy = require('./knexfile').legacy
const archive = require('./knexfile').archive

const knexWebSchema = require('knex')(config)
const knexLegacy = require('knex')(legacy)
const knexArchive = require('knex')(archive)

module.exports = {
  web: knexWebSchema,
  legacy: knexLegacy,
  archive: knexArchive
}
