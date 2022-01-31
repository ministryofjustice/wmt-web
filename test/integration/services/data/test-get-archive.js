const expect = require('chai').expect
const moment = require('moment')
const getArchive = require('../../../../app/services/data/get-daily-archive')
const ArchiveDataForm = require('../../../../app/services/domain/archive-data-form')
const { createDailyArchive, deleteDailyArchiveByIds } = require('../../../helpers/data/daily-archive-data-helper')

const toDate = moment()
const fromDate = moment().subtract(7, 'day')

const expectedResult = {
  workloadID: 2745,
  workloadDate: moment().subtract(3, 'day').toDate(),
  lduName: 'All NPS North West',
  regionName: 'Tyne',
  teamName: 'Chesh & Gt Manch CRC - CRC Transfers',
  omName: 'A.N. Offender Manager 1',
  grade: 'SPO',
  totalCases: 1,
  totalPoints: 6,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 0,
  hoursReduction: 0
}

let idsSaved

const archiveDataForm = new ArchiveDataForm(fromDate.date(), fromDate.month() + 1, fromDate.year(), toDate.date(), toDate.month() + 1, toDate.year(), [expectedResult.omName])

describe('services/data/get-daily-archive', function () {
  before(function () {
    return createDailyArchive(expectedResult).then(function (results) {
      idsSaved = results
    })
  })
  it('should retrieve all twelve columns for archive data', function () {
    return getArchive(archiveDataForm).then(function (results) {
      expect(results[0].workloadID).to.eql(expectedResult.workloadID)
      expect(results[0].lduName).to.eql(expectedResult.lduName)
      expect(results[0].teamName).to.eql(expectedResult.teamName)
      expect(results[0].omName).to.eql(expectedResult.omName)
      expect(results[0].totalCases).to.eql(expectedResult.totalCases)
      expect(results[0].totalPoints).to.eql(expectedResult.totalPoints)
      expect(results[0].sdrPoints).to.eql(expectedResult.sdrPoints)
      expect(results[0].sdrConversionPoints).to.eql(expectedResult.sdrConversionPoints)
      expect(results[0].paromsPoints).to.eql(expectedResult.paromsPoints)
      expect(results[0].nominalTarget).to.eql(expectedResult.nominalTarget)
      expect(results[0].contractedHours).to.eql(expectedResult.contractedHours)
      expect(results[0].hoursReduction).to.eql(expectedResult.hoursReduction)
    })
  })
  after(function () {
    return deleteDailyArchiveByIds(idsSaved)
  })
})
