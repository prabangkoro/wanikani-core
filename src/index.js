// require env variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env.development'
  })
} else {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const api = require('./router')

app.use('/api', api)
app.get(
  '/',
  (req, res) => {
    res.send('hello there!')
  }
)

app.listen(
  PORT,
  () => console.log(`listening to localhost:${PORT}`)
)