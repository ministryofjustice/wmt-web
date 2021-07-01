const config = require('./knexfile').web
const legacy = require('./knexfile').legacy
const archive = require('./knexfile').archive

const knexWebSchema = require('knex')(config)
const knexLegacy = require('knex')(legacy)
const knexArchive = require('knex')(archive)

const pg = require('pg');

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
   return parseInt(value);
});

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
    return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});

module.exports = {
  web: knexWebSchema,
  legacy: knexLegacy,
  archive: knexArchive
}
