const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('employees', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const findEmployee = async (name) => sequelize.query(
  "SELECT * FROM `employees` WHERE concat(first_name, ' ', last_name) LIKE :name limit 200",
  { type: QueryTypes.SELECT, replacements: { name: `%${name}%` } },
);
const findSalaries = async (id) => sequelize.query(
  'SELECT * FROM `salaries` WHERE emp_no like :emp_no',
  { type: QueryTypes.SELECT, replacements: { emp_no: id } },
);

module.exports = { findEmployee, findSalaries };
