import ngrok from 'ngrok';

function setURL() {
  return new Promise((resolve, reject) => {
    ngrok.connect((err, url) => {
      if (err) {
        return reject(err);
      }
      resolve(url);
    });
  });
}

export default new Promise(async (resolve, reject) => {
  if (process.env.NODE_ENV === 'development') {
    const ROOT_URL = await setURL();
    resolve({ ROOT_URL });
  } else {
    resolve({ ROOT_URL: '' });
  }
});
