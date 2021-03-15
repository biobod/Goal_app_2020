const express = require('express');
const employeeController = require('../controller/employees');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/employee', (req, res) => {
  employeeController.findEmployee(req.query.name)
    .then((result) => res.send(result))
    .catch((error) => new Error(error));
});

router.get('/salaries', (req, res) => {
  employeeController.findSalaries(req.query.name);
  // res.send(req.query.name);
});

module.exports = router;
