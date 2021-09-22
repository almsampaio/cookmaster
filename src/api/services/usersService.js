const usersModel = require('../models/usersModel');
const {
  requiredFields,
  emptyFields,
  emailAlreadyRegistered } = require('../shemes/validationShemes');

const getAll = async () => {
  const users = await usersModel.getAll();

  return users;
};

const create = async (name, email, password, role) => {
  const validateEmailAlreadyRegistered = await emailAlreadyRegistered(email);
  if (validateEmailAlreadyRegistered.message) {
    const { code, message } = validateEmailAlreadyRegistered;
    return { code, message };
  }

  const validationArray = [
    requiredFields(name, email, password),
    emptyFields(name, email, password),
  ];
  const validation = validationArray.some((validate) => validate.message);
  
  console.log(validation);
  
  if (validation) {
    const { code, message } = validationArray[0];
    return { code, message };
  }

  const user = await usersModel.create(name, email, password, role);
  return { user };
};

module.exports = { getAll, create };
