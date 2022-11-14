/* eslint-disable no-new */
const moment = require('moment')
const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/reduction')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

const activeStartDate = moment().subtract(30, 'days').toDate()
const activeEndDate = moment().add(30, 'days').toDate()
const reductionReason = {
  maxAllowanceHours: 11
}

describe('services/domain/reduction', function () {
  it('should construct a new-reduction object with the correct values', function () {
    const reduction = new Reduction('1', '10',
      [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
      [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason, 150)
    expect(reduction.hours).to.equal(10)
    expect(reduction.reasonForReductionId).to.equal(1)
    expect(reduction.reductionStartDate).to.be.a('date')
    expect(reduction.reductionEndDate).to.be.a('date')
    expect(reduction.notes).to.be.a('string')
    expect(reduction.status).to.be.equal(reductionStatusType.ACTIVE)
    expect(reduction.reductionSubmitter).to.equal(150)
  })
})
