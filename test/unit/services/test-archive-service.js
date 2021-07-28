const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const archiveOptions = require('../../../app/constants/archive-options')
const log = require('../../../app/logger')
const LEGACY_MAX_WORKLOAD_REPORT_ID = require('../../../config').LEGACY_MAX_WORKLOAD_REPORT_ID
const ARCHIVE_MAX_WORKLOAD_REPORT_ID = require('../../../config').ARCHIVE_MAX_WORKLOAD_REPORT_ID
const LEGACY_MAX_WORKLOAD_ID = require('../../../config').LEGACY_MAX_WORKLOAD_ID
const ARCHIVE_MAX_WORKLOAD_ID = require('../../../config').ARCHIVE_MAX_WORKLOAD_ID

const legacyRawData = [{
  workloadID: 1,
  workloadDate: '2016-07-08T00:00:00.000Z',
  lduName: 'Test LDU',
  regionName: 'Region 1',
  grade: 'PO',
  teamName: 'Test Team',
  omName: 'Test Offender Manager',
  totalCases: 23,
  totalPoints: 1183,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  workloadReportId: 1,
  omKey: 'OMKEY01PO',
  teamCode: 'TEAMKEY01OLD',
  cmsPoints: 'N/A',
  gsPoints: 'N/A',
  cmsPercentage: 'N/A',
  gsPercentage: 'N/A',
  cmsColumn: 'N/A',
  gsColumn: 'N/A',
  armsTotalCases: 'N/A'
}]

const archiveRawData = [{
  workloadID: 1,
  workloadDate: '2021-01-04T00:00:00.000Z',
  workloadReportId: 1,
  workloadOwnerId: 1,
  omKey: 'OMKEY01',
  teamCode: 'TEAMCODE01',
  regionName: 'Region 1',
  lduName: 'PDU 1',
  teamName: 'Team 1',
  omName: 'OM 1',
  grade: 'PO',
  totalCases: 17,
  totalPoints: 2171,
  availablePoints: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  cmsPoints: 300,
  gsPoints: 12,
  armsTotalCases: 0,
  paromsPoints: 0,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  nominalTarget: 0
}]

const currentArchiveRawData = [{
  workloadID: 1,
  workloadDate: '2021-07-02T00:00:00.000Z',
  workloadReportId: 1,
  workloadOwnerId: 1,
  omKey: 'OMKEY01',
  teamCode: 'TEAMCODE01',
  regionName: 'Region 1',
  lduName: 'PDU 1',
  teamName: 'Team 1',
  omName: 'OM 1',
  grade: 'PO',
  totalCases: 67,
  totalPoints: 1183,
  availablePoints: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  cmsPoints: -200,
  gsPoints: -100,
  armsTotalCases: 0,
  paromsPoints: 0,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  nominalTarget: 0
}]

const expectedLegacyCapacity = '55.2%'

let archiveService
let getArchive
let getDailyArchiveFromNewDBArchive
let getDailyArchiveFromNewDBCurrent

beforeEach(function () {
  getArchive = sinon.stub()
  getDailyArchiveFromNewDBArchive = sinon.stub()
  getDailyArchiveFromNewDBCurrent = sinon.stub()
  archiveService = proxyquire('../../../app/services/archive-service',
    {
      './data/get-daily-archive': getArchive,
      './data/get-daily-archive-from-new-db': getDailyArchiveFromNewDBArchive,
      './data/get-daily-archive-from-new-db-current': getDailyArchiveFromNewDBCurrent
    })
})

describe('services/archive-service', function () {
  it('should return results from all 3 databases with the correctly incremented workloadIDs / workloadReportIds, capacites, cms/ gs columns and percentages - Legacy Database Start', function () {
    // Need to stringify and parse to make deep copies (i.e. values copied not references) so that the original variables remain unchanged
    // Object.assign([], array) will make a shallow copy (i.e. references copied not values) thus changing the original variables
    // The JS spread operator (i.e "...". for example, ...array) will also not work to make a deep copy
    getArchive.resolves(JSON.parse(JSON.stringify(legacyRawData)))
    getDailyArchiveFromNewDBArchive.resolves(JSON.parse(JSON.stringify(archiveRawData)))
    getDailyArchiveFromNewDBCurrent.resolves(JSON.parse(JSON.stringify(currentArchiveRawData)))
    return archiveService(archiveOptions.LEGACY).then(function (results) {
      expect(results.length).to.eql(legacyRawData.length + archiveRawData.length + currentArchiveRawData.length)
      expect(results[0].capacity).to.eql(expectedLegacyCapacity)
      expect(results[0].workloadReportId).to.eql(legacyRawData[0].workloadReportId)
      expect(results[0].workloadID).to.eql(legacyRawData[0].workloadID)

      expect(results[1].workloadReportId).to.eql(archiveRawData[0].workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID))
      expect(results[1].workloadID).to.eql(archiveRawData[0].workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID))
      expect(results[1].capacity).to.eql('100%')
      expect(results[1].cmsPercentage).to.eql('13.8%')
      expect(results[1].cmsColumn).to.eql('300 - 13.8%')
      expect(results[1].gsPercentage).to.eql('0.6%')
      expect(results[1].gsColumn).to.eql('12 - 0.6%')

      expect(results[2].workloadReportId).to.eql(currentArchiveRawData[0].workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_REPORT_ID))
      expect(results[2].workloadID).to.eql(currentArchiveRawData[0].workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_ID))
      expect(results[2].capacity).to.eql('54.5%')
      expect(results[2].cmsPercentage).to.eql('-9.2%')
      expect(results[2].cmsColumn).to.eql('-200 - -9.2%')
      expect(results[2].gsPercentage).to.eql('-8.5%')
      expect(results[2].gsColumn).to.eql('-100 - -8.5%')
    })
  })

  it('should return results from all databases except Legacy DB with the correctly incremented workloadIDs / workloadReportIds, capacites, cms/ gs columns and percentages - Archive Database Start', function () {
    getDailyArchiveFromNewDBArchive.resolves(JSON.parse(JSON.stringify(archiveRawData)))
    getDailyArchiveFromNewDBCurrent.resolves(JSON.parse(JSON.stringify(currentArchiveRawData)))
    return archiveService(archiveOptions.DAILY_ARCHIVE).then(function (results) {
      expect(results.length).to.eql(archiveRawData.length + currentArchiveRawData.length)
      expect(results[0].workloadReportId).to.eql(archiveRawData[0].workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID))
      expect(results[0].workloadID).to.eql(archiveRawData[0].workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID))
      expect(results[0].capacity).to.eql('100%')
      expect(results[0].cmsPercentage).to.eql('13.8%')
      expect(results[0].cmsColumn).to.eql('300 - 13.8%')
      expect(results[0].gsPercentage).to.eql('0.6%')
      expect(results[0].gsColumn).to.eql('12 - 0.6%')

      expect(results[1].workloadReportId).to.eql(currentArchiveRawData[0].workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_REPORT_ID))
      expect(results[1].workloadID).to.eql(currentArchiveRawData[0].workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_ID))
      expect(results[1].capacity).to.eql('54.5%')
      expect(results[1].cmsPercentage).to.eql('-9.2%')
      expect(results[1].cmsColumn).to.eql('-200 - -9.2%')
      expect(results[1].gsPercentage).to.eql('-8.5%')
      expect(results[1].gsColumn).to.eql('-100 - -8.5%')
    })
  })

  it('should return results from the Current DB only with the correctly incremented workloadIDs / workloadReportIds, capacites, cms/ gs columns and percentages - Current Database Start', function () {
    getDailyArchiveFromNewDBCurrent.resolves(JSON.parse(JSON.stringify(currentArchiveRawData)))
    return archiveService(archiveOptions.DAILY).then(function (results) {
      expect(results.length).to.eql(currentArchiveRawData.length)
      expect(results[0].workloadReportId).to.eql(currentArchiveRawData[0].workloadReportId + parseInt(LEGACY_MAX_WORKLOAD_REPORT_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_REPORT_ID))
      expect(results[0].workloadID).to.eql(currentArchiveRawData[0].workloadID + parseInt(LEGACY_MAX_WORKLOAD_ID) + parseInt(ARCHIVE_MAX_WORKLOAD_ID))
      expect(results[0].capacity).to.eql('54.5%')
      expect(results[0].cmsPercentage).to.eql('-9.2%')
      expect(results[0].cmsColumn).to.eql('-200 - -9.2%')
      expect(results[0].gsPercentage).to.eql('-8.5%')
      expect(results[0].gsColumn).to.eql('-100 - -8.5%')
    })
  })
})
