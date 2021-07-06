module.exports = function (results, groupBy) {
  const archiveMap = new Map()
  const archiveArray = []

  results.forEach(function (result) {
    if (groupBy === 'offenderManager') {
      archiveMap.set(result.omKey + result.teamCode, [])
    } else {
      archiveMap.set(result.teamCode, [])
    }
  })
  results.forEach(function (result) {
    let key
    if (groupBy === 'offenderManager') {
      key = result.omKey + result.teamCode
    } else {
      key = result.teamCode
    }
    let temporaryMappedItems = []
    temporaryMappedItems = archiveMap.get(key)
    temporaryMappedItems.push(result)
    archiveMap.set(key, temporaryMappedItems)
  })
  for (const value of archiveMap.values()) {
    archiveArray.push(value)
  }
  return archiveArray
}
