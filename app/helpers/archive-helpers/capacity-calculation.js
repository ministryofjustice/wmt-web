module.exports = function (thisTotalPoints, thisAvailablePoints) {
  return Number(parseFloat((thisTotalPoints / thisAvailablePoints) * 100).toFixed(1)) + '%'
}
