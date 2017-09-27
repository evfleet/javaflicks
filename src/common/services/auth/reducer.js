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
    case actionTypes.AUTHENTICATION_PASS:
      return {
        isLoading: false,
        user: {
          email: payload.email,
          isLoggedIn: true
        }
      };

    case actionTypes.AUTHENTICATION_FAIL:
      return {
        isLoading: false,
        user: {
          email: null,
          isLoggedIn: false
        }
      };

    case actionTypes.VERIFICATION_FAIL:
      return {
        isLoading: false,
        user: {
          email: payload.email,
          isLoggedIn: false
        }
      };

    case actionTypes.LOGIN_PASS:
      return {
        isLoading: false,
        user: {
          email: payload.email,
          isLoggedIn: true
        }
      };

    case actionTypes.LOGIN_FAIL:
      return state;

    default:
      return state;
  }
};