const validator = require('validator')
const ERROR_MESSAGES = require('./validation-error-messages')

class FieldValidator {
  /**
   * Build a validator for validating fields.
   * @param data A single element to validate.
   * @param fieldName The name of of the HTML element to link the error message to.
   * @param errors An instance of the ErrorHandler class.
   */
  constructor (data, fieldName, errors) {
    this.data = data
    this.fieldName = fieldName
    this.errors = errors
  }

  isRequired (specificMessage) {
    const message = (!specificMessage) ? ERROR_MESSAGES.getIsRequiredMessage : specificMessage
    if (!this.data) {
      this.errors.add(this.fieldName, message)
    }

    return this
  }

  isLessThanLength (length, specificMessage) {
    const message = (!specificMessage) ? ERROR_MESSAGES.getIsLessThanLengthMessage : specificMessage
    if (this.data && !validator.isLength(this.data, { max: length })) {
      this.errors.add(this.fieldName, message, { length })
    }
    return this
  }

  isLessThanOrEqualTo (value, specificMessage) {
    const message = (!specificMessage) ? ERROR_MESSAGES.getAllowancePercentageLessThanMaximum : specificMessage
    if (value) {
      if (this.data) {
        if (parseFloat(this.data) > parseFloat(value)) {
          this.errors.add(this.fieldName, message)
        }
      }
    }
    return this
  }

  isInt (min, max) {
    const options = { allow_leading_zeroes: false, min, max }
    if (this.data && !validator.isInt(this.data.toString(), options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsIntegerMessage, options)
    }
    return this
  }

  isFloat (min, max) {
    const options = { min, max }
    if (this.data && !validator.isFloat(this.data, options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsFloatMessage, options)
    }
    return this
  }

  isValidUsername (username) {
    if (!username || !validator.isEmail(username)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsValidUsernameMessage)
    }
    return this
  }

  isBoolean () {
    if (this.data && !validator.isBoolean(this.data.toString())) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsBooleanMessage)
    }
    return this
  }
}

module.exports = function (data, fieldName, errors) {
  return new FieldValidator(data, fieldName, errors)
}
