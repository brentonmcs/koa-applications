module.exports = {
  database: process.env.MONGO_URI || 'localhost',
  sharedSecret: 'shared-secret'
};
