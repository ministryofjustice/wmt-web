const expect = require('chai').expect
const moment = require('moment')
const getArchive = require('../../../../app/services/data/get-daily-archive')
const ArchiveDataForm = require('../../../../app/services/domain/archive-data-form')

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

let archiveData

const archiveDataForm = new ArchiveDataForm(18, 6, 2014, 26, 8, 2016, ['A.N. Offender Manager 1'])

describe('services/data/get-daily-archive', function () {
  before(function () {
    return getArchive(archiveDataForm).then(function (results) {
      archiveData = results
    })
  })
  it('should retrieve all twelve columns for archive data', function () {
    return getArchive(archiveDataForm).then(function (results) {
      expect(archiveData.workloadID).to.eql(expectedResult.workloadID)
      expect(archiveData.lduName).to.eql(expectedResult.lduName)
      expect(archiveData.teamName).to.eql(expectedResult.teamName)
      expect(archiveData.omName).to.eql(expectedResult.omName)
      expect(archiveData.totalCases).to.eql(expectedResult.totalCases)
      expect(archiveData.totalPoints).to.eql(expectedResult.totalPoints)
      expect(archiveData.sdrPoints).to.eql(expectedResult.sdrPoints)
      expect(archiveData.sdrConversionPoints).to.eql(expectedResult.sdrConversionPoints)
      expect(archiveData.paromsPoints).to.eql(expectedResult.paromsPoints)
      expect(archiveData.nominalTarget).to.eql(expectedResult.nominalTarget)
      expect(archiveData.contractedHours).to.eql(expectedResult.contractedHours)
      expect(archiveData.hoursReduction).to.eql(expectedResult.hoursReduction)
    })
  })
})
