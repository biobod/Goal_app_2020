import { GET_USER_STARTED } from './ActionTypes';

const initialState = {
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED: {
      return {
        ...state,
        userFetching: true,
      };
    }
    default: return state;
  }
};

export default reducer;
