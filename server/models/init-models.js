const { DataTypes } = require('sequelize');
const _Person = require('./Person');
const _departments = require('./departments');
const _dept_emp = require('./dept_emp');
const _dept_manager = require('./dept_manager');
const _employees = require('./employees');
const _salaries = require('./salaries');
const _titles = require('./titles');

function initModels(sequelize) {
  const Person = _Person(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const dept_emp = _dept_emp(sequelize, DataTypes);
  const dept_manager = _dept_manager(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const salaries = _salaries(sequelize, DataTypes);
  const titles = _titles(sequelize, DataTypes);

  departments.belongsToMany(employees, {
    as: 'emp_no_employees', through: dept_emp, foreignKey: 'dept_no', otherKey: 'emp_no',
  });
  employees.belongsToMany(departments, {
    as: 'dept_no_departments', through: dept_emp, foreignKey: 'emp_no', otherKey: 'dept_no',
  });
  dept_emp.belongsTo(departments, { as: 'dept_no_department', foreignKey: 'dept_no' });
  departments.hasMany(dept_emp, { as: 'dept_emps', foreignKey: 'dept_no' });
  dept_manager.belongsTo(departments, { as: 'dept_no_department', foreignKey: 'dept_no' });
  departments.hasMany(dept_manager, { as: 'dept_managers', foreignKey: 'dept_no' });
  dept_emp.belongsTo(employees, { as: 'emp_no_employee', foreignKey: 'emp_no' });
  employees.hasMany(dept_emp, { as: 'dept_emps', foreignKey: 'emp_no' });
  dept_manager.belongsTo(employees, { as: 'emp_no_employee', foreignKey: 'emp_no' });
  employees.hasMany(dept_manager, { as: 'dept_managers', foreignKey: 'emp_no' });
  salaries.belongsTo(employees, { as: 'emp_no_employee', foreignKey: 'emp_no' });
  employees.hasMany(salaries, { as: 'salaries', foreignKey: 'emp_no' });
  titles.belongsTo(employees, { as: 'emp_no_employee', foreignKey: 'emp_no' });
  employees.hasMany(titles, { as: 'titles', foreignKey: 'emp_no' });

  return {
    Person,
    departments,
    dept_emp,
    dept_manager,
    employees,
    salaries,
    titles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
