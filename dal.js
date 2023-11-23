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

async function getAllCustomers() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs)
      })
  })
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

// create user account
function createUser(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users')
    const doc = { name, email, password, balance: 0 }
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc)
    })
  })
}

/****
 * Starter Methods
 * To be replaced
 */
// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs)
      })
  })
}

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
