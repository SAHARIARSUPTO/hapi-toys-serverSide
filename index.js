const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const teams = require('./Teams.json');
const products = require('./Data/Products.json');
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/teams', (req, res) => {
  res.send(teams)
})
app.get('/products', (req, res) => {
  res.send(products)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})