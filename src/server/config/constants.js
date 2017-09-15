const devConfig = {
  DATABASE_URL: 'mongodb://5bhTJg06GBlW6ntjn9Ju3BKgxNRHaGgn:aTkA610Nfdy73Lulkl6DGHDswWuUcjUD@ds135364.mlab.com:35364/auth',
  SESSION_SECRET: 'qm4FUqO!Z7jmbw!Q&#V3qvvrQbEqJd&G'
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
