const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadConstants = require('../constants/workload-type')
const { SUPER_USER, APPLICATION_SUPPORT, MANAGER } = require('../constants/user-roles')
const canViewDashboardRoles = [SUPER_USER, APPLICATION_SUPPORT, MANAGER]
const canViewExportRoles = [SUPER_USER, APPLICATION_SUPPORT, MANAGER]

module.exports = function (id, organisationalUnitName, currentPath, workloadType = workloadConstants.PROBATION, authorisation, userRole) {
  const baseLink = linkGenerator.fromIdAndNameAndWorkloadType(id, organisationalUnitName, workloadType)
  const navigation = []

  const isOffenderManager = organisationalUnitName === organisationUnitConstants.OFFENDER_MANAGER.name
  const isNational = organisationalUnitName === organisationUnitConstants.NATIONAL.name

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
      } else if (isNational) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('NPS Caseload', baseLink + '/caseload'))
        navigation.push(new Link('CRC Caseload', baseLink + '/crc-caseload'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        if (canViewDashboardRoles.includes(userRole)) {
          navigation.push(new Link('Dashboard', baseLink + '/dashboard'))
        }
      } else {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('Caseload', baseLink + '/caseload'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        if (canViewExportRoles.includes(userRole)) {
          navigation.push(new Link('Export', baseLink + '/export'))
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
