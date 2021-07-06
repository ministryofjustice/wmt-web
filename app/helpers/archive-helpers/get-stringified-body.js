module.exports = function (body, multiSearchField) {
  let stringifiedBody = Object.assign({}, body)
  stringifiedBody['multi-search-field'] = multiSearchField
  delete stringifiedBody.rawQuery
  stringifiedBody = JSON.stringify(stringifiedBody)
  return stringifiedBody
}
