import axios from 'axios';
import {
  GET_USER_FAILURE,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_SALARY_STARTED,
  GET_SALARY_SUCCESS,
  GET_SALARY_FAILURE,
} from './ActionTypes';
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

export const getSalary = (id) => (dispatch) => {
  dispatch({ type: GET_SALARY_STARTED, id });
  axios({
    url: 'salaries',
    method: 'get',
    baseURL: `http://localhost:${config.port}/`,
    params: { id },
  }).then((res) => dispatch({ type: GET_SALARY_SUCCESS, data: res.data, id }))
    .catch((error) => dispatch({ type: GET_SALARY_FAILURE, error }));
};
