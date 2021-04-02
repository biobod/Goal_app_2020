const express = require('express');
const dbService = require('../dbService/employees');

const router = express.Router();

router.get('/employee', (req, res) => {
  dbService.findEmployee(req.query.name)
    .then((result) => res.send(result))
    .catch((error) => new Error(error));
});

router.get('/salaries', (req, res) => {
  dbService.findSalaries(req.query.id)
    .then((result) => res.send(result))
    .catch((error) => new Error(error));
});

module.exports = router;
