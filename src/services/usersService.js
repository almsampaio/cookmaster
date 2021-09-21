// const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };
const emailExists = { status: 409, message: 'Email already registered' };

const createUser = async (name, email, password, role) => {
  const createdUser = await usersModel.create(name, email, password, role);
  if (createdUser.statusCode === 409) return emailExists;
  return { status: 201, user: createdUser };
};

const create = (name, email, password, role) => {
  if (!name || !email || !password) return invalidEntries;
  if (!emailPattern.test(email)) return invalidEntries;
  return createUser(name, email, password, role);
};

module.exports = {
  create,
};
