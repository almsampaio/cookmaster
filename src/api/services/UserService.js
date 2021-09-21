const UserModel = require('../models/UserModel');
const Joi = require('hap')

const createUser = async (user) => new UserModel().insertOne(user);

const getUser = async (id) => new UserModel().findByObjectId(id);

const updateUser = async (id) => new UserModel().updateOne(id);

const deleteUser = async (id) => new UserModel().deleteByObjectId(id);

const validation = 
module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
