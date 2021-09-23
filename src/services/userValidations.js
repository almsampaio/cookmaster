const errorGenerator = require('../utils/errorGenerator');
const errorMsg = require('../utils/errorMessages');
const usersModel = require('../models/usersModel');

const regexEmail = /\S+@\S+\.\S+/;

const validateUserCreation = async (name, email, password) => {
  if (!name || !email || !password || !regexEmail.test(email)) {
    const errorMessage = errorGenerator(errorMsg.invalidEntries);
    return { errorMessage };
  }
};

const validateEmail = async (email) => {
  if (!regexEmail.test(email)) {
    const errorMessageEmail = errorGenerator(errorMsg.incorrectUserOrPass);
    return { errorMessageEmail };
  }
};

const validateEmailEmpty = async (email) => {
  if (!email) {
    const errorMsgEmailEmpty = errorGenerator(errorMsg.blankFields);
    return { errorMsgEmailEmpty };
  }
};

const validateUserEmail = async (email) => {
  const getEmail = await usersModel.getByEmail(email); 

  if (getEmail && email === getEmail.email) {
    const emailerrorMessage = errorGenerator(errorMsg.emailRegistered);
    return { emailerrorMessage };
  }
};

const validateTokenCreation1 = async (email, password) => {
  if (!email || !password) {
    const errorMessage = errorGenerator(errorMsg.blankFields);
    return { errorMessage };
  }
};

const validateTokenCreation2 = async (email, password) => {
  const getEmail = await usersModel.getByEmail(email);
  if (!getEmail || (password !== getEmail.password)) {
    const errorMessage2 = errorGenerator(errorMsg.incorrectUserOrPass);
    return { errorMessage2 };
  }
};

module.exports = {
  validateUserCreation,
  validateEmail,
  validateEmailEmpty,
  validateUserEmail,
  validateTokenCreation1,
  validateTokenCreation2,
};
