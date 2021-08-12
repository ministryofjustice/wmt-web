const Link = require('./domain/link')
const workloadTypeConstant = require('../constants/workload-type')
const getRegionById = require('./data/get-region-by-id')
const getLduById = require('./data/get-ldu-by-id')
const getTeamById = require('./data/get-team-by-id')
const getWorkloadOwnerOffenderManagerByWorkloadOwnerId = require('./data/get-workload-owner-offender-manager-by-workload-owner-id')

module.exports = function (id, organisationLevel, workloadType = workloadTypeConstant.PROBATION) {
  if (organisationLevel === undefined) {
    throw new TypeError('Organisation level is undefined')
  }

  const breadcrumbFunction = getBreadcrumbLevels()[organisationLevel]
  const breadcrumbs = breadcrumbFunction(id, workloadType)
  return breadcrumbs
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
    const breadcrumbs = [new Link(`${offenderManager[0].offender_manager_forename} ${offenderManager[0].offender_manager_surname}`, `/${workloadType}/offender-manager/${id}`)]
    return getTeamBreadcrumb(offenderManager[0].team_id, workloadType).then(function (teamBreadcrumbs) {
      return breadcrumbs.concat(teamBreadcrumbs)
    })
  })
}

const getTeamBreadcrumb = function (id, workloadType) {
  return getTeamById(id).then(function (team) {
    const breadcrumbs = [new Link(team[0].description, `/${workloadType}/team/${id}`)]
    return getLduBreadcrumb(team[0].ldu_id, workloadType).then(function (lduBreadcrumbs) {
      return breadcrumbs.concat(lduBreadcrumbs)
    })
  })
}

const getLduBreadcrumb = function (id, workloadType) {
  return getLduById(id).then(function (ldu) {
    const breadcrumbs = [new Link(ldu[0].description, `/${workloadType}/ldu/${id}`)]
    return getRegionalBreadcrumb(ldu[0].region_id, workloadType).then(function (regionalBreadcrumbs) {
      return breadcrumbs.concat(regionalBreadcrumbs)
    })
  })
}

const getRegionalBreadcrumb = function (id, workloadType) {
  return getRegionById(id).then(function (region) {
    const breadcrumbs = [new Link(region[0].description, `/${workloadType}/region/${id}`)]
    return getNationalBreadcrumb(0, workloadType).then(function (nationalBreadcrumbs) {
      return breadcrumbs.concat(nationalBreadcrumbs)
    })
  })
}

const getNationalBreadcrumb = function (id, workloadType) {
  return Promise.resolve([new Link('HMPPS', `/${workloadType}/hmpps/${id || '0'}`)])
}
