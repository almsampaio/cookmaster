const jwt = require('jsonwebtoken');
const { 
  create,
  getAll,
  getByEmail,
} = require('../models/Users');

const SECRET = 'minhasenhasecreta';

const verifyDataUser = (name, email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!name || !email || !password || !regexEmail.test(email)) {
    return { 
      status: 400, message: 'Invalid entries. Try again.' };
    }
  return false;
};

const createLogin = async (email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!email || !password) return { message: 'All fields must be filled', status: 401 };
  if (!regexEmail.test(email) || password.length < 8) {
    return { message: 'Incorrect username or password', status: 401 };
  }
  const emailSearch = await getByEmail(email);

  const { password: _, name: a, ...userPayload } = emailSearch;

  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '10d',
  });

  return { status: 200, token };
};

const addUser = async (name, email, password) => {
  const verifyUser = verifyDataUser(name, email, password);
  if (verifyUser) return verifyUser;

  const bool = (await getAll()).some((user) => user.email === email);
  if (bool) return { status: 409, message: 'Email already registered' };

  const result = await create(name, email, password);
  return result;
};

module.exports = {
  addUser,
  createLogin,
};
