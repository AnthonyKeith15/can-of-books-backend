'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // add books to our database
  // follow the same structure as my book Schema
  await Book.create({
    title: 'Cat in the Hat',
    description: 'Two annoying kids try to ruin a cats day',
    status: 'New',
  });

  await Book.create({
    title: 'Horton Hears a Who',
    description: 'An elephant hears voices in a plant while strolling around Cap Hill',
    status: 'Used',
  });

  await Book.create({
    title: '1 Fish 2 Fish',
    description: 'A sushi restaurant is definitly gonna run out of food for dinner',
    status: 'New',
  });
}