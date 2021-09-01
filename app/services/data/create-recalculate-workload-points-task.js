const knex = require('../../../knex').web

module.exports = function (workloadReportId) {
  const newTask = {
    submitting_agent: 'WEB',
    type: 'RECALCULATE-WORKLOAD-POINTS',
    additional_data: null,
    workload_report_id: workloadReportId,
    date_created: undefined,
    status: 'PENDING'
  }
  return knex('tasks').withSchema('app').returning('id').insert(newTask)
}
