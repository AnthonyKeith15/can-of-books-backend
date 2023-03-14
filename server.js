'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/book.js')

const app = express();
app.use(cors());

// bring in mongoose
const mongoose = require('mongoose');
// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to mongoDB
mongoose.connect(process.env.DB_URL);


const PORT = process.env.PORT || 3001;

app.get('/books', getBooks);
async function getBooks(req, res, next) {
  try {
    let results = await Book.find({});
    res.status(200).send(results);
  } catch(error) {
    next(error);
  }
}


app.listen(PORT, () => console.log(`listening on ${PORT}`));