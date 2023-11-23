const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

const url = process.env.DATABASE_URI
const PORT = process.env.PORT || 3000

app.use(express.static('./frontend/build'))

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Connected!')

  // database name
  const dbName = 'customers'
  const db = client.db(dbName)

  // new user
  let name = 'user' + Math.floor(Math.random() * 10000)
  let email = name + '@mit.edu'

  // insert into customer table
  let collection = db.collection('users')
  let doc = { name, email }
  collection.insertOne(doc, { w: 1 }, function (err, result) {
    console.log('Document inserted')
  })

  // read data
  const customers = db
    .collection('users')
    .find()
    .toArray(function (err, docs) {
      console.log('Collection:', docs)
      client.close()
    })
})

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
