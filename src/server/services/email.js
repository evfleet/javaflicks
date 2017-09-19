export default {
  sendVerification() {
    return new Promise((resolve, reject) => {
      console.log('Send email to verify');
      resolve();
    });
  },

  sendNotification() {
    return new Promise((resolve, reject) => {
      console.log('Send email to notify user of existing account');
      resolve();
    });
  }
};
