const http = require('http');
const express = require('express')
const app = express()
const {Client}= require('pg')
const cors = require('cors')

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'coda',
  database: 'ProjetIntegration'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors())  //to avoid CORS policy



client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.get('/api/users/photo', (request, response) => {
  client.query('SELECT * FROM photo', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})
