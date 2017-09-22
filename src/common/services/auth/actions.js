import storage from 'config/storage';
import * as actionTypes from './actionTypes';

export const loginPass = ({ email, username, refreshToken }) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await storage.setAuth({ email, refreshToken });
        dispatch({
          type: actionTypes.LOGIN_PASS,
          payload: {
            email,
            username
          }
        });
        resolve();
      } catch (error) {
        await storage.clearAuth();
        dispatch({ type: actionTypes.LOGIN_ERROR });
        reject(error);
      }
    });
  };
};

export const loginFail = () => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      await storage.clearAuth();
      dispatch({ type: actionTypes.LOGIN_FAIL });
      resolve();
    });
  };
};

export const logout = () => {

};