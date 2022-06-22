const ValidationError = require('../errors/validation-error')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')

class CapacityDateRange {
  constructor (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
    this.fromFields = [
      fromDay,
      fromMonth,
      fromYear
    ]

    this.toFields = [
      toDay,
      toMonth,
      toYear
    ]

    this.isValid()
  }

  isValid () {
    const errors = ErrorHandler()

    this.capacityFromDate = FieldSetValidator(this.fromFields, 'capacityFromDate', errors)
      .isRequired()
      .isValidDate()
      .isPastDate()
      .getFormattedDate()

    this.capacityToDate = FieldSetValidator(this.toFields, 'capacityToDate', errors)
      .isRequired()
      .isValidDate(this.capacityToDate)
      .isPastOrPresentDate(this.capacityToDate)
      .isLaterThan(this.capacityFromDate, 'capacityFromDate')
      .getFormattedDate()

    const validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = CapacityDateRange
