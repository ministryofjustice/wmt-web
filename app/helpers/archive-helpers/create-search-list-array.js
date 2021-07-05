const heDecode = require('he')

module.exports = function (list) {
  if (list) {
    if (typeof list === 'string') {
      list = [heDecode.decode(list)]
    } else {
      list.forEach(function (item) {
        item = heDecode.decode(item)
      })
    }
  } else {
    list = null
  }
  return list
}
