module.exports = function (body, multiSearchField) {
  const stringifiedBody = Object.assign({}, body)
  stringifiedBody['multi-search-field'] = multiSearchField
  return JSON.stringify(stringifiedBody)
}
