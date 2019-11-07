require('dotenv').config();
const { NODE_ENV} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const BookmarksRouter = require('./bookmarks/bookmarks-router')



const app = express();



// const validateBearerToken = require('./validateBearerToken');
// const errorHandler = require('./errorHandler');
// const bookmarkRouter = require('./bookmarkRouter');

app.use('/bookmarks', bookmarksRouter)
app.use(morgan ((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV.ENV === 'test'
}))   //ternary statement if/then, else
app.use(helmet()) // helmet must come before cors
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world')
})

// app.use(validateBearerToken);

// app.use(bookmarkRouter);
// app.use(errorHandler);

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})



module.exports = app;