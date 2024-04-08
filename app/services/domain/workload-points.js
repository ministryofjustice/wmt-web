const ValidationError = require('../errors/validation-error')
const ErrorHandler = require('../validators/error-handler')
const FieldValidator = require('../validators/field-validator')
// WMT0160: add new tiers
class WorkloadPoints {
  constructor (request, adjustments) {
    this.previousWpId = request.previousWpId
    this.commD0 = request.commD0
    this.commD1 = request.commD1
    this.commD2 = request.commD2
    this.commD3 = request.commD3
    this.commC0 = request.commC0
    this.commC1 = request.commC1
    this.commC2 = request.commC2
    this.commC3 = request.commC3
    this.commB0 = request.commB0
    this.commB1 = request.commB1
    this.commB2 = request.commB2
    this.commB3 = request.commB3
    this.commA0 = request.commA0
    this.commA1 = request.commA1
    this.commA2 = request.commA2
    this.commA3 = request.commA3

    this.cusD0 = request.cusD0
    this.cusD1 = request.cusD1
    this.cusD2 = request.cusD2
    this.cusD3 = request.cusD3
    this.cusC0 = request.cusC0
    this.cusC1 = request.cusC1
    this.cusC2 = request.cusC2
    this.cusC3 = request.cusC3
    this.cusB0 = request.cusB0
    this.cusB1 = request.cusB1
    this.cusB2 = request.cusB2
    this.cusB3 = request.cusB3
    this.cusA0 = request.cusA0
    this.cusA1 = request.cusA1
    this.cusA2 = request.cusA2
    this.cusA3 = request.cusA3

    this.licD0 = request.licD0
    this.licD1 = request.licD1
    this.licD2 = request.licD2
    this.licD3 = request.licD3
    this.licC0 = request.licC0
    this.licC1 = request.licC1
    this.licC2 = request.licC2
    this.licC3 = request.licC3
    this.licB0 = request.licB0
    this.licB1 = request.licB1
    this.licB2 = request.licB2
    this.licB3 = request.licB3
    this.licA0 = request.licA0
    this.licA1 = request.licA1
    this.licA2 = request.licA2
    this.licA3 = request.licA3

    this.commD0s = request.commD0s
    this.commD1s = request.commD1s
    this.commD2s = request.commD2s
    this.commD3s = request.commD3s
    this.commC0s = request.commC0s
    this.commC1s = request.commC1s
    this.commC2s = request.commC2s
    this.commC3s = request.commC3s
    this.commB0s = request.commB0s
    this.commB1s = request.commB1s
    this.commB2s = request.commB2s
    this.commB3s = request.commB3s
    this.commA0s = request.commA0s
    this.commA1s = request.commA1s
    this.commA2s = request.commA2s
    this.commA3s = request.commA3s

    this.cusD0s = request.cusD0s
    this.cusD1s = request.cusD1s
    this.cusD2s = request.cusD2s
    this.cusD3s = request.cusD3s
    this.cusC0s = request.cusC0s
    this.cusC1s = request.cusC1s
    this.cusC2s = request.cusC2s
    this.cusC3s = request.cusC3s
    this.cusB0s = request.cusB0s
    this.cusB1s = request.cusB1s
    this.cusB2s = request.cusB2s
    this.cusB3s = request.cusB3s
    this.cusA0s = request.cusA0s
    this.cusA1s = request.cusA1s
    this.cusA2s = request.cusA2s
    this.cusA3s = request.cusA3s

    this.licD0s = request.licD0s
    this.licD1s = request.licD1s
    this.licD2s = request.licD2s
    this.licD3s = request.licD3s
    this.licC0s = request.licC0s
    this.licC1s = request.licC1s
    this.licC2s = request.licC2s
    this.licC3s = request.licC3s
    this.licB0s = request.licB0s
    this.licB1s = request.licB1s
    this.licB2s = request.licB2s
    this.licB3s = request.licB3s
    this.licA0s = request.licA0s
    this.licA1s = request.licA1s
    this.licA2s = request.licA2s
    this.licA3s = request.licA3s

    this.userId = request.userId
    this.sdr = request.sdr
    this.sdrConversion = request.sdrConversion
    this.nominalTargetPso = request.nominalTargetPso
    this.nominalTargetPo = request.nominalTargetPo
    this.weightingOverdue = request.weightingOverdue
    this.weightingWarrants = request.weightingWarrants
    this.weightingUpw = request.weightingUpw
    this.weightingArmsCommunity = request.weightingArmsCommunity
    this.weightingArmsLicense = request.weightingArmsLicense
    this.defaultContractedHoursPo = request.defaultContractedHoursPo
    this.defaultContractedHoursPso = request.defaultContractedHoursPso
    this.defaultContractedHoursSpo = request.defaultContractedHoursSpo
    this.parom = request.parom
    this.paroms_enabled = 1
    this.isT2A = request.isT2A
    const newAdjustments = {}
    if (adjustments) {
      Object.keys(adjustments).forEach(function (key) {
        newAdjustments[key] = adjustments[key]
      })
    }
    this.isValid(newAdjustments)
  }

  isValid (newAdjustments) {
    const errors = ErrorHandler()
    this.isValidCommonPoints(errors)
    if (this.isT2A === 'true') {
      this.initializeStandardPoints()
    }
    this.isValidStandardPoints(errors)
    this.isAdjustmentPointsValid(newAdjustments, errors)
    const validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }

  isValidCommonPoints (errors) {
    FieldValidator(this.cusD0, 'cusD0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusD1, 'cusD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusD2, 'cusD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusD3, 'cusD3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.cusC0, 'cusC0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusC1, 'cusC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusC2, 'cusC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusC3, 'cusC3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.cusB0, 'cusB0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusB1, 'cusB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusB2, 'cusB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusB3, 'cusB3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.cusA0, 'cusA0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusA1, 'cusA1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusA2, 'cusA2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusA3, 'cusA3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.licD0, 'licD0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licD1, 'licD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licD2, 'licD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licD3, 'licD3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.licC0, 'licC0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licC1, 'licC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licC2, 'licC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licC3, 'licC3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.licB0, 'licB0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licB1, 'licB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licB2, 'licB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licB3, 'licB3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.licA0, 'licA0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licA1, 'licA1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licA2, 'licA2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licA3, 'licA3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.commD0, 'commD0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commD1, 'commD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commD2, 'commD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commD3, 'commD3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.commC0, 'commC0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commC1, 'commC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commC2, 'commC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commC3, 'commC3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.commB0, 'commB0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commB1, 'commB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commB2, 'commB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commB3, 'commB3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.commA0, 'commA0', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commA1, 'commA1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commA2, 'commA2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commA3, 'commA3', errors)
      .isRequired()
      .isInt(0, 999)

    FieldValidator(this.weightingOverdue, 'weightingOverdue', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingUpw, 'weightingUpw', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingWarrants, 'weightingWarrants', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.userId, 'userId', errors)
      .isRequired()
    FieldValidator(this.isT2A, 'isT2A', errors)
      .isRequired()
      .isBoolean()
  }

  isValidStandardPoints (errors) {
    FieldValidator(this.sdr, 'sdr', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.sdrConversion, 'sdrConversion', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.nominalTargetPso, 'nominalTargetPso', errors)
      .isRequired()
      .isInt(0, 9999)
    FieldValidator(this.nominalTargetPo, 'nominalTargetPo', errors)
      .isRequired()
      .isInt(0, 9999)
    FieldValidator(this.weightingArmsCommunity, 'weightingArmsCommunity', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingArmsLicense, 'weightingArmsLicense', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.defaultContractedHoursPo, 'defaultContractedHoursPo', errors)
      .isRequired()
      .isInt(0, 37)
    FieldValidator(this.defaultContractedHoursPso, 'defaultContractedHoursPso', errors)
      .isRequired()
      .isInt(0, 37)
    FieldValidator(this.defaultContractedHoursSpo, 'defaultContractedHoursSpo', errors)
      .isRequired()
      .isInt(0, 37)
    FieldValidator(this.parom, 'parom', errors)
      .isRequired()
      .isInt(0, 999)
  }

  initializeStandardPoints () {
    this.sdr = '0'
    this.sdrConversion = '0'
    this.nominalTargetPso = '0'
    this.nominalTargetPo = '0'
    this.weightingArmsCommunity = '0'
    this.weightingArmsLicense = '0'
    this.defaultContractedHoursPo = '0'
    this.defaultContractedHoursPso = '0'
    this.defaultContractedHoursSpo = '0'
    this.parom = '0'
    this.paroms_enabled = '0'
  }

  isAdjustmentPointsValid (newAdjustments, errors) {
    Object.keys(newAdjustments).forEach(function (thisKey) {
      FieldValidator(newAdjustments[thisKey], thisKey, errors)
        .isRequired()
        .isInt(0, 999)
    })
  }
}

module.exports = WorkloadPoints
