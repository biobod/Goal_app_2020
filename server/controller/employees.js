const model = require('../model/employees');

const findEmployee = (name) => model().then(({ session }) => session.sql(`SELECT * FROM employees.employees WHERE concat(first_name, " ", last_name) LIKE "%${name}%" limit 200`)
  .execute()
  .then((myResult) => myResult.fetchAll()));

const findSalaries = (id) => model().then(({ salaries }) => salaries.select()
  .where('emp_no like :emp_no')
  .bind('emp_no', id)
  .execute()
  .then((myResult) => myResult.fetchAll()));

const employeeController = {
  findSalaries,
  findEmployee,
};

module.exports = employeeController;
