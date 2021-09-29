// Services do usuário
const userModel = require('../Model/userModel');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailExists = { status: 409, message: 'Email already registered' };
const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };

const createUser = async (ame, email, password, role) => {
  const newUser = await userModel.create(ame, email, password, role);
  if (newUser.statusCode === 409) return emailExists;
    return { user: newUser };
};

const create = async (name, email, password, role) => {
  if (!name || !email || !password) return invalidEntries;
  if (!emailRegex.test(email)) return invalidEntries;
  const result = await createUser(name, email, password, role);
  return result;
};

module.exports = {
  create,
};