import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Table, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUser } from '../redux/Actions';

const UserSearch = ({ onGetUser }) => {
  const [userName, setUserName] = useState('');
  const changeValue = ({ target: { value } }) => setUserName(value);
  return (
    <div>
      <TextField label="Seaech a User" value={userName} onChange={changeValue} />
      <Button onClick={() => onGetUser(userName)} color="secondary"> Get User </Button>
    </div>
  );
};

UserSearch.propTypes = {
  onGetUser: PropTypes.func.isRequired,
};

export default connect(null, { onGetUser: getUser })(UserSearch);
