const errorGenerator = require('../utils/errorGenerator');
const errorMsg = require('../utils/errorMessages');
const usersModel = require('../models/usersModel');

const validateUserCreation = async (name, email, password) => {
  if (!name || !email || !password) {
    const errorMessage = errorGenerator(errorMsg.invalidEntries);
    return { errorMessage };
  }
};

const validateUserEmail = async (email) => {
  const getEmail = await usersModel.getByEmail(email); 

  if (getEmail && email === getEmail.email) {
    const emailerrorMessage = errorGenerator(errorMsg.emailRegistered);
    return { emailerrorMessage };
  }
};

module.exports = {
  validateUserCreation,
  validateUserEmail,
};
