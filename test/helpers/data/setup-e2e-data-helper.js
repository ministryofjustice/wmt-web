const setupAllDataFs = require('./setup-all-data-fs')
const http = require('http')

setupAllDataFs().then(function () {
  console.log('setup all data')

  const req = http.request('http://localhost:3000/refresh', res => {
    console.log(`statusCode: ${res.statusCode}`)
    process.exit(0)
  })

  req.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  req.end()
})
