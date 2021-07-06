module.exports = function (results) {
  results.forEach(function (result) {
    result.hoursReduced = Number(parseFloat(result.hoursReduced).toFixed(1))
  })
  return results
}
