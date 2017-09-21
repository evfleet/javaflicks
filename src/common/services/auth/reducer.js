import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOGIN_PASS:
      return {
        isLoading: false,
        user: payload
      };

    case actionTypes.LOGIN_FAIL:
      return {
        isLoading: false,
        user: null
      };

    default:
      return state;
  }
};