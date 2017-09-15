const devConfig = {
  DATABASE_URL: 'mongodb://qoWLhhUnDYsdOcrq9uc2V0EZI7vbZ6m3:6x*4OvEjUXkqDZBKkxXES!L2e1RfShfv@ds135364.mlab.com:35364/auth',
  SESSION_SECRET: 'LL!aMWaArx#G%FO3B5mg7SR^f^Ai4dlr'
};

const testConfig = {

};

const prodConfig = {

};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function setConfig() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...setConfig()
};
