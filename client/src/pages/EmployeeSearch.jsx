import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Table, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getEmployee } from '../redux/Actions';

const EmployeeSearch = ({ onGetEmployee }) => {
  const [userName, setUserName] = useState('');
  const changeValue = ({ target: { value } }) => setUserName(value);
  return (
    <div>
      <TextField label="Seaech a User" value={userName} onChange={changeValue} />
      <Button onClick={() => onGetEmployee(userName)} color="secondary"> Get User </Button>
    </div>
  );
};

EmployeeSearch.propTypes = {
  onGetEmployee: PropTypes.func.isRequired,
};

export default connect(null, { onGetEmployee: getEmployee })(EmployeeSearch);
