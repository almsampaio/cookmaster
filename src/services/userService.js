const userModel = require('../models/userModel');

const validateEntry = (name, email, password) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regex.test(email)) {
      return false;
  }

  return true;
};

const create = async ({ name, email, password, role }) => {
  const validateFields = validateEntry(name, email, password);
  const validEmail = validateEmail(email);
  const existEmail = await userModel.getEmail(email);
  if (!validateFields || !validEmail) {
    return { message: 'Invalid entries. Try again.' }; 
  }
  if (existEmail) return { message: 'Email already registered' };  
  const { id } = await userModel.create({ name, email, password, role });

  return { id, name, email, password, role };
};

module.exports = { create };