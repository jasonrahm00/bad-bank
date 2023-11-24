const admin = require('firebase-admin')
require('dotenv').config()
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT
const serviceAccount = require(serviceAccountJson)

// reusable error generator
function createError(message) {
  let error = new Error()
  error.success = false
  error.message = message
  return error
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

function authMiddleware(req, res, next) {
  const idToken = req.header('Authorization')
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  admin
    .auth()
    .veriifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken
      next()
    })
    .catch((error) => {
      console.error('Error verifying Firebase ID token:', error)
      res.status(401).json({ error: 'Unauthorized' })
    })
}

module.exports = { createError, authMiddleware }
