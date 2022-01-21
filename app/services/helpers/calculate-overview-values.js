const calculatePercentage = require('./percentage-calculator').calculatePercentage
const totalsRounder = require('./totals-rounder')

module.exports = function (results, isCSV) {
  let totals = { totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
  const totalsToReturn = { rows: [], totals }

  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
      result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.availablePoints)
    })
    totalsToReturn.rows = results
    if (!isCSV) {
      totalsToReturn.rows.forEach(function (val, key) {
        totals.totalPoints += val.totalPoints
        totals.totalAvailablePoints += val.availablePoints
        totals.totalContractedHours += val.contractedHours
        totals.totalReduction += val.reductionHours
        totals.totalTotalCases += val.totalCases
        totals.totalRemainingPoints += val.remainingPoints
        totals.totalCMSPoints += val.cmsAdjustmentPoints
      })
      totals = totalsRounder(totals)
      totals.totalCapacityPercentage = calculatePercentage(totals.totalPoints, totals.totalAvailablePoints)
      totals.totalCMSPercentage = calculatePercentage(totals.totalCMSPoints, totals.totalAvailablePoints)
    }
  }

  return totalsToReturn
}

module.exports.calculateOmicOverview = function (results) {
  const totals = { totalLicencePoints: 0, totalCustodyPoints: 0, totalTotalCases: 0 }
  const totalsToReturn = { rows: [], totals }
  if (results.length !== undefined) {
    totalsToReturn.rows = results
    totalsToReturn.rows.forEach(function (val, key) {
      totals.totalLicencePoints += val.licencePoints
      totals.totalCustodyPoints += val.custodyPoints
      totals.totalTotalCases += val.totalCases
    })
  }
  return totalsToReturn
}
