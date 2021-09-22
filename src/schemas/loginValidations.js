const usersModel = require('../models/users');

// const checkUserExists = async (email) => {
//   const verifyUser = await usersModel.getUserByEmail(email);
//   // console.log(verifyUser);
//   if (!verifyUser) {
//     return { errorCode: 401,
//        errorInfo: { message: 'Incorrect username or password' } }; 
//   }
//   return verifyUser;
// };

const validateLoginInputs = async (email, password) => {
  if (!email || !password) {
    return { 
      errorCode: 401,
      errorInfo: { message: 'All fields must be filled' }, 
    }; 
  }
  return {};
};

const validateLoginCredentials = async (email, password) => {
  const verifyUser = await usersModel.getUserByEmail(email);
  // const verifyUser = await checkUserExists(email);
  // console.log('passou aqui', verifyUser);
  // if (verifyUser.errorCode) return verifyUser;

  if (!verifyUser || verifyUser.password !== password) {
    return { errorCode: 401,
    errorInfo: { message: 'Incorrect username or password' } };
  }
  return {};
};

module.exports = {
  validateLoginInputs,
  validateLoginCredentials,
};