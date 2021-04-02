const express = require('express');
const employeeService = require('../services/employees');

const router = express.Router();

router.get('/employee', (req, res) => {
  employeeService.findEmployee(req.query.name)
    .then((result) => res.send(result))
    .catch((error) => new Error(error));
});

router.get('/salaries', (req, res) => {
  employeeService.findSalaries(req.query.id)
    .then((result) => res.send(result))
    .catch((error) => new Error(error));
});

module.exports = router;
