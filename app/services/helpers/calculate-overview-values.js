const calculatePercentage = require('./percentage-calculator').calculatePercentage
const totalsRounder = require('./totals-rounder')
const workloadTypes = require('../../constants/workload-type')
const orgUnit = require('../../constants/organisation-unit')

module.exports = function (results, isCSV, workloadType = workloadTypes.PROBATION, orgLevel) {
  let totals
  let crcTotals
  let totalsToReturn
  if (workloadType === workloadTypes.PROBATION) {
    totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
    crcTotals = { name: 'CRC Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
    totalsToReturn = {}
    if (!results.noCaseload) {
      if (results.length !== undefined) {
        results.forEach(function (result) {
          result.remainingPoints = result.availablePoints - result.totalPoints
          result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
          result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.availablePoints)
        })
        totalsToReturn = results
        if (!isCSV) {
          totalsToReturn.forEach(function (val, key) {
            if (orgLevel === orgUnit.NATIONAL.name) {
              if (!val.name.includes('CPA ')) {
                totals.totalPoints += val.totalPoints
                totals.totalAvailablePoints += val.availablePoints
                totals.totalContractedHours += val.contractedHours
                totals.totalReduction += val.reductionHours
                totals.totalTotalCases += val.totalCases
                totals.totalRemainingPoints += val.remainingPoints
                totals.totalCMSPoints += val.cmsAdjustmentPoints
              } else {
                crcTotals.totalPoints += val.totalPoints
                crcTotals.totalAvailablePoints += val.availablePoints
                crcTotals.totalContractedHours += val.contractedHours
                crcTotals.totalReduction += val.reductionHours
                crcTotals.totalTotalCases += val.totalCases
                crcTotals.totalRemainingPoints += val.remainingPoints
                crcTotals.totalCMSPoints += val.cmsAdjustmentPoints
              }
            } else {
              totals.totalPoints += val.totalPoints
              totals.totalAvailablePoints += val.availablePoints
              totals.totalContractedHours += val.contractedHours
              totals.totalReduction += val.reductionHours
              totals.totalTotalCases += val.totalCases
              totals.totalRemainingPoints += val.remainingPoints
              totals.totalCMSPoints += val.cmsAdjustmentPoints
            }
          })
          totals = totalsRounder(totals)
          totals.totalCapacityPercentage = calculatePercentage(totals.totalPoints, totals.totalAvailablePoints)
          totals.totalCMSPercentage = calculatePercentage(totals.totalCMSPoints, totals.totalAvailablePoints)
          totalsToReturn.push(totals)
          if (orgLevel === orgUnit.NATIONAL.name) {
            crcTotals = totalsRounder(crcTotals)
            crcTotals.totalCapacityPercentage = calculatePercentage(crcTotals.totalPoints, crcTotals.totalAvailablePoints)
            crcTotals.totalCMSPercentage = calculatePercentage(crcTotals.totalCMSPoints, crcTotals.totalAvailablePoints)
            totalsToReturn.push(crcTotals)
          }
        }
      } else {
        const capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
        const cmsPercentage = calculatePercentage(results.cmsAdjustmentPoints, results.availablePoints)
        totalsToReturn = Object.assign({}, results, { capacity: capacityPercentage, cmsPercentage: cmsPercentage })
      }
    } else {
      totalsToReturn = Object.assign(results, { availablePoints: 0, totalPoints: 0, cases: 0, cmsAdjustmentPoints: 0, reduction: 0, capacity: 0, cmsPercentage: 0 })
    }
  } else {
    totals = { name: 'Total / Average', totalLicencePoints: 0, totalCustodyPoints: 0, totalTotalCases: 0 }
    totalsToReturn = {}
    if (results.length !== undefined) {
      totalsToReturn = results
      if (!isCSV) {
        totalsToReturn.forEach(function (val, key) {
          totals.totalLicencePoints += val.licencePoints
          totals.totalCustodyPoints += val.custodyPoints
          totals.totalTotalCases += val.totalCases
        })
        totalsToReturn.push(totals)
      }
    }
  }
  return totalsToReturn
}
