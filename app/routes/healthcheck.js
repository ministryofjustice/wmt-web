

module.exports = function (router) {
  router.get('/ping', function (req, res) {

    return res.send({
         status: 'UP'
    })
  })
}