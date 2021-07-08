const expect = require('chai').expect

const fortnightlyArchiveHelper = require('../../../helpers/data/fortnightly-archive-helper')
const getArchive = require('../../../../app/services/data/get-fortnightly-archive')
const ArchiveDateRange = require('../../../../app/services/domain/archive-date-range')


const startDate = new Date(new Date().setDate(new Date().getDate() - 5));
const endDate = new Date(new Date().setDate(new Date().getDate() - 3));

const expectedResult = {
  startDate: startDate,
  endDate: endDate,
  lduName: 'NPS Team',
  teamName: 'NPS - Newport - Team 1',
  omName: 'A.N. Offender Manager 1511',
  totalCases: 48,
  totalPoints: 2519,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0
}



let idsToDelete

const rangeStartDate = new Date(new Date().setDate(new Date().getDate() - 10));
const rangeEndDate = new Date(new Date().setDate(new Date().getDate() - 2));
const archiveDateRange = new ArchiveDateRange(rangeStartDate.getDate(), rangeStartDate.getMonth()+1, rangeStartDate.getFullYear(), rangeEndDate.getDate(), rangeEndDate.getMonth()+1, rangeEndDate.getFullYear())
const extraCriteria = expectedResult.omName

describe('services/data/get-fortnightly-archive', function () {
  before(function () {
      return fortnightlyArchiveHelper.createFortnightlyArchive(expectedResult)
      .then(function(ids) {
        idsToDelete = ids
      })
  })
  it('should retrieve all twelve columns for archive data', function () {
    return getArchive(archiveDateRange, extraCriteria).then(function (results) {
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
  after(function() {
    return fortnightlyArchiveHelper.deleteFortnightlyArchiveById(idsToDelete)
  })
})
