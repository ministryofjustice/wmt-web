const capacityCalculation = require('./capacity-calculation')
const calculateAcquiredPoints = require('./calculate-acquired-points')

const DefaultContractedHours = require('./domain/default-contracted-hours')
const OM_TYPE_IDS = require('./constants/offender-manager-type-ids')
const ResultHours = require('./domain/result-hours')

const getHours = function (contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId) {
  let baseHours = 0
  if (!(defaultContractedHours instanceof DefaultContractedHours)) {
    throw new Error('defaultContractedHours should be an instance of DefaultContractedHours')
  }

  const PSO_BANDS = [OM_TYPE_IDS.PSO, OM_TYPE_IDS.PSO_B]

  if (offenderManagerTypeId !== OM_TYPE_IDS.UNSUPPORTED) {
    let defaultContractedHoursForBand = 0

    if (PSO_BANDS.indexOf(offenderManagerTypeId) >= 0) {
      defaultContractedHoursForBand = defaultContractedHours.pso
    } else if (offenderManagerTypeId === OM_TYPE_IDS.SPO) {
      defaultContractedHoursForBand = defaultContractedHours.spo
    } else {
      defaultContractedHoursForBand = defaultContractedHours.po
    }

    baseHours = typeof contractedHoursPerWeek !== 'number' ? defaultContractedHoursForBand : contractedHoursPerWeek

    return new ResultHours(baseHours, defaultContractedHoursForBand)
  }
  return null
}

const calculatePoints = function (nominalTarget, baseHours, hoursReduction, defaultContractedHoursForBand) {
  return (nominalTarget * (baseHours / defaultContractedHoursForBand)) * ((baseHours - hoursReduction) / baseHours)
}

const calculateAvailablePoints = function (nominalTarget, offenderManagerTypeId, contractedHoursPerWeek,
  hoursReduction, defaultContractedHours) {
  let availablePoints = 0
  const resultHours = getHours(contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId)
  if (resultHours !== null && resultHours.baseHours !== 0 && resultHours.defaultContractedHoursForBand !== 0) {
    availablePoints = calculatePoints(nominalTarget, resultHours.baseHours, hoursReduction, resultHours.defaultContractedHoursForBand)
  }
  return parseInt(availablePoints, 10)
}

module.exports = function (results) {
  results.forEach(function (result) {
    if (result.contractedHours === 0 || result.contractedHours === null) {
      result.capacity = '0%'
      const defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      const availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      const acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.totalPoints = acquiredPoints
      result.availablePoints = availablePoints
    } else {
      const defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      const availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      const acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.totalPoints = acquiredPoints
      result.availablePoints = availablePoints
      if (availablePoints !== 0) {
        result.capacity = capacityCalculation(acquiredPoints, availablePoints)
      } else {
        result.capacity = '0%'
      }
      result.hoursReduction = Number(parseFloat(result.hoursReduction).toFixed(1))
    }
  })
  return results
}
