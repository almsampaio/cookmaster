const { getToken } = require('../api/getToken');
const getConnection = require('./connection');

const login = async (email, password) => {
  const db = await getConnection();
  const searchUser = await db.collection('users').findOne({ email, password });
    // ?{ _id: 0, email: 1, password: 1 }
  if (!searchUser) return searchUser;
  return getToken(email, password);
};
  
  module.exports = { login };