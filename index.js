const express = require('express')
const app = express()
const cors = require('cors')
const dal = require('./dal.js')
const bodyParser = require('body-parser')

app.use(express.static('./frontend/build'))
app.use(cors())

const PORT = process.env.PORT || 3000
const jsonParser = bodyParser.json()

// POST to create test account
app.post('/api', (req, res) => {
  dal.createTestUser().then((user) => {
    console.log('test user created')
    console.log(user)
    res.send(user)
  })
})

// GET all customers
app.get('/api/customers', async (req, res) => {
  const allUsers = await dal.getAllCustomers()
  console.log(allUsers)
  res.send(allUsers)
})

// GET customer by email or id?
app.get('/api/customer', (req, res) => {
  return
})

// POST create customer
app.post('/api/customers', jsonParser, (req, res) => {
  const { name, email, password } = req.body
  dal
    .createUser(name, email, password)
    .then((result) => {
      console.log(result)
      res.send(result)
    })
    .catch((error) => {
      console.error('Error:', error.message)
    })
})

// POST login
app.post('/api/login', (req, res) => {
  return
})

// PATCH to withdraw from account
app.patch('/api/withdraw', (req, res) => {
  return
})

// PATCH to deposit into account
app.patch('/api/deposit', (req, res) => {
  return
})

/****
 * Starter Endpoints
 * To be replaced with body requests
 */

// create account
app.get('/account/create/:name/:email/:password', function (req, res) {
  const { name, email, password } = req.params
  dal.create(name, email, password).then((user) => {
    console.log(user)
    res.send(user)
  })
})

// all accounts
app.get('/account/all', function (req, res) {
  dal.all().then((docs) => {
    console.log(docs)
    res.send(docs)
  })
})

// login
app.get('/account/login/:email/:password', function (req, res) {
  res.send({
    email: req.params.email,
    password: req.params.password,
  })
})

// deposit
app.get('/account/deposit/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount,
  })
})

// withdraw
app.get('/account/withdraw/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount,
  })
})

// balance
app.get('/account/balance/:email', function (req, res) {
  res.send({
    email: req.params.email,
    balance: 'beats me',
  })
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
