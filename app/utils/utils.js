const properCase = (word) =>
  word.length >= 1 ? word[0].toUpperCase() + word.toLowerCase().slice(1) : word

const isBlank = (str) => !str || /^\s*$/.test(str)

/**
 * Converts a name (first name, last name, middle name, etc.) to proper case equivalent, handling double-barreled names
 * correctly (i.e. each part in a double-barreled is converted to proper case).
 * @param name name to be converted.
 * @returns name converted to proper case.
 */
const properCaseName = (name) => (isBlank(name) ? '' : name.split('-').map(properCase).join('-'))

module.exports.convertToTitleCase = function (sentence) {
  return isBlank(sentence) ? '' : sentence.split(' ').map(properCaseName).join(' ')
}

module.exports.initialiseName = (fullName) => {
// this check is for the authError page
  if (!fullName) return null

  const array = fullName.split(' ')
  return `${array[0][0]}. ${array.reverse()[0]}`
}
