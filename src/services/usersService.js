const jwt = require('jsonwebtoken');
const users = require('../models/usersModel');
const userSchema = require('../schema/usersSchema');

const secret = 'secretdetoken';

const addUser = async (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  console.log(error);
  if (error) {
 return { err: { message: 'Invalid entries. Try again.', status: 400 } }; 
}
  const { email } = userInfo;
  const registeredEmail = await users.findByEmail(email);
  if (registeredEmail) {
 return {
    err: { message: 'Email already registered', status: 409 },
  }; 
}
  const usInfo = { ...userInfo, role: 'user' };
  const newUser = await users.addUser(usInfo);
  const { password, ...user } = newUser;
  return user;
};

const login = async (userInfo) => {
  const { email, password } = userInfo;
  if (!email || !password) {
    return { err: { message: 'All fields must be filled', status: 401 } };
  }
  const userByEmail = await users.findByEmail(email);
  if (!userByEmail || password !== userByEmail.password) {
    return { err: { message: 'Incorrect username or password', status: 401 } };
  }
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const { password: passcode, ...user } = userByEmail;

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

const addAdmin = async (newAdminInfo, userAdmin) => {
  const { error } = userSchema.validate(newAdminInfo);
  console.log(error);

  if (error) return { err: { message: 'Invalid entries. Try again.', status: 400 } };

  if (userAdmin.role !== 'admin') {
    return { err: { message: 'Only admins can register new admins', status: 403 } };
  }

  const admInfo = { ...newAdminInfo, role: 'admin' };
  const newAdmin = await users.addUser(admInfo);
  const { password, ...adminInfo } = newAdmin;
  return adminInfo;
};

module.exports = {
  addUser,
  login,
  addAdmin,
};
