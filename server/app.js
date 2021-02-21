const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysqlx = require('@mysql/xdevapi');
const serverConfig = require('../config');

const app = express();

mysqlx
  .getSession({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: serverConfig.sessionPort,
  })
  .then((session) => {
    // here we use collection
    const testdb = session.getSchema('test');
    // Use the collection 'test_table'
    const myCollection = testdb.getCollection('myCollection');
    // Specify which document to find with Collection.find() and
    // fetch it from the database with .execute()
    myCollection
      .find('name like :name')
      .bind({ name: 'Laurie' })
      .limit(1)
      .execute((doc) => {
        console.log(doc);
      });

    // here we use table
    // TODO define a difference between collection and table
    const employeesDB = session.getSchema('employees');
    // Use the collection 'test_table'
    const salaries = employeesDB.getTable('salaries');
    // Specify which document to find with Collection.find() and
    // fetch it from the database with .execute()
    return salaries
      .select()
      .where('emp_no like :emp_no')
      .bind('emp_no', 10071)
      // .limit(1)
      .execute()
      .then((myResult) => {
        const myRows = myResult.fetchAll();
        myRows.forEach((row) => {
          console.log(row);
        });
      });
  })
  .catch((err) => {
    console.log('DB error', err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/user', (req, res) => {
  res.send(req.query.name);
});

app.listen(serverConfig.port, () => console.log(`Server is running on port ${serverConfig.port}`));
app.on('exit', () => app.close());
app.on('uncaughtException', () => app.close());
