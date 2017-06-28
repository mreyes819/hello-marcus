// const pg = require('pg');
require('dotenv').config();
const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(options);


var config = {
  user: process.env.postgres_user,
  database: process.env.postgres_database,
  password: process.env.postgres_password,
  host: process.env.postgres_host,
  port: Number(process.env.postgres_port),
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
};

const db = pgp(config);

module.exports = db;







// console.log(typeof process.env.postgres_port);




// // connection (create connection to heroku staging)
// const pool = new pg.Pool(config);

// pool.on('error', function (err, client) {
//   // if an error is encountered by a client while it sits idle in the pool
//   // the pool itself will emit an error event with both the error and
//   // the client which emitted the original error
//   // this is a rare occurrence but can happen if there is a network partition
//   // between your application and the database, the database restarts, etc.
//   // and so you might want to handle it and at least log it out
//   console.error('idle client error', err.message, err.stack);
// });


// //export the query method for passing queries to the pool
// module.exports.query = function (text, values, callback) {
//   console.log('query:', text, values);
//   return pool.query(text, values, callback);
// };

// // the pool also supports checking out a client for
// // multiple operations, such as a transaction
// module.exports.connect = function (callback) {
//   return pool.connect(callback);
// };




// export connection
// export close connection

// inside database-postgres/models import connection for each file
