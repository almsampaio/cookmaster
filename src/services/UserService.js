const UserModel = require('../models/UserModel');
const userSchema = require('../schemas/UserSchema');

const create = async (user) => {
  const { error } = userSchema.userCreateValidate(user);

  if (error) return { message: 'Invalid entries. Try again' };

  const { message } = await userSchema.emailIsUnique(user.email);

  if (message) return { message };

  const userCreated = await UserModel.create(user);
  return userCreated;
};

module.exports = {
  create,
};