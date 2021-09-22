const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const create = async (name, email, password) => {
  const isExist = await userModel.getEmail(email);

  if (isExist !== null) {
    return {
    err: { message: 'Email already registered' } }; 
}
  const user = await userModel.create(name, email, password);
  return { data: user.ops[0] };
};

const login = async (email, password) => {
  const user = await userModel.login(email, password);
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  const secret = 'seusecretdetoken';
  
  if (user === null) {
    return {
      err: { message: 'Incorrect username or password' } };
    }
  delete user.password;
    
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = {
  create,
  login,
};
