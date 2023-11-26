const admin = require('firebase-admin')
const serviceAccount = require('./firebase-auth-routes.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// reusable error generator
function createError(message) {
  let error = new Error()
  error.success = false
  error.message = message
  return error
}

// Verify Google Token
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).send(error)
  }
}

module.exports = { createError, verifyToken }
