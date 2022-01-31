const config = require('../../../knexfile').legacy
const knex = require('knex')(config)

module.exports.createArchiveReductions = function (archiveReductionData) {
  const insert = {
    om_name: archiveReductionData.omName,
    hours_reduced: archiveReductionData.hoursReduced,
    comments: archiveReductionData.comments,
    last_updated_date: archiveReductionData.lastUpdatedDate,
    reduction_added_by: archiveReductionData.reductionAddedBy
  }

  return knex('archive_reduction_data').withSchema('dbo').returning('id').insert(insert)
    .then(function ([id]) {
      return id.id
    })
}

module.exports.deleteArchiveReductionsByIds = function (idsToDelete) {
  return knex('archive_reduction_data').withSchema('dbo').where('id', idsToDelete)
    .del()
}
