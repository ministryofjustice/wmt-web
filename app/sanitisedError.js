module.exports = function (error) {
  if (error.response) {
    return {
      text: error.response.text,
      status: error.response.status,
      headers: error.response.headers,
      data: error.response.body,
      message: error.message,
      stack: error.stack
    }
  }
  return {
    message: error.message,
    stack: error.stack
  }
}
