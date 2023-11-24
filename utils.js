// reusable error generator
function createError(message) {
  let error = new Error()
  error.success = false
  error.message = message
  return error
}

module.exports = { createError }
