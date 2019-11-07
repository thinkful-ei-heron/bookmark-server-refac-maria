const uuid = require('uuid/v4')

const bookmarks = [{
    id: uuid(),
    title: 'Animal Farm',
    url: 'https://en.wikipedia.org/wiki/Animal_Farm',
    content: 'Animal famr is about animals that battle other animals in a farm.',
    rating: 5
  
  }];

  module.exports = {bookmarks};
