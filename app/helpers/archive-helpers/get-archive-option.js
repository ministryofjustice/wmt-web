const archiveOptions = require('../../constants/archive-options')

module.exports = function (archiveFromDate, archiveDatabaseStartDate, currentDatabaseStartDate) {
  // Assume that you need to start with the DB that contains the earliest database
  let thisArchiveOption = archiveOptions.LEGACY
  if (archiveFromDate.isSameOrAfter(archiveDatabaseStartDate)) {
    // Archive start date is after the last date for data in the legacy database so don't bother searching the legacy DB
    thisArchiveOption = archiveOptions.DAILY_ARCHIVE
  }
  if (archiveFromDate.isSameOrAfter(currentDatabaseStartDate)) {
    // Archive start date is after the last date for data in the new archive database so don't bother searching this DB either
    thisArchiveOption = archiveOptions.DAILY
  }
  return thisArchiveOption
}
