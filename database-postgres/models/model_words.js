const pool = require('../index.js');

//to run a query we just pass it to the pool
//after we're done nothing has to be taken care of
//we don't have to return any client to the pool or close a connection
pool.query('SELECT * FROM words', function(err, res) {
  if(err) {
    return console.error('error running query', err);
  }

  console.log('number:', res.rows);
});

