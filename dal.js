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

// login
async function login(email) {
  try {
    const customer = await _findExistingCustomer(email)
    if (!customer) {
      throw utils.createError('Unable to locate account')
    }
    return customer
  } catch (err) {
    throw err
  }
}

// create customer
async function createCustomer(name, email) {
  try {
    const collection = db.collection('customers')

    // check if email is already attached to a customer
    const existingCustomer = await _findExistingCustomer(email)
    if (existingCustomer) {
      throw utils.createError('Account with that email already exists')
    }

    // If email doesn't exist, proceed with customer creation
    const doc = {
      name,
      email,
      balance: 0,
      accountNumber: Math.floor(Math.random() * 1000000000),
    }
    const newDoc = await collection.insertOne(doc)

    console.log(newDoc.ops[0])
    return newDoc.ops[0]
  } catch (err) {
    throw err
  }
}

// update balance
async function updateBalance(email, amount, action) {
  try {
    const collection = db.collection('customers')
    const existingCustomer = await _findExistingCustomer(email)
    let amountAsNum = Number(amount)

    const verifyFunds = () => {
      return existingCustomer.balance + amountAsNum >= 0
    }

    // validate account existence
    if (!existingCustomer) {
      throw utils.createError(`Account not found with email: ${email}`)
    }

    if (isNaN(amountAsNum)) {
      throw utils.createError('Please enter a number')
    }

    if (amountAsNum < 0) {
      throw utils.createError('Please enter a positive number')
    }

    if (action === 'withdraw') {
      amountAsNum = -amountAsNum
    }

    // verify available funds
    if (action === 'withdraw' && !verifyFunds()) {
      throw utils.createError('Insufficient funds')
    }

    const result = await collection.findOneAndUpdate(
      { email },
      { $inc: { balance: amountAsNum } },
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
  createCustomer,
  updateBalance,
  login,
}
