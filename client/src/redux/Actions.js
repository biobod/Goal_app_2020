import axios from 'axios';
import { GET_USER_FAILURE, GET_USER_STARTED, GET_USER_SUCCESS } from './ActionTypes';
import config from '../../../config';

export const getUser = (userName = 'some') => (dispatch) => {
  dispatch({ type: GET_USER_STARTED });
  axios({
    url: 'user',
    method: 'get',
    baseURL: `http://localhost:${config.port}/`,
    params: {
      name: userName,
    },
  }).then(console.log);
};
