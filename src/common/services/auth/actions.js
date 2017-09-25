import * as actionTypes from './actionTypes';
import storage from 'config/storage';

export const authenticationPass = ({ email, refreshToken }) => {
  return async (dispatch) => {
    return new Promise(async (resolve) => {
      await storage.setAuth({ email, refreshToken });
      dispatch({
        type: actionTypes.AUTHENTICATION_PASS,
        payload: {
          email
        }
      });
      resolve();
    });
  };
};

export const authenticationFail = () => {
  return async (dispatch) => {
    return new Promise(async (resolve) => {
      await storage.clearAuth();
      dispatch({ type: actionTypes.AUTHENTICATION_FAIL });
      resolve();
    });
  };
};

export const verificationFail = ({ email }) => {
  return async (dispatch) => {
    return new Promise(async (resolve) => {
      await storage.clearAuth();
      dispatch({
        type: actionTypes.VERIFICATION_FAIL,
        payload: {
          email
        }
      });
      resolve();
    });
  };
};