const path = require('path')
const fs = require('fs')

const setupAllDataFs = require('../helpers/data/setup-all-data-fs')

const pallyCiFile = path.resolve(__dirname, '../../.pa11yci')
const host = 'http://localhost:3000'

const extractInserts = function (inserts) {
  return {
    offenderManagerId: inserts.find((item) => item.table === 'workload_owner').id,
    teamId: inserts.find((item) => item.table === 'team').id,
    lduId: inserts.find((item) => item.table === 'ldu').id,
    regionId: inserts.find((item) => item.table === 'region').id
  }
}

const generateLoginActionConfig = function (url, additionalFields = {}) {
  return {
    url,
    actions: [
      'set field #username to WMT_SUPER_USER',
      'set field #password to password123456',
      'click element #submit'
    ],
    ...additionalFields
  }
}

const pa11yJson = { defaults: { timeout: 5000, concurrency: 1 } }

const courtReportsBase = `${host}/court-reports`
const probationBase = `${host}/probation`

const offenderManager = 'offender-manager'
const team = 'team'
const ldu = 'ldu'
const region = 'region'
const national = 'hmpps/0'

const urls = [generateLoginActionConfig(host)]

setupAllDataFs().then(function (result) {
  const extractedCourtReports = extractInserts(result.courtReportInserts)
  const extractedWorkload = extractInserts(result.workloadInserts)
  const capacityUrl = 'caseload-capacity'
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${capacityUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${team}/${extractedWorkload.teamId}/${capacityUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${capacityUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${region}/${extractedWorkload.regionId}/${capacityUrl}`))

  const caseProgressUrl = 'case-progress'
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${caseProgressUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${team}/${extractedWorkload.teamId}/${caseProgressUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${caseProgressUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${region}/${extractedWorkload.regionId}/${caseProgressUrl}`))

  const overviewUrl = 'overview'
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${team}/${extractedWorkload.teamId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${region}/${extractedWorkload.regionId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${national}/${overviewUrl}`))

  urls.push(generateLoginActionConfig(`${courtReportsBase}/${team}/${extractedCourtReports.teamId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${courtReportsBase}/${ldu}/${extractedCourtReports.lduId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${courtReportsBase}/${region}/${extractedCourtReports.regionId}/${overviewUrl}`))
  urls.push(generateLoginActionConfig(`${courtReportsBase}/${national}/${overviewUrl}`))

  const caseloadUrl = 'caseload'
  urls.push(generateLoginActionConfig(`${probationBase}/${team}/${extractedWorkload.teamId}/${caseloadUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${ldu}/${extractedWorkload.lduId}/${caseloadUrl}`, { screenCapture: 'test/accessibility/screenShots/ldu-caseload.png' }))
  urls.push(generateLoginActionConfig(`${probationBase}/${region}/${extractedWorkload.regionId}/${caseloadUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${national}/${caseloadUrl}`))

  const contractedHoursUrl = 'contracted-hours'
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${contractedHoursUrl}`))

  const reductionsUrl = 'reductions'
  const addReductionsUrl = 'add-reduction'
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${reductionsUrl}`))
  urls.push(generateLoginActionConfig(`${probationBase}/${offenderManager}/${extractedWorkload.offenderManagerId}/${addReductionsUrl}`))

  const admin = 'admin'
  urls.push(generateLoginActionConfig(`${host}/${admin}/workload-points`))
  urls.push(generateLoginActionConfig(`${host}/${admin}/user`))
  urls.push(generateLoginActionConfig(`${host}/${admin}/user-rights`))
  pa11yJson.urls = urls

  try {
    fs.writeFileSync(pallyCiFile, JSON.stringify(pa11yJson))
  } catch (err) {
    console.error(err)
  }

  console.log('pa11y ci file updated')
})
