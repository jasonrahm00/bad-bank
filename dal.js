const { MongoClient } = require('mongodb')
require('dotenv').config()
const url = process.env.DATABASE_URI
let db = null

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Successfully connected to db server')
  // connect to customers database
  db = client.db('customers')
})

// reusable function to find existing user by email
async function _findExistingUser(email) {
  const collection = db.collection('users')
  const existingUser = await collection.findOne({ email })
  return existingUser
}

// reusable error generator
function createError(message) {
  let error = new Error()
  error.success = false
  error.message = message
  return error
}

// create test user
function createTestUser() {
  return new Promise((resolve, reject) => {
    const name = 'user' + Math.floor(Math.random() * 10000)
    const email = name + '@mit.edu'
    const collection = db.collection('users')
    const doc = { name, email }

    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc)
    })
  })
}

// get all users
async function getAllCustomers() {
  try {
    const customers = await db.collection('users').find({}).toArray()
    console.log(customers)
    return customers
  } catch (err) {
    console.error(err)
    throw err
  }
}

// create user account
async function createUser(name, email, password) {
  try {
    const collection = db.collection('users')

    // check if email is already attached to an account
    const existingUser = await _findExistingUser(email)
    if (existingUser) {
      throw createError('User with that email already exists')
    }

    // If email doesn't exist, proceed with account creation
    const doc = {
      name,
      email,
      password,
      balance: 0,
    }
    const newDoc = await collection.insertOne(doc)

    console.log(newDoc.ops[0])
    return newDoc.ops[0]
  } catch (err) {
    throw err
  }
}

// login
async function login(email, password) {
  const invalidCreds = 'Login credentials are not valid'

  try {
    const existingUser = await _findExistingUser(email)

    // validate account existence
    if (!existingUser) {
      throw createError(invalidCreds)
    }

    // validate password match
    if (existingUser.password !== password) {
      throw createError(invalidCreds)
    }

    return {
      name: existingUser.name,
      email: existingUser.email,
      balance: existingUser.balance,
    }
  } catch (error) {
    throw error
  }
}

// update balance
async function updateBalance(email, amount, action) {
  try {
    const collection = db.collection('users')
    const existingUser = await _findExistingUser(email)

    const verifyFunds = () => {
      return existingUser.balance + amount > 0
    }

    // validate account existence
    if (!existingUser) {
      throw createError(`User not found with email: ${email}`)
    }

    // verify available funds
    if (action === 'withdraw' && !verifyFunds()) {
      throw createError('Insufficient funds')
    }

    const result = await collection.findOneAndUpdate(
      { email },
      { $inc: { balance: amount } },
      { returnDocument: 'after' }
    )

    return {
      success: true,
      balance: result.value.balance,
      message: `Balance updated for ${email}`,
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createTestUser,
  getAllCustomers,
  createUser,
  login,
  updateBalance,
}
