import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_AUTH:
      return {
        isLoading: false,
        user: payload
      };

    default:
      return state;
  }
};