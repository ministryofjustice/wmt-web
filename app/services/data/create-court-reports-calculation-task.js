const knex = require('../../../knex').web

module.exports = function (courtReportStagingId, workloadReportId, batchSize) {
  const newTask = {
    submitting_agent: 'WEB',
    type: 'COURT-REPORTS-CALCULATION',
    additional_data: JSON.stringify(
      {
        workloadBatch: { startingId: courtReportStagingId, batchSize },
        operationType: 'UPDATE'
      }),
    workload_report_id: workloadReportId,
    date_created: undefined,
    status: 'PENDING'
  }
  return knex('tasks').withSchema('app').returning('id').insert(newTask)
    .then(function ([id]) {
      return id.id
    })
}
