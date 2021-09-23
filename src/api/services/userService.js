const Joi = require('joi');
const AppError = require('../errors/AppError');
const EmailAlreadyRegistered = require('../errors/EmailAlreadyRegistered');
const UserModel = require('../models/UserModel');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const getUserByEmail = async (email) => (await new UserModel()
  .findByColumn({ nameColumn: 'email', query: email }))[0];

const createUser = async (user) => {
  const userExist = await getUserByEmail(user.email);
  if (userExist) throw new EmailAlreadyRegistered();
  
  const { insertedId, ops: [insertedUser] } = await new UserModel()
    .insertOne({ ...user, role: 'user' });
  if (!insertedId) throw new AppError('Unknown Error', { message: 'Unknown Error' }, 500);
  
  const { password, ...newUser } = insertedUser;
  return newUser;
};

const getUser = async (id) => new UserModel().findByObjectId(id);

const updateUser = async (id) => new UserModel().updateOne(id);

const deleteUser = async (id) => new UserModel().deleteByObjectId(id);

module.exports = {
  userSchema,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
