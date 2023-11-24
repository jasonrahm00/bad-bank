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
    res.send(user)
  })
})

// GET all customers
app.get('/api/customers', async (req, res) => {
  try {
    const response = await dal.getAllCustomers()
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

// POST create customer
app.post('/api/customers', jsonParser, async (req, res) => {
  const { name, email, password } = req.body
  try {
    const response = await dal.createUser(name, email, password)
    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

// POST login
app.post('/api/login', jsonParser, async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await dal.login(email, password)
    res.send(response)
  } catch (error) {
    res.status(403).send(error)
  }
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

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
