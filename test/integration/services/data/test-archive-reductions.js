const expect = require('chai').expect
const moment = require('moment')
const getArchivedReductions = require('../../../../app/services/data/get-reduction-archive')
const ArchiveDataForm = require('../../../../app/services/domain/archive-data-form')
const { createArchiveReductions, deleteArchiveReductionsByIds } = require('../../../helpers/data/archive-reduction-data-helper')

const toDate = moment()
const fromDate = moment().subtract(7, 'day')

const expectedResult = {
  omName: 'A.N. Offender Manager KNTK042PSO',
  hoursReduced: parseFloat(18.8).toPrecision(3),
  comments: '67A1623',
  lastUpdatedDate: moment().subtract(3, 'day').toDate(),
  reductionAddedBy: 'Reduction Submitter 5'
}

let idsSaved

const archiveDataForm = new ArchiveDataForm(
  fromDate.date(),
  fromDate.month() + 1,
  fromDate.year(),
  toDate.date(),
  toDate.month() + 1,
  toDate.year(),
  ['Reduction Submitter 5'],
  true
)
describe('services/data/get-archived-reductions', function () {
  before(function () {
    return createArchiveReductions(expectedResult).then(function (results) {
      idsSaved = results
    })
  })
  it('should retrieve all 5 columns for archive data', function () {
    return getArchivedReductions(archiveDataForm).then(function (results) {
      expect(results[0].omName).to.eql(expectedResult.omName)
      expect(parseFloat(results[0].hoursReduced).toPrecision(3)).to.eql(expectedResult.hoursReduced)
      expect(results[0].comments).to.eql(expectedResult.comments)
      expect(results[0].reductionAddedBy).to.eql(expectedResult.reductionAddedBy)
    })
  })
  after(function () {
    return deleteArchiveReductionsByIds(idsSaved)
  })
})
