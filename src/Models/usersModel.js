const connect = require('./connection');

const registerUser = async (userObj) =>
  connect().then((db) =>
    db.collection('users').insertOne(userObj))
    .then((result) => result);

module.exports = {
  registerUser,
};
