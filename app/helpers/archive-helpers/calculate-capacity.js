const capacityCalculation = require('./capacity-calculation')
const calculateAcquiredPoints = require('./calculate-acquired-points')
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours

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
