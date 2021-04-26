/* eslint-disable no-new */
const expect = require('chai').expect
const WorkloadPoints = require('../../../../app/services/domain/workload-points')

const VALID_WORKLOAD_POINTS = {
  previousWpId: '2',
  commA3: '206',
  commA2: '158',
  commA1: '146',
  commA0: '110',
  commB3: '146',
  commB2: '115',
  commB1: '102',
  commB0: '72',
  commC3: '79',
  commC2: '63',
  commC1: '50',
  commC0: '35',
  commD3: '51',
  commD2: '41',
  commD1: '29',
  commD0: '29',
  cusA3: '75',
  cusA2: '60',
  cusA1: '59',
  cusA0: '0',
  cusB3: '59',
  cusB2: '48',
  cusB1: '47',
  cusB0: '0',
  cusC3: '30',
  cusC2: '24',
  cusC1: '23',
  cusC0: '0',
  cusD3: '17',
  cusD2: '14',
  cusD1: '13',
  cusD0: '0',
  licA3: '219',
  licA2: '175',
  licA1: '163',
  licA0: '0',
  licB3: '161',
  licB2: '132',
  licB1: '119',
  licB0: '0',
  licC3: '77',
  licC2: '65',
  licC1: '52',
  licC0: '0',
  licD3: '51',
  licD2: '43',
  licD1: '31',
  licD0: '0',
  sdr: '101',
  userId: '35',
  sdrConversion: '51',
  nominalTargetPso: '2001',
  nominalTargetPo: '2001',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  weightingArmsCommunity: '10.1',
  weightingArmsLicense: '10.2',
  defaultContractedHoursPo: '37',
  defaultContractedHoursPso: '37',
  parom: '121',
  isT2A: 'false',
  defaultContractedHoursSpo: '0'
}

describe('services/domain/workload-points', function () {
  it('should create a valid workload points object', function () {
    const workloadPoints = new WorkloadPoints(VALID_WORKLOAD_POINTS)
    expect(workloadPoints.commA3).to.equal('206')
    expect(workloadPoints.commA2).to.equal('158')
    expect(workloadPoints.commA1).to.equal('146')
    expect(workloadPoints.commA0).to.equal('110')
    expect(workloadPoints.commB3).to.equal('146')
    expect(workloadPoints.commB2).to.equal('115')
    expect(workloadPoints.commB1).to.equal('102')
    expect(workloadPoints.commB0).to.equal('72')
    expect(workloadPoints.commC3).to.equal('79')
    expect(workloadPoints.commC2).to.equal('63')
    expect(workloadPoints.commC1).to.equal('50')
    expect(workloadPoints.commC0).to.equal('35')
    expect(workloadPoints.commD3).to.equal('51')
    expect(workloadPoints.commD2).to.equal('41')
    expect(workloadPoints.commD1).to.equal('29')
    expect(workloadPoints.commD0).to.equal('29')
    expect(workloadPoints.cusA3).to.equal('75')
    expect(workloadPoints.cusA2).to.equal('60')
    expect(workloadPoints.cusA1).to.equal('59')
    expect(workloadPoints.cusA0).to.equal('0')
    expect(workloadPoints.cusB3).to.equal('59')
    expect(workloadPoints.cusB2).to.equal('48')
    expect(workloadPoints.cusB1).to.equal('47')
    expect(workloadPoints.cusB0).to.equal('0')
    expect(workloadPoints.cusC3).to.equal('30')
    expect(workloadPoints.cusC2).to.equal('24')
    expect(workloadPoints.cusC1).to.equal('23')
    expect(workloadPoints.cusC0).to.equal('0')
    expect(workloadPoints.cusD3).to.equal('17')
    expect(workloadPoints.cusD2).to.equal('14')
    expect(workloadPoints.cusD1).to.equal('13')
    expect(workloadPoints.cusD0).to.equal('0')
    expect(workloadPoints.licA3).to.equal('219')
    expect(workloadPoints.licA2).to.equal('175')
    expect(workloadPoints.licA1).to.equal('163')
    expect(workloadPoints.licA0).to.equal('0')
    expect(workloadPoints.licB3).to.equal('161')
    expect(workloadPoints.licB2).to.equal('132')
    expect(workloadPoints.licB1).to.equal('119')
    expect(workloadPoints.licB0).to.equal('0')
    expect(workloadPoints.licC3).to.equal('77')
    expect(workloadPoints.licC2).to.equal('65')
    expect(workloadPoints.licC1).to.equal('52')
    expect(workloadPoints.licC0).to.equal('0')
    expect(workloadPoints.licD3).to.equal('51')
    expect(workloadPoints.licD2).to.equal('43')
    expect(workloadPoints.licD1).to.equal('31')
    expect(workloadPoints.licD0).to.equal('0')
    expect(workloadPoints.defaultContractedHoursPo).to.equal('37')
    expect(workloadPoints.defaultContractedHoursPso).to.equal('37')
    expect(workloadPoints.defaultContractedHoursSpo).to.equal('0')
    expect(workloadPoints.sdrConversion).to.equal('51')
    expect(workloadPoints.userId).to.equal('35')
    expect(workloadPoints.nominalTargetPo).to.equal('2001')
    expect(workloadPoints.nominalTargetPso).to.equal('2001')
    expect(workloadPoints.parom).to.equal('121')
    expect(workloadPoints.sdr).to.equal('101')
    expect(workloadPoints.weightingOverdue).to.equal('0.0')
    expect(workloadPoints.weightingUpw).to.equal('100.0')
    expect(workloadPoints.weightingArmsCommunity).to.equal('10.1')
    expect(workloadPoints.weightingArmsLicense).to.equal('10.2')
    expect(workloadPoints.weightingWarrants).to.equal('0.0')
    expect(workloadPoints.isT2A).to.equal('false')
  })

  it('should raise a ValidationError if a Community Weighting field is out of range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.commA3 = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if a Community Weighting field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.commD2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if a Custody Weighting field is out of range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.cusB1 = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if a Custody Weighting field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.cusC2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if a License Weighting field is out of range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.licC1 = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if a License Weighting field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.licC2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours PO field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPo = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours PSO field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPso = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours SPO field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursSpo = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours PO field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPo = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours PSO field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPso = '50'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Default Contracted Hours SPO field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursSpo = '38'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if SDR field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdr = '9000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if SDR field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdr = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if SDR Conversion field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdrConversion = '-4'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if SDR Conversion field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdrConversion = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if PAROM field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.parom = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if PAROM field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.parom = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Nominal Target PO field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.nominalTargetPo = '10000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Nominal Target PSO field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.nominalTargetPo = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Overdue field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingOverdue = '101'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Overdue field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingOverdue = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Upw field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingUpw = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Upw field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingUpw = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Warrants field is outside valid range', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingWarrants = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if Weighting Warrants field is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingWarrants = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })

  it('should raise a ValidationError if T2A flag is not set', function () {
    const invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.isT2A = null

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw()
  })
})
