const { GetObjectCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, bucketName) {
  return s3Client.send(new GetObjectCommand({
    Bucket: bucketName
  }))
    .then(function (data) {
      return data.Body
    })
    .catch(function (error) {
      console.error(error)
      throw (error)
    })
}
