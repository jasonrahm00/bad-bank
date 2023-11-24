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
    const existingUser = await collection.findOne({ email })
    if (existingUser) {
      let error = new Error()
      throw (error.message = 'User with that email already exists')
    }

    // If email doesn't exist, proceed with account creation
    const doc = { name, email, password, balance: 0 }
    const newDoc = await collection.insertOne(doc)

    console.log(newDoc.ops[0])
    return newDoc.ops[0]
  } catch (err) {
    throw err
  }
}

/****
 * Starter Methods
 * To be replaced
 */

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err))
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents)
        }
      )
  })
}

module.exports = { createTestUser, getAllCustomers, createUser }
