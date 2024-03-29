const dateFormatter = require('../date-formatter')
const CapacityDateRange = require('../domain/capacity-date-range')

module.exports.createCapacityDateRange = function (dateParameters) {
  let capacityDateRange

  if (Object.keys(dateParameters).length === 0) {
    const fromDate = dateFormatter.now().subtract(1, 'years')
    const toDate = dateFormatter.now()

    capacityDateRange = new CapacityDateRange(
      fromDate.date(),
      fromDate.month() + 1,
      fromDate.year(),
      toDate.date(),
      toDate.month() + 1,
      toDate.year()
    )
  } else {
    capacityDateRange = new CapacityDateRange(
      dateParameters['capacity-from-day'],
      dateParameters['capacity-from-month'],
      dateParameters['capacity-from-year'],
      dateParameters['capacity-to-day'],
      dateParameters['capacity-to-month'],
      dateParameters['capacity-to-year']
    )
  }
  return capacityDateRange
}
