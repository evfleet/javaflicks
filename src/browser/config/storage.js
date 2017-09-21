export default {
  getAuth() {
    return new Promise((resolve, reject) => {
      try {
        const credentials = localStorage.getItem('auth');
        const { email, refreshToken } = JSON.parse(credentials);
        resolve({ email, refreshToken });
      } catch (error) {
        reject(error);
      }
    });
  },

  setAuth({ email, refreshToken }) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('auth', JSON.stringify({ email, refreshToken }));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  clearAuth() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.clear();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};