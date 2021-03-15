const mysqlx = require('@mysql/xdevapi');
const serverConfig = require('../../config');

const model = async () => {
  const session = await mysqlx.getSession({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: serverConfig.sessionPort,
  });
  const employeesSchema = session.getSchema('employees');
  const salaries = employeesSchema.getTable('salaries');
  const employees = employeesSchema.getTable('employees');
  return ({
    employees, salaries, session,
  });
};

module.exports = model;
