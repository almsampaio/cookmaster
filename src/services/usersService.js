const Users = require('../models/usersModel');
const userSchema = require('../schema/usersSchema');

const addUser = async (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  console.log(error);
  if (error) {
 return { err: { message: 'Invalid entries. Try again.', status: 400 } }; 
}
  const { email } = userInfo;
  const registeredEmail = await Users.findByEmail(email);
  if (registeredEmail) {
 return {
    err: { message: 'Email already registered', status: 409 },
  }; 
}
  const usInfo = { ...userInfo, role: 'user' };
  const newUser = await Users.addUser(usInfo);
  const { password, ...user } = newUser;
  return user;
};

module.exports = {
  addUser,
};
