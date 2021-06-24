const moment = require('moment')
const percentageCalculator = require('../helpers/percentage-calculator')

module.exports = function (results, searchStartDate, searchEndDate, groupBy, interval) {
  var archiveMap = new Map()
  var archiveArray = []
  if (interval === 'weekly') {
    interval = 7
  } else {
    interval = 28
  }
  results.forEach(function (result) {
    if (groupBy === 'offenderManager') {
      archiveMap.set(result['omKey'] + result['teamCode'], [])
    } else {
      archiveMap.set(result['teamCode'], [])
    }
  })
  results.forEach(function (result) {
    let key
    if (groupBy === 'offenderManager') {
      key = result['omKey'] + result['teamCode']
    } else {
      key = result['teamCode']
    }
    var temporaryMappedItems = []
    temporaryMappedItems = archiveMap.get(key)
    temporaryMappedItems.push(result)
    archiveMap.set(key, temporaryMappedItems)
  })
  for (var value of archiveMap.values()) {
    archiveArray.push(value)
  }

  var groupedData = []
  // for each 7 days
  archiveArray.forEach(function (offenderManager) {
    // setup date variables after every new offender manager
    var startDate = searchStartDate
    var endDate = searchEndDate
    // var startDate = searchStartDate.clone().startOf('week').add(1, 'days')
    // if (!searchEndDate.isSame(searchStartDate.clone().startOf('week').add(1, 'days'))) {
    //   var endDate = searchEndDate.clone().endOf('week').add(1, 'days').startOf('week').add(1, 'days')
    // }
    var currentStartingDate = startDate.clone()
    var currentEndingDate = startDate.clone().add(interval - 1, 'days')
    let omName
    let grade
    if (groupBy === 'offenderManager') {
      omName = offenderManager[0].omName
      grade = offenderManager[0].grade
    } else {
      omName = 'N/A'
      grade = 'N/A'
    }
    var omDetails = {
      regionName: offenderManager[0].regionName,
      lduName: offenderManager[0].lduName,
      teamName: offenderManager[0].teamName,
      omName: omName,
      grade: grade
    }
    // 
    while (currentStartingDate.isSameOrBefore(endDate)) {
      var totals = initialiseTotals(currentStartingDate, currentEndingDate)
      totals = Object.assign(totals, omDetails)
      var daysWithData = 0

      // for each daily record of an offender manager
      offenderManager.forEach(function (day) {
        if (moment(day.workloadDate, 'DD-MM-YYYY').isBetween(currentStartingDate, currentEndingDate, null, '[)')) {
          daysWithData = daysWithData + 1
          totals = addTotals(totals, day)
        }
      })

      var average
      if (daysWithData > 0) {
        const totalsForDebugging = Object.assign({}, totals)
        average = averageTotals(totals, daysWithData)
        average.totalsForDebugging = totalsForDebugging
      } else {
        average = totals
      }
      average.daysWithData = daysWithData
      groupedData.push(average)

      // increment current period by 1 week
      currentStartingDate = currentStartingDate.clone().add(interval, 'days')
      currentEndingDate = currentEndingDate.clone().add(interval, 'days')
    }
  })
  return groupedData
}

var addTotals = function (totals, record) {
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

var averageTotals = function (totals, daysWithData) {
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

var initialiseTotals = function (startDate, endDate) {
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
    gsPercentage : '0.00%'
  }
}

var divideNumbers = function (dividend, divisor) {
  var result = 0
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

var addNumber = function (number1, number2) {
  if (number1 === undefined || number1 === null || number1 === 'N/A') {
    number1 = 0
  }
  if (number2 === undefined || number2 === null || number2 === 'N/A') {
    number2 = 0
  }
  return number1 + number2
}
