const expect = require('chai').expect
const concatenateResults = require('../../../../app/helpers/archive-helpers/concatenate-results')

const legacyDBResults = require('../../../helpers/data/archive-test-data/legacy-db-results')
const archiveDBResults = require('../../../helpers/data/archive-test-data/archive-db-results')

describe('helpers/archive-helpers/concatenate-results', function () {
  it('should concatenate 2 arrays', function () {
    const concatenatedResults = concatenateResults(legacyDBResults, archiveDBResults, false)
    expect(concatenatedResults.length).to.eql(legacyDBResults.length + archiveDBResults.length)
  })
})
