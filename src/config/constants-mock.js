const devConfig = {
  DATABASE_URL: ''
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
