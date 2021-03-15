import { GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE } from './ActionTypes';

const initialState = {
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED: {
      return {
        ...state,
        employeesFetching: true,
        isNoResultsFound: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        employees: action.data,
        isNoResultsFound: !action.data.length,
        employeesFetching: false,
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
        employeesFetching: false,
        isNoResultsFound: false,
      };
    }
    default: return state;
  }
};

export default reducer;
