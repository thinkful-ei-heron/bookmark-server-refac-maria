// get bookmarks
const express = require('express');
const {isWebUri} = require('valid-url');
const bookmarkRouter = express.Router();
const logger = require('./logger');
const store = require('./dataStore');
const uuid = require ('uuid/v4'); 
const bodyParser = express.json()


bookmarkRouter
.route('/bookmark')
.get( (req, res) => {
    res 
      .json(store.bookmarks);
  })
  
.post(bodyParser, (req, res) => {
    const {title, url, content} = req.body;
  
    if(!title) {
      logger.error('title is required');
      return res
        .status(400).send('title is requires')
    }
  
    if(!isWebUri(url)) {
      logger.error(`url required`)
      return res
        .status(400).send('url is required')  
    }
  
    if(!content) {
      logger.error('content is required');
      return res
        .status(400).send('content is required');
    }
    //get an id
    const id = uuid(); 
  
    const bookmark = {
      id: uuid(),
      title,
      url,
      content,
      rating
    };
  
    store.bookmark.push(bookmark);
  
    logger.info(`bookmark with id ${id} has been created!`);
    
    res 
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json(bookmark);
  
  
  });
  
  bookmarkRouter
  .route('/bookmark/:id')
  .get( (req,res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find( b => b.id == id);
  
    //make sure we find a card
    if(!bookmark) {
      logger.error(`bookmark with id ${id} was not found!`);
      return res
        .status(404).send(`bookmark not found`);
    
    }
    res.json(bookmark) 
  })
  
  .delete((req, res) => {
    const { id } = req.params;
  
    const bookmarkIndex = store.bookmarks.findIndex( li => li.id === id)
  
    if(bookmarkIndex === -1) {
      logger.error(`bookmark with id ${id} was not found.`);
      return res 
      .status(404).send(`item was not found for deletion`)
    }
  
    store.bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} has been deleted`);
    res 
      .status(204).end()
  });

  module.exports = bookmarkRouter; 