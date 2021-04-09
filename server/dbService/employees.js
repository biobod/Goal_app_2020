const { Sequelize, Op } = require('sequelize');

const initModels = require('../models/init-models');

const sequelize = new Sequelize('employees', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = initModels(sequelize);

// Original Query
// const findEmployee = async (name) => sequelize.query(
//   "SELECT * FROM `employees` WHERE concat(first_name, ' ', last_name) LIKE :name limit 200",
//   { type: QueryTypes.SELECT, replacements: { name: `%${name}%` } },
// );

const findEmployee = async (name) => models.employees.findAll({
  limit: 200,
  where: {
    namesQuery: sequelize.where(
      sequelize.fn('concat', sequelize.col('first_name'), ' ', sequelize.col('last_name')), {
        [Op.like]: `%${name}%`,
      },
    ),
  },
});

// // Original Query
// const findSalaries = async (id) => sequelize.query(
//   'SELECT * FROM `salaries` WHERE emp_no like :emp_no',
//   { type: QueryTypes.SELECT, replacements: { emp_no: id } },
// );

const findSalaries = async (id) => models.salaries.findAll({
  where: {
    emp_no: {
      [Op.eq]: id,
    },
  },
});

module.exports = { findEmployee, findSalaries };
