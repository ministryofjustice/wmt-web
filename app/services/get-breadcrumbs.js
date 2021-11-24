const Link = require('./domain/link')
const workloadTypeConstant = require('../constants/workload-type')
const getRegionById = require('./data/get-region-by-id')
const getLduById = require('./data/get-ldu-by-id')
const getTeamById = require('./data/get-team-by-id')
const getWorkloadOwnerOffenderManagerByWorkloadOwnerId = require('./data/get-workload-owner-offender-manager-by-workload-owner-id')
const NotFound = require('./errors/notfound-error')

module.exports = function (id, organisationLevel, workloadType = workloadTypeConstant.PROBATION) {
  if (organisationLevel === undefined) {
    throw new TypeError('Organisation level is undefined')
  }

  const breadcrumbFunction = getBreadcrumbLevels()[organisationLevel]
  return breadcrumbFunction(id, workloadType)
}

const getBreadcrumbLevels = function () {
  return {
    hmpps: getNationalBreadcrumb,
    region: getRegionalBreadcrumb,
    ldu: getLduBreadcrumb,
    team: getTeamBreadcrumb,
    'offender-manager': getOffenderManagerBreadcrumb
  }
}

const getOffenderManagerBreadcrumb = function (id, workloadType) {
  return getWorkloadOwnerOffenderManagerByWorkloadOwnerId(id).then(function (offenderManager) {
    const breadcrumbs = [new Link(`${offenderManager.offender_manager_forename} ${offenderManager.offender_manager_surname}`, `/${workloadType}/offender-manager/${id}`)]
    return getTeamBreadcrumb(offenderManager.team_id, workloadType).then(function (teamBreadcrumbs) {
      return breadcrumbs.concat(teamBreadcrumbs)
    })
  }).catch(function () {
    throw new NotFound(`Offender Manager not found at id ${id}`)
  })
}

const getTeamBreadcrumb = function (id, workloadType) {
  return getTeamById(id).then(function (team) {
    const breadcrumbs = [new Link(team.description, `/${workloadType}/team/${id}`)]
    return getLduBreadcrumb(team.ldu_id, workloadType).then(function (lduBreadcrumbs) {
      return breadcrumbs.concat(lduBreadcrumbs)
    })
  }).catch(function () {
    throw new NotFound(`Team not found at id ${id}`)
  })
}

const getLduBreadcrumb = function (id, workloadType) {
  return getLduById(id).then(function (ldu) {
    const breadcrumbs = [new Link(ldu.description, `/${workloadType}/ldu/${id}`)]
    return getRegionalBreadcrumb(ldu.region_id, workloadType).then(function (regionalBreadcrumbs) {
      return breadcrumbs.concat(regionalBreadcrumbs)
    })
  }).catch(function () {
    throw new NotFound(`LDU not found at id ${id}`)
  })
}

const getRegionalBreadcrumb = function (id, workloadType) {
  return getRegionById(id).then(function (region) {
    const breadcrumbs = [new Link(region.description, `/${workloadType}/region/${id}`)]
    return getNationalBreadcrumb(0, workloadType).then(function (nationalBreadcrumbs) {
      return breadcrumbs.concat(nationalBreadcrumbs)
    })
  }).catch(function () {
    throw new NotFound(`Region not found at id ${id}`)
  })
}

const getNationalBreadcrumb = function (id, workloadType) {
  return Promise.resolve([new Link('HMPPS', `/${workloadType}/hmpps/${id || '0'}`)])
}
