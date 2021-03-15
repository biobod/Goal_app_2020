import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { indexes } from '../constants';

const SalaryPage = ({ salaries, employee, salaryFetching }) => (
  <div>
    SalaryPage
  </div>
);

SalaryPage.propTypes = {

};

export default connect((state) => ({
  employee: state.employees.find((u) => u[indexes.emp_no] === state.selectedEmployeeId),
  salaryFetching: state.salaryFetching,
  salaries: state.salaries,
}))(SalaryPage);
