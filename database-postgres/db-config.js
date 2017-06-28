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
