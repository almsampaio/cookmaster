const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userSchema = require('../schema/userSchema');

const SECRET = 'Trybe';

const insertUser = async (name, email, password) => {
  const isNameValid = userSchema.validateName(name);
  const isEmailValid = emailValidator.validate(email);
  const isPasswordValid = userSchema.validatePassword(password);

  if (isNameValid) return ({ code: isNameValid.code, message: isNameValid.message });
  if (!isEmailValid) return ({ code: 400, message: 'Invalid entries. Try again.' });
  if (isPasswordValid) return ({ code: isPasswordValid.code, message: isPasswordValid.message });

  const data = await userModel.getAll();
  const alreadyExists = userSchema.findValueInArrayOfObjects(data, email, 'email');

  if (alreadyExists) return ({ code: 409, message: 'Email already registered' });
  const role = 'user';
  const response = await userModel.create({ name, email, password, role });
  return response;
};

const findByCredentials = async (email, password) => {
  if (password === undefined || email === undefined) { 
    return ({ code: 401, message: 'All fields must be filled' }); 
  }

  const user = await userModel.getByEmail(email);
  if (!user || user.password !== password) {
    return ({ code: 401, message: 'Incorrect username or password' });
  }

  const { password: _, ...userPayload } = user;

  const token = jwt.sign(userPayload, SECRET);

  return { token };
};

module.exports = {
  insertUser,
  findByCredentials,
};
