const config = require('../../../config')
const s3Client = require('../s3/get-s3-client')(config.dashboard)
const getObject = require('../s3/get-s3-object')

module.exports = function (fileId) {
  return getObject(s3Client, fileId, config.dashboard.bucketName)
}
