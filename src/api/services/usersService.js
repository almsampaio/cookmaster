const usersModel = require('../models/usersModel');
// const newUserSchema = require('../schemas/userSchema');

// const entriesMessage = 'Invalid entries. Try again.';
const emailMessage = 'Email already registered';

const create = async (newUser) => {
  // const { error } = newUserSchema.validate(newUser);
  // console.log(error);
  const emailAlreadyRegistered = await usersModel.findByEmail(newUser.email);

  if (emailAlreadyRegistered) return { code: 409, message: emailMessage };

  // if (error) return { code: 400, message: entriesMessage };

  const user = await usersModel.create(newUser);

  return user;
};

module.exports = {
  create,
};