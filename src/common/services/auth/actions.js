import storage from 'config/storage';
import * as actionTypes from './actionTypes';

export const loginPass = ({ email, username, refreshToken }) => {
  return async (dispatch) => {
    try {
      await storage.setAuth({ email, refreshToken });
      dispatch({
        type: actionTypes.LOGIN_PASS,
        payload: {
          email,
          username
        }
      });
    } catch (error) {
      await storage.clearAuth();
      dispatch({ type: actionTypes.LOGIN_ERROR });
    }
  };
};

export const loginFail = () => {
  return async (dispatch) => {
    await storage.clearAuth();
    dispatch({ type: actionTypes.LOGIN_FAIL });
  };
};

export const logout = () => {

};