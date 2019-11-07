const BookmarkService = {

    getAllBookmarks(knex) {
        return knex.select('*').from('bookmark_articles')
      },
      insertBookmark(knex, newBookmark) {
        return knex //query object
          .insert(newBookmark) // selects new item
          .into('bookmark_articles') // table
          .returning('*') //specifies which column to return
          .then(rows => { // need to do this because it selects an array with the object, you need only the object for comparison
            return rows[0];
          })

      },

      getById(knex,id) {
        return knex.from('bookmark_articles').select('*').where('id', id).first()
      },

      deleteBookmark(knex,id) {
        return knex('bookmark_articles')
          .where({id})
          .delete()
      },

      updateBookmark(knex, id, newBookFields) {
        return knex('bookmark_articles')
        .where({id})
        .update(newBookmarkFields)
      }    

};

module.exports = BookmarkService;