const jwt = require('jsonwebtoken');
// const { ObjectId } = require('bson');
const UsersModel = require('../Model/UsersModel');
const AdminModel = require('../Model/AdminModel');

const secret = 'projectcookmaster';

const adminRegistration = async (data, token) => {
  const decode = jwt.verify(token, secret);
  const user = await UsersModel.searchByEmail(decode.data.email);
  const newAdmin = await AdminModel.registration(data, user);
  return newAdmin;
};

module.exports = { adminRegistration };