const mongoose = require('mongoose');

module.exports = function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI);

  conn.model('User', require('../schemas/user'));
  conn.model('PageView', require('../schemas/pageView'));

  return conn; 
};