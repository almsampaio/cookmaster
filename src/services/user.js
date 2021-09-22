const userModel = require('../models/user');

const MSG_ERROR = 'Invalid entries. Try again.';

const checkUser = (email, password, name) => {
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!name) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!email || validEmail.test(email) === false) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!password) {
   return { message: MSG_ERROR, error: 400 };
  }
 
  return false;
};

const addUser = async (user) => {
  const { email, password, name } = user;
  const check = checkUser(email, password, name);
  if (check) return check;
  const newUser = { ...user, role: 'user' };
  const insertedUser = await userModel.create(newUser);

  if (insertedUser === false) {
    return { message: 'Email already registered', error: 409 };
}
  return insertedUser;
};

module.exports = {
  addUser,
};
