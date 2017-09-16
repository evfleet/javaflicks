import initConstants from 'config/constants';

export default new Promise(async (resolve, reject) => {
  const constants = await initConstants();

  resolve({ constants });
});
