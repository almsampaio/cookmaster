const getConnection = require('./connection');

const login = async (email, password) => {
    const db = await getConnection();
    const searchUser = await db.collection('users').findOne({ email, password });
    return searchUser;
  };
  
  module.exports = { login };