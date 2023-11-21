const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Connected!')

  // database name
  const dbName = 'myproject'
  const db = client.db(dbName)

  // new user
  let name = 'user' + Math.floor(Math.random() * 10000)
  let email = name + '@mit.edu'

  // insert into customer table
  let collection = db.collection('customers')
  let doc = { name, email }
  collection.insertOne(doc, { w: 1 }, function (err, result) {
    console.log('Document inserted')
  })

  // read data
  const customers = db
    .collection('customers')
    .find()
    .toArray(function (err, docs) {
      console.log('Collection:', docs)
      client.close()
    })
})
