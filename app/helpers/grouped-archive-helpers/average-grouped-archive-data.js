const moment = require('moment')
const percentageCalculator = require('../../services/helpers/percentage-calculator')

module.exports = function (archiveArray, searchStartDate, searchEndDate, groupBy, interval) {
  const groupedData = []

  archiveArray.forEach(function (group) {
    // setup date variables after every new group
    const startDate = searchStartDate
    const endDate = searchEndDate
    let currentStartingDate = startDate.clone()
    let currentEndingDate = startDate.clone().add(interval - 1, 'days')
    let omName
    let grade
    if (groupBy === 'offenderManager') {
      omName = group[0].omName
      grade = group[0].grade
    } else {
      omName = 'N/A'
      grade = 'N/A'
    }
    const omDetails = {
      regionName: group[0].regionName,
      lduName: group[0].lduName,
      teamName: group[0].teamName,
      omName: omName,
      grade: grade
    }
    //
    while (currentStartingDate.isSameOrBefore(endDate)) {
      let totals = initialiseTotals(currentStartingDate, currentEndingDate)
      totals = Object.assign(totals, omDetails)
      let daysWithData = 0
      const workloadReportSet = new Set()

      // for each daily record of a group
      group.forEach(function (day) {
        if (moment(day.workloadDate).isBetween(currentStartingDate, currentEndingDate, null, '[)')) {
          daysWithData = daysWithData + 1
          workloadReportSet.add(day.workloadReportId)
          totals = addTotals(totals, day)
        }
      })

      let average

      switch (groupBy) {
        case 'offenderManager':
          if (daysWithData > 0) {
            average = averageTotals(totals, daysWithData)
          } else {
            average = totals
          }
          average.daysWithData = daysWithData
          break
        case 'team':
          if (workloadReportSet.size > 0) {
            average = averageTotals(totals, workloadReportSet.size)
          } else {
            average = totals
          }
          average.daysWithData = workloadReportSet.size
          break
      }
      groupedData.push(average)

      // increment current period by 1 week
      currentStartingDate = currentStartingDate.clone().add(interval, 'days')
      currentEndingDate = currentEndingDate.clone().add(interval, 'days')
    }
  })
  return groupedData
}

const addTotals = function (totals, record) {
  totals.totalCases = addNumber(totals.totalCases, record.totalCases)
  totals.totalPoints = addNumber(totals.totalPoints, record.totalPoints)
  totals.availablePoints = addNumber(totals.availablePoints, record.availablePoints)
  totals.contractedHours = addNumber(totals.contractedHours, record.contractedHours)
  totals.hoursReduction = addNumber(totals.hoursReduction, record.hoursReduction)
  totals.cmsPoints = addNumber(totals.cmsPoints, record.cmsPoints)
  totals.gsPoints = addNumber(totals.gsPoints, record.gsPoints)
  totals.armsTotalCases = addNumber(totals.armsTotalCases, record.armsTotalCases)
  totals.paromsPoints = addNumber(totals.paromsPoints, record.paromsPoints)
  totals.sdrPoints = addNumber(totals.sdrPoints, record.sdrPoints)
  totals.sdrConversionPoints = addNumber(totals.sdrConversionPoints, record.sdrConversionPoints)
  totals.nominalTarget = addNumber(totals.nominalTarget, record.nominalTarget)

  return totals
}

const averageTotals = function (totals, daysWithData) {
  totals.totalCases = Math.round(divideNumbers(totals.totalCases, daysWithData))
  totals.totalPoints = Math.round(divideNumbers(totals.totalPoints, daysWithData))
  totals.availablePoints = Math.round(divideNumbers(totals.availablePoints, daysWithData))
  totals.contractedHours = divideNumbers(totals.contractedHours, daysWithData).toFixed(1)
  totals.hoursReduction = divideNumbers(totals.hoursReduction, daysWithData).toFixed(1)
  totals.cmsPoints = Math.round(divideNumbers(totals.cmsPoints, daysWithData))
  totals.gsPoints = Math.round(divideNumbers(totals.gsPoints, daysWithData))
  totals.armsTotalCases = Math.round(divideNumbers(totals.armsTotalCases, daysWithData))
  totals.paromsPoints = Math.round(divideNumbers(totals.paromsPoints, daysWithData))
  totals.sdrPoints = Math.round(divideNumbers(totals.sdrPoints, daysWithData))
  totals.sdrConversionPoints = Math.round(divideNumbers(totals.sdrConversionPoints, daysWithData))
  totals.nominalTarget = Math.round(divideNumbers(totals.nominalTarget, daysWithData))
  totals.capacity = Number(percentageCalculator.calculatePercentage(totals.totalPoints, totals.availablePoints)).toFixed(1) + '%'
  totals.cmsPercentage = Number(percentageCalculator.calculatePercentage(totals.cmsPoints, totals.availablePoints)).toFixed(1) + '%'
  totals.gsPercentage = Number(percentageCalculator.calculatePercentage(totals.gsPoints, totals.totalPoints)).toFixed(1) + '%'

  return totals
}

const initialiseTotals = function (startDate, endDate) {
  return {
    startDate: startDate.format('DD-MM-YYYY'),
    endDate: endDate.format('DD-MM-YYYY'),
    totalCases: 0,
    totalPoints: 0,
    availablePoints: 0,
    contractedHours: 0,
    hoursReduction: 0,
    cmsPoints: 0,
    gsPoints: 0,
    armsTotalCases: 0,
    paromsPoints: 0,
    sdrPoints: 0,
    sdrConversionPoints: 0,
    nominalTarget: 0,
    capacity: '0.00%',
    cmsPercentage: '0.00%',
    gsPercentage: '0.00%'
  }
}

const divideNumbers = function (dividend, divisor) {
  let result = 0
  if (dividend === undefined || dividend === null) {
    dividend = 0
  }
  if (divisor === undefined || divisor === null) {
    divisor = 0
  }
  if (divisor !== 0) {
    result = dividend / divisor
  }
  return result
}

const addNumber = function (number1, number2) {
  if (number1 === undefined || number1 === null || number1 === 'N/A') {
    number1 = 0
  }
  if (number2 === undefined || number2 === null || number2 === 'N/A') {
    number2 = 0
  }
  return number1 + number2
}
