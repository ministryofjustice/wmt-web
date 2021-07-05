const Link = require('../services/domain/link')

module.exports = function (page, title, res, errors, results, authorisedUserRole, dateRange, body, startSearching = false, stringifiedBody = '', groupBy, interval) {
  const breadcrumbs = [
    getTopLink(title),
    new Link('Archive Data Options', '/archive-options'),
    new Link('Admin', '/admin')
  ]
  return res.render(page, {
    title: title,
    results: results,
    errors: errors,
    subTitle: 'Archive Data',
    breadcrumbs: breadcrumbs,
    userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
    noAuth: authorisedUserRole.noAuth, // used by proposition-link for the admin role
    dateRange: dateRange,
    body: body,
    stringifiedBody: stringifiedBody,
    startSearching: startSearching,
    groupBy: groupBy,
    interval: interval
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
    case 'Archived Daily Caseload Data':
      link = new Link(title, '/archive-data/daily-caseload-data')
      break
  }
  return link
}
