const FIELD_NAMES = require('./validation-field-names')

class ErrorHandler {
  constructor () {
    this.errors = {}
  }

  add (fieldName, message, options) {
    if (!Object.prototype.hasOwnProperty.call(this.errors, fieldName)) {
      this.errors[fieldName] = []
    }
    if (options !== undefined && options.secondaryFieldName !== undefined) {
      options.secondaryDisplayName = FIELD_NAMES[options.secondaryFieldName]
    }
    this.errors[fieldName].push(message(FIELD_NAMES[fieldName], options))
  }

  get () {
    const errorList = []
    for (const [key, value] of Object.entries(this.errors)) {
      if (value.length > 0) {
        errorList.push({
          href: `#${key}`,
          text: value[0]
        })
      }
    }
    return errorList.length > 0 ? errorList : false
  }
}

module.exports = function () {
  return new ErrorHandler()
}
