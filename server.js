'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/book.js')

const app = express();
app.use(cors());
 // we must have this in order to process json data from a request
app.use(express.json());

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
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks)

async function getBooks(req, res, next) {
  try {
    let results = await Book.find({});
    res.status(200).send(results);
  } catch(error) {
    next(error);
  }
}

async function postBooks(req, res, next) {
  try {
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook)
  } catch(error){
    next(error);
  }
}

async function deleteBooks(req, res, next){
  try{
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).send("Book Deleted")
  } catch(error){
    next(error);
  }
}
async function putBooks(req, res, next){
  try{
    let id = req.params.id;
    let updatedBook = req.body;
    // findByIdAndUpdate method takes in three arguments
    // 1. ID 2. Updated data object 3. Options object
    let updatedBookFromDatabase = await Book.findByIdAndUpdate(id, updatedBook, { new: true, overwrite: true });
    res.status(200).send(updatedBookFromDatabase)
  } catch(error){
    next(error);
  }
}





app.listen(PORT, () => console.log(`listening on ${PORT}`));