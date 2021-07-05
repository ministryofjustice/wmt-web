const expect = require('chai').expect
const groupArchiveData = require('../../../../app/helpers/grouped-archive-helpers/group-archive-data')

const preGroupedData = require('../../../helpers/data/archive-test-data/pre-grouped-data')

const secondTeam = {
  workloadID: 15459157,
  workloadDate: '2021-02-15T00:00:00.000Z',
  workloadReportId: 1854,
  workloadOwnerId: 35168,
  omKey: 'OMKEY20',
  teamCode: 'TEAMCODE02',
  regionName: 'Region 1',
  lduName: 'PDU 1',
  teamName: 'Team 2',
  omName: 'OM 20',
  grade: 'PO',
  totalCases: 31,
  totalPoints: 2317,
  availablePoints: 2176,
  contractedHours: 37,
  hoursReduction: 0,
  cmsPoints: 0,
  gsPoints: 0,
  armsTotalCases: 0,
  paromsPoints: 120,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  nominalTarget: 2176,
  capacity: '106.5%',
  cmsColumn: '0 - 0%',
  cmsPercentage: '0%',
  gsColumn: '0 - 0%',
  gsPercentage: '0%'
}

describe('helpers/grouped-archive-helpers/group-archive-data', function () {
  it('should group data by offender manager producing an array of length 11', function () {
    const groupedArchiveData = groupArchiveData(preGroupedData, 'offenderManager')
    expect(groupedArchiveData.length).to.eql(11)
  })

  it('should group data by offender manager producing an array of length 12', function () {
    const groupedArchiveData = groupArchiveData(preGroupedData.concat(secondTeam), 'offenderManager')
    expect(groupedArchiveData.length).to.eql(12)
  })

  it('should group data by team producing an array of length 1', function () {
    const groupedArchiveData = groupArchiveData(preGroupedData, 'team')
    expect(groupedArchiveData.length).to.eql(1)
  })

  it('should group data by team producing an array of length 2', function () {
    const groupedArchiveData = groupArchiveData(preGroupedData.concat(secondTeam), 'team')
    expect(groupedArchiveData.length).to.eql(2)
  })
})
