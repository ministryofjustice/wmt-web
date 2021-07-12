const path = require('path')
const fs = require('fs')
const http = require('http')

const setupAllDataFs = require('../helpers/data/setup-all-data-fs')

const pallyCiFile = path.resolve(__dirname, '../../.pa11yci')

const extractInserts = function (inserts) {
  return {
    offenderManagerId: inserts.find((item) => item.table === 'workload_owner').id,
    teamId: inserts.find((item) => item.table === 'team').id,
    lduId: inserts.find((item) => item.table === 'ldu').id,
    regionId: inserts.find((item) => item.table === 'region').id
  }
}

try {
  const data = fs.readFileSync(pallyCiFile, 'utf8')

  const pa11yJson = JSON.parse(data)
  const host = 'http://localhost:3000'

  const courtReportsBase = `${host}/court-reports`
  const probationBase = `${host}/probation`

  const offenderManager = 'offender-manager'
  const team = 'team'
  const ldu = 'ldu'
  const region = 'region'
  const national = 'hmpps/0'

  const urls = [host]

  setupAllDataFs().then(function (result) {
    const extractedCourtReports = extractInserts(result.courtReportInserts)
    const extractedWorkload = extractInserts(result.workloadInserts)
    const capacityUrl = 'caseload-capacity'
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${capacityUrl}`)
    urls.push(`${probationBase}/${team}/${extractedWorkload.teamId}/${capacityUrl}`)
    urls.push(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${capacityUrl}`)
    urls.push(`${probationBase}/${region}/${extractedWorkload.regionId}/${capacityUrl}`)

    const caseProgressUrl = 'case-progress'
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${caseProgressUrl}`)
    urls.push(`${probationBase}/${team}/${extractedWorkload.teamId}/${caseProgressUrl}`)
    urls.push(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${caseProgressUrl}`)
    urls.push(`${probationBase}/${region}/${extractedWorkload.regionId}/${caseProgressUrl}`)

    const overviewUrl = 'overview'
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${overviewUrl}`)
    urls.push(`${probationBase}/${team}/${extractedWorkload.teamId}/${overviewUrl}`)
    urls.push(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${overviewUrl}`)
    urls.push(`${probationBase}/${region}/${extractedWorkload.regionId}/${overviewUrl}`)
    urls.push(`${probationBase}/${national}/${overviewUrl}`)

    urls.push(`${courtReportsBase}/${offenderManager}/${extractedCourtReports.offenderManagerId}/${overviewUrl}`)
    urls.push(`${courtReportsBase}/${team}/${extractedCourtReports.teamId}/${overviewUrl}`)
    urls.push(`${courtReportsBase}/${ldu}/${extractedCourtReports.lduId}/${overviewUrl}`)
    urls.push(`${courtReportsBase}/${region}/${extractedCourtReports.regionId}/${overviewUrl}`)
    urls.push(`${courtReportsBase}/${national}/${overviewUrl}`)

    const caseloadUrl = 'caseload'
    urls.push(`${probationBase}/${team}/${extractedWorkload.teamId}/${caseloadUrl}`)
    urls.push(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${caseloadUrl}`)
    urls.push(`${probationBase}/${region}/${extractedWorkload.regionId}/${caseloadUrl}`)
    urls.push(`${probationBase}/${national}/${caseloadUrl}`)

    const contractedHoursUrl = 'contracted-hours'
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${contractedHoursUrl}`)

    const reductionsUrl = 'reductions'
    const addReductionsUrl = 'add-reduction'
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${reductionsUrl}`)
    urls.push(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${addReductionsUrl}`)
    urls.push(`${courtReportsBase}/${offenderManager}/${extractedCourtReports.offenderManagerId}/${reductionsUrl}`)
    urls.push(`${courtReportsBase}/${offenderManager}/${extractedCourtReports.offenderManagerId}/${addReductionsUrl}`)

    const admin = 'admin'
    urls.push(`${host}/${admin}/workload-points`)
    urls.push(`${host}/${admin}/user`)
    urls.push(`${host}/${admin}/user-rights`)
    pa11yJson.urls = urls

    try {
      fs.writeFileSync(pallyCiFile, JSON.stringify(pa11yJson))
    } catch (err) {
      console.error(err)
    }

    console.log('pa11y ci file updated')

    const req = http.request(`${host}/refresh`, res => {
      console.log(`statusCode: ${res.statusCode}`)
      process.exit(0)
    })

    req.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })

    req.end()
  })
} catch (err) {
  console.error(err)
}
