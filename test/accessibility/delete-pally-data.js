const deleteAllDataFs = require('../helpers/data/delete-all-data-fs')

deleteAllDataFs().then(function () {
  process.exit(0)
})
