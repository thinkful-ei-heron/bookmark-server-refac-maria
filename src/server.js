const knex = require('knex')
const app = require('./app')

const { PORT, DB_URL } = require('./config')

const db = knex ({
  clienet: 'pg',
  connection: DB_URL,
})

app.set('db', db)
app.listen(PORT, () => {
  console.log(`Server is very closely listening to your every move  at http://localhost:${PORT}`)
})
// app will be listening on the port  

