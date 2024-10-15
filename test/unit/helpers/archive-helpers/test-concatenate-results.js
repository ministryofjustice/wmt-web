describe('helpers/archive-helpers/concatenate-results', function () {
  let expect

  before(async function () {
    expect = (await import('chai')).expect
  })

  it('should concatenate 2 arrays', function () {
    const concatenateResults = require('../../../../app/helpers/archive-helpers/concatenate-results')
    const legacyDBResults = require('../../../helpers/data/archive-test-data/legacy-db-results')
    const archiveDBResults = require('../../../helpers/data/archive-test-data/archive-db-results')

    const concatenatedResults = concatenateResults(legacyDBResults, archiveDBResults, false)
    expect(concatenatedResults.length).to.eql(legacyDBResults.length + archiveDBResults.length)
  })
})
