const groupArchiveData = require('../helpers/grouped-archive-helpers/group-archive-data')
const averageGroupedArchiveData = require('../helpers/grouped-archive-helpers/average-grouped-archive-data')

module.exports = function (results, searchStartDate, searchEndDate, groupBy, interval) {
  const archiveArray = groupArchiveData(results, groupBy)
  if (interval === 'weekly') {
    interval = 7
  } else {
    interval = 28
  }
  const groupedData = averageGroupedArchiveData(archiveArray, searchStartDate, searchEndDate, groupBy, interval)
  return groupedData
}
