const Link = require('../services/domain/link')
const { SUPER_USER } = require('../constants/user-roles')
module.exports = function (page, title, res, errors, results, userRole, dateRange, body, startSearching = false, stringifiedBody = '', groupBy, interval) {
  const breadcrumbs = [
    getTopLink(title),
    new Link('Archive Data Options', '/archive-options'),
    new Link('Admin', '/admin')
  ]
  return res.render(page, {
    title,
    results,
    errors,
    tabTitle: getTabTitle(title),
    breadcrumbs,
    dateRange,
    body,
    stringifiedBody,
    startSearching,
    groupBy,
    interval,
    canExport: SUPER_USER === userRole,
    onAdmin: true
  })
}

const getTopLink = function (title) {
  let link
  switch (title) {
    case 'Archived Reductions':
      link = new Link(title, '/archive-data/reductions')
      break
    case 'Averaged Caseload Data':
      link = new Link(title, '/archive-data/average-caseload-data')
      break
    case 'Daily Caseload Data':
      link = new Link(title, '/archive-data/daily-caseload-data')
      break
  }
  return link
}

const getTabTitle = function (title) {
  return {
    first: title,
    second: 'Archive Data Options',
    third: 'Admin'
  }
}
