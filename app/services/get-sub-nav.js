const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadConstants = require('../constants/workload-type')

module.exports = function (id, organisationalUnitName, currentPath, workloadType = workloadConstants.PROBATION, authorisation, userRole) {
  const baseLink = linkGenerator.fromIdAndNameAndWorkloadType(id, organisationalUnitName, workloadType)
  const navigation = []

  const isOffenderManager = organisationalUnitName === organisationUnitConstants.OFFENDER_MANAGER.name
  const isNational = organisationalUnitName === organisationUnitConstants.NATIONAL.name
  const isRegion = organisationalUnitName === organisationUnitConstants.REGION.name
  const isLDU = organisationalUnitName === organisationUnitConstants.LDU.name
  const isTeam = organisationalUnitName === organisationUnitConstants.TEAM.name

  switch (workloadType) {
    case workloadConstants.COURT_REPORTS:
      if (isOffenderManager) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
        navigation.push(new Link('Reductions', baseLink + '/reductions'))
      } else {
        navigation.push(new Link('Court Reports Overview', baseLink + '/overview'))
      }
      break

    case workloadConstants.PROBATION:
      if (isOffenderManager) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        navigation.push(new Link('Reductions', baseLink + '/reductions'))
      } else if (isRegion || isLDU || isTeam) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('Caseload', baseLink + '/caseload'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        navigation.push(new Link('Export', baseLink + '/export'))
      } else if (isNational) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('NPS Caseload', baseLink + '/caseload'))
        navigation.push(new Link('CRC Caseload', baseLink + '/crc-caseload'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        if (authorisation === false || userRole === 'Data Admin' || userRole === 'System Admin' || userRole === 'Manager') {
          navigation.push(new Link('Dashboard', baseLink + '/dashboard'))
        }
      }
      break
    case workloadConstants.OMIC:
      navigation.push(new Link('OMIC Overview', baseLink + '/overview'))
      // navigation.push(new Link('OMIC Caseload', baseLink + '/caseload'))
      if (organisationalUnitName !== organisationUnitConstants.NATIONAL.name) {
        navigation.push(new Link('Export', baseLink + '/export'))
      }
      break
  }

  navigation[0].active = true

  navigation.forEach(function (item) {
    if (item.link === currentPath) {
      navigation[0].active = false
      item.active = true
    }
  })

  return navigation
}
