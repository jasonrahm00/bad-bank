const { MongoClient } = require('mongodb')

require('dotenv').config()

const url = process.env.DATABASE_URI

let db = null

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Successfully connected to db server')
  // connect to myproject database
  //https://stackoverflow.com/questions/62846151/typeerror-cannot-read-property-db-of-undefined-while-trying-to-mongodb-atlas
  db = client.db('customers')
})

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('customers')
    const doc = { name, email, password, balance: 0 }
    collection.insertOne(doc, { w: 1 }, (err, result) => {
      err ? reject(err) : resolve(doc)
    })
  })
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('customers')
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
      .collection('customers')
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
      .collection('customers')
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err))
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('customers')
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

module.exports = { create, all, findOne, find, update }
