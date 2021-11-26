const ValidationError = require('../errors/validation-error')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')
const ERROR_MESSAGES = require('../validators/validation-error-messages')
const moment = require('moment')

class ArchiveDataForm {
  constructor (fromDay, fromMonth, fromYear, toDay, toMonth, toYear, multiSearchField, isReduction = false) {
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

    this.multiSearchField = multiSearchField

    this.isValid(isReduction)
  }

  isValid (isReduction) {
    const multiSearchFieldErrorMessage = isReduction ? ERROR_MESSAGES.getMultiSearchFieldIsRequiredMessageReduction : ERROR_MESSAGES.getMultiSearchFieldIsRequiredMessage
    const errors = ErrorHandler()

    this.archiveFromDate = FieldSetValidator(this.fromFields, 'archiveFromDate', errors)
      .isRequired()
      .isValidDate()
      .isPastDate()
      .isLaterThan(moment().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years'), 'maxArchiveHistory')
      .getFormattedDate()

    this.archiveToDate = FieldSetValidator(this.toFields, 'archiveToDate', errors)
      .isRequired()
      .isValidDate(this.archiveToDate)
      .isPastOrPresentDate(this.archiveToDate)
      .isLaterThan(this.archiveFromDate, 'archiveFromDate')
      .getFormattedDate()
      .add(1, 'days')

    FieldSetValidator(this.multiSearchField, 'multiSearchField', errors)
      .isArray(multiSearchFieldErrorMessage)

    const validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = ArchiveDataForm
