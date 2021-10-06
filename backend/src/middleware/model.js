const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'integration',
  password: 'Stegosaure915',
  port: 5432,
});


const getTables = () => {
    return new Promise(function(resolve, reject) {
      pool.query("Select * from 'Client' where 'IdClient' = 1;", (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results)
      })
    }) 
  }

  module.exports = {
    getTables,
  }