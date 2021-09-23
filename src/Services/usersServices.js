const jwt = require('jsonwebtoken');
const userModels = require('../Models/usersModel');

const secret = 'Apenas_para_fins_didaticos_:)';

const builtError = (code, message) => ({ code, message });

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: user }, secret, jwtConfig);
};

const registerUser = async (userObj) => {
  const emailExists = await userModels.findByEmail(userObj.email);
  if (emailExists) return builtError(409, 'Email already registered');

  const result = await userModels.registerUser(userObj);
  const { password, ...newUser } = result;
  return { user: newUser };
};

const login = async (email, password) => {
  const user = await userModels.findByEmail(email);
  if (!user || user.password !== password) {
    return builtError(401, 'Incorrect username or password');
  }

  return generateToken(user);
};

const admin = async (payload, role) => {
  if (role !== 'admin') return builtError(403, 'Only admins can register new admins');
  return registerUser(payload);
};

module.exports = {
  registerUser,
  builtError,
  login,
  admin,
};
