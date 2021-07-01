const getDailyArchive = require('./data/get-daily-archive')
const getDailyArchiveFromNewDB = require('./data/get-daily-archive-from-new-db')
const getReductionArchive = require('./data/get-reduction-archive')
const getReductionArchiveFromNewDB = require('./data/get-reduction-archive-from-new-db')
const archiveOptions = require('../constants/archive-options')
const moment = require('moment')
const incrementWorkloadAndWorkloadReportIds = require('../helpers/archive-helpers/increment-workload-and-workload-report-ids')
const concatenateResults = require('../helpers/archive-helpers/concatenate-results')
const calculateCapacityCMSAndGS = require('../helpers/archive-helpers/calculate-capacity-cms-and-gs')
const calculateCapacity = require('../helpers/archive-helpers/calculate-capacity')
const formatReductionTo1DP = require('../helpers/archive-helpers/format-reduction-to-1-dp')

let archiveDataLimit

// const log = require('../logger')

module.exports = function (archiveOption, archiveDataForm) {
  archiveDataLimit = require('../../config').ARCHIVE_DATA_LIMIT

  if (archiveOption === archiveOptions.LEGACY) {
    return getDailyArchive(archiveDataForm).then(function (results) {
      results = calculateCapacity(results)
      archiveDataLimit = archiveDataLimit - results.length
      if (archiveDataLimit > 0) {
        return getDailyArchiveFromNewDB(archiveDataForm, archiveDataLimit, true).then(function (results2) {
          let concatenatedResults = concatenateResults(results, results2, false)
          archiveDataLimit = archiveDataLimit - concatenatedResults.length
          if (archiveDataLimit > 0) {
            return getDailyArchiveFromNewDB(archiveDataForm, archiveDataLimit, false).then(function (results3) {
              concatenatedResults = concatenateResults(concatenatedResults, results3, true)
              return concatenatedResults.sort(caseloadDataArraySort)
            })
          } else {
            return concatenatedResults.sort(caseloadDataArraySort)
          }
        })
      } else {
        return results.sort(caseloadDataArraySort)
      }
    })
  } else if (archiveOption === archiveOptions.DAILY_ARCHIVE) {
    return getDailyArchiveFromNewDB(archiveDataForm, archiveDataLimit, true).then(function (results) {
      results.forEach(function (result) {
        result = calculateCapacityCMSAndGS(result)
        result = incrementWorkloadAndWorkloadReportIds(result, false)
      })
      archiveDataLimit = archiveDataLimit - results.length
      if (archiveDataLimit > 0) {
        return getDailyArchiveFromNewDB(archiveDataForm, archiveDataLimit, false).then(function (results2) {
          const concatenatedResults = concatenateResults(results, results2, false)
          return concatenatedResults.sort(caseloadDataArraySort)
        })
      } else {
        return results.sort(caseloadDataArraySort)
      }
    })
  } else if (archiveOption === archiveOptions.DAILY) {
    return getDailyArchiveFromNewDB(archiveDataForm, archiveDataLimit, false).then(function (results) {
      results.forEach(function (result) {
        result = calculateCapacityCMSAndGS(result)
        result = incrementWorkloadAndWorkloadReportIds(result, true)
      })
      return results.sort(caseloadDataArraySort)
    })
  } else if (archiveOption === archiveOptions.REDUCTIONS) {
    return getReductionArchive(archiveDataForm).then(function (oldReductions) {
      oldReductions.forEach(function (oldReduction) {
        oldReduction.reductionReason = 'N/A'
        oldReduction.startDate = 'N/A'
        oldReduction.endDate = 'N/A'
        oldReduction.reductionStatus = 'N/A'
      })
      return getReductionArchiveFromNewDB(archiveDataForm).then(function (newReductions) {
        const results = oldReductions.concat(newReductions)
        results.sort(reductionDataArraySort)
        return formatReductionTo1DP(results)
      })
    })
  }
}

const caseloadDataArraySort = function (obj1, obj2) {
  const obj1Date = moment(obj1.workloadDate, 'DD-MM-YYYY')
  const obj2Date = moment(obj2.workloadDate, 'DD-MM-YYYY')
  if (obj1Date.isAfter(obj2Date)) {
    return 1
  }
  if (obj1Date.isBefore(obj2Date)) {
    return -1
  }
  return 0
}

const reductionDataArraySort = function (obj1, obj2) {
  const obj1Date = moment(obj1.lastUpdatedDate, 'DD/MM/YYYY')
  const obj2Date = moment(obj2.lastUpdatedDate, 'DD/MM/YYYY')
  if (obj1Date.isAfter(obj2Date)) {
    return 1
  }
  if (obj1Date.isBefore(obj2Date)) {
    return -1
  }
  return 0
}
