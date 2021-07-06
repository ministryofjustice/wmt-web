const calculateCapacityCMSAndGS = require('./calculate-capacity-cms-and-gs')
const incrementWorkloadAndWorkloadReportIds = require('./increment-workload-and-workload-report-ids')

module.exports = function (results1, results2, incrementWorkloadsForBothDatabases) {
  results2.forEach(function (result) {
    result = calculateCapacityCMSAndGS(result)
    result = incrementWorkloadAndWorkloadReportIds(result, incrementWorkloadsForBothDatabases)
  })
  const concatenatedResults = results1.concat(results2)
  return concatenatedResults
}
