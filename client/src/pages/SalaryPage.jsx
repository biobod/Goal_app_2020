import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const SalaryPage = ({
  salaries, employee, salaryFetching, history,
}) => {
  const classes = useStyles();

  if (!employee) {
    history.push('/employees');
    return null;
  }
  const name = `${employee.first_name} ${employee.last_name}`;
  return (
    <div>
      <h3>{name}</h3>
      {salaryFetching ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>From Date</strong></TableCell>
                <TableCell><strong>To Date</strong></TableCell>
                <TableCell><strong>Salary</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.map((row) => (
                <TableRow hover key={`${row.from_date}}`}>
                  <TableCell component="th" scope="row">
                    {new Date(row.from_date).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell>{new Date(row.to_date).toISOString().split('T')[0]}</TableCell>
                  <TableCell>{`${row.salary} $`}</TableCell>
                </TableRow>
              ))}
              <TableRow key="total">
                <TableCell>
                  <strong>Total Salary Paid:</strong>
                </TableCell>
                <TableCell />
                <TableCell><strong>{`${_.sumBy(salaries, (o) => o.salary)} $`}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

SalaryPage.defaultProps = {
  employee: null,
};

SalaryPage.propTypes = {
  salaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  employee: PropTypes.object,
  salaryFetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect((state) => ({
  employee: state.employees.find((u) => u.emp_no === state.selectedEmployeeId),
  salaryFetching: state.salaryFetching,
  salaries: state.salaries,
}))(withRouter(SalaryPage));
