const http = require('http');

const {Client}= require('pg')

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'coda',
  database: 'ProjetIntegration'
})


client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

photo=[];

client  
  .query('SELECT * FROM photo')
  .then(res => 
    res.rows.forEach( row => {
    photo.push(row);
      //console.log(photo);
  }))
    
    
    
  .catch(e => console.error(e.stack))
  .then(() => client.end())
  console.log(photo)

/*
var res = await client.query("SELECT * FROM photo");
res.rows.forEach(row=>{
    console.log(row);
});
await client.end();
*/

