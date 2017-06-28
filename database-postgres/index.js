const pg = require('pg');

console.log(process.env.postgres_port);

var config = {
  user:   process.env.postgres_user || 'hzwmjqtveugkyb', //env var: PGUSER
  database: process.env.postgres_database ||  'd6jg4456clnb1r', //env var: PGDATABASE
  password: process.env.postgres_password || 'eb13ac8e9913056992b2c32267eed892f1c1ab7caa632acbf7072dd9bb539e47', //env var: PGPASSWORD
  host: process.env.postgres_host || 'ec2-23-23-86-179.compute-1.amazonaws.com', // Server hosting the postgres database
  port: Number(process.env.postgres_port) || 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
};


// connection (create connection to heroku staging)
const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});


//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};




// export connection
// export close connection

// inside database-postgres/models import connection for each file
