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

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Firebase Auth Middleware
function authMiddleware(req, res, next) {
  const idToken = req.header('Authorization')
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      console.log({ decodedToken })
      req.user = decodedToken
      next()
    })
    .catch((error) => {
      console.error('Error verifying Firebase ID token:', error)
      res.status(401).json({ error: 'Unauthorized' })
    })
}

module.exports = { createError, authMiddleware }
