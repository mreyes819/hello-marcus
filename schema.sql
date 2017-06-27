-- WARNING! Speak to Joe or Matt first. CASCADE is very very dangerous.

\connect test

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS saved_queries CASCADE;
CREATE TABLE saved_queries (
  id SERIAL PRIMARY KEY,
  api_id INT REFERENCES apis (id),
  arguments TEXT NOT NULL,
  user_id INT REFERENCES users (id),
  created_at TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS apis CASCADE;
CREATE TABLE apis (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

DROP TABLE IF EXISTS words CASCADE;
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  api_id INT REFERENCES apis (id),
  word TEXT NOT NULL
);
