const expect = require('chai').expect

const getArchive = require('../../../../app/services/data/get-fortnightly-archive')

var expectedResult = {
  startDate: new Date('2014-06-05T00:00:00.000Z'),
  endDate: new Date('2014-06-19T00:00:00.000Z'),
  lduName: 'Approved Premises',
  teamName: '*Howarth House',
  omName: 'A.N. Offender Manager 2',
  totalCases: 1,
  totalPoints: 102,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0
}

var archiveData

describe('services/data/get-fortnightly-archive', function () {
  before(function () {
    return getArchive().then(function (results) {
      archiveData = results
    })
  })
  it('should retrieve all twelve columns for archive data', function () {
    expect(archiveData[0].lduName).to.eql(expectedResult.lduName)
    expect(archiveData[0].teamName).to.eql(expectedResult.teamName)
    expect(archiveData[0].omName).to.eql(expectedResult.omName)
    expect(archiveData[0].totalCases).to.eql(expectedResult.totalCases)
    expect(archiveData[0].totalPoints).to.eql(expectedResult.totalPoints)
    expect(archiveData[0].sdrPoints).to.eql(expectedResult.sdrPoints)
    expect(archiveData[0].sdrConversionPoints).to.eql(expectedResult.sdrConversionPoints)
    expect(archiveData[0].paromsPoints).to.eql(expectedResult.paromsPoints)
    expect(archiveData[0].nominalTarget).to.eql(expectedResult.nominalTarget)
    expect(archiveData[0].contractedHours).to.eql(expectedResult.contractedHours)
    expect(archiveData[0].hoursReduction).to.eql(expectedResult.hoursReduction)
  })
})