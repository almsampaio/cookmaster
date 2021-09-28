const jwt = require('jsonwebtoken');

const db = require('../models/usersModel');

const secret = 'Nani!!!';
const emailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const createNewUserValidations = async (name, email, password) => {
  if (!name || !emailValidFormat.test(email) || !password) { 
    return { err:
      { message: 'Invalid entries. Try again.', code: 'BAD_REQUEST' } };
  }
  const emailAlreadyRegistered = await db.findByEmail(email);
  if (emailAlreadyRegistered) {
    return { err:
      { message: 'Email already registered', code: 'CONFLICT' } };
    }
  return true;
};

const createNewUser = async (body) => {
  let { role } = body;
  const { name, email, password } = body;
  if (!role) role = 'user';

  const isValid = await createNewUserValidations(name, email, password);
  if (isValid.err) return isValid; 

  const newUser = await db.createNewUser(name, email, password, role);
  return newUser;
};

const userLoginValidations = (email, password) => {
  if (!email || !password) {
    return { err: { message: 'All fields must be filled', code: 'UNAUTHORIZED' } };
  }
  if (!emailValidFormat.test(email) || password.length < 3) {
    return { err: { message: 'Incorrect username or password', code: 'UNAUTHORIZED' } };
  }
  return true;
};

const userLogin = async (email, password) => {
  const isValid = userLoginValidations(email, password);
  if (isValid.err) return isValid;
  const loginRequest = await db.userLogin(email, password);
  if (loginRequest) {
    const { _id: id, email: userEmail, role } = loginRequest;
    const token = jwt.sign({ payload: { id, userEmail, role } }, secret);
    return { token };
  }
  return { err: { message: 'Incorrect username or password', code: 'UNAUTHORIZED' } };
};

module.exports = {
  createNewUser,
  userLogin,
};
