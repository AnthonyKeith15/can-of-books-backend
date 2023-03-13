'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;


// this is a schema. The rules for what is allowed in our database
const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})

// this is the functionality of how we interact with our database

const BookModel = mongoose.model('Book', bookSchema);

// the server.js will have access to the funcitonality of our database
module.exports = BookModel