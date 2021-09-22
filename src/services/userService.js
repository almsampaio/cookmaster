const model = require('../models/userModel');

const checkInfo = (name, password, email) => {
  const regex = /\S+@\S+\.\S+/;

  if (!name || !password || !regex.test(email) || !email) {
    return ({ err: true, status: 400, message: 'Invalid entries. Try again.' });
  }
};

const createUser = async ({ name, password, email, role }) => {
  const infoCheck = checkInfo(name, password, email);

  if (infoCheck) return infoCheck;

  const existingEmail = await model.existingEmail(email);

  if (existingEmail) {
    return ({ err: true, status: 409, message: 'Email already registered' });
  }

  let creatRole = 'admin';

  if (!role) {
    creatRole = 'user';
  }

  const newUser = await model.createUser(name, password, email, creatRole);

  return newUser;
};

module.exports = {
  createUser,
};
