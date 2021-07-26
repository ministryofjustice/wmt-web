const capacityCalculation = require('./capacity-calculation')

module.exports = function (result) {
  result.capacity = '0%'
  result.cmsColumn = '0 - 0%'
  result.cmsPercentage = '0%'
  result.gsColumn = '0 - 0%'
  result.gsPercentage = '0%'

  if (result.availablePoints) {
    if (result.availablePoints !== 0) {
      result.capacity = capacityCalculation(result.totalPoints, result.availablePoints)
      if (result.cmsPoints) {
        result.cmsPercentage = capacityCalculation(result.cmsPoints, result.availablePoints)
        result.cmsColumn = result.cmsPoints + ' - ' + result.cmsPercentage
      } else {
        result.cmsPoints = 0
      }
    }
  } else {
    result.availablePoints = 0
  }

  if (result.totalPoints) {
    if (result.totalPoints !== 0) {
      if (result.gsPoints) {
        result.gsPercentage = capacityCalculation(result.gsPoints, result.totalPoints)
        result.gsColumn = result.gsPoints + ' - ' + result.gsPercentage
      } else {
        result.gsPoints = 0
      }
    }
  } else {
    result.totalPoints = 0
  }
  return result
}
