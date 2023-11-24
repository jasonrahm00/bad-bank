const express = require('express')
const app = express()
const cors = require('cors')
const dal = require('./dal.js')
const bodyParser = require('body-parser')

app.use(express.static('./frontend/build'))
app.use(cors())

const PORT = process.env.PORT || 3000
const jsonParser = bodyParser.json()

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
    const response = await dal.createCustomer(name, email, password)
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

// PATCH to update balance
app.patch('/api/updateBalance', jsonParser, async (req, res) => {
  const { email, amount, action } = req.body

  try {
    let amountAsNum = Number(amount)

    if (isNaN(amountAsNum)) {
      throw dal.createError('Please enter a number')
    }

    if (amountAsNum < 0) {
      throw dal.createError('Please enter a positive number')
    }

    if (action === 'withdraw') {
      amountAsNum = -amountAsNum
    }

    const response = await dal.updateBalance(email, amountAsNum, action)
    res.send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
