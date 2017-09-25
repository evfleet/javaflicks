import * as actionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  user: {
    email: null,
    isLoggedIn: false
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};