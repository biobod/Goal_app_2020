const express = require('express')
const cors = require('cors')
const bodyParser =  require('body-parser');
const mysqlx = require('@mysql/xdevapi');
const { serverConfig } = require('../config')


const app = express()

mysqlx
  .getSession({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: serverConfig.sessionPort,
  })
  .then(function (session) {

    // here we use collection
    var testdb = session.getSchema('test');
    // Use the collection 'test_table'
    var myCollection = testdb.getCollection('myCollection');
    // Specify which document to find with Collection.find() and
    // fetch it from the database with .execute()
    myCollection
      .find('name like :name')
      .bind({ name: 'Laurie' })
      .limit(1)
      .execute(function (doc) {
        console.log(doc);
      });

    // here we use table
    // TODO define a difference between collection and table
    var employeesDB = session.getSchema('employees');
    // Use the collection 'test_table'
    var salaries = employeesDB.getTable('salaries');
    // Specify which document to find with Collection.find() and
    // fetch it from the database with .execute()
    return salaries
      .select()
      .where('emp_no like :emp_no')
      .bind('emp_no', 10071)
      // .limit(1)
      .execute()
      .then(myResult => {
        var myRows = myResult.fetchAll();
        myRows.forEach(row => {
          console.log(row);
        });
      })
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

app.listen(serverConfig.port, () => console.log(`Server is running on port ${serverConfig.port}`))
app.on('exit', () => app.close())
app.on('uncaughtException', () => app.close())
