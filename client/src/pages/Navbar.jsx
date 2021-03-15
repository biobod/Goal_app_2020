import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tabs, Tab, AppBar,
} from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Navbar = ({ history, location, employee }) => {
  const classes = useStyles();
  const { pathname } = location;

  const changeTab = (event, value) => history.push(value);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={pathname} onChange={changeTab} aria-label="simple tabs example">
          <Tab label="Employee Search" {...a11yProps(0)} value="/employees" />
          <Tab label="Employee Salary" {...a11yProps(1)} value="/salaries" disabled={!employee} />
        </Tabs>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(connect((state) => ({
  employee: state.selectedEmployeeId,
}))(Navbar));
