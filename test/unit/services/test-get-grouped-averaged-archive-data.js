const expect = require('chai').expect
const getGroupedAveragedArchiveData = require('../../../app/services/get-grouped-averaged-archive-data')
const preGroupedData = require('../../helpers/data/archive-test-data/pre-grouped-data')
const expectedGroupedDataByOmWeekly = require('../../helpers/data/archive-test-data/grouped-data-om-weekly')
const expectedGroupedDataByOmMonthly = require('../../helpers/data/archive-test-data/grouped-data-om-monthly')
const expectedGroupedDataByTeamWeekly = require('../../helpers/data/archive-test-data/grouped-data-team-weekly')
const expectedGroupedDataByTeamMonthly = require('../../helpers/data/archive-test-data/grouped-data-team-monthly')
const moment = require('moment')

let groupedData

describe('services/get-grouped-averaged-archive-data', function () {
  it('should return the expected array with 77 objects - Group By OM - Weekly', function () {
    groupedData = getGroupedAveragedArchiveData(preGroupedData, new moment('2021-01-04'), '2021-02-15', 'offenderManager', 'weekly') //eslint-disable-line
    expect(groupedData.length).to.eql(77)
    for (let i = 0; i < groupedData.length; i++) {
      expect(groupedData[i]).to.deep.equal(expectedGroupedDataByOmWeekly[i])
    }
  })

  it('should return the expected array with 22 objects - Group By OM - Monthly', function () {
    groupedData = getGroupedAveragedArchiveData(preGroupedData, new moment('2021-01-04'), '2021-02-15', 'offenderManager', 'monthly') //eslint-disable-line
    expect(groupedData.length).to.eql(22)
    for (let i = 0; i < groupedData.length; i++) {
      expect(groupedData[i]).to.deep.equal(expectedGroupedDataByOmMonthly[i])
    }
  })

  it('should return the expected array with 7 objects - Group By Team - Weekly', function () {
    groupedData = getGroupedAveragedArchiveData(preGroupedData, new moment('2021-01-04'), '2021-02-15', 'team', 'weekly') //eslint-disable-line
    expect(groupedData.length).to.eql(7)
    for (let i = 0; i < groupedData.length; i++) {
      expect(groupedData[i]).to.deep.equal(expectedGroupedDataByTeamWeekly[i])
    }
  })

  it('should return the expected array with 2 objects - Group By Team - Monthly', function () {
    groupedData = getGroupedAveragedArchiveData(preGroupedData, new moment('2021-01-04'), '2021-02-15', 'team', 'monthly') //eslint-disable-line
    expect(groupedData.length).to.eql(2)
    for (let i = 0; i < groupedData.length; i++) {
      expect(groupedData[i]).to.deep.equal(expectedGroupedDataByTeamMonthly[i])
    }
  })
})
