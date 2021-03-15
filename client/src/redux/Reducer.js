import {
  GET_USER_FAILURE,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_SALARY_STARTED,
  GET_SALARY_SUCCESS,
  GET_SALARY_FAILURE,
} from './ActionTypes';

const initialState = {
  employees: [],
  selectedEmployeeId: null,
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

    case GET_SALARY_STARTED: {
      return {
        ...state,
        salaryFetching: true,
        selectedEmployeeId: action.id,
      };
    }
    case GET_SALARY_SUCCESS: {
      return {
        ...state,
        salaries: action.data,
        selectedEmployeeId: action.id,
        salaryFetching: false,
      };
    }
    case GET_SALARY_FAILURE: {
      return {
        ...state,
        error: action.error,
        salaryFetching: false,
      };
    }
    default: return state;
  }
};

export default reducer;
