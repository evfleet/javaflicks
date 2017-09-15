// @flow

type APIResponse = {
  data?: any,
  error?: {
    code: number,
    message: string
  }
}

export default (success: boolean, payload: any, code: number): APIResponse => {
  if (success) {
    return {
      data: payload
    };
  } else {
    return {
      error: {
        code,
        message: payload
      }
    };
  }
};
