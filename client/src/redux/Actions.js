import axios from 'axios';
import { GET_USER_FAILURE, GET_USER_STARTED, GET_USER_SUCCESS } from './ActionTypes';
import config from '../../../config';

export const getEmployee = (name) => (dispatch) => {
  dispatch({ type: GET_USER_STARTED });
  axios({
    url: 'employee',
    method: 'get',
    baseURL: `http://localhost:${config.port}/`,
    params: { name },
  }).then((res) => dispatch({ type: GET_USER_SUCCESS, data: res.data }))
    .catch((error) => dispatch({ type: GET_USER_FAILURE, error }));
};
