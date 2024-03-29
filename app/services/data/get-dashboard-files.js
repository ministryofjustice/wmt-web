const config = require('../../../config')
const s3Client = require('../aws/s3/get-s3-client')(config.dashboard)
const listObjects = require('../aws/s3/list-s3-objects')
const dateFormatter = require('../date-formatter')
module.exports = async function () {
  const files = await listObjects(s3Client, config.dashboard.bucketName)

  return files
    .sort(function ({ LastModified: a }, { LastModified: b }) {
      return b - a
    })
    .map(function (f) {
      return {
        file_type: 'DASHBOARD',
        date_created: dateFormatter.formatDate(f.LastModified, 'DD-MM-YYYY HH:mm'),
        id: f.Key
      }
    })
}
