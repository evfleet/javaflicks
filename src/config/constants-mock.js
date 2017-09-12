const devConfig = {
  DATABASE: {
    user: '',
    pass: '',
    host: '',
    table: ''
  }
}

const testConfig = {

}

const prodConfig = {

}

const defaultConfig = {
  PORT: 3000
}

function setConfig () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return devConfig
    case 'test':
      return testConfig
    default:
      return prodConfig
  }
}

export {
  ...defaultConfig,
  ...setConfig()
}