const { getUserByEmail } = require('../models/users');

const validateUserName = (name) => {
  if (!name) {
    return { 
      code: 400,
      errorInfo: { message: 'Invalid entries. Try again.' },
    }; 
  }
  return {};
};

const checkEmailAlreadyExists = async (email) => {
  const alredyExists = await getUserByEmail(email);
  if (alredyExists) {
    return {
        code: 409,
        errorInfo: { message: 'Email already registered' },
      }; 
  }
  return {};
};

const validateUserEmail = async (email) => {
  const alreadyExists = await checkEmailAlreadyExists(email);
  if (alreadyExists.errorInfo) return alreadyExists;
  if (!email) {
 return { 
    code: 400,
    errorInfo: { message: 'Invalid entries. Try again.' },
  }; 
} 
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (emailRegex.test(email) === false) {
    return { 
       code: 400,
       errorInfo: { message: 'Invalid entries. Try again.' },
     }; 
   }
   return {};
};

const validateUserPassword = (password) => {
  if (!password) {
    return { 
       code: 400,
       errorInfo: { message: 'Invalid entries. Try again.' },
     }; 
   }
   return {};
};

module.exports = {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
};