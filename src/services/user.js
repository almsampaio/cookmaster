const userModel = require('../models/user');

const MSG_ERROR = 'Invalid entries. Try again';

const checkUser = (email, senha, name) => {
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!name) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!email || !validEmail.test(email)) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!senha) {
   return { message: MSG_ERROR, error: 400 };
  }
 
  return false;
};

const addUser = async (user) => {
  const { email, senha, name } = user;
  const check = checkUser(email, senha, name);
  if (check) return check;
  const newUser = { ...user, role: 'user' };
  const insertedUser = await userModel.create(newUser);

  if (insertedUser === false) {
    return { message: 'Email already registred', error: 409 };
}
  return insertedUser;
};

module.exports = {
  addUser,
};
