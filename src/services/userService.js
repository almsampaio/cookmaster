const userModel = require('../models/userModel');
const userSchema = require('../schemas/userSchema');

async function emailIsUnique(email) {
  const userByEmail = await userModel.getUserByEmail(email);
  if (!userByEmail.length) return true;
  return false;
}

async function addUser({ name, email, password }) {
  const validation = userSchema.validateUser({ name, email, password });
  
  if (validation.message) return { code: validation.code, message: validation.message };
  
  const uniqueEmail = await emailIsUnique(email);
  if (!uniqueEmail) return { code: 409, message: 'Email already registered' };

  const role = 'user';
  const addedUser = await userModel.addUser({ name, email, password, role });
  
  return { code: 201, user: addedUser };
}

module.exports = {
  addUser,
};
