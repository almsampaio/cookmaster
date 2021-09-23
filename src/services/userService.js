const userModel = require('../models/userModel');
const emailValidator = require('../utils/emailValidator');

const create = async (user) => {
  const { name = '', email = '', password = '' } = user;
  
  if (!name || !email || !password || !emailValidator(email)) return {
    code: 400,
    message: 'Invalid entries. Try again.'
  }

  const emailExists = await userModel.findUserByEmail(email);
  console.log(emailExists);

  if (emailExists) return {
    code: 409,
    message: 'Email already registered'
  }

  const createdUser = await userModel.create(user);
  return { createdUser };
}

module.exports = {
  create,
}
