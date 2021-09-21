const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const userSchema = require('../schemas/UserSchema');

const SECRET = 'superSecret';

const create = async (user) => {
  const { error } = userSchema.userCreateValidate(user);

  if (error) return { message: 'Invalid entries. Try again.', code: 400 };

  const { message } = await userSchema.emailIsUnique(user.email);

  if (message) return { message, code: 409 };

  const userCreated = await UserModel.create(user);

  return userCreated;
};

const validationCredentials = (email, password) => {
  if (!email || !password) {
    return (
      { status: 401, message: 'All fields must be filled' }
    );
  }
  return {};
};

const findByCredentials = async (email, password) => {
  const validationEmailAndPass = validationCredentials(email, password);

  if (validationEmailAndPass.status) return validationEmailAndPass;

  const userSearch = await UserModel.findByEmail(email);

  if (!userSearch || userSearch.email !== email || userSearch.password !== password) {
    return (
      { status: 401, message: 'Incorrect username or password' }
    ); 
  }

  const { password: _, name: __, ...userPayload } = userSearch;

  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });

  return ({ status: 200, token });
};

module.exports = {
  create,
  findByCredentials,
};