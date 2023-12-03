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

// Login with Google
app.post('/api/login', utils.verifyToken, async (req, res) => {
  try {
    const response = await dal.login(req.user.email)
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// POST create customer
app.post('/api/customers', utils.verifyToken, async (req, res) => {
  const { name } = req.body
  const email = req.user.email
  try {
    const response = await dal.createCustomer(name, email)
    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

// PATCH to update balance
app.patch('/api/update-balance', utils.verifyToken, async (req, res) => {
  const { amount, action } = req.body
  const email = req.user.email

  try {
    const response = await dal.updateBalance(email, amount, action)
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
