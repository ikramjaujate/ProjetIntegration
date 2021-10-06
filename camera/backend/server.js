const http = require('http');
const express = require('express') ;
const app = express() ;
const {Client}= require('pg') ;
const cors = require('cors') ;
const mysql = require('mysql');

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'Lafetas1',
  database: 'ProjetIntegration'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})
app.use(express.json()) ;
app.use(cors()) ;  


client.connect(err => {
  if (err) {
    console.log('connection error', err.stack);
  } 
  else {
    console.log('connected');
  }
}) ;

// Code de la page Caméra------------------------------------------------------------------------------------------------

/**
 * Récupère à l'aide d'un GET toutes les caméra et leur état 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/

app.get('/api/etatCam', (req, res) =>{
  
  client.query('select * from camera', (err, result) => {

    if(err) throw err ;
    res.send(result.rows);
   
  })
})
