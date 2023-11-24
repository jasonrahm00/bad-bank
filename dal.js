const { MongoClient } = require('mongodb')
require('dotenv').config()
const url = process.env.DATABASE_URI
const utils = require('./utils.js')
let db = null

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Successfully connected to db server')
  // connect to database
  db = client.db('bad_bank')
})

// reusable function to find existing customer by email
async function _findExistingCustomer(email) {
  const collection = db.collection('customers')
  const existingCustomer = await collection.findOne({ email })
  return existingCustomer
}

// get all customers
async function getAllCustomers() {
  try {
    const customers = await db.collection('customers').find({}).toArray()
    console.log(customers)
    return customers
  } catch (err) {
    console.error(err)
    throw err
  }
}

// create customer
async function createCustomer(name, email, password) {
  try {
    const collection = db.collection('customers')

    // check if email is already attached to a customer
    const existingCustomer = await _findExistingCustomer(email)
    if (existingCustomer) {
      throw createError('Account with that email already exists')
    }

    // If email doesn't exist, proceed with customer creation
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
    const existingCustomer = await _findExistingCustomer(email)

    // validate customer existence
    if (!existingCustomer) {
      throw utils.createError(invalidCreds)
    }

    // validate password match
    if (existingCustomer.password !== password) {
      throw utils.createError(invalidCreds)
    }

    return {
      name: existingCustomer.name,
      email: existingCustomer.email,
      balance: existingCustomer.balance,
    }
  } catch (error) {
    throw error
  }
}

// update balance
async function updateBalance(email, amount, action) {
  try {
    const collection = db.collection('customers')
    const existingCustomer = await _findExistingCustomer(email)

    const verifyFunds = () => {
      return existingCustomer.balance + amount > 0
    }

    // validate account existence
    if (!existingCustomer) {
      throw utils.createError(`Account not found with email: ${email}`)
    }

    // verify available funds
    if (action === 'withdraw' && !verifyFunds()) {
      throw utils.createError('Insufficient funds')
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
  getAllCustomers,
  createCustomer,
  login,
  updateBalance,
}
