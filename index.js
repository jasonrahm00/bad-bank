const express = require('express')
const app = express()
const cors = require('cors')
const dal = require('./dal.js')
const utils = require('./utils.js')
const path = require('path')
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'frontend', 'build')))
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

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

// Login with Google
app.post('/api/login', utils.verifyToken, async (req, res) => {
  console.log(req.bodysigninMethod)
  try {
    const response = await dal.login(req.user.email)
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// POST create customer
app.post('/api/customers', async (req, res) => {
  const { name, email } = req.body
  try {
    const response = await dal.createCustomer(name, email)
    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

// PATCH to update balance
app.patch('/api/updateBalance', async (req, res) => {
  const { email, amount, action } = req.body

  try {
    let amountAsNum = Number(amount)

    if (isNaN(amountAsNum)) {
      throw utils.createError('Please enter a number')
    }

    if (amountAsNum < 0) {
      throw utils.createError('Please enter a positive number')
    }

    if (action === 'withdraw') {
      amountAsNum = -amountAsNum
    }

    const response = await dal.updateBalance(email, amountAsNum, action)
    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Catchall route to redirect to the frontend index.html so react router works properly
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
