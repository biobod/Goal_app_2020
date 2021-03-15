import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  TableContainer,
  TablePagination,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { getEmployee, getSalary } from '../redux/Actions';
import { gender, indexes } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const EmployeeSearch = ({
  onGetEmployee, employees, isNoResultsFound, employeesFetching, onGetSalary, history,
}) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const changeValue = ({ target: { value } }) => setUserName(value);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getEmployeeSalary = (employee) => {
    onGetSalary(employee[indexes.emp_no]);
    history.push('/salaries');
  };

  return (
    <div>
      <TextField label="Search a employee" value={userName} onChange={changeValue} />
      <Button onClick={() => onGetEmployee(userName)} variant="contained" color="secondary"> Get User </Button>
      {employeesFetching ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )
        : (
          <>
            {employees?.length ? (
              <div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell align="right"><strong>Male</strong></TableCell>
                        <TableCell align="right"><strong>Hire Date</strong></TableCell>
                        <TableCell align="right"><strong>Birth Data</strong></TableCell>
                        <TableCell align="right"><strong>Check Salary</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employees
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow hover key={`${row[indexes.first_name]}-${row[indexes.last_name]}`}>
                            <TableCell component="th" scope="row">
                              {`${row[indexes.first_name]} ${row[indexes.last_name]}`}
                            </TableCell>
                            <TableCell align="right">{gender[row[indexes.gender]]}</TableCell>
                            <TableCell align="right">{new Date(row[indexes.hire_date]).toDateString()}</TableCell>
                            <TableCell align="right">{new Date(row[indexes.birth_date]).toDateString()}</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => getEmployeeSalary(row)}
                              >
                                Salary Info
                              </Button>
                            </TableCell>

                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={employees.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            ) : (
              <>
                {isNoResultsFound && (
                <Alert severity="info">
                  <AlertTitle>Sorry</AlertTitle>
                  No results found
                </Alert>
                )}
              </>
            )}
          </>
        )}
    </div>
  );
};

EmployeeSearch.propTypes = {
  onGetEmployee: PropTypes.func.isRequired,
  onGetSalary: PropTypes.func.isRequired,
  isNoResultsFound: PropTypes.bool.isRequired,
  employeesFetching: PropTypes.bool.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(({ employees, isNoResultsFound, employeesFetching }) => ({
  employees, isNoResultsFound, employeesFetching,
}), { onGetEmployee: getEmployee, onGetSalary: getSalary })(withRouter(EmployeeSearch));
