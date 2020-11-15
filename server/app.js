const express = require('express')
const cors = require('cors')
const bodyParser =  require('body-parser');
var mysqlx = require('@mysql/xdevapi');

const port = 3000
const app = express()


mysqlx
  .getSession({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: '33060',
  })
  .then(function (session) {
    var db = session.getSchema('test');
    // Use the collection 'test_table'
    var myColl = db.getCollection('myCollection');
    // Specify which document to find with Collection.find() and
    // fetch it from the database with .execute()
    return myColl
      .find('name like :name')
      .bind({ name: 'Laurie' })
      .limit(1)
      .execute(function (doc) {
        console.log(doc);
      });
  })
  .catch(function (err) {
    console.log('DB error', err);
  });



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
app.on('exit', () => app.close())
app.on('uncaughtException', () => app.close())
