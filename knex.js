const config = require('./knexfile').web
const archive = require('./knexfile').archive
const newArchive = require('./knexfile').newArchive

const knexWebSchema = require('knex')(config)
const knexArchive = require('knex')(archive)
const knexNewArchive = require('knex')(newArchive)

module.exports = {
  web: knexWebSchema,
  archive: knexArchive,
  newArchive: knexNewArchive
}
