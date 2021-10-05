const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

function exportToMap (fileName) {
  return new Promise((resolve, reject) => {
    const map = new Map()

    fs.createReadStream(path.resolve(__dirname, fileName))
      .pipe(csv({
        mapHeaders: ({ header, index }) => header.toLowerCase().replace(/ /gi, '_')
      }))
      .on('data', (data) => map.set(`${data.team_name}:${data.offender_manager}`, data))
      .on('end', () => {
        resolve(map)
      })
  })
}

function shallowEqual (object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }
  return true
}

const replatformResults = exportToMap('BETA-HMPPS_Overview.csv')
const liveResults = exportToMap('HMPPS_Overview.csv')

replatformResults.then(function (replatformResult) {
  return liveResults.then(function (liveResult) {
    let count = 0
    liveResult.forEach((value, key) => {
      const replatformEntry = replatformResult.get(key)
      if (!shallowEqual(value, replatformEntry)) {
        console.log(`difference with: ${key} \n in live: \n ${JSON.stringify(value)} \n in replatform: \n ${JSON.stringify(replatformEntry)}`)
        count++
      }
    })
    console.log(`number of differences: ${count}`)
  })
})
