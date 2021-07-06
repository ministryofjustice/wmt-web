const LEGACY_MAX_WORKLOAD_REPORT_ID = require('../../../config').LEGACY_MAX_WORKLOAD_REPORT_ID
const ARCHIVE_MAX_WORKLOAD_REPORT_ID = require('../../../config').ARCHIVE_MAX_WORKLOAD_REPORT_ID
const LEGACY_MAX_WORKLOAD_ID = require('../../../config').LEGACY_MAX_WORKLOAD_ID
const ARCHIVE_MAX_WORKLOAD_ID = require('../../../config').ARCHIVE_MAX_WORKLOAD_ID

module.exports = function (result, incrementWorkloadsForBothDatabases) {
  if (incrementWorkloadsForBothDatabases) {
    result.workloadReportId = result.workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_REPORT_ID)
    result.workloadID = result.workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_ID)
  } else {
    result.workloadReportId = result.workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID)
    result.workloadID = result.workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID)
  }
  return result
}
