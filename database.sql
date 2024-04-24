SET client_encoding = 'UTF8';

CREATE TABLE IF NOT EXISTS  authors (
    id serial primary key,
    first_name varchar,
    last_name varchar
);

CREATE TABLE IF NOT EXISTS  authors_books (
    id serial primary key,
    author_id bigint,
    book_id bigint
);

CREATE TABLE IF NOT EXISTS  books (
    id serial primary key,
    title varchar,
    genre_id bigint,
    publishing_year integer
);

CREATE TABLE IF NOT EXISTS  books_users (
    id serial primary key,
    user_id bigint,
    book_id bigint,
    read_status varchar
);

CREATE TABLE IF NOT EXISTS  comments (
    id serial primary key,
    user_id bigint,
    book_id bigint,
    comment varchar,
    created_at timestamp without time zone
);
CREATE TABLE IF NOT EXISTS  genres (
    id serial primary key,
    name varchar
);

CREATE TABLE IF NOT EXISTS  users (
    id serial primary key,
    name varchar,
    email varchar,
    password varchar,
    salt varchar
);


CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  foundation_year INTEGER,
  description TEXT,
  image_url TEXT
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  studio INTEGER REFERENCES studios(id),  -- Foreign key to link games to studios
  release_date DATE,
  description TEXT,
  image_url TEXT,
  status VARCHAR(255)
);

CREATE TABLE games_comments (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id),
  user_id INTEGER,  -- Foreign key for user (assuming you have a user table)
  comment_text TEXT NOT NULL,
  comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  -- Include timestamp by default
);
