const express = require('express')
const app = express()
const cors = require('cors')
const dal = require('./dal.js')
app.use(express.static('./frontend/build'))
app.use(cors())

const PORT = process.env.PORT || 3000

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
